// // function EditProduct(product) {
// //   return `
// // <!DOCTYPE html>
// // <html lang="en">

// // <head>

// // <meta charset="UTF-8">

// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <title>Edit Product</title>

// // <style>

// // *{
// // margin:0;
// // padding:0;
// // box-sizing:border-box;
// // font-family:Arial,sans-serif;
// // }

// // body{
// // background:#f5f7fb;
// // padding:40px;
// // }

// // .container{
// // max-width:700px;
// // margin:auto;
// // background:#fff;
// // padding:30px;
// // border-radius:15px;
// // box-shadow:0 10px 25px rgba(0,0,0,.12);
// // }

// // h2{
// // text-align:center;
// // margin-bottom:25px;
// // color:#0d6efd;
// // }

// // .form-group{
// // margin-bottom:18px;
// // }

// // label{
// // display:block;
// // margin-bottom:6px;
// // font-weight:bold;
// // }

// // input,
// // textarea{
// // width:100%;
// // padding:12px;
// // border:1px solid #ddd;
// // border-radius:8px;
// // font-size:15px;
// // }

// // textarea{
// // height:120px;
// // resize:none;
// // }

// // .preview{
// // width:150px;
// // height:150px;
// // border-radius:10px;
// // object-fit:cover;
// // border:2px solid #ddd;
// // display:block;
// // margin:15px auto;
// // }

// // button{
// // width:100%;
// // padding:14px;
// // border:none;
// // border-radius:8px;
// // background:#0d6efd;
// // color:#fff;
// // font-size:16px;
// // cursor:pointer;
// // }

// // button:hover{
// // background:#0b5ed7;
// // }

// // .back{
// // display:block;
// // text-align:center;
// // margin-top:20px;
// // text-decoration:none;
// // color:#0d6efd;
// // font-weight:bold;
// // }

// // </style>

// // </head>

// // <body>

// // <div class="container">

// // <h2>✏️ Edit Product</h2>

// // <form
// // action="/admin/edit-product/${product._id}"
// // method="POST"
// // enctype="multipart/form-data">

// // <div class="form-group">

// // <label>Product Name</label>

// // <input
// // type="text"
// // name="name"
// // value="${product.name}"
// // required>

// // </div>

// // <div class="form-group">

// // <label>Price</label>

// // <input
// // type="number"
// // name="price"
// // value="${product.price}"
// // required>

// // </div>

// // <div class="form-group">

// // <label>Description</label>

// // <textarea
// // name="description">${product.description || ""}</textarea>

// // </div>

// // <img
// // src="${product.image}"
// // class="preview"
// // alt="${product.name}">

// // <div class="form-group">

// // <label>Change Image</label>

// // <input
// // type="file"
// // name="image"
// // accept="image/*">

// // </div>

// // <button type="submit">

// // 💾 Update Product

// // </button>

// // </form>

// // <a
// // href="/admin/manage-products"
// // class="back">

// // ⬅ Back

// // </a>

// // </div>

// // </body>

// // </html>
// // `;
// // }

// // module.exports = EditProduct;


// function EditProduct(product) {

//     const compositions =
//         Array.isArray(product.composition) && product.composition.length
//             ? product.composition
//             : [""];

//     const images =
//         Array.isArray(product.images)
//             ? product.images
//             : (product.image ? [product.image] : []);

//     return `

// <!DOCTYPE html>
// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
// >

// <title>Edit Product</title>


// <style>

// /* =========================
//    RESET
// ========================= */

// * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: "Segoe UI", Arial, sans-serif;
// }


// /* =========================
//    BODY
// ========================= */

// body {

//     background:
//         linear-gradient(
//             135deg,
//             #2563eb,
//             #06b6d4
//         );

//     min-height: 100vh;

//     padding: 30px 15px;

// }


// /* =========================
//    MAIN CONTAINER
// ========================= */

// .container {

//     width: 100%;
//     max-width: 1000px;

//     margin: auto;

//     background: #ffffff;

//     padding: 30px;

//     border-radius: 22px;

