

require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// Trust Hostinger reverse proxy
app.set("trust proxy", 1);


// ===============================
// DATABASE
// ===============================

require("./config/database");



// ===============================
// BODY PARSER
// ===============================

app.use(
    express.urlencoded({
        extended:true
    })
);


app.use(
    express.json()
);



// ===============================
// SESSION
// ===============================

app.use(
session({

    secret:"GLOBAL_HEALTHCARE_SECRET",

    resave:false,

    saveUninitialized:false,

    cookie:{

        maxAge:
        1000 * 60 * 60 * 24

    }

})
);



// ===============================
// STATIC FILES
// ===============================


app.use(
"/storage",
express.static(
path.join(__dirname,"storage")
)
);



app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);



app.use(
express.static(
path.join(__dirname,"public")
)
);



// ===============================
// ROUTES
// ===============================


// Home

const indexRoutes =
require("./routes/index");

app.use(
"/",
indexRoutes
);




// Admin

const adminRoutes =
require("./routes/admin");

app.use(
"/admin",
adminRoutes
);




// Doctor

const doctorRoutes =
require("./routes/doctor");

app.use(
"/doctor",
doctorRoutes
);




// Appointment

const appointmentRoute =
require("./routes/appointment");

console.log(
"Appointment Route Loaded"
);


app.use(
"/appointment",
appointmentRoute
);




// Service

const serviceRoutes =
require("./routes/service");


app.use(
"/",
serviceRoutes
);




// Auth

const authRoutes =
require("./routes/auth");


app.use(
"/",
authRoutes
);




const storeRouter = require("./doctor/dhhpb/store");

app.use(
    "/doctor/public",
    express.static(
        path.join(
            __dirname,
            "doctor",
            "public"
        )
    )
);
app.use(
    "/doctor",
    storeRouter
);


// ===============================
// VIEW ENGINE
// ===============================


app.set(
"view engine",
"ejs"
);


app.set(
"views",
path.join(
__dirname,
"views"
)
);





// ===============================
// ERROR HANDLER
// ===============================


app.use(
(err,req,res,next)=>{


console.log(err);


res.status(500).send(`

<h2>
Server Error
</h2>

<pre>
${err.stack || err.message}
</pre>

`);


});





// ===============================
// SERVER START
// ===============================


// const PORT =
// process.env.PORT || 3000;



// app.listen(
// PORT,
// ()=>{

// console.log(
// `Server Running on Port ${PORT}`
// );

// }
// );

// Cart
const cartRoutes = require("./routes/cart");

app.use(
    "/api/cart",
    cartRoutes
);


const rapidoRouter =
    require("./routes/rapido");

app.use(
    "/api/rapido",
    rapidoRouter
);

// ===============================
// MINI SABJI SHOP
// ===============================

const vegetableRoutes =
    require("./routes/vegetable");

app.use(
    "/",
    vegetableRoutes
);

const RapidoTracker =
    require("./views/RapidoTracker");

app.get(
    "/rapido-tracker",
    (req, res) => {

        try {

            return res.send(
                RapidoTracker()
            );

        }
        catch (error) {

            console.error(
                "RAPIDO TRACKER PAGE ERROR:",
                error
            );

            return res
                .status(500)
                .send(
                    "Rapido Tracker Page Error"
                );
        }

    }
);

const AIPresenterVideo =
    require("./views/AIPresenterVideo");

app.get(
    "/ai-video",
    function(req, res) {

        res.send(
            AIPresenterVideo()
        );

    }
);


app.use(
    express.json({
        limit: "2mb"
    })
);


// ======================================
// AI TEXT TO SPEECH
// ======================================

app.post(
    "/api/free-presenter-voice",
    async function (req, res) {

        try {

            const text =
                String(
                    req.body.text || ""
                ).trim();


            if (!text) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Presenter Script required."
                });

            }


            if (text.length > 4000) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Script बहुत लंबा है।"
                });

            }


            if (!process.env.OPENAI_API_KEY) {

                return res.status(500).json({
                    success: false,
                    message:
                        "OPENAI_API_KEY missing."
                });

            }


            const aiResponse =
                await fetch(
                    "https://api.openai.com/v1/audio/speech",
                    {
                        method: "POST",

                        headers: {

                            "Authorization":
                                "Bearer " +
                                process.env.OPENAI_API_KEY,

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify({

                            model:
                                "gpt-4o-mini-tts",

                            voice:
                                "onyx",

                            input:
                                text,

                            instructions:
                                "Speak in natural, clear Hindi. Use a professional Indian male presenter style. Speak calmly and clearly like a healthcare explainer. Correctly pronounce Hindi and English product names."

                        })

                    }
                );


            if (!aiResponse.ok) {

                const errorText =
                    await aiResponse.text();


                console.error(
                    "AI VOICE ERROR:",
                    errorText
                );


                return res.status(500).json({
                    success: false,
                    message:
                        "AI voice generate नहीं हुई।"
                });

            }


            const arrayBuffer =
                await aiResponse.arrayBuffer();


            const audioBuffer =
                Buffer.from(
                    arrayBuffer
                );


            res.setHeader(
                "Content-Type",
                "audio/mpeg"
            );


            res.setHeader(
                "Content-Length",
                audioBuffer.length
            );


            res.send(
                audioBuffer
            );

        }
        catch (error) {

            console.error(
                "AI PRESENTER VOICE ERROR:",
                error
            );


            res.status(500).json({
                success: false,
                message:
                    "AI Voice Generation Failed"
            });

        }

    }
);


