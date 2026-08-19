const express = require("express");

const router = express.Router();

const VegetableProduct =
    require("../models/VegetableProduct");

const VegetableOrder =
    require("../models/VegetableOrder");

const ShopSetting =
    require("../models/ShopSetting");


// ========================================
// GET SHOP SETTING
// ========================================

async function getShopSetting() {

    let setting =
        await ShopSetting.findOne();

    if (!setting) {

        setting =
            await ShopSetting.create({
                shopName:
                    "GLOBAL MINI SABJI",

                isOpen:
                    true
            });
    }

    return setting;
}


// ========================================
// CUSTOMER SHOP PAGE
// GET /sabji
// ========================================

router.get(
    "/sabji",
    async (req, res, next) => {

        try {

            const setting =
                await getShopSetting();

            const products =
                await VegetableProduct
                    .find({
                        isActive: true
                    })
                    .sort({
                        createdAt: -1
                    })
                    .lean();


            const cards =
                products.length
                    ? products.map(product => {

                        const disabled =
                            !setting.isOpen ||
                            Number(product.stock) <= 0;

                        const buttonText =
                            !setting.isOpen
                                ? "SHOP CLOSED"
                                : Number(product.stock) <= 0
                                    ? "OUT OF STOCK"
                                    : "ADD TO CART";


                        return `
                        <div class="product-card ${disabled ? "disabled-card" : ""}">

                            <div class="image-area">

                                ${
                                    product.image
                                        ? `
                                        <img
                                            src="${product.image}"
                                            alt="${product.name}"
                                        >
                                        `
                                        : `
                                        <div class="no-image">
                                            🥬
                                        </div>
                                        `
                                }

                                ${
                                    !setting.isOpen
                                        ? `
                                        <span class="closed-badge">
                                            SHOP CLOSED
                                        </span>
                                        `
                                        : ""
                                }

                            </div>


                            <div class="product-info">

                                <h3>
                                    ${product.name}
                                </h3>

                                <div class="unit">
                                    ${product.unit || ""}
                                </div>


                                <div class="price-row">

                                    <strong>
                                        ₹${Number(product.price || 0).toFixed(2)}
                                    </strong>

                                    ${
                                        Number(product.mrp) >
                                        Number(product.price)

                                            ? `
                                            <del>
                                                ₹${Number(product.mrp).toFixed(2)}
                                            </del>
                                            `
                                            : ""
                                    }

                                </div>


                                <button
                                    class="cart-btn"
                                    ${disabled ? "disabled" : ""}
                                    onclick="addToCart(
                                        '${product._id}',
                                        '${String(product.name).replace(/'/g, "\\'")}',
                                        ${Number(product.price || 0)},
                                        '${String(product.unit || "").replace(/'/g, "\\'")}'
                                    )"
                                >
                                    ${buttonText}
                                </button>

                            </div>

                        </div>
                        `;
                    }).join("")

                    : `
                    <div class="empty">
                        अभी कोई सब्जी उपलब्ध नहीं है।
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

<title>
${setting.shopName}
</title>


<style>

*{
    box-sizing:border-box;
}

body{
    margin:0;
    font-family:
        Arial,
        sans-serif;
    background:#f4f7f5;
    color:#17211b;
}

.header{
    background:#ffffff;
    padding:16px;
    position:sticky;
    top:0;
    z-index:20;
    box-shadow:
        0 3px 15px
        rgba(0,0,0,.08);
}

.header-inner{
    max-width:1200px;
    margin:auto;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:15px;
}

.brand{
    font-size:21px;
    font-weight:800;
}

.status{
    padding:8px 13px;
    border-radius:50px;
    font-weight:700;
    font-size:13px;
}

.open{
    background:#dcfce7;
    color:#15803d;
}

.closed{
    background:#fee2e2;
    color:#b91c1c;
}

.hero{
    max-width:1200px;
    margin:20px auto 5px;
    padding:20px;
}

.hero h1{
    margin:0;
    font-size:29px;
}

.hero p{
    margin-top:7px;
    color:#68746c;
}

.grid{
    max-width:1200px;
    margin:auto;
    padding:15px 20px 100px;

    display:grid;

    grid-template-columns:
        repeat(
            auto-fill,
            minmax(200px,1fr)
        );

    gap:16px;
}

.product-card{
    background:white;
    border-radius:18px;
    overflow:hidden;

    box-shadow:
        0 5px 18px
        rgba(0,0,0,.07);

    transition:.2s;
}

.product-card:hover{
    transform:translateY(-3px);
}

.disabled-card{
    opacity:.65;
}

.image-area{
    height:180px;
    background:#f2f7f3;
    position:relative;

    display:flex;
    align-items:center;
    justify-content:center;
}

.image-area img{
    width:100%;
    height:100%;
    object-fit:cover;
}

.no-image{
    font-size:70px;
}

.closed-badge{
    position:absolute;
    top:12px;
    left:12px;

    background:#dc2626;
    color:white;

    padding:7px 10px;

    border-radius:8px;

    font-size:11px;
    font-weight:800;
}

.product-info{
    padding:15px;
}

.product-info h3{
    margin:0 0 7px;
    font-size:17px;
}

.unit{
    color:#6b7280;
    font-size:13px;
    min-height:20px;
}

.price-row{
    margin-top:12px;
    display:flex;
    align-items:center;
    gap:8px;
}

.price-row strong{
    font-size:20px;
}

.price-row del{
    color:#999;
    font-size:13px;
}

.cart-btn{
    margin-top:14px;

    width:100%;
    border:none;

    background:#16a34a;
    color:white;

    padding:12px;

    border-radius:10px;

    font-weight:800;
    cursor:pointer;
}

.cart-btn:disabled{
    background:#9ca3af;
    cursor:not-allowed;
}

.bottom-cart{
    position:fixed;
    bottom:15px;
    left:50%;
    transform:translateX(-50%);

    width:
        calc(100% - 30px);

    max-width:500px;

    background:#17211b;
    color:white;

    border-radius:15px;

    padding:14px 18px;

    display:flex;
    align-items:center;
    justify-content:space-between;

    z-index:40;

    box-shadow:
        0 8px 30px
        rgba(0,0,0,.25);
}

.bottom-cart button{
    background:#22c55e;
    color:white;
    border:0;

    padding:10px 16px;

    border-radius:9px;

    font-weight:bold;
}

.empty{
    grid-column:1/-1;

    text-align:center;
    background:white;

    padding:40px;

    border-radius:15px;
}

@media(max-width:600px){

    .grid{
        grid-template-columns:
            repeat(2,1fr);

        padding-left:10px;
        padding-right:10px;

        gap:10px;
    }

    .image-area{
        height:140px;
    }

    .product-info{
        padding:11px;
    }

    .product-info h3{
        font-size:14px;
    }

    .hero{
        padding:15px;
    }
}

</style>

</head>


<body>


<header class="header">

    <div class="header-inner">

        <div class="brand">
            🥬 ${setting.shopName}
        </div>

        <div
            class="
                status
                ${setting.isOpen ? "open" : "closed"}
            "
        >

            ${
                setting.isOpen
                    ? "● SHOP OPEN"
                    : "● SHOP CLOSED"
            }

        </div>

    </div>

</header>


<section class="hero">

    <h1>
        Fresh Vegetables 🥕
    </h1>

    <p>
        Fresh sabji ghar tak order karein.
    </p>

</section>


<main class="grid">

    ${cards}

</main>


<div
    class="bottom-cart"
    id="bottomCart"
>

    <div>

        🛒
        <span id="cartCount">
            0
        </span>

        Items

    </div>

    <button
        onclick="openCart()"
    >
        View Cart
    </button>

</div>


<script>

const SHOP_OPEN =
    ${setting.isOpen ? "true" : "false"};


function getCart(){

    try{

        return JSON.parse(
            localStorage.getItem(
                "vegetableCart"
            )
        ) || [];

    }catch(error){

        return [];

    }
}


function saveCart(cart){

    localStorage.setItem(
        "vegetableCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function addToCart(
    productId,
    name,
    price,
    unit
){

    if(!SHOP_OPEN){

        alert(
            "Shop abhi closed hai."
        );

        return;
    }


    let cart =
        getCart();


    const index =
        cart.findIndex(
            item =>
                item.productId ===
                productId
        );


    if(index >= 0){

        cart[index].quantity += 1;

    }else{

        cart.push({

            productId,
            name,
            price,
            unit,

            quantity:1

        });

    }


    saveCart(cart);


    alert(
        name +
        " cart me add ho gaya."
    );
}


function updateCartCount(){

    const cart =
        getCart();

    const count =
        cart.reduce(
            (sum,item) =>
                sum +
                Number(
                    item.quantity || 0
                ),
            0
        );


    document.getElementById(
        "cartCount"
    ).innerText =
        count;
}


function openCart(){

    window.location.href =
        "/sabji/cart";
}


updateCartCount();

</script>


</body>
</html>
            `);

        } catch (error) {

            next(error);
        }
    }
);


