// function DoctorSection(doctors) {
//     let html = "";

//     doctors.forEach((doctor) => {
//         html += `
//         <a href="/doctor/${doctor._id}" class="card">
//             <img src="${doctor.image}">
//             <h2>${doctor.name}</h2>
//         </a>
//         `;
//     });

//     return html;
// }

// module.exports = DoctorSection;


function DoctorSection(doctors){

let html = `
<link rel="stylesheet" href="/css/style.css">

<section class="doctor-section">

<div class="doctor-title">

<h2>Our Expert Doctors</h2>

</div>

<div class="doctor-grid">

`;

doctors.forEach((doctor)=>{

html += `

<a href="/doctor/${doctor._id}" class="card">

<img src="${doctor.image}" alt="${doctor.name}">

<h2>${doctor.name}</h2>

<div class="degree">
${doctor.specialist || "General Physician"}
</div>

<div class="exp">
⭐ 10+ Years Experience
</div>

<div class="view-btn">

View Profile

</div>

</a>

`;

});

html += `

</div>

</section>

`;

return html;

}

module.exports = DoctorSection;