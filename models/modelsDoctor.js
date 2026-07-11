// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//     name: String,
//     degree: String,
//     specialization: String,
//     experience: String,
//     hospital: String,
//     phone: String,
//     email: String,
//     address: String,
//     image: String,
//     description: String
// });

// module.exports = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    // Doctor Name
    name: {
        type: String,
        required: true
    },

    // Photo
    image: {
        type: String,
        required: true
    },

    // Specialist
    specialist: {
        type: String,
        required: true
    },

    // Qualification
    qualification: {
        type: String,
        required: true
    },

    // Experience
    experience: {
        type: String,
        required: true
    },

    // Hospital / Clinic
    hospital: {
        type: String,
        required: true
    },

    // Mobile Number
    mobile: {
        type: String,
        required: true
    },

    // Email
    email: {
        type: String,
        required: true
    },

    // Consultation Fee
    fee: {
        type: Number,
        required: true
    },

    // Address
    address: {
        type: String,
        required: true
    },

    // About Doctor
    about: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports =
mongoose.models.Doctor ||
mongoose.model("Doctor", doctorSchema);