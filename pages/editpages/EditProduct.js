// // // // // // // // function EditProduct(product) {
// // // // // // // //   return `
// // // // // // // // <!DOCTYPE html>
// // // // // // // // <html lang="en">

// // // // // // // // <head>

// // // // // // // // <meta charset="UTF-8">

// // // // // // // // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // // // // // // // <title>Edit Product</title>

// // // // // // // // <style>

// // // // // // // // *{
// // // // // // // // margin:0;
// // // // // // // // padding:0;
// // // // // // // // box-sizing:border-box;
// // // // // // // // font-family:Arial,sans-serif;
// // // // // // // // }

// // // // // // // // body{
// // // // // // // // background:#f5f7fb;
// // // // // // // // padding:40px;
// // // // // // // // }

// // // // // // // // .container{
// // // // // // // // max-width:700px;
// // // // // // // // margin:auto;
// // // // // // // // background:#fff;
// // // // // // // // padding:30px;
// // // // // // // // border-radius:15px;
// // // // // // // // box-shadow:0 10px 25px rgba(0,0,0,.12);
// // // // // // // // }

// // // // // // // // h2{
// // // // // // // // text-align:center;
// // // // // // // // margin-bottom:25px;
// // // // // // // // color:#0d6efd;
// // // // // // // // }

// // // // // // // // .form-group{
// // // // // // // // margin-bottom:18px;
// // // // // // // // }

// // // // // // // // label{
// // // // // // // // display:block;
// // // // // // // // margin-bottom:6px;
// // // // // // // // font-weight:bold;
// // // // // // // // }

// // // // // // // // input,
// // // // // // // // textarea{
// // // // // // // // width:100%;
// // // // // // // // padding:12px;
// // // // // // // // border:1px solid #ddd;
// // // // // // // // border-radius:8px;
// // // // // // // // font-size:15px;
// // // // // // // // }

// // // // // // // // textarea{
// // // // // // // // height:120px;
// // // // // // // // resize:none;
// // // // // // // // }

// // // // // // // // .preview{
// // // // // // // // width:150px;
// // // // // // // // height:150px;
// // // // // // // // border-radius:10px;
// // // // // // // // object-fit:cover;
// // // // // // // // border:2px solid #ddd;
// // // // // // // // display:block;
// // // // // // // // margin:15px auto;
// // // // // // // // }

// // // // // // // // button{
// // // // // // // // width:100%;
// // // // // // // // padding:14px;
// // // // // // // // border:none;
// // // // // // // // border-radius:8px;
// // // // // // // // background:#0d6efd;
// // // // // // // // color:#fff;
// // // // // // // // font-size:16px;
// // // // // // // // cursor:pointer;
// // // // // // // // }

// // // // // // // // button:hover{
// // // // // // // // background:#0b5ed7;
// // // // // // // // }

// // // // // // // // .back{
// // // // // // // // display:block;
// // // // // // // // text-align:center;
// // // // // // // // margin-top:20px;
// // // // // // // // text-decoration:none;
// // // // // // // // color:#0d6efd;
// // // // // // // // font-weight:bold;
// // // // // // // // }

// // // // // // // // </style>

// // // // // // // // </head>

// // // // // // // // <body>

// // // // // // // // <div class="container">

// // // // // // // // <h2>✏️ Edit Product</h2>

// // // // // // // // <form
// // // // // // // // action="/admin/edit-product/${product._id}"
// // // // // // // // method="POST"
// // // // // // // // enctype="multipart/form-data">

// // // // // // // // <div class="form-group">

// // // // // // // // <label>Product Name</label>

// // // // // // // // <input
// // // // // // // // type="text"
// // // // // // // // name="name"
// // // // // // // // value="${product.name}"
// // // // // // // // required>

// // // // // // // // </div>

// // // // // // // // <div class="form-group">

// // // // // // // // <label>Price</label>

// // // // // // // // <input
// // // // // // // // type="number"
// // // // // // // // name="price"
// // // // // // // // value="${product.price}"
// // // // // // // // required>

// // // // // // // // </div>

// // // // // // // // <div class="form-group">

// // // // // // // // <label>Description</label>

// // // // // // // // <textarea
// // // // // // // // name="description">${product.description || ""}</textarea>

// // // // // // // // </div>

// // // // // // // // <img
// // // // // // // // src="${product.image}"
// // // // // // // // class="preview"
// // // // // // // // alt="${product.name}">

// // // // // // // // <div class="form-group">

// // // // // // // // <label>Change Image</label>

// // // // // // // // <input
// // // // // // // // type="file"
// // // // // // // // name="image"
// // // // // // // // accept="image/*">

// // // // // // // // </div>

// // // // // // // // <button type="submit">

// // // // // // // // 💾 Update Product

// // // // // // // // </button>

// // // // // // // // </form>

// // // // // // // // <a
// // // // // // // // href="/admin/manage-products"
// // // // // // // // class="back">

// // // // // // // // ⬅ Back

// // // // // // // // </a>

// // // // // // // // </div>

// // // // // // // // </body>

// // // // // // // // </html>
// // // // // // // // `;
// // // // // // // // }

// // // // // // // // module.exports = EditProduct;


// // // // // // // function EditProduct(product) {

// // // // // // //     const compositions =
// // // // // // //         Array.isArray(product.composition) && product.composition.length
// // // // // // //             ? product.composition
// // // // // // //             : [""];

// // // // // // //     const images =
// // // // // // //         Array.isArray(product.images)
// // // // // // //             ? product.images
// // // // // // //             : (product.image ? [product.image] : []);

// // // // // // //     return `

// // // // // // // <!DOCTYPE html>
// // // // // // // <html lang="en">

// // // // // // // <head>

// // // // // // // <meta charset="UTF-8">

// // // // // // // <meta
// // // // // // //     name="viewport"
// // // // // // //     content="width=device-width, initial-scale=1.0"
// // // // // // // >

// // // // // // // <title>Edit Product</title>


// // // // // // // <style>

// // // // // // // /* =========================
// // // // // // //    RESET
// // // // // // // ========================= */

// // // // // // // * {
// // // // // // //     margin: 0;
// // // // // // //     padding: 0;
// // // // // // //     box-sizing: border-box;
// // // // // // //     font-family: "Segoe UI", Arial, sans-serif;
// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    BODY
// // // // // // // ========================= */

// // // // // // // body {

// // // // // // //     background:
// // // // // // //         linear-gradient(
// // // // // // //             135deg,
// // // // // // //             #2563eb,
// // // // // // //             #06b6d4
// // // // // // //         );

// // // // // // //     min-height: 100vh;

// // // // // // //     padding: 30px 15px;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    MAIN CONTAINER
// // // // // // // ========================= */

// // // // // // // .container {

// // // // // // //     width: 100%;
// // // // // // //     max-width: 1000px;

// // // // // // //     margin: auto;

// // // // // // //     background: #ffffff;

// // // // // // //     padding: 30px;

// // // // // // //     border-radius: 22px;

// // // // // // //     box-shadow:
// // // // // // //         0 20px 50px
// // // // // // //         rgba(0,0,0,.18);

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    HEADER
// // // // // // // ========================= */

// // // // // // // .header {

// // // // // // //     text-align: center;

// // // // // // //     margin-bottom: 30px;

// // // // // // // }


// // // // // // // .header h2 {

// // // // // // //     color: #1e40af;

// // // // // // //     font-size: 28px;

// // // // // // //     margin-bottom: 6px;

// // // // // // // }


// // // // // // // .header p {

// // // // // // //     color: #64748b;

// // // // // // //     font-size: 14px;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    FORM GRID
// // // // // // // ========================= */

// // // // // // // .form-grid {

// // // // // // //     display: grid;

// // // // // // //     grid-template-columns:
// // // // // // //         repeat(2, 1fr);

// // // // // // //     gap: 18px;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    FORM GROUP
// // // // // // // ========================= */

// // // // // // // .form-group {

// // // // // // //     display: flex;

// // // // // // //     flex-direction: column;

// // // // // // // }


// // // // // // // .form-group.full {

// // // // // // //     grid-column: 1 / -1;

// // // // // // // }


// // // // // // // label {

// // // // // // //     font-weight: 700;

// // // // // // //     color: #1e293b;

// // // // // // //     margin-bottom: 7px;

// // // // // // //     font-size: 14px;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    INPUTS
// // // // // // // ========================= */

// // // // // // // input,
// // // // // // // select,
// // // // // // // textarea {

// // // // // // //     width: 100%;

// // // // // // //     padding: 12px 13px;

// // // // // // //     border: 1px solid #d1d5db;

// // // // // // //     border-radius: 10px;

// // // // // // //     background: #fff;

// // // // // // //     color: #111827;

// // // // // // //     font-size: 15px;

// // // // // // //     outline: none;

// // // // // // //     transition: .2s;

// // // // // // // }


// // // // // // // input:focus,
// // // // // // // select:focus,
// // // // // // // textarea:focus {

// // // // // // //     border-color: #2563eb;

// // // // // // //     box-shadow:
// // // // // // //         0 0 0 3px
// // // // // // //         rgba(37,99,235,.10);

// // // // // // // }


// // // // // // // textarea {

// // // // // // //     min-height: 120px;

// // // // // // //     resize: vertical;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    SECTION
// // // // // // // ========================= */

// // // // // // // .section {

// // // // // // //     margin-top: 28px;

// // // // // // //     padding-top: 22px;

// // // // // // //     border-top:
// // // // // // //         1px solid #e5e7eb;

// // // // // // // }


// // // // // // // .section-title {

// // // // // // //     display: flex;

// // // // // // //     align-items: center;

// // // // // // //     gap: 8px;

// // // // // // //     margin-bottom: 15px;

// // // // // // //     color: #1e40af;

// // // // // // //     font-size: 19px;

// // // // // // //     font-weight: 700;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    COMPOSITION
// // // // // // // ========================= */

// // // // // // // .composition-row {

// // // // // // //     display: flex;

// // // // // // //     gap: 10px;

// // // // // // //     margin-bottom: 10px;

// // // // // // // }


// // // // // // // .composition-row input {

// // // // // // //     flex: 1;

// // // // // // // }


// // // // // // // .remove-btn {

// // // // // // //     width: 45px;

// // // // // // //     padding: 0;

// // // // // // //     margin: 0;

// // // // // // //     border: none;

// // // // // // //     border-radius: 9px;

// // // // // // //     background: #dc2626;

// // // // // // //     color: white;

// // // // // // //     font-size: 18px;

// // // // // // //     cursor: pointer;

// // // // // // // }


// // // // // // // .remove-btn:hover {

// // // // // // //     background: #b91c1c;

// // // // // // // }


// // // // // // // .add-btn {

// // // // // // //     width: auto;

// // // // // // //     padding: 11px 18px;

// // // // // // //     margin-top: 5px;

// // // // // // //     border: none;

// // // // // // //     border-radius: 9px;

// // // // // // //     background: #16a34a;

// // // // // // //     color: white;

// // // // // // //     font-weight: 700;

// // // // // // //     cursor: pointer;

// // // // // // // }


// // // // // // // .add-btn:hover {

// // // // // // //     background: #15803d;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    EXISTING IMAGES
// // // // // // // ========================= */

// // // // // // // .image-grid {

// // // // // // //     display: grid;

// // // // // // //     grid-template-columns:
// // // // // // //         repeat(4, 1fr);

// // // // // // //     gap: 15px;

// // // // // // // }


// // // // // // // .image-card {

// // // // // // //     position: relative;

// // // // // // //     border:
// // // // // // //         1px solid #e5e7eb;

// // // // // // //     border-radius: 12px;

// // // // // // //     padding: 8px;

// // // // // // //     background: #f8fafc;

// // // // // // // }


// // // // // // // .image-card img {

// // // // // // //     width: 100%;

// // // // // // //     height: 140px;

// // // // // // //     object-fit: cover;

// // // // // // //     border-radius: 8px;

// // // // // // //     display: block;

// // // // // // // }


// // // // // // // .image-number {

// // // // // // //     text-align: center;

// // // // // // //     margin-top: 6px;

// // // // // // //     font-size: 12px;

// // // // // // //     color: #64748b;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    NO IMAGE
// // // // // // // ========================= */

// // // // // // // .no-image {

// // // // // // //     padding: 30px;

// // // // // // //     text-align: center;

// // // // // // //     background: #f8fafc;

// // // // // // //     border-radius: 10px;

// // // // // // //     color: #64748b;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    UPDATE BUTTON
// // // // // // // ========================= */

// // // // // // // .update-btn {

// // // // // // //     width: 100%;

// // // // // // //     padding: 15px;

// // // // // // //     margin-top: 30px;

// // // // // // //     border: none;

// // // // // // //     border-radius: 12px;

// // // // // // //     background:
// // // // // // //         linear-gradient(
// // // // // // //             135deg,
// // // // // // //             #2563eb,
// // // // // // //             #1d4ed8
// // // // // // //         );

// // // // // // //     color: white;

// // // // // // //     font-size: 17px;

// // // // // // //     font-weight: 700;

// // // // // // //     cursor: pointer;

// // // // // // //     transition: .2s;

// // // // // // // }


// // // // // // // .update-btn:hover {

// // // // // // //     transform: translateY(-1px);

// // // // // // //     box-shadow:
// // // // // // //         0 8px 20px
// // // // // // //         rgba(37,99,235,.25);

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    BACK BUTTON
// // // // // // // ========================= */

// // // // // // // .back {

// // // // // // //     display: block;

// // // // // // //     text-align: center;

// // // // // // //     margin-top: 18px;

// // // // // // //     padding: 12px;

// // // // // // //     border-radius: 10px;

// // // // // // //     background: #f1f5f9;

// // // // // // //     color: #1e40af;

// // // // // // //     text-decoration: none;

// // // // // // //     font-weight: 700;

// // // // // // // }


// // // // // // // .back:hover {

// // // // // // //     background: #e2e8f0;

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    MOBILE
// // // // // // // ========================= */

// // // // // // // @media (max-width: 700px) {

// // // // // // //     body {

// // // // // // //         padding: 10px;

// // // // // // //     }


// // // // // // //     .container {

// // // // // // //         padding: 18px;

// // // // // // //         border-radius: 16px;

// // // // // // //     }


// // // // // // //     .header h2 {

// // // // // // //         font-size: 22px;

// // // // // // //     }


// // // // // // //     .form-grid {

// // // // // // //         grid-template-columns: 1fr;

// // // // // // //         gap: 15px;

// // // // // // //     }


// // // // // // //     .form-group.full {

// // // // // // //         grid-column: auto;

// // // // // // //     }


// // // // // // //     .image-grid {

// // // // // // //         grid-template-columns:
// // // // // // //             repeat(2, 1fr);

// // // // // // //     }


// // // // // // //     .image-card img {

// // // // // // //         height: 120px;

// // // // // // //     }


// // // // // // //     .composition-row {

// // // // // // //         gap: 7px;

// // // // // // //     }

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    SMALL MOBILE
// // // // // // // ========================= */

// // // // // // // @media (max-width: 400px) {

// // // // // // //     .container {

// // // // // // //         padding: 14px;

// // // // // // //     }


// // // // // // //     input,
// // // // // // //     select,
// // // // // // //     textarea {

// // // // // // //         font-size: 14px;

// // // // // // //         padding: 11px;

// // // // // // //     }


// // // // // // //     .image-grid {

// // // // // // //         grid-template-columns: 1fr 1fr;

// // // // // // //         gap: 8px;

// // // // // // //     }


// // // // // // //     .image-card img {

// // // // // // //         height: 100px;

// // // // // // //     }

// // // // // // // }

// // // // // // // </style>

// // // // // // // </head>


// // // // // // // <body>


// // // // // // // <div class="container">


// // // // // // //     <!-- =========================
// // // // // // //          HEADER
// // // // // // //     ========================== -->

// // // // // // //     <div class="header">

// // // // // // //         <h2>✏️ Edit Pharma Product</h2>

// // // // // // //         <p>
// // // // // // //             Update product information and images
// // // // // // //         </p>

// // // // // // //     </div>


// // // // // // //     <!-- =========================
// // // // // // //          FORM
// // // // // // //     ========================== -->

// // // // // // //     <form

// // // // // // //         action="/admin/edit-product/${product._id}"

// // // // // // //         method="POST"

// // // // // // //         enctype="multipart/form-data"
// // // // // // //     >


// // // // // // //         <!-- =========================
// // // // // // //              BASIC INFORMATION
// // // // // // //         ========================== -->

// // // // // // //         <div class="form-grid">


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Product Name *
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     name="name"
// // // // // // //                     value="${product.name || ""}"
// // // // // // //                     required
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Brand Name
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     name="brand"
// // // // // // //                     value="${product.brand || ""}"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Category
// // // // // // //                 </label>

// // // // // // //                 <select name="category">

// // // // // // //                     <option value="">
// // // // // // //                         Select Category
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Tablet"
// // // // // // //                         ${product.category === "Tablet" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Tablet
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Capsule"
// // // // // // //                         ${product.category === "Capsule" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Capsule
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Syrup"
// // // // // // //                         ${product.category === "Syrup" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Syrup
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Drops"
// // // // // // //                         ${product.category === "Drops" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Drops
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Injection"
// // // // // // //                         ${product.category === "Injection" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Injection
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Cream"
// // // // // // //                         ${product.category === "Cream" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Cream
// // // // // // //                     </option>

// // // // // // //                     <option
// // // // // // //                         value="Other"
// // // // // // //                         ${product.category === "Other" ? "selected" : ""}
// // // // // // //                     >
// // // // // // //                         Other
// // // // // // //                     </option>

// // // // // // //                 </select>

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Manufacturer
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     name="manufacturer"
// // // // // // //                     value="${product.manufacturer || ""}"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     MRP
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="number"
// // // // // // //                     name="mrp"
// // // // // // //                     value="${product.mrp ?? ""}"
// // // // // // //                     min="0"
// // // // // // //                     step="0.01"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Selling Price *
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="number"
// // // // // // //                     name="price"
// // // // // // //                     value="${product.price ?? ""}"
// // // // // // //                     min="0"
// // // // // // //                     step="0.01"
// // // // // // //                     required
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Stock Quantity
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="number"
// // // // // // //                     name="stock"
// // // // // // //                     value="${product.stock ?? ""}"
// // // // // // //                     min="0"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Pack Size
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     name="packSize"
// // // // // // //                     value="${product.packSize || ""}"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Batch Number
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     name="batchNo"
// // // // // // //                     value="${product.batchNo || ""}"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Manufacturing Date
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="date"
// // // // // // //                     name="mfgDate"
// // // // // // //                     value="${
// // // // // // //                         product.mfgDate
// // // // // // //                             ? new Date(product.mfgDate)
// // // // // // //                                 .toISOString()
// // // // // // //                                 .split("T")[0]
// // // // // // //                             : ""
// // // // // // //                     }"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <div class="form-group">

// // // // // // //                 <label>
// // // // // // //                     Expiry Date
// // // // // // //                 </label>

// // // // // // //                 <input
// // // // // // //                     type="date"
// // // // // // //                     name="expDate"
// // // // // // //                     value="${
// // // // // // //                         product.expDate
// // // // // // //                             ? new Date(product.expDate)
// // // // // // //                                 .toISOString()
// // // // // // //                                 .split("T")[0]
// // // // // // //                             : ""
// // // // // // //                     }"
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //         </div>


// // // // // // //         <!-- =========================
// // // // // // //              COMPOSITION
// // // // // // //         ========================== -->

// // // // // // //         <div class="section">

// // // // // // //             <div class="section-title">

// // // // // // //                 💊 Composition

// // // // // // //             </div>


// // // // // // //             <div id="compositionBox">

// // // // // // //                 ${compositions.map((item, index) => `

// // // // // // //                     <div class="composition-row">

// // // // // // //                         <input
// // // // // // //                             type="text"
// // // // // // //                             name="composition[]"
// // // // // // //                             value="${item || ""}"
// // // // // // //                             placeholder="Composition ${index + 1}"
// // // // // // //                         >

// // // // // // //                         ${
// // // // // // //                             index > 0
// // // // // // //                             ? `
// // // // // // //                             <button
// // // // // // //                                 type="button"
// // // // // // //                                 class="remove-btn"
// // // // // // //                                 onclick="this.parentElement.remove()"
// // // // // // //                             >
// // // // // // //                                 ×
// // // // // // //                             </button>
// // // // // // //                             `
// // // // // // //                             : ""
// // // // // // //                         }

// // // // // // //                     </div>

// // // // // // //                 `).join("")}

// // // // // // //             </div>


// // // // // // //             <button
// // // // // // //                 type="button"
// // // // // // //                 class="add-btn"
// // // // // // //                 onclick="addComposition()"
// // // // // // //             >
// // // // // // //                 + Add Composition
// // // // // // //             </button>

// // // // // // //         </div>


// // // // // // //         <!-- =========================
// // // // // // //              PRODUCT DETAILS
// // // // // // //         ========================== -->

// // // // // // //         <div class="section">

// // // // // // //             <div class="section-title">

// // // // // // //                 📋 Product Details

// // // // // // //             </div>


// // // // // // //             <div class="form-grid">


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Uses
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="uses"
// // // // // // //                         placeholder="Uses"
// // // // // // //                     >${product.uses || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Benefits
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="benefits"
// // // // // // //                         placeholder="Benefits"
// // // // // // //                     >${product.benefits || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Dosage
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="dosage"
// // // // // // //                         placeholder="Dosage"
// // // // // // //                     >${product.dosage || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Side Effects
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="sideEffects"
// // // // // // //                         placeholder="Side Effects"
// // // // // // //                     >${product.sideEffects || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Storage Instructions
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="storage"
// // // // // // //                         placeholder="Storage Instructions"
// // // // // // //                     >${product.storage || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //                 <div class="form-group full">

// // // // // // //                     <label>
// // // // // // //                         Full Description
// // // // // // //                     </label>

// // // // // // //                     <textarea
// // // // // // //                         name="description"
// // // // // // //                         placeholder="Full Description"
// // // // // // //                     >${product.description || ""}</textarea>

// // // // // // //                 </div>


// // // // // // //             </div>

// // // // // // //         </div>


// // // // // // //         <!-- =========================
// // // // // // //              EXISTING IMAGES
// // // // // // //         ========================== -->

// // // // // // //         <div class="section">

// // // // // // //             <div class="section-title">

// // // // // // //                 🖼 Existing Product Images

// // // // // // //             </div>


// // // // // // //             ${
// // // // // // //                 images.length
// // // // // // //                 ?

// // // // // // //                 `<div class="image-grid">

// // // // // // //                     ${images.map((img, index) => `

// // // // // // //                         <div class="image-card">

// // // // // // //                             <img
// // // // // // //                                 src="${img}"
// // // // // // //                                 alt="Product Image ${index + 1}"
// // // // // // //                             >

// // // // // // //                             <div class="image-number">

// // // // // // //                                 Image ${index + 1}

// // // // // // //                             </div>

// // // // // // //                         </div>

// // // // // // //                     `).join("")}

// // // // // // //                 </div>`

// // // // // // //                 :

// // // // // // //                 `<div class="no-image">

// // // // // // //                     No existing product image

// // // // // // //                 </div>`
// // // // // // //             }

// // // // // // //         </div>


// // // // // // //         <!-- =========================
// // // // // // //              NEW IMAGES
// // // // // // //         ========================== -->

// // // // // // //         <div class="section">

// // // // // // //             <div class="section-title">

// // // // // // //                 📷 Add New Product Images

// // // // // // //             </div>


// // // // // // //             <div id="imageBox">

// // // // // // //                 <input
// // // // // // //                     type="file"
// // // // // // //                     name="images"
// // // // // // //                     accept="image/*"
// // // // // // //                     multiple
// // // // // // //                 >

// // // // // // //             </div>


// // // // // // //             <p
// // // // // // //                 style="
// // // // // // //                     margin-top:8px;
// // // // // // //                     color:#64748b;
// // // // // // //                     font-size:13px;
// // // // // // //                 "
// // // // // // //             >
// // // // // // //                 You can select multiple new images.
// // // // // // //             </p>

// // // // // // //         </div>


// // // // // // //         <!-- =========================
// // // // // // //              UPDATE
// // // // // // //         ========================== -->

// // // // // // //         <button
// // // // // // //             type="submit"
// // // // // // //             class="update-btn"
// // // // // // //         >

// // // // // // //             💾 Update Product

// // // // // // //         </button>


// // // // // // //     </form>


// // // // // // //     <!-- =========================
// // // // // // //          BACK
// // // // // // //     ========================== -->

// // // // // // //     <a
// // // // // // //         href="/admin/manage-products"
// // // // // // //         class="back"
// // // // // // //     >

// // // // // // //         ⬅ Back to Manage Products

// // // // // // //     </a>


// // // // // // // </div>


