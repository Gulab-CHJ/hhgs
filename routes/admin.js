// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");
// const ChangePassword = require("../views/ChangePassword");

// const router = express.Router();
// router.get("/change-password", (req, res) => {
//     res.send(ChangePassword());
// });

// // JWT Verify Middleware
// function verifyToken(req, res, next) {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Token required" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.adminId = decoded.id;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid Token" });
//     }
// }

// // Change Password
// router.post("/change-password", verifyToken, async (req, res) => {
//     try {
//         const { oldPassword, newPassword } = req.body;

//         const admin = await Admin.findById(req.adminId);

//         if (!admin) {
//             return res.status(404).json({ message: "Admin not found" });
//         }

//         const match = await bcrypt.compare(oldPassword, admin.password);

//         if (!match) {
//             return res.status(400).json({ message: "Old password is incorrect" });
//         }

//         const hash = await bcrypt.hash(newPassword, 10);

//         admin.password = hash;
//         await admin.save();

//         res.json({
//             success: true,
//             message: "Password changed successfully"
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         });
//     }
// });





// module.exports = router;

const Service = require("../models/Service");
const AddService = require("../pages/AddService");
const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const ChangePassword = require("../views/ChangePassword");

const router = express.Router();

// Change Password Page
router.get("/change-password", (req, res) => {
    res.send(ChangePassword());
});

// Change Password
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

router.get("/add-service",(req,res)=>{

res.send(AddService());

});

router.post("/add-service",async(req,res)=>{

try{

const {title,description,image}=req.body;

await Service.create({

title,
description,
image

});

res.redirect("/");

}catch(err){

console.log(err);

res.send("Error");

}

});

module.exports = router;