// // const express = require("express");
// // const router = express.Router();

// // const Product = require("../models/Product");


// // // ================= STORE PAGE =================


// // router.get("/", async(req,res)=>{

// // try{


// // const products = await Product.find()
// // .sort({createdAt:-1});



// // let cards = products.map(product=>`

// // <div class="card"
// // onclick="location.href='/store/product/${product._id}'">



// // <div class="product-img">


// // <img src="${product.image || 'https://via.placeholder.com/300'}">


// // </div>




// // <h2>

// // ${product.name}

// // </h2>




// // <p>

// // ${product.description || "Quality Product"}

// // </p>



// // <button onclick="event.stopPropagation(); location.href='/store/product/${product._id}'">
// //         View Details
// //     </button>



// // </div>



// // `).join("");





// // res.send(`


// // <!DOCTYPE html>

// // <html>


// // <head>


// // <meta name="viewport" content="width=device-width,initial-scale=1">


// // <title>Premium Store</title>

// // <style>

// // *{
// //     margin:0;
// //     padding:0;
// //     box-sizing:border-box;
// //     font-family:'Segoe UI',Arial,sans-serif;
// // }

// // body{
// //     background:linear-gradient(135deg,#eff6ff,#f8fafc);
// //     padding:20px;
// // }

// // /* ================= HEADER ================= */

// // .header{
// //     text-align:center;
// //     margin-bottom:35px;
// // }

// // .header h1{
// //     font-size:38px;
// //     font-weight:800;
// //     color:#1e3a8a;
// // }

// // .header p{
// //     margin-top:8px;
// //     color:#64748b;
// // }

// // /* ================= PRODUCT GRID ================= */

// // .products{
// //     max-width:1200px;
// //     margin:auto;
// //     display:grid;
// //     grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
// //     gap:20px;
// //     justify-items:center;
// // }

// // /* ================= PVC CARD ================= */

// // .card{
// //     width:220px;
// //     height:340px;
// //     background:#fff;
// //     border-radius:18px;
// //     overflow:hidden;
// //     cursor:pointer;
// //     display:flex;
// //     flex-direction:column;
// //     box-shadow:0 10px 25px rgba(0,0,0,.12);
// //     transition:all .3s ease;
// // }

// // .card:hover{
// //     transform:translateY(-8px);
// //     box-shadow:0 20px 40px rgba(37,99,235,.25);
// // }

// // /* ================= IMAGE ================= */

// // .product-img{
// //     width:100%;
// //     height:180px;
// //     background:#f8fafc;
// //     display:flex;
// //     justify-content:center;
// //     align-items:center;
// // }

// // .product-img img{
// //     width:100%;
// //     height:100%;
// //     object-fit:contain;
// //     padding:12px;
// // }

// // /* ================= TEXT ================= */

// // .card h2{
// //     font-size:18px;
// //     color:#1e40af;
// //     text-align:center;
// //     padding:12px 10px 0;
// // }

// // .card p{
// //     flex:1;
// //     padding:8px 12px;
// //     font-size:13px;
// //     color:#64748b;
// //     text-align:center;
// //     line-height:1.4;
// //     overflow:hidden;
// // }

// // /* ================= BUTTON ================= */

// // .card button{
// //     margin:12px;
// //     padding:11px;
// //     border:none;
// //     border-radius:10px;
// //     background:linear-gradient(135deg,#2563eb,#06b6d4);
// //     color:#fff;
// //     font-size:14px;
// //     font-weight:700;
// //     cursor:pointer;
// //     transition:.3s;
// // }

// // .card button:hover{
// //     background:linear-gradient(135deg,#1d4ed8,#0891b2);
// // }

// // /* ================= MOBILE ================= */

// // @media(max-width:600px){

// //     body{
// //         padding:10px;
// //     }

// //     .header h1{
// //         font-size:28px;
// //     }

// //     .products{
// //         grid-template-columns:repeat(2,1fr);
// //         gap:10px;
// //     }

// //     .card{
// //         width:165px;
// //         height:280px;
// //         border-radius:15px;
// //     }

// //     .product-img{
// //         height:120px;
// //     }

// //     .card h2{
// //         font-size:15px;
// //         padding-top:10px;
// //     }

// //     .card p{
// //         font-size:11px;
// //         padding:6px 8px;
// //     }

// //     .card button{
// //         margin:8px;
// //         padding:8px;
// //         font-size:11px;
// //         border-radius:8px;
// //     }
// // }





// // </style>


// // </head>



// // <body>




// // <div class="header">


// // <h1>

// // Our Premium Products

// // </h1>


// // <p>

// // Trusted Quality Products

// // </p>


// // </div>






// // <div class="products">


// // ${cards}


// // </div>





// // </body>


// // </html>



// // `);



// // }

// // catch(err){

// // console.log(err);

// // res.status(500).send("Server Error");


// // }



// // });

// // router.get("/product/:id", async (req,res)=>{

// // try{


// // const product = await Product.findById(req.params.id);


// // if(!product){

// // return res.status(404).send("Product Not Found");

// // }



// // let images = "";


// // if(product.images && product.images.length > 0){


// // product.images.forEach(img=>{


// // images += `

// // <img

// // src="${img}"

// // class="thumb"

// // onclick="changeImage('${img}')">

// // `;

// // });


// // }else{


// // images = `

// // <img

// // src="${product.image || '/images/no-image.png'}"

// // class="thumb"

// // onclick="changeImage('${product.image}')">

// // `;

// // }






// // res.send(`


// // <!DOCTYPE html>

// // <html>


// // <head>


// // <meta charset="UTF-8">


// // <meta name="viewport"
// // content="width=device-width,initial-scale=1">


// // <title>

// // ${product.name}

// // </title>



// // <style>


// // *{

// // margin:0;
// // padding:0;
// // box-sizing:border-box;
// // font-family:'Segoe UI',Arial,sans-serif;

// // }


// // body{

// // background:
// // linear-gradient(
// // 135deg,
// // #ecfdf5,
// // #eff6ff
// // );

// // min-height:100vh;

// // padding:25px;

// // }



// // /* MAIN CONTAINER */


// // .container{

// // max-width:1250px;

// // margin:auto;

// // background:
// // rgba(255,255,255,.9);

// // backdrop-filter:blur(15px);

// // border-radius:35px;

// // padding:40px;

// // display:grid;

// // grid-template-columns:1fr 1fr;

// // gap:50px;

// // box-shadow:

// // 0 25px 70px rgba(0,0,0,.15);

// // animation:show .6s ease;


// // }


// // @keyframes show{

// // from{

// // opacity:0;

// // transform:translateY(40px);

// // }

// // to{

// // opacity:1;

// // transform:translateY(0);

// // }

// // }




// // /* IMAGE SECTION */


// // .gallery{

// // background:

// // linear-gradient(
// // 135deg,
// // #f8fafc,
// // #ecfeff
// // );

// // border-radius:30px;

// // padding:35px;

// // text-align:center;

// // }




// // .main-img{

// // width:100%;

// // height:520px;

// // object-fit:contain;

// // transition:.5s;

// // cursor:zoom-in;


// // }


// // .main-img:hover{

// // transform:scale(1.08);

// // }






// // /* SMALL IMAGES */


// // .thumbs{

// // display:flex;

// // gap:20px;

// // margin-top:30px;

// // overflow-x:auto;

// // padding:10px;


// // }



// // .thumb{

// // width:150px;

// // height:150px;

// // object-fit:contain;

// // background:white;

// // border-radius:20px;

// // border:

// // 2px solid #e2e8f0;

// // padding:12px;

// // cursor:pointer;

// // transition:.3s;

// // box-shadow:

// // 0 8px 20px rgba(0,0,0,.08);


// // }



// // .thumb:hover{

// // transform:translateY(-8px) scale(1.05);

// // border-color:#2563eb;

// // }






// // /* DETAILS */


// // .details{

// // padding:10px;

// // }



// // .details h1{

// // font-size:42px;

// // font-weight:900;

// // color:#064e3b;

// // margin-bottom:15px;

// // }



// // .brand{

// // font-size:18px;

// // color:#64748b;

// // margin:8px 0;

// // }




// // .price{

// // font-size:42px;

// // font-weight:900;

// // color:#16a34a;

// // margin:25px 0;

// // }



// // .mrp{

// // font-size:22px;

// // color:#94a3b8;

// // text-decoration:line-through;

// // margin-left:15px;

// // }




// // .stock{

// // display:inline-block;

// // background:#dcfce7;

// // color:#15803d;

// // font-weight:700;

// // padding:12px 20px;

// // border-radius:50px;

// // }







// // /* INFORMATION BOX */


// // .info{

// // background:#f8fafc;

// // padding:25px;

// // border-radius:20px;

// // margin-top:25px;

// // box-shadow:

// // 0 10px 30px rgba(0,0,0,.05);


// // }



// // .info p{

// // padding:10px 0;

// // border-bottom:

// // 1px solid #e5e7eb;

// // font-size:16px;

// // }







// // /* SECTIONS */


// // .section{

// // margin-top:25px;

// // background:

// // linear-gradient(
// // 135deg,
// // #ffffff,
// // #f8fafc
// // );

// // padding:25px;

// // border-radius:22px;

// // box-shadow:

// // 0 10px 25px rgba(0,0,0,.06);


// // }




// // .section h2{

// // font-size:24px;

// // color:#2563eb;

// // margin-bottom:15px;

// // }




// // .section p{

// // font-size:16px;

// // line-height:1.9;

// // color:#334155;

// // }



// // .line{

// // display:block;

// // padding:8px 0;

// // }



// // .line::before{

// // content:"✓ ";

// // color:#16a34a;

// // font-weight:bold;

// // }







// // /* ORDER BUTTON */


// // .buy{


// // display:block;

// // margin-top:35px;

// // padding:18px;

// // text-align:center;

// // border-radius:20px;

// // background:

// // linear-gradient(
// // 135deg,
// // #16a34a,
// // #22c55e
// // );


// // color:white;

// // text-decoration:none;

// // font-size:20px;

// // font-weight:800;

// // box-shadow:

// // 0 15px 35px rgba(22,163,74,.35);

// // transition:.3s;


// // }



// // .buy:hover{

// // transform:

// // translateY(-6px);

// // }








// // /* MOBILE */


// // @media(max-width:900px){


// // body{

// // padding:10px;

// // }



// // .container{

// // grid-template-columns:1fr;

// // padding:20px;

// // gap:25px;

// // border-radius:25px;

// // }



