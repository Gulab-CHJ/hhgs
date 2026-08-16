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


// function StudentInformation(student = {}) {

//     const paymentSuccess =
//         student.paymentStatus === "Success";

//     return `
// <!DOCTYPE html>
// <html lang="en">

// <head>

//     <meta charset="UTF-8">

//     <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1.0"
//     >

//     <title>Student Information</title>

//     <style>

//         * {
//             box-sizing: border-box;
//             font-family: "Segoe UI", Arial, sans-serif;
//         }

//         body {
//             min-height: 100vh;
//             margin: 0;
//             padding: 30px 15px;
//             color: #eaf2ff;
//             background:
//                 radial-gradient(circle at top right, #2563eb, transparent 35%),
//                 linear-gradient(135deg, #071c3d, #0b3b70);
//         }

//         .profile-card {
//             width: 100%;
//             max-width: 850px;
//             margin: auto;
//             overflow: hidden;
//             border: 1px solid rgba(255, 255, 255, .16);
//             border-radius: 24px;
//             background: rgba(255, 255, 255, .1);
//             box-shadow: 0 24px 65px rgba(0, 0, 0, .3);
//             backdrop-filter: blur(15px);
//         }

//         .hero {
//             padding: 35px 30px;
//             text-align: center;
//             background: linear-gradient(135deg, #2563eb, #06b6d4);
//         }

//         .avatar {
//             width: 90px;
//             height: 90px;
//             margin: auto auto 14px;
//             border: 4px solid rgba(255, 255, 255, .75);
//             border-radius: 50%;
//             color: #1d4ed8;
//             background: #ffffff;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 36px;
//             font-weight: 800;
//         }

//         .hero h1 {
//             margin: 0;
//             font-size: 29px;
//         }

//         .hero p {
//             margin: 8px 0 0;
//             opacity: .9;
//         }

//         .content {
//             padding: 28px;
//         }

//         .roll-number {
//             margin-bottom: 25px;
//             padding: 16px;
//             border: 1px solid rgba(96, 165, 250, .45);
//             border-radius: 13px;
//             color: #bfdbfe;
//             background: rgba(37, 99, 235, .2);
//             text-align: center;
//         }

//         .roll-number span {
//             display: block;
//             margin-top: 4px;
//             color: #ffffff;
//             font-size: 25px;
//             font-weight: 800;
//             letter-spacing: 1px;
//         }

//         .details-grid {
//             display: grid;
//             grid-template-columns: repeat(2, 1fr);
//             gap: 15px;
//         }

//         .detail-box {
//             padding: 17px;
//             border: 1px solid rgba(255, 255, 255, .11);
//             border-radius: 13px;
//             background: rgba(255, 255, 255, .07);
//         }

//         .detail-box small {
//             display: block;
//             margin-bottom: 7px;
//             color: #93c5fd;
//             font-size: 12px;
//             font-weight: 700;
//             letter-spacing: .4px;
//             text-transform: uppercase;
//         }

//         .detail-box strong {
//             color: #ffffff;
//             font-size: 16px;
//         }

//         .status {
//             display: inline-block;
//             padding: 6px 10px;
//             border-radius: 20px;
//             font-size: 13px;
//         }

//         .success {
//             color: #dcfce7;
//             background: #15803d;
//         }

//         .pending {
//             color: #fef3c7;
//             background: #a16207;
//         }

//         .logout-btn {
//             display: block;
//             margin-top: 25px;
//             padding: 14px;
//             border-radius: 10px;
//             color: #ffffff;
//             background: rgba(255, 255, 255, .13);
//             text-align: center;
//             text-decoration: none;
//             font-weight: 700;
//         }

//         .logout-btn:hover {
//             background: rgba(255, 255, 255, .23);
//         }

//         @media (max-width: 600px) {

//             .hero {
//                 padding: 28px 20px;
//             }

//             .content {
//                 padding: 20px;
//             }

//             .details-grid {
//                 grid-template-columns: 1fr;
//             }

//         }

//     </style>

// </head>

// <body>

//     <main class="profile-card">

//         <section class="hero">

//             <div class="avatar">
//                 ${escapeHTML(
//                     String(student.name || "S")
//                         .charAt(0)
//                         .toUpperCase()
//                 )}
//             </div>

