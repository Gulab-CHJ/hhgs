// function escapeHTML(value) {

//     if (value === null || value === undefined) {
//         return "";
//     }

//     return String(value)
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }


// function DoctorDashboard(doctor = {}, products = []) {

//     // =====================================================
//     // DOCTOR DETAILS
//     // =====================================================

//     const rawDoctorName =
//         doctor.name ||
//         doctor.doctorName ||
//         "Doctor";

//     /*
//      * Remove duplicate Dr. if database already contains
//      * Dr. Ram Karan Sah
//      */

//     const doctorName =
//         String(rawDoctorName)
//             .replace(/^dr\.?\s+/i, "")
//             .trim();

//     const specialization =
//         doctor.specialization ||
//         "General Physician";


//     // =====================================================
//     // PRODUCTS
//     // =====================================================

//     const safeProducts =
//         Array.isArray(products)
//             ? products
//             : [];


//     // =====================================================
//     // CATEGORY LIST
//     // =====================================================

//     const categories = [
//         ...new Set(
//             safeProducts
//                 .map(product =>
//                     String(product.category || "")
//                         .trim()
//                 )
//                 .filter(Boolean)
//         )
//     ];


//     // =====================================================
//     // COMPANY / BRAND LIST
//     // =====================================================

//     const companies = [
//         ...new Set(
//             safeProducts
//                 .map(product => {

//                     return (
//                         product.manufacturer ||
//                         product.brand ||
//                         ""
//                     )
//                         .toString()
//                         .trim();

//                 })
//                 .filter(Boolean)
//         )
//     ];


//     // =====================================================
//     // PRODUCT JSON FOR JAVASCRIPT
//     // =====================================================

//     const productData =
//         safeProducts.map(product => {

//             const mrp =
//                 Number(product.mrp || 0);

//             const price =
//                 Number(product.price || 0);

//             let discount = 0;

//             if (mrp > price && mrp > 0) {

//                 discount =
//                     Math.round(
//                         ((mrp - price) / mrp) * 100
//                     );

//             }

//             const stock =
//                 Number(product.stock || 0);

//             const category =
//                 String(
//                     product.category || "Medicine"
//                 );

//             const company =
//                 String(
//                     product.manufacturer ||
//                     product.brand ||
//                     ""
//                 );

//             return {

//                 id:
//                     String(
//                         product._id || ""
//                     ),

//                 name:
//                     String(
//                         product.name || "Product"
//                     ),

//                 category,

//                 company,

//                 brand:
//                     String(
//                         product.brand || ""
//                     ),

//                 manufacturer:
//                     String(
//                         product.manufacturer || ""
//                     ),

//                 price,

//                 mrp,

//                 stock,

//                 discount,

//                 description:
//                     String(
//                         product.description ||
//                         "Premium Healthcare Product"
//                     ),

//                 image:
//                     String(
//                         product.image ||
//                         (
//                             Array.isArray(
//                                 product.images
//                             )
//                                 ? product.images[0] || ""
//                                 : ""
//                         )
//                     ),

//                 images:
//                     Array.isArray(product.images)
//                         ? product.images
//                         : [],

//                 isTrending:
//                     Boolean(
//                         product.isTrending ||
//                         product.trending ||
//                         false
//                     ),

//                 isPremium:
//                     Boolean(
//                         product.isPremium ||
//                         product.premium ||
//                         false
//                     )

//             };

//         });


//     // =====================================================
//     // PRODUCT CARD
//     // =====================================================
// function productCard(product, type = "") {

//     const price = Number(product.price || 0);
//     const mrp = Number(product.mrp || 0);
//     const stock = Number(product.stock || 0);

//     const inStock = stock > 0;

//     const discount = Number(product.discount || 0);

//     let badge = "";

//     if (type === "trending") {

//         badge = `
//             <div class="product-badge trending-badge">
//                 🔥 TRENDING
//             </div>
//         `;

//     }
//     else if (type === "premium") {

//         badge = `
//             <div class="product-badge premium-badge">
//                 👑 PREMIUM
//             </div>
//         `;

//     }
//     else if (!inStock) {

//         badge = `
//             <div class="product-badge stock-badge">
//                 🚫 OUT OF STOCK
//             </div>
//         `;

//     }


//     /* =========================================
//        IMAGE
//     ========================================= */

//     const imageHTML = product.image

//         ? `
//             <img
//                 src="${escapeHTML(product.image)}"
//                 alt="${escapeHTML(product.name)}"
//                 loading="lazy"
//                 onerror="
//                     this.style.display='none';
//                     this.nextElementSibling.style.display='flex';
//                 "
//             >

//             <div
//                 class="image-placeholder"
//                 style="display:none;"
//             >
//                 💊
//             </div>
//         `

//         : `
//             <div class="image-placeholder">
//                 💊
//             </div>
//         `;


//     /* =========================================
//        PRICE
//     ========================================= */

//     const priceHTML =

//         mrp > price && mrp > 0

//             ? `
//                 <div class="price-row">

//                     <span class="old-price">
//                         ₹${mrp.toFixed(0)}
//                     </span>

//                     <span class="sale-price">
//                         ₹${price.toFixed(0)}
//                     </span>

//                 </div>

//                 <div class="discount">
//                     ${discount}% OFF
//                 </div>
//             `

//             : `
//                 <div class="price-row">

//                     <span class="sale-price">
//                         ₹${price.toFixed(0)}
//                     </span>

//                 </div>
//             `;


//     /* =========================================
//        COMPANY
//     ========================================= */

//     const company = product.company
//         ? escapeHTML(product.company)
//         : "Healthcare Product";


//     const description =
//         product.description ||
//         "Premium Healthcare Product";


//     /* =========================================
//        BUTTON
//     ========================================= */

//     const buttonHTML = inStock

//         ? `
//             <button
//                 type="button"
//                 class="cart-btn"
//                 onclick="addToCart('${escapeHTML(product.id)}')"
//             >
//                 🛒 Add To Cart
//             </button>
//         `

//         : `
//             <button
//                 type="button"
//                 class="cart-btn disabled-btn"
//                 disabled
//             >
//                 🚫 Out of Stock
//             </button>
//         `;


//     /* =========================================
//        CARD
//     ========================================= */

//     return `

//         <article
//             class="
//                 product-card
//                 ${!inStock ? "out-stock-card" : ""}
//             "
//             data-id="${escapeHTML(product.id)}"
//             data-category="${escapeHTML(product.category)}"
//             data-company="${escapeHTML(product.company)}"
//             data-name="${escapeHTML(product.name)}"
//         >

//             ${badge}


//             <div class="product-image">

//                 ${imageHTML}

//             </div>


//             <div class="product-content">


//                 <div class="product-category">

//                     ${escapeHTML(product.category)}

//                     <span class="rating">
//                         ⭐ 5.0
//                     </span>

//                 </div>


//                 <h3 class="product-name">

//                     ${escapeHTML(product.name)}

//                 </h3>


//                 <p class="product-description">

//                     ${escapeHTML(description)}

//                 </p>


//                 <div class="company">

//                     🏭

//                     <span>
//                         ${company}
//                     </span>

//                 </div>


//                 ${
//                     product.brand

//                         ? `

//                             <div class="brand">

//                                 Brand:

//                                 <strong>
//                                     ${escapeHTML(product.brand)}
//                                 </strong>

//                             </div>

//                         `

//                         : ""
//                 }


//                 <div class="price-area">

//                     ${priceHTML}

//                 </div>


//                 ${
//                     inStock

//                         ? `

//                             <div class="stock in-stock">

//                                 ● In Stock (${stock})

//                             </div>

//                         `

//                         : `

//                             <div class="stock out-stock">

//                                 ● Out of Stock

//                             </div>

//                         `
//                 }


//                 ${buttonHTML}


//             </div>

//         </article>

//     `;
// }

//     /* =====================================================
//    UPDATE CART QUANTITY
// ===================================================== */

// async function updateCartQuantity(productId, quantity) {

//     try {

//         productId = String(productId);
//         quantity = Number(quantity);

//         if (quantity <= 0) {

//             await removeFromCart(productId);

//             return;
//         }


//         const response = await fetch("/api/cart", {

//             method: "PUT",

//             headers: {

//                 "Content-Type": "application/json",

//                 "Accept": "application/json"

//             },

//             body: JSON.stringify({

//                 productId: productId,

//                 quantity: quantity

//             })

//         });


//         const data = await response.json();


//         console.log(
//             "UPDATE CART RESPONSE:",
//             data
//         );


//         if (!response.ok || !data.success) {

//             alert(
//                 data.message ||
//                 "Unable to update cart"
//             );

//             return;
//         }


//         if (Array.isArray(data.cart)) {

//             doctorCart = data.cart.map(item => ({

//                 id: String(
//                     item.productId ||
//                     item.id ||
//                     ""
//                 ),

//                 productId: String(
//                     item.productId ||
//                     item.id ||
//                     ""
//                 ),

//                 name:
//                     item.name ||
//                     "Product",

//                 price:
//                     Number(item.price || 0),

//                 image:
//                     item.image || "",

//                 qty:
//                     Number(
//                         item.quantity ||
//                         item.qty ||
//                         1
//                     ),

//                 quantity:
//                     Number(
//                         item.quantity ||
//                         item.qty ||
//                         1
//                     )

//             }));

//         }


//         localStorage.setItem(
//             "doctorCart",
//             JSON.stringify(doctorCart)
//         );


//         updateCartCount();


//     }
//     catch (error) {

//         console.error(
//             "UPDATE CART ERROR:",
//             error
//         );

//         alert(
//             "Unable to update cart"
//         );

//     }

// }


// /* =====================================================
//    INCREASE PRODUCT
// ===================================================== */

// async function increaseCart(productId) {

//     const item =
//         doctorCart.find(
//             item =>
//                 String(
//                     item.productId ||
//                     item.id
//                 ) === String(productId)
//         );


//     if (!item) {

//         console.error(
//             "Cart item not found:",
//             productId
//         );

//         return;
//     }


//     const product =
//         products.find(
//             product =>
//                 String(product.id) ===
//                 String(productId)
//         );


//     const stock =
//         product
//             ? Number(product.stock || 0)
//             : 999999;


//     const currentQty =
//         Number(
//             item.quantity ||
//             item.qty ||
//             1
//         );


//     if (currentQty >= stock) {

//         alert(
//             "Maximum available stock reached"
//         );

//         return;
//     }


//     await updateCartQuantity(
//         productId,
//         currentQty + 1
//     );

// }


// /* =====================================================
//    DECREASE PRODUCT
// ===================================================== */

// async function decreaseCart(productId) {

//     const item =
//         doctorCart.find(
//             item =>
//                 String(
//                     item.productId ||
//                     item.id
//                 ) === String(productId)
//         );


//     if (!item) {

//         return;
//     }


//     const currentQty =
//         Number(
//             item.quantity ||
//             item.qty ||
//             1
//         );


//     if (currentQty <= 1) {

//         await removeFromCart(productId);

//         return;
//     }


//     await updateCartQuantity(
//         productId,
//         currentQty - 1
//     );

// }


// /* =====================================================
//    REMOVE PRODUCT
// ===================================================== */

// /* =====================================================
//    REMOVE PRODUCT - FINAL
// ===================================================== */

// async function removeFromCart(productId) {

//     try {

//         productId = String(productId);

//         console.log(
//             "REMOVE PRODUCT:",
//             productId
//         );


//         const response = await fetch(
//             "/api/cart",
//             {
//                 method: "DELETE",

//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 },

//                 credentials: "include",

//                 body: JSON.stringify({
//                     productId: productId
//                 })
//             }
//         );


//         const text = await response.text();

//         let data = null;

//         try {

//             data = text
//                 ? JSON.parse(text)
//                 : null;

//         }
//         catch (error) {

//             console.error(
//                 "REMOVE CART INVALID RESPONSE:",
//                 text
//             );

//             alert(
//                 "Server returned an invalid response"
//             );

//             return;
//         }


//         console.log(
//             "REMOVE CART RESPONSE:",
//             data
//         );


//         /* =========================================
//            API ERROR
//         ========================================= */

//         if (
//             !response.ok ||
//             !data ||
//             data.success !== true
//         ) {

//             alert(
//                 data?.message ||
//                 "Unable to remove product"
//             );

//             return;
//         }


//         /* =========================================
//            IMPORTANT
//            DATABASE CART = MAIN SOURCE
//         ========================================= */

//         if (
//             Array.isArray(data.cart)
//         ) {

//             doctorCart =
//                 normalizeCart(
//                     data.cart
//                 );

//         }
//         else {

//             /*
//              * If DELETE API does not return cart,
//              * reload cart directly from database.
//              */

//             await loadCart();

//             return;
//         }


//         /* =========================================
//            REMOVE LOCAL CACHE ITEM
//         ========================================= */

//         doctorCart =
//             doctorCart.filter(
//                 item =>
//                     String(
//                         item.productId ||
//                         item.id
//                     ) !== productId
//             );


