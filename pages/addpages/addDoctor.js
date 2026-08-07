// // // // function AddDoctor() {
// // // //     return `
// // // // <!DOCTYPE html>
// // // // <html lang="en">
// // // // <head>

// // // // <meta charset="UTF-8">
// // // // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // // // <title>Add Doctor</title>

// // // // <link rel="stylesheet" href="/css/admin.css">

// // // // </head>

// // // // <body>

// // // // <div class="login-container">

// // // // <div class="login-card">

// // // // <h2>Add Doctor</h2>

// // // // <form action="/admin/add-doctor" method="POST" enctype="multipart/form-data">

// // // // <input
// // // // type="text"
// // // // name="name"
// // // // placeholder="Doctor Name"
// // // // required
// // // // >

// // // // <input
// // // // type="text"
// // // // name="qualification"
// // // // placeholder="Qualification (MBBS, MD...)"
// // // // required
// // // // >

// // // // <input
// // // // type="text"
// // // // name="speciality"
// // // // placeholder="Specialization"
// // // // required
// // // // >

// // // // <input
// // // // type="text"
// // // // name="experience"
// // // // placeholder="Experience"
// // // // required
// // // // >

// // // // <input
// // // // type="text"
// // // // name="clinic"
// // // // placeholder="Hospital / Clinic"
// // // // required
// // // // >

// // // // <input
// // // // type="text"
// // // // name="phone"
// // // // placeholder="Phone Number"
// // // // required
// // // // >

// // // // <input
// // // // type="email"
// // // // name="email"
// // // // placeholder="Email"
// // // // >

// // // // <input
// // // // type="password"
// // // // name="password"
// // // // placeholder="Login Password"
// // // // required
// // // // >

// // // // <textarea
// // // // name="description"
// // // // placeholder="Doctor Description"
// // // // rows="4"
// // // // ></textarea>

// // // // <input
// // // // type="text"
// // // // name="address"
// // // // placeholder="Address"
// // // // required
// // // // >

// // // // <input
// // // // type="file"
// // // // name="image"
// // // // accept="image/*"
// // // // required
// // // // >

// // // // <button type="submit">
// // // // Save Doctor
// // // // </button>

// // // // </form>

// // // // <br>

// // // // <a href="/admin/manage-doctors">
// // // // Manage Doctors
// // // // </a>

// // // // </div>

// // // // </div>

// // // // </body>

// // // // </html>
// // // // `;
// // // // }

// // // // module.exports = AddDoctor;

// // // function AddDoctor() {
// // //     return `
// // // <!DOCTYPE html>
// // // <html lang="en">
// // // <head>

// // // <meta charset="UTF-8">
// // // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // // <title>Add Doctor</title>

// // // <link rel="stylesheet" href="/css/admin.css">

// // // </head>

// // // <body>


// // // <div class="login-container">


// // // <div class="login-card">


// // // <h2>Add Doctor</h2>


// // // <form action="/admin/add-doctor" method="POST" enctype="multipart/form-data">


// // // <input
// // // type="text"
// // // name="name"
// // // placeholder="Doctor Name"
// // // required
// // // >


// // // <input
// // // type="text"
// // // name="qualification"
// // // placeholder="Qualification (MBBS, MD...)"
// // // required
// // // >


// // // <input
// // // type="text"
// // // name="speciality"
// // // placeholder="Specialization"
// // // required
// // // >


// // // <input
// // // type="text"
// // // name="experience"
// // // placeholder="Experience"
// // // required
// // // >


// // // <input
// // // type="text"
// // // name="clinic"
// // // placeholder="Hospital / Clinic"
// // // required
// // // >


// // // <input
// // // type="text"
// // // name="phone"
// // // placeholder="Phone Number"
// // // required
// // // >


// // // <input
// // // type="email"
// // // name="email"
// // // placeholder="Email"
// // // >


// // // <input
// // // type="password"
// // // name="password"
// // // placeholder="Login Password"
// // // required
// // // >



// // // <textarea
// // // name="description"
// // // placeholder="Doctor Description"
// // // rows="4"
// // // ></textarea>



// // // <input
// // // type="text"
// // // name="address"
// // // placeholder="Address"
// // // required
// // // >




// // // <!-- ================= DOCTOR TIMING ================= -->


// // // <h3>Available Timing</h3>