//     box-shadow:
//         0 20px 50px
//         rgba(0,0,0,.18);

// }


// /* =========================
//    HEADER
// ========================= */

// .header {

//     text-align: center;

//     margin-bottom: 30px;

// }


// .header h2 {

//     color: #1e40af;

//     font-size: 28px;

//     margin-bottom: 6px;

// }


// .header p {

//     color: #64748b;

//     font-size: 14px;

// }


// /* =========================
//    FORM GRID
// ========================= */

// .form-grid {

//     display: grid;

//     grid-template-columns:
//         repeat(2, 1fr);

//     gap: 18px;

// }


// /* =========================
//    FORM GROUP
// ========================= */

// .form-group {

//     display: flex;

//     flex-direction: column;

// }


// .form-group.full {

//     grid-column: 1 / -1;

// }


// label {

//     font-weight: 700;

//     color: #1e293b;

//     margin-bottom: 7px;

//     font-size: 14px;

// }


// /* =========================
//    INPUTS
// ========================= */

// input,
// select,
// textarea {

//     width: 100%;

//     padding: 12px 13px;

//     border: 1px solid #d1d5db;

//     border-radius: 10px;

//     background: #fff;

//     color: #111827;

//     font-size: 15px;

//     outline: none;

//     transition: .2s;

// }


// input:focus,
// select:focus,
// textarea:focus {

//     border-color: #2563eb;

//     box-shadow:
//         0 0 0 3px
//         rgba(37,99,235,.10);

// }


// textarea {

//     min-height: 120px;

//     resize: vertical;

// }


// /* =========================
//    SECTION
// ========================= */

// .section {

//     margin-top: 28px;

//     padding-top: 22px;

//     border-top:
//         1px solid #e5e7eb;

// }


// .section-title {

//     display: flex;

//     align-items: center;

//     gap: 8px;

//     margin-bottom: 15px;

//     color: #1e40af;

//     font-size: 19px;

//     font-weight: 700;

// }


// /* =========================
//    COMPOSITION
// ========================= */

// .composition-row {

//     display: flex;

//     gap: 10px;

//     margin-bottom: 10px;

// }


// .composition-row input {

//     flex: 1;

// }


// .remove-btn {

//     width: 45px;

//     padding: 0;

//     margin: 0;

//     border: none;

//     border-radius: 9px;

//     background: #dc2626;

//     color: white;

//     font-size: 18px;

//     cursor: pointer;

// }


// .remove-btn:hover {

//     background: #b91c1c;

// }


// .add-btn {

//     width: auto;

//     padding: 11px 18px;

//     margin-top: 5px;

//     border: none;

//     border-radius: 9px;

//     background: #16a34a;

//     color: white;

//     font-weight: 700;

//     cursor: pointer;

// }


// .add-btn:hover {

//     background: #15803d;

// }


// /* =========================
//    EXISTING IMAGES
// ========================= */

// .image-grid {

//     display: grid;

//     grid-template-columns:
//         repeat(4, 1fr);

//     gap: 15px;

// }


// .image-card {

//     position: relative;

//     border:
//         1px solid #e5e7eb;

//     border-radius: 12px;

//     padding: 8px;

//     background: #f8fafc;

// }


// .image-card img {

//     width: 100%;

//     height: 140px;

//     object-fit: cover;

//     border-radius: 8px;

//     display: block;

// }


// .image-number {

//     text-align: center;

//     margin-top: 6px;

//     font-size: 12px;

//     color: #64748b;

// }


// /* =========================
//    NO IMAGE
// ========================= */

// .no-image {

//     padding: 30px;

//     text-align: center;

//     background: #f8fafc;

//     border-radius: 10px;

//     color: #64748b;

// }


// /* =========================
//    UPDATE BUTTON
// ========================= */

// .update-btn {

//     width: 100%;

//     padding: 15px;

//     margin-top: 30px;

//     border: none;

//     border-radius: 12px;

//     background:
//         linear-gradient(
//             135deg,
//             #2563eb,
//             #1d4ed8
//         );

//     color: white;

//     font-size: 17px;

