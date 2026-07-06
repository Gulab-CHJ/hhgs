
require("dotenv").config();

require("./config/database");

const express = require("express");

const Header = require("./views/component/header");

const Footer = require("./views/component/footer");

// const servicesRoutes = require("./routes/services");

// const AdminLogin = require("./pages/adminLogin");

// const AdminDashboard = require("./pages/adminDashboard");

// const studentRoutes = require("./routes/student");

// const bcrypt = require("bcrypt");

// const admin = require("./models/admin");

// const adminRoutes = require("./routes/admin");

const Service = require("./models/Service");

const Student = require("./models/Student");



const app = express();
const PORT = process.env.PORT || 3000;

// const serviceRoutes = require("./routes/service");

// app.use("/service", serviceRoutes);


// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const path = require("path");
// app.use("/services", servicesRoutes);

// app.use(express.static(path.join(__dirname, "public")));

// app.use(
//     "/uploads",
//     express.static(path.join(process.cwd(), "storage", "uploads"))
// );
// const upload = require("./config/multer");

// // Admin Routes
// app.use("/admin", adminRoutes);
// app.use("/student", studentRoutes);

// // Admin Login Page
// app.get("/admin", (req, res) => {
//     res.send(AdminLogin(req.query.error || ""));
// });

// // Admin Login
// app.post("/admin/login", async (req, res) => {

//     try {

//         const { username, password } = req.body;

//         const admin = await admin.findOne({ username });

//         if (!admin) {
//             return res.redirect("/admin?error=Username Not Found");
//         }

//         const match = await bcrypt.compare(password, admin.password);

//         if (!match) {
//             return res.redirect("/admin?error=Wrong Password");
//         }

//         res.send(AdminDashboard());

//     } catch (error) {

//         console.error(error);

//         res.status(500).send("Server Error");

//     }

// });

// // Home Page
app.get("/", async (req, res) => {

    try {

        const services = await Service.find();
        const students = await Student.find();

        let html = "";
        let studentHtml = "";

        // Services
        services.forEach(service => {
            html += `
            <a href="/service/${service._id}" class="card">
                <img src="${service.image}">
                <h2>${service.title}</h2>
            </a>
            `;
        });

        // Students
        students.forEach(student => {
            studentHtml += `
            <a href="/student/${student._id}" class="card">
                <img src="${student.image}">
                <h2>${student.name}</h2>
            </a>
            `;
        });
 res.send(`
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>HHGS</title>

<link rel="stylesheet" href="/css/style.css">

<style>

/* Services & Students Grid */

.services,
.students{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
    gap:10px;
    padding:15px;
    max-width:1400px;
    margin:auto;
}

.card{
    background:#fff;
    border:1px solid #e5e5e5;
    border-radius:8px;
    text-align:center;
    padding:8px;
    min-height:100px;
    box-shadow:0 2px 6px rgba(0,0,0,.08);
    transition:.3s;
    text-decoration:none;
    color:inherit;
    display:block;
}

.card:hover{
    transform:translateY(-3px);
    box-shadow:0 5px 12px rgba(0,0,0,.15);
}

.card img{
    width:55px;
    height:55px;
    object-fit:contain;
    display:block;
    margin:0 auto 8px;
}

.card h2{
    font-size:13px;
    margin:0;
    color:#222;
}

.card p{
    display:none;
}

/* Tablet */

@media(max-width:768px){

.services,
.students{
    grid-template-columns:repeat(3,1fr);
    gap:8px;
}

.card{
    min-height:90px;
}

.card img{
    width:48px;
    height:48px;
}

.card h2{
    font-size:12px;
}

}

/* Mobile */

@media(max-width:480px){

.services,
.students{
    grid-template-columns:repeat(3,1fr);
    gap:6px;
    padding:8px;
}

.card{
    min-height:80px;
    padding:6px;
}

.card img{
    width:40px;
    height:40px;
}

.card h2{
    font-size:10px;
}

}

</style>

</head>

<body>

${Header()}

<h1 style="text-align:center;margin:30px 0;">
Our Services
</h1>

<div class="services">
${html}
</div>

<h1 style="text-align:center;margin:40px 0 20px;">
Our Students
</h1>

<div class="students">
${studentHtml}
</div>

${Footer()}

<script src="/js/main.js"></script>

</body>

</html>
`);

  } catch (err) {
        console.log(err);
        res.status(500).send("Server Erroy");
    }
});
// // Service Details Page


// app.get("/admin/student/add", (req, res) => {

//     res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <title>Add Student</title>

// <style>

// body{
// font-family:Arial;
// background:#f5f5f5;
// padding:30px;
// }

// form{
// max-width:600px;
// margin:auto;
// background:#fff;
// padding:20px;
// border-radius:10px;
// }

// input,textarea{

// width:100%;
// padding:12px;
// margin:10px 0;

// }

// button{

// width:100%;
// padding:12px;
// background:#007bff;
// color:#fff;
// border:none;
// cursor:pointer;

// }

// </style>

// </head>

// <body>

// <form action="/admin/student/add" method="POST" enctype="multipart/form-data">

// <h2>Add Student</h2>

// <input type="text" name="name" placeholder="Student Name" required>

// <input type="text" name="fatherName" placeholder="Father Name">

// <input type="text" name="course" placeholder="Course">

// <input type="text" name="mobile" placeholder="Mobile">

