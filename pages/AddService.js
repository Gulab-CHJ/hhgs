function AddService() {

return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Add Service</title>

<link rel="stylesheet" href="/css/admin.css">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#f4f6f9;
display:flex;
justify-content:center;
align-items:center;
min-height:100vh;
}

.container{
width:100%;
max-width:600px;
background:#fff;
padding:30px;
border-radius:12px;
box-shadow:0 5px 20px rgba(0,0,0,.15);
}

h2{
text-align:center;
margin-bottom:25px;
color:#333;
}

input,
textarea{
width:100%;
padding:12px;
margin-bottom:15px;
border:1px solid #ccc;
border-radius:8px;
font-size:16px;
outline:none;
}

textarea{
height:120px;
resize:none;
}

input[type="file"]{
padding:10px;
}

button{
width:100%;
padding:14px;
border:none;
border-radius:8px;
background:#007bff;
color:#fff;
font-size:18px;
cursor:pointer;
transition:.3s;
}

button:hover{
background:#0056b3;
}

.preview{
margin-top:20px;
text-align:center;
}

.preview img{
width:220px;
display:none;
border-radius:10px;
border:2px solid #ddd;
padding:5px;
}

.back{
display:block;
text-align:center;
margin-top:20px;
text-decoration:none;
font-size:17px;
color:#007bff;
}

.back:hover{
text-decoration:underline;
}

</style>

</head>

<body>

<div class="container">

<h2>➕ Add New Service</h2>

<form
action="/admin/add-service"
method="POST"
enctype="multipart/form-data"
>

<input
type="text"
name="title"
placeholder="Service Name"
required
>

<textarea
name="description"
placeholder="Service Description"
required
></textarea>

<input
type="file"
name="image"
id="image"
accept="image/*"
required
>

<div class="preview">

<img id="preview">

</div>

<button type="submit">
Add Service
</button>

</form>

<a class="back" href="/admin">
← Back to Dashboard
</a>

</div>

<script>

const image=document.getElementById("image");

const preview=document.getElementById("preview");

image.onchange=function(){

const file=this.files[0];

if(file){

preview.src=URL.createObjectURL(file);

preview.style.display="block";

}

}

</script>

</body>

</html>
`;

}

module.exports = AddService;