//     font-weight: 700;

//     cursor: pointer;

//     transition: .2s;

// }


// .update-btn:hover {

//     transform: translateY(-1px);

//     box-shadow:
//         0 8px 20px
//         rgba(37,99,235,.25);

// }


// /* =========================
//    BACK BUTTON
// ========================= */

// .back {

//     display: block;

//     text-align: center;

//     margin-top: 18px;

//     padding: 12px;

//     border-radius: 10px;

//     background: #f1f5f9;

//     color: #1e40af;

//     text-decoration: none;

//     font-weight: 700;

// }


// .back:hover {

//     background: #e2e8f0;

// }


// /* =========================
//    MOBILE
// ========================= */

// @media (max-width: 700px) {

//     body {

//         padding: 10px;

//     }


//     .container {

//         padding: 18px;

//         border-radius: 16px;

//     }


//     .header h2 {

//         font-size: 22px;

//     }


//     .form-grid {

//         grid-template-columns: 1fr;

//         gap: 15px;

//     }


//     .form-group.full {

//         grid-column: auto;

//     }


//     .image-grid {

//         grid-template-columns:
//             repeat(2, 1fr);

//     }


//     .image-card img {

//         height: 120px;

//     }


//     .composition-row {

//         gap: 7px;

//     }

// }


// /* =========================
//    SMALL MOBILE
// ========================= */

// @media (max-width: 400px) {

//     .container {

//         padding: 14px;

//     }


//     input,
//     select,
//     textarea {

//         font-size: 14px;

//         padding: 11px;

//     }


//     .image-grid {

//         grid-template-columns: 1fr 1fr;

//         gap: 8px;

//     }


//     .image-card img {

//         height: 100px;

//     }

// }

// </style>

// </head>


// <body>


// <div class="container">


//     <!-- =========================
//          HEADER
//     ========================== -->

//     <div class="header">

//         <h2>✏️ Edit Pharma Product</h2>

//         <p>
//             Update product information and images
//         </p>

//     </div>


//     <!-- =========================
//          FORM
//     ========================== -->

//     <form

//         action="/admin/edit-product/${product._id}"

//         method="POST"

//         enctype="multipart/form-data"
//     >


//         <!-- =========================
//              BASIC INFORMATION
//         ========================== -->

//         <div class="form-grid">


//             <div class="form-group">

//                 <label>
//                     Product Name *
//                 </label>

//                 <input
//                     type="text"
//                     name="name"
//                     value="${product.name || ""}"
//                     required
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Brand Name
//                 </label>

//                 <input
//                     type="text"
//                     name="brand"
//                     value="${product.brand || ""}"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Category
//                 </label>

//                 <select name="category">

//                     <option value="">
//                         Select Category
//                     </option>

//                     <option
//                         value="Tablet"
//                         ${product.category === "Tablet" ? "selected" : ""}
//                     >
//                         Tablet
//                     </option>

//                     <option
//                         value="Capsule"
//                         ${product.category === "Capsule" ? "selected" : ""}
//                     >
//                         Capsule
//                     </option>

//                     <option
//                         value="Syrup"
//                         ${product.category === "Syrup" ? "selected" : ""}
//                     >
//                         Syrup
//                     </option>

//                     <option
//                         value="Drops"
//                         ${product.category === "Drops" ? "selected" : ""}
//                     >
//                         Drops
//                     </option>

//                     <option
//                         value="Injection"
//                         ${product.category === "Injection" ? "selected" : ""}
//                     >
//                         Injection
//                     </option>

//                     <option
//                         value="Cream"
//                         ${product.category === "Cream" ? "selected" : ""}
//                     >
//                         Cream
//                     </option>

//                     <option
//                         value="Other"
//                         ${product.category === "Other" ? "selected" : ""}
//                     >
//                         Other
//                     </option>

//                 </select>

//             </div>


//             <div class="form-group">

//                 <label>
//                     Manufacturer
//                 </label>

//                 <input
//                     type="text"
//                     name="manufacturer"
//                     value="${product.manufacturer || ""}"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     MRP
//                 </label>

