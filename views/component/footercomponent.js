function Footer() {

return `

<style>

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vh; /* Exactly 20% screen height */
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 10px 15px;
    box-sizing: border-box;
    z-index: 9999;
    display: flex;
    align-items: center;
}

.footer-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.footer-top {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.2fr;
    gap: 15px;
    align-items: start;
}

.footer-box h2 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: #38bdf8;
}

.footer-box h3 {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 6px 0;
}

.footer-box p {
    color: #cbd5e1;
    line-height: 1.3;
    margin: 0 0 3px 0;
    font-size: 12px;
}

.footer-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
}

.footer-box ul li a {
    color: #e2e8f0;
    text-decoration: none;
    font-size: 12px;
    transition: color 0.2s;
}

.footer-box ul li a:hover {
    color: #38bdf8;
}

.social {
    display: flex;
    gap: 8px;
    margin-top: 6px;
}

.social a {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    transition: all 0.3s ease;
}

.social a:hover {
    background: #38bdf8;
    color: #0f172a;
    transform: translateY(-2px);
}

.footer-bottom {
    padding-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #94a3b8;
    font-size: 11px;
}

/* MOBILE FIX (No Scrollbar, Professional Layout) */
@media (max-width: 768px) {
    .footer {
        padding: 8px 10px;
    }

    .footer-top {
        grid-template-columns: 1fr 1fr; /* 2 columns on mobile */
        gap: 10px;
    }

    .footer-box.contact-box {
        grid-column: span 2; /* Contact moves to full width row if needed or compacts */
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.05);
        padding: 4px 8px;
        border-radius: 4px;
    }

    .footer-box.contact-box h3 {
        display: none; /* Hide header on mobile to save space */
    }

    .footer-box.contact-box p {
        margin: 0;
        font-size: 11px;
    }

    .footer-box h2 {
        font-size: 14px;
    }

    .footer-box p, 
    .footer-box ul li a {
        font-size: 11px;
    }

    .social a {
        width: 24px;
        height: 24px;
        font-size: 11px;
    }

    .footer-bottom {
        font-size: 10px;
        padding-top: 4px;
    }
}

</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<footer class="footer">
    <div class="footer-container">
        <div class="footer-top">

            <!-- Box 1: Brand & Social -->
            <div class="footer-box">
                <h2>GLOBAL SERVICE</h2>
                <p>Safe & Secure Services</p>
                <div class="social">
                    <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/919142264714" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://www.youtube.com/@HH_GS" target="_blank"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <!-- Box 2: Quick Links -->
            <div class="footer-box">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <!-- Box 3: Contact Info -->
            <div class="footer-box contact-box">
                <h3>Contact Us</h3>
                <p><i class="fa-solid fa-location-dot"></i> Muzaffarpur</p>
                <p><i class="fa-solid fa-phone"></i> +91 9142264714</p>
            </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="footer-bottom">
            © ${new Date().getFullYear()} GLOBAL SERVICE. All Rights Reserved.
        </div>
    </div>
</footer>

`;

}

module.exports = Footer;