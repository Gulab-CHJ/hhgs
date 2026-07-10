// const express = require("express");
// const router = express.Router();

// const Service = require("../models/Service");

// // Service Details Page
// router.get("/:id", async (req, res) => {
//     try {
//         const service = await Service.findById(req.params.id);

//         if (!service) {
//             return res.send("Service Not Found");
//         }

//         res.send(`
// <!DOCTYPE html>
// <html>
// <head>
//     <title>${service.title}</title>
//     <link rel="stylesheet" href="/css/style.css">
// </head>
// <body>

// <h1>${service.title}</h1>

// <img src="${service.image}" width="150">

// <p>${service.description}</p>

// <a href="/">⬅ Back</a>

// </body>
// </html>
//         `);

//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Server Error");
//     }
// });

// module.exports = router;