function ManageProducts(products = []) {

let rows = "";

products.forEach((product, index) => {

rows += `
<tr>
    <td>${index + 1}</td>
    <td><img src="${product.image}" width="60"></td>
    <td>${product.name}</td>
    <td>₹ ${product.price}</td>
</tr>
`;

});

return `
<!DOCTYPE html>
<html>
<head>
<title>Manage Products</title>
</head>
<body>

<h2>Manage Products</h2>

<a href="/admin/add-product">Add Product</a>

<table border="1" cellpadding="10">
<tr>
<th>#</th>
<th>Image</th>
<th>Name</th>
<th>Price</th>
</tr>

${rows}

</table>

</body>
</html>
`;
}

module.exports = ManageProducts;