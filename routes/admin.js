const express = require("express");
const router = express.Router();
const dashbord = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const { login } = require("../controllers/adminAuth");

router.get("/", (req, res) => {
    res.send(AdminLogin());
});

// Login submit
router.post("/login", login);

// Dashboard
router.get("/admindashboard", (req, res) => {
    res.send(dashboard());
});


module.exports = router;