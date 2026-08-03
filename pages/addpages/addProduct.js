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



function AddProduct() {

return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Add Product</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{

background:linear-gradient(135deg,#2563eb,#06b6d4);
padding:20px;

}


.form{

max-width:900px;
margin:auto;
background:white;
padding:30px;
border-radius:20px;

}


h2{

text-align:center;
color:#1d4ed8;
margin-bottom:20px;

}


.grid{

display:grid;
grid-template-columns:repeat(2,1fr);
gap:15px;

}


input,
select,
textarea{

width:100%;
padding:12px;
border:1px solid #ddd;
border-radius:10px;

}


textarea{

height:120px;

}


.full{

grid-column:1/-1;

}


button{

width:100%;
padding:14px;
border:none;
border-radius:10px;
background:#2563eb;
color:white;
font-size:16px;
font-weight:bold;
margin-top:10px;
cursor:pointer;

}


.add{

background:#16a34a;

}


#imageBox input,
#compositionBox input{

margin-top:10px;

}



@media(max-width:700px){

.grid{

grid-template-columns:1fr;

}

}



</style>

</head>


<body>


<div class="form">


<h2>
➕ Add Pharma Product
</h2>


<form

action="/admin/add-product"

method="POST"

enctype="multipart/form-data">


<div class="grid">


<input
name="name"
placeholder="Product Name"
required>


<input
name="brand"
placeholder="Brand">


<select name="category">

<option>Tablet</option>
<option>Capsule</option>
<option>Syrup</option>
<option>Drops</option>
<option>Injection</option>
<option>Cream</option>

</select>


<input
name="manufacturer"
placeholder="Manufacturer">


<input
type="number"
name="mrp"
placeholder="MRP">


<input
type="number"
name="price"
placeholder="Selling Price"
required>


<input
type="number"
name="stock"
placeholder="Stock">


<input
name="packSize"
placeholder="Pack Size">


<input
name="batchNo"
placeholder="Batch No">


<input
type="date"
name="mfgDate">


<input
type="date"
name="expDate">



<div class="full">


<h3>
💊 Composition
</h3>


<div id="compositionBox">


<input
name="composition[]"
placeholder="Composition">


</div>


<button
type="button"
class="add"
onclick="addComposition()">

+ Add Composition

</button>


</div>





<textarea
class="full"
name="uses"
placeholder="Uses">
</textarea>



<textarea
class="full"
name="benefits"
placeholder="Benefits">
</textarea>



<textarea
class="full"
name="dosage"
placeholder="Dosage">
</textarea>



<textarea
class="full"
name="sideEffects"
placeholder="Side Effects">
</textarea>



<textarea
class="full"
name="description"
placeholder="Description">
</textarea>






<div class="full">


<h3>
🖼 Product Images
</h3>


<div id="imageBox">


<input
type="file"
name="images"
accept="image/*">


</div>


<button
type="button"
class="add"
onclick="addImage()">

+ Add More Image

</button>


</div>





<div class="full">


<button type="submit">

💾 Save Product

</button>


</div>



</div>


</form>


</div>





<script>


function addComposition(){


const box=document.getElementById("compositionBox");


const input=document.createElement("input");


input.type="text";

input.name="composition[]";

input.placeholder="Composition";


box.appendChild(input);


}





function addImage(){


const box=document.getElementById("imageBox");


const input=document.createElement("input");


input.type="file";

input.name="images";

input.accept="image/*";


box.appendChild(input);


}


</script>



</body>

</html>

`;

}


module.exports = AddProduct;