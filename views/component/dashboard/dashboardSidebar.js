function DashboardSidebar() {
return `

<aside class="sidebar">

    <div class="sidebar-logo">
        <img src="/images/GS LOGO.png" alt="HHGS Logo">
        <h2>HHGS Admin</h2>
        <p>Human Healthy Global Services</p>
    </div>

    <span class="menu-title">MAIN MENU</span>

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

    <a href="/admin/change-password">
        <i class="fa-solid fa-key"></i>
        <span>Password</span>
    </a>

    <span class="menu-title">MANAGEMENT</span>

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

    <a href="/admin/manage-gallery">
        <i class="fa-solid fa-images"></i>
        <span>Gallery</span>
    </a>

    <a href="/admin/settings">
        <i class="fa-solid fa-gear"></i>
        <span>Settings</span>
    </a>

    <a href="/admin/logout" class="logout">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Logout</span>
    </a>

</aside>

`;
}

module.exports = DashboardSidebar;