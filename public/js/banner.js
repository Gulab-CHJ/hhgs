const banners = document.querySelectorAll(".banner");

let current = 0;

// पहले सिर्फ पहला banner दिखे
banners.forEach((banner, index) => {
    banner.style.display = index === 0 ? "block" : "none";
});

setInterval(() => {
    // वर्तमान banner छुपाओ
    banners[current].style.display = "none";

    // अगला banner
    current = (current + 1) % banners.length;

    // अगला banner दिखाओ
    banners[current].style.display = "block";

}, 20000); // 20 सेकंड