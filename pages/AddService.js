function AddService() {

return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>Add Service</title>

<link rel="stylesheet" href="/css/admin.css">

<style>

.container{
max-width:600px;
margin:40px auto;
background:#fff;
padding:20px;
border-radius:10px;
box-shadow:0 0 10px #ddd;
}

input,textarea{
width:100%;
padding:12px;
margin:10px 0;
font-size:16px;
}

button{
width:100%;
padding:12px;
background:#007bff;
color:#fff;
border:none;
cursor:pointer;
font-size:18px;
}

</style>

</head>

<body>

<div class="container">

<h2>Add New Service</h2>

<form action="/admin/add-service" method="POST">

<input
type="text"
name="title"
placeholder="Service Name"
required
>

<textarea
name="description"
placeholder="Description"
required
></textarea>

<input
type="text"
name="image"
placeholder="Image URL"
>

<button>Add Service</button>

</form>

</div>

</body>

</html>
`;

}

module.exports = AddService;