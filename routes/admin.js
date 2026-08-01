// require("dotenv").config();
// const crypto = require("crypto");
// console.log("KEY:", process.env.RAZORPAY_KEY_ID);
// console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

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
// // const upload = require("../config/multer");
// const upload = require("../config/upload");
// const Product = require("../models/Product");


// // =============================
// // Admin Login
// // =============================

// router.get("/", (req, res) => {
//     res.send(AdminLogin());
// });

// router.post("/login", login);


// // =============================
// // Dashboard
// // =============================

// router.get("/admindashboard", async (req, res) => {

//     try {

//         const doctorCount = await Doctor.countDocuments();

//         const bannerCount = await Banner.countDocuments();


//         const data = {

//             doctorCount,

//             bannerCount

//         };


//         console.log("Dashboard Data:", data);


//         res.send(dashboard(data));


//     } catch(err){

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });


// // =============================
// // Banner
// // =============================

// router.get("/manage-banners", AdminController.manageBanners);
// router.get("/manage-banner", AdminController.manageBanners);

// router.get("/add-banner", AdminController.addBannerPage);

// // router.post(
// //     "/add-banner",
// //     (req,res,next)=>{

// //         upload.single("image")(req,res,function(err){

// //             if(err){

// //                 console.log("MULTER ERROR:",err);

// //                 return res.status(500).send(err.message);

// //             }

// //             next();

// //         });

// //     },
// //     AdminController.saveBanner
// // );


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

// router.post("/doctor/login", async (req, res) => {

//     try {

//         const { doctorId, password } = req.body;

//         const doctor = await Doctor.findOne({ doctorId });

//         if (!doctor) {
//             return res.send(DoctorLogin("Doctor ID Not Registered"));
//         }

//         if (doctor.password !== password) {
//             return res.send(DoctorLogin("Wrong Password"));
//         }

//         // Products MongoDB से लाओ
//         const products = await Product.find().sort({ createdAt: -1 });

//         // Dashboard भेजो
//         res.send(DoctorDashboard(doctor, products));

//     } catch (err) {

//         console.log(err);
//         res.status(500).send(err.message);

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


// // =============================
// // Add Doctor Page
// // =============================

// router.get("/add-doctor", (req, res) => {
//     res.send(AddDoctor());
// });


// // =============================
// // Save Doctor
// // =============================

// router.post(
//     "/add-doctor",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             console.log("BODY:", req.body);
//             console.log("FILE:", req.file);

//            const lastDoctor = await Doctor.findOne()
// .sort({ createdAt: -1 });


// let nextNumber = 1001;


// if(lastDoctor && lastDoctor.doctorId){

//     nextNumber =
//     parseInt(lastDoctor.doctorId.replace("DOC","")) + 1;

// }


// const doctorId = "DOC" + nextNumber;

//             const doctor = new Doctor({

//                 doctorId,

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

//              image: req.file
//     ? req.file.path
//     : ""

//             });

//             await doctor.save();

//             console.log("Doctor Saved:", doctor);

//             res.redirect("/admin/manage-doctors");

//         } catch (err) {

//             console.log("ADD DOCTOR ERROR:", err);

//             res.status(500).send(err.message);

//         }

//     }
// );


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
// // Edit Doctor Page
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

// // Update Doctor
// router.post(
//     "/edit-doctor/:id",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             const updateData = {
//                 name: req.body.name,
//                 degree: req.body.qualification,
//                 specialization: req.body.speciality,
//                 experience: req.body.experience,
//                 hospital: req.body.clinic,
//                 phone: req.body.phone,
//                 email: req.body.email,
//                 password: req.body.password,
//                 address: req.body.address,
//                 description: req.body.description
//             };

//    if (req.file) {

//     updateData.image = req.file.path;

// }

//             await Doctor.findByIdAndUpdate(req.params.id, updateData);

//             res.redirect("/admin/manage-doctors");

