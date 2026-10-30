const express = require("express");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
    res.send(`
        <h2>GS Market Shopkeeper Login</h2>
        <form method="POST" action="/shopkeeper/login">
            <input name="username" placeholder="Login ID" required>
            <input name="password" type="password"
                   placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

console.log("Shopkeeper config check:", {
    idExists: Boolean(process.env.SHOPKEEPER_ID),
    passwordExists: Boolean(process.env.SHOPKEEPER_PASSWORD)
});

// Login Submit
router.post("/login", (req, res) => {
    const username = String(req.body.username || "").trim();
    const password = String(req.body.password || "");

    const correctUsername = process.env.SHOPKEEPER_ID;
    const correctPassword = process.env.SHOPKEEPER_PASSWORD;

    if (!correctUsername || !correctPassword) {
        console.error("Shopkeeper credentials missing in .env");
        return res.status(500).send("Shopkeeper Login configuration missing.");
    }

    if (
        username === correctUsername &&
        password === correctPassword
    ) {
        req.session.shopkeeperLoggedIn = true;
        return res.redirect("/shopkeeper/dashboard");
    }

    console.log("Shopkeeper login failed");

    return res.status(401).send(
        'Invalid Login ID or Password. <a href="/shopkeeper/login">Try again</a>'
    );
});

// Dashboard
router.get("/dashboard", (req, res) => {
    if (!req.session?.shopkeeperLoggedIn) {
        return res.redirect("/shopkeeper/login");
    }

    res.send("<h1>GS Market Shopkeeper Dashboard</h1>");
});

module.exports = router;