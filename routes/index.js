// // // const express = require("express");
// // // const router = express.Router();

// // // const Banner = require("../models/Banner");
// // // const Home = require("../pages/Homepages");


// // // router.get("/", async(req,res)=>{

// // //     try{

// // //         const banners = await Banner.find({
// // //             active:true
// // //         });
// // //         res.send(Home(banners));

// // //     }catch(err){

// // //         console.log(err);
// // //         res.status(500).send(err.message);

// // //     }

// // // });


// // // module.exports = router;






// // // const express = require("express");
// // // const router = express.Router();

// // // const Banner = require("../models/Banner");
// // // const Doctor = require("../models/Doctor"); // Add this
// // // const Home = require("../pages/Homepages");

// // // const GovernmentPerson = require("../models/GovernmentPerson");

// // // router.get("/", async (req, res) => {

// // //     try {

// // //         const banners = await Banner.find({
// // //             active: true
// // //         });

// // //         const doctors = await Doctor.find().sort({ createdAt: -1 });

// // //         res.send(Home(banners, doctors));

// // //     } catch (err) {

// // //         console.log(err);

// // //         res.status(500).send(err.message);

// // //     }

// // // });

// // // module.exports = router;




// // const express = require("express");
// // const router = express.Router();

// // const Banner = require("../models/Banner");
// // const Doctor = require("../models/Doctor");
// // const GovernmentPerson = require("../models/GovernmentPerson");

// // const Home = require("../pages/Homepages");


// // router.get("/", async (req, res) => {

// //     try {


// //         // Get Active Banners
// //         const banners = await Banner.find({
// //             active:true
// //         })
// //         .sort({
// //             createdAt:-1
// //         });



// //         // Get Doctors
// //         const doctors = await Doctor.find()
// //         .sort({
// //             createdAt:-1
// //         });



// //         // Get Government Persons
// //         const governmentPersons = await GovernmentPerson.find()
// //         .sort({
// //             createdAt:-1
// //         });



// //         // Send all data to Home Page
// //         res.send(
// //             Home(
// //                 banners,
// //                 doctors,
// //                 governmentPersons
// //             )
// //         );


// //     } catch(err) {


// //         console.log("HOME ERROR:", err);

// //         res.status(500)
// //         .send(err.message);


// //     }

// // });






// // module.exports = router;



// const express = require("express");
// const router = express.Router();


// const Banner = require("../models/Banner");
// const Doctor = require("../models/Doctor");
// const GovernmentPerson = require("../models/GovernmentPerson");

// const Home = require("../pages/Homepages");



// // ================= HOME PAGE =================

// router.get("/", async (req, res) => {

//     try {


//         const banners = await Banner.find({
//             active:true
//         })
//         .sort({
//             createdAt:-1
//         });



//         const doctors = await Doctor.find()
//         .sort({
//             createdAt:-1
//         });



//         const governmentPersons = await GovernmentPerson.find()
//         .sort({
//             createdAt:-1
//         });



//         res.send(
//             Home(
//                 banners,
//                 doctors,
//                 governmentPersons
//             )
//         );


//     } catch(err) {

//         console.log("HOME ERROR:",err);

//         res.status(500)
//         .send(err.message);

//     }

// });




// // ================= CONTACT PAGE =================


// router.get("/contact",(req,res)=>{


// res.send(`


// <!DOCTYPE html>
// <html>

// <head>

// <title>Contact Us</title>

// <meta name="viewport" content="width=device-width, initial-scale=1">


// <style>


// body{

// font-family:Arial;

// background:
// linear-gradient(135deg,#eef6ff,#dbeafe);

// padding:20px;

// }



// .card{

// max-width:500px;

// margin:auto;

// background:white;

// padding:30px;

// border-radius:25px;

// box-shadow:0 20px 50px #0003;

// }



// h1{

// text-align:center;

// color:#2563eb;

// }



// input,textarea{

// width:100%;

// padding:14px;

// margin:10px 0;

// border-radius:12px;

// border:1px solid #ddd;

// font-size:15px;

// }



// textarea{

// height:120px;

// }



// button{

// width:100%;

// padding:15px;

// border:none;

// border-radius:50px;

// background:
// linear-gradient(135deg,#2563eb,#06b6d4);

// color:white;

// font-size:18px;

// font-weight:bold;

// }


// </style>


// </head>


// <body>


// <div class="card">

// <h1>
// Contact Us
// </h1>


// <form action="/contact" method="POST">


// <input 
// type="text"
// name="name"
// placeholder="Your Name"
// required>



// <input 
// type="number"
// name="mobile"
// placeholder="Mobile Number"
// required>



// <textarea 
// name="message"
// placeholder="Your Service Requirement"
// required></textarea>



// <button type="submit">
// Submit Request
// </button>


