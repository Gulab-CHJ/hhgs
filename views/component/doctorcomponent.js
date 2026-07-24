// function DoctorSection(doctors = []) {

//     let cards = "";

//     if (doctors.length === 0) {

//         cards = `
//         <div class="no-doctor">
//             <h3>No Doctors Available</h3>
//         </div>
//         `;

//     } else {

//         doctors.forEach((doctor) => {

//             cards += `
//             <div class="doctor-card">

//                 <div class="doctor-img">
//                     <img src="${doctor.image}" alt="${doctor.name}">
//                 </div>

//                 <div class="doctor-body">

//                     <h3>${doctor.name}</h3>

//                     <p class="degree">
//                         ${doctor.degree || ""}
//                     </p>

//                     <p class="speciality">
//                         ${doctor.specialization || ""}
//                     </p>

//                     <p class="hospital">
//                         ${doctor.hospital || ""}
//                     </p>

//                     <div class="doctor-btns">

//                         <a href="tel:${doctor.phone}" class="call-btn">
//                             📞 Call
//                         </a>

//                         <a
//                         href="https://wa.me/91${doctor.phone}?text=Hello Doctor"
//                         target="_blank"
//                         class="whatsapp-btn">
//                             WhatsApp
//                         </a>

//                     </div>

//                 </div>

//             </div>
//             `;
//         });

//     }

//     return `

// <style>

// .doctor-section{

//     width:100%;
//     max-width:1400px;
//     margin:60px auto;
//     padding:30px 20px;

// }


// .doctor-title{

//     text-align:center;
//     font-size:38px;
//     font-weight:800;
//     margin-bottom:40px;
//     color:#0f3d91;
//     position:relative;

// }


// .doctor-title::after{

//     content:"";
//     width:80px;
//     height:4px;
//     background:#16a34a;
//     display:block;
//     margin:12px auto;
//     border-radius:20px;

// }



// /* GRID */

// .doctor-grid{

//     display:grid;
//     grid-template-columns:repeat(auto-fit,minmax(280px,320px));
//     gap:30px;
//     justify-content:center;

// }




// /* CARD */

// .doctor-card{

//     background:
//     linear-gradient(
//     145deg,
//     #ffffff,
//     #f1f7ff
//     );

//     border-radius:25px;
//     overflow:hidden;

//     box-shadow:
//     0 15px 35px rgba(0,0,0,.12);

//     transition:.4s;

//     border:1px solid rgba(37,99,235,.15);

// }


// .doctor-card:hover{

//     transform:
//     translateY(-12px)
//     scale(1.03);

//     box-shadow:
//     0 25px 50px rgba(37,99,235,.25);

// }




// /* IMAGE */

// .doctor-img{

//     width:100%;
//     height:270px;

//     overflow:hidden;

//     position:relative;

// }


// .doctor-img::after{

//     content:"";
//     position:absolute;
//     bottom:0;
//     left:0;
//     width:100%;
//     height:60px;

//     background:
//     linear-gradient(
//     transparent,
//     rgba(0,0,0,.15)
//     );

// }


// .doctor-img img{

//     width:100%;
//     height:100%;
//     object-fit:cover;

//     transition:.5s;

// }


// .doctor-card:hover img{

//     transform:scale(1.08);

// }





// /* BODY */

// .doctor-body{

//     padding:25px;
//     text-align:center;

// }



// .doctor-body h3{

//     font-size:23px;
//     font-weight:800;

//     color:#0f172a;

//     margin-bottom:8px;

// }



// .degree{

//     color:#2563eb;
//     font-weight:700;
//     font-size:16px;

// }


// .speciality{

//     color:#475569;
//     margin:8px;

// }


// .hospital{

//     color:#64748b;
//     font-size:14px;

// }





// /* BUTTON */

// .doctor-btns{

//     display:flex;
//     gap:12px;
//     margin-top:22px;

// }



// .doctor-btns a{

//     flex:1;

//     padding:13px;

//     border-radius:30px;

//     color:white;

//     text-decoration:none;

//     font-weight:700;

//     transition:.3s;

// }



// .call-btn{

//     background:
//     linear-gradient(135deg,#2563eb,#1d4ed8);

// }



// .whatsapp-btn{

//     background:
//     linear-gradient(135deg,#16a34a,#15803d);

// }



// .doctor-btns a:hover{

//     transform:scale(1.05);

// }





// /* CLICK */

// .doctor-link{

//     text-decoration:none;
//     color:inherit;

// }




// /* MOBILE */

// @media(max-width:768px){


// .doctor-section{

//     padding:20px 15px;

// }


// .doctor-title{

//     font-size:30px;

// }


// .doctor-grid{

//     grid-template-columns:repeat(2,1fr);
//     gap:15px;

// }



// .doctor-img{

//     height:190px;

// }


// .doctor-body{

//     padding:15px;

// }


// .doctor-body h3{

//     font-size:17px;

// }


// .degree,
// .speciality,
// .hospital{

//     font-size:13px;

// }


// .doctor-btns{

//     flex-direction:column;

// }



// }



// @media(max-width:480px){


// .doctor-grid{

//     grid-template-columns:1fr;

// }


// }

// </style>

// <section class="doctor-section">

//     <h2 class="doctor-title">
//         Our Doctors
//     </h2>

//     <div class="doctor-grid">

//         ${cards}

//     </div>

// </section>

