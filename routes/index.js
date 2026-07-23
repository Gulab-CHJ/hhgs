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

const express = require("express");
const router = express.Router();

const Banner = require("../models/Banner");
const Doctor = require("../models/Doctor"); // Add this
const Home = require("../pages/Homepages");

router.get("/", async (req, res) => {

    try {

        const banners = await Banner.find({
            active: true
        });

        const doctors = await Doctor.find().sort({ createdAt: -1 });

        res.send(Home(banners, doctors));

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

});

module.exports = router;