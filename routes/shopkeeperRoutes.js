const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");

const Order = require("../models/Order");
const Product = require("../models/Product");
const GSMarketConfig = require("../models/GSMarketConfig");

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

// Login attempts: basic per-process protection.
// Production में reverse proxy पर IP rate limiting भी लगाएं.
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

function safeEqual(a, b) {
    const first = Buffer.from(String(a || ""));
    const second = Buffer.from(String(b || ""));

    return first.length === second.length &&
        crypto.timingSafeEqual(first, second);
}

function isLocked(ip) {
    const record = loginAttempts.get(ip);
    if (!record) return false;

    if (Date.now() > record.until) {
        loginAttempts.delete(ip);
        return false;
    }

    return record.count >= MAX_ATTEMPTS;
}

function failedLogin(ip) {
    const record = loginAttempts.get(ip) || {
        count: 0,
        until: Date.now() + LOCK_TIME
    };

    record.count += 1;
    record.until = Date.now() + LOCK_TIME;
    loginAttempts.set(ip, record);
}

function clearLoginAttempts(ip) {
    loginAttempts.delete(ip);
}

function requireShopkeeper(req, res, next) {
    if (req.session && req.session.shopkeeperLoggedIn === true) {
        return next();
    }

    if (req.path.startsWith("/api/")) {
        return res.status(401).json({
            success: false,
            message: "Login session समाप्त हो गया। दोबारा login करें।"
        });
    }

    return res.redirect("/shopkeeper/login");
}

function makeCsrfToken() {
    return crypto.randomBytes(32).toString("hex");
}

function verifyCsrf(req, res, next) {
    const sent = req.get("x-csrf-token") || req.body?._csrf || "";
    const saved = req.session?.shopkeeperCsrf || "";

    if (!saved || !safeEqual(sent, saved)) {
        return res.status(403).json({
            success: false,
            message: "Security token गलत है। Page refresh करें।"
        });
    }

    next();
}

