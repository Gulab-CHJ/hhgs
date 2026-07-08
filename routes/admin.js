const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Service = require("../models/Service");

const AdminLogin = require("../pages/adminLogin");
const AdminDashboard = require("../pages/adminDashboard");
const AddService = require("../views/addservice");

const upload = require("../config/multer");

const AddStudent = require("../pages/addStudent");



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

    try{

        await Student.create({

            name:req.body.name,
            father:req.body.father,
            class:req.body.class,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            description:req.body.description,
            image:"/uploads/"+req.file.filename

        });

        res.redirect("/admin/students");

    }catch(err){

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

router.get("/edit-student/:id", async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send("Student not found");
        }

        res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Edit Student</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    background:#f5f5f5;
    padding:30px;
}

.container{
    max-width:650px;
    margin:auto;
    background:#fff;
    padding:25px;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,.1);
}

h2{
    text-align:center;
    margin-bottom:20px;
}

label{
    display:block;
    margin-bottom:5px;
    font-weight:bold;
}

input,
textarea{
    width:100%;
    padding:10px;
    margin-bottom:15px;
    border:1px solid #ccc;
    border-radius:5px;
}

textarea{
    resize:vertical;
    min-height:90px;
}

img{
    width:120px;
    height:120px;
    object-fit:cover;
    border-radius:8px;
    border:1px solid #ddd;
    margin-bottom:15px;
}

button{
    width:100%;
    padding:12px;
    border:none;
    background:#007bff;
    color:#fff;
    font-size:16px;
    border-radius:5px;
    cursor:pointer;
}

button:hover{
    background:#0056b3;
}

</style>

</head>

<body>

<div class="container">

<h2>Edit Student</h2>

<form
action="/admin/edit-student/${student._id}"
method="POST"
enctype="multipart/form-data"
>

<label>Student Name</label>

<input
type="text"
name="name"
value="${student.name || ""}"
required
>

<label>Father Name</label>

<input
type="text"
name="father"
value="${student.father || ""}"
>

<label>Class</label>

<input
type="text"
name="class"
value="${student.class || ""}"
>

<label>Email</label>

<input
type="email"
name="email"
value="${student.email || ""}"
>

<label>Phone</label>

<input
type="text"
name="phone"
value="${student.phone || ""}"
>

<label>Address</label>

<textarea
name="address"
>${student.address || ""}</textarea>

<label>Description</label>

<textarea
name="description"
>${student.description || ""}</textarea>

<label>Current Photo</label>

<br>

<img src="${student.image}">

<br><br>

<label>Change Photo</label>

<input
type="file"
name="image"
accept="image/*"
>

<button type="submit">

Update Student

</button>

</form>

</div>

</body>

</html>
`);

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
            father: req.body.father,
            class: req.body.class,
            email: req.body.email,
            phone: req.body.phone,
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