//             <h1>
//                 ${escapeHTML(student.name)}
//             </h1>

//             <p>Gulab Service Institute Student Profile</p>

//         </section>

//         <section class="content">

//             <div class="roll-number">
//                 STUDENT ROLL NUMBER
//                 <span>
//                     ${escapeHTML(student.rollNo)}
//                 </span>
//             </div>

//             <div class="details-grid">

//                 <div class="detail-box">
//                     <small>Mobile Number</small>
//                     <strong>${escapeHTML(student.mobile)}</strong>
//                 </div>

//                 <div class="detail-box">
//                     <small>Age</small>
//                     <strong>${escapeHTML(student.age)} Years</strong>
//                 </div>

//                 <div class="detail-box">
//                     <small>Class / Course</small>
//                     <strong>${escapeHTML(student.course)}</strong>
//                 </div>

//                 <div class="detail-box">
//                     <small>Subscription Plan</small>
//                     <strong>${escapeHTML(student.plan)}</strong>
//                 </div>

//                 <div class="detail-box">
//                     <small>Total Fee</small>
//                     <strong>₹${escapeHTML(student.amount)}</strong>
//                 </div>

//                 <div class="detail-box">
//                     <small>Payment Status</small>

//                     <span class="status ${paymentSuccess ? "success" : "pending"}">
//                         ${paymentSuccess ? "Success" : "Pending"}
//                     </span>
//                 </div>

//             </div>

//            <a
//     href="/admin/student-logout"
//     class="logout-btn"
// >
//     Logout
// </a>

//         </section>

//     </main>

// </body>

// </html>
// `;

// }

// module.exports = StudentInformation;


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


