// // function ServiceDetails(service) {

// // return `

// // <!DOCTYPE html>
// // <html>
// // <head>

// // <title>${service.name}</title>

// // <style>

// // body{
// // font-family:Arial;
// // background:#f1f7ff;
// // padding:30px;
// // }

// // .card{
// // background:white;
// // max-width:500px;
// // margin:auto;
// // padding:20px;
// // border-radius:15px;
// // box-shadow:0 5px 20px #ccc;
// // }

// // img{
// // width:100%;
// // border-radius:10px;
// // }

// // h1{
// // color:#0066ff;
// // }

// // </style>

// // </head>


// // <body>


// // <div class="card">

// // <img src="${service.image}">


// // <h1>${service.name}</h1>

// // <p>
// // ${service.description || ""}
// // </p>


// // </div>


// // </body>
// // </html>


// // `;

// // }


// // module.exports = ServiceDetails;


// function ServiceDetails(service) {

// return `

// <!DOCTYPE html>
// <html>
// <head>

// <title>${service.name}</title>

// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <style>

// *{
// margin:0;
// padding:0;
// box-sizing:border-box;
// font-family:Arial;
// }


// body{

// background:#f1f7ff;
// padding:20px;

// }


// .card{

// background:white;
// max-width:700px;
// margin:auto;
// padding:25px;
// border-radius:20px;

// box-shadow:
// 0 10px 30px rgba(0,0,0,.15);

// }



// img{

// width:100%;
// height:250px;
// object-fit:cover;
// border-radius:15px;

// }



// h1{

// color:#0066ff;
// margin:20px 0;

// }



// .description{

// color:#555;
// line-height:1.7;

// }



// h2{

// margin-top:25px;
// color:#111;

// }



// ul{

// margin-top:15px;
// padding-left:20px;

// }



// li{

// padding:8px 0;
// font-size:16px;

// }



// .btn{

// display:inline-block;

// margin-top:25px;

// background:#0066ff;

// color:white;

// padding:12px 25px;

// border-radius:30px;

// text-decoration:none;

// }



// </style>


// </head>


// <body>


// <div class="card">


// <img src="${service.image || '/images/no-image.png'}">



// <h1>
// ${service.name}
// </h1>



// <p class="description">

// ${service.description || 
// "Professional service available"}

// </p>



// <h2>
// Available Services
// </h2>



// <ul>


// <li>✅ Name Change / Correction</li>

// <li>✅ Date of Birth (Age) Correction</li>

// <li>✅ Address Change</li>

// <li>✅ Mobile Number Update</li>

// <li>✅ Email ID Update</li>

// <li>✅ Photo Update</li>

// <li>✅ Biometric Update</li>

// <li>✅ New Aadhaar Enrollment</li>

// <li>✅ Aadhaar Download & Print</li>

// <li>✅ PVC Aadhaar Card Order</li>


// </ul>



// <a href="/contact" class="btn">
// Apply Now
// </a>



// </div>


// </body>
// </html>

// `;

// }


// module.exports = ServiceDetails;



function ServiceDetails(service) {

return `

<!DOCTYPE html>
<html>

<head>

<title>${service.title}</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">


<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',Arial,sans-serif;
}


body{

min-height:100vh;

background:
linear-gradient(135deg,#e0f2fe,#eff6ff,#dbeafe);

padding:30px 15px;

}



/* Main Card */

.card{

background:rgba(255,255,255,.85);

backdrop-filter:blur(20px);

max-width:750px;

margin:auto;

padding:30px;

border-radius:30px;

border:1px solid rgba(255,255,255,.5);

box-shadow:

0 20px 50px rgba(0,0,0,.15);

}



/* CSC Header */

.header{

text-align:center;

padding:20px;

border-radius:20px;

background:

linear-gradient(135deg,#0066ff,#00b4d8);

color:white;

margin-bottom:25px;

box-shadow:

0 10px 25px rgba(0,102,255,.3);

}



.header h1{

color:white;

font-size:36px;

font-weight:800;

margin-bottom:8px;

}



.header p{

color:#e0f2fe;

font-size:17px;

}



/* Service Image */

img{

width:100%;

height:280px;

object-fit:cover;

border-radius:25px;

margin-bottom:20px;

box-shadow:

0 10px 25px rgba(0,0,0,.15);

}



/* Service Title */

.service-title{

font-size:30px;

color:#0f172a;

margin:20px 0;

font-weight:800;

}



/* Description */

.description{

background:#f8fafc;

padding:18px;

border-radius:15px;

color:#475569;

line-height:1.8;

font-size:16px;

border-left:5px solid #0066ff;

}



/* Feature Heading */

h2{

margin-top:30px;

color:#0f172a;

font-size:24px;

}



/* Feature List */

ul{

margin-top:15px;

padding:0;

list-style:none;

}



li{

background:#f1f5f9;

margin:10px 0;

padding:14px 18px;

border-radius:15px;

font-size:16px;

color:#334155;

transition:.3s;

border:1px solid #e2e8f0;

}



li:hover{

transform:translateX(8px);

background:#dbeafe;

}



/* Apply Button */

.btn{

display:block;

text-align:center;

margin-top:30px;

background:

linear-gradient(135deg,#0066ff,#00b4d8);

color:white;

padding:15px;

border-radius:50px;

text-decoration:none;

font-size:18px;

font-weight:700;

box-shadow:

0 10px 25px rgba(0,102,255,.35);

transition:.3s;

}



.btn:hover{

transform:translateY(-3px);

box-shadow:

0 15px 35px rgba(0,102,255,.5);

}



/* Mobile */

@media(max-width:600px){


.card{

padding:20px;

border-radius:20px;

}


.header h1{

font-size:28px;

}


img{

height:220px;

}


.service-title{

font-size:25px;

}

}

</style>


</head>


<body>

<div class="header">

<h1>
🌐 CSC Digital Services
</h1>

<p>
Fast, Safe & Secure Government Digital Services
</p>

</div>


<div class="card">

<img src="${service.image || '/images/no-image.png'}">


<h1>

${service.title}

</h1>



<p class="description">

${service.description || "Professional service available"}

</p>




<h2>
Available Services
</h2>



<ul>


${
(service.features || [])

.map(feature=>`

<li>
✅ ${feature}
</li>

`).join("")

}



</ul>



<a href="/contact" class="btn">

Apply Now

</a>



</div>


</body>


</html>


`;

}


module.exports = ServiceDetails;