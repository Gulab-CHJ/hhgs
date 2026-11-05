const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
    complaintId: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        index: true
    },

    orderNumber: {
        type: String,
        default: ""
    },

    complaintType: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    paymentRef: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["New", "In Review", "Resolved", "Rejected"],
        default: "New"
    },

    adminReply: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);