//                 <input
//                     type="number"
//                     name="mrp"
//                     value="${product.mrp ?? ""}"
//                     min="0"
//                     step="0.01"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Selling Price *
//                 </label>

//                 <input
//                     type="number"
//                     name="price"
//                     value="${product.price ?? ""}"
//                     min="0"
//                     step="0.01"
//                     required
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Stock Quantity
//                 </label>

//                 <input
//                     type="number"
//                     name="stock"
//                     value="${product.stock ?? ""}"
//                     min="0"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Pack Size
//                 </label>

//                 <input
//                     type="text"
//                     name="packSize"
//                     value="${product.packSize || ""}"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Batch Number
//                 </label>

//                 <input
//                     type="text"
//                     name="batchNo"
//                     value="${product.batchNo || ""}"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Manufacturing Date
//                 </label>

//                 <input
//                     type="date"
//                     name="mfgDate"
//                     value="${
//                         product.mfgDate
//                             ? new Date(product.mfgDate)
//                                 .toISOString()
//                                 .split("T")[0]
//                             : ""
//                     }"
//                 >

//             </div>


//             <div class="form-group">

//                 <label>
//                     Expiry Date
//                 </label>

//                 <input
//                     type="date"
//                     name="expDate"
//                     value="${
//                         product.expDate
//                             ? new Date(product.expDate)
//                                 .toISOString()
//                                 .split("T")[0]
//                             : ""
//                     }"
//                 >

//             </div>


//         </div>


//         <!-- =========================
//              COMPOSITION
//         ========================== -->

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
//                             value="${item || ""}"
//                             placeholder="Composition ${index + 1}"
//                         >

//                         ${
//                             index > 0
//                             ? `
//                             <button
//                                 type="button"
//                                 class="remove-btn"
//                                 onclick="this.parentElement.remove()"
//                             >
//                                 ×
//                             </button>
//                             `
//                             : ""
//                         }

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


//         <!-- =========================
//              PRODUCT DETAILS
//         ========================== -->

//         <div class="section">

//             <div class="section-title">

//                 📋 Product Details

//             </div>


//             <div class="form-grid">


//                 <div class="form-group full">

//                     <label>
//                         Uses
//                     </label>

//                     <textarea
//                         name="uses"
//                         placeholder="Uses"
//                     >${product.uses || ""}</textarea>

//                 </div>


//                 <div class="form-group full">

//                     <label>
//                         Benefits
//                     </label>

//                     <textarea
//                         name="benefits"
//                         placeholder="Benefits"
//                     >${product.benefits || ""}</textarea>

//                 </div>


//                 <div class="form-group full">

//                     <label>
//                         Dosage
//                     </label>

//                     <textarea
//                         name="dosage"
//                         placeholder="Dosage"
//                     >${product.dosage || ""}</textarea>

//                 </div>


//                 <div class="form-group full">

//                     <label>
//                         Side Effects
//                     </label>

//                     <textarea
//                         name="sideEffects"
//                         placeholder="Side Effects"
//                     >${product.sideEffects || ""}</textarea>

//                 </div>


//                 <div class="form-group full">

//                     <label>
//                         Storage Instructions
//                     </label>

//                     <textarea
//                         name="storage"
//                         placeholder="Storage Instructions"
//                     >${product.storage || ""}</textarea>

//                 </div>


//                 <div class="form-group full">

//                     <label>
//                         Full Description
//                     </label>

//                     <textarea
//                         name="description"
//                         placeholder="Full Description"
//                     >${product.description || ""}</textarea>

//                 </div>


//             </div>

//         </div>


//         <!-- =========================
//              EXISTING IMAGES
//         ========================== -->

//         <div class="section">

//             <div class="section-title">

//                 🖼 Existing Product Images

//             </div>


//             ${
//                 images.length
//                 ?

//                 `<div class="image-grid">

//                     ${images.map((img, index) => `

//                         <div class="image-card">

//                             <img
//                                 src="${img}"
//                                 alt="Product Image ${index + 1}"
//                             >