// // // // // // // <script>


// // // // // // // /* =========================
// // // // // // //    ADD COMPOSITION
// // // // // // // ========================= */

// // // // // // // function addComposition() {

// // // // // // //     const box =
// // // // // // //         document.getElementById("compositionBox");


// // // // // // //     const row =
// // // // // // //         document.createElement("div");


// // // // // // //     row.className =
// // // // // // //         "composition-row";


// // // // // // //     row.innerHTML = \`

// // // // // // //         <input
// // // // // // //             type="text"
// // // // // // //             name="composition[]"
// // // // // // //             placeholder="Composition"
// // // // // // //         >

// // // // // // //         <button
// // // // // // //             type="button"
// // // // // // //             class="remove-btn"
// // // // // // //             onclick="this.parentElement.remove()"
// // // // // // //         >
// // // // // // //             ×
// // // // // // //         </button>

// // // // // // //     \`;


// // // // // // //     box.appendChild(row);

// // // // // // // }


// // // // // // // /* =========================
// // // // // // //    IMAGE VALIDATION
// // // // // // // ========================= */

// // // // // // // const imageInput =
// // // // // // //     document.querySelector(
// // // // // // //         'input[name="images"]'
// // // // // // //     );


// // // // // // // if (imageInput) {

// // // // // // //     imageInput.addEventListener(
// // // // // // //         "change",
// // // // // // //         function () {

// // // // // // //             const files =
// // // // // // //                 this.files;


// // // // // // //             for (const file of files) {

// // // // // // //                 if (
// // // // // // //                     !file.type.startsWith("image/")
// // // // // // //                 ) {

// // // // // // //                     alert(
// // // // // // //                         "Please select only image files."
// // // // // // //                     );

// // // // // // //                     this.value = "";

// // // // // // //                     return;

// // // // // // //                 }

// // // // // // //             }

// // // // // // //         }
// // // // // // //     );

// // // // // // // }

// // // // // // // </script>


// // // // // // // </body>

// // // // // // // </html>

// // // // // // // `;

// // // // // // // }


// // // // // // // module.exports = EditProduct;



// // // // // // function EditProduct(product) {

// // // // // //     // =========================
// // // // // //     // SAFE HTML ESCAPE
// // // // // //     // =========================

// // // // // //     const escapeHTML = (value) => {
// // // // // //         if (value === null || value === undefined) return "";

// // // // // //         return String(value)
// // // // // //             .replace(/&/g, "&amp;")
// // // // // //             .replace(/</g, "&lt;")
// // // // // //             .replace(/>/g, "&gt;")
// // // // // //             .replace(/"/g, "&quot;")
// // // // // //             .replace(/'/g, "&#039;");
// // // // // //     };


// // // // // //     // =========================
// // // // // //     // DATE FORMAT
// // // // // //     // =========================

// // // // // //     const formatDate = (value) => {

// // // // // //         if (!value) return "";

// // // // // //         try {

// // // // // //             const date = new Date(value);

// // // // // //             if (isNaN(date.getTime())) {
// // // // // //                 return "";
// // // // // //             }

// // // // // //             return date.toISOString().split("T")[0];

// // // // // //         } catch (error) {

// // // // // //             return "";

// // // // // //         }

// // // // // //     };


// // // // // //     // =========================
// // // // // //     // COMPOSITION
// // // // // //     // =========================

// // // // // //     let compositions = [];

// // // // // //     if (Array.isArray(product.composition)) {

// // // // // //         compositions = product.composition
// // // // // //             .filter(item => item !== null && item !== undefined)
// // // // // //             .map(item => {

// // // // // //                 // अगर composition object है
// // // // // //                 if (typeof item === "object") {

// // // // // //                     if (item.name && item.strength) {
// // // // // //                         return `${item.name} ${item.strength}`;
// // // // // //                     }

// // // // // //                     if (item.name) {
// // // // // //                         return item.name;
// // // // // //                     }

// // // // // //                     return "";
// // // // // //                 }

// // // // // //                 return String(item);

// // // // // //             });

// // // // // //     } else if (product.composition) {

// // // // // //         compositions = [String(product.composition)];

// // // // // //     }


// // // // // //     if (!compositions.length) {
// // // // // //         compositions = [""];
// // // // // //     }


// // // // // //     // =========================
// // // // // //     // IMAGES
// // // // // //     // =========================

// // // // // //     let images = [];

// // // // // //     if (Array.isArray(product.images)) {

// // // // // //         images = product.images.filter(Boolean);

// // // // // //     }


// // // // // //     // पुराने database में image field है
// // // // // //     if (product.image && !images.includes(product.image)) {

// // // // // //         images.unshift(product.image);

// // // // // //     }


// // // // // //     // Remove duplicate images
// // // // // //     images = [...new Set(images)];


// // // // // //     // =========================
// // // // // //     // IMAGE URL CLEANER
// // // // // //     // =========================

// // // // // //     const cleanImageUrl = (url) => {

// // // // // //         if (!url) return "";

// // // // // //         let clean = String(url).trim();

// // // // // //         // Markdown format:
// // // // // //         // [https://example.com/image.jpg](https://example.com/image.jpg)

// // // // // //         const markdownMatch =
// // // // // //             clean.match(/\]\((https?:\/\/[^)]+)\)/);

// // // // // //         if (markdownMatch) {

// // // // // //             return markdownMatch[1];

// // // // // //         }


// // // // // //         // [https://example.com/image.jpg]
// // // // // //         if (
// // // // // //             clean.startsWith("[") &&
// // // // // //             clean.endsWith("]")
// // // // // //         ) {

// // // // // //             clean = clean.slice(1, -1);

// // // // // //         }

// // // // // //         return clean;

// // // // // //     };


// // // // // //     images = images
// // // // // //         .map(cleanImageUrl)
// // // // // //         .filter(Boolean);


// // // // // //     return `

// // // // // // <style>

// // // // // // *{
// // // // // //     box-sizing:border-box;
// // // // // // }

// // // // // // body{
// // // // // //     margin:0;
// // // // // //     font-family:Segoe UI,Arial,sans-serif;
// // // // // //     background:#f1f5f9;
// // // // // //     color:#1e293b;
// // // // // // }

// // // // // // .edit-product-page{
// // // // // //     width:100%;
// // // // // //     max-width:1100px;
// // // // // //     margin:0 auto;
// // // // // //     padding:20px;
// // // // // // }


// // // // // // /* =========================
// // // // // //    HEADER
// // // // // // ========================= */

// // // // // // .header{

// // // // // //     background:linear-gradient(
// // // // // //         135deg,
// // // // // //         #2563eb,
// // // // // //         #1d4ed8
// // // // // //     );

// // // // // //     color:white;

// // // // // //     padding:25px;

// // // // // //     border-radius:18px;

// // // // // //     margin-bottom:20px;

// // // // // //     box-shadow:
// // // // // //         0 10px 30px
// // // // // //         rgba(37,99,235,.20);

// // // // // // }

// // // // // // .header h2{

// // // // // //     margin:0 0 7px;

// // // // // //     font-size:26px;

// // // // // // }

// // // // // // .header p{

// // // // // //     margin:0;

// // // // // //     opacity:.9;

// // // // // //     font-size:14px;

// // // // // // }


// // // // // // /* =========================
// // // // // //    FORM
// // // // // // ========================= */

// // // // // // .product-form{

// // // // // //     background:white;

// // // // // //     padding:25px;

// // // // // //     border-radius:18px;

// // // // // //     box-shadow:
// // // // // //         0 8px 25px
// // // // // //         rgba(15,23,42,.08);

// // // // // // }


// // // // // // /* =========================
// // // // // //    GRID
// // // // // // ========================= */

// // // // // // .form-grid{

// // // // // //     display:grid;

// // // // // //     grid-template-columns:
// // // // // //         repeat(2,1fr);

// // // // // //     gap:18px;

// // // // // // }


// // // // // // /* =========================
// // // // // //    FORM GROUP
// // // // // // ========================= */

// // // // // // .form-group{

// // // // // //     display:flex;

// // // // // //     flex-direction:column;

// // // // // //     gap:7px;

// // // // // // }

// // // // // // .form-group.full{

// // // // // //     grid-column:1/-1;

// // // // // // }

// // // // // // .form-group label{

// // // // // //     font-size:14px;

// // // // // //     font-weight:700;

// // // // // //     color:#334155;

// // // // // // }


// // // // // // /* =========================
// // // // // //    INPUT
// // // // // // ========================= */

// // // // // // .form-group input,
// // // // // // .form-group select,
// // // // // // .form-group textarea{

// // // // // //     width:100%;

// // // // // //     border:1px solid #cbd5e1;

// // // // // //     border-radius:10px;

// // // // // //     padding:12px 13px;

// // // // // //     font-size:15px;

// // // // // //     outline:none;

// // // // // //     background:#fff;

// // // // // //     transition:.2s;

// // // // // // }

// // // // // // .form-group input:focus,
// // // // // // .form-group select:focus,
// // // // // // .form-group textarea:focus{

// // // // // //     border-color:#2563eb;

// // // // // //     box-shadow:
// // // // // //         0 0 0 3px
// // // // // //         rgba(37,99,235,.10);

// // // // // // }

// // // // // // .form-group textarea{

// // // // // //     min-height:110px;

// // // // // //     resize:vertical;

// // // // // // }


// // // // // // /* =========================
// // // // // //    SECTION
// // // // // // ========================= */

// // // // // // .section{

// // // // // //     margin-top:28px;

// // // // // //     padding-top:22px;

// // // // // //     border-top:1px solid #e2e8f0;

// // // // // // }

// // // // // // .section-title{

// // // // // //     font-size:19px;

// // // // // //     font-weight:800;

// // // // // //     color:#1e3a8a;

// // // // // //     margin-bottom:15px;

// // // // // // }


// // // // // // /* =========================
// // // // // //    COMPOSITION
// // // // // // ========================= */

// // // // // // .composition-row{

// // // // // //     display:grid;

// // // // // //     grid-template-columns:
// // // // // //         1fr auto;

// // // // // //     gap:10px;

// // // // // //     margin-bottom:10px;

// // // // // // }

// // // // // // .composition-row input{

// // // // // //     width:100%;

// // // // // //     padding:12px;

// // // // // //     border:1px solid #cbd5e1;

// // // // // //     border-radius:10px;

// // // // // //     font-size:14px;

// // // // // //     outline:none;

// // // // // // }

// // // // // // .composition-row input:focus{

// // // // // //     border-color:#2563eb;

// // // // // // }

// // // // // // .remove-btn{

// // // // // //     width:45px;

// // // // // //     border:none;

// // // // // //     border-radius:9px;

// // // // // //     background:#dc2626;

// // // // // //     color:white;

// // // // // //     font-size:22px;

// // // // // //     cursor:pointer;

// // // // // // }

// // // // // // .remove-btn:hover{

// // // // // //     background:#b91c1c;

// // // // // // }

// // // // // // .add-btn{

// // // // // //     border:none;

// // // // // //     background:#2563eb;

// // // // // //     color:white;

// // // // // //     padding:11px 17px;

// // // // // //     border-radius:9px;

// // // // // //     font-weight:700;

// // // // // //     cursor:pointer;

// // // // // // }

// // // // // // .add-btn:hover{

// // // // // //     background:#1d4ed8;

// // // // // // }


// // // // // // /* =========================
// // // // // //    EXISTING IMAGES
// // // // // // ========================= */

// // // // // // .image-grid{

// // // // // //     display:grid;

// // // // // //     grid-template-columns:
// // // // // //         repeat(4,1fr);

// // // // // //     gap:15px;

// // // // // // }

// // // // // // .image-card{

// // // // // //     border:1px solid #e2e8f0;

// // // // // //     border-radius:12px;

// // // // // //     overflow:hidden;

// // // // // //     background:#f8fafc;

// // // // // // }

// // // // // // .image-card img{

// // // // // //     width:100%;

// // // // // //     height:160px;

// // // // // //     display:block;

// // // // // //     object-fit:contain;

// // // // // //     background:#fff;

// // // // // // }

// // // // // // .image-number{

// // // // // //     padding:8px;

// // // // // //     text-align:center;

// // // // // //     font-size:13px;

// // // // // //     font-weight:600;

// // // // // //     color:#475569;

// // // // // // }

// // // // // // .no-image{

// // // // // //     padding:20px;

// // // // // //     background:#f8fafc;

// // // // // //     border:1px dashed #cbd5e1;

// // // // // //     border-radius:10px;

// // // // // //     text-align:center;

// // // // // //     color:#64748b;

// // // // // // }


// // // // // // /* =========================
// // // // // //    FILE INPUT
// // // // // // ========================= */

// // // // // // input[type="file"]{

// // // // // //     padding:10px;

// // // // // //     background:#f8fafc;

// // // // // //     cursor:pointer;

// // // // // // }


// // // // // // /* =========================
// // // // // //    UPDATE BUTTON
// // // // // // ========================= */

// // // // // // .update-btn{

// // // // // //     width:100%;

// // // // // //     margin-top:30px;

// // // // // //     padding:15px;

// // // // // //     border:none;

// // // // // //     border-radius:12px;

// // // // // //     background:
// // // // // //         linear-gradient(
// // // // // //             135deg,
// // // // // //             #2563eb,
// // // // // //             #1d4ed8
// // // // // //         );

// // // // // //     color:white;

// // // // // //     font-size:17px;

// // // // // //     font-weight:800;

// // // // // //     cursor:pointer;

// // // // // //     box-shadow:
// // // // // //         0 8px 20px
// // // // // //         rgba(37,99,235,.20);

// // // // // // }

// // // // // // .update-btn:hover{

// // // // // //     transform:translateY(-1px);

// // // // // // }


// // // // // // /* =========================
// // // // // //    BACK BUTTON
// // // // // // ========================= */

// // // // // // .back{

// // // // // //     display:block;

// // // // // //     width:max-content;

// // // // // //     margin:20px auto;

// // // // // //     text-decoration:none;

// // // // // //     color:#2563eb;

// // // // // //     font-weight:700;

// // // // // // }


// // // // // // /* =========================
// // // // // //    MOBILE
// // // // // // ========================= */

// // // // // // @media(max-width:700px){

// // // // // //     .edit-product-page{

// // // // // //         padding:10px;

// // // // // //     }

// // // // // //     .header{

// // // // // //         padding:20px;

// // // // // //         border-radius:14px;

// // // // // //     }

// // // // // //     .header h2{

// // // // // //         font-size:21px;

// // // // // //     }

// // // // // //     .product-form{

// // // // // //         padding:16px;

// // // // // //         border-radius:14px;

// // // // // //     }

// // // // // //     .form-grid{

// // // // // //         grid-template-columns:1fr;

// // // // // //     }

// // // // // //     .form-group.full{

// // // // // //         grid-column:auto;

// // // // // //     }

// // // // // //     .image-grid{

// // // // // //         grid-template-columns:
// // // // // //             repeat(2,1fr);

// // // // // //     }

// // // // // //     .image-card img{

// // // // // //         height:130px;

// // // // // //     }

// // // // // // }


// // // // // // /* =========================
// // // // // //    SMALL MOBILE
// // // // // // ========================= */

// // // // // // @media(max-width:400px){

// // // // // //     .image-grid{

// // // // // //         grid-template-columns:1fr;

// // // // // //     }

// // // // // //     .image-card img{

// // // // // //         height:180px;

// // // // // //     }

// // // // // // }

// // // // // // </style>


// // // // // // <div class="edit-product-page">


// // // // // // <!-- =========================
// // // // // //      HEADER
// // // // // // ========================= -->

// // // // // // <div class="header">

// // // // // //     <h2>✏️ Edit Pharma Product</h2>

// // // // // //     <p>
// // // // // //         Update product information and images
// // // // // //     </p>

// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      FORM
// // // // // // ========================= -->

// // // // // // <form
// // // // // //     class="product-form"
// // // // // //     action="/admin/edit-product/${escapeHTML(product._id)}"
// // // // // //     method="POST"
// // // // // //     enctype="multipart/form-data"
// // // // // // >


// // // // // // <!-- =========================
// // // // // //      BASIC INFORMATION
// // // // // // ========================= -->

// // // // // // <div class="form-grid">


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Product Name *
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="name"
// // // // // //             value="${escapeHTML(product.name)}"
// // // // // //             required
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Brand Name
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="brand"
// // // // // //             value="${escapeHTML(product.brand)}"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Category
// // // // // //         </label>

// // // // // //         <select name="category">

// // // // // //             <option value="">
// // // // // //                 Select Category
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Tablet"
// // // // // //                 ${product.category === "Tablet" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Tablet
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Capsule"
// // // // // //                 ${product.category === "Capsule" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Capsule
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Syrup"
// // // // // //                 ${product.category === "Syrup" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Syrup
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Drops"
// // // // // //                 ${product.category === "Drops" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Drops
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Injection"
// // // // // //                 ${product.category === "Injection" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Injection
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Cream"
// // // // // //                 ${product.category === "Cream" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Cream
// // // // // //             </option>

// // // // // //             <option
// // // // // //                 value="Other"
// // // // // //                 ${product.category === "Other" ? "selected" : ""}
// // // // // //             >
// // // // // //                 Other
// // // // // //             </option>

// // // // // //         </select>

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Manufacturer
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="manufacturer"
// // // // // //             value="${escapeHTML(product.manufacturer)}"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             MRP ₹
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="number"
// // // // // //             name="mrp"
// // // // // //             value="${product.mrp ?? ""}"
// // // // // //             min="0"
// // // // // //             step="0.01"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Selling Price ₹ *
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="number"
// // // // // //             name="price"
// // // // // //             value="${product.price ?? ""}"
// // // // // //             min="0"
// // // // // //             step="0.01"
// // // // // //             required
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Stock Quantity
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="number"
// // // // // //             name="stock"
// // // // // //             value="${product.stock ?? 0}"
// // // // // //             min="0"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Pack Size
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="packSize"
// // // // // //             value="${escapeHTML(product.packSize)}"
// // // // // //             placeholder="e.g. 200 ml"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Batch Number
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="batchNo"
// // // // // //             value="${escapeHTML(product.batchNo)}"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Manufacturing Date
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="date"
// // // // // //             name="mfgDate"
// // // // // //             value="${formatDate(product.mfgDate)}"
// // // // // //         >

// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Expiry Date
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="date"
// // // // // //             name="expDate"
// // // // // //             value="${formatDate(product.expDate)}"
// // // // // //         >

// // // // // //     </div>


// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      COMPOSITION
// // // // // // ========================= -->

// // // // // // <div class="section">

// // // // // //     <div class="section-title">
// // // // // //         💊 Composition
// // // // // //     </div>


// // // // // //     <div id="compositionBox">

// // // // // //         ${compositions.map((item, index) => `

// // // // // //             <div class="composition-row">

// // // // // //                 <input
// // // // // //                     type="text"
// // // // // //                     name="composition[]"
// // // // // //                     value="${escapeHTML(item)}"
// // // // // //                     placeholder="Composition ${index + 1}"
// // // // // //                 >

// // // // // //                 ${
// // // // // //                     index > 0
// // // // // //                     ? `
// // // // // //                     <button
// // // // // //                         type="button"
// // // // // //                         class="remove-btn"
// // // // // //                         onclick="removeComposition(this)"
// // // // // //                     >
// // // // // //                         ×
// // // // // //                     </button>
// // // // // //                     `
// // // // // //                     : `
// // // // // //                     <button
// // // // // //                         type="button"
// // // // // //                         class="remove-btn"
// // // // // //                         onclick="removeComposition(this)"
// // // // // //                         style="visibility:hidden"
// // // // // //                     >
// // // // // //                         ×
// // // // // //                     </button>
// // // // // //                     `
// // // // // //                 }

// // // // // //             </div>

// // // // // //         `).join("")}

// // // // // //     </div>


// // // // // //     <button
// // // // // //         type="button"
// // // // // //         class="add-btn"
// // // // // //         onclick="addComposition()"
// // // // // //     >
// // // // // //         + Add Composition
// // // // // //     </button>

// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      PRODUCT DETAILS
// // // // // // ========================= -->

// // // // // // <div class="section">

// // // // // //     <div class="section-title">
// // // // // //         📋 Product Details
// // // // // //     </div>


// // // // // //     <div class="form-grid">


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Uses
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="uses"
// // // // // //                 placeholder="Enter product uses"
// // // // // //             >${escapeHTML(product.uses)}</textarea>

// // // // // //         </div>


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Benefits
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="benefits"
// // // // // //                 placeholder="Enter product benefits"
// // // // // //             >${escapeHTML(product.benefits)}</textarea>

// // // // // //         </div>


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Dosage
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="dosage"
// // // // // //                 placeholder="Enter dosage"
// // // // // //             >${escapeHTML(product.dosage)}</textarea>

// // // // // //         </div>


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Side Effects
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="sideEffects"
// // // // // //                 placeholder="Enter side effects"
// // // // // //             >${escapeHTML(product.sideEffects)}</textarea>

// // // // // //         </div>


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Storage Instructions
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="storage"
// // // // // //                 placeholder="Enter storage instructions"
// // // // // //             >${escapeHTML(product.storage)}</textarea>

// // // // // //         </div>


// // // // // //         <div class="form-group full">

// // // // // //             <label>
// // // // // //                 Full Description
// // // // // //             </label>

// // // // // //             <textarea
// // // // // //                 name="description"
// // // // // //                 placeholder="Enter full product description"
// // // // // //             >${escapeHTML(product.description)}</textarea>

// // // // // //         </div>


// // // // // //     </div>

// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      EXISTING IMAGES
// // // // // // ========================= -->

// // // // // // <div class="section">

// // // // // //     <div class="section-title">
// // // // // //         🖼 Existing Product Images
// // // // // //     </div>


// // // // // //     ${
// // // // // //         images.length

// // // // // //         ?

// // // // // //         `<div class="image-grid">

// // // // // //             ${images.map((img, index) => {

// // // // // //                 const safeImg = cleanImageUrl(img);

// // // // // //                 return `

// // // // // //                     <div class="image-card">

// // // // // //                         <img
// // // // // //                             src="${escapeHTML(safeImg)}"
// // // // // //                             alt="Product Image ${index + 1}"
// // // // // //                             loading="lazy"
// // // // // //                             onerror="this.style.display='none'"
// // // // // //                         >

// // // // // //                         <div class="image-number">
// // // // // //                             Image ${index + 1}
// // // // // //                         </div>

// // // // // //                     </div>

// // // // // //                 `;

// // // // // //             }).join("")}

// // // // // //         </div>`

// // // // // //         :

// // // // // //         `<div class="no-image">
// // // // // //             No existing product image
// // // // // //         </div>`
// // // // // //     }

// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      NEW IMAGES
// // // // // // ========================= -->

// // // // // // <div class="section">

// // // // // //     <div class="section-title">
// // // // // //         📷 Add New Product Images
// // // // // //     </div>


// // // // // //     <div class="form-group">

// // // // // //         <label>
// // // // // //             Select New Images
// // // // // //         </label>

// // // // // //         <input
// // // // // //             type="file"
// // // // // //             name="images"
// // // // // //             accept="image/*"
// // // // // //             multiple
// // // // // //         >

// // // // // //     </div>


// // // // // //     <p
// // // // // //         style="
// // // // // //             margin-top:8px;
// // // // // //             color:#64748b;
// // // // // //             font-size:13px;
// // // // // //         "
// // // // // //     >
// // // // // //         You can select multiple new images.
// // // // // //     </p>

// // // // // // </div>


// // // // // // <!-- =========================
// // // // // //      UPDATE
// // // // // // ========================= -->

// // // // // // <button
// // // // // //     type="submit"
// // // // // //     class="update-btn"
// // // // // // >
// // // // // //     💾 Update Product
// // // // // // </button>


// // // // // // </form>


// // // // // // <!-- =========================
// // // // // //      BACK
// // // // // // ========================= -->

// // // // // // <a
// // // // // //     href="/admin/manage-products"
// // // // // //     class="back"
// // // // // // >
// // // // // //     ⬅ Back to Manage Products
// // // // // // </a>


// // // // // // </div>


// // // // // // <script>

// // // // // // function addComposition(){

// // // // // //     const box =
// // // // // //         document.getElementById("compositionBox");

// // // // // //     if(!box) return;


// // // // // //     const row =
// // // // // //         document.createElement("div");

// // // // // //     row.className =
// // // // // //         "composition-row";


// // // // // //     row.innerHTML = \`

// // // // // //         <input
// // // // // //             type="text"
// // // // // //             name="composition[]"
// // // // // //             placeholder="Composition"
// // // // // //         >

// // // // // //         <button
// // // // // //             type="button"
// // // // // //             class="remove-btn"
// // // // // //             onclick="removeComposition(this)"
// // // // // //         >
// // // // // //             ×
// // // // // //         </button>

