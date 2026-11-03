
const mongoose = require("mongoose");

const gsMarketConfigSchema = new mongoose.Schema(
  {
    shopOpen: {
      type: Boolean,
      default: false
    },

    shopLatitude: {
      type: Number,
      default: null,
      min: -90,
      max: 90
    },

    shopLongitude: {
      type: Number,
      default: null,
      min: -180,
      max: 180
    },

    locationUpdatedAt: {
      type: Date,
      default: null
    },

    deliveryCharge: {
      type: Number,
      default: 20,
      min: 0
    },

    serviceRadiusKm: {
      type: Number,
      default: 2,
      min: 0
    }
  },
  {
    timestamps: true,
    collection: "gs_market_config"
  }
);

module.exports =
  mongoose.models.GSMarketConfig ||
  mongoose.model("GSMarketConfig", gsMarketConfigSchema);