//         /* =========================================
//            SAVE UPDATED CART
//         ========================================= */

//         saveLocalCart();


//         /* =========================================
//            UPDATE CART COUNT
//         ========================================= */

//         updateCartCount();


//         /* =========================================
//            FORCE CART COUNT FROM CURRENT CART
//         ========================================= */

//         const cartCount =
//             doctorCart.reduce(
//                 (total, item) => {

//                     return total +
//                         Number(
//                             item.quantity ||
//                             item.qty ||
//                             0
//                         );

//                 },
//                 0
//             );


//         const countElement =
//             document.getElementById(
//                 "cartCount"
//             );


//         if (countElement) {

//             countElement.textContent =
//                 cartCount;

//         }


//         /* =========================================
//            CART EMPTY
//         ========================================= */

//         if (cartCount === 0) {

//             if (countElement) {

//                 countElement.textContent = "0";

//             }

//             /*
//              * Optional:
//              * hide badge when cart is empty
//              */

//             if (countElement) {

//                 countElement.style.display =
//                     "none";

//             }

//         }
//         else {

//             if (countElement) {

//                 countElement.style.display =
//                     "inline-flex";

//             }

//         }


//         console.log(
//             "CART AFTER REMOVE:",
//             doctorCart
//         );


//     }
//     catch (error) {

//         console.error(
//             "REMOVE CART ERROR:",
//             error
//         );

//         alert(
//             "Unable to remove product"
//         );

//     }

// }


//     // =====================================================
//     // TRENDING PRODUCTS
//     // =====================================================

//     const trendingProducts =
//         safeProducts.filter(product => {

//             return (
//                 product.isTrending === true ||
//                 product.trending === true
//             );

//         });


//     // If no explicit trending products,
//     // show first 2 in-stock products

//     const finalTrending =
//         trendingProducts.length > 0

//             ?

//             trendingProducts

//             :

//             safeProducts
//                 .filter(
//                     product =>
//                         Number(product.stock || 0) > 0
//                 )
//                 .slice(0, 2);


//     // =====================================================
//     // PREMIUM PRODUCTS
//     // =====================================================

//     const premiumProducts =
//         safeProducts.filter(product => {

//             return (
//                 product.isPremium === true ||
//                 product.premium === true
//             );

//         });


//     // If no premium flag,
//     // show products having higher price

//     const finalPremium =
//         premiumProducts.length > 0

//             ?

//             premiumProducts

//             :

//             safeProducts
//                 .filter(
//                     product =>
//                         Number(product.stock || 0) > 0
//                 )
//                 .sort(
//                     (a, b) =>
//                         Number(b.price || 0) -
//                         Number(a.price || 0)
//                 )
//                 .slice(0, 2);


//     // =====================================================
//     // OUT OF STOCK
//     // =====================================================

//     const outOfStockProducts =
//         safeProducts.filter(product => {

//             return Number(product.stock || 0) <= 0;

//         });


//     // =====================================================
//     // PRODUCT COUNT
//     // =====================================================

//     const totalProducts =
//         safeProducts.length;


//     // =====================================================
//     // CATEGORY OPTIONS
//     // =====================================================

//     const categoryOptions =
//         categories.map(category => {

//             return `

//                 <option value="${escapeHTML(category)}">

//                     ${escapeHTML(category)}

//                 </option>

//             `;

//         }).join("");


//     // =====================================================
//     // COMPANY OPTIONS
//     // =====================================================

//     const companyOptions =
//         companies.map(company => {

//             return `

//                 <option value="${escapeHTML(company)}">

//                     ${escapeHTML(company)}

//                 </option>

//             `;

//         }).join("");


//     // =====================================================
//     // ALL PRODUCT CARDS
//     // =====================================================

//     const allProductsHTML =
//         safeProducts.length > 0

//             ?

//             safeProducts
//                 .map(product =>
//                     productCard(product)
//                 )
//                 .join("")

//             :

//             `
//                 <div class="empty-products">

//                     <div class="empty-icon">
//                         🔍
//                     </div>

//                     <h2>
//                         No Products Found
//                     </h2>

//                     <p>
//                         Healthcare products will appear here.
//                     </p>

//                 </div>
//             `;


//     // =====================================================
//     // TRENDING HTML
//     // =====================================================

//     const trendingHTML =
//         finalTrending.length > 0

//             ?

//             finalTrending
//                 .map(product =>
//                     productCard(
//                         product,
//                         "trending"
//                     )
//                 )
//                 .join("")

//             :

//             `
//                 <div class="no-special-products">

//                     No trending products available.

//                 </div>
//             `;


//     // =====================================================
//     // PREMIUM HTML
//     // =====================================================

//     const premiumHTML =
//         finalPremium.length > 0

//             ?

//             finalPremium
//                 .map(product =>
//                     productCard(
//                         product,
//                         "premium"
//                     )
//                 )
//                 .join("")

//             :

//             `
//                 <div class="no-special-products">

//                     No premium products available.

//                 </div>
//             `;


//     // =====================================================
//     // OUT OF STOCK HTML
//     // =====================================================

//     const outStockHTML =
//         outOfStockProducts.length > 0

//             ?

//             outOfStockProducts
//                 .map(product =>
//                     productCard(product)
//                 )
//                 .join("")

//             :

//             `
//                 <div class="no-special-products">

//                     🎉 All products are currently in stock.

//                 </div>
//             `;


//     // =====================================================
//     // PAGE
//     // =====================================================

//     return `

// <!DOCTYPE html>

// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
// >

// <title>
//     Doctor Portal | GLOBAL HEALTHCARE
// </title>


// <style>

// /* =====================================================
//    RESET
// ===================================================== */

// * {

//     margin:0;
//     padding:0;

//     box-sizing:border-box;

//     font-family:
//         "Poppins",
//         "Segoe UI",
//         Arial,
//         sans-serif;

// }


// body {

//     min-height:100vh;

//     background:
//         linear-gradient(
//             135deg,
//             #eef7ff,
//             #f8fafc
//         );

//     color:#0f172a;

// }


// /* =====================================================
//    HEADER
// ===================================================== */

// .header {

//     position:sticky;

//     top:0;

//     z-index:1000;

//     background:
//         linear-gradient(
//             135deg,
//             #005bea,
//             #00c6fb
//         );

//     color:white;

//     padding:15px 30px;

//     display:flex;

//     align-items:center;

//     justify-content:space-between;

//     gap:20px;

//     box-shadow:
//         0 10px 35px
//         rgba(0,91,234,.25);

// }


// .logo {

//     display:flex;

//     align-items:center;

//     gap:12px;

// }


// .logo-icon {

//     width:48px;

//     height:48px;

//     border-radius:15px;

//     background:
//         rgba(255,255,255,.18);

//     display:flex;

//     align-items:center;

//     justify-content:center;

//     font-size:25px;

// }


// .logo-text {

//     font-size:22px;

//     font-weight:900;

// }


// .logo-sub {

//     font-size:11px;

//     opacity:.85;

// }


// .nav {

//     display:flex;

//     align-items:center;

//     gap:8px;

//     flex-wrap:wrap;

// }


// .nav a {

//     color:white;

//     text-decoration:none;

//     padding:10px 13px;

//     border-radius:12px;

//     font-size:13px;

//     font-weight:700;

//     transition:.25s;

// }


// .nav a:hover {

//     background:
//         rgba(255,255,255,.18);

// }


// .cart-link {

//     position:relative;

// }


// .cart-count {

//     display:inline-flex;

//     align-items:center;

//     justify-content:center;

//     min-width:20px;

//     height:20px;

//     padding:0 5px;

//     border-radius:20px;

//     background:#ef4444;

//     color:white;

//     font-size:11px;

//     font-weight:900;

// }


// /* =====================================================
//    HERO
// ===================================================== */

// .hero {

//     max-width:1250px;

//     margin:25px auto;

//     padding:32px;

//     border-radius:28px;

//     background:
//         linear-gradient(
//             135deg,
//             #ffffff,
//             #eff6ff
//         );

//     border:1px solid #dbeafe;

//     box-shadow:
//         0 15px 45px
//         rgba(15,23,42,.08);

// }


// .doctor-row {

//     display:flex;

//     align-items:center;

//     gap:18px;

// }


// .doctor-avatar {

//     width:70px;

//     height:70px;

//     border-radius:22px;

//     display:flex;

//     align-items:center;

//     justify-content:center;

//     font-size:36px;

//     background:
//         linear-gradient(
//             135deg,
//             #dbeafe,
//             #e0f2fe
//         );

// }


// .hero h1 {

//     font-size:30px;

//     font-weight:900;

// }


// .hero h1 span {

//     color:#2563eb;

// }


// .hero p {

//     margin-top:7px;

//     color:#64748b;

//     font-size:14px;

//     font-weight:600;

// }


// .hero-tags {

//     display:flex;

//     gap:8px;

//     margin-top:18px;

//     flex-wrap:wrap;

// }


// .hero-tag {

//     padding:8px 13px;

//     border-radius:30px;

//     background:white;

//     border:1px solid #dbeafe;

//     color:#2563eb;

//     font-size:12px;

//     font-weight:800;

// }


// /* =====================================================
//    CONTAINER
// ===================================================== */

// .container {

//     max-width:1250px;

//     margin:auto;

//     padding:0 20px 40px;

// }


// /* =====================================================
//    FILTER PANEL
// ===================================================== */

// .filter-panel {

//     background:white;

//     padding:22px;

//     border-radius:22px;

//     border:1px solid #e2e8f0;

//     box-shadow:
//         0 12px 35px
//         rgba(15,23,42,.06);

//     margin-bottom:30px;

// }


// .filter-title {

//     display:flex;

//     align-items:center;

//     justify-content:space-between;

//     margin-bottom:16px;

// }


// .filter-title h2 {

//     font-size:20px;

//     font-weight:900;

// }


// .product-count {

//     color:#64748b;

//     font-size:13px;

//     font-weight:700;

// }


// .filters {

//     display:grid;

//     grid-template-columns:
//         1.5fr
//         1fr
//         1fr
//         auto;

//     gap:12px;

// }


// .search-box,
// .select-box {

//     position:relative;

// }


// .search-box span {

//     position:absolute;

//     left:14px;

//     top:50%;

//     transform:translateY(-50%);

//     font-size:18px;

// }


// input,
// select {

//     width:100%;

//     height:48px;

//     border:1px solid #dbe3ee;

//     border-radius:14px;

//     outline:none;

//     padding:0 14px;

//     background:#f8fafc;

//     color:#0f172a;

//     font-size:14px;

//     font-weight:600;

// }


// .search-box input {

//     padding-left:45px;

// }


// input:focus,
// select:focus {

//     border-color:#2563eb;

//     background:white;

//     box-shadow:
//         0 0 0 4px
//         rgba(37,99,235,.08);

// }


// .reset-btn {

//     height:48px;

//     padding:0 18px;

//     border:0;

//     border-radius:14px;

//     background:
//         linear-gradient(
//             135deg,
//             #0f172a,
//             #334155
//         );

//     color:white;

//     cursor:pointer;

//     font-weight:800;

// }


// /* =====================================================
//    SECTION
// ===================================================== */

// .product-section {

//     margin-bottom:38px;

// }


// .section-header {

//     display:flex;

//     align-items:end;

//     justify-content:space-between;

//     margin-bottom:17px;

// }


// .section-title {

//     display:flex;

//     align-items:center;

//     gap:10px;

// }


// .section-title h2 {

//     font-size:24px;

//     font-weight:900;

// }


// .section-title p {

//     margin-top:3px;

//     color:#64748b;

//     font-size:13px;

// }


// .section-icon {

//     width:44px;

//     height:44px;

//     display:flex;

//     align-items:center;

//     justify-content:center;

//     border-radius:14px;

//     background:#eff6ff;

//     font-size:22px;

// }


// /* =====================================================
//    PRODUCTS GRID
// ===================================================== */

// .products-grid {

//     display:grid;

//     grid-template-columns:
//         repeat(3, 1fr);

//     gap:20px;

// }


// /* =====================================================
//    PRODUCT CARD
// ===================================================== */

// .product-card {

//     position:relative;

//     background:white;

//     border-radius:23px;

//     border:1px solid #e2e8f0;

//     overflow:hidden;

//     box-shadow:
//         0 10px 30px
//         rgba(15,23,42,.06);

//     transition:
//         transform .25s,
//         box-shadow .25s;

// }


// .product-card:hover {

//     transform:
//         translateY(-6px);

//     box-shadow:
//         0 20px 45px
//         rgba(15,23,42,.12);

// }


// .product-image {

//     height:210px;

//     background:
//         linear-gradient(
//             135deg,
//             #f8fafc,
//             #eff6ff
//         );

//     display:flex;

//     align-items:center;

//     justify-content:center;

//     overflow:hidden;

// }


// .product-image img {

//     width:100%;

//     height:100%;

//     object-fit:contain;

//     padding:18px;

//     transition:.3s;

// }


// .product-card:hover
// .product-image img {