// // // <label>
// // // Available Day
// // // </label>


// // // <select name="availableDay" required>

// // // <option value="">
// // // Select Day
// // // </option>

// // // <option>Monday</option>

// // // <option>Tuesday</option>

// // // <option>Wednesday</option>

// // // <option>Thursday</option>

// // // <option>Friday</option>

// // // <option>Saturday</option>

// // // <option>Sunday</option>

// // // </select>




// // // <label>
// // // Available From
// // // </label>


// // // <input
// // // type="time"
// // // name="timeFrom"
// // // required
// // // >



// // // <label>
// // // Available To
// // // </label>


// // // <input
// // // type="time"
// // // name="timeTo"
// // // required
// // // >




// // // <!-- ================= FEE ================= -->


// // // <h3>Consultation Fee</h3>


// // // <input
// // // type="number"
// // // name="fee"
// // // placeholder="Consultation Fee"
// // // required
// // // >



// // // <select name="feeType" required>

// // // <option value="">
// // // Fee Type
// // // </option>

// // // <option value="per_visit">
// // // Per Visit
// // // </option>

// // // <option value="per_month">
// // // Per Month
// // // </option>

// // // <option value="per_hour">
// // // Per Hour
// // // </option>

// // // </select>





// // // <input
// // // type="file"
// // // name="image"
// // // accept="image/*"
// // // required
// // // >




// // // <button type="submit">
// // // Save Doctor
// // // </button>



// // // </form>



// // // <br>


// // // <a href="/admin/manage-doctors">
// // // Manage Doctors
// // // </a>



// // // </div>


// // // </div>



// // // </body>

// // // </html>
// // // `;
// // // }

// // // module.exports = AddDoctor;


// // function AddDoctor() {
// // return `
// // <!DOCTYPE html>
// // <html lang="en">

// // <head>

// // <meta charset="UTF-8">
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <title>Add Doctor</title>

// // <link rel="stylesheet" href="/css/admin.css">

// // </head>

// // <body>

// // <div class="login-container">

// // <div class="login-card">

// // <h2>Add Doctor</h2>

// // <form
// // action="/admin/add-doctor"
// // method="POST"
// // enctype="multipart/form-data"
// // >

// // <input
// // type="text"
// // name="name"
// // placeholder="Doctor Name"
// // required
// // >

// // <input
// // type="text"
// // name="qualification"
// // placeholder="Qualification (MBBS, MD...)"
// // required
// // >

// // <input
// // type="text"
// // name="speciality"
// // placeholder="Specialization"
// // required
// // >

// // <input
// // type="number"
// // name="experience"
// // placeholder="Experience (Years)"
// // required
// // >

// // <input
// // type="text"
// // name="clinic"
// // placeholder="Hospital / Clinic"
// // required
// // >

// // <input
// // type="text"
// // name="phone"
// // placeholder="Phone Number"
// // required
// // >

// // <input
// // type="email"
// // name="email"
// // placeholder="Email Address"
// // >

// // <input
// // type="password"
// // name="password"
// // placeholder="Login Password"
// // required
// // >

// // <textarea
// // name="description"
// // placeholder="Doctor Description"
// // rows="4"
// // ></textarea>

// // <input
// // type="text"
// // name="address"
// // placeholder="Clinic Address"
// // required
// // >

// // <!-- ================= DOCTOR TIMING ================= -->

// // <h3>Available Timing</h3>

// // <label>Available Day</label>

// // <select
// // name="availableDay"
// // required
// // >

// // <option value="">Select Day</option>

// // <option>Monday</option>
// // <option>Tuesday</option>
// // <option>Wednesday</option>
// // <option>Thursday</option>
// // <option>Friday</option>
// // <option>Saturday</option>
// // <option>Sunday</option>

// // </select>

// // <label>Available From</label>

// // <input
// // type="time"
// // name="timeFrom"
// // required
// // >

// // <label>Available To</label>

// // <input
// // type="time"
// // name="timeTo"
// // required
// // >

// // <!-- ================= APPOINTMENT SETTINGS ================= -->

// // <h3>Appointment Settings</h3>

// // <label>Approx Time Per Patient</label>

// // <select
// // name="slotDuration"
// // required
// // >

// // <option value="">
// // Select Time
// // </option>

// // <option value="5">
// // 5 Minutes
// // </option>

