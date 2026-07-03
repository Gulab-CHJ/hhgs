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
         console.log("ALL SERVICE IDS:");
        services.forEach(service => console.log(service._id));

        let html = "";

        services.forEach(service => {

          html += `
               <a href="/service/${service._id}" class="card">

                <img src="${service.image}" alt="${service.title}">

                   <h2>${service.title}</h2>

                 <p>${service.description}</p>

                </a>
                `;

        });

        res.send(`

<!DOCTYPE html>

<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<title>HHGS</title>

<link rel="stylesheet" href="/css/style.css">

<style>
.services{
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
    padding:6px 5px;   /* Height कम */
    min-height:100px;  /* जरूरत हो तो 90px भी कर सकते हैं */
    transition:.3s;
    box-shadow:0 2px 6px rgba(0,0,0,.08);
    text-decoration: none;
    color: inherit;
}

.card:hover{
    transform:translateY(-2px);
    box-shadow:0 5px 12px rgba(0,0,0,.15);
}

.card img{
    width:55px;
    height:55px;
    object-fit:contain;
    display:block;
    margin:0 auto 5px;
}

.card h2{
    font-size:13px;
    font-weight:600;
    color:#222;
    margin:0;
    line-height:1.2;
}

.card p{
    display:none;
}

/* Tablet */
@media (max-width:768px){
    .services{
        grid-template-columns:repeat(3,1fr);
        gap:8px;
    }

    .card{
        padding:5px;
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
@media (max-width:480px){
    .services{
        grid-template-columns:repeat(3,1fr);
        gap:6px;
        padding:8px;
    }

    .card{
        padding:4px;
        min-height:80px;
        text-decoration: none;
        color: inherit;
    }
    .card img{
        width:40px;
        height:40px;
        margin-bottom:4px;
    }

    .card h2{
        font-size:10px;
        line-height:1.1;
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

<script src="/js/main.js"></script>

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
