function AddGovernment(){

return `

<!DOCTYPE html>
<html>
<head>

<title>Add Government Person</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>

body{
font-family:Arial;
background:#f5f7fb;
padding:30px;
}

.card{

max-width:500px;
margin:auto;
background:white;
padding:25px;
border-radius:15px;
box-shadow:0 10px 25px #ddd;

}

input,textarea{

width:100%;
padding:12px;
margin:10px 0;
border:1px solid #ddd;
border-radius:8px;

}


button{

width:100%;
padding:12px;
background:#2563eb;
color:white;
border:none;
border-radius:8px;
font-size:16px;
cursor:pointer;

}

button:hover{

background:#1d4ed8;

}

</style>


</head>


<body>


<div class="card">

<h2>Add Government Person</h2>


<form 
action="/admin/add-government"
method="POST"
enctype="multipart/form-data">


<input 
type="text"
name="name"
placeholder="Name"
required>


<input 
type="text"
name="position"
placeholder="Position">


<input 
type="text"
name="department"
placeholder="Department">


<input 
type="text"
name="phone"
placeholder="Phone">


<input 
type="text"
name="address"
placeholder="Address">


<textarea
name="description"
placeholder="Description">
</textarea>


<input 
type="file"
name="image">


<button>
Save Government Person
</button>


</form>


</div>


</body>

</html>

`;

}


module.exports = AddGovernment;