const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname)));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API Example
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Server is running successfully!"
    });
});

// 404 Page
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});