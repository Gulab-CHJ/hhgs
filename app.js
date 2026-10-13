
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Health check for hosting
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
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`HHGS server running on port ${PORT}`);
});