// </form>


// </div>


// </body>


// </html>


// `);


// // ================= CONTACT POST =================

// router.post("/contact",(req,res)=>{


// const {
//     name,
//     mobile,
//     message
// }=req.body;



// console.log("CONTACT DATA:",{

//     name,
//     mobile,
//     message

// });



// res.send(`

// <!DOCTYPE html>
// <html>

// <head>

// <title>Success</title>

// <style>

// body{

// font-family:Arial;

// background:#eef6ff;

// text-align:center;

// padding:50px;

// }


// .box{

// background:white;

// padding:30px;

// border-radius:20px;

// max-width:400px;

// margin:auto;

// box-shadow:0 10px 30px #0003;

// }


// h1{

// color:#16a34a;

// }

// a{

// display:inline-block;

// margin-top:20px;

// padding:12px 25px;

// background:#2563eb;

// color:white;

// text-decoration:none;

// border-radius:30px;

// }

// </style>

// </head>


// <body>


// <div class="box">

// <h1>
// ✅ Request Submitted
// </h1>

// <p>
// Thank You ${name}
// </p>

// <p>
// We will contact you soon.
// </p>


// <a href="/">
// Go Home
// </a>


// </div>


// </body>

// </html>


// `);


// });





// module.exports = router;



const express = require("express");
const router = express.Router();


const Contact = require("../models/Contact");
const Banner = require("../models/Banner");
const Doctor = require("../models/Doctor");
const GovernmentPerson = require("../models/GovernmentPerson");

const Home = require("../pages/Homepages");




// ================= HOME PAGE =================


router.get("/", async (req,res)=>{

    try{


        const banners = await Banner.find({
            active:true
        })
        .sort({
            createdAt:-1
        });



        const doctors = await Doctor.find()
        .sort({
            createdAt:-1
        });



        const governmentPersons = await GovernmentPerson.find()
        .sort({
            createdAt:-1
        });



        res.send(
            Home(
                banners,
                doctors,
                governmentPersons
            )
        );


    }
    catch(err){

        console.log("HOME ERROR:",err);

        res.status(500)
        .send(err.message);

    }

});






// ================= CONTACT GET =================


router.get("/contact",(req,res)=>{


res.send(`

<!DOCTYPE html>
<html>

<head>

<title>Contact Us</title>

<meta name="viewport" content="width=device-width, initial-scale=1">


<style>


*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',Arial;
}


body{

min-height:100vh;

background:
linear-gradient(135deg,#e0f2fe,#dbeafe);

padding:20px;

}



.card{

max-width:500px;

margin:auto;

background:white;

padding:30px;

border-radius:25px;

box-shadow:
0 20px 50px rgba(0,0,0,.15);

}



h1{

text-align:center;

color:#2563eb;

margin-bottom:20px;

}



input,
textarea{


width:100%;

padding:14px;

margin:10px 0;

border-radius:12px;

border:1px solid #ddd;

font-size:15px;

}



textarea{

height:120px;

resize:none;

}



button{


width:100%;

padding:15px;

border:none;

border-radius:50px;

background:
linear-gradient(135deg,#2563eb,#06b6d4);

color:white;

font-size:18px;

font-weight:700;

cursor:pointer;

}



button:hover{

transform:translateY(-3px);

}



</style>


</head>


<body>


<div class="card">


<h1>
Contact Us
</h1>



<form action="/contact" method="POST">


<input

type="text"

name="name"

placeholder="Your Name"

required>



<input

type="number"

name="mobile"

placeholder="Mobile Number"

required>




<textarea

name="message"

placeholder="Your Service Requirement"

required></textarea>



<button type="submit">

Submit Request

</button>



</form>



</div>



</body>

</html>


`);


});







// ================= CONTACT POST =================





router.post("/contact", async (req,res)=>{


const {

name,
mobile,
message

}=req.body;



try{


const newContact = new Contact({

    name:name,

    mobile:mobile,

    message:message

});



await newContact.save();



console.log("CONTACT SAVED:", newContact);



res.send(`

<!DOCTYPE html>

<html>

<head>

<title>Success</title>

<style>

body{

font-family:Arial;
background:#eef6ff;
text-align:center;
padding:50px;

}


.box{

background:white;
padding:30px;
border-radius:20px;
max-width:400px;
margin:auto;
box-shadow:0 10px 30px #0003;

}


h1{

color:#16a34a;

}


</style>

</head>


<body>


<div class="box">

<h1>
✅ Request Submitted
</h1>


<p>
Thank You ${name}
</p>


<p>
We will contact you soon.
</p>


</div>


</body>

</html>

`);


}

catch(err){

console.log("CONTACT ERROR:",err);

res.status(500)
.send(err.message);

}


});



module.exports = router;