//         } catch (err) {
//             console.log(err);
//             res.status(500).send(err.message);
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
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             const product = new Product({

//                 name: req.body.name,
//                 price: req.body.price,
//                 description: req.body.description,

//        image: req.file
//     ? req.file.path
//     : ""

//             });

//             await product.save();

//             res.redirect("/admin/manage-products");

//         } catch (err) {

//             console.log(err);
//             res.status(500).send(err.message);

//         }

//     }
// );
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


// router.get("/doctor/:id", async (req,res)=>{

//     try{

//         const doctor = await Doctor.findById(req.params.id);

//         if(!doctor){
//             return res.send("Doctor Not Found");
//         }


//         res.send(
//             DoctorProfile(doctor)
//         );


//     }catch(err){

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });

// // const Razorpay = require("razorpay");

// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY,
// //     key_secret: process.env.RAZORPAY_SECRET
// // });
// router.post("/create-phone-payment", async(req,res)=>{

// try{

// const order = await razorpay.orders.create({

// amount:100,   // ₹1 = 100 paise
// currency:"INR",
// receipt:"phone_unlock"

// });


// res.json(order);


// }catch(err){

// console.log(err);

// res.status(500).json({
// error:err.message
// });

// }

// });

// router.post("/verify-phone-payment", async (req, res) => {

//     const {
//         paymentId,
//         orderId,
//         signature,
//         doctorId
//     } = req.body;

//     const body = orderId + "|" + paymentId;

//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body)
//         .digest("hex");

//     if (expectedSignature !== signature) {
//         return res.json({
//             success: false
//         });
//     }

//     const doctor = await Doctor.findByIdAndUpdate(
//         doctorId,
//         {
//             phoneUnlocked: true
//         },
//         {
//             new: true
//         }
//     );

//     return res.json({
//         success: true,
//         phone: doctor.phone
//     });

// });


// // router.get("/consultation/:id", async (req,res)=>{

// //     try{

// //         const doctor = await Doctor.findById(req.params.id);


// //         if(!doctor){
// //             return res.send("Doctor not found");
// //         }


// //         res.send(`
        
// //         <h1>
// //         Consultation with Dr. ${doctor.name}
// //         </h1>

// //         <p>
// //         Specialization: ${doctor.specialization}
// //         </p>

// //         <p>
// //         Address: ${doctor.address}
// //         </p>

// //         <button>
// //         Book Appointment
// //         </button>

// //         `);


// //     }catch(error){

// //         console.log(error);

// //         res.status(500).send("Server Error");

// //     }

// // });

// const Consultation = require("../pages/consultation");






// router.get("/consultation/:id", Consultation);





// router.get("/add-government",(req,res)=>{

//     res.send(AddGovernment());

// });

// const GovernmentPerson = require("../models/GovernmentPerson");
// router.post(
// "/add-government",
// upload.single("image"),
// async(req,res)=>{

// try{


// const person = new GovernmentPerson({

// name:req.body.name,

// position:req.body.position,

// department:req.body.department,

// phone:req.body.phone,

// address:req.body.address,

// description:req.body.description,


// image:req.file
// ? req.file.path
// :""

// });


// await person.save();


// console.log("Government Person Saved:", person);


// res.redirect("/admin/add-government");


// }
// catch(err){

// console.log("ADD GOVERNMENT ERROR:",err);

// res.status(500).send(err.message);

// }


// });

// const ManageGovernment = require("../pages/manageGovernment");

// router.get("/manage-government", async(req,res)=>{

//     try{

//         const persons = await GovernmentPerson
//         .find()
//         .sort({createdAt:-1});


//         res.send(
//             ManageGovernment(persons)
//         );


//     }catch(err){

//         console.log("MANAGE GOVERNMENT ERROR:",err);

//         res.status(500)
//         .send(err.message);

//     }

// });




// module.exports = router;



require("dotenv").config();
const crypto = require("crypto");
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

const AddGovernment = require("../views/component/dashboard/addGovernment");

const Banner = require("../models/Banner");
const Student = require("../models/Student");
const Service = require("../models/Service");
const Doctor = require("../models/Doctor");
const Product = require("../models/Product");

const upload = require("../config/upload");


// =============================
// Admin Login
// =============================

router.get("/", (req, res) => {
    res.send(AdminLogin());
});

router.post("/login", login);


// =============================
// Dashboard (FIXED HERE)
// =============================

// =============================
// Dashboard
// =============================