// // // // // //     \`;


// // // // // //     box.appendChild(row);

// // // // // // }


// // // // // // function removeComposition(button){

// // // // // //     if(!button) return;


// // // // // //     const box =
// // // // // //         document.getElementById("compositionBox");

// // // // // //     const rows =
// // // // // //         box.querySelectorAll(".composition-row");


// // // // // //     if(rows.length > 1){

// // // // // //         button
// // // // // //             .parentElement
// // // // // //             .remove();

// // // // // //     }

// // // // // // }

// // // // // // </script>

// // // // // // `;
// // // // // // }


// // // // // // module.exports = EditProduct;


// // // // // function EditProduct(product) {

// // // // //     // =========================
// // // // //     // SAFE HTML ESCAPE
// // // // //     // =========================

// // // // //     const escapeHTML = (value) => {

// // // // //         if (value === null || value === undefined) {
// // // // //             return "";
// // // // //         }

// // // // //         return String(value)
// // // // //             .replace(/&/g, "&amp;")
// // // // //             .replace(/</g, "&lt;")
// // // // //             .replace(/>/g, "&gt;")
// // // // //             .replace(/"/g, "&quot;")
// // // // //             .replace(/'/g, "&#039;");
// // // // //     };


// // // // //     // =========================
// // // // //     // DATE FORMAT
// // // // //     // =========================

// // // // //     const formatDate = (value) => {

// // // // //         if (!value) {
// // // // //             return "";
// // // // //         }

// // // // //         try {

// // // // //             const date = new Date(value);

// // // // //             if (isNaN(date.getTime())) {
// // // // //                 return "";
// // // // //             }

// // // // //             return date.toISOString().split("T")[0];

// // // // //         } catch (error) {

// // // // //             return "";

// // // // //         }
// // // // //     };


// // // // //     // =========================
// // // // //     // COMPOSITION
// // // // //     // =========================

// // // // //     let compositions = [];

// // // // //     if (Array.isArray(product.composition)) {

// // // // //         compositions = product.composition
// // // // //             .filter(item => item !== null && item !== undefined)
// // // // //             .map(item => {

// // // // //                 // अगर composition object है
// // // // //                 if (typeof item === "object") {

// // // // //                     if (item.name && item.strength) {
// // // // //                         return `${item.name} ${item.strength}`;
// // // // //                     }

// // // // //                     if (item.name) {
// // // // //                         return item.name;
// // // // //                     }

// // // // //                     return "";
// // // // //                 }

// // // // //                 return String(item);
// // // // //             });

// // // // //     } else if (product.composition) {

// // // // //         compositions = [String(product.composition)];

// // // // //     }


// // // // //     if (!compositions.length) {
// // // // //         compositions = [""];
// // // // //     }


// // // // //     // =========================
// // // // //     // IMAGES
// // // // //     // =========================

// // // // //     let images = [];

// // // // //     if (Array.isArray(product.images)) {

// // // // //         images = product.images.filter(Boolean);

// // // // //     }


// // // // //     // पुराने database में image field
// // // // //     if (
// // // // //         product.image &&
// // // // //         !images.includes(product.image)
// // // // //     ) {

// // // // //         images.unshift(product.image);

// // // // //     }


// // // // //     // Duplicate remove
// // // // //     images = [...new Set(images)];


// // // // //     // =========================
// // // // //     // IMAGE URL CLEANER
// // // // //     // =========================

// // // // //     const cleanImageUrl = (url) => {

// // // // //         if (!url) {
// // // // //             return "";
// // // // //         }

// // // // //         let clean = String(url).trim();


// // // // //         // Markdown:
// // // // //         // [https://example.com/image.jpg](https://example.com/image.jpg)

// // // // //         const markdownMatch =
// // // // //             clean.match(/\]\((https?:\/\/[^)]+)\)/);

// // // // //         if (markdownMatch) {

// // // // //             return markdownMatch[1];

// // // // //         }


// // // // //         // [https://example.com/image.jpg]

// // // // //         if (
// // // // //             clean.startsWith("[") &&
// // // // //             clean.endsWith("]")
// // // // //         ) {

// // // // //             clean = clean.slice(1, -1);

// // // // //         }


// // // // //         // अगर URL के आगे/पीछे quotes हैं
// // // // //         clean = clean.replace(/^["']|["']$/g, "");

// // // // //         return clean;
// // // // //     };


// // // // //     images = images
// // // // //         .map(cleanImageUrl)
// // // // //         .filter(Boolean);


// // // // //     // =========================
// // // // //     // CATEGORY
// // // // //     // =========================

// // // // //     const categories = [
// // // // //         "Tablet",
// // // // //         "Capsule",
// // // // //         "Syrup",
// // // // //         "Drops",
// // // // //         "Injection",
// // // // //         "Cream",
// // // // //         "Ointment",
// // // // //         "Gel",
// // // // //         "Powder",
// // // // //         "Suspension",
// // // // //         "Solution",
// // // // //         "Other"
// // // // //     ];


// // // // //     // =========================
// // // // //     // RETURN HTML
// // // // //     // =========================

// // // // //     return `

// // // // // <!DOCTYPE html>

// // // // // <html lang="en">

// // // // // <head>

// // // // //     <meta charset="UTF-8">

// // // // //     <meta
// // // // //         name="viewport"
// // // // //         content="width=device-width, initial-scale=1.0"
// // // // //     >

// // // // //     <title>Edit Pharma Product</title>


// // // // //     <style>

// // // // //         /* =========================
// // // // //            RESET
// // // // //         ========================= */

// // // // //         * {
// // // // //             margin: 0;
// // // // //             padding: 0;
// // // // //             box-sizing: border-box;
// // // // //             font-family:
// // // // //                 "Segoe UI",
// // // // //                 Arial,
// // // // //                 sans-serif;
// // // // //         }


// // // // //         /* =========================
// // // // //            BODY
// // // // //         ========================= */

// // // // //         body {

// // // // //             background:
// // // // //                 linear-gradient(
// // // // //                     135deg,
// // // // //                     #2563eb,
// // // // //                     #06b6d4
// // // // //                 );

// // // // //             min-height: 100vh;

// // // // //             padding: 30px 15px;

// // // // //         }


// // // // //         /* =========================
// // // // //            MAIN CONTAINER
// // // // //         ========================= */

// // // // //         .container {

// // // // //             width: 100%;

// // // // //             max-width: 1000px;

// // // // //             margin: auto;

// // // // //             background: #ffffff;

// // // // //             padding: 30px;

// // // // //             border-radius: 22px;

// // // // //             box-shadow:
// // // // //                 0 20px 50px
// // // // //                 rgba(0, 0, 0, .18);

// // // // //         }


// // // // //         /* =========================
// // // // //            HEADER
// // // // //         ========================= */

// // // // //         .header {

// // // // //             text-align: center;

// // // // //             margin-bottom: 30px;

// // // // //             padding-bottom: 20px;

// // // // //             border-bottom:
// // // // //                 1px solid #e5e7eb;

// // // // //         }


// // // // //         .header h2 {

// // // // //             color: #1e40af;

// // // // //             font-size: 28px;

// // // // //             margin-bottom: 6px;

// // // // //         }


// // // // //         .header p {

// // // // //             color: #64748b;

// // // // //             font-size: 14px;

// // // // //         }


// // // // //         /* =========================
// // // // //            FORM GRID
// // // // //         ========================= */

// // // // //         .form-grid {

// // // // //             display: grid;

// // // // //             grid-template-columns:
// // // // //                 repeat(2, 1fr);

// // // // //             gap: 18px;

// // // // //         }


// // // // //         /* =========================
// // // // //            FORM GROUP
// // // // //         ========================= */

// // // // //         .form-group {

// // // // //             display: flex;

// // // // //             flex-direction: column;

// // // // //         }


// // // // //         .form-group.full {

// // // // //             grid-column: 1 / -1;

// // // // //         }


// // // // //         label {

// // // // //             font-weight: 700;

// // // // //             color: #1e293b;

// // // // //             margin-bottom: 7px;

// // // // //             font-size: 14px;

// // // // //         }


// // // // //         /* =========================
// // // // //            INPUTS
// // // // //         ========================= */

// // // // //         input,
// // // // //         select,
// // // // //         textarea {

// // // // //             width: 100%;

// // // // //             padding: 12px 13px;

// // // // //             border:
// // // // //                 1px solid #d1d5db;

// // // // //             border-radius: 10px;

// // // // //             background: #fff;

// // // // //             color: #111827;

// // // // //             font-size: 15px;

// // // // //             outline: none;

// // // // //             transition: .2s;

// // // // //         }


// // // // //         input:focus,
// // // // //         select:focus,
// // // // //         textarea:focus {

// // // // //             border-color: #2563eb;

// // // // //             box-shadow:
// // // // //                 0 0 0 3px
// // // // //                 rgba(37, 99, 235, .10);

// // // // //         }


// // // // //         textarea {

// // // // //             min-height: 120px;

// // // // //             resize: vertical;

// // // // //         }


// // // // //         /* =========================
// // // // //            SECTION
// // // // //         ========================= */

// // // // //         .section {

// // // // //             margin-top: 30px;

// // // // //             padding-top: 24px;

// // // // //             border-top:
// // // // //                 1px solid #e5e7eb;

// // // // //         }


// // // // //         .section-title {

// // // // //             display: flex;

// // // // //             align-items: center;

// // // // //             gap: 8px;

// // // // //             margin-bottom: 16px;

// // // // //             color: #1e40af;

// // // // //             font-size: 19px;

// // // // //             font-weight: 700;

// // // // //         }


// // // // //         /* =========================
// // // // //            COMPOSITION
// // // // //         ========================= */

// // // // //         .composition-row {

// // // // //             display: flex;

// // // // //             gap: 10px;

// // // // //             margin-bottom: 10px;

// // // // //         }


// // // // //         .composition-row input {

// // // // //             flex: 1;

// // // // //         }


// // // // //         .remove-btn {

// // // // //             width: 45px;

// // // // //             min-width: 45px;

// // // // //             padding: 0;

// // // // //             margin: 0;

// // // // //             border: none;

// // // // //             border-radius: 9px;

// // // // //             background: #dc2626;

// // // // //             color: white;

// // // // //             font-size: 20px;

// // // // //             cursor: pointer;

// // // // //         }


// // // // //         .remove-btn:hover {

// // // // //             background: #b91c1c;

// // // // //         }


// // // // //         .add-btn {

// // // // //             width: auto;

// // // // //             padding: 11px 18px;

// // // // //             margin-top: 5px;

// // // // //             border: none;

// // // // //             border-radius: 9px;

// // // // //             background: #16a34a;

// // // // //             color: white;

// // // // //             font-weight: 700;

// // // // //             cursor: pointer;

// // // // //         }


// // // // //         .add-btn:hover {

// // // // //             background: #15803d;

// // // // //         }


// // // // //         /* =========================
// // // // //            EXISTING IMAGES
// // // // //         ========================= */

// // // // //         .image-grid {

// // // // //             display: grid;

// // // // //             grid-template-columns:
// // // // //                 repeat(4, 1fr);

// // // // //             gap: 15px;

// // // // //         }


// // // // //         .image-card {

// // // // //             position: relative;

// // // // //             border:
// // // // //                 1px solid #e5e7eb;

// // // // //             border-radius: 12px;

// // // // //             padding: 8px;

// // // // //             background: #f8fafc;

// // // // //             transition: .2s;

// // // // //         }


// // // // //         .image-card:hover {

// // // // //             transform: translateY(-2px);

// // // // //             box-shadow:
// // // // //                 0 8px 20px
// // // // //                 rgba(0, 0, 0, .08);

// // // // //         }


// // // // //         .image-card img {

// // // // //             width: 100%;

// // // // //             height: 140px;

// // // // //             object-fit: cover;

// // // // //             border-radius: 8px;

// // // // //             display: block;

// // // // //         }


// // // // //         .image-number {

// // // // //             text-align: center;

// // // // //             margin-top: 6px;

// // // // //             font-size: 12px;

// // // // //             color: #64748b;

// // // // //         }


// // // // //         /* =========================
// // // // //            NO IMAGE
// // // // //         ========================= */

// // // // //         .no-image {

// // // // //             padding: 30px;

// // // // //             text-align: center;

// // // // //             background: #f8fafc;

// // // // //             border-radius: 10px;

// // // // //             color: #64748b;

// // // // //             border:
// // // // //                 1px dashed #cbd5e1;

// // // // //         }


// // // // //         /* =========================
// // // // //            FILE INPUT
// // // // //         ========================= */

// // // // //         input[type="file"] {

// // // // //             padding: 10px;

// // // // //             background: #f8fafc;

// // // // //             cursor: pointer;

// // // // //         }


// // // // //         /* =========================
// // // // //            UPDATE BUTTON
// // // // //         ========================= */

// // // // //         .update-btn {

// // // // //             width: 100%;

// // // // //             padding: 15px;

// // // // //             margin-top: 30px;

// // // // //             border: none;

// // // // //             border-radius: 12px;

// // // // //             background:
// // // // //                 linear-gradient(
// // // // //                     135deg,
// // // // //                     #2563eb,
// // // // //                     #1d4ed8
// // // // //                 );

// // // // //             color: white;

// // // // //             font-size: 17px;

// // // // //             font-weight: 700;

// // // // //             cursor: pointer;

// // // // //             transition: .2s;

// // // // //         }


// // // // //         .update-btn:hover {

// // // // //             transform: translateY(-1px);

// // // // //             box-shadow:
// // // // //                 0 8px 20px
// // // // //                 rgba(37, 99, 235, .25);

// // // // //         }


// // // // //         .update-btn:active {

// // // // //             transform: scale(.99);

// // // // //         }


// // // // //         /* =========================
// // // // //            BACK BUTTON
// // // // //         ========================= */

// // // // //         .back {

// // // // //             display: block;

// // // // //             text-align: center;

// // // // //             margin-top: 18px;

// // // // //             padding: 12px;

// // // // //             border-radius: 10px;

// // // // //             background: #f1f5f9;

// // // // //             color: #1e40af;

// // // // //             text-decoration: none;

// // // // //             font-weight: 700;

// // // // //         }


// // // // //         .back:hover {

// // // // //             background: #e2e8f0;

// // // // //         }


// // // // //         /* =========================
// // // // //            REQUIRED STAR
// // // // //         ========================= */

// // // // //         .required {

// // // // //             color: #dc2626;

// // // // //         }


// // // // //         /* =========================
// // // // //            MOBILE
// // // // //         ========================= */

// // // // //         @media (max-width: 700px) {

// // // // //             body {

// // // // //                 padding: 10px;

// // // // //             }


// // // // //             .container {

// // // // //                 padding: 18px;

// // // // //                 border-radius: 16px;

// // // // //             }


// // // // //             .header {

// // // // //                 margin-bottom: 22px;

// // // // //             }


// // // // //             .header h2 {

// // // // //                 font-size: 22px;

// // // // //             }


// // // // //             .form-grid {

// // // // //                 grid-template-columns: 1fr;

// // // // //                 gap: 15px;

// // // // //             }


// // // // //             .form-group.full {

// // // // //                 grid-column: auto;

// // // // //             }


// // // // //             .image-grid {

// // // // //                 grid-template-columns:
// // // // //                     repeat(2, 1fr);

// // // // //             }


// // // // //             .image-card img {

// // // // //                 height: 120px;

// // // // //             }


// // // // //             .composition-row {

// // // // //                 gap: 7px;

// // // // //             }

// // // // //         }


// // // // //         /* =========================
// // // // //            SMALL MOBILE
// // // // //         ========================= */

// // // // //         @media (max-width: 400px) {

// // // // //             .container {

// // // // //                 padding: 14px;

// // // // //             }


// // // // //             input,
// // // // //             select,
// // // // //             textarea {

// // // // //                 font-size: 14px;

// // // // //                 padding: 11px;

// // // // //             }


// // // // //             .section-title {

// // // // //                 font-size: 17px;

// // // // //             }


// // // // //             .image-grid {

// // // // //                 grid-template-columns:
// // // // //                     1fr 1fr;

// // // // //                 gap: 8px;

// // // // //             }


// // // // //             .image-card img {

// // // // //                 height: 100px;

// // // // //             }


// // // // //             .composition-row {

// // // // //                 gap: 5px;

// // // // //             }


// // // // //             .remove-btn {

// // // // //                 width: 40px;

// // // // //                 min-width: 40px;

// // // // //             }

// // // // //         }

// // // // //     </style>

// // // // // </head>


// // // // // <body>


// // // // // <div class="container">


// // // // //     <!-- =========================
// // // // //          HEADER
// // // // //     ========================= -->

// // // // //     <div class="header">

// // // // //         <h2>
// // // // //             ✏️ Edit Pharma Product
// // // // //         </h2>

// // // // //         <p>
// // // // //             Update product information,
// // // // //             composition and images
// // // // //         </p>

// // // // //     </div>


// // // // //     <!-- =========================
// // // // //          FORM
// // // // //     ========================= -->

// // // // //     <form

// // // // //         action="/admin/edit-product/${escapeHTML(product._id)}"

// // // // //         method="POST"

// // // // //         enctype="multipart/form-data"

// // // // //         id="editProductForm"

// // // // //     >


// // // // //         <!-- =========================
// // // // //              BASIC INFORMATION
// // // // //         ========================= -->

// // // // //         <div class="form-grid">


// // // // //             <!-- Product Name -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Product Name
// // // // //                     <span class="required">*</span>
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="text"
// // // // //                     name="name"
// // // // //                     value="${escapeHTML(product.name)}"
// // // // //                     placeholder="Enter product name"
// // // // //                     required
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Brand -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Brand Name
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="text"
// // // // //                     name="brand"
// // // // //                     value="${escapeHTML(product.brand)}"
// // // // //                     placeholder="Enter brand name"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Category -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Category
// // // // //                 </label>

// // // // //                 <select name="category">

// // // // //                     <option value="">
// // // // //                         Select Category
// // // // //                     </option>

// // // // //                     ${categories.map(category => `

// // // // //                         <option
// // // // //                             value="${escapeHTML(category)}"
// // // // //                             ${
// // // // //                                 product.category === category
// // // // //                                 ? "selected"
// // // // //                                 : ""
// // // // //                             }
// // // // //                         >
// // // // //                             ${escapeHTML(category)}
// // // // //                         </option>

// // // // //                     `).join("")}

// // // // //                 </select>

// // // // //             </div>


// // // // //             <!-- Manufacturer -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Manufacturer
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="text"
// // // // //                     name="manufacturer"
// // // // //                     value="${escapeHTML(product.manufacturer)}"
// // // // //                     placeholder="Manufacturer name"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- MRP -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     MRP ₹
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="number"
// // // // //                     name="mrp"
// // // // //                     value="${product.mrp ?? ""}"
// // // // //                     min="0"
// // // // //                     step="0.01"
// // // // //                     placeholder="0.00"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Selling Price -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Selling Price ₹
// // // // //                     <span class="required">*</span>
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="number"
// // // // //                     name="price"
// // // // //                     value="${product.price ?? ""}"
// // // // //                     min="0"
// // // // //                     step="0.01"
// // // // //                     placeholder="0.00"
// // // // //                     required
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Stock -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Stock Quantity
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="number"
// // // // //                     name="stock"
// // // // //                     value="${product.stock ?? 0}"
// // // // //                     min="0"
// // // // //                     placeholder="0"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Pack Size -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Pack Size
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="text"
// // // // //                     name="packSize"
// // // // //                     value="${escapeHTML(product.packSize)}"
// // // // //                     placeholder="e.g. 200 ml"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Batch -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Batch Number
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="text"
// // // // //                     name="batchNo"
// // // // //                     value="${escapeHTML(product.batchNo)}"
// // // // //                     placeholder="Enter batch number"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Manufacturing Date -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Manufacturing Date
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="date"
// // // // //                     name="mfgDate"
// // // // //                     value="${formatDate(product.mfgDate)}"
// // // // //                 >

// // // // //             </div>


// // // // //             <!-- Expiry Date -->

// // // // //             <div class="form-group">

// // // // //                 <label>
// // // // //                     Expiry Date
// // // // //                 </label>

// // // // //                 <input
// // // // //                     type="date"
// // // // //                     name="expDate"
// // // // //                     value="${formatDate(product.expDate)}"
// // // // //                 >

// // // // //             </div>


// // // // //         </div>


// // // // //         <!-- =========================
// // // // //              COMPOSITION
// // // // //         ========================= -->

// // // // //         <div class="section">


// // // // //             <div class="section-title">
// // // // //                 💊 Composition
// // // // //             </div>


// // // // //             <div id="compositionBox">

// // // // //                 ${compositions.map((item, index) => `

// // // // //                     <div class="composition-row">

// // // // //                         <input
// // // // //                             type="text"
// // // // //                             name="composition[]"
// // // // //                             value="${escapeHTML(item)}"
// // // // //                             placeholder="Composition ${index + 1}"
// // // // //                         >


// // // // //                         <button

// // // // //                             type="button"

// // // // //                             class="remove-btn"

// // // // //                             onclick="removeComposition(this)"

// // // // //                             ${
// // // // //                                 index === 0
// // // // //                                 ? 'style="visibility:hidden"'
// // // // //                                 : ''
// // // // //                             }

// // // // //                         >
// // // // //                             ×
// // // // //                         </button>

// // // // //                     </div>

// // // // //                 `).join("")}

// // // // //             </div>


// // // // //             <button

// // // // //                 type="button"

// // // // //                 class="add-btn"

// // // // //                 onclick="addComposition()"

// // // // //             >
// // // // //                 + Add Composition
// // // // //             </button>


// // // // //         </div>


// // // // //         <!-- =========================
// // // // //              PRODUCT DETAILS
// // // // //         ========================= -->

// // // // //         <div class="section">


// // // // //             <div class="section-title">
// // // // //                 📋 Product Details
// // // // //             </div>


// // // // //             <div class="form-grid">


// // // // //                 <!-- Uses -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Uses
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="uses"
// // // // //                         placeholder="Enter product uses"
// // // // //                     >${escapeHTML(product.uses)}</textarea>

// // // // //                 </div>


// // // // //                 <!-- Benefits -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Benefits
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="benefits"
// // // // //                         placeholder="Enter product benefits"
// // // // //                     >${escapeHTML(product.benefits)}</textarea>

// // // // //                 </div>


// // // // //                 <!-- Dosage -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Dosage
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="dosage"
// // // // //                         placeholder="Enter dosage"
// // // // //                     >${escapeHTML(product.dosage)}</textarea>

// // // // //                 </div>


// // // // //                 <!-- Side Effects -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Side Effects
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="sideEffects"
// // // // //                         placeholder="Enter side effects"
// // // // //                     >${escapeHTML(product.sideEffects)}</textarea>

// // // // //                 </div>


// // // // //                 <!-- Storage -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Storage Instructions
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="storage"
// // // // //                         placeholder="Enter storage instructions"
// // // // //                     >${escapeHTML(product.storage)}</textarea>

// // // // //                 </div>


// // // // //                 <!-- Description -->

// // // // //                 <div class="form-group full">

// // // // //                     <label>
// // // // //                         Full Description
// // // // //                     </label>

// // // // //                     <textarea
// // // // //                         name="description"
// // // // //                         placeholder="Enter full product description"
// // // // //                     >${escapeHTML(product.description)}</textarea>

// // // // //                 </div>


// // // // //             </div>

// // // // //         </div>


// // // // //         <!-- =========================
// // // // //              EXISTING IMAGES
// // // // //         ========================= -->

// // // // //         <div class="section">


// // // // //             <div class="section-title">
// // // // //                 🖼 Existing Product Images
// // // // //             </div>


// // // // //             ${
// // // // //                 images.length

// // // // //                 ?

// // // // //                 `
// // // // //                 <div class="image-grid">

// // // // //                     ${images.map((img, index) => {

// // // // //                         const safeImg =
// // // // //                             cleanImageUrl(img);

// // // // //                         return `

// // // // //                             <div class="image-card">

// // // // //                                 <img

// // // // //                                     src="${escapeHTML(safeImg)}"

// // // // //                                     alt="Product Image ${index + 1}"

// // // // //                                     loading="lazy"

// // // // //                                     onerror="
// // // // //                                         this.style.display='none';
// // // // //                                         this.nextElementSibling.innerHTML='Image unavailable';
// // // // //                                     "

// // // // //                                 >


// // // // //                                 <div class="image-number">

// // // // //                                     Image ${index + 1}

// // // // //                                 </div>

// // // // //                             </div>

// // // // //                         `;

// // // // //                     }).join("")}

// // // // //                 </div>
// // // // //                 `

// // // // //                 :

// // // // //                 `
// // // // //                 <div class="no-image">

// // // // //                     🖼️ No existing product image

// // // // //                 </div>
// // // // //                 `
// // // // //             }


