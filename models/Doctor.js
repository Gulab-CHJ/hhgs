const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({

    doctorId: {
        type: String,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    degree: String,

    specialization: String,

    experience: String,

    hospital: String,

    phone: {
        type: String,
        unique: true
    },

    email: String,

    password: {
        type: String,
        required: true
    },

    address: String,

    image: String,

    description: String

}, {
    timestamps: true
});

module.exports =
    mongoose.models.Doctor ||
    mongoose.model("Doctor", DoctorSchema);