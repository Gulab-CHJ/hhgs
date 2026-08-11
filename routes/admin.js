// require("dotenv").config();
// const crypto = require("crypto");

// const Razorpay = require("razorpay");

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });


// const express = require("express");
// const router = express.Router();

// const dashboard = require("../pages/dashboard");
// const AdminLogin = require("../pages/adminLogin");
// const DoctorLogin = require("../pages/doctorLogin");
// const ManageDoctors = require("../pages/manageDoctors");
// const AddDoctor = require("../pages/addpages/addDoctor");

// const { login } = require("../controllers/adminAuth");
// const AdminController = require("../controllers/adminController");
// const DoctorDashboard = require("../pages/doctorDashboard");

// const AddGovernment = require("../views/component/dashboard/addGovernment");

// const Banner = require("../models/Banner");
// const Student = require("../models/Student");
// const Service = require("../models/Service");
// const Doctor = require("../models/Doctor");
// const Product = require("../models/Product");

// const upload = require("../config/upload");


// // =============================
// // Admin Login
// // =============================

// router.get("/", (req, res) => {
//     res.send(AdminLogin());
// });

// router.post("/login", login);


// // =============================
// // Dashboard (FIXED HERE)
// // =============================

// // =============================
// // Dashboard
// // =============================

// router.get("/admindashboard", async (req, res) => {
//     try {

//         const doctorCount = await Doctor.countDocuments();
//         const studentCount = await Student.countDocuments();
//         const serviceCount = await Service.countDocuments();
//         const bannerCount = await Banner.countDocuments();

//         console.log("DOCTOR COUNT:", doctorCount);
//         console.log("STUDENT COUNT:", studentCount);
//         console.log("SERVICE COUNT:", serviceCount);
//         console.log("BANNER COUNT:", bannerCount);


//         const data = {
//             doctorCount,
//             studentCount,
//             serviceCount,
//             bannerCount
//         };


//         console.log("=== ADMIN ROUTE DATA ===");
//         console.log(data);


//         return res.send(dashboard(data));


//     } catch (err) {

//         console.log("DASHBOARD ERROR:", err);
//         return res.status(500).send(err.message);

//     }
// });

// // =============================
// // Banner
// // =============================

// router.get("/manage-banners", AdminController.manageBanners);
// router.get("/manage-banner", AdminController.manageBanners);

// router.get("/add-banner", AdminController.addBannerPage);

// router.post(
//     "/add-banner",
//     upload.single("image"),
//     AdminController.saveBanner
// );

// router.get("/delete-banner/:id", AdminController.deleteBanner);


// // =============================
// // Doctor Login
// // =============================

// router.get("/doctor-login", (req, res) => {
//     res.send(DoctorLogin());
// });

// router.post("/doctor/login", async(req,res)=>{

//     try{

//         const {doctorId,password} = req.body;


//         const doctor = await Doctor.findOne({
//             doctorId: doctorId
//         });


//         if(!doctor){

//             return res.send(
//                 DoctorLogin("Doctor Not Found")
//             );

//         }


//         if(doctor.password !== password){

//             return res.send(
//                 DoctorLogin("Wrong Password")
//             );

//         }



//         // ⭐ IMPORTANT LINE ⭐
//         req.session.doctor = doctor;



//         console.log("Doctor Session Saved:");
//         console.log(req.session.doctor);



//         res.redirect("/doctor/dashboard");


//     }
//     catch(err){

//         console.log(err);

//         res.send(
//             "Login Error"
//         );

//     }

// });


// // =============================
// // Manage Doctors
// // =============================

// router.get("/manage-doctors", async (req, res) => {
//     try {
//         const doctors = await Doctor.find().sort({ createdAt: -1 });
//         res.send(ManageDoctors(doctors));
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });





// router.post(
//     "/add-doctor",
//     upload.single("image"),
//     async (req,res)=>{

//     try{


//         console.log("BODY:",req.body);
//         console.log("FILE:",req.file);



//         const existDoctor = await Doctor.findOne({
//             phone:req.body.phone
//         });


//         if(existDoctor){

//             return res.send(
//                 "Phone Number Already Registered"
//             );

//         }



//         const lastDoctor = await Doctor.findOne()
//         .sort({createdAt:-1});


//         let nextNumber = 1001;


//         if(lastDoctor && lastDoctor.doctorId){

//             nextNumber =
//             parseInt(
//                 lastDoctor.doctorId.replace("DOC","")
//             ) + 1;

//         }


//         const doctorId = "DOC" + nextNumber;



//         const doctor = new Doctor({


//             doctorId,


//             name:req.body.name,


//             degree:req.body.qualification,


//             specialization:req.body.speciality,


//             experience:req.body.experience,


//             hospital:req.body.clinic,


//             phone:req.body.phone,


//             email:req.body.email,


//             password:req.body.password,


//             address:req.body.address,


//             description:req.body.description,



//             // ======================
//             // DOCTOR AVAILABILITY
//             // ======================


//             availableDay:req.body.availableDay,


//             timeFrom:req.body.timeFrom,


//             timeTo:req.body.timeTo,



//             // ======================
//             // APPOINTMENT SLOT
//             // ======================


//             slotDuration:req.body.slotDuration,



//             // ======================
//             // FEE
//             // ======================


//             fee:req.body.fee,


//             feeType:req.body.feeType,



//             image:req.file
//             ? req.file.path
//             :""

//         });



//         await doctor.save();



//         console.log(
//             "Doctor Saved:",
//             doctor
//         );



//         res.redirect(
//             "/admin/manage-doctors"
//         );



//     }
//     catch(err){


//         console.log(
//             "ADD DOCTOR ERROR:",
//             err
//         );


//         res.status(500)
//         .send(err.message);


//     }

// });

// // =============================
// // Delete Doctor
// // =============================

// router.get("/delete-doctor/:id", async (req, res) => {
//     try {
//         await Doctor.findByIdAndDelete(req.params.id);
//         res.redirect("/admin/manage-doctors");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// const EditDoctor = require("../pages/editpages/editDoctor");


// // =============================
// // Edit Doctor Page
// // =============================

// router.get("/edit-doctor/:id", async (req, res) => {

//     try {

//         const doctor = await Doctor.findById(req.params.id);

//         if (!doctor) {
//             return res.send("Doctor Not Found");
//         }

//         res.send(EditDoctor(doctor));


//     } catch (err) {

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });





// // =============================
// // UPDATE PRODUCT
// // =============================

// router.post(
//     "/edit-product/:id",

//     upload.fields([
//         {
//             name: "images",
//             maxCount: 10
//         },
//         {
//             name: "videos",
//             maxCount: 1
//         }
//     ]),

//     async (req, res) => {

//         try {

//             console.log("\n========== EDIT PRODUCT ==========");

//             console.log(
//                 "PRODUCT ID:",
//                 req.params.id
//             );

//             console.log(
//                 "BODY:",
//                 req.body
//             );

//             console.log(
//                 "FILES:",
//                 req.files
//             );


//             // ==========================================
//             // FIND PRODUCT
//             // ==========================================

//             const product =
//                 await Product.findById(req.params.id);


//             if (!product) {

//                 return res
//                     .status(404)
//                     .send("Product Not Found");

//             }


//             // ==========================================
//             // BASIC DETAILS
//             // ==========================================

