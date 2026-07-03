// require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");

const Header = require("./views/component/header");
const Hero = require("./views/component/hero");
const Footer = require("./views/component/footer");
const AdminLogin = require("./pages/adminLogin");
const AdminDashboard = require("./pages/adminDashboard");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");


const app = express();
const PORT = process.env.PORT || 3000;





app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);


app.get("/admin", (req, res) => {
    res.send(AdminLogin(req.query.error || ""));
});

app.post("/admin/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.redirect("/admin?error=Username Not Found");
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.redirect("/admin?error=Wrong Password");
        }

        res.send(AdminDashboard());

    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");

    }

});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));



const cards = [
    {
        title: "PAN Card",
        description: "Apply for a new PAN Card."
    },
    {
        title: "Aadhaar",
        description: "Update Aadhaar services."
    },
    {
        title: "Passport",
        description: "Passport application support."
    }
];

app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>HHGS</title>

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

${Header()}

${Hero(cards)}

${Footer()}

<script src="/js/main.js"></script>

</body>

</html>
`);
});


app.listen(PORT, () => {
    console.log(`🚀 Server Running http://localhost:${PORT}`);
});


// const express = require("express");
// const app = express();
// app.get("/", (req, res) => res.send("HHGS Server Running"));
// app.listen(process.env.PORT || 3000);