const fs = require("fs");

const os = require("os");
const crypto = require("crypto");

const { EdgeTTS } = require("node-edge-tts");


app.use(
    express.json({
        limit: "2mb"
    })
);


app.post(
    "/api/free-presenter-voice",
    async function(req, res) {

        let audioPath = null;

        try {

            const text =
                String(
                    req.body.text || ""
                ).trim();


            if (!text) {

                return res.status(400).json({
                    success: false,
                    message: "Presenter Script required"
                });

            }


            audioPath =
                path.join(
                    os.tmpdir(),
                    "hhgs-" +
                    crypto.randomUUID() +
                    ".mp3"
                );


            const tts =
                new EdgeTTS({

                    voice:
                        "hi-IN-MadhurNeural",

                    lang:
                        "hi-IN",

                    outputFormat:
                        "audio-24khz-96kbitrate-mono-mp3",

                    rate:
                        "+0%",

                    pitch:
                        "+0Hz",

                    volume:
                        "+0%",

                    timeout:
                        30000

                });


            await tts.ttsPromise(
                text,
                audioPath
            );


            res.setHeader(
                "Content-Type",
                "audio/mpeg"
            );


            const stream =
                fs.createReadStream(
                    audioPath
                );


            stream.pipe(res);


            stream.on(
                "close",
                function() {

                    fs.unlink(
                        audioPath,
                        function() {}
                    );

                }
            );

        }
        catch(error) {

            console.error(
                "FREE TTS ERROR:",
                error
            );


            if (
                audioPath &&
                fs.existsSync(audioPath)
            ) {

                fs.unlink(
                    audioPath,
                    function() {}
                );

            }


            res.status(500).json({
                success: false,
                message:
                    "Free Hindi voice generate नहीं हुई"
            });

        }

    });


const StudentProfile =
    require("./pages/studentProfile");

const Student =
    require("./models/Student");


app.get(
    "/student/:id",

    async (req, res) => {

        try {

            const student =
                await Student.findById(
                    req.params.id
                ).lean();


            if (!student) {

                return res
                    .status(404)
                    .send(
                        "Student Not Found"
                    );

            }


            return res.send(
                StudentProfile(student)
            );


        } catch (error) {

            console.error(
                "STUDENT PROFILE ERROR:",
                error
            );


            return res
                .status(500)
                .send(
                    "Student Profile Error: " +
                    error.message
                );

        }

    }
);


const StudentIdCard =
    require("./pages/studentIdCard");


app.get(
    "/student-id-card/:id",

    async (req, res) => {

        try {

            const student =
                await Student.findById(
                    req.params.id
                ).lean();


            if (!student) {

                return res
                    .status(404)
                    .send(
                        "Student Not Found"
                    );

            }


            return res.send(
                StudentIdCard(student)
            );


        } catch (error) {

            console.error(
                "STUDENT ID CARD ERROR:",
                error
            );


            return res
                .status(500)
                .send(
                    "Student ID Card Error: " +
                    error.message
                );

        }

    }
);

// Government

const governmentRoutes =
    require("./routes/government");

app.use(
    "/government",
    governmentRoutes
);

// const quickServiceRoutes =
//     require("./routes/quickService");

// app.use(
//     "/",
//     quickServiceRoutes
// );

const quickServiceRoutes =
    require("./routes/quickService");

app.use(
    "/",
    quickServiceRoutes
);


const customerBakayaRoutes = require("./routes/customerBakaya");

app.use(customerBakayaRoutes);




app.post("/admin/deactivate-banner/:id", async (req, res) => {
    try {
        const bannerId = req.params.id;

        // Yahan apne Banner model ka naam use karein
        await Banner.findByIdAndUpdate(bannerId, {
            isActive: false
        });

        res.redirect("/admin/banners");
    } catch (error) {
        console.error("Deactivate Banner Error:", error);
        res.status(500).send("Banner deactivate karne mein error aaya");
    }
});




/* ==========================================
   MD GULAB CYBER CAFE
   Passport Photo Maker - JPG + A4 PDF
   Add before app.listen() in app.js
========================================== */

const multer = require("multer");
const sharp = require("sharp");
const PDFDocument = require("pdfkit");

