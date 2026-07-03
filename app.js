require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");

const Header = require("./views/component/header");
const Hero = require("./views/component/hero");
const Footer = require("./views/component/footer");
const AdminLogin = require("./pages/adminLogin");
const AdminDashboard = require("./pages/adminDashboard");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");
const Service = require("./models/Service");


const app = express();
const PORT = process.env.PORT || 3000;





app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);


app.get("/admin", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

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
    res.status(500).send(`
        <h2>Server Error</h2>
        <pre>${error.stack}</pre>
    `);
}

});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));



const cards = [
    {
        title: "PAN Card",
        description: "Apply for a new PAN Card."
    },
    {
        title: "Aadhaar",
        description: "Update Aadhaar services."
    },
    {
        title: "Passport",
        description: "Passport application support."
    }
];

app.get("/", async (req, res) => {

const services = await Service.find();

let html = "";

services.forEach(service=>{

html += `

<div class="card">

<img src="${service.image}" width="100%">

<h2>${service.title}</h2>

<p>${service.description}</p>

</div>

`;

});

res.send(`

<!DOCTYPE html>

<html>

<head>

<link rel="stylesheet" href="/css/style.css">

<style>

.card{

width:300px;

padding:15px;

margin:15px;

display:inline-block;

border:1px solid #ddd;

border-radius:10px;

vertical-align:top;

}

.card img{

height:180px;

object-fit:cover;

}

</style>

</head>

<body>

${Header()}

<h1 align="center">Our Services</h1>

${html}

${Footer()}

</body>

</html>

`);

});


app.listen(PORT, () => {
    console.log(`🚀 Server Running http://localhost:${PORT}`);
});


// // const express = require("express");
// // const app = express();
// // app.get("/", (req, res) => res.send("HHGS Server Running"));
// // app.listen(process.env.PORT || 3000);

// require("dotenv").config();
// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//     res.send("HHGS Working");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log("Server Started");
// });
