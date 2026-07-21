function Footer() {
    return `
<style>

.footer{
    background:linear-gradient(135deg,#0f172a,#1e3a8a);
    color:#fff;
    padding:50px 20px 20px;
    margin-top:50px;
    font-family:Arial,sans-serif;
}

.footer-container{
    max-width:1200px;
    margin:auto;
}

.footer-top{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:30px;
    margin-bottom:30px;
}

.footer h2{
    margin-bottom:15px;
    font-size:26px;
}

.footer h3{
    margin-bottom:15px;
    font-size:18px;
}

.footer p{
    color:#d1d5db;
    line-height:1.8;
}

.footer ul{
    list-style:none;
    padding:0;
}

.footer ul li{
    margin:10px 0;
}

.footer ul li a{
    color:#fff;
    text-decoration:none;
    transition:.3s;
}

.footer ul li a:hover{
    color:#38bdf8;
    padding-left:5px;
}

.footer-bottom{
    border-top:1px solid rgba(255,255,255,.2);
    margin-top:20px;
    padding-top:20px;
    text-align:center;
    color:#cbd5e1;
    font-size:14px;
}

.social{
    margin-top:15px;
}

.social a{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:42px;
    height:42px;
    border-radius:50%;
    background:#fff;
    color:#1e3a8a;
    margin-right:10px;
    text-decoration:none;
    font-size:18px;
    transition:.3s;
}

.social a:hover{
    background:#38bdf8;
    color:#fff;
    transform:translateY(-4px);
}

@media(max-width:768px){

.footer{
    text-align:center;
}

.footer-top{
    grid-template-columns:1fr;
}

.social{
    justify-content:center;
}

}

</style>

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>

<footer class="footer">

<div class="footer-container">

<div class="footer-top">

<div>

<h2>GLOBAL SERVICE</h2>

<p>
SAFE & SECURE Digital Services.<br>
Fast • Trusted • Reliable
</p>

<div class="social">

<a href="#"><i class="fab fa-facebook-f"></i></a>

<a href="#"><i class="fab fa-instagram"></i></a>

<a href="https://wa.me/919142264714" target="_blank">
    <i class="fab fa-whatsapp"></i>
</a>

<a href="https://www.youtube.com/@HH_GS" target="_blank">
    <i class="fab fa-youtube"></i>
</a>

</div>

</div>

<div>

<h3>Quick Links</h3>

<ul>
<li><a href="/">Home</a></li>
<li><a href="/services">Services</a></li>
<li><a href="/about">About Us</a></li>
<li><a href="/contact">Contact</a></li>
</ul>

</div>

<div>

<h3>Contact</h3>

<p>
<i class="fa-solid fa-location-dot"></i>
Muzaffarpur, Bihar
</p>

<p>
<i class="fa-solid fa-phone"></i>
+91 9142264714
</p>

<p>
<i class="fa-solid fa-envelope"></i>
info@example.com
</p>

</div>

</div>

<div class="footer-bottom">

© ${new Date().getFullYear()} GLOBAL SERVICE. All Rights Reserved.

</div>

</div>

</footer>
`;
}

module.exports = Footer;