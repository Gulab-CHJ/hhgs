const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");


const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "hhgs-banners",

        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ],

        public_id: (req, file) => {

            return Date.now() + "-" + file.originalname.split(".")[0];

        }

    }

});


const upload = multer({

    storage: storage,

    limits: {

        fileSize: 20 * 1024 * 1024   // 20 MB

    }

});


module.exports = upload;