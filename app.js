const express = require("express");
const path = require("path");

const Header = require("./views/component/header");
const Hero = require("./views/component/hero");
const Footer = require("./views/component/footer");

const app = express();
const PORT = 3000;

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