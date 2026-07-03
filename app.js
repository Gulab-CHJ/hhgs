// require("dotenv").config();
// require("./config/database");

// const express = require("express");
// const path = require("path");

// const Header = require("./views/component/header");
// const Hero = require("./views/component/hero");
// const Footer = require("./views/component/footer");
// const AdminLogin = require("./pages/adminLogin");
// const AdminDashboard = require("./pages/adminDashboard");
// const bcrypt = require("bcrypt");
// const Admin = require("./models/Admin");
// const Service = require("./models/Service");


// const app = express();
// const PORT = process.env.PORT || 3000;





// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const adminRoutes = require("./routes/admin");
// app.use("/admin", adminRoutes);


// app.get("/admin", (req, res) => {
//     res.send(AdminLogin(req.query.error || ""));
// });

// app.post("/admin/login", async (req, res) => {

//     try {

//         const { username, password } = req.body;

//         const admin = await Admin.findOne({ username });

//         if (!admin) {
//             return res.redirect("/admin?error=Username Not Found");
//         }

//         const match = await bcrypt.compare(password, admin.password);

//         if (!match) {
//             return res.redirect("/admin?error=Wrong Password");
//         }

//         res.send(AdminDashboard());

//     } catch (error) {
//     console.error(error);
//     res.status(500).send(`
//         <h2>Server Error</h2>
//         <pre>${error.stack}</pre>
//     `);
// }

// });

// // Static Folder
// app.use(express.static(path.join(__dirname, "public")));



// const cards = [
//     {
//         title: "PAN Card",
//         description: "Apply for a new PAN Card."
//     },
//     {
//         title: "Aadhaar",
//         description: "Update Aadhaar services."
//     },
//     {
//         title: "Passport",
//         description: "Passport application support."
//     }
// ];

// app.get("/", async (req, res) => {

// const services = await Service.find();

// let html = "";

// services.forEach(service=>{

// html += `

// <div class="card">

// <img src="${service.image}" width="100%">

// <h2>${service.title}</h2>

// <p>${service.description}</p>

// </div>

// `;

// });

// res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <link rel="stylesheet" href="/css/style.css">

// <style>

// .card{

// width:300px;

// padding:15px;

// margin:15px;

// display:inline-block;

// border:1px solid #ddd;

// border-radius:10px;

// vertical-align:top;

// }

// .card img{
//     width:100%;
//     height:250px;
//     object-fit:contain;
//     background:#fff;
// }

// }

// </style>

// </head>

// <body>

// ${Header()}

// <h1 align="center">Our Services</h1>

// ${html}

// ${Footer()}

// </body>

// </html>

// `);

// });


// app.listen(PORT, () => {
//     console.log(`🚀 Server Running http://localhost:${PORT}`);
// });


// // // const express = require("express");
// // // const app = express();
// // // app.get("/", (req, res) => res.send("HHGS Server Running"));
// // // app.listen(process.env.PORT || 3000);

// // require("dotenv").config();
// // const express = require("express");

// // const app = express();

// // app.get("/", (req, res) => {
// //     res.send("HHGS Working");
// // });

// // const PORT = process.env.PORT || 3000;

// // app.listen(PORT, () => {
// //     console.log("Server Started");
// // });

require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");

const Header = require("./views/component/header");
const Footer = require("./views/component/footer");

const AdminLogin = require("./pages/adminLogin");
const AdminDashboard = require("./pages/adminDashboard");

const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");
const Service = require("./models/Service");

const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Admin Routes
app.use("/admin", adminRoutes);

// Admin Login Page
app.get("/admin", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

// Admin Login
app.post("/admin/login", async (req, res) => {

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

    } catch (error) {

        console.error(error);

        res.status(500).send("Server Error");

    }

});

// Home Page
app.get("/", async (req, res) => {

    try {

        const services = await Service.find();

        let html = "";

        services.forEach(service => {

            html += `
                <div class="card">

                    <img src="${service.image}" alt="${service.title}">

                    <h2>${service.title}</h2>

                    <p>${service.description}</p>

                </div>
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
.services{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:20px;
    padding:20px;
    max-width:1400px;
    margin:auto;
}

.card{
    width:100%;
    background:#fff;
    border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,.15);
    padding:15px;
    text-align:center;
    transition:0.3s;
}

.card:hover{
    transform:translateY(-5px);
}

.card img{
    width:100%;
    height:220px;
    object-fit:contain;
    border-radius:10px;
    background:#fff;
}

.card h2{
    margin:12px 0;
    font-size:22px;
    color:#222;
}

.card p{
    color:#555;
    font-size:15px;
    line-height:1.5;
}

/* Laptop */
@media (max-width:1200px){

    .services{
        grid-template-columns:repeat(3,1fr);
    }

}

/* Tablet */
@media (max-width:768px){

    .services{
        grid-template-columns:repeat(2,1fr);
        gap:15px;
    }

    .card img{
        height:180px;
    }

    .card h2{
        font-size:18px;
    }

    .card p{
        font-size:14px;
    }

}

/* Mobile */
@media (max-width:480px){

    .services{
        grid-template-columns:repeat(2,1fr);
        gap:10px;
        padding:10px;
    }

    .card{
        padding:10px;
        border-radius:10px;
    }

    .card img{
        width:100%;
        height:130px;
        object-fit:contain;
    }

    .card h2{
        font-size:14px;
        margin:8px 0;
    }

    .card p{
        font-size:11px;
        line-height:1.4;
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

${Footer()}

</body>

</html>

`);

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

});

// Start Server
app.listen(PORT, () => {

    console.log(`🚀 Server Running http://localhost:${PORT}`);

});
