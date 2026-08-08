// // // function AddProduct() {
// // // return `
// // // <!DOCTYPE html>
// // // <html>

// // // <head>

// // // <meta charset="UTF-8">
// // // <meta name="viewport" content="width=device-width,initial-scale=1">

// // // <title>Add Product</title>

// // // <style>

// // // *{
// // // margin:0;
// // // padding:0;
// // // box-sizing:border-box;
// // // font-family:Segoe UI,sans-serif;
// // // }

// // // body{
// // // background:linear-gradient(135deg,#2563eb,#06b6d4);
// // // padding:30px;
// // // }

// // // .form{

// // // max-width:900px;
// // // margin:auto;
// // // background:#fff;
// // // padding:30px;
// // // border-radius:20px;
// // // box-shadow:0 15px 40px rgba(0,0,0,.15);

// // // }

// // // h2{

// // // text-align:center;
// // // margin-bottom:25px;
// // // color:#1e40af;

// // // }

// // // .grid{

// // // display:grid;
// // // grid-template-columns:repeat(2,1fr);
// // // gap:15px;

// // // }

// // // input,
// // // textarea,
// // // select{

// // // width:100%;
// // // padding:12px;
// // // border:1px solid #ddd;
// // // border-radius:10px;
// // // font-size:15px;
// // // outline:none;

// // // }

// // // textarea{

// // // min-height:120px;
// // // resize:vertical;

// // // }

// // // #compositionBox input{

// // // margin-bottom:10px;

// // // }

// // // .add-btn{

// // // background:#16a34a;
// // // margin-top:10px;

// // // }

// // // button{

// // // width:100%;
// // // padding:14px;
// // // border:none;
// // // border-radius:10px;
// // // background:#2563eb;
// // // color:#fff;
// // // font-size:16px;
// // // font-weight:bold;
// // // cursor:pointer;
// // // margin-top:15px;

// // // }

// // // button:hover{

// // // opacity:.9;

// // // }

// // // .full{

// // // grid-column:1/-1;

// // // }

// // // @media(max-width:700px){

// // // .grid{

// // // grid-template-columns:1fr;

// // // }

// // // body{

// // // padding:10px;

// // // }

// // // .form{

// // // padding:20px;

// // // }

// // // }

// // // </style>

// // // </head>

// // // <body>

// // // <div class="form">

// // // <h2>➕ Add New Product</h2>

// // // <form
// // // action="/admin/add-product"
// // // method="POST"
// // // enctype="multipart/form-data">

// // // <div class="grid">

// // // <input
// // // type="text"
// // // name="name"
// // // placeholder="Product Name"
// // // required>

// // // <input
// // // type="text"
// // // name="brand"
// // // placeholder="Brand Name">

// // // <select name="category">

// // // <option>Tablet</option>
// // // <option>Capsule</option>
// // // <option>Syrup</option>
// // // <option>Drops</option>
// // // <option>Injection</option>
// // // <option>Cream</option>
// // // <option>Other</option>

// // // </select>

// // // <input
// // // type="text"
// // // name="manufacturer"
// // // placeholder="Manufacturer">

// // // <input
// // // type="number"
// // // name="mrp"
// // // placeholder="MRP">

// // // <input
// // // type="number"
// // // name="price"
// // // placeholder="Selling Price"
// // // required>

// // // <input
// // // type="number"
// // // name="stock"
// // // placeholder="Stock">

// // // <input
// // // type="text"
// // // name="packSize"
// // // placeholder="Pack Size">

// // // <input
// // // type="text"
// // // name="batchNo"
// // // placeholder="Batch Number">

// // // <input
// // // type="date"
// // // name="mfgDate">

// // // <input
// // // type="date"
// // // name="expDate">

// // // <div class="full">

// // // <h3>Composition</h3>

// // // <div id="compositionBox">

// // // <input
// // // type="text"
// // // name="composition[]"
// // // placeholder="Composition">

// // // </div>

// // // <button
// // // type="button"
// // // class="add-btn"
// // // onclick="addComposition()">