//     transform:scale(1.05);

// }


// .image-placeholder {

//     width:80px;

//     height:80px;

//     border-radius:24px;

//     display:flex;

//     align-items:center;

//     justify-content:center;

//     background:#dbeafe;

//     font-size:38px;

// }


// .product-content {

//     padding:18px;

// }


// .product-badge {

//     position:absolute;

//     top:13px;

//     left:13px;

//     z-index:2;

//     padding:7px 11px;

//     border-radius:30px;

//     font-size:10px;

//     font-weight:900;

//     letter-spacing:.3px;

//     box-shadow:
//         0 5px 15px
//         rgba(0,0,0,.12);

// }


// .trending-badge {

//     background:#fff7ed;

//     color:#ea580c;

// }


// .premium-badge {

//     background:#fefce8;

//     color:#a16207;

// }


// .stock-badge {

//     background:#fee2e2;

//     color:#b91c1c;

// }


// .product-category {

//     display:flex;

//     align-items:center;

//     justify-content:space-between;

//     color:#2563eb;

//     font-size:12px;

//     font-weight:900;

//     text-transform:capitalize;

// }


// .rating {

//     color:#f59e0b;

// }


// .product-name {

//     margin-top:8px;

//     font-size:19px;

//     font-weight:900;

//     line-height:1.3;

// }


// .product-description {

//     color:#64748b;

//     font-size:12px;

//     line-height:1.5;

//     margin-top:7px;

//     min-height:36px;

// }


// .company {

//     display:flex;

//     align-items:center;

//     gap:5px;

//     margin-top:13px;

//     color:#475569;

//     font-size:12px;

//     font-weight:700;

// }


// .company span {

//     overflow:hidden;

//     text-overflow:ellipsis;

//     white-space:nowrap;

// }


// .brand {

//     margin-top:5px;

//     color:#64748b;

//     font-size:11px;

// }


// .brand strong {

//     color:#334155;

// }


// .price-area {

//     display:flex;

//     align-items:center;

//     justify-content:space-between;

//     margin-top:14px;

// }


// .price-row {

//     display:flex;

//     align-items:center;

//     gap:8px;

// }


// .old-price {

//     color:#94a3b8;

//     font-size:14px;

//     text-decoration:line-through;

// }


// .sale-price {

//     color:#16a34a;

//     font-size:23px;

//     font-weight:900;

// }


// .discount {

//     padding:5px 8px;

//     border-radius:8px;

//     background:#ecfdf5;

//     color:#15803d;

//     font-size:10px;

//     font-weight:900;

// }


// .stock {

//     margin-top:11px;

//     font-size:12px;

//     font-weight:800;

// }


// .in-stock {

//     color:#16a34a;

// }


// .out-stock {

//     color:#dc2626;

// }


// .cart-btn {

//     width:100%;

//     height:45px;

//     margin-top:14px;

//     border:0;

//     border-radius:13px;

//     cursor:pointer;

//     background:
//         linear-gradient(
//             135deg,
//             #2563eb,
//             #4f46e5
//         );

//     color:white;

//     font-weight:900;

//     font-size:13px;

//     transition:.25s;

// }


// .cart-btn:hover {

//     transform:translateY(-2px);

//     box-shadow:
//         0 8px 20px
//         rgba(37,99,235,.25);

// }


// .disabled-btn {

//     background:#e2e8f0;

//     color:#94a3b8;

//     cursor:not-allowed;

// }


// .disabled-btn:hover {

//     transform:none;

//     box-shadow:none;

// }


// .out-stock-card {

//     opacity:.78;

// }


// .out-stock-card .product-image {

//     filter:grayscale(.3);

// }


// /* =====================================================
//    SPECIAL MESSAGE
// ===================================================== */

// .no-special-products {

//     background:white;

//     border:1px dashed #cbd5e1;

//     border-radius:18px;

//     padding:30px;

//     text-align:center;

//     color:#64748b;

//     font-weight:700;

// }


// /* =====================================================
//    EMPTY
// ===================================================== */

// .empty-products {

//     grid-column:1 / -1;

//     text-align:center;

//     background:white;

//     border-radius:22px;

//     padding:60px 20px;

//     border:1px solid #e2e8f0;

// }


// .empty-icon {

//     font-size:55px;

//     margin-bottom:15px;

// }


// .empty-products h2 {

//     font-size:22px;

// }


// .empty-products p {

//     margin-top:7px;

//     color:#64748b;

// }


// /* =====================================================
//    FOOTER
// ===================================================== */

// .footer {

//     text-align:center;

//     padding:30px 20px;

//     color:#64748b;

//     font-size:12px;

// }


// .footer strong {

//     color:#2563eb;

// }

// /* =====================================================
//    MOBILE
// ===================================================== */

// @media(max-width:950px) {

//     .products-grid {
//         grid-template-columns:
//             repeat(2, minmax(0, 1fr));

//         gap:12px;
//     }

//     .filters {
//         grid-template-columns:
//             1fr 1fr;
//     }

// }


// @media(max-width:700px) {

//     .header {
//         position:relative;

//         flex-direction:column;

//         align-items:stretch;

//         padding:15px;
//     }


//     .logo {
//         justify-content:center;
//     }


//     .nav {
//         justify-content:center;
//     }


//     .nav a {
//         font-size:11px;

//         padding:8px 9px;
//     }


//     .hero {
//         margin:15px 12px;

//         padding:22px;

//         border-radius:22px;
//     }


//     .hero h1 {
//         font-size:24px;
//     }


//     .doctor-avatar {
//         width:58px;

//         height:58px;

//         font-size:28px;
//     }


//     .container {
//         padding:
//             0 10px 30px;
//     }


//     .filters {
//         grid-template-columns:1fr;
//     }


//     .section-header {
//         align-items:flex-start;
//     }


//     .section-title h2 {
//         font-size:20px;
//     }


//     /* =================================================
//        2 CARDS IN ONE ROW
//     ================================================= */

//     .products-grid {
//         grid-template-columns:
//             repeat(2, minmax(0, 1fr));

//         gap:10px;
//     }


//     .product-card {
//         min-width:0;

//         border-radius:16px;
//     }


//     .product-image {
//         height:145px;
//     }


//     .product-image img {
//         padding:10px;
//     }


//     .product-content {
//         padding:11px;
//     }


//     .product-name {
//         font-size:14px;

//         line-height:1.3;
//     }


//     .product-description {
//         font-size:10px;

//         min-height:30px;
//     }


//     .product-category {
//         font-size:10px;
//     }


//     .company {
//         font-size:10px;
//     }


//     .brand {
//         font-size:9px;
//     }


//     .sale-price {
//         font-size:17px;
//     }


//     .old-price {
//         font-size:10px;
//     }


//     .discount {
//         font-size:8px;

//         padding:4px 5px;
//     }


//     .stock {
//         font-size:10px;
//     }


//     .cart-btn {
//         height:38px;

//         margin-top:10px;

//         font-size:10px;

//         border-radius:10px;
//     }


//     .product-badge {
//         top:7px;

//         left:7px;

//         padding:5px 7px;

//         font-size:8px;
//     }

// }
// </style>

// </head>


// <body>


// <!-- ===================================================
//      HEADER
// =================================================== -->

// <header class="header">

//     <div class="logo">

//         <div class="logo-icon">
//             🩺
//         </div>

//         <div>

//             <div class="logo-text">
//                 GLOBAL HEALTHCARE
//             </div>

//             <div class="logo-sub">
//                 SAFE & SECURE Healthcare
//             </div>

//         </div>

//     </div>


//     <nav class="nav">

//         <a href="/doctor/dashboard">
//             🏠 Home
//         </a>

//         <a href="/doctor/orders">
//             📦 Orders
//         </a>

//         <a
//             href="/doctor/cart"
//             class="cart-link"
//         >

//             🛒 Cart

//             <span
//                 id="cartCount"
//                 class="cart-count"
//             >
//                 0
//             </span>

//         </a>

//         <a href="/admin/doctor/logout">
//             🚪 Logout
//         </a>

//     </nav>

// </header>


// <!-- ===================================================
//      HERO
// =================================================== -->

// <section class="hero">

//     <div class="doctor-row">

//         <div class="doctor-avatar">
//             👨‍⚕️
//         </div>

//         <div>

//             <h1>
//                 Welcome
//                 <span>
//                     Dr. ${escapeHTML(doctorName)}
//                 </span>
//             </h1>

//             <p>
//                 ${escapeHTML(specialization)}
//                 &nbsp; • &nbsp;
//                 Premium Healthcare Products
//             </p>

//         </div>

//     </div>


//     <div class="hero-tags">

//         <div class="hero-tag">
//             🛡️ Trusted Healthcare
//         </div>

//         <div class="hero-tag">
//             🚚 Fast Delivery
//         </div>

//         <div class="hero-tag">
//             💊 Quality Products
//         </div>

//         <div class="hero-tag">
//             🔒 Secure Ordering
//         </div>

//     </div>

// </section>


// <!-- ===================================================
//      MAIN
// =================================================== -->

// <main class="container">


//     <!-- FILTER -->

//     <section class="filter-panel">

//         <div class="filter-title">

//             <h2>
//                 🔎 Find Products
//             </h2>

//             <div
//                 class="product-count"
//                 id="productCount"
//             >
//                 ${totalProducts} Products
//             </div>

//         </div>


//         <div class="filters">


//             <!-- SEARCH -->

//             <div class="search-box">

//                 <span>
//                     🔍
//                 </span>

//                 <input
//                     type="text"
//                     id="searchInput"
//                     placeholder="Search products..."
//                     autocomplete="off"
//                 >

//             </div>


//             <!-- CATEGORY -->

//             <div class="select-box">

//                 <select id="categoryFilter">

//                     <option value="">
//                         📦 All Categories
//                     </option>

//                     ${categoryOptions}

//                 </select>

//             </div>


//             <!-- COMPANY -->

//             <div class="select-box">

//                 <select id="companyFilter">

//                     <option value="">
//                         🏭 All Companies / Brands
//                     </option>

//                     ${companyOptions}

//                 </select>

//             </div>


//             <!-- RESET -->

//             <button
//                 type="button"
//                 class="reset-btn"
//                 onclick="resetFilters()"
//             >

//                 ↻ Reset

//             </button>


//         </div>

//     </section>


//     <!-- =================================================
//          TRENDING
//     ================================================== -->

//     <section
//         class="product-section"
//         id="trendingSection"
//     >

//         <div class="section-header">

//             <div class="section-title">

//                 <div class="section-icon">
//                     🔥
//                 </div>

//                 <div>

//                     <h2>
//                         Trending Products
//                     </h2>

//                     <p>
//                         Popular healthcare products
//                     </p>

//                 </div>

//             </div>

//         </div>


//         <div class="products-grid">

//             ${trendingHTML}

//         </div>

//     </section>


//     <!-- =================================================
//          PREMIUM
//     ================================================== -->

//     <section
//         class="product-section"
//         id="premiumSection"
//     >

//         <div class="section-header">

//             <div class="section-title">

//                 <div class="section-icon">
//                     👑
//                 </div>

//                 <div>

//                     <h2>
//                         Premium Products
//                     </h2>

//                     <p>
//                         Premium Healthcare Collection
//                     </p>

//                 </div>

//             </div>

//         </div>


//         <div class="products-grid">

//             ${premiumHTML}

//         </div>

//     </section>


//     <!-- =================================================
//          ALL PRODUCTS
//     ================================================== -->

//     <section
//         class="product-section"
//         id="allSection"
//     >

//         <div class="section-header">

//             <div class="section-title">

//                 <div class="section-icon">
//                     🛍️
//                 </div>

//                 <div>

//                     <h2>
//                         All Products
//                     </h2>

//                     <p>
//                         Browse our complete healthcare collection
//                     </p>

//                 </div>

//             </div>

//         </div>


//         <div
//             class="products-grid"
//             id="productsGrid"
//         >

//             ${allProductsHTML}

//         </div>

//     </section>


//     <!-- =================================================
//          OUT OF STOCK
//     ================================================== -->

//     <section
//         class="product-section"
//         id="outStockSection"
//     >

//         <div class="section-header">

//             <div class="section-title">

//                 <div class="section-icon">
//                     🚫
//                 </div>

//                 <div>

//                     <h2>
//                         Out of Stock
//                     </h2>

//                     <p>
//                         Currently unavailable products
//                     </p>

//                 </div>

//             </div>

//         </div>


//         <div class="products-grid">

//             ${outStockHTML}

//         </div>

//     </section>


// </main>


// <!-- ===================================================
//      FOOTER
// =================================================== -->

// <footer class="footer">

//     © 2026

//     <strong>
//         GLOBAL HEALTHCARE
//     </strong>

//     <br>

//     Powered by

//     <strong>
//         Osium Biogenix
//     </strong>

// </footer>

// <script>

// /* =====================================================
//    PRODUCT DATA
// ===================================================== */

// const products = ${JSON.stringify(productData)};


// /* =====================================================
//    CART
// ===================================================== */

