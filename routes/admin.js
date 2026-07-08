const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Service = require("../models/Service");

const AdminLogin = require("../pages/adminLogin");
const AdminDashboard = require("../pages/adminDashboard");
const AddService = require("../views/addservice");

const upload = require("../config/multer");



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

        let html = "<h2>Students</h2><hr>";

        students.forEach(student => {
            html += `
                <div style="margin-bottom:15px;">
                    <img src="${student.image}" width="60">
                    <b>${student.name}</b>

                    <a href="/admin/edit-student/${student._id}">
                        Edit
                    </a>

                    <a href="/admin/delete-student/${student._id}"
                       onclick="return confirm('Delete student?')">
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