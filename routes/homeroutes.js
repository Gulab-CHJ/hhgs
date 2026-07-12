const express = require("express");
const router = express.Router();

const Home = require("../pages/Homepages");

const Poster = require("../models/modelsPoster");
const Doctor = require("../models/modelsDoctor");
const Service = require("../models/modelsService");
const Student = require("../models/modelsStudent");

router.get("/", async (req, res) => {
    try {
        const posters = await Poster.find();
        const doctors = await Doctor.find();
        const services = await Service.find();
        const students = await Student.find();

        res.send(
            Home({
                posters,
                doctors,
                services,
                students,
            })
        );
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;