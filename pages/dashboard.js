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

const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
const DashboardSection = require("../views/component/dashboard/dashboardSection");

function AdminDashboard() {

return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>
HHGS Admin Dashboard
</title>

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Segoe UI,sans-serif;
}

body{

background:
linear-gradient(135deg,#edf4ff,#ffffff,#eef7ff);

min-height:100vh;

overflow-x:hidden;

}

/* Layout */

.admin-layout{

display:flex;

min-height:100vh;

}

/* Sidebar */

.sidebar{

width:260px;

background:
linear-gradient(180deg,#1e3a8a,#2563eb);

color:#fff;

position:fixed;

left:0;

top:0;

bottom:0;

padding:30px 20px;

overflow:auto;

box-shadow:
5px 0 30px rgba(0,0,0,.15);

}

.sidebar h2{

text-align:center;

margin-bottom:35px;

font-size:28px;

}

.sidebar a{

display:flex;

align-items:center;

gap:12px;

padding:15px;

margin-bottom:10px;

text-decoration:none;

color:white;

border-radius:14px;

transition:.3s;

}

.sidebar a:hover{

background:
rgba(255,255,255,.18);

transform:translateX(8px);

}

/* Main */

.admin-content{

margin-left:260px;

width:100%;

padding:35px;

}

/* Header */

.topbar{

background:white;

border-radius:20px;

padding:25px;

display:flex;

justify-content:space-between;

align-items:center;

box-shadow:
0 15px 35px rgba(0,0,0,.08);

margin-bottom:30px;

}

.topbar h1{

font-size:30px;

color:#222;

}

.admin{

display:flex;

align-items:center;

gap:15px;

}

.admin img{

width:55px;

height:55px;

border-radius:50%;

}

/* Cards */

.dashboard-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(230px,1fr));

gap:25px;

}

/* Card */

.dashboard-card{

background:white;

border-radius:22px;

padding:30px;

text-decoration:none;

color:#222;

box-shadow:
0 10px 25px rgba(0,0,0,.08);

transition:.35s;

position:relative;

overflow:hidden;

}

.dashboard-card::before{

content:"";

position:absolute;

top:0;

left:-100%;

width:100%;

height:100%;

background:
linear-gradient(90deg,
transparent,
rgba(255,255,255,.4),
transparent);

transition:.6s;

}

.dashboard-card:hover::before{

left:100%;

}

.dashboard-card:hover{

transform:
translateY(-8px);

box-shadow:
0 25px 45px rgba(37,99,235,.25);

}

.dashboard-card i{

font-size:48px;

margin-bottom:20px;

color:#2563eb;

}

.dashboard-card h3{

font-size:20px;

margin-bottom:8px;

}

.dashboard-card p{

color:#666;

font-size:14px;

}

/* Mobile */

@media(max-width:900px){

.sidebar{

position:relative;

width:100%;

height:auto;

}

.admin-layout{

flex-direction:column;

}

.admin-content{

margin-left:0;

padding:20px;

}

.topbar{

flex-direction:column;

gap:20px;

text-align:center;

}

}

</style>

</head>

<body>

<div class="admin-layout">

${DashboardSidebar()}

<div class="admin-content">

<div class="topbar">

<div>

<h1>
HHGS Admin Dashboard
</h1>

<p>
Welcome Back Admin 👋
</p>

</div>

<div class="admin">

<img src="/images/admin.png">

<div>

<b>Administrator</b>

<br>

<span>
Manage Everything
</span>

</div>

</div>

</div>

${DashboardSection()}

</div>

</div>

</body>

</html>

`;

}

module.exports = AdminDashboard;