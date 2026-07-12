// // function EditStudent(student) {
// //     return `
// // <!DOCTYPE html>
// // <html>
// // <head>
// // <title>Edit Student</title>
// // </head>
// // <body>

// // <form action="/admin/edit-student/${student._id}"
// //       method="POST"
// //       enctype="multipart/form-data">

// // <label>Student Name</label>
// // <input type="text" name="name" value="${student.name || ""}" required>

// // <label>Father Name</label>
// // <input type="text" name="fatherName" value="${student.fatherName || ""}">

// // <label>Course</label>
// // <input type="text" name="course" value="${student.course || ""}">

// // <label>Email</label>
// // <input type="email" name="email" value="${student.email || ""}">

// // <label>Mobile</label>
// // <input type="text" name="mobile" value="${student.mobile || ""}">

// // <label>Address</label>
// // <textarea name="address">${student.address || ""}</textarea>

// // <label>Description</label>
// // <textarea name="description">${student.description || ""}</textarea>

// // <label>Current Photo</label>
// // <img src="${student.image}" width="150">

// // <label>Change Photo</label>
// // <input type="file" name="image">

// // <button type="submit">Update Student</button>

// // </form>

// // </body>
// // </html>
// // `;
// // }

// // module.exports = EditStudent;

// function EditStudent(student) {
//     return `
// <!DOCTYPE html>
// <html lang="en">

// <head>

// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>Edit Student</title>

// <style>

// *{
//     margin:0;
//     padding:0;
//     box-sizing:border-box;
//     font-family:"Segoe UI",sans-serif;
// }

// body{
//     min-height:100vh;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     padding:30px;
//     background:linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb);
// }

// .container{
//     width:100%;
//     max-width:750px;
//     background:rgba(255,255,255,.12);
//     backdrop-filter:blur(18px);
//     border-radius:25px;
//     padding:35px;
//     border:1px solid rgba(255,255,255,.2);
//     box-shadow:0 20px 50px rgba(0,0,0,.35);
// }

// h2{
//     color:#fff;
//     text-align:center;
//     margin-bottom:30px;
//     font-size:32px;
// }

// label{
//     display:block;
//     color:#fff;
//     margin-bottom:8px;
//     font-weight:600;
// }

// input,
// textarea{
//     width:100%;
//     padding:14px;
//     margin-bottom:20px;
//     border:none;
//     outline:none;
//     border-radius:12px;
//     background:rgba(255,255,255,.15);
//     color:#fff;
//     font-size:15px;
//     transition:.3s;
// }

// input::placeholder,
// textarea::placeholder{
//     color:#ddd;
// }

// input:focus,
// textarea:focus{
//     background:rgba(255,255,255,.25);
//     box-shadow:0 0 12px rgba(37,99,235,.6);
// }

// textarea{
//     min-height:120px;
//     resize:vertical;
// }

// img{
//     width:170px;
//     height:170px;
//     object-fit:cover;
//     display:block;
//     margin:15px auto 25px;
//     border-radius:50%;
//     border:5px solid #fff;
//     box-shadow:0 10px 30px rgba(0,0,0,.35);
// }

// input[type=file]{
//     padding:10px;
//     cursor:pointer;
// }

// button{
//     width:100%;
//     padding:16px;
//     border:none;
//     border-radius:50px;
//     background:linear-gradient(135deg,#2563eb,#7c3aed);
//     color:#fff;
//     font-size:17px;
//     font-weight:bold;
//     cursor:pointer;
//     transition:.3s;
// }

// button:hover{
//     transform:translateY(-3px);
//     box-shadow:0 12px 25px rgba(37,99,235,.45);
// }

// @media(max-width:768px){

// .container{
//     padding:20px;
// }

// h2{
//     font-size:26px;
// }

// img{
//     width:130px;
//     height:130px;
// }

// }

// </style>

// </head>

// <body>

// <div class="container">

// <h2>Edit Student</h2>

// <form action="/admin/edit-student/${student._id}"
//       method="POST"
//       enctype="multipart/form-data">

// <label>Student Name</label>
// <input type="text" name="name" value="${student.name || ""}" required>

// <label>Father Name</label>
// <input type="text" name="fatherName" value="${student.fatherName || ""}">

// <label>Course</label>
// <input type="text" name="course" value="${student.course || ""}">

// <label>Email</label>
// <input type="email" name="email" value="${student.email || ""}">

// <label>Mobile</label>
// <input type="text" name="mobile" value="${student.mobile || ""}">

// <label>Address</label>
// <textarea name="address">${student.address || ""}</textarea>

// <label>Description</label>
// <textarea name="description">${student.description || ""}</textarea>

// <label>Current Photo</label>

// <img src="${student.image}" alt="Student Photo">

// <label>Change Photo</label>
// <input type="file" name="image" accept="image/*">

// <button type="submit">Update Student</button>

// </form>

// </div>

// </body>
// </html>
// `;
// }

// module.exports = EditStudent;