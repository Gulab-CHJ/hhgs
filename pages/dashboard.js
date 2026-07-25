// const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
// const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
// const DashboardSearch = require("../views/component/dashboard/dashboardSearch");
// const DashboardStats = require("../views/component/dashboard/dashboardStats");
// const DashboardSection = require("../views/component/dashboard/dashboardSection");

// function AdminDashboard(data = {}) {

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



// const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
// const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");
// const DashboardSearch = require("../views/component/dashboard/dashboardSearch");
// const DashboardStats = require("../views/component/dashboard/dashboardStats");
// const DashboardSection = require("../views/component/dashboard/dashboardSection");

// function AdminDashboard(data = {}) {
//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>HHGS Admin Dashboard</title>
  
//   <!-- FontAwesome -->
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
//   <!-- Google Fonts -->
//   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

//   <style>
//     :root {
//       --primary: #3b82f6;
//       --primary-hover: #2563eb;
//       --bg-main: #f0f4f9;
//       --sidebar-bg: #0f172a;
//       --sidebar-hover: #1e293b;
//       --text-dark: #1e293b;
//       --text-muted: #64748b;
//       --card-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
//     }

//     * {
//       margin: 0;
//       padding: 0;
//       box-sizing: border-box;
//       font-family: 'Plus Jakarta Sans', sans-serif;
//     }

//     body {
//       background: var(--bg-main);
//       color: var(--text-dark);
//       overflow-x: hidden;
//     }

//     .admin {
//       display: flex;
//       min-height: 100vh;
//       position: relative;
//     }

//     /* ================= Sidebar ================= */
//     .sidebar {
//       width: 270px;
//       background: var(--sidebar-bg);
//       color: #fff;
//       display: flex;
//       flex-direction: column;
//       transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//       z-index: 1000;
//     }

//     .logo {
//       padding: 22px 25px;
//       font-size: 22px;
//       font-weight: 700;
//       background: #1e293b;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       letter-spacing: 0.5px;
//       color: #38bdf8;
//     }

//     .menu {
//       padding: 15px 12px;
//       flex: 1;
//       overflow-y: auto;
//     }

//     .menu a {
//       display: flex;
//       align-items: center;
//       gap: 14px;
//       padding: 12px 18px;
//       margin-bottom: 6px;
//       border-radius: 10px;
//       color: #94a3b8;
//       text-decoration: none;
//       font-size: 15px;
//       font-weight: 500;
//       transition: all 0.25s ease;
//     }

//     .menu a:hover, .menu a.active {
//       background: var(--primary);
//       color: #ffffff;
//       box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
//       transform: translateX(4px);
//     }

//     .menu a i {
//       font-size: 18px;
//       width: 20px;
//     }

//     /* ================= Main ================= */
//     .main {
//       flex: 1;
//       display: flex;
//       flex-direction: column;
//       min-width: 0;
//     }

//     /* Header */
//     .header {
//       height: 75px;
//       background: rgba(255, 255, 255, 0.85);
//       backdrop-filter: blur(10px);
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 0 30px;
//       box-shadow: 0 2px 10px rgba(0,0,0,0.03);
//       position: sticky;
//       top: 0;
//       z-index: 900;
//     }

//     .header-left {
//       display: flex;
//       align-items: center;
//       gap: 15px;
//     }

//     .menu-toggle {
//       display: none;
//       font-size: 20px;
//       cursor: pointer;
//       background: #e2e8f0;
//       padding: 8px 12px;
//       border-radius: 8px;
//     }

//     .search-box {
//       position: relative;
//     }

//     .search-box i {
//       position: absolute;
//       left: 15px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: var(--text-muted);
//     }

//     .search {
//       width: 350px;
//       padding: 10px 15px 10px 42px;
//       border: 1px solid #e2e8f0;
//       background: #f8fafc;
//       border-radius: 30px;
//       outline: none;
//       font-size: 14px;
//       transition: all 0.3s ease;
//     }

//     .search:focus {
//       background: #fff;
//       border-color: var(--primary);
//       box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
//     }

//     .right {
//       display: flex;
//       align-items: center;
//       gap: 20px;
//     }

