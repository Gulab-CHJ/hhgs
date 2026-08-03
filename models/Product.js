const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    // Basic Details
    name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },

    manufacturer: {
        type: String,
        default: ""
    },

    // Pricing
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

    // Medicine Details
    packSize: {
        type: String,
        default: ""
    },

    batchNo: {
        type: String,
        default: ""
    },

    mfgDate: {
        type: String,
        default: ""
    },

    expDate: {
        type: String,
        default: ""
    },

    // Multiple Composition
    composition: [{
        type: String
    }],

    // Multiple Images
    images: [{
        type: String
    }],

    // Main Image
    image: {
        type: String,
        default: ""
    },

    // Description
    description: {
        type: String,
        default: ""
    },

    uses: {
        type: String,
        default: ""
    },

    benefits: {
        type: String,
        default: ""
    },

    dosage: {
        type: String,
        default: ""
    },

    sideEffects: {
        type: String,
        default: ""
    },

    storage: {
        type: String,
        default: ""
    },

    // Status
    active: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
mongoose.models.Product ||
mongoose.model("Product", productSchema);