// // .main-img{

// // height:350px;

// // }



// // .thumb{

// // width:100px;

// // height:100px;

// // }



// // .details h1{

// // font-size:30px;

// // }



// // .price{

// // font-size:32px;

// // }



// // .section{

// // padding:18px;

// // }



// // }



// // @media(max-width:500px){



// // .main-img{

// // height:280px;

// // }



// // .thumb{

// // width:85px;

// // height:85px;

// // }



// // .details h1{

// // font-size:26px;

// // }


// // .buy{

// // font-size:17px;

// // }



// // }

// // .back{

// // display:block;

// // margin-top:15px;

// // padding:16px;

// // text-align:center;

// // border-radius:18px;

// // background:#e2e8f0;

// // color:#1e293b;

// // text-decoration:none;

// // font-size:18px;

// // font-weight:700;

// // transition:.3s;

// // }



// // .back:hover{

// // background:#cbd5e1;

// // transform:translateY(-4px);

// // }

// // .login-price{

// // font-size:22px;

// // font-weight:800;

// // color:#2563eb;

// // background:#eff6ff;

// // padding:15px;

// // border-radius:15px;

// // margin:25px 0;

// // text-align:center;

// // }

// // .login-price{

// // display:block;

// // font-size:22px;

// // font-weight:800;

// // color:#2563eb;

// // background:#eff6ff;

// // padding:18px;

// // border-radius:15px;

// // margin:25px 0;

// // text-align:center;

// // text-decoration:none;

// // cursor:pointer;

// // transition:.3s;

// // border:2px solid #bfdbfe;

// // }


// // .login-price:hover{

// // background:#2563eb;

// // color:white;

// // transform:translateY(-3px);

// // box-shadow:
// // 0 10px 25px rgba(37,99,235,.25);

// // }



// // </style>


// // </head>




// // <body>



// // <div class="container">



// // <div class="gallery">


// // <img

// // id="mainImage"

// // class="main-img"

// // src="${product.image || '/images/no-image.png'}">



// // <div class="thumbs">


// // ${images}


// // </div>



// // </div>







// // <div class="details">



// // <h1>

// // ${product.name}

// // </h1>




// // <p class="brand">

// // 🏷 Brand:

// // ${product.brand || "N/A"}

// // </p>



// // <p class="brand">

// // 🏭 Manufacturer:

// // ${product.manufacturer || "N/A"}

// // </p>






// // <a 
// // class="login-price"
// // href="/admin/doctor-login?product=${product._id}">
// // 🔒 Login to view price
// // </a>





// // <span class="stock">

// // ✔ Available Stock:
// // ${product.stock || 0}

// // </span>







// // <div class="info">


// // <p>

// // <b>Category:</b>

// // ${product.category || ""}

// // </p>



// // <p>

// // <b>Pack Size:</b>

// // ${product.packSize || ""}

// // </p>



// // <p>

// // <b>Batch:</b>

// // ${product.batchNo || ""}

// // </p>



// // </div>








// // <div class="section">


// // <h2>
// // 💊 Composition
// // </h2>



// // <p>


// // ${
// // product.composition

// // ?

// // product.composition
// // .map(item=>`

// // <span class="line">
// // ✔ ${item}
// // </span>

// // `).join("")

// // :

// // ""

// // }


// // </p>



// // </div>








// // <div class="section">


// // <h2>
// // Uses (उपयोग)
// // </h2>



// // <p>


// // ${
// // product.uses

// // ?

// // product.uses
// // .split(",")
// // .map(item=>`

// // <span class="line">
// // ✔ ${item.trim()}
// // </span>

// // `).join("")

// // :

// // ""

// // }



// // </p>


// // </div>









// // <div class="section">


// // <h2>
// // Benefits (फ़ायदे)
// // </h2>



// // <p>


// // ${
// // product.benefits

// // ?

// // product.benefits

// // .split("Phase")

// // .filter(Boolean)

// // .map(item=>`

// // <span class="line">

// // ✔ Phase ${item}

// // </span>

// // `).join("")

// // :

// // ""

// // }



// // </p>



// // </div>









// // <div class="section">


// // <h2>
// // Description
// // </h2>


// // <p>

// // ${product.description || ""}

// // </p>


// // </div>








// // <a
// // class="buy"
// // href="/admin/doctor-login?product=${product._id}">
// // 🛒 Order Now
// // </a>





// // </div>



// // </div>


// // <a

// // class="back"

// // href="/store">


// // ⬅ Back To Products


// // </a>




// // <script>


// // function changeImage(src){


// // document

// // .getElementById("mainImage")

// // .src=src;


// // }


// // </script>




// // </body>

// // </html>



// // `);



// // }catch(err){


// // console.log(err);

// // res.status(500).send("Server Error");


// // }


// // });



// // module.exports = router;




// const express = require("express");
// const router = express.Router();

// const Product = require("../models/Product");


// // ======================================================
// // SAFE HTML ESCAPE
// // ======================================================

// function escapeHTML(value) {

//     if (
//         value === null ||
//         value === undefined
//     ) {
//         return "";
//     }

//     return String(value)
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");

// }


// // ======================================================
// // IMAGE URL CLEANER
// // ======================================================

// function cleanImageUrl(url) {

//     if (!url) {
//         return "";
//     }

//     let clean = String(url).trim();


//     // Markdown:
//     // [https://example.com/image.jpg](https://example.com/image.jpg)

//     const markdownMatch =
//         clean.match(/\]\((https?:\/\/[^)]+)\)/);


//     if (markdownMatch) {

//         return markdownMatch[1];

//     }


//     // [https://example.com/image.jpg]

//     if (
//         clean.startsWith("[") &&
//         clean.endsWith("]")
//     ) {

//         clean =
//             clean.slice(1, -1);

//     }


//     return clean;

// }


// // ======================================================
// // STORE PAGE
// // ======================================================

// router.get("/", async (req, res) => {

//     try {

//         const products =
//             await Product.find()
//                 .sort({
//                     createdAt: -1
//                 });


//         let cards = products
//             .map(product => {

//                 const image =
//                     cleanImageUrl(
//                         product.image
//                     );


//                 return `

//                 <div
//                     class="card"
//                     onclick="
//                         location.href='/store/product/${product._id}'
//                     "
//                 >

//                     <div class="product-img">

//                         <img
//                             src="${escapeHTML(
//                                 image ||
//                                 "https://via.placeholder.com/300"
//                             )}"
//                             alt="${escapeHTML(
//                                 product.name
//                             )}"
//                             loading="lazy"
//                             onerror="
//                                 this.src='https://via.placeholder.com/300';
//                             "
//                         >

//                     </div>


//                     <h2>
//                         ${escapeHTML(
//                             product.name
//                         )}
//                     </h2>


//                     <p>
//                         ${escapeHTML(
//                             product.description ||
//                             "Quality Product"
//                         )}
//                     </p>


//                     <button
//                         type="button"
//                         onclick="
//                             event.stopPropagation();
//                             location.href='/store/product/${product._id}'
//                         "
//                     >
//                         View Details
//                     </button>

//                 </div>

//                 `;

//             })
//             .join("");


//         res.send(`

// <!DOCTYPE html>

// <html>

// <head>

//     <meta charset="UTF-8">

//     <meta
//         name="viewport"
//         content="width=device-width,initial-scale=1"
//     >

//     <title>
//         Premium Store
//     </title>


//     <style>

//         * {

//             margin: 0;
//             padding: 0;

//             box-sizing: border-box;

//             font-family:
//                 "Segoe UI",
//                 Arial,
//                 sans-serif;

//         }


//         body {

//             background:
//                 linear-gradient(
//                     135deg,
//                     #eff6ff,
//                     #f8fafc
//                 );

//             padding: 20px;

//             min-height: 100vh;

//         }


//         /* =========================
//            HEADER
//         ========================= */

//         .header {

//             text-align: center;

//             margin-bottom: 35px;

//         }


//         .header h1 {

//             font-size: 38px;

//             font-weight: 800;

//             color: #1e3a8a;

//         }


//         .header p {

//             margin-top: 8px;

//             color: #64748b;

//         }


//         /* =========================
//            PRODUCTS
//         ========================= */

//         .products {

//             max-width: 1200px;

//             margin: auto;

//             display: grid;

//             grid-template-columns:
//                 repeat(
//                     auto-fit,
//                     minmax(220px, 1fr)
//                 );

//             gap: 20px;

//             justify-items: center;

//         }


//         /* =========================
//            CARD
//         ========================= */

//         .card {

//             width: 220px;

//             height: 340px;

//             background: #ffffff;

//             border-radius: 18px;

//             overflow: hidden;

//             cursor: pointer;

//             display: flex;

//             flex-direction: column;

//             box-shadow:
//                 0 10px 25px
//                 rgba(0,0,0,.12);

//             transition: .3s;

//         }


//         .card:hover {

//             transform:
//                 translateY(-8px);

//             box-shadow:
//                 0 20px 40px
//                 rgba(37,99,235,.25);

//         }


//         /* =========================
//            IMAGE
//         ========================= */

//         .product-img {

//             width: 100%;

//             height: 180px;

//             background: #f8fafc;

//             display: flex;

//             justify-content: center;

//             align-items: center;

//         }


//         .product-img img {

//             width: 100%;

//             height: 100%;

//             object-fit: contain;

//             padding: 12px;

//         }


//         /* =========================
//            TEXT
//         ========================= */

//         .card h2 {

//             font-size: 18px;

//             color: #1e40af;

//             text-align: center;

//             padding:
//                 12px 10px 0;

//         }


//         .card p {

//             flex: 1;

//             padding:
//                 8px 12px;

//             font-size: 13px;

//             color: #64748b;

//             text-align: center;

//             line-height: 1.4;

//             overflow: hidden;

//         }


//         /* =========================
//            BUTTON
//         ========================= */

//         .card button {

//             margin: 12px;

//             padding: 11px;

//             border: none;

//             border-radius: 10px;

//             background:
//                 linear-gradient(
//                     135deg,
//                     #2563eb,
//                     #06b6d4
//                 );

//             color: #ffffff;

//             font-size: 14px;

//             font-weight: 700;

//             cursor: pointer;

//         }


//         /* =========================
//            MOBILE
//         ========================= */

//         @media(max-width:600px) {

//             body {

//                 padding: 10px;

//             }


//             .header h1 {

//                 font-size: 28px;

//             }


//             .products {

//                 grid-template-columns:
//                     repeat(2,1fr);

//                 gap: 10px;

