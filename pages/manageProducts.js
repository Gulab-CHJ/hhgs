// function ManageProducts(products = []) {

// let rows = "";

// products.forEach((product, index) => {

// rows += `
// <tr>
//     <td>${index + 1}</td>
//     <td><img src="${product.image}" width="60"></td>
//     <td>${product.name}</td>
//     <td>₹ ${product.price}</td>
// </tr>
// `;

// });

// return `
// <!DOCTYPE html>
// <html>
// <head>
// <title>Manage Products</title>
// </head>
// <body>

// <h2>Manage Products</h2>

// <a href="/admin/add-product">Add Product</a>

// <table border="1" cellpadding="10">
// <tr>
// <th>#</th>
// <th>Image</th>
// <th>Name</th>
// <th>Price</th>
// </tr>

// ${rows}

// </table>

// </body>
// </html>
// `;
// }

// module.exports = ManageProducts;

function ManageProducts(products = []) {

let rows = "";

products.forEach((product, index) => {

rows += `

<tr>

<td>${index + 1}</td>


<td>
<img 
src="${product.image}" 
class="product-img">
</td>


<td>
<strong>${product.name}</strong>
</td>


<td>
₹ ${product.price}
</td>



<td>

<a 
href="/admin/edit-product/${product._id}"
class="edit-btn">
✏️ Edit
</a>



<a 
href="/admin/delete-product/${product._id}"
class="delete-btn"
onclick="return confirm('Delete this product?')">
🗑 Delete
</a>


</td>


</tr>

`;

});


return `

<!DOCTYPE html>

<html>

<head>

<title>Manage Products</title>


<meta name="viewport" content="width=device-width, initial-scale=1.0">


<style>


*{

box-sizing:border-box;
font-family:Arial,sans-serif;

}



body{

background:#f1f5f9;

padding:20px;

}



.container{

max-width:1100px;

margin:auto;

background:white;

padding:25px;

border-radius:15px;

box-shadow:0 10px 25px rgba(0,0,0,.08);

}



.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:25px;

}



h2{

color:#1e3a8a;

}



.add-btn{

background:#2563eb;

color:white;

padding:12px 20px;

border-radius:8px;

text-decoration:none;

font-weight:bold;

}



table{

width:100%;

border-collapse:collapse;

}



th{

background:#1e3a8a;

color:white;

padding:14px;

}



td{

padding:12px;

border-bottom:1px solid #ddd;

text-align:center;

}



tr:hover{

background:#f8fafc;

}



.product-img{

width:70px;

height:70px;

object-fit:cover;

border-radius:10px;

border:1px solid #ddd;

}



.edit-btn,
.delete-btn{

padding:8px 12px;

border-radius:6px;

color:white;

text-decoration:none;

font-size:14px;

margin:3px;

display:inline-block;

}



.edit-btn{

background:#16a34a;

}



.delete-btn{

background:#dc2626;

}




@media(max-width:700px){


body{

padding:10px;

}


.container{

padding:15px;

overflow-x:auto;

}


table{

min-width:700px;

}



.header{

flex-direction:column;

gap:15px;

align-items:flex-start;

}


}



</style>


</head>


<body>



<div class="container">


<div class="header">


<h2>
📦 Manage Products
</h2>


<a 
href="/admin/add-product"
class="add-btn">

➕ Add Product

</a>


</div>



<table>


<tr>

<th>#</th>

<th>Image</th>

<th>Name</th>

<th>Price</th>

<th>Action</th>

</tr>


${rows}


</table>


</div>



</body>

</html>


`;

}


module.exports = ManageProducts;