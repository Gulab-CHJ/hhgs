// ============================================
// routes/cart.js
// DOCTOR CART ROUTES
// ============================================

const express = require("express");

const router = express.Router();

const Cart = require("../models/Cart");


// ============================================
// GET CART
// GET /api/cart
// GET /api/cart?doctorId=XXXX
// ============================================

router.get("/", async (req, res) => {

    try {

        const doctorId =
            req.query.doctorId ||
            req.session?.doctor?._id ||
            req.session?.doctor?.id ||
            "";

        console.log(
            "GET CART DOCTOR ID:",
            doctorId
        );


        if (!doctorId) {

            return res.json({

                success: true,

                cart: []

            });

        }


        const cart =
            await Cart.findOne({
                doctorId: doctorId
            });


        console.log(
            "CART FROM DATABASE:",
            cart
        );


        if (!cart) {

            return res.json({

                success: true,

                cart: []

            });

        }


        return res.json({

            success: true,

            cart: Array.isArray(cart.items)
                ? cart.items
                : []

        });

    } catch (error) {

        console.error(
            "GET CART ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to load cart",

            error:
                error.message

        });

    }

});


// ============================================
// ADD TO CART
// POST /api/cart
// ============================================

router.post("/", async (req, res) => {

    try {

        const {

            doctorId,

            productId,

            name,

            price,

            quantity,

            image

        } = req.body;


        console.log(
            "ADD CART REQUEST:",
            req.body
        );


        if (!doctorId) {

            return res.status(400).json({

                success: false,

                message:
                    "Doctor ID is required"

            });

        }


        if (!productId) {

            return res.status(400).json({

                success: false,

                message:
                    "Product ID is required"

            });

        }


        const itemQuantity =
            Number(quantity) > 0
                ? Number(quantity)
                : 1;


        let cart =
            await Cart.findOne({
                doctorId: doctorId
            });


        // =====================================
        // CREATE CART
        // =====================================

        if (!cart) {

            cart =
                new Cart({

                    doctorId: doctorId,

                    items: [

                        {

                            productId:
                                productId,

                            name:
                                name || "Product",

                            price:
                                Number(price) || 0,

                            quantity:
                                itemQuantity,

                            image:
                                image || ""

                        }

                    ]

                });


        } else {


            // =================================
            // FIND EXISTING ITEM
            // =================================

            const existingItem =
                cart.items.find(
                    item =>
                        String(
                            item.productId
                        ) ===
                        String(
                            productId
                        )
                );


            if (existingItem) {

                existingItem.quantity +=
                    itemQuantity;

            } else {

                cart.items.push({

                    productId:
                        productId,

                    name:
                        name || "Product",

                    price:
                        Number(price) || 0,

                    quantity:
                        itemQuantity,

                    image:
                        image || ""

                });

            }

        }


        await cart.save();


        console.log(
            "CART SAVED:",
            cart
        );


        return res.json({

            success: true,

            message:
                "Product added to cart",

            cart:
                cart.items

        });

    } catch (error) {

        console.error(
            "ADD CART ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to add product to cart",

            error:
                error.message

        });

    }

});


// ============================================
// CLEAR CART
// DELETE /api/cart/clear
// ============================================

router.delete("/clear", async (req, res) => {

    try {

        const doctorId =
            req.body.doctorId ||
            req.session?.doctor?._id ||
            req.session?.doctor?.id ||
            "";


        if (!doctorId) {

            return res.status(400).json({

                success: false,

                message:
                    "Doctor ID is required"

            });

        }


        await Cart.findOneAndDelete({

            doctorId: doctorId

        });


        return res.json({

            success: true,

            message:
                "Cart cleared"

        });

    } catch (error) {

        console.error(
            "CLEAR CART ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to clear cart",

            error:
                error.message

        });

    }

});


module.exports = router;