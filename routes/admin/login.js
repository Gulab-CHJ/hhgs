// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//     // Admin Login Page
// });

// router.post("/login", async (req, res) => {
//     // Login Logic
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../../models/modelsAdmin");
const AdminLogin = require("../../pages/adminLoginpages");
const AdminDashboard = require("../../pages/adminDashboardpages");

// Login Page
router.get("/", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

// Login
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

module.exports = router;