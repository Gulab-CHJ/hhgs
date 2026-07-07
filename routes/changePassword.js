const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const ChangePassword = require("../views/ChangePassword");

// Change Password Page
router.get("/", (req, res) => {
    res.send(ChangePassword());
});

// Change Password Submit
router.post("/", async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.send("All fields are required.");
        }

        if (newPassword !== confirmPassword) {
            return res.send("Passwords do not match.");
        }

        const admin = await Admin.findOne({ username: "admin" });

        if (!admin) {
            return res.send("Admin not found.");
        }

        const match = await bcrypt.compare(oldPassword, admin.password);

        if (!match) {
            return res.send("Old Password is incorrect.");
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        res.send(`
            <script>
                alert("Password Changed Successfully");
                window.location="/admin";
            </script>
        `);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;