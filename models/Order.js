// const mongoose = require("mongoose");


// const orderSchema = new mongoose.Schema({

// doctorId:{
// type:String,
// required:true
// },

// doctorName:String,

// products:[{

// productId:String,
// name:String,
// price:Number,
// qty:Number

// }],


// total:Number,


// status:{
// type:String,
// default:"Pending"
// },


// createdAt:{
// type:Date,
// default:Date.now
// }


// });


// module.exports = mongoose.model("Order",orderSchema);



const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },

      phone: {
        type: String,
        required: true,
        trim: true
      },

      address: {
        type: String,
        required: true,
        trim: true
      }
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: items => items.length > 0,
        message: "Order must contain at least one product"
      }
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    paymentMethod: {
      type: String,
      enum: ["Razorpay"],
      default: "Razorpay"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending"
    },

    razorpayOrderId: {
      type: String,
      default: ""
    },

    razorpayPaymentId: {
      type: String,
      default: ""
    },

    razorpaySignature: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    collection: "orders"
  }
);

module.exports =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);