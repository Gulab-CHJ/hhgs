// // function EditDoctor(doctor = {}) {
// //     return `
// // <!DOCTYPE html>
// // <html lang="en">

// // <head>

// // <meta charset="UTF-8">
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <title>Edit Doctor</title>

// // <link rel="stylesheet" href="/css/admin.css">

// // <style>

// // body{
// //     background:#f4f6f9;
// //     font-family:Arial,Helvetica,sans-serif;
// // }

// // .container{
// //     max-width:700px;
// //     margin:40px auto;
// // }

// // .card{
// //     background:#fff;
// //     padding:30px;
// //     border-radius:10px;
// //     box-shadow:0 5px 15px rgba(0,0,0,.1);
// // }

// // h2{
// //     text-align:center;
// //     margin-bottom:25px;
// // }

// // input,
// // textarea{
// //     width:100%;
// //     padding:12px;
// //     margin-bottom:15px;
// //     border:1px solid #ddd;
// //     border-radius:8px;
// //     font-size:15px;
// //     box-sizing:border-box;
// // }

// // textarea{
// //     resize:vertical;
// // }

// // .preview{
// //     text-align:center;
// //     margin-bottom:20px;
// // }

// // .preview img{
// //     width:120px;
// //     height:120px;
// //     border-radius:50%;
// //     object-fit:cover;
// //     border:3px solid #0d6efd;
// // }

// // .btn{
// //     width:100%;
// //     padding:14px;
// //     background:#0d6efd;
// //     color:#fff;
// //     border:none;
// //     border-radius:8px;
// //     font-size:16px;
// //     cursor:pointer;
// // }

// // .btn:hover{
// //     background:#0b5ed7;
// // }

// // .back{
// //     display:block;
// //     text-align:center;
// //     margin-top:20px;
// //     text-decoration:none;
// //     color:#0d6efd;
// //     font-weight:bold;
// // }

// // </style>

// // </head>

// // <body>

// // <div class="container">

// // <div class="card">

// // <h2>Edit Doctor</h2>

// // <form
// // action="/admin/edit-doctor/${doctor._id}"
// // method="POST"
// // enctype="multipart/form-data"
// // >

// // <div class="preview">

// // <img
// // src="${doctor.image || "/images/default-doctor.png"}"
// // alt="Doctor"
// // >

// // </div>

// // <input
// // type="text"
// // name="name"
// // placeholder="Doctor Name"
// // value="${doctor.name || ""}"
// // required
// // >

// // <input
// // type="text"
// // name="qualification"
// // placeholder="Qualification"
// // value="${doctor.degree || ""}"
// // required
// // >

// // <input
// // type="text"
// // name="speciality"
// // placeholder="Specialization"
// // value="${doctor.specialization || ""}"
// // required
// // >

// // <input
// // type="text"
// // name="experience"
// // placeholder="Experience"
// // value="${doctor.experience || ""}"
// // required
// // >

// // <input
// // type="text"
// // name="clinic"
// // placeholder="Hospital / Clinic"
// // value="${doctor.hospital || ""}"
// // required
// // >

// // <input
// // type="text"
// // name="phone"
// // placeholder="Phone"
// // value="${doctor.phone || ""}"
// // required
// // >

// // <input
// // type="email"
// // name="email"
// // placeholder="Email"
// // value="${doctor.email || ""}"
// // >

// // <input
// // type="password"
// // name="password"
// // placeholder="Password"
// // value="${doctor.password || ""}"
// // required
// // >

// // <textarea
// // name="description"
// // rows="4"
// // placeholder="Doctor Description"
// // >${doctor.description || ""}</textarea>

// // <input
// // type="text"
// // name="address"
// // placeholder="Address"
// // value="${doctor.address || ""}"
// // required
// // >

// // <label><b>Change Photo</b></label>

// // <input
// // type="file"
// // name="image"
// // accept="image/*"
// // >

// // <button
// // type="submit"
// // class="btn"
// // >
// // Update Doctor
// // </button>

// // </form>

// // <a
// // href="/admin/manage-doctors"
// // class="back"
// // >
// // ← Back to Manage Doctors
// // </a>

// // </div>

// // </div>

// // </body>

// // </html>
// // `;
// // }

// // module.exports = EditDoctor;

// <h3>Available Timing</h3>

// <select name="availableDay">

// <option ${doctor.availableDay=="Monday"?"selected":""}>
// Monday
// </option>

// <option ${doctor.availableDay=="Tuesday"?"selected":""}>
// Tuesday
// </option>

// <option ${doctor.availableDay=="Wednesday"?"selected":""}>
// Wednesday
// </option>

// <option ${doctor.availableDay=="Thursday"?"selected":""}>
// Thursday
// </option>

// <option ${doctor.availableDay=="Friday"?"selected":""}>
// Friday
// </option>

// <option ${doctor.availableDay=="Saturday"?"selected":""}>
// Saturday
// </option>

