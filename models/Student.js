const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    fatherName: {
        type: String,
        default: ""
    },

    course: {
        type: String,
        default: ""
    },

    mobile: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Student", studentSchema);