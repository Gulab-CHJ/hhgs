// const express = require("express");
// const mongoose = require("mongoose");

// const Product = require("../models/Product");
// const Order = require("../models/Order");

// const GSMarketConfig = require("../models/GSMarketConfig");

// const router = express.Router();



// /*
//  * SECURITY:
//  * नीचे req.session.admin एक उदाहरण है।
//  * इसे अपने मौजूदा HHGS Admin Login में इस्तेमाल होने वाली
//  * वास्तविक session property के अनुसार बदलें।
//  *
//  * Admin authentication के बिना इस router को public न छोड़ें।
//  */
// router.use((req, res, next) => {
//   const isAdmin =
//     Boolean(req.session?.adminId) ||
//     Boolean(req.session?.admin);

//   if (!isAdmin) {
//     return res.redirect("/admin");
//   }

//   next();
// });






// // GS Market Admin Dashboard
// router.get("/dashboard", async (req, res) => {
//   try {
//     const [products, orders, pending, paidOrders, config] =
//       await Promise.all([
//         Product.countDocuments(),
//         Order.countDocuments(),
//         Order.countDocuments({ orderStatus: "Pending" }),
//         Order.find({ paymentStatus: "Paid" })
//           .select("totalAmount")
//           .lean(),
//         GSMarketConfig.findOne().lean()
//       ]);

//     const sales = paidOrders.reduce((sum, order) => {
//       const amount = Number(order.totalAmount || 0);
//       return sum + (Number.isFinite(amount) ? amount : 0);
//     }, 0);

//     const GSMarketAdmin =
//       require("../pages/addpages/gsMarketAdmin");

//     return res.send(GSMarketAdmin({
//       products,
//       orders,
//       pending,
//       sales,
//       shopOpen: config ? config.shopOpen : true,
//       deliveryCharge: config ? config.deliveryCharge : 20,
//       radius: config ? config.serviceRadiusKm : 2,
//       message: req.query.message || ""
//     }));
//   } catch (error) {
//     console.error("GS Market dashboard error:", error);
//     return res.status(500).send("GS Market Dashboard load नहीं हुआ।");
//   }
// });


// // Shop Open / Close
// // router.post("/shop-status", async (req, res) => {
// //   try {
// //     const requested = req.body.shopOpen;

// //     if (requested !== "true" && requested !== "false") {
// //       return res.status(400).send("Invalid shop status.");
// //     }

// //     await GSMarketConfig.findOneAndUpdate(
// //       {},
// //       {
// //         $set: {
// //           shopOpen: requested === "true",
// //           deliveryCharge: 20,
// //           serviceRadiusKm: 2
// //         }
// //       },
// //       {
// //         upsert: true,
// //         new: true,
// //         setDefaultsOnInsert: true,
// //         runValidators: true
// //       }
// //     );

// //     return res.redirect(
// //       "/admin/market/dashboard?message=" +
// //       encodeURIComponent(
// //         requested === "true"
// //           ? "Shop opened successfully"
// //           : "Shop closed successfully"
// //       )
// //     );
// //   } catch (error) {
// //     console.error("GS Market shop status error:", error);
// //     return res.status(500).send("Shop status update नहीं हो पाया।");
// //   }
// // });



// // =====================================
// // GS MARKET SHOP OPEN / CLOSE
// // =====================================
// router.post("/shop-status", async (req, res) => {
//     try {
//         console.log("GS Market Shop Status Request:", req.body);

//         const requested = req.body.shopOpen;

//         if (requested !== "true" && requested !== "false") {
//             return res.status(400).send("Invalid shop status.");
//         }

//         const updatedConfig = await GSMarketConfig.findOneAndUpdate(
//             {},
//             {
//                 $set: {
//                     shopOpen: requested === "true",
//                     deliveryCharge: 20,
//                     serviceRadiusKm: 2
//                 }
//             },
//             {
//                 upsert: true,
//                 returnDocument: "after",
//                 setDefaultsOnInsert: true,
//                 runValidators: true
//             }
//         );