// AI background removal package ko dynamically load karenge,
// taaki CommonJS app.js mein ESM compatibility ki dikkat kam ho.
const passportUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
            return cb(new Error("Sirf JPG, PNG ya WEBP photo upload karein."));
        }
        cb(null, true);
    }
});

// Passport Photo Maker page
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
button,.download{display:block;width:100%;padding:14px;margin-top:14px;border:0;
border-radius:9px;background:#0756a5;color:white;font-size:16px;
font-weight:bold;text-align:center;text-decoration:none;cursor:pointer}
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
<input id="photo" name="photo" type="file"
accept="image/jpeg,image/png,image/webp" required>
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
const form = document.getElementById("photoForm");
const btn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");
const results = document.getElementById("results");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (!document.getElementById("photo").files.length) return;

    btn.disabled = true;
    results.style.display = "none";
    statusBox.textContent =
        "AI background remove kar raha hai. Pehli baar thoda samay lag sakta hai...";

    try {
        const response = await fetch("/process-passport-photos", {
            method: "POST",
            body: new FormData(form)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Photo process nahi ho saki.");
        }

        document.getElementById("preview").src =
            "data:image/jpeg;base64," + data.jpg;

        document.getElementById("jpgDownload").href =
            "data:image/jpeg;base64," + data.jpg;

        document.getElementById("pdfDownload").href =
            "data:application/pdf;base64," + data.pdf;

        results.style.display = "block";
        statusBox.textContent = "फोटो सफलतापूर्वक तैयार हो गई।";
    } catch (err) {
        statusBox.textContent = "समस्या: " + err.message;
    } finally {
        btn.disabled = false;
    }
});
</script>
</body>
</html>`);
});




// Passport Photo Maker: backend connection test
app.get("/passport-photo-test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Passport Photo backend connected"
    });
});

// Process uploaded passport photo
app.post(
    "/process-passport-photos",
    passportUpload.single("photo"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "Kripya ek photo upload karein."
                });
            }

            // 1. AI se background remove karna
            const { removeBackground } =
                await import("@imgly/background-removal-node");

            const sourceBlob = new Blob(
                [req.file.buffer],
                { type: req.file.mimetype }
            );

            const transparentBlob = await removeBackground(sourceBlob);

            const transparentBuffer = Buffer.from(
                await transparentBlob.arrayBuffer()
            );

            // 2. Passport photo: 35 x 45 mm at approx 300 DPI
            // Transparent background ko white background mein convert karna
            const photoWidth = 413;
            const photoHeight = 531;

            const photoBuffer = await sharp(transparentBuffer)
                .rotate()
                .resize(photoWidth, photoHeight, {
                    fit: "cover",
                    position: "centre"
                })
                .flatten({
                    background: { r: 255, g: 255, b: 255 }
                })
                .jpeg({ quality: 95 })
                .toBuffer();

            // 3. A4 sheet: 2480 x 3508 pixels, approx 300 DPI
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

                    // Black border around each photo
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

            // 4. A4 PDF banana
            const pdfBuffer = await new Promise((resolve, reject) => {
                const doc = new PDFDocument({
                    size: "A4",
                    margin: 0,
                    autoFirstPage: true,
                    compress: true
                });

                const chunks = [];

                doc.on("data", chunk => chunks.push(chunk));
                doc.on("end", () => resolve(Buffer.concat(chunks)));
                doc.on("error", reject);

                // Full A4 page par sheet fit karna
                doc.image(jpgBuffer, 0, 0, {
                    width: 595.28,
                    height: 841.89
                });

                doc.end();
            });

            // 5. JPG aur PDF browser ko dena
            res.json({
                success: true,
                jpg: jpgBuffer.toString("base64"),
                pdf: pdfBuffer.toString("base64")
            });

        }catch (error) {
    console.error("PASSPORT PHOTO ERROR:", error);

    if (!res.headersSent) {
        res.status(500).json({
            success: false,
            error: error.message || "Photo processing failed"
        });
    }
}

});


// Multer upload errors ko JSON mein return karna
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: err.code === "LIMIT_FILE_SIZE"
                ? "Photo 10 MB se chhoti honi chahiye."
                : err.message
        });
    }

    if (req.path === "/process-passport-photos") {
        return res.status(400).json({
            error: err.message || "Photo upload mein samasya aayi."
        });
    }

    next(err);
});

// GS Market Store
const storeRoutes = require("./routes/storeRoutes");
const storeAdminRoutes = require("./routes/storeAdminRoutes");

// Customer Store: https://hhgs23.com/market
app.use("/market", storeRoutes);

// Admin: reuse the project's existing admin session
app.use("/admin/market", storeAdminRoutes);

// IMPORTANT:
// Apne existing app.listen() ko waise hi rehne dein.



// GS Market Shopkeeper Routes
const shopkeeperRoutes = require("./routes/shopkeeperRoutes");

app.use("/shopkeeper", shopkeeperRoutes);

// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(`Server Running on Port ${PORT}`);
    }
);