function StudentInformation(student = {}) {
    const paymentSuccess =
        String(student.paymentStatus || "")
            .toLowerCase() === "success";

    const studentName =
        student.name ||
        "Student";

    const rollNumber =
        student.roll ||
        student.rollNo ||
        "-";

    const mobile =
        student.mobile ||
        student.phone ||
        "-";

    const course =
        student.className ||
        student.course ||
        "-";

    const amount =
        Number(student.amount || 0)
            .toFixed(2);

    const studentId =
        student._id ||
        "";

    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Student Information | Global Services</title>

    <style>
        * {
            box-sizing: border-box;
            font-family: "Segoe UI", Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            margin: 0;
            padding: 30px 15px;
            color: #eaf2ff;
            background:
                radial-gradient(
                    circle at top right,
                    #2563eb,
                    transparent 35%
                ),
                radial-gradient(
                    circle at bottom left,
                    #0891b2,
                    transparent 35%
                ),
                linear-gradient(135deg, #06162f, #0b3b70);
        }

        .profile-card {
            width: 100%;
            max-width: 900px;
            margin: auto;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, .16);
            border-radius: 25px;
            background: rgba(255, 255, 255, .1);
            box-shadow: 0 24px 65px rgba(0, 0, 0, .35);
            backdrop-filter: blur(15px);
        }

        .top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 23px;
            color: #cfe8ff;
            background: rgba(0, 0, 0, .18);
            font-size: 12px;
            font-weight: 700;
            letter-spacing: .5px;
        }

        .secure {
            color: #86efac;
        }

        .hero {
            position: relative;
            padding: 34px 30px;
            overflow: hidden;
            text-align: center;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
        }

        .hero::before,
        .hero::after {
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            content: "";
            background: rgba(255, 255, 255, .12);
        }

        .hero::before {
            top: -70px;
            left: -30px;
        }

        .hero::after {
            right: -40px;
            bottom: -90px;
        }

        .avatar {
            position: relative;
            z-index: 1;
            display: flex;
            width: 92px;
            height: 92px;
            align-items: center;
            justify-content: center;
            margin: auto auto 14px;
            border: 4px solid rgba(255, 255, 255, .8);
            border-radius: 50%;
            color: #1d4ed8;
            background: #fff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, .18);
            font-size: 38px;
            font-weight: 800;
        }

        .hero h1 {
            position: relative;
            z-index: 1;
            margin: 0;
            color: #fff;
            font-size: 29px;
        }

        .hero p {
            position: relative;
            z-index: 1;
            margin: 8px 0 0;
            color: #eafcff;
            font-size: 14px;
        }

        .content {
            padding: 28px;
        }

        .roll-number {
            margin-bottom: 24px;
            padding: 17px;
            border: 1px solid rgba(96, 165, 250, .45);
            border-radius: 14px;
            color: #bfdbfe;
            background: rgba(37, 99, 235, .22);
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
        }

        .roll-number span {
            display: block;
            margin-top: 6px;
            color: #fff;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: 1px;
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .detail-box {
            padding: 17px;
            border: 1px solid rgba(255, 255, 255, .11);
            border-radius: 14px;
            background: rgba(255, 255, 255, .07);
        }

        .detail-box small {
            display: block;
            margin-bottom: 8px;
            color: #93c5fd;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .5px;
            text-transform: uppercase;
        }

        .detail-box strong {
            color: #fff;
            font-size: 16px;
        }

        .status {
            display: inline-block;
            padding: 7px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
        }

        .success {
            color: #dcfce7;
            background: #15803d;
        }

        .pending {
            color: #fef3c7;
            background: #a16207;
        }

        .buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 25px;
        }

        .receipt-btn,
        .logout-btn {
            display: block;
            padding: 14px;
            border-radius: 10px;
            color: #fff;
            text-align: center;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            transition: .2s ease;
        }

        .receipt-btn {
            background: linear-gradient(135deg, #2563eb, #06b6d4);
        }

        .logout-btn {
            background: rgba(255, 255, 255, .13);
        }

        .receipt-btn:hover,
        .logout-btn:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, .24);
        }

        .footer {
            padding: 0 28px 24px;
            color: #93c5fd;
            text-align: center;
            font-size: 11px;
        }

        @media (max-width: 600px) {
            body {
                padding: 15px 10px;
            }

            .top-bar {
                padding: 12px 16px;
            }

            .hero {
                padding: 28px 20px;
            }

            .hero h1 {
                font-size: 23px;
            }

            .content {
                padding: 20px;
            }

            .details-grid,
            .buttons {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <main class="profile-card">

        <div class="top-bar">
            <span>GLOBAL SERVICES</span>
            <span class="secure">● SAFE & SECURE</span>
        </div>

        <section class="hero">
            <div class="avatar">
                ${escapeHTML(
                    String(studentName)
                        .charAt(0)
                        .toUpperCase()
                )}
            </div>

            <h1>${escapeHTML(studentName)}</h1>

            <p>Gulab Service Institute Student Profile</p>
        </section>

        <section class="content">

            <div class="roll-number">
                STUDENT ROLL NUMBER

                <span>
                    ${escapeHTML(rollNumber)}
                </span>
            </div>

            <div class="details-grid">

                <div class="detail-box">
                    <small>Mobile Number</small>
                    <strong>${escapeHTML(mobile)}</strong>
                </div>

                <div class="detail-box">
                    <small>Age</small>
                    <strong>
                        ${escapeHTML(student.age || "-")} Years
                    </strong>
                </div>

                <div class="detail-box">
                    <small>Class / Course</small>
                    <strong>${escapeHTML(course)}</strong>
                </div>

                <div class="detail-box">
                    <small>Subscription Plan</small>
                    <strong>
                        ${escapeHTML(student.plan || "-")}
                    </strong>
                </div>

                <div class="detail-box">
                    <small>Total Fee</small>
                    <strong>₹${amount}</strong>
                </div>

                <div class="detail-box">
                    <small>Payment Status</small>

                    <span class="status ${
                        paymentSuccess
                            ? "success"
                            : "pending"
                    }">
                        ${
                            paymentSuccess
                                ? "Success"
                                : "Pending"
                        }
                    </span>
                </div>

            </div>

            <div class="buttons">

                <a
                    href="/admin/student-receipt/${escapeHTML(studentId)}"
                    target="_blank"
                    class="receipt-btn"
                >
                    ⬇ Download Receipt
                </a>

                <a
                    href="/student-logout"
                    class="logout-btn"
                >
                    🚪 Logout
                </a>

            </div>

        </section>

        <div class="footer">
            GLOBAL SERVICES • Your education, our commitment
        </div>

    </main>

</body>
</html>
    `;
}


module.exports = StudentInformation;