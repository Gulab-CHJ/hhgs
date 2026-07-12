// function AddStudent() {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>Add Student</title>

// <style>

// *{
//     margin:0;
//     padding:0;
//     box-sizing:border-box;
//     font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
// }

// body{
//     min-height:100vh;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     padding:40px;
//     background:linear-gradient(135deg,#1e3c72,#2a5298,#4facfe);
// }

// .container{
//     width:100%;
//     max-width:700px;
//     background:rgba(255,255,255,.95);
//     backdrop-filter:blur(15px);
//     border-radius:20px;
//     padding:35px;
//     box-shadow:
//         0 20px 50px rgba(0,0,0,.25),
//         inset 0 1px 1px rgba(255,255,255,.5);
// }

// h2{
//     text-align:center;
//     margin-bottom:30px;
//     font-size:30px;
//     color:#1d3557;
//     font-weight:700;
// }

// label{
//     display:block;
//     margin-bottom:8px;
//     color:#333;
//     font-size:15px;
//     font-weight:600;
// }

// input,
// textarea{
//     width:100%;
//     padding:14px 16px;
//     margin-bottom:20px;
//     border:2px solid #e6e6e6;
//     border-radius:12px;
//     font-size:15px;
//     outline:none;
//     transition:.3s;
//     background:#fafafa;
// }

// textarea{
//     min-height:110px;
//     resize:vertical;
// }

// input:focus,
// textarea:focus{
//     border-color:#4facfe;
//     background:#fff;
//     box-shadow:0 0 15px rgba(79,172,254,.25);
// }

// input[type=file]{
//     padding:12px;
//     background:#fff;
//     cursor:pointer;
// }

// button{
//     width:100%;
//     padding:16px;
//     border:none;
//     border-radius:14px;
//     background:linear-gradient(135deg,#4facfe,#0066ff);
//     color:#fff;
//     font-size:17px;
//     font-weight:700;
//     cursor:pointer;
// }

// button:hover{
//     opacity:.9;
// }

// @media(max-width:768px){

// body{
//     padding:20px;
// }

// .container{
//     padding:25px;
// }

// }

// </style>

// </head>

// <body>

// <div class="container">

// <h2>Add Student</h2>

// <form
// action="/admin/add-student"
// method="POST"
// enctype="multipart/form-data"
// >

// <label>Student Name</label>
// <input
// type="text"
// name="name"
// placeholder="Enter Student Name"
// required
// >

// <label>Father Name</label>
// <input
// type="text"
// name="fatherName"
// placeholder="Enter Father Name"
// required
// >

// <label>Course</label>
// <input
// type="text"
// name="course"
// placeholder="Enter Course"
// required
// >

// <label>Email</label>
// <input
// type="email"
// name="email"
// placeholder="Enter Email"
// >

// <label>Mobile</label>
// <input
// type="text"
// name="mobile"
// placeholder="Enter Mobile Number"
// >

// <label>Address</label>
// <textarea
// name="address"
// placeholder="Enter Address"
// ></textarea>

// <label>Description</label>
// <textarea
// name="description"
// placeholder="Write about student..."
// ></textarea>

// <label>Student Photo</label>
// <input
// type="file"
// name="image"
// accept="image/*"
// required
// >

// <button type="submit">
// Add Student
// </button>

// </form>

// </div>

// </body>
// </html>
// `;
// }

// module.exports = AddStudent;