const express = require("express");
const path = require("path");

const Header = require("./component/header");
const Hero = require("./component/hero");
const Footer = require("./component/footer");

const app = express();
const PORT = 3000;

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

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

${Hero()}

${Footer()}

</body>

</html>
`);

});

app.listen(PORT, () => {
    console.log(`🚀 Server Running http://localhost:${PORT}`);
});