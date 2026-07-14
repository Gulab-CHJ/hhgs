const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const AdminLogin = require("../pages/adminLogin");
const AdminDashboard = require("../pages/dashboard");

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.send(AdminLogin("Username Not Found"));
        }

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.send(AdminLogin("Wrong Password"));
        }

        return res.send(AdminDashboard());

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

module.exports = { login };