// let doctorCart = [];


// /* =====================================================
//    NORMALIZE CART ITEM
// ===================================================== */

// function normalizeCartItem(item) {

//     if (!item) {
//         return null;
//     }

//     const productId = String(
//         item.productId ||
//         item.product?._id ||
//         item.id ||
//         ""
//     );

//     if (!productId) {
//         return null;
//     }

//     const quantity = Math.max(
//         1,
//         Number(
//             item.quantity ??
//             item.qty ??
//             1
//         )
//     );

//     return {

//         id: productId,

//         productId: productId,

//         name:
//             item.name ||
//             item.product?.name ||
//             "Product",

//         price:
//             Number(
//                 item.price ??
//                 item.product?.price ??
//                 0
//             ),

//         image:
//             item.image ||
//             item.product?.image ||
//             "",

//         quantity: quantity,

//         qty: quantity

//     };

// }


// /* =====================================================
//    NORMALIZE CART
// ===================================================== */

// function normalizeCart(cart) {

//     if (!Array.isArray(cart)) {
//         return [];
//     }

//     return cart
//         .map(normalizeCartItem)
//         .filter(Boolean);

// }


// /* =====================================================
//    UPDATE CART COUNT
// ===================================================== */

// function updateCartCount() {

//     const countElement =
//         document.getElementById("cartCount");

//     if (!countElement) {
//         return;
//     }

//     const count =
//         Array.isArray(doctorCart)
//             ? doctorCart.reduce(
//                 (total, item) => {

//                     return total +
//                         Number(
//                             item.quantity ??
//                             item.qty ??
//                             0
//                         );

//                 },
//                 0
//             )
//             : 0;

//     countElement.textContent = count;

//     if (count <= 0) {

//         countElement.style.display =
//             "none";

//     }
//     else {

//         countElement.style.display =
//             "inline-flex";

//     }

// }


// /* =====================================================
//    FIND PRODUCT
// ===================================================== */

// function findProduct(productId) {

//     return products.find(
//         product =>
//             String(product.id) ===
//             String(productId)
//     );

// }


// /* =====================================================
//    API JSON HELPER
// ===================================================== */

// async function getJSONResponse(response) {

//     const text =
//         await response.text();

//     if (!text) {
//         return null;
//     }

//     try {

//         return JSON.parse(text);

//     }
//     catch (error) {

//         console.error(
//             "Invalid JSON response:",
//             text
//         );

//         return null;

//     }

// }


// /* =====================================================
//    LOAD CART FROM DATABASE
// ===================================================== */

// async function loadCart() {

//     try {

//         console.log(
//             "Loading doctor cart..."
//         );

//         const response =
//             await fetch(
//                 "/api/cart",
//                 {
//                     method: "GET",

//                     headers: {
//                         "Accept":
//                             "application/json"
//                     },

//                     credentials: "include"
//                 }
//             );

//         const data =
//             await getJSONResponse(
//                 response
//             );

//         console.log(
//             "GET /api/cart:",
//             data
//         );


//         if (
//             response.ok &&
//             data &&
//             data.success === true &&
//             Array.isArray(data.cart)
//         ) {

//             doctorCart =
//                 normalizeCart(
//                     data.cart
//                 );

//         }
//         else {

//             doctorCart = [];

//             if (data?.message) {

//                 console.warn(
//                     data.message
//                 );

//             }

//         }

//     }
//     catch (error) {

//         console.error(
//             "LOAD CART ERROR:",
//             error
//         );

//         doctorCart = [];

//     }

//     updateCartCount();

// }


// /* =====================================================
//    ADD TO CART
//    POST /api/cart
// ===================================================== */

// async function addToCart(productId) {

//     try {

//         productId =
//             String(
//                 productId || ""
//             ).trim();


//         console.log(
//             "ADD TO CART PRODUCT ID:",
//             productId
//         );


//         if (!productId) {

//             alert(
//                 "Invalid product ID"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            FIND PRODUCT
//         ----------------------------------------- */

//         const product =
//             findProduct(
//                 productId
//             );


//         console.log(
//             "FOUND PRODUCT:",
//             product
//         );


//         if (!product) {

//             alert(
//                 "Product not found"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            STOCK CHECK
//         ----------------------------------------- */

//         const stock =
//             Number(
//                 product.stock || 0
//             );


//         if (stock <= 0) {

//             alert(
//                 "Product is out of stock"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            CURRENT CART QUANTITY
//         ----------------------------------------- */

//         const existing =
//             doctorCart.find(
//                 item =>
//                     String(
//                         item.productId ||
//                         item.id
//                     ) === productId
//             );


//         const currentQuantity =
//             existing
//                 ? Number(
//                     existing.quantity ||
//                     existing.qty ||
//                     0
//                 )
//                 : 0;


//         console.log(
//             "CURRENT QUANTITY:",
//             currentQuantity
//         );


//         /* -----------------------------------------
//            STOCK LIMIT
//         ----------------------------------------- */

//         if (
//             currentQuantity >= stock
//         ) {

//             alert(
//                 "Maximum available stock reached"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            ADD TO DATABASE
//         ----------------------------------------- */

//         const response =
//             await fetch(
//                 "/api/cart",
//                 {

//                     method: "POST",

//                     credentials: "include",

//                     headers: {

//                         "Content-Type":
//                             "application/json",

//                         "Accept":
//                             "application/json"

//                     },

//                     body:
//                         JSON.stringify({

//                             productId:
//                                 productId,

//                             quantity: 1

//                         })

//                 }
//             );


//         console.log(
//             "CART RESPONSE STATUS:",
//             response.status
//         );


//         /* -----------------------------------------
//            READ RESPONSE
//         ----------------------------------------- */

//         const data =
//             await getJSONResponse(
//                 response
//             );


//         console.log(
//             "CART API DATA:",
//             data
//         );


//         /* -----------------------------------------
//            API ERROR
//         ----------------------------------------- */

//         if (
//             !response.ok ||
//             !data ||
//             data.success !== true
//         ) {

//             alert(
//                 data?.message ||
//                 "Unable to add product to cart"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            UPDATE LOCAL CART
//            FROM DATABASE RESPONSE
//         ----------------------------------------- */

//         if (
//             Array.isArray(
//                 data.cart
//             )
//         ) {

//             doctorCart =
//                 normalizeCart(
//                     data.cart
//                 );

//         }
//         else {

//             await loadCart();

//         }


//         /* -----------------------------------------
//            UPDATE COUNT
//         ----------------------------------------- */

//         updateCartCount();


//         console.log(
//             "CART AFTER ADD:",
//             doctorCart
//         );


//         /* -----------------------------------------
//            SUCCESS
//         ----------------------------------------- */

//         alert(
//             product.name +
//             " added to cart"
//         );

//     }
//     catch (error) {

//         console.error(
//             "ADD TO CART ERROR:",
//             error
//         );

//         alert(
//             "Unable to add product to cart"
//         );

//     }

// }


// /* =====================================================
//    UPDATE CART QUANTITY
//    PATCH /api/cart/:productId
// ===================================================== */

// async function updateCartQuantity(
//     productId,
//     quantity
// ) {

//     try {

//         productId =
//             String(productId);

//         quantity =
//             Number(quantity);


//         /* -----------------------------------------
//            REMOVE WHEN ZERO
//         ----------------------------------------- */

//         if (
//             quantity <= 0
//         ) {

//             await removeFromCart(
//                 productId
//             );

//             return;

//         }


//         /* -----------------------------------------
//            FIND PRODUCT
//         ----------------------------------------- */

//         const product =
//             findProduct(
//                 productId
//             );


//         /* -----------------------------------------
//            STOCK CHECK
//         ----------------------------------------- */

//         if (product) {

//             const stock =
//                 Number(
//                     product.stock || 0
//                 );


//             if (
//                 stock <= 0
//             ) {

//                 alert(
//                     "Product is out of stock"
//                 );

//                 return;

//             }


//             if (
//                 quantity > stock
//             ) {

//                 alert(
//                     "Maximum available stock reached"
//                 );

//                 return;

//             }

//         }


//         /* -----------------------------------------
//            PATCH API
//         ----------------------------------------- */

//         const response =
//             await fetch(
//                 "/api/cart/" +
//                 encodeURIComponent(
//                     productId
//                 ),
//                 {

//                     method: "PATCH",

//                     headers: {

//                         "Content-Type":
//                             "application/json",

//                         "Accept":
//                             "application/json"

//                     },

//                     credentials: "include",

//                     body:
//                         JSON.stringify({

//                             quantity:
//                                 quantity

//                         })

//                 }
//             );


//         const data =
//             await getJSONResponse(
//                 response
//             );


//         console.log(
//             "PATCH CART:",
//             data
//         );


//         /* -----------------------------------------
//            API ERROR
//         ----------------------------------------- */

//         if (
//             !response.ok ||
//             !data ||
//             data.success !== true
//         ) {

//             alert(
//                 data?.message ||
//                 "Unable to update cart"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            UPDATE CART
//         ----------------------------------------- */

//         if (
//             Array.isArray(
//                 data.cart
//             )
//         ) {

//             doctorCart =
//                 normalizeCart(
//                     data.cart
//                 );

//         }
//         else {

//             await loadCart();

//         }


//         updateCartCount();

//     }
//     catch (error) {

//         console.error(
//             "UPDATE CART ERROR:",
//             error
//         );

//         alert(
//             "Unable to update cart"
//         );

//     }

// }


// /* =====================================================
//    INCREASE CART
// ===================================================== */

// async function increaseCart(
//     productId
// ) {

//     const item =
//         doctorCart.find(
//             item =>
//                 String(
//                     item.productId ||
//                     item.id
//                 ) ===
//                 String(productId)
//         );


//     if (!item) {

//         console.error(
//             "Cart item not found:",
//             productId
//         );

//         return;

//     }


//     const product =
//         findProduct(
//             productId
//         );


//     const stock =
//         product
//             ? Number(
//                 product.stock || 0
//             )
//             : 0;


//     const currentQuantity =
//         Number(
//             item.quantity ||
//             item.qty ||
//             1
//         );


//     if (
//         stock <= 0
//     ) {

//         alert(
//             "Product is out of stock"
//         );

//         return;

//     }


//     if (
//         currentQuantity >= stock
//     ) {

//         alert(
//             "Maximum available stock reached"
//         );

//         return;

//     }


//     await updateCartQuantity(
//         productId,
//         currentQuantity + 1
//     );

// }


// /* =====================================================
//    DECREASE CART
// ===================================================== */

// async function decreaseCart(
//     productId
// ) {

//     const item =
//         doctorCart.find(
//             item =>
//                 String(
//                     item.productId ||
//                     item.id
//                 ) ===
//                 String(productId)
//         );


//     if (!item) {
//         return;
//     }


//     const currentQuantity =
//         Number(
//             item.quantity ||
//             item.qty ||
//             1
//         );


//     if (
//         currentQuantity <= 1
//     ) {

//         await removeFromCart(
//             productId
//         );

//         return;

//     }


//     await updateCartQuantity(
//         productId,
//         currentQuantity - 1
//     );

// }


// /* =====================================================
//    REMOVE PRODUCT
//    DELETE /api/cart/:productId
// ===================================================== */

// async function removeFromCart(
//     productId
// ) {

//     try {

//         productId =
//             String(productId);


//         const response =
//             await fetch(
//                 "/api/cart/" +
//                 encodeURIComponent(
//                     productId
//                 ),
//                 {

//                     method: "DELETE",

//                     headers: {

//                         "Accept":
//                             "application/json"

//                     },

//                     credentials: "include"

//                 }
//             );


//         const data =
//             await getJSONResponse(
//                 response
//             );


//         console.log(
//             "DELETE CART:",
//             data
//         );


//         /* -----------------------------------------
//            API ERROR
//         ----------------------------------------- */

//         if (
//             !response.ok ||
//             !data ||
//             data.success !== true
//         ) {

//             alert(
//                 data?.message ||
//                 "Unable to remove product"
//             );

//             return;

//         }


//         /* -----------------------------------------
//            UPDATE CART
//         ----------------------------------------- */

//         if (
//             Array.isArray(
//                 data.cart
//             )
//         ) {

//             doctorCart =
//                 normalizeCart(
//                     data.cart
//                 );

//         }
//         else {

//             doctorCart =
//                 doctorCart.filter(
//                     item =>
//                         String(
//                             item.productId ||
//                             item.id
//                         ) !==
//                         productId
//                 );

//         }


//         updateCartCount();


//         console.log(
//             "CART AFTER REMOVE:",
//             doctorCart
//         );

//     }
//     catch (error) {

//         console.error(
//             "REMOVE CART ERROR:",
//             error
//         );

//         alert(
//             "Unable to remove product"
//         );

//     }

// }


// /* =====================================================
//    FILTER PRODUCTS
// ===================================================== */

// function filterProducts() {

//     const searchInput =
//         document.getElementById(
//             "searchInput"
//         );

//     const categoryInput =
//         document.getElementById(
//             "categoryFilter"
//         );

