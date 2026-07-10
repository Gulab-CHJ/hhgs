const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Service = require("../models/Service");

const AdminLogin = require("../pages/adminLogin");
const AdminDashboard = require("../pages/adminDashboard");
const AddService = require("../views/addservice");

const upload = require("../config/multer");
const AddDoctor = require("../pages/AddDoctor");
const Doctor = require("../models/Doctor");

const AddStudent = require("../pages/addStudent");
const AddBanner = require("../pages/AddBanner");
const Banner = require("../models/Banner");

const ManageBanner = require("../pages/ManageBanner");
const StudentCardClick = require("../pages/scardclick");

const EditStudent = require("../pages/EditStudent");

const DoctorList = require("../pages/DoctorList");
const EditDoctor = require("../pages/EditDoctor");
const DeleteDoctor = require("../pages/DeleteDoctor");
const EditBanner = require("../pages/EditBanner");

// =========================
// Login Page
// =========================
router.get("/", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

// =========================
// Login
// =========================
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.redirect("/admin?error=Username Not Found");
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.redirect("/admin?error=Wrong Password");
        }

        return res.send(AdminDashboard());

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
router.get("/admindashboard", (req, res) => {
    res.send(AdminDashboard());
});


router.get("/edit-service", async (req, res) => {
    try {
        const services = await Service.find();

        let html = "<h2>Edit Services</h2><hr>";

        services.forEach(service => {
            html += `
                <div style="margin:10px 0;">
                    <b>${service.title}</b>

                    <a href="/admin/edit-service/${service._id}">
                        Edit
                    </a>
                </div>
            `;
        });

        res.send(html);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.get("/edit-service/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.send("Service not found");
        }

        res.send(`
            <h2>Edit Service</h2>

            <form action="/admin/edit-service/${service._id}"
                  method="POST"
                  enctype="multipart/form-data">

                <input
                    type="text"
                    name="title"
                    value="${service.title}"
                    required
                >

                <br><br>

                <textarea
                    name="description"
                    required
                >${service.description}</textarea>

                <br><br>

                <img src="${service.image}" width="120">

                <br><br>

                <input type="file" name="image">

                <br><br>

                <button type="submit">
                    Update
                </button>

            </form>
        `);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post(
    "/edit-service/:id",
    upload.single("image"),
    async (req, res) => {
        try {

            const service = await Service.findById(req.params.id);

            if (!service) {
                return res.send("Service not found");
            }

            let image = service.image;

            if (req.file) {
                image = "/uploads/" + req.file.filename;
            }

            await Service.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                image: image
            });

            return res.redirect("/admin/edit-service");

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
);

const Student = require("../models/Student");

router.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        let html = `
            <h2>Students</h2>

            <a href="/admin/add-student"
               style="
                    display:inline-block;
                    padding:10px 18px;
                    background:#28a745;
                    color:#fff;
                    text-decoration:none;
                    border-radius:5px;
                    margin-bottom:20px;
               ">
                + Add Student
            </a>

            <hr>
        `;

        students.forEach(student => {
            html += `
                <div style="margin-bottom:15px; border:1px solid #ddd; padding:10px;">

                    <img src="${student.image}" width="60">

                    <b>${student.name}</b>

                    <a href="/admin/edit-student/${student._id}"
                       style="margin-left:20px;">
                        ✏️ Edit
                    </a>

                    <a href="/admin/delete-student/${student._id}"
                       onclick="return confirm('Delete student?')"
                       style="margin-left:15px;color:red;">
                        🗑 Delete
                    </a>

                </div>
            `;
        });

        res.send(html);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
router.get("/add-student", (req, res) => {
    res.send(AddStudent());
});

router.post("/add-student", upload.single("image"), async (req, res) => {
    try {

        const student = new Student({
            name: req.body.name,
            fatherName: req.body.fatherName,
            course: req.body.course,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            description: req.body.description,
            image: req.file ? "/uploads/" + req.file.filename : ""
        });

        await student.save();

        res.redirect("/admin/students");

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


router.get("/delete-student/:id", async (req, res) => {
    try {

        await Student.findByIdAndDelete(req.params.id);

        res.redirect("/admin/students");

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// router.get("/edit-student/:id", async (req, res) => {
//     try {

//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send("Student not found");
//         }

//         res.send(`
// <!DOCTYPE html>
// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta name="viewport"
// content="width=device-width, initial-scale=1.0">

// <title>Edit Student</title>

// <style>

// *{
//     margin:0;
//     padding:0;
//     box-sizing:border-box;
//     font-family:"Segoe UI",sans-serif;
// }

// body{
//     min-height:100vh;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     padding:40px;
//     background:linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb);
// }

// .container{
//     width:100%;
//     max-width:760px;
//     background:rgba(255,255,255,.12);
//     backdrop-filter:blur(18px);
//     border:1px solid rgba(255,255,255,.15);
//     border-radius:25px;
//     padding:35px;
//     box-shadow:0 20px 60px rgba(0,0,0,.35);
// }

// h2{
//     text-align:center;
//     color:#fff;
//     font-size:32px;
//     margin-bottom:30px;
//     font-weight:700;
// }

// label{
//     display:block;
//     color:#fff;
//     margin-bottom:8px;
//     font-size:15px;
//     font-weight:600;
// }

// input,
// textarea{
//     width:100%;
//     padding:15px;
//     margin-bottom:20px;
//     border:none;
//     outline:none;
//     border-radius:12px;
//     background:rgba(255,255,255,.15);
//     color:#fff;
//     font-size:15px;
//     transition:.3s;
// }

// input::placeholder,
// textarea::placeholder{
//     color:#ddd;
// }

// input:focus,
// textarea:focus{
//     background:rgba(255,255,255,.22);
//     box-shadow:0 0 15px rgba(37,99,235,.5);
// }

// textarea{
//     resize:vertical;
//     min-height:120px;
// }

// input[type=file]{
//     padding:12px;
//     cursor:pointer;
// }

// img{
//     display:block;
//     width:170px;
//     height:170px;
//     margin:15px auto;
//     object-fit:cover;
//     border-radius:50%;
//     border:5px solid #fff;
//     box-shadow:0 10px 30px rgba(0,0,0,.35);
//     transition:.3s;
// }

// img:hover{
//     transform:scale(1.05);
// }

// button{
//     width:100%;
//     padding:16px;
//     border:none;
//     border-radius:50px;
//     background:linear-gradient(135deg,#2563eb,#7c3aed);
//     color:#fff;
//     font-size:17px;
//     font-weight:700;
//     cursor:pointer;
//     transition:.3s;
//     box-shadow:0 10px 25px rgba(37,99,235,.45);
// }

// button:hover{
//     transform:translateY(-3px);
//     box-shadow:0 15px 35px rgba(37,99,235,.6);
// }

// button:active{
//     transform:scale(.98);
// }

// @media(max-width:768px){

// body{
//     padding:20px;
// }

// .container{
//     padding:25px;
// }

// h2{
//     font-size:26px;
// }

// img{
//     width:130px;
//     height:130px;
// }

// }

// </style>

// </head>

// <body>

// <div class="container">

// <h2>Edit Student</h2>

// <form
// action="/admin/edit-student/${student._id}"
// method="POST"
// enctype="multipart/form-data"
// >

// <label>Student Name</label>

// <input
// type="text"
// name="name"
// value="${student.name || ""}"
// required
// >

// <label>Father Name</label>
// <input
// type="text"
// name="fatherName"
// value="${student.fatherName || ""}"
// >

// <label>Class</label>

// <input
// type="text"
// name="course"
// value="${student.course || ""}"
// >

// <label>Email</label>

// <input
// type="email"
// name="email"
// value="${student.email || ""}"
// >

// <label>Mobile</label>
// <input
// type="text"
// name="mobile"
// value="${student.mobile || ""}"
// >

// <label>Address</label>

// <textarea
// name="address"
// >${student.address || ""}</textarea>

// <label>Description</label>

// <textarea
// name="description"
// >${student.description || ""}</textarea>

// <label>Current Photo</label>

// <br>

// <img src="${student.image}">

// <br><br>

// <label>Change Photo</label>

// <input
// type="file"
// name="image"
// accept="image/*"
// >

// <button type="submit">

// Update Student

// </button>

// </form>

// </div>

// </body>

// </html>
// `);

//     } catch (err) {

//         console.error(err);
//         res.status(500).send(err.message);

//     }
// });


router.get("/edit-student/:id", async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send("Student not found");
        }

        res.send(EditStudent(student));

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post("/edit-student/:id", upload.single("image"), async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send("Student not found");
        }

        let image = student.image;

        if (req.file) {
            image = "/uploads/" + req.file.filename;
        }

        await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            fatherName: req.body.fatherName,
            course: req.body.course,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            description: req.body.description,
            image: image
        });

        res.redirect("/admin/students");

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
router.get("/service/:id", async (req, res) => {
    try {

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.send("Service not found");
        }

        res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>${service.title}</title>

    <style>
        body{
            font-family:Arial;
            background:#f5f5f5;
            padding:30px;
        }

        .container{
            max-width:700px;
            margin:auto;
            background:#fff;
            padding:20px;
            border-radius:10px;
            box-shadow:0 3px 10px rgba(0,0,0,.15);
        }

        img{
            width:120px;
            display:block;
            margin:auto;
        }

        h2{
            text-align:center;
        }

        p{
            margin-top:20px;
            line-height:1.7;
        }
    </style>

</head>

<body>

<div class="container">

<img src="${service.image}">

<h2>${service.title}</h2>

<p>${service.description}</p>

</div>

</body>
</html>
`);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.get("/add-doctor", (req, res) => {
    res.send(AddDoctor());
});

router.get("/doctors", async (req, res) => {
    const doctors = await Doctor.find();
    res.send(DoctorList(doctors));
});

router.get("/edit-doctor", async (req, res) => {
    const doctors = await Doctor.find();
    res.send(EditDoctor(doctors));
});

router.get("/delete-doctor", async (req, res) => {
    const doctors = await Doctor.find();
    res.send(DeleteDoctor(doctors));
});
router.post("/add-doctor", upload.single("image"), async (req, res) => {

    try {

        const doctor = new Doctor({
            name: req.body.name,
            degree: req.body.degree,
            specialization: req.body.specialization,
            experience: req.body.experience,
            hospital: req.body.hospital,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            image: "/uploads/" + req.file.filename,
            description: req.body.description
        });

        await doctor.save();

        res.redirect("/admin/dashboard");

    } catch (err) {
        console.log(err);
        res.send(err.message);
    }

});
router.get("/banners", async (req, res) => {

    const banners = await Banner.find();

    res.send(ManageBanner(banners));

});

router.get("/add-banner", (req, res) => {
    res.send(AddBanner());
});

router.post("/add-banner", upload.single("image"), async (req, res) => {

    const banner = new Banner({
        title: req.body.title,
        image: "/uploads/" + req.file.filename,
        link: req.body.link
    });

    await banner.save();

    res.redirect("/admin/dashboard");
});

router.get("/delete-banner/:id", async (req,res)=>{

await Banner.findByIdAndDelete(req.params.id);

res.redirect("/admin/manage-banner");

});

router.get("/activate-banner/:id", async (req,res)=>{

await Banner.findByIdAndUpdate(req.params.id,{
active:true
});

res.redirect("/admin/manage-banner");

});
router.get("/deactivate-banner/:id", async (req,res)=>{

await Banner.findByIdAndUpdate(req.params.id,{
active:false
});

res.redirect("/admin/manage-banner");

});
router.get("/edit-banner/:id", async(req,res)=>{

const banner=await Banner.findById(req.params.id);

res.send(EditBanner(banner));

});
router.post("/edit-banner/:id",upload.single("image"),async(req,res)=>{

let data={
title:req.body.title,
link:req.body.link
};

if(req.file){
data.image="/uploads/"+req.file.filename;
}

await Banner.findByIdAndUpdate(req.params.id,data);

res.redirect("/admin/manage-banner");

});
router.get("/manage-banner", async (req, res) => {

    try {

        const banners = await Banner.find();

        res.send(ManageBanner(banners));

    } catch (err) {

        console.log(err);
        res.send(err.message);

    }

});


// =========================
// Dashboard
// =========================
router.get("/dashboard", (req, res) => {
    res.send(AdminDashboard());
});

// =========================
// Add Service Page
// =========================
router.get("/add-service", (req, res) => {
    res.send(AddService());
});
 router.post(
    "/add-service",
    upload.single("image"),
    async (req, res) => {

        console.log(req.file);
        console.log(req.body);

        try {

            if (!req.file) {
                return res.send("Image not uploaded");
            }

            await Service.create({
                title: req.body.title,
                description: req.body.description,
                image: "/uploads/" + req.file.filename
            });

            res.redirect("/admin/admindashboard");

        } catch (err) {

            console.error(err);
            res.status(500).send(err.message);

        }

    }
);

// =========================
// Delete Service Page
// =========================
router.get("/delete-service", async (req, res) => {
    try {
        const services = await Service.find();

        let html = "<h2>Delete Services</h2><hr>";

        services.forEach(service => {
            html += `
                <div>
                    <b>${service.title}</b>

                    <a href="/admin/delete-service/${service._id}">
                        Delete
                    </a>
                </div>
            `;
        });

        res.send(html);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// =========================
// Delete One Service
// =========================
router.get("/delete-service/:id", async (req, res) => {
    try {

        await Service.findByIdAndDelete(req.params.id);

        res.redirect("/admin/delete-service");

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;