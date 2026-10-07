const mongoose = require("mongoose");

const quickShopSettingSchema =
new mongoose.Schema({

    isOpen:{
        type:Boolean,
        default:true
    },

    deliveryRadiusKm:{
        type:Number,
        default:2
    },

    deliveryCharge:{
        type:Number,
        default:20
    },

    shopLatitude:{
        type:Number,
        default:0
    },

    shopLongitude:{
        type:Number,
        default:0
    },

    updatedAt:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "QuickShopSetting",
    quickShopSettingSchema
);