// // // + Add Composition

// // // </button>

// // // </div>

// // // <textarea
// // // class="full"
// // // name="uses"
// // // placeholder="Uses"></textarea>

// // // <textarea
// // // class="full"
// // // name="benefits"
// // // placeholder="Benefits"></textarea>

// // // <textarea
// // // class="full"
// // // name="dosage"
// // // placeholder="Dosage"></textarea>

// // // <textarea
// // // class="full"
// // // name="sideEffects"
// // // placeholder="Side Effects"></textarea>

// // // <textarea
// // // class="full"
// // // name="storage"
// // // placeholder="Storage Instructions"></textarea>

// // // <textarea
// // // class="full"
// // // name="description"
// // // placeholder="Full Description"></textarea>

// // // <div class="full">

// // // <label><b>Product Images</b></label>

// // // <input
// // // type="file"
// // // name="images"
// // // multiple
// // // accept="image/*">

// // // </div>

// // // <div class="full">

// // // <button type="submit">

// // // Save Product

// // // </button>

// // // </div>

// // // </div>

// // // </form>

// // // </div>

// // // <script>

// // // function addComposition(){

// // // let div=document.createElement("div");

// // // div.innerHTML=\`
// // // <input
// // // type="text"
// // // name="composition[]"
// // // placeholder="Composition">
// // // \`;

// // // document
// // // .getElementById("compositionBox")
// // // .appendChild(div);

// // // }

// // // </script>

// // // </body>

// // // </html>

// // // `;
// // // }

// // // module.exports = AddProduct;

// // function AddProduct(){

// // return `

// // <!DOCTYPE html>
// // <html>

// // <head>

// // <meta charset="UTF-8">

// // <meta name="viewport"
// // content="width=device-width,initial-scale=1">

// // <title>
// // Add Product
// // </title>


// // <style>

// // *{

// // margin:0;
// // padding:0;
// // box-sizing:border-box;
// // font-family:'Segoe UI',sans-serif;

// // }


// // body{

// // background:
// // linear-gradient(
// // 135deg,
// // #2563eb,
// // #06b6d4
// // );

// // padding:30px;

// // }



// // .form{

// // max-width:1000px;

// // margin:auto;

// // background:white;

// // padding:30px;

// // border-radius:25px;

// // box-shadow:
// // 0 15px 40px rgba(0,0,0,.15);

// // }



// // h2{

// // text-align:center;

// // margin-bottom:25px;

// // color:#1e40af;

// // }



// // h3{

// // margin-bottom:10px;

// // color:#1e293b;

// // }



// // .grid{

// // display:grid;

// // grid-template-columns:
// // repeat(2,1fr);

// // gap:15px;

// // }



// // input,
// // textarea,
// // select{


// // width:100%;

// // padding:12px;

// // border:1px solid #ddd;

// // border-radius:10px;

// // font-size:15px;

// // outline:none;

// // }



// // textarea{

// // min-height:120px;

// // resize:vertical;

// // }



// // .full{

// // grid-column:1/-1;

// // }



// // button{


// // width:100%;

// // padding:14px;

// // border:none;

// // border-radius:12px;

// // background:#2563eb;

// // color:white;

// // font-size:16px;

// // font-weight:700;

// // cursor:pointer;

// // margin-top:15px;

// // }



// // button:hover{

// // opacity:.9;

// // }



// // .add-btn{


// // background:#16a34a;

// // }



// // #compositionBox input,
// // #imageBox input{

// // margin-bottom:10px;

// // }



// // .save-btn{

// // background:#2563eb;

// // }



// // @media(max-width:700px){


// // body{

// // padding:10px;

// // }



// // .form{

// // padding:20px;

// // }



// // .grid{

// // grid-template-columns:1fr;

// // }


// // }



// // </style>


// // </head>


// // <body>



// // <div class="form">



// // <h2>
// // ➕ Add New Pharma Product
// // </h2>




// // <form

// // action="/admin/add-product"

