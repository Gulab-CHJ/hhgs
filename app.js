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

const Header = require("./component/header");
const Footer = require("./component/footer");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>HHGS</title>
    </head>
    <body>

        ${Header()}

        <main>
            <h2>Home Page</h2>
            <p>This content comes from app.js.</p>
        </main>

        ${Footer()}

    </body>
    </html>
    `;

    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});