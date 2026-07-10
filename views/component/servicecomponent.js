function ServiceSection(services) {
    let html = "";

    services.forEach((service) => {
        html += `
        <a href="/service/${service._id}" class="card">
            <img src="${service.image}">
            <h2>${service.title}</h2>
        </a>
        `;
    });

    return html;
}

module.exports = ServiceSection;