router.get("/admindashboard", async (req, res) => {
    try {

        const doctorCount = await Doctor.countDocuments();
        const studentCount = await Student.countDocuments();
        const serviceCount = await Service.countDocuments();
        const bannerCount = await Banner.countDocuments();

        console.log("DOCTOR COUNT:", doctorCount);
        console.log("STUDENT COUNT:", studentCount);
        console.log("SERVICE COUNT:", serviceCount);
        console.log("BANNER COUNT:", bannerCount);


        const data = {
            doctorCount,
            studentCount,
            serviceCount,
            bannerCount
        };


        console.log("=== ADMIN ROUTE DATA ===");
        console.log(data);


        return res.send(dashboard(data));


    } catch (err) {

        console.log("DASHBOARD ERROR:", err);
        return res.status(500).send(err.message);

    }
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
            return res.send(DoctorLogin("Doctor ID Not Registered"));
        }

        if (doctor.password !== password) {
            return res.send(DoctorLogin("Wrong Password"));
        }

        const products = await Product.find().sort({ createdAt: -1 });

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

// router.post(
//     "/add-doctor",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             console.log("BODY:", req.body);
//             console.log("FILE:", req.file);



//             // Duplicate Phone Check

//             const existDoctor = await Doctor.findOne({
//                 phone: req.body.phone
//             });


//             if (existDoctor) {

//                 return res.send(
//                     AddDoctor("Phone Number Already Registered")
//                 );

//             }



//             // Generate Doctor ID

//             const lastDoctor = await Doctor.findOne()
//                 .sort({ createdAt: -1 });


//             let nextNumber = 1001;


//             if (lastDoctor && lastDoctor.doctorId) {

//                 nextNumber =
//                 parseInt(lastDoctor.doctorId.replace("DOC", "")) + 1;

//             }


//             const doctorId = "DOC" + nextNumber;



//             // Create Doctor

//             const doctor = new Doctor({

//                 doctorId,


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



//                 // Availability

//                 availableDay: req.body.availableDay,

//                 timeFrom: req.body.timeFrom,

//                 timeTo: req.body.timeTo,



//                 // Fee

//                 fee: req.body.fee,

//                 feeType: req.body.feeType,



//                 image: req.file ? req.file.path : ""

//             });



//             await doctor.save();


//             console.log("Doctor Saved:", doctor);


//             res.redirect("/admin/manage-doctors");



//         } catch (err) {


//             console.log("ADD DOCTOR ERROR:", err);


//             if (err.code === 11000) {

//                 return res.send(
//                     AddDoctor("Phone Number Already Registered")
//                 );

//             }


//             res.status(500).send(err.message);

//         }

//     }
// );


router.post(
    "/add-doctor",
    upload.single("image"),
    async (req,res)=>{

    try{


        console.log("BODY:",req.body);
        console.log("FILE:",req.file);



        const existDoctor = await Doctor.findOne({
            phone:req.body.phone
        });


        if(existDoctor){

            return res.send(
                "Phone Number Already Registered"
            );

        }



        const lastDoctor = await Doctor.findOne()
        .sort({createdAt:-1});


        let nextNumber = 1001;


        if(lastDoctor && lastDoctor.doctorId){

            nextNumber =
            parseInt(
                lastDoctor.doctorId.replace("DOC","")
            ) + 1;

        }


        const doctorId = "DOC" + nextNumber;



        const doctor = new Doctor({


            doctorId,


            name:req.body.name,


            degree:req.body.qualification,


            specialization:req.body.speciality,


            experience:req.body.experience,


            hospital:req.body.clinic,


            phone:req.body.phone,


            email:req.body.email,


            password:req.body.password,


            address:req.body.address,


            description:req.body.description,



            // ======================
            // DOCTOR AVAILABILITY
            // ======================


            availableDay:req.body.availableDay,


            timeFrom:req.body.timeFrom,


            timeTo:req.body.timeTo,



            // ======================
            // APPOINTMENT SLOT
            // ======================


            slotDuration:req.body.slotDuration,



            // ======================
            // FEE
            // ======================


            fee:req.body.fee,


            feeType:req.body.feeType,



            image:req.file
            ? req.file.path
            :""

        });



        await doctor.save();



        console.log(
            "Doctor Saved:",
            doctor
        );



        res.redirect(
            "/admin/manage-doctors"
        );



    }
    catch(err){


        console.log(
            "ADD DOCTOR ERROR:",
            err
        );


        res.status(500)
        .send(err.message);


    }

});

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


// =============================
// Edit Doctor Page
// =============================

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




// =============================
// Update Doctor
// =============================

// router.post(
//     "/edit-doctor/:id",
//     upload.single("image"),
//     async (req, res) => {

//         try {


//             // Phone duplicate check

//             const existDoctor = await Doctor.findOne({

//                 phone:req.body.phone,

//                 _id:{
//                     $ne:req.params.id
//                 }

//             });


//             if(existDoctor){

//                 return res.send(
//                     "Phone Number Already Registered"
//                 );

//             }



//             const updateData = {


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



//                 // ======================
//                 // Doctor Timing
//                 // ======================


//                 availableDay:req.body.availableDay,


//                 timeFrom:req.body.timeFrom,


//                 timeTo:req.body.timeTo,



//                 // ======================
//                 // Consultation Fee
//                 // ======================


//                 fee:req.body.fee,


//                 feeType:req.body.feeType


//             };



//             // New Image Upload

//             if(req.file){

//                 updateData.image = req.file.path;

//             }



//             await Doctor.findByIdAndUpdate(

//                 req.params.id,

//                 updateData,

//                 {
//                     new:true
//                 }

//             );



//             res.redirect("/admin/manage-doctors");



//         } catch(err){


//             console.log("UPDATE DOCTOR ERROR:",err);


//             res.status(500).send(err.message);


//         }

//     }
// );

router.post(
"/edit-doctor/:id",
upload.single("image"),
async(req,res)=>{

try{


const existDoctor = await Doctor.findOne({

phone:req.body.phone,

_id:{
$ne:req.params.id
}

});


if(existDoctor){

return res.send(
"Phone Number Already Registered"
);

}



const updateData={



name:req.body.name,


degree:req.body.qualification,


specialization:req.body.speciality,


experience:req.body.experience,


hospital:req.body.clinic,


phone:req.body.phone,


email:req.body.email,


password:req.body.password,


address:req.body.address,


description:req.body.description,



// ======================
// AVAILABILITY
// ======================


availableDay:req.body.availableDay,


timeFrom:req.body.timeFrom,


timeTo:req.body.timeTo,



// ======================
// APPOINTMENT SLOT
// ======================


slotDuration:req.body.slotDuration,



// ======================
// FEE
// ======================


fee:req.body.fee,


feeType:req.body.feeType


};





if(req.file){

updateData.image=req.file.path;

}





await Doctor.findByIdAndUpdate(

req.params.id,

updateData,

{
new:true
}

);



res.redirect(
"/admin/manage-doctors"
);



}
catch(err){

console.log(
"UPDATE ERROR:",
err
);


res.status(500)
.send(err.message);


}


});

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
                image: req.file ? req.file.path : ""
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

router.get("/doctor/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.send("Doctor Not Found");
        }
        res.send(DoctorProfile(doctor));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.post("/create-phone-payment", async (req, res) => {
    try {
        const order = await razorpay.orders.create({
            amount: 100,
            currency: "INR",
            receipt: "phone_unlock"
        });
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/verify-phone-payment", async (req, res) => {
    const { paymentId, orderId, signature, doctorId } = req.body;
    const body = orderId + "|" + paymentId;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== signature) {
        return res.json({ success: false });
    }

    const doctor = await Doctor.findByIdAndUpdate(
        doctorId,
        { phoneUnlocked: true },
        { new: true }
    );

    return res.json({
        success: true,
        phone: doctor.phone
    });
});

const Consultation = require("../pages/consultation");

router.get("/consultation/:id", Consultation);

router.get("/add-government", (req, res) => {
    res.send(AddGovernment());
});

const GovernmentPerson = require("../models/GovernmentPerson");

router.post(
    "/add-government",
    upload.single("image"),
    async (req, res) => {
        try {
            const person = new GovernmentPerson({
                name: req.body.name,
                position: req.body.position,
                department: req.body.department,
                phone: req.body.phone,
                address: req.body.address,
                description: req.body.description,
                image: req.file ? req.file.path : ""
            });

            await person.save();
            console.log("Government Person Saved:", person);
            res.redirect("/admin/add-government");

        } catch (err) {
            console.log("ADD GOVERNMENT ERROR:", err);
            res.status(500).send(err.message);
        }
    }
);

const ManageGovernment = require("../pages/manageGovernment");

router.get("/manage-government", async (req, res) => {
    try {
        const persons = await GovernmentPerson.find().sort({ createdAt: -1 });
        res.send(ManageGovernment(persons));
    } catch (err) {
        console.log("MANAGE GOVERNMENT ERROR:", err);
        res.status(500).send(err.message);
    }
});




const ManageServices = require("../pages/adminpages/manageServices");

router.get("/manage-services", async (req, res) => {
    const services = await Service.find();
    res.send(ManageServices(services));
});



const EditService = require("../pages/editpages/editService");

router.get("/edit-service/:id", async (req,res)=>{

try{

const service = await Service.findById(req.params.id);

console.log("EDIT SERVICE DATA:", service);


if(!service){
    return res.send("Service Not Found");
}


res.send(EditService(service));


}
catch(err){

console.log("EDIT SERVICE ERROR:",err);

res.status(500).send(err.message);

}

});






// router.get("/delete-service/:id", async (req, res) => {
//     try {

//         await Service.findByIdAndDelete(req.params.id);

//         res.redirect("/admin/manage-services");

//     } catch (err) {

//         console.error(err);

//         res.status(500).send("Delete Failed");

//     }
// });

// router.post("/edit-service/:id", async (req, res) => {

//     try {

//         await Service.findByIdAndUpdate(req.params.id, {

//             title: req.body.title,

//             image: req.body.image,

//             description: req.body.description,

//             features: req.body.features || []

//         });

//         res.redirect("/admin/manage-services");

//     } catch (err) {

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });




