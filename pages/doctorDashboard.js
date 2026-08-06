function DoctorDashboard(doctor, products = []) {

let cards = "";

products.forEach(product => {

cards += `

<div
class="product-card"
data-name="${product.name}"
data-category="${product.category || "Medicine"}">

<div class="product-image">

<span class="badge">
NEW
</span>

<img
src="${product.image || "/images/no-image.png"}"
alt="${product.name}">

</div>

<div class="product-body">

<h3>

${product.name}

</h3>

<div class="rating">

⭐⭐⭐⭐⭐

</div>

<p class="composition">

${product.composition || ""}

</p>

<p class="manufacturer">

${product.manufacturer || ""}

</p>

<div class="price-box">

<span class="mrp">

₹${product.mrp || product.price}

</span>

<span class="selling">

₹${product.price}

</span>

</div>

<p class="stock">

✔ In Stock

</p>

<button
class="cart-btn"
onclick="addToCart(
'${product._id}',
'${product.name.replace(/'/g,"\\'")}',
'${product.price}',
'${product.image || "/images/no-image.png"}'
)">
🛒 Add To Cart
</button>

</div>

</div>

`;

});

return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1">

<title>

GLOBAL HEALTHCARE

</title>

<style>

/* CSS Part 2 */

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:#f4f7fb;
color:#222;
}

/* ================= HEADER ================= */

