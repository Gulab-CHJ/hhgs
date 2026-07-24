require("dotenv").config();

console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const express = require("express");
const router = express.Router();

const dashboard = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const DoctorLogin = require("../pages/doctorLogin");
const ManageDoctors = require("../pages/manageDoctors");
const AddDoctor = require("../pages/addpages/addDoctor");

const { login } = require("../controllers/adminAuth");
const AdminController = require("../controllers/adminController");
const DoctorDashboard = require("../pages/doctorDashboard");



const Doctor = require("../models/Doctor");
// const upload = require("../config/multer");
const upload = require("../config/upload");
const Product = require("../models/Product");


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

// router.post(
//     "/add-banner",
//     (req,res,next)=>{

//         upload.single("image")(req,res,function(err){

//             if(err){

//                 console.log("MULTER ERROR:",err);

//                 return res.status(500).send(err.message);

//             }

//             next();

//         });

//     },
//     AdminController.saveBanner
// );


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
            return res.send(DoctorLogin("Doctor ID Not Registered"));
        }

        if (doctor.password !== password) {
            return res.send(DoctorLogin("Wrong Password"));
        }

        // Products MongoDB से लाओ
        const products = await Product.find().sort({ createdAt: -1 });

        // Dashboard भेजो
        res.send(DoctorDashboard(doctor, products));

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

           const lastDoctor = await Doctor.findOne()
.sort({ createdAt: -1 });


let nextNumber = 1001;


if(lastDoctor && lastDoctor.doctorId){

    nextNumber =
    parseInt(lastDoctor.doctorId.replace("DOC","")) + 1;

}


const doctorId = "DOC" + nextNumber;

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
    ? req.file.path
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
const EditDoctor = require("../pages/editpages/editDoctor");
// Edit Doctor Page
router.get("/edit-doctor/:id", async (req, res) => {
    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.send("Doctor Not Found");
        }

        res.send(EditDoctor(doctor));

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

// Update Doctor
router.post(
    "/edit-doctor/:id",
    upload.single("image"),
    async (req, res) => {

        try {

            const updateData = {
                name: req.body.name,
                degree: req.body.qualification,
                specialization: req.body.speciality,
                experience: req.body.experience,
                hospital: req.body.clinic,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                description: req.body.description
            };

   if (req.file) {

    updateData.image = req.file.path;

}

            await Doctor.findByIdAndUpdate(req.params.id, updateData);

            res.redirect("/admin/manage-doctors");

        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }

    }
);

const ManageProducts = require("../pages/manageProducts");

router.get("/manage-products", async (req, res) => {

    try {

        const products = await Product.find().sort({ createdAt: -1 });

        res.send(ManageProducts(products));

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});
const AddProduct = require("../pages/addpages/addProduct");

router.get("/add-product", (req, res) => {
    res.send(AddProduct());
});
router.post(
    "/add-product",
    upload.single("image"),
    async (req, res) => {

        try {

            const product = new Product({

                name: req.body.name,
                price: req.body.price,
                description: req.body.description,

       image: req.file
    ? req.file.path
    : ""

            });

            await product.save();

            res.redirect("/admin/manage-products");

        } catch (err) {

            console.log(err);
            res.status(500).send(err.message);

        }

    }
);
// Delete Product
router.get("/delete-product/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.redirect("/admin/manage-products");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

// =============================
// Doctor Profile Page
// =============================

const DoctorProfile = require("../pages/doctorProfile");


router.get("/doctor/:id", async (req,res)=>{

    try{

        const doctor = await Doctor.findById(req.params.id);

        if(!doctor){
            return res.send("Doctor Not Found");
        }


        res.send(
            DoctorProfile(doctor)
        );


    }catch(err){

        console.log(err);

        res.status(500).send(err.message);

    }

});

// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// });
router.post("/create-phone-payment", async(req,res)=>{

try{

const order = await razorpay.orders.create({

amount:100,   // ₹1 = 100 paise
currency:"INR",
receipt:"phone_unlock"

});


res.json(order);


}catch(err){

console.log(err);

res.status(500).json({
error:err.message
});

}

});

router.post("/verify-phone-payment",async(req,res)=>{


const {
paymentId,
orderId,
signature,
doctorId
}=req.body;


const body = orderId + "|" + paymentId;


const expectedSignature =
crypto
.createHmac(
"sha256",
process.env.RAZORPAY_KEY_SECRET
)
.update(body)
.digest("hex");



if(expectedSignature === signature){


await Doctor.findByIdAndUpdate(
doctorId,
{
phoneUnlocked:true
}
);


return res.json({
success:true
});


}


res.json({
success:false
});


});

module.exports = router;