const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.resolve(__dirname, "../public/uploads");

console.log("Current __dirname:", __dirname);
console.log("Upload Path:", uploadPath);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("Uploads folder created");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file to:", uploadPath);
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        console.log("File Name:", fileName);
        cb(null, fileName);
    }
});

module.exports = multer({ storage });