.header{
position:sticky;
top:0;
z-index:999;
background:linear-gradient(135deg,#005bea,#00c6fb);
padding:18px 40px;
display:flex;
justify-content:space-between;
align-items:center;
box-shadow:0 10px 25px rgba(0,0,0,.15);
}

.logo{
font-size:30px;
font-weight:800;
color:#fff;
}

.nav{
display:flex;
gap:18px;
align-items:center;
}

.nav a{
color:#fff;
text-decoration:none;
font-weight:600;
padding:10px 18px;
border-radius:12px;
transition:.3s;
cursor:pointer;
}

.nav a:hover{
background:rgba(255,255,255,.15);
}

.cart-badge{
background:#ff1744;
color:#fff;
padding:3px 8px;
border-radius:50px;
font-size:12px;
margin-left:5px;
}

/* ================= DOCTOR ================= */

.doctor-box{
max-width:1450px;
margin:25px auto;
background:#fff;
padding:30px;
border-radius:20px;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.doctor-box h1{
font-size:30px;
color:#0f172a;
}

.doctor-box p{
margin-top:10px;
color:#666;
}

/* ================= FILTER ================= */

.filter-box{
max-width:1450px;
margin:20px auto;
display:flex;
gap:20px;
padding:0 20px;
}

.filter-box input{
flex:1;
padding:15px;
border-radius:14px;
border:2px solid #dbeafe;
outline:none;
font-size:16px;
}

.filter-box select{
width:220px;
padding:15px;
border-radius:14px;
border:2px solid #dbeafe;
font-size:16px;
}

/* ================= PRODUCTS ================= */

.products{
max-width:1450px;
margin:auto;
display:grid;
grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
gap:25px;
padding:20px;
}

.product-card{
background:#fff;
border-radius:20px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
transition:.35s;
position:relative;
}

.product-card:hover{
transform:translateY(-8px);
}

.product-image{
height:220px;
display:flex;
justify-content:center;
align-items:center;
background:#f8fafc;
position:relative;
}

.product-image img{
width:90%;
height:180px;
object-fit:contain;
}

.badge{
position:absolute;
top:15px;
left:15px;
background:#ff1744;
color:#fff;
padding:6px 12px;
border-radius:30px;
font-size:12px;
font-weight:bold;
}

.product-body{
padding:20px;
}

.product-body h3{
font-size:21px;
margin-bottom:10px;
}

.rating{
color:#ffb400;
margin-bottom:10px;
}

.composition{
font-size:14px;
color:#666;
height:42px;
overflow:hidden;
}

.manufacturer{
margin:8px 0;
font-weight:600;
color:#2563eb;
}

.price-box{
display:flex;
gap:10px;
align-items:center;
margin:15px 0;
}

.mrp{
text-decoration:line-through;
color:#888;
}

.selling{
font-size:28px;
font-weight:700;
color:#16a34a;
}

.stock{
color:#16a34a;
font-weight:600;
margin-bottom:15px;
}

.cart-btn{
width:100%;
padding:15px;
border:none;
border-radius:12px;
background:linear-gradient(135deg,#2563eb,#4f46e5);
color:#fff;
font-size:16px;
font-weight:700;
cursor:pointer;
transition:.3s;
}

.cart-btn:hover{
transform:scale(1.02);
}

/* ================= CART ================= */

.cart-sidebar{
position:fixed;
top:0;
right:-420px;
width:400px;
height:100%;
background:#fff;
box-shadow:-10px 0 30px rgba(0,0,0,.15);
display:flex;
flex-direction:column;
transition:.35s;
z-index:99999;
}

.cart-sidebar.active{
right:0;
}

.cart-header{
padding:20px;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom:1px solid #eee;
}

.cart-header button{
width:40px;
height:40px;
border:none;
border-radius:50%;
background:#ef4444;
color:#fff;
cursor:pointer;
}

#cartItems{
flex:1;
overflow:auto;
padding:20px;
}

.cart-footer{
padding:20px;
border-top:1px solid #eee;
}

.cart-footer h3{
display:flex;
justify-content:space-between;
margin-bottom:20px;
}

.checkout{
width:100%;
padding:15px;
border:none;
border-radius:12px;
background:#16a34a;
color:#fff;
font-size:18px;
font-weight:700;
cursor:pointer;
}

.checkout:hover{
background:#15803d;
}

@media(max-width:768px){

.header{
flex-direction:column;
gap:15px;
padding:20px;
}

.nav{
flex-wrap:wrap;
justify-content:center;
}

.filter-box{
flex-direction:column;
}

.filter-box select{
width:100%;
}

.products{
grid-template-columns:1fr;
}

.cart-sidebar{
width:100%;
}

}


.cart-item{
display:flex;
gap:15px;
align-items:center;
padding:15px 0;
border-bottom:1px solid #eee;
}

.cart-item img{
width:70px;
height:70px;
object-fit:contain;
border-radius:10px;
background:#f8fafc;
}


.cart-info{
flex:1;
}


.remove-btn{
border:none;
background:#fee2e2;
color:#dc2626;
padding:8px;
border-radius:8px;
cursor:pointer;
}

</style>

</head>

<body>

<!-- HTML Part 3 -->

<!-- ================= HEADER ================= -->

<header class="header">

<div class="logo">

🩺 GLOBAL HEALTHCARE

</div>

<div class="nav">

<a href="/doctor/dashboard">

🏠 Home

</a>

<a href="/doctor/orders">

📦 Orders

</a>

<a href="#" onclick="openCart()">

🛒 Cart

<span
class="cart-badge"
id="cartCount">

0

</span>

</a>

<a href="/admin/doctor/logout">

🚪 Logout

</a>

</div>

</header>



<!-- ================= DOCTOR ================= -->

<section class="doctor-box">

<h1>

Welcome Dr. ${doctor.name}

</h1>

<p>

${doctor.specialization || "General Physician"}

</p>

</section>



<!-- ================= SEARCH ================= -->

<section class="filter-box">

<input

type="text"

id="search"

placeholder="🔍 Search Medicine..."

onkeyup="searchProduct()">

<select

id="categoryFilter"

onchange="filterCategory()">

<option value="">

All Category

</option>

<option value="Tablet">

Tablet

</option>

<option value="Capsule">

Capsule

</option>

<option value="Syrup">

Syrup

</option>

<option value="Injection">

Injection

</option>

<option value="Drops">

Drops

</option>

<option value="Ointment">

Ointment

</option>

</select>

</section>



<!-- ================= PRODUCTS ================= -->

<section class="products">

${cards}

</section>



<!-- ================= CART ================= -->

<div

id="cartSidebar"

class="cart-sidebar">

<div class="cart-header">

<h2>

🛒 Cart

</h2>

<button onclick="closeCart()">

✕

</button>

</div>



<div id="cartItems">

<div style="text-align:center;padding:40px;color:#888;">

🛒

<br><br>

Your Cart is Empty

</div>

</div>



<div class="cart-footer">

<h3>

<span>

Total

</span>

<span id="cartTotal">

₹0

</span>

</h3>

<button

class="checkout"

onclick="placeOrder()">

Place Order

</button>

</div>

</div>



<!-- ================= FOOTER ================= -->

<footer class="footer">

© 2026 GLOBAL HEALTHCARE

<br>

Powered by Osium Biogenix

</footer>



<script>



let cart = [];

if (typeof window !== "undefined") {
    cart = JSON.parse(localStorage.getItem("doctorCart")) || [];
}

/* ===============================
   SAVE CART
================================ */

function saveCart() {

    if (typeof window !== "undefined") {
        localStorage.setItem(
            "doctorCart",
            JSON.stringify(cart)
        );
    }

    updateCart();
}

/* ===============================
   ADD TO CART
================================ */

function addToCart(id, name, price, image) {

    price = Number(price);

    const item = cart.find(x => x.id === id);

    if (item) {

        item.qty++;

    } else {

        cart.push({
            id,
            name,
            price,
            image,
            qty: 1
        });

    }

    saveCart();

}

/* ===============================
   UPDATE CART
================================ */

function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartCount.innerHTML = cart.length;

    let total = 0;
    let html = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
'<div style="padding:40px;text-align:center;color:#777;">' +
'🛒<br><br>Your Cart is Empty' +
'</div>';
        cartTotal.innerHTML = "₹0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.qty;

html +=
'<div class="cart-item">' +

'<img src="' +
(item.image || "/images/no-image.png") +
'" alt="' + item.name + '">' +

'<div class="cart-info">' +

'<h4>' + item.name + '</h4>' +

'<p>₹' + item.price + '</p>' +

'<div class="qty-box">' +

'<button onclick="decreaseQty(' + index + ')">−</button>' +

'<span>' + item.qty + '</span>' +

'<button onclick="increaseQty(' + index + ')">+</button>' +

'</div>' +

'</div>' +

'<button class="remove-btn" onclick="removeItem(' + index + ')">🗑</button>' +

'</div>';

    });

    cartItems.innerHTML = html;

    cartTotal.innerHTML = "₹" + total;

}