// ========================================
// SIMPLE CART PAGE
// ========================================

router.get(
    "/sabji/cart",
    async (req, res, next) => {

        try {

            const setting =
                await getShopSetting();

            return res.send(`
<!DOCTYPE html>

<html>

<head>

<meta name="viewport"
content="width=device-width,initial-scale=1">

<title>Sabji Cart</title>

<style>

body{
    font-family:Arial;
    background:#f4f7f5;
    margin:0;
    padding:20px;
}

.container{
    max-width:600px;
    margin:auto;
}

.card{
    background:white;
    padding:18px;
    border-radius:16px;
    margin-bottom:15px;
}

.item{
    display:flex;
    justify-content:space-between;
    padding:12px 0;
    border-bottom:1px solid #eee;
}

button{
    border:0;
    padding:13px 18px;
    border-radius:9px;
    background:#16a34a;
    color:white;
    font-weight:bold;
    cursor:pointer;
}

button:disabled{
    background:#999;
}

input,
textarea{
    width:100%;
    padding:12px;
    margin:6px 0 12px;
    border:1px solid #ddd;
    border-radius:8px;
}

</style>

</head>


<body>

<div class="container">

<h2>
🛒 Your Sabji Cart
</h2>


<div
    class="card"
    id="items"
></div>


<div class="card">

<h3>
Delivery Details
</h3>

<input
    id="name"
    placeholder="Customer Name"
>

<input
    id="mobile"
    placeholder="Mobile Number"
>

<textarea
    id="address"
    placeholder="Full Delivery Address"
></textarea>


<button
    onclick="placeOrder()"
    ${!setting.isOpen ? "disabled" : ""}
>
    ${
        setting.isOpen
            ? "PLACE ORDER"
            : "SHOP CLOSED"
    }
</button>

</div>

</div>


<script>

const SHOP_OPEN =
    ${setting.isOpen ? "true" : "false"};


function getCart(){

    try{

        return JSON.parse(
            localStorage.getItem(
                "vegetableCart"
            )
        ) || [];

    }catch(error){

        return [];

    }
}


function renderCart(){

    const cart =
        getCart();

    const box =
        document.getElementById(
            "items"
        );


    if(!cart.length){

        box.innerHTML =
            "Cart is empty.";

        return;
    }


    let total = 0;


    box.innerHTML =
        cart.map(
            item => {

                const amount =
                    Number(item.price) *
                    Number(item.quantity);

                total += amount;


                return \`
                <div class="item">

                    <div>

                        <strong>
                            \${item.name}
                        </strong>

                        <br>

                        <small>
                            \${item.unit || ""}
                        </small>

                    </div>

                    <div>

                        \${item.quantity}
                        ×
                        ₹\${Number(item.price).toFixed(2)}

                        <br>

                        <strong>
                            ₹\${amount.toFixed(2)}
                        </strong>

                    </div>

                </div>
                \`;

            }
        ).join("") +

        \`
        <h3>
            Total:
            ₹\${total.toFixed(2)}
        </h3>
        \`;
}


async function placeOrder(){

    if(!SHOP_OPEN){

        alert(
            "Shop abhi closed hai."
        );

        return;
    }


    const cart =
        getCart();


    if(!cart.length){

        alert(
            "Cart empty hai."
        );

        return;
    }


    const customerName =
        document.getElementById(
            "name"
        ).value.trim();


    const mobile =
        document.getElementById(
            "mobile"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    if(
        !customerName ||
        !mobile ||
        !address
    ){

        alert(
            "Name, mobile aur address fill karein."
        );

        return;
    }


    const response =
        await fetch(
            "/sabji/order",
            {

                method:"POST",

                headers:{
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({

                        customerName,
                        mobile,
                        address,

                        items:cart

                    })

            }
        );


    const result =
        await response.json();


    if(!result.success){

        alert(
            result.message ||
            "Order failed"
        );

        return;
    }


    localStorage.removeItem(
        "vegetableCart"
    );


    alert(
        "✅ Order successfully placed!"
    );


    window.location.href =
        "/sabji";

}


renderCart();

</script>

</body>

</html>
            `);

        } catch (error) {

            next(error);
        }
    }
);