// // method="POST"

// // enctype="multipart/form-data">



// // <div class="grid">



// // <input

// // type="text"

// // name="name"

// // placeholder="Product Name"

// // required>



// // <input

// // type="text"

// // name="brand"

// // placeholder="Brand Name">





// // <select name="category">


// // <option>
// // Tablet
// // </option>


// // <option>
// // Capsule
// // </option>


// // <option>
// // Syrup
// // </option>


// // <option>
// // Drops
// // </option>


// // <option>
// // Injection
// // </option>


// // <option>
// // Cream
// // </option>


// // <option>
// // Other
// // </option>


// // </select>





// // <input

// // type="text"

// // name="manufacturer"

// // placeholder="Manufacturer">





// // <input

// // type="number"

// // name="mrp"

// // placeholder="MRP">





// // <input

// // type="number"

// // name="price"

// // placeholder="Selling Price"

// // required>





// // <input

// // type="number"

// // name="stock"

// // placeholder="Stock Quantity">





// // <input

// // type="text"

// // name="packSize"

// // placeholder="Pack Size">





// // <input

// // type="text"

// // name="batchNo"

// // placeholder="Batch Number">





// // <input

// // type="date"

// // name="mfgDate">





// // <input

// // type="date"

// // name="expDate">






// // <!-- COMPOSITION -->

// // <div class="full">


// // <h3>
// // 💊 Composition
// // </h3>



// // <div id="compositionBox">



// // <input

// // type="text"

// // name="composition[]"

// // placeholder="Composition">



// // </div>




// // <button

// // type="button"

// // class="add-btn"

// // onclick="addComposition()">



// // + Add Composition


// // </button>



// // </div>







// // <textarea

// // class="full"

// // name="uses"

// // placeholder="Uses">

// // </textarea>





// // <textarea

// // class="full"

// // name="benefits"

// // placeholder="Benefits">

// // </textarea>





// // <textarea

// // class="full"

// // name="dosage"

// // placeholder="Dosage">

// // </textarea>





// // <textarea

// // class="full"

// // name="sideEffects"

// // placeholder="Side Effects">

// // </textarea>





// // <textarea

// // class="full"

// // name="storage"

// // placeholder="Storage Instructions">

// // </textarea>





// // <textarea

// // class="full"

// // name="description"

// // placeholder="Full Description">

// // </textarea>







// // <!-- MULTIPLE IMAGE -->


// // <div class="full">


// // <h3>
// // 🖼 Product Images
// // </h3>



// // <div id="imageBox">



// // <input

// // type="file"

// // name="images"

// // accept="image/*">



// // </div>





// // <button

// // type="button"

// // class="add-btn"

// // onclick="addImage()">



// // + Add More Image


// // </button>



// // </div>







// // <div class="full">


// // <button

// // type="submit"

// // class="save-btn">



// // 💾 Save Product


// // </button>


// // </div>




// // </div>



// // </form>



// // </div>






// // <script>



// // function addComposition(){


// // let div=document.createElement("div");



// // div.innerHTML=`

// // <input

// // type="text"

// // name="composition[]"

// // placeholder="Composition">

// // `;



// // document

// // .getElementById("compositionBox")

// // .appendChild(div);



// // }





// // function addImage(){


// // let div=document.createElement("div");



// // div.innerHTML=`

// // <input

// // type="file"

// // name="images"

// // accept="image/*">

// // `;



// // document

// // .getElementById("imageBox")

// // .appendChild(div);



// // }



// // </script>



// // </body>


// // </html>


// // `;

// // }



// // module.exports = AddProduct;


// function AddProduct(){

// return `

// <!DOCTYPE html>
// <html>

// <head>

// <meta charset="UTF-8">

// <meta name="viewport" content="width=device-width, initial-scale=1">

// <title>
// Add Product
// </title>


// <style>

// *{
// margin:0;
// padding:0;
// box-sizing:border-box;
// font-family:Segoe UI,sans-serif;
// }


// body{

