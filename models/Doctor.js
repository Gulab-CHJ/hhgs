const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    degree: String,
    specialization: String,
    experience: String,
    hospital: String,
    phone: String,
    email: String,
    address: String,
    image: String,
    description: String
});

module.exports = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);