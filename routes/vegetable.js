const express = require("express");

const router = express.Router();

const VegetableProduct =
    require("../models/VegetableProduct");

const VegetableOrder =
    require("../models/VegetableOrder");

const ShopSetting =
    require("../models/ShopSetting");

    const multer = require("multer");
const path = require("path");


// ========================================
// SABJI IMAGE UPLOAD - MULTER
// ========================================

const storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(
            null,
            path.join(
                __dirname,
                "../uploads/sabji"
            )
        );
    },

    filename: function(req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(
                Math.random() * 1e9
            ) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


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
    type="submit"
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

// ========================================
// ADMIN - MANAGE SABJI PRODUCTS
// GET /admin/sabji/products
// ========================================

router.get(
    "/admin/sabji/products",
    async (req, res, next) => {

        try {

            const products =
                await VegetableProduct
                    .find({})
                    .sort({ createdAt: -1 })
                    .lean();


            const rows = products.length
                ? products.map((product, index) => {

                    return `
                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>

                            ${
                                product.image
                                    ? `
                                    <img
                                        src="${product.image}"
                                        style="
                                            width:55px;
                                            height:55px;
                                            object-fit:cover;
                                            border-radius:10px;
                                        "
                                    >
                                    `
                                    : "🥬"
                            }

                        </td>

                        <td>
                            <strong>
                                ${product.name}
                            </strong>

                            <br>

                            <small>
                                ${product.category || "-"}
                            </small>
                        </td>

                        <td>
                            ${product.unit || "-"}
                        </td>

                        <td>
                            ₹${Number(product.mrp || 0).toFixed(2)}
                        </td>

                        <td>
                            ₹${Number(product.price || 0).toFixed(2)}
                        </td>

                        <td>
                            ${Number(product.stock || 0)}
                        </td>

                        <td>

                            ${
                                product.isActive
                                    ? `
                                    <span class="active">
                                        ACTIVE
                                    </span>
                                    `
                                    : `
                                    <span class="inactive">
                                        INACTIVE
                                    </span>
                                    `
                            }

                        </td>

                        <td class="actions">

                            <form
                                method="POST"
                                action="/admin/sabji/product/${product._id}/toggle"
                            >

                                <button
                                    class="toggle-btn"
                                    type="submit"
                                >
                                    ${
                                        product.isActive
                                            ? "Disable"
                                            : "Enable"
                                    }
                                </button>

                            </form>


                            <form
                                method="POST"
                                action="/admin/sabji/product/${product._id}/delete"
                                onsubmit="
                                    return confirm(
                                        'Delete this product?'
                                    )
                                "
                            >

                                <button
                                    class="delete-btn"
                                    type="submit"
                                >
                                    Delete
                                </button>

                            </form>

                        </td>

                    </tr>
                    `;

                }).join("")

                : `
                <tr>

                    <td
                        colspan="9"
                        style="
                            text-align:center;
                            padding:35px;
                        "
                    >
                        No sabji products added.
                    </td>

                </tr>
                `;


            return res.send(`
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width,initial-scale=1.0"
>

<title>
Manage Sabji Products
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
    background:#f1f5f2;
    color:#17211b;
}

.header{
    background:#14532d;
    color:white;
    padding:18px 20px;
}

.header-inner{
    max-width:1200px;
    margin:auto;

    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
}

.header h2{
    margin:0;
}

.header a{
    color:white;
    text-decoration:none;

    background:
        rgba(255,255,255,.14);

    padding:9px 13px;

    border-radius:8px;
}

.container{
    max-width:1200px;
    margin:25px auto;
    padding:0 15px;
}

.form-card{
    background:white;
    padding:22px;
    border-radius:18px;

    box-shadow:
        0 5px 20px
        rgba(0,0,0,.07);

    margin-bottom:22px;
}

.form-card h3{
    margin-top:0;
}

.grid{
    display:grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0,1fr)
        );

    gap:14px;
}

.form-group{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.form-group.full{
    grid-column:1/-1;
}

label{
    font-size:13px;
    font-weight:bold;
}

input,
select,
textarea{

    width:100%;

    padding:12px;

    border:
        1px solid #d7ded9;

    border-radius:9px;

    outline:none;

    font-size:14px;
}

textarea{
    resize:vertical;
    min-height:85px;
}

.add-btn{
    margin-top:17px;

    border:0;
    background:#16a34a;
    color:white;

    padding:13px 22px;

    border-radius:10px;

    font-weight:bold;
    cursor:pointer;
}

.table-card{
    background:white;

    border-radius:18px;

    overflow:auto;

    box-shadow:
        0 5px 20px
        rgba(0,0,0,.07);
}

table{
    width:100%;
    border-collapse:collapse;

    min-width:900px;
}

th{
    background:#f8faf9;

    text-align:left;

    font-size:12px;

    padding:13px;

    border-bottom:
        1px solid #e5e7eb;
}

td{
    padding:13px;

    border-bottom:
        1px solid #edf0ee;

    font-size:13px;
}

.active,
.inactive{
    display:inline-block;

    padding:6px 9px;

    border-radius:50px;

    font-size:10px;

    font-weight:bold;
}

.active{
    background:#dcfce7;
    color:#15803d;
}

.inactive{
    background:#fee2e2;
    color:#b91c1c;
}

.actions{
    display:flex;
    gap:7px;
}

.actions form{
    margin:0;
}

.toggle-btn,
.delete-btn{

    border:0;

    padding:8px 10px;

    border-radius:7px;

    cursor:pointer;

    font-size:12px;
}

.toggle-btn{
    background:#e0f2fe;
    color:#0369a1;
}

.delete-btn{
    background:#fee2e2;
    color:#b91c1c;
}

.links{
    margin-bottom:15px;

    display:flex;
    gap:10px;
    flex-wrap:wrap;
}

.links a{
    text-decoration:none;

    padding:10px 13px;

    border-radius:9px;

    background:white;
    color:#14532d;

    font-weight:bold;

    box-shadow:
        0 2px 10px
        rgba(0,0,0,.06);
}

@media(max-width:650px){

    .grid{
        grid-template-columns:1fr;
    }

    .form-group.full{
        grid-column:auto;
    }

    .header-inner{
        align-items:flex-start;
        flex-direction:column;
    }
}

</style>

</head>


<body>


<header class="header">

    <div class="header-inner">

        <div>

            <h2>
                🥬 GLOBAL MINI SABJI
            </h2>

            <small>
                Product Management
            </small>

        </div>


        <a href="/sabji">
            View Customer Shop
        </a>

    </div>

</header>


<div class="container">


    <div class="links">

        <a
            href="/admin/sabji/shop-status"
        >
            🟢 Shop Open / Close
        </a>

        <a
            href="/sabji"
            target="_blank"
        >
            🛒 Customer Shop
        </a>

    </div>


    <section class="form-card">

        <h3>
            ➕ Add New Sabji
        </h3>


        <form
            method="POST"
            action="/admin/sabji/products"
        >


            <div class="grid">


                <div class="form-group">

                    <label>
                        Product Name *
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Example: Aloo"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Category
                    </label>

                    <select name="category">

                        <option value="Vegetable">
                            Vegetable
                        </option>

                        <option value="Leafy Vegetable">
                            Leafy Vegetable
                        </option>

                        <option value="Fruit">
                            Fruit
                        </option>

                        <option value="Herbs">
                            Herbs
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Unit / Pack *
                    </label>

                    <select
                        name="unit"
                        required
                    >

                        <option value="1 KG">
                            1 KG
                        </option>

                        <option value="500 GM">
                            500 GM
                        </option>

                        <option value="250 GM">
                            250 GM
                        </option>

                        <option value="100 GM">
                            100 GM
                        </option>

                        <option value="1 Piece">
                            1 Piece
                        </option>

                        <option value="1 Dozen">
                            1 Dozen
                        </option>

                        <option value="1 Bundle">
                            1 Bundle
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        MRP ₹
                    </label>

                    <input
                        type="number"
                        name="mrp"
                        min="0"
                        step="0.01"
                        placeholder="40"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Selling Price ₹ *
                    </label>

                    <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        placeholder="30"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Stock Quantity *
                    </label>

                    <input
                        type="number"
                        name="stock"
                        min="0"
                        step="1"
                        value="10"
                        required
                    >

                </div>


                <div class="form-group full">

                    <label>
                        Product Image URL
                    </label>

                    <input
        type="file"
        name="image"
        accept="image/*"
        required
    >

                </div>


                <div class="form-group full">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Fresh quality sabji..."
                    ></textarea>

                </div>


            </div>


            <button
                class="add-btn"
                type="submit"
            >
                ➕ ADD PRODUCT
            </button>


        </form>

    </section>


    <section class="table-card">

        <table>

            <thead>

                <tr>

                    <th>#</th>

                    <th>Image</th>

                    <th>Product</th>

                    <th>Unit</th>

                    <th>MRP</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>


            <tbody>

                ${rows}

            </tbody>

        </table>

    </section>


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
// ADMIN - ADD PRODUCT
// POST /admin/sabji/products
// ========================================

router.post(
    "/admin/sabji/products",
    upload.single("image"),
    async (req, res, next) => {

        try {

            const {
                name,
                category,
                unit,
                mrp,
                price,
                stock,
                description
            } = req.body;


            if (!name || price === undefined) {

                return res
                    .status(400)
                    .send(
                        "Product name and price required."
                    );
            }


            let image = "";


            if (req.file) {

                image =
                    "/uploads/sabji/" +
                    req.file.filename;
            }


            await VegetableProduct.create({

                name:
                    String(name).trim(),

                category:
                    category ||
                    "Vegetable",

                unit:
                    unit ||
                    "1 KG",

                mrp:
                    Number(mrp || 0),

                price:
                    Number(price || 0),

                stock:
                    Number(stock || 0),

                image,

                description:
                    String(
                        description || ""
                    ).trim(),

                isActive:
                    true

            });


            return res.redirect(
                "/admin/sabji/products"
            );

        } catch (error) {

            next(error);
        }
    }
);

// ========================================
// ACTIVE / INACTIVE PRODUCT
// ========================================

router.post(
    "/admin/sabji/product/:id/toggle",
    async (req, res, next) => {

        try {

            const product =
                await VegetableProduct.findById(
                    req.params.id
                );


            if (!product) {

                return res
                    .status(404)
                    .send(
                        "Product not found"
                    );
            }


            product.isActive =
                !product.isActive;


            await product.save();


            return res.redirect(
                "/admin/sabji/products"
            );

        } catch (error) {

            next(error);
        }
    }
);



// ========================================
// DELETE PRODUCT
// ========================================

router.post(
    "/admin/sabji/product/:id/delete",
    async (req, res, next) => {

        try {

            await VegetableProduct.findByIdAndDelete(
                req.params.id
            );


            return res.redirect(
                "/admin/sabji/products"
            );

        } catch (error) {

            next(error);
        }
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


module.exports = router;