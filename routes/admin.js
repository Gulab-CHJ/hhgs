const express = require("express");
const router = express.Router();
const dashboard = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const { login } = require("../controllers/adminAuth");
const AdminController = require("../controllers/adminController");
const upload = require("../config/multer");



router.get("/", (req, res) => {
    res.send(AdminLogin());
});

// Login submit
router.post("/login", login);

// Dashboard
router.get("/admindashboard", (req, res) => {
    res.send(dashboard());
});

// router.get("/manage-banners", AdminController.manageBanners);
// router.get("/add-banner", adminController.addBannerPage);
// router.post("/add-banner", adminController.saveBanner);
router.get("/manage-banners", AdminController.manageBanners);
router.get("/manage-banner", AdminController.manageBanners);

router.get("/add-banner", AdminController.addBannerPage);
const Doctor = require("../models/Doctor");
const DoctorLogin = require("../pages/doctorLogin");

router.get("/doctor-login", (req, res) => {
    res.send(DoctorLogin());
});

router.post("/doctor/login", async (req, res) => {

    try {

        const { doctorId, password } = req.body;

        // Database me doctor search
        const doctor = await Doctor.findOne({
            doctorId: doctorId
        });

        if (!doctor) {
            return res.send(
                DoctorLogin("Doctor ID Not Registered")
            );
        }

        // Password check
        if (doctor.password !== password) {
            return res.send(
                DoctorLogin("Wrong Password")
            );
        }

        // Login Success
        res.send(`
            <h1>Welcome Dr. ${doctor.name}</h1>
            <p>Login Successfully</p>
        `);

    } catch (err) {

        console.log(err);
        res.send("Server Error");

    }

});

router.post(
    "/add-banner",
    upload.single("image"),
    AdminController.saveBanner
);

router.get("/delete-banner/:id", AdminController.deleteBanner);


const ManageDoctors = require("../pages/manageDoctors");

router.get("/manage-doctors", async (req, res) => {
    try {

        const doctors = await Doctor.find();

        res.send(ManageDoctors(doctors));

    } catch (err) {
        console.log(err);
        res.send("Error loading doctors");
    }
});
const AddDoctor = require("../pages/addpages/addDoctor");

router.get("/add-doctor", (req,res)=>{
    res.send(AddDoctor());
});

router.post(
    "/add-doctor",
    upload.single("image"),
    async (req, res) => {

        try {

            // Auto Doctor ID
            const totalDoctors = await Doctor.countDocuments();
            const doctorId = "DOC" + (1001 + totalDoctors);

            // New Doctor
            const doctor = new Doctor({

                doctorId: doctorId,

                name: req.body.name,

                degree: req.body.qualification,

                specialization: req.body.speciality,

                experience: req.body.experience,

                hospital: req.body.clinic,

                phone: req.body.phone,

                email: req.body.email,

                password: req.body.password,

                address: req.body.address,

                description: req.body.description,

                image: req.file
                    ? "/uploads/" + req.file.filename
                    : ""

            });

            await doctor.save();

            res.send(`
                <h2>Doctor Added Successfully ✅</h2>

                <p><b>Doctor ID:</b> ${doctorId}</p>

                <p><b>Password:</b> ${req.body.password}</p>

                <a href="/admin/manage-doctors">
                    Manage Doctors
                </a>
            `);

        } catch (err) {

            console.log(err);

            res.send(`
                <h2>Error</h2>
                <p>${err.message}</p>
            `);

        }

    }
);



module.exports = router;