//     .icon-btn {
//       position: relative;
//       background: #f1f5f9;
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       cursor: pointer;
//       color: var(--text-dark);
//       transition: 0.2s;
//     }

//     .icon-btn:hover {
//       background: #e2e8f0;
//     }

//     .badge {
//       position: absolute;
//       top: 2px;
//       right: 2px;
//       width: 8px;
//       height: 8px;
//       background: #ef4444;
//       border-radius: 50%;
//     }

//     .profile {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       font-size: 15px;
//       font-weight: 600;
//       cursor: pointer;
//     }

//     .profile i {
//       font-size: 32px;
//       color: var(--primary);
//     }

//     /* Content Area */
//     .content {
//       padding: 30px;
//       flex: 1;
//     }

//     /* Cards Grid */
//     .cards {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//       gap: 20px;
//       margin-bottom: 25px;
//     }

//     .card {
//       background: white;
//       padding: 22px;
//       border-radius: 16px;
//       box-shadow: var(--card-shadow);
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       transition: all 0.3s ease;
//       border: 1px solid rgba(226, 232, 240, 0.8);
//     }

//     .card:hover {
//       transform: translateY(-50px);
//       transform: translateY(-5px);
//       box-shadow: 0 15px 30px rgba(0,0,0,0.08);
//     }

//     .card-info p {
//       color: var(--text-muted);
//       font-size: 14px;
//       font-weight: 500;
//       margin-bottom: 5px;
//     }

//     .card-info h2 {
//       font-size: 32px;
//       font-weight: 700;
//       color: var(--text-dark);
//     }

//     .card-icon {
//       width: 55px;
//       height: 55px;
//       border-radius: 14px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 24px;
//     }

//     .card-1 .card-icon { background: #dbeafe; color: #2563eb; }
//     .card-2 .card-icon { background: #fce7f3; color: #ec4899; }
//     .card-3 .card-icon { background: #dcfce7; color: #16a34a; }
//     .card-4 .card-icon { background: #fef3c7; color: #d97706; }

//     /* Bottom Grid */
//     .bottom {
//       display: grid;
//       grid-template-columns: 2fr 1fr;
//       gap: 20px;
//       margin-bottom: 25px;
//     }

//     .analytics, .quick {
//       background: white;
//       padding: 24px;
//       border-radius: 16px;
//       box-shadow: var(--card-shadow);
//       border: 1px solid rgba(226, 232, 240, 0.8);
//     }

//     .analytics h2, .quick h2, .orders h2 {
//       font-size: 18px;
//       font-weight: 700;
//       color: var(--text-dark);
//       margin-bottom: 18px;
//     }

//     .graph {
//       height: 250px;
//       border-radius: 12px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       color: white;
//       gap: 10px;
//       box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
//     }

//     .graph i {
//       font-size: 48px;
//       opacity: 0.8;
//     }

//     .quick-actions-grid {
//       display: flex;
//       flex-direction: column;
//       gap: 12px;
//     }

//     .btn-action {
//       width: 100%;
//       padding: 12px 18px;
//       border: none;
//       border-radius: 10px;
//       background: #f8fafc;
//       color: var(--text-dark);
//       font-size: 14px;
//       font-weight: 600;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       border: 1px solid #e2e8f0;
//       transition: all 0.25s ease;
//     }

//     .btn-action:hover {
//       background: var(--primary);
//       color: white;
//       border-color: var(--primary);
//       transform: translateX(3px);
//     }

//     /* Orders Table */
//     .orders {
//       background: white;
//       padding: 24px;
//       border-radius: 16px;
//       box-shadow: var(--card-shadow);
//       border: 1px solid rgba(226, 232, 240, 0.8);
//     }

//     .table-responsive {
//       width: 100%;
//       overflow-x: auto;
//     }

//     table {
//       width: 100%;
//       border-collapse: collapse;
//       text-align: left;
//     }

//     th {
//       background: #f8fafc;
//       color: var(--text-muted);
//       padding: 14px 16px;
//       font-size: 13px;
//       font-weight: 600;
//       text-transform: uppercase;
//       letter-spacing: 0.5px;
//       border-bottom: 2px solid #e2e8f0;
//     }

