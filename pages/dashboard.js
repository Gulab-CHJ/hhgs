// // const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
// // const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
// // const DashboardSearch = require("../views/component/dashboard/dashboardSearch");
// // const DashboardStats = require("../views/component/dashboard/dashboardStats");
// // const DashboardSection = require("../views/component/dashboard/dashboardSection");

// // function AdminDashboard(data = {}) {

// // return `
// // <!DOCTYPE html>
// // <html lang="en">

// // <head>

// // <meta charset="UTF-8">
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <title>HHGS Admin Dashboard</title>

// // <link rel="stylesheet" href="/css/admin-dashboard.css">
// // <link rel="stylesheet" href="/css/dashboard-card.css">
// // <link rel="stylesheet" href="/css/dashboard-responsive.css">

// // <link rel="stylesheet"
// // href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

// // </head>

// // <body>

// // ${DashboardHeader()}

// // <div class="admin-layout">

// //     ${DashboardSidebar()}

// //     <main class="admin-content">

// //         ${DashboardSearch()}

// //         ${DashboardStats(data)}

// //         ${DashboardSection()}

// //     </main>

// // </div>

// // <script src="/js/admin-dashboard.js"></script>

// // </body>

// // </html>
// // `;

// // }

// // module.exports = AdminDashboard;

// const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
// const DashboardSection = require("../views/component/dashboard/dashboardSection");

// function AdminDashboard() {

// return `
// <!DOCTYPE html>
// <html lang="en">

// <head>

// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>HHGS Admin</title>



// <link rel="stylesheet"
// href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

// </head>

// <body>

// <div class="admin-layout">

//     ${DashboardSidebar()}

//     <main class="admin-content">

//         ${DashboardSection()}

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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Segoe UI,sans-serif;
}

body{
background:#f4f7fb;
}

.admin{
display:flex;
height:100vh;
}

/* ================= Sidebar ================= */

.sidebar{

width:270px;
background:#111827;
color:#fff;

display:flex;
flex-direction:column;

}

.logo{

padding:25px;
font-size:26px;
font-weight:bold;
background:#1f2937;

}

.menu{

padding:15px;

}

.menu a{

display:flex;
align-items:center;
gap:15px;

padding:14px 18px;

margin-bottom:10px;

border-radius:12px;

color:white;
text-decoration:none;

transition:.3s;

}

.menu a:hover{

background:#2563eb;
transform:translateX(5px);

}

/* ================= Main ================= */

.main{

flex:1;

display:flex;
flex-direction:column;

}

/* ================= Header ================= */

.header{

height:80px;

background:white;

display:flex;

justify-content:space-between;
align-items:center;

padding:0 30px;

box-shadow:0 5px 15px rgba(0,0,0,.08);

}

.search{

width:400px;

padding:12px 20px;

border:1px solid #ddd;

border-radius:30px;

outline:none;

font-size:15px;

}

.right{

display:flex;
align-items:center;
gap:20px;

font-size:22px;

}

.profile{

display:flex;
align-items:center;
gap:10px;

font-size:16px;

font-weight:bold;

}

/* ================= Dashboard ================= */

.content{

padding:30px;

}

/* Cards */

.cards{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

}

.card{

background:white;

padding:25px;

border-radius:18px;

box-shadow:0 10px 20px rgba(0,0,0,.06);

cursor:pointer;

transition:.35s;

}

.card:hover{

transform:translateY(-8px);

box-shadow:0 20px 35px rgba(37,99,235,.2);

}

.card i{

font-size:35px;

color:#2563eb;

margin-bottom:15px;

}

.card h2{

font-size:40px;

margin-top:10px;

}

.card p{

color:#777;

}

/* Bottom */

.bottom{

margin-top:30px;

display:grid;

grid-template-columns:2fr 1fr;

gap:20px;

}

.analytics{

background:white;

padding:20px;

border-radius:18px;

box-shadow:0 10px 20px rgba(0,0,0,.06);

}

