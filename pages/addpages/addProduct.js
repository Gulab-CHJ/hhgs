function AddProduct() {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Add Product</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        body{
            font-family:Arial,sans-serif;
            background:#f5f5f5;
            margin:0;
            padding:20px;
        }

        .form{
            max-width:500px;
            margin:auto;
            background:#fff;
            padding:20px;
            border-radius:10px;
            box-shadow:0 2px 10px rgba(0,0,0,.1);
        }

        input,textarea{
            width:100%;
            padding:10px;
            margin:10px 0;
            box-sizing:border-box;
        }

        button{
            width:100%;
            padding:12px;
            background:#0d6efd;
            color:#fff;
            border:none;
            border-radius:5px;
            cursor:pointer;
        }
    </style>
</head>

<body>

<div class="form">

<h2>Add Product</h2>

<form action="/admin/add-product" method="POST" enctype="multipart/form-data">

<input
type="text"
name="name"
placeholder="Product Name"
required>

<input
type="number"
name="price"
placeholder="Price"
required>

<textarea
name="description"
placeholder="Description"></textarea>

<input
type="file"
name="image"
accept="image/*"
required>

<button type="submit">
Add Product
</button>

</form>

</div>

</body>
</html>
`;
}

module.exports = AddProduct;