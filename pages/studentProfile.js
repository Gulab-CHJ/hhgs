module.exports = function StudentProfile(student) {

    const name =
        student?.name || "Student";

    const roll =
        student?.roll ||
        student?.rollNo ||
        "N/A";

    const course =
        student?.className ||
        student?.course ||
        "N/A";

    const mobile =
        student?.mobile ||
        student?.phone ||
        "N/A";

    const paymentStatus =
        student?.paymentStatus ||
        "Pending";

    const isPaid =
        paymentStatus === "Paid" ||
        paymentStatus === "Success";

    const image =
        student?.image || "";

    const profileImage = image
        ? `
            <img
                src="${image}"
                alt="${name}"
                class="profile-image"
                onerror="this.style.display='none'; document.getElementById('defaultAvatar').style.display='flex';"
            >

            <div
                id="defaultAvatar"
                class="default-avatar"
                style="display:none;"
            >
                ${name.charAt(0).toUpperCase()}
            </div>
        `
        : `
            <div class="default-avatar">
                ${name.charAt(0).toUpperCase()}
            </div>
        `;


    const fatherNameRow =
        student?.fatherName
            ? `
                <div class="detail-row">
                    <span class="label">
                        Father's Name
                    </span>

                    <span class="value">
                        ${student.fatherName}
                    </span>
                </div>
            `
            : "";


    const ageRow =
        student?.age
            ? `
                <div class="detail-row">
                    <span class="label">
                        Age
                    </span>

                    <span class="value">
                        ${student.age} Years
                    </span>
                </div>
            `
            : "";


    const emailRow =
        student?.email
            ? `
                <div class="detail-row">
                    <span class="label">
                        Email
                    </span>

                    <span class="value">
                        ${student.email}
                    </span>
                </div>
            `
            : "";


    const addressRow =
        student?.address
            ? `
                <div class="detail-row">
                    <span class="label">
                        Address
                    </span>

                    <span class="value">
                        ${student.address}
                    </span>
                </div>
            `
            : "";


    const paymentPendingBox =
        !isPaid
            ? `
                <div class="payment-box">

                    <strong>
                        ⚠ Payment Pending
                    </strong>

                    आपका payment अभी pending है।
                    कृपया समय पर अपना fee जमा करें।

                </div>
            `
            : "";


    return `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ${name} - Student Profile
    </title>


    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }


        body {

            font-family:
                Arial,
                sans-serif;

            background:
                #f4f7fb;

            color:
                #222;

        }


        .header {

            background:
                linear-gradient(
                    135deg,
                    #0f766e,
                    #16a34a
                );

            color:
                white;

            text-align:
                center;

            padding:
                25px 15px;

        }


        .header h1 {

            font-size:
                27px;

            margin-bottom:
                5px;

        }


        .header p {

            font-size:
                14px;

            opacity:
                0.9;

        }


        .container {

            max-width:
                700px;

            margin:
                25px auto;

            padding:
                0 15px;

        }


        .profile-card {

            background:
                white;

            border-radius:
                18px;

            box-shadow:
                0 6px 25px
                rgba(0,0,0,0.08);

            overflow:
                hidden;

        }


        .profile-top {

            text-align:
                center;

            padding:
                30px 20px 20px;

            border-bottom:
                1px solid #eee;

        }


        .profile-image {

            width:
                110px;

            height:
                110px;

            border-radius:
                50%;

            object-fit:
                cover;

            border:
                4px solid #16a34a;

            margin-bottom:
                12px;

        }


        .default-avatar {

            width:
                110px;

            height:
                110px;

            border-radius:
                50%;

            margin:
                auto;

            margin-bottom:
                12px;

            background:
                #16a34a;

            color:
                white;

            align-items:
                center;

            justify-content:
                center;

            font-size:
                42px;

            font-weight:
                bold;

            border:
                4px solid #dcfce7;

            display:
                flex;

        }


        .student-name {

            font-size:
                24px;

            font-weight:
                bold;

            color:
                #111827;

        }


        .roll {

            display:
                inline-block;

            margin-top:
                8px;

            background:
                #dcfce7;

            color:
                #15803d;

            padding:
                6px 14px;

            border-radius:
                50px;

            font-weight:
                bold;

            font-size:
                14px;

        }


        .details {

            padding:
                22px;

        }


        .detail-row {

            display:
                flex;

            justify-content:
                space-between;

            gap:
                15px;

            padding:
                13px 0;

            border-bottom:
                1px solid #eee;

        }


        .detail-row:last-child {

            border-bottom:
                none;

        }


        .label {

            color:
                #6b7280;

            font-size:
                14px;

            font-weight:
                600;

        }


        .value {

            text-align:
                right;

            font-weight:
                600;

            color:
                #111827;

            word-break:
                break-word;

        }


        .payment-box {

            margin:
                0 22px 22px;

            padding:
                15px;

            border-radius:
                12px;

            text-align:
                center;

            background:
                #fff7ed;

            border:
                1px solid #fed7aa;

            color:
                #c2410c;

            font-size:
                14px;

            line-height:
                1.6;

        }


        .payment-box strong {

            display:
                block;

            margin-bottom:
                3px;

            font-size:
                16px;

        }


        .buttons {

            padding:
                0 22px 25px;

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            gap:
                12px;

        }


        .btn {

            display:
                block;

            text-align:
                center;

            text-decoration:
                none;

            border:
                none;

            padding:
                13px 10px;

            border-radius:
                10px;

            cursor:
                pointer;

            font-size:
                15px;

            font-weight:
                bold;

        }


        .receipt-btn {

            background:
                #16a34a;

            color:
                white;

        }


        .id-btn {

            background:
                #2563eb;

            color:
                white;

        }


        .logout-btn {

            background:
                #ef4444;

            color:
                white;

            grid-column:
                1 / -1;

        }


        .btn:hover {

            opacity:
                0.9;

        }


        .footer {

            text-align:
                center;

            font-size:
                13px;

            color:
                #777;

            padding:
                18px;

        }


        @media (max-width:500px) {

            .header h1 {

                font-size:
                    22px;

            }


            .container {

                margin:
                    15px auto;

            }


            .detail-row {

                flex-direction:
                    column;

                gap:
                    4px;

            }


            .value {

                text-align:
                    left;

            }


            .buttons {

                grid-template-columns:
                    1fr;

            }


            .logout-btn {

                grid-column:
                    auto;

            }

        }

    </style>

</head>


<body>


    <div class="header">

        <h1>
            GLOBAL SMART STUDY
        </h1>

        <p>
            Student Profile
        </p>

    </div>


    <div class="container">


        <div class="profile-card">


            <div class="profile-top">

                ${profileImage}

                <div class="student-name">
                    ${name}
                </div>

                <div class="roll">
                    Roll: ${roll}
                </div>

            </div>


            <div class="details">


                ${fatherNameRow}


                ${ageRow}


                <div class="detail-row">

                    <span class="label">
                        Class / Course
                    </span>

                    <span class="value">
                        ${course}
                    </span>

                </div>


                <div class="detail-row">

                    <span class="label">
                        Mobile Number
                    </span>

                    <span class="value">
                        ${mobile}
                    </span>

                </div>


                ${emailRow}


                ${addressRow}


                <div class="detail-row">

                    <span class="label">
                        Plan
                    </span>

                    <span class="value">
                        ${student?.plan || "N/A"}
                    </span>

                </div>


                <div class="detail-row">

                    <span class="label">
                        Total Fee
                    </span>

                    <span class="value">
                        ₹${student?.amount || 0}
                    </span>

                </div>


                <div class="detail-row">

                    <span class="label">
                        Payment Status
                    </span>

                    <span
                        class="value"
                        style="
                            color:
                            ${isPaid
                                ? "#16a34a"
                                : "#dc2626"
                            };
                        "
                    >
                        ${paymentStatus}
                    </span>

                </div>


            </div>


            ${paymentPendingBox}


            <div class="buttons">


                <a
                    href="/admin/student-receipt/${student._id}"
                    class="btn receipt-btn"
                >
                    📄 Download Receipt
                </a>


                <a
                    href="/student-id-card/${student._id}"
                    class="btn id-btn"
                >
                    🪪 Student ID Card
                </a>


                <a
                    href="/admin/student-logout"
                    class="btn logout-btn"
                >
                    Logout
                </a>


            </div>


        </div>


    </div>


    <div class="footer">

        © ${new Date().getFullYear()}
        Global Smart Study

    </div>


</body>

</html>
    `;

};