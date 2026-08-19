const mongoose = require("mongoose");

const vegetableOrderSchema =
    new mongoose.Schema(
        {
            customerName: {
                type: String,
                required: true
            },

            mobile: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            items: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "VegetableProduct"
                    },

                    name: String,
                    unit: String,

                    price: {
                        type: Number,
                        default: 0
                    },

                    quantity: {
                        type: Number,
                        default: 1
                    },

                    amount: {
                        type: Number,
                        default: 0
                    }
                }
            ],

            subtotal: {
                type: Number,
                default: 0
            },

            deliveryCharge: {
                type: Number,
                default: 0
            },

            totalAmount: {
                type: Number,
                default: 0
            },

            paymentMethod: {
                type: String,
                default: "COD"
            },

            status: {
                type: String,

                enum: [
                    "Pending",
                    "Accepted",
                    "Preparing",
                    "Out for Delivery",
                    "Delivered",
                    "Cancelled"
                ],

                default: "Pending"
            }
        },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model(
    "VegetableOrder",
    vegetableOrderSchema
);