//     const companyInput =
//         document.getElementById(
//             "companyFilter"
//         );


//     const search =
//         searchInput
//             ? searchInput.value
//                 .toLowerCase()
//                 .trim()
//             : "";


//     const category =
//         categoryInput
//             ? categoryInput.value
//                 .toLowerCase()
//                 .trim()
//             : "";


//     const company =
//         companyInput
//             ? companyInput.value
//                 .toLowerCase()
//                 .trim()
//             : "";


//     const cards =
//         document.querySelectorAll(
//             "#productsGrid .product-card"
//         );


//     let visible = 0;


//     cards.forEach(
//         card => {

//             const name =
//                 String(
//                     card.dataset.name ||
//                     ""
//                 ).toLowerCase();


//             const cardCategory =
//                 String(
//                     card.dataset.category ||
//                     ""
//                 ).toLowerCase();


//             const cardCompany =
//                 String(
//                     card.dataset.company ||
//                     ""
//                 ).toLowerCase();


//             const matchSearch =
//                 !search ||
//                 name.includes(
//                     search
//                 );


//             const matchCategory =
//                 !category ||
//                 cardCategory ===
//                 category;


//             const matchCompany =
//                 !company ||
//                 cardCompany ===
//                 company;


//             const show =
//                 matchSearch &&
//                 matchCategory &&
//                 matchCompany;


//             card.style.display =
//                 show
//                     ? ""
//                     : "none";


//             if (show) {
//                 visible++;
//             }

//         }
//     );


//     const productCount =
//         document.getElementById(
//             "productCount"
//         );


//     if (productCount) {

//         productCount.textContent =
//             visible +
//             " Products";

//     }


//     const hasFilter =
//         Boolean(
//             search ||
//             category ||
//             company
//         );


//     const trendingSection =
//         document.getElementById(
//             "trendingSection"
//         );


//     const premiumSection =
//         document.getElementById(
//             "premiumSection"
//         );


//     const outStockSection =
//         document.getElementById(
//             "outStockSection"
//         );


//     if (trendingSection) {

//         trendingSection.style.display =
//             hasFilter
//                 ? "none"
//                 : "";

//     }


//     if (premiumSection) {

//         premiumSection.style.display =
//             hasFilter
//                 ? "none"
//                 : "";

//     }


//     if (outStockSection) {

//         outStockSection.style.display =
//             hasFilter
//                 ? "none"
//                 : "";

//     }

// }


// /* =====================================================
//    RESET FILTERS
// ===================================================== */

// function resetFilters() {

//     const searchInput =
//         document.getElementById(
//             "searchInput"
//         );

//     const categoryInput =
//         document.getElementById(
//             "categoryFilter"
//         );

//     const companyInput =
//         document.getElementById(
//             "companyFilter"
//         );


//     if (searchInput) {
//         searchInput.value = "";
//     }


//     if (categoryInput) {
//         categoryInput.value = "";
//     }


//     if (companyInput) {
//         companyInput.value = "";
//     }


//     filterProducts();

// }


// /* =====================================================
//    INITIALIZE PRODUCT PAGE
// ===================================================== */

// function initializeProductPage() {

//     const searchInput =
//         document.getElementById(
//             "searchInput"
//         );

//     const categoryInput =
//         document.getElementById(
//             "categoryFilter"
//         );

//     const companyInput =
//         document.getElementById(
//             "companyFilter"
//         );


//     /* -----------------------------------------
//        SEARCH
//     ----------------------------------------- */

//     if (searchInput) {

//         searchInput.addEventListener(
//             "input",
//             filterProducts
//         );

//     }


//     /* -----------------------------------------
//        CATEGORY
//     ----------------------------------------- */

//     if (categoryInput) {

//         categoryInput.addEventListener(
//             "change",
//             filterProducts
//         );

//     }


//     /* -----------------------------------------
//        COMPANY
//     ----------------------------------------- */

//     if (companyInput) {

//         companyInput.addEventListener(
//             "change",
//             filterProducts
//         );

//     }


//     /* -----------------------------------------
//        INITIAL FILTER
//     ----------------------------------------- */

//     filterProducts();


//     /* -----------------------------------------
//        LOAD DATABASE CART
//     ----------------------------------------- */

//     loadCart();

// }


// /* =====================================================
//    START
// ===================================================== */

// if (
//     document.readyState ===
//     "loading"
// ) {

//     document.addEventListener(
//         "DOMContentLoaded",
//         initializeProductPage
//     );

// }
// else {

//     initializeProductPage();

// }

// </script>


// </body>

// </html>

//     `;

// }


// module.exports =
//     DoctorDashboard;


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function DoctorDashboard(doctor = {}, products = []) {

    // =====================================================
    // DOCTOR DETAILS
    // =====================================================

    const rawDoctorName =
        doctor.name ||
        doctor.doctorName ||
        "Doctor";

    /*
     * Remove duplicate Dr. if database already contains
     * Dr. Ram Karan Sah
     */

    const doctorName =
        String(rawDoctorName)
            .replace(/^dr\.?\s+/i, "")
            .trim();

    const specialization =
        doctor.specialization ||
        "General Physician";


    // =====================================================
    // PRODUCTS
    // =====================================================

    const safeProducts =
        Array.isArray(products)
            ? products
            : [];


    // =====================================================
    // CATEGORY LIST
    // =====================================================

    const categories = [
        ...new Set(
            safeProducts
                .map(product =>
                    String(product.category || "")
                        .trim()
                )
                .filter(Boolean)
        )
    ];


    // =====================================================
    // COMPANY / BRAND LIST
    // =====================================================

    const companies = [
        ...new Set(
            safeProducts
                .map(product => {

                    return (
                        product.manufacturer ||
                        product.brand ||
                        ""
                    )
                        .toString()
                        .trim();

                })
                .filter(Boolean)
        )
    ];


    // =====================================================
    // PRODUCT JSON FOR JAVASCRIPT
    // =====================================================

    const productData =
        safeProducts.map(product => {

            const mrp =
                Number(product.mrp || 0);

            const price =
                Number(product.price || 0);

            let discount = 0;

            if (mrp > price && mrp > 0) {

                discount =
                    Math.round(
                        ((mrp - price) / mrp) * 100
                    );

            }

            const stock =
                Number(product.stock || 0);

            const category =
                String(
                    product.category || "Medicine"
                );

            const company =
                String(
                    product.manufacturer ||
                    product.brand ||
                    ""
                );

            const packSize =
                String(
                    product.packSize ||
                    product.pack ||
                    product.size ||
                    ""
                ).trim();

            const composition = Array.isArray(product.composition)
                ? product.composition
                    .filter(Boolean)
                    .map(item => {
                        if (typeof item === "object") {
                            return [
                                item.name || "",
                                item.strength || ""
                            ].filter(Boolean).join(" ");
                        }

                        return String(item);
                    })
                    .filter(Boolean)
                    .join(" + ")
                : String(product.composition || "").trim();

            return {

                id:
                    String(
                        product._id || ""
                    ),

                name:
                    String(
                        product.name || "Product"
                    ),

                category,

                company,

                brand:
                    String(
                        product.brand || ""
                    ),

                manufacturer:
                    String(
                        product.manufacturer || ""
                    ),

                packSize,

                composition,

                price,

                mrp,

                stock,

                discount,

                description:
                    String(
                        product.description ||
                        "Premium Healthcare Product"
                    ),

                image:
                    String(
                        product.image ||
                        (
                            Array.isArray(
                                product.images
                            )
                                ? product.images[0] || ""
                                : ""
                        )
                    ),

                images:
                    Array.isArray(product.images)
                        ? product.images
                        : [],

                isTrending:
                    Boolean(
                        product.isTrending ||
                        product.trending ||
                        false
                    ),

                isPremium:
                    Boolean(
                        product.isPremium ||
                        product.premium ||
                        false
                    )

            };

        });


    // =====================================================
    // PRODUCT CARD
    // =====================================================
function productCard(product, type = "") {

    const price = Number(product.price || 0);
    const mrp = Number(product.mrp || 0);
    const stock = Number(product.stock || 0);

    const inStock = stock > 0;

    const discount =
        mrp > price && mrp > 0
            ? Math.round(((mrp - price) / mrp) * 100)
            : 0;

    let badge = "";

    if (type === "trending") {

        badge = `
            <div class="product-badge trending-badge">
                🔥 TRENDING
            </div>
        `;

    }
    else if (type === "premium") {

        badge = `
            <div class="product-badge premium-badge">
                👑 PREMIUM
            </div>
        `;

    }
    else if (!inStock) {

        badge = `
            <div class="product-badge stock-badge">
                🚫 OUT OF STOCK
            </div>
        `;

    }


    /* =========================================
       IMAGE
    ========================================= */

    const imageHTML = product.image

        ? `
            <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
                onerror="
                    this.style.display='none';
                    this.nextElementSibling.style.display='flex';
                "
            >

            <div
                class="image-placeholder"
                style="display:none;"
            >
                💊
            </div>
        `

        : `
            <div class="image-placeholder">
                💊
            </div>
        `;


    /* =========================================
       PRICE
    ========================================= */

    const priceHTML =

        mrp > price && mrp > 0

            ? `
                <div class="price-row">

                    <span class="old-price">
                        ₹${mrp.toFixed(0)}
                    </span>

                    <span class="sale-price">
                        ₹${price.toFixed(0)}
                    </span>

                </div>

                <div class="discount">
                    ${discount}% OFF
                </div>
            `

            : `
                <div class="price-row">

                    <span class="sale-price">
                        ₹${price.toFixed(0)}
                    </span>

                </div>
            `;


    /* =========================================
       COMPANY
    ========================================= */

    const company = product.company
        ? escapeHTML(product.company)
        : "Healthcare Product";


    const description =
        product.description ||
        "Premium Healthcare Product";


    const productInfoHTML = `

        ${
            product.packSize
                ? `
                    <div class="product-extra-info pack-info">
                        📦 <strong>Pack Size:</strong>
                        ${escapeHTML(product.packSize)}
                    </div>
                `
                : ""
        }

        ${
            product.composition
                ? `
                    <div class="product-extra-info composition-info">
                        💊 <strong>Composition:</strong>
                        ${escapeHTML(product.composition)}
                    </div>
                `
                : ""
        }
    `;


    /* =========================================
       BUTTON
    ========================================= */

    const buttonHTML = inStock

        ? `
            <button
                type="button"
                class="cart-btn"
                onclick="addToCart('${escapeHTML(product.id)}')"
            >
                🛒 Add To Cart
            </button>
        `

        : `
            <button
                type="button"
                class="cart-btn disabled-btn"
                disabled
            >
                🚫 Out of Stock
            </button>
        `;


    /* =========================================
       CARD
    ========================================= */

    return `

        <article
            class="
                product-card
                ${!inStock ? "out-stock-card" : ""}
            "
            data-id="${escapeHTML(product.id)}"
            data-category="${escapeHTML(product.category)}"
            data-company="${escapeHTML(product.company)}"
            data-name="${escapeHTML(product.name)}"
        >

            ${badge}


            <div class="product-image">

                ${imageHTML}

            </div>


            <div class="product-content">


                <div class="product-category">

                    ${escapeHTML(product.category)}

                    <span class="rating">
                        ⭐ 5.0
                    </span>

                </div>


                <h3 class="product-name">

                    ${escapeHTML(product.name)}

                </h3>


                <p class="product-description">

                    ${escapeHTML(description)}

                </p>


                ${productInfoHTML}


                <div class="company">

                    🏭

                    <span>
                        ${company}
                    </span>

                </div>


                ${
                    product.brand

                        ? `

                            <div class="brand">

                                Brand:

                                <strong>
                                    ${escapeHTML(product.brand)}
                                </strong>

                            </div>

                        `

                        : ""
                }


                <div class="price-area">

                    ${priceHTML}

                </div>


                ${
                    inStock

                        ? `

                            <div class="stock in-stock">

                                ● In Stock (${stock})

                            </div>

                        `

                        : `

                            <div class="stock out-stock">

                                ● Out of Stock

                            </div>

                        `
                }


                ${buttonHTML}


            </div>

        </article>

    `;
}

    /* =====================================================
   UPDATE CART QUANTITY
===================================================== */

async function updateCartQuantity(productId, quantity) {

    try {

        productId = String(productId);
        quantity = Number(quantity);

        if (quantity <= 0) {

            await removeFromCart(productId);

            return;
        }


        const response = await fetch("/api/cart", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                "Accept": "application/json"

            },

            body: JSON.stringify({

                productId: productId,

                quantity: quantity

            })

        });


        const data = await response.json();


        console.log(
            "UPDATE CART RESPONSE:",
            data
        );


        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Unable to update cart"
            );

            return;
        }


        if (Array.isArray(data.cart)) {

            doctorCart = data.cart.map(item => ({

                id: String(
                    item.productId ||
                    item.id ||
                    ""
                ),

                productId: String(
                    item.productId ||
                    item.id ||
                    ""
                ),

                name:
                    item.name ||
                    "Product",

                price:
                    Number(item.price || 0),

                image:
                    item.image || "",

                qty:
                    Number(
                        item.quantity ||
                        item.qty ||
                        1
                    ),

                quantity:
                    Number(
                        item.quantity ||
                        item.qty ||
                        1
                    )

            }));

        }


        localStorage.setItem(
            "doctorCart",
            JSON.stringify(doctorCart)
        );


        updateCartCount();


    }
    catch (error) {

        console.error(
            "UPDATE CART ERROR:",
            error
        );

        alert(
            "Unable to update cart"
        );

    }

}


