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
// Service Details Page
app.get("/service/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).send("Service Not Found");
        }
        const descriptionList = service.description
    .split("\n")
    .filter(item => item.trim() !== "")
    .map(item => `<li>${item}</li>`)
    .join("");

        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${service.title}</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',Arial,sans-serif;
}

body{
    background:#f2f5fa;
    padding:15px;
}

/* Main Card */
.container{
    max-width:850px;
    margin:20px auto;
    background:#fff;
    border-radius:18px;
    overflow:hidden;
    box-shadow:0 8px 30px rgba(0,0,0,.12);
}

/* Header */
.header{
    background:linear-gradient(135deg,#0d6efd,#0a58ca);
    padding:25px 20px;
    text-align:center;
}

/* Image */
.header img{
    width:85px;
    height:85px;
    object-fit:contain;
    background:#fff;
    border-radius:15px;
    padding:8px;
    border:2px solid rgba(255,255,255,.3);
    box-shadow:0 5px 15px rgba(0,0,0,.2);
    margin-bottom:12px;
}

/* Title */
.header h1{
    color:#fff;
    font-size:28px;
    font-weight:700;
}

/* Content */
.content{
    padding:25px;
}

.content h2{
    color:#0d6efd;
    font-size:22px;
    margin-bottom:18px;
    border-left:5px solid #0d6efd;
    padding-left:10px;
}

/* Number List */
ol{
    list-style:none;
    counter-reset:item;
    padding:0;
}

ol li{
    counter-increment:item;
    position:relative;
    background:#f8f9ff;
    margin-bottom:12px;
    padding:15px 15px 15px 60px;
    border-radius:10px;
    border-left:5px solid #0d6efd;
    font-size:16px;
    font-weight:500;
    transition:.3s;
}

ol li::before{
    content:counter(item);
    position:absolute;
    left:15px;
    top:50%;
    transform:translateY(-50%);
    width:30px;
    height:30px;
    border-radius:50%;
    background:#0d6efd;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:bold;
}

ol li:hover{
    background:#0d6efd;
    color:#fff;
    transform:translateX(5px);
}

ol li:hover::before{
    background:#fff;
    color:#0d6efd;
}

/* Button */
.back{
    display:inline-block;
    margin-top:25px;
    background:#0d6efd;
    color:#fff;
    padding:12px 28px;
    border-radius:30px;
    text-decoration:none;
    font-weight:600;
    transition:.3s;
}

.back:hover{
    background:#084298;
}

/* Tablet */
@media(max-width:768px){

body{
    padding:10px;
}

.container{
    margin:10px auto;
}

.header{
    padding:20px 15px;
}

.header img{
    width:75px;
    height:75px;
}

.header h1{
    font-size:22px;
}

.content{
    padding:18px;
}

.content h2{
    font-size:18px;
}

ol li{
    font-size:14px;
    padding:13px 12px 13px 52px;
}

ol li::before{
    width:26px;
    height:26px;
    left:12px;
}

.back{
    width:100%;
    text-align:center;
}
}

/* Mobile */
@media(max-width:480px){

.header img{
    width:65px;
    height:65px;
}

.header h1{
    font-size:18px;
}

.content{
    padding:15px;
}

.content h2{
    font-size:17px;
}

ol li{
    font-size:13px;
    padding:11px 10px 11px 46px;
}

ol li::before{
    width:22px;
    height:22px;
    font-size:12px;
}

.back{
    font-size:14px;
    padding:11px;
}
}
</style>

</head>
<body>

<div class="container">

    <div class="header">
        <img src="${service.image}" alt="${service.title}">
        <h1>${service.title}</h1>
    </div>

    <div class="content">
        <h2>Available Services</h2>

        <ol>
            ${descriptionList}
        </ol>

        <a href="/" class="back">⬅ Back to Home</a>
    </div>

</div>

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