// background:
// linear-gradient(135deg,#2563eb,#06b6d4);

// padding:30px;

// }


// .form{

// max-width:1000px;

// margin:auto;

// background:white;

// padding:30px;

// border-radius:25px;

// box-shadow:
// 0 15px 40px rgba(0,0,0,.15);

// }


// h2{

// text-align:center;

// color:#1e40af;

// margin-bottom:25px;

// }



// .grid{

// display:grid;

// grid-template-columns:
// repeat(2,1fr);

// gap:15px;

// }



// input,
// textarea,
// select{

// width:100%;

// padding:12px;

// border:1px solid #ddd;

// border-radius:10px;

// font-size:15px;

// }



// textarea{

// min-height:120px;

// resize:vertical;

// }



// .full{

// grid-column:1/-1;

// }



// button{

// width:100%;

// padding:14px;

// margin-top:15px;

// border:none;

// border-radius:12px;

// background:#2563eb;

// color:white;

// font-size:16px;

// font-weight:bold;

// cursor:pointer;

// }



// button:hover{

// opacity:.9;

// }



// .add-btn{

// background:#16a34a;

// }



// .save-btn{

// background:#2563eb;

// }



// #compositionBox input,
// #imageBox input{

// margin-top:10px;

// }



// @media(max-width:700px){


// body{

// padding:10px;

// }


// .grid{

// grid-template-columns:1fr;

// }


// .form{

// padding:20px;

// }


// }



// </style>


// </head>



// <body>


// <div class="form">


// <h2>
// ➕ Add New Pharma Product
// </h2>



// <form

// action="/admin/add-product"

// method="POST"

// enctype="multipart/form-data">



// <div class="grid">



// <input
// type="text"
// name="name"
// placeholder="Product Name"
// required>



// <input
// type="text"
// name="brand"
// placeholder="Brand Name">



// <select name="category">

// <option>Tablet</option>
// <option>Capsule</option>
// <option>Syrup</option>
// <option>Drops</option>
// <option>Injection</option>
// <option>Cream</option>
// <option>Other</option>

// </select>



// <input
// type="text"
// name="manufacturer"
// placeholder="Manufacturer">



// <input
// type="number"
// name="mrp"
// placeholder="MRP">



// <input
// type="number"
// name="price"
// placeholder="Selling Price"
// required>



// <input
// type="number"
// name="stock"
// placeholder="Stock">



// <input
// type="text"
// name="packSize"
// placeholder="Pack Size">



// <input
// type="text"
// name="batchNo"
// placeholder="Batch Number">



// <input
// type="date"
// name="mfgDate">



// <input
// type="date"
// name="expDate">





// <!-- COMPOSITION -->

// <div class="full">


// <h3>
// 💊 Composition
// </h3>


// <div id="compositionBox">


// <input

// type="text"

// name="composition[]"

// placeholder="Composition">


// </div>



// <button

// type="button"

// class="add-btn"

// onclick="addComposition()">


// + Add Composition


// </button>


// </div>







// <textarea

// class="full"

// name="uses"

// placeholder="Uses">

// </textarea>



// <textarea

// class="full"

// name="benefits"

// placeholder="Benefits">

// </textarea>



// <textarea

// class="full"

// name="dosage"

// placeholder="Dosage">

// </textarea>



// <textarea

// class="full"

// name="sideEffects"

// placeholder="Side Effects">

// </textarea>



// <textarea

// class="full"

// name="storage"

// placeholder="Storage">

// </textarea>



// <textarea

// class="full"

// name="description"

// placeholder="Description">

// </textarea>







// <!-- IMAGES -->

// <div class="full">


// <h3>
// 🖼 Product Images
// </h3>


// <div id="imageBox">


// <input

// type="file"

// name="images"

// accept="image/*">


// </div>



// <button

// type="button"

// class="add-btn"

// onclick="addImage()">



// + Add More Image


// </button>



// </div>






// <div class="full">


// <button

// type="submit"

// class="save-btn">


// 💾 Save Product


