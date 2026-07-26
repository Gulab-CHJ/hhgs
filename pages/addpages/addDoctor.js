// function AddDoctor() {
//     return `
// <!DOCTYPE html>
// <html lang="en">
// <head>

// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>Add Doctor</title>

// <link rel="stylesheet" href="/css/admin.css">

// </head>

// <body>

// <div class="login-container">

// <div class="login-card">

// <h2>Add Doctor</h2>

// <form action="/admin/add-doctor" method="POST" enctype="multipart/form-data">

// <input
// type="text"
// name="name"
// placeholder="Doctor Name"
// required
// >

// <input
// type="text"
// name="qualification"
// placeholder="Qualification (MBBS, MD...)"
// required
// >

// <input
// type="text"
// name="speciality"
// placeholder="Specialization"
// required
// >

// <input
// type="text"
// name="experience"
// placeholder="Experience"
// required
// >

// <input
// type="text"
// name="clinic"
// placeholder="Hospital / Clinic"
// required
// >

// <input
// type="text"
// name="phone"
// placeholder="Phone Number"
// required
// >

// <input
// type="email"
// name="email"
// placeholder="Email"
// >

// <input
// type="password"
// name="password"
// placeholder="Login Password"
// required
// >

// <textarea
// name="description"
// placeholder="Doctor Description"
// rows="4"
// ></textarea>

// <input
// type="text"
// name="address"
// placeholder="Address"
// required
// >

// <input
// type="file"
// name="image"
// accept="image/*"
// required
// >

// <button type="submit">
// Save Doctor
// </button>

// </form>

// <br>

// <a href="/admin/manage-doctors">
// Manage Doctors
// </a>

// </div>

// </div>

// </body>

// </html>
// `;
// }

// module.exports = AddDoctor;

function AddDoctor() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Add Doctor</title>

<link rel="stylesheet" href="/css/admin.css">

</head>

<body>


<div class="login-container">


<div class="login-card">


<h2>Add Doctor</h2>


<form action="/admin/add-doctor" method="POST" enctype="multipart/form-data">


<input
type="text"
name="name"
placeholder="Doctor Name"
required
>


<input
type="text"
name="qualification"
placeholder="Qualification (MBBS, MD...)"
required
>


<input
type="text"
name="speciality"
placeholder="Specialization"
required
>


<input
type="text"
name="experience"
placeholder="Experience"
required
>


<input
type="text"
name="clinic"
placeholder="Hospital / Clinic"
required
>


<input
type="text"
name="phone"
placeholder="Phone Number"
required
>


<input
type="email"
name="email"
placeholder="Email"
>


<input
type="password"
name="password"
placeholder="Login Password"
required
>



<textarea
name="description"
placeholder="Doctor Description"
rows="4"
></textarea>



<input
type="text"
name="address"
placeholder="Address"
required
>




<!-- ================= DOCTOR TIMING ================= -->


<h3>Available Timing</h3>


<label>
Available Day
</label>


<select name="availableDay" required>

<option value="">
Select Day
</option>

<option>Monday</option>

<option>Tuesday</option>

<option>Wednesday</option>

<option>Thursday</option>

<option>Friday</option>

<option>Saturday</option>

<option>Sunday</option>

</select>




<label>
Available From
</label>


<input
type="time"
name="timeFrom"
required
>



<label>
Available To
</label>


<input
type="time"
name="timeTo"
required
>




<!-- ================= FEE ================= -->


<h3>Consultation Fee</h3>


<input
type="number"
name="fee"
placeholder="Consultation Fee"
required
>



<select name="feeType" required>

<option value="">
Fee Type
</option>

<option value="per_visit">
Per Visit
</option>

<option value="per_month">
Per Month
</option>

<option value="per_hour">
Per Hour
</option>

</select>





<input
type="file"
name="image"
accept="image/*"
required
>




<button type="submit">
Save Doctor
</button>



</form>



<br>


<a href="/admin/manage-doctors">
Manage Doctors
</a>



</div>


</div>



</body>

</html>
`;
}

module.exports = AddDoctor;