// <input type="email" name="email" placeholder="Email">

// <input type="text" name="address" placeholder="Address">

// <textarea name="description" placeholder="Description"></textarea>

// <input type="file" name="image">

// <button>Add Student</button>

// </form>

// </body>

// </html>

// `);

// });
// app.post("/admin/student/add", upload.single("image"), async (req, res) => {

//     try{

//         await Student.create({

//             name:req.body.name,

//             fatherName:req.body.fatherName,

//             course:req.body.course,

//             mobile:req.body.mobile,

//             email:req.body.email,

//             address:req.body.address,

//             description:req.body.description,

//             image:req.file ? "/uploads/" + req.file.filename : ""

//         });

//         res.redirect("/admin/login");

//     }catch(err){

//         console.log(err);

//         res.send("Error");

//     }

// });
// app.get("/admin/students", async (req, res) => {

//     try {

//         const students = await Student.find().sort({ createdAt: -1 });

//         let rows = "";

//         students.forEach((student, index) => {

//             rows += `
//             <tr>
//                 <td>${index + 1}</td>

//                 <td>
//                     <img src="${student.image}" width="50">
//                 </td>

//                 <td>
//                     <a href="/student/${student._id}">
//                         ${student.name}
//                     </a>
//                 </td>

//                 <td>${student.course}</td>

//                 <td>${student.mobile}</td>

//                 <td>
//                     <a href="/admin/student/edit/${student._id}">✏ Edit</a> |
//                     <a href="/admin/student/delete/${student._id}"
//                     onclick="return confirm('Delete Student?')">
//                     🗑 Delete
//                     </a>
//                 </td>

//             </tr>
//             `;

//         });

//         res.send(`
// <!DOCTYPE html>
// <html>

// <head>
// <title>Students</title>
// </head>

// <body>

// <a href="/admin/student/add">➕ Add Student</a>

// <table border="1" cellpadding="10">

// <tr>
// <th>#</th>
// <th>Photo</th>
// <th>Name</th>
// <th>Course</th>
// <th>Mobile</th>
// <th>Action</th>
// </tr>

// ${rows}

// </table>

// </body>
// </html>
//         `);

//     } catch (err) {

//         console.log(err);
//         res.send("Server Error");

//     }

// });

  
// app.get("/admin/student/delete/:id", async (req, res) => {

//     try{

//         await Student.findByIdAndDelete(req.params.id);

//         res.redirect("/admin/login");

//     }catch(err){

//         console.log(err);

//         res.send("Delete Error");

//     }

// });
// app.get("/admin/student/edit/:id", async (req, res) => {

//     try {

//         const student = await Student.findById(req.params.id);

//         if (!student) {
//             return res.send("Student Not Found");
//         }

//         res.send(`

// <!DOCTYPE html>
// <html>
// <head>

// <title>Edit Student</title>

// <style>

// body{
//     font-family:Arial;
//     background:#f5f5f5;
//     padding:30px;
// }

// form{
//     max-width:700px;
//     margin:auto;
//     background:#fff;
//     padding:20px;
//     border-radius:10px;
//     box-shadow:0 5px 15px rgba(0,0,0,.1);
// }

// input,textarea{
//     width:100%;
//     padding:12px;
//     margin:10px 0;
// }

// img{
//     width:100px;
//     display:block;
//     margin:auto;
//     margin-bottom:15px;
// }

// button{
//     width:100%;
//     padding:12px;
//     background:#0d6efd;
//     color:#fff;
//     border:none;
//     cursor:pointer;
// }

// </style>

// </head>

// <body>

// <form action="/admin/student/edit/${student._id}" method="POST" enctype="multipart/form-data">

// <h2>Edit Student</h2>

// <img src="${student.image}">

// <input type="text" name="name" value="${student.name}" required>

// <input type="text" name="fatherName" value="${student.fatherName}">

// <input type="text" name="course" value="${student.course}">

// <input type="text" name="mobile" value="${student.mobile}">

// <input type="email" name="email" value="${student.email}">

// <input type="text" name="address" value="${student.address}">

// <textarea name="description">${student.description}</textarea>

// <input type="file" name="image">

// <button>Update Student</button>

// </form>

// </body>
// </html>

// `);

//     } catch (err) {

//         console.log(err);

//         res.send("Error");

//     }

// });
// app.post("/admin/student/edit/:id", upload.single("image"), async (req, res) => {

//     try {

//         const student = await Student.findById(req.params.id);

//         let image = student.image;

//         if (req.file) {
//             image = "/uploads/" + req.file.filename;
//         }

//         await Student.findByIdAndUpdate(req.params.id, {

//             name: req.body.name,

//             fatherName: req.body.fatherName,

//             course: req.body.course,

//             mobile: req.body.mobile,

//             email: req.body.email,

//             address: req.body.address,

//             description: req.body.description,

//             image

//         });

//         res.redirect("/admin/login");

//     } catch (err) {

//         console.log(err);

//         res.send("Update Error");

//     }

// });
// app.use((err, req, res, next) => {
//     console.error("Global Error:");
//     console.error(req.method, req.url);
//     console.error(err.stack);

//     res.status(500).send("Server Error");
// });


// // Start Server
// app.listen(PORT, () => {

//     console.log(`🚀 Server Running http://localhost:${PORT}`);

// });


// app.get("/", (req, res) => {
//     res.send("Hello Express!");
// });

app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
});