function DoctorSection(doctors) {
    let html = "";

    doctors.forEach((doctor) => {
        html += `
        <a href="/doctor/${doctor._id}" class="card">
            <img src="${doctor.image}">
            <h2>${doctor.name}</h2>
        </a>
        `;
    });

    return html;
}

module.exports = DoctorSection;