const Home = require("./pages/Homepages");
const express = require("express");
const app = express();
require("./config/database");

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Folder (optional)
app.use(express.static("public"));

// Routes
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send(Home());
});



// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
});