// // // // //         </div>


// // // // //         <!-- =========================
// // // // //              NEW IMAGES
// // // // //         ========================= -->

// // // // //         <div class="section">


// // // // //             <div class="section-title">
// // // // //                 📷 Add New Product Images
// // // // //             </div>


// // // // //             <div class="form-group">


// // // // //                 <label>
// // // // //                     Select New Images
// // // // //                 </label>


// // // // //                 <input

// // // // //                     type="file"

// // // // //                     name="images"

// // // // //                     accept="image/*"

// // // // //                     multiple

// // // // //                     id="imageInput"

// // // // //                 >


// // // // //             </div>


// // // // //             <p
// // // // //                 style="
// // // // //                     margin-top:8px;
// // // // //                     color:#64748b;
// // // // //                     font-size:13px;
// // // // //                 "
// // // // //             >
// // // // //                 You can select multiple new images.
// // // // //             </p>


// // // // //         </div>


// // // // //         <!-- =========================
// // // // //              UPDATE BUTTON
// // // // //         ========================= -->

// // // // //         <button

// // // // //             type="submit"

// // // // //             class="update-btn"

// // // // //             id="updateBtn"

// // // // //         >

// // // // //             💾 Update Product

// // // // //         </button>


// // // // //     </form>


// // // // //     <!-- =========================
// // // // //          BACK
// // // // //     ========================= -->

// // // // //     <a

// // // // //         href="/admin/manage-products"

// // // // //         class="back"

// // // // //     >

// // // // //         ⬅ Back to Manage Products

// // // // //     </a>


// // // // // </div>


// // // // // <script>


// // // // // // =========================
// // // // // // ADD COMPOSITION
// // // // // // =========================

// // // // // function addComposition() {

// // // // //     const box =
// // // // //         document.getElementById(
// // // // //             "compositionBox"
// // // // //         );


// // // // //     if (!box) {
// // // // //         return;
// // // // //     }


// // // // //     const row =
// // // // //         document.createElement("div");


// // // // //     row.className =
// // // // //         "composition-row";


// // // // //     row.innerHTML = `

// // // // //         <input

// // // // //             type="text"

// // // // //             name="composition[]"

// // // // //             placeholder="Composition"

// // // // //         >


// // // // //         <button

// // // // //             type="button"

// // // // //             class="remove-btn"

// // // // //             onclick="removeComposition(this)"

// // // // //         >

// // // // //             ×

// // // // //         </button>

// // // // //     `;


// // // // //     box.appendChild(row);

// // // // // }


// // // // // // =========================
// // // // // // REMOVE COMPOSITION
// // // // // // =========================

// // // // // function removeComposition(button) {

// // // // //     if (!button) {
// // // // //         return;
// // // // //     }


// // // // //     const row =
// // // // //         button.parentElement;


// // // // //     if (row) {

// // // // //         row.remove();

// // // // //     }


// // // // //     updateCompositionButtons();

// // // // // }


// // // // // // =========================
// // // // // // UPDATE COMPOSITION BUTTONS
// // // // // // =========================

// // // // // function updateCompositionButtons() {

// // // // //     const rows =
// // // // //         document.querySelectorAll(
// // // // //             "#compositionBox .composition-row"
// // // // //         );


// // // // //     rows.forEach((row, index) => {

// // // // //         const button =
// // // // //             row.querySelector(
// // // // //                 ".remove-btn"
// // // // //             );


// // // // //         if (!button) {
// // // // //             return;
// // // // //         }


// // // // //         if (index === 0) {

// // // // //             button.style.visibility =
// // // // //                 "hidden";

// // // // //         } else {

// // // // //             button.style.visibility =
// // // // //                 "visible";

// // // // //         }

// // // // //     });

// // // // // }


// // // // // // =========================
// // // // // // IMAGE VALIDATION
// // // // // // =========================

// // // // // const imageInput =
// // // // //     document.getElementById(
// // // // //         "imageInput"
// // // // //     );


// // // // // if (imageInput) {

// // // // //     imageInput.addEventListener(
// // // // //         "change",
// // // // //         function () {

// // // // //             const files =
// // // // //                 Array.from(this.files || []);


// // // // //             const maxSize =
// // // // //                 10 * 1024 * 1024;


// // // // //             for (const file of files) {


// // // // //                 // File type

// // // // //                 if (
// // // // //                     !file.type.startsWith(
// // // // //                         "image/"
// // // // //                     )
// // // // //                 ) {

// // // // //                     alert(
// // // // //                         "Please select only image files."
// // // // //                     );

// // // // //                     this.value = "";

// // // // //                     return;

// // // // //                 }


// // // // //                 // File size

// // // // //                 if (
// // // // //                     file.size > maxSize
// // // // //                 ) {

// // // // //                     alert(
// // // // //                         "Each image must be less than 10MB."
// // // // //                     );

// // // // //                     this.value = "";

// // // // //                     return;

// // // // //                 }

// // // // //             }

// // // // //         }
// // // // //     );

// // // // // }


// // // // // // =========================
// // // // // // FORM SUBMIT
// // // // // // =========================

// // // // // const editForm =
// // // // //     document.getElementById(
// // // // //         "editProductForm"
// // // // //     );


// // // // // const updateBtn =
// // // // //     document.getElementById(
// // // // //         "updateBtn"
// // // // //     );


// // // // // if (editForm) {

// // // // //     editForm.addEventListener(
// // // // //         "submit",
// // // // //         function () {

// // // // //             if (updateBtn) {

// // // // //                 updateBtn.disabled =
// // // // //                     true;

// // // // //                 updateBtn.innerHTML =
// // // // //                     "⏳ Updating Product...";

// // // // //                 updateBtn.style.opacity =
// // // // //                     "0.7";

// // // // //                 updateBtn.style.cursor =
// // // // //                     "not-allowed";

// // // // //             }

// // // // //         }
// // // // //     );

// // // // // }


// // // // // // =========================
// // // // // // INITIALIZE
// // // // // // =========================

// // // // // updateCompositionButtons();


// // // // // </script>


// // // // // </body>

// // // // // </html>

// // // // //     `;
// // // // // }


// // // // // module.exports = EditProduct;

// // // // function EditProduct(product) {

// // // //     // =========================
// // // //     // SAFE HTML ESCAPE
// // // //     // =========================

// // // //     const escapeHTML = (value) => {

// // // //         if (value === null || value === undefined) {
// // // //             return "";
// // // //         }

// // // //         return String(value)
// // // //             .replace(/&/g, "&amp;")
// // // //             .replace(/</g, "&lt;")
// // // //             .replace(/>/g, "&gt;")
// // // //             .replace(/"/g, "&quot;")
// // // //             .replace(/'/g, "&#039;");
// // // //     };


// // // //     // =========================
// // // //     // DATE FORMAT
// // // //     // =========================

// // // //     const formatDate = (value) => {

// // // //         if (!value) {
// // // //             return "";
// // // //         }

// // // //         try {

// // // //             const date = new Date(value);

// // // //             if (isNaN(date.getTime())) {
// // // //                 return "";
// // // //             }

// // // //             return date.toISOString().split("T")[0];

// // // //         } catch (error) {

// // // //             return "";

// // // //         }
// // // //     };


// // // //     // =========================
// // // //     // COMPOSITION
// // // //     // =========================

// // // //     let compositions = [];

// // // //     if (Array.isArray(product.composition)) {

// // // //         compositions = product.composition
// // // //             .filter(item => item !== null && item !== undefined)
// // // //             .map(item => {

// // // //                 if (typeof item === "object") {

// // // //                     if (item.name && item.strength) {
// // // //                         return `${item.name} ${item.strength}`;
// // // //                     }

// // // //                     if (item.name) {
// // // //                         return item.name;
// // // //                     }

// // // //                     return "";
// // // //                 }

// // // //                 return String(item);
// // // //             });

// // // //     } else if (product.composition) {

// // // //         compositions = [String(product.composition)];

// // // //     }


// // // //     if (!compositions.length) {

// // // //         compositions = [""];

// // // //     }


// // // //     // =========================
// // // //     // IMAGES
// // // //     // =========================

// // // //     let images = [];

// // // //     if (Array.isArray(product.images)) {

// // // //         images = product.images.filter(Boolean);

// // // //     }


// // // //     // Old database image field
// // // //     if (
// // // //         product.image &&
// // // //         !images.includes(product.image)
// // // //     ) {

// // // //         images.unshift(product.image);

// // // //     }


// // // //     // Remove duplicate images
// // // //     images = [...new Set(images)];


// // // //     // =========================
// // // //     // IMAGE URL CLEANER
// // // //     // =========================

// // // //     const cleanImageUrl = (url) => {

// // // //         if (!url) {
// // // //             return "";
// // // //         }

// // // //         let clean = String(url).trim();


// // // //         // Markdown:
// // // //         // [https://example.com/image.jpg](https://example.com/image.jpg)

// // // //         const markdownMatch =
// // // //             clean.match(/\]\((https?:\/\/[^)]+)\)/);

// // // //         if (markdownMatch) {

// // // //             return markdownMatch[1];

// // // //         }


// // // //         // [https://example.com/image.jpg]

// // // //         if (
// // // //             clean.startsWith("[") &&
// // // //             clean.endsWith("]")
// // // //         ) {

// // // //             clean = clean.slice(1, -1);

// // // //         }

// // // //         return clean;

// // // //     };


// // // //     images = images
// // // //         .map(cleanImageUrl)
// // // //         .filter(Boolean);


// // // //     // =========================
// // // //     // RETURN HTML
// // // //     // =========================

// // // //     return `

// // // // <!DOCTYPE html>

// // // // <html lang="en">

// // // // <head>

// // // //     <meta charset="UTF-8">

// // // //     <meta
// // // //         name="viewport"
// // // //         content="width=device-width, initial-scale=1.0"
// // // //     >

// // // //     <title>Edit Pharma Product</title>


// // // //     <style>

// // // //         /* =========================
// // // //            RESET
// // // //         ========================= */

// // // //         * {
// // // //             margin: 0;
// // // //             padding: 0;
// // // //             box-sizing: border-box;
// // // //             font-family: "Segoe UI", Arial, sans-serif;
// // // //         }


// // // //         /* =========================
// // // //            BODY
// // // //         ========================= */

// // // //         body {

// // // //             background:
// // // //                 linear-gradient(
// // // //                     135deg,
// // // //                     #2563eb,
// // // //                     #06b6d4
// // // //                 );

// // // //             min-height: 100vh;

// // // //             padding: 30px 15px;

// // // //         }


// // // //         /* =========================
// // // //            CONTAINER
// // // //         ========================= */

// // // //         .container {

// // // //             width: 100%;

// // // //             max-width: 1000px;

// // // //             margin: auto;

// // // //             background: #ffffff;

// // // //             padding: 30px;

// // // //             border-radius: 22px;

// // // //             box-shadow:
// // // //                 0 20px 50px
// // // //                 rgba(0, 0, 0, .18);

// // // //         }


// // // //         /* =========================
// // // //            HEADER
// // // //         ========================= */

// // // //         .header {

// // // //             text-align: center;

// // // //             margin-bottom: 30px;

// // // //         }


// // // //         .header h2 {

// // // //             color: #1e40af;

// // // //             font-size: 28px;

// // // //             margin-bottom: 6px;

// // // //         }


// // // //         .header p {

// // // //             color: #64748b;

// // // //             font-size: 14px;

// // // //         }


// // // //         /* =========================
// // // //            FORM GRID
// // // //         ========================= */

// // // //         .form-grid {

// // // //             display: grid;

// // // //             grid-template-columns:
// // // //                 repeat(2, 1fr);

// // // //             gap: 18px;

// // // //         }


// // // //         /* =========================
// // // //            FORM GROUP
// // // //         ========================= */

// // // //         .form-group {

// // // //             display: flex;

// // // //             flex-direction: column;

// // // //         }


// // // //         .form-group.full {

// // // //             grid-column: 1 / -1;

// // // //         }


// // // //         label {

// // // //             font-weight: 700;

// // // //             color: #1e293b;

// // // //             margin-bottom: 7px;

// // // //             font-size: 14px;

// // // //         }


// // // //         /* =========================
// // // //            INPUT
// // // //         ========================= */

// // // //         input,
// // // //         select,
// // // //         textarea {

// // // //             width: 100%;

// // // //             padding: 12px 13px;

// // // //             border: 1px solid #d1d5db;

// // // //             border-radius: 10px;

// // // //             background: #ffffff;

// // // //             color: #111827;

// // // //             font-size: 15px;

// // // //             outline: none;

// // // //             transition: .2s;

// // // //         }


// // // //         input:focus,
// // // //         select:focus,
// // // //         textarea:focus {

// // // //             border-color: #2563eb;

// // // //             box-shadow:
// // // //                 0 0 0 3px
// // // //                 rgba(37, 99, 235, .10);

// // // //         }


// // // //         textarea {

// // // //             min-height: 120px;

// // // //             resize: vertical;

// // // //         }


// // // //         /* =========================
// // // //            SECTION
// // // //         ========================= */

// // // //         .section {

// // // //             margin-top: 30px;

// // // //             padding-top: 23px;

// // // //             border-top:
// // // //                 1px solid #e5e7eb;

// // // //         }


// // // //         .section-title {

// // // //             display: flex;

// // // //             align-items: center;

// // // //             gap: 8px;

// // // //             margin-bottom: 16px;

// // // //             color: #1e40af;

// // // //             font-size: 19px;

// // // //             font-weight: 700;

// // // //         }


// // // //         /* =========================
// // // //            COMPOSITION
// // // //         ========================= */

// // // //         .composition-row {

// // // //             display: flex;

// // // //             gap: 10px;

// // // //             margin-bottom: 10px;

// // // //             align-items: center;

// // // //         }


// // // //         .composition-row input {

// // // //             flex: 1;

// // // //         }


// // // //         .remove-btn {

// // // //             width: 45px;

// // // //             min-width: 45px;

// // // //             height: 45px;

// // // //             padding: 0;

// // // //             border: none;

// // // //             border-radius: 9px;

// // // //             background: #dc2626;

// // // //             color: #ffffff;

// // // //             font-size: 20px;

// // // //             font-weight: 700;

// // // //             cursor: pointer;

// // // //         }


// // // //         .remove-btn:hover {

// // // //             background: #b91c1c;

// // // //         }


// // // //         .add-btn {

// // // //             width: auto;

// // // //             padding: 11px 18px;

// // // //             margin-top: 5px;

// // // //             border: none;

// // // //             border-radius: 9px;

// // // //             background: #16a34a;

// // // //             color: #ffffff;

// // // //             font-weight: 700;

// // // //             cursor: pointer;

// // // //         }


// // // //         .add-btn:hover {

// // // //             background: #15803d;

// // // //         }


// // // //         /* =========================
// // // //            IMAGE GRID
// // // //         ========================= */

// // // //         .image-grid {

// // // //             display: grid;

// // // //             grid-template-columns:
// // // //                 repeat(4, 1fr);

// // // //             gap: 15px;

// // // //         }


// // // //         .image-card {

// // // //             position: relative;

// // // //             border:
// // // //                 1px solid #e5e7eb;

// // // //             border-radius: 12px;

// // // //             padding: 8px;

// // // //             background: #f8fafc;

// // // //         }


// // // //         .image-card img {

// // // //             width: 100%;

// // // //             height: 140px;

// // // //             object-fit: cover;

// // // //             border-radius: 8px;

// // // //             display: block;

// // // //         }


// // // //         .image-number {

// // // //             text-align: center;

// // // //             margin-top: 7px;

// // // //             font-size: 12px;

// // // //             color: #64748b;

// // // //         }


// // // //         /* =========================
// // // //            NO IMAGE
// // // //         ========================= */

// // // //         .no-image {

// // // //             padding: 30px;

// // // //             text-align: center;

// // // //             background: #f8fafc;

// // // //             border-radius: 10px;

// // // //             color: #64748b;

// // // //         }


// // // //         /* =========================
// // // //            FILE INPUT
// // // //         ========================= */

// // // //         input[type="file"] {

// // // //             padding: 10px;

// // // //             background: #f8fafc;

// // // //             cursor: pointer;

// // // //         }


// // // //         /* =========================
// // // //            UPDATE BUTTON
// // // //         ========================= */

// // // //         .update-btn {

// // // //             width: 100%;

// // // //             padding: 15px;

// // // //             margin-top: 30px;

// // // //             border: none;

// // // //             border-radius: 12px;

// // // //             background:
// // // //                 linear-gradient(
// // // //                     135deg,
// // // //                     #2563eb,
// // // //                     #1d4ed8
// // // //                 );

// // // //             color: #ffffff;

// // // //             font-size: 17px;

// // // //             font-weight: 700;

// // // //             cursor: pointer;

// // // //             transition: .2s;

// // // //         }


// // // //         .update-btn:hover {

// // // //             transform: translateY(-1px);

// // // //             box-shadow:
// // // //                 0 8px 20px
// // // //                 rgba(37, 99, 235, .25);

// // // //         }


// // // //         /* =========================
// // // //            BACK BUTTON
// // // //         ========================= */

// // // //         .back {

// // // //             display: block;

// // // //             text-align: center;

// // // //             margin-top: 18px;

// // // //             padding: 12px;

// // // //             border-radius: 10px;

// // // //             background: #f1f5f9;

// // // //             color: #1e40af;

// // // //             text-decoration: none;

// // // //             font-weight: 700;

// // // //         }


// // // //         .back:hover {

// // // //             background: #e2e8f0;

// // // //         }


// // // //         /* =========================
// // // //            MOBILE
// // // //         ========================= */

// // // //         @media (max-width: 700px) {

// // // //             body {

// // // //                 padding: 10px;

// // // //             }


// // // //             .container {

// // // //                 padding: 18px;

// // // //                 border-radius: 16px;

// // // //             }


// // // //             .header h2 {

// // // //                 font-size: 22px;

// // // //             }


// // // //             .form-grid {

// // // //                 grid-template-columns: 1fr;

// // // //                 gap: 15px;

// // // //             }


// // // //             .form-group.full {

// // // //                 grid-column: auto;

// // // //             }


// // // //             .image-grid {

// // // //                 grid-template-columns:
// // // //                     repeat(2, 1fr);

// // // //             }


// // // //             .image-card img {

// // // //                 height: 120px;

// // // //             }


// // // //             .composition-row {

// // // //                 gap: 7px;

// // // //             }

// // // //         }


// // // //         /* =========================
// // // //            SMALL MOBILE
// // // //         ========================= */

// // // //         @media (max-width: 400px) {

// // // //             .container {

// // // //                 padding: 14px;

// // // //             }


// // // //             input,
// // // //             select,
// // // //             textarea {

// // // //                 font-size: 14px;

// // // //                 padding: 11px;

// // // //             }


// // // //             .image-grid {

// // // //                 grid-template-columns:
// // // //                     repeat(2, 1fr);

// // // //                 gap: 8px;

// // // //             }


// // // //             .image-card img {

// // // //                 height: 100px;

// // // //             }


// // // //             .remove-btn {

// // // //                 width: 40px;

// // // //                 min-width: 40px;

// // // //                 height: 40px;

// // // //             }

// // // //         }

// // // //     </style>

// // // // </head>


// // // // <body>


// // // // <div class="container">


// // // //     <!-- =========================
// // // //          HEADER
// // // //     ========================= -->

// // // //     <div class="header">

// // // //         <h2>
// // // //             ✏️ Edit Pharma Product
// // // //         </h2>

// // // //         <p>
// // // //             Update product information and images
// // // //         </p>

// // // //     </div>


// // // //     <!-- =========================
// // // //          FORM
// // // //     ========================= -->

// // // //     <form

// // // //         action="/admin/edit-product/${escapeHTML(product._id)}"

// // // //         method="POST"

// // // //         enctype="multipart/form-data"
// // // //     >


// // // //         <!-- =========================
// // // //              BASIC INFORMATION
// // // //         ========================= -->

// // // //         <div class="form-grid">


// // // //             <!-- PRODUCT NAME -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Product Name *
// // // //                 </label>

// // // //                 <input
// // // //                     type="text"
// // // //                     name="name"
// // // //                     value="${escapeHTML(product.name)}"
// // // //                     required
// // // //                 >

// // // //             </div>


// // // //             <!-- BRAND -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Brand Name
// // // //                 </label>

// // // //                 <input
// // // //                     type="text"
// // // //                     name="brand"
// // // //                     value="${escapeHTML(product.brand)}"
// // // //                 >

// // // //             </div>


// // // //             <!-- CATEGORY -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Category
// // // //                 </label>

// // // //                 <select name="category">

// // // //                     <option value="">
// // // //                         Select Category
// // // //                     </option>

// // // //                     <option
// // // //                         value="Tablet"
// // // //                         ${product.category === "Tablet" ? "selected" : ""}
// // // //                     >
// // // //                         Tablet
// // // //                     </option>

// // // //                     <option
// // // //                         value="Capsule"
// // // //                         ${product.category === "Capsule" ? "selected" : ""}
// // // //                     >
// // // //                         Capsule
// // // //                     </option>

// // // //                     <option
// // // //                         value="Syrup"
// // // //                         ${product.category === "Syrup" ? "selected" : ""}
// // // //                     >
// // // //                         Syrup
// // // //                     </option>

// // // //                     <option
// // // //                         value="Drops"
// // // //                         ${product.category === "Drops" ? "selected" : ""}
// // // //                     >
// // // //                         Drops
// // // //                     </option>

// // // //                     <option
// // // //                         value="Injection"
// // // //                         ${product.category === "Injection" ? "selected" : ""}
// // // //                     >
// // // //                         Injection
// // // //                     </option>

// // // //                     <option
// // // //                         value="Cream"
// // // //                         ${product.category === "Cream" ? "selected" : ""}
// // // //                     >
// // // //                         Cream
// // // //                     </option>

// // // //                     <option
// // // //                         value="Other"
// // // //                         ${product.category === "Other" ? "selected" : ""}
// // // //                     >
// // // //                         Other
// // // //                     </option>

// // // //                 </select>

// // // //             </div>


// // // //             <!-- MANUFACTURER -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Manufacturer
// // // //                 </label>

// // // //                 <input
// // // //                     type="text"
// // // //                     name="manufacturer"
// // // //                     value="${escapeHTML(product.manufacturer)}"
// // // //                 >

// // // //             </div>


// // // //             <!-- MRP -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     MRP ₹
// // // //                 </label>

// // // //                 <input
// // // //                     type="number"
// // // //                     name="mrp"
// // // //                     value="${product.mrp ?? ""}"
// // // //                     min="0"
// // // //                     step="0.01"
// // // //                 >

// // // //             </div>


// // // //             <!-- PRICE -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Selling Price ₹ *
// // // //                 </label>

// // // //                 <input
// // // //                     type="number"
// // // //                     name="price"
// // // //                     value="${product.price ?? ""}"
// // // //                     min="0"
// // // //                     step="0.01"
// // // //                     required
// // // //                 >

// // // //             </div>


// // // //             <!-- STOCK -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Stock Quantity
// // // //                 </label>

// // // //                 <input
// // // //                     type="number"
// // // //                     name="stock"
// // // //                     value="${product.stock ?? 0}"
// // // //                     min="0"
// // // //                 >

// // // //             </div>


// // // //             <!-- PACK SIZE -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Pack Size
// // // //                 </label>

// // // //                 <input
// // // //                     type="text"
// // // //                     name="packSize"
// // // //                     value="${escapeHTML(product.packSize)}"
// // // //                     placeholder="e.g. 200 ml"
// // // //                 >

// // // //             </div>


// // // //             <!-- BATCH -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Batch Number
// // // //                 </label>

// // // //                 <input
// // // //                     type="text"
// // // //                     name="batchNo"
// // // //                     value="${escapeHTML(product.batchNo)}"
// // // //                 >

// // // //             </div>


// // // //             <!-- MFG DATE -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Manufacturing Date
// // // //                 </label>

// // // //                 <input
// // // //                     type="date"
// // // //                     name="mfgDate"
// // // //                     value="${formatDate(product.mfgDate)}"
// // // //                 >

// // // //             </div>


// // // //             <!-- EXPIRY DATE -->

// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Expiry Date
// // // //                 </label>

// // // //                 <input
// // // //                     type="date"
// // // //                     name="expDate"
// // // //                     value="${formatDate(product.expDate)}"
// // // //                 >

// // // //             </div>


// // // //         </div>


// // // //         <!-- =========================
// // // //              COMPOSITION
// // // //         ========================= -->

// // // //         <div class="section">


// // // //             <div class="section-title">

// // // //                 💊 Composition

// // // //             </div>


// // // //             <div id="compositionBox">

// // // //                 ${compositions.map((item, index) => `

// // // //                     <div class="composition-row">

