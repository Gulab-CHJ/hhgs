
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");

const multer = require("multer");
const sharp = require("sharp");
const PDFDocument = require("pdfkit");
const { EdgeTTS } = require("node-edge-tts");

const app = express();

// ======================================
// TRUST PROXY - HOSTINGER
// ======================================

app.set("trust proxy", 1);

// ======================================
// DATABASE
// ======================================

require("./config/database");

// ======================================
// VIEW ENGINE
// ======================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================================
// BODY PARSER
// ======================================

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

app.use(express.json({
    limit: "2mb"
}));

// ======================================
// SESSION
// ======================================

app.use(session({
    secret: process.env.SESSION_SECRET || "HHGS_SESSION_SECRET_CHANGE_THIS",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }
}));

// ======================================
// ANALYTICS
// ======================================

const analyticsRoutes = require("./routes/analyticsRoutes");
const analyticsMiddleware = require("./middleware/analytics");

app.use(analyticsMiddleware);
app.use("/analytics", analyticsRoutes);

console.log("HHGS ANALYTICS LOADED");

// ======================================
// STATIC FILES
// ======================================

app.use("/storage", express.static(
    path.join(__dirname, "storage")
));

app.use("/uploads", express.static(
    path.join(__dirname, "uploads")
));

app.use("/doctor/public", express.static(
    path.join(__dirname, "doctor", "public")
));

// index:false prevents public/index.html
// from taking over the homepage.

app.use(express.static(
    path.join(__dirname, "public"),
    { index: false }
));

// ======================================
// GS MARKET - MAIN HOMEPAGE
// ======================================

const storeRoutes = require("./routes/storeRoutes");

// Main Homepage: https://hhgs23.com/
// Market: https://hhgs23.com/market


app.use("/market", storeRoutes);

console.log("GS MARKET HOMEPAGE LOADED");

// ======================================
// OLD HHGS HOME ROUTES
// ======================================

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// ======================================
// ADMIN
// ======================================

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

console.log("ADMIN ROUTES LOADED");

// ======================================
// DOCTOR
// ======================================

const doctorRoutes = require("./routes/doctor");
app.use("/doctor", doctorRoutes);

console.log("DOCTOR ROUTES LOADED");

// ======================================
// APPOINTMENT
// ======================================

const appointmentRoute = require("./routes/appointment");
app.use("/appointment", appointmentRoute);

console.log("APPOINTMENT ROUTES LOADED");

// ======================================
// SERVICES
// ======================================

const serviceRoutes = require("./routes/service");
app.use("/", serviceRoutes);

console.log("SERVICE ROUTES LOADED");

// ======================================
// AUTH
// ======================================

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

console.log("AUTH ROUTES LOADED");

// ======================================
// DOCTOR PUBLIC STORE
// ======================================

const storeRouter = require("./doctor/dhhpb/store");
app.use("/doctor", storeRouter);

console.log("DOCTOR PUBLIC STORE LOADED");

// ======================================
// CART
// ======================================

const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

// ======================================
// RAPIDO
// ======================================

const rapidoRouter = require("./routes/rapido");
app.use("/api/rapido", rapidoRouter);

// ======================================
// VEGETABLE SHOP
// ======================================

const vegetableRoutes = require("./routes/vegetable");
app.use("/", vegetableRoutes);

// ======================================
// RAPIDO TRACKER
// ======================================

const RapidoTracker = require("./views/RapidoTracker");

app.get("/rapido-tracker", (req, res) => {
    try {
        return res.send(RapidoTracker());
    } catch (error) {
        console.error("RAPIDO TRACKER ERROR:", error);
        return res.status(500).send("Rapido Tracker Page Error");
    }
});

// ======================================
// AI PRESENTER VIDEO
// ======================================

const AIPresenterVideo = require("./views/AIPresenterVideo");

app.get("/ai-video", (req, res) => {
    try {
        return res.send(AIPresenterVideo());
    } catch (error) {
        console.error("AI VIDEO ERROR:", error);
        return res.status(500).send("AI Video Page Error");
    }
});

// ======================================
// AI PRESENTER VOICE
// OPENAI + EDGE TTS FALLBACK
// ======================================