// <option ${doctor.availableDay=="Sunday"?"selected":""}>
// Sunday
// </option>

// </select>


// <input
// type="time"
// name="timeFrom"
// value="${doctor.timeFrom || ''}"
// >


// <input
// type="time"
// name="timeTo"
// value="${doctor.timeTo || ''}"
// >



// <h3>Consultation Fee</h3>


// <input
// type="number"
// name="fee"
// value="${doctor.fee || ''}"
// placeholder="Fee"
// >



// <select name="feeType">

// <option value="per_visit">
// Per Visit
// </option>

// <option value="per_month">
// Per Month
// </option>

// <option value="per_hour">
// Per Hour
// </option>

// </select>


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

padding:15px;

}


.card{

background:white;

padding:30px;

border-radius:12px;

box-shadow:0 5px 20px rgba(0,0,0,.12);

}


h2{

text-align:center;

margin-bottom:25px;

color:#0d6efd;

}


input,
textarea,
select{


width:100%;

padding:12px;

margin-bottom:15px;

border:1px solid #ddd;

border-radius:8px;

font-size:15px;

box-sizing:border-box;

}


textarea{

resize:none;

}


label{

display:block;

margin-bottom:8px;

font-weight:bold;

color:#333;

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



.time-box{

display:flex;

gap:10px;

}


.time-box input{

width:50%;

}



.btn{

width:100%;

padding:14px;

background:#0d6efd;

color:white;

border:none;

border-radius:8px;

font-size:16px;

cursor:pointer;

}



.btn:hover{

background:#084298;

}



.back{

display:block;

text-align:center;

margin-top:20px;

text-decoration:none;

color:#0d6efd;

font-weight:bold;

}



@media(max-width:600px){


.card{

padding:20px;

}


.time-box{

flex-direction:column;

}


.time-box input{

width:100%;

}


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

>


</div>




<label>
Doctor Name
</label>


<input

type="text"

name="name"

value="${doctor.name || ""}"

required

>




<label>
Qualification
</label>


<input

type="text"

name="qualification"

value="${doctor.degree || ""}"

required

>




<label>
Specialization
</label>


<input

type="text"

name="speciality"

value="${doctor.specialization || ""}"

required

>




<label>
Experience
</label>


<input

type="text"

name="experience"

value="${doctor.experience || ""}"

required

>




<label>
Hospital / Clinic
</label>


<input

type="text"

name="clinic"

value="${doctor.hospital || ""}"

required

>




<label>
Phone
</label>


<input

type="text"

name="phone"

value="${doctor.phone || ""}"

required

>




<label>
Email
</label>


<input

type="email"

name="email"

value="${doctor.email || ""}"

>




<label>
Password
</label>


<input

type="password"

name="password"

value="${doctor.password || ""}"

required

>




<label>
Address
</label>


<input

type="text"

name="address"

value="${doctor.address || ""}"

required

>




<label>
Description
</label>


<textarea

name="description"

rows="4"

>${doctor.description || ""}</textarea>





<label>
Available Day
</label>


<select name="availableDay">


<option value="Monday"
${doctor.availableDay=="Monday"?"selected":""}>
Monday
</option>


<option value="Tuesday"
${doctor.availableDay=="Tuesday"?"selected":""}>
Tuesday
</option>


<option value="Wednesday"
${doctor.availableDay=="Wednesday"?"selected":""}>
Wednesday
</option>


<option value="Thursday"
${doctor.availableDay=="Thursday"?"selected":""}>
Thursday
</option>


<option value="Friday"
${doctor.availableDay=="Friday"?"selected":""}>
Friday
</option>


<option value="Saturday"
${doctor.availableDay=="Saturday"?"selected":""}>
Saturday
</option>


<option value="Sunday"
${doctor.availableDay=="Sunday"?"selected":""}>
Sunday
</option>


</select>





<label>
Available Time
</label>


<div class="time-box">


<input

type="time"

name="timeFrom"

value="${doctor.timeFrom || ""}"

>



<input

type="time"

name="timeTo"

value="${doctor.timeTo || ""}"

>


</div>





<label>
Consultation Fee
</label>


<input

type="number"

name="fee"

placeholder="Fee"

value="${doctor.fee || ""}"

>




<label>
Fee Type
</label>


<select name="feeType">


<option value="per_visit"
${doctor.feeType=="per_visit"?"selected":""}>
Per Visit
</option>



<option value="per_month"
${doctor.feeType=="per_month"?"selected":""}>
Per Month
</option>



<option value="per_hour"
${doctor.feeType=="per_hour"?"selected":""}>
Per Hour
</option>



</select>





<label>
Change Photo
</label>


<input

type="file"

name="image"

accept="image/*"

>




<button

type="submit"

class="btn">

Update Doctor

</button>




</form>



<a

href="/admin/manage-doctors"

class="back">

← Back To Manage Doctors

</a>



</div>


</div>


</body>

</html>


`;

}


module.exports = EditDoctor;