//             }


//             .card {

//                 width: 165px;

//                 height: 280px;

//                 border-radius: 15px;

//             }


//             .product-img {

//                 height: 120px;

//             }


//             .card h2 {

//                 font-size: 15px;

//                 padding-top: 10px;

//             }


//             .card p {

//                 font-size: 11px;

//                 padding: 6px 8px;

//             }


//             .card button {

//                 margin: 8px;

//                 padding: 8px;

//                 font-size: 11px;

//             }

//         }

//     </style>

// </head>


// <body>


//     <div class="header">

//         <h1>
//             Our Premium Products
//         </h1>

//         <p>
//             Trusted Quality Products
//         </p>

//     </div>


//     <div class="products">

//         ${cards}

//     </div>


// </body>

// </html>

//         `);

//     }

//     catch (err) {

//         console.error(
//             "STORE ERROR:",
//             err
//         );

//         res
//             .status(500)
//             .send("Server Error");

//     }

// });


// // ======================================================
// // PRODUCT DETAIL PAGE
// // ======================================================

// router.get(
//     "/product/:id",
//     async (req, res) => {

//         try {

//             // ==========================================
//             // FIND PRODUCT
//             // ==========================================

//             const product =
//                 await Product.findById(
//                     req.params.id
//                 );


//             if (!product) {

//                 return res
//                     .status(404)
//                     .send("Product Not Found");

//             }


//             // ==========================================
//             // PRODUCT IMAGES
//             // ==========================================

//             let productImages = [];


//             if (
//                 Array.isArray(
//                     product.images
//                 )
//             ) {

//                 productImages =
//                     product.images
//                         .filter(Boolean);

//             }


//             // Old image field

//             if (
//                 product.image &&
//                 !productImages.includes(
//                     product.image
//                 )
//             ) {

//                 productImages.unshift(
//                     product.image
//                 );

//             }


//             // Clean URLs

//             productImages =
//                 productImages
//                     .map(cleanImageUrl)
//                     .filter(Boolean);


//             // Remove duplicates

//             productImages =
//                 [
//                     ...new Set(
//                         productImages
//                     )
//                 ];


//             // ==========================================
//             // MAIN IMAGE
//             // ==========================================

//             const mainImage =
//                 productImages[0] ||
//                 "https://via.placeholder.com/600x600?text=No+Image";


//             // ==========================================
//             // THUMBNAILS
//             // ==========================================

//             let images = "";


//             if (
//                 productImages.length > 0
//             ) {

//                 images =
//                     productImages
//                         .map(
//                             (img, index) => {

//                                 const safeImg =
//                                     cleanImageUrl(
//                                         img
//                                     );


//                                 return `

//                                 <img

//                                     src="${escapeHTML(
//                                         safeImg
//                                     )}"

//                                     class="thumb"

//                                     alt="Product Image ${index + 1}"

//                                     loading="lazy"

//                                     onclick="
//                                         changeImage(
//                                             '${escapeHTML(
//                                                 safeImg
//                                             )}'
//                                         )
//                                     "

//                                 >

//                                 `;

//                             }
//                         )
//                         .join("");

//             }


//             // ==========================================
//             // VIDEO
//             // ==========================================

//             let videoHTML = "";


//             if (
//                 product.video &&
//                 String(product.video).trim()
//             ) {

//                 const videoUrl =
//                     String(
//                         product.video
//                     ).trim();


//                 videoHTML = `

//                     <div
//                         class="product-video-section"
//                     >

//                         <h2>
//                             🎥 Product Video
//                         </h2>


//                         <div
//                             class="product-video-box"
//                         >

//                             <video

//                                 controls

//                                 playsinline

//                                 preload="metadata"

//                             >

//                                 <source
//                                     src="${escapeHTML(
//                                         videoUrl
//                                     )}"
//                                     type="video/mp4"
//                                 >


//                                 Your browser
//                                 does not support
//                                 video playback.

//                             </video>

//                         </div>


//                         <p
//                             class="video-note"
//                         >
//                             ▶ Tap play to watch
//                             product video
//                         </p>

//                     </div>

//                 `;

//             }


//             // ==========================================
//             // COMPOSITION
//             // ==========================================

//             let compositionHTML = "";


//             if (
//                 Array.isArray(
//                     product.composition
//                 ) &&
//                 product.composition.length
//             ) {

//                 compositionHTML =
//                     product.composition
//                         .map(item => {

//                             let value = "";


//                             if (
//                                 typeof item ===
//                                 "object"
//                             ) {

//                                 if (
//                                     item.name &&
//                                     item.strength
//                                 ) {

//                                     value =
//                                         `${item.name} ${item.strength}`;

//                                 }

//                                 else if (
//                                     item.name
//                                 ) {

//                                     value =
//                                         item.name;

//                                 }

//                             }

//                             else {

//                                 value =
//                                     String(item);

//                             }


//                             if (!value.trim()) {

//                                 return "";

//                             }


//                             return `

//                             <span class="line">

//                                 ${escapeHTML(
//                                     value
//                                 )}

//                             </span>

//                             `;

//                         })
//                         .join("");

//             }


//             // ==========================================
//             // USES
//             // ==========================================

//             let usesHTML = "";


//             if (product.uses) {

//                 usesHTML =
//                     String(
//                         product.uses
//                     )
//                     .split(/\r?\n|,/)
//                     .map(item =>
//                         item.trim()
//                     )
//                     .filter(Boolean)
//                     .map(item => `

//                         <span class="line">

//                             ${escapeHTML(item)}

//                         </span>

//                     `)
//                     .join("");

//             }


//             // ==========================================
//             // BENEFITS
//             // ==========================================

//             let benefitsHTML = "";


//             if (product.benefits) {

//                 benefitsHTML =
//                     String(
//                         product.benefits
//                     )
//                     .split(/\r?\n|,/)
//                     .map(item =>
//                         item.trim()
//                     )
//                     .filter(Boolean)
//                     .map(item => `

//                         <span class="line">

//                             ${escapeHTML(item)}

//                         </span>

//                     `)
//                     .join("");

//             }


//             // ==========================================
//             // SEND PAGE
//             // ==========================================

//             res.send(`

// <!DOCTYPE html>

// <html>

// <head>

//     <meta charset="UTF-8">


//     <meta
//         name="viewport"
//         content="width=device-width,initial-scale=1"
//     >


//     <title>
//         ${escapeHTML(
//             product.name
//         )}
//     </title>


//     <style>

//         /* =========================
//            RESET
//         ========================= */

//         * {

//             margin: 0;

//             padding: 0;

//             box-sizing: border-box;

//             font-family:
//                 "Segoe UI",
//                 Arial,
//                 sans-serif;

//         }


//         /* =========================
//            BODY
//         ========================= */

//         body {

//             background:
//                 linear-gradient(
//                     135deg,
//                     #ecfdf5,
//                     #eff6ff
//                 );

//             min-height: 100vh;

//             padding: 25px;

//         }


//         /* =========================
//            MAIN CONTAINER
//         ========================= */

//         .container {

//             max-width: 1250px;

//             margin: auto;

//             background:
//                 rgba(
//                     255,
//                     255,
//                     255,
//                     .95
//                 );

//             backdrop-filter:
//                 blur(15px);

//             border-radius: 35px;

//             padding: 40px;

//             display: grid;

//             grid-template-columns:
//                 1fr 1fr;

//             gap: 50px;

//             box-shadow:
//                 0 25px 70px
//                 rgba(0,0,0,.15);

//         }


//         /* =========================
//            GALLERY
//         ========================= */

//         .gallery {

//             background:
//                 linear-gradient(
//                     135deg,
//                     #f8fafc,
//                     #ecfeff
//                 );

//             border-radius: 30px;

//             padding: 35px;

//             text-align: center;

//         }


//         .main-img {

//             width: 100%;

//             height: 520px;

//             object-fit: contain;

//             transition: .5s;

//             cursor: zoom-in;

//         }


//         .main-img:hover {

//             transform:
//                 scale(1.05);

//         }


//         /* =========================
//            THUMBNAILS
//         ========================= */

//         .thumbs {

//             display: flex;

//             gap: 15px;

//             margin-top: 30px;

//             overflow-x: auto;

//             padding: 10px;

//         }


//         .thumb {

//             width: 120px;

//             height: 120px;

//             object-fit: contain;

//             background: #ffffff;

//             border-radius: 15px;

//             border:
//                 2px solid #e2e8f0;

//             padding: 8px;

//             cursor: pointer;

//             transition: .3s;

//             flex-shrink: 0;

//         }


//         .thumb:hover {

//             transform:
//                 translateY(-5px)
//                 scale(1.04);

//             border-color:
//                 #2563eb;

//         }


//         /* =========================
//            DETAILS
//         ========================= */

//         .details {

//             padding: 10px;

//         }


//         .details h1 {

//             font-size: 42px;

//             font-weight: 900;

//             color: #064e3b;

//             margin-bottom: 15px;

//         }


//         .brand {

//             font-size: 18px;

//             color: #64748b;

//             margin: 8px 0;

//         }


//         /* =========================
//            LOGIN PRICE
//         ========================= */

//         .login-price {

//             display: block;

//             font-size: 22px;

//             font-weight: 800;

//             color: #2563eb;

//             background: #eff6ff;

//             padding: 18px;

//             border-radius: 15px;

//             margin: 25px 0;

//             text-align: center;

//             text-decoration: none;

//             cursor: pointer;

//             transition: .3s;

//             border:
//                 2px solid #bfdbfe;

//         }


//         .login-price:hover {

//             background: #2563eb;

//             color: #ffffff;

//             transform:
//                 translateY(-3px);

//             box-shadow:
//                 0 10px 25px
//                 rgba(
//                     37,
//                     99,
//                     235,
//                     .25
//                 );

//         }


//         /* =========================
//            STOCK
//         ========================= */

//         .stock {

//             display: inline-block;

//             background: #dcfce7;

//             color: #15803d;

//             font-weight: 700;

//             padding: 12px 20px;

//             border-radius: 50px;

//         }


//         /* =========================
//            INFO
//         ========================= */

//         .info {

//             background: #f8fafc;

//             padding: 25px;

//             border-radius: 20px;

//             margin-top: 25px;

//             box-shadow:
//                 0 10px 30px
//                 rgba(0,0,0,.05);

//         }


//         .info p {

//             padding: 10px 0;

//             border-bottom:
//                 1px solid #e5e7eb;

//             font-size: 16px;

//         }


//         .info p:last-child {

