// function DoctorDashboard(doctor, products = []) {


// let cards = "";


// products.forEach(product => {


// cards += `

// <div class="product-card">


// <div class="product-image">

// <span class="badge">
// NEW
// </span>


// <img src="${product.image || '/images/no-image.png'}">


// </div>



// <div class="product-body">


// <h3>
// ${product.name}
// </h3>



// <div class="rating">
// ★★★★★
// </div>



// <p class="price">
// ₹ ${product.price}
// </p>



// <p class="stock">
// ✔ Available Stock
// </p>



// <button
// class="cart-btn"
// onclick='addToCart(
// "${product._id}",
// ${JSON.stringify(product.name)},
// "${product.price}",
// "${product.image || ""}"
// )'>

// 🛒 Add To Cart

// </button>



// </div>


// </div>


// `;

// });





// return `


// <!DOCTYPE html>

// <html>


// <head>


// <meta charset="UTF-8">


// <meta name="viewport"
// content="width=device-width, initial-scale=1.0">


// <title>
// Doctor Dashboard
// </title>



// <style>


// *{

// margin:0;
// padding:0;
// box-sizing:border-box;
// font-family:'Segoe UI',sans-serif;

// }



// body{

// background:
// linear-gradient(
// 135deg,
// #eef2ff,
// #ffffff
// );

// min-height:100vh;

// }



// /* HEADER */


// .header{

// background:
// linear-gradient(
// 135deg,
// #2563eb,
// #4f46e5
// );

// padding:18px 35px;

// display:flex;

// justify-content:space-between;

// align-items:center;

// color:white;

// position:sticky;

// top:0;

// z-index:999;

// box-shadow:
// 0 10px 30px rgba(0,0,0,.2);

// }



// .logo{

// font-size:28px;

// font-weight:800;

// }



// .logo span{

// font-size:35px;

// }



// .nav{

// display:flex;

// gap:15px;

// }



// .nav a{

// color:white;

// text-decoration:none;

// font-weight:600;

// padding:10px 15px;

// border-radius:12px;

// }



// .nav a:hover{

// background:
// rgba(255,255,255,.2);

// }



// /* DOCTOR */


// .doctor-box{

// max-width:1400px;

// margin:30px auto;

// padding:30px;

// background:white;

// border-radius:25px;

// box-shadow:
// 0 15px 40px rgba(0,0,0,.08);

// }



// .doctor-box h1{

// color:#1e293b;

// }





// /* PRODUCTS */


// .products{

// max-width:1400px;

// margin:auto;

// padding:25px;

// display:grid;

// grid-template-columns:
// repeat(auto-fit,minmax(260px,1fr));

// gap:25px;

// }





// .product-card{


// background:white;

// border-radius:25px;

// overflow:hidden;

// box-shadow:

// 0 15px 40px rgba(0,0,0,.08);

// transition:.3s;

// }



// .product-card:hover{

// transform:
// translateY(-10px);

// }





// .product-image{

// height:230px;

// background:#f8fafc;

// display:flex;

// justify-content:center;

// align-items:center;

// position:relative;

// }



// .product-image img{

// width:90%;

// height:190px;

// object-fit:contain;

// }




// .badge{

// position:absolute;

// top:15px;

// left:15px;

// background:#ef4444;

// color:white;

// padding:6px 15px;

// border-radius:50px;

// font-size:12px;

// }





// .product-body{

// padding:20px;

// }



// .product-body h3{

// font-size:20px;

// height:50px;

// }



// .rating{

// color:#fbbf24;

// margin:10px 0;

// }



// .price{

// font-size:28px;

// font-weight:800;

// color:#2563eb;

// }



// .stock{

// color:#16a34a;

// font-weight:600;

// margin:10px 0;

// }





// .cart-btn{

// width:100%;

// padding:14px;

// border:none;

// border-radius:15px;

// background:

// linear-gradient(
// 135deg,
// #2563eb,
// #4f46e5
// );

// color:white;

// font-size:16px;

// font-weight:700;

// cursor:pointer;

// }




// /* FLOATING CART */


// .cart-floating{

// position:fixed;

// right:25px;

// bottom:25px;

// width:65px;

// height:65px;

// border-radius:50%;

// background:

// linear-gradient(
// 135deg,
// #2563eb,
// #4f46e5
// );


// display:flex;

// justify-content:center;

// align-items:center;

// color:white;

// font-size:28px;

// cursor:pointer;

// }



// .cart-floating span{

// position:absolute;