// // // //                         <input
// // // //                             type="text"
// // // //                             name="composition[]"
// // // //                             value="${escapeHTML(item)}"
// // // //                             placeholder="Composition ${index + 1}"
// // // //                         >

// // // //                         ${
// // // //                             index > 0
// // // //                             ?

// // // //                             `
// // // //                             <button
// // // //                                 type="button"
// // // //                                 class="remove-btn"
// // // //                                 onclick="removeComposition(this)"
// // // //                             >
// // // //                                 ×
// // // //                             </button>
// // // //                             `

// // // //                             :

// // // //                             `
// // // //                             <button
// // // //                                 type="button"
// // // //                                 class="remove-btn"
// // // //                                 onclick="removeComposition(this)"
// // // //                                 style="visibility:hidden"
// // // //                             >
// // // //                                 ×
// // // //                             </button>
// // // //                             `
// // // //                         }

// // // //                     </div>

// // // //                 `).join("")}

// // // //             </div>


// // // //             <button
// // // //                 type="button"
// // // //                 class="add-btn"
// // // //                 onclick="addComposition()"
// // // //             >
// // // //                 + Add Composition
// // // //             </button>


// // // //         </div>


// // // //         <!-- =========================
// // // //              PRODUCT DETAILS
// // // //         ========================= -->

// // // //         <div class="section">


// // // //             <div class="section-title">

// // // //                 📋 Product Details

// // // //             </div>


// // // //             <div class="form-grid">


// // // //                 <!-- USES -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Uses
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="uses"
// // // //                         placeholder="Enter product uses"
// // // //                     >${escapeHTML(product.uses)}</textarea>

// // // //                 </div>


// // // //                 <!-- BENEFITS -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Benefits
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="benefits"
// // // //                         placeholder="Enter product benefits"
// // // //                     >${escapeHTML(product.benefits)}</textarea>

// // // //                 </div>


// // // //                 <!-- DOSAGE -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Dosage
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="dosage"
// // // //                         placeholder="Enter dosage"
// // // //                     >${escapeHTML(product.dosage)}</textarea>

// // // //                 </div>


// // // //                 <!-- SIDE EFFECTS -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Side Effects
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="sideEffects"
// // // //                         placeholder="Enter side effects"
// // // //                     >${escapeHTML(product.sideEffects)}</textarea>

// // // //                 </div>


// // // //                 <!-- STORAGE -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Storage Instructions
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="storage"
// // // //                         placeholder="Enter storage instructions"
// // // //                     >${escapeHTML(product.storage)}</textarea>

// // // //                 </div>


// // // //                 <!-- DESCRIPTION -->

// // // //                 <div class="form-group full">

// // // //                     <label>
// // // //                         Full Description
// // // //                     </label>

// // // //                     <textarea
// // // //                         name="description"
// // // //                         placeholder="Enter full product description"
// // // //                     >${escapeHTML(product.description)}</textarea>

// // // //                 </div>


// // // //             </div>


// // // //         </div>


// // // //         <!-- =========================
// // // //              EXISTING IMAGES
// // // //         ========================= -->

// // // //         <div class="section">


// // // //             <div class="section-title">

// // // //                 🖼 Existing Product Images

// // // //             </div>


// // // //             ${
// // // //                 images.length

// // // //                 ?

// // // //                 `
// // // //                 <div class="image-grid">

// // // //                     ${images.map((img, index) => {

// // // //                         const safeImg =
// // // //                             cleanImageUrl(img);

// // // //                         return `

// // // //                             <div class="image-card">

// // // //                                 <img
// // // //                                     src="${escapeHTML(safeImg)}"
// // // //                                     alt="Product Image ${index + 1}"
// // // //                                     loading="lazy"
// // // //                                     onerror="this.style.display='none'"
// // // //                                 >

// // // //                                 <div class="image-number">

// // // //                                     Image ${index + 1}

// // // //                                 </div>

// // // //                             </div>

// // // //                         `;

// // // //                     }).join("")}

// // // //                 </div>
// // // //                 `

// // // //                 :

// // // //                 `
// // // //                 <div class="no-image">

// // // //                     No existing product image

// // // //                 </div>
// // // //                 `
// // // //             }


// // // //         </div>


// // // //         <!-- =========================
// // // //              NEW IMAGES
// // // //         ========================= -->

// // // //         <div class="section">


// // // //             <div class="section-title">

// // // //                 📷 Add New Product Images

// // // //             </div>


// // // //             <div class="form-group">

// // // //                 <label>
// // // //                     Select New Images
// // // //                 </label>

// // // //                 <input
// // // //                     type="file"
// // // //                     name="images"
// // // //                     accept="image/*"
// // // //                     multiple
// // // //                 >

// // // //             </div>


// // // //             <p
// // // //                 style="
// // // //                     margin-top:8px;
// // // //                     color:#64748b;
// // // //                     font-size:13px;
// // // //                 "
// // // //             >
// // // //                 You can select multiple new images.
// // // //             </p>


// // // //         </div>


// // // //         <!-- =========================
// // // //              UPDATE
// // // //         ========================= -->

// // // //         <button
// // // //             type="submit"
// // // //             class="update-btn"
// // // //         >

// // // //             💾 Update Product

// // // //         </button>


// // // //     </form>


// // // //     <!-- =========================
// // // //          BACK
// // // //     ========================= -->

// // // //     <a
// // // //         href="/admin/manage-products"
// // // //         class="back"
// // // //     >

// // // //         ⬅ Back to Manage Products

// // // //     </a>


// // // // </div>


// // // // <script>

// // // //     // =========================
// // // //     // ADD COMPOSITION
// // // //     // =========================

// // // //     function addComposition() {

// // // //         const box =
// // // //             document.getElementById(
// // // //                 "compositionBox"
// // // //             );


// // // //         const row =
// // // //             document.createElement("div");


// // // //         row.className =
// // // //             "composition-row";


// // // //         row.innerHTML = \`

// // // //             <input
// // // //                 type="text"
// // // //                 name="composition[]"
// // // //                 placeholder="Composition"
// // // //             >

// // // //             <button
// // // //                 type="button"
// // // //                 class="remove-btn"
// // // //                 onclick="removeComposition(this)"
// // // //             >
// // // //                 ×
// // // //             </button>

// // // //         \`;


// // // //         box.appendChild(row);

// // // //     }


// // // //     // =========================
// // // //     // REMOVE COMPOSITION
// // // //     // =========================

// // // //     function removeComposition(button) {

// // // //         const row =
// // // //             button.parentElement;


// // // //         const box =
// // // //             document.getElementById(
// // // //                 "compositionBox"
// // // //             );


// // // //         if (
// // // //             box &&
// // // //             box.children.length > 1
// // // //         ) {

// // // //             row.remove();

// // // //         }

// // // //     }


// // // //     // =========================
// // // //     // IMAGE VALIDATION
// // // //     // =========================

// // // //     const imageInput =
// // // //         document.querySelector(
// // // //             'input[name="images"]'
// // // //         );


// // // //     if (imageInput) {

// // // //         imageInput.addEventListener(
// // // //             "change",
// // // //             function () {

// // // //                 const files =
// // // //                     this.files;


// // // //                 for (
// // // //                     const file
// // // //                     of files
// // // //                 ) {

// // // //                     if (
// // // //                         !file.type.startsWith(
// // // //                             "image/"
// // // //                         )
// // // //                     ) {

// // // //                         alert(
// // // //                             "Please select only image files."
// // // //                         );

// // // //                         this.value = "";

// // // //                         return;

// // // //                     }

// // // //                 }

// // // //             }
// // // //         );

// // // //     }

// // // // </script>


// // // // </body>

// // // // </html>

// // // // `;

// // // // }


// // // // module.exports = EditProduct;

// // // function EditProduct(product) {

// // //     // =========================
// // //     // SAFE HTML ESCAPE
// // //     // =========================

// // //     const escapeHTML = (value) => {

// // //         if (value === null || value === undefined) {
// // //             return "";
// // //         }

// // //         return String(value)
// // //             .replace(/&/g, "&amp;")
// // //             .replace(/</g, "&lt;")
// // //             .replace(/>/g, "&gt;")
// // //             .replace(/"/g, "&quot;")
// // //             .replace(/'/g, "&#039;");
// // //     };


// // //     // =========================
// // //     // DATE FORMAT
// // //     // =========================

// // //     const formatDate = (value) => {

// // //         if (!value) {
// // //             return "";
// // //         }

// // //         try {

// // //             const date = new Date(value);

// // //             if (isNaN(date.getTime())) {
// // //                 return "";
// // //             }

// // //             return date.toISOString().split("T")[0];

// // //         } catch (error) {

// // //             return "";

// // //         }
// // //     };


// // //     // =========================
// // //     // COMPOSITION
// // //     // =========================

// // //     let compositions = [];

// // //     if (Array.isArray(product.composition)) {

// // //         compositions = product.composition
// // //             .filter(item =>
// // //                 item !== null &&
// // //                 item !== undefined
// // //             )
// // //             .map(item => {

// // //                 if (typeof item === "object") {

// // //                     if (
// // //                         item.name &&
// // //                         item.strength
// // //                     ) {
// // //                         return `${item.name} ${item.strength}`;
// // //                     }

// // //                     if (item.name) {
// // //                         return item.name;
// // //                     }

// // //                     return "";
// // //                 }

// // //                 return String(item);

// // //             });

// // //     } else if (product.composition) {

// // //         compositions = [
// // //             String(product.composition)
// // //         ];

// // //     }


// // //     if (!compositions.length) {

// // //         compositions = [""];

// // //     }


// // //     // =========================
// // //     // IMAGES
// // //     // =========================

// // //     let images = [];

// // //     if (Array.isArray(product.images)) {

// // //         images =
// // //             product.images.filter(Boolean);

// // //     }


// // //     // Old database image field support
// // //     if (
// // //         product.image &&
// // //         !images.includes(product.image)
// // //     ) {

// // //         images.unshift(product.image);

// // //     }


// // //     // Remove duplicate images
// // //     images = [
// // //         ...new Set(images)
// // //     ];


// // //     // =========================
// // //     // IMAGE URL CLEANER
// // //     // =========================

// // //     const cleanImageUrl = (url) => {

// // //         if (!url) {
// // //             return "";
// // //         }

// // //         let clean =
// // //             String(url).trim();


// // //         // Markdown:
// // //         // [https://example.com/image.jpg](https://example.com/image.jpg)

// // //         const markdownMatch =
// // //             clean.match(
// // //                 /\]\((https?:\/\/[^)]+)\)/
// // //             );

// // //         if (markdownMatch) {

// // //             return markdownMatch[1];

// // //         }


// // //         // [https://example.com/image.jpg]

// // //         if (
// // //             clean.startsWith("[") &&
// // //             clean.endsWith("]")
// // //         ) {

// // //             clean =
// // //                 clean.slice(1, -1);

// // //         }

// // //         return clean;

// // //     };


// // //     images = images
// // //         .map(cleanImageUrl)
// // //         .filter(Boolean);


// // //     // =========================
// // //     // VIDEOS
// // //     // =========================

// // //     let videos = [];

// // //     if (Array.isArray(product.videos)) {

// // //         videos =
// // //             product.videos.filter(Boolean);

// // //     } else if (product.video) {

// // //         // Old single video field support
// // //         videos = [
// // //             product.video
// // //         ];

// // //     }


// // //     // Clean video URLs
// // //     videos = videos
// // //         .map(cleanImageUrl)
// // //         .filter(Boolean);


// // //     // Remove duplicate videos
// // //     videos = [
// // //         ...new Set(videos)
// // //     ];


// // //     // =========================
// // //     // RETURN HTML
// // //     // =========================

// // //     return `

// // // <!DOCTYPE html>

// // // <html lang="en">

// // // <head>

// // // <meta charset="UTF-8">

// // // <meta
// // //     name="viewport"
// // //     content="width=device-width, initial-scale=1.0"
// // // >

// // // <title>Edit Pharma Product</title>


// // // <style>

// // // /* =========================
// // //    RESET
// // // ========================= */

// // // * {

// // //     margin: 0;

// // //     padding: 0;

// // //     box-sizing: border-box;

// // //     font-family:
// // //         "Segoe UI",
// // //         Arial,
// // //         sans-serif;

// // // }


// // // /* =========================
// // //    BODY
// // // ========================= */

// // // body {

// // //     background:
// // //         linear-gradient(
// // //             135deg,
// // //             #2563eb,
// // //             #06b6d4
// // //         );

// // //     min-height: 100vh;

// // //     padding: 30px 15px;

// // // }


// // // /* =========================
// // //    CONTAINER
// // // ========================= */

// // // .container {

// // //     width: 100%;

// // //     max-width: 1000px;

// // //     margin: auto;

// // //     background: #ffffff;

// // //     padding: 30px;

// // //     border-radius: 22px;

// // //     box-shadow:
// // //         0 20px 50px
// // //         rgba(0, 0, 0, .18);

// // // }


// // // /* =========================
// // //    HEADER
// // // ========================= */

// // // .header {

// // //     text-align: center;

// // //     margin-bottom: 30px;

// // // }


// // // .header h2 {

// // //     color: #1e40af;

// // //     font-size: 28px;

// // //     margin-bottom: 6px;

// // // }


// // // .header p {

// // //     color: #64748b;

// // //     font-size: 14px;

// // // }


// // // /* =========================
// // //    FORM GRID
// // // ========================= */

// // // .form-grid {

// // //     display: grid;

// // //     grid-template-columns:
// // //         repeat(2, 1fr);

// // //     gap: 18px;

// // // }


// // // /* =========================
// // //    FORM GROUP
// // // ========================= */

// // // .form-group {

// // //     display: flex;

// // //     flex-direction: column;

// // // }


// // // .form-group.full {

// // //     grid-column: 1 / -1;

// // // }


// // // label {

// // //     font-weight: 700;

// // //     color: #1e293b;

// // //     margin-bottom: 7px;

// // //     font-size: 14px;

// // // }


// // // /* =========================
// // //    INPUT
// // // ========================= */

// // // input,
// // // select,
// // // textarea {

// // //     width: 100%;

// // //     padding: 12px 13px;

// // //     border:
// // //         1px solid #d1d5db;

// // //     border-radius: 10px;

// // //     background: #ffffff;

// // //     color: #111827;

// // //     font-size: 15px;

// // //     outline: none;

// // //     transition: .2s;

// // // }


// // // input:focus,
// // // select:focus,
// // // textarea:focus {

// // //     border-color: #2563eb;

// // //     box-shadow:
// // //         0 0 0 3px
// // //         rgba(
// // //             37,
// // //             99,
// // //             235,
// // //             .10
// // //         );

// // // }


// // // textarea {

// // //     min-height: 120px;

// // //     resize: vertical;

// // // }


// // // /* =========================
// // //    FILE INPUT
// // // ========================= */

// // // input[type="file"] {

// // //     padding: 10px;

// // //     background: #f8fafc;

// // //     cursor: pointer;

// // // }


// // // /* =========================
// // //    SECTION
// // // ========================= */

// // // .section {

// // //     margin-top: 30px;

// // //     padding-top: 23px;

// // //     border-top:
// // //         1px solid #e5e7eb;

// // // }


// // // .section-title {

// // //     display: flex;

// // //     align-items: center;

// // //     gap: 8px;

// // //     margin-bottom: 16px;

// // //     color: #1e40af;

// // //     font-size: 19px;

// // //     font-weight: 700;

// // // }


// // // /* =========================
// // //    COMPOSITION
// // // ========================= */

// // // .composition-row {

// // //     display: flex;

// // //     gap: 10px;

// // //     margin-bottom: 10px;

// // //     align-items: center;

// // // }


// // // .composition-row input {

// // //     flex: 1;

// // // }


// // // .remove-btn {

// // //     width: 45px;

// // //     min-width: 45px;

// // //     height: 45px;

// // //     padding: 0;

// // //     border: none;

// // //     border-radius: 9px;

// // //     background: #dc2626;

// // //     color: #ffffff;

// // //     font-size: 20px;

// // //     font-weight: 700;

// // //     cursor: pointer;

// // // }


// // // .remove-btn:hover {

// // //     background: #b91c1c;

// // // }


// // // .add-btn {

// // //     width: auto;

// // //     padding: 11px 18px;

// // //     margin-top: 5px;

// // //     border: none;

// // //     border-radius: 9px;

// // //     background: #16a34a;

// // //     color: #ffffff;

// // //     font-weight: 700;

// // //     cursor: pointer;

// // // }


// // // .add-btn:hover {

// // //     background: #15803d;

// // // }


// // // /* =========================
// // //    IMAGE GRID
// // // ========================= */

// // // .image-grid {

// // //     display: grid;

// // //     grid-template-columns:
// // //         repeat(4, 1fr);

// // //     gap: 15px;

// // // }


// // // .image-card {

// // //     position: relative;

// // //     border:
// // //         1px solid #e5e7eb;

// // //     border-radius: 12px;

// // //     padding: 8px;

// // //     background: #f8fafc;

// // // }


// // // .image-card img {

// // //     width: 100%;

// // //     height: 140px;

// // //     object-fit: cover;

// // //     border-radius: 8px;

// // //     display: block;

// // // }


// // // .image-number {

// // //     text-align: center;

// // //     margin-top: 7px;

// // //     font-size: 12px;

// // //     color: #64748b;

// // // }


// // // /* =========================
// // //    VIDEO GRID
// // // ========================= */

// // // .video-grid {

// // //     display: grid;

// // //     grid-template-columns:
// // //         repeat(3, 1fr);

// // //     gap: 15px;

// // // }


// // // .video-card {

// // //     border:
// // //         1px solid #e5e7eb;

// // //     border-radius: 12px;

// // //     padding: 8px;

// // //     background: #f8fafc;

// // // }


// // // .video-card video {

// // //     width: 100%;

// // //     height: 180px;

// // //     display: block;

// // //     object-fit: cover;

// // //     border-radius: 8px;

// // //     background: #000000;

// // // }


// // // .video-number {

// // //     text-align: center;

// // //     margin-top: 7px;

// // //     font-size: 12px;

// // //     color: #64748b;

// // // }


// // // /* =========================
// // //    NO IMAGE / VIDEO
// // // ========================= */

// // // .no-image {

// // //     padding: 30px;

// // //     text-align: center;

// // //     background: #f8fafc;

// // //     border-radius: 10px;

// // //     color: #64748b;

// // // }


// // // /* =========================
// // //    UPDATE BUTTON
// // // ========================= */

// // // .update-btn {

// // //     width: 100%;

// // //     padding: 15px;

// // //     margin-top: 30px;

// // //     border: none;

// // //     border-radius: 12px;

// // //     background:
// // //         linear-gradient(
// // //             135deg,
// // //             #2563eb,
// // //             #1d4ed8
// // //         );

// // //     color: #ffffff;

// // //     font-size: 17px;

// // //     font-weight: 700;

// // //     cursor: pointer;

// // //     transition: .2s;

// // // }


// // // .update-btn:hover {

// // //     transform:
// // //         translateY(-1px);

// // //     box-shadow:
// // //         0 8px 20px
// // //         rgba(
// // //             37,
// // //             99,
// // //             235,
// // //             .25
// // //         );

// // // }


// // // /* =========================
// // //    BACK BUTTON
// // // ========================= */

// // // .back {

// // //     display: block;

// // //     text-align: center;

// // //     margin-top: 18px;

// // //     padding: 12px;

// // //     border-radius: 10px;

// // //     background: #f1f5f9;

// // //     color: #1e40af;

// // //     text-decoration: none;

// // //     font-weight: 700;

// // // }


// // // .back:hover {

// // //     background: #e2e8f0;

// // // }


// // // /* =========================
// // //    MOBILE
// // // ========================= */

// // // @media (max-width: 700px) {

// // //     body {

// // //         padding: 10px;

// // //     }


// // //     .container {

// // //         padding: 18px;

// // //         border-radius: 16px;

// // //     }


// // //     .header h2 {

// // //         font-size: 22px;

// // //     }


// // //     .form-grid {

// // //         grid-template-columns: 1fr;

// // //         gap: 15px;

// // //     }


// // //     .form-group.full {

// // //         grid-column: auto;

// // //     }


// // //     .image-grid {

// // //         grid-template-columns:
// // //             repeat(2, 1fr);

// // //     }


// // //     .image-card img {

// // //         height: 120px;

// // //     }


// // //     .video-grid {

// // //         grid-template-columns:
// // //             repeat(2, 1fr);

// // //     }


// // //     .video-card video {

// // //         height: 140px;

// // //     }


// // //     .composition-row {

// // //         gap: 7px;

// // //     }

// // // }


// // // /* =========================
// // //    SMALL MOBILE
// // // ========================= */

// // // @media (max-width: 400px) {

// // //     .container {

// // //         padding: 14px;

// // //     }


// // //     input,
// // //     select,
// // //     textarea {

// // //         font-size: 14px;

// // //         padding: 11px;

// // //     }


// // //     .image-grid {

// // //         grid-template-columns:
// // //             repeat(2, 1fr);

// // //         gap: 8px;

// // //     }


// // //     .image-card img {

// // //         height: 100px;

// // //     }


// // //     .video-grid {

// // //         grid-template-columns: 1fr;

// // //     }


// // //     .video-card video {

// // //         height: 180px;

// // //     }


// // //     .remove-btn {

// // //         width: 40px;

// // //         min-width: 40px;

// // //         height: 40px;

// // //     }

// // // }

// // // </style>

// // // </head>


// // // <body>


// // // <div class="container">


// // // <!-- =========================
// // //      HEADER
// // // ========================= -->

// // // <div class="header">

// // //     <h2>
// // //         ✏️ Edit Pharma Product
// // //     </h2>

// // //     <p>
// // //         Update product information, images and videos
// // //     </p>

// // // </div>


// // // <!-- =========================
// // //      FORM
// // // ========================= -->

// // // <form

// // //     action="/admin/edit-product/${escapeHTML(product._id)}"

// // //     method="POST"

// // //     enctype="multipart/form-data"
// // // >


// // // <!-- =========================
// // //      BASIC INFORMATION
// // // ========================= -->

// // // <div class="form-grid">


// // // <!-- PRODUCT NAME -->

// // // <div class="form-group">

// // //     <label>
// // //         Product Name *
// // //     </label>

// // //     <input
// // //         type="text"
// // //         name="name"
// // //         value="${escapeHTML(product.name)}"
// // //         required
// // //     >

// // // </div>


// // // <!-- BRAND -->

// // // <div class="form-group">

// // //     <label>
// // //         Brand Name
// // //     </label>

// // //     <input
// // //         type="text"
// // //         name="brand"
// // //         value="${escapeHTML(product.brand)}"
// // //     >

// // // </div>


// // // <!-- CATEGORY -->

// // // <div class="form-group">

// // //     <label>
// // //         Category
// // //     </label>

// // //     <select name="category">

// // //         <option value="">
// // //             Select Category
// // //         </option>

// // //         <option
// // //             value="Tablet"
// // //             ${product.category === "Tablet" ? "selected" : ""}
// // //         >
// // //             Tablet
// // //         </option>

// // //         <option
// // //             value="Capsule"
// // //             ${product.category === "Capsule" ? "selected" : ""}
// // //         >
// // //             Capsule
// // //         </option>

// // //         <option
// // //             value="Syrup"
// // //             ${product.category === "Syrup" ? "selected" : ""}
// // //         >
// // //             Syrup
// // //         </option>

// // //         <option
// // //             value="Drops"
// // //             ${product.category === "Drops" ? "selected" : ""}
// // //         >
// // //             Drops
// // //         </option>

// // //         <option
// // //             value="Injection"
// // //             ${product.category === "Injection" ? "selected" : ""}
// // //         >
// // //             Injection
// // //         </option>

// // //         <option
// // //             value="Cream"
// // //             ${product.category === "Cream" ? "selected" : ""}
// // //         >
// // //             Cream
// // //         </option>

// // //         <option
// // //             value="Other"
// // //             ${product.category === "Other" ? "selected" : ""}
// // //         >
// // //             Other
// // //         </option>

// // //     </select>

// // // </div>


// // // <!-- MANUFACTURER -->

// // // <div class="form-group">

// // //     <label>
// // //         Manufacturer
// // //     </label>

// // //     <input
// // //         type="text"
// // //         name="manufacturer"
// // //         value="${escapeHTML(product.manufacturer)}"
// // //     >

// // // </div>


// // // <!-- MRP -->

// // // <div class="form-group">

// // //     <label>
// // //         MRP ₹
// // //     </label>

// // //     <input
// // //         type="number"
// // //         name="mrp"
// // //         value="${product.mrp ?? ""}"
// // //         min="0"
// // //         step="0.01"
// // //     >

// // // </div>


// // // <!-- PRICE -->

// // // <div class="form-group">

// // //     <label>
// // //         Selling Price ₹ *
// // //     </label>