//         console.log(
//             "GS Market Status Saved:",
//             updatedConfig.shopOpen
//         );

//         return res.redirect("/admin/market/dashboard");

//     } catch (error) {
//         console.error("GS Market Status Error:", error);

//         return res.status(500).send(
//             "Shop status update failed: " + error.message
//         );
//     }
// });


// // Products list
// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find()
//       .sort({ createdAt: -1 })
//       .lean();

//     res.render("store/admin-products", {
//       products,
//       message: req.query.message || ""
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Products load नहीं हो सके।");
//   }
// });

// // Add product
// router.post("/products/add", async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       brand,
//       price,
//       mrp,
//       stock,
//       image,
//       description
//     } = req.body;

//     if (!name || !category || price === "") {
//       return res.status(400).send(
//         "Product name, category और price जरूरी हैं।"
//       );
//     }

//     const parsedPrice = Number(price);
//     const parsedMrp = Number(mrp || 0);
//     const parsedStock = Number(stock || 0);

//     if (
//       !Number.isFinite(parsedPrice) ||
//       parsedPrice < 0 ||
//       !Number.isFinite(parsedMrp) ||
//       parsedMrp < 0 ||
//       !Number.isInteger(parsedStock) ||
//       parsedStock < 0
//     ) {
//       return res.status(400).send("Price या stock सही नहीं है।");
//     }

//     await Product.create({
//       name: String(name).trim(),
//       category: String(category).trim(),
//       brand: String(brand || "").trim(),
//       price: parsedPrice,
//       mrp: parsedMrp,
//       stock: parsedStock,
//       image: String(image || "").trim(),
//       description: String(description || "").trim(),
//       active: true
//     });

//     res.redirect("/admin/market/products?message=Product%20added");
//   } catch (error) {
//     console.error("Add product error:", error);
//     res.status(500).send("Product add नहीं हो पाया।");
//   }
// });

// // Edit product
// router.post("/products/edit/:id", async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send("Invalid product ID");
//     }

//     const {
//       name,
//       category,
//       brand,
//       price,
//       mrp,
//       stock,
//       image,
//       description,
//       active
//     } = req.body;

//     const parsedPrice = Number(price);
//     const parsedMrp = Number(mrp || 0);
//     const parsedStock = Number(stock || 0);

//     if (
//       !name ||
//       !category ||
//       !Number.isFinite(parsedPrice) ||
//       parsedPrice < 0 ||
//       !Number.isFinite(parsedMrp) ||
//       parsedMrp < 0 ||
//       !Number.isInteger(parsedStock) ||
//       parsedStock < 0
//     ) {
//       return res.status(400).send("Product details सही भरें।");
//     }

//     await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: String(name).trim(),
//         category: String(category).trim(),
//         brand: String(brand || "").trim(),
//         price: parsedPrice,
//         mrp: parsedMrp,
//         stock: parsedStock,
//         image: String(image || "").trim(),
//         description: String(description || "").trim(),
//         active: active === "on"
//       },
//       { runValidators: true }
//     );

//     res.redirect("/admin/market/products?message=Product%20updated");
//   } catch (error) {
//     console.error("Edit product error:", error);
//     res.status(500).send("Product update नहीं हो पाया।");
//   }
// });

// // Delete product
// router.post("/products/delete/:id", async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send("Invalid product ID");
//     }

//     // Keep past order history intact; only delete the product record.
//     await Product.findByIdAndDelete(req.params.id);

//     res.redirect("/admin/market/products?message=Product%20deleted");
//   } catch (error) {
//     console.error("Delete product error:", error);
//     res.status(500).send("Product delete नहीं हो पाया।");
//   }
// });

// // Customer orders list
// router.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .sort({ createdAt: -1 })
//       .lean();

//     res.render("store/admin-orders", {
//       orders,
//       message: req.query.message || ""
//     });
//   } catch (error) {
//     console.error("Admin orders error:", error);
//     res.status(500).send("Orders load नहीं हो सके।");
//   }
// });

