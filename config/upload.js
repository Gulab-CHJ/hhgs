// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("./cloudinary");


// const storage = new CloudinaryStorage({

//     cloudinary: cloudinary,

//     params: {

//         folder: "hhgs-banners",

//         allowed_formats: [
//             "jpg",
//             "jpeg",
//             "png",
//             "webp"
//         ],

//         public_id: (req, file) => {

//             return Date.now() + "-" + file.originalname.split(".")[0];

//         }

//     }

// });


// const upload = multer({

//     storage: storage,

//     limits: {

//         fileSize: 20 * 1024 * 1024   // 20 MB

//     }

// });


// module.exports = upload;




const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({

    cloudinary,

    params: async (req, file) => ({

        folder: "hhgs-products",

        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ],

        public_id:
            Date.now() +
            "-" +
            Math.round(Math.random() * 1000000)

    })

});

const upload = multer({

    storage,

    limits: {

        fileSize: 20 * 1024 * 1024   // 20MB

    },

    fileFilter: (req, file, cb) => {

        const allow = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (allow.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(new Error("Only JPG, PNG & WEBP images allowed"));

        }

    }

});

module.exports = upload;