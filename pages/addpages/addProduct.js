// // // // function AddProduct() {
// // // // return `

// // // // <style>
// // // // *{
// // // //     box-sizing:border-box;
// // // // }

// // // // .add-product-page{
// // // //     max-width:1100px;
// // // //     margin:20px auto;
// // // //     padding:20px;
// // // //     font-family:Segoe UI,sans-serif;
// // // // }

// // // // .product-form{
// // // //     background:#fff;
// // // //     padding:25px;
// // // //     border-radius:18px;
// // // //     box-shadow:0 10px 30px rgba(0,0,0,.08);
// // // // }

// // // // .product-title{
// // // //     font-size:28px;
// // // //     font-weight:700;
// // // //     margin-bottom:25px;
// // // //     color:#1e3a8a;
// // // // }

// // // // .form-grid{
// // // //     display:grid;
// // // //     grid-template-columns:repeat(2,1fr);
// // // //     gap:18px;
// // // // }

// // // // .form-group{
// // // //     display:flex;
// // // //     flex-direction:column;
// // // //     gap:7px;
// // // // }

// // // // .form-group.full{
// // // //     grid-column:1/-1;
// // // // }

// // // // .form-group label{
// // // //     font-weight:600;
// // // //     color:#374151;
// // // // }

// // // // .form-group input,
// // // // .form-group textarea,
// // // // .form-group select{
// // // //     width:100%;
// // // //     padding:12px 14px;
// // // //     border:1px solid #d1d5db;
// // // //     border-radius:10px;
// // // //     font-size:15px;
// // // //     outline:none;
// // // // }

// // // // .form-group input:focus,
// // // // .form-group textarea:focus,
// // // // .form-group select:focus{
// // // //     border-color:#2563eb;
// // // //     box-shadow:0 0 0 3px rgba(37,99,235,.1);
// // // // }

// // // // textarea{
// // // //     min-height:100px;
// // // //     resize:vertical;
// // // // }

// // // // .section-title{
// // // //     margin-top:28px;
// // // //     margin-bottom:15px;
// // // //     padding-bottom:8px;
// // // //     border-bottom:2px solid #e5e7eb;
// // // //     color:#111827;
// // // // }

// // // // .composition-row{
// // // //     display:grid;
// // // //     grid-template-columns:1fr 1fr auto;
// // // //     gap:10px;
// // // //     margin-bottom:10px;
// // // // }

// // // // .composition-row button{
// // // //     border:none;
// // // //     background:#dc2626;
// // // //     color:white;
// // // //     border-radius:8px;
// // // //     padding:0 15px;
// // // //     cursor:pointer;
// // // // }

// // // // .add-btn{
// // // //     border:none;
// // // //     background:#2563eb;
// // // //     color:white;
// // // //     padding:11px 18px;
// // // //     border-radius:9px;
// // // //     cursor:pointer;
// // // //     font-weight:600;
// // // // }

// // // // .image-preview{
// // // //     display:flex;
// // // //     flex-wrap:wrap;
// // // //     gap:10px;
// // // //     margin-top:10px;
// // // // }

// // // // .submit-btn{
// // // //     width:100%;
// // // //     margin-top:30px;
// // // //     padding:15px;
// // // //     border:none;
// // // //     border-radius:12px;
// // // //     background:linear-gradient(135deg,#2563eb,#1d4ed8);
// // // //     color:white;
// // // //     font-size:17px;
// // // //     font-weight:700;
// // // //     cursor:pointer;
// // // // }

// // // // @media(max-width:700px){
// // // //     .add-product-page{
// // // //         padding:10px;
// // // //     }

// // // //     .product-form{
// // // //         padding:16px;
// // // //     }

// // // //     .form-grid{
// // // //         grid-template-columns:1fr;
// // // //     }

// // // //     .form-group.full{
// // // //         grid-column:auto;
// // // //     }

// // // //     .composition-row{
// // // //         grid-template-columns:1fr;
// // // //     }

// // // //     .composition-row button{
// // // //         padding:10px;
// // // //     }
// // // // }
// // // // </style>


// // // // <div class="add-product-page">

// // // // <form
// // // //     class="product-form"
// // // //     action="/admin/add-product"
// // // //     method="POST"
// // // //     enctype="multipart/form-data"
// // // // >

// // // // <h1 class="product-title">💊 Add Product</h1>


// // // // <h3 class="section-title">Basic Product Information</h3>

// // // // <div class="form-grid">

// // // //     <div class="form-group">
// // // //         <label>Product Name *</label>
// // // //         <input
// // // //             type="text"
// // // //             name="name"
// // // //             placeholder="Enter product name"
// // // //             required
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Brand</label>
// // // //         <input
// // // //             type="text"
// // // //             name="brand"
// // // //             placeholder="Enter brand"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Category</label>
// // // //         <input
// // // //             type="text"
// // // //             name="category"
// // // //             placeholder="e.g. Liver Tonic"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Manufacturer</label>
// // // //         <input
// // // //             type="text"
// // // //             name="manufacturer"
// // // //             placeholder="Enter manufacturer"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>MRP ₹</label>
// // // //         <input
// // // //             type="number"
// // // //             name="mrp"
// // // //             min="0"
// // // //             placeholder="Enter MRP"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Selling Price ₹ *</label>
// // // //         <input
// // // //             type="number"
// // // //             name="price"
// // // //             min="0"
// // // //             placeholder="Enter selling price"
// // // //             required
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Stock</label>
// // // //         <input
// // // //             type="number"
// // // //             name="stock"
// // // //             min="0"
// // // //             value="0"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Pack Size</label>
// // // //         <input
// // // //             type="text"
// // // //             name="packSize"
// // // //             placeholder="e.g. 200 ml"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>Batch No.</label>
// // // //         <input
// // // //             type="text"
// // // //             name="batchNo"
// // // //             placeholder="Enter batch number"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>MFG Date</label>
// // // //         <input
// // // //             type="date"
// // // //             name="mfgDate"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group">
// // // //         <label>EXP Date</label>
// // // //         <input
// // // //             type="date"
// // // //             name="expDate"
// // // //         >
// // // //     </div>

// // // // </div>


// // // // <h3 class="section-title">💊 Composition</h3>