app.post("/api/free-presenter-voice", async (req, res) => {

    let audioPath = null;

    try {

        const text = String(req.body.text || "").trim();

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Presenter Script required."
            });
        }

        if (text.length > 4000) {
            return res.status(400).json({
                success: false,
                message: "Script बहुत लंबा है।"
            });
        }

        // OPENAI TTS

        if (process.env.OPENAI_API_KEY) {

            try {

                const aiResponse = await fetch(
                    "https://api.openai.com/v1/audio/speech",
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                "Bearer " + process.env.OPENAI_API_KEY,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            model: "gpt-4o-mini-tts",
                            voice: "onyx",
                            input: text,
                            instructions:
                                "Speak in natural, clear Hindi. Use a professional Indian male presenter style. Speak calmly and clearly like a healthcare explainer. Correctly pronounce Hindi and English product names."
                        })
                    }
                );

                if (!aiResponse.ok) {
                    throw new Error(await aiResponse.text());
                }

                const audioBuffer = Buffer.from(
                    await aiResponse.arrayBuffer()
                );

                res.setHeader("Content-Type", "audio/mpeg");
                res.setHeader("Content-Length", audioBuffer.length);
                res.setHeader("Cache-Control", "no-store");

                return res.send(audioBuffer);

            } catch (error) {
                console.error("OPENAI TTS FAILED:", error.message);
            }
        }

        // EDGE TTS FALLBACK

        audioPath = path.join(
            os.tmpdir(),
            "hhgs-" + crypto.randomUUID() + ".mp3"
        );

        const tts = new EdgeTTS({
            voice: "hi-IN-MadhurNeural",
            lang: "hi-IN",
            outputFormat: "audio-24khz-96kbitrate-mono-mp3",
            rate: "+0%",
            pitch: "+0Hz",
            volume: "+0%",
            timeout: 30000
        });

        await tts.ttsPromise(text, audioPath);

        const audioBuffer = await fs.promises.readFile(audioPath);

        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Length", audioBuffer.length);
        res.setHeader("Cache-Control", "no-store");

        return res.send(audioBuffer);

    } catch (error) {

        console.error("PRESENTER VOICE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Hindi voice generate नहीं हुई।"
        });

    } finally {

        if (audioPath) {
            fs.promises.unlink(audioPath).catch(() => {});
        }

    }

});

// ======================================
// STUDENT PROFILE
// ======================================

const StudentProfile = require("./pages/studentProfile");
const Student = require("./models/Student");

app.get("/student/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id).lean();

        if (!student) {
            return res.status(404).send("Student Not Found");
        }

        return res.send(StudentProfile(student));

    } catch (error) {

        console.error("STUDENT PROFILE ERROR:", error);

        return res.status(500).send(
            "Student Profile Error: " + error.message
        );

    }

});

// ======================================
// STUDENT ID CARD
// ======================================

const StudentIdCard = require("./pages/studentIdCard");

app.get("/student-id-card/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id).lean();

        if (!student) {
            return res.status(404).send("Student Not Found");
        }

        return res.send(StudentIdCard(student));

    } catch (error) {

        console.error("STUDENT ID CARD ERROR:", error);

        return res.status(500).send(
            "Student ID Card Error: " + error.message
        );

    }

});

// ======================================
// GOVERNMENT SERVICES
// ======================================

const governmentRoutes = require("./routes/government");
app.use("/government", governmentRoutes);

// ======================================
// QUICK SERVICES
// ======================================

const quickServiceRoutes = require("./routes/quickService");
app.use("/", quickServiceRoutes);

// ======================================
// CUSTOMER BAKAYA
// ======================================

const customerBakayaRoutes = require("./routes/customerBakaya");
app.use("/", customerBakayaRoutes);

// ======================================
// PASSPORT PHOTO UPLOAD
// ======================================

const passportUpload = multer({

    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
            return cb(
                new Error("Sirf JPG, PNG ya WEBP photo upload karein.")
            );
        }

        cb(null, true);

    }

});

// ======================================
// PASSPORT PHOTO PAGE
// ======================================