//             product.name =
//                 req.body.name || "";

//             product.brand =
//                 req.body.brand || "";

//             product.category =
//                 req.body.category || "";

//             product.manufacturer =
//                 req.body.manufacturer || "";


//             // ==========================================
//             // PRICE
//             // ==========================================

//             product.mrp =
//                 req.body.mrp !== undefined &&
//                 req.body.mrp !== ""
//                     ? Number(req.body.mrp)
//                     : 0;


//             product.price =
//                 req.body.price !== undefined &&
//                 req.body.price !== ""
//                     ? Number(req.body.price)
//                     : 0;


//             product.stock =
//                 req.body.stock !== undefined &&
//                 req.body.stock !== ""
//                     ? Number(req.body.stock)
//                     : 0;


//             // ==========================================
//             // MEDICINE DETAILS
//             // ==========================================

//             product.packSize =
//                 req.body.packSize || "";

//             product.batchNo =
//                 req.body.batchNo || "";

//             product.mfgDate =
//                 req.body.mfgDate || "";

//             product.expDate =
//                 req.body.expDate || "";


//             // ==========================================
//             // COMPOSITION
//             // ==========================================

//             let composition = [];


//             if (Array.isArray(req.body.composition)) {

//                 composition =
//                     req.body.composition
//                         .map(item =>
//                             String(item).trim()
//                         )
//                         .filter(Boolean);

//             }

//             else if (req.body.composition) {

//                 composition = [
//                     String(
//                         req.body.composition
//                     ).trim()
//                 ];

//             }


//             product.composition =
//                 composition;


//             // ==========================================
//             // PRODUCT DETAILS
//             // ==========================================

//             product.description =
//                 req.body.description || "";

//             product.uses =
//                 req.body.uses || "";

//             product.benefits =
//                 req.body.benefits || "";

//             product.dosage =
//                 req.body.dosage || "";

//             product.sideEffects =
//                 req.body.sideEffects || "";

//             product.storage =
//                 req.body.storage || "";


//             // ==========================================
//             // IMAGES
//             // ==========================================

//             const imageFiles =
//                 req.files?.images || [];


//             if (imageFiles.length > 0) {

//                 console.log(
//                     "NEW IMAGE COUNT:",
//                     imageFiles.length
//                 );


//                 const newImages =
//                     imageFiles
//                         .map(file =>
//                             file.path ||
//                             file.secure_url ||
//                             file.url
//                         )
//                         .filter(Boolean);


//                 let existingImages = [];


//                 if (Array.isArray(product.images)) {

//                     existingImages =
//                         product.images
//                             .filter(Boolean);

//                 }


//                 // पुराने main image को भी preserve करें

//                 if (
//                     product.image &&
//                     !existingImages.includes(
//                         product.image
//                     )
//                 ) {

//                     existingImages.push(
//                         product.image
//                     );

//                 }


//                 // पुराने + नए images

//                 product.images = [
//                     ...existingImages,
//                     ...newImages
//                 ];


//                 // अगर main image नहीं है

//                 if (
//                     !product.image &&
//                     newImages.length > 0
//                 ) {

//                     product.image =
//                         newImages[0];

//                 }

//             }


//             // ==========================================
//             // VIDEO
//             // ==========================================

//             const videoFiles =
//                 req.files?.videos || [];


//             if (videoFiles.length > 0) {

//                 console.log(
//                     "NEW VIDEO COUNT:",
//                     videoFiles.length
//                 );


//                 const newVideoUrl =
//                     videoFiles[0].path ||
//                     videoFiles[0].secure_url ||
//                     videoFiles[0].url;


//                 console.log(
//                     "NEW VIDEO URL:",
//                     newVideoUrl
//                 );


//                 if (newVideoUrl) {

//                     // IMPORTANT:
//                     // Schema field is "video"
//                     // NOT "videos"

//                     product.video =
//                         newVideoUrl;

//                 }

//             }

//             else {

//                 console.log(
//                     "NO NEW VIDEO - OLD VIDEO KEPT"
//                 );

//             }


//             // ==========================================
//             // SAVE PRODUCT
//             // ==========================================

//             await product.save();


//             // ==========================================
//             // FINAL LOG
//             // ==========================================

//             console.log(
//                 "================================="
//             );

//             console.log(
//                 "PRODUCT UPDATED:",
//                 product._id
//             );

//             console.log(
//                 "TOTAL IMAGES:",
//                 product.images?.length || 0
//             );

//             console.log(
//                 "SAVED VIDEO:",
//                 product.video
//             );

//             console.log(
//                 "================================="
//             );


//             // ==========================================
//             // REDIRECT
//             // ==========================================

//             return res.redirect(
//                 "/admin/manage-products"
//             );


//         }

//         catch (err) {

//             console.error(
//                 "UPDATE PRODUCT ERROR:",
//                 err
//             );


//             return res
//                 .status(500)
//                 .send(
//                     "Product Update Error: " +
//                     err.message
//                 );

//         }

//     }
// );

// const ManageProducts = require("../pages/manageProducts");

// router.get("/manage-products", async (req, res) => {
//     try {
//         const products = await Product.find().sort({ createdAt: -1 });
//         res.send(ManageProducts(products));
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// const AddProduct = require("../pages/addpages/addProduct");

// router.get("/add-product", (req, res) => {
//     res.send(AddProduct());
// });


// router.post(
//     "/add-product",

//     upload.fields([
//         {
//             name: "image",
//             maxCount: 1
//         },
//         {
//             name: "images",
//             maxCount: 10
//         },
//         {
//             name: "video",
//             maxCount: 1
//         }
//     ]),

//     async (req, res) => {

//         try {

//             console.log("========== ADD PRODUCT ==========");
//             console.log("BODY:", req.body);
//             console.log("FILES:", req.files);


//             // =============================
//             // COMPOSITION
//             // =============================

//             let composition = [];

//             if (Array.isArray(req.body.composition)) {

//                 composition = req.body.composition
//                     .map(item => String(item).trim())
//                     .filter(Boolean);

//             } else if (req.body.composition) {

//                 composition = [
//                     String(req.body.composition).trim()
//                 ];

//             }


//             // =============================
//             // MORE IMAGES
//             // =============================

//             let images = [];

//             if (
//                 req.files &&
//                 req.files.images
//             ) {

//                 images = req.files.images
//                     .map(file => file.path)
//                     .filter(Boolean);

//             }


//             // =============================
//             // MAIN IMAGE
//             // =============================

//             let mainImage = "";

//             if (
//                 req.files &&
//                 req.files.image &&
//                 req.files.image.length > 0
//             ) {

//                 mainImage =
//                     req.files.image[0].path;

//             }


//             // =============================
//             // VIDEO
//             // =============================

//             let video = "";

//             if (
//                 req.files &&
//                 req.files.video &&
//                 req.files.video.length > 0
//             ) {

//                 video =
//                     req.files.video[0].path;

//             }


//             // =============================
//             // PRODUCT
//             // =============================

//             const product = new Product({

//                 name: req.body.name || "",

//                 brand: req.body.brand || "",

//                 category: req.body.category || "",

//                 manufacturer: req.body.manufacturer || "",

//                 mrp:
//                     req.body.mrp !== ""
//                         ? Number(req.body.mrp)
//                         : 0,

//                 price:
//                     req.body.price !== ""
//                         ? Number(req.body.price)
//                         : 0,

