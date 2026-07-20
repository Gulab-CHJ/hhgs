function ManageDoctors(doctors = []) {

let rows = "";

doctors.forEach((doctor, index) => {

rows += `
<tr>

<td>${index + 1}</td>

<td>
<img src="${doctor.image || "/images/default-doctor.png"}"
class="doctor-img">
</td>

<td>${doctor.doctorId || "-"}</td>

<td>${doctor.name || "-"}</td>

<td>${doctor.degree || "-"}</td>

<td>${doctor.specialization || "-"}</td>

<td>${doctor.experience || "-"}</td>

<td>${doctor.hospital || "-"}</td>

<td>${doctor.phone || "-"}</td>

<td>${doctor.password || "-"}</td>

<td>${doctor.email || "-"}</td>

<td>

<a href="/admin/edit-doctor/${doctor._id}" class="edit-btn">
Edit
</a>

<a href="/admin/delete-doctor/${doctor._id}"
class="delete-btn"
onclick="return confirm('Delete Doctor?')">
Delete
</a>

</td>

</tr>
`;

});

return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Manage Doctors</title>

<link rel="stylesheet" href="/css/admin.css">

<style>

.container{
width:98%;
margin:30px auto;
}

.top-bar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
}

.add-btn{
background:#0d6efd;
color:#fff;
padding:10px 18px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
}

table{
width:100%;
border-collapse:collapse;
background:#fff;
}

th,td{
border:1px solid #ddd;
padding:10px;
text-align:center;
font-size:14px;
}

th{
background:#0d6efd;
color:#fff;
}

.doctor-img{
width:60px;
height:60px;
border-radius:50%;
object-fit:cover;
}

.edit-btn{
background:#28a745;
color:#fff;
padding:6px 12px;
border-radius:6px;
text-decoration:none;
margin-right:5px;
}

.delete-btn{
background:#dc3545;
color:#fff;
padding:6px 12px;
border-radius:6px;
text-decoration:none;
}

</style>

</head>

<body>

<div class="container">

<div class="top-bar">

<h2>Manage Doctors (${doctors.length})</h2>

<a href="/admin/add-doctor" class="add-btn">
+ Add Doctor
</a>

</div>

<table>

<thead>

<tr>

<th>#</th>
<th>Photo</th>
<th>Doctor ID</th>
<th>Name</th>
<th>Degree</th>
<th>Specialization</th>
<th>Experience</th>
<th>Hospital</th>
<th>Phone</th>
<th>Password</th>
<th>Email</th>
<th>Action</th>

</tr>

</thead>

<tbody>

${rows || `
<tr>
<td colspan="12">
No Doctors Found
</td>
</tr>
`}

</tbody>

</table>

</div>

</body>

</html>
`;

}

module.exports = ManageDoctors;