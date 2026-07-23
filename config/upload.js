const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, "storage/uploads");

    },

    filename: function(req, file, cb){

        const ext = path.extname(file.originalname);

        cb(
            null,
            Date.now() + ext
        );

    }

});


const fileFilter = (req,file,cb)=>{

    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/webp"
    ){

        cb(null,true);

    }else{

        cb(new Error("Only image file allowed"),false);

    }

};



module.exports = multer({

    storage: storage,

    fileFilter:fileFilter,

    limits:{
        fileSize: 5 * 1024 * 1024
    }

});