/* =====================================================
   INCREASE PRODUCT
===================================================== */

async function increaseCart(productId) {

    const item =
        doctorCart.find(
            item =>
                String(
                    item.productId ||
                    item.id
                ) === String(productId)
        );


    if (!item) {

        console.error(
            "Cart item not found:",
            productId
        );

        return;
    }


    const product =
        products.find(
            product =>
                String(product.id) ===
                String(productId)
        );


    const stock =
        product
            ? Number(product.stock || 0)
            : 999999;


    const currentQty =
        Number(
            item.quantity ||
            item.qty ||
            1
        );


    if (currentQty >= stock) {

        alert(
            "Maximum available stock reached"
        );

        return;
    }


    await updateCartQuantity(
        productId,
        currentQty + 1
    );

}


/* =====================================================
   DECREASE PRODUCT
===================================================== */

async function decreaseCart(productId) {

    const item =
        doctorCart.find(
            item =>
                String(
                    item.productId ||
                    item.id
                ) === String(productId)
        );


    if (!item) {

        return;
    }


    const currentQty =
        Number(
            item.quantity ||
            item.qty ||
            1
        );


    if (currentQty <= 1) {

        await removeFromCart(productId);

        return;
    }


    await updateCartQuantity(
        productId,
        currentQty - 1
    );

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

/* =====================================================
   REMOVE PRODUCT - FINAL
===================================================== */

async function removeFromCart(productId) {

    try {

        productId = String(productId);

        console.log(
            "REMOVE PRODUCT:",
            productId
        );


        const response = await fetch(
            "/api/cart",
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    productId: productId
                })
            }
        );


        const text = await response.text();

        let data = null;

        try {

            data = text
                ? JSON.parse(text)
                : null;

        }
        catch (error) {

            console.error(
                "REMOVE CART INVALID RESPONSE:",
                text
            );

            alert(
                "Server returned an invalid response"
            );

            return;
        }


        console.log(
            "REMOVE CART RESPONSE:",
            data
        );


        /* =========================================
           API ERROR
        ========================================= */

        if (
            !response.ok ||
            !data ||
            data.success !== true
        ) {

            alert(
                data?.message ||
                "Unable to remove product"
            );

            return;
        }


        /* =========================================
           IMPORTANT
           DATABASE CART = MAIN SOURCE
        ========================================= */

        if (
            Array.isArray(data.cart)
        ) {

            doctorCart =
                normalizeCart(
                    data.cart
                );

        }
        else {

            /*
             * If DELETE API does not return cart,
             * reload cart directly from database.
             */

            await loadCart();

            return;
        }


        /* =========================================
           REMOVE LOCAL CACHE ITEM
        ========================================= */

        doctorCart =
            doctorCart.filter(
                item =>
                    String(
                        item.productId ||
                        item.id
                    ) !== productId
            );


        /* =========================================
           SAVE UPDATED CART
        ========================================= */

        saveLocalCart();


        /* =========================================
           UPDATE CART COUNT
        ========================================= */

        updateCartCount();


        /* =========================================
           FORCE CART COUNT FROM CURRENT CART
        ========================================= */

        const cartCount =
            doctorCart.reduce(
                (total, item) => {

                    return total +
                        Number(
                            item.quantity ||
                            item.qty ||
                            0
                        );

                },
                0
            );


        const countElement =
            document.getElementById(
                "cartCount"
            );


        if (countElement) {

            countElement.textContent =
                cartCount;

        }


        /* =========================================
           CART EMPTY
        ========================================= */

        if (cartCount === 0) {

            if (countElement) {

                countElement.textContent = "0";

            }

            /*
             * Optional:
             * hide badge when cart is empty
             */

            if (countElement) {

                countElement.style.display =
                    "none";

            }

        }
        else {

            if (countElement) {

                countElement.style.display =
                    "inline-flex";

            }

        }


        console.log(
            "CART AFTER REMOVE:",
            doctorCart
        );


    }
    catch (error) {

        console.error(
            "REMOVE CART ERROR:",
            error
        );

        alert(
            "Unable to remove product"
        );

    }

}


    // =====================================================
    // TRENDING PRODUCTS
    // =====================================================

    const trendingProducts =
        safeProducts.filter(product => {

            return (
                product.isTrending === true ||
                product.trending === true
            );

        });


    // If no explicit trending products,
    // show first 2 in-stock products

    const finalTrending =
        trendingProducts.length > 0

            ?

            trendingProducts

            :

            safeProducts
                .filter(
                    product =>
                        Number(product.stock || 0) > 0
                )
                .slice(0, 2);


    // =====================================================
    // PREMIUM PRODUCTS
    // =====================================================

    const premiumProducts =
        safeProducts.filter(product => {

            return (
                product.isPremium === true ||
                product.premium === true
            );

        });


    // If no premium flag,
    // show products having higher price

    const finalPremium =
        premiumProducts.length > 0

            ?

            premiumProducts

            :

            safeProducts
                .filter(
                    product =>
                        Number(product.stock || 0) > 0
                )
                .sort(
                    (a, b) =>
                        Number(b.price || 0) -
                        Number(a.price || 0)
                )
                .slice(0, 2);


    // =====================================================
    // OUT OF STOCK
    // =====================================================

    const outOfStockProducts =
        safeProducts.filter(product => {

            return Number(product.stock || 0) <= 0;

        });


    // =====================================================
    // PRODUCT COUNT
    // =====================================================

    const totalProducts =
        safeProducts.length;


    // =====================================================
    // CATEGORY OPTIONS
    // =====================================================

    const categoryOptions =
        categories.map(category => {

            return `

                <option value="${escapeHTML(category)}">

                    ${escapeHTML(category)}

                </option>

            `;

        }).join("");


    // =====================================================
    // COMPANY OPTIONS
    // =====================================================

    const companyOptions =
        companies.map(company => {

            return `

                <option value="${escapeHTML(company)}">

                    ${escapeHTML(company)}

                </option>

            `;

        }).join("");


    // =====================================================
    // ALL PRODUCT CARDS
    // =====================================================

    const allProductsHTML =
        safeProducts.length > 0

            ?

            safeProducts
                .map(product =>
                    productCard(product)
                )
                .join("")

            :

            `
                <div class="empty-products">

                    <div class="empty-icon">
                        🔍
                    </div>

                    <h2>
                        No Products Found
                    </h2>

                    <p>
                        Healthcare products will appear here.
                    </p>

                </div>
            `;


    // =====================================================
    // TRENDING HTML
    // =====================================================

    const trendingHTML =
        finalTrending.length > 0

            ?

            finalTrending
                .map(product =>
                    productCard(
                        product,
                        "trending"
                    )
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    No trending products available.

                </div>
            `;


    // =====================================================
    // PREMIUM HTML
    // =====================================================

    const premiumHTML =
        finalPremium.length > 0

            ?

            finalPremium
                .map(product =>
                    productCard(
                        product,
                        "premium"
                    )
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    No premium products available.

                </div>
            `;


    // =====================================================
    // OUT OF STOCK HTML
    // =====================================================

    const outStockHTML =
        outOfStockProducts.length > 0

            ?

            outOfStockProducts
                .map(product =>
                    productCard(product)
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    🎉 All products are currently in stock.

                </div>
            `;


    // =====================================================
    // PAGE
    // =====================================================

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    Doctor Portal | GLOBAL HEALTHCARE
</title>


<style>

/* =====================================================
   RESET
===================================================== */

* {

    margin:0;
    padding:0;

    box-sizing:border-box;

    font-family:
        "Poppins",
        "Segoe UI",
        Arial,
        sans-serif;

}


body {

    min-height:100vh;

    background:
        linear-gradient(
            135deg,
            #eef7ff,
            #f8fafc
        );

    color:#0f172a;

}


/* =====================================================
   HEADER
===================================================== */

.header {

    position:sticky;

    top:0;

    z-index:1000;

    background:
        linear-gradient(
            135deg,
            #005bea,
            #00c6fb
        );

    color:white;

    padding:15px 30px;

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:20px;

    box-shadow:
        0 10px 35px
        rgba(0,91,234,.25);

}


.logo {

    display:flex;

    align-items:center;

    gap:12px;

}


.logo-icon {

    width:48px;

    height:48px;

    border-radius:15px;

    background:
        rgba(255,255,255,.18);

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:25px;

}


.logo-text {

    font-size:22px;

    font-weight:900;

}


.logo-sub {

    font-size:11px;

    opacity:.85;

}


.nav {

    display:flex;

    align-items:center;

    gap:8px;

    flex-wrap:wrap;

}


.nav a {

    color:white;

    text-decoration:none;

    padding:10px 13px;

    border-radius:12px;

    font-size:13px;

    font-weight:700;

    transition:.25s;

}


.nav a:hover {

    background:
        rgba(255,255,255,.18);

}


.cart-link {

    position:relative;

}


.cart-count {

    display:inline-flex;

    align-items:center;

    justify-content:center;

    min-width:20px;

    height:20px;

    padding:0 5px;

    border-radius:20px;

    background:#ef4444;

    color:white;

    font-size:11px;

    font-weight:900;

}


/* =====================================================
   HERO
===================================================== */

.hero {

    max-width:1250px;

    margin:25px auto;

    padding:32px;

    border-radius:28px;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #eff6ff
        );

    border:1px solid #dbeafe;

    box-shadow:
        0 15px 45px
        rgba(15,23,42,.08);

}


.doctor-row {

    display:flex;

    align-items:center;

    gap:18px;

}


.doctor-avatar {

    width:70px;

    height:70px;

    border-radius:22px;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:36px;

    background:
        linear-gradient(
            135deg,
            #dbeafe,
            #e0f2fe
        );

}


.hero h1 {

    font-size:30px;

    font-weight:900;

}


.hero h1 span {

    color:#2563eb;

}


.hero p {

    margin-top:7px;

    color:#64748b;

    font-size:14px;

    font-weight:600;

}


.hero-tags {

    display:flex;

    gap:8px;

    margin-top:18px;

    flex-wrap:wrap;

}


.hero-tag {

    padding:8px 13px;

    border-radius:30px;

    background:white;

    border:1px solid #dbeafe;

    color:#2563eb;

    font-size:12px;

    font-weight:800;

}


/* =====================================================
   CONTAINER
===================================================== */

.container {

    max-width:1250px;

    margin:auto;

    padding:0 20px 40px;

}


/* =====================================================
   FILTER PANEL
===================================================== */

.filter-panel {

    background:white;

    padding:22px;

    border-radius:22px;

    border:1px solid #e2e8f0;

    box-shadow:
        0 12px 35px
        rgba(15,23,42,.06);

    margin-bottom:30px;

}


.filter-title {

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-bottom:16px;

}


.filter-title h2 {

    font-size:20px;

    font-weight:900;

}


.product-count {

    color:#64748b;

    font-size:13px;

    font-weight:700;

}


.filters {

    display:grid;

    grid-template-columns:
        1.5fr
        1fr
        1fr
        auto;

    gap:12px;

}


.search-box,
.select-box {

    position:relative;

}


.search-box span {

    position:absolute;

    left:14px;

    top:50%;

    transform:translateY(-50%);

    font-size:18px;

}


input,
select {

    width:100%;

    height:48px;

    border:1px solid #dbe3ee;

    border-radius:14px;

    outline:none;

    padding:0 14px;

    background:#f8fafc;

    color:#0f172a;

    font-size:14px;

    font-weight:600;

}


.search-box input {

    padding-left:45px;

}


input:focus,
select:focus {

    border-color:#2563eb;

    background:white;

    box-shadow:
        0 0 0 4px
        rgba(37,99,235,.08);

}


.reset-btn {

    height:48px;

    padding:0 18px;

    border:0;

    border-radius:14px;

    background:
        linear-gradient(
            135deg,
            #0f172a,
            #334155
        );

    color:white;

    cursor:pointer;

    font-weight:800;

}


/* =====================================================
   SECTION
===================================================== */

.product-section {

    margin-bottom:38px;

}


.section-header {

    display:flex;

    align-items:end;

    justify-content:space-between;

    margin-bottom:17px;

}


.section-title {

    display:flex;

    align-items:center;

    gap:10px;

}


.section-title h2 {

    font-size:24px;

    font-weight:900;

}


.section-title p {

    margin-top:3px;

    color:#64748b;

    font-size:13px;

}


.section-icon {

    width:44px;

    height:44px;

    display:flex;

    align-items:center;

    justify-content:center;

    border-radius:14px;

    background:#eff6ff;

    font-size:22px;

}


/* =====================================================
   PRODUCTS GRID
===================================================== */

.products-grid {

    display:grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap:20px;

}


/* =====================================================
   PRODUCT CARD
===================================================== */

.product-card {

    position:relative;

    background:white;

    border-radius:23px;

    border:1px solid #e2e8f0;

    overflow:hidden;

    box-shadow:
        0 10px 30px
        rgba(15,23,42,.06);

    transition:
        transform .25s,
        box-shadow .25s;

}


.product-card:hover {

    transform:
        translateY(-6px);

    box-shadow:
        0 20px 45px
        rgba(15,23,42,.12);

}


.product-image {

    height:210px;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #eff6ff
        );

    display:flex;

    align-items:center;

    justify-content:center;

    overflow:hidden;

}


.product-image img {

    width:100%;

    height:100%;

    object-fit:contain;

    padding:18px;

    transition:.3s;

}


.product-card:hover
.product-image img {

    transform:scale(1.05);

}


.image-placeholder {

    width:80px;

    height:80px;

    border-radius:24px;

    display:flex;

    align-items:center;

    justify-content:center;

    background:#dbeafe;

    font-size:38px;

}


.product-content {

    padding:18px;

}


.product-badge {

    position:absolute;

    top:13px;

    left:13px;

    z-index:2;

    padding:7px 11px;

    border-radius:30px;

    font-size:10px;

    font-weight:900;

    letter-spacing:.3px;

    box-shadow:
        0 5px 15px
        rgba(0,0,0,.12);

}


.trending-badge {

    background:#fff7ed;

    color:#ea580c;

}


.premium-badge {

    background:#fefce8;

    color:#a16207;

}


.stock-badge {

    background:#fee2e2;

    color:#b91c1c;

}


.product-category {

    display:flex;

    align-items:center;

    justify-content:space-between;

    color:#2563eb;

    font-size:12px;

    font-weight:900;

    text-transform:capitalize;

}


.rating {

    color:#f59e0b;

}


.product-name {

    margin-top:8px;

    font-size:19px;

    font-weight:900;

    line-height:1.3;

}


.product-description {

    color:#64748b;

    font-size:12px;

    line-height:1.5;

    margin-top:7px;

    min-height:36px;

}


.product-extra-info {

    margin-top:8px;
    padding:8px 9px;

    border-radius:8px;

    font-size:12px;
    line-height:1.45;

    word-break:break-word;

}


.pack-info {

    color:#075985;
    background:#ecfeff;
    border:1px solid #a5f3fc;

}


.composition-info {

    color:#166534;
    background:#f0fdf4;
    border:1px solid #bbf7d0;

}


.company {

    display:flex;

    align-items:center;

    gap:5px;

    margin-top:13px;

    color:#475569;

    font-size:12px;

    font-weight:700;

}


.company span {

    overflow:hidden;

    text-overflow:ellipsis;

    white-space:nowrap;

}


.brand {

    margin-top:5px;

    color:#64748b;

    font-size:11px;

}


.brand strong {

    color:#334155;

}


.price-area {

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-top:14px;

}


.price-row {

    display:flex;

    align-items:center;

    gap:8px;

}


.old-price {

    color:#94a3b8;

    font-size:14px;

    text-decoration:line-through;

}


.sale-price {

    color:#16a34a;

    font-size:23px;

    font-weight:900;

}


.discount {

    padding:5px 8px;

    border-radius:8px;

    background:#ecfdf5;

    color:#15803d;

    font-size:10px;

    font-weight:900;

}


.stock {

    margin-top:11px;

    font-size:12px;

    font-weight:800;

}


.in-stock {

    color:#16a34a;

}


.out-stock {

    color:#dc2626;

}


.cart-btn {

    width:100%;

    height:45px;

    margin-top:14px;

    border:0;

    border-radius:13px;

    cursor:pointer;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #4f46e5
        );

    color:white;

    font-weight:900;

    font-size:13px;

    transition:.25s;

}


.cart-btn:hover {

    transform:translateY(-2px);

    box-shadow:
        0 8px 20px
        rgba(37,99,235,.25);

}


.disabled-btn {

    background:#e2e8f0;

    color:#94a3b8;

    cursor:not-allowed;

}


.disabled-btn:hover {

    transform:none;

    box-shadow:none;

}


.out-stock-card {

    opacity:.78;

}


.out-stock-card .product-image {

    filter:grayscale(.3);

}


/* =====================================================
   SPECIAL MESSAGE
===================================================== */

.no-special-products {

    background:white;

    border:1px dashed #cbd5e1;

    border-radius:18px;

    padding:30px;

    text-align:center;

    color:#64748b;

    font-weight:700;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-products {

    grid-column:1 / -1;

    text-align:center;

    background:white;

    border-radius:22px;

    padding:60px 20px;

    border:1px solid #e2e8f0;

}


.empty-icon {

    font-size:55px;

    margin-bottom:15px;

}


.empty-products h2 {

    font-size:22px;

}


.empty-products p {

    margin-top:7px;

    color:#64748b;

}


/* =====================================================
   FOOTER
===================================================== */

.footer {

    text-align:center;

    padding:30px 20px;

    color:#64748b;

    font-size:12px;

}


.footer strong {

    color:#2563eb;

}

/* =====================================================
   MOBILE
===================================================== */

@media(max-width:950px) {

    .products-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap:12px;
    }

    .filters {
        grid-template-columns:
            1fr 1fr;
    }

}


@media(max-width:700px) {

    .header {
        position:relative;

        flex-direction:column;

        align-items:stretch;

        padding:15px;
    }


    .logo {
        justify-content:center;
    }


    .nav {
        justify-content:center;
    }


    .nav a {
        font-size:11px;

        padding:8px 9px;
    }


    .hero {
        margin:15px 12px;

        padding:22px;

        border-radius:22px;
    }


    .hero h1 {
        font-size:24px;
    }


    .doctor-avatar {
        width:58px;

        height:58px;

        font-size:28px;
    }


    .container {
        padding:
            0 10px 30px;
    }


    .filters {
        grid-template-columns:1fr;
    }


    .section-header {
        align-items:flex-start;
    }


    .section-title h2 {
        font-size:20px;
    }


    /* =================================================
       2 CARDS IN ONE ROW
    ================================================= */

    .products-grid {
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap:10px;
    }


    .product-card {
        min-width:0;

        border-radius:16px;
    }


    .product-image {
        height:145px;
    }


    .product-image img {
        padding:10px;
    }


    .product-content {
        padding:11px;
    }


    .product-name {
        font-size:14px;

        line-height:1.3;
    }


    .product-description {
        font-size:10px;

        min-height:30px;
    }


    .product-category {
        font-size:10px;
    }


    .company {
        font-size:10px;
    }


    .brand {
        font-size:9px;
    }


    .sale-price {
        font-size:17px;
    }


    .old-price {
        font-size:10px;
    }


    .discount {
        font-size:8px;

        padding:4px 5px;
    }


    .stock {
        font-size:10px;
    }


    .cart-btn {
        height:38px;

        margin-top:10px;

        font-size:10px;

        border-radius:10px;
    }


    .product-badge {
        top:7px;

        left:7px;

        padding:5px 7px;

        font-size:8px;
    }

}
</style>

</head>


<body>


<!-- ===================================================
     HEADER
=================================================== -->

<header class="header">

    <div class="logo">

        <div class="logo-icon">
            🩺
        </div>

        <div>

            <div class="logo-text">
                GLOBAL HEALTHCARE
            </div>

            <div class="logo-sub">
                SAFE & SECURE Healthcare
            </div>

        </div>

    </div>


    <nav class="nav">

        <a href="/doctor/dashboard">
            🏠 Home
        </a>

        <a href="/doctor/orders">
            📦 Orders
        </a>

        <a
            href="/doctor/cart"
            class="cart-link"
        >

            🛒 Cart

            <span
                id="cartCount"
                class="cart-count"
            >
                0
            </span>

        </a>

        <a href="/admin/doctor/logout">
            🚪 Logout
        </a>

    </nav>

</header>


<!-- ===================================================
     HERO
=================================================== -->

<section class="hero">

    <div class="doctor-row">

        <div class="doctor-avatar">
            👨‍⚕️
        </div>

        <div>

            <h1>
                Welcome
                <span>
                    Dr. ${escapeHTML(doctorName)}
                </span>
            </h1>

            <p>
                ${escapeHTML(specialization)}
                &nbsp; • &nbsp;
                Premium Healthcare Products
            </p>

        </div>

    </div>


    <div class="hero-tags">

        <div class="hero-tag">
            🛡️ Trusted Healthcare
        </div>

        <div class="hero-tag">
            🚚 Fast Delivery
        </div>

        <div class="hero-tag">
            💊 Quality Products
        </div>

        <div class="hero-tag">
            🔒 Secure Ordering
        </div>

    </div>

</section>


<!-- ===================================================
     MAIN
=================================================== -->

<main class="container">


    <!-- FILTER -->

    <section class="filter-panel">

        <div class="filter-title">

            <h2>
                🔎 Find Products
            </h2>

            <div
                class="product-count"
                id="productCount"
            >
                ${totalProducts} Products
            </div>

        </div>


        <div class="filters">


            <!-- SEARCH -->

            <div class="search-box">

                <span>
                    🔍
                </span>

                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search products..."
                    autocomplete="off"
                >

            </div>


            <!-- CATEGORY -->

            <div class="select-box">

                <select id="categoryFilter">

                    <option value="">
                        📦 All Categories
                    </option>

                    ${categoryOptions}

                </select>

            </div>


            <!-- COMPANY -->

            <div class="select-box">

                <select id="companyFilter">

                    <option value="">
                        🏭 All Companies / Brands
                    </option>

                    ${companyOptions}

                </select>

            </div>


            <!-- RESET -->

            <button
                type="button"
                class="reset-btn"
                onclick="resetFilters()"
            >

                ↻ Reset

            </button>


        </div>

    </section>


    <!-- =================================================
         TRENDING
    ================================================== -->

    <section
        class="product-section"
        id="trendingSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🔥
                </div>

                <div>

                    <h2>
                        Trending Products
                    </h2>

                    <p>
                        Popular healthcare products
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${trendingHTML}

        </div>

    </section>


    <!-- =================================================
         PREMIUM
    ================================================== -->

    <section
        class="product-section"
        id="premiumSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    👑
                </div>

                <div>

                    <h2>
                        Premium Products
                    </h2>

                    <p>
                        Premium Healthcare Collection
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${premiumHTML}

        </div>

    </section>


    <!-- =================================================
         ALL PRODUCTS
    ================================================== -->

    <section
        class="product-section"
        id="allSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🛍️
                </div>

                <div>

                    <h2>
                        All Products
                    </h2>

                    <p>
                        Browse our complete healthcare collection
                    </p>

                </div>

            </div>

        </div>


        <div
            class="products-grid"
            id="productsGrid"
        >

            ${allProductsHTML}

        </div>

    </section>


    <!-- =================================================
         OUT OF STOCK
    ================================================== -->

    <section
        class="product-section"
        id="outStockSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🚫
                </div>

                <div>

                    <h2>
                        Out of Stock
                    </h2>

                    <p>
                        Currently unavailable products
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${outStockHTML}

        </div>

    </section>


</main>


<!-- ===================================================
     FOOTER
=================================================== -->

<footer class="footer">

    © 2026

    <strong>
        GLOBAL HEALTHCARE
    </strong>

    <br>

    Powered by

    <strong>
        Osium Biogenix
    </strong>

</footer>

<script>

/* =====================================================
   PRODUCT DATA
===================================================== */

const products = ${JSON.stringify(productData)};


/* =====================================================
   CART
===================================================== */

let doctorCart = [];


/* =====================================================
   NORMALIZE CART ITEM
===================================================== */

function normalizeCartItem(item) {

    if (!item) {
        return null;
    }

    const productId = String(
        item.productId ||
        item.product?._id ||
        item.id ||
        ""
    );

    if (!productId) {
        return null;
    }

    const quantity = Math.max(
        1,
        Number(
            item.quantity ??
            item.qty ??
            1
        )
    );

    return {

        id: productId,

        productId: productId,

        name:
            item.name ||
            item.product?.name ||
            "Product",

        price:
            Number(
                item.price ??
                item.product?.price ??
                0
            ),

        image:
            item.image ||
            item.product?.image ||
            "",

        quantity: quantity,

        qty: quantity

    };

}


/* =====================================================
   NORMALIZE CART
===================================================== */

function normalizeCart(cart) {

    if (!Array.isArray(cart)) {
        return [];
    }

    return cart
        .map(normalizeCartItem)
        .filter(Boolean);

}


/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const countElement =
        document.getElementById("cartCount");

    if (!countElement) {
        return;
    }

    const count =
        Array.isArray(doctorCart)
            ? doctorCart.reduce(
                (total, item) => {

                    return total +
                        Number(
                            item.quantity ??
                            item.qty ??
                            0
                        );

                },
                0
            )
            : 0;

    countElement.textContent = count;

    if (count <= 0) {

        countElement.style.display =
            "none";

    }
    else {

        countElement.style.display =
            "inline-flex";

    }

}


/* =====================================================
   FIND PRODUCT
===================================================== */

function findProduct(productId) {

    return products.find(
        product =>
            String(product.id) ===
            String(productId)
    );

}


/* =====================================================
   API JSON HELPER
===================================================== */

async function getJSONResponse(response) {

    const text =
        await response.text();

    if (!text) {
        return null;
    }

    try {

        return JSON.parse(text);

    }
    catch (error) {

        console.error(
            "Invalid JSON response:",
            text
        );

        return null;

    }

}


/* =====================================================
   LOAD CART FROM DATABASE
===================================================== */

async function loadCart() {

    try {

        console.log(
            "Loading doctor cart..."
        );

        const response =
            await fetch(
                "/api/cart",
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    credentials: "include"
                }
            );

        const data =
            await getJSONResponse(
                response
            );

        console.log(
            "GET /api/cart:",
            data
        );


        if (
            response.ok &&
            data &&
            data.success === true &&
            Array.isArray(data.cart)
        ) {

            doctorCart =
                normalizeCart(
                    data.cart
                );

        }
        else {

            doctorCart = [];

            if (data?.message) {

                console.warn(
                    data.message
                );

            }

        }

    }
    catch (error) {

        console.error(
            "LOAD CART ERROR:",
            error
        );

        doctorCart = [];

    }

    updateCartCount();

}


/* =====================================================
   ADD TO CART
   POST /api/cart
===================================================== */

async function addToCart(productId) {

    try {

        productId =
            String(
                productId || ""
            ).trim();


        console.log(
            "ADD TO CART PRODUCT ID:",
            productId
        );


        if (!productId) {

            alert(
                "Invalid product ID"
            );

            return;

        }


        /* -----------------------------------------
           FIND PRODUCT
        ----------------------------------------- */

        const product =
            findProduct(
                productId
            );


        console.log(
            "FOUND PRODUCT:",
            product
        );


        if (!product) {

            alert(
                "Product not found"
            );

            return;

        }


        /* -----------------------------------------
           STOCK CHECK
        ----------------------------------------- */

        const stock =
            Number(
                product.stock || 0
            );


        if (stock <= 0) {

            alert(
                "Product is out of stock"
            );

            return;

        }


        /* -----------------------------------------
           CURRENT CART QUANTITY
        ----------------------------------------- */

        const existing =
            doctorCart.find(
                item =>
                    String(
                        item.productId ||
                        item.id
                    ) === productId
            );


        const currentQuantity =
            existing
                ? Number(
                    existing.quantity ||
                    existing.qty ||
                    0
                )
                : 0;


        console.log(
            "CURRENT QUANTITY:",
            currentQuantity
        );


        /* -----------------------------------------
           STOCK LIMIT
        ----------------------------------------- */

        if (
            currentQuantity >= stock
        ) {

            alert(
                "Maximum available stock reached"
            );

            return;

        }


        /* -----------------------------------------
           ADD TO DATABASE
        ----------------------------------------- */

        const response =
            await fetch(
                "/api/cart",
                {

                    method: "POST",

                    credentials: "include",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            productId:
                                productId,

                            quantity: 1

                        })

                }
            );


        console.log(
            "CART RESPONSE STATUS:",
            response.status
        );


        /* -----------------------------------------
           READ RESPONSE
        ----------------------------------------- */

        const data =
            await getJSONResponse(
                response
            );


        console.log(
            "CART API DATA:",
            data
        );


        /* -----------------------------------------
           API ERROR
        ----------------------------------------- */

        if (
            !response.ok ||
            !data ||
            data.success !== true
        ) {

            alert(
                data?.message ||
                "Unable to add product to cart"
            );

            return;

        }


        /* -----------------------------------------
           UPDATE LOCAL CART
           FROM DATABASE RESPONSE
        ----------------------------------------- */

        if (
            Array.isArray(
                data.cart
            )
        ) {

            doctorCart =
                normalizeCart(
                    data.cart
                );

        }
        else {

            await loadCart();

        }


        /* -----------------------------------------
           UPDATE COUNT
        ----------------------------------------- */

        updateCartCount();


        console.log(
            "CART AFTER ADD:",
            doctorCart
        );


        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        alert(
            product.name +
            " added to cart"
        );

    }
    catch (error) {

        console.error(
            "ADD TO CART ERROR:",
            error
        );

        alert(
            "Unable to add product to cart"
        );

    }

}


/* =====================================================
   UPDATE CART QUANTITY
   PATCH /api/cart/:productId
===================================================== */

async function updateCartQuantity(
    productId,
    quantity
) {

    try {

        productId =
            String(productId);

        quantity =
            Number(quantity);


        /* -----------------------------------------
           REMOVE WHEN ZERO
        ----------------------------------------- */

        if (
            quantity <= 0
        ) {

            await removeFromCart(
                productId
            );

            return;

        }


        /* -----------------------------------------
           FIND PRODUCT
        ----------------------------------------- */

        const product =
            findProduct(
                productId
            );


        /* -----------------------------------------
           STOCK CHECK
        ----------------------------------------- */

        if (product) {

            const stock =
                Number(
                    product.stock || 0
                );


            if (
                stock <= 0
            ) {

                alert(
                    "Product is out of stock"
                );

                return;

            }


            if (
                quantity > stock
            ) {

                alert(
                    "Maximum available stock reached"
                );

                return;

            }

        }


        /* -----------------------------------------
           PATCH API
        ----------------------------------------- */

        const response =
            await fetch(
                "/api/cart/" +
                encodeURIComponent(
                    productId
                ),
                {

                    method: "PATCH",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    credentials: "include",

                    body:
                        JSON.stringify({

                            quantity:
                                quantity

                        })

                }
            );


        const data =
            await getJSONResponse(
                response
            );


        console.log(
            "PATCH CART:",
            data
        );


        /* -----------------------------------------
           API ERROR
        ----------------------------------------- */

        if (
            !response.ok ||
            !data ||
            data.success !== true
        ) {

            alert(
                data?.message ||
                "Unable to update cart"
            );

            return;

        }


        /* -----------------------------------------
           UPDATE CART
        ----------------------------------------- */

        if (
            Array.isArray(
                data.cart
            )
        ) {

            doctorCart =
                normalizeCart(
                    data.cart
                );

        }
        else {

            await loadCart();

        }


        updateCartCount();

    }
    catch (error) {

        console.error(
            "UPDATE CART ERROR:",
            error
        );

        alert(
            "Unable to update cart"
        );

    }

}


/* =====================================================
   INCREASE CART
===================================================== */

async function increaseCart(
    productId
) {

    const item =
        doctorCart.find(
            item =>
                String(
                    item.productId ||
                    item.id
                ) ===
                String(productId)
        );


    if (!item) {

        console.error(
            "Cart item not found:",
            productId
        );

        return;

    }


    const product =
        findProduct(
            productId
        );


    const stock =
        product
            ? Number(
                product.stock || 0
            )
            : 0;


    const currentQuantity =
        Number(
            item.quantity ||
            item.qty ||
            1
        );


    if (
        stock <= 0
    ) {

        alert(
            "Product is out of stock"
        );

        return;

    }


    if (
        currentQuantity >= stock
    ) {

        alert(
            "Maximum available stock reached"
        );

        return;

    }


    await updateCartQuantity(
        productId,
        currentQuantity + 1
    );

}


/* =====================================================
   DECREASE CART
===================================================== */

async function decreaseCart(
    productId
) {

    const item =
        doctorCart.find(
            item =>
                String(
                    item.productId ||
                    item.id
                ) ===
                String(productId)
        );


    if (!item) {
        return;
    }


    const currentQuantity =
        Number(
            item.quantity ||
            item.qty ||
            1
        );


    if (
        currentQuantity <= 1
    ) {

        await removeFromCart(
            productId
        );

        return;

    }


    await updateCartQuantity(
        productId,
        currentQuantity - 1
    );

}


/* =====================================================
   REMOVE PRODUCT
   DELETE /api/cart/:productId
===================================================== */

async function removeFromCart(
    productId
) {

    try {

        productId =
            String(productId);


        const response =
            await fetch(
                "/api/cart/" +
                encodeURIComponent(
                    productId
                ),
                {

                    method: "DELETE",

                    headers: {

                        "Accept":
                            "application/json"

                    },

                    credentials: "include"

                }
            );


        const data =
            await getJSONResponse(
                response
            );


        console.log(
            "DELETE CART:",
            data
        );


        /* -----------------------------------------
           API ERROR
        ----------------------------------------- */

        if (
            !response.ok ||
            !data ||
            data.success !== true
        ) {

            alert(
                data?.message ||
                "Unable to remove product"
            );

            return;

        }


        /* -----------------------------------------
           UPDATE CART
        ----------------------------------------- */

        if (
            Array.isArray(
                data.cart
            )
        ) {

            doctorCart =
                normalizeCart(
                    data.cart
                );

        }
        else {

            doctorCart =
                doctorCart.filter(
                    item =>
                        String(
                            item.productId ||
                            item.id
                        ) !==
                        productId
                );

        }


        updateCartCount();


        console.log(
            "CART AFTER REMOVE:",
            doctorCart
        );

    }
    catch (error) {

        console.error(
            "REMOVE CART ERROR:",
            error
        );

        alert(
            "Unable to remove product"
        );

    }

}


/* =====================================================
   FILTER PRODUCTS
===================================================== */

function filterProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryInput =
        document.getElementById(
            "categoryFilter"
        );

    const companyInput =
        document.getElementById(
            "companyFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryInput
            ? categoryInput.value
                .toLowerCase()
                .trim()
            : "";


    const company =
        companyInput
            ? companyInput.value
                .toLowerCase()
                .trim()
            : "";


    const cards =
        document.querySelectorAll(
            "#productsGrid .product-card"
        );


    let visible = 0;


    cards.forEach(
        card => {

            const name =
                String(
                    card.dataset.name ||
                    ""
                ).toLowerCase();


            const cardCategory =
                String(
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const cardCompany =
                String(
                    card.dataset.company ||
                    ""
                ).toLowerCase();


            const matchSearch =
                !search ||
                name.includes(
                    search
                );


            const matchCategory =
                !category ||
                cardCategory ===
                category;


            const matchCompany =
                !company ||
                cardCompany ===
                company;


            const show =
                matchSearch &&
                matchCategory &&
                matchCompany;


            card.style.display =
                show
                    ? ""
                    : "none";


            if (show) {
                visible++;
            }

        }
    );


    const productCount =
        document.getElementById(
            "productCount"
        );


    if (productCount) {

        productCount.textContent =
            visible +
            " Products";

    }


    const hasFilter =
        Boolean(
            search ||
            category ||
            company
        );


    const trendingSection =
        document.getElementById(
            "trendingSection"
        );


    const premiumSection =
        document.getElementById(
            "premiumSection"
        );


    const outStockSection =
        document.getElementById(
            "outStockSection"
        );


    if (trendingSection) {

        trendingSection.style.display =
            hasFilter
                ? "none"
                : "";

    }


    if (premiumSection) {

        premiumSection.style.display =
            hasFilter
                ? "none"
                : "";

    }


    if (outStockSection) {

        outStockSection.style.display =
            hasFilter
                ? "none"
                : "";

    }

}


/* =====================================================
   RESET FILTERS
===================================================== */

function resetFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryInput =
        document.getElementById(
            "categoryFilter"
        );

    const companyInput =
        document.getElementById(
            "companyFilter"
        );


    if (searchInput) {
        searchInput.value = "";
    }


    if (categoryInput) {
        categoryInput.value = "";
    }


    if (companyInput) {
        companyInput.value = "";
    }


    filterProducts();

}


/* =====================================================
   INITIALIZE PRODUCT PAGE
===================================================== */

function initializeProductPage() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryInput =
        document.getElementById(
            "categoryFilter"
        );

    const companyInput =
        document.getElementById(
            "companyFilter"
        );


    /* -----------------------------------------
       SEARCH
    ----------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }


    /* -----------------------------------------
       CATEGORY
    ----------------------------------------- */

    if (categoryInput) {

        categoryInput.addEventListener(
            "change",
            filterProducts
        );

    }


    /* -----------------------------------------
       COMPANY
    ----------------------------------------- */

    if (companyInput) {

        companyInput.addEventListener(
            "change",
            filterProducts
        );

    }


    /* -----------------------------------------
       INITIAL FILTER
    ----------------------------------------- */

    filterProducts();


    /* -----------------------------------------
       LOAD DATABASE CART
    ----------------------------------------- */

    loadCart();

}


/* =====================================================
   START
===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeProductPage
    );

}
else {

    initializeProductPage();

}

</script>


</body>

</html>

    `;

}


module.exports =
    DoctorDashboard;