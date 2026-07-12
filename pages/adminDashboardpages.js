// function AdminDashboard() {

// return `

// <!DOCTYPE html>
// <html>

// <head>
// <meta charset="UTF-8">
// <title>Dashboard</title>

// <link rel="stylesheet" href="/css/admin.css">

// <style>
// body{
//     font-family:Arial,sans-serif;
//     background:#f5f5f5;
// }

// .dashboard{
//     width:500px;
//     margin:40px auto;
//     background:#fff;
//     padding:20px;
//     border-radius:10px;
//     box-shadow:0 0 10px rgba(0,0,0,.1);
// }

// h1{
//     text-align:center;
// }

// #search{
//     width:100%;
//     padding:10px;
//     margin:20px 0;
//     font-size:16px;
//     border:1px solid #ccc;
//     border-radius:6px;
//     box-sizing:border-box;
// }

// .menu a{
//     display:block;
//     padding:10px 0;
//     color:#000;
//     text-decoration:none;
//     border-bottom:1px solid #ddd;
//     font-size:18px;
// }

// .menu a:hover{
//     color:blue;
// }
// </style>

// </head>

// <body>

// <div class="dashboard">

// <h1>Welcome Admin 👋</h1>

// <input
// type="text"
// id="search"
// placeholder="Search..."
// onkeyup="searchMenu()"
// >

// <div class="menu" id="menu">

// <a href="/admin/add-service">Add Service</a>

// <a href="/admin/edit-service">Edit Service</a>



// <a href="/admin/delete-service">Delete Service</a>

// <hr>

// <a href="/admin/add-doctor">👨‍⚕️ Add Doctor</a>

// <a href="/admin/doctors">👨‍⚕️ Manage Doctors</a>

// <a href="/admin/edit-doctor">✏️ Edit Doctor</a>

// <a href="/admin/delete-doctor">🗑 Delete Doctor</a>

// <hr>



// <a href="/admin/categories">Categories</a>

// <a href="/admin/users">Users</a>

// <a href="/admin/change-password">Change Password</a>

// <a href="/">Home</a>
// <a href="/admin/students">👨‍🎓 Students</a>
// <a href="/admin/add-banner">🖼️ Add Banner</a>
// <a href="/admin/banners">🖼️ Manage Banner</a>

// </div>

// </div>

// <script>
// function searchMenu(){

// let input=document.getElementById("search").value.toLowerCase();

// let links=document.querySelectorAll("#menu a");

// links.forEach(link=>{

// if(link.textContent.toLowerCase().includes(input)){
// link.style.display="block";
// }else{
// link.style.display="none";
// }

// });

// }
// </script>

// </body>

// </html>

// `;

// }

// //  module.exports = AdminDashboard;
// const DashboardSection = require("../views/component/dashboard/dashboardSection");
// const AdminDashboard = require("../pages/adminDashboardpages");
// const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
// const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
// const DashboardSearch = require("../views/component/dashboard/dashboardSearch");
// const DashboardStats = require("../views/component/dashboard/dashboardStats");
// function AdminDashboard(data) {

// return `

// <!DOCTYPE html>

// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>HHGS Admin Dashboard</title>

// <link rel="stylesheet" href="/css/admin-dashboard.css">
// <link rel="stylesheet" href="/css/dashboard-card.css">
// <link rel="stylesheet" href="/css/dashboard-responsive.css">

// <link rel="stylesheet"
// href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

// </head>

// <body>

// ${DashboardHeader()}

// <div class="admin-layout">

//     ${DashboardSidebar()}

//     <main class="admin-content">

//         ${DashboardSearch()}

//         ${DashboardStats(data)}

//          ${DashboardSection()} 

//         <!-- Step 2 -->
//         <!-- Doctor, Student, Service, Banner Cards yaha aayenge -->

//     </main>

// </div>

// <script src="/js/admin-dashboard.js"></script>

// </body>

// </html>

// `;

// }

// module.exports = AdminDashboard;

const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
const DashboardSearch = require("../views/component/dashboard/dashboardSearch");
const DashboardStats = require("../views/component/dashboard/dashboardStats");
const DashboardSection = require("../views/component/dashboard/dashboardSection");

function AdminDashboard(data = {}) {

return `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>HHGS Admin Dashboard</title>

<link rel="stylesheet" href="/css/admin-dashboard.css">
<link rel="stylesheet" href="/css/dashboard-card.css">
<link rel="stylesheet" href="/css/dashboard-responsive.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

</head>

<body>

${DashboardHeader()}

<div class="admin-layout">

    ${DashboardSidebar()}

    <main class="admin-content">

        ${DashboardSearch()}

        ${DashboardStats(data)}

        ${DashboardSection()}

    </main>

</div>

<script src="/js/admin-dashboard.js"></script>

</body>

</html>

`;

}

module.exports = AdminDashboard;