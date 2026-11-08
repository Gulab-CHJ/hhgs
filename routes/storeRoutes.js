
const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const GSMarketConfig = require("../models/GSMarketConfig");
const Product = require("../models/Product");
const Order = require("../models/Order");


const Complaint = require("../models/Complaint");

const router = express.Router();

let razorpay = null;


// =====================================
// RAZORPAY
// =====================================

function getRazorpay() {
  if (
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_KEY_SECRET
  ) {
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


// =====================================
// ORDER NUMBER
// =====================================

function makeOrderNumber() {
  return "GS" + Date.now().toString() +
    crypto.randomBytes(2).toString("hex").toUpperCase();
}


// =====================================
// GPS COORDINATE VALIDATION
// =====================================

function validCoordinates(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);

  return (
    latitude !== undefined &&
    longitude !== undefined &&
    latitude !== null &&
    longitude !== null &&
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}


// =====================================
// HAVERSINE DISTANCE
// =====================================

function distanceInKm(lat1, lon1, lat2, lon2) {
  const toRadians = value => value * Math.PI / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return 6371 * c;
}


// =====================================
// CUSTOMER STORE
// =====================================

router.get("/", (req, res) => {
  res.render("store/index", {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || ""
  });
});


// =====================================
// CUSTOMER SHOP STATUS
// =====================================

router.get("/api/shop-status", async (req, res) => {
  try {
    const config = await GSMarketConfig.findOne().lean();

    const shopOpen = Boolean(
      config &&
      config.shopOpen === true &&
      Number.isFinite(config.shopLatitude) &&
      Number.isFinite(config.shopLongitude)
    );

    const configuredRadius = Number(config?.serviceRadiusKm);
    const radiusKm = configuredRadius > 0 ? configuredRadius : 2;

    return res.json({
      success: true,
      shopOpen,
      status: shopOpen ? "OPEN" : "CLOSED",
      radiusKm,

      // दुकान की वास्तविक Google Maps location
      shopLatitude: shopOpen ? config.shopLatitude : null,
      shopLongitude: shopOpen ? config.shopLongitude : null,

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


// =====================================
// PRODUCTS API
// =====================================

router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({
      active: true,
      stock: { $gt: 0 }
    })
      .select("name category brand price mrp stock image description")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      products
    });

  } catch (error) {
    console.error("Store products error:", error);

    return res.status(500).json({
      success: false,
      message: "Products load नहीं हो सके।"
    });
  }
});


// =====================================
// CREATE ORDER + RAZORPAY PAYMENT ORDER
// =====================================

router.post("/api/checkout/create", async (req, res) => {
  try {

    // ---------------------------------
    // CHECK SHOP STATUS AND GPS
    // ---------------------------------

    const shopConfig = await GSMarketConfig.findOne().lean();

    if (
      !shopConfig ||
      shopConfig.shopOpen !== true ||
      !Number.isFinite(shopConfig.shopLatitude) ||
      !Number.isFinite(shopConfig.shopLongitude)
    ) {
      return res.status(403).json({
        success: false,
        message: "GS Market अभी बंद है। कृपया दुकान खुलने के बाद order करें।"
      });
    }


    // ---------------------------------
    // CUSTOMER GPS
    // ---------------------------------

    const {
      customer,
      items,
      latitude,
      longitude
    } = req.body;

    if (!validCoordinates(latitude, longitude)) {
      return res.status(400).json({
        success: false,
        message: "Order करने के लिए अपनी GPS location Allow करें।"
      });
    }

    const customerLatitude = Number(latitude);
    const customerLongitude = Number(longitude);

    const configuredRadius = Number(shopConfig.serviceRadiusKm);
    const serviceRadiusKm =
      configuredRadius > 0 ? configuredRadius : 2;

    const customerDistance = distanceInKm(
      shopConfig.shopLatitude,
      shopConfig.shopLongitude,
      customerLatitude,
      customerLongitude
    );

    if (customerDistance > serviceRadiusKm) {
      return res.status(403).json({
        success: false,
        code: "OUTSIDE_DELIVERY_RADIUS",
        distanceKm: Number(customerDistance.toFixed(2)),
        radiusKm: serviceRadiusKm,
        message:
          `आपकी location दुकान से ${customerDistance.toFixed(2)} KM दूर है। ` +
          `अभी केवल ${serviceRadiusKm} KM के अंदर ही delivery उपलब्ध है।`
      });
    }


    // ---------------------------------
    // CUSTOMER VALIDATION
    // ---------------------------------

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


    // ---------------------------------
    // CART VALIDATION
    // ---------------------------------

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


    // ---------------------------------
    // MERGE DUPLICATE PRODUCT QUANTITY
    // ---------------------------------

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

      const newQuantity =
        (quantities.get(id) || 0) + quantity;

      if (newQuantity > 20) {
        return res.status(400).json({
          success: false,
          message: "एक product की अधिकतम quantity 20 हो सकती है।"
        });
      }

      quantities.set(id, newQuantity);
    }


    // ---------------------------------
    // FETCH PRODUCTS
    // ---------------------------------

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


    // ---------------------------------
    // CHECK STOCK AND CALCULATE TOTAL
    // ---------------------------------

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

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: `${product.name} की कीमत सही नहीं है।`
        });
      }

      const lineTotal =
        Math.round(price * quantity * 100) / 100;

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
    // HHGS23 DELIVERY CHARGE
const deliveryCharge = subtotal >= 99 ? 0 : 20;

    const totalAmount =
      Math.round((subtotal + deliveryCharge) * 100) / 100;

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Order amount सही नहीं है।"
      });
    }


    // ---------------------------------
    // RECHECK LATEST SHOP LOCATION
    // BEFORE CREATING ORDER
    // ---------------------------------

    const latestShopConfig =
      await GSMarketConfig.findOne().lean();

    if (
      !latestShopConfig ||
      latestShopConfig.shopOpen !== true ||
      !Number.isFinite(latestShopConfig.shopLatitude) ||
      !Number.isFinite(latestShopConfig.shopLongitude)
    ) {
      return res.status(403).json({
        success: false,
        message: "दुकान अभी बंद हो गई है। कृपया बाद में कोशिश करें।"
      });
    }

    const latestConfiguredRadius =
      Number(latestShopConfig.serviceRadiusKm);

    const latestRadius =
      latestConfiguredRadius > 0
        ? latestConfiguredRadius
        : 2;

    const latestDistance = distanceInKm(
      latestShopConfig.shopLatitude,
      latestShopConfig.shopLongitude,
      customerLatitude,
      customerLongitude
    );

    if (latestDistance > latestRadius) {
      return res.status(403).json({
        success: false,
        code: "OUTSIDE_DELIVERY_RADIUS",
        distanceKm: Number(latestDistance.toFixed(2)),
        radiusKm: latestRadius,
        message:
          "दुकान की delivery location बदल गई है। आपकी location अब delivery radius से बाहर है।"
      });
    }


    // ---------------------------------
    // CREATE DATABASE ORDER
    // ---------------------------------

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


    // ---------------------------------
    // CREATE RAZORPAY ORDER
    // ---------------------------------

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

      await Order.deleteOne({
        _id: dbOrder._id
      });

      return res.status(502).json({
        success: false,
        message: "Payment शुरू नहीं हो पाया। कुछ देर बाद दोबारा कोशिश करें।"
      });
    }

  } catch (error) {
    console.error("Checkout create error:", error);

    return res.status(500).json({
      success: false,
      message: "Order बनाने में समस्या हुई।"
    });
  }
});