//             border-bottom: none;

//         }


//         /* =========================
//            SECTION
//         ========================= */

//         .section {

//             margin-top: 25px;

//             background:
//                 linear-gradient(
//                     135deg,
//                     #ffffff,
//                     #f8fafc
//                 );

//             padding: 25px;

//             border-radius: 22px;

//             box-shadow:
//                 0 10px 25px
//                 rgba(0,0,0,.06);

//         }


//         .section h2 {

//             font-size: 24px;

//             color: #2563eb;

//             margin-bottom: 15px;

//         }


//         .section p {

//             font-size: 16px;

//             line-height: 1.9;

//             color: #334155;

//         }


//         .line {

//             display: block;

//             padding: 8px 0;

//             line-height: 1.6;

//         }


//         .line::before {

//             content: "✓ ";

//             color: #16a34a;

//             font-weight: bold;

//         }


//         /* =========================
//            PRODUCT VIDEO
//         ========================= */

//         .product-video-section {

//             margin-top: 25px;

//             background:
//                 linear-gradient(
//                     135deg,
//                     #ffffff,
//                     #f8fafc
//                 );

//             padding: 25px;

//             border-radius: 22px;

//             box-shadow:
//                 0 10px 25px
//                 rgba(0,0,0,.06);

//         }


//         .product-video-section h2 {

//             font-size: 24px;

//             color: #2563eb;

//             margin-bottom: 15px;

//         }


//         .product-video-box {

//             width: 100%;

//             max-width: 750px;

//             margin: auto;

//             background: #0f172a;

//             padding: 8px;

//             border-radius: 18px;

//             overflow: hidden;

//         }


//         .product-video-box video {

//             width: 100%;

//             max-height: 450px;

//             display: block;

//             border-radius: 12px;

//             background: #000000;

//         }


//         .video-note {

//             text-align: center;

//             margin-top: 10px;

//             color: #64748b;

//             font-size: 13px;

//         }


//         /* =========================
//            BUY BUTTON
//         ========================= */

//         .buy {

//             display: block;

//             margin-top: 35px;

//             padding: 18px;

//             text-align: center;

//             border-radius: 20px;

//             background:
//                 linear-gradient(
//                     135deg,
//                     #16a34a,
//                     #22c55e
//                 );

//             color: #ffffff;

//             text-decoration: none;

//             font-size: 20px;

//             font-weight: 800;

//             box-shadow:
//                 0 15px 35px
//                 rgba(
//                     22,
//                     163,
//                     74,
//                     .35
//                 );

//             transition: .3s;

//         }


//         .buy:hover {

//             transform:
//                 translateY(-6px);

//         }


//         /* =========================
//            BACK
//         ========================= */

//         .back {

//             display: block;

//             max-width: 1250px;

//             margin: 15px auto 0;

//             padding: 16px;

//             text-align: center;

//             border-radius: 18px;

//             background: #e2e8f0;

//             color: #1e293b;

//             text-decoration: none;

//             font-size: 18px;

//             font-weight: 700;

//             transition: .3s;

//         }


//         .back:hover {

//             background: #cbd5e1;

//             transform:
//                 translateY(-4px);

//         }


//         /* =========================
//            MOBILE
//         ========================= */

//         @media(max-width:900px) {

//             body {

//                 padding: 10px;

//             }


//             .container {

//                 grid-template-columns: 1fr;

//                 padding: 20px;

//                 gap: 25px;

//                 border-radius: 25px;

//             }


//             .gallery {

//                 padding: 20px;

//                 border-radius: 20px;

//             }


//             .main-img {

//                 height: 350px;

//             }


//             .thumb {

//                 width: 100px;

//                 height: 100px;

//             }


//             .details h1 {

//                 font-size: 30px;

//             }


//             .section {

//                 padding: 18px;

//             }


//             .product-video-section {

//                 padding: 18px;

//             }

//         }


//         @media(max-width:500px) {

//             .main-img {

//                 height: 280px;

//             }


//             .thumb {

//                 width: 85px;

//                 height: 85px;

//             }


//             .details h1 {

//                 font-size: 26px;

//             }


//             .login-price {

//                 font-size: 18px;

//             }


//             .buy {

//                 font-size: 17px;

//             }


//             .product-video-section {

//                 padding: 15px;

//                 border-radius: 16px;

//             }


//             .product-video-section h2 {

//                 font-size: 20px;

//             }


//             .product-video-box {

//                 padding: 5px;

//                 border-radius: 12px;

//             }


//             .product-video-box video {

//                 max-height: 300px;

//             }

//         }

//     </style>

// </head>


// <body>


//     <!-- ==========================================
//          MAIN PRODUCT
//     =========================================== -->

//     <div class="container">


//         <!-- ======================================
//              GALLERY
//         ======================================= -->

//         <div class="gallery">


//             <img

//                 id="mainImage"

//                 class="main-img"

//                 src="${escapeHTML(
//                     mainImage
//                 )}"

//                 alt="${escapeHTML(
//                     product.name
//                 )}"

//             >


//             <div class="thumbs">

//                 ${images}

//             </div>


//         </div>


//         <!-- ======================================
//              DETAILS
//         ======================================= -->

//         <div class="details">


//             <h1>

//                 ${escapeHTML(
//                     product.name
//                 )}

//             </h1>


//             <p class="brand">

//                 🏷 Brand:

//                 ${escapeHTML(
//                     product.brand ||
//                     "N/A"
//                 )}

//             </p>


//             <p class="brand">

//                 🏭 Manufacturer:

//                 ${escapeHTML(
//                     product.manufacturer ||
//                     "N/A"
//                 )}

//             </p>


//             <!-- LOGIN PRICE -->

//             <a

//                 class="login-price"

//                 href="/admin/doctor-login?product=${product._id}"

//             >

//                 🔒 Login to view price

//             </a>


//             <!-- STOCK -->

//             <span class="stock">

//                 ✔ Available Stock:

//                 ${product.stock || 0}

//             </span>


//             <!-- PRODUCT INFORMATION -->

//             <div class="info">


//                 <p>

//                     <b>
//                         Category:
//                     </b>

//                     ${escapeHTML(
//                         product.category ||
//                         ""
//                     )}

//                 </p>


//                 <p>

//                     <b>
//                         Pack Size:
//                     </b>

//                     ${escapeHTML(
//                         product.packSize ||
//                         ""
//                     )}

//                 </p>


//                 <p>

//                     <b>
//                         Batch:
//                     </b>

//                     ${escapeHTML(
//                         product.batchNo ||
//                         ""
//                     )}

//                 </p>


//             </div>


//             <!-- =================================
//                  COMPOSITION
//             ================================== -->

//             <div class="section">

//                 <h2>
//                     💊 Composition
//                 </h2>


//                 <p>

//                     ${compositionHTML}

//                 </p>

//             </div>


//             <!-- =================================
//                  USES
//             ================================== -->

//             <div class="section">

//                 <h2>
//                     Uses (उपयोग)
//                 </h2>


//                 <p>

//                     ${usesHTML}

//                 </p>

//             </div>


//             <!-- =================================
//                  BENEFITS
//             ================================== -->

//             <div class="section">

//                 <h2>
//                     Benefits (फ़ायदे)
//                 </h2>


//                 <p>

//                     ${benefitsHTML}

//                 </p>

//             </div>


//             <!-- =================================
//                  DESCRIPTION
//             ================================== -->

//             <div class="section">

//                 <h2>
//                     Description
//                 </h2>


//                 <p>

//                     ${escapeHTML(
//                         product.description ||
//                         ""
//                     )}

//                 </p>

//             </div>


//             <!-- =================================
//                  VIDEO
//             ================================== -->

//             ${videoHTML}


//             <!-- =================================
//                  ORDER
//             ================================== -->

//             <a

//                 class="buy"

//                 href="/admin/doctor-login?product=${product._id}"

//             >

//                 🛒 Order Now

//             </a>


//         </div>


//     </div>


//     <!-- ==========================================
//          BACK
//     =========================================== -->

//     <a

//         class="back"

//         href="/store"

//     >

//         ⬅ Back To Products

//     </a>


//     <!-- ==========================================
//          JAVASCRIPT
//     =========================================== -->

//     <script>

//         function changeImage(src) {

//             const mainImage =
//                 document.getElementById(
//                     "mainImage"
//                 );


//             if (mainImage) {

//                 mainImage.src = src;

//             }

//         }

//     </script>


// </body>

// </html>

//             `);

//         }

//         catch (err) {

//             console.error(
//                 "PRODUCT DETAIL ERROR:",
//                 err
//             );

//             res
//                 .status(500)
//                 .send(
//                     "Server Error"
//                 );

//         }

//     }
// );


// module.exports = router;



const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// ======================================================
// SAFE HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================================
// CLEAN IMAGE URL
// ======================================================

function cleanImageUrl(url) {

    if (!url) {
        return "";
    }

    let clean = String(url).trim();

    // Remove markdown style URL
    // [https://example.com/image.jpg](https://example.com/image.jpg)

    const markdownMatch =
        clean.match(
            /\[https?:\/\/[^\]]+\]\((https?:\/\/[^)]+)\)/
        );

    if (markdownMatch) {

        return markdownMatch[1];

    }


    // Remove escaped markdown

    const escapedMarkdownMatch =
        clean.match(
            /\\\[https?:\/\/[^\\\]]+\\\]\((https?:\/\/[^)]+)\)/
        );

    if (escapedMarkdownMatch) {

        return escapedMarkdownMatch[1];

    }


    // If URL starts with [ and ends with ]

    if (
        clean.startsWith("[") &&
        clean.endsWith("]")
    ) {

        clean =
            clean.substring(
                1,
                clean.length - 1
            );

    }


    // Remove accidental backslashes

    clean =
        clean.replace(/\\+/g, "");


    return clean.trim();

}


// ======================================================
// STORE PAGE - PREMIUM + SEARCH + FILTER
// ======================================================