// `;

// }

// module.exports = DoctorSection;

function DoctorSection(doctors = []) {

    let cards = "";


    if(doctors.length === 0){

        cards = `
        <div class="no-doctor">
            <h3>No Doctors Available</h3>
        </div>
        `;

    }
    else{


        doctors.forEach((doctor)=>{


        cards += `

<div 
class="doctor-card doctor-link"

onclick="window.location.href='/admin/doctor/${doctor._id}'"

data-search="
${doctor.name || ""}
${doctor.specialization || ""}
${doctor.address || ""}
">


<div class="doctor-img">

<img 
src="${doctor.image || "/images/default-doctor.png"}"
alt="${doctor.name || "Doctor"}">

</div>



<div class="doctor-body">


<h3>
NAME : ${doctor.name || ""}
</h3>


<p class="speciality">
SPECIALIZATION : ${doctor.specialization || ""}
</p>


<p class="hospital">
ADDRESS : ${doctor.address || ""}
</p>






</div>


</div>


`;

        });


    }

return `


<style>
.doctor-link{

    text-decoration:none;
    color:inherit;
    display:block;
   cursor: pointer;

}


.doctor-section{

    width:100%;
    max-width:1400px;

    margin:60px auto;

    padding:30px 20px;

}




.doctor-title{

    text-align:center;

    font-size:38px;

    font-weight:800;

    color:#0f3d91;

    margin-bottom:20px;

}



.doctor-title::after{

    content:"";

    width:90px;

    height:4px;

    background:#16a34a;

    display:block;

    margin:12px auto;

    border-radius:20px;

}





/* SEARCH */


.doctor-search{

    max-width:520px;

    margin:0 auto 40px;

}



.doctor-search input{


    width:100%;

    padding:16px 25px;

    border-radius:50px;

    border:2px solid #dbeafe;

    outline:none;

    font-size:16px;

    background:#fff;


    box-shadow:
    0 10px 30px rgba(0,0,0,.10);


    transition:.3s;


}



.doctor-search input:focus{


    border-color:#2563eb;


    box-shadow:
    0 0 0 5px rgba(37,99,235,.15);


}





/* GRID */


.doctor-grid{

    display:grid;

    grid-template-columns:repeat(auto-fill,minmax(280px,320px));

    gap:30px;

    justify-content:start;

}






/* CARD */


.doctor-card{


    background:
    linear-gradient(
    145deg,
    #ffffff,
    #f1f7ff
    );


    border-radius:25px;


    overflow:hidden;


    border:1px solid rgba(37,99,235,.15);


    box-shadow:

    0 15px 35px rgba(0,0,0,.12);


    transition:.4s;


}



.doctor-card:hover{


    transform:

    translateY(-12px)
    scale(1.03);


    box-shadow:

    0 25px 50px rgba(37,99,235,.25);


}





/* IMAGE */


.doctor-img{


    width:100%;

    height:270px;

    overflow:hidden;


}




.doctor-img img{


    width:100%;

    height:100%;


    object-fit:cover;


    transition:.5s;


}



.doctor-card:hover img{


    transform:scale(1.08);


}
/* BODY */


.doctor-body{


    padding:25px;

    text-align:center;


}




.doctor-body h3{


    font-size:23px;

    font-weight:800;

    color:#0f172a;

    margin:0 0 10px;


}




.degree{


    color:#2563eb;

    font-weight:700;

    font-size:16px;


}




.speciality{


    color:#475569;

    margin:8px 0;


}




.hospital{


    color:#64748b;

    font-size:14px;


}






/* BUTTON */


.doctor-btns{


    display:flex;

    gap:12px;

    margin-top:22px;


}




.doctor-btns a{


    flex:1;

    padding:13px;


    border-radius:30px;


    color:#fff;


    text-decoration:none;


    font-weight:700;


    transition:.3s;


}




.call-btn{


    background:

    linear-gradient(
    135deg,
    #2563eb,
    #1d4ed8
    );


}





.whatsapp-btn{


    background:

    linear-gradient(
    135deg,
    #16a34a,
    #15803d
    );


}




.doctor-btns a:hover{


    transform:scale(1.05);


}






/* NO DOCTOR */


.no-doctor{


    text-align:center;

    padding:50px;

    background:white;

    border-radius:20px;


    box-shadow:

    0 10px 30px rgba(0,0,0,.1);


}








/* MOBILE */


@media(max-width:768px){



.doctor-section{


    padding:20px 15px;


}



.doctor-title{


    font-size:30px;


}





.doctor-grid{


    grid-template-columns:

    repeat(2,1fr);


    gap:15px;


}





.doctor-img{


    height:190px;


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



    <div class="doctor-search">


        <input

        type="text"

        id="doctorSearch"

        placeholder="Find Doctor"

        onkeyup="searchDoctor()"


        >


    </div>





    <div class="doctor-grid">


        ${cards}


    </div>



</section>





<script>


function searchDoctor(){


    let value =

    document

    .getElementById("doctorSearch")

    .value

    .toLowerCase();




    let cards =

    document

    .querySelectorAll(".doctor-card");





    cards.forEach(card => {



        let data =

        card

        .getAttribute("data-search")

        .toLowerCase();





        if(data.includes(value)){


            card.style.display="block";


        }

        else{


            card.style.display="none";


        }



    });



}



</script>


`;

}



module.exports = DoctorSection;