// =====================================
// VERIFY RAZORPAY PAYMENT
// =====================================

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

    const signatureBuffer = Buffer.from(
      expectedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      String(razorpay_signature),
      "utf8"
    );

    const validSignature =
      signatureBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        signatureBuffer,
        receivedBuffer
      );

    if (!validSignature) {
      order.paymentStatus = "Failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment signature verify नहीं हुआ।"
      });
    }


    // ---------------------------------
    // VERIFY PAYMENT WITH RAZORPAY
    // ---------------------------------

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


    // ---------------------------------
    // DECREASE INVENTORY AFTER PAYMENT
    // ---------------------------------

    let inventoryIssue = false;

    for (const item of order.items) {
      const result = await Product.updateOne(
        {
          _id: item.product,
          active: true,
          stock: { $gte: item.quantity }
        },
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );

      if (result.modifiedCount !== 1) {
        inventoryIssue = true;
      }
    }

    order.paymentStatus = "Paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    order.orderStatus = inventoryIssue
      ? "Pending"
      : "Confirmed";

    await order.save();

    return res.json({
      success: true,

      message: inventoryIssue
        ? "Payment सफल है। Stock की पुष्टि के लिए support से संपर्क करें।"
        : "Payment सफल! आपका order confirm हो गया है।",

      orderNumber: order.orderNumber
    });

  } catch (error) {
    console.error("Payment verify error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification में समस्या हुई। यदि पैसे कटे हैं तो दोबारा भुगतान न करें; order status जाँचें।"
    });
  }
});








// =====================================
// CUSTOMER ORDER TRACKING
// PHONE NUMBER ONLY - NO OTP
// =====================================

router.get("/track-order", (req, res) => {
    res.render("store/track-order");
});

