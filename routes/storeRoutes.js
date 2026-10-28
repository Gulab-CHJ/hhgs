const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const GSMarketConfig = require("../models/GSMarketConfig");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

let razorpay = null;

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys are missing in .env");
  }

  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }

  return razorpay;
}

function makeOrderNumber() {
  return "GS" + Date.now().toString() +
    crypto.randomBytes(2).toString("hex").toUpperCase();
}



// =====================================
// GS MARKET SHOP STATUS API
// =====================================
router.get("/api/shop-status", async (req, res) => {
    try {
        const config = await GSMarketConfig.findOne().lean();

        // पहली बार configuration न बनी हो तो default Open
        const shopOpen = config ? config.shopOpen : true;

        return res.json({
            success: true,
            shopOpen,
            status: shopOpen ? "OPEN" : "CLOSED",
            message: shopOpen
                ? "GS Market अभी खुला है।"
                : "GS Market अभी बंद है।"
        });
    } catch (error) {
        console.error("GS Market status API error:", error);

        return res.status(500).json({
            success: false,
            message: "Shop status database से नहीं मिल सका।"
        });
    }
});

// Customer Store
router.get("/", (req, res) => {
  res.render("store/index", {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || ""
  });
});

// Products API
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({
      active: true,
      stock: { $gt: 0 }
    })
      .select("name category brand price mrp stock image description")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, products });
  } catch (error) {
    console.error("Store products error:", error);
    res.status(500).json({
      success: false,
      message: "Products load नहीं हो सके।"
    });
  }
});

// Create order and Razorpay payment order
router.post("/api/checkout/create", async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (
      !customer ||
      !customer.name ||
      !customer.phone ||
      !customer.address
    ) {
      return res.status(400).json({
        success: false,
        message: "नाम, मोबाइल और पता भरें।"
      });
    }

    const phone = String(customer.phone).replace(/\D/g, "");

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "10 अंकों का मोबाइल नंबर भरें।"
      });
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 30
    ) {
      return res.status(400).json({
        success: false,
        message: "Cart में valid products नहीं हैं।"
      });
    }

    // Duplicate product IDs को एक quantity में जोड़ें।
    const quantities = new Map();

    for (const item of items) {
      const id = String(item.productId || "");
      const quantity = Number(item.quantity);

      if (
        !/^[a-f\d]{24}$/i.test(id) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return res.status(400).json({
          success: false,
          message: "Cart में product या quantity गलत है।"
        });
      }

      quantities.set(
        id,
        (quantities.get(id) || 0) + quantity
      );
    }

    const ids = [...quantities.keys()];
    const products = await Product.find({
      _id: { $in: ids },
      active: true
    });

    if (products.length !== ids.length) {
      return res.status(400).json({
        success: false,
        message: "कुछ products अब उपलब्ध नहीं हैं।"
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const product of products) {
      const quantity = quantities.get(String(product._id));

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} का पर्याप्त stock उपलब्ध नहीं है।`
        });
      }

      const price = Number(product.price);
      const lineTotal = Math.round(price * quantity * 100) / 100;

      subtotal += lineTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price,
        quantity,
        subtotal: lineTotal
      });
    }

    subtotal = Math.round(subtotal * 100) / 100;

    // अभी delivery charge शून्य है।
    const deliveryCharge = 0;
    const totalAmount = subtotal + deliveryCharge;

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Order amount सही नहीं है।"
      });
    }

    const orderNumber = makeOrderNumber();

    const dbOrder = await Order.create({
      orderNumber,
      customer: {
        name: String(customer.name).trim().slice(0, 100),
        phone,
        address: String(customer.address).trim().slice(0, 1000)
      },
      items: orderItems,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "Pending",
      orderStatus: "Pending"
    });

    try {
      const paymentOrder = await getRazorpay().orders.create({
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: orderNumber,
        notes: {
          databaseOrderId: String(dbOrder._id),
          orderNumber
        }
      });

      dbOrder.razorpayOrderId = paymentOrder.id;
      await dbOrder.save();

      return res.json({
        success: true,
        keyId: process.env.RAZORPAY_KEY_ID,
        razorpayOrderId: paymentOrder.id,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        orderNumber,
        customerName: dbOrder.customer.name,
        customerPhone: dbOrder.customer.phone
      });
    } catch (paymentError) {
      console.error("Razorpay create order error:", paymentError);

      await Order.deleteOne({ _id: dbOrder._id });

      return res.status(502).json({
        success: false,
        message: "Payment शुरू नहीं हो पाया। कुछ देर बाद दोबारा कोशिश करें।"
      });
    }
  } catch (error) {
    console.error("Checkout create error:", error);

    res.status(500).json({
      success: false,
      message: "Order बनाने में समस्या हुई।"
    });
  }
});

// Verify Razorpay payment signature
router.post("/api/checkout/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details missing हैं।"
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order नहीं मिला।"
      });
    }

    // Repeated verification must not deduct stock twice.
    if (order.paymentStatus === "Paid") {
      return res.json({
        success: true,
        message: "Payment पहले ही verify हो चुका है।",
        orderNumber: order.orderNumber
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signatureBuffer = Buffer.from(expectedSignature, "utf8");
    const receivedBuffer = Buffer.from(
      String(razorpay_signature),
      "utf8"
    );

    const validSignature =
      signatureBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(signatureBuffer, receivedBuffer);

    if (!validSignature) {
      order.paymentStatus = "Failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment signature verify नहीं हुआ।"
      });
    }

    // Check payment with Razorpay server before confirming.
    const payment = await getRazorpay().payments.fetch(
      razorpay_payment_id
    );

    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured" ||
      payment.amount !== Math.round(order.totalAmount * 100) ||
      payment.currency !== "INR"
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment captured होने की पुष्टि नहीं हुई।"
      });
    }

    // Decrease inventory only after verified captured payment.
    // A stock conflict is flagged for admin review; payment is not
    // falsely reported as unpaid after money has been captured.
    let inventoryIssue = false;

    for (const item of order.items) {
      const result = await Product.updateOne(
        {
          _id: item.product,
          active: true,
          stock: { $gte: item.quantity }
        },
        {
          $inc: { stock: -item.quantity }
        }
      );

      if (result.modifiedCount !== 1) {
        inventoryIssue = true;
      }
    }

    order.paymentStatus = "Paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.orderStatus = inventoryIssue ? "Pending" : "Confirmed";

    await order.save();

    res.json({
      success: true,
      message: inventoryIssue
        ? "Payment सफल है। Stock की पुष्टि के लिए support से संपर्क करें।"
        : "Payment सफल! आपका order confirm हो गया है।",
      orderNumber: order.orderNumber
    });
  } catch (error) {
    console.error("Payment verify error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification में समस्या हुई। यदि पैसे कटे हैं तो दोबारा भुगतान न करें; order status जाँचें।"
    });
  }
});

module.exports = router;