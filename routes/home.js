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

module.exports = router;