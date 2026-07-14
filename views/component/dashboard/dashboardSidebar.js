function DashboardHeader() {

return `
<link rel="stylesheet" href="/css/dashboardside.css">

<header class="dashboard-header">

    <div class="header-logo">
        <h2>HHGS Admin</h2>
    </div>

    <nav class="header-menu">

        <a href="/admin/dashboard" class="active">
            <i class="fa-solid fa-gauge-high"></i>
            <span>Dashboard</span>
        </a>

        <a href="/">
            <i class="fa-solid fa-globe"></i>
            <span>Website</span>
        </a>

        <a href="/admin/profile">
            <i class="fa-solid fa-user"></i>
            <span>Profile</span>
        </a>

        <a href="/admin/manage-doctors">
            <i class="fa-solid fa-user-doctor"></i>
            <span>Doctors</span>
        </a>

        <a href="/admin/manage-students">
            <i class="fa-solid fa-user-graduate"></i>
            <span>Students</span>
        </a>

        <a href="/admin/manage-services">
            <i class="fa-solid fa-stethoscope"></i>
            <span>Services</span>
        </a>

        <a href="/admin/manage-banners">
            <i class="fa-solid fa-image"></i>
            <span>Banners</span>
        </a>

        <a href="/admin/logout" class="logout">
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
        </a>

    </nav>

</header>

`;

}

module.exports = DashboardHeader;