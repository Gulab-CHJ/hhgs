// // const Home = require("../pages/Homepages");

// // router.get("/", async (req, res) => {
// //     try {
// //         const services = await Service.find();
// //         const students = await Student.find();
// //         const doctors = await Doctor.find();
// //         const banner = await BannerModel.findOne();

// //         res.send(
// //             Home({
// //                 banner,
// //                 doctors,
// //                 services,
// //                 students,
// //             })
// //         );

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send(err.message);
// //     }
// // });

// const express = require("express");
// const router = express.Router();

// const Home = require("../pages/Homepages");

// const BannerModel = require("../models/modelsBanner");
// const Service = require("../models/modelsService");
// const Student = require("../models/modelsStudent");
// const Doctor = require("../models/modelsDoctor");
// const Poster = require("../models/modelsPoster");



// router.get("/", async (req, res) => {
//     try {
//         const services = await Service.find();
//         const students = await Student.find();
//         const doctors = await Doctor.find();
//         const banner = await BannerModel.findOne();
//         const posters = await Poster.find();

//         res.send(
//             Home({
//                 banner,
//                 posters,
//                 doctors,
//                 services,
//                 students,
//             })
//         );

//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.message);
//     }
// });

// module.exports = router;