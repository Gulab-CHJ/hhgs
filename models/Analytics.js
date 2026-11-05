
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ["pageview", "install"],
        required: true,
        index: true
    },

    visitorHash: {
        type: String,
        required: true,
        index: true
    },

    path: {
        type: String,
        default: "/"
    },

    device: {
        type: String,
        enum: ["Mobile", "Desktop", "Tablet"],
        default: "Desktop"
    },

    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Date-based analytics queries
analyticsSchema.index({ createdAt: -1, eventType: 1 });
analyticsSchema.index({ path: 1, createdAt: -1 });

module.exports = mongoose.model("Analytics", analyticsSchema);
