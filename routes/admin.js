const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const AdminLogin = require("../pages/AdminLogin");
// const Admin = require("../models/Admin");
// const Service = require("../models/Service");
// const ChangePassword = require("../views/ChangePassword");
// const AddService = require("../pages/addservice");
// const AdminDashboard = require("../pages/AdminDashboard");



// const upload = require("../config/multer");

// const router = express.Router();
// router.get("/admindashboard", (req, res) => {
//     res.send(AdminDashboard());
// });


// // ===============================
// // Change Password Page
// // ===============================
// router.get("/change-password", (req, res) => {
//     res.send(ChangePassword());
// });


// // ===============================
// // Change Password
// // ===============================
// router.post("/change-password", async (req, res) => {

//     try {

//         const { oldPassword, newPassword, confirmPassword } = req.body;

//         if (!oldPassword || !newPassword || !confirmPassword) {
//             return res.send("All fields are required.");
//         }

//         if (newPassword !== confirmPassword) {
//             return res.send("New Password and Confirm Password do not match.");
//         }

//         const admin = await Admin.findOne({ username: "admin" });

//         if (!admin) {
//             return res.send("Admin not found.");
//         }

//         const match = await bcrypt.compare(oldPassword, admin.password);

//         if (!match) {
//             return res.send("Old Password is incorrect.");
//         }

//         admin.password = await bcrypt.hash(newPassword, 10);

//         await admin.save();

//         res.send(`
//             <script>
//                 alert("✅ Password Changed Successfully");
//                 window.location="/admin";
//             </script>
//         `);

//     } catch (err) {

//         console.error(err);

//         res.status(500).send("Server Error");

//     }

// });

// router.get("/login", (req, res) => {
//     res.send(AdminLogin(req.query.error || ""));
// });
// // ===============================
// // Add Service Page
// // ===============================
// router.get("/add-service", (req, res) => {

//     res.send(AddService());

// });


// // ===============================
// // Save Service
// // ===============================
// router.post(
//     "/add-service",
//     upload.single("image"),
//     async (req, res) => {

//         console.log(req.file);
//         console.log(req.body);

//         try {

//             if (!req.file) {
//                 return res.send("Image not uploaded");
//             }

//             await Service.create({
//                 title: req.body.title,
//                 description: req.body.description,
//                 image: "/uploads/" + req.file.filename
//             });

//             res.redirect("/admin/admindashboard");

//         } catch (err) {

//             console.error(err);
//             res.status(500).send(err.message);

//         }

//     }
// );

// // ===============================
// // Delete Service
// // ===============================
// // List all services
// router.get("/delete-service", async (req, res) => {
//     try {
//         const services = await Service.find();

//         let html = "<h2>Delete Services</h2><hr>";

//         services.forEach(service => {
//             html += `
//                 <div style="margin:10px 0;">
//                     <b>${service.title}</b>

//                     <a href="/admin/delete-service/${service._id}"
//                        onclick="return confirm('Delete this service?')"
//                        style="color:red;margin-left:20px;">
//                         Delete
//                     </a>
//                 </div>
//             `;
//         });

//         res.send(html);

//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message);
//     }
// });

// // Delete one service
// router.get("/delete-service/:id", async (req, res) => {
//     try {
//         console.log("DELETE ID:", req.params.id);

//         await Service.findByIdAndDelete(req.params.id);

//         res.redirect("/admin/delete-service");

//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message);
//     }
// });

// router.get("/edit-service", async (req, res) => {
//     try {
//         const services = await Service.find();

//         let html = "<h2>Edit Services</h2><hr>";

//         services.forEach(service => {
//             html += `
//                 <div style="margin:10px 0;">
//                     <b>${service.title}</b>

//                     <a href="/admin/edit-service/${service._id}">
//                         Edit
//                     </a>
//                 </div>
//             `;
//         });

//         res.send(html);

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// router.get("/edit-service/:id", async (req, res) => {
//     try {
//         const service = await Service.findById(req.params.id);

//         if (!service) {
//             return res.send("Service not found");
//         }

//         res.send(`
// <h2>Edit Service</h2>

// <form
//     action="/admin/edit-service/${service._id}"
//     method="POST"
//     enctype="multipart/form-data"
// >

//     <input
//         type="text"
//         name="title"
//         value="${service.title}"
//         required
//     >

//     <br><br>

//     <textarea
//         name="description"
//         required
//     >${service.description}</textarea>

//     <br><br>

//     <img
//         src="${service.image}"
//         width="120"
//     >

//     <br><br>

//     <input
//         type="file"
//         name="image"
//     >

//     <br><br>

//     <button type="submit">
//         Update
//     </button>

// </form>
// `);

//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message);
//     }
// });
// router.post(
//     "/edit-service/:id",
//     upload.single("image"),
//     async (req, res) => {

//         try {

//             const service = await Service.findById(req.params.id);

//             if (!service) {
//                 return res.send("Service not found");
//             }

//             let image = service.image;

//             if (req.file) {
//                 image = "/uploads/" + req.file.filename;
//             }

//             await Service.findByIdAndUpdate(req.params.id, {
//                 title: req.body.title,
//                 description: req.body.description,
//                 image: image
//             });

//             res.redirect("/admin/login");

//         } catch (err) {
//             console.error(err);
//             res.status(500).send(err.message);
//         }

//     }
// );

// module.exports = router;

// const express = require("express");
// const router = express.Router();


const AdminLogin = require("../pages/AdminLogin");

router.get("/", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

module.exports = router;

// router.get("/", (req, res) => {
//     res.send("Admin Page Working gulab");
// });

module.exports = router;