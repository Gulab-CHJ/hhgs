function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function StudentSection(students = []) {

    const safeStudents = Array.isArray(students)
        ? students
        : [];


    if (safeStudents.length === 0) {
        return "";
    }


    const studentCards = safeStudents.map((student) => {

        const name =
            student.name ||
            student.studentName ||
            "Student";

        const course =
            student.course ||
            student.className ||
            student.class ||
            "Course Not Available";

        const institute =
            student.institute ||
            student.school ||
            student.college ||
            "Student Institute";

        const address =
            student.address ||
            student.location ||
            "Address Not Available";

        const timing =
            student.timing ||
            student.batchTime ||
            student.schedule ||
            "Time Not Available";

        const fee =
            student.fee ||
            student.fees ||
            student.amount ||
            0;

        const image =
            student.image ||
            student.photo ||
            "/images/student-default.png";

        const studentId = student._id || "";

        return `
            <article class="student-card">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    class="student-image"
                    onerror="this.src='/images/student-default.png'"
                >

                <div class="student-card-content">

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p>
                        🎓 <b>${escapeHTML(course)}</b>
                    </p>

                    <p>
                        🏫 ${escapeHTML(institute)}
                    </p>

                    <p>
                        📍 ${escapeHTML(address)}
                    </p>

                    <p>
                        ⏰ ${escapeHTML(timing)}
                    </p>

                    <p>
                        💰 Fee <b>₹${escapeHTML(fee)}</b>
                    </p>

                    <a
                        href="/student/${escapeHTML(studentId)}"
                        class="view-student-btn"
                    >
                        View Student
                    </a>

                </div>

            </article>
        `;
    }).join("");


    return `
        <section class="students-section">

            <style>

                .students-section {
                    padding: 45px 16px;
                    background: #f7faff;
                }

                .students-section h2 {
                    text-align: center;
                    font-size: 30px;
                    color: #152a4a;
                    margin: 0 0 28px;
                }

                .students-grid {
                    width: 100%;
                    max-width: 1200px;
                    margin: auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 22px;
                }

                .student-card {
                    overflow: hidden;
                    border-radius: 16px;
                    background: #ffffff;
                    box-shadow: 0 8px 24px rgba(17, 48, 91, 0.12);
                    transition: 0.25s ease;
                }

                .student-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 13px 30px rgba(17, 48, 91, 0.2);
                }

                .student-image {
                    width: 100%;
                    height: 210px;
                    object-fit: cover;
                    display: block;
                    background: #e8eef7;
                }

                .student-card-content {
                    padding: 18px;
                }

                .student-card h3 {
                    color: #0d2c54;
                    font-size: 21px;
                    margin: 0 0 14px;
                }

                .student-card p {
                    color: #4a5568;
                    font-size: 14px;
                    line-height: 1.55;
                    margin: 8px 0;
                }

                .view-student-btn {
                    width: 100%;
                    display: block;
                    box-sizing: border-box;
                    text-align: center;
                    margin-top: 18px;
                    padding: 11px 14px;
                    border-radius: 8px;
                    background: #0a7a52;
                    color: #ffffff;
                    font-weight: 700;
                    text-decoration: none;
                }

                .view-student-btn:hover {
                    background: #075f40;
                }

                @media (max-width: 600px) {

                    .students-section {
                        padding: 32px 12px;
                    }

                    .students-section h2 {
                        font-size: 24px;
                    }

                    .students-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                }

            </style>

            <h2>Our Students</h2>

            <div class="students-grid">
                ${studentCards}
            </div>

        </section>
    `;
}


module.exports = StudentSection;