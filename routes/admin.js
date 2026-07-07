const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Service = require("../models/Service");

const AdminLogin = require("../pages/adminLogin");
const AdminDashboard = require("../pages/adminDashboard");
// const AddService = require("../pages/addservice");

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

        res.send(AdminDashboard());

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