// // //     <input
// // //         type="number"
// // //         name="price"
// // //         value="${product.price ?? ""}"
// // //         min="0"
// // //         step="0.01"
// // //         required
// // //     >

// // // </div>


// // // <!-- STOCK -->

// // // <div class="form-group">

// // //     <label>
// // //         Stock Quantity
// // //     </label>

// // //     <input
// // //         type="number"
// // //         name="stock"
// // //         value="${product.stock ?? 0}"
// // //         min="0"
// // //     >

// // // </div>


// // // <!-- PACK SIZE -->

// // // <div class="form-group">

// // //     <label>
// // //         Pack Size
// // //     </label>

// // //     <input
// // //         type="text"
// // //         name="packSize"
// // //         value="${escapeHTML(product.packSize)}"
// // //         placeholder="e.g. 200 ml"
// // //     >

// // // </div>


// // // <!-- BATCH -->

// // // <div class="form-group">

// // //     <label>
// // //         Batch Number
// // //     </label>

// // //     <input
// // //         type="text"
// // //         name="batchNo"
// // //         value="${escapeHTML(product.batchNo)}"
// // //     >

// // // </div>


// // // <!-- MFG DATE -->

// // // <div class="form-group">

// // //     <label>
// // //         Manufacturing Date
// // //     </label>

// // //     <input
// // //         type="date"
// // //         name="mfgDate"
// // //         value="${formatDate(product.mfgDate)}"
// // //     >

// // // </div>


// // // <!-- EXPIRY DATE -->

// // // <div class="form-group">

// // //     <label>
// // //         Expiry Date
// // //     </label>

// // //     <input
// // //         type="date"
// // //         name="expDate"
// // //         value="${formatDate(product.expDate)}"
// // //     >

// // // </div>


// // // </div>


// // // <!-- =========================
// // //      COMPOSITION
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     💊 Composition

// // // </div>


// // // <div id="compositionBox">

// // //     ${compositions.map((item, index) => `

// // //         <div class="composition-row">

// // //             <input
// // //                 type="text"
// // //                 name="composition[]"
// // //                 value="${escapeHTML(item)}"
// // //                 placeholder="Composition ${index + 1}"
// // //             >

// // //             ${
// // //                 index > 0

// // //                 ?

// // //                 `
// // //                 <button
// // //                     type="button"
// // //                     class="remove-btn"
// // //                     onclick="removeComposition(this)"
// // //                 >
// // //                     ×
// // //                 </button>
// // //                 `

// // //                 :

// // //                 `
// // //                 <button
// // //                     type="button"
// // //                     class="remove-btn"
// // //                     style="visibility:hidden"
// // //                 >
// // //                     ×
// // //                 </button>
// // //                 `
// // //             }

// // //         </div>

// // //     `).join("")}

// // // </div>


// // // <button
// // //     type="button"
// // //     class="add-btn"
// // //     onclick="addComposition()"
// // // >
// // //     + Add Composition
// // // </button>


// // // </div>


// // // <!-- =========================
// // //      PRODUCT DETAILS
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     📋 Product Details

// // // </div>


// // // <div class="form-grid">


// // // <!-- USES -->

// // // <div class="form-group full">

// // //     <label>
// // //         Uses
// // //     </label>

// // //     <textarea
// // //         name="uses"
// // //         placeholder="Enter product uses"
// // //     >${escapeHTML(product.uses)}</textarea>

// // // </div>


// // // <!-- BENEFITS -->

// // // <div class="form-group full">

// // //     <label>
// // //         Benefits
// // //     </label>

// // //     <textarea
// // //         name="benefits"
// // //         placeholder="Enter product benefits"
// // //     >${escapeHTML(product.benefits)}</textarea>

// // // </div>


// // // <!-- DOSAGE -->

// // // <div class="form-group full">

// // //     <label>
// // //         Dosage
// // //     </label>

// // //     <textarea
// // //         name="dosage"
// // //         placeholder="Enter dosage"
// // //     >${escapeHTML(product.dosage)}</textarea>

// // // </div>


// // // <!-- SIDE EFFECTS -->

// // // <div class="form-group full">

// // //     <label>
// // //         Side Effects
// // //     </label>

// // //     <textarea
// // //         name="sideEffects"
// // //         placeholder="Enter side effects"
// // //     >${escapeHTML(product.sideEffects)}</textarea>

// // // </div>


// // // <!-- STORAGE -->

// // // <div class="form-group full">

// // //     <label>
// // //         Storage Instructions
// // //     </label>

// // //     <textarea
// // //         name="storage"
// // //         placeholder="Enter storage instructions"
// // //     >${escapeHTML(product.storage)}</textarea>

// // // </div>


// // // <!-- DESCRIPTION -->

// // // <div class="form-group full">

// // //     <label>
// // //         Full Description
// // //     </label>

// // //     <textarea
// // //         name="description"
// // //         placeholder="Enter full product description"
// // //     >${escapeHTML(product.description)}</textarea>

// // // </div>


// // // </div>

// // // </div>


// // // <!-- =========================
// // //      EXISTING IMAGES
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     🖼 Existing Product Images

// // // </div>


// // // ${
// // //     images.length

// // //     ?

// // //     `
// // //     <div class="image-grid">

// // //         ${images.map((img, index) => {

// // //             const safeImg =
// // //                 cleanImageUrl(img);

// // //             return `

// // //                 <div class="image-card">

// // //                     <img
// // //                         src="${escapeHTML(safeImg)}"
// // //                         alt="Product Image ${index + 1}"
// // //                         loading="lazy"
// // //                         onerror="this.style.display='none'"
// // //                     >

// // //                     <div class="image-number">
// // //                         Image ${index + 1}
// // //                     </div>

// // //                 </div>

// // //             `;

// // //         }).join("")}

// // //     </div>
// // //     `

// // //     :

// // //     `
// // //     <div class="no-image">

// // //         No existing product image

// // //     </div>
// // //     `
// // // }


// // // </div>


// // // <!-- =========================
// // //      ADD NEW IMAGES
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     📷 Add New Product Images

// // // </div>


// // // <div class="form-group">

// // //     <label>
// // //         Select New Images
// // //     </label>

// // //     <input
// // //         type="file"
// // //         name="images"
// // //         accept="image/*"
// // //         multiple
// // //     >

// // // </div>


// // // <p
// // //     style="
// // //         margin-top:8px;
// // //         color:#64748b;
// // //         font-size:13px;
// // //     "
// // // >
// // //     You can select multiple product images.
// // // </p>


// // // </div>


// // // <!-- =========================
// // //      EXISTING VIDEOS
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     🎥 Existing Product Videos

// // // </div>


// // // ${
// // //     videos.length

// // //     ?

// // //     `
// // //     <div class="video-grid">

// // //         ${videos.map((video, index) => {

// // //             const safeVideo =
// // //                 cleanImageUrl(video);

// // //             return `

// // //                 <div class="video-card">

// // //                     <video
// // //                         src="${escapeHTML(safeVideo)}"
// // //                         controls
// // //                         preload="metadata"
// // //                         playsinline
// // //                     ></video>

// // //                     <div class="video-number">
// // //                         Video ${index + 1}
// // //                     </div>

// // //                 </div>

// // //             `;

// // //         }).join("")}

// // //     </div>
// // //     `

// // //     :

// // //     `
// // //     <div class="no-image">

// // //         No existing product video

// // //     </div>
// // //     `
// // // }


// // // </div>


// // // <!-- =========================
// // //      ADD NEW VIDEOS
// // // ========================= -->

// // // <div class="section">

// // // <div class="section-title">

// // //     🎥 Add Product Videos

// // // </div>


// // // <div class="form-group">

// // //     <label>
// // //         Select New Videos
// // //     </label>

// // //     <input
// // //         type="file"
// // //         name="videos"
// // //         accept="video/mp4,video/webm,video/quicktime"
// // //         multiple
// // //     >

// // // </div>


// // // <p
// // //     style="
// // //         margin-top:8px;
// // //         color:#64748b;
// // //         font-size:13px;
// // //     "
// // // >
// // //     You can select multiple videos.
// // //     MP4, WebM and MOV are supported.
// // // </p>


// // // </div>


// // // <!-- =========================
// // //      UPDATE BUTTON
// // // ========================= -->

// // // <button
// // //     type="submit"
// // //     class="update-btn"
// // // >

// // //     💾 Update Product

// // // </button>


// // // </form>


// // // <!-- =========================
// // //      BACK
// // // ========================= -->

// // // <a
// // //     href="/admin/manage-products"
// // //     class="back"
// // // >

// // //     ⬅ Back to Manage Products

// // // </a>


// // // </div>


// // // <script>


// // // // =========================
// // // // ADD COMPOSITION
// // // // =========================

// // // function addComposition() {

// // //     const box =
// // //         document.getElementById(
// // //             "compositionBox"
// // //         );


// // //     if (!box) {
// // //         return;
// // //     }


// // //     const row =
// // //         document.createElement("div");


// // //     row.className =
// // //         "composition-row";


// // //     row.innerHTML = `

// // //         <input
// // //             type="text"
// // //             name="composition[]"
// // //             placeholder="Composition"
// // //         >

// // //         <button
// // //             type="button"
// // //             class="remove-btn"
// // //             onclick="removeComposition(this)"
// // //         >
// // //             ×
// // //         </button>

// // //     `;


// // //     box.appendChild(row);

// // // }


// // // // =========================
// // // // REMOVE COMPOSITION
// // // // =========================

// // // function removeComposition(button) {

// // //     const row =
// // //         button.closest(
// // //             ".composition-row"
// // //         );


// // //     if (!row) {
// // //         return;
// // //     }


// // //     const box =
// // //         document.getElementById(
// // //             "compositionBox"
// // //         );


// // //     if (!box) {
// // //         return;
// // //     }


// // //     const rows =
// // //         box.querySelectorAll(
// // //             ".composition-row"
// // //         );


// // //     // कम से कम एक composition row रहे
// // //     if (rows.length <= 1) {

// // //         const input =
// // //             row.querySelector("input");

// // //         if (input) {
// // //             input.value = "";
// // //         }

// // //         return;
// // //     }


// // //     row.remove();

// // // }


// // // // =========================
// // // // IMAGE VALIDATION
// // // // =========================

// // // const imageInput =
// // //     document.querySelector(
// // //         'input[name="images"]'
// // //     );


// // // if (imageInput) {

// // //     imageInput.addEventListener(
// // //         "change",
// // //         function () {

// // //             const files =
// // //                 Array.from(this.files || []);


// // //             for (const file of files) {

// // //                 if (
// // //                     !file.type.startsWith(
// // //                         "image/"
// // //                     )
// // //                 ) {

// // //                     alert(
// // //                         "Please select only image files."
// // //                     );

// // //                     this.value = "";

// // //                     return;
// // //                 }

// // //             }

// // //         }
// // //     );

// // // }


// // // // =========================
// // // // VIDEO VALIDATION
// // // // =========================

// // // const videoInput =
// // //     document.querySelector(
// // //         'input[name="videos"]'
// // //     );


// // // if (videoInput) {

// // //     videoInput.addEventListener(
// // //         "change",
// // //         function () {

// // //             const files =
// // //                 Array.from(this.files || []);


// // //             const allowedTypes = [

// // //                 "video/mp4",

// // //                 "video/webm",

// // //                 "video/quicktime"

// // //             ];


// // //             for (const file of files) {

// // //                 if (
// // //                     !allowedTypes.includes(
// // //                         file.type
// // //                     )
// // //                 ) {

// // //                     alert(
// // //                         "Please select only MP4, WebM or MOV video files."
// // //                     );

// // //                     this.value = "";

// // //                     return;
// // //                 }


// // //                 // 100 MB maximum per video
// // //                 if (
// // //                     file.size >
// // //                     100 * 1024 * 1024
// // //                 ) {

// // //                     alert(
// // //                         "Each video must be less than 100 MB."
// // //                     );

// // //                     this.value = "";

// // //                     return;
// // //                 }

// // //             }

// // //         }
// // //     );

// // // }


// // // </script>


// // // </body>

// // // </html>

// // // `;

// // // }


// // // module.exports = EditProduct;


// // function EditProduct(product) {

// //     // =========================
// //     // SAFE HTML ESCAPE
// //     // =========================

// //     const escapeHTML = (value) => {

// //         if (value === null || value === undefined) {
// //             return "";
// //         }

// //         return String(value)
// //             .replace(/&/g, "&amp;")
// //             .replace(/</g, "&lt;")
// //             .replace(/>/g, "&gt;")
// //             .replace(/"/g, "&quot;")
// //             .replace(/'/g, "&#039;");
// //     };


// //     // =========================
// //     // DATE FORMAT
// //     // =========================

// //     const formatDate = (value) => {

// //         if (!value) {
// //             return "";
// //         }

// //         try {

// //             const date = new Date(value);

// //             if (isNaN(date.getTime())) {
// //                 return "";
// //             }

// //             return date.toISOString().split("T")[0];

// //         } catch (error) {

// //             return "";

// //         }
// //     };


// //     // =========================
// //     // COMPOSITION
// //     // =========================

// //     let compositions = [];

// //     if (Array.isArray(product.composition)) {

// //         compositions = product.composition
// //             .filter(item => item !== null && item !== undefined)
// //             .map(item => {

// //                 if (typeof item === "object") {

// //                     if (item.name && item.strength) {
// //                         return `${item.name} ${item.strength}`;
// //                     }

// //                     if (item.name) {
// //                         return item.name;
// //                     }

// //                     return "";
// //                 }

// //                 return String(item);
// //             });

// //     } else if (product.composition) {

// //         compositions = [String(product.composition)];

// //     }

// //     if (!compositions.length) {
// //         compositions = [""];
// //     }


// //     // =========================
// //     // IMAGES
// //     // =========================

// //     let images = [];

// //     if (Array.isArray(product.images)) {

// //         images = product.images.filter(Boolean);

// //     }

// //     // Old image field
// //     if (
// //         product.image &&
// //         !images.includes(product.image)
// //     ) {

// //         images.unshift(product.image);

// //     }

// //     // Remove duplicates
// //     images = [...new Set(images)];


// //     // =========================
// //     // IMAGE URL CLEANER
// //     // =========================

// //     const cleanImageUrl = (url) => {

// //         if (!url) {
// //             return "";
// //         }

// //         let clean = String(url).trim();

// //         // Markdown URL:
// //         // [text](https://example.com/image.jpg)

// //         const markdownMatch =
// //             clean.match(/\]\((https?:\/\/[^)]+)\)/);

// //         if (markdownMatch) {

// //             return markdownMatch[1];

// //         }

// //         // [https://example.com/image.jpg]

// //         if (
// //             clean.startsWith("[") &&
// //             clean.endsWith("]")
// //         ) {

// //             clean = clean.slice(1, -1);

// //         }

// //         return clean;
// //     };


// //     images = images
// //         .map(cleanImageUrl)
// //         .filter(Boolean);


// //     // =========================
// //     // VIDEOS
// //     // =========================

// //     let videos = [];

// //     if (Array.isArray(product.videos)) {

// //         videos = product.videos.filter(Boolean);

// //     }

// //     // Old/single video field
// //     if (
// //         product.video &&
// //         !videos.includes(product.video)
// //     ) {

// //         videos.unshift(product.video);

// //     }

// //     // Video URL field
// //     if (
// //         product.videoUrl &&
// //         !videos.includes(product.videoUrl)
// //     ) {

// //         videos.unshift(product.videoUrl);

// //     }

// //     videos = [...new Set(videos)];


// //     // =========================
// //     // RETURN HTML
// //     // =========================

// //     return `

// // <!DOCTYPE html>

// // <html lang="en">

// // <head>

// //     <meta charset="UTF-8">

// //     <meta
// //         name="viewport"
// //         content="width=device-width, initial-scale=1.0"
// //     >

// //     <title>Edit Pharma Product</title>


// //     <style>

// //         /* =========================
// //            RESET
// //         ========================= */

// //         * {
// //             margin: 0;
// //             padding: 0;
// //             box-sizing: border-box;
// //             font-family: "Segoe UI", Arial, sans-serif;
// //         }


// //         /* =========================
// //            BODY
// //         ========================= */

// //         body {

// //             background:
// //                 linear-gradient(
// //                     135deg,
// //                     #2563eb,
// //                     #06b6d4
// //                 );

// //             min-height: 100vh;

// //             padding: 30px 15px;

// //         }


// //         /* =========================
// //            CONTAINER
// //         ========================= */

// //         .container {

// //             width: 100%;

// //             max-width: 1000px;

// //             margin: auto;

// //             background: #ffffff;

// //             padding: 30px;

// //             border-radius: 22px;

// //             box-shadow:
// //                 0 20px 50px
// //                 rgba(0, 0, 0, .18);

// //         }


// //         /* =========================
// //            HEADER
// //         ========================= */

// //         .header {

// //             text-align: center;

// //             margin-bottom: 30px;

// //         }


// //         .header h2 {

// //             color: #1e40af;

// //             font-size: 28px;

// //             margin-bottom: 6px;

// //         }


// //         .header p {

// //             color: #64748b;

// //             font-size: 14px;

// //         }


// //         /* =========================
// //            FORM GRID
// //         ========================= */

// //         .form-grid {

// //             display: grid;

// //             grid-template-columns:
// //                 repeat(2, 1fr);

// //             gap: 18px;

// //         }


// //         /* =========================
// //            FORM GROUP
// //         ========================= */

// //         .form-group {

// //             display: flex;

// //             flex-direction: column;

// //         }


// //         .form-group.full {

// //             grid-column: 1 / -1;

// //         }


// //         label {

// //             font-weight: 700;

// //             color: #1e293b;

// //             margin-bottom: 7px;

// //             font-size: 14px;

// //         }


// //         /* =========================
// //            INPUTS
// //         ========================= */

// //         input,
// //         select,
// //         textarea {

// //             width: 100%;

// //             padding: 12px 13px;

// //             border: 1px solid #d1d5db;

// //             border-radius: 10px;

// //             background: #ffffff;

// //             color: #111827;

// //             font-size: 15px;

// //             outline: none;

// //             transition: .2s;

// //         }


// //         input:focus,
// //         select:focus,
// //         textarea:focus {

// //             border-color: #2563eb;

// //             box-shadow:
// //                 0 0 0 3px
// //                 rgba(37, 99, 235, .10);

// //         }


// //         textarea {

// //             min-height: 120px;

// //             resize: vertical;

// //         }


// //         /* =========================
// //            SECTION
// //         ========================= */

// //         .section {

// //             margin-top: 30px;

// //             padding-top: 23px;

// //             border-top:
// //                 1px solid #e5e7eb;

// //         }


// //         .section-title {

// //             display: flex;

// //             align-items: center;

// //             gap: 8px;

// //             margin-bottom: 16px;

// //             color: #1e40af;

// //             font-size: 19px;

// //             font-weight: 700;

// //         }


// //         /* =========================
// //            COMPOSITION
// //         ========================= */

// //         .composition-row {

// //             display: flex;

// //             gap: 10px;

// //             margin-bottom: 10px;

// //             align-items: center;

// //         }


// //         .composition-row input {

// //             flex: 1;

// //         }


// //         .remove-btn {

// //             width: 45px;

// //             min-width: 45px;

// //             height: 45px;

// //             padding: 0;

// //             border: none;

// //             border-radius: 9px;

// //             background: #dc2626;

// //             color: #ffffff;

// //             font-size: 20px;

// //             font-weight: 700;

// //             cursor: pointer;

// //         }


// //         .remove-btn:hover {

// //             background: #b91c1c;

// //         }


// //         .add-btn {

// //             width: auto;

// //             padding: 11px 18px;

// //             margin-top: 5px;

// //             border: none;

// //             border-radius: 9px;

// //             background: #16a34a;

// //             color: #ffffff;

// //             font-weight: 700;

// //             cursor: pointer;

// //         }


// //         .add-btn:hover {

// //             background: #15803d;

// //         }


// //         /* =========================
// //            IMAGE GRID
// //         ========================= */

// //         .image-grid {

// //             display: grid;

// //             grid-template-columns:
// //                 repeat(4, 1fr);

// //             gap: 15px;

// //         }


// //         .image-card {

// //             border:
// //                 1px solid #e5e7eb;

// //             border-radius: 12px;

// //             padding: 8px;

// //             background: #f8fafc;

// //         }


// //         .image-card img {

// //             width: 100%;

// //             height: 140px;

// //             object-fit: cover;

// //             border-radius: 8px;

// //             display: block;

// //         }


// //         .image-number {

// //             text-align: center;

// //             margin-top: 7px;

// //             font-size: 12px;

// //             color: #64748b;

// //         }


// //         /* =========================
// //            VIDEO GRID
// //         ========================= */

// //         .video-grid {

// //             display: grid;

// //             grid-template-columns:
// //                 repeat(2, 1fr);

// //             gap: 18px;

// //         }


// //         .video-card {

// //             border:
// //                 1px solid #e5e7eb;

// //             border-radius: 12px;

// //             padding: 10px;

// //             background: #f8fafc;

// //         }


// //         .video-card video {

// //             width: 100%;

// //             height: 220px;

// //             object-fit: cover;

// //             border-radius: 9px;

// //             background: #000;

// //             display: block;

// //         }


// //         .video-number {

// //             text-align: center;

// //             margin-top: 8px;

// //             font-size: 12px;

// //             color: #64748b;

// //         }


// //         /* =========================
// //            VIDEO URL
// //         ========================= */

// //         .video-url-box {

// //             margin-top: 15px;

// //         }


// //         .video-help {

// //             margin-top: 7px;

// //             color: #64748b;

// //             font-size: 13px;

// //             line-height: 1.5;

// //         }


// //         /* =========================
// //            NO MEDIA
// //         ========================= */

// //         .no-image,
// //         .no-video {

// //             padding: 30px;

// //             text-align: center;

// //             background: #f8fafc;

// //             border-radius: 10px;

// //             color: #64748b;

// //         }


// //         /* =========================
// //            FILE INPUT
// //         ========================= */

// //         input[type="file"] {

// //             padding: 10px;

// //             background: #f8fafc;

// //             cursor: pointer;

// //         }


// //         /* =========================
// //            UPDATE BUTTON
// //         ========================= */

// //         .update-btn {

// //             width: 100%;

// //             padding: 15px;

// //             margin-top: 30px;

// //             border: none;

// //             border-radius: 12px;

// //             background:
// //                 linear-gradient(
// //                     135deg,
// //                     #2563eb,
// //                     #1d4ed8
// //                 );

// //             color: #ffffff;

// //             font-size: 17px;

// //             font-weight: 700;

// //             cursor: pointer;

// //             transition: .2s;

// //         }


// //         .update-btn:hover {

// //             transform: translateY(-1px);

// //             box-shadow:
// //                 0 8px 20px
// //                 rgba(37, 99, 235, .25);

// //         }


// //         /* =========================
// //            BACK BUTTON
// //         ========================= */

// //         .back {

// //             display: block;

// //             text-align: center;

// //             margin-top: 18px;

// //             padding: 12px;

// //             border-radius: 10px;

// //             background: #f1f5f9;

// //             color: #1e40af;

// //             text-decoration: none;

// //             font-weight: 700;

// //         }


// //         .back:hover {

// //             background: #e2e8f0;

// //         }


// //         /* =========================
// //            MOBILE
// //         ========================= */

// //         @media (max-width: 700px) {

// //             body {

// //                 padding: 10px;

// //             }


// //             .container {

// //                 padding: 18px;

// //                 border-radius: 16px;

// //             }


// //             .header h2 {

// //                 font-size: 22px;

// //             }


// //             .form-grid {

// //                 grid-template-columns: 1fr;

// //                 gap: 15px;

// //             }


// //             .form-group.full {

// //                 grid-column: auto;

// //             }


// //             .image-grid {

// //                 grid-template-columns:
// //                     repeat(2, 1fr);

// //             }


// //             .image-card img {

// //                 height: 120px;

// //             }


// //             .video-grid {

// //                 grid-template-columns: 1fr;

// //             }


// //             .video-card video {

// //                 height: 200px;

// //             }


// //             .composition-row {

// //                 gap: 7px;

// //             }

// //         }


// //         /* =========================
// //            SMALL MOBILE
// //         ========================= */

// //         @media (max-width: 400px) {

// //             .container {

// //                 padding: 14px;

// //             }


// //             input,
// //             select,
// //             textarea {

// //                 font-size: 14px;

// //                 padding: 11px;

// //             }


// //             .image-grid {

// //                 grid-template-columns:
// //                     repeat(2, 1fr);

// //                 gap: 8px;

// //             }


// //             .image-card img {

// //                 height: 100px;

// //             }


// //             .video-card video {

// //                 height: 180px;

// //             }


// //             .remove-btn {

// //                 width: 40px;

// //                 min-width: 40px;

