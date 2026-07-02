function AdminDashboard() {

return `

<!DOCTYPE html>

<html>

<head>
<meta charset="UTF-8">
<title>Dashboard</title>
<link rel="stylesheet" href="/css/admin.css">
</head>

<body>

<div class="dashboard">

<h1>Welcome Admin 👋</h1>

<div class="dashboard-grid">

<a href="/admin/add-service">➕ Add Service</a>

<a href="/admin/edit-service">✏ Edit Service</a>

<a href="/admin/delete-service">🗑 Delete Service</a>

<a href="/admin/categories">📂 Categories</a>

<a href="/admin/users">👥 Users</a>

<a href="/admin/change-password">🔒 Change Password</a>

<a href="/">🏠 Home</a>

</div>

</div>

</body>

</html>

`;

}

module.exports = AdminDashboard;