// // function AddDoctor() {
// // return `

// // <!DOCTYPE html>
// // <html>

// // <head>

// // <meta charset="UTF-8">
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <title>Add Doctor</title>

// // <link rel="stylesheet" href="/css/admin.css">

// // <style>

// // body{
// //     font-family:Arial,sans-serif;
// //     background:#f5f5f5;
// // }

// // .container{
// //     width:500px;
// //     margin:40px auto;
// //     background:#fff;
// //     padding:25px;
// //     border-radius:10px;
// //     box-shadow:0 0 10px rgba(0,0,0,.15);
// // }

// // h1{
// //     text-align:center;
// //     margin-bottom:20px;
// // }

// // input,
// // textarea{
// //     width:100%;
// //     padding:12px;
// //     margin:10px 0;
// //     border:1px solid #ccc;
// //     border-radius:6px;
// //     box-sizing:border-box;
// // }

// // textarea{
// //     height:120px;
// //     resize:none;
// // }

// // button{
// //     width:100%;
// //     padding:12px;
// //     background:#2563eb;
// //     color:#fff;
// //     border:none;
// //     border-radius:6px;
// //     cursor:pointer;
// //     font-size:16px;
// // }

// // button:hover{
// //     background:#1d4ed8;
// // }

// // a{
// //     display:block;
// //     text-align:center;
// //     margin-top:20px;
// //     text-decoration:none;
// // }

// // </style>

// // </head>

// // <body>

// // <div class="container">

// // <h1>Add Doctor</h1>

// // <form
// // action="/admin/add-doctor"
// // method="POST"
// // enctype="multipart/form-data"
// // >

// // <input
// // type="text"
// // name="name"
// // placeholder="Doctor Name"
// // required
// // >

// // <input
// // type="text"
// // name="degree"
// // placeholder="Degree"
// // required
// // >

// // <input
// // type="text"
// // name="specialization"
// // placeholder="Specialization"
// // required
// // >

// // <input
// // type="text"
// // name="experience"
// // placeholder="Experience"
// // required
// // >

// // <input
// // type="text"
// // name="hospital"
// // placeholder="Hospital / Clinic"
// // required
// // >

// // <input
// // type="text"
// // name="phone"
// // placeholder="Phone Number"
// // required
// // >

// // <input
// // type="email"
// // name="email"
// // placeholder="Email"
// // >

// // <input
// // type="text"
// // name="address"
// // placeholder="Address"
// // required
// // >

// // <input
// // type="file"
// // name="image"
// // accept="image/*"
// // required
// // >

// // <textarea
// // name="description"
// // placeholder="Doctor Description"
// // required
// // ></textarea>

// // <button type="submit">
// // Add Doctor
// // </button>

// // </form>

// // <a href="/admin/dashboard">⬅ Back Dashboard</a>

// // </div>

// // </body>

// // </html>

// // `;
// // }

// // module.exports = AddDoctor;


// const Header = require("../../views/component/headercomponent");
// const Footer = require("../../views/component/footercomponent");

// function AddDoctor() {

// return `

// <!DOCTYPE html>

// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>Add Doctor</title>

// <link rel="stylesheet" href="/css/style.css">

// <link rel="stylesheet"
// href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

// </head>

// <body>

// ${Header()}

// <div class="container">

// <div class="form-card">

// <h2>

// <i class="fa-solid fa-user-doctor"></i>

// Add New Doctor

// </h2>

// <form
// action="/doctor/add"
// method="POST"
// enctype="multipart/form-data">

// <!-- Doctor Name -->

// <div class="input-box">

// <label>Doctor Name</label>

// <input
// type="text"
// name="name"
// placeholder="Enter Doctor Name"
// required>

// </div>

// <!-- Photo -->

// <div class="input-box">

// <label>Doctor Photo</label>

// <input
// type="file"
// name="image"
// accept="image/*"
// required>

// </div>

// <!-- Specialist -->

// <div class="input-box">

// <label>Specialist</label>

// <input
// type="text"
// name="specialist"
// placeholder="Cardiologist / Dentist"
// required>

// </div>

// <!-- Qualification -->

// <div class="input-box">

// <label>Qualification</label>

// <input
// type="text"
// name="qualification"
// placeholder="MBBS, MD"
// required>

// </div>

// <!-- Experience -->

// <div class="input-box">

// <label>Experience</label>

// <input
// type="text"
// name="experience"
// placeholder="10 Years"
// required>

// </div>

// <!-- Hospital -->

// <div class="input-box">

// <label>Hospital / Clinic</label>

// <input
// type="text"
// name="hospital"
// placeholder="ABC Hospital"
// required>

// </div>

// <!-- Mobile -->

// <div class="input-box">

// <label>Mobile Number</label>

// <input
// type="tel"
// name="mobile"
// placeholder="9876543210"
// required>

// </div>

// <!-- Email -->

// <div class="input-box">

// <label>Email</label>

// <input
// type="email"
// name="email"
// placeholder="doctor@gmail.com"
// required>

// </div>

// <!-- Consultation Fee -->

// <div class="input-box">

// <label>Consultation Fee</label>

// <input
// type="number"
// name="fee"
// placeholder="500"
// required>

// </div>

// <!-- Address -->

// <div class="input-box">

// <label>Address</label>

// <textarea
// name="address"
// rows="3"
// placeholder="Doctor Address"
// required></textarea>

// </div>

// <!-- About -->

// <div class="input-box">

// <label>About Doctor</label>

// <textarea
// name="about"
// rows="5"
// placeholder="Write About Doctor..."
// required></textarea>

// </div>

// <button
// type="submit"
// class="save-btn">

// <i class="fa-solid fa-floppy-disk"></i>

// Save Doctor

// </button>

// </form>

// </div>

// </div>

// ${Footer()}

// </body>

// </html>

// `;

// }

// module.exports = AddDoctor;