router.get("/", async (req, res) => {

    try {

        const products = await Product.find()
            .sort({ createdAt: -1 });


        // ==================================================
        // COMPANY LIST
        // ==================================================

        const companies = [
            ...new Set(
                products
                    .map(p => p.manufacturer)
                    .filter(Boolean)
                    .map(x => String(x).trim())
            )
        ].sort();


        // ==================================================
        // CATEGORY LIST
        // ==================================================

        const categories = [
            ...new Set(
                products
                    .map(p => p.category)
                    .filter(Boolean)
                    .map(x => String(x).trim())
            )
        ].sort();


        // ==================================================
        // PRODUCT CARDS
        // ==================================================

        const cards = products.map(product => {

            const image = cleanImageUrl(
                product.image
            );


            const company =
                product.manufacturer ||
                product.brand ||
                "Company";


            return `

            <div
                class="product-card"
                data-name="${escapeHTML(product.name || "")}"
                data-company="${escapeHTML(company)}"
                data-category="${escapeHTML(product.category || "")}"
                data-price="${Number(product.price || 0)}"
                data-date="${product.createdAt || ""}"
                onclick="openProduct('${product._id}')"
            >

                <!-- IMAGE -->

                <div class="product-image-box">

                    <span class="product-badge">
                        PREMIUM
                    </span>

                    <img
                        src="${escapeHTML(
                            image ||
                            "https://via.placeholder.com/500x500?text=No+Image"
                        )}"
                        alt="${escapeHTML(product.name || "")}"
                        loading="lazy"
                        onerror="
                            this.src='https://via.placeholder.com/500x500?text=No+Image'
                        "
                    >

                </div>


                <!-- CONTENT -->

                <div class="product-content">

                    <div class="company-name">

                        🏢
                        ${escapeHTML(company)}

                    </div>


                    <h2>
                        ${escapeHTML(
                            product.name || "Product"
                        )}
                    </h2>


                    <div class="category">

                        ${escapeHTML(
                            product.category ||
                            "General"
                        )}

                    </div>


                    <p class="description">

                        ${escapeHTML(
                            product.description ||
                            "Quality Product"
                        )}

                    </p>


                    <div class="product-bottom">

                        <span class="stock-mini">

                            ${
                                Number(product.stock || 0) > 0
                                ? "● In Stock"
                                : "● Out of Stock"
                            }

                        </span>


                        <button
                            type="button"
                            onclick="
                                event.stopPropagation();
                                openProduct('${product._id}')
                            "
                        >

                            View Details
                            →

                        </button>

                    </div>

                </div>

            </div>

            `;

        }).join("");


        // ==================================================
        // COMPANY FILTER OPTIONS
        // ==================================================

        const companyOptions = companies.map(company => `

            <option value="${escapeHTML(company)}">

                ${escapeHTML(company)}

            </option>

        `).join("");


        // ==================================================
        // CATEGORY FILTER OPTIONS
        // ==================================================

        const categoryOptions = categories.map(category => `

            <option value="${escapeHTML(category)}">

                ${escapeHTML(category)}

            </option>

        `).join("");


        // ==================================================
        // SEND STORE
        // ==================================================

        res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    Premium Medical Store
</title>


<style>

/* ======================================================
   RESET
====================================================== */

* {

    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family:
        "Segoe UI",
        Arial,
        sans-serif;

}


/* ======================================================
   BODY
====================================================== */

body {

    min-height: 100vh;

    background:

        radial-gradient(
            circle at top left,
            rgba(37,99,235,.12),
            transparent 35%
        ),

        radial-gradient(
            circle at bottom right,
            rgba(6,182,212,.10),
            transparent 35%
        ),

        #f8fafc;

    color: #0f172a;

}


/* ======================================================
   HEADER
====================================================== */

.store-header {

    padding:
        45px 20px 30px;

    text-align: center;

}


.store-logo {

    width: 68px;
    height: 68px;

    margin: auto;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 20px;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
        );

    color: white;

    font-size: 32px;

    box-shadow:
        0 15px 35px
        rgba(37,99,235,.25);

}


.store-header h1 {

    margin-top: 18px;

    font-size: 42px;

    font-weight: 900;

    background:
        linear-gradient(
            135deg,
            #1e3a8a,
            #0891b2
        );

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

}


.store-header p {

    margin-top: 8px;

    color: #64748b;

    font-size: 16px;

}


/* ======================================================
   MAIN
====================================================== */

.store-container {

    max-width: 1350px;

    margin: auto;

    padding:
        10px 20px 50px;

}


/* ======================================================
   FILTER PANEL
====================================================== */

.filter-panel {

    background:
        rgba(255,255,255,.90);

    backdrop-filter:
        blur(18px);

    border:
        1px solid
        rgba(255,255,255,.8);

    border-radius: 25px;

    padding: 20px;

    margin-bottom: 30px;

    box-shadow:
        0 15px 45px
        rgba(15,23,42,.08);

}


.filter-title {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 15px;

}


.filter-title h2 {

    font-size: 20px;

    color: #1e293b;

}


.product-count {

    background: #eff6ff;

    color: #2563eb;

    padding:
        7px 14px;

    border-radius: 50px;

    font-size: 13px;

    font-weight: 800;

}


/* ======================================================
   FILTER GRID
====================================================== */

.filters {

    display: grid;

    grid-template-columns:
        2fr 1fr 1fr 1fr auto;

    gap: 12px;

}


/* ======================================================
   INPUT / SELECT
====================================================== */

.filter-input,
.filter-select {

    width: 100%;

    padding:
        14px 15px;

    border:
        1px solid #e2e8f0;

    border-radius: 14px;

    background: #f8fafc;

    color: #334155;

    outline: none;

    font-size: 14px;

    transition: .25s;

}


.filter-input:focus,
.filter-select:focus {

    border-color: #2563eb;

    background: white;

    box-shadow:
        0 0 0 4px
        rgba(37,99,235,.08);

}


/* ======================================================
   CLEAR BUTTON
====================================================== */

.clear-btn {

    border: none;

    padding:
        0 20px;

    border-radius: 14px;

    background:
        linear-gradient(
            135deg,
            #ef4444,
            #f97316
        );

    color: white;

    font-weight: 800;

    cursor: pointer;

    transition: .25s;

}


.clear-btn:hover {

    transform:
        translateY(-2px);

    box-shadow:
        0 10px 25px
        rgba(239,68,68,.25);

}


/* ======================================================
   PRODUCTS GRID
====================================================== */

.products-grid {

    display: grid;

    grid-template-columns:
        repeat(
            5,
            1fr
        );

    gap: 22px;

}


/* ======================================================
   PRODUCT CARD
====================================================== */

.product-card {

    background: white;

    border-radius: 22px;

    overflow: hidden;

    cursor: pointer;

    border:
        1px solid #eef2f7;

    box-shadow:
        0 10px 30px
        rgba(15,23,42,.08);

    transition:
        transform .3s ease,
        box-shadow .3s ease;

}


.product-card:hover {

    transform:
        translateY(-8px);

    box-shadow:
        0 22px 45px
        rgba(37,99,235,.16);

}


/* ======================================================
   IMAGE
====================================================== */

.product-image-box {

    height: 220px;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #eff6ff
        );

    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 18px;

}


.product-image-box img {

    width: 100%;

    height: 100%;

    object-fit: contain;

    transition: .4s;

}


.product-card:hover
.product-image-box img {

    transform:
        scale(1.06);

}


/* ======================================================
   PREMIUM BADGE
====================================================== */

.product-badge {

    position: absolute;

    top: 12px;
    left: 12px;

    z-index: 2;

    padding:
        6px 10px;

    border-radius: 50px;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
        );

    color: white;

    font-size: 9px;

    font-weight: 900;

    letter-spacing: .6px;

}


/* ======================================================
   CONTENT
====================================================== */

.product-content {

    padding: 16px;

}


.company-name {

    color: #0891b2;

    font-size: 12px;

    font-weight: 800;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

}


.product-content h2 {

    margin-top: 7px;

    font-size: 17px;

    color: #1e293b;

    line-height: 1.3;

}


.category {

    display: inline-block;

    margin-top: 8px;

    padding:
        5px 9px;

    background: #f1f5f9;

    color: #475569;

    border-radius: 7px;

    font-size: 10px;

    font-weight: 700;

}


.description {

    margin-top: 9px;

    color: #64748b;

    font-size: 12px;

    line-height: 1.5;

    height: 36px;

    overflow: hidden;

}


/* ======================================================
   BOTTOM
====================================================== */

.product-bottom {

    margin-top: 15px;

    padding-top: 12px;

    border-top:
        1px solid #f1f5f9;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 8px;

}


.stock-mini {

    font-size: 10px;

    color: #16a34a;

    font-weight: 800;

    white-space: nowrap;

}


.product-bottom button {

    border: none;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #0891b2
        );

    color: white;

    padding:
        9px 12px;

    border-radius: 10px;

    font-size: 11px;

    font-weight: 800;

    cursor: pointer;

}


/* ======================================================
   NO RESULT
====================================================== */

.no-result {

    display: none;

    text-align: center;

    padding: 70px 20px;

}


.no-result-icon {

    font-size: 55px;

}


.no-result h2 {

    margin-top: 15px;

    color: #334155;

}


.no-result p {

    margin-top: 7px;

    color: #64748b;

}


/* ======================================================
   TABLET
====================================================== */

@media(max-width:1100px) {

    .products-grid {

        grid-template-columns:
            repeat(4,1fr);

    }


    .filters {

        grid-template-columns:
            1fr 1fr;

    }


    .clear-btn {

        min-height: 48px;

    }

}


/* ======================================================
   MOBILE
====================================================== */

@media(max-width:700px) {

    .store-header {

        padding:
            25px 12px;

    }


    .store-header h1 {

        font-size: 30px;

    }


    .store-header p {

        font-size: 13px;

    }


    .store-container {

        padding:
            5px 10px 30px;

    }


    .filter-panel {

        padding: 15px;

        border-radius: 18px;

    }


    .filter-title h2 {

        font-size: 16px;

    }


    .filters {

        grid-template-columns:
            1fr 1fr;

    }


    .filter-input {

        grid-column:
            1 / -1;

    }


    .clear-btn {

        grid-column:
            1 / -1;

        padding: 13px;

    }


    .products-grid {

        grid-template-columns:
            repeat(2,1fr);

        gap: 10px;

    }


    .product-card {

        border-radius: 16px;

    }


    .product-image-box {

        height: 145px;

        padding: 10px;

    }


    .product-content {

        padding: 10px;

    }


    .company-name {

        font-size: 9px;

    }


    .product-content h2 {

        font-size: 13px;

    }


    .category {

        font-size: 8px;

        padding: 4px 6px;

    }


    .description {

        font-size: 9px;

        height: 30px;

    }


    .product-bottom {

        display: block;

    }


    .stock-mini {

        display: block;

        margin-bottom: 8px;

    }


    .product-bottom button {

        width: 100%;

        padding: 8px;

    }

}

</style>

</head>


<body>


<!-- ==================================================
     HEADER
