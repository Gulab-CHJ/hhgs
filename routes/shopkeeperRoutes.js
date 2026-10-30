
const express = require("express");
const crypto = require("crypto");

const Order = require("../models/Order");
const Product = require("../models/Product");
const GSMarketConfig = require("../models/GSMarketConfig");

const router = express.Router();

// ===============================
// SECURITY HELPERS
// ===============================

function safeEqual(a, b) {
    const first = Buffer.from(String(a || ""));
    const second = Buffer.from(String(b || ""));

    if (first.length !== second.length) return false;

    return crypto.timingSafeEqual(first, second);
}

function requireShopkeeper(req, res, next) {
    if (req.session && req.session.shopkeeperLoggedIn === true) {
        return next();
    }

    return res.redirect("/shopkeeper/login");
}

// ===============================
// LOGIN PAGE
// ===============================

router.get("/login", (req, res) => {
    if (req.session?.shopkeeperLoggedIn) {
        return res.redirect("/shopkeeper/dashboard");
    }

    res.send(`
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GS Market Shopkeeper Login</title>
<style>
*{box-sizing:border-box}
body{
margin:0;
font-family:Arial,sans-serif;
background:#f1f5f9;
display:flex;
align-items:center;
justify-content:center;
min-height:100vh;
padding:15px
}
.login{
background:white;
width:100%;
max-width:380px;
padding:28px;
border-radius:16px;
box-shadow:0 8px 30px #0001
}
h2{text-align:center;color:#0f172a}
p{text-align:center;color:#64748b}
input{
width:100%;
padding:14px;
margin:10px 0;
border:1px solid #cbd5e1;
border-radius:9px;
font-size:16px
}
button{
width:100%;
padding:14px;
background:#2563eb;
color:white;
border:0;
border-radius:9px;
font-size:16px;
font-weight:bold;
cursor:pointer
}
.error{color:#dc2626;text-align:center}
</style>
</head>
<body>
<div class="login">
<h2>🛒 GS Market</h2>
<p>Shopkeeper Login</p>
<form method="POST" action="/shopkeeper/login">
<input name="username" placeholder="Shopkeeper ID" required>
<input name="password" type="password" placeholder="Password" required>
<button type="submit">Login</button>
</form>
${req.query.error ? '<p class="error">गलत ID या Password</p>' : ''}
</div>
</body>
</html>
`);
});

// ===============================
// LOGIN PROCESS
// ===============================

const loginAttempts = new Map();

router.post("/login", async (req, res) => {
    try {
        const ip = req.ip || "unknown";
        const now = Date.now();
        const attempt = loginAttempts.get(ip);

        if (attempt && now - attempt.time < 10 * 60 * 1000 &&
            attempt.count >= 10) {
            return res.status(429).send("बहुत ज्यादा प्रयास। 10 मिनट बाद कोशिश करें।");
        }

        const username = process.env.SHOPKEEPER_ID;
        const password = process.env.SHOPKEEPER_PASSWORD;

        if (!username || !password) {
            return res.status(500).send("Shopkeeper credentials .env में सेट नहीं हैं।");
        }

        const valid =
            safeEqual(req.body.username, username) &&
            safeEqual(req.body.password, password);

        if (!valid) {
            const count = attempt && now - attempt.time < 10 * 60 * 1000
                ? attempt.count + 1
                : 1;

            loginAttempts.set(ip, { count, time: now });

            return res.redirect("/shopkeeper/login?error=1");
        }

        loginAttempts.delete(ip);

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).send("Login session error");
            }

            req.session.shopkeeperLoggedIn = true;

            req.session.save((saveErr) => {
                if (saveErr) {
                    return res.status(500).send("Session save error");
                }

                res.redirect("/shopkeeper/dashboard");
            });
        });

    } catch (error) {
        console.error("Shopkeeper Login:", error);
        res.status(500).send("Login error");
    }
});

// ===============================
// LOGOUT
// ===============================

router.post("/logout", requireShopkeeper, (req, res) => {
    req.session.destroy(() => {
        res.redirect("/shopkeeper/login");
    });
});

// ===============================
// DASHBOARD PAGE
// ===============================

