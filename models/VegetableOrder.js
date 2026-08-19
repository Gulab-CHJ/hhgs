const mongoose = require("mongoose");

const vegetableOrderSchema =
    new mongoose.Schema(
        {
            customerName: {
                type: String,
                required: true
            },

            mobile: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            items: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "VegetableProduct"
                    },

                    name: String,

                    unit: String,

                    price: {
                        type: Number,
                        default: 0
                    },

                    quantity: {
                        type: Number,
                        default: 1
                    },

                    amount: {
                        type: Number,
                        default: 0
                    }
                }
            ],

            subtotal: {
                type: Number,
                default: 0
            },

            deliveryCharge: {
                type: Number,
                default: 0
            },

            totalAmount: {
                type: Number,
                default: 0
            },

            paymentMethod: {
                type: String,
                default: "COD"
            },

            status: {
                type: String,
                enum: [
                    "Pending",
                    "Accepted",
                    "Preparing",
                    "Out for Delivery",
                    "Delivered",
                    "Cancelled"
                ],
                default: "Pending"
            }
        },
        {
            timestamps: true
        }
    );



    // ======================================================
// ADMIN SABJI ORDERS PAGE
// GET /admin/sabji/orders
// ======================================================

router.get(
    "/admin/sabji/orders",
    async (req, res, next) => {
        try {
            const orders = await VegetableOrder
                .find({})
                .sort({ createdAt: -1 })
                .lean();

            const pendingCount =
                await VegetableOrder.countDocuments({
                    status: "Pending"
                });

            function escapeHTML(value) {
                return String(value || "")
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }

            const statuses = [
                "Pending",
                "Accepted",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ];

            const orderCards = orders.length
                ? orders.map((order) => {
                    const items = Array.isArray(order.items)
                        ? order.items
                        : [];

                    const itemHTML = items.map((item) => `
                        <div class="item">
                            <strong>${escapeHTML(item.name)}</strong>

                            <span>
                                ${Number(item.quantity || 1)}
                                ${escapeHTML(item.unit || "")}
                                × ₹${Number(item.price || 0).toFixed(2)}
                            </span>
                        </div>
                    `).join("");

                    const statusOptions = statuses
                        .map((status) => `
                            <option
                                value="${status}"
                                ${
                                    order.status === status
                                        ? "selected"
                                        : ""
                                }
                            >
                                ${status}
                            </option>
                        `).join("");

                    const orderDate = order.createdAt
                        ? new Date(order.createdAt)
                            .toLocaleString("en-IN")
                        : "-";

                    return `
                        <article
                            class="order-card"
                            data-order-id="${order._id}"
                        >
                            <div class="order-head">
                                <div>
                                    <small>ORDER ID</small>
                                    <strong>
                                        #${String(order._id).slice(-6).toUpperCase()}
                                    </strong>
                                </div>

                                <span class="status-badge">
                                    ${escapeHTML(order.status)}
                                </span>
                            </div>

                            <h3>
                                👤 ${escapeHTML(order.customerName)}
                            </h3>

                            <p>
                                📞
                                <a href="tel:${escapeHTML(order.mobile)}">
                                    ${escapeHTML(order.mobile)}
                                </a>
                            </p>

                            <p>
                                📍 ${escapeHTML(order.address)}
                            </p>

                            <div class="items">
                                ${itemHTML}
                            </div>

                            <div class="total">
                                <span>Total Amount</span>

                                <strong>
                                    ₹${Number(order.totalAmount || 0).toFixed(2)}
                                </strong>
                            </div>

                            <div class="order-date">
                                ${escapeHTML(orderDate)}
                            </div>

                            <form
                                method="POST"
                                action="/admin/sabji/order/${order._id}/status"
                                class="status-form"
                            >
                                <select name="status">
                                    ${statusOptions}
                                </select>

                                <button type="submit">
                                    Update
                                </button>
                            </form>
                        </article>
                    `;
                }).join("")
                : `
                    <div class="empty" id="emptyOrders">
                        अभी कोई Sabji Order नहीं आया है।
                    </div>
                `;

            return res.send(`
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>Sabji Orders</title>

<style>

*{
    box-sizing:border-box;
}

body{
    margin:0;
    font-family:Arial,sans-serif;
    background:#f1f5f9;
    color:#0f172a;
}

header{
    padding:18px;
    background:linear-gradient(135deg,#065f46,#16a34a);
    color:white;
}

.header-inner{
    max-width:1100px;
    margin:auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
}

header h1{
    margin:0 0 5px;
    font-size:23px;
}

header p{
    margin:0;
    font-size:13px;
    opacity:.9;
}

.back-btn{
    padding:10px 14px;
    background:white;
    color:#166534;
    text-decoration:none;
    font-weight:700;
    border-radius:10px;
}

.container{
    max-width:1100px;
    margin:auto;
    padding:18px;
}

.notification-panel{
    background:white;
    padding:15px;
    border-radius:14px;
    margin-bottom:18px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    box-shadow:0 8px 24px rgba(15,23,42,.08);
}

.ring-btn{
    border:0;
    padding:12px 17px;
    border-radius:10px;
    background:#f97316;
    color:white;
    font-weight:700;
    cursor:pointer;
}

.orders-grid{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:16px;
}

.order-card{
    background:white;
    border-radius:16px;
    padding:17px;
    box-shadow:0 8px 25px rgba(15,23,42,.08);
    border-left:5px solid #22c55e;
}

.order-head{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
}

.order-head small{
    display:block;
    color:#64748b;
    font-size:10px;
}

.status-badge{
    background:#fef3c7;
    color:#92400e;
    padding:6px 10px;
    border-radius:20px;
    font-size:12px;
    font-weight:700;
}

.order-card h3{
    margin:16px 0 8px;
}

.order-card p{
    margin:7px 0;
    color:#475569;
}

.order-card a{
    color:#0369a1;
    text-decoration:none;
    font-weight:700;
}

.items{
    margin-top:14px;
    background:#f8fafc;
    border-radius:10px;
    padding:10px;
}

.item{
    display:flex;
    justify-content:space-between;
    gap:10px;
    padding:7px 0;
    border-bottom:1px solid #e2e8f0;
}

.item:last-child{
    border-bottom:0;
}

.total{
    display:flex;
    justify-content:space-between;
    margin-top:13px;
    font-size:18px;
}

.total strong{
    color:#15803d;
}

.order-date{
    margin-top:10px;
    color:#64748b;
    font-size:12px;
}

.status-form{
    display:flex;
    gap:8px;
    margin-top:14px;
}

.status-form select{
    flex:1;
    padding:10px;
    border:1px solid #cbd5e1;
    border-radius:8px;
}

.status-form button{
    border:0;
    padding:10px 15px;
    background:#0f766e;
    color:white;
    font-weight:700;
    border-radius:8px;
    cursor:pointer;
}

.empty{
    grid-column:1/-1;
    padding:50px 20px;
    text-align:center;
    background:white;
    border-radius:15px;
    color:#64748b;
}

.new-order-alert{
    display:none;
    position:fixed;
    top:15px;
    left:50%;
    transform:translateX(-50%);
    z-index:1000;
    padding:14px 22px;
    border-radius:12px;
    background:#dc2626;
    color:white;
    font-weight:800;
    box-shadow:0 10px 35px rgba(0,0,0,.25);
}

@media(max-width:700px){

    .orders-grid{
        grid-template-columns:1fr;
    }

    .header-inner,
    .notification-panel{
        align-items:flex-start;
        flex-direction:column;
    }
}

</style>

</head>

<body>

<div class="new-order-alert" id="newOrderAlert">
    🔔 NEW SABJI ORDER RECEIVED!
</div>

<header>

    <div class="header-inner">

        <div>
            <h1>🥬 GLOBAL MINI SABJI</h1>
            <p>Customer Orders Management</p>
        </div>

        <a
            href="/admin/sabji/products"
            class="back-btn"
        >
            ← Products
        </a>

    </div>

</header>

<main class="container">

    <div class="notification-panel">

        <div>
            <strong>
                Pending Orders:
                <span id="pendingCount">
                    ${pendingCount}
                </span>
            </strong>

            <div style="font-size:12px;color:#64748b;margin-top:4px">
                Ring के लिए यह page laptop में खुला रखें।
            </div>
        </div>

        <button
            type="button"
            class="ring-btn"
            id="enableRing"
        >
            🔔 Enable Order Ring
        </button>

    </div>

    <section
        class="orders-grid"
        id="ordersGrid"
    >
        ${orderCards}
    </section>

</main>

<script>

let audioContext = null;
let ringEnabled = false;

const knownOrderIds = new Set(
    Array.from(
        document.querySelectorAll(
            "[data-order-id]"
        )
    ).map(function(element){
        return element.dataset.orderId;
    })
);


function escapeHTML(value){

    return String(value || "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


function playRing(){

    if(
        !ringEnabled ||
        !audioContext
    ){
        return;
    }

    const startTime =
        audioContext.currentTime;

    [0,0.35,0.70].forEach(
        function(delay){

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();

            oscillator.connect(gain);
            gain.connect(
                audioContext.destination
            );

            oscillator.type = "sine";
            oscillator.frequency.value = 900;

            gain.gain.setValueAtTime(
                0.001,
                startTime + delay
            );

            gain.gain.exponentialRampToValueAtTime(
                0.8,
                startTime + delay + 0.02
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + delay + 0.25
            );

            oscillator.start(
                startTime + delay
            );

            oscillator.stop(
                startTime + delay + 0.28
            );
        }
    );
}


document
    .getElementById("enableRing")
    .addEventListener(
        "click",
        async function(){

            const AudioContextClass =
                window.AudioContext ||
                window.webkitAudioContext;

            if(!AudioContextClass){

                alert(
                    "इस browser में audio support नहीं है।"
                );

                return;
            }

            if(!audioContext){

                audioContext =
                    new AudioContextClass();
            }

            await audioContext.resume();

            ringEnabled = true;

            this.innerText =
                "✅ Order Ring Enabled";

            this.style.background =
                "#16a34a";

            playRing();
        }
    );


function addNewOrderCard(order){

    if(
        !order ||
        !order._id ||
        knownOrderIds.has(order._id)
    ){
        return false;
    }

    knownOrderIds.add(order._id);

    const empty =
        document.getElementById(
            "emptyOrders"
        );

    if(empty){
        empty.remove();
    }

    const items = Array.isArray(order.items)
        ? order.items
        : [];

    const itemHTML = items.map(
        function(item){

            return (
                '<div class="item">' +
                    '<strong>' +
                        escapeHTML(item.name) +
                    '</strong>' +
                    '<span>' +
                        Number(item.quantity || 1) +
                        ' ' +
                        escapeHTML(item.unit || "") +
                        ' × ₹' +
                        Number(item.price || 0).toFixed(2) +
                    '</span>' +
                '</div>'
            );
        }
    ).join("");


    const card =
        document.createElement("article");

    card.className =
        "order-card";

    card.dataset.orderId =
        order._id;

    card.innerHTML =
        '<div class="order-head">' +
            '<div>' +
                '<small>ORDER ID</small>' +
                '<strong>#' +
                    String(order._id)
                        .slice(-6)
                        .toUpperCase() +
                '</strong>' +
            '</div>' +
            '<span class="status-badge">' +
                escapeHTML(order.status || "Pending") +
            '</span>' +
        '</div>' +

        '<h3>👤 ' +
            escapeHTML(order.customerName) +
        '</h3>' +

        '<p>📞 <a href="tel:' +
            escapeHTML(order.mobile) +
        '">' +
            escapeHTML(order.mobile) +
        '</a></p>' +

        '<p>📍 ' +
            escapeHTML(order.address) +
        '</p>' +

        '<div class="items">' +
            itemHTML +
        '</div>' +

        '<div class="total">' +
            '<span>Total Amount</span>' +
            '<strong>₹' +
                Number(order.totalAmount || 0)
                    .toFixed(2) +
            '</strong>' +
        '</div>' +

        '<div class="order-date">' +
            new Date(order.createdAt)
                .toLocaleString("en-IN") +
        '</div>' +

        '<form method="POST" ' +
            'action="/admin/sabji/order/' +
            order._id +
            '/status" class="status-form">' +

            '<select name="status">' +
                '<option value="Pending">Pending</option>' +
                '<option value="Accepted">Accepted</option>' +
                '<option value="Preparing">Preparing</option>' +
                '<option value="Out for Delivery">Out for Delivery</option>' +
                '<option value="Delivered">Delivered</option>' +
                '<option value="Cancelled">Cancelled</option>' +
            '</select>' +

            '<button type="submit">Update</button>' +
        '</form>';

    document
        .getElementById("ordersGrid")
        .prepend(card);

    return true;
}


// CHECK NEW ORDERS EVERY 4 SECONDS

async function checkNewOrders(){

    try{

        const response =
            await fetch(
                "/admin/sabji/orders/check",
                {
                    cache:"no-store"
                }
            );

        const data =
            await response.json();

        if(!data.success){
            return;
        }

        document
            .getElementById("pendingCount")
            .innerText =
                Number(data.pendingCount || 0);

        let newOrderFound = false;

        const orders =
            Array.isArray(data.orders)
                ? data.orders.slice().reverse()
                : [];

        orders.forEach(function(order){

            if(addNewOrderCard(order)){
                newOrderFound = true;
            }
        });

        if(newOrderFound){

            document.title =
                "🔔 NEW SABJI ORDER";

            const alertBox =
                document.getElementById(
                    "newOrderAlert"
                );

            alertBox.style.display =
                "block";

            playRing();

            setTimeout(function(){

                alertBox.style.display =
                    "none";

                document.title =
                    "Sabji Orders";

            },5000);
        }

    }catch(error){

        console.error(
            "ORDER CHECK ERROR:",
            error
        );
    }
}


setInterval(
    checkNewOrders,
    4000
);

</script>

</body>

</html>
            `);

        } catch (error) {
            next(error);
        }
    }
);


