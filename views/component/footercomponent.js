function Footer() {

return `

<style>

.footer{

    width:100%;
    background:linear-gradient(135deg,#0f172a,#1e3a8a);

    color:#fff;
    font-family:Arial,sans-serif;

    padding:50px 20px 20px;
    margin-top:50px;

    overflow:hidden;

}


.footer-container{

    max-width:1200px;
    width:100%;
    margin:auto;

}



.footer-top{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:40px;

}



.footer-box{

    width:100%;

}



.footer-box h2{

    font-size:28px;
    margin-bottom:15px;

}



.footer-box h3{

    font-size:20px;
    margin-bottom:15px;

}



.footer-box p{

    color:#d1d5db;

    line-height:1.8;

    margin-bottom:10px;

    word-break:break-word;

}



.footer-box ul{

    list-style:none;

}



.footer-box ul li{

    margin:10px 0;

}



.footer-box ul li a{

    color:#fff;

    text-decoration:none;

    transition:.3s;

}



.footer-box ul li a:hover{

    color:#38bdf8;

}



.social{

    display:flex;

    gap:12px;

    flex-wrap:wrap;

    margin-top:20px;

}



.social a{

    width:42px;

    height:42px;

    border-radius:50%;

    background:#fff;

    color:#1e3a8a;

    display:flex;

    justify-content:center;

    align-items:center;

    text-decoration:none;

    font-size:18px;

    transition:.3s;

}



.social a:hover{

    background:#38bdf8;

    color:#fff;

    transform:translateY(-3px);

}



.footer-bottom{

    margin-top:35px;

    padding-top:20px;

    border-top:1px solid rgba(255,255,255,.2);

    text-align:center;

    color:#cbd5e1;

    font-size:14px;

}



/* TABLET */

@media(max-width:992px){


.footer-top{

    grid-template-columns:repeat(2,1fr);

}


}



/* MOBILE LEFT TO RIGHT */

@media(max-width:768px){


.footer{

    padding:35px 15px 20px;

}



.footer-top{


    display:flex;

    flex-direction:row;

    gap:25px;

    overflow-x:auto;

    scroll-behavior:smooth;

}



.footer-top::-webkit-scrollbar{

    display:none;

}



.footer-box{


    min-width:280px;

    width:280px;

    text-align:left;


}



.footer-box h2{

    font-size:24px;

}



.footer-box h3{

    font-size:18px;

}



.social{

    justify-content:flex-start;

}



}



/* SMALL MOBILE */

@media(max-width:480px){


.footer{

    padding:30px 12px 15px;

}



.footer-top{

    gap:20px;

}



.footer-box{

    min-width:260px;

    width:260px;

}



.footer-box h2{

    font-size:22px;

}



.footer-box h3{

    font-size:17px;

}



.footer-box p,

.footer-box a{

    font-size:14px;

}



.social a{

    width:40px;

    height:40px;

    font-size:17px;

}



.footer-bottom{

    font-size:13px;

}


}



</style>



<link rel="stylesheet"

href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">



<footer class="footer">


<div class="footer-container">


<div class="footer-top">



<div class="footer-box">


<h2>GLOBAL SERVICE</h2>


<p>
SAFE & SECURE Digital Services.
</p>


<p>
Fast • Trusted • Reliable
</p>



<div class="social">


<a href="https://facebook.com" target="_blank">
<i class="fab fa-facebook-f"></i>
</a>



<a href="https://instagram.com" target="_blank">
<i class="fab fa-instagram"></i>
</a>



<a href="https://wa.me/919142264714" target="_blank">
<i class="fab fa-whatsapp"></i>
</a>



<a href="https://www.youtube.com/@HH_GS" target="_blank">
<i class="fab fa-youtube"></i>
</a>



</div>


</div>





<div class="footer-box">


<h3>Quick Links</h3>


<ul>


<li>
<a href="/">Home</a>
</li>


<li>
<a href="/services">Services</a>
</li>


<li>
<a href="/about">About Us</a>
</li>


<li>
<a href="/contact">Contact</a>
</li>


</ul>


</div>






<div class="footer-box">


<h3>Contact Us</h3>



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