// // // // <div id="compositionContainer">

// // // //     <div class="composition-row">

// // // //         <input
// // // //             type="text"
// // // //             name="compositionName[]"
// // // //             placeholder="Composition name"
// // // //         >

// // // //         <input
// // // //             type="text"
// // // //             name="compositionStrength[]"
// // // //             placeholder="Strength e.g. 275 mg"
// // // //         >

// // // //         <button
// // // //             type="button"
// // // //             onclick="removeComposition(this)"
// // // //         >
// // // //             ✕
// // // //         </button>

// // // //     </div>

// // // // </div>

// // // // <button
// // // //     type="button"
// // // //     class="add-btn"
// // // //     onclick="addComposition()"
// // // // >
// // // //     ➕ Add Composition
// // // // </button>


// // // // <h3 class="section-title">🖼 Product Images</h3>

// // // // <div class="form-grid">

// // // //     <div class="form-group full">
// // // //         <label>Main Product Image</label>

// // // //         <input
// // // //             type="file"
// // // //             name="image"
// // // //             accept="image/*"
// // // //         >
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>More Images</label>

// // // //         <input
// // // //             type="file"
// // // //             name="images"
// // // //             accept="image/*"
// // // //             multiple
// // // //         >
// // // //     </div>

// // // // </div>


// // // // <h3 class="section-title">📝 Product Details</h3>

// // // // <div class="form-grid">

// // // //     <div class="form-group full">
// // // //         <label>Description</label>

// // // //         <textarea
// // // //             name="description"
// // // //             placeholder="Enter product description"
// // // //         ></textarea>
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>Uses</label>

// // // //         <textarea
// // // //             name="uses"
// // // //             placeholder="Enter uses"
// // // //         ></textarea>
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>Benefits</label>

// // // //         <textarea
// // // //             name="benefits"
// // // //             placeholder="Enter benefits"
// // // //         ></textarea>
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>Dosage</label>

// // // //         <textarea
// // // //             name="dosage"
// // // //             placeholder="Enter dosage"
// // // //         ></textarea>
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>Side Effects</label>

// // // //         <textarea
// // // //             name="sideEffects"
// // // //             placeholder="Enter side effects"
// // // //         ></textarea>
// // // //     </div>

// // // //     <div class="form-group full">
// // // //         <label>Storage</label>

// // // //         <textarea
// // // //             name="storage"
// // // //             placeholder="Enter storage instructions"
// // // //         ></textarea>
// // // //     </div>

// // // // </div>


// // // // <button
// // // //     type="submit"
// // // //     class="submit-btn"
// // // // >
// // // //     💾 Save Product
// // // // </button>

// // // // </form>

// // // // </div>


// // // // <script>

// // // // function addComposition(){

// // // //     const container =
// // // //         document.getElementById("compositionContainer");

// // // //     const row =
// // // //         document.createElement("div");

// // // //     row.className = "composition-row";

// // // //     row.innerHTML = \`
// // // //         <input
// // // //             type="text"
// // // //             name="compositionName[]"
// // // //             placeholder="Composition name"
// // // //         >

// // // //         <input
// // // //             type="text"
// // // //             name="compositionStrength[]"
// // // //             placeholder="Strength e.g. 275 mg"
// // // //         >

// // // //         <button
// // // //             type="button"
// // // //             onclick="removeComposition(this)"
// // // //         >
// // // //             ✕
// // // //         </button>
// // // //     \`;

// // // //     container.appendChild(row);
// // // // }


// // // // function removeComposition(button){

// // // //     const rows =
// // // //         document.querySelectorAll(".composition-row");

// // // //     if(rows.length > 1){
// // // //         button.parentElement.remove();
// // // //     }

// // // // }

// // // // </script>

// // // // `;
// // // // }

// // // // module.exports = AddProduct;

// // // function AddProduct() {

// // // return `

// // // <meta
// // //     name="viewport"
// // //     content="width=device-width, initial-scale=1.0"
// // // >

// // // <div class="header">

// // //     <h2>➕ Add Pharma Product</h2>

// // //     <p>
// // //         Add complete product information
// // //     </p>

// // // </div>


// // // <form
// // //     action="/admin/add-product"
// // //     method="POST"
// // //     enctype="multipart/form-data"
// // // >


// // //     <!-- =========================
// // //          BASIC INFORMATION
// // //     ========================== -->

// // //     <div class="form-grid">


// // //         <div class="form-group">

// // //             <label>
// // //                 Product Name *
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="name"
// // //                 placeholder="Enter product name"
// // //                 required
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Brand
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="brand"
// // //                 placeholder="Enter brand"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Category
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="category"
// // //                 placeholder="e.g. Liver Tonic"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Manufacturer
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="manufacturer"
// // //                 placeholder="Enter manufacturer"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 MRP ₹
// // //             </label>

// // //             <input
// // //                 type="number"
// // //                 name="mrp"
// // //                 min="0"
// // //                 step="0.01"
// // //                 placeholder="Enter MRP"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Selling Price ₹ *
// // //             </label>

// // //             <input
// // //                 type="number"
// // //                 name="price"
// // //                 min="0"
// // //                 step="0.01"
// // //                 placeholder="Enter selling price"
// // //                 required
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Stock
// // //             </label>

// // //             <input
// // //                 type="number"
// // //                 name="stock"
// // //                 min="0"
// // //                 value="0"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Pack Size
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="packSize"
// // //                 placeholder="e.g. 200 ml"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 Batch No.
// // //             </label>

// // //             <input
// // //                 type="text"
// // //                 name="batchNo"
// // //                 placeholder="Enter batch number"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 MFG Date
// // //             </label>

// // //             <input
// // //                 type="date"
// // //                 name="mfgDate"
// // //             >

// // //         </div>


// // //         <div class="form-group">

// // //             <label>
// // //                 EXP Date
// // //             </label>

// // //             <input
// // //                 type="date"
// // //                 name="expDate"
// // //             >

// // //         </div>


// // //     </div>


// // //     <!-- =========================
// // //          COMPOSITION
// // //     ========================== -->

// // //     <div class="section">

// // //         <div class="section-title">
// // //             💊 Composition
// // //         </div>


