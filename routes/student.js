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
body{
    font-family:Arial,sans-serif;
    background:#f5f5f5;
    margin:0;
    padding:20px;
}

.container{
    max-width:700px;
    margin:auto;
    background:#fff;
    padding:20px;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,.1);
}

img{
    width:150px;
    height:150px;
    object-fit:cover;
    border-radius:10px;
    display:block;
    margin:auto;
}

h2{
    text-align:center;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

td{
    padding:10px;
    border-bottom:1px solid #ddd;
}

.back{
    display:inline-block;
    margin-top:20px;
    text-decoration:none;
    background:#007bff;
    color:#fff;
    padding:10px 20px;
    border-radius:5px;
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