app.get("/passport-photo", (req, res) => {

    res.send(`<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Passport Photo Maker | MD Gulab Cyber Cafe</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#172033}
header{background:#0756a5;color:white;padding:22px 15px;text-align:center}
header h1{font-size:23px;margin:0 0 7px}
header p{margin:0;font-size:14px}
main{max-width:600px;margin:24px auto;padding:0 14px}
.card{background:white;padding:22px;border-radius:15px;box-shadow:0 4px 20px #0000000b}
label{display:block;font-weight:bold;margin:15px 0 8px}
input[type=file]{width:100%;padding:12px;border:1px solid #cbd5e1;border-radius:9px}
button,.download{display:block;width:100%;padding:14px;margin-top:14px;border:0;border-radius:9px;background:#0756a5;color:white;font-size:16px;font-weight:bold;text-align:center;text-decoration:none;cursor:pointer}
button:disabled{opacity:.55;cursor:wait}
.note{font-size:13px;line-height:1.6;color:#64748b}
#status{margin-top:16px;line-height:1.6;overflow-wrap:anywhere}
#results{display:none;margin-top:18px}
.preview{width:100%;border:1px solid #ddd;margin-top:12px}
</style>
</head>
<body>
<header>
<h1>MD Gulab Cyber Cafe</h1>
<p>Passport Size Photo Maker</p>
</header>
<main>
<div class="card">
<h2>पासपोर्ट फोटो बनाएं</h2>
<p class="note">अपनी फोटो अपलोड करें। AI background हटाने के बाद सफेद background और A4 शीट तैयार होगी।</p>
<form id="photoForm">
<label for="photo">अपनी फोटो चुनें</label>
<input id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required>
<button id="submitBtn" type="submit">फोटो बनाएं</button>
</form>
<div id="status" role="status"></div>
<div id="results">
<h3>आपकी फोटो तैयार है</h3>
<img id="preview" class="preview" alt="A4 passport photo sheet preview">
<a id="jpgDownload" class="download" download="passport-photos-a4.jpg">JPG डाउनलोड करें</a>
<a id="pdfDownload" class="download" download="passport-photos-a4.pdf">A4 PDF डाउनलोड करें</a>
</div>
</div>
</main>
<script>
const form=document.getElementById("photoForm");
const btn=document.getElementById("submitBtn");
const statusBox=document.getElementById("status");
const results=document.getElementById("results");

form.addEventListener("submit",async function(e){
e.preventDefault();
if(!document.getElementById("photo").files.length)return;
btn.disabled=true;
results.style.display="none";
statusBox.textContent="AI background remove kar raha hai...";
try{
const response=await fetch("/process-passport-photos",{method:"POST",body:new FormData(form)});
const data=await response.json();
if(!response.ok)throw new Error(data.error||"Photo process nahi ho saki.");
const jpgURL="data:image/jpeg;base64,"+data.jpg;
const pdfURL="data:application/pdf;base64,"+data.pdf;
document.getElementById("preview").src=jpgURL;
document.getElementById("jpgDownload").href=jpgURL;
document.getElementById("pdfDownload").href=pdfURL;
results.style.display="block";
statusBox.textContent="फोटो सफलतापूर्वक तैयार हो गई।";
}catch(err){
statusBox.textContent="समस्या: "+err.message;
}finally{
btn.disabled=false;
}
});
</script>
</body>
</html>`);

});

// ======================================
// PASSPORT PHOTO TEST
// ======================================

app.get("/passport-photo-test", (req, res) => {

    res.json({
        success: true,
        message: "Passport Photo backend connected"
    });

});

// ======================================
// PROCESS PASSPORT PHOTOS
// ======================================

