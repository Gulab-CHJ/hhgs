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

// Login Submit
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.SHOPKEEPER_ID &&
        password === process.env.SHOPKEEPER_PASSWORD
    ) {
        if (req.session) {
            req.session.shopkeeperLoggedIn = true;
            return res.redirect("/shopkeeper/dashboard");
        }

        return res.status(500).send("Session configuration missing.");
    }

    res.status(401).send(
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