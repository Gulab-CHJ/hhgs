const mongoose = require("mongoose");

const shopSettingSchema = new mongoose.Schema(
    {
        shopName: {
            type: String,
            default: "GLOBAL MINI SABJI"
        },

        isOpen: {
            type: Boolean,
            default: true
        },

        deliveryCharge: {
            type: Number,
            default: 0
        },

        minimumOrder: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "ShopSetting",
    shopSettingSchema
);