//                             <div class="image-number">

//                                 Image ${index + 1}

//                             </div>

//                         </div>

//                     `).join("")}

//                 </div>`

//                 :

//                 `<div class="no-image">

//                     No existing product image

//                 </div>`
//             }

//         </div>


//         <!-- =========================
//              NEW IMAGES
//         ========================== -->

//         <div class="section">

//             <div class="section-title">

//                 📷 Add New Product Images

//             </div>


//             <div id="imageBox">

//                 <input
//                     type="file"
//                     name="images"
//                     accept="image/*"
//                     multiple
//                 >

//             </div>


//             <p
//                 style="
//                     margin-top:8px;
//                     color:#64748b;
//                     font-size:13px;
//                 "
//             >
//                 You can select multiple new images.
//             </p>

//         </div>


//         <!-- =========================
//              UPDATE
//         ========================== -->

//         <button
//             type="submit"
//             class="update-btn"
//         >

//             💾 Update Product

//         </button>


//     </form>


//     <!-- =========================
//          BACK
//     ========================== -->

//     <a
//         href="/admin/manage-products"
//         class="back"
//     >

//         ⬅ Back to Manage Products

//     </a>


// </div>


// <script>


// /* =========================
//    ADD COMPOSITION
// ========================= */

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
//             placeholder="Composition"
//         >

//         <button
//             type="button"
//             class="remove-btn"
//             onclick="this.parentElement.remove()"
//         >
//             ×
//         </button>

//     \`;


//     box.appendChild(row);

// }


// /* =========================
//    IMAGE VALIDATION
// ========================= */

// const imageInput =
//     document.querySelector(
//         'input[name="images"]'
//     );


// if (imageInput) {

//     imageInput.addEventListener(
//         "change",
//         function () {

//             const files =
//                 this.files;


//             for (const file of files) {

//                 if (
//                     !file.type.startsWith("image/")
//                 ) {

//                     alert(
//                         "Please select only image files."
//                     );

//                     this.value = "";

//                     return;

//                 }

//             }

//         }
//     );

// }

// </script>


// </body>

// </html>

// `;

// }


// module.exports = EditProduct;