router.get("/dashboard", requireShopkeeper, (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GS Market Shopkeeper Dashboard</title>

<style>
*{box-sizing:border-box}
body{
margin:0;
font-family:Arial,sans-serif;
background:#f1f5f9;
color:#0f172a
}
header{
background:#0f172a;
color:white;
padding:16px;
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
flex-wrap:wrap
}
header h2{margin:0;font-size:20px}
button{
border:0;
border-radius:8px;
padding:10px 13px;
cursor:pointer;
font-weight:bold
}
.logout{background:#ef4444;color:white}
.container{padding:15px;max-width:1100px;margin:auto}
.stats{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:12px;
margin-bottom:15px
}
.stat{
background:white;
padding:18px;
border-radius:12px;
box-shadow:0 2px 8px #00000008
}
.stat span{color:#64748b;font-size:13px}
.stat h2{margin:8px 0 0;font-size:24px}
.panel{
background:white;
padding:15px;
border-radius:12px;
margin-bottom:15px
}
.controls{
display:flex;
gap:8px;
flex-wrap:wrap;
align-items:center
}
.open{background:#16a34a;color:white}
.closed{background:#dc2626;color:white}
.blue{background:#2563eb;color:white}
.gray{background:#475569;color:white}
.order{
background:white;
border:1px solid #e2e8f0;
border-radius:12px;
padding:15px;
margin-bottom:12px
}
.order-head{
display:flex;
justify-content:space-between;
gap:10px;
flex-wrap:wrap
}
.order h3{margin:0 0 8px}
.muted{color:#64748b;font-size:13px}
.items{background:#f8fafc;padding:10px;border-radius:8px;margin:10px 0}
.status{font-weight:bold;color:#2563eb}
.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.actions button{background:#2563eb;color:white}
.actions button.cancel{background:#dc2626}
.empty{text-align:center;padding:35px;color:#64748b}
@media(max-width:650px){
.stats{grid-template-columns:repeat(2,1fr)}
.stat h2{font-size:20px}
}
</style>
</head>

<body>

<header>
<h2>🛒 GS Market Shopkeeper</h2>
<form method="POST" action="/shopkeeper/logout">
<button class="logout">Logout</button>
</form>
</header>

<div class="container">

<div class="stats">
<div class="stat"><span>कुल Paid Orders</span><h2 id="totalOrders">0</h2></div>
<div class="stat"><span>Pending Orders</span><h2 id="pendingOrders">0</h2></div>
<div class="stat"><span>आज की बिक्री (दिखाए गए ऑर्डर)</span><h2 id="sales">₹0</h2></div>
<div class="stat"><span>Products</span><h2 id="products">0</h2></div>
</div>

<div class="panel">
<h3>🏪 Shop Status</h3>
<p id="shopStatus">Loading...</p>
<div class="controls">
<button class="open" onclick="setShop(true)">दुकान खोलें</button>
<button class="closed" onclick="setShop(false)">दुकान बंद करें</button>
<button class="blue" onclick="loadData()">Refresh</button>
</div>
</div>

<div class="panel">
<h3>🔔 Notifications</h3>
<div class="controls">
<button class="gray" onclick="enableSound()">Sound Enable</button>
<button class="gray" onclick="enableBrowserNotification()">Browser Notification</button>
</div>
<p class="muted">नए ऑर्डर की सूचना के लिए यह Dashboard खुला रखें।</p>
</div>

<h3>📦 Customer Orders</h3>
<div id="orders">
<div class="empty">Orders लोड हो रहे हैं...</div>
</div>

</div>

<script>
let previousOrderIds = new Set();
let soundEnabled = false;
let audioContext = null;

function enableSound(){
    soundEnabled = true;

    try{
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.resume();
        playSound();
        alert("Notification Sound Enabled");
    }catch(e){
        alert("इस browser में sound उपलब्ध नहीं है");
    }
}

function playSound(){
    if(!soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 880;
    gain.gain.value = 0.12;

    oscillator.start();

    setTimeout(()=>{
        oscillator.stop();
    },300);
}

async function enableBrowserNotification(){
    if(!("Notification" in window)){
        alert("इस browser में Notification उपलब्ध नहीं है");
        return;
    }

    const permission = await Notification.requestPermission();

    if(permission === "granted"){
        new Notification("GS Market",{
            body:"Shopkeeper notifications enabled"
        });
    }else{
        alert("Notification permission नहीं मिली");
    }
}

function notifyNewOrder(order){
    playSound();

    if("Notification" in window && Notification.permission === "granted"){
        new Notification("नया GS Market Order",{
            body:"Order: " + order.orderNumber
        });
    }
}

function money(value){
    return "₹" + Number(value || 0).toLocaleString("en-IN");
}

function escapeHTML(value){
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
    })[ch]);
}

async function loadData(){
    try{
        const response = await fetch("/shopkeeper/api/orders",{
            credentials:"same-origin"
        });

        if(!response.ok) throw new Error("Orders API error");

        const data = await response.json();

        if(!data.success) throw new Error(data.message || "Orders error");

        const orders = data.orders || [];

        document.getElementById("totalOrders").textContent = orders.length;
        document.getElementById("pendingOrders").textContent =
            orders.filter(o => o.orderStatus === "Pending").length;

        const today = new Date().toDateString();

        const todaySales = orders
            .filter(o => new Date(o.createdAt).toDateString() === today)
            .reduce((sum,o) => sum + Number(o.totalAmount || 0),0);

        document.getElementById("sales").textContent = money(todaySales);
        document.getElementById("products").textContent = data.productCount || 0;

        orders.forEach(order=>{
            const id = String(order._id);

            if(!previousOrderIds.has(id) && previousOrderIds.size > 0){
                notifyNewOrder(order);
            }
        });

        previousOrderIds = new Set(orders.map(o=>String(o._id)));

        renderOrders(orders);

        await loadShopStatus();

    }catch(error){
        console.error(error);
        document.getElementById("orders").innerHTML =
            '<div class="empty">Orders लोड नहीं हुए। Refresh करें।</div>';
    }
}

function renderOrders(orders){
    const container = document.getElementById("orders");

    if(!orders.length){
        container.innerHTML = '<div class="empty">अभी कोई Paid Order नहीं है।</div>';
        return;
    }

    container.innerHTML = orders.map(order=>{
        const items = (order.items || []).map(item=>
            '<div>' +
            escapeHTML(item.name || "Product") +
            ' × ' + Number(item.quantity || 0) +
            ' — ' + money(item.subtotal || (item.price * item.quantity)) +
            '</div>'
        ).join("");

        let actions = "";

        if(order.orderStatus === "Pending"){
            actions =
                '<button onclick="updateStatus(\\''+order._id+'\\',\\'Confirmed\\')">Confirm</button>' +
                '<button class="cancel" onclick="updateStatus(\\''+order._id+'\\',\\'Cancelled\\')">Cancel</button>';
        }else if(order.orderStatus === "Confirmed"){
            actions =
                '<button onclick="updateStatus(\\''+order._id+'\\',\\'Shipped\\')">Shipped</button>' +
                '<button class="cancel" onclick="updateStatus(\\''+order._id+'\\',\\'Cancelled\\')">Cancel</button>';
        }else if(order.orderStatus === "Shipped"){
            actions =
                '<button onclick="updateStatus(\\''+order._id+'\\',\\'Delivered\\')">Delivered</button>';
        }

        return \`
        <div class="order">
            <div class="order-head">
                <div>
                    <h3>Order: \${escapeHTML(order.orderNumber)}</h3>
                    <div class="muted">\${new Date(order.createdAt).toLocaleString("en-IN")}</div>
                </div>
                <div class="status">\${escapeHTML(order.orderStatus)}</div>
            </div>

            <p><b>Customer:</b> \${escapeHTML(order.customer?.name)}</p>
            <p><b>Phone:</b> \${escapeHTML(order.customer?.phone)}</p>
            <p><b>Address:</b> \${escapeHTML(order.customer?.address)}</p>

            <div class="items">\${items}</div>

            <p><b>Payment:</b> \${escapeHTML(order.paymentStatus)}</p>
            <p><b>Total:</b> \${money(order.totalAmount)}</p>

            <div class="actions">\${actions}</div>
        </div>
        \`;
    }).join("");
}

async function updateStatus(id,status){
    if(!confirm("Order status " + status + " करना चाहते हैं?")) return;

    try{
        const response = await fetch("/shopkeeper/api/orders/"+id+"/status",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"same-origin",
            body:JSON.stringify({status})
        });

        const data = await response.json();

        if(!response.ok || !data.success){
            throw new Error(data.message || "Status update failed");
        }

        alert("Order status updated");

        // Order Shipped होते ही Alarm बंद
if (status === "Shipped") {
    stopAlarm();
}

        loadData();

    }catch(error){
        alert(error.message);
    }
}

async function loadShopStatus(){
    const response = await fetch("/shopkeeper/api/shop-status",{
        credentials:"same-origin"
    });

    const data = await response.json();

    if(data.success){
        document.getElementById("shopStatus").innerHTML =
            data.shopOpen
            ? '<b style="color:green">🟢 दुकान खुली है</b>'
            : '<b style="color:red">🔴 दुकान बंद है</b>';
    }
}

async function setShop(open){
    if(!confirm(open ? "दुकान खोलें?" : "दुकान बंद करें?")) return;

    try{
        const response = await fetch("/shopkeeper/api/shop-status",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"same-origin",
            body:JSON.stringify({shopOpen:open})
        });

        const data = await response.json();

        if(!response.ok || !data.success){
            throw new Error(data.message || "Update failed");
        }

        await loadShopStatus();
        alert(open ? "दुकान खोल दी गई" : "दुकान बंद कर दी गई");

    }catch(error){
        alert(error.message);
    }
}

loadData();
setInterval(loadData,3000);
</script>

</body>
</html>
`);
});

// ===============================
// ORDERS API
// ===============================

router.get("/api/orders", requireShopkeeper, async (req, res) => {
    try {
        const orders = await Order.find({
            paymentStatus: /^paid$/i
        })
        .sort({ createdAt: -1 })
        .limit(100)
        .lean();

        const productCount = await Product.countDocuments({ active: true });

        res.json({
            success: true,
            orders,
            productCount
        });

    } catch (error) {
        console.error("Shopkeeper Orders:", error);
        res.status(500).json({
            success: false,
            message: "Orders load नहीं हुए"
        });
    }
});

// ===============================
// SHOP STATUS GET
// ===============================

router.get("/api/shop-status", requireShopkeeper, async (req, res) => {
    try {
        const config = await GSMarketConfig.findOne().lean();

        res.json({
            success: true,
            shopOpen: config ? config.shopOpen !== false : true
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Shop status load नहीं हुआ"
        });
    }
});

// ===============================
// SHOP STATUS UPDATE
// ===============================

router.post("/api/shop-status", requireShopkeeper, async (req, res) => {
    try {
        const shopOpen = req.body.shopOpen;

        if (typeof shopOpen !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Invalid shop status"
            });
        }

        const config = await GSMarketConfig.findOneAndUpdate(
            {},
            { $set: { shopOpen } },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
                runValidators: true
            }
        );

        res.json({
            success: true,
            shopOpen: config.shopOpen
        });

    } catch (error) {
        console.error("Shop Status Update:", error);
        res.status(500).json({
            success: false,
            message: "Shop status update नहीं हुआ"
        });
    }
});

// ===============================
// ORDER STATUS UPDATE
// ===============================

router.post("/api/orders/:id/status", requireShopkeeper, async (req, res) => {
    try {
        const { status } = req.body;

        const allowed = [
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        if (!require("mongoose").isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const order = await Order.findOne({
            _id: req.params.id,
            paymentStatus: /^paid$/i
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Paid order नहीं मिला"
            });
        }

        const current = order.orderStatus;

        const transitions = {
            Pending: ["Confirmed", "Cancelled"],
            Confirmed: ["Shipped", "Cancelled"],
            Shipped: ["Delivered"],
            Delivered: [],
            Cancelled: []
        };

        if (!(transitions[current] || []).includes(status)) {
            return res.status(400).json({
                success: false,
                message: "यह status change allowed नहीं है"
            });
        }

        order.orderStatus = status;
        await order.save();

        res.json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {
        console.error("Shopkeeper Status:", error);
        res.status(500).json({
            success: false,
            message: "Status update नहीं हुआ"
        });
    }
});

module.exports = router;
