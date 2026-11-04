// config/bannerUpload.js

const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype || !file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    }
});

function findImageUrl(obj) {
    if (!obj || typeof obj !== "object") return null;

    const urlKeys = [
        "url",
        "imageUrl",
        "image_url",
        "secure_url",
        "cdn_url",
        "public_url"
    ];

    for (const key of urlKeys) {
        if (typeof obj[key] === "string" &&
            /^https?:\/\//i.test(obj[key])) {
            return obj[key];
        }
    }

    for (const value of Object.values(obj)) {
        if (value && typeof value === "object") {
            const found = findImageUrl(value);
            if (found) return found;
        }
    }

    return null;
}

async function uploadToPixelVault(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).send("Please select a banner image.");
        }

        const apiKey = process.env.PIXELVAULT_API_KEY;
        const apiUrl = process.env.PIXELVAULT_API_URL ||
            "https://api.pixelvault.dev/v1/images";

        if (!apiKey) {
            return res.status(500).send("PixelVault API key is missing.");
        }

        const form = new FormData();

        const fileBlob = new Blob(
            [req.file.buffer],
            { type: req.file.mimetype }
        );

        form.append("file", fileBlob, req.file.originalname);

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
            body: form
        });

        const responseText = await response.text();

        let result;
        try {
            result = JSON.parse(responseText);
        } catch {
            result = { response: responseText };
        }

        if (!response.ok) {
            console.error("PIXELVAULT ERROR:", response.status, result);
            return res.status(502).send(
                "PixelVault upload failed. Please check server logs."
            );
        }

        const imageUrl = findImageUrl(result);

        if (!imageUrl) {
            console.error("PIXELVAULT RESPONSE - URL NOT FOUND:", result);
            return res.status(502).send(
                "PixelVault upload response did not contain a recognized image URL. Check server logs."
            );
        }

        req.pixelVaultImageUrl = imageUrl;
        next();

    } catch (error) {
        console.error("PIXELVAULT UPLOAD ERROR:", error);
        res.status(500).send("Banner upload failed: " + error.message);
    }
}

exports.single = (fieldName) => [
    upload.single(fieldName),
    uploadToPixelVault
];