// // Update order status
// router.post("/orders/status/:id", async (req, res) => {
//   try {
//     const allowedStatuses = [
//       "Pending",
//       "Confirmed",
//       "Shipped",
//       "Delivered",
//       "Cancelled"
//     ];

//     const status = req.body.orderStatus;

//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).send("Invalid order ID");
//     }

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).send("Invalid order status");
//     }

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).send("Order नहीं मिला।");
//     }

//     // Never dispatch an order whose payment is still pending.
//     if (
//       ["Confirmed", "Shipped", "Delivered"].includes(status) &&
//       order.paymentStatus !== "Paid"
//     ) {
//       return res.status(400).send(
//         "Payment verify होने के बाद ही order confirm/ship/deliver करें।"
//       );
//     }

//     order.orderStatus = status;
//     await order.save();

//     res.redirect("/admin/market/orders?message=Status%20updated");
//   } catch (error) {
//     console.error("Update status error:", error);
//     res.status(500).send("Order status update नहीं हुआ।");
//   }
// });

// module.exports = router;




const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const Product = require("../models/Product");
const Order = require("../models/Order");
const GSMarketConfig = require("../models/GSMarketConfig");

const router = express.Router();

// =====================================
// GS MARKET ADMIN AUTHENTICATION
// =====================================
router.use((req, res, next) => {
  const isAdmin =
    Boolean(req.session?.adminId) ||
    Boolean(req.session?.admin);

  if (!isAdmin) {
    return res.redirect("/admin");
  }

  next();
});

// =====================================
// PRODUCT IMAGE UPLOAD CONFIGURATION
// Saves files to public/uploads/market
// =====================================
const uploadDir = path.join(
  __dirname,
  "../public/uploads/market"
);

fs.mkdirSync(uploadDir, { recursive: true });

const allowedImageTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = allowedImageTypes[file.mimetype];

    if (!extension) {
      return cb(
        new Error("केवल JPG, PNG और WebP इमेज स्वीकार हैं।")
      );
    }

    const filename =
      Date.now() +
      "-" +
      crypto.randomBytes(8).toString("hex") +
      extension;

    cb(null, filename);
  }
});

const uploadProductImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 6
  },
  fileFilter: (req, file, cb) => {
    if (!allowedImageTypes[file.mimetype]) {
      return cb(
        new Error("केवल JPG, PNG और WebP इमेज अपलोड करें।")
      );
    }

    cb(null, true);
  }
}).fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 }
]);

function imageUrl(file) {
  return file
    ? `/uploads/market/${file.filename}`
    : "";
}

function uploadedFilesFromRequest(req) {
  return [
    ...(req.files?.image || []),
    ...(req.files?.images || [])
  ];
}

function removeUploadedFiles(files) {
  for (const file of files) {
    fs.unlink(file.path, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Uploaded file cleanup error:", err);
      }
    });
  }
}

// =====================================
// DASHBOARD
// =====================================
router.get("/dashboard", async (req, res) => {
  try {
    const [
      products,
      orders,
      pending,
      paidOrders,
      config
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "Pending" }),
      Order.find({ paymentStatus: "Paid" })
        .select("totalAmount")
        .lean(),
      GSMarketConfig.findOne().lean()
    ]);

    const sales = paidOrders.reduce((sum, order) => {
      const amount = Number(order.totalAmount || 0);
      return sum + (
        Number.isFinite(amount) ? amount : 0
      );
    }, 0);

    const GSMarketAdmin =
      require("../pages/addpages/gsMarketAdmin");

    return res.send(
      GSMarketAdmin({
        products,
        orders,
        pending,
        sales,
        shopOpen: config ? config.shopOpen : true,
        deliveryCharge: config
          ? config.deliveryCharge
          : 20,
        radius: config
          ? config.serviceRadiusKm
          : 2,
        message: req.query.message || ""
      })
    );
  } catch (error) {
    console.error("GS Market dashboard error:", error);
    return res.status(500).send(
      "GS Market Dashboard load नहीं हुआ।"
    );
  }
});

