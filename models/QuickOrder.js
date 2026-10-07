const mongoose = require("mongoose");

const quickOrderSchema =
new mongoose.Schema({

    orderId:{
        type:String,
        unique:true
    },

    customerName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    distanceKm:{
        type:Number,
        default:0
    },

    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"QuickService",
        required:true
    },

    serviceName:{
        type:String,
        required:true
    },

    serviceType:{
        type:String,
        default:"normal"
    },

    documents:[
        {
            documentName:String,
            fileName:String,
            originalName:String
        }
    ],

    copies:{
        type:Number,
        default:1
    },

    printType:{
        type:String,
        default:"Black & White"
    },

    serviceAmount:{
        type:Number,
        default:0
    },

    deliveryCharge:{
        type:Number,
        default:0
    },

    totalAmount:{
        type:Number,
        default:0
    },

    paymentStatus:{
        type:String,
        enum:[
            "PENDING",
            "PAID",
            "FAILED",
            "COD"
        ],
        default:"PENDING"
    },

    razorpayOrderId:{
        type:String,
        default:""
    },

    razorpayPaymentId:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:[
            "NEW",
            "PROCESSING",
            "READY",
            "PACKED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ],
        default:"NEW"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports =
mongoose.model(
    "QuickOrder",
    quickOrderSchema
);