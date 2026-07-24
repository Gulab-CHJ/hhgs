// const express = require("express");
// const router = express.Router();

// const Banner = require("../models/Banner");
// const Home = require("../pages/Homepages");


// router.get("/", async(req,res)=>{

//     try{

//         const banners = await Banner.find({
//             active:true
//         });
//         res.send(Home(banners));

//     }catch(err){

//         console.log(err);
//         res.status(500).send(err.message);

//     }

// });


// module.exports = router;






// const express = require("express");
// const router = express.Router();

// const Banner = require("../models/Banner");
// const Doctor = require("../models/Doctor"); // Add this
// const Home = require("../pages/Homepages");

// const GovernmentPerson = require("../models/GovernmentPerson");

// router.get("/", async (req, res) => {

//     try {

//         const banners = await Banner.find({
//             active: true
//         });

//         const doctors = await Doctor.find().sort({ createdAt: -1 });

//         res.send(Home(banners, doctors));

//     } catch (err) {

//         console.log(err);

//         res.status(500).send(err.message);

//     }

// });

// module.exports = router;




const express = require("express");
const router = express.Router();

const Banner = require("../models/Banner");
const Doctor = require("../models/Doctor");
const GovernmentPerson = require("../models/GovernmentPerson");

const Home = require("../pages/Homepages");


router.get("/", async (req, res) => {

    try {


        // Get Active Banners
        const banners = await Banner.find({
            active:true
        })
        .sort({
            createdAt:-1
        });



        // Get Doctors
        const doctors = await Doctor.find()
        .sort({
            createdAt:-1
        });



        // Get Government Persons
        const governmentPersons = await GovernmentPerson.find()
        .sort({
            createdAt:-1
        });



        // Send all data to Home Page
        res.send(
            Home(
                banners,
                doctors,
                governmentPersons
            )
        );


    } catch(err) {


        console.log("HOME ERROR:", err);

        res.status(500)
        .send(err.message);


    }

});


module.exports = router;