//                 stock:
//                     req.body.stock !== ""
//                         ? Number(req.body.stock)
//                         : 0,

//                 packSize:
//                     req.body.packSize || "",

//                 batchNo:
//                     req.body.batchNo || "",

//                 mfgDate:
//                     req.body.mfgDate || "",

//                 expDate:
//                     req.body.expDate || "",

//                 composition,

//                 images,

//                 image: mainImage,

//                 description:
//                     req.body.description || "",

//                 uses:
//                     req.body.uses || "",

//                 benefits:
//                     req.body.benefits || "",

//                 dosage:
//                     req.body.dosage || "",

//                 sideEffects:
//                     req.body.sideEffects || "",

//                 storage:
//                     req.body.storage || "",

//                 video

//             });


//             await product.save();


//             console.log(
//                 "PRODUCT SAVED:",
//                 product._id
//             );


//             res.redirect(
//                 "/admin/manage-products"
//             );


//         } catch (err) {

//             console.error(
//                 "ADD PRODUCT ERROR:",
//                 err
//             );

//             res.status(500).send(
//                 err.message
//             );

//         }

//     }
// );





// // =============================
// // UPDATE PRODUCT
// // =============================

// // router.post(
// //     "/edit-product/:id",
// //     upload.array("images", 10),
// //     async (req, res) => {

// //         try {

// //             console.log("================================");
// //             console.log("EDIT PRODUCT REQUEST");
// //             console.log("PRODUCT ID:", req.params.id);
// //             console.log("BODY:", req.body);
// //             console.log("FILES:", req.files);
// //             console.log("================================");


// //             // =============================
// //             // FIND PRODUCT
// //             // =============================

// //             const product = await Product.findById(
// //                 req.params.id
// //             );


// //             if (!product) {

// //                 return res.status(404).send(
// //                     "Product Not Found"
// //                 );

// //             }


// //             // =============================
// //             // COMPOSITION
// //             // =============================

// //             let composition = [];

// //             if (Array.isArray(req.body.composition)) {

// //                 composition = req.body.composition
// //                     .map(item => String(item).trim())
// //                     .filter(item => item !== "");

// //             } else if (req.body.composition) {

// //                 composition = [
// //                     String(req.body.composition).trim()
// //                 ];

// //             }


// //             // =============================
// //             // UPDATE BASIC INFORMATION
// //             // =============================

// //             product.name =
// //                 req.body.name || "";

// //             product.brand =
// //                 req.body.brand || "";

// //             product.category =
// //                 req.body.category || "";

// //             product.manufacturer =
// //                 req.body.manufacturer || "";


// //             // =============================
// //             // PRICE
// //             // =============================

// //             product.mrp =
// //                 req.body.mrp !== ""
// //                     ? Number(req.body.mrp)
// //                     : 0;


// //             product.price =
// //                 req.body.price !== ""
// //                     ? Number(req.body.price)
// //                     : 0;


// //             // =============================
// //             // STOCK
// //             // =============================

// //             product.stock =
// //                 req.body.stock !== ""
// //                     ? Number(req.body.stock)
// //                     : 0;


// //             // =============================
// //             // PACK / BATCH
// //             // =============================

// //             product.packSize =
// //                 req.body.packSize || "";

// //             product.batchNo =
// //                 req.body.batchNo || "";


// //             // =============================
// //             // DATES
// //             // =============================

// //             product.mfgDate =
// //                 req.body.mfgDate || "";

// //             product.expDate =
// //                 req.body.expDate || "";


// //             // =============================
// //             // COMPOSITION
// //             // =============================

// //             product.composition =
// //                 composition;


// //             // =============================
// //             // PRODUCT DETAILS
// //             // =============================

// //             product.description =
// //                 req.body.description || "";

// //             product.uses =
// //                 req.body.uses || "";

// //             product.benefits =
// //                 req.body.benefits || "";

// //             product.dosage =
// //                 req.body.dosage || "";

// //             product.sideEffects =
// //                 req.body.sideEffects || "";

// //             product.storage =
// //                 req.body.storage || "";


// //             // =============================
// //             // NEW IMAGES
// //             // =============================

// //             if (
// //                 req.files &&
// //                 req.files.length > 0
// //             ) {

// //                 const newImages =
// //                     req.files
// //                         .map(file => file.path)
// //                         .filter(Boolean);


// //                 // Existing images
// //                 let existingImages = [];


// //                 if (
// //                     Array.isArray(product.images)
// //                 ) {

// //                     existingImages =
// //                         product.images.filter(Boolean);

// //                 }


// //                 // Old single image
// //                 if (
// //                     product.image &&
// //                     !existingImages.includes(product.image)
// //                 ) {

// //                     existingImages.push(
// //                         product.image
// //                     );

// //                 }


// //                 // Add new images
// //                 product.images = [
// //                     ...existingImages,
// //                     ...newImages
// //                 ];


// //                 // Main image
// //                 if (!product.image) {

// //                     product.image =
// //                         newImages[0] || "";

// //                 }

// //             }


// //             // =============================
// //             // SAVE PRODUCT
// //             // =============================

// //             await product.save();


// //             console.log(
// //                 "PRODUCT UPDATED SUCCESSFULLY:"
// //             );

// //             console.log(product);


// //             // =============================
// //             // REDIRECT
// //             // =============================

// //             res.redirect(
// //                 "/admin/manage-products"
// //             );


// //         } catch (err) {

// //             console.error(
// //                 "UPDATE PRODUCT ERROR:",
// //                 err
// //             );

// //             res.status(500).send(
// //                 err.message
// //             );

// //         }

// //     }
// // );

// // Delete Product
// router.get("/delete-product/:id", async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         res.redirect("/admin/manage-products");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });


// // =============================
// // Doctor Profile Page
// // =============================

// const DoctorProfile = require("../pages/doctorProfile");

// router.get("/doctor/:id", async (req, res) => {
//     try {
//         const doctor = await Doctor.findById(req.params.id);
//         if (!doctor) {
//             return res.send("Doctor Not Found");
//         }
//         res.send(DoctorProfile(doctor));
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// router.post("/create-phone-payment", async (req, res) => {
//     try {
//         const order = await razorpay.orders.create({
//             amount: 100,
//             currency: "INR",
//             receipt: "phone_unlock"
//         });
//         res.json(order);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// });

// router.post("/verify-phone-payment", async (req, res) => {
//     const { paymentId, orderId, signature, doctorId } = req.body;
//     const body = orderId + "|" + paymentId;

//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body)
//         .digest("hex");

//     if (expectedSignature !== signature) {
//         return res.json({ success: false });
//     }

//     const doctor = await Doctor.findByIdAndUpdate(
//         doctorId,
//         { phoneUnlocked: true },
//         { new: true }
//     );

//     return res.json({
//         success: true,
//         phone: doctor.phone
//     });
// });

// const Consultation = require("../pages/consultation");

// router.get("/consultation/:id", Consultation);

// router.get("/add-government", (req, res) => {
//     res.send(AddGovernment());
// });

// const GovernmentPerson = require("../models/GovernmentPerson");

// router.post(
//     "/add-government",
//     upload.single("image"),
//     async (req, res) => {
//         try {
//             const person = new GovernmentPerson({
//                 name: req.body.name,
//                 position: req.body.position,
//                 department: req.body.department,
//                 phone: req.body.phone,
//                 address: req.body.address,
//                 description: req.body.description,
//                 image: req.file ? req.file.path : ""
//             });

