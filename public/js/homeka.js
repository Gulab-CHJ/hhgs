
// ==========================
// Loading Animation
// ==========================

window.addEventListener("load", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "1s";
        document.body.style.opacity = "1";
    }, 100);
});

// ==========================
// Scroll Animation
// ==========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".glass,.infoCard,.feature,.doc").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = ".8s";
    observer.observe(el);
});

// ==========================
// Image Floating
// ==========================

const img = document.querySelector(".imageCard");

if (img) {
    let angle = 0;

    setInterval(() => {
        angle += 0.02;
        img.style.transform = `translateY(${Math.sin(angle) * 10}px)`;
    }, 30);
}

// ==========================
// Mouse Parallax
// ==========================

const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    if (bg1) {
        bg1.style.transform = `translate(${x}px, ${y}px)`;
    }

    if (bg2) {
        bg2.style.transform = `translate(${-x}px, ${-y}px)`;
    }

});

// ==========================
// Ripple Effect
// ==========================

document.querySelectorAll(".buttons a,.heroButtons a").forEach((btn) => {

    btn.addEventListener("click", function (e) {

        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple .6s linear";
        ripple.style.pointerEvents = "none";

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});

// ==========================
// Back To Top Button
// ==========================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.width = "55px";
topBtn.style.height = "55px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#2563eb";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 10px 20px rgba(0,0,0,.3)";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// ==========================
// Auto Glow Animation
// ==========================

setInterval(() => {

    document.querySelectorAll(".feature").forEach((card) => {

        card.style.boxShadow = "0 0 25px rgba(37,99,235,.35)";

        setTimeout(() => {
            card.style.boxShadow = "none";
        }, 800);

    });

}, 4000);

// ==========================
// Ripple Keyframes
// ==========================

const style = document.createElement("style");

style.textContent = `
.buttons a,
.heroButtons a{
    position:relative;
    overflow:hidden;
}

.buttons a span,
.heroButtons a span{
    position:absolute;
    border-radius:50%;
    background:rgba(255,255,255,.5);
    transform:scale(0);
    animation:ripple .6s linear;
    pointer-events:none;
}

@keyframes ripple{
    to{
        transform:scale(4);
        opacity:0;
    }
}
`;

document.head.appendChild(style);