// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema({
//     title: String,
//     image: String,
//     link: String,      // YouTube ya kisi page ka URL
//     active: {
//         type: Boolean,
//         default: true
//     }
// });

// module.exports =
//     mongoose.models.Banner ||
//     mongoose.model("Banner", bannerSchema);

const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    link: {
        type: String,
        default: "#"
    },

    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);