const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Student = require("../models/Student");

const Header = require("../views/component/header");
const Footer = require("../views/component/footer");


router.get("/", async (req, res) => {

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
    console.error(err);
    res.status(500).send(err.message);
}
});

router.get("/service/:id", async (req, res) => {
    try {

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.send("Service not found");
        }

        res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${service.title}</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
/>

<style>

/* ===== CSS PART 2 ME AAYEGA ===== */
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

html{
    scroll-behavior:smooth;
}

body{

    background:#081420;

    color:#fff;

    overflow-x:hidden;

    position:relative;

    min-height:100vh;

}

/* Background */

.bg1,
.bg2{

    position:fixed;

    border-radius:50%;

    filter:blur(120px);

    z-index:-1;

}

.bg1{

    width:350px;
    height:350px;

    background:#2563eb;

    top:-100px;
    left:-100px;

}

.bg2{

    width:300px;
    height:300px;

    background:#9333ea;

    bottom:-100px;
    right:-100px;

}

/* Main Container */

.container{

    width:95%;

    max-width:1300px;

    margin:auto;

    padding:40px 0;

}

/* Top */

.top{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:40px;

}

.logo{

    font-size:30px;

    font-weight:800;

    letter-spacing:2px;

}

.backBtn{

    text-decoration:none;

    color:white;

    padding:12px 20px;

    border-radius:50px;

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.2);

    transition:.3s;

}

.backBtn:hover{

    transform:translateY(-3px);

    background:#2563eb;

}

/* Hero */

.hero{

    display:grid;

    grid-template-columns:1fr 420px;

    gap:50px;

    align-items:center;

    margin-bottom:60px;

}

.badge{

    display:inline-block;

    padding:8px 18px;

    border-radius:30px;

    background:rgba(37,99,235,.15);

    border:1px solid rgba(255,255,255,.15);

    margin-bottom:20px;

}

.hero h1{

    font-size:55px;

    margin-bottom:20px;

    line-height:1.2;

}

.hero p{

    color:#d7d7d7;

    font-size:18px;

    line-height:1.8;

}

.heroButtons{

    display:flex;

    gap:15px;

    margin-top:35px;

}

.heroButtons a{

    text-decoration:none;

    padding:14px 30px;

    border-radius:40px;

    transition:.3s;

}

.primary{

    background:#2563eb;

    color:white;

}

.primary:hover{

    transform:translateY(-3px);

    box-shadow:0 15px 30px rgba(37,99,235,.35);

}

.secondary{

    background:transparent;

    color:white;

    border:1px solid rgba(255,255,255,.25);

}

.secondary:hover{

    background:rgba(255,255,255,.08);

}

/* Image */

.imageCard{

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.18);

    backdrop-filter:blur(18px);

    border-radius:25px;

    padding:35px;

    text-align:center;

    transition:.4s;

}

.imageCard:hover{

    transform:translateY(-8px);

}

.imageCard img{

    width:100%;

    max-width:250px;

    object-fit:contain;

}

/* Glass */

.glass{

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.15);

    backdrop-filter:blur(18px);

    border-radius:25px;

    padding:35px;

    margin-bottom:35px;

}

.glass h2{

    font-size:30px;

    margin-bottom:25px;

}

.description{

    white-space:pre-line;

    line-height:2;

    color:#eee;

}

/* Grid */

.grid{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));

    gap:25px;

}

.feature{

    background:rgba(255,255,255,.05);

    border-radius:18px;

    padding:25px;

    text-align:center;

    transition:.35s;

}

.feature:hover{

    transform:translateY(-10px);

    background:#2563eb;

}

.icon{

    font-size:40px;

    margin-bottom:20px;

}

/* Documents */

.documentList{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));

    gap:20px;

}

.doc{

    background:rgba(255,255,255,.06);

    padding:18px;

    border-radius:15px;

    transition:.3s;

}

.doc:hover{

    background:#2563eb;

}

/* Info Cards */

.info{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));

    gap:25px;

    margin:40px 0;

}

.infoCard{

    background:rgba(255,255,255,.08);

    border-radius:20px;

    padding:30px;

    text-align:center;

}

.infoCard i{

    font-size:45px;

    margin-bottom:20px;

    color:#60a5fa;

}

/* Buttons */

.buttons{

    display:flex;

    justify-content:center;

    gap:20px;

    flex-wrap:wrap;

    margin-top:30px;

}

.buttons a{

    text-decoration:none;

    padding:15px 35px;

    border-radius:50px;

    color:white;

    transition:.3s;

}

.whatsapp{

    background:#22c55e;

}

.call{

    background:#2563eb;

}

.home{

    background:#374151;

}

.buttons a:hover{

    transform:translateY(-5px);

}

/* Footer */

footer{

    text-align:center;

    margin-top:60px;

    color:#aaa;

}

/* Mobile */

@media(max-width:900px){

.hero{

grid-template-columns:1fr;

text-align:center;

}

.heroButtons{

justify-content:center;

flex-wrap:wrap;

}

.top{

flex-direction:column;

gap:20px;

}

.hero h1{

font-size:36px;

}

.glass{

padding:25px;

}

}

</style>

</head>

<body>

<!-- Background -->

<div class="bg1"></div>
<div class="bg2"></div>