// </button>


// </div>



// </div>


// </form>



// </div>





// <script>


// function addComposition(){


// let div=document.createElement("div");



// div.innerHTML = `

// <input

// type="text"

// name="composition[]"

// placeholder="Composition">

// `;



// document
// .getElementById("compositionBox")
// .appendChild(div);


// }







// function addImage(){


// let div=document.createElement("div");



// div.innerHTML = `

// <input

// type="file"

// name="images"

// accept="image/*">

// `;



// document
// .getElementById("imageBox")
// .appendChild(div);


// }



// </script>



// </body>

// </html>


// `;

// }



// module.exports = AddProduct;



// function AddProduct() {

// return `
// <!DOCTYPE html>
// <html>

// <head>

// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1">

// <title>Add Product</title>

// <style>

// *{
// margin:0;
// padding:0;
// box-sizing:border-box;
// font-family:Arial,sans-serif;
// }

// body{

// background:linear-gradient(135deg,#2563eb,#06b6d4);
// padding:20px;

// }


// .form{

// max-width:900px;
// margin:auto;
// background:white;
// padding:30px;
// border-radius:20px;

// }


// h2{

// text-align:center;
// color:#1d4ed8;
// margin-bottom:20px;

// }


// .grid{

// display:grid;
// grid-template-columns:repeat(2,1fr);
// gap:15px;

// }


// input,
// select,
// textarea{

// width:100%;
// padding:12px;
// border:1px solid #ddd;
// border-radius:10px;

// }


// textarea{

// height:120px;

// }


// .full{

// grid-column:1/-1;

// }


// button{

// width:100%;
// padding:14px;
// border:none;
// border-radius:10px;
// background:#2563eb;
// color:white;
// font-size:16px;
// font-weight:bold;
// margin-top:10px;
// cursor:pointer;

// }


// .add{

// background:#16a34a;

// }


// #imageBox input,
// #compositionBox input{

// margin-top:10px;

// }



// @media(max-width:700px){

// .grid{

// grid-template-columns:1fr;

// }

// }



// </style>

// </head>


// <body>


// <div class="form">


// <h2>
// ➕ Add Pharma Product
// </h2>


// <form

// action="/admin/add-product"

// method="POST"

// enctype="multipart/form-data">


// <div class="grid">


// <input
// name="name"
// placeholder="Product Name"
// required>


// <input
// name="brand"
// placeholder="Brand">


// <select name="category">

// <option>Tablet</option>
// <option>Capsule</option>
// <option>Syrup</option>
// <option>Drops</option>
// <option>Injection</option>
// <option>Cream</option>

// </select>


// <input
// name="manufacturer"
// placeholder="Manufacturer">


// <input
// type="number"
// name="mrp"
// placeholder="MRP">


// <input
// type="number"
// name="price"
// placeholder="Selling Price"
// required>


// <input
// type="number"
// name="stock"
// placeholder="Stock">


// <input
// name="packSize"
// placeholder="Pack Size">


// <input
// name="batchNo"
// placeholder="Batch No">


// <input
// type="date"
// name="mfgDate">


// <input
// type="date"
// name="expDate">



// <div class="full">


// <h3>
// 💊 Composition
// </h3>


// <div id="compositionBox">


// <input
// name="composition[]"
// placeholder="Composition">


// </div>


// <button
// type="button"
// class="add"
// onclick="addComposition()">

// + Add Composition

// </button>


// </div>





// <textarea
// class="full"
// name="uses"
// placeholder="Uses">
// </textarea>



// <textarea
// class="full"
// name="benefits"
// placeholder="Benefits">
// </textarea>



// <textarea
// class="full"
// name="dosage"
// placeholder="Dosage">
// </textarea>



// <textarea
// class="full"
// name="sideEffects"
// placeholder="Side Effects">
// </textarea>



// <textarea
// class="full"
// name="description"
// placeholder="Description">
// </textarea>






// <div class="full">


// <h3>
// 🖼 Product Images
// </h3>