router.post("/edit-service/:id", async (req, res) => {
    try {

        console.log("=== EDIT POST HIT ===");
        console.log("PARAMS:", req.params);

        console.log("BODY:", req.body);

        const features = req.body.features || [];

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                image: req.body.image,
                description: req.body.description,
                features: Array.isArray(features) ? features : [features]
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedService) {
            return res.status(404).send("Service Not Found");
        }

        console.log("UPDATED:", updatedService);

        res.redirect("/admin/manage-services");

    } catch (err) {
        console.error("EDIT SERVICE ERROR:", err);
        res.status(500).send(err.message);
    }
});

router.post("/delete-service/:id", async (req, res) => {
    try {

        await Service.findByIdAndDelete(req.params.id);

        res.redirect("/admin/manage-services");

    } catch (err) {

        console.error(err);

        res.status(500).send("Delete Failed");

    }
});

const AddService = require("../pages/addpages/addService");

// Add Service Page
router.get("/add-service", (req, res) => {
    res.send(AddService());
});




// router.post(
// "/add-service",
// upload.single("image"),
// async (req,res)=>{

// try{




// const service = new Service({

// title:req.body.title,

// image:req.file
// ? req.file.path
// : "",

// description:req.body.description

// });


// await service.save();


// res.redirect("/admin/manage-services");


// }
// catch(err){

// console.log("ADD SERVICE ERROR:",err);

// res.status(500).send(err.message);

// }

// });


router.post(
"/add-service",
upload.single("image"),
async (req,res)=>{

try{


console.log("FILE:",req.file);
console.log("BODY:",req.body);



const service = new Service({

title:req.body.title,

image:req.file
? req.file.path
: "",

description:req.body.description,

features:req.body.features || []

});


await service.save();


res.redirect("/admin/manage-services");


}
catch(err){

console.log("ADD SERVICE ERROR:",err);

res.status(500).send(err.message);

}

});

const ServiceDetails = require("../pages/serviceDetails");
router.get("/service/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).send("Service not found");
        }

        res.render("service-details", { service });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


// const ServicePage = require("../pages/services");

// router.get("/services", async (req,res)=>{

//     try{

//         const services = await Service
//         .find()
//         .sort({createdAt:-1});


//         console.log("SERVICES DATA:", services);


//         res.send(
//             ServicePage(services)
//         );


//     }catch(err){

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });





const ManageStudents = require("../pages/admin/manageStudents");


router.get("/admin/manageStudents", (req,res)=>{

    res.send(ManageStudents());

});


module.exports = router;

