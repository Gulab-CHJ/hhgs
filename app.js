// const express = require("express");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Server Running");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const path = require("path");

const Header = require("./component/header");
const Hero = require("./component/hero");
const Footer = require("./component/footer");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    res.send(`
    <!DOCTYPE html>
    <html>

    <head>

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
    console.log(`Server Running on http://localhost:${PORT}`);
});