// // //         <div id="compositionBox">


// // //             <div class="composition-row">

// // //                 <input
// // //                     type="text"
// // //                     name="compositionName[]"
// // //                     placeholder="Composition name"
// // //                 >


// // //                 <input
// // //                     type="text"
// // //                     name="compositionStrength[]"
// // //                     placeholder="Strength e.g. 275 mg"
// // //                 >


// // //                 <button
// // //                     type="button"
// // //                     onclick="removeComposition(this)"
// // //                 >
// // //                     ✕
// // //                 </button>

// // //             </div>


// // //         </div>


// // //         <button
// // //             type="button"
// // //             class="add-btn"
// // //             onclick="addComposition()"
// // //         >
// // //             ➕ Add Composition
// // //         </button>


// // //     </div>


// // //     <!-- =========================
// // //          IMAGES
// // //     ========================== -->

// // //     <div class="section">

// // //         <div class="section-title">
// // //             🖼 Product Images
// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Main Product Image
// // //             </label>

// // //             <input
// // //                 type="file"
// // //                 name="image"
// // //                 accept="image/*"
// // //             >

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 More Product Images
// // //             </label>

// // //             <input
// // //                 type="file"
// // //                 name="images"
// // //                 accept="image/*"
// // //                 multiple
// // //             >

// // //         </div>


// // //     </div>


// // //     <!-- =========================
// // //          PRODUCT VIDEO
// // //     ========================== -->

// // //     <div class="section">

// // //         <div class="section-title">
// // //             🎥 Product Video
// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Upload Product Video
// // //             </label>

// // //             <input
// // //                 type="file"
// // //                 name="video"
// // //                 accept="video/mp4,video/webm,video/ogg"
// // //             >

// // //             <p
// // //                 style="
// // //                     margin-top:8px;
// // //                     color:#64748b;
// // //                     font-size:13px;
// // //                 "
// // //             >
// // //                 Recommended format: MP4
// // //             </p>

// // //         </div>

// // //     </div>


// // //     <!-- =========================
// // //          PRODUCT DETAILS
// // //     ========================== -->

// // //     <div class="section">

// // //         <div class="section-title">
// // //             📋 Product Details
// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Description
// // //             </label>

// // //             <textarea
// // //                 name="description"
// // //                 placeholder="Enter product description"
// // //             ></textarea>

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Uses
// // //             </label>

// // //             <textarea
// // //                 name="uses"
// // //                 placeholder="Enter uses"
// // //             ></textarea>

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Benefits
// // //             </label>

// // //             <textarea
// // //                 name="benefits"
// // //                 placeholder="Enter benefits"
// // //             ></textarea>

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Dosage
// // //             </label>

// // //             <textarea
// // //                 name="dosage"
// // //                 placeholder="Enter dosage"
// // //             ></textarea>

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Side Effects
// // //             </label>

// // //             <textarea
// // //                 name="sideEffects"
// // //                 placeholder="Enter side effects"
// // //             ></textarea>

// // //         </div>


// // //         <div class="form-group full">

// // //             <label>
// // //                 Storage
// // //             </label>

// // //             <textarea
// // //                 name="storage"
// // //                 placeholder="Enter storage instructions"
// // //             ></textarea>

// // //         </div>


// // //     </div>


// // //     <!-- =========================
// // //          SAVE
// // //     ========================== -->

// // //     <button
// // //         type="submit"
// // //         class="submit-btn"
// // //     >

// // //         💾 Save Product

// // //     </button>


// // // </form>


// // // <script>

// // // function addComposition() {

// // //     const box =
// // //         document.getElementById("compositionBox");


// // //     const row =
// // //         document.createElement("div");


// // //     row.className =
// // //         "composition-row";


// // //     row.innerHTML = \`

// // //         <input
// // //             type="text"
// // //             name="compositionName[]"
// // //             placeholder="Composition name"
// // //         >

// // //         <input
// // //             type="text"
// // //             name="compositionStrength[]"
// // //             placeholder="Strength e.g. 275 mg"
// // //         >

// // //         <button
// // //             type="button"
// // //             onclick="removeComposition(this)"
// // //         >
// // //             ✕
// // //         </button>

// // //     \`;


// // //     box.appendChild(row);

// // // }


// // // function removeComposition(button) {

// // //     const row =
// // //         button.parentElement;


// // //     row.remove();

// // // }

// // // </script>

// // // `;

// // // }

// // // module.exports = AddProduct;



// // function AddProduct() {

// // return `

// // <meta
// //     name="viewport"
// //     content="width=device-width, initial-scale=1.0"
// // >

// // <style>

// // *{
// //     box-sizing:border-box;
// // }

// // .add-product-page{
// //     max-width:1100px;
// //     margin:20px auto;
// //     padding:20px;
// //     font-family:Segoe UI,sans-serif;
// // }

// // .product-form{
// //     background:#fff;
// //     padding:25px;
// //     border-radius:18px;
// //     box-shadow:0 10px 30px rgba(0,0,0,.08);
// // }

// // .product-title{
// //     font-size:28px;
// //     font-weight:700;
// //     color:#1e3a8a;
// //     margin-bottom:5px;
// // }

// // .product-subtitle{
// //     color:#64748b;
// //     margin-bottom:25px;
// // }

// // .form-grid{
// //     display:grid;
// //     grid-template-columns:repeat(2,1fr);
// //     gap:18px;
// // }

// // .form-group{
// //     display:flex;
// //     flex-direction:column;
// //     gap:7px;
// // }

// // .form-group.full{
// //     grid-column:1/-1;
// // }

// // .form-group label{
// //     font-weight:600;
// //     color:#374151;
// // }

// // .form-group input,
// // .form-group textarea,
// // .form-group select{
// //     width:100%;
// //     padding:12px 14px;
// //     border:1px solid #d1d5db;
// //     border-radius:10px;
// //     font-size:15px;
// //     outline:none;
// //     background:#fff;
// // }

// // .form-group input:focus,
// // .form-group textarea:focus,
// // .form-group select:focus{
// //     border-color:#2563eb;
// //     box-shadow:0 0 0 3px rgba(37,99,235,.1);
// // }

// // textarea{
// //     min-height:110px;
// //     resize:vertical;
// // }

