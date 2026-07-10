function StudentSection(students) {
    let html = "";

    students.forEach((student) => {
        html += `
        <a href="/student/${student._id}" class="card">
            <img src="${student.image}">
            <h2>${student.name}</h2>
        </a>
        `;
    });

    return html;
}

module.exports = StudentSection;