// =====================================
// SHOP OPEN / CLOSE
// =====================================
router.post("/shop-status", async (req, res) => {
  try {
    const requested = req.body.shopOpen;

    if (
      requested !== "true" &&
      requested !== "false"
    ) {
      return res.status(400).send(
        "Invalid shop status."
      );
    }

    await GSMarketConfig.findOneAndUpdate(
      {},
      {
        $set: {
          shopOpen: requested === "true",
          deliveryCharge: 20,
          serviceRadiusKm: 2
        }
      },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
        runValidators: true
      }
    );

    return res.redirect(
      "/admin/market/dashboard?message=" +
      encodeURIComponent("Shop status updated")
    );
  } catch (error) {
    console.error("GS Market status error:", error);

    return res.status(500).send(
      "Shop status update नहीं हो पाया।"
    );
  }
});

// =====================================
// PRODUCTS LIST
// =====================================
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.render("store/admin-products", {
      products,
      message: req.query.message || ""
    });
  } catch (error) {
    console.error("Products list error:", error);

    return res.status(500).send(
      "Products load नहीं हो सके।"
    );
  }
});

// =====================================
// ADD PRODUCT WITH IMAGE UPLOAD
// =====================================
router.post(
  "/products/add",
  (req, res, next) => {
    uploadProductImages(req, res, async (uploadError) => {
      if (uploadError) {
        console.error(
          "Product upload error:",
          uploadError.message
        );

        return res.status(400).send(
          "Image upload error: " + uploadError.message
        );
      }

      const uploadedFiles = uploadedFilesFromRequest(req);

      try {
        const {
          name,
          category,
          brand,
          price,
          mrp,
          stock,
          description
        } = req.body;

        if (
          !String(name || "").trim() ||
          !String(category || "").trim() ||
          price === undefined ||
          price === ""
        ) {
          removeUploadedFiles(uploadedFiles);

          return res.status(400).send(
            "Product name, category और price जरूरी हैं।"
          );
        }

        const parsedPrice = Number(price);
        const parsedMrp = Number(mrp || 0);
        const parsedStock = Number(stock || 0);

        if (
          !Number.isFinite(parsedPrice) ||
          parsedPrice < 0 ||
          !Number.isFinite(parsedMrp) ||
          parsedMrp < 0 ||
          !Number.isInteger(parsedStock) ||
          parsedStock < 0
        ) {
          removeUploadedFiles(uploadedFiles);

          return res.status(400).send(
            "Price या stock सही नहीं है।"
          );
        }

        const mainImage = imageUrl(
          req.files?.image?.[0]
        );

        const extraImages = (
          req.files?.images || []
        ).map(imageUrl);

        await Product.create({
          name: String(name).trim(),
          category: String(category).trim(),
          brand: String(brand || "").trim(),
          price: parsedPrice,
          mrp: parsedMrp,
          stock: parsedStock,
          image:
            mainImage ||
            String(req.body.image || "").trim(),
          images: extraImages,
          description: String(
            description || ""
          ).trim(),
          active: true
        });

        return res.redirect(
          "/admin/market/products?message=" +
          encodeURIComponent("Product added successfully")
        );
      } catch (error) {
        removeUploadedFiles(uploadedFiles);

        console.error("Add product error:", error);

        return res.status(500).send(
          "Product add नहीं हो पाया। Product model में images field भी जाँचें।"
        );
      }
    });
  }
);