// // .section{
// //     margin-top:30px;
// // }

// // .section-title{
// //     font-size:20px;
// //     font-weight:700;
// //     margin-bottom:15px;
// //     padding-bottom:10px;
// //     border-bottom:2px solid #e5e7eb;
// //     color:#111827;
// // }

// // .composition-row{
// //     display:grid;
// //     grid-template-columns:1fr 1fr auto;
// //     gap:10px;
// //     margin-bottom:10px;
// // }

// // .composition-row input{
// //     width:100%;
// //     padding:12px;
// //     border:1px solid #d1d5db;
// //     border-radius:10px;
// //     font-size:15px;
// //     outline:none;
// // }

// // .composition-row input:focus{
// //     border-color:#2563eb;
// // }

// // .remove-btn{
// //     border:none;
// //     background:#dc2626;
// //     color:white;
// //     border-radius:8px;
// //     padding:0 15px;
// //     cursor:pointer;
// //     font-size:18px;
// // }

// // .add-btn{
// //     border:none;
// //     background:#2563eb;
// //     color:white;
// //     padding:11px 18px;
// //     border-radius:9px;
// //     cursor:pointer;
// //     font-weight:600;
// //     margin-top:5px;
// // }

// // .add-btn:hover{
// //     background:#1d4ed8;
// // }

// // .file-box{
// //     border:2px dashed #cbd5e1;
// //     padding:18px;
// //     border-radius:12px;
// //     background:#f8fafc;
// // }

// // .file-box input{
// //     background:#fff;
// // }

// // .file-help{
// //     margin-top:8px;
// //     color:#64748b;
// //     font-size:13px;
// // }

// // .submit-btn{
// //     width:100%;
// //     margin-top:30px;
// //     padding:15px;
// //     border:none;
// //     border-radius:12px;
// //     background:linear-gradient(
// //         135deg,
// //         #2563eb,
// //         #1d4ed8
// //     );
// //     color:white;
// //     font-size:17px;
// //     font-weight:700;
// //     cursor:pointer;
// // }

// // .submit-btn:hover{
// //     opacity:.95;
// // }

// // @media(max-width:700px){

// //     .add-product-page{
// //         padding:10px;
// //         margin:10px auto;
// //     }

// //     .product-form{
// //         padding:16px;
// //         border-radius:14px;
// //     }

// //     .product-title{
// //         font-size:23px;
// //     }

// //     .form-grid{
// //         grid-template-columns:1fr;
// //     }

// //     .form-group.full{
// //         grid-column:auto;
// //     }

// //     .composition-row{
// //         grid-template-columns:1fr;
// //     }

// //     .remove-btn{
// //         padding:10px;
// //     }

// // }

// // </style>


// // <div class="add-product-page">

// // <form
// //     class="product-form"
// //     action="/admin/add-product"
// //     method="POST"
// //     enctype="multipart/form-data"
// // >


// // <!-- =========================
// //      HEADER
// // ========================== -->

// // <div class="product-title">
// //     ➕ Add Pharma Product
// // </div>

// // <div class="product-subtitle">
// //     Add complete product information
// // </div>


// // <!-- =========================
// //      BASIC INFORMATION
// // ========================== -->

// // <div class="section">

// //     <div class="section-title">
// //         📦 Basic Product Information
// //     </div>

// //     <div class="form-grid">


// //         <div class="form-group">

// //             <label>
// //                 Product Name *
// //             </label>

// //             <input
// //                 type="text"
// //                 name="name"
// //                 placeholder="Enter product name"
// //                 required
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Brand
// //             </label>

// //             <input
// //                 type="text"
// //                 name="brand"
// //                 placeholder="Enter brand"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Category
// //             </label>

// //             <input
// //                 type="text"
// //                 name="category"
// //                 placeholder="e.g. Liver Tonic"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Manufacturer
// //             </label>

// //             <input
// //                 type="text"
// //                 name="manufacturer"
// //                 placeholder="Enter manufacturer"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 MRP ₹
// //             </label>

// //             <input
// //                 type="number"
// //                 name="mrp"
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="Enter MRP"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Selling Price ₹ *
// //             </label>

// //             <input
// //                 type="number"
// //                 name="price"
// //                 min="0"
// //                 step="0.01"
// //                 placeholder="Enter selling price"
// //                 required
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Stock
// //             </label>

// //             <input
// //                 type="number"
// //                 name="stock"
// //                 min="0"
// //                 value="0"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Pack Size
// //             </label>

// //             <input
// //                 type="text"
// //                 name="packSize"
// //                 placeholder="e.g. 200 ml"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 Batch No.
// //             </label>

// //             <input
// //                 type="text"
// //                 name="batchNo"
// //                 placeholder="Enter batch number"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 MFG Date
// //             </label>

// //             <input
// //                 type="date"
// //                 name="mfgDate"
// //             >

// //         </div>


// //         <div class="form-group">

// //             <label>
// //                 EXP Date
// //             </label>

// //             <input
// //                 type="date"
// //                 name="expDate"
// //             >

// //         </div>


// //     </div>

// // </div>


// // <!-- =========================
// //      COMPOSITION
// // ========================== -->

// // <div class="section">

// //     <div class="section-title">
// //         💊 Composition
// //     </div>


// //     <div id="compositionBox">


// //         <div class="composition-row">

// //             <input
// //                 type="text"
// //                 name="compositionName[]"
// //                 placeholder="Composition name"
// //             >


// //             <input
// //                 type="text"
// //                 name="compositionStrength[]"
// //                 placeholder="Strength e.g. 275 mg"
// //             >


// //             <button
// //                 type="button"
// //                 class="remove-btn"
// //                 onclick="removeComposition(this)"
// //             >
// //                 ✕
// //             </button>

// //         </div>


// //     </div>


// //     <button
// //         type="button"
// //         class="add-btn"
// //         onclick="addComposition()"
// //     >
// //         ➕ Add Composition
// //     </button>

// // </div>


// // <!-- =========================
// //      PRODUCT IMAGES
// // ========================== -->

// // <div class="section">

// //     <div class="section-title">
// //         🖼 Product Images
// //     </div>


// //     <div class="form-group full file-box">

