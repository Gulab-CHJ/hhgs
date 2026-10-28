const mongoose = require("mongoose");

const gsMarketConfigSchema = new mongoose.Schema(
  {
    shopOpen: {
      type: Boolean,
      default: true
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