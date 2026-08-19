const mongoose = require("mongoose");

const vegetableProductSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true
            },

            category: {
                type: String,
                default: "Vegetable"
            },

            unit: {
                type: String,
                default: "1 KG"
            },

            mrp: {
                type: Number,
                default: 0
            },

            price: {
                type: Number,
                required: true
            },

            stock: {
                type: Number,
                default: 0
            },

            image: {
                type: String,
                default: ""
            },

            description: {
                type: String,
                default: ""
            },

            isActive: {
                type: Boolean,
                default: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model(
    "VegetableProduct",
    vegetableProductSchema
);