// //         <label>
// //             Main Product Image
// //         </label>

// //         <input
// //             type="file"
// //             name="image"
// //             accept="image/*"
// //         >

// //         <div class="file-help">
// //             Select the main product image.
// //         </div>

// //     </div>


// //     <br>


// //     <div class="form-group full file-box">

// //         <label>
// //             More Product Images
// //         </label>

// //         <input
// //             type="file"
// //             name="images"
// //             accept="image/*"
// //             multiple
// //         >

// //         <div class="file-help">
// //             You can select multiple product images.
// //         </div>

// //     </div>

// // </div>


// // <!-- =========================
// //      PRODUCT VIDEO
// // ========================== -->

// // <div class="section">

// //     <div class="section-title">
// //         🎥 Product Video
// //     </div>


// //     <div class="form-group full file-box">

// //         <label>
// //             Upload Product Video
// //         </label>

// //         <input
// //             type="file"
// //             name="video"
// //             accept="video/mp4,video/webm,video/ogg"
// //         >

// //         <div class="file-help">
// //             Recommended format: MP4, WebM or OGG.
// //         </div>

// //     </div>

// // </div>


// // <!-- =========================
// //      PRODUCT DETAILS
// // ========================== -->

// // <div class="section">

// //     <div class="section-title">
// //         📋 Product Details
// //     </div>


// //     <div class="form-grid">


// //         <div class="form-group full">

// //             <label>
// //                 Description
// //             </label>

// //             <textarea
// //                 name="description"
// //                 placeholder="Enter product description"
// //             ></textarea>

// //         </div>


// //         <div class="form-group full">

// //             <label>
// //                 Uses
// //             </label>

// //             <textarea
// //                 name="uses"
// //                 placeholder="Enter uses"
// //             ></textarea>

// //         </div>


// //         <div class="form-group full">

// //             <label>
// //                 Benefits
// //             </label>

// //             <textarea
// //                 name="benefits"
// //                 placeholder="Enter benefits"
// //             ></textarea>

// //         </div>


// //         <div class="form-group full">

// //             <label>
// //                 Dosage
// //             </label>

// //             <textarea
// //                 name="dosage"
// //                 placeholder="Enter dosage"
// //             ></textarea>

// //         </div>


// //         <div class="form-group full">

// //             <label>
// //                 Side Effects
// //             </label>

// //             <textarea
// //                 name="sideEffects"
// //                 placeholder="Enter side effects"
// //             ></textarea>

// //         </div>


// //         <div class="form-group full">

// //             <label>
// //                 Storage
// //             </label>

// //             <textarea
// //                 name="storage"
// //                 placeholder="Enter storage instructions"
// //             ></textarea>

// //         </div>


// //     </div>

// // </div>


// // <!-- =========================
// //      SAVE PRODUCT
// // ========================== -->

// // <button
// //     type="submit"
// //     class="submit-btn"
// // >
// //     💾 Save Product
// // </button>


// // </form>

// // </div>


// // <script>

// // function addComposition(){

// //     const container =
// //         document.getElementById("compositionBox");


// //     const row =
// //         document.createElement("div");


// //     row.className =
// //         "composition-row";


// //     row.innerHTML = \`

// //         <input
// //             type="text"
// //             name="compositionName[]"
// //             placeholder="Composition name"
// //         >

// //         <input
// //             type="text"
// //             name="compositionStrength[]"
// //             placeholder="Strength e.g. 275 mg"
// //         >

// //         <button
// //             type="button"
// //             class="remove-btn"
// //             onclick="removeComposition(this)"
// //         >
// //             ✕
// //         </button>

// //     \`;


// //     container.appendChild(row);

// // }


// // function removeComposition(button){

// //     const rows =
// //         document.querySelectorAll(
// //             ".composition-row"
// //         );


// //     if(rows.length > 1){

// //         button
// //             .parentElement
// //             .remove();

// //     }

// // }

// // </script>

// // `;

// // }

// // module.exports = AddProduct;



// function AddProduct() {
//     return `

// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <style>

// *{
//     box-sizing:border-box;
// }

// .add-product-page{
//     max-width:1100px;
//     margin:20px auto;
//     padding:20px;
//     font-family:Segoe UI,sans-serif;
// }

// .product-form{
//     background:#fff;
//     padding:25px;
//     border-radius:18px;
//     box-shadow:0 10px 30px rgba(0,0,0,.08);
// }

// .product-title{
//     font-size:28px;
//     font-weight:700;
//     color:#1e3a8a;
//     margin-bottom:5px;
// }

// .product-subtitle{
//     color:#64748b;
//     margin-bottom:25px;
// }

// .form-grid{
//     display:grid;
//     grid-template-columns:repeat(2,1fr);
//     gap:18px;
// }

// .form-group{
//     display:flex;
//     flex-direction:column;
//     gap:7px;
// }

// .form-group.full{
//     grid-column:1/-1;
// }

// .form-group label{
//     font-weight:600;
//     color:#374151;
// }

// .form-group input,
// .form-group textarea,
// .form-group select{
//     width:100%;
//     padding:12px 14px;
//     border:1px solid #d1d5db;
//     border-radius:10px;
//     font-size:15px;
//     outline:none;
//     background:#fff;
// }

// .form-group input:focus,
// .form-group textarea:focus,
// .form-group select:focus{
//     border-color:#2563eb;
//     box-shadow:0 0 0 3px rgba(37,99,235,.1);
// }

// .form-group input[readonly]{
//     background:#eff6ff;
//     color:#1e3a8a;
//     font-weight:700;
// }

// textarea{
//     min-height:110px;
//     resize:vertical;
// }

// .section{
//     margin-top:30px;
// }

// .section-title{
//     font-size:20px;
//     font-weight:700;
//     margin-bottom:15px;
//     padding-bottom:10px;
//     border-bottom:2px solid #e5e7eb;
//     color:#111827;
// }

// .composition-row{
//     display:grid;
//     grid-template-columns:1fr 1fr auto;
//     gap:10px;
//     margin-bottom:10px;
// }

// .composition-row input{
//     width:100%;
//     padding:12px;
//     border:1px solid #d1d5db;
//     border-radius:10px;
//     font-size:15px;
//     outline:none;
// }

