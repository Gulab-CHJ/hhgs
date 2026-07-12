// // function StudentSection(students) {
// //     let html = "";

// //     students.forEach((student) => {
// //         html += `
// //         <a href="/student/${student._id}" class="card">
// //             <img src="${student.image}">
// //             <h2>${student.name}</h2>
// //         </a>
// //         `;
// //     });

// //     return html;
// // }

// // module.exports = StudentSection;
// function StudentSection(students) {

// let html = `
// <link rel="stylesheet" href="/css/style.css">


// <section class="student-section">

// <div class="student-title">

// <h2>🎓 Our Successful Students</h2>
// <p>Meet Our Bright Students</p>

// </div>

// <div class="student-grid">

// `;

// students.forEach((student)=>{

// html += `

// <a href="/student/${student._id}" class="student-card">

// <div class="student-image">

// <img src="${student.image}" alt="${student.name}">

// </div>

// <div class="student-content">

// <h2>${student.name}</h2>

// <div class="student-info">
// 🎓 ${student.course || "Student"}
// </div>

// <div class="student-info">
// 🏆 ${student.rank || "Top Performer"}
// </div>

// <div class="student-info">
// 🏫 ${student.college || "HHGS Institute"}
// </div>

// <div class="student-btn">

// View Profile →

// </div>

// </div>

// </a>

// `;

// });

// html += `

// </div>

// </section>

// `;

// return html;

// }

// module.exports = StudentSection;