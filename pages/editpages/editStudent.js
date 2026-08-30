// function escapeHTML(value) {

//     if (value === null || value === undefined) {
//         return "";
//     }

//     return String(value)
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }


// function EditStudent(student = {}) {

//     return `
// <!DOCTYPE html>
// <html lang="en">

// <head>

//     <meta charset="UTF-8">

//     <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1.0"
//     >

//     <title>Edit Student</title>

//     <style>

//         * {
//             box-sizing: border-box;
//             font-family: Arial, sans-serif;
//         }

//         body {
//             margin: 0;
//             min-height: 100vh;
//             padding: 25px 15px;
//             background: linear-gradient(135deg, #2563eb, #06b6d4);
//         }

//         .card {
//             width: 100%;
//             max-width: 560px;
//             margin: auto;
//             padding: 28px;
//             border-radius: 18px;
//             background: #ffffff;
//             box-shadow: 0 18px 40px rgba(0, 0, 0, .2);
//         }

//         h1 {
//             margin: 0 0 22px;
//             color: #1e3a8a;
//             text-align: center;
//         }

//         label {
//             display: block;
//             margin: 15px 0 7px;
//             color: #1e3a8a;
//             font-weight: bold;
//         }

//         input,
//         select {
//             width: 100%;
//             padding: 12px;
//             border: 1px solid #cbd5e1;
//             border-radius: 8px;
//             outline: none;
//             font-size: 15px;
//         }

//         input:focus,
//         select:focus {
//             border-color: #2563eb;
//             box-shadow: 0 0 8px rgba(37, 99, 235, .25);
//         }

//         .roll-box {
//             margin-top: 17px;
//             padding: 13px;
//             border-radius: 8px;
//             color: #1d4ed8;
//             background: #dbeafe;
//             text-align: center;
//             font-weight: bold;
//         }

//         button {
//             width: 100%;
//             margin-top: 24px;
//             padding: 13px;
//             border: none;
//             border-radius: 8px;
//             color: #ffffff;
//             background: #2563eb;
//             font-size: 16px;
//             font-weight: bold;
//             cursor: pointer;
//         }

//         button:hover {
//             background: #1d4ed8;
//         }

//         .back {
//             display: block;
//             margin-top: 18px;
//             color: #2563eb;
//             text-align: center;
//             text-decoration: none;
//         }

//     </style>

// </head>

// <body>

//     <div class="card">

//         <h1>Edit Student</h1>

//         <form
//             method="POST"
//             action="/admin/edit-student/${student._id}"
//         >

//             <label>Student Name</label>

//             <input
//                 type="text"
//                 name="name"
//                 value="${escapeHTML(student.name)}"
//                 required
//             >

//             <label>Mobile Number</label>

//             <input
//                 type="tel"
//                 name="mobile"
//                 value="${escapeHTML(student.mobile)}"
//                 required
//             >

//             <label>Age</label>

//             <input
//                 type="number"
//                 name="age"
//                 value="${escapeHTML(student.age)}"
//                 min="3"
//                 max="100"
//             >

//             <label>Class / Course</label>

//             <input
//                 type="text"
//                 name="course"
//                 value="${escapeHTML(student.course)}"
//                 required
//             >

//             <div class="roll-box">
//                 Roll Number: ${escapeHTML(student.rollNo)}
//             </div>

//             <label>New Password</label>

//             <input
//                 type="password"
//                 name="password"
//                 placeholder="Leave empty to keep old password"
//             >

//             <label>Payment Plan</label>

//             <select
//                 name="plan"
//                 id="plan"
//             >

//                 <option
//                     value="1 Month"
//                     ${student.plan === "1 Month" ? "selected" : ""}
//                 >
//                     1 Month — ₹500
//                 </option>

//                 <option
//                     value="6 Months"
//                     ${student.plan === "6 Months" ? "selected" : ""}
//                 >
//                     6 Months — ₹2500
//                 </option>

//             </select>

//             <label>Amount</label>

//             <input
//                 type="number"
//                 name="amount"
//                 id="amount"
//                 value="${escapeHTML(student.amount)}"
//                 required
//             >

//             <label>Payment Status</label>

//             <select name="paymentStatus">

//                 <option
//                     value="Pending"
//                     ${student.paymentStatus === "Pending" ? "selected" : ""}
//                 >
//                     Pending
//                 </option>

//                 <option
//                     value="Success"
//                     ${student.paymentStatus === "Success" ? "selected" : ""}
//                 >
//                     Success
//                 </option>

//             </select>

//             <button type="submit">
//                 Update Student
//             </button>

//         </form>

//         <a
//             href="/admin/manage-students"
//             class="back"
//         >
//             ← Back to Manage Students
//         </a>

//     </div>

//     <script>

//         const plan =
//             document.getElementById("plan");

//         const amount =
//             document.getElementById("amount");

//         plan.addEventListener("change", () => {