//             await person.save();
//             console.log("Government Person Saved:", person);
//             res.redirect("/admin/add-government");

//         } catch (err) {
//             console.log("ADD GOVERNMENT ERROR:", err);
//             res.status(500).send(err.message);
//         }
//     }
// );

// const ManageGovernment = require("../pages/manageGovernment");

// router.get("/manage-government", async (req, res) => {
//     try {
//         const persons = await GovernmentPerson.find().sort({ createdAt: -1 });
//         res.send(ManageGovernment(persons));
//     } catch (err) {
//         console.log("MANAGE GOVERNMENT ERROR:", err);
//         res.status(500).send(err.message);
//     }
// });


// const ManageServices = require("../pages/services");
// // =============================
// // Manage Services
// // =============================

// router.get("/manage-services", async (req, res) => {
//     try {
//         const services = await Service.find().sort({ createdAt: -1 });
//         res.send(ManageServices(services));
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// // Add Service Page
// router.get("/add-service", (req, res) => {
//     res.send(AddService());
// });

// // Save Service
// router.post(
//     "/add-service",
//     upload.single("image"),
//     async (req, res) => {
//         try {

//             const features = req.body.features
//                 ? req.body.features.split("\n").filter(f => f.trim())
//                 : [];

//             const service = new Service({
//                 title: req.body.title,
//                 description: req.body.description,
//                 features,
//                 image: req.file ? req.file.path : ""
//             });

//             await service.save();

//             res.redirect("/admin/manage-services");

//         } catch (err) {
//             console.log(err);
//             res.status(500).send(err.message);
//         }
//     }
// );

// // Edit Service Page
// router.get("/edit-service/:id", async (req, res) => {
//     try {
//         const service = await Service.findById(req.params.id);

//         if (!service) {
//             return res.send("Service Not Found");
//         }

//         res.send(EditService(service));

//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// // Update Service
// router.post(
//     "/edit-service/:id",
//     upload.single("image"),
//     async (req, res) => {
//         try {

//             const updateData = {
//                 title: req.body.title,
//                 description: req.body.description,
//                 features: req.body.features
//                     ? req.body.features.split("\n").filter(f => f.trim())
//                     : []
//             };

//             if (req.file) {
//                 updateData.image = req.file.path;
//             }

//             await Service.findByIdAndUpdate(req.params.id, updateData);

//             res.redirect("/admin/manage-services");

//         } catch (err) {
//             console.log(err);
//             res.status(500).send(err.message);
//         }
//     }
// );

// // Delete Service
// router.get("/delete-service/:id", async (req, res) => {
//     try {
//         await Service.findByIdAndDelete(req.params.id);
//         res.redirect("/admin/manage-services");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// });

// const EditProduct = require("../pages/editpages/EditProduct");
// router.get("/edit-product/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).send("Product not found");
//     }

//     res.send(EditProduct(product)); // या res.render("admin/edit-product", { product })
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err.message);
//   }
// });

// // =============================
// // UPDATE PRODUCT
// // =============================

// // router.post(
// //     "/edit-product/:id",
// //     upload.array("images", 10),
// //     async (req, res) => {

// //         try {

// //             console.log("========== EDIT PRODUCT ==========");
// //             console.log("PRODUCT ID:", req.params.id);
// //             console.log("BODY:", req.body);
// //             console.log("FILES:", req.files);


// //             // =============================
// //             // FIND PRODUCT
// //             // =============================

// //             const product = await Product.findById(
// //                 req.params.id
// //             );

// //             if (!product) {

// //                 return res.status(404).send(
// //                     "Product Not Found"
// //                 );

// //             }


// //             // =============================
// //             // COMPOSITION
// //             // =============================

// //             let composition = [];

// //             if (Array.isArray(req.body.composition)) {

// //                 composition = req.body.composition
// //                     .map(item => String(item).trim())
// //                     .filter(item => item !== "");

// //             } else if (req.body.composition) {

// //                 composition = [
// //                     String(req.body.composition).trim()
// //                 ];

// //             }


// //             // =============================
// //             // BASIC INFORMATION
// //             // =============================

// //             product.name =
// //                 req.body.name || "";

// //             product.brand =
// //                 req.body.brand || "";

// //             product.category =
// //                 req.body.category || "";

// //             product.manufacturer =
// //                 req.body.manufacturer || "";


// //             // =============================
// //             // PRICE
// //             // =============================

// //             product.mrp =
// //                 req.body.mrp !== undefined &&
// //                 req.body.mrp !== ""
// //                     ? Number(req.body.mrp)
// //                     : 0;

// //             product.price =
// //                 req.body.price !== undefined &&
// //                 req.body.price !== ""
// //                     ? Number(req.body.price)
// //                     : 0;


// //             // =============================
// //             // STOCK
// //             // =============================

// //             product.stock =
// //                 req.body.stock !== undefined &&
// //                 req.body.stock !== ""
// //                     ? Number(req.body.stock)
// //                     : 0;


// //             // =============================
// //             // PACK / BATCH
// //             // =============================

// //             product.packSize =
// //                 req.body.packSize || "";

// //             product.batchNo =
// //                 req.body.batchNo || "";


// //             // =============================
// //             // DATES
// //             // =============================

// //             product.mfgDate =
// //                 req.body.mfgDate || "";

// //             product.expDate =
// //                 req.body.expDate || "";


// //             // =============================
// //             // COMPOSITION
// //             // =============================

// //             product.composition =
// //                 composition;


// //             // =============================
// //             // PRODUCT DETAILS
// //             // =============================

// //             product.description =
// //                 req.body.description || "";

// //             product.uses =
// //                 req.body.uses || "";

// //             product.benefits =
// //                 req.body.benefits || "";

// //             product.dosage =
// //                 req.body.dosage || "";

// //             product.sideEffects =
// //                 req.body.sideEffects || "";

// //             product.storage =
// //                 req.body.storage || "";


// //             // =============================
// //             // NEW IMAGES
// //             // =============================

// //             if (
// //                 req.files &&
// //                 req.files.length > 0
// //             ) {

// //                 const newImages =
// //                     req.files
// //                         .map(file => file.path)
// //                         .filter(Boolean);


// //                 // Existing images
// //                 let existingImages = [];

// //                 if (
// //                     Array.isArray(product.images)
// //                 ) {

// //                     existingImages =
// //                         product.images.filter(Boolean);

// //                 }


// //                 // Old single image को भी preserve करें
// //                 if (
// //                     product.image &&
// //                     !existingImages.includes(product.image)
// //                 ) {

// //                     existingImages.push(
// //                         product.image
// //                     );

// //                 }


// //                 // Existing + New Images
// //                 product.images = [
// //                     ...existingImages,
// //                     ...newImages
// //                 ];


// //                 // अगर main image नहीं है
// //                 if (!product.image) {

// //                     product.image =
// //                         newImages[0] || "";

// //                 }

// //             }


// //             // =============================
// //             // SAVE
// //             // =============================

// //             await product.save();


// //             console.log(
// //                 "PRODUCT UPDATED:",
// //                 product._id
// //             );


// //             // =============================
// //             // REDIRECT
// //             // =============================

