const express = require("express");
const router = express.Router();
const dashbord = require("../pages/dashboard");
const AdminLogin = require("../pages/adminLogin");
const { login } = require("../controllers/adminAuth");
const AdminController = require("../controllers/adminController");
const upload = require("../config/multer");


router.get("/", (req, res) => {
    res.send(AdminLogin());
});

// Login submit
router.post("/login", login);

// Dashboard
router.get("/admindashboard", (req, res) => {
    res.send(dashboard());
});

// router.get("/manage-banners", AdminController.manageBanners);
// router.get("/add-banner", adminController.addBannerPage);
// router.post("/add-banner", adminController.saveBanner);
router.get("/manage-banners", AdminController.manageBanners);

router.get("/add-banner", AdminController.addBannerPage);

router.post(
    "/add-banner",
    upload.single("image"),
    AdminController.saveBanner
);

router.get("/delete-banner/:id", AdminController.deleteBanner);

module.exports = router;