//             if (plan.value === "1 Month") {
//                 amount.value = 500;
//             }

//             if (plan.value === "6 Months") {
//                 amount.value = 2500;
//             }

//         });

//     </script>

// </body>

// </html>
// `;

// }

// module.exports = EditStudent;

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


function EditStudent(student = {}) {

    const currentImage =
        student.image ||
        student.photo ||
        "/images/student-default.png";

    return `
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Edit Student</title>

    <style>

        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            margin: 0;
            min-height: 100vh;
            padding: 25px 15px;
            background:
                linear-gradient(
                    135deg,
                    #1d4ed8,
                    #06b6d4
                );
        }

        .card {
            width: 100%;
            max-width: 580px;
            margin: auto;
            padding: 28px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 20px;
            background: #ffffff;
            box-shadow:
                0 20px 50px
                rgba(0, 0, 0, 0.22);
        }

        .heading {
            margin-bottom: 24px;
            text-align: center;
        }

        .heading-icon {
            width: 52px;
            height: 52px;
            display: grid;
            place-items: center;
            margin: 0 auto 10px;
            border-radius: 50%;
            background: #dbeafe;
            font-size: 26px;
        }

        h1 {
            margin: 0;
            color: #1e3a8a;
            font-size: 28px;
        }

        .heading p {
            margin: 7px 0 0;
            color: #64748b;
            font-size: 13px;
        }

        label {
            display: block;
            margin: 16px 0 7px;
            color: #1e3a8a;
            font-size: 14px;
            font-weight: 700;
        }

        input,
        select {
            width: 100%;
            min-height: 46px;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            outline: none;
            background: #ffffff;
            color: #1e293b;
            font-size: 15px;
        }

        input:focus,
        select:focus {
            border-color: #2563eb;
            box-shadow:
                0 0 0 3px
                rgba(37, 99, 235, 0.14);
        }

        .photo-section {
            margin-bottom: 22px;
            padding: 18px;
            border: 1px dashed #93c5fd;
            border-radius: 14px;
            background: #f8fbff;
            text-align: center;
        }

        .photo-preview-box {
            width: 125px;
            height: 125px;
            position: relative;
            overflow: hidden;
            margin: 0 auto 14px;
            border: 4px solid #ffffff;
            border-radius: 50%;
            background: #e2e8f0;
            box-shadow:
                0 8px 22px
                rgba(30, 64, 175, 0.22);
        }

        .photo-preview {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
        }

        .photo-label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            margin: 0;
            padding: 10px 16px;
            border-radius: 9px;
            background: #2563eb;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
        }

        .photo-label:hover {
            background: #1d4ed8;
        }

        .photo-input {
            display: none;
        }

        .photo-help {
            margin: 10px 0 0;
            color: #64748b;
            font-size: 11px;
        }

        .selected-file-name {
            overflow: hidden;
            margin-top: 8px;
            color: #0f766e;
            font-size: 12px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }

        .roll-box {
            margin-top: 18px;
            padding: 14px;
            border: 1px solid #bfdbfe;
            border-radius: 10px;
            color: #1d4ed8;
            background: #eff6ff;
            text-align: center;
            font-weight: 800;
        }

        .password-help {
            display: block;
            margin-top: 6px;
            color: #64748b;
            font-size: 11px;
        }

        .update-button {
            width: 100%;
            min-height: 48px;
            margin-top: 25px;
            padding: 13px;
            border: none;
            border-radius: 10px;
            color: #ffffff;
            background:
                linear-gradient(
                    135deg,
                    #2563eb,
                    #0891b2
                );
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            box-shadow:
                0 8px 20px
                rgba(37, 99, 235, 0.25);
        }

        .update-button:hover {
            background:
                linear-gradient(
                    135deg,
                    #1d4ed8,
                    #0e7490
                );
        }

        .update-button:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }

        .back {
            display: block;
            margin-top: 19px;
            color: #2563eb;
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
        }

        .back:hover {
            text-decoration: underline;
        }

        @media (max-width: 600px) {

            body {
                padding: 12px 10px;
            }

            .card {
                padding: 20px 15px;
                border-radius: 16px;
            }

            h1 {
                font-size: 24px;
            }

            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .photo-preview-box {
                width: 110px;
                height: 110px;
            }

        }

    </style>

</head>

<body>

    <div class="card">

        <div class="heading">

            <div class="heading-icon">
                👨‍🎓
            </div>

            <h1>Edit Student</h1>

            <p>
                Student information और photo update करें
            </p>

        </div>


        <form
            method="POST"
            action="/admin/edit-student/${escapeHTML(student._id)}"
            enctype="multipart/form-data"
            id="editStudentForm"
        >

            <div class="photo-section">

                <div class="photo-preview-box">

                    <img
                        src="${escapeHTML(currentImage)}"
                        alt="Student Photo"
                        id="photoPreview"
                        class="photo-preview"
                        onerror="
                            this.onerror = null;
                            this.src = '/images/student-default.png';
                        "
                    >

                </div>

                <label
                    for="studentImage"
                    class="photo-label"
                >
                    📷 Choose Student Photo
                </label>

                <input
                    type="file"
                    name="image"
                    id="studentImage"
                    class="photo-input"
                    accept="image/jpeg,image/png,image/webp"
                >

                <div
                    class="selected-file-name"
                    id="selectedFileName"
                >
                    कोई नई photo select नहीं की गई
                </div>

                <p class="photo-help">
                    JPG, PNG या WEBP • Maximum size 5 MB
                </p>

            </div>


            <label for="studentName">
                Student Name
            </label>

            <input
                type="text"
                name="name"
                id="studentName"
                value="${escapeHTML(student.name)}"
                placeholder="Enter student name"
                required
            >


            <div class="form-row">

                <div>

                    <label for="mobile">
                        Mobile Number
                    </label>

                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        value="${escapeHTML(student.mobile)}"
                        placeholder="10-digit mobile number"
                        inputmode="numeric"
                        maxlength="10"
                        required
                    >

                </div>

                <div>

                    <label for="age">
                        Age
                    </label>

                    <input
                        type="number"
                        name="age"
                        id="age"
                        value="${escapeHTML(student.age)}"
                        min="3"
                        max="100"
                        placeholder="Student age"
                    >

                </div>

            </div>


            <label for="course">
                Class / Course
            </label>

            <input
                type="text"
                name="course"
                id="course"
                value="${escapeHTML(
                    student.course ||
                    student.className
                )}"
                placeholder="Enter class or course"
                required
            >


            <div class="roll-box">
                🎓 Roll Number:
                ${escapeHTML(
                    student.rollNo ||
                    student.roll ||
                    "Not Available"
                )}
            </div>


            <label for="password">
                New Password
            </label>

            <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter new password"
            >

            <span class="password-help">
                Password change नहीं करना है तो इसे खाली छोड़ दें।
            </span>


            <div class="form-row">

                <div>

                    <label for="plan">
                        Payment Plan
                    </label>

                    <select
                        name="plan"
                        id="plan"
                    >

                        <option
                            value="1 Month"
                            ${student.plan === "1 Month"
                                ? "selected"
                                : ""}
                        >
                            1 Month — ₹500
                        </option>

                        <option
                            value="6 Months"
                            ${student.plan === "6 Months"
                                ? "selected"
                                : ""}
                        >
                            6 Months — ₹2500
                        </option>

                    </select>

                </div>

                <div>

                    <label for="amount">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        value="${escapeHTML(student.amount ?? 0)}"
                        min="0"
                        required
                    >

                </div>

            </div>


            <label for="paymentStatus">
                Payment Status
            </label>

            <select
                name="paymentStatus"
                id="paymentStatus"
            >

                <option
                    value="Pending"
                    ${student.paymentStatus === "Pending"
                        ? "selected"
                        : ""}
                >
                    ⏳ Pending
                </option>

                <option
                    value="Success"
                    ${student.paymentStatus === "Success"
                        ? "selected"
                        : ""}
                >
                    ✅ Success
                </option>

            </select>


            <button
                type="submit"
                class="update-button"
                id="updateButton"
            >
                ✅ Update Student
            </button>

        </form>


        <a
            href="/admin/manage-students"
            class="back"
        >
            ← Back to Manage Students
        </a>

    </div>


    <script>

        const plan =
            document.getElementById("plan");

        const amount =
            document.getElementById("amount");

        const studentImage =
            document.getElementById("studentImage");

        const photoPreview =
            document.getElementById("photoPreview");

        const selectedFileName =
            document.getElementById("selectedFileName");

        const editStudentForm =
            document.getElementById("editStudentForm");

        const updateButton =
            document.getElementById("updateButton");


        plan.addEventListener("change", function () {

            if (plan.value === "1 Month") {
                amount.value = 500;
            }

            if (plan.value === "6 Months") {
                amount.value = 2500;
            }

        });


        studentImage.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {

                alert(
                    "केवल JPG, PNG या WEBP photo upload करें।"
                );

                this.value = "";
                return;
            }

            const maximumSize =
                5 * 1024 * 1024;

            if (file.size > maximumSize) {

                alert(
                    "Photo की size 5 MB से कम होनी चाहिए।"
                );

                this.value = "";
                return;
            }

            selectedFileName.textContent =
                "✅ " + file.name;

            const imageURL =
                URL.createObjectURL(file);

            photoPreview.src = imageURL;

            photoPreview.onload = function () {
                URL.revokeObjectURL(imageURL);
            };

        });


        editStudentForm.addEventListener(
            "submit",
            function () {

                updateButton.disabled = true;

                updateButton.textContent =
                    "⏳ Updating Student...";

            }
        );

    </script>

</body>

</html>
`;

}


module.exports = EditStudent;