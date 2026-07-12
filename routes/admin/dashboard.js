const express = require("express");
const router = express.Router();

const AdminDashboard = require("../../pages/adminDashboardpages");

router.get("/dashboard", (req, res) => {

    res.send(AdminDashboard({
        doctorCount: 0,
        studentCount: 0,
        serviceCount: 0,
        bannerCount: 0,
        orderCount: 0,
        userCount: 0,
        revenue: 0,
        todayRegistration: 0
    }));

});

module.exports = router;