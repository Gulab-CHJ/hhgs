// // function ServiceSection(services) {
// //     let html = "";

// //     services.forEach((service) => {
// //         html += `
// //         <a href="/service/${service._id}" class="card">
// //             <img src="${service.image}">
// //             <h2>${service.title}</h2>
// //         </a>
// //         `;
// //     });

// //     return html;
// // }

// // module.exports = ServiceSection;

// function ServiceSection(services) {

//     let html = `
//     <link rel="stylesheet" href="/css/style.css">

// <section class="service-section">

//     <div class="section-title">

//         <h2>Our Services</h2>

//         <p>Fast • Secure • Trusted Digital Services</p>

//     </div>

//     <div class="service-grid">

// `;

//     services.forEach((service) => {

//         html += `

// <div class="service-card">

//     <a href="/service/${service._id}">

//         <div class="service-icon">

//             <img
//                 src="${service.image}"
//                 alt="${service.title}"
//             >

//         </div>

//         <h3>${service.title}</h3>

//         <p>

//             Fast & Secure Service Available

//         </p>

//         <span>

//             View Details

//             <i class="fa-solid fa-arrow-right"></i>

//         </span>

//     </a>

// </div>

// `;

//     });

//     html += `

//     </div>

// </section>

// `;

//     return html;
// }

// module.exports = ServiceSection;