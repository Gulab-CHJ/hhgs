const express = require("express");
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");
const Service = require("../models/Service");

const ChangePassword = require("../views/ChangePassword");
const AddService = require("../pages/AddService");

const upload = require("../config/multer");

const router = express.Router();


// ===============================
// Change Password Page
// ===============================
router.get("/change-password", (req, res) => {
    res.send(ChangePassword());
});


// ===============================
// Change Password
// ===============================
router.post("/change-password", async (req, res) => {

    try {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.send("All fields are required.");
        }

        if (newPassword !== confirmPassword) {
            return res.send("New Password and Confirm Password do not match.");
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
                alert("✅ Password Changed Successfully");
                window.location="/admin";
            </script>
        `);

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

});


// ===============================
// Add Service Page
// ===============================
router.get("/add-service", (req, res) => {

    res.send(AddService());

});


// ===============================
// Save Service
// ===============================
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

            res.redirect("/");

        } catch (err) {

            console.error(err);
            res.status(500).send(err.message);

        }

    }
);

module.exports = router;