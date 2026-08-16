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
            background: linear-gradient(135deg, #2563eb, #06b6d4);
        }

        .card {
            width: 100%;
            max-width: 560px;
            margin: auto;
            padding: 28px;
            border-radius: 18px;
            background: #ffffff;
            box-shadow: 0 18px 40px rgba(0, 0, 0, .2);
        }

        h1 {
            margin: 0 0 22px;
            color: #1e3a8a;
            text-align: center;
        }

        label {
            display: block;
            margin: 15px 0 7px;
            color: #1e3a8a;
            font-weight: bold;
        }

        input,
        select {
            width: 100%;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            font-size: 15px;
        }

        input:focus,
        select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 8px rgba(37, 99, 235, .25);
        }

        .roll-box {
            margin-top: 17px;
            padding: 13px;
            border-radius: 8px;
            color: #1d4ed8;
            background: #dbeafe;
            text-align: center;
            font-weight: bold;
        }

        button {
            width: 100%;
            margin-top: 24px;
            padding: 13px;
            border: none;
            border-radius: 8px;
            color: #ffffff;
            background: #2563eb;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            background: #1d4ed8;
        }

        .back {
            display: block;
            margin-top: 18px;
            color: #2563eb;
            text-align: center;
            text-decoration: none;
        }

    </style>

</head>

<body>

    <div class="card">

        <h1>Edit Student</h1>

        <form
            method="POST"
            action="/admin/edit-student/${student._id}"
        >

            <label>Student Name</label>

            <input
                type="text"
                name="name"
                value="${escapeHTML(student.name)}"
                required
            >

            <label>Mobile Number</label>

            <input
                type="tel"
                name="mobile"
                value="${escapeHTML(student.mobile)}"
                required
            >

            <label>Age</label>

            <input
                type="number"
                name="age"
                value="${escapeHTML(student.age)}"
                min="3"
                max="100"
            >

            <label>Class / Course</label>

            <input
                type="text"
                name="course"
                value="${escapeHTML(student.course)}"
                required
            >

            <div class="roll-box">
                Roll Number: ${escapeHTML(student.rollNo)}
            </div>

            <label>New Password</label>

            <input
                type="password"
                name="password"
                placeholder="Leave empty to keep old password"
            >

            <label>Payment Plan</label>

            <select
                name="plan"
                id="plan"
            >

                <option
                    value="1 Month"
                    ${student.plan === "1 Month" ? "selected" : ""}
                >
                    1 Month — ₹500
                </option>

                <option
                    value="6 Months"
                    ${student.plan === "6 Months" ? "selected" : ""}
                >
                    6 Months — ₹2500
                </option>

            </select>

            <label>Amount</label>

            <input
                type="number"
                name="amount"
                id="amount"
                value="${escapeHTML(student.amount)}"
                required
            >

            <label>Payment Status</label>

            <select name="paymentStatus">

                <option
                    value="Pending"
                    ${student.paymentStatus === "Pending" ? "selected" : ""}
                >
                    Pending
                </option>

                <option
                    value="Success"
                    ${student.paymentStatus === "Success" ? "selected" : ""}
                >
                    Success
                </option>

            </select>

            <button type="submit">
                Update Student
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

        plan.addEventListener("change", () => {

            if (plan.value === "1 Month") {
                amount.value = 500;
            }

            if (plan.value === "6 Months") {
                amount.value = 2500;
            }

        });

    </script>

</body>

</html>
`;

}

module.exports = EditStudent;