app.post(
    "/process-passport-photos",
    passportUpload.single("photo"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Kripya ek photo upload karein."
                });
            }

            const { removeBackground } = await import(
                "@imgly/background-removal-node"
            );

            const sourceBlob = new Blob(
                [req.file.buffer],
                { type: req.file.mimetype }
            );

            const transparentBlob = await removeBackground(sourceBlob);

            const transparentBuffer = Buffer.from(
                await transparentBlob.arrayBuffer()
            );

            const photoWidth = 413;
            const photoHeight = 531;

            const photoBuffer = await sharp(transparentBuffer)
                .rotate()
                .resize(photoWidth, photoHeight, {
                    fit: "cover",
                    position: "centre"
                })
                .flatten({
                    background: {
                        r: 255,
                        g: 255,
                        b: 255
                    }
                })
                .jpeg({ quality: 95 })
                .toBuffer();

            const a4Width = 2480;
            const a4Height = 3508;

            const cols = 5;
            const rows = 2;
            const gapX = 20;
            const gapY = 80;

            const totalWidth =
                cols * photoWidth + (cols - 1) * gapX;

            const totalHeight =
                rows * photoHeight + (rows - 1) * gapY;

            const startX = Math.round((a4Width - totalWidth) / 2);
            const startY = Math.round((a4Height - totalHeight) / 2);

            const composites = [];

            for (let r = 0; r < rows; r++) {

                for (let c = 0; c < cols; c++) {

                    const left = startX + c * (photoWidth + gapX);
                    const top = startY + r * (photoHeight + gapY);

                    composites.push({
                        input: photoBuffer,
                        left,
                        top
                    });

                    const borderSvg = Buffer.from(
                        '<svg xmlns="http://www.w3.org/2000/svg" ' +
                        'width="' + photoWidth + '" height="' + photoHeight + '">' +
                        '<rect x="1" y="1" width="' + (photoWidth - 2) +
                        '" height="' + (photoHeight - 2) +
                        '" fill="none" stroke="#000" stroke-width="2"/>' +
                        '</svg>'
                    );

                    composites.push({
                        input: borderSvg,
                        left,
                        top
                    });

                }

            }

            const jpgBuffer = await sharp({
                create: {
                    width: a4Width,
                    height: a4Height,
                    channels: 3,
                    background: "#ffffff"
                }
            })
                .composite(composites)
                .jpeg({ quality: 95 })
                .toBuffer();

            const pdfBuffer = await new Promise((resolve, reject) => {

                const doc = new PDFDocument({
                    size: "A4",
                    margin: 0,
                    compress: true
                });

                const chunks = [];

                doc.on("data", chunk => chunks.push(chunk));
                doc.on("end", () => resolve(Buffer.concat(chunks)));
                doc.on("error", reject);

                doc.image(jpgBuffer, 0, 0, {
                    width: 595.28,
                    height: 841.89
                });

                doc.end();

            });

            return res.json({
                success: true,
                jpg: jpgBuffer.toString("base64"),
                pdf: pdfBuffer.toString("base64")
            });

        } catch (error) {

            console.error("PASSPORT PHOTO ERROR:", error);

            if (!res.headersSent) {
                return res.status(500).json({
                    success: false,
                    error: error.message || "Photo processing failed"
                });
            }

        }

    }
);

// ======================================
// GS MARKET ADMIN
// ======================================

const storeAdminRoutes = require("./routes/storeAdminRoutes");

app.use("/admin/market", storeAdminRoutes);

console.log("GS MARKET ADMIN LOADED");

// ======================================
// SHOPKEEPER
// ======================================

const shopkeeperRoutes = require("./routes/shopkeeperRoutes");

app.use("/shopkeeper", shopkeeperRoutes);

console.log("SHOPKEEPER ROUTES LOADED");

// ======================================
// MULTER ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            error: err.code === "LIMIT_FILE_SIZE"
                ? "Photo 10 MB se chhoti honi chahiye."
                : err.message
        });

    }

    if (req.path === "/process-passport-photos") {

        return res.status(400).json({
            success: false,
            error: err.message || "Photo upload mein samasya aayi."
        });

    }

    next(err);

});

// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {

    console.error("HHGS SERVER ERROR:", err);

    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).send(
        "<h2>Server Error</h2><p>Something went wrong.</p>"
    );

});

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {

    res.status(404).send(`
        <h2>404 - Page Not Found</h2>
        <p>Requested page is not available.</p>
        <a href="/">Go Home</a>
    `);

});

// ======================================
// SERVER START
// ======================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log("=================================");
    console.log("HHGS SERVER RUNNING");
    console.log("Port:", PORT);
    console.log("GS Market Homepage: Loaded");
    console.log("Analytics: Loaded");
    console.log("Doctor: Loaded");
    console.log("Appointment: Loaded");
    console.log("Quick Services: Loaded");
    console.log("Government Services: Loaded");
    console.log("Passport Photo Maker: Loaded");
    console.log("AI Presenter Voice: Loaded");
    console.log("Shopkeeper: Loaded");
    console.log("=================================");

});
