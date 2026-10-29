const express = require("express");
const router = express.Router();

// Shopkeeper Login Page
router.get("/login", (req, res) => {
    res.send(`
        <h2>GS Market Shopkeeper Login</h2>
        <form method="POST" action="/shopkeeper/login">
            <input
                type="text"
                name="username"
                placeholder="Shopkeeper ID"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            <button type="submit">Login</button>
        </form>
    `);
});

module.exports = router;