// //             res.redirect(
// //                 "/admin/manage-products"
// //             );


// //         } catch (err) {

// //             console.error(
// //                 "UPDATE PRODUCT ERROR:",
// //                 err
// //             );

// //             res.status(500).send(
// //                 err.message
// //             );

// //         }

// //     }
// // );




// // =============================
// // UPDATE PRODUCT
// // =============================

// router.post(
//     "/edit-product/:id",

//     upload.fields([
//         {
//             name: "images",
//             maxCount: 10
//         },
//         {
//             name: "videos",
//             maxCount: 5
//         }
//     ]),

//     async (req, res) => {

//         try {

//             console.log("========== EDIT PRODUCT ==========");
//             console.log("PRODUCT ID:", req.params.id);
//             console.log("BODY:", req.body);
//             console.log("FILES:", req.files);


//             // =============================
//             // FIND PRODUCT
//             // =============================

//             const product =
//                 await Product.findById(req.params.id);

//             if (!product) {

//                 return res
//                     .status(404)
//                     .send("Product Not Found");

//             }


//             // =============================
//             // COMPOSITION
//             // =============================

//             let composition = [];

//             if (Array.isArray(req.body.composition)) {

//                 composition =
//                     req.body.composition
//                         .map(item =>
//                             String(item).trim()
//                         )
//                         .filter(Boolean);

//             } else if (req.body.composition) {

//                 composition = [
//                     String(
//                         req.body.composition
//                     ).trim()
//                 ];

//             }


//             // =============================
//             // BASIC INFORMATION
//             // =============================

//             product.name =
//                 req.body.name || "";

//             product.brand =
//                 req.body.brand || "";

//             product.category =
//                 req.body.category || "";

//             product.manufacturer =
//                 req.body.manufacturer || "";


//             // =============================
//             // PRICE
//             // =============================

//             product.mrp =
//                 req.body.mrp !== undefined &&
//                 req.body.mrp !== ""
//                     ? Number(req.body.mrp)
//                     : 0;

//             product.price =
//                 req.body.price !== undefined &&
//                 req.body.price !== ""
//                     ? Number(req.body.price)
//                     : 0;


//             // =============================
//             // STOCK
//             // =============================

//             product.stock =
//                 req.body.stock !== undefined &&
//                 req.body.stock !== ""
//                     ? Number(req.body.stock)
//                     : 0;


//             // =============================
//             // PACK / BATCH
//             // =============================

//             product.packSize =
//                 req.body.packSize || "";

//             product.batchNo =
//                 req.body.batchNo || "";


//             // =============================
//             // DATES
//             // =============================

//             product.mfgDate =
//                 req.body.mfgDate || "";

//             product.expDate =
//                 req.body.expDate || "";


//             // =============================
//             // COMPOSITION
//             // =============================

//             product.composition =
//                 composition;


//             // =============================
//             // PRODUCT DETAILS
//             // =============================

//             product.description =
//                 req.body.description || "";

//             product.uses =
//                 req.body.uses || "";

//             product.benefits =
//                 req.body.benefits || "";

//             product.dosage =
//                 req.body.dosage || "";

//             product.sideEffects =
//                 req.body.sideEffects || "";

//             product.storage =
//                 req.body.storage || "";


//             // =================================================
//             // NEW IMAGES
//             // =================================================

//             const imageFiles =
//                 req.files?.images || [];


//             if (imageFiles.length > 0) {

//                 console.log(
//                     "NEW IMAGE COUNT:",
//                     imageFiles.length
//                 );


//                 const newImages =
//                     imageFiles
//                         .map(file =>
//                             file.path ||
//                             file.secure_url ||
//                             file.url
//                         )
//                         .filter(Boolean);


//                 // Existing images

//                 let existingImages = [];


//                 if (
//                     Array.isArray(product.images)
//                 ) {

//                     existingImages =
//                         product.images
//                             .filter(Boolean);

//                 }


//                 // Old single image preserve

//                 if (
//                     product.image &&
//                     !existingImages.includes(
//                         product.image
//                     )
//                 ) {

//                     existingImages.push(
//                         product.image
//                     );

//                 }


//                 // Existing + New

//                 product.images = [
//                     ...existingImages,
//                     ...newImages
//                 ];


//                 // Main image

//                 if (
//                     !product.image &&
//                     newImages.length
//                 ) {

//                     product.image =
//                         newImages[0];

//                 }

//             }


//             // =================================================
//             // NEW VIDEOS
//             // =================================================

//             const videoFiles =
//                 req.files?.videos || [];


//             if (videoFiles.length > 0) {

//                 console.log(
//                     "NEW VIDEO COUNT:",
//                     videoFiles.length
//                 );


//                 const newVideos =
//                     videoFiles
//                         .map(file =>
//                             file.path ||
//                             file.secure_url ||
//                             file.url
//                         )
//                         .filter(Boolean);


//                 // Existing videos

//                 let existingVideos = [];


//                 if (
//                     Array.isArray(product.videos)
//                 ) {

//                     existingVideos =
//                         product.videos
//                             .filter(Boolean);

//                 }


//                 // Existing + New

//                 product.videos = [
//                     ...existingVideos,
//                     ...newVideos
//                 ];

//             }


//             // =============================
//             // SAVE
//             // =============================

//             await product.save();


//             console.log(
//                 "PRODUCT UPDATED:",
//                 product._id
//             );


//             console.log(
//                 "TOTAL IMAGES:",
//                 product.images?.length || 0
//             );

//             console.log(
//                 "TOTAL VIDEOS:",
//                 product.videos?.length || 0
//             );


//             // =============================
//             // REDIRECT
//             // =============================

//             return res.redirect(
//                 "/admin/manage-products"
//             );


//         } catch (err) {

//             console.error(
//                 "UPDATE PRODUCT ERROR:",
//                 err
//             );


//             return res
//                 .status(500)
//                 .send(
//                     "Product Update Error: " +
//                     err.message
//                 );

//         }

//     }
// );

// module.exports = router;


require("dotenv").config();

const crypto = require("crypto");
const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();


// ======================================================
// RAZORPAY
// ======================================================

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// ======================================================
// PAGES
// ======================================================

const dashboard = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const DoctorLogin = require("../pages/doctorLogin");
const ManageDoctors = require("../pages/manageDoctors");
const AddDoctor = require("../pages/addpages/addDoctor");
const DoctorDashboard = require("../pages/doctorDashboard");

const ManageProducts = require("../pages/manageProducts");
const AddProduct = require("../pages/addpages/addProduct");
const EditProduct = require("../pages/editpages/EditProduct");

const DoctorProfile = require("../pages/doctorProfile");

const Consultation = require("../pages/consultation");

const ManageGovernment = require("../pages/manageGovernment");

const ManageServices = require("../pages/services");


// ======================================================
// CONTROLLERS
// ======================================================

const { login } = require("../controllers/adminAuth");
const AdminController = require("../controllers/adminController");


// ======================================================
// COMPONENTS
// ======================================================

const AddGovernment =
    require("../views/component/dashboard/addGovernment");


// ======================================================
// MODELS
// ======================================================

const Banner = require("../models/Banner");
const Student = require("../models/Student");
const Service = require("../models/Service");
const Doctor = require("../models/Doctor");
const Product = require("../models/Product");
const GovernmentPerson =
    require("../models/GovernmentPerson");


