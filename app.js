
// // const express = require("express");
// // const path = require("path");

// // const app = express();

// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Static files
// // app.use(express.static(path.join(__dirname, "public")));

// // // Home page
// // app.get("/", (req, res) => {
// //     res.sendFile(path.join(__dirname, "public", "index.html"));
// // });

// // // Health check for hosting
// // app.get("/health", (req, res) => {
// //     res.status(200).json({
// //         success: true,
// //         message: "HHGS server is running"
// //     });
// // });

// // // 404 handler
// // app.use((req, res) => {
// //     res.status(404).send("Page not found");
// // });

// // // Error handler
// // app.use((err, req, res, next) => {
// //     console.error("Server error:", err.message);

// //     res.status(500).json({
// //         success: false,
// //         message: "Internal server error"
// //     });
// // });

// // // Start server
// // app.listen(PORT, "0.0.0.0", () => {
// //     console.log(`HHGS server running on port ${PORT}`);
// // });



// const express = require("express");
// const path = require("path");

// // 1. Apne Routes Import Karein (Jo aapne routes folder me banaye hain)
// // const adminRoutes = require("./routes/admin");
// // const quickServiceRoutes = require("./routes/quickService");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // 2. View Engine Setup (Kyunki aapke paas views folder hai)
// app.set("view engine", "ejs"); // Agar EJS use kar rahe hain
// app.set("views", path.join(__dirname, "views"));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static files (CSS, Images ke liye)
// app.use(express.static(path.join(__dirname, "public")));

// // 3. Routes ko use karein (Jab aap routes me code likh lein tab inko uncomment karein)
// // app.use("/admin", adminRoutes);
// // app.use("/quick-service", quickServiceRoutes);

// // Home page
// app.get("/", (req, res) => {
//     // TAREEQA 1 (Agar EJS use kar rahe hain): 
//     // Iske liye 'views' folder ke andar 'index.ejs' naam ki file banayein
//     res.render("index"); 

//     // TAREEQA 2 (Agar HTML use karni hai): 
//     // Iske liye 'public' folder ke andar 'index.html' banayein
//     // res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Health check for hosting
// app.get("/health", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "HHGS server is running"
//     });
// });

// // 404 handler
// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });

// // Error handler
// app.use((err, req, res, next) => {
//     console.error("Server error:", err.message);
//     res.status(500).json({
//         success: false,
//         message: "Internal server error"
//     });
// });

// // Start server
// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`HHGS server running on port ${PORT}`);
// });


const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); // 1. Mongoose add kiya

const app = express();
const PORT = process.env.PORT || 3000;

// 2. MongoDB Connection
// Agar aap local MongoDB use kar rahe hain toh yeh link rakhein. 
// Agar aap MongoDB Atlas (Cloud) use kar rahe hain, toh uski link yahan daalein.
const MONGO_URI = "mongodb://127.0.0.1:27017/hhgs"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// View Engine Setup
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("/", (req, res) => {
    res.render("index"); 
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "HHGS server is running"
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});// 1. File ke sabse upar import karein (path apne folder ke hisaab se check kar lein)
const QuickServiceSection = require("./views/component/quickservicecomponent");

// 2. Home page route ko update karein
app.get("/", (req, res) => {
    // Function ko call karke uska pura HTML/CSS ek variable mein store karein
    const componentHTML = QuickServiceSection(); 

    // res.render ke zariye us HTML ko 'index.ejs' mein bhej dein
    res.render("index", { quickServiceCard: componentHTML }); 
});



// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`HHGS server running on port ${PORT}`);
});