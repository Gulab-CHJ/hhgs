function EditDoctor(doctor = {}) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Edit Doctor</title>

<link rel="stylesheet" href="/css/admin.css">

<style>

body{
    background:#f4f6f9;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:700px;
    margin:40px auto;
}

.card{
    background:#fff;
    padding:30px;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,.1);
}

h2{
    text-align:center;
    margin-bottom:25px;
}

input,
textarea{
    width:100%;
    padding:12px;
    margin-bottom:15px;
    border:1px solid #ddd;
    border-radius:8px;
    font-size:15px;
    box-sizing:border-box;
}

textarea{
    resize:vertical;
}

.preview{
    text-align:center;
    margin-bottom:20px;
}

.preview img{
    width:120px;
    height:120px;
    border-radius:50%;
    object-fit:cover;
    border:3px solid #0d6efd;
}

.btn{
    width:100%;
    padding:14px;
    background:#0d6efd;
    color:#fff;
    border:none;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;
}

.btn:hover{
    background:#0b5ed7;
}

.back{
    display:block;
    text-align:center;
    margin-top:20px;
    text-decoration:none;
    color:#0d6efd;
    font-weight:bold;
}

</style>

</head>

<body>

<div class="container">

<div class="card">

<h2>Edit Doctor</h2>

<form
action="/admin/edit-doctor/${doctor._id}"
method="POST"
enctype="multipart/form-data"
>

<div class="preview">

<img
src="${doctor.image || "/images/default-doctor.png"}"
alt="Doctor"
>

</div>

<input
type="text"
name="name"
placeholder="Doctor Name"
value="${doctor.name || ""}"
required
>

<input
type="text"
name="qualification"
placeholder="Qualification"
value="${doctor.degree || ""}"
required
>

<input
type="text"
name="speciality"
placeholder="Specialization"
value="${doctor.specialization || ""}"
required
>

<input
type="text"
name="experience"
placeholder="Experience"
value="${doctor.experience || ""}"
required
>

<input
type="text"
name="clinic"
placeholder="Hospital / Clinic"
value="${doctor.hospital || ""}"
required
>

<input
type="text"
name="phone"
placeholder="Phone"
value="${doctor.phone || ""}"
required
>

<input
type="email"
name="email"
placeholder="Email"
value="${doctor.email || ""}"
>

<input
type="password"
name="password"
placeholder="Password"
value="${doctor.password || ""}"
required
>

<textarea
name="description"
rows="4"
placeholder="Doctor Description"
>${doctor.description || ""}</textarea>

<input
type="text"
name="address"
placeholder="Address"
value="${doctor.address || ""}"
required
>

<label><b>Change Photo</b></label>

<input
type="file"
name="image"
accept="image/*"
>

<button
type="submit"
class="btn"
>
Update Doctor
</button>

</form>

<a
href="/admin/manage-doctors"
class="back"
>
← Back to Manage Doctors
</a>

</div>

</div>

</body>

</html>
`;
}

module.exports = EditDoctor;