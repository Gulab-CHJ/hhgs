// const express = require("express");
// const router = express.Router();
// const dashboard = require("../pages/dashboard");
// const AdminLogin = require("../pages/adminLogin");
// const { login } = require("../controllers/adminAuth");
// const AdminController = require("../controllers/adminController");
// const upload = require("../config/multer");



// router.get("/", (req, res) => {
//     res.send(AdminLogin());
// });

// // Login submit
// router.post("/login", login);

// // Dashboard
// router.get("/admindashboard", (req, res) => {
//     res.send(dashboard());
// });

// // router.get("/manage-banners", AdminController.manageBanners);
// // router.get("/add-banner", adminController.addBannerPage);
// // router.post("/add-banner", adminController.saveBanner);
// router.get("/manage-banners", AdminController.manageBanners);
// router.get("/manage-banner", AdminController.manageBanners);

// router.get("/add-banner", AdminController.addBannerPage);
// const Doctor = require("../models/Doctor");
// const DoctorLogin = require("../pages/doctorLogin");

// router.get("/doctor-login", (req, res) => {
//     res.send(DoctorLogin());
// });

// router.post("/doctor/login", async (req, res) => {

//     try {

//         const { doctorId, password } = req.body;

//         // Database me doctor search
//         const doctor = await Doctor.findOne({
//             doctorId: doctorId
//         });

//         if (!doctor) {
//             return res.send(
//                 DoctorLogin("Doctor ID Not Registered")
//             );
//         }

//         // Password check
//         if (doctor.password !== password) {
//             return res.send(
//                 DoctorLogin("Wrong Password")
//             );
//         }

//         // Login Success
//         res.send(`
//             <h1>Welcome Dr. ${doctor.name}</h1>
//             <p>Login Successfully</p>
//         `);

//     } catch (err) {

//         console.log(err);
//         res.send("Server Error");

//     }

// });

// router.post(
//     "/add-banner",
//     upload.single("image"),
//     AdminController.saveBanner
// );

// router.get("/delete-banner/:id", AdminController.deleteBanner);


// const ManageDoctors = require("../pages/manageDoctors");

// router.get("/manage-doctors", async (req, res) => {
//     try {

//         const doctors = await Doctor.find();

//         res.send(ManageDoctors(doctors));

//     } catch (err) {
//         console.log(err);
//         res.send("Error loading doctors");
//     }
// });
// const AddDoctor = require("../pages/addPages/addDoctor");

// router.get("/add-doctor", (req,res)=>{
//     res.send(AddDoctor());
// });

// router.post(
//     "/add-doctor",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             // Auto Doctor ID
//             const totalDoctors = await Doctor.countDocuments();
//             const doctorId = "DOC" + (1001 + totalDoctors);

//             // New Doctor
//             const doctor = new Doctor({

//                 doctorId: doctorId,

//                 name: req.body.name,

//                 degree: req.body.qualification,

//                 specialization: req.body.speciality,

//                 experience: req.body.experience,

//                 hospital: req.body.clinic,

//                 phone: req.body.phone,

//                 email: req.body.email,

//                 password: req.body.password,

//                 address: req.body.address,

//                 description: req.body.description,

//                 image: req.file
//                     ? "/uploads/" + req.file.filename
//                     : ""

//             });

//             await doctor.save();

//             res.send(`
//                 <h2>Doctor Added Successfully ✅</h2>

//                 <p><b>Doctor ID:</b> ${doctorId}</p>

//                 <p><b>Password:</b> ${req.body.password}</p>

//                 <a href="/admin/manage-doctors">
//                     Manage Doctors
//                 </a>
//             `);

//         } catch (err) {

//             console.log(err);

//             res.send(`
//                 <h2>Error</h2>
//                 <p>${err.message}</p>
//             `);

//         }

//     }
// );



// module.exports = router;

const express = require("express");
const router = express.Router();

const dashboard = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const DoctorLogin = require("../pages/doctorLogin");
const ManageDoctors = require("../pages/manageDoctors");
const AddDoctor = require("../pages/addPages/addDoctor");

const { login } = require("../controllers/adminAuth");
const AdminController = require("../controllers/adminController");

const Doctor = require("../models/Doctor");
const upload = require("../config/multer");


// =============================
// Admin Login
// =============================

router.get("/", (req, res) => {
    res.send(AdminLogin());
});

router.post("/login", login);


// =============================
// Dashboard
// =============================

router.get("/admindashboard", (req, res) => {
    res.send(dashboard());
});


// =============================
// Banner
// =============================

router.get("/manage-banners", AdminController.manageBanners);
router.get("/manage-banner", AdminController.manageBanners);

router.get("/add-banner", AdminController.addBannerPage);

router.post(
    "/add-banner",
    upload.single("image"),
    AdminController.saveBanner
);

router.get("/delete-banner/:id", AdminController.deleteBanner);


// =============================
// Doctor Login
// =============================

router.get("/doctor-login", (req, res) => {
    res.send(DoctorLogin());
});

router.post("/doctor/login", async (req, res) => {

    try {

        const { doctorId, password } = req.body;

        const doctor = await Doctor.findOne({ doctorId });

        if (!doctor) {
            return res.send(
                DoctorLogin("Doctor ID Not Registered")
            );
        }

        if (doctor.password !== password) {
            return res.send(
                DoctorLogin("Wrong Password")
            );
        }

        res.send(`
            <h2>Welcome Dr. ${doctor.name}</h2>
            <p>Login Successful ✅</p>
        `);

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

});


// =============================
// Manage Doctors
// =============================

router.get("/manage-doctors", async (req, res) => {

    try {

        const doctors = await Doctor.find().sort({ createdAt: -1 });

        res.send(ManageDoctors(doctors));

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

});


// =============================
// Add Doctor Page
// =============================

router.get("/add-doctor", (req, res) => {
    res.send(AddDoctor());
});


// =============================
// Save Doctor
// =============================

router.post(
    "/add-doctor",
    upload.single("image"),
    async (req, res) => {

        try {

            console.log("BODY:", req.body);
            console.log("FILE:", req.file);

            const totalDoctors = await Doctor.countDocuments();

            const doctorId = "DOC" + (1001 + totalDoctors);

            const doctor = new Doctor({

                doctorId,

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

            console.log("Doctor Saved:", doctor);

            res.redirect("/admin/manage-doctors");

        } catch (err) {

            console.log("ADD DOCTOR ERROR:", err);

            res.status(500).send(err.message);

        }

    }
);


// =============================
// Delete Doctor
// =============================

router.get("/delete-doctor/:id", async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(req.params.id);

        res.redirect("/admin/manage-doctors");

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

});

module.exports = router;