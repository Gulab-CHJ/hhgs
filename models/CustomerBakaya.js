
const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["DUE", "PAID"],
    required: true
  },
  amount: { type: Number, required: true, min: 0.01 },
  reason: { type: String, default: "" },
  date: { type: Date, default: Date.now }
}, { _id: true });

const CustomerBakayaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneLast4: {
    type: String,
    required: true,
    match: /^\d{4}$/
  },
  aadhaarLast4: {
    type: String,
    required: true,
    match: /^\d{4}$/
  },
  pinHash: { type: String, required: true },
  entries: [EntrySchema]
}, { timestamps: true });

module.exports = mongoose.model(
  "CustomerBakaya",
  CustomerBakayaSchema
);