// //                 height: 40px;

// //             }

// //         }

// //     </style>

// // </head>


// // <body>


// // <div class="container">


// //     <!-- =========================
// //          HEADER
// //     ========================= -->

// //     <div class="header">

// //         <h2>
// //             ✏️ Edit Pharma Product
// //         </h2>

// //         <p>
// //             Update product information, images and videos
// //         </p>

// //     </div>


// //     <!-- =========================
// //          FORM
// //     ========================= -->

// //     <form

// //         action="/admin/edit-product/${escapeHTML(product._id)}"

// //         method="POST"

// //         enctype="multipart/form-data"
// //     >


// //         <!-- =========================
// //              BASIC INFORMATION
// //         ========================= -->

// //         <div class="form-grid">


// //             <!-- PRODUCT NAME -->

// //             <div class="form-group">

// //                 <label>
// //                     Product Name *
// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="name"
// //                     value="${escapeHTML(product.name)}"
// //                     required
// //                 >

// //             </div>


// //             <!-- BRAND -->

// //             <div class="form-group">

// //                 <label>
// //                     Brand Name
// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="brand"
// //                     value="${escapeHTML(product.brand)}"
// //                 >

// //             </div>


// //            <div class="form-group">

// //     <label>
// //         Category
// //     </label>

// //     <select name="category">

// //         <option value="">
// //             Select Category
// //         </option>

// //         <option
// //             value="Tablet"
// //             ${product.category === "Tablet" ? "selected" : ""}
// //         >
// //             Tablet
// //         </option>

// //         <option
// //             value="Capsule"
// //             ${product.category === "Capsule" ? "selected" : ""}
// //         >
// //             Capsule
// //         </option>

// //         <option
// //             value="Syrup"
// //             ${product.category === "Syrup" ? "selected" : ""}
// //         >
// //             Syrup
// //         </option>

// //         <option
// //             value="Drops"
// //             ${product.category === "Drops" ? "selected" : ""}
// //         >
// //             Drops
// //         </option>

// //         <option
// //             value="Injection"
// //             ${product.category === "Injection" ? "selected" : ""}
// //         >
// //             Injection
// //         </option>

// //         <option
// //             value="Cream"
// //             ${product.category === "Cream" ? "selected" : ""}
// //         >
// //             Cream
// //         </option>

// //         <!-- SOAP -->
// //         <option
// //             value="Soap"
// //             ${product.category === "Soap" ? "selected" : ""}
// //         >
// //             Soap
// //         </option>

// //         <option
// //             value="Other"
// //             ${product.category === "Other" ? "selected" : ""}
// //         >
// //             Other
// //         </option>

// //     </select>

// // </div>


// //             <!-- MANUFACTURER -->

// //             <div class="form-group">

// //                 <label>
// //                     Manufacturer
// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="manufacturer"
// //                     value="${escapeHTML(product.manufacturer)}"
// //                 >

// //             </div>


// //             <!-- MRP -->

// //             <div class="form-group">

// //                 <label>
// //                     MRP ₹
// //                 </label>

// //                 <input
// //                     type="number"
// //                     name="mrp"
// //                     value="${product.mrp ?? ""}"
// //                     min="0"
// //                     step="0.01"
// //                 >

// //             </div>


// //             <!-- SELLING PRICE -->

// //             <div class="form-group">

// //                 <label>
// //                     Selling Price ₹ *
// //                 </label>

// //                 <input
// //                     type="number"
// //                     name="price"
// //                     value="${product.price ?? ""}"
// //                     min="0"
// //                     step="0.01"
// //                     required
// //                 >

// //             </div>


// //             <!-- STOCK -->

// //             <div class="form-group">

// //                 <label>
// //                     Stock Quantity
// //                 </label>

// //                 <input
// //                     type="number"
// //                     name="stock"
// //                     value="${product.stock ?? 0}"
// //                     min="0"
// //                 >

// //             </div>


// //             <!-- PACK SIZE -->

// //             <div class="form-group">

// //                 <label>
// //                     Pack Size
// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="packSize"
// //                     value="${escapeHTML(product.packSize)}"
// //                     placeholder="e.g. 200 ml"
// //                 >

// //             </div>


// //             <!-- BATCH -->

// //             <div class="form-group">

// //                 <label>
// //                     Batch Number
// //                 </label>

// //                 <input
// //                     type="text"
// //                     name="batchNo"
// //                     value="${escapeHTML(product.batchNo)}"
// //                 >

// //             </div>


// //             <!-- MFG DATE -->

// //             <div class="form-group">

// //                 <label>
// //                     Manufacturing Date
// //                 </label>

// //                 <input
// //                     type="date"
// //                     name="mfgDate"
// //                     value="${formatDate(product.mfgDate)}"
// //                 >

// //             </div>


// //             <!-- EXPIRY DATE -->

// //             <div class="form-group">

// //                 <label>
// //                     Expiry Date
// //                 </label>

// //                 <input
// //                     type="date"
// //                     name="expDate"
// //                     value="${formatDate(product.expDate)}"
// //                 >

// //             </div>


// //         </div>


// //         <!-- =========================
// //              COMPOSITION
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 💊 Composition
// //             </div>


// //             <div id="compositionBox">

// //                 ${compositions.map((item, index) => `

// //                     <div class="composition-row">

// //                         <input
// //                             type="text"
// //                             name="composition[]"
// //                             value="${escapeHTML(item)}"
// //                             placeholder="Composition ${index + 1}"
// //                         >

// //                         <button
// //                             type="button"
// //                             class="remove-btn"
// //                             onclick="removeComposition(this)"
// //                             ${index === 0 ? 'style="visibility:hidden"' : ""}
// //                         >
// //                             ×
// //                         </button>

// //                     </div>

// //                 `).join("")}

// //             </div>


// //             <button
// //                 type="button"
// //                 class="add-btn"
// //                 onclick="addComposition()"
// //             >
// //                 + Add Composition
// //             </button>

// //         </div>


// //         <!-- =========================
// //              PRODUCT DETAILS
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 📋 Product Details
// //             </div>


// //             <div class="form-grid">


// //                 <!-- USES -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Uses
// //                     </label>

// //                     <textarea
// //                         name="uses"
// //                         placeholder="Enter product uses"
// //                     >${escapeHTML(product.uses)}</textarea>

// //                 </div>


// //                 <!-- BENEFITS -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Benefits
// //                     </label>

// //                     <textarea
// //                         name="benefits"
// //                         placeholder="Enter product benefits"
// //                     >${escapeHTML(product.benefits)}</textarea>

// //                 </div>


// //                 <!-- DOSAGE -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Dosage
// //                     </label>

// //                     <textarea
// //                         name="dosage"
// //                         placeholder="Enter dosage"
// //                     >${escapeHTML(product.dosage)}</textarea>

// //                 </div>


// //                 <!-- SIDE EFFECTS -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Side Effects
// //                     </label>

// //                     <textarea
// //                         name="sideEffects"
// //                         placeholder="Enter side effects"
// //                     >${escapeHTML(product.sideEffects)}</textarea>

// //                 </div>


// //                 <!-- STORAGE -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Storage Instructions
// //                     </label>

// //                     <textarea
// //                         name="storage"
// //                         placeholder="Enter storage instructions"
// //                     >${escapeHTML(product.storage)}</textarea>

// //                 </div>


// //                 <!-- DESCRIPTION -->

// //                 <div class="form-group full">

// //                     <label>
// //                         Full Description
// //                     </label>

// //                     <textarea
// //                         name="description"
// //                         placeholder="Enter full product description"
// //                     >${escapeHTML(product.description)}</textarea>

// //                 </div>


// //             </div>

// //         </div>


// //         <!-- =========================
// //              EXISTING IMAGES
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 🖼 Existing Product Images
// //             </div>


// //             ${
// //                 images.length

// //                 ?

// //                 `
// //                 <div class="image-grid">

// //                     ${images.map((img, index) => {

// //                         const safeImg =
// //                             cleanImageUrl(img);

// //                         return `

// //                             <div class="image-card">

// //                                 <img
// //                                     src="${escapeHTML(safeImg)}"
// //                                     alt="Product Image ${index + 1}"
// //                                     loading="lazy"
// //                                     onerror="this.style.display='none'"
// //                                 >

// //                                 <div class="image-number">
// //                                     Image ${index + 1}
// //                                 </div>

// //                             </div>

// //                         `;

// //                     }).join("")}

// //                 </div>
// //                 `

// //                 :

// //                 `
// //                 <div class="no-image">
// //                     No existing product image
// //                 </div>
// //                 `
// //             }

// //         </div>


// //         <!-- =========================
// //              ADD NEW IMAGES
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 📷 Add New Product Images
// //             </div>


// //             <div class="form-group">

// //                 <label>
// //                     Select New Images
// //                 </label>

// //                 <input
// //                     type="file"
// //                     name="images"
// //                     accept="image/*"
// //                     multiple
// //                 >

// //             </div>


// //             <p
// //                 style="
// //                     margin-top:8px;
// //                     color:#64748b;
// //                     font-size:13px;
// //                 "
// //             >
// //                 You can select multiple new images.
// //             </p>

// //         </div>


// //         <!-- =========================
// //              EXISTING VIDEOS
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 🎥 Existing Product Videos
// //             </div>


// //             ${
// //                 videos.length

// //                 ?

// //                 `
// //                 <div class="video-grid">

// //                     ${videos.map((video, index) => {

// //                         return `

// //                             <div class="video-card">

// //                                 <video
// //                                     controls
// //                                     preload="metadata"
// //                                 >
// //                                     <source
// //                                         src="${escapeHTML(video)}"
// //                                     >
// //                                     Your browser does not support video.
// //                                 </video>

// //                                 <div class="video-number">
// //                                     Video ${index + 1}
// //                                 </div>

// //                             </div>

// //                         `;

// //                     }).join("")}

// //                 </div>
// //                 `

// //                 :

// //                 `
// //                 <div class="no-video">
// //                     No existing product video
// //                 </div>
// //                 `
// //             }

// //         </div>


// //         <!-- =========================
// //              VIDEO URL
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 🔗 Add Video URL
// //             </div>


// //             <div class="form-group">

// //                 <label>
// //                     Product Video URL
// //                 </label>

// //                 <input
// //                     type="url"
// //                     name="videoUrl"
// //                     value="${escapeHTML(product.videoUrl || "")}"
// //                     placeholder="https://example.com/product-video.mp4"
// //                 >

// //                 <p class="video-help">
// //                     You can add a direct MP4/video URL.
// //                 </p>

// //             </div>

// //         </div>


// //         <!-- =========================
// //              NEW VIDEO UPLOAD
// //         ========================= -->

// //         <div class="section">

// //             <div class="section-title">
// //                 🎬 Upload New Product Video
// //             </div>


// //             <div class="form-group">

// //                 <label>
// //                     Select Video
// //                 </label>

// //                 <input
// //                     type="file"
// //                     name="videos"
// //                     accept="video/*"
// //                     multiple
// //                 >

// //                 <p class="video-help">
// //                     You can select one or multiple product videos.
// //                 </p>

// //             </div>

// //         </div>


// //         <!-- =========================
// //              UPDATE BUTTON
// //         ========================= -->

// //         <button
// //             type="submit"
// //             class="update-btn"
// //         >
// //             💾 Update Product
// //         </button>


// //     </form>


// //     <!-- =========================
// //          BACK
// //     ========================= -->

// //     <a
// //         href="/admin/manage-products"
// //         class="back"
// //     >
// //         ⬅ Back to Manage Products
// //     </a>


// // </div>


// // <script>

// //     // =========================
// //     // ADD COMPOSITION
// //     // =========================

// //     function addComposition() {

// //         const box =
// //             document.getElementById("compositionBox");

// //         if (!box) {
// //             return;
// //         }


// //         const row =
// //             document.createElement("div");

// //         row.className =
// //             "composition-row";


// //         row.innerHTML = \`
            
// //             <input
// //                 type="text"
// //                 name="composition[]"
// //                 placeholder="Composition"
// //             >

// //             <button
// //                 type="button"
// //                 class="remove-btn"
// //                 onclick="removeComposition(this)"
// //             >
// //                 ×
// //             </button>

// //         \`;


// //         box.appendChild(row);

// //     }


// //     // =========================
// //     // REMOVE COMPOSITION
// //     // =========================

// //     function removeComposition(button) {

// //         const row =
// //             button.parentElement;

// //         if (!row) {
// //             return;
// //         }


// //         const box =
// //             document.getElementById("compositionBox");


// //         if (!box) {
// //             return;
// //         }


// //         const rows =
// //             box.querySelectorAll(".composition-row");


// //         // कम से कम एक composition हमेशा रहे
// //         if (rows.length <= 1) {

// //             const input =
// //                 row.querySelector("input");

// //             if (input) {
// //                 input.value = "";
// //             }

// //             return;
// //         }


// //         row.remove();

// //     }


// //     // =========================
// //     // IMAGE VALIDATION
// //     // =========================

// //     const imageInput =
// //         document.querySelector(
// //             'input[name="images"]'
// //         );


// //     if (imageInput) {

// //         imageInput.addEventListener(
// //             "change",
// //             function () {

// //                 const files =
// //                     Array.from(this.files || []);


// //                 for (const file of files) {

// //                     if (
// //                         !file.type.startsWith("image/")
// //                     ) {

// //                         alert(
// //                             "Please select only image files."
// //                         );

// //                         this.value = "";

// //                         return;
// //                     }

// //                 }

// //             }
// //         );

// //     }


// //     // =========================
// //     // VIDEO VALIDATION
// //     // =========================

// //     const videoInput =
// //         document.querySelector(
// //             'input[name="videos"]'
// //         );


// //     if (videoInput) {

// //         videoInput.addEventListener(
// //             "change",
// //             function () {

// //                 const files =
// //                     Array.from(this.files || []);


// //                 for (const file of files) {

// //                     if (
// //                         !file.type.startsWith("video/")
// //                     ) {

// //                         alert(
// //                             "Please select only video files."
// //                         );

// //                         this.value = "";

// //                         return;
// //                     }

// //                 }

// //             }
// //         );

// //     }


// //     // =========================
// //     // FORM SUBMIT
// //     // =========================

// //     const form =
// //         document.querySelector("form");


// //     if (form) {

// //         form.addEventListener(
// //             "submit",
// //             function () {

// //                 const button =
// //                     form.querySelector(
// //                         ".update-btn"
// //                     );


// //                 if (button) {

// //                     button.disabled = true;

// //                     button.innerHTML =
// //                         "⏳ Updating Product...";

// //                 }

// //             }
// //         );

// //     }

// // </script>


// // </body>

// // </html>

// // `;

// // }


// // module.exports = EditProduct;



// function EditProduct(product = {}) {

//     const escapeHTML = (value) => {

//         if (value === null || value === undefined) {
//             return "";
//         }

//         return String(value)
//             .replace(/&/g, "&amp;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;")
//             .replace(/"/g, "&quot;")
//             .replace(/'/g, "&#039;");
//     };


//     const formatDate = (value) => {

//         if (!value) {
//             return "";
//         }

//         const date = new Date(value);

//         if (isNaN(date.getTime())) {
//             return "";
//         }

//         return date.toISOString().split("T")[0];
//     };


//     let compositions = [];

//     if (Array.isArray(product.composition)) {

//         compositions = product.composition
//             .filter(Boolean)
//             .map((item) => {

//                 if (typeof item === "object") {
//                     return [
//                         item.name || "",
//                         item.strength || ""
//                     ].filter(Boolean).join(" ");
//                 }

//                 return String(item);
//             });

//     } else if (product.composition) {

//         compositions = [String(product.composition)];

//     }

//     if (!compositions.length) {
//         compositions = [""];
//     }


//     let images = Array.isArray(product.images)
//         ? product.images.filter(Boolean)
//         : [];

//     if (product.image && !images.includes(product.image)) {
//         images.unshift(product.image);
//     }

//     images = [...new Set(images)];


//     let videos = Array.isArray(product.videos)
//         ? product.videos.filter(Boolean)
//         : [];

//     if (product.video && !videos.includes(product.video)) {
//         videos.unshift(product.video);
//     }

//     if (product.videoUrl && !videos.includes(product.videoUrl)) {
//         videos.unshift(product.videoUrl);
//     }

//     videos = [...new Set(videos)];


//     const mrp = Number(product.mrp) || 0;
//     const price = Number(product.price) || 0;

//     const savedDiscount = Number(product.discountPercentage);

//     const discountPercentage = Number.isFinite(savedDiscount)
//         ? Math.min(100, Math.max(0, savedDiscount))
//         : (
//             mrp > 0
//                 ? Math.min(
//                     100,
//                     Math.max(
//                         0,
//                         ((mrp - price) / mrp) * 100
//                     )
//                 )
//                 : 0
//         );


//     return `

// <!DOCTYPE html>
// <html lang="en">

// <head>

//     <meta charset="UTF-8">

//     <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1.0"
//     >

//     <title>Edit Pharma Product</title>

//     <style>

//         *{
//             box-sizing:border-box;
//             font-family:"Segoe UI",Arial,sans-serif;
//         }

//         body{
//             margin:0;
//             min-height:100vh;
//             padding:25px 12px;
//             background:linear-gradient(135deg,#2563eb,#06b6d4);
//         }

//         .container{
//             width:100%;
//             max-width:1050px;
//             margin:auto;
//             padding:28px;
//             border-radius:20px;
//             background:#fff;
//             box-shadow:0 20px 50px rgba(0,0,0,.2);
//         }

//         .header{
//             margin-bottom:25px;
//             padding-bottom:16px;
//             border-bottom:1px solid #e5e7eb;
//         }

//         .header h2{
//             margin:0 0 7px;
//             color:#1e3a8a;
//         }

//         .header p{
//             margin:0;
//             color:#64748b;
//         }

//         .section{
//             margin-top:28px;
//         }

//         .section-title{
//             margin-bottom:14px;
//             padding-bottom:10px;
//             color:#1e3a8a;
//             font-size:19px;
//             font-weight:700;
//             border-bottom:2px solid #dbeafe;
//         }

//         .form-grid{
//             display:grid;
//             grid-template-columns:repeat(2,minmax(0,1fr));
//             gap:16px;
//         }

//         .form-group{
//             display:flex;
//             flex-direction:column;
//             gap:7px;
//         }

//         .form-group.full{
//             grid-column:1/-1;
//         }

//         label{
//             color:#374151;
//             font-weight:650;
//         }

//         input,
//         textarea,
//         select{
//             width:100%;
//             padding:12px 13px;
//             font-size:15px;
//             color:#111827;
//             border:1px solid #cbd5e1;
//             border-radius:10px;
//             outline:none;
//         }

//         input:focus,
//         textarea:focus,
//         select:focus{
//             border-color:#2563eb;
//             box-shadow:0 0 0 3px rgba(37,99,235,.12);
//         }

//         input[readonly]{
//             color:#1d4ed8;
//             font-weight:700;
//             background:#eff6ff;
//         }

//         textarea{
//             min-height:100px;
//             resize:vertical;
//         }

//         .composition-row{
//             display:grid;
//             grid-template-columns:1fr auto;
//             gap:10px;
//             margin-bottom:10px;
//         }

//         .add-btn,
//         .remove-btn,
//         .update-btn{
//             border:0;
//             cursor:pointer;
//             font-weight:700;
//             border-radius:9px;
//         }

//         .add-btn{
//             padding:11px 16px;
//             color:#fff;
//             background:#2563eb;
//         }

//         .remove-btn{
//             min-width:46px;
//             color:#fff;
//             background:#dc2626;
//             font-size:20px;
//         }

//         .update-btn{
//             width:100%;
//             margin-top:30px;
//             padding:15px;
//             color:#fff;
//             font-size:17px;
//             background:linear-gradient(135deg,#2563eb,#1d4ed8);
//         }

//         .back{
//             display:block;
//             width:max-content;
//             margin:20px auto 0;
//             color:#1d4ed8;
//             font-weight:700;
//             text-decoration:none;
//         }

//         .image-grid,
//         .video-grid{
//             display:grid;
//             grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
//             gap:14px;
//         }

//         .media-card{
//             overflow:hidden;
//             border:1px solid #e2e8f0;
//             border-radius:12px;
//             background:#f8fafc;
//         }

//         .media-card img,
//         .media-card video{
//             display:block;
//             width:100%;
//             height:150px;
//             object-fit:cover;
//             background:#e2e8f0;
//         }

//         .media-name{
//             padding:9px;
//             color:#475569;
//             font-size:13px;
//             text-align:center;
//         }

//         .empty-box{
//             padding:16px;
//             color:#64748b;
//             border:1px dashed #cbd5e1;
//             border-radius:10px;
//             background:#f8fafc;
//         }

//         .help{
//             margin:0;
//             color:#64748b;
//             font-size:13px;
//         }

//         @media(max-width:700px){

//             body{
//                 padding:10px;
//             }

//             .container{
//                 padding:17px;
//                 border-radius:14px;
//             }

//             .form-grid,
//             .composition-row{
//                 grid-template-columns:1fr;
//             }

//             .form-group.full{
//                 grid-column:auto;
//             }

//             .remove-btn{
//                 min-height:42px;
//             }
//         }

//     </style>

// </head>

// <body>

// <div class="container">

//     <div class="header">
//         <h2>✏️ Edit Pharma Product</h2>
//         <p>Update product information, images and videos</p>
//     </div>

//     <form
//         action="/admin/edit-product/${escapeHTML(product._id)}"
//         method="POST"
//         enctype="multipart/form-data"
//     >

//         <div class="section">

//             <div class="section-title">
//                 📦 Basic Product Information
//             </div>

//             <div class="form-grid">

//                 <div class="form-group">
//                     <label>Product Name *</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value="${escapeHTML(product.name)}"
//                         required
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Brand Name</label>
//                     <input
//                         type="text"
//                         name="brand"
//                         value="${escapeHTML(product.brand)}"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Category</label>

//                     <select name="category">

//                         <option value="">
//                             Select Category
//                         </option>

//                         <option
//                             value="Tablet"
//                             ${product.category === "Tablet" ? "selected" : ""}
//                         >
//                             Tablet
//                         </option>

//                         <option
//                             value="Capsule"
//                             ${product.category === "Capsule" ? "selected" : ""}
//                         >
//                             Capsule
//                         </option>

//                         <option
//                             value="Syrup"
//                             ${product.category === "Syrup" ? "selected" : ""}
//                         >
//                             Syrup
//                         </option>

//                         <option
//                             value="Drops"
//                             ${product.category === "Drops" ? "selected" : ""}
//                         >
//                             Drops
//                         </option>

//                         <option
//                             value="Injection"
//                             ${product.category === "Injection" ? "selected" : ""}
//                         >
//                             Injection
//                         </option>

//                         <option
//                             value="Cream"
//                             ${product.category === "Cream" ? "selected" : ""}
//                         >
//                             Cream
//                         </option>

//                         <option
//                             value="Soap"
//                             ${product.category === "Soap" ? "selected" : ""}
//                         >
//                             Soap
//                         </option>

//                         <option
//                             value="Other"
//                             ${product.category === "Other" ? "selected" : ""}
//                         >
//                             Other
//                         </option>

//                     </select>
//                 </div>

//                 <div class="form-group">
//                     <label>Manufacturer</label>
//                     <input
//                         type="text"
//                         name="manufacturer"
//                         value="${escapeHTML(product.manufacturer)}"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>MRP ₹ *</label>
//                     <input
//                         type="number"
//                         id="mrp"
//                         name="mrp"
//                         value="${product.mrp ?? ""}"
//                         min="0"
//                         step="0.01"
//                         required
//                         oninput="calculateSellingPrice()"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Discount %</label>
//                     <input
//                         type="number"
//                         id="discountPercentage"
//                         name="discountPercentage"
//                         value="${discountPercentage.toFixed(2)}"
//                         min="0"
//                         max="100"
//                         step="0.01"
//                         placeholder="e.g. 10"
//                         oninput="calculateSellingPrice()"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Selling Price ₹ * (Auto Calculated)</label>
//                     <input
//                         type="number"
//                         id="price"
//                         name="price"
//                         value="${product.price ?? ""}"
//                         min="0"
//                         step="0.01"
//                         readonly
//                         required
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Stock Quantity</label>
//                     <input
//                         type="number"
//                         name="stock"
//                         value="${product.stock ?? 0}"
//                         min="0"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Pack Size</label>
//                     <input
//                         type="text"
//                         name="packSize"
//                         value="${escapeHTML(product.packSize)}"
//                         placeholder="e.g. 200 ml"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Batch Number</label>
//                     <input
//                         type="text"
//                         name="batchNo"
//                         value="${escapeHTML(product.batchNo)}"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Manufacturing Date</label>
//                     <input
//                         type="date"
//                         name="mfgDate"
//                         value="${formatDate(product.mfgDate)}"
//                     >
//                 </div>

