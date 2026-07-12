function AllStudents(students) {

return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Manage Students</title>

<link rel="stylesheet" href="/css/style.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

body{

    background:#f5f7fb;

    font-family:Poppins,sans-serif;

}

.container{

    width:95%;

    max-width:1400px;

    margin:40px auto;

}

.top{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:25px;

}

.top h1{

    color:#0f172a;

}

.add-btn{

    background:#2563eb;

    color:#fff;

    padding:12px 18px;

    border-radius:10px;

    text-decoration:none;

    font-weight:600;

}

table{

    width:100%;

    border-collapse:collapse;

    background:#fff;

    border-radius:12px;

    overflow:hidden;

    box-shadow:0 10px 30px rgba(0,0,0,.08);

}

th{

    background:#2563eb;

    color:#fff;

    padding:15px;

}

td{

    padding:15px;

    text-align:center;

    border-bottom:1px solid #eee;

}

td img{

    width:60px;

    height:60px;

    border-radius:50%;

    object-fit:cover;

}

.action{

    display:flex;

    justify-content:center;

    gap:8px;

}

.action a{

    padding:8px 12px;

    color:#fff;

    border-radius:8px;

    text-decoration:none;

    font-size:14px;

}

.view{

    background:#2563eb;

}

.edit{

    background:#f59e0b;

}

.delete{

    background:#dc2626;

}

@media(max-width:768px){

table{

display:block;

overflow-x:auto;

}

}

</style>

</head>

<body>

<div class="container">

<div class="top">

<h1>👨‍🎓 Manage Students</h1>

<a href="/admin/add-student" class="add-btn">

<i class="fa-solid fa-plus"></i>

Add Student

</a>

</div>

<table>

<thead>

<tr>

<th>Photo</th>

<th>Name</th>

<th>Course</th>

<th>Mobile</th>

<th>Email</th>

<th>Action</th>

</tr>

</thead>

<tbody>

${
students.map(student=>`

<tr>

<td>

<img src="${student.image}" alt="${student.name}">

</td>

<td>${student.name}</td>

<td>${student.course}</td>

<td>${student.mobile}</td>

<td>${student.email}</td>

<td>

<div class="action">

<a href="/student/${student._id}" class="view">

<i class="fa-solid fa-eye"></i>

</a>

<a href="/admin/edit-student/${student._id}" class="edit">

<i class="fa-solid fa-pen"></i>

</a>

<a href="/admin/delete-student/${student._id}" class="delete"

onclick="return confirm('Delete this student?')">

<i class="fa-solid fa-trash"></i>

</a>

</div>

</td>

</tr>

`).join("")
}

</tbody>

</table>

</div>

</body>

</html>

`;

}

module.exports = AllStudents;