const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// ======================================================
// GET CART
// GET /api/cart
// ======================================================

router.get("/", async (req, res) => {
    try {

        const doctorId =
            req.session?.doctor?.doctorId ||
            req.session?.doctorId ||
            "";

        console.log("================================");
        console.log("GET CART");
        console.log("SESSION DOCTOR ID:", doctorId);
        console.log("================================");

        if (!doctorId) {
            return res.status(401).json({
                success: false,
                message: "Doctor not logged in",
                cart: []
            });
        }

        const cart = await Cart.findOne({
            doctorId: String(doctorId)
        }).lean();

        console.log("CART FROM DATABASE:", cart);

        if (!cart) {
            return res.json({
                success: true,
                cart: []
            });
        }

        const items = Array.isArray(cart.items)
            ? cart.items
            : [];

        const formattedCart = items.map(item => {

            const quantity = Number(
                item.quantity ||
                item.qty ||
                1
            );

            return {
                id: String(item.productId || ""),
                productId: String(item.productId || ""),
                name: item.name || "Product",
                price: Number(item.price || 0),
                image: item.image || "",
                quantity: quantity,
                qty: quantity
            };

        });

        return res.json({
            success: true,
            cart: formattedCart
        });

    } catch (error) {

        console.error("GET CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load cart",
            cart: []
        });
    }
});


// ======================================================
// ADD TO CART
// POST /api/cart
// ======================================================

router.post("/", async (req, res) => {
    try {

        const doctorId =
            req.session?.doctor?.doctorId ||
            req.session?.doctorId ||
            req.body?.doctorId ||
            "";

        console.log("================================");
        console.log("ADD TO CART");
        console.log("DOCTOR ID:", doctorId);
        console.log("BODY:", req.body);
        console.log("================================");

        if (!doctorId) {
            return res.status(401).json({
                success: false,
                message: "Doctor not logged in"
            });
        }

        const {
            productId,
            name,
            price,
            quantity,
            qty,
            image
        } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const itemQuantity =
            Number(quantity || qty || 1) > 0
                ? Number(quantity || qty || 1)
                : 1;

        let cart = await Cart.findOne({
            doctorId: String(doctorId)
        });

        // ==================================================
        // CREATE NEW CART
        // ==================================================

        if (!cart) {

            cart = new Cart({
                doctorId: String(doctorId),

                items: [
                    {
                        productId: String(productId),
                        name: name || "Product",
                        price: Number(price) || 0,
                        quantity: itemQuantity,
                        image: image || ""
                    }
                ]
            });

        }

        // ==================================================
        // EXISTING CART
        // ==================================================

        else {

            if (!Array.isArray(cart.items)) {
                cart.items = [];
            }

            const existingItem = cart.items.find(
                item =>
                    String(item.productId) ===
                    String(productId)
            );

            if (existingItem) {

                existingItem.quantity =
                    Number(
                        existingItem.quantity ||
                        existingItem.qty ||
                        0
                    ) + itemQuantity;

            } else {

                cart.items.push({
                    productId: String(productId),
                    name: name || "Product",
                    price: Number(price) || 0,
                    quantity: itemQuantity,
                    image: image || ""
                });

            }
        }

        await cart.save();

        console.log("CART SAVED SUCCESSFULLY:");
        console.log(cart);

        return res.json({
            success: true,
            message: "Product added to cart",
            cart: cart.items
        });

    } catch (error) {

        console.error("ADD TO CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to add product to cart",
            error: error.message
        });
    }
});


// ======================================================
// UPDATE CART ITEM
// PUT /api/cart/:productId
// ======================================================

router.put("/:productId", async (req, res) => {
    try {

        const doctorId =
            req.session?.doctor?.doctorId ||
            req.session?.doctorId ||
            "";

        const productId = req.params.productId;

        const quantity = Number(
            req.body.quantity ||
            req.body.qty
        );

        if (!doctorId) {
            return res.status(401).json({
                success: false,
                message: "Doctor not logged in"
            });
        }

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }

        const cart = await Cart.findOne({
            doctorId: String(doctorId)
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item =>
                String(item.productId) ===
                String(productId)
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        return res.json({
            success: true,
            message: "Cart updated",
            cart: cart.items
        });

    } catch (error) {

        console.error("UPDATE CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update cart",
            error: error.message
        });
    }
});


// ======================================================
// REMOVE ITEM
// DELETE /api/cart/:productId
// ======================================================

router.delete("/:productId", async (req, res) => {
    try {

        const doctorId =
            req.session?.doctor?.doctorId ||
            req.session?.doctorId ||
            "";

        const productId = req.params.productId;

        if (!doctorId) {
            return res.status(401).json({
                success: false,
                message: "Doctor not logged in"
            });
        }

        const cart = await Cart.findOne({
            doctorId: String(doctorId)
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item =>
                String(item.productId) !==
                String(productId)
        );

        await cart.save();

        return res.json({
            success: true,
            message: "Product removed",
            cart: cart.items
        });

    } catch (error) {

        console.error("REMOVE CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to remove product",
            error: error.message
        });
    }
});


// ======================================================
// CLEAR CART
// DELETE /api/cart/clear
// ======================================================

router.delete("/clear", async (req, res) => {
    try {

        const doctorId =
            req.session?.doctor?.doctorId ||
            req.session?.doctorId ||
            "";

        if (!doctorId) {
            return res.status(401).json({
                success: false,
                message: "Doctor not logged in"
            });
        }

        await Cart.findOneAndDelete({
            doctorId: String(doctorId)
        });

        return res.json({
            success: true,
            message: "Cart cleared",
            cart: []
        });

    } catch (error) {

        console.error("CLEAR CART ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to clear cart"
        });
    }
});


module.exports = router;