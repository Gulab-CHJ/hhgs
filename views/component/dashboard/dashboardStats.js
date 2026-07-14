// function DashboardStats(data){

// return `

// <section class="stats-grid">

// <div class="stat-card">
//     <div class="icon blue">
//         <i class="fa-solid fa-user-doctor"></i>
//     </div>

//     <div class="info">
//         <h3>Total Doctors</h3>
//         <h2>${data.doctorCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon green">
//         <i class="fa-solid fa-user-graduate"></i>
//     </div>

//     <div class="info">
//         <h3>Total Students</h3>
//         <h2>${data.studentCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon purple">
//         <i class="fa-solid fa-briefcase-medical"></i>
//     </div>

//     <div class="info">
//         <h3>Total Services</h3>
//         <h2>${data.serviceCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon orange">
//         <i class="fa-solid fa-image"></i>
//     </div>

//     <div class="info">
//         <h3>Total Banners</h3>
//         <h2>${data.bannerCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon red">
//         <i class="fa-solid fa-cart-shopping"></i>
//     </div>

//     <div class="info">
//         <h3>Total Orders</h3>
//         <h2>${data.orderCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon cyan">
//         <i class="fa-solid fa-users"></i>
//     </div>

//     <div class="info">
//         <h3>Total Users</h3>
//         <h2>${data.userCount}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon yellow">
//         <i class="fa-solid fa-indian-rupee-sign"></i>
//     </div>

//     <div class="info">
//         <h3>Total Revenue</h3>
//         <h2>₹${data.revenue}</h2>
//     </div>
// </div>

// <div class="stat-card">
//     <div class="icon pink">
//         <i class="fa-solid fa-calendar-days"></i>
//     </div>

//     <div class="info">
//         <h3>Today's Registration</h3>
//         <h2>${data.todayRegistration}</h2>
//     </div>
// </div>

// </section>

// `;

// }

// module.exports = DashboardStats;

function DashboardStats(data = {}) {

return `
<link rel="stylesheet" href="/css/style.css"> 
<div class="stats-grid">

<div class="stat-card">
<h3>Total Doctors</h3>
<h2>${data.doctorCount || 0}</h2>
</div>

<div class="stat-card">
<h3>Total Students</h3>
<h2>${data.studentCount || 0}</h2>
</div>

<div class="stat-card">
<h3>Total Services</h3>
<h2>${data.serviceCount || 0}</h2>
</div>

<div class="stat-card">
<h3>Total Banners</h3>
<h2>${data.bannerCount || 0}</h2>
</div>

</div>

`;

}

module.exports = DashboardStats;