// ======================================================
// CHECK NEW ORDERS API
// GET /admin/sabji/orders/check
// ======================================================

router.get(
    "/admin/sabji/orders/check",
    async (req, res, next) => {
        try {
            const orders = await VegetableOrder
                .find({})
                .sort({ createdAt: -1 })
                .limit(10)
                .lean();

            const pendingCount =
                await VegetableOrder.countDocuments({
                    status: "Pending"
                });

            return res.json({
                success: true,
                pendingCount,
                orders
            });

        } catch (error) {
            next(error);
        }
    }
);


// ======================================================
// UPDATE ORDER STATUS
// POST /admin/sabji/order/:id/status
// ======================================================

router.post(
    "/admin/sabji/order/:id/status",
    async (req, res, next) => {
        try {
            const allowedStatuses = [
                "Pending",
                "Accepted",
                "Preparing",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ];

            const status =
                String(req.body.status || "");

            if (!allowedStatuses.includes(status)) {
                return res
                    .status(400)
                    .send("Invalid order status");
            }

            await VegetableOrder.findByIdAndUpdate(
                req.params.id,
                { status }
            );

            return res.redirect(
                "/admin/sabji/orders"
            );

        } catch (error) {
            next(error);
        }
    }
);

module.exports = mongoose.model(
    "VegetableOrder",
    vegetableOrderSchema
);