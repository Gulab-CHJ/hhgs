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
    try {

        await Student.create({
            name: req.body.name,
            father: req.body.father,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            image: "/uploads/" + req.file.filename
        });

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

router.get("/edit-student/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send("Student not found");
        }

        res.send(`
            <h2>Edit Student</h2>

            <form action="/admin/edit-student/${student._id}"
                  method="POST"
                  enctype="multipart/form-data">

                <input
                    type="text"
                    name="name"
                    value="${student.name}"
                    required
                >

                <br><br>

                <input
                    type="text"
                    name="father"
                    value="${student.father || ""}"
                >

                <br><br>

                <input
                    type="email"
                    name="email"
                    value="${student.email || ""}"
                >

                <br><br>

                <input
                    type="text"
                    name="phone"
                    value="${student.phone || ""}"
                >

                <br><br>

                <textarea name="address">${student.address || ""}</textarea>

                <br><br>

                <img src="${student.image}" width="120">

                <br><br>

                <input type="file" name="image">

                <br><br>

                <button type="submit">Update Student</button>

            </form>
        `);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post(
    "/edit-student/:id",
    upload.single("image"),
    async (req, res) => {
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
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                image
            });

            res.redirect("/admin/students");

        } catch (err) {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
);
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