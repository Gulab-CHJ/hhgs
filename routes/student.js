const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.get("/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).send("Student Not Found");
        }

        res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${student.name}</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:'Segoe UI',sans-serif;
    background:linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb);
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:30px;
}

.container{
    width:100%;
    max-width:900px;
    background:rgba(255,255,255,.12);
    backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,.15);
    border-radius:25px;
    padding:40px;
    box-shadow:0 20px 60px rgba(0,0,0,.4);
}

.profile{
    text-align:center;
    margin-bottom:30px;
}

.profile img{
    width:170px;
    height:170px;
    object-fit:cover;
    border-radius:50%;
    border:6px solid #fff;
    box-shadow:0 15px 40px rgba(0,0,0,.35);
    transition:.4s;
}

.profile img:hover{
    transform:scale(1.05);
}

.profile h2{
    color:#fff;
    margin-top:20px;
    font-size:34px;
}

.verify{
    display:inline-block;
    margin-top:10px;
    padding:8px 18px;
    background:#22c55e;
    color:#fff;
    border-radius:30px;
    font-size:14px;
}

table{
    width:100%;
    border-collapse:separate;
    border-spacing:0 15px;
}

tr{
    background:rgba(255,255,255,.08);
    transition:.3s;
}

tr:hover{
    transform:translateY(-5px);
    background:rgba(255,255,255,.14);
}

td{
    padding:18px;
    color:#fff;
}

td:first-child{
    width:230px;
    color:#93c5fd;
    font-weight:bold;
}

.back{
    display:block;
    width:220px;
    margin:35px auto 0;
    text-align:center;
    text-decoration:none;
    color:#fff;
    background:linear-gradient(135deg,#2563eb,#7c3aed);
    padding:15px;
    border-radius:50px;
    font-weight:bold;
    transition:.35s;
}

.back:hover{
    transform:translateY(-4px);
    box-shadow:0 15px 35px rgba(37,99,235,.45);
}

@media(max-width:768px){

.container{
padding:25px;
}

.profile img{
width:130px;
height:130px;
}

.profile h2{
font-size:28px;
}

table,
tbody,
tr,
td{
display:block;
width:100%;
}

tr{
margin-bottom:15px;
border-radius:15px;
overflow:hidden;
}

td:first-child{
background:rgba(255,255,255,.08);
}

.back{
width:100%;
}

}
</style>

</head>

<body>

<div class="container">

<img src="${student.image}" alt="${student.name}">

<h2>${student.name}</h2>

<table>

<tr>
<td><b>Father Name</b></td>
<td>${student.fatherName}</td>
</tr>

<tr>
<td><b>Course</b></td>
<td>${student.course}</td>
</tr>

<tr>
<td><b>Mobile</b></td>
<td>${student.mobile}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>${student.email}</td>
</tr>

<tr>
<td><b>Address</b></td>
<td>${student.address}</td>
</tr>

<tr>
<td><b>Description</b></td>
<td>${student.description}</td>
</tr>

</table>

<a href="/" class="back">⬅ Back</a>

</div><div class="container">

<div class="profile">

<img src="${student.image}" alt="${student.name}">

<h2>${student.name}</h2>

<div class="verify">✔ Verified Student</div>

</div>

<table>

<tr>
<td>Father Name</td>
<td>${student.fatherName || "-"}</td>
</tr>

<tr>
<td>Course</td>
<td>${student.course || "-"}</td>
</tr>

<tr>
<td>Mobile</td>
<td>${student.mobile || "-"}</td>
</tr>

<tr>
<td>Email</td>
<td>${student.email || "-"}</td>
</tr>

<tr>
<td>Address</td>
<td>${student.address || "-"}</td>
</tr>

<tr>
<td>Description</td>
<td>${student.description || "-"}</td>
</tr>

</table>

<a href="/" class="back">⬅ Back</a>

</div>

</body>
</html>
        `);

    } catch (err) {

        console.log(err);
        res.status(500).send("Server Error");

    }

});

module.exports = router;