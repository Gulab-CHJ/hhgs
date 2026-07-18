// function Banner() {
//     return `
//     <section class="banner">

//         <img src="/images/banner.jpg" alt="HHGS Banner">

//         <div class="banner-content">
//             <h1>Welcome to HHGS</h1>
//             <p>Human Healthy Global Services</p>

//             <a href="/contact" class="btn">
//                 Contact Us
//             </a>
//         </div>

//     </section>
//     `;
// }

// module.exports = Banner;

function Banner(banners = []) {

let html = "";

banners.forEach(banner => {

html += `

<div class="banner">

<a href="${banner.link}" target="_blank">

<img src="${banner.image}" 
alt="${banner.title}">

</a>

<h3>${banner.title}</h3>

</div>

`;

});


return `

<section class="banner-section">

${html}

</section>

`;

}


module.exports = Banner;