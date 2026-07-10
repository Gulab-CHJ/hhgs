function AddDoctor() {
return `

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Add Doctor</title>

<link rel="stylesheet" href="/css/admin.css">

<style>

body{
    font-family:Arial,sans-serif;
    background:#f5f5f5;
}

.container{
    width:500px;
    margin:40px auto;
    background:#fff;
    padding:25px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,.15);
}

h1{
    text-align:center;
    margin-bottom:20px;
}

input,
textarea{
    width:100%;
    padding:12px;
    margin:10px 0;
    border:1px solid #ccc;
    border-radius:6px;
    box-sizing:border-box;
}

textarea{
    height:120px;
    resize:none;
}

button{
    width:100%;
    padding:12px;
    background:#2563eb;
    color:#fff;
    border:none;
    border-radius:6px;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#1d4ed8;
}

a{
    display:block;
    text-align:center;
    margin-top:20px;
    text-decoration:none;
}

</style>

</head>

<body>

<div class="container">

<h1>Add Doctor</h1>

<form
action="/admin/add-doctor"
method="POST"
enctype="multipart/form-data"
>

<input
type="text"
name="name"
placeholder="Doctor Name"
required
>

<input
type="text"
name="degree"
placeholder="Degree"
required
>

<input
type="text"
name="specialization"
placeholder="Specialization"
required
>

<input
type="text"
name="experience"
placeholder="Experience"
required
>

<input
type="text"
name="hospital"
placeholder="Hospital / Clinic"
required
>

<input
type="text"
name="phone"
placeholder="Phone Number"
required
>

<input
type="email"
name="email"
placeholder="Email"
>

<input
type="text"
name="address"
placeholder="Address"
required
>

<input
type="file"
name="image"
accept="image/*"
required
>

<textarea
name="description"
placeholder="Doctor Description"
required
></textarea>

<button type="submit">
Add Doctor
</button>

</form>

<a href="/admin/dashboard">⬅ Back Dashboard</a>

</div>

</body>

</html>

`;
}

module.exports = AddDoctor;