const ManageBanners = require("../pages/ManageBanner");
const AddBanner = require("../pages/addpages/addBanner");
const Banner = require("../models/Banner");

// Add Banner Page
exports.addBannerPage = (req, res) => {
    res.send(AddBanner());
};

// Save Banner
exports.saveBanner = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send("Please upload a banner image.");
        }

        const banner = new Banner({
            title: req.body.title,
            image: "/storage/uploads/" + req.file.filename,
            link: req.body.link,
            active: true
        });

        await banner.save();

        res.redirect("/admin/manage-banner");

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

// Manage Banner Page
exports.manageBanners = async (req, res) => {
    try {

        const banners = await Banner.find().sort({ createdAt: -1 });

        res.send(ManageBanners(banners));

    } catch (err) {
        console.log(err);
        res.status(500).send("Error Loading Banners");
    }
};