// ======================================================
// UPLOAD
// ======================================================

const upload = require("../config/upload");


// ======================================================
// ADMIN LOGIN
// ======================================================

router.get("/", (req, res) => {

    res.send(
        AdminLogin()
    );

});


router.post(
    "/login",
    login
);


// ======================================================
// ADMIN DASHBOARD
// ======================================================

router.get(
    "/admindashboard",
    async (req, res) => {

        try {

            const doctorCount =
                await Doctor.countDocuments();

            const studentCount =
                await Student.countDocuments();

            const serviceCount =
                await Service.countDocuments();

            const bannerCount =
                await Banner.countDocuments();


            console.log(
                "DOCTOR COUNT:",
                doctorCount
            );

            console.log(
                "STUDENT COUNT:",
                studentCount
            );

            console.log(
                "SERVICE COUNT:",
                serviceCount
            );

            console.log(
                "BANNER COUNT:",
                bannerCount
            );


            const data = {

                doctorCount,

                studentCount,

                serviceCount,

                bannerCount

            };


            console.log(
                "=== ADMIN ROUTE DATA ==="
            );

            console.log(data);


            return res.send(
                dashboard(data)
            );


        } catch (err) {

            console.error(
                "DASHBOARD ERROR:",
                err
            );

            return res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// BANNER
// ======================================================

router.get(
    "/manage-banners",
    AdminController.manageBanners
);


router.get(
    "/manage-banner",
    AdminController.manageBanners
);


router.get(
    "/add-banner",
    AdminController.addBannerPage
);


router.post(
    "/add-banner",
    upload.single("image"),
    AdminController.saveBanner
);


router.get(
    "/delete-banner/:id",
    AdminController.deleteBanner
);


// ======================================================
// DOCTOR LOGIN PAGE
// ======================================================

router.get(
    "/doctor-login",
    (req, res) => {

        res.send(
            DoctorLogin()
        );

    }
);


// ======================================================
// DOCTOR LOGIN
// ======================================================

router.post(
    "/doctor/login",
    async (req, res) => {

        try {

            const {
                doctorId,
                password
            } = req.body;


            const doctor =
                await Doctor.findOne({
                    doctorId: doctorId
                });


            if (!doctor) {

                return res.send(
                    DoctorLogin(
                        "Doctor Not Found"
                    )
                );

            }


            if (
                doctor.password !== password
            ) {

                return res.send(
                    DoctorLogin(
                        "Wrong Password"
                    )
                );

            }


            // Doctor session

            req.session.doctor =
                doctor;


            console.log(
                "Doctor Session Saved:"
            );

            console.log(
                req.session.doctor
            );


            return res.redirect(
                "/doctor/dashboard"
            );


        } catch (err) {

            console.error(
                "DOCTOR LOGIN ERROR:",
                err
            );


            return res.send(
                "Login Error"
            );

        }

    }
);


// ======================================================
// MANAGE DOCTORS
// ======================================================

router.get(
    "/manage-doctors",
    async (req, res) => {

        try {

            const doctors =
                await Doctor
                    .find()
                    .sort({
                        createdAt: -1
                    });


            res.send(
                ManageDoctors(doctors)
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// ADD DOCTOR
// ======================================================

router.post(
    "/add-doctor",

    upload.single("image"),

    async (req, res) => {

        try {

            console.log(
                "BODY:",
                req.body
            );

            console.log(
                "FILE:",
                req.file
            );


            // ------------------------------------------
            // CHECK PHONE
            // ------------------------------------------

            const existDoctor =
                await Doctor.findOne({
                    phone: req.body.phone
                });


            if (existDoctor) {

                return res.send(
                    "Phone Number Already Registered"
                );

            }


            // ------------------------------------------
            // GENERATE DOCTOR ID
            // ------------------------------------------

            const lastDoctor =
                await Doctor
                    .findOne()
                    .sort({
                        createdAt: -1
                    });


            let nextNumber = 1001;


            if (
                lastDoctor &&
                lastDoctor.doctorId
            ) {

                const oldNumber =
                    parseInt(
                        lastDoctor.doctorId
                            .replace("DOC", "")
                    );


                if (!isNaN(oldNumber)) {

                    nextNumber =
                        oldNumber + 1;

                }

            }


            const doctorId =
                "DOC" + nextNumber;


            // ------------------------------------------
            // CREATE DOCTOR
            // ------------------------------------------

            const doctor =
                new Doctor({

                    doctorId,

                    name:
                        req.body.name,

                    degree:
                        req.body.qualification,

                    specialization:
                        req.body.speciality,

                    experience:
                        req.body.experience,

                    hospital:
                        req.body.clinic,

                    phone:
                        req.body.phone,

                    email:
                        req.body.email,

                    password:
                        req.body.password,

                    address:
                        req.body.address,

                    description:
                        req.body.description,


                    // Availability

                    availableDay:
                        req.body.availableDay,

                    timeFrom:
                        req.body.timeFrom,

                    timeTo:
                        req.body.timeTo,


                    // Appointment

                    slotDuration:
                        req.body.slotDuration,


                    // Fee

                    fee:
                        req.body.fee,

                    feeType:
                        req.body.feeType,


                    // Image

                    image:
                        req.file
                            ? req.file.path
                            : ""

                });


            await doctor.save();


            console.log(
                "Doctor Saved:",
                doctor
            );


            return res.redirect(
                "/admin/manage-doctors"
            );


        } catch (err) {

            console.error(
                "ADD DOCTOR ERROR:",
                err
            );


            return res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// DELETE DOCTOR
// ======================================================

router.get(
    "/delete-doctor/:id",
    async (req, res) => {

        try {

            await Doctor.findByIdAndDelete(
                req.params.id
            );


            res.redirect(
                "/admin/manage-doctors"
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// EDIT DOCTOR
// ======================================================

const EditDoctor =
    require("../pages/editpages/editDoctor");


router.get(
    "/edit-doctor/:id",
    async (req, res) => {

        try {

            const doctor =
                await Doctor.findById(
                    req.params.id
                );


            if (!doctor) {

                return res.send(
                    "Doctor Not Found"
                );

            }


            res.send(
                EditDoctor(doctor)
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// MANAGE PRODUCTS
// ======================================================

router.get(
    "/manage-products",
    async (req, res) => {

        try {

            const products =
                await Product
                    .find()
                    .sort({
                        createdAt: -1
                    });


            res.send(
                ManageProducts(products)
            );


        } catch (err) {

            console.error(
                "MANAGE PRODUCTS ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// ADD PRODUCT PAGE
// ======================================================

router.get(
    "/add-product",
    (req, res) => {

        res.send(
            AddProduct()
        );

    }
);


// ======================================================
// ADD PRODUCT
// ======================================================

router.post(
    "/add-product",

    upload.fields([

        {
            name: "image",
            maxCount: 1
        },

        {
            name: "images",
            maxCount: 10
        },

        {
            name: "video",
            maxCount: 1
        }

    ]),

    async (req, res) => {

        try {

            console.log(
                "========== ADD PRODUCT =========="
            );

            console.log(
                "BODY:",
                req.body
            );

            console.log(
                "FILES:",
                req.files
            );


            // ------------------------------------------
            // COMPOSITION
            // ------------------------------------------

            let composition = [];


            if (
                Array.isArray(
                    req.body.composition
                )
            ) {

                composition =
                    req.body.composition
                        .map(item =>
                            String(item).trim()
                        )
                        .filter(Boolean);

            }

            else if (
                req.body.composition
            ) {

                composition = [

                    String(
                        req.body.composition
                    ).trim()

                ];

            }


            // ------------------------------------------
            // MAIN IMAGE
            // ------------------------------------------

            let mainImage = "";


            if (
                req.files &&
                req.files.image &&
                req.files.image.length > 0
            ) {

                mainImage =
                    req.files.image[0].path ||
                    req.files.image[0].secure_url ||
                    req.files.image[0].url ||
                    "";

            }


            // ------------------------------------------
            // MORE IMAGES
            // ------------------------------------------

            let images = [];


            if (
                req.files &&
                req.files.images
            ) {

                images =
                    req.files.images
                        .map(file =>
                            file.path ||
                            file.secure_url ||
                            file.url
                        )
                        .filter(Boolean);

            }


            // ------------------------------------------
            // VIDEO
            // ------------------------------------------

            let video = "";


            if (
                req.files &&
                req.files.video &&
                req.files.video.length > 0
            ) {

                video =
                    req.files.video[0].path ||
                    req.files.video[0].secure_url ||
                    req.files.video[0].url ||
                    "";

            }


            // ------------------------------------------
            // CREATE PRODUCT
            // ------------------------------------------

            const product =
                new Product({

                    name:
                        req.body.name || "",

                    brand:
                        req.body.brand || "",

                    category:
                        req.body.category || "",

                    manufacturer:
                        req.body.manufacturer || "",


                    mrp:
                        req.body.mrp !== undefined &&
                        req.body.mrp !== ""
                            ? Number(req.body.mrp)
                            : 0,


                    price:
                        req.body.price !== undefined &&
                        req.body.price !== ""
                            ? Number(req.body.price)
                            : 0,


                    stock:
                        req.body.stock !== undefined &&
                        req.body.stock !== ""
                            ? Number(req.body.stock)
                            : 0,


                    packSize:
                        req.body.packSize || "",

                    batchNo:
                        req.body.batchNo || "",

                    mfgDate:
                        req.body.mfgDate || "",

                    expDate:
                        req.body.expDate || "",


                    composition,

                    images,

                    image:
                        mainImage,


                    description:
                        req.body.description || "",

                    uses:
                        req.body.uses || "",

                    benefits:
                        req.body.benefits || "",

                    dosage:
                        req.body.dosage || "",

                    sideEffects:
                        req.body.sideEffects || "",

                    storage:
                        req.body.storage || "",


                    // IMPORTANT
                    // Single video field

                    video

                });


            await product.save();


            console.log(
                "PRODUCT SAVED:",
                product._id
            );

            console.log(
                "VIDEO:",
                product.video
            );


            return res.redirect(
                "/admin/manage-products"
            );


        } catch (err) {

            console.error(
                "ADD PRODUCT ERROR:",
                err
            );


            return res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// EDIT PRODUCT PAGE
// ======================================================

router.get(
    "/edit-product/:id",
    async (req, res) => {

        try {

            const product =
                await Product.findById(
                    req.params.id
                );


            if (!product) {

                return res
                    .status(404)
                    .send(
                        "Product Not Found"
                    );

            }


            res.send(
                EditProduct(product)
            );


        } catch (err) {

            console.error(
                "EDIT PRODUCT PAGE ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// UPDATE PRODUCT
// ======================================================

router.post(
    "/edit-product/:id",

    upload.fields([

        {
            name: "images",
            maxCount: 10
        },

        {
            name: "video",
            maxCount: 1
        }

    ]),

    async (req, res) => {

        try {

            console.log(
                "\n========== EDIT PRODUCT =========="
            );

            console.log(
                "PRODUCT ID:",
                req.params.id
            );

            console.log(
                "BODY:",
                req.body
            );

            console.log(
                "FILES:",
                req.files
            );


            // ------------------------------------------
            // FIND PRODUCT
            // ------------------------------------------

            const product =
                await Product.findById(
                    req.params.id
                );


            if (!product) {

                return res
                    .status(404)
                    .send(
                        "Product Not Found"
                    );

            }


            // ------------------------------------------
            // BASIC DETAILS
            // ------------------------------------------

            product.name =
                req.body.name || "";

            product.brand =
                req.body.brand || "";

            product.category =
                req.body.category || "";

            product.manufacturer =
                req.body.manufacturer || "";


            // ------------------------------------------
            // PRICE
            // ------------------------------------------

            product.mrp =
                req.body.mrp !== undefined &&
                req.body.mrp !== ""
                    ? Number(req.body.mrp)
                    : 0;


            product.price =
                req.body.price !== undefined &&
                req.body.price !== ""
                    ? Number(req.body.price)
                    : 0;


            product.stock =
                req.body.stock !== undefined &&
                req.body.stock !== ""
                    ? Number(req.body.stock)
                    : 0;


            // ------------------------------------------
            // MEDICINE DETAILS
            // ------------------------------------------

            product.packSize =
                req.body.packSize || "";

            product.batchNo =
                req.body.batchNo || "";

            product.mfgDate =
                req.body.mfgDate || "";

            product.expDate =
                req.body.expDate || "";


            // ------------------------------------------
            // COMPOSITION
            // ------------------------------------------

            let composition = [];


            if (
                Array.isArray(
                    req.body.composition
                )
            ) {

                composition =
                    req.body.composition
                        .map(item =>
                            String(item).trim()
                        )
                        .filter(Boolean);

            }

            else if (
                req.body.composition
            ) {

                composition = [

                    String(
                        req.body.composition
                    ).trim()

                ];

            }


            product.composition =
                composition;


            // ------------------------------------------
            // PRODUCT DETAILS
            // ------------------------------------------

            product.description =
                req.body.description || "";

            product.uses =
                req.body.uses || "";

            product.benefits =
                req.body.benefits || "";

            product.dosage =
                req.body.dosage || "";

            product.sideEffects =
                req.body.sideEffects || "";

            product.storage =
                req.body.storage || "";


            // =================================================
            // NEW IMAGES
            // =================================================

            const imageFiles =
                req.files?.images || [];


            if (
                imageFiles.length > 0
            ) {

                console.log(
                    "NEW IMAGE COUNT:",
                    imageFiles.length
                );


                const newImages =
                    imageFiles
                        .map(file =>
                            file.path ||
                            file.secure_url ||
                            file.url
                        )
                        .filter(Boolean);


                let existingImages = [];


                if (
                    Array.isArray(
                        product.images
                    )
                ) {

                    existingImages =
                        product.images
                            .filter(Boolean);

                }


                // Old main image preserve

                if (
                    product.image &&
                    !existingImages.includes(
                        product.image
                    )
                ) {

                    existingImages.push(
                        product.image
                    );

                }


                // Existing + New

                product.images = [

                    ...existingImages,

                    ...newImages

                ];


                // Main image

                if (
                    !product.image &&
                    newImages.length > 0
                ) {

                    product.image =
                        newImages[0];

                }

            }


            // =================================================
            // NEW VIDEO
            // =================================================

            const videoFiles =
                req.files?.video || [];


            if (
                videoFiles.length > 0
            ) {

                console.log(
                    "NEW VIDEO COUNT:",
                    videoFiles.length
                );


                const newVideo =
                    videoFiles[0].path ||
                    videoFiles[0].secure_url ||
                    videoFiles[0].url;


                console.log(
                    "NEW VIDEO URL:",
                    newVideo
                );


                if (newVideo) {

                    // IMPORTANT:
                    // Schema field = video

                    product.video =
                        newVideo;

                }

            }

            else {

                console.log(
                    "NO NEW VIDEO - OLD VIDEO KEPT"
                );

            }


            // =================================================
            // SAVE
            // =================================================

            await product.save();


            // =================================================
            // FINAL LOG
            // =================================================

            console.log(
                "================================="
            );

            console.log(
                "PRODUCT UPDATED:",
                product._id
            );

            console.log(
                "TOTAL IMAGES:",
                product.images?.length || 0
            );

            console.log(
                "SAVED VIDEO:",
                product.video
            );

            console.log(
                "================================="
            );


            return res.redirect(
                "/admin/manage-products"
            );


        } catch (err) {

            console.error(
                "UPDATE PRODUCT ERROR:",
                err
            );


            return res
                .status(500)
                .send(
                    "Product Update Error: " +
                    err.message
                );

        }

    }
);


// ======================================================
// DELETE PRODUCT
// ======================================================

router.get(
    "/delete-product/:id",
    async (req, res) => {

        try {

            await Product.findByIdAndDelete(
                req.params.id
            );


            res.redirect(
                "/admin/manage-products"
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// DOCTOR PROFILE
// ======================================================

router.get(
    "/doctor/:id",
    async (req, res) => {

        try {

            const doctor =
                await Doctor.findById(
                    req.params.id
                );


            if (!doctor) {

                return res.send(
                    "Doctor Not Found"
                );

            }


            res.send(
                DoctorProfile(doctor)
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// CREATE PHONE PAYMENT
// ======================================================

router.post(
    "/create-phone-payment",
    async (req, res) => {

        try {

            const order =
                await razorpay.orders.create({

                    amount: 100,

                    currency: "INR",

                    receipt:
                        "phone_unlock_" +
                        Date.now()

                });


            res.json(order);


        } catch (err) {

            console.error(
                "RAZORPAY ERROR:",
                err
            );


            res
                .status(500)
                .json({
                    error: err.message
                });

        }

    }
);


// ======================================================
// VERIFY PHONE PAYMENT
// ======================================================

router.post(
    "/verify-phone-payment",
    async (req, res) => {

        try {

            const {
                paymentId,
                orderId,
                signature,
                doctorId
            } = req.body;


            const body =
                orderId +
                "|" +
                paymentId;


            const expectedSignature =
                crypto
                    .createHmac(
                        "sha256",
                        process.env.RAZORPAY_KEY_SECRET
                    )
                    .update(body)
                    .digest("hex");


            if (
                expectedSignature !==
                signature
            ) {

                return res.json({
                    success: false,
                    message:
                        "Invalid Payment Signature"
                });

            }


            const doctor =
                await Doctor.findByIdAndUpdate(

                    doctorId,

                    {
                        phoneUnlocked:
                            true
                    },

                    {
                        new: true
                    }

                );


            if (!doctor) {

                return res.json({

                    success: false,

                    message:
                        "Doctor Not Found"

                });

            }


            return res.json({

                success: true,

                phone:
                    doctor.phone

            });


        } catch (err) {

            console.error(
                "VERIFY PAYMENT ERROR:",
                err
            );


            return res.status(500).json({

                success: false,

                message:
                    err.message

            });

        }

    }
);


// ======================================================
// CONSULTATION
// ======================================================

router.get(
    "/consultation/:id",
    Consultation
);


// ======================================================
// ADD GOVERNMENT
// ======================================================

router.get(
    "/add-government",
    (req, res) => {

        res.send(
            AddGovernment()
        );

    }
);


router.post(
    "/add-government",

    upload.single("image"),

    async (req, res) => {

        try {

            const person =
                new GovernmentPerson({

                    name:
                        req.body.name,

                    position:
                        req.body.position,

                    department:
                        req.body.department,

                    phone:
                        req.body.phone,

                    address:
                        req.body.address,

                    description:
                        req.body.description,

                    image:
                        req.file
                            ? req.file.path
                            : ""

                });


            await person.save();


            console.log(
                "Government Person Saved:",
                person
            );


            res.redirect(
                "/admin/add-government"
            );


        } catch (err) {

            console.error(
                "ADD GOVERNMENT ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// MANAGE GOVERNMENT
// ======================================================

router.get(
    "/manage-government",
    async (req, res) => {

        try {

            const persons =
                await GovernmentPerson
                    .find()
                    .sort({
                        createdAt: -1
                    });


            res.send(
                ManageGovernment(persons)
            );


        } catch (err) {

            console.error(
                "MANAGE GOVERNMENT ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// MANAGE SERVICES
// ======================================================

router.get(
    "/manage-services",
    async (req, res) => {

        try {

            const services =
                await Service
                    .find()
                    .sort({
                        createdAt: -1
                    });


            res.send(
                ManageServices(services)
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// ADD SERVICE
// ======================================================

router.get(
    "/add-service",
    (req, res) => {

        res.send(
            AddService()
        );

    }
);


// ======================================================
// SAVE SERVICE
// ======================================================

router.post(
    "/add-service",

    upload.single("image"),

    async (req, res) => {

        try {

            const features =
                req.body.features
                    ? req.body.features
                        .split("\n")
                        .map(f => f.trim())
                        .filter(Boolean)
                    : [];


            const service =
                new Service({

                    title:
                        req.body.title,

                    description:
                        req.body.description,

                    features,

                    image:
                        req.file
                            ? req.file.path
                            : ""

                });


            await service.save();


            res.redirect(
                "/admin/manage-services"
            );


        } catch (err) {

            console.error(
                "ADD SERVICE ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// EDIT SERVICE
// ======================================================

router.get(
    "/edit-service/:id",
    async (req, res) => {

        try {

            const service =
                await Service.findById(
                    req.params.id
                );


            if (!service) {

                return res.send(
                    "Service Not Found"
                );

            }


            res.send(
                EditService(service)
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// UPDATE SERVICE
// ======================================================

router.post(
    "/edit-service/:id",

    upload.single("image"),

    async (req, res) => {

        try {

            const updateData = {

                title:
                    req.body.title,

                description:
                    req.body.description,

                features:
                    req.body.features
                        ? req.body.features
                            .split("\n")
                            .map(f => f.trim())
                            .filter(Boolean)
                        : []

            };


            if (req.file) {

                updateData.image =
                    req.file.path;

            }


            await Service.findByIdAndUpdate(

                req.params.id,

                updateData,

                {
                    new: true
                }

            );


            res.redirect(
                "/admin/manage-services"
            );


        } catch (err) {

            console.error(
                "UPDATE SERVICE ERROR:",
                err
            );


            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// DELETE SERVICE
// ======================================================

router.get(
    "/delete-service/:id",
    async (req, res) => {

        try {

            await Service.findByIdAndDelete(
                req.params.id
            );


            res.redirect(
                "/admin/manage-services"
            );


        } catch (err) {

            console.error(err);

            res
                .status(500)
                .send(err.message);

        }

    }
);


// ======================================================
// EXPORT
// ======================================================

module.exports = router;