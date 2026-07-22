function Footer() {

return `

<style>

.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vh; /* 20% screen height */
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #fff;
    font-family: Arial, sans-serif;
    padding: 15px 20px 10px;
    box-sizing: border-box;
    z-index: 9999;
    overflow-y: auto; /* Screen chhoti hone par content scrollable rahega */
}

/* Scrollbar styling for smooth look */
.footer::-webkit-scrollbar {
    width: 4px;
}
.footer::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 4px;
}

.footer-container{
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.footer-top{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.footer-box{
    width: 100%;
}

.footer-box h2{
    font-size: 20px;
    margin-bottom: 8px;
}

.footer-box h3{
    font-size: 16px;
    margin-bottom: 8px;
}

.footer-box p{
    color: #d1d5db;
    line-height: 1.4;
    margin-bottom: 6px;
    font-size: 13px;
    word-break: break-word;
}

.footer-box ul{
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-box ul li{
    margin: 4px 0;
}

.footer-box ul li a{
    color: #fff;
    text-decoration: none;
    font-size: 13px;
    transition: .3s;
}

.footer-box ul li a:hover{
    color: #38bdf8;
}

.social{
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.social a{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fff;
    color: #1e3a8a;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    transition: .3s;
}

.social a:hover{
    background: #38bdf8;
    color: #fff;
    transform: translateY(-2px);
}

.footer-bottom{
    margin-top: 10px;
    padding-top: 8px;
    border-top: 1px solid rgba(255,255,255,.2);
    text-align: center;
    color: #cbd5e1;
    font-size: 12px;
}

/* TABLET */
@media(max-width:992px){
    .footer-top{
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
}

/* MOBILE */
@media(max-width:768px){
    .footer-top{
        display: flex;
        flex-direction: row;
        gap: 20px;
        overflow-x: auto;
    }

    .footer-box{
        min-width: 200px;
        width: 200px;
        text-align: left;
    }

    .footer-box h2{
        font-size: 18px;
    }

    .footer-box h3{
        font-size: 15px;
    }

    .social{
        justify-content: flex-start;
    }
}

</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<footer class="footer">
    <div class="footer-container">
        <div class="footer-top">

            <div class="footer-box">
                <h2>GLOBAL SERVICE</h2>
                <p>SAFE & SECURE Digital Services.</p>
                <p>Fast • Trusted • Reliable</p>
                <div class="social">
                    <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/919142264714" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://www.youtube.com/@HH_GS" target="_blank"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <div class="footer-box">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <div class="footer-box">
                <h3>Contact Us</h3>
                <p><i class="fa-solid fa-location-dot"></i> Muzaffarpur, Bihar</p>
                <p><i class="fa-solid fa-phone"></i> +91 9142264714</p>
                <p><i class="fa-solid fa-envelope"></i> info@example.com</p>
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