
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