================================================== -->

<header class="store-header">

    <div class="store-logo">
        💊
    </div>

    <h1>
        Premium Medical Store
    </h1>

    <p>
        Trusted Quality Healthcare Products
    </p>

</header>


<!-- ==================================================
     MAIN
================================================== -->

<main class="store-container">


    <!-- FILTER -->

    <div class="filter-panel">

        <div class="filter-title">

            <h2>
                🔎 Find Products
            </h2>

            <span
                class="product-count"
                id="productCount"
            >
                ${products.length} Products
            </span>

        </div>


        <div class="filters">


            <!-- SEARCH -->

            <input
                type="text"
                id="searchInput"
                class="filter-input"
                placeholder="🔍 Search product name..."
                oninput="applyFilters()"
            >


            <!-- COMPANY -->

            <select
                id="companyFilter"
                class="filter-select"
                onchange="applyFilters()"
            >

                <option value="">
                    🏢 All Companies
                </option>

                ${companyOptions}

            </select>


            <!-- CATEGORY -->

            <select
                id="categoryFilter"
                class="filter-select"
                onchange="applyFilters()"
            >

                <option value="">
                    💊 All Categories
                </option>

                ${categoryOptions}

            </select>


            <!-- SORT -->

            <select
                id="sortFilter"
                class="filter-select"
                onchange="applyFilters()"
            >

                <option value="newest">
                    🆕 Newest
                </option>

                <option value="low">
                    💰 Price: Low → High
                </option>

                <option value="high">
                    💰 Price: High → Low
                </option>

                <option value="az">
                    🔤 Name: A → Z
                </option>

                <option value="za">
                    🔤 Name: Z → A
                </option>

            </select>


            <!-- CLEAR -->

            <button
                class="clear-btn"
                onclick="clearFilters()"
            >

                ✕ Clear

            </button>


        </div>

    </div>


    <!-- PRODUCTS -->

    <div
        class="products-grid"
        id="productsGrid"
    >

        ${cards}

    </div>


    <!-- NO RESULT -->

    <div
        class="no-result"
        id="noResult"
    >

        <div class="no-result-icon">
            🔍
        </div>

        <h2>
            Product Not Found
        </h2>

        <p>
            Try another product, company or category.
        </p>

    </div>


</main>


<script>

/* ======================================================
   OPEN PRODUCT
====================================================== */

function openProduct(id) {

    window.location.href =
        "/store/product/" + id;

}


/* ======================================================
   FILTER
====================================================== */

function applyFilters() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const company =
        document
            .getElementById("companyFilter")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("categoryFilter")
            .value
            .toLowerCase();


    const sort =
        document
            .getElementById("sortFilter")
            .value;


    const grid =
        document.getElementById(
            "productsGrid"
        );


    const noResult =
        document.getElementById(
            "noResult"
        );


    const count =
        document.getElementById(
            "productCount"
        );


    const cards =
        Array.from(
            grid.querySelectorAll(
                ".product-card"
            )
        );


    let visible = [];


    cards.forEach(card => {

        const name =
            (
                card.dataset.name || ""
            ).toLowerCase();


        const cardCompany =
            (
                card.dataset.company || ""
            ).toLowerCase();


        const cardCategory =
            (
                card.dataset.category || ""
            ).toLowerCase();


        const matchSearch =
            !search ||
            name.includes(search);


        const matchCompany =
            !company ||
            cardCompany === company;


        const matchCategory =
            !category ||
            cardCategory === category;


        if (
            matchSearch &&
            matchCompany &&
            matchCategory
        ) {

            card.style.display =
                "block";

            visible.push(card);

        }

        else {

            card.style.display =
                "none";

        }

    });


    /* ==================================================
       SORT
    ================================================== */

    visible.sort((a,b) => {

        if (sort === "low") {

            return (
                Number(a.dataset.price || 0) -
                Number(b.dataset.price || 0)
            );

        }


        if (sort === "high") {

            return (
                Number(b.dataset.price || 0) -
                Number(a.dataset.price || 0)
            );

        }


        if (sort === "az") {

            return (
                a.dataset.name || ""
            ).localeCompare(
                b.dataset.name || ""
            );

        }


        if (sort === "za") {

            return (
                b.dataset.name || ""
            ).localeCompare(
                a.dataset.name || ""
            );

        }


        return 0;

    });


    visible.forEach(card => {

        grid.appendChild(card);

    });


    /* ==================================================
       COUNT
    ================================================== */

    count.textContent =
        visible.length +
        (
            visible.length === 1
            ? " Product"
            : " Products"
        );


    /* ==================================================
       NO RESULT
    ================================================== */

    if (visible.length === 0) {

        noResult.style.display =
            "block";

    }

    else {

        noResult.style.display =
            "none";

    }

}


/* ======================================================
   CLEAR FILTERS
====================================================== */

function clearFilters() {

    document
        .getElementById("searchInput")
        .value = "";


    document
        .getElementById("companyFilter")
        .value = "";


    document
        .getElementById("categoryFilter")
        .value = "";


    document
        .getElementById("sortFilter")
        .value = "newest";


    applyFilters();

}

</script>


</body>

