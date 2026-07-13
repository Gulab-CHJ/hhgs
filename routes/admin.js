const AdminLogin = require("../pages/adminLogin");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(AdminLogin());
});

module.exports = router;