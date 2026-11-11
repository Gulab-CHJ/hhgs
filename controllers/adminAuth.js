// // const bcrypt = require("bcrypt");
// // const Admin = require("../models/Admin");

// // const AdminLogin = require("../pages/adminLogin");
// // const AdminDashboard = require("../pages/dashboard");

// // async function login(req, res) {
// //     try {
// //         const { username, password } = req.body;

// //         const admin = await Admin.findOne({ username });

// //         if (!admin) {
// //             return res.send(AdminLogin("Username Not Found"));
// //         }

// //         const match = await bcrypt.compare(password, admin.password);

// //         if (!match) {
// //             return res.send(AdminLogin("Wrong Password"));
// //         }

// //         return res.send(AdminDashboard());

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send(err.message);
// //     }
// // }

// // module.exports = { login };

// const bcrypt = require("bcrypt");
// const Admin = require("../models/Admin");

// const AdminLogin = require("../pages/adminLogin");
// const AdminDashboard = require("../pages/dashboard");

// const Doctor = require("../models/Doctor");
// const Student = require("../models/Student");
// const Service = require("../models/Service");
// const Banner = require("../models/Banner");


// async function login(req, res) {
//     try {
//         const { username, password } = req.body;

//         const admin = await Admin.findOne({ username });

//         if (!admin) {
//             return res.send(AdminLogin("Username Not Found"));
//         }

//         const match = await bcrypt.compare(password, admin.password);

//         if (!match) {
//             return res.send(AdminLogin("Wrong Password"));
//         }

//         req.session.adminId = admin._id;


//         // Dashboard counts
//         const doctorCount = await Doctor.countDocuments();
//         const studentCount = await Student.countDocuments();
//         const serviceCount = await Service.countDocuments();
//         const bannerCount = await Banner.countDocuments();


//         const data = {
//             doctorCount,
//             studentCount,
//             serviceCount,
//             bannerCount
//         };


//         console.log("=== LOGIN DASHBOARD DATA ===");
//         console.log(data);


//         return req.session.save((err) => {

//     if (err) {
//         console.error("ADMIN SESSION SAVE ERROR:", err);

//         return res.status(500).send(
//             "Admin session save failed"
//         );
//     }

//     return res.redirect("/admin/admindashboard");

// });


//     } catch (err) {

//         console.error(err);
//         res.status(500).send(err.message);

//     }
// }


// module.exports = { login };





const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const AdminLogin = require("../pages/adminLogin");


// ============================================
// ADMIN LOGIN CONTROLLER
// ============================================

async function login(req, res) {

    try {

        const username = String(
            req.body.username || ""
        ).trim();

        const password = String(
            req.body.password || ""
        );

        // =====================================
        // VALIDATION
        // =====================================

        if (!username || !password) {

            return res.send(
                AdminLogin("Username and Password required")
            );

        }


        // =====================================
        // FIND ADMIN
        // =====================================

        const admin = await Admin.findOne({
            username: username
        });


        if (!admin) {

            return res.send(
                AdminLogin("Username Not Found")
            );

        }


        // =====================================
        // CHECK PASSWORD
        // =====================================

        const match = await bcrypt.compare(
            password,
            admin.password
        );


        if (!match) {

            return res.send(
                AdminLogin("Wrong Password")
            );

        }


        // =====================================
        // CREATE ADMIN SESSION
        // =====================================

        req.session.adminId = String(admin._id);


        // =====================================
        // SAVE SESSION BEFORE REDIRECT
        // =====================================

        return req.session.save((err) => {

            if (err) {

                console.error(
                    "ADMIN SESSION SAVE ERROR:",
                    err
                );

                return res.status(500).send(
                    "Admin session save failed"
                );

            }


            console.log(
                "ADMIN LOGIN SUCCESS:",
                admin.username
            );


            return res.redirect(
                "/admin/admindashboard"
            );

        });


    } catch (err) {

        console.error(
            "ADMIN LOGIN ERROR:",
            err
        );

        return res.status(500).send(
            "Admin Login Error: " + err.message
        );

    }

}


// ============================================
// EXPORT
// ============================================

module.exports = {
    login
};
