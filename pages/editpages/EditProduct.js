function EditProduct(product) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Edit Product</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#f5f7fb;
padding:40px;
}

.container{
max-width:700px;
margin:auto;
background:#fff;
padding:30px;
border-radius:15px;
box-shadow:0 10px 25px rgba(0,0,0,.12);
}

h2{
text-align:center;
margin-bottom:25px;
color:#0d6efd;
}

.form-group{
margin-bottom:18px;
}

label{
display:block;
margin-bottom:6px;
font-weight:bold;
}

input,
textarea{
width:100%;
padding:12px;
border:1px solid #ddd;
border-radius:8px;
font-size:15px;
}

textarea{
height:120px;
resize:none;
}

.preview{
width:150px;
height:150px;
border-radius:10px;
object-fit:cover;
border:2px solid #ddd;
display:block;
margin:15px auto;
}

button{
width:100%;
padding:14px;
border:none;
border-radius:8px;
background:#0d6efd;
color:#fff;
font-size:16px;
cursor:pointer;
}

button:hover{
background:#0b5ed7;
}

.back{
display:block;
text-align:center;
margin-top:20px;
text-decoration:none;
color:#0d6efd;
font-weight:bold;
}

</style>

</head>

<body>

<div class="container">

<h2>✏️ Edit Product</h2>

<form
action="/admin/edit-product/${product._id}"
method="POST"
enctype="multipart/form-data">

<div class="form-group">

<label>Product Name</label>

<input
type="text"
name="name"
value="${product.name}"
required>

</div>

<div class="form-group">

<label>Price</label>

<input
type="number"
name="price"
value="${product.price}"
required>

</div>

<div class="form-group">

<label>Description</label>

<textarea
name="description">${product.description || ""}</textarea>

</div>

<img
src="${product.image}"
class="preview"
alt="${product.name}">

<div class="form-group">

<label>Change Image</label>

<input
type="file"
name="image"
accept="image/*">

</div>

<button type="submit">

💾 Update Product

</button>

</form>

<a
href="/admin/manage-products"
class="back">

⬅ Back

</a>

</div>

</body>

</html>
`;
}

module.exports = EditProduct;