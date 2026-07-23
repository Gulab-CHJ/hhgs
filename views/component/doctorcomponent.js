function DoctorSection(doctors = []) {

    let cards = "";

    if (doctors.length === 0) {

        cards = `
        <div class="no-doctor">
            <h3>No Doctors Available</h3>
        </div>
        `;

    } else {

        doctors.forEach((doctor) => {

            cards += `
            <div class="doctor-card">

                <div class="doctor-img">
                    <img src="${doctor.image}" alt="${doctor.name}">
                </div>

                <div class="doctor-body">

                    <h3>${doctor.name}</h3>

                    <p class="degree">
                        ${doctor.degree || ""}
                    </p>

                    <p class="speciality">
                        ${doctor.specialization || ""}
                    </p>

                    <p class="hospital">
                        ${doctor.hospital || ""}
                    </p>

                    <div class="doctor-btns">

                        <a href="tel:${doctor.phone}" class="call-btn">
                            📞 Call
                        </a>

                        <a
                        href="https://wa.me/91${doctor.phone}?text=Hello Doctor"
                        target="_blank"
                        class="whatsapp-btn">
                            WhatsApp
                        </a>

                    </div>

                </div>

            </div>
            `;
        });

    }

    return `

<style>

.doctor-section{

    width:100%;
    max-width:1400px;
    margin:40px auto;
    padding:20px;

}

.doctor-title{

    text-align:center;
    font-size:34px;
    font-weight:700;
    margin-bottom:25px;
    color:#1e3a8a;

}

.doctor-grid{

    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:20px;

}

.doctor-card{

    background:#fff;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 10px 25px rgba(0,0,0,.12);
    transition:.35s;

}

.doctor-card:hover{

    transform:translateY(-8px);

}

.doctor-img{

    width:100%;
    height:260px;
    overflow:hidden;

}

.doctor-img img{

    width:100%;
    height:100%;
    object-fit:cover;

}

.doctor-body{

    padding:20px;
    text-align:center;

}

.doctor-body h3{

    margin:0;
    color:#0f172a;
    font-size:22px;

}

.degree{

    color:#2563eb;
    font-weight:600;
    margin:10px 0;

}

.speciality{

    color:#555;

}

.hospital{

    color:#888;
    font-size:14px;
    margin-top:8px;

}

.doctor-btns{

    display:flex;
    gap:10px;
    margin-top:18px;

}

.doctor-btns a{

    flex:1;
    text-decoration:none;
    color:#fff;
    padding:12px;
    border-radius:8px;
    font-weight:600;

}

.call-btn{

    background:#2563eb;

}

.whatsapp-btn{

    background:#16a34a;

}

.no-doctor{

    text-align:center;
    padding:50px;
    background:#fff;
    border-radius:15px;

}

@media(max-width:768px){

.doctor-title{

    font-size:26px;

}

.doctor-grid{

    grid-template-columns:repeat(2,1fr);

}

.doctor-img{

    height:180px;

}

.doctor-body{

    padding:15px;

}

.doctor-body h3{

    font-size:17px;

}

.degree,
.speciality,
.hospital{

    font-size:13px;

}

.doctor-btns{

    flex-direction:column;

}

}

@media(max-width:480px){

.doctor-grid{

    grid-template-columns:1fr;

}

}

</style>

<section class="doctor-section">

    <h2 class="doctor-title">
        Our Doctors
    </h2>

    <div class="doctor-grid">

        ${cards}

    </div>

</section>

`;

}

module.exports = DoctorSection;