router.post("/api/track-order", async (req, res) => {
    try {
        const phone = String(req.body.phone || "")
            .replace(/\D/g, "");

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "कृपया 10 अंकों का मोबाइल नंबर डालें।"
            });
        }

        const orders = await Order.find({
            "customer.phone": phone
        })
        .select(
            "orderNumber items subtotal deliveryCharge totalAmount paymentStatus orderStatus createdAt"
        )
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

        return res.json({
            success: true,
            count: orders.length,
            orders: orders.map(order => ({
                orderNumber: order.orderNumber,
                items: order.items.map(item => ({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                })),
                subtotal: order.subtotal,
                deliveryCharge: order.deliveryCharge,
                totalAmount: order.totalAmount,
                paymentStatus: order.paymentStatus,
                orderStatus: order.orderStatus,
                orderDate: order.createdAt
            }))
        });

    } catch (error) {
        console.error("Order tracking error:", error);

        return res.status(500).json({
            success: false,
            message: "Order tracking में समस्या हुई।"
        });
    }
});








// ==========================================
// GS MARKET CUSTOMER COMPLAINT SYSTEM
// ==========================================

// Customer complaint page
router.get("/complaints", (req, res) => {
    res.render("store/complaints");
});


// Submit complaint
router.post("/api/complaints", async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const phone = String(req.body.phone || "").replace(/\D/g, "");
        const orderNumber = String(req.body.orderNumber || "").trim();
        const complaintType = String(req.body.complaintType || "").trim();
        const message = String(req.body.message || "").trim();
        const paymentRef = String(req.body.paymentRef || "").trim();

        if (!name || !/^\d{10}$/.test(phone) ||
            !complaintType || message.length < 5) {
            return res.status(400).json({
                success: false,
                message: "सभी जरूरी जानकारी सही भरें।"
            });
        }

        const complaintId =
            "GS-CMP-" + Date.now().toString().slice(-8);

        const complaint = await Complaint.create({
            complaintId,
            name,
            phone,
            orderNumber,
            complaintType,
            message,
            paymentRef
        });

        res.json({
            success: true,
            complaintId: complaint.complaintId,
            message: "आपकी शिकायत सफलतापूर्वक दर्ज हो गई।"
        });

    } catch (error) {
        console.error("Complaint Submit Error:", error);

        res.status(500).json({
            success: false,
            message: "शिकायत दर्ज नहीं हो सकी। दोबारा प्रयास करें।"
        });
    }
});


// Customer checks complaint using phone number
router.post("/api/complaints/check", async (req, res) => {
    try {
        const phone = String(req.body.phone || "").replace(/\D/g, "");

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "10 अंकों का मोबाइल नंबर डालें।"
            });
        }

        const complaints = await Complaint.find({ phone })
            .select("complaintId complaintType status adminReply createdAt updatedAt")
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        res.json({
            success: true,
            complaints
        });

    } catch (error) {
        console.error("Complaint Check Error:", error);

        res.status(500).json({
            success: false,
            message: "शिकायत Status नहीं मिल सका।"
        });
    }
});


// ==========================================
// SHOPKEEPER COMPLAINT DASHBOARD
// ==========================================

function complaintAdminAuth(req, res, next) {
    if (!req.session || !req.session.shopkeeperLoggedIn) {
        return res.redirect("/shopkeeper/login");
    }

    next();
}


// Dashboard page
router.get(
    "/complaints/admin",
    complaintAdminAuth,
    async (req, res) => {
        try {
            const complaints = await Complaint.find()
                .sort({ createdAt: -1 })
                .limit(200)
                .lean();

            const counts = {
                total: await Complaint.countDocuments(),
                new: await Complaint.countDocuments({ status: "New" }),
                review: await Complaint.countDocuments({ status: "In Review" }),
                resolved: await Complaint.countDocuments({ status: "Resolved" }),
                rejected: await Complaint.countDocuments({ status: "Rejected" })
            };

            res.render("store/complaints-admin", {
                complaints,
                counts
            });

        } catch (error) {
            console.error("Complaint Dashboard Error:", error);
            res.status(500).send("Complaint Dashboard Error");
        }
    }
);


// Admin updates complaint
router.post(
    "/api/complaints/:id/update",
    complaintAdminAuth,
    async (req, res) => {
        try {
            const status = String(req.body.status || "");
            const adminReply = String(req.body.adminReply || "").trim();

            const allowed = [
                "New",
                "In Review",
                "Resolved",
                "Rejected"
            ];

            if (!allowed.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid complaint status"
                });
            }

            const complaint = await Complaint.findByIdAndUpdate(
                req.params.id,
                {
                    status,
                    adminReply,
                    updatedAt: new Date()
                },
                { new: true }
            );

            if (!complaint) {
                return res.status(404).json({
                    success: false,
                    message: "Complaint नहीं मिली।"
                });
            }

            res.json({
                success: true,
                message: "Complaint अपडेट हो गई।"
            });

        } catch (error) {
            console.error("Complaint Update Error:", error);

            res.status(500).json({
                success: false,
                message: "Update नहीं हो सका।"
            });
        }
    }
);





module.exports = router;
