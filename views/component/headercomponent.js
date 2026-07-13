function Header() {
    return `
<header class="header">

    <div class="logo">
        <a href="/">HHGS</a>
    </div>

    <button class="menu-btn" onclick="document.querySelector('.navbar').classList.toggle('active')">
        ☰
    </button>

    <nav class="navbar">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/students">Students</a>
        <a href="/doctors">Doctors</a>
        <a href="/contact">Contact</a>
        <a href="/admin">Admin</a>
    </nav>

</header>
`;
}

module.exports = Header;