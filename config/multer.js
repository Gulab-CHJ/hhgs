const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const Doctor = require("../models/modelsDoctor");

const AddDoctor = require("../pages/addpages/AddDoctor");

// Add Doctor Page
router.get("/doctor/add", (req, res) => {
    res.send(AddDoctor());
});

// Save Doctor
router.post("/doctor/add", upload.single("image"), async (req, res) => {

    try {

        const doctor = new Doctor({

            name: req.body.name,
            image: "/uploads/" + req.file.filename,

            specialist: req.body.specialist,
            qualification: req.body.qualification,
            experience: req.body.experience,

            hospital: req.body.hospital,

            mobile: req.body.mobile,
            email: req.body.email,

            fee: req.body.fee,

            address: req.body.address,

            about: req.body.about

        });

        await doctor.save();

        res.redirect("/doctor/all");

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

});

module.exports = router;