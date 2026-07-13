const dashbord = require("../pages/dashbord");
const AdminLogin = require("../pages/adminLogin");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(AdminLogin());
});

// Login submit
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send(dashbord());
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.send("Login Successful");
});
module.exports = router;