// ========================================
// CREATE ORDER
// POST /sabji/order
// ========================================

router.post(
    "/sabji/order",
    async (req, res, next) => {

        try {

            const setting =
                await getShopSetting();


            // SERVER SIDE SECURITY
            if (!setting.isOpen) {

                return res.status(403).json({
                    success: false,
                    message:
                        "Shop abhi closed hai. Order accept nahi ho raha."
                });
            }


            const {
                customerName,
                mobile,
                address,
                items
            } = req.body;


            if (
                !customerName ||
                !mobile ||
                !address
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Customer details incomplete hain."
                });
            }


            if (
                !Array.isArray(items) ||
                !items.length
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Cart empty hai."
                });
            }


            let finalItems = [];

            let subtotal = 0;


            for (
                const cartItem of items
            ) {

                const product =
                    await VegetableProduct.findById(
                        cartItem.productId
                    );


                if (!product) {
                    continue;
                }


                if (
                    !product.isActive ||
                    product.stock <= 0
                ) {
                    continue;
                }


                let quantity =
                    Number(
                        cartItem.quantity
                    );


                if (
                    !quantity ||
                    quantity < 1
                ) {
                    quantity = 1;
                }


                if (
                    quantity >
                    product.stock
                ) {
                    quantity =
                        product.stock;
                }


                const price =
                    Number(
                        product.price
                    );


                const amount =
                    price *
                    quantity;


                subtotal +=
                    amount;


                finalItems.push({

                    productId:
                        product._id,

                    name:
                        product.name,

                    unit:
                        product.unit,

                    price,

                    quantity,

                    amount

                });
            }


            if (
                !finalItems.length
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Selected products available nahi hain."
                });
            }


            if (
                subtotal <
                Number(
                    setting.minimumOrder || 0
                )
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        `Minimum order ₹${setting.minimumOrder} hai.`
                });
            }


            const deliveryCharge =
                Number(
                    setting.deliveryCharge ||
                    0
                );


            const totalAmount =
                subtotal +
                deliveryCharge;


            const order =
                await VegetableOrder.create({

                    customerName,

                    mobile,

                    address,

                    items:
                        finalItems,

                    subtotal,

                    deliveryCharge,

                    totalAmount,

                    paymentMethod:
                        "COD",

                    status:
                        "Pending"

                });


            // REDUCE STOCK

            for (
                const item of finalItems
            ) {

                await VegetableProduct.findByIdAndUpdate(

                    item.productId,

                    {
                        $inc: {
                            stock:
                                -item.quantity
                        }
                    }

                );
            }


            return res.json({

                success: true,

                message:
                    "Order placed successfully",

                orderId:
                    order._id

            });

        } catch (error) {

            next(error);
        }
    }
);