// .remove-btn{
//     border:none;
//     background:#dc2626;
//     color:white;
//     border-radius:8px;
//     padding:0 15px;
//     cursor:pointer;
//     font-size:18px;
// }

// .add-btn{
//     border:none;
//     background:#2563eb;
//     color:white;
//     padding:11px 18px;
//     border-radius:9px;
//     cursor:pointer;
//     font-weight:600;
//     margin-top:5px;
// }

// .file-box{
//     border:2px dashed #cbd5e1;
//     padding:18px;
//     border-radius:12px;
//     background:#f8fafc;
// }

// .file-help{
//     margin-top:8px;
//     color:#64748b;
//     font-size:13px;
// }

// .submit-btn{
//     width:100%;
//     margin-top:30px;
//     padding:15px;
//     border:none;
//     border-radius:12px;
//     background:linear-gradient(135deg,#2563eb,#1d4ed8);
//     color:white;
//     font-size:17px;
//     font-weight:700;
//     cursor:pointer;
// }

// @media(max-width:700px){

//     .add-product-page{
//         padding:10px;
//         margin:10px auto;
//     }

//     .product-form{
//         padding:16px;
//     }

//     .form-grid,
//     .composition-row{
//         grid-template-columns:1fr;
//     }

//     .form-group.full{
//         grid-column:auto;
//     }

//     .remove-btn{
//         padding:10px;
//     }
// }

// </style>

// <div class="add-product-page">

// <form
//     class="product-form"
//     action="/admin/add-product"
//     method="POST"
//     enctype="multipart/form-data"
// >

//     <div class="product-title">
//         ➕ Add Pharma Product
//     </div>

//     <div class="product-subtitle">
//         Add complete product information
//     </div>

//     <div class="section">

//         <div class="section-title">
//             📦 Basic Product Information
//         </div>

//         <div class="form-grid">

//             <div class="form-group">
//                 <label>Product Name *</label>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Enter product name"
//                     required
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Brand</label>
//                 <input
//                     type="text"
//                     name="brand"
//                     placeholder="Enter brand"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Category</label>
//                 <input
//                     type="text"
//                     name="category"
//                     placeholder="e.g. Liver Tonic"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Manufacturer</label>
//                 <input
//                     type="text"
//                     name="manufacturer"
//                     placeholder="Enter manufacturer"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>MRP ₹ *</label>
//                 <input
//                     type="number"
//                     id="mrp"
//                     name="mrp"
//                     min="0"
//                     step="0.01"
//                     placeholder="Enter MRP"
//                     required
//                     oninput="calculateSellingPrice()"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Discount %</label>
//                 <input
//                     type="number"
//                     id="discountPercentage"
//                     name="discountPercentage"
//                     min="0"
//                     max="100"
//                     step="0.01"
//                     value="0"
//                     placeholder="e.g. 10"
//                     oninput="calculateSellingPrice()"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Selling Price ₹ * (Auto Calculated)</label>
//                 <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     min="0"
//                     step="0.01"
//                     placeholder="Auto calculated price"
//                     required
//                     readonly
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Stock</label>
//                 <input
//                     type="number"
//                     name="stock"
//                     min="0"
//                     value="0"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Pack Size</label>
//                 <input
//                     type="text"
//                     name="packSize"
//                     placeholder="e.g. 200 ml"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>Batch No.</label>
//                 <input
//                     type="text"
//                     name="batchNo"
//                     placeholder="Enter batch number"
//                 >
//             </div>

//             <div class="form-group">
//                 <label>MFG Date</label>
//                 <input type="date" name="mfgDate">
//             </div>

//             <div class="form-group">
//                 <label>EXP Date</label>
//                 <input type="date" name="expDate">
//             </div>

//         </div>
//     </div>

//     <div class="section">

//         <div class="section-title">
//             💊 Composition
//         </div>

//         <div id="compositionBox">

//             <div class="composition-row">

//                 <input
//                     type="text"
//                     name="compositionName[]"
//                     placeholder="Composition name"
//                 >

//                 <input
//                     type="text"
//                     name="compositionStrength[]"
//                     placeholder="Strength e.g. 275 mg"
//                 >

//                 <button
//                     type="button"
//                     class="remove-btn"
//                     onclick="removeComposition(this)"
//                 >
//                     ✕
//                 </button>

//             </div>

//         </div>

//         <button
//             type="button"
//             class="add-btn"
//             onclick="addComposition()"
//         >
//             ➕ Add Composition
//         </button>

//     </div>

//     <div class="section">

//         <div class="section-title">
//             🖼 Product Images
//         </div>

//         <div class="form-group full file-box">

//             <label>Main Product Image</label>

//             <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//             >

//             <div class="file-help">
//                 Select the main product image.
//             </div>

//         </div>

//         <br>

//         <div class="form-group full file-box">

//             <label>More Product Images</label>

//             <input
//                 type="file"
//                 name="images"
//                 accept="image/*"
//                 multiple
//             >

//             <div class="file-help">
//                 You can select multiple product images.
//             </div>

//         </div>

//     </div>

//     <div class="section">

//         <div class="section-title">
//             🎥 Product Video
//         </div>

//         <div class="form-group full file-box">

//             <label>Upload Product Video</label>

//             <input
//                 type="file"
//                 name="video"
//                 accept="video/mp4,video/webm,video/ogg"
//             >

//             <div class="file-help">
//                 Recommended format: MP4, WebM or OGG.
//             </div>

//         </div>

//     </div>

//     <div class="section">

//         <div class="section-title">
//             📋 Product Details
//         </div>

//         <div class="form-grid">

//             <div class="form-group full">
//                 <label>Description</label>
//                 <textarea
//                     name="description"
//                     placeholder="Enter product description"
//                 ></textarea>
//             </div>

//             <div class="form-group full">
//                 <label>Uses</label>
//                 <textarea
//                     name="uses"
//                     placeholder="Enter uses"
//                 ></textarea>
//             </div>

//             <div class="form-group full">
//                 <label>Benefits</label>
//                 <textarea
//                     name="benefits"
//                     placeholder="Enter benefits"
//                 ></textarea>
//             </div>

