
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // =============================
    // BASIC DETAILS
    // =============================
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },

    category: {
      type: String,
      trim: true,
      default: "other"
    },

    brand: {
      type: String,
      trim: true,
      default: ""
    },

    manufacturer: {
      type: String,
      trim: true,
      default: ""
    },

    // =============================
    // PRICING AND STOCK
    // =============================
    price: {
      type: Number,
      required: true,
      min: 0
    },

    mrp: {
      type: Number,
      default: 0,
      min: 0
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    // =============================
    // MAIN IMAGE (Cloudinary URL)
    // =============================
    image: {
      type: String,
      default: ""
    },

    // MULTIPLE IMAGES (Cloudinary URLs)
    images: {
      type: [String],
      default: []
    },

    // =============================
    // PRODUCT VIDEO
    // =============================
    video: {
      type: String,
      default: ""
    },

    videos: {
      type: [String],
      default: []
    },

    // =============================
    // MEDICINE DETAILS
    // =============================
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

    composition: {
      type: [String],
      default: []
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

    // =============================
    // DESCRIPTION
    // =============================
    description: {
      type: String,
      default: "",
      maxlength: 3000
    },

    // =============================
    // STATUS
    // =============================
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "products"
  }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