function EditProduct(product) {

    // =========================
    // SAFE HTML ESCAPE
    // =========================

    const escapeHTML = (value) => {
        if (value === null || value === undefined) return "";

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };


    // =========================
    // DATE FORMAT
    // =========================

    const formatDate = (value) => {

        if (!value) return "";

        try {

            const date = new Date(value);

            if (isNaN(date.getTime())) {
                return "";
            }

            return date.toISOString().split("T")[0];

        } catch (error) {

            return "";

        }

    };


    // =========================
    // COMPOSITION
    // =========================

    let compositions = [];

    if (Array.isArray(product.composition)) {

        compositions = product.composition
            .filter(item => item !== null && item !== undefined)
            .map(item => {

                // अगर composition object है
                if (typeof item === "object") {

                    if (item.name && item.strength) {
                        return `${item.name} ${item.strength}`;
                    }

                    if (item.name) {
                        return item.name;
                    }

                    return "";
                }

                return String(item);

            });

    } else if (product.composition) {

        compositions = [String(product.composition)];

    }


    if (!compositions.length) {
        compositions = [""];
    }


    // =========================
    // IMAGES
    // =========================

    let images = [];

    if (Array.isArray(product.images)) {

        images = product.images.filter(Boolean);

    }


    // पुराने database में image field है
    if (product.image && !images.includes(product.image)) {

        images.unshift(product.image);

    }


    // Remove duplicate images
    images = [...new Set(images)];


    // =========================
    // IMAGE URL CLEANER
    // =========================

    const cleanImageUrl = (url) => {

        if (!url) return "";

        let clean = String(url).trim();

        // Markdown format:
        // [https://example.com/image.jpg](https://example.com/image.jpg)

        const markdownMatch =
            clean.match(/\]\((https?:\/\/[^)]+)\)/);

        if (markdownMatch) {

            return markdownMatch[1];

        }


        // [https://example.com/image.jpg]
        if (
            clean.startsWith("[") &&
            clean.endsWith("]")
        ) {

            clean = clean.slice(1, -1);

        }

        return clean;

    };


    images = images
        .map(cleanImageUrl)
        .filter(Boolean);


    return `

<style>

*{
    box-sizing:border-box;
}

body{
    margin:0;
    font-family:Segoe UI,Arial,sans-serif;
    background:#f1f5f9;
    color:#1e293b;
}

.edit-product-page{
    width:100%;
    max-width:1100px;
    margin:0 auto;
    padding:20px;
}


/* =========================
   HEADER
========================= */

.header{

    background:linear-gradient(
        135deg,
        #2563eb,
        #1d4ed8
    );

    color:white;

    padding:25px;

    border-radius:18px;

    margin-bottom:20px;

    box-shadow:
        0 10px 30px
        rgba(37,99,235,.20);

}

.header h2{

    margin:0 0 7px;

    font-size:26px;

}

.header p{

    margin:0;

    opacity:.9;

    font-size:14px;

}


/* =========================
   FORM
========================= */

.product-form{

    background:white;

    padding:25px;

    border-radius:18px;

    box-shadow:
        0 8px 25px
        rgba(15,23,42,.08);

}


/* =========================
   GRID
========================= */

.form-grid{

    display:grid;

    grid-template-columns:
        repeat(2,1fr);

    gap:18px;

}


/* =========================
   FORM GROUP
========================= */

.form-group{

    display:flex;

    flex-direction:column;

    gap:7px;

}

.form-group.full{

    grid-column:1/-1;

}

.form-group label{

    font-size:14px;

    font-weight:700;

    color:#334155;

}


/* =========================
   INPUT
========================= */

.form-group input,
.form-group select,
.form-group textarea{

    width:100%;

    border:1px solid #cbd5e1;

    border-radius:10px;

    padding:12px 13px;

    font-size:15px;

    outline:none;

    background:#fff;

    transition:.2s;

}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus{

    border-color:#2563eb;

    box-shadow:
        0 0 0 3px
        rgba(37,99,235,.10);

}

.form-group textarea{

    min-height:110px;

    resize:vertical;

}


/* =========================
   SECTION
========================= */

.section{

    margin-top:28px;

    padding-top:22px;

    border-top:1px solid #e2e8f0;

}

.section-title{

    font-size:19px;

    font-weight:800;

    color:#1e3a8a;

    margin-bottom:15px;

}


/* =========================
   COMPOSITION
========================= */

.composition-row{

    display:grid;

    grid-template-columns:
        1fr auto;

    gap:10px;

    margin-bottom:10px;

}

.composition-row input{

    width:100%;

    padding:12px;

    border:1px solid #cbd5e1;

    border-radius:10px;

    font-size:14px;

    outline:none;

}

.composition-row input:focus{

    border-color:#2563eb;

}

.remove-btn{

    width:45px;

    border:none;

    border-radius:9px;

    background:#dc2626;

    color:white;

    font-size:22px;

    cursor:pointer;

}

.remove-btn:hover{

    background:#b91c1c;

}

.add-btn{

    border:none;

    background:#2563eb;

    color:white;

    padding:11px 17px;

    border-radius:9px;

    font-weight:700;

    cursor:pointer;

}

.add-btn:hover{

    background:#1d4ed8;

}


/* =========================
   EXISTING IMAGES
========================= */

.image-grid{

    display:grid;

    grid-template-columns:
        repeat(4,1fr);

    gap:15px;

}

.image-card{

    border:1px solid #e2e8f0;

    border-radius:12px;

    overflow:hidden;

    background:#f8fafc;

}

.image-card img{

    width:100%;

    height:160px;

    display:block;

    object-fit:contain;

    background:#fff;

}

.image-number{

    padding:8px;

    text-align:center;

    font-size:13px;

    font-weight:600;

    color:#475569;

}

.no-image{

    padding:20px;

    background:#f8fafc;

    border:1px dashed #cbd5e1;

    border-radius:10px;

    text-align:center;

    color:#64748b;

}


/* =========================
   FILE INPUT
========================= */

input[type="file"]{

    padding:10px;

    background:#f8fafc;

    cursor:pointer;

}


/* =========================
   UPDATE BUTTON
========================= */

.update-btn{

    width:100%;

    margin-top:30px;

    padding:15px;

    border:none;

    border-radius:12px;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
        );

    color:white;

    font-size:17px;

    font-weight:800;

    cursor:pointer;

    box-shadow:
        0 8px 20px
        rgba(37,99,235,.20);

}

.update-btn:hover{

    transform:translateY(-1px);

}


/* =========================
   BACK BUTTON
========================= */

.back{

    display:block;

    width:max-content;

    margin:20px auto;

    text-decoration:none;

    color:#2563eb;

    font-weight:700;

}


/* =========================
   MOBILE
========================= */

@media(max-width:700px){

    .edit-product-page{

        padding:10px;

    }

    .header{

        padding:20px;

        border-radius:14px;

    }

    .header h2{

        font-size:21px;

    }

    .product-form{

        padding:16px;

        border-radius:14px;

    }

    .form-grid{

        grid-template-columns:1fr;

    }

    .form-group.full{

        grid-column:auto;

    }

    .image-grid{

        grid-template-columns:
            repeat(2,1fr);

    }

    .image-card img{

        height:130px;

    }

}


/* =========================
   SMALL MOBILE
========================= */

@media(max-width:400px){

    .image-grid{

        grid-template-columns:1fr;

    }

    .image-card img{

        height:180px;

    }

}

</style>


<div class="edit-product-page">


<!-- =========================
     HEADER
========================= -->

<div class="header">

    <h2>✏️ Edit Pharma Product</h2>

    <p>
        Update product information and images
    </p>

</div>


<!-- =========================
     FORM
========================= -->

<form
    class="product-form"
    action="/admin/edit-product/${escapeHTML(product._id)}"
    method="POST"
    enctype="multipart/form-data"
>


<!-- =========================
     BASIC INFORMATION
========================= -->

<div class="form-grid">


    <div class="form-group">

        <label>
            Product Name *
        </label>

        <input
            type="text"
            name="name"
            value="${escapeHTML(product.name)}"
            required
        >

    </div>


    <div class="form-group">

        <label>
            Brand Name
        </label>

        <input
            type="text"
            name="brand"
            value="${escapeHTML(product.brand)}"
        >

    </div>


    <div class="form-group">

        <label>
            Category
        </label>

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
                value="Other"
                ${product.category === "Other" ? "selected" : ""}
            >
                Other
            </option>

        </select>

    </div>


    <div class="form-group">

        <label>
            Manufacturer
        </label>

        <input
            type="text"
            name="manufacturer"
            value="${escapeHTML(product.manufacturer)}"
        >

    </div>


    <div class="form-group">

        <label>
            MRP ₹
        </label>

        <input
            type="number"
            name="mrp"
            value="${product.mrp ?? ""}"
            min="0"
            step="0.01"
        >

    </div>


    <div class="form-group">

        <label>
            Selling Price ₹ *
        </label>

        <input
            type="number"
            name="price"
            value="${product.price ?? ""}"
            min="0"
            step="0.01"
            required
        >

    </div>


    <div class="form-group">

        <label>
            Stock Quantity
        </label>

        <input
            type="number"
            name="stock"
            value="${product.stock ?? 0}"
            min="0"
        >

    </div>


    <div class="form-group">

        <label>
            Pack Size
        </label>

        <input
            type="text"
            name="packSize"
            value="${escapeHTML(product.packSize)}"
            placeholder="e.g. 200 ml"
        >

    </div>


    <div class="form-group">

        <label>
            Batch Number
        </label>

        <input
            type="text"
            name="batchNo"
            value="${escapeHTML(product.batchNo)}"
        >

    </div>


    <div class="form-group">

        <label>
            Manufacturing Date
        </label>

        <input
            type="date"
            name="mfgDate"
            value="${formatDate(product.mfgDate)}"
        >

    </div>


    <div class="form-group">

        <label>
            Expiry Date
        </label>

        <input
            type="date"
            name="expDate"
            value="${formatDate(product.expDate)}"
        >

    </div>


</div>


<!-- =========================
     COMPOSITION
========================= -->

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

                ${
                    index > 0
                    ? `
                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeComposition(this)"
                    >
                        ×
                    </button>
                    `
                    : `
                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeComposition(this)"
                        style="visibility:hidden"
                    >
                        ×
                    </button>
                    `
                }

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


<!-- =========================
     PRODUCT DETAILS
========================= -->

<div class="section">

    <div class="section-title">
        📋 Product Details
    </div>


    <div class="form-grid">


        <div class="form-group full">

            <label>
                Uses
            </label>

            <textarea
                name="uses"
                placeholder="Enter product uses"
            >${escapeHTML(product.uses)}</textarea>

        </div>


        <div class="form-group full">

            <label>
                Benefits
            </label>

            <textarea
                name="benefits"
                placeholder="Enter product benefits"
            >${escapeHTML(product.benefits)}</textarea>

        </div>


        <div class="form-group full">

            <label>
                Dosage
            </label>

            <textarea
                name="dosage"
                placeholder="Enter dosage"
            >${escapeHTML(product.dosage)}</textarea>

        </div>


        <div class="form-group full">

            <label>
                Side Effects
            </label>

            <textarea
                name="sideEffects"
                placeholder="Enter side effects"
            >${escapeHTML(product.sideEffects)}</textarea>

        </div>


        <div class="form-group full">

            <label>
                Storage Instructions
            </label>

            <textarea
                name="storage"
                placeholder="Enter storage instructions"
            >${escapeHTML(product.storage)}</textarea>

        </div>


        <div class="form-group full">

            <label>
                Full Description
            </label>

            <textarea
                name="description"
                placeholder="Enter full product description"
            >${escapeHTML(product.description)}</textarea>

        </div>


    </div>

</div>


<!-- =========================
     EXISTING IMAGES
========================= -->

<div class="section">

    <div class="section-title">
        🖼 Existing Product Images
    </div>


    ${
        images.length

        ?

        `<div class="image-grid">

            ${images.map((img, index) => {

                const safeImg = cleanImageUrl(img);

                return `

                    <div class="image-card">

                        <img
                            src="${escapeHTML(safeImg)}"
                            alt="Product Image ${index + 1}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >

                        <div class="image-number">
                            Image ${index + 1}
                        </div>

                    </div>

                `;

            }).join("")}

        </div>`

        :

        `<div class="no-image">
            No existing product image
        </div>`
    }

</div>


<!-- =========================
     NEW IMAGES
========================= -->

<div class="section">

    <div class="section-title">
        📷 Add New Product Images
    </div>


    <div class="form-group">

        <label>
            Select New Images
        </label>

        <input
            type="file"
            name="images"
            accept="image/*"
            multiple
        >

    </div>


    <p
        style="
            margin-top:8px;
            color:#64748b;
            font-size:13px;
        "
    >
        You can select multiple new images.
    </p>

</div>


<!-- =========================
     UPDATE
========================= -->

<button
    type="submit"
    class="update-btn"
>
    💾 Update Product
</button>


</form>


<!-- =========================
     BACK
========================= -->

<a
    href="/admin/manage-products"
    class="back"
>
    ⬅ Back to Manage Products
</a>


</div>


<script>

function addComposition(){

    const box =
        document.getElementById("compositionBox");

    if(!box) return;


    const row =
        document.createElement("div");

    row.className =
        "composition-row";


    row.innerHTML = \`

        <input
            type="text"
            name="composition[]"
            placeholder="Composition"
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


function removeComposition(button){

    if(!button) return;


    const box =
        document.getElementById("compositionBox");

    const rows =
        box.querySelectorAll(".composition-row");


    if(rows.length > 1){

        button
            .parentElement
            .remove();

    }

}

</script>

`;
}


module.exports = EditProduct;