// // <option value="10" selected>
// // 10 Minutes
// // </option>

// // <option value="15">
// // 15 Minutes
// // </option>

// // <option value="20">
// // 20 Minutes
// // </option>

// // <option value="25">
// // 25 Minutes
// // </option>

// // <option value="30">
// // 30 Minutes
// // </option>

// // <option value="45">
// // 45 Minutes
// // </option>

// // <option value="60">
// // 60 Minutes
// // </option>

// // </select>

// // <small
// // style="
// // display:block;
// // margin:8px 0 20px;
// // color:#64748b;
// // font-size:13px;
// // "
// // >

// // Appointment time slots will be generated automatically according to this value.

// // </small>

// // <!-- ================= CONSULTATION FEE ================= -->

// // <h3>Consultation Fee</h3>

// // <input
// // type="number"
// // name="fee"
// // placeholder="Consultation Fee (₹)"
// // required
// // >

// // <select
// // name="feeType"
// // required
// // >

// // <option value="">
// // Select Fee Type
// // </option>

// // <option value="per_visit">
// // Per Visit
// // </option>

// // <option value="per_hour">
// // Per Hour
// // </option>

// // <option value="per_day">
// // Per Day
// // </option>

// // <option value="per_week">
// // Per Week
// // </option>

// // <option value="half_month">
// // Half Month (15 Days)
// // </option>

// // <option value="per_month">
// // Per Month
// // </option>

// // </select>

// // <!-- ================= IMAGE ================= -->

// // <h3>Doctor Photo</h3>

// // <input
// // type="file"
// // name="image"
// // accept="image/*"
// // required
// // >

// // <br><br>

// // <button type="submit">
// // Save Doctor
// // </button>

// // </form>

// // <br>

// // <a href="/admin/manage-doctors">
// // Manage Doctors
// // </a>

// // </div>

// // </div>

// // </body>

// // </html>
// // `;
// // }

// // module.exports = AddDoctor;

// function AddDoctor() {
//     return `

//     <div class="form-group">
//         <label>Doctor Name</label>
//         <input
//             type="text"
//             name="name"
//             placeholder="Doctor Name"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Qualification</label>
//         <input
//             type="text"
//             name="qualification"
//             placeholder="Qualification (MBBS, MD...)"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Specialization</label>
//         <input
//             type="text"
//             name="speciality"
//             placeholder="Specialization"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Experience</label>
//         <input
//             type="number"
//             name="experience"
//             placeholder="Experience (Years)"
//             min="0"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Clinic / Hospital</label>
//         <input
//             type="text"
//             name="clinic"
//             placeholder="Hospital / Clinic"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Phone Number</label>
//         <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Email Address</label>
//         <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//         >
//     </div>

//     <div class="form-group">
//         <label>Login Password</label>
//         <input
//             type="password"
//             name="password"
//             placeholder="Login Password"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Clinic Address</label>
//         <input
//             type="text"
//             name="address"
//             placeholder="Clinic Address"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Doctor Description</label>
//         <textarea
//             name="description"
//             placeholder="Doctor Description"
//             rows="4"
//         ></textarea>
//     </div>

//     <div class="form-group">
//         <label>Available Day</label>

//         <select
//             name="availableDay"
//             required
//         >
//             <option value="">Select Day</option>
//             <option value="Every Day">Every Day</option>
//             <option value="Monday">Monday</option>
//             <option value="Tuesday">Tuesday</option>
//             <option value="Wednesday">Wednesday</option>
//             <option value="Thursday">Thursday</option>
//             <option value="Friday">Friday</option>
//             <option value="Saturday">Saturday</option>
//             <option value="Sunday">Sunday</option>
//         </select>
//     </div>

//     <div class="form-group">
//         <label>Available From</label>

//         <input
//             type="time"
//             name="timeFrom"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Available To</label>

//         <input
//             type="time"
//             name="timeTo"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Approx Time Per Patient</label>

//         <select
//             name="slotDuration"
//             required
//         >
//             <option value="">Select Duration</option>
//             <option value="5">5 Minutes</option>
//             <option value="10">10 Minutes</option>
//             <option value="15">15 Minutes</option>
//             <option value="20">20 Minutes</option>
//             <option value="30">30 Minutes</option>
//             <option value="45">45 Minutes</option>
//             <option value="60">60 Minutes</option>
//         </select>