.graph{

margin-top:20px;

height:280px;

border-radius:15px;

background:linear-gradient(135deg,#2563eb,#4f46e5);

display:flex;

justify-content:center;
align-items:center;

color:white;

font-size:30px;

font-weight:bold;

}

.quick{

background:white;

padding:20px;

border-radius:18px;

box-shadow:0 10px 20px rgba(0,0,0,.06);

}

.quick button{

width:100%;

padding:14px;

margin-bottom:15px;

border:none;

border-radius:12px;

background:#2563eb;

color:white;

font-size:16px;

cursor:pointer;

transition:.3s;

}

.quick button:hover{

background:#1d4ed8;

}

/* Orders */

.orders{

margin-top:25px;

background:white;

padding:20px;

border-radius:18px;

box-shadow:0 10px 20px rgba(0,0,0,.06);

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

th{

background:#2563eb;

color:white;

padding:14px;

}

td{

padding:14px;

text-align:center;

border-bottom:1px solid #eee;

}

.status{

background:#10b981;

color:white;

padding:5px 12px;

border-radius:30px;

}

.view{

background:#2563eb;

padding:8px 15px;

border-radius:8px;

color:white;

text-decoration:none;

}

/* Responsive */

@media(max-width:900px){

.cards{

grid-template-columns:1fr;

}

.bottom{

grid-template-columns:1fr;

}

.search{

width:200px;

}

.sidebar{

width:80px;

}

.menu a span{

display:none;

}

.logo{

font-size:18px;

text-align:center;

}

}

</style>

</head>

<body>

<div class="admin">

<div class="sidebar">

<div class="logo">
HHGS Admin
</div>

<div class="menu">

<a href="#"><i class="fa fa-chart-line"></i><span>Dashboard</span></a>

<a href="#"><i class="fa fa-globe"></i><span>Website</span></a>

<a href="#"><i class="fa fa-user-doctor"></i><span>Doctors</span></a>

<a href="#"><i class="fa fa-user-graduate"></i><span>Students</span></a>

<a href="#"><i class="fa fa-screwdriver-wrench"></i><span>Services</span></a>

<a href="#"><i class="fa fa-image"></i><span>Banners</span></a>

<a href="#"><i class="fa fa-box"></i><span>Products</span></a>

<a href="#"><i class="fa fa-building-columns"></i><span>Government</span></a>

<a href="#"><i class="fa fa-cart-shopping"></i><span>Orders</span></a>

<a href="#"><i class="fa fa-user"></i><span>Profile</span></a>

<a href="#"><i class="fa fa-right-from-bracket"></i><span>Logout</span></a>

</div>

</div>

<div class="main">

<div class="header">

<input class="search" placeholder="Search...">

<div class="right">

<i class="fa fa-bell"></i>

<div class="profile">

<i class="fa fa-user-circle"></i>

Admin

</div>

</div>

</div>

<div class="content">

<div class="cards">

<div class="card">

<i class="fa fa-user-graduate"></i>

<p>Students</p>

<h2>45</h2>

</div>

<div class="card">

<i class="fa fa-user-doctor"></i>

<p>Doctors</p>

<h2>12</h2>

</div>

<div class="card">

<i class="fa fa-screwdriver-wrench"></i>

<p>Services</p>

<h2>8</h2>

</div>

</div>

<div class="bottom">

<div class="analytics">

<h2>📈 Enrollment & Order Analytics</h2>

<div class="graph">

Chart Area

</div>

</div>

<div class="quick">

<h2>⚡ Quick Actions</h2>

<button>+ Add Govt Entry</button>

<button>+ Upload Banner</button>

<button>+ Add Doctor</button>

<button>+ Add Product</button>

</div>

</div>

<div class="orders">

<h2>📦 Recent Orders</h2>

<table>

<tr>

<th>ID</th>

<th>Client</th>

<th>Status</th>

<th>Action</th>

</tr>

<tr>

<td>#1001</td>

<td>Rahul</td>

<td><span class="status">Completed</span></td>

<td><a href="#" class="view">View</a></td>

</tr>

<tr>

<td>#1002</td>

<td>Amit</td>

<td><span class="status">Completed</span></td>

<td><a href="#" class="view">View</a></td>

</tr>

<tr>

<td>#1003</td>

<td>Rohan</td>

<td><span class="status">Completed</span></td>

<td><a href="#" class="view">View</a></td>

</tr>

</table>

</div>

</div>

</div>

</div>

</body>
</html>
`;

// }

// module.exports = AdminDashboard;

const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
const DashboardSection = require("../views/component/dashboard/dashboardSection");

function AdminDashboard() {

return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>HHGS Admin</title>



<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

</head>

<body>

<div class="admin-layout">

    ${DashboardSidebar()}

    <main class="admin-content">

        ${DashboardSection()}

    </main>

</div>

<script src="/js/admin-dashboard.js"></script>

</body>

</html>
`;

}

module.exports = AdminDashboard;