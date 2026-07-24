function DoctorProfile(doctor){

return `

<style>

.profile-page{

max-width:1200px;
margin:40px auto;
padding:20px;
font-family:Arial;

}


.doctor-profile{

background:white;
border-radius:25px;
box-shadow:0 15px 40px rgba(0,0,0,.15);
overflow:hidden;

}


.profile-header{

background:linear-gradient(135deg,#2563eb,#16a34a);
color:white;
padding:30px;
text-align:center;

}


.profile-header img{

width:180px;
height:180px;
border-radius:50%;
object-fit:cover;
border:5px solid white;

}


.profile-body{

padding:30px;

}


.info{

display:grid;
grid-template-columns:repeat(2,1fr);
gap:20px;

}


.box{

background:#f1f5f9;
padding:15px;
border-radius:15px;

}


.patient-section{

margin-top:30px;
padding:25px;
background:#eff6ff;
border-radius:20px;

}



button{

background:#16a34a;
color:white;
border:none;
padding:14px 25px;
border-radius:30px;
font-weight:bold;

}


@media(max-width:600px){

.info{

grid-template-columns:1fr;

}

}

</style>


<div class="profile-page">


<div class="doctor-profile">


<div class="profile-header">


<img src="${doctor.image || "/images/default-doctor.png"}">


<h1>
Dr. ${doctor.name}
</h1>


<h3>
${doctor.specialization || ""}
</h3>


</div>



<div class="profile-body">


<div class="info">


<div class="box">
<b>Degree</b>
<br>
${doctor.degree || ""}
</div>


<div class="box">
<b>Experience</b>
<br>
${doctor.experience || ""} Years
</div>


<div class="box">
<b>Hospital</b>
<br>
${doctor.hospital || ""}
</div>


<div class="box">
<b>Address</b>
<br>
${doctor.address || ""}
</div>


<div class="box">
<b>Phone</b>
<br>
${doctor.phone || ""}
</div>


</div>




<div class="patient-section">


<h2>
Patient Section
</h2>


<p>
Book consultation with Dr. ${doctor.name}
</p>


<a href="/admin/consultation/${doctor._id}" class="consult-btn">
    Start Consultation
</a>


</div>



</div>


</div>


</div>


`;

}


module.exports = DoctorProfile;