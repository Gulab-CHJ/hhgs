function DashboardSection(data = {}) {

return `
<link rel="stylesheet" href="/css/dashboardsections.css">

<section class="dashboard-content">

<div class="status-cards">

<div class="status-card doctors">
    <i class="fa-solid fa-user-doctor"></i>
    <div>
        <h3>Doctors</h3>
        <h2>${data.doctorCount || 12}</h2>
    </div>
</div>

<div class="status-card students">
    <i class="fa-solid fa-user-graduate"></i>
    <div>
        <h3>Students</h3>
        <h2>${data.studentCount || 45}</h2>
    </div>
</div>

<div class="status-card services">
    <i class="fa-solid fa-stethoscope"></i>
    <div>
        <h3>Services</h3>
        <h2>${data.serviceCount || 8}</h2>
    </div>
</div>

<div class="status-card banners">
    <i class="fa-solid fa-image"></i>
    <div>
        <h3>Banners</h3>
        <h2>${data.bannerCount || 6}</h2>
    </div>
</div>

</div>

<div class="page-header">

<h2>🖼️ Manage Banners</h2>

<div class="header-actions">
<button class="btn add">➕ Add Banner</button>
<button class="btn search">🔍 Search</button>
<button class="btn refresh">🔄 Refresh</button>
</div>

</div>

<p class="total-count">Total Banners : 6</p>

<div class="table-wrapper">

<table>

<thead>
<tr>
<th>Banner</th>
<th>Title</th>
<th>Link</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

<tr>
<td><img src="/uploads/banner1.jpg" class="banner-img"></td>
<td>Home</td>
<td>###</td>
<td><span class="active">Active</span></td>
<td>
<button>✏️</button>
<button>🗑️</button>
<button>🚫</button>
</td>
</tr>

</tbody>

</table>

</div>

</section>
`;

}

module.exports = DashboardSection;