</html>

        `);

    }

    catch (err) {

        console.error(
            "STORE ERROR:",
            err
        );

        res
            .status(500)
            .send(
                "Server Error"
            );

    }

});


// ======================================================
// PRODUCT DETAIL PAGE
// ======================================================

// ======================================================
// PREMIUM PRODUCT DETAIL PAGE
// ======================================================

router.get("/product/:id", async (req, res) => {

    try {

        // ==================================================
        // FIND PRODUCT
        // ==================================================

        const product = await Product.findById(
            req.params.id
        );


        if (!product) {

            return res.status(404).send(`
                <h2 style="
                    text-align:center;
                    margin-top:100px;
                    font-family:Arial;
                ">
                    Product Not Found
                </h2>
            `);

        }


        // ==================================================
        // PRODUCT IMAGES
        // ==================================================

        let productImages = [];


        if (Array.isArray(product.images)) {

            productImages = product.images
                .filter(Boolean)
                .map(cleanImageUrl)
                .filter(Boolean);

        }


        // OLD IMAGE FIELD

        if (product.image) {

            const oldImage =
                cleanImageUrl(product.image);

            if (
                oldImage &&
                !productImages.includes(oldImage)
            ) {

                productImages.unshift(oldImage);

            }

        }


        // REMOVE DUPLICATES

        productImages = [
            ...new Set(productImages)
        ];


        // ==================================================
        // DEFAULT IMAGE
        // ==================================================

        const defaultImage =
            "https://via.placeholder.com/700x700?text=No+Product+Image";


        const mainImage =
            productImages[0] ||
            defaultImage;


        // ==================================================
        // THUMBNAILS
        // ==================================================

        let thumbnails = "";


        if (productImages.length > 0) {

            thumbnails = productImages
                .map((img, index) => {

                    return `

                    <div
                        class="thumbnail ${index === 0 ? "active" : ""}"
                        onclick="changeImage(
                            '${escapeHTML(img)}',
                            this
                        )"
                    >

                        <img
                            src="${escapeHTML(img)}"
                            alt="Product Image ${index + 1}"
                            loading="lazy"
                            onerror="
                                this.style.display='none'
                            "
                        >

                    </div>

                    `;

                })
                .join("");

        }


        // ==================================================
        // COMPOSITION
        // ==================================================

        let compositionHTML = "";


        if (
            Array.isArray(product.composition) &&
            product.composition.length
        ) {

            compositionHTML =
                product.composition
                    .map(item => {

                        let value = "";


                        if (
                            typeof item === "object"
                        ) {

                            const name =
                                item.name || "";

                            const strength =
                                item.strength || "";


                            value =
                                `${name} ${strength}`.trim();

                        }

                        else {

                            value =
                                String(item);

                        }


                        if (!value.trim()) {

                            return "";

                        }


                        return `

                        <div class="feature-line">

                            <span class="check-icon">
                                ✓
                            </span>

                            <span>
                                ${escapeHTML(value)}
                            </span>

                        </div>

                        `;

                    })
                    .join("");

        }


        if (!compositionHTML) {

            compositionHTML = `

                <div class="empty-text">
                    Composition information not available.
                </div>

            `;

        }


        // ==================================================
        // USES
        // ==================================================

        let usesHTML = "";


        if (product.uses) {

            usesHTML =
                String(product.uses)
                    .split(/\r?\n|,/)
                    .map(item => item.trim())
                    .filter(Boolean)
                    .map(item => `

                        <div class="feature-line">

                            <span class="check-icon">
                                ✓
                            </span>

                            <span>
                                ${escapeHTML(item)}
                            </span>

                        </div>

                    `)
                    .join("");

        }


        if (!usesHTML) {

            usesHTML = `

                <div class="empty-text">
                    Uses information not available.
                </div>

            `;

        }


        // ==================================================
        // BENEFITS
        // ==================================================

        let benefitsHTML = "";


        if (product.benefits) {

            benefitsHTML =
                String(product.benefits)
                    .split(/\r?\n|,/)
                    .map(item => item.trim())
                    .filter(Boolean)
                    .map(item => `

                        <div class="feature-line">

                            <span class="check-icon">
                                ✓
                            </span>

                            <span>
                                ${escapeHTML(item)}
                            </span>

                        </div>

                    `)
                    .join("");

        }


        if (!benefitsHTML) {

            benefitsHTML = `

                <div class="empty-text">
                    Benefits information not available.
                </div>

            `;

        }


        // ==================================================
// VIDEO SECTION
// ==================================================

let videoHTML = "";

// --------------------------------------------------
// 1. CLOUDINARY / UPLOADED MP4 VIDEO
// --------------------------------------------------

if (
    product.video &&
    String(product.video).trim()
) {

    const videoUrl =
        String(product.video).trim();

    videoHTML += `

        <div class="video-section">

            <div class="section-heading">

                <div class="section-icon video-icon">
                    ▶
                </div>

                <div>
                    <h2>
                        Product Video
                    </h2>

                    <p>
                        Watch product information
                    </p>
                </div>

            </div>


            <div class="video-container">

                <video
                    controls
                    playsinline
                    preload="metadata"
                    poster="${escapeHTML(mainImage)}"
                >

                    <source
                        src="${escapeHTML(videoUrl)}"
                        type="video/mp4"
                    >

                    Your browser does not support
                    video playback.

                </video>

            </div>


            <div class="video-bottom">
                ▶ Tap play to watch product video
            </div>

        </div>

    `;
}


// --------------------------------------------------
// 2. YOUTUBE VIDEO
// --------------------------------------------------

if (
    product.videoUrl &&
    String(product.videoUrl).trim()
) {

    const youtubeUrl =
        String(product.videoUrl).trim();

    let youtubeId = "";


    // YouTube Shorts

    let match =
        youtubeUrl.match(
            /youtube\.com\/shorts\/([^?&/]+)/
        );


    // youtu.be

    if (!match) {

        match =
            youtubeUrl.match(
                /youtu\.be\/([^?&/]+)/
            );

    }


    // youtube.com/watch?v=

    if (!match) {

        match =
            youtubeUrl.match(
                /youtube\.com\/watch\?v=([^&]+)/
            );

    }


    if (match) {

        youtubeId = match[1];

    }


    if (youtubeId) {

        videoHTML += `

            <div class="video-section">

                <div class="section-heading">

                    <div class="section-icon video-icon">
                        ▶
                    </div>

                    <div>

                        <h2>
                            YouTube Product Video
                        </h2>

                        <p>
                            Watch product information
                        </p>

                    </div>

                </div>


                <div class="youtube-container">

                    <iframe

                        src="https://www.youtube.com/embed/${escapeHTML(
                            youtubeId
                        )}"

                        title="Product Video"

                        loading="lazy"

                        allow="
                            accelerometer;
                            autoplay;
                            clipboard-write;
                            encrypted-media;
                            gyroscope;
                            picture-in-picture;
                            web-share
                        "

                        allowfullscreen>

                    </iframe>

                </div>

            </div>

        `;

    }

}


// --------------------------------------------------
// 3. NO VIDEO
// --------------------------------------------------

if (!videoHTML) {

    videoHTML = `

        <div class="video-section">

            <div class="section-heading">

                <div class="section-icon video-icon">
                    ▶
                </div>

                <div>

                    <h2>
                        Product Video
                    </h2>

                    <p>
                        Watch product information
                    </p>

                </div>

            </div>


            <div class="video-placeholder">

                <div class="video-placeholder-icon">
                    🎥
                </div>

                <h3>
                    Product Video
                </h3>

                <p>
                    Video will appear here when available.
                </p>

            </div>

        </div>

    `;

}

        // ==================================================
        // STOCK STATUS
        // ==================================================

        const stock =
            Number(product.stock || 0);


        let stockHTML = "";


        if (stock > 0) {

            stockHTML = `

                <div class="stock available">

                    <span class="stock-dot"></span>

                    In Stock

                    <b>
                        ${stock}
                    </b>

                </div>

            `;

        }

        else {

            stockHTML = `

                <div class="stock unavailable">

                    <span class="stock-dot"></span>

                    Currently Unavailable

                </div>

            `;

        }


        // ==================================================
        // SEND PAGE
        // ==================================================

        res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    ${escapeHTML(product.name)}
    | Premium Store
</title>


<style>

/* ======================================================
   RESET
====================================================== */

* {

    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family:
        "Segoe UI",
        Arial,
        sans-serif;

}


/* ======================================================
   BODY
====================================================== */

body {

    min-height: 100vh;

    background:

        radial-gradient(
            circle at top left,
            rgba(37,99,235,.12),
            transparent 32%
        ),

        radial-gradient(
            circle at bottom right,
            rgba(6,182,212,.10),
            transparent 35%
        ),

        #f8fafc;

    color: #0f172a;

    padding: 25px;

}


/* ======================================================
   TOP BAR
====================================================== */

.top-bar {

    max-width: 1350px;

    margin:
        0 auto 20px;

    display: flex;

    justify-content:
        space-between;

    align-items: center;

    gap: 15px;

}


.store-title {

    display: flex;

    align-items: center;

    gap: 10px;

    font-weight: 900;

    color: #1e3a8a;

}


.store-logo {

    width: 42px;
    height: 42px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 13px;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
        );

    color: white;

    font-size: 21px;

    box-shadow:
        0 10px 25px
        rgba(37,99,235,.22);

}


/* ======================================================
   MAIN CONTAINER
====================================================== */

.product-container {

    max-width: 1350px;

    margin: auto;

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        minmax(0, 1fr);

    gap: 30px;

}


/* ======================================================
   GALLERY CARD
====================================================== */

.gallery-card {

    background:
        rgba(255,255,255,.92);

    border:
        1px solid
        rgba(226,232,240,.8);

    border-radius: 30px;

    padding: 25px;

    box-shadow:
        0 20px 55px
        rgba(15,23,42,.08);

    position: sticky;

    top: 20px;

}


/* ======================================================
   MAIN IMAGE
====================================================== */

.main-image-box {

    height: 560px;

    border-radius: 25px;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #eff6ff
        );

    display: flex;

    align-items: center;
    justify-content: center;

    overflow: hidden;

    position: relative;

}


.main-image {

    width: 100%;

    height: 100%;

    object-fit: contain;

    padding: 30px;

    cursor: zoom-in;

    transition: .4s;

}


.main-image:hover {

    transform:
        scale(1.04);

}


/* ======================================================
   IMAGE BADGE
====================================================== */

.image-badge {

    position: absolute;

    top: 15px;
    left: 15px;

    z-index: 2;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
        );

    color: white;

    padding:
        8px 13px;

    border-radius: 50px;

    font-size: 10px;

    font-weight: 900;

    letter-spacing: .5px;

}


/* ======================================================
   THUMBNAILS
====================================================== */

.thumbnails {

    display: flex;

    gap: 12px;

    overflow-x: auto;

    padding: 15px 3px 5px;

}


.thumbnail {

    width: 82px;
    height: 82px;

    flex: 0 0 auto;

    background: white;

    border:
        2px solid #e2e8f0;

    border-radius: 14px;

    padding: 7px;

    cursor: pointer;

    transition: .25s;

}


.thumbnail img {

    width: 100%;
    height: 100%;

    object-fit: contain;

}


.thumbnail:hover {

    transform:
        translateY(-3px);

    border-color:
        #2563eb;

}


.thumbnail.active {

    border-color:
        #2563eb;

    box-shadow:
        0 0 0 3px
        rgba(37,99,235,.12);

}


/* ======================================================
   DETAILS
====================================================== */

.details-card {

    min-width: 0;

}


.product-company {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    background:
        #eff6ff;

    color: #2563eb;

    padding:
        8px 13px;

    border-radius: 50px;

    font-size: 12px;

    font-weight: 800;

}


.product-title {

    margin-top: 15px;

    font-size: 44px;

    line-height: 1.15;

    font-weight: 900;

    color: #0f172a;

}


.product-subtitle {

    margin-top: 10px;

    color: #64748b;

    font-size: 16px;

    line-height: 1.6;

}


/* ======================================================
   META
====================================================== */

.meta-row {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 18px;

}


.meta {

    padding:
        8px 12px;

    background: white;

    border:
        1px solid #e2e8f0;

    border-radius: 10px;

    color: #475569;

    font-size: 12px;

}


/* ======================================================
   STOCK
====================================================== */

.stock {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    margin-top: 20px;

    padding:
        10px 15px;

    border-radius: 50px;

    font-size: 13px;

    font-weight: 800;

}


.stock.available {

    background: #dcfce7;

    color: #15803d;

}


.stock.unavailable {

    background: #fee2e2;

    color: #dc2626;

}


.stock-dot {

    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: currentColor;

}


/* ======================================================
   LOGIN PRICE
====================================================== */

.login-price {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    margin-top: 20px;

    padding: 17px;

    border-radius: 17px;

    border:
        2px solid #bfdbfe;

    background:
        linear-gradient(
            135deg,
            #eff6ff,
            #ecfeff
        );

    color: #2563eb;

    text-decoration: none;

    font-weight: 900;

    font-size: 17px;

    transition: .3s;

}


.login-price:hover {

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #06b6d4
        );

    color: white;

    transform:
        translateY(-3px);

    box-shadow:
        0 15px 30px
        rgba(37,99,235,.22);

}


/* ======================================================
   QUICK INFORMATION
====================================================== */

.quick-info {

    margin-top: 20px;

    background: white;

    border:
        1px solid #e2e8f0;

    border-radius: 20px;

    overflow: hidden;

}


.quick-row {

    display: grid;

    grid-template-columns:
        140px 1fr;

    gap: 10px;

    padding:
        14px 18px;

    border-bottom:
        1px solid #f1f5f9;

    font-size: 14px;

}


.quick-row:last-child {

    border-bottom: none;

}


.quick-label {

    color: #64748b;

    font-weight: 700;

}


.quick-value {

    color: #1e293b;

    font-weight: 700;

}


/* ======================================================
   SECTION
====================================================== */

.info-section {

    margin-top: 22px;

    padding: 23px;

    background:
        rgba(255,255,255,.95);

    border:
        1px solid #e2e8f0;

    border-radius: 22px;

    box-shadow:
        0 10px 30px
        rgba(15,23,42,.05);

}


.section-heading {

    display: flex;

    align-items: center;

    gap: 12px;

    margin-bottom: 17px;

}


.section-icon {

    width: 42px;
    height: 42px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 12px;

    background:
        #eff6ff;

    color: #2563eb;

    font-size: 20px;

}


.section-heading h2 {

    font-size: 20px;

    color: #1e293b;

}


.section-heading p {

    margin-top: 2px;

    color: #94a3b8;

    font-size: 11px;

}


/* ======================================================
   FEATURE LINE
====================================================== */

.feature-line {

    display: flex;

    gap: 10px;

    padding: 10px 0;

    color: #334155;

    font-size: 14px;

    line-height: 1.6;

    border-bottom:
        1px dashed #e2e8f0;

}


.feature-line:last-child {

    border-bottom: none;

}


.check-icon {

    color: #16a34a;

    font-weight: 900;

}


/* ======================================================
   EMPTY
====================================================== */

.empty-text {

    color: #94a3b8;

    font-size: 13px;

}


/* ======================================================
   DESCRIPTION
====================================================== */

.description-text {

    color: #475569;

    font-size: 15px;

    line-height: 1.9;

    white-space: pre-line;

}


/* ======================================================
   VIDEO SECTION
====================================================== */

.video-section {

    margin-top: 22px;

    padding: 23px;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #f8fafc
        );

    border:
        1px solid #e2e8f0;

    border-radius: 22px;

    box-shadow:
        0 10px 30px
        rgba(15,23,42,.06);

}


.video-icon {

    background:
        #fef3c7;

    color:
        #d97706;

}


.video-container {

    width: 100%;

    background:
        #020617;

    border-radius: 18px;

    padding: 7px;

    overflow: hidden;

}


.video-container video {

    width: 100%;

    max-height: 480px;

    display: block;

    border-radius: 13px;

    background: black;

}


.video-placeholder {

    min-height: 300px;

    border:
        2px dashed #cbd5e1;

    border-radius: 18px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #f1f5f9
        );

}


.video-placeholder-icon {

    font-size: 55px;

    opacity: .7;

}


.video-placeholder h3 {

    margin-top: 12px;

    color: #334155;

}


.video-placeholder p {

    margin-top: 7px;

    color: #94a3b8;

    font-size: 13px;

}


.video-bottom {

    margin-top: 10px;

    text-align: center;

    color: #64748b;

    font-size: 12px;

}


/* ======================================================
   ACTION BUTTONS
====================================================== */

.actions {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 12px;

    margin-top: 25px;

}


.order-btn {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 17px;

    border-radius: 17px;

    background:
        linear-gradient(
            135deg,
            #16a34a,
            #22c55e
        );

    color: white;

    text-decoration: none;

    font-weight: 900;

    box-shadow:
        0 12px 30px
        rgba(22,163,74,.25);

    transition: .3s;

}


.order-btn:hover {

    transform:
        translateY(-3px);

}


.whatsapp-btn {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 17px;

    border-radius: 17px;

    background:
        #25D366;

    color: white;

    text-decoration: none;

    font-weight: 900;

    transition: .3s;

}


.whatsapp-btn:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 12px 30px
        rgba(37,211,102,.25);

}


/* ======================================================
   BACK
====================================================== */

.back-btn {

    max-width: 1350px;

    margin: 20px auto 0;

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 15px;

    border-radius: 16px;

    background: white;

    color: #334155;

    text-decoration: none;

    font-weight: 800;

    border:
        1px solid #e2e8f0;

    transition: .25s;

}


.back-btn:hover {

    background: #f1f5f9;

}


/* ======================================================
   IMAGE MODAL
====================================================== */

.image-modal {

    display: none;

    position: fixed;

    inset: 0;

    z-index: 9999;

    background:
        rgba(2,6,23,.88);

    align-items: center;

    justify-content: center;

    padding: 25px;

}


.image-modal img {

    max-width: 95%;

    max-height: 90vh;

    object-fit: contain;

    border-radius: 15px;

}


.close-modal {

    position: fixed;

    top: 20px;

    right: 25px;

    width: 45px;
    height: 45px;

    border-radius: 50%;

    border: none;

    background: white;

    color: #0f172a;

    font-size: 25px;

    cursor: pointer;

}


/* ======================================================
   MOBILE
====================================================== */

@media(max-width:900px) {

    body {

        padding: 10px;

    }


    .product-container {

        grid-template-columns: 1fr;

        gap: 15px;

    }


    .gallery-card {

        position: relative;

        top: 0;

        padding: 15px;

        border-radius: 22px;

    }


    .main-image-box {

        height: 380px;

        border-radius: 18px;

    }


    .product-title {

        font-size: 31px;

    }


    .quick-row {

        grid-template-columns:
            115px 1fr;

    }

}


@media(max-width:550px) {

    .top-bar {

        margin-bottom: 10px;

    }


    .store-title {

        font-size: 13px;

    }


    .store-logo {

        width: 35px;
        height: 35px;

        font-size: 17px;

    }


    .gallery-card {

        padding: 10px;

    }


    .main-image-box {

        height: 300px;

    }


    .main-image {

        padding: 15px;

    }


    .thumbnail {

        width: 68px;
        height: 68px;

    }


    .product-title {

        font-size: 26px;

    }


    .product-subtitle {

        font-size: 13px;

    }


    .quick-row {

        grid-template-columns: 1fr;

        gap: 4px;

    }


    .info-section,
    .video-section {

        padding: 17px;

        border-radius: 18px;

    }


    .actions {

        grid-template-columns: 1fr;

    }


    .video-placeholder {

        min-height: 240px;

    }

}

</style>

</head>


<body>


<!-- ==================================================
     TOP BAR
================================================== -->

<div class="top-bar">

    <div class="store-title">

        <div class="store-logo">
            💊
        </div>

        Premium Medical Store

    </div>

</div>


<!-- ==================================================
     PRODUCT
================================================== -->

<div class="product-container">


    <!-- =================================================
         GALLERY
    ================================================== -->

    <div class="gallery-card">


        <div class="main-image-box">

            <span class="image-badge">
                PREMIUM PRODUCT
            </span>


            <img
                id="mainProductImage"
                class="main-image"
                src="${escapeHTML(mainImage)}"
                alt="${escapeHTML(product.name)}"
                onclick="openImageModal(this.src)"
                onerror="
                    this.src='${defaultImage}'
                "
            >

        </div>


        <div class="thumbnails">

            ${thumbnails}

        </div>


    </div>


    <!-- =================================================
         DETAILS
    ================================================== -->

    <div class="details-card">


        <div class="product-company">

            🏢

            ${escapeHTML(
                product.manufacturer ||
                product.brand ||
                "Healthcare Company"
            )}

        </div>


        <h1 class="product-title">

            ${escapeHTML(
                product.name
            )}

        </h1>


        <p class="product-subtitle">

            ${escapeHTML(
                product.description ||
                "Premium quality healthcare product."
            )}

        </p>


        <!-- META -->

        <div class="meta-row">

            <span class="meta">

                🏷 Brand:
                ${escapeHTML(
                    product.brand || "N/A"
                )}

            </span>


            <span class="meta">

                🏭 Manufacturer:
                ${escapeHTML(
                    product.manufacturer || "N/A"
                )}

            </span>

        </div>


        <!-- STOCK -->

        ${stockHTML}


        <!-- LOGIN -->

        <a
            class="login-price"
            href="/admin/doctor-login?product=${product._id}"
        >

            🔒
            Login to View Price

        </a>


        <!-- QUICK INFO -->

        <div class="quick-info">


            <div class="quick-row">

                <span class="quick-label">
                    Category
                </span>

                <span class="quick-value">
                    ${escapeHTML(
                        product.category || "N/A"
                    )}
                </span>

            </div>


            <div class="quick-row">

                <span class="quick-label">
                    Pack Size
                </span>

                <span class="quick-value">
                    ${escapeHTML(
                        product.packSize || "N/A"
                    )}
                </span>

            </div>


            <div class="quick-row">

                <span class="quick-label">
                    Batch No.
                </span>

                <span class="quick-value">
                    ${escapeHTML(
                        product.batchNo || "N/A"
                    )}
                </span>

            </div>


            <div class="quick-row">

                <span class="quick-label">
                    MFG Date
                </span>

                <span class="quick-value">
                    ${escapeHTML(
                        product.mfgDate || "N/A"
                    )}
                </span>

            </div>


            <div class="quick-row">

                <span class="quick-label">
                    EXP Date
                </span>

                <span class="quick-value">
                    ${escapeHTML(
                        product.expDate || "N/A"
                    )}
                </span>

            </div>


        </div>


        <!-- COMPOSITION -->

        <div class="info-section">


            <div class="section-heading">

                <div class="section-icon">
                    💊
                </div>

                <div>

                    <h2>
                        Composition
                    </h2>

                    <p>
                        Product ingredients
                    </p>

                </div>

            </div>


            ${compositionHTML}


        </div>


        <!-- USES -->

        <div class="info-section">


            <div class="section-heading">

                <div class="section-icon">
                    🎯
                </div>

                <div>

                    <h2>
                        Uses
                    </h2>

                    <p>
                        Product uses
                    </p>

                </div>

            </div>


            ${usesHTML}


        </div>


        <!-- BENEFITS -->

        <div class="info-section">


            <div class="section-heading">

                <div class="section-icon">
                    ⭐
                </div>

                <div>

                    <h2>
                        Benefits
                    </h2>

                    <p>
                        Key benefits
                    </p>

                </div>

            </div>


            ${benefitsHTML}


        </div>


        <!-- DESCRIPTION -->

        <div class="info-section">


            <div class="section-heading">

                <div class="section-icon">
                    📋
                </div>

                <div>

                    <h2>
                        Description
                    </h2>

                    <p>
                        Product information
                    </p>

                </div>

            </div>


            <div class="description-text">

                ${escapeHTML(
                    product.description ||
                    "No description available."
                )}

            </div>


        </div>


        <!-- =================================================
             VIDEO
        ================================================== -->

        ${videoHTML}


        <!-- =================================================
             ACTIONS
        ================================================== -->

        <div class="actions">


            <a
                class="order-btn"
                href="/admin/doctor-login?product=${product._id}"
            >

                🛒
                Order Now

            </a>


            <a
                class="whatsapp-btn"
                href="https://wa.me/?text=${encodeURIComponent(
                    "I want information about " +
                    product.name
                )}"
                target="_blank"
            >

                💬
                Enquiry

            </a>


        </div>


    </div>

</div>


<!-- ==================================================
     BACK
================================================== -->

<a
    class="back-btn"
    href="/store"
>

    ⬅
    Back To Products

</a>


<!-- ==================================================
     IMAGE MODAL
================================================== -->

<div
    class="image-modal"
    id="imageModal"
    onclick="closeImageModal()"
>

    <button
        class="close-modal"
        onclick="closeImageModal()"
    >
        ×
    </button>


    <img
        id="modalImage"
        src=""
        onclick="event.stopPropagation()"
    >

</div>


<script>

/* ======================================================
   CHANGE IMAGE
====================================================== */

function changeImage(src, element) {

    const main =
        document.getElementById(
            "mainProductImage"
        );


    if (main) {

        main.src = src;

    }


    document
        .querySelectorAll(".thumbnail")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    if (element) {

        element.classList.add(
            "active"
        );

    }

}


/* ======================================================
   IMAGE MODAL
====================================================== */

function openImageModal(src) {

    const modal =
        document.getElementById(
            "imageModal"
        );


    const image =
        document.getElementById(
            "modalImage"
        );


    image.src = src;

    modal.style.display =
        "flex";

}


function closeImageModal() {

    document
        .getElementById(
            "imageModal"
        )
        .style.display = "none";

}


/* ======================================================
   ESC KEY
====================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeImageModal();

        }

    }
);

</script>


</body>

</html>

        `);

    }

    catch (err) {

        console.error(
            "PRODUCT DETAIL ERROR:",
            err
        );

        res.status(500).send(
            "Product Detail Server Error"
        );

    }

});
module.exports = router;