<!-- Container -->

<div class="container">

<!-- Header -->

<div class="top">

<a href="/" class="backBtn">

<i class="fa-solid fa-arrow-left"></i>

Back

</a>

<div class="logo">

HHGS

</div>

</div>

<!-- Hero -->

<section class="hero">

<div class="left">

<div class="badge">

<i class="fa-solid fa-shield-halved"></i>

Trusted Service

</div>

<h1>

${service.title}

</h1>

<p>

Fast • Secure • Professional Digital Service

</p>

<div class="heroButtons">

<a href="#apply" class="primary">

Apply Now

</a>

<a href="#documents" class="secondary">

View Details

</a>

</div>

</div>

<div class="right">

<div class="imageCard">

<img
src="${service.image}"
alt="${service.title}"
>

</div>

</div>

</section>

<!-- Description -->

<section class="glass">

<h2>

<i class="fa-solid fa-circle-info"></i>

Service Description

</h2>

<div class="description">

${service.description}

</div>

</section>

<!-- Features -->

<section class="glass">

<h2>

<i class="fa-solid fa-star"></i>

Why Choose HHGS

</h2>

<div class="grid">

<div class="feature">

<div class="icon">

<i class="fa-solid fa-bolt"></i>

</div>

<h3>

Fast Service

</h3>

<p>

Quick processing with minimum waiting time.

</p>

</div>

<div class="feature">

<div class="icon">

<i class="fa-solid fa-lock"></i>

</div>

<h3>

Secure

</h3>

<p>

Your documents stay safe and confidential.

</p>

</div>

<div class="feature">

<div class="icon">

<i class="fa-solid fa-headset"></i>

</div>

<h3>

24×7 Support

</h3>

<p>

Support whenever you need assistance.

</p>

</div>

<div class="feature">

<div class="icon">

<i class="fa-solid fa-circle-check"></i>

</div>

<h3>

Trusted

</h3>

<p>

Reliable digital services with customer satisfaction.

</p>

</div>

</div>

</section>

<!-- Documents -->

<section
class="glass"
id="documents"
>

<h2>

<i class="fa-solid fa-folder-open"></i>

Required Documents

</h2>

<div class="documentList">

<div class="doc">

<i class="fa-solid fa-id-card"></i>

Aadhaar Card

</div>

<div class="doc">

<i class="fa-solid fa-mobile-screen"></i>

Mobile Number

</div>

<div class="doc">

<i class="fa-solid fa-image"></i>

Passport Size Photo

</div>

<div class="doc">

<i class="fa-solid fa-file-lines"></i>

Supporting Documents

</div>

</div>

</section>

<!-- Information -->

<section class="info">

<div class="infoCard">

<i class="fa-solid fa-clock"></i>

<h3>

Processing Time

</h3>

<p>

30 Minutes - 24 Hours

</p>

</div>

<div class="infoCard">

<i class="fa-solid fa-indian-rupee-sign"></i>

<h3>

Service Charge

</h3>

<p>

Contact for Price

</p>

</div>

<div class="infoCard">

<i class="fa-solid fa-location-dot"></i>

<h3>

Location

</h3>

<p>

HHGS Digital Service Center

</p>

</div>

</section>

<!-- CTA -->

<section
class="glass"
id="apply"
>

<h2>

Ready To Apply?

</h2>

<p>

Get your work completed quickly and securely.

</p>

<div class="buttons">

<a
href="https://wa.me/919142264714?text=${encodeURIComponent(
`Hello HHGS, I want to apply for the service: ${service.title}`
)}"
target="_blank"
class="whatsapp"
>

<i class="fab fa-whatsapp"></i>

WhatsApp

</a>

<a
href="tel:+919142264714"
class="call"
>

<i class="fa-solid fa-phone"></i>

Call Now

</a>

<a
href="/"
class="home"
>

<i class="fa-solid fa-house"></i>

Home

</a>

</div>

</section>

<!-- Footer -->

<footer>

© 2026 HHGS Digital Services

</footer>

</div>



<script src="/js/service.js"></script>

</body>

</html>
`);

    } catch (err) {

        console.error(err);
        res.status(500).send(err.message);

    }
});
router.get("/student/:id", async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send("Student not found");
        }

        res.send(`
<!DOCTYPE html>
<html>
<head>
<title>${student.name}</title>

<style>

body{
    font-family:Arial;
    background:#f5f5f5;
    padding:30px;
}

.box{
    max-width:700px;
    margin:auto;
    background:#fff;
    padding:20px;
    border-radius:10px;
    box-shadow:0 2px 10px rgba(0,0,0,.15);
    text-align:center;
}

img{
    width:150px;
    border-radius:8px;
    margin-bottom:20px;
}

p{
    margin:10px 0;
}

</style>

</head>

<body>

<div class="box">

<img src="${student.image}">

<h2>${student.name}</h2>

<p><b>Father:</b> ${student.father || ""}</p>

<p><b>Class:</b> ${student.class || ""}</p>

<p><b>Email:</b> ${student.email || ""}</p>

<p><b>Phone:</b> ${student.phone || ""}</p>

<p><b>Address:</b> ${student.address || ""}</p>

<p>${student.description || ""}</p>

<a href="/">⬅ Back</a>

</div>

</body>
</html>
`);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;