//                 <div class="form-group">
//                     <label>Expiry Date</label>
//                     <input
//                         type="date"
//                         name="expDate"
//                         value="${formatDate(product.expDate)}"
//                     >
//                 </div>

//             </div>
//         </div>

//         <div class="section">

//             <div class="section-title">
//                 💊 Composition
//             </div>

//             <div id="compositionBox">

//                 ${compositions.map((item, index) => `

//                     <div class="composition-row">

//                         <input
//                             type="text"
//                             name="composition[]"
//                             value="${escapeHTML(item)}"
//                             placeholder="Composition ${index + 1}"
//                         >

//                         <button
//                             type="button"
//                             class="remove-btn"
//                             onclick="removeComposition(this)"
//                         >
//                             ×
//                         </button>

//                     </div>

//                 `).join("")}

//             </div>

//             <button
//                 type="button"
//                 class="add-btn"
//                 onclick="addComposition()"
//             >
//                 + Add Composition
//             </button>

//         </div>

//         <div class="section">

//             <div class="section-title">
//                 📋 Product Details
//             </div>

//             <div class="form-grid">

//                 <div class="form-group full">
//                     <label>Uses</label>
//                     <textarea
//                         name="uses"
//                         placeholder="Enter product uses"
//                     >${escapeHTML(product.uses)}</textarea>
//                 </div>

//                 <div class="form-group full">
//                     <label>Benefits</label>
//                     <textarea
//                         name="benefits"
//                         placeholder="Enter product benefits"
//                     >${escapeHTML(product.benefits)}</textarea>
//                 </div>

//                 <div class="form-group full">
//                     <label>Dosage</label>
//                     <textarea
//                         name="dosage"
//                         placeholder="Enter dosage"
//                     >${escapeHTML(product.dosage)}</textarea>
//                 </div>

//                 <div class="form-group full">
//                     <label>Side Effects</label>
//                     <textarea
//                         name="sideEffects"
//                         placeholder="Enter side effects"
//                     >${escapeHTML(product.sideEffects)}</textarea>
//                 </div>

//                 <div class="form-group full">
//                     <label>Storage Instructions</label>
//                     <textarea
//                         name="storage"
//                         placeholder="Enter storage instructions"
//                     >${escapeHTML(product.storage)}</textarea>
//                 </div>

//                 <div class="form-group full">
//                     <label>Full Description</label>
//                     <textarea
//                         name="description"
//                         placeholder="Enter full product description"
//                     >${escapeHTML(product.description)}</textarea>
//                 </div>

//             </div>
//         </div>

//         <div class="section">

//             <div class="section-title">
//                 🖼 Existing Product Images
//             </div>

//             ${
//                 images.length
//                     ? `
//                         <div class="image-grid">

//                             ${images.map((image, index) => `

//                                 <div class="media-card">

//                                     <img
//                                         src="${escapeHTML(image)}"
//                                         alt="Product Image ${index + 1}"
//                                         onerror="this.style.display='none'"
//                                     >

//                                     <div class="media-name">
//                                         Image ${index + 1}
//                                     </div>

//                                 </div>

//                             `).join("")}

//                         </div>
//                     `
//                     : `
//                         <div class="empty-box">
//                             No existing product image.
//                         </div>
//                     `
//             }

//         </div>

//         <div class="section">

//             <div class="section-title">
//                 📷 Add New Product Images
//             </div>

//             <div class="form-group">

//                 <label>Select New Images</label>

//                 <input
//                     type="file"
//                     name="images"
//                     accept="image/*"
//                     multiple
//                 >

//                 <p class="help">
//                     You can select multiple new images.
//                 </p>

//             </div>

//         </div>

//         <div class="section">

//             <div class="section-title">
//                 🎥 Existing Product Videos
//             </div>

//             ${
//                 videos.length
//                     ? `
//                         <div class="video-grid">

//                             ${videos.map((video, index) => `

//                                 <div class="media-card">

//                                     <video controls preload="metadata">
//                                         <source src="${escapeHTML(video)}">
//                                         Your browser does not support video.
//                                     </video>

//                                     <div class="media-name">
//                                         Video ${index + 1}
//                                     </div>

//                                 </div>

//                             `).join("")}

//                         </div>
//                     `
//                     : `
//                         <div class="empty-box">
//                             No existing product video.
//                         </div>
//                     `
//             }

//         </div>

//         <div class="section">

//             <div class="section-title">
//                 🔗 Add Video URL
//             </div>

//             <div class="form-group">

//                 <label>Product Video URL</label>

//                 <input
//                     type="url"
//                     name="videoUrl"
//                     value="${escapeHTML(product.videoUrl || "")}"
//                     placeholder="https://example.com/product-video.mp4"
//                 >

//                 <p class="help">
//                     You can add a direct video URL.
//                 </p>

//             </div>

//         </div>

//         <div class="section">

//             <div class="section-title">
//                 🎬 Upload New Product Video
//             </div>

//             <div class="form-group">

//                 <label>Select Video</label>

//                 <input
//                     type="file"
//                     name="videos"
//                     accept="video/*"
//                     multiple
//                 >

//                 <p class="help">
//                     You can select one or multiple product videos.
//                 </p>

//             </div>

//         </div>

//         <button
//             type="submit"
//             class="update-btn"
//         >
//             💾 Update Product
//         </button>

//     </form>

//     <a
//         href="/admin/manage-products"
//         class="back"
//     >
//         ⬅ Back to Manage Products
//     </a>

// </div>

// <script>

// function calculateSellingPrice() {

//     const mrp = Number(
//         document.getElementById("mrp").value || 0
//     );

//     let discount = Number(
//         document.getElementById("discountPercentage").value || 0
//     );

//     if (discount < 0) {
//         discount = 0;
//     }

//     if (discount > 100) {
//         discount = 100;
//     }

//     const sellingPrice =
//         mrp - (mrp * discount / 100);

//     document.getElementById("price").value =
//         mrp > 0
//             ? sellingPrice.toFixed(2)
//             : "";
// }


// function addComposition() {

//     const box =
//         document.getElementById("compositionBox");

//     const row =
//         document.createElement("div");

//     row.className =
//         "composition-row";

//     row.innerHTML = \`

//         <input
//             type="text"
//             name="composition[]"
//             placeholder="Composition name"
//         >

//         <button
//             type="button"
//             class="remove-btn"
//             onclick="removeComposition(this)"
//         >
//             ×
//         </button>
//     \`;

//     box.appendChild(row);
// }


// function removeComposition(button) {

//     const rows =
//         document.querySelectorAll(".composition-row");

//     if (rows.length > 1) {
//         button.parentElement.remove();
//     }
// }


// document.querySelector("form").addEventListener(
//     "submit",
//     function() {

//         const button =
//             document.querySelector(".update-btn");

//         button.disabled = true;
//         button.innerHTML = "⏳ Updating Product...";
//     }
// );

// </script>

// </body>
// </html>

// `;
// }

// module.exports = EditProduct;


function EditProduct(product = {}) {

    const escapeHTML = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };


    const formatDate = (value) => {
        if (!value) {
            return "";
        }

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return "";
        }

        return date.toISOString().split("T")[0];
    };


    let compositions = [];

    if (Array.isArray(product.composition)) {

        compositions = product.composition
            .filter(Boolean)
            .map((item) => {

                if (typeof item === "object") {
                    return [
                        item.name || "",
                        item.strength || ""
                    ].filter(Boolean).join(" ");
                }

                return String(item);
            });

    } else if (product.composition) {
        compositions = [String(product.composition)];
    }

    if (!compositions.length) {
        compositions = [""];
    }


    const getMediaURL = (media) => {

        if (!media) {
            return "";
        }

        if (typeof media === "object") {
            return String(
                media.url ||
                media.secure_url ||
                media.path ||
                ""
            ).trim();
        }

        return String(media).trim();
    };


    let images = Array.isArray(product.images)
        ? product.images
            .map(getMediaURL)
            .filter(Boolean)
        : [];

    const mainImage = getMediaURL(product.image);

    if (mainImage && !images.includes(mainImage)) {
        images.unshift(mainImage);
    }

    images = [...new Set(images)];


    let videos = Array.isArray(product.videos)
        ? product.videos.filter(Boolean)
        : [];

    if (product.video && !videos.includes(product.video)) {
        videos.unshift(product.video);
    }

    if (product.videoUrl && !videos.includes(product.videoUrl)) {
        videos.unshift(product.videoUrl);
    }

    videos = [...new Set(videos)];


    const mrp = Number(product.mrp) || 0;
    const price = Number(product.price) || 0;

    const savedDiscount = Number(product.discountPercentage);

    const discountPercentage = Number.isFinite(savedDiscount)
        ? Math.min(100, Math.max(0, savedDiscount))
        : (
            mrp > 0
                ? Math.min(
                    100,
                    Math.max(
                        0,
                        ((mrp - price) / mrp) * 100
                    )
                )
                : 0
        );


    return `

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Edit Pharma Product</title>

    <style>

        *{
            box-sizing:border-box;
            font-family:"Segoe UI",Arial,s-serif;
        }

        body{
            margin:0;
            min-height:100vh;
            padding:25px 12px;
            background:linear-gradient(135deg,#2563eb,#06b6d4);
        }

        .container{
            width:100%;
            max-width:1050px;
            margin:auto;
            padding:28px;
            border-radius:20px;
            background:#fff;
            box-shadow:0 20px 50px rgba(0,0,0,.2);
        }

        .header{
            margin-bottom:25px;
            padding-bottom:16px;
            border-bottom:1px solid #e5e7eb;
        }

        .header h2{
            margin:0 0 7px;
            color:#1e3a8a;
        }

        .header p{
            margin:0;
            color:#64748b;
        }

        .section{
            margin-top:28px;
        }

        .section-title{
            margin-bottom:14px;
            padding-bottom:10px;
            color:#1e3a8a;
            font-size:19px;
            font-weight:700;
            border-bottom:2px solid #dbeafe;
        }

        .form-grid{
            display:grid;
            grid-template-columns:repeat(2,minmax(0,1fr));
            gap:16px;
        }

        .form-group{
            display:flex;
            flex-direction:column;
            gap:7px;
        }

        .form-group.full{
            grid-column:1/-1;
        }

        label{
            color:#374151;
            font-weight:650;
        }

        input,
        textarea,
        select{
            width:100%;
            padding:12px 13px;
            font-size:15px;
            color:#111827;
            border:1px solid #cbd5e1;
            border-radius:10px;
            outline:none;
        }

        input:focus,
        textarea:focus,
        select:focus{
            border-color:#2563eb;
            box-shadow:0 0 0 3px rgba(37,99,235,.12);
        }

        input[readonly]{
            color:#1d4ed8;
            font-weight:700;
            background:#eff6ff;
        }

        textarea{
            min-height:100px;
            resize:vertical;
        }

        .composition-row{
            display:grid;
            grid-template-columns:1fr auto;
            gap:10px;
            margin-bottom:10px;
        }

        .add-btn,
        .remove-btn,
        .update-btn{
            border:0;
            cursor:pointer;
            font-weight:700;
            border-radius:9px;
        }

        .add-btn{
            padding:11px 16px;
            color:#fff;
            background:#2563eb;
        }

        .remove-btn{
            min-width:46px;
            color:#fff;
            background:#dc2626;
            font-size:20px;
        }

        .update-btn{
            width:100%;
            margin-top:30px;
            padding:15px;
            color:#fff;
            font-size:17px;
            background:linear-gradient(135deg,#2563eb,#1d4ed8);
        }

        .update-btn:disabled{
            opacity:.7;
            cursor:not-allowed;
        }

        .back{
            display:block;
            width:max-content;
            margin:20px auto 0;
            color:#1d4ed8;
            font-weight:700;
            text-decoration:none;
        }

        .image-grid,
        .video-grid{
            display:grid;
            grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
            gap:14px;
        }

        .media-card{
            overflow:hidden;
            border:1px solid #e2e8f0;
            border-radius:12px;
            background:#f8fafc;
            transition:.2s ease;
        }

        .media-card img,
        .media-card video{
            display:block;
            width:100%;
            height:150px;
            object-fit:cover;
            background:#e2e8f0;
        }

        .media-name{
            padding:9px;
            color:#475569;
            font-size:13px;
            text-align:center;
        }

        .image-remove-control{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:7px;
            margin:0 9px 10px;
            padding:9px 10px;
            color:#b91c1c;
            font-size:13px;
            font-weight:800;
            border:1px solid #fecaca;
            border-radius:9px;
            background:#fef2f2;
            cursor:pointer;
            user-select:none;
        }

        .image-remove-control input{
            width:17px;
            height:17px;
            margin:0;
            accent-color:#dc2626;
            cursor:pointer;
        }

        .media-card.image-marked-remove{
            border-color:#ef4444;
            background:#fff1f2;
            box-shadow:0 0 0 3px rgba(239,68,68,.12);
        }

        .media-card.image-marked-remove img{
            opacity:.28;
            filter:grayscale(1);
        }

        .media-card.image-marked-remove .media-name{
            color:#b91c1c;
            font-weight:800;
            text-decoration:line-through;
        }

        .remove-help{
            margin:12px 0 0;
            color:#64748b;
            font-size:13px;
        }

        .empty-box{
            padding:16px;
            color:#64748b;
            border:1px dashed #cbd5e1;
            border-radius:10px;
            background:#f8fafc;
        }

        .help{
            margin:0;
            color:#64748b;
            font-size:13px;
        }

        @media(max-width:700px){

            body{
                padding:10px;
            }

            .container{
                padding:17px;
                border-radius:14px;
            }

            .form-grid,
            .composition-row{
                grid-template-columns:1fr;
            }

            .form-group.full{
                grid-column:auto;
            }

            .remove-btn{
                min-height:42px;
            }

            .image-grid,
            .video-grid{
                grid-template-columns:repeat(2,minmax(0,1fr));
            }
        }

    </style>

</head>

<body>

<div class="container">

    <div class="header">
        <h2>✏️ Edit Pharma Product</h2>
        <p>Update product information, images and videos</p>
    </div>

    <form
        action="/admin/edit-product/${escapeHTML(product._id)}"
        method="POST"
        enctype="multipart/form-data"
    >

        <div class="section">

            <div class="section-title">
                📦 Basic Product Information
            </div>

            <div class="form-grid">

                <div class="form-group">
                    <label>Product Name *</label>

                    <input
                        type="text"
                        name="name"
                        value="${escapeHTML(product.name)}"
                        required
                    >
                </div>

                <div class="form-group">
                    <label>Brand Name</label>

                    <input
                        type="text"
                        name="brand"
                        value="${escapeHTML(product.brand)}"
                    >
                </div>

                <div class="form-group">
                    <label>Category</label>

                    <select name="category">

                        <option value="">
                            Select Category
                        </option>

                        <option
                            value="Tablet"
                            ${product.category === "Tablet" ? "selected" : ""}
                        >
                            Tablet
                        </option>

                        <option
                            value="Capsule"
                            ${product.category === "Capsule" ? "selected" : ""}
                        >
                            Capsule
                        </option>

                        <option
                            value="Syrup"
                            ${product.category === "Syrup" ? "selected" : ""}
                        >
                            Syrup
                        </option>

                        <option
                            value="Drops"
                            ${product.category === "Drops" ? "selected" : ""}
                        >
                            Drops
                        </option>

                        <option
                            value="Injection"
                            ${product.category === "Injection" ? "selected" : ""}
                        >
                            Injection
                        </option>

                        <option
                            value="Cream"
                            ${product.category === "Cream" ? "selected" : ""}
                        >
                            Cream
                        </option>

                        <option
                            value="Soap"
                            ${product.category === "Soap" ? "selected" : ""}
                        >
                            Soap
                        </option>

                        <option
                            value="Other"
                            ${product.category === "Other" ? "selected" : ""}
                        >
                            Other
                        </option>

                    </select>
                </div>

                <div class="form-group">
                    <label>Manufacturer</label>

                    <input
                        type="text"
                        name="manufacturer"
                        value="${escapeHTML(product.manufacturer)}"
                    >
                </div>

                <div class="form-group">
                    <label>MRP ₹ *</label>

                    <input
                        type="number"
                        id="mrp"
                        name="mrp"
                        value="${product.mrp ?? ""}"
                        min="0"
                        step="0.01"
                        required
                        oninput="calculateSellingPrice()"
                    >
                </div>

                <div class="form-group">
                    <label>Discount %</label>

                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        value="${discountPercentage.toFixed(2)}"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="e.g. 10"
                        oninput="calculateSellingPrice()"
                    >
                </div>

                <div class="form-group">
                    <label>Selling Price ₹ * (Auto Calculated)</label>

                    <input
                        type="number"
                        id="price"
                        name="price"
                        value="${product.price ?? ""}"
                        min="0"
                        step="0.01"
                        readonly
                        required
                    >
                </div>

                <div class="form-group">
                    <label>Stock Quantity</label>

                    <input
                        type="number"
                        name="stock"
                        value="${product.stock ?? 0}"
                        min="0"
                    >
                </div>

                <div class="form-group">
                    <label>Pack Size</label>

                    <input
                        type="text"
                        name="packSize"
                        value="${escapeHTML(product.packSize)}"
                        placeholder="e.g. 200 ml"
                    >
                </div>

                <div class="form-group">
                    <label>Batch Number</label>

                    <input
                        type="text"
                        name="batchNo"
                        value="${escapeHTML(product.batchNo)}"
                    >
                </div>

                <div class="form-group">
                    <label>Manufacturing Date</label>

                    <input
                        type="date"
                        name="mfgDate"
                        value="${formatDate(product.mfgDate)}"
                    >
                </div>

                <div class="form-group">
                    <label>Expiry Date</label>

                    <input
                        type="date"
                        name="expDate"
                        value="${formatDate(product.expDate)}"
                    >
                </div>

            </div>
        </div>


        <div class="section">

            <div class="section-title">
                💊 Composition
            </div>

            <div id="compositionBox">

                ${compositions.map((item, index) => `

                    <div class="composition-row">

                        <input
                            type="text"
                            name="composition[]"
                            value="${escapeHTML(item)}"
                            placeholder="Composition ${index + 1}"
                        >

                        <button
                            type="button"
                            class="remove-btn"
                            onclick="removeComposition(this)"
                        >
                            ×
                        </button>

                    </div>

                `).join("")}

            </div>

            <button
                type="button"
                class="add-btn"
                onclick="addComposition()"
            >
                + Add Composition
            </button>

        </div>


        <div class="section">

            <div class="section-title">
                📋 Product Details
            </div>

            <div class="form-grid">

                <div class="form-group full">
                    <label>Uses</label>

                    <textarea
                        name="uses"
                        placeholder="Enter product uses"
                    >${escapeHTML(product.uses)}</textarea>
                </div>

                <div class="form-group full">
                    <label>Benefits</label>

                    <textarea
                        name="benefits"
                        placeholder="Enter product benefits"
                    >${escapeHTML(product.benefits)}</textarea>
                </div>

                <div class="form-group full">
                    <label>Dosage</label>

                    <textarea
                        name="dosage"
                        placeholder="Enter dosage"
                    >${escapeHTML(product.dosage)}</textarea>
                </div>

                <div class="form-group full">
                    <label>Side Effects</label>

                    <textarea
                        name="sideEffects"
                        placeholder="Enter side effects"
                    >${escapeHTML(product.sideEffects)}</textarea>
                </div>

                <div class="form-group full">
                    <label>Storage Instructions</label>

                    <textarea
                        name="storage"
                        placeholder="Enter storage instructions"
                    >${escapeHTML(product.storage)}</textarea>
                </div>

                <div class="form-group full">
                    <label>Full Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter full product description"
                    >${escapeHTML(product.description)}</textarea>
                </div>

            </div>
        </div>


        <div class="section">

            <div class="section-title">
                🖼 Existing Product Images
            </div>

            ${
                images.length
                    ? `

                        <div class="image-grid">

                            ${images.map((image, index) => `

                                <div
                                    class="media-card"
                                    data-image-card
                                >

                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="Product Image ${index + 1}"
                                        onerror="this.style.display='none'"
                                    >

                                    <div class="media-name">
                                        Image ${index + 1}
                                    </div>

                                    <label class="image-remove-control">

                                        <input
                                            type="checkbox"
                                            name="removeImages"
                                            value="${escapeHTML(image)}"
                                            onchange="toggleImageRemoval(this)"
                                        >

                                        <span>
                                            🗑 Remove Image
                                        </span>

                                    </label>

                                </div>

                            `).join("")}

                        </div>

                        <p class="remove-help">
                            जिस image को हटाना है, उसके नीचे
                            <strong>Remove Image</strong> select करें और फिर
                            <strong>Update Product</strong> दबाएँ।
                        </p>

                    `
                    : `

                        <div class="empty-box">
                            No existing product image.
                        </div>

                    `
            }

        </div>


        <div class="section">

            <div class="section-title">
                📷 Add New Product Images
            </div>

            <div class="form-group">

                <label>Select New Images</label>

                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                >

                <p class="help">
                    You can select multiple new images.
                </p>

            </div>

        </div>


        <div class="section">

            <div class="section-title">
                🎥 Existing Product Videos
            </div>

            ${
                videos.length
                    ? `

                        <div class="video-grid">

                            ${videos.map((video, index) => `

                                <div class="media-card">

                                    <video controls preload="metadata">

                                        <source
                                            src="${escapeHTML(video)}"
                                        >

                                        Your browser does not support video.

                                    </video>

                                    <div class="media-name">
                                        Video ${index + 1}
                                    </div>

                                </div>

                            `).join("")}

                        </div>

                    `
                    : `

                        <div class="empty-box">
                            No existing product video.
                        </div>

                    `
            }

        </div>


        <div class="section">

            <div class="section-title">
                🔗 Add Video URL
            </div>

            <div class="form-group">

                <label>Product Video URL</label>

                <input
                    type="url"
                    name="videoUrl"
                    value="${escapeHTML(product.videoUrl || "")}"
                    placeholder="https://example.com/product-video.mp4"
                >

                <p class="help">
                    You can add a direct video URL.
                </p>

            </div>

        </div>


        <div class="section">

            <div class="section-title">
                🎬 Upload New Product Video
            </div>

            <div class="form-group">

                <label>Select Video</label>

                <input
                    type="file"
                    name="videos"
                    accept="video/*"
                    multiple
                >

                <p class="help">
                    You can select one or multiple product videos.
                </p>

            </div>

        </div>


        <button
            type="submit"
            class="update-btn"
        >
            💾 Update Product
        </button>

    </form>

    <a
        href="/admin/manage-products"
        class="back"
    >
        ⬅ Back to Manage Products
    </a>

</div>


<script>

function calculateSellingPrice() {

    const mrp = Number(
        document.getElementById("mrp").value || 0
    );

    let discount = Number(
        document.getElementById("discountPercentage").value || 0
    );

    if (discount < 0) {
        discount = 0;
    }

    if (discount > 100) {
        discount = 100;
    }

    const sellingPrice =
        mrp - (mrp * discount / 100);

    document.getElementById("price").value =
        mrp > 0
            ? sellingPrice.toFixed(2)
            : "";
}


function addComposition() {

    const box =
        document.getElementById("compositionBox");

    const row =
        document.createElement("div");

    row.className =
        "composition-row";

    row.innerHTML = \`

        <input
            type="text"
            name="composition[]"
            placeholder="Composition name"
        >

        <button
            type="button"
            class="remove-btn"
            onclick="removeComposition(this)"
        >
            ×
        </button>

    \`;

    box.appendChild(row);
}


function removeComposition(button) {

    const rows =
        document.querySelectorAll(".composition-row");

    if (rows.length > 1) {
        button.parentElement.remove();
    }
}


function toggleImageRemoval(checkbox) {

    const card = checkbox.closest(
        "[data-image-card]"
    );

    if (!card) {
        return;
    }

    card.classList.toggle(
        "image-marked-remove",
        checkbox.checked
    );

    const text = card.querySelector(
        ".image-remove-control span"
    );

    if (text) {

        text.textContent = checkbox.checked
            ? "✓ Image Will Be Removed"
            : "🗑 Remove Image";
    }
}


document.querySelector("form").addEventListener(
    "submit",
    function(event) {

        const selectedImages =
            document.querySelectorAll(
                'input[name="removeImages"]:checked'
            );

        if (selectedImages.length > 0) {

            const confirmed = window.confirm(
                selectedImages.length +
                " image(s) remove होंगी। क्या आप Update करना चाहते हैं?"
            );

            if (!confirmed) {
                event.preventDefault();
                return;
            }
        }

        const button =
            document.querySelector(".update-btn");

        button.disabled = true;
        button.innerHTML = "⏳ Updating Product...";
    }
);

</script>

</body>
</html>

`;
}

module.exports = EditProduct;