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

    res.send("Login Success");
});
module.exports = router;