// <div id="imageBox">


// <input
// type="file"
// name="images"
// accept="image/*">


// </div>


// <button
// type="button"
// class="add"
// onclick="addImage()">

// + Add More Image

// </button>


// </div>





// <div class="full">


// <button type="submit">

// 💾 Save Product

// </button>


// </div>



// </div>


// </form>


// </div>





// <script>


// function addComposition(){


// const box=document.getElementById("compositionBox");


// const input=document.createElement("input");


// input.type="text";

// input.name="composition[]";

// input.placeholder="Composition";


// box.appendChild(input);


// }





// function addImage(){


// const box=document.getElementById("imageBox");


// const input=document.createElement("input");


// input.type="file";

// input.name="images";

// input.accept="image/*";


// box.appendChild(input);


// }


// </script>



// </body>

// </html>

// `;

// }


// module.exports = AddProduct;

function AddProduct() {
return `

<style>
*{
    box-sizing:border-box;
}

.add-product-page{
    max-width:1100px;
    margin:20px auto;
    padding:20px;
    font-family:Segoe UI,sans-serif;
}

.product-form{
    background:#fff;
    padding:25px;
    border-radius:18px;
    box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.product-title{
    font-size:28px;
    font-weight:700;
    margin-bottom:25px;
    color:#1e3a8a;
}

.form-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:18px;
}

.form-group{
    display:flex;
    flex-direction:column;
    gap:7px;
}

.form-group.full{
    grid-column:1/-1;
}

.form-group label{
    font-weight:600;
    color:#374151;
}

.form-group input,
.form-group textarea,
.form-group select{
    width:100%;
    padding:12px 14px;
    border:1px solid #d1d5db;
    border-radius:10px;
    font-size:15px;
    outline:none;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus{
    border-color:#2563eb;
    box-shadow:0 0 0 3px rgba(37,99,235,.1);
}

textarea{
    min-height:100px;
    resize:vertical;
}

.section-title{
    margin-top:28px;
    margin-bottom:15px;
    padding-bottom:8px;
    border-bottom:2px solid #e5e7eb;
    color:#111827;
}

.composition-row{
    display:grid;
    grid-template-columns:1fr 1fr auto;
    gap:10px;
    margin-bottom:10px;
}

.composition-row button{
    border:none;
    background:#dc2626;
    color:white;
    border-radius:8px;
    padding:0 15px;
    cursor:pointer;
}

.add-btn{
    border:none;
    background:#2563eb;
    color:white;
    padding:11px 18px;
    border-radius:9px;
    cursor:pointer;
    font-weight:600;
}

.image-preview{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:10px;
}

.submit-btn{
    width:100%;
    margin-top:30px;
    padding:15px;
    border:none;
    border-radius:12px;
    background:linear-gradient(135deg,#2563eb,#1d4ed8);
    color:white;
    font-size:17px;
    font-weight:700;
    cursor:pointer;
}

@media(max-width:700px){
    .add-product-page{
        padding:10px;
    }

    .product-form{
        padding:16px;
    }

    .form-grid{
        grid-template-columns:1fr;
    }

    .form-group.full{
        grid-column:auto;
    }

    .composition-row{
        grid-template-columns:1fr;
    }

    .composition-row button{
        padding:10px;
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

<h1 class="product-title">💊 Add Product</h1>


<h3 class="section-title">Basic Product Information</h3>

<div class="form-grid">

    <div class="form-group">
        <label>Product Name *</label>
        <input
            type="text"
            name="name"
            placeholder="Enter product name"
            required
        >
    </div>

    <div class="form-group">
        <label>Brand</label>
        <input
            type="text"
            name="brand"
            placeholder="Enter brand"
        >
    </div>

    <div class="form-group">
        <label>Category</label>
        <input
            type="text"
            name="category"
            placeholder="e.g. Liver Tonic"
        >
    </div>

    <div class="form-group">
        <label>Manufacturer</label>
        <input
            type="text"
            name="manufacturer"
            placeholder="Enter manufacturer"
        >
    </div>

    <div class="form-group">
        <label>MRP ₹</label>
        <input
            type="number"
            name="mrp"
            min="0"
            placeholder="Enter MRP"
        >
    </div>

    <div class="form-group">
        <label>Selling Price ₹ *</label>
        <input
            type="number"
            name="price"
            min="0"
            placeholder="Enter selling price"
            required
        >
    </div>

    <div class="form-group">
        <label>Stock</label>
        <input
            type="number"
            name="stock"
            min="0"
            value="0"
        >
    </div>

    <div class="form-group">
        <label>Pack Size</label>
        <input
            type="text"
            name="packSize"
            placeholder="e.g. 200 ml"
        >
    </div>

    <div class="form-group">
        <label>Batch No.</label>
        <input
            type="text"
            name="batchNo"
            placeholder="Enter batch number"
        >
    </div>

    <div class="form-group">
        <label>MFG Date</label>
        <input
            type="date"
            name="mfgDate"
        >
    </div>

    <div class="form-group">
        <label>EXP Date</label>
        <input
            type="date"
            name="expDate"
        >
    </div>

</div>


<h3 class="section-title">💊 Composition</h3>

<div id="compositionContainer">

    <div class="composition-row">

        <input
            type="text"
            name="compositionName[]"
            placeholder="Composition name"
        >

        <input
            type="text"
            name="compositionStrength[]"
            placeholder="Strength e.g. 275 mg"
        >

        <button
            type="button"
            onclick="removeComposition(this)"
        >
            ✕
        </button>

    </div>

</div>

<button
    type="button"
    class="add-btn"
    onclick="addComposition()"
>
    ➕ Add Composition
</button>


<h3 class="section-title">🖼 Product Images</h3>

<div class="form-grid">

    <div class="form-group full">
        <label>Main Product Image</label>

        <input
            type="file"
            name="image"
            accept="image/*"
        >
    </div>

    <div class="form-group full">
        <label>More Images</label>

        <input
            type="file"
            name="images"
            accept="image/*"
            multiple
        >
    </div>

</div>


<h3 class="section-title">📝 Product Details</h3>

<div class="form-grid">

    <div class="form-group full">
        <label>Description</label>

        <textarea
            name="description"
            placeholder="Enter product description"
        ></textarea>
    </div>

    <div class="form-group full">
        <label>Uses</label>

        <textarea
            name="uses"
            placeholder="Enter uses"
        ></textarea>
    </div>

    <div class="form-group full">
        <label>Benefits</label>

        <textarea
            name="benefits"
            placeholder="Enter benefits"
        ></textarea>
    </div>

    <div class="form-group full">
        <label>Dosage</label>

        <textarea
            name="dosage"
            placeholder="Enter dosage"
        ></textarea>
    </div>

    <div class="form-group full">
        <label>Side Effects</label>

        <textarea
            name="sideEffects"
            placeholder="Enter side effects"
        ></textarea>
    </div>

    <div class="form-group full">
        <label>Storage</label>

        <textarea
            name="storage"
            placeholder="Enter storage instructions"
        ></textarea>
    </div>

</div>


<button
    type="submit"
    class="submit-btn"
>
    💾 Save Product
</button>

</form>

</div>


<script>

function addComposition(){

    const container =
        document.getElementById("compositionContainer");

    const row =
        document.createElement("div");

    row.className = "composition-row";

    row.innerHTML = \`
        <input
            type="text"
            name="compositionName[]"
            placeholder="Composition name"
        >

        <input
            type="text"
            name="compositionStrength[]"
            placeholder="Strength e.g. 275 mg"
        >

        <button
            type="button"
            onclick="removeComposition(this)"
        >
            ✕
        </button>
    \`;

    container.appendChild(row);
}


function removeComposition(button){

    const rows =
        document.querySelectorAll(".composition-row");

    if(rows.length > 1){
        button.parentElement.remove();
    }

}

</script>

`;
}

module.exports = AddProduct;