/* ===============================
   INCREASE
================================ */

function increaseQty(index) {

    cart[index].qty++;

    saveCart();

}

/* ===============================
   DECREASE
================================ */

function decreaseQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}

/* ===============================
   REMOVE ITEM
================================ */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}

/* ===============================
   OPEN CART
================================ */

function openCart() {

    document
    .getElementById("cartSidebar")
    .classList.add("active");

}

/* ===============================
   CLOSE CART
================================ */

function closeCart() {

    document
    .getElementById("cartSidebar")
    .classList.remove("active");

}

/* ===============================
   SEARCH PRODUCT
================================ */

function searchProduct() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const name = (
                card.dataset.name || ""
            ).toLowerCase();

            card.style.display =
                name.includes(keyword)
                    ? "block"
                    : "none";

        });

}

/* ===============================
   FILTER CATEGORY
================================ */

function filterCategory() {

    const value = document
        .getElementById("categoryFilter")
        .value
        .toLowerCase();

    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            if (value === "") {

                card.style.display = "block";

                return;

            }

            const category = (
                card.dataset.category || ""
            ).toLowerCase();

            card.style.display =
                category === value
                    ? "block"
                    : "none";

        });

}

/* ===============================
   PLACE ORDER
================================ */

/* ===============================
   PLACE ORDER
================================ */

async function placeOrder(){

    if(cart.length === 0){

        alert("Cart is Empty");
        return;

    }


    try{

        const response = await fetch(
            "/doctor/create-order",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    cart:cart
                })
            }
        );


        const data = await response.json();


        if(data.success){

            alert("Order Created Successfully");


            cart = [];

            saveCart();


            closeCart();


            window.location.href="/doctor/orders";


        }
        else{

            alert(data.message);

        }


    }
    catch(error){

        console.log(error);

        alert("Order Failed");

    }

}


/* ===============================
   LOAD CART
================================ */

updateCart();


</script>

</body>




</html>

`;

}

module.exports = DoctorDashboard;