// top:-5px;

// right:-5px;

// background:red;

// width:25px;

// height:25px;

// border-radius:50%;

// font-size:13px;

// display:flex;

// justify-content:center;

// align-items:center;

// }




// @media(max-width:768px){


// .header{

// flex-direction:column;

// gap:15px;

// }


// .products{

// grid-template-columns:
// repeat(2,1fr);

// padding:12px;

// }


// }

// </style>


// </head>



// <body>



// <header class="header">


// <div class="logo">

// 🩺 GLOBAL HEALTHCARE

// </div>



// <div class="nav">


// <a href="/doctor/dashboard">
// 🏠 Home
// </a>


// <a href="/doctor/orders">
// 📦 Orders
// </a>


// <a href="#" onclick="openCart()">
// 🛒 Cart
// <span id="cartCount">
// 0
// </span>
// </a>



// <a href="/admin/doctor/logout">
// 🚪 Logout
// </a>



// </div>


// </header>





// <div class="cart-floating"
// onclick="openCart()">


// 🛒


// <span id="floatingCartCount">
// 0
// </span>


// </div>






// <section class="doctor-box">


// <h1>

// Welcome Dr. ${doctor.name}

// </h1>


// </section>






// <div class="products">

// ${cards}

// </div>






// <script>


// let cart = 
// JSON.parse(
// localStorage.getItem("doctorCart")
// ) || [];




// function addToCart(id,name,price,image){


// let item =
// cart.find(
// x=>x.id===id
// );



// if(item){

// item.qty++;

// }

// else{


// cart.push({

// id,

// name,

// price,

// image,

// qty:1

// });


// }


// saveCart();


// alert(
// name+" Added To Cart"
// );


// }





// function saveCart(){


// localStorage.setItem(
// "doctorCart",
// JSON.stringify(cart)
// );


// updateCart();


// }





// function updateCart(){


// let a =
// document.getElementById("cartCount");


// let b =
// document.getElementById("floatingCartCount");


// if(a)
// a.innerHTML=cart.length;


// if(b)
// b.innerHTML=cart.length;


// }



// updateCart();



// </script>




// </body>

// </html>


// `;

// }



// module.exports = DoctorDashboard;

function DoctorDashboard(doctor, products = []) {

    let cards = "";

    products.forEach(product => {

        cards += `
        <div class="product-card"
             data-name="${product.name}"
             data-category="${product.category || 'Medicine'}">


            <div class="product-image">

                <span class="badge">
                    NEW
                </span>

                <img src="${product.image || '/images/no-image.png'}">

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
                onclick='addToCart(
                    "${product._id}",
                    ${JSON.stringify(product.name)},
                    "${product.price}",
                    "${product.image || ""}"
                )'>

                🛒 Add To Cart

                </button>


            </div>


        </div>
        `;

    });


return `

<!DOCTYPE html>
<html>

<head>

<meta name="viewport"
content="width=device-width, initial-scale=1">


<title>
Doctor Dashboard
</title>


<style>

/* PART 1 CSS HERE */

</style>


</head>


<body>


<header class="header">

<h2>
🩺 GLOBAL HEALTHCARE
</h2>


<nav>

<a href="/doctor/dashboard">
Home
</a>


<a href="/doctor/orders">
Orders
</a>


<a onclick="openCart()">
🛒 Cart
<span id="cartCount">
0
</span>
</a>


</nav>


</header>



<section class="doctor-box">

<h1>
Welcome Dr. ${doctor.name}
</h1>

<p>
${doctor.specialization || ""}
</p>


</section>



<div class="filter-box">


<input 
id="search"
onkeyup="searchProduct()"
placeholder="Search Medicine...">


<select id="categoryFilter"
onchange="filterCategory()">

<option value="">
All Category
</option>

<option>
Syrup
</option>

<option>
Tablet
</option>

<option>
Injection
</option>

</select>


</div>



<div class="products">

${cards}

</div>



<!-- CART SIDEBAR -->

<div id="cartSidebar"
class="cart-sidebar">


<div class="cart-header">

<h2>
Cart
</h2>


<button onclick="closeCart()">
X
</button>


</div>


<div id="cartItems">

</div>


<div class="cart-footer">

<h3>
Total:
<span id="cartTotal">
₹0
</span>
</h3>


<button class="checkout">

Place Order

</button>


</div>


</div>



<script>

/* PART 2 JAVASCRIPT HERE */


</script>



</body>

</html>


`;

}


module.exports = DoctorDashboard;