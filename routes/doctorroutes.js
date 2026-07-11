// const express = require("express");
// const router = express.Router();

// const Doctor = require("../models/Doctor");

// router.get("/:id", async (req, res) => {

//     try {

//         const doctor = await Doctor.findById(req.params.id);

//         if (!doctor) {
//             return res.send("Doctor not found");
//         }

//         res.send(`
// <!DOCTYPE html>
// <html>

// <head>

// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <title>${doctor.name}</title>

// <style>

// *{
// margin:0;
// padding:0;
// box-sizing:border-box;
// font-family:Arial,sans-serif;
// }

// body{
// background:#f5f5f5;
// padding:30px;
// }

// .box{
// max-width:700px;
// margin:auto;
// background:#fff;
// padding:25px;
// border-radius:10px;
// box-shadow:0 2px 15px rgba(0,0,0,.15);
// text-align:center;
// }

// img{
// width:180px;
// height:180px;
// object-fit:cover;
// border-radius:50%;
// margin-bottom:20px;
// }

// h2{
// margin-bottom:20px;
// }

// p{
// margin:12px 0;
// font-size:16px;
// }

// a{
// display:inline-block;
// margin-top:20px;
// padding:10px 20px;
// background:#2563eb;
// color:#fff;
// text-decoration:none;
// border-radius:5px;
// }

// </style>

// </head>

// <body>

// <div class="box">

// <img src="${doctor.image}" alt="${doctor.name}">

// <h2>${doctor.name}</h2>

// <p><b>Degree :</b> ${doctor.degree || ""}</p>

// <p><b>Specialization :</b> ${doctor.specialization || ""}</p>

// <p><b>Experience :</b> ${doctor.experience || ""}</p>

// <p><b>Hospital :</b> ${doctor.hospital || ""}</p>

// <p><b>Phone :</b> ${doctor.phone || ""}</p>

// <p><b>Email :</b> ${doctor.email || ""}</p>

// <p><b>Address :</b> ${doctor.address || ""}</p>

// <p>${doctor.description || ""}</p>

// <a href="/">⬅ Back</a>

// </div>

// </body>

// </html>
// `);

//     } catch (err) {

//         console.error(err);
//         res.status(500).send(err.message);

//     }

// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const Doctor = require("../models/modelsDoctor");

const AddDoctor = require("../pages/addpages/AddDoctor");

router.get("/doctor/add", (req, res) => {

    res.send(AddDoctor());

});

router.post(
    "/doctor/add",
    upload.single("image"),
    async (req, res) => {

        try {

            const doctor = new Doctor({

                name: req.body.name,

                image: "/uploads/" + req.file.filename,

                specialist: req.body.specialist,

                qualification: req.body.qualification,

                experience: req.body.experience,

                hospital: req.body.hospital,

                mobile: req.body.mobile,

                email: req.body.email,

                fee: req.body.fee,

                address: req.body.address,

                about: req.body.about

            });

            await doctor.save();

            res.redirect("/doctor/all");

        } catch (err) {

            console.log(err);

            res.status(500).send(err.message);

        }

    }
);