// =====================================
// EDIT PRODUCT WITH OPTIONAL NEW IMAGES
// Existing images are kept if no new ones are uploaded.
// =====================================
router.post(
  "/products/edit/:id",
  (req, res, next) => {
    uploadProductImages(req, res, async (uploadError) => {
      if (uploadError) {
        console.error(
          "Product edit upload error:",
          uploadError.message
        );

        return res.status(400).send(
          "Image upload error: " + uploadError.message
        );
      }

      const uploadedFiles = uploadedFilesFromRequest(req);

      try {
        if (!mongoose.isValidObjectId(req.params.id)) {
          removeUploadedFiles(uploadedFiles);

          return res.status(400).send(
            "Invalid product ID"
          );
        }

        const {
          name,
          category,
          brand,
          price,
          mrp,
          stock,
          image,
          description,
          active
        } = req.body;

        const parsedPrice = Number(price);
        const parsedMrp = Number(mrp || 0);
        const parsedStock = Number(stock || 0);

        if (
          !String(name || "").trim() ||
          !String(category || "").trim() ||
          price === undefined ||
          price === "" ||
          !Number.isFinite(parsedPrice) ||
          parsedPrice < 0 ||
          !Number.isFinite(parsedMrp) ||
          parsedMrp < 0 ||
          !Number.isInteger(parsedStock) ||
          parsedStock < 0
        ) {
          removeUploadedFiles(uploadedFiles);

          return res.status(400).send(
            "Product details सही भरें।"
          );
        }

        const existingProduct =
          await Product.findById(req.params.id);

        if (!existingProduct) {
          removeUploadedFiles(uploadedFiles);

          return res.status(404).send(
            "Product नहीं मिला।"
          );
        }

        const newMainImage = imageUrl(
          req.files?.image?.[0]
        );

        const newExtraImages = (
          req.files?.images || []
        ).map(imageUrl);

        // Keep current main image if no replacement is uploaded.
        const finalMainImage =
          newMainImage ||
          String(image || "").trim() ||
          existingProduct.image ||
          "";

        // Keep current extra images unless new ones are uploaded.
        const finalExtraImages =
          newExtraImages.length > 0
            ? [
                ...(Array.isArray(existingProduct.images)
                  ? existingProduct.images
                  : []),
                ...newExtraImages
              ]
            : (
                Array.isArray(existingProduct.images)
                  ? existingProduct.images
                  : []
              );

        existingProduct.name = String(name).trim();
        existingProduct.category = String(category).trim();
        existingProduct.brand = String(brand || "").trim();
        existingProduct.price = parsedPrice;
        existingProduct.mrp = parsedMrp;
        existingProduct.stock = parsedStock;
        existingProduct.image = finalMainImage;
        existingProduct.images = finalExtraImages;
        existingProduct.description = String(
          description || ""
        ).trim();
        existingProduct.active = active === "on";

        await existingProduct.save();

        return res.redirect(
          "/admin/market/products?message=" +
          encodeURIComponent("Product updated successfully")
        );
      } catch (error) {
        removeUploadedFiles(uploadedFiles);

        console.error("Edit product error:", error);

        return res.status(500).send(
          "Product update नहीं हो पाया।"
        );
      }
    });
  }
);

// =====================================
// DELETE PRODUCT
// Order history remains untouched.
// =====================================
router.post("/products/delete/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send(
        "Invalid product ID"
      );
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.redirect(
      "/admin/market/products?message=" +
      encodeURIComponent("Product deleted")
    );
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).send(
      "Product delete नहीं हो पाया।"
    );
  }
});

// =====================================
// CUSTOMER ORDERS LIST
// =====================================
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.render("store/admin-orders", {
      orders,
      message: req.query.message || ""
    });
  } catch (error) {
    console.error("Admin orders error:", error);

    return res.status(500).send(
      "Orders load नहीं हो सके।"
    );
  }
});

// =====================================
// UPDATE ORDER STATUS
// =====================================
router.post("/orders/status/:id", async (req, res) => {
  try {
    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    const status = req.body.orderStatus;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send(
        "Invalid order ID"
      );
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).send(
        "Invalid order status"
      );
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send(
        "Order नहीं मिला।"
      );
    }

    if (
      ["Confirmed", "Shipped", "Delivered"].includes(status) &&
      order.paymentStatus !== "Paid"
    ) {
      return res.status(400).send(
        "Payment verify होने के बाद ही order confirm/ship/deliver करें।"
      );
    }

    order.orderStatus = status;
    await order.save();

    return res.redirect(
      "/admin/market/orders?message=" +
      encodeURIComponent("Status updated")
    );
  } catch (error) {
    console.error("Update status error:", error);

    return res.status(500).send(
      "Order status update नहीं हुआ।"
    );
  }
});

module.exports = router;