//             <div class="form-group full">
//                 <label>Dosage</label>
//                 <textarea
//                     name="dosage"
//                     placeholder="Enter dosage"
//                 ></textarea>
//             </div>

//             <div class="form-group full">
//                 <label>Side Effects</label>
//                 <textarea
//                     name="sideEffects"
//                     placeholder="Enter side effects"
//                 ></textarea>
//             </div>

//             <div class="form-group full">
//                 <label>Storage</label>
//                 <textarea
//                     name="storage"
//                     placeholder="Enter storage instructions"
//                 ></textarea>
//             </div>

//         </div>
//     </div>

//     <button type="submit" class="submit-btn">
//         💾 Save Product
//     </button>

// </form>

// </div>

// <script>

// function calculateSellingPrice(){

//     const mrp = Number(
//         document.getElementById("mrp").value || 0
//     );

//     let discount = Number(
//         document.getElementById("discountPercentage").value || 0
//     );

//     discount = Math.min(
//         100,
//         Math.max(0, discount)
//     );

//     const sellingPrice =
//         mrp - (mrp * discount / 100);

//     document.getElementById("price").value =
//         mrp > 0
//             ? sellingPrice.toFixed(2)
//             : "";
// }

// function addComposition(){

//     const container =
//         document.getElementById("compositionBox");

//     const row =
//         document.createElement("div");

//     row.className =
//         "composition-row";

//     row.innerHTML = \`

//         <input
//             type="text"
//             name="compositionName[]"
//             placeholder="Composition name"
//         >

//         <input
//             type="text"
//             name="compositionStrength[]"
//             placeholder="Strength e.g. 275 mg"
//         >

//         <button
//             type="button"
//             class="remove-btn"
//             onclick="removeComposition(this)"
//         >
//             ✕
//         </button>
//     \`;

//     container.appendChild(row);
// }

// function removeComposition(button){

//     const rows =
//         document.querySelectorAll(".composition-row");

//     if(rows.length > 1){
//         button.parentElement.remove();
//     }
// }

// </script>

// `;
// }

// module.exports = AddProduct;