//     td {
//       padding: 16px;
//       border-bottom: 1px solid #f1f5f9;
//       font-size: 14px;
//       color: var(--text-dark);
//     }

//     tr:hover td {
//       background: #f8fafc;
//     }

//     .status {
//       padding: 6px 12px;
//       border-radius: 20px;
//       font-size: 12px;
//       font-weight: 600;
//       display: inline-block;
//     }

//     .status.completed {
//       background: #dcfce7;
//       color: #15803d;
//     }

//     .status.pending {
//       background: #fef3c7;
//       color: #b45309;
//     }

//     .view-btn {
//       background: #f1f5f9;
//       color: var(--text-dark);
//       padding: 6px 14px;
//       border-radius: 8px;
//       text-decoration: none;
//       font-size: 13px;
//       font-weight: 600;
//       transition: 0.2s;
//       border: none;
//       cursor: pointer;
//     }

//     .view-btn:hover {
//       background: var(--primary);
//       color: white;
//     }

//     /* Overlay for Mobile Sidebar */
//     .overlay {
//       display: none;
//       position: fixed;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       background: rgba(0,0,0,0.5);
//       z-index: 950;
//     }

//     /* ================= Mobile & Responsive Styles ================= */
//     @media (max-width: 992px) {
//       .bottom {
//         grid-template-columns: 1fr;
//       }
//     }

//     @media (max-width: 768px) {
//       .menu-toggle {
//         display: block;
//       }

//       .sidebar {
//         position: fixed;
//         left: -270px;
//         top: 0;
//         bottom: 0;
//         height: 100vh;
//       }

//       .sidebar.active {
//         left: 0;
//       }

//       .overlay.active {
//         display: block;
//       }

//       .search {
//         width: 180px;
//       }

//       .content {
//         padding: 15px;
//       }

//       .header {
//         padding: 0 15px;
//       }

//       .profile span {
//         display: none;
//       }
//     }
//   </style>
// </head>

// <body>

// <div class="overlay" id="overlay"></div>

// <div class="admin">

//   <!-- Sidebar -->
//   <aside class="sidebar" id="sidebar">
//     <div class="logo">
//       <span>HHGS Admin</span>
//       <i class="fa fa-times" id="closeSidebar" style="cursor:pointer; display:none;"></i>
//     </div>

//     <nav class="menu">
//       <a href="#" class="active"><i class="fa fa-chart-line"></i><span>Dashboard</span></a>
//       <a href="#"><i class="fa fa-globe"></i><span>Website</span></a>
//       <a href="#"><i class="fa fa-user-doctor"></i><span>Doctors</span></a>
//       <a href="#"><i class="fa fa-user-graduate"></i><span>Students</span></a>
//       <a href="#"><i class="fa fa-screwdriver-wrench"></i><span>Services</span></a>
//       <a href="#"><i class="fa fa-image"></i><span>Banners</span></a>
//       <a href="#"><i class="fa fa-box"></i><span>Products</span></a>
//       <a href="#"><i class="fa fa-building-columns"></i><span>Government</span></a>
//       <a href="#"><i class="fa fa-cart-shopping"></i><span>Orders</span></a>
//       <a href="#"><i class="fa fa-user"></i><span>Profile</span></a>
//       <a href="#"><i class="fa fa-right-from-bracket"></i><span>Logout</span></a>
//     </nav>
//   </aside>

//   <!-- Main Content -->
//   <div class="main">

//     <!-- Top Header -->
//     <header class="header">
//       <div class="header-left">
//         <div class="menu-toggle" id="menuToggle">
//           <i class="fa fa-bars"></i>
//         </div>
//         <div class="search-box">
//           <i class="fa fa-search"></i>
//           <input type="text" class="search" placeholder="Search anything...">
//         </div>
//       </div>

//       <div class="right">
//         <div class="icon-btn">
//           <i class="fa fa-bell"></i>
//           <span class="badge"></span>
//         </div>

//         <div class="profile">
//           <i class="fa-solid fa-circle-user"></i>
//           <span>Admin</span>
//         </div>
//       </div>
//     </header>

//     <!-- Main Content Area -->
//     <main class="content">