//         <small
//             style="
//                 display:block;
//                 margin:8px 0 20px;
//                 color:#64748b;
//                 font-size:13px;
//             "
//         >
//             Appointment time slots will be generated automatically according to this value.
//         </small>
//     </div>

//     <div class="form-group">
//         <label>Consultation Fee</label>

//         <input
//             type="number"
//             name="fee"
//             placeholder="Consultation Fee (₹)"
//             min="0"
//             required
//         >
//     </div>

//     <div class="form-group">
//         <label>Fee Type</label>

//         <select
//             name="feeType"
//             required
//         >
//             <option value="">Select Fee Type</option>
//             <option value="Per Visit">Per Visit</option>
//             <option value="Per Month">Per Month</option>
//             <option value="Per Hour">Per Hour</option>
//         </select>
//     </div>

//     <div class="form-group">
//         <label>Doctor Image</label>

//         <input
//             type="file"
//             name="image"
//             accept="image/*"
//             required
//         >
//     </div>

//     <button type="submit">
//         Save Doctor
//     </button>

//     `;
// }

// module.exports = AddDoctor;


function AddDoctor() {
    return `

<style>

.add-doctor-form {
    width: 100%;
    max-width: 850px;
    margin: 20px auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 18px;
    box-shadow: 0 10px 35px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
}

.add-doctor-title {
    margin-bottom: 25px;
    text-align: center;
}

.add-doctor-title h2 {
    margin: 0;
    font-size: 28px;
    color: #0f172a;
}

.add-doctor-title p {
    margin-top: 8px;
    color: #64748b;
    font-size: 14px;
}

.doctor-form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full {
    grid-column: 1 / -1;
}

.form-group label {
    margin-bottom: 7px;
    font-size: 14px;
    font-weight: 600;
    color: #334155;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    outline: none;
    background: #f8fafc;
    color: #0f172a;
    font-size: 14px;
    transition: 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #2563eb;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.10);
}

.form-group textarea {
    resize: vertical;
    min-height: 110px;
}

.form-help {
    display: block;
    margin-top: 7px;
    color: #64748b;
    font-size: 12px;
    line-height: 1.5;
}

.time-section {
    grid-column: 1 / -1;
    margin-top: 5px;
    padding: 20px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
}

.time-section-title {
    margin: 0 0 18px;
    font-size: 17px;
    color: #0f172a;
}

.time-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.fee-section {
    grid-column: 1 / -1;
    padding: 20px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
}

.fee-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.image-box {
    grid-column: 1 / -1;
}

.image-box input[type="file"] {
    padding: 10px;
    background: #ffffff;
    cursor: pointer;
}

.save-doctor-btn {
    grid-column: 1 / -1;
    width: 100%;
    padding: 14px;
    margin-top: 5px;
    border: none;
    border-radius: 11px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s ease;
}

.save-doctor-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(37,99,235,0.25);
}

@media (max-width: 700px) {

    .add-doctor-form {
        padding: 20px;
        margin: 10px;
        border-radius: 14px;
    }

    .doctor-form-grid {
        grid-template-columns: 1fr;
    }

    .form-group.full,
    .time-section,
    .fee-section,
    .image-box,
    .save-doctor-btn {
        grid-column: 1;
    }

    .time-grid,
    .fee-grid {
        grid-template-columns: 1fr;
    }

    .add-doctor-title h2 {
        font-size: 23px;
    }

}

</style>


<form
    class="add-doctor-form"
    action="/admin/add-doctor"
    method="POST"
    enctype="multipart/form-data"
>

    <div class="add-doctor-title">
        <h2>👨‍⚕️ Add Doctor</h2>
        <p>Add doctor profile and appointment details</p>
    </div>


    <div class="doctor-form-grid">

        <!-- Doctor Name -->

        <div class="form-group">
            <label>Doctor Name</label>

            <input
                type="text"
                name="name"
                placeholder="Dr. Md Akhlak Ahmad"
                required
            >
        </div>


        <!-- Qualification -->

        <div class="form-group">
            <label>Qualification</label>

            <input
                type="text"
                name="qualification"
                placeholder="MBBS, MD..."
                required
            >
        </div>


        <!-- Specialization -->

        <div class="form-group">
            <label>Specialization</label>

            <input
                type="text"
                name="speciality"
                placeholder="General Physician"
                required
            >
        </div>


        <!-- Experience -->

        <div class="form-group">
            <label>Experience</label>

            <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                min="0"
                required
            >
        </div>


        <!-- Clinic -->

        <div class="form-group">
            <label>Clinic / Hospital</label>

            <input
                type="text"
                name="clinic"
                placeholder="Clinic Name"
                required
            >
        </div>


        <!-- Phone -->

        <div class="form-group">
            <label>Phone Number</label>

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
            >
        </div>


        <!-- Email -->

        <div class="form-group">
            <label>Email Address</label>

            <input
                type="email"
                name="email"
                placeholder="Email Address"
            >
        </div>


        <!-- Password -->

        <div class="form-group">
            <label>Login Password</label>

            <input
                type="password"
                name="password"
                placeholder="Login Password"
                required
            >
        </div>


        <!-- Address -->

        <div class="form-group full">
            <label>Clinic Address</label>

            <input
                type="text"
                name="address"
                placeholder="Full Clinic Address"
                required
            >
        </div>


        <!-- Description -->

        <div class="form-group full">
            <label>Doctor Description</label>

            <textarea
                name="description"
                placeholder="Doctor Description"
                rows="4"
            ></textarea>
        </div>


        <!-- Timing -->

        <div class="time-section">

            <h3 class="time-section-title">
                🕐 Available Timing
            </h3>

            <div class="time-grid">


                <!-- Available Day -->

                <div class="form-group">

                    <label>Available Day</label>

                    <select
                        name="availableDay"
                        required
                    >

                        <option value="">
                            Select Day
                        </option>

                        <option value="Every Day">
                            Every Day
                        </option>

                        <option value="Monday">
                            Monday
                        </option>

                        <option value="Tuesday">
                            Tuesday
                        </option>

                        <option value="Wednesday">
                            Wednesday
                        </option>

                        <option value="Thursday">
                            Thursday
                        </option>

                        <option value="Friday">
                            Friday
                        </option>

                        <option value="Saturday">
                            Saturday
                        </option>

                        <option value="Sunday">
                            Sunday
                        </option>

                    </select>

                </div>


                <!-- From -->

                <div class="form-group">

                    <label>Available From</label>

                    <input
                        type="time"
                        name="timeFrom"
                        required
                    >

                </div>


                <!-- To -->

                <div class="form-group">

                    <label>Available To</label>

                    <input
                        type="time"
                        name="timeTo"
                        required
                    >

                </div>


            </div>


            <small class="form-help">

                Appointment time slots will be generated
                automatically according to the selected duration.

            </small>

        </div>


        <!-- Slot Duration -->

        <div class="form-group">

            <label>
                Approx Time Per Patient
            </label>

            <select
                name="slotDuration"
                required
            >

                <option value="">
                    Select Duration
                </option>

                <option value="5">
                    5 Minutes
                </option>

                <option value="10">
                    10 Minutes
                </option>

                <option value="15">
                    15 Minutes
                </option>

                <option value="20">
                    20 Minutes
                </option>

                <option value="30">
                    30 Minutes
                </option>

                <option value="45">
                    45 Minutes
                </option>

                <option value="60">
                    60 Minutes
                </option>

            </select>

        </div>


        <!-- Consultation Fee -->

        <div class="fee-section">

            <div class="fee-grid">

                <div class="form-group">

                    <label>
                        Consultation Fee
                    </label>

                    <input
                        type="number"
                        name="fee"
                        placeholder="Consultation Fee (₹)"
                        min="0"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Fee Type
                    </label>

                    <select
                        name="feeType"
                        required
                    >

                        <option value="">
                            Select Fee Type
                        </option>

                        <option value="Per Visit">
                            Per Visit
                        </option>

                        <option value="Per Month">
                            Per Month
                        </option>

                        <option value="Per Hour">
                            Per Hour
                        </option>

                    </select>

                </div>

            </div>

        </div>


        <!-- Doctor Image -->

        <div class="form-group image-box">

            <label>
                Doctor Profile Image
            </label>

            <input
                type="file"
                name="image"
                accept="image/*"
                required
            >

        </div>


        <!-- Save -->

        <button
            type="submit"
            class="save-doctor-btn"
        >
            💾 Save Doctor
        </button>

    </div>

</form>

`;
}

module.exports = AddDoctor;