function AddProduct() {
    return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        .add-product-page {
            max-width: 900px;
            margin: 20px auto;
            padding: 16px;
            font-family: Arial, sans-serif;
        }

        .product-form {
            background: #fff;
            padding: 20px;
            border-radius: 14px;
            box-shadow: 0 4px 18px rgba(0,0,0,.08);
        }

        .product-form h2 {
            margin: 0 0 20px;
            color: #123b66;
        }

        .product-form .form-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
        }

        .product-form .field {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
        }

        .product-form .full-width {
            grid-column: 1 / -1;
        }

        .product-form label {
            font-weight: 600;
            font-size: 14px;
        }

        .product-form input,
        .product-form select,
        .product-form textarea {
            width: 100%;
            box-sizing: border-box;
            padding: 11px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
        }

        .product-form input[type="file"] {
            background: #f8fafc;
        }

        .product-form textarea {
            min-height: 90px;
            resize: vertical;
        }

        .product-form .image-preview {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
        }

        .product-form .preview-item {
            width: 100px;
            position: relative;
        }

        .product-form .preview-item img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f8fafc;
        }

        .product-form .preview-item span {
            display: block;
            font-size: 11px;
            overflow-wrap: anywhere;
            margin-top: 4px;
        }

        .product-form .section-title {
            margin: 24px 0 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
            color: #123b66;
        }

        .product-form .composition-row {
            display: grid;
            grid-template-columns: 1fr 1fr auto;
            gap: 8px;
            margin-bottom: 10px;
        }

        .product-form button {
            cursor: pointer;
            border: 0;
            border-radius: 8px;
            padding: 12px 16px;
            font-weight: 600;
        }

        .product-form .add-btn {
            background: #e0f2fe;
            color: #075985;
        }

        .product-form .remove-btn {
            background: #fee2e2;
            color: #991b1b;
        }

        .product-form .submit-btn {
            width: 100%;
            margin-top: 24px;
            background: #087443;
            color: white;
            font-size: 16px;
        }

        .product-form .hint {
            font-size: 12px;
            color: #64748b;
        }

        @media (max-width: 600px) {
            .add-product-page {
                padding: 8px;
                margin: 8px auto;
            }

            .product-form {
                padding: 14px;
            }

            .product-form .form-grid {
                grid-template-columns: 1fr;
            }

            .product-form .composition-row {
                grid-template-columns: 1fr;
            }
        }
    </style>

    <div class="add-product-page">
        <form
            class="product-form"
            action="/admin/add-product"
            method="POST"
            enctype="multipart/form-data"
        >
            <h2>➕ Add New Product</h2>

            <div class="form-grid">
                <div class="field">
                    <label for="productName">Product Name *</label>
                    <input id="productName" name="name" type="text"
                           placeholder="Product name" required>
                </div>

                <div class="field">
                    <label for="brand">Brand</label>
                    <input id="brand" name="brand" type="text"
                           placeholder="Brand name">
                </div>

                <div class="field">
                    <label for="category">Category *</label>
                    <input id="category" name="category" type="text"
                           placeholder="Product category" required>
                </div>

                <div class="field">
                    <label for="manufacturer">Manufacturer</label>
                    <input id="manufacturer" name="manufacturer" type="text"
                           placeholder="Manufacturer name">
                </div>

                <div class="field">
                    <label for="mrp">MRP (₹) *</label>
                    <input id="mrp" name="mrp" type="number"
                           min="0" step="0.01" placeholder="Enter MRP"
                           oninput="calculateSellingPrice()" required>
                </div>

                <div class="field">
                    <label for="discountPercentage">Discount (%)</label>
                    <input id="discountPercentage" name="discountPercentage"
                           type="number" min="0" max="100" step="0.01"
                           value="0" oninput="calculateSellingPrice()">
                </div>

                <div class="field">
                    <label for="price">Selling Price (₹) *</label>
                    <input id="price" name="price" type="number"
                           min="0" step="0.01" readonly required>
                </div>

                <div class="field">
                    <label for="stock">Stock Quantity *</label>
                    <input id="stock" name="stock" type="number"
                           min="0" placeholder="Available stock" required>
                </div>

                <div class="field">
                    <label for="packSize">Pack Size</label>
                    <input id="packSize" name="packSize" type="text"
                           placeholder="e.g. 100 ml / 10 tablets">
                </div>

                <div class="field">
                    <label for="batchNo">Batch Number</label>
                    <input id="batchNo" name="batchNo" type="text">
                </div>

                <div class="field">
                    <label for="mfgDate">Manufacturing Date</label>
                    <input id="mfgDate" name="mfgDate" type="date">
                </div>

                <div class="field">
                    <label for="expDate">Expiry Date</label>
                    <input id="expDate" name="expDate" type="date">
                </div>
            </div>

            <h3 class="section-title">Product Composition</h3>

            <div id="compositionContainer">
                <div class="composition-row">
                    <input name="compositionName[]" type="text"
                           placeholder="Composition name">
                    <input name="compositionValue[]" type="text"
                           placeholder="Strength / quantity">
                    <button type="button" class="remove-btn"
                            onclick="removeComposition(this)">Remove</button>
                </div>
            </div>

            <button type="button" class="add-btn"
                    onclick="addComposition()">+ Add Composition</button>

            <h3 class="section-title">Product Images</h3>

            <div class="form-grid">
                <div class="field full-width">
                    <label for="mainImage">Main Product Image *</label>
                    <input id="mainImage" name="image" type="file"
                           accept="image/jpeg,image/png,image/webp"
                           required>
                    <span class="hint">अपने कंप्यूटर या मोबाइल से एक मुख्य फोटो चुनें।</span>
                    <div id="mainImagePreview" class="image-preview"></div>
                </div>

                <div class="field full-width">
                    <label for="extraImages">Additional Images (Multiple)</label>
                    <input id="extraImages" name="images" type="file"
                           accept="image/jpeg,image/png,image/webp"
                           multiple>
                    <span class="hint">एक साथ कई फोटो चुन सकते हैं।</span>
                    <div id="extraImagesPreview" class="image-preview"></div>
                </div>

                <div class="field full-width">
                    <label for="video">Product Video (Optional)</label>
                    <input id="video" name="video" type="file"
                           accept="video/mp4,video/webm,video/ogg">
                    <span class="hint">MP4, WebM या OGG वीडियो चुनें।</span>
                    <div id="videoName" class="hint"></div>
                </div>
            </div>

            <h3 class="section-title">Product Details</h3>

            <div class="form-grid">
                <div class="field full-width">
                    <label for="description">Description</label>
                    <textarea id="description" name="description"
                              placeholder="Product description"></textarea>
                </div>

                <div class="field">
                    <label for="uses">Uses</label>
                    <textarea id="uses" name="uses"
                              placeholder="Product uses"></textarea>
                </div>

                <div class="field">
                    <label for="benefits">Benefits</label>
                    <textarea id="benefits" name="benefits"
                              placeholder="Product benefits"></textarea>
                </div>

                <div class="field">
                    <label for="dosage">Dosage / Instructions</label>
                    <textarea id="dosage" name="dosage"
                              placeholder="Instructions"></textarea>
                </div>

                <div class="field">
                    <label for="sideEffects">Side Effects / Warnings</label>
                    <textarea id="sideEffects" name="sideEffects"
                              placeholder="Warnings"></textarea>
                </div>

                <div class="field full-width">
                    <label for="storage">Storage Instructions</label>
                    <textarea id="storage" name="storage"
                              placeholder="Storage instructions"></textarea>
                </div>
            </div>

            <button type="submit" class="submit-btn">💾 Save Product</button>
        </form>
    </div>

    <script>
        function calculateSellingPrice() {
            const mrp = parseFloat(document.getElementById("mrp").value) || 0;
            const discount = parseFloat(
                document.getElementById("discountPercentage").value
            ) || 0;

            const safeDiscount = Math.min(100, Math.max(0, discount));
            const price = mrp - (mrp * safeDiscount / 100);

            document.getElementById("price").value =
                mrp > 0 ? price.toFixed(2) : "";
        }

        function addComposition() {
            const container = document.getElementById("compositionContainer");
            const row = document.createElement("div");

            row.className = "composition-row";
            row.innerHTML = \`
                <input name="compositionName[]" type="text"
                       placeholder="Composition name">
                <input name="compositionValue[]" type="text"
                       placeholder="Strength / quantity">
                <button type="button" class="remove-btn"
                        onclick="removeComposition(this)">Remove</button>
            \`;

            container.appendChild(row);
        }

        function removeComposition(button) {
            const container = document.getElementById("compositionContainer");

            if (container.children.length > 1) {
                button.closest(".composition-row").remove();
            } else {
                button.closest(".composition-row").querySelectorAll("input")
                    .forEach(input => input.value = "");
            }
        }

        function showImagePreview(input, previewId, multiple) {
            const preview = document.getElementById(previewId);
            preview.innerHTML = "";

            const files = Array.from(input.files || []);

            files.forEach(file => {
                if (!file.type.startsWith("image/")) return;

                const item = document.createElement("div");
                item.className = "preview-item";

                const img = document.createElement("img");
                const name = document.createElement("span");

                img.alt = file.name;
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);

                name.textContent = file.name;

                item.appendChild(img);
                item.appendChild(name);
                preview.appendChild(item);
            });
        }

        document.getElementById("mainImage").addEventListener("change", function () {
            showImagePreview(this, "mainImagePreview", false);
        });

        document.getElementById("extraImages").addEventListener("change", function () {
            showImagePreview(this, "extraImagesPreview", true);
        });

        document.getElementById("video").addEventListener("change", function () {
            const file = this.files && this.files[0];
            document.getElementById("videoName").textContent =
                file ? "Selected video: " + file.name : "";
        });

        document.querySelector(".product-form").addEventListener("submit", function (event) {
            const mrp = parseFloat(document.getElementById("mrp").value);
            const discount = parseFloat(
                document.getElementById("discountPercentage").value
            ) || 0;

            if (mrp <= 0 || discount < 0 || discount > 100) {
                event.preventDefault();
                alert("कृपया सही MRP और 0 से 100 के बीच Discount दर्ज करें।");
                return;
            }

            calculateSellingPrice();
        });
    </script>
    `;
}

module.exports = AddProduct;

