function DoctorDashboard(doctor, products = []) {

let cards = "";

products.forEach(product => {

cards += `
<div class="card">
    <img src="${product.image}" alt="${product.name}">
    <div class="body">
        <h3>${product.name}</h3>
        <p>₹ ${product.price}</p>
        <button>View</button>
    </div>
</div>
`;

});

return `

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Doctor Dashboard</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#f5f5f5;
overflow-x:hidden;
}

header{
background:#0d6efd;
color:#fff;
padding:15px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
}

header a{
color:#fff;
text-decoration:none;
margin-left:15px;
}

.welcome{
background:#fff;
margin:15px;
padding:15px;
border-radius:10px;
box-shadow:0 2px 8px rgba(0,0,0,.1);
}

.products{

display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:15px;
padding:15px;

}

.card{

background:#fff;
border-radius:10px;
overflow:hidden;
box-shadow:0 2px 8px rgba(0,0,0,.1);

}

.card img{

width:100%;
height:180px;
object-fit:cover;

}

.body{

padding:15px;

}

.body h3{

margin-bottom:10px;

}

.body p{

margin-bottom:10px;
color:#0d6efd;
font-weight:bold;

}

button{

width:100%;
padding:10px;
border:none;
background:#0d6efd;
color:white;
border-radius:5px;
cursor:pointer;

}

button:hover{

background:#0b5ed7;

}

@media(max-width:768px){

header{
flex-direction:column;
gap:10px;
text-align:center;
}

header nav{
display:flex;
gap:15px;
}

}

</style>

</head>

<body>

<header>

<h2>Doctor Panel</h2>

<nav>
<a href="#">Home</a>
<a href="/admin/doctor/logout">Logout</a>
</nav>

</header>

<div class="welcome">

<h2>Welcome Dr. ${doctor.name}</h2>

<p>Available Products</p>

</div>

<div class="products">

${cards || "<p>No Products Available</p>"}

</div>

</body>

</html>

`;

}

module.exports = DoctorDashboard;