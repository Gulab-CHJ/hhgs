const DashboardHeader = require("../views/component/dashboard/dashboardHeader");
const DashboardSidebar = require("../views/component/dashboard/dashboardSidebar");

function ManageBanner(banners = []) {

let rows = "";

banners.forEach((banner, index) => {

rows += `
<tr>

<td>${index + 1}</td>

<td>
<img src="${banner.image}" class="banner-img">
</td>

<td>${banner.title}</td>

<td>
<a href="${banner.link}" target="_blank">
${banner.link}
</a>
</td>

<td>

${banner.active
? '<span class="status active">Active</span>'
: '<span class="status inactive">Inactive</span>'}

</td>

<td class="action">

<a href="/admin/edit-banner/${banner._id}" class="btn edit">
<i class="fa-solid fa-pen"></i>
</a>

<a href="/admin/delete-banner/${banner._id}"
class="btn delete"
onclick="return confirm('Delete Banner?')">
<i class="fa-solid fa-trash"></i>
</a>

${banner.active

?`

<a href="/admin/deactivate-banner/${banner._id}"
class="btn warning">

<i class="fa-solid fa-ban"></i>

</a>

`

:`

<a href="/admin/activate-banner/${banner._id}"
class="btn success">

<i class="fa-solid fa-check"></i>

</a>

`}

</td>

</tr>

`;

});

return `

<!DOCTYPE html>

<html lang="en">

<head>
<link rel="stylesheet" href="/css/headercomponent.css"> 

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Manage Banner</title>

<link rel="stylesheet"
href="/css/admin-dashboard.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

</head>

<body>

${DashboardHeader()}

<div class="admin-layout">

${DashboardSidebar()}

<main class="admin-content">

<!-- STATUS -->

<div class="stats-grid">

<div class="stat-card">
<i class="fa-solid fa-user-doctor"></i>
<h3>Doctors</h3>
<span>12</span>
</div>

<div class="stat-card">
<i class="fa-solid fa-user-graduate"></i>
<h3>Students</h3>
<span>45</span>
</div>

<div class="stat-card">
<i class="fa-solid fa-stethoscope"></i>
<h3>Services</h3>
<span>08</span>
</div>

<div class="stat-card">
<i class="fa-solid fa-image"></i>
<h3>Banners</h3>
<span>${banners.length}</span>
</div>

</div>

<!-- PAGE HEADER -->

<div class="page-header">

<div>

<h1>

<i class="fa-solid fa-image"></i>

Manage Banners

</h1>

<p>

Manage Website Home Page Banners

</p>

</div>

<div class="page-btns">

<a href="/admin/add-banner"
class="primary-btn">

<i class="fa-solid fa-plus"></i>

Add Banner

</a>

<button class="secondary-btn">

<i class="fa-solid fa-magnifying-glass"></i>

Search

</button>

<button class="secondary-btn">

<i class="fa-solid fa-rotate"></i>

Refresh

</button>

</div>

</div>

<!-- TOTAL -->

<div class="total-box">

Total Banners :
<b>${banners.length}</b>

</div>

<!-- TABLE -->

<div class="table-box">

<table>

<thead>

<tr>

<th>#</th>

<th>Banner</th>

<th>Title</th>

<th>Link</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</div>

</main>

</div>

<script src="/js/admin-dashboard.js"></script>

</body>

</html>

`;

}

module.exports = ManageBanner;