// ============================================
// models/Cart.js
// ============================================

const mongoose = require("mongoose");


const CartItemSchema =
    new mongoose.Schema({

        productId: {

            type: mongoose.Schema.Types.ObjectId,

            required: true

        },

        name: {

            type: String,

            default: ""

        },

        price: {

            type: Number,

            default: 0

        },

        quantity: {

            type: Number,

            default: 1,

            min: 1

        },

        image: {

            type: String,

            default: ""

        }

    });


const CartSchema =
    new mongoose.Schema({

        doctorId: {

            type: mongoose.Schema.Types.ObjectId,

            required: true,

            index: true

        },

        items: {

            type: [CartItemSchema],

            default: []

        }

    }, {

        timestamps: true

    });


module.exports =
    mongoose.models.Cart ||
    mongoose.model(
        "Cart",
        CartSchema
    );