// ========================================
// ADMIN SHOP STATUS
// GET /admin/sabji/shop-status
// ========================================

router.get(
    "/admin/sabji/shop-status",
    async (req, res, next) => {

        try {

            const setting =
                await getShopSetting();


            return res.send(`
<!DOCTYPE html>

<html>

<head>

<meta name="viewport"
content="width=device-width,initial-scale=1">

<title>
Sabji Shop Control
</title>


<style>

body{
    margin:0;
    font-family:Arial;
    background:#f4f7f5;
    padding:20px;
}

.card{
    max-width:450px;
    margin:40px auto;
    background:white;
    padding:25px;
    border-radius:20px;
    text-align:center;
    box-shadow:
        0 8px 30px
        rgba(0,0,0,.1);
}

.status{
    font-size:22px;
    font-weight:bold;
    margin:20px;
}

button{
    width:100%;
    padding:15px;
    border:0;
    border-radius:12px;
    color:white;
    font-size:17px;
    font-weight:bold;
    cursor:pointer;
}

.open-btn{
    background:#16a34a;
}

.close-btn{
    background:#dc2626;
}

</style>

</head>


<body>


<div class="card">

<h2>
🥬 Mini Sabji Shop
</h2>


<div class="status">

${
    setting.isOpen
        ? "🟢 SHOP OPEN"
        : "🔴 SHOP CLOSED"
}

</div>


<form
    method="POST"
    action="/admin/sabji/toggle-shop"
>

<button
    class="
        ${
            setting.isOpen
                ? "close-btn"
                : "open-btn"
        }
    "
>

${
    setting.isOpen
        ? "🔴 CLOSE SHOP"
        : "🟢 OPEN SHOP"
}

</button>

</form>


</div>

</body>

</html>
            `);

        } catch (error) {

            next(error);
        }
    }
);


// ========================================
// TOGGLE SHOP
// POST /admin/sabji/toggle-shop
// ========================================

router.post(
    "/admin/sabji/toggle-shop",
    async (req, res, next) => {

        try {

            const setting =
                await getShopSetting();


            setting.isOpen =
                !setting.isOpen;


            await setting.save();


            return res.redirect(
                "/admin/sabji/shop-status"
            );

        } catch (error) {

            next(error);
        }
    }
);


module.exports = router;