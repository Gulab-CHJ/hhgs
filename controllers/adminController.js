const ManageBanners = require("../pages/manageBanners");

exports.manageBanners = (req, res) => {
    res.send(ManageBanners());
};