//       <!-- KPI Cards -->
//       <div class="cards">
//         <div class="card card-1">
//           <div class="card-info">
//             <p>Students</p>
//             <h2>45</h2>
//           </div>
//           <div class="card-icon">
//             <i class="fa fa-user-graduate"></i>
//           </div>
//         </div>

//         <div class="card card-2">
//           <div class="card-info">
//             <p>Doctors</p>
//             <h2>12</h2>
//           </div>
//           <div class="card-icon">
//             <i class="fa fa-user-doctor"></i>
//           </div>
//         </div>

//         <div class="card card-3">
//           <div class="card-info">
//             <p>Services</p>
//             <h2>8</h2>
//           </div>
//           <div class="card-icon">
//             <i class="fa fa-screwdriver-wrench"></i>
//           </div>
//         </div>

//         <div class="card card-4">
//           <div class="card-info">
//             <p>Banners</p>
//             <h2>6</h2>
//           </div>
//           <div class="card-icon">
//             <i class="fa fa-image"></i>
//           </div>
//         </div>
//       </div>

//       <!-- Analytics & Quick Actions Section -->
//       <div class="bottom">
//         <div class="analytics">
//           <h2>📈 Enrollment & Order Analytics</h2>
//           <div class="graph">
//             <i class="fa-solid fa-chart-column"></i>
//             <span>Interactive Chart Component</span>
//           </div>
//         </div>

//         <div class="quick">
//           <h2>⚡ Quick Actions</h2>
//           <div class="quick-actions-grid">
//             <button class="btn-action" onclick="handleAction('Add Government Entry')">
//               <i class="fa fa-plus-circle" style="color:#2563eb;"></i> Add Govt Entry
//             </button>
//             <button class="btn-action" onclick="handleAction('Upload Banner')">
//               <i class="fa fa-upload" style="color:#ec4899;"></i> Upload Banner
//             </button>
//             <button class="btn-action" onclick="handleAction('Add Doctor')">
//               <i class="fa fa-user-md" style="color:#16a34a;"></i> Add Doctor
//             </button>
//             <button class="btn-action" onclick="handleAction('Add Product')">
//               <i class="fa fa-box-open" style="color:#d97706;"></i> Add Product
//             </button>
//           </div>
//         </div>
//       </div>

//       <!-- Recent Orders Table -->
//       <div class="orders">
//         <h2>📦 Recent Orders</h2>
//         <div class="table-responsive">
//           <table>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Client Name</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>#1001</td>
//                 <td>Rahul Kumar</td>
//                 <td><span class="status completed">Completed</span></td>
//                 <td><button class="view-btn" onclick="handleAction('View Order #1001')">View</button></td>
//               </tr>
//               <tr>
//                 <td>#1002</td>
//                 <td>Amit Sharma</td>
//                 <td><span class="status pending">Pending</span></td>
//                 <td><button class="view-btn" onclick="handleAction('View Order #1002')">View</button></td>
//               </tr>
//               <tr>
//                 <td>#1003</td>
//                 <td>Rohan Singh</td>
//                 <td><span class="status completed">Completed</span></td>
//                 <td><button class="view-btn" onclick="handleAction('View Order #1003')">View</button></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </main>

//   </div>

// </div>

// <script>
//   // Mobile Sidebar Toggle JS
//   const menuToggle = document.getElementById('menuToggle');
//   const sidebar = document.getElementById('sidebar');
//   const overlay = document.getElementById('overlay');

//   function toggleSidebar() {
//     sidebar.classList.toggle('active');
//     overlay.classList.toggle('active');
//   }

//   if(menuToggle) {
//     menuToggle.addEventListener('click', toggleSidebar);
//   }
//   if(overlay) {
//     overlay.addEventListener('click', toggleSidebar);
//   }

//   // Active Menu Highlight
//   const menuLinks = document.querySelectorAll('.menu a');
//   menuLinks.forEach(link => {
//     link.addEventListener('click', function() {
//       menuLinks.forEach(l => l.classList.remove('active'));
//       this.classList.add('active');
//     });
//   });

//   // Action Click Handler (Functional Working Buttons)
//   function handleAction(actionName) {
//     alert(actionName + " clicked successfully!");
//   }
// </script>

// </body>
// </html>
// `;
// }

// module.exports = AdminDashboard;
