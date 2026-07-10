// function Header(){

// return `

// <header class="header">

//     <div class="logo">
//         <img src="/images/GS LOGO.png" alt="HHGS Logo">
//     </div>

//     <nav class="navbar" id="navbar">

//         <a href="/">Home</a>

//         <a href="#">About</a>

//         <a href="#">Services</a>

//         <a href="#">Contact</a>

//         <a href="/admin">Admin</a>

//     </nav>

//     <button class="menu-btn" id="menuBtn">
//         ☰
//     </button>

// </header>

// `;

// }

// module.exports = Header;


function Header() {
return `
<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',sans-serif;
}

.header{
    position:sticky;
    top:0;
    left:0;
    width:100%;
    background:rgba(255,255,255,.95);
    backdrop-filter:blur(15px);
    box-shadow:0 8px 25px rgba(0,0,0,.08);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:12px 6%;
    z-index:9999;
}

.logo{
    display:flex;
    align-items:center;
    gap:12px;
}

.logo img{
    width:55px;
    height:55px;
    object-fit:contain;
}

.logo h2{
    font-size:22px;
    color:#0f172a;
    font-weight:700;
}

.logo span{
    display:block;
    font-size:12px;
    color:#2563eb;
    font-weight:600;
}

.navbar{
    display:flex;
    gap:28px;
    align-items:center;
}

.navbar a{
    text-decoration:none;
    color:#1e293b;
    font-size:16px;
    font-weight:600;
    position:relative;
    transition:.3s;
}

.navbar a::after{
    content:"";
    position:absolute;
    left:0;
    bottom:-5px;
    width:0%;
    height:2px;
    background:#2563eb;
    transition:.3s;
}

.navbar a:hover{
    color:#2563eb;
}

.navbar a:hover::after{
    width:100%;
}

.adminBtn{
    background:#2563eb;
    color:#fff!important;
    padding:10px 20px;
    border-radius:30px;
}

.adminBtn:hover{
    background:#1d4ed8;
}

.menu-btn{
    display:none;
    border:none;
    background:none;
    font-size:32px;
    cursor:pointer;
}

/* Mobile */

@media(max-width:768px){

.menu-btn{
    display:block;
}

.navbar{
    position:absolute;
    top:80px;
    left:0;
    width:100%;
    background:#fff;
    display:none;
    flex-direction:column;
    gap:18px;
    padding:25px;
    box-shadow:0 15px 35px rgba(0,0,0,.1);
}

.navbar.active{
    display:flex;
}

.logo img{
    width:48px;
    height:48px;
}

.logo h2{
    font-size:18px;
}

}
</style>

<header class="header">

<div class="logo">
<img src="/images/GS LOGO.png">
<div>
<h2>HHGS</h2>
<span>Digital Services</span>
</div>
</div>

<nav class="navbar" id="navbar">

<a href="/">Home</a>
<a href="/about">About</a>
<a href="/services">Services</a>
<a href="/contact">Contact</a>
<a href="/admin" class="adminBtn">Admin</a>

</nav>

<button class="menu-btn" id="menuBtn">☰</button>

</header>

<script>

const menuBtn=document.getElementById("menuBtn");
const navbar=document.getElementById("navbar");

menuBtn.onclick=()=>{
navbar.classList.toggle("active");
};

</script>
`;
}

module.exports = Header;