function noCache(res) {
    res.set({
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "Pragma": "no-cache",
        "Expires": "0"
    });
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

function loginPage(message = "") {
    return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#111827">
<title>GS Market Shopkeeper Login</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;
font-family:Arial,sans-serif;background:#eef2ff;padding:18px}
.card{width:100%;max-width:390px;background:white;padding:28px;
border-radius:20px;box-shadow:0 12px 40px #0001}
h2{margin:0 0 8px;color:#111827}
p{color:#64748b;font-size:14px}
input{width:100%;padding:14px;margin:8px 0 14px;
border:1px solid #cbd5e1;border-radius:10px;font-size:16px}
button{width:100%;padding:14px;border:0;border-radius:10px;
background:#2563eb;color:white;font-weight:bold;font-size:16px}
.error{color:#dc2626;background:#fef2f2;padding:10px;border-radius:8px}
</style>
</head>
<body>
<form class="card" method="POST" action="/shopkeeper/login">
<h2>🛒 GS Market</h2>
<p>Shopkeeper Secure Login</p>
${message ? `<div class="error">${escapeHtml(message)}</div>` : ""}
<label>Login ID</label>
<input name="loginId" required autocomplete="username">
<label>Password</label>
<input name="password" type="password" required autocomplete="current-password">
<button type="submit">Login करें</button>
</form>
</body>
</html>`;
}

// ==========================================
// LOGIN PAGE
// ==========================================
router.get("/login", (req, res) => {
    noCache(res);

    if (req.session?.shopkeeperLoggedIn === true) {
        return res.redirect("/shopkeeper/dashboard");
    }

    return res.send(loginPage());
});

// ==========================================
// LOGIN POST
// ==========================================
router.post("/login", async (req, res) => {
    noCache(res);

    const ip = String(req.ip || req.socket.remoteAddress || "unknown");

    if (isLocked(ip)) {
        return res.status(429).send(
            loginPage("बहुत बार गलत login हुआ है। 15 मिनट बाद कोशिश करें।")
        );
    }

    const configuredId = process.env.SHOPKEEPER_ID;
    const configuredPassword = process.env.SHOPKEEPER_PASSWORD;

    if (!configuredId || !configuredPassword) {
        console.error("Shopkeeper login environment variables missing.");
        return res.status(503).send(
            loginPage("Shopkeeper Login configuration server पर उपलब्ध नहीं है।")
        );
    }

    const valid =
        safeEqual(req.body.loginId, configuredId) &&
        safeEqual(req.body.password, configuredPassword);

    if (!valid) {
        failedLogin(ip);
        return res.status(401).send(
            loginPage("Login ID या Password गलत है।")
        );
    }

    clearLoginAttempts(ip);

    // Prevent session fixation
    req.session.regenerate(err => {
        if (err) {
            console.error("Shopkeeper session error:", err);
            return res.status(500).send(loginPage("Login नहीं हो पाया।"));
        }

        req.session.shopkeeperLoggedIn = true;
        req.session.shopkeeperCsrf = makeCsrfToken();

        req.session.save(saveError => {
            if (saveError) {
                console.error("Shopkeeper session save error:", saveError);
                return res.status(500).send(loginPage("Session save नहीं हुआ।"));
            }

            return res.redirect("/shopkeeper/dashboard");
        });
    });
});

// ==========================================
// LOGOUT
// ==========================================
router.post("/logout", requireShopkeeper, verifyCsrf, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Logout नहीं हो पाया।");
        }

        res.clearCookie("connect.sid");
        return res.redirect("/shopkeeper/login");
    });
});

// ==========================================
// DASHBOARD PAGE
// ==========================================
router.get("/dashboard", requireShopkeeper, async (req, res) => {
    noCache(res);

    try {
        const csrf = req.session.shopkeeperCsrf;

        const [products, totalOrders, paidOrders, config] =
            await Promise.all([
                Product.countDocuments({ active: true }),
                Order.countDocuments({ paymentStatus: /^paid$/i }),
                Order.find({ paymentStatus: /^paid$/i })
                    .select("totalAmount")
                    .lean(),
                GSMarketConfig.findOne().lean()
            ]);

        const sales = paidOrders.reduce((sum, order) => {
            const amount = Number(order.totalAmount || 0);
            return sum + (Number.isFinite(amount) ? amount : 0);
        }, 0);

        return res.send(dashboardPage({
            csrf,
            products,
            totalOrders,
            sales,
            shopOpen: config ? config.shopOpen !== false : true
        }));
    } catch (error) {
        console.error("Shopkeeper dashboard error:", error);
        return res.status(500).send("Dashboard load नहीं हुआ।");
    }
});

// ==========================================
// REAL ORDERS API
// हर 3 सेकंड frontend इस API को call करेगा
// ==========================================
router.get("/api/orders", requireShopkeeper, async (req, res) => {
    noCache(res);

    try {
        const orders = await Order.find({
            paymentStatus: /^paid$/i
        })
            .sort({ createdAt: -1 })
            .limit(100)
            .lean();

        return res.json({
            success: true,
            orders: orders.map(order => ({
                _id: String(order._id),
                orderNumber: order.orderNumber || String(order._id),
                orderStatus: order.orderStatus || "Pending",
                paymentStatus: order.paymentStatus || "Pending",
                paymentMethod: order.paymentMethod || "Razorpay",
                totalAmount: Number(order.totalAmount || 0),
                subtotal: Number(order.subtotal || 0),
                deliveryCharge: Number(order.deliveryCharge || 0),
                customer: {
                    name: order.customer?.name || "Customer",
                    phone: order.customer?.phone || "",
                    address: order.customer?.address || ""
                },
                items: (order.items || []).map(item => ({
                    name: item.name || "Product",
                    quantity: Number(item.quantity || 0),
                    price: Number(item.price || 0),
                    subtotal: Number(item.subtotal || 0)
                })),
                createdAt: order.createdAt || null
            }))
        });
    } catch (error) {
        console.error("Shopkeeper orders API error:", error);
        return res.status(500).json({
            success: false,
            message: "Orders load नहीं हो सके।"
        });
    }
});

// ==========================================
// SHOP STATUS API
// ==========================================
router.get("/api/shop-status", requireShopkeeper, async (req, res) => {
    noCache(res);

    try {
        const config = await GSMarketConfig.findOne().lean();

        return res.json({
            success: true,
            shopOpen: config ? config.shopOpen !== false : true
        });
    } catch (error) {
        console.error("Shop status read error:", error);
        return res.status(500).json({
            success: false,
            message: "Shop status load नहीं हुआ।"
        });
    }
});

// ==========================================
// SHOP OPEN / CLOSE
// ==========================================
router.post(
    "/api/shop-status",
    requireShopkeeper,
    verifyCsrf,
    async (req, res) => {
        try {
            if (typeof req.body.shopOpen !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid shop status."
                });
            }

            const config = await GSMarketConfig.findOneAndUpdate(
                {},
                {
                    $set: {
                        shopOpen: req.body.shopOpen
                    }
                },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                    runValidators: true
                }
            );

            return res.json({
                success: true,
                shopOpen: config.shopOpen,
                message: config.shopOpen
                    ? "दुकान खोल दी गई है।"
                    : "दुकान बंद कर दी गई है।"
            });
        } catch (error) {
            console.error("Shopkeeper shop status update error:", error);
            return res.status(500).json({
                success: false,
                message: "Shop status update नहीं हुआ।"
            });
        }
    }
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================
router.post(
    "/api/orders/:id/status",
    requireShopkeeper,
    verifyCsrf,
    async (req, res) => {
        try {
            const { id } = req.params;
            const status = req.body.orderStatus;

            const allowedStatuses = [
                "Confirmed",
                "Shipped",
                "Delivered",
                "Cancelled"
            ];

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order ID."
                });
            }

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order status."
                });
            }

            const order = await Order.findOne({
                _id: id,
                paymentStatus: /^paid$/i
            });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Paid order नहीं मिला।"
                });
            }

            const transitions = {
                Pending: ["Confirmed", "Cancelled"],
                Confirmed: ["Shipped", "Cancelled"],
                Shipped: ["Delivered"],
                Delivered: [],
                Cancelled: []
            };

            const currentStatus = order.orderStatus || "Pending";

            if (!transitions[currentStatus] ||
                !transitions[currentStatus].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `इस order को ${currentStatus} से ${status} करना अनुमत नहीं है।`
                });
            }

            order.orderStatus = status;
            await order.save();

            return res.json({
                success: true,
                message: "Order status update हो गया।",
                order: {
                    _id: String(order._id),
                    orderStatus: order.orderStatus
                }
            });
        } catch (error) {
            console.error("Shopkeeper update order error:", error);
            return res.status(500).json({
                success: false,
                message: "Order status update नहीं हुआ।"
            });
        }
    }
);

// ==========================================
// DASHBOARD HTML
// ==========================================
function dashboardPage(data) {
    const csrf = escapeHtml(data.csrf);

    return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#111827">
<title>GS Market Shopkeeper</title>
<link rel="manifest" href="/shopkeeper/manifest.webmanifest">
<style>
*{box-sizing:border-box}
body{margin:0;background:#f1f5f9;color:#0f172a;font-family:Arial,sans-serif}
header{background:#111827;color:white;padding:16px;display:flex;
justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
header h2{margin:0;font-size:20px}
button{cursor:pointer;border:0;border-radius:9px;padding:10px 13px;
font-weight:bold}
.logout{background:#ef4444;color:white}
main{max-width:1100px;margin:auto;padding:15px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:15px 0}
.stat{background:white;padding:17px;border-radius:13px;box-shadow:0 2px 8px #0000000b}
.stat small{color:#64748b}
.stat strong{display:block;font-size:23px;margin-top:8px}
.panel{background:white;padding:15px;border-radius:14px;margin:14px 0}
.shopline{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.open{background:#16a34a;color:white}
.closed{background:#dc2626;color:white}
.tools{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.tools button{background:#e2e8f0;color:#0f172a}
.order{background:white;border:1px solid #e2e8f0;border-radius:13px;
padding:15px;margin:12px 0}
.order-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.order h3{margin:0 0 8px}
.muted{color:#64748b;font-size:13px;line-height:1.6}
.items{background:#f8fafc;padding:10px;border-radius:9px;margin:10px 0}
.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.actions button{background:#2563eb;color:white}
.actions .cancel{background:#dc2626}
.status{font-weight:bold;color:#2563eb}
.empty{text-align:center;padding:30px;color:#64748b}
#toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);
background:#111827;color:white;padding:12px 18px;border-radius:10px;
display:none;z-index:10;max-width:90%;text-align:center}
@media(max-width:600px){.stats{grid-template-columns:1fr 1fr}
.stat:last-child{grid-column:span 2}header h2{font-size:17px}}
</style>
</head>
<body>
<header>
<h2>🛒 GS Market Shopkeeper</h2>
<form method="POST" action="/shopkeeper/logout">
<input type="hidden" name="_csrf" value="${csrf}">
<button class="logout" type="submit">Logout</button>
</form>
</header>

<main>
<section class="stats">
<div class="stat"><small>Active Products</small><strong>${Number(data.products)}</strong></div>
<div class="stat"><small>Total Paid Orders</small><strong id="totalOrders">${Number(data.totalOrders)}</strong></div>
<div class="stat"><small>Paid Sales</small><strong id="totalSales">₹${Number(data.sales).toFixed(2)}</strong></div>
</section>

<section class="panel">
<div class="shopline">
<div>
<strong>Shop Status</strong>
<div class="muted" id="shopText">दुकान की स्थिति</div>
</div>
<button id="shopToggle" class="${data.shopOpen ? "open" : "closed"}"
onclick="toggleShop()">${data.shopOpen ? "SHOP OPEN" : "SHOP CLOSED"}</button>
</div>
</section>

<section class="panel">
<strong>Notifications & Settings</strong>
<div class="tools">
<button onclick="enableNotifications()">🔔 Mobile / Browser Notification चालू करें</button>
<button onclick="toggleSound()" id="soundBtn">🔊 Sound: ON</button>
<button onclick="loadOrders(true)">↻ अभी Refresh करें</button>
</div>
<p class="muted">Orders अपने आप हर 3 सेकंड में अपडेट होंगे। Notification अनुमति देने के बाद नए order की सूचना मिलेगी।</p>
<p class="muted" id="lastUpdate">Connecting...</p>
</section>

<h3>📦 Customer Orders</h3>
<div id="orders"><div class="empty">Orders load हो रहे हैं...</div></div>
</main>

<div id="toast"></div>

<script>
const CSRF = ${JSON.stringify(data.csrf)};
let previousIds = new Set();
let firstLoad = true;
let soundOn = true;
let currentShopOpen = ${data.shopOpen ? "true" : "false"};
let loading = false;

function toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.style.display = "block";
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => el.style.display = "none", 2800);
}

async function api(url, options = {}) {
    const response = await fetch(url, {
        credentials: "same-origin",
        cache: "no-store",
        ...options,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": CSRF,
            ...(options.headers || {})
        }
    });

    if (response.status === 401) {
        location.href = "/shopkeeper/login";
        throw new Error("Login session समाप्त।");
    }

    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.message || "Request failed");
    }
    return result;
}

function playSound() {
    if (!soundOn) return;
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.frequency.value = 880;
        gain.gain.value = 0.12;
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.22);
        oscillator.onended = () => ctx.close();
    } catch (e) {}
}

function toggleSound() {
    soundOn = !soundOn;
    document.getElementById("soundBtn").textContent =
        soundOn ? "🔊 Sound: ON" : "🔇 Sound: OFF";
    if (soundOn) playSound();
}

async function enableNotifications() {
    if (!("Notification" in window)) {
        toast("इस browser में notifications उपलब्ध नहीं हैं।");
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            toast("Browser / Mobile notification चालू हो गया।");
            new Notification("GS Market", {
                body: "नए order की notification चालू है।"
            });
        } else {
            toast("Notification permission नहीं मिली। Browser settings जाँचें।");
        }
    } catch (e) {
        toast("Notification चालू नहीं हो पाया।");
    }
}

function notifyNewOrder(order) {
    playSound();

    if ("Notification" in window && Notification.permission === "granted") {
        try {
            new Notification("🛒 GS Market - नया Order", {
                body: order.orderNumber + " | ₹" +
                    Number(order.totalAmount).toFixed(2) +
                    " | " + (order.customer.name || "Customer"),
                tag: "gs-order-" + order._id
            });
        } catch (e) {}
    }
}

function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-IN");
}

function safe(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
}

function renderOrders(orders) {
    const root = document.getElementById("orders");

    if (!orders.length) {
        root.innerHTML = '<div class="empty">अभी कोई Paid Order नहीं है।</div>';
        return;
    }

    root.innerHTML = orders.map(order => {
        const status = order.orderStatus || "Pending";
        const items = (order.items || []).map(item =>
            "<div>" + safe(item.name) + " × " +
            Number(item.quantity || 0) + " — ₹" +
            Number(item.subtotal || 0).toFixed(2) + "</div>"
        ).join("");

        let buttons = "";
        if (status === "Pending") {
            buttons =
                '<button onclick="updateStatus(\\'' + order._id + '\\',\\'Confirmed\\')">Accept Order</button>' +
                '<button class="cancel" onclick="updateStatus(\\'' + order._id + '\\',\\'Cancelled\\')">Reject Order</button>';
        } else if (status === "Confirmed") {
            buttons = '<button onclick="updateStatus(\\'' + order._id + '\\',\\'Shipped\\')">Mark Shipped</button>';
        } else if (status === "Shipped") {
            buttons = '<button onclick="updateStatus(\\'' + order._id + '\\',\\'Delivered\\')">Mark Delivered</button>';
        }

        return '<article class="order">' +
            '<div class="order-top"><h3>Order: ' + safe(order.orderNumber) +
            '</h3><span class="status">' + safe(status) + '</span></div>' +
            '<div class="muted">Date: ' + safe(formatDate(order.createdAt)) +
            '<br>Payment: ' + safe(order.paymentStatus) +
            ' (' + safe(order.paymentMethod) + ')</div>' +
            '<hr>' +
            '<strong>' + safe(order.customer.name) + '</strong>' +
            '<div class="muted">📞 ' + safe(order.customer.phone) +
            '<br>📍 ' + safe(order.customer.address) + '</div>' +
            '<div class="items">' + items + '</div>' +
            '<strong>Total: ₹' + Number(order.totalAmount).toFixed(2) + '</strong>' +
            '<div class="actions">' + buttons +
            '<button onclick="window.open(\\'/admin/market/orders\\',\\'_blank\\')">Admin Orders</button>' +
            '</div></article>';
    }).join("");
}

async function loadOrders(manual = false) {
    if (loading) return;
    loading = true;

    try {
        const result = await api("/shopkeeper/api/orders");
        const orders = result.orders || [];

        const newOrders = orders.filter(order =>
            !firstLoad && !previousIds.has(order._id)
        );

        newOrders.forEach(notifyNewOrder);

        previousIds = new Set(orders.map(order => order._id));
        firstLoad = false;

        renderOrders(orders);

        document.getElementById("totalOrders").textContent = orders.length;
        const sales = orders.reduce((sum, order) =>
            sum + Number(order.totalAmount || 0), 0
        );
        document.getElementById("totalSales").textContent =
            "₹" + sales.toFixed(2);

        document.getElementById("lastUpdate").textContent =
            "Last updated: " + new Date().toLocaleTimeString("en-IN");

        if (manual) toast("Orders refresh हो गए।");
    } catch (error) {
        console.error(error);
        document.getElementById("lastUpdate").textContent =
            "Update error: " + error.message;
    } finally {
        loading = false;
    }
}

async function updateStatus(id, status) {
    const confirmText = status === "Cancelled"
        ? "क्या आप इस order को Reject / Cancel करना चाहते हैं?"
        : "क्या आप order status " + status + " करना चाहते हैं?";

    if (!confirm(confirmText)) return;

    try {
        await api("/shopkeeper/api/orders/" + encodeURIComponent(id) + "/status", {
            method: "POST",
            body: JSON.stringify({ orderStatus: status })
        });
        toast("Order status update हो गया।");
        await loadOrders();
    } catch (error) {
        toast(error.message);
    }
}

async function toggleShop() {
    const next = !currentShopOpen;
    const message = next
        ? "दुकान खोलना चाहते हैं?"
        : "दुकान बंद करना चाहते हैं?";

    if (!confirm(message)) return;

    try {
        const result = await api("/shopkeeper/api/shop-status", {
            method: "POST",
            body: JSON.stringify({ shopOpen: next })
        });

        currentShopOpen = result.shopOpen;
        const btn = document.getElementById("shopToggle");
        btn.textContent = currentShopOpen ? "SHOP OPEN" : "SHOP CLOSED";
        btn.className = currentShopOpen ? "open" : "closed";
        document.getElementById("shopText").textContent = result.message;
        toast(result.message);
    } catch (error) {
        toast(error.message);
    }
}

document.getElementById("shopText").textContent =
    currentShopOpen ? "दुकान अभी खुली है।" : "दुकान अभी बंद है।";

loadOrders();
setInterval(() => loadOrders(), 3000);

// Mobile install prompt (browser may show install option itself)
if ("serviceWorker" in navigator) {
    // No service worker is required for live dashboard updates.
}
</script>
</body>
</html>`;
}

module.exports = router;