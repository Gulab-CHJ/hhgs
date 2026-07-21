function DoctorDashboard(doctor, products = []) {

let cards = "";

products.forEach(product => {

cards += `
<div class="card">

    <div class="img-box">
        <span class="badge">New</span>
        <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="body">
        <h3>${product.name}</h3>

        <p class="price">₹ ${product.price}</p>

        <button>View Product</button>
    </div>

</div>
`;

});

return `

<!DOCTYPE html>
<html lang="en">

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
background:#f1f3f6;
overflow-x:hidden;
}

/* Header */

header{
background:#2874f0;
color:#fff;
padding:15px 20px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
box-shadow:0 2px 8px rgba(0,0,0,.15);
}

header h2{
font-size:24px;
}

header nav{
display:flex;
gap:15px;
}

header a{
color:#fff;
text-decoration:none;
font-weight:bold;
}

/* Welcome */

.welcome{
max-width:1400px;
margin:20px auto;
padding:20px;
background:#fff;
border-radius:12px;
box-shadow:0 2px 10px rgba(0,0,0,.08);
}

.welcome h2{
margin-bottom:8px;
color:#333;
}

.welcome p{
color:#666;
}

/* Products */

.products{
max-width:1400px;
margin:auto;
padding:20px;
display:grid;
grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
gap:20px;
}

/* Card */

.card{
background:#fff;
border-radius:15px;
overflow:hidden;
box-shadow:0 4px 12px rgba(0,0,0,.08);
transition:.3s;
display:flex;
flex-direction:column;
cursor:pointer;
}

.card:hover{
transform:translateY(-8px);
box-shadow:0 12px 25px rgba(0,0,0,.18);
}

/* Image */

.img-box{
position:relative;
background:#fafafa;
overflow:hidden;
}

.img-box img{
width:100%;
height:220px;
object-fit:contain;
padding:20px;
transition:.4s;
}

.card:hover img{
transform:scale(1.08);
}

/* Badge */

.badge{
position:absolute;
top:10px;
left:10px;
background:#00b517;
color:#fff;
padding:5px 10px;
border-radius:20px;
font-size:12px;
font-weight:bold;
}

/* Body */

.body{
padding:15px;
display:flex;
flex-direction:column;
flex:1;
}

.body h3{
font-size:18px;
color:#222;
margin-bottom:10px;
height:45px;
overflow:hidden;
}

.price{
font-size:22px;
font-weight:bold;
color:#2874f0;
margin-bottom:15px;
}

button{
margin-top:auto;
width:100%;
padding:12px;
border:none;
border-radius:8px;
background:#2874f0;
color:#fff;
font-size:15px;
cursor:pointer;
transition:.3s;
}

button:hover{
background:#0d6efd;
}

/* Tablet */

@media(max-width:992px){

.products{
grid-template-columns:repeat(3,1fr);
}

.img-box img{
height:190px;
}

}

/* Mobile */

@media(max-width:768px){

header{
flex-direction:column;
text-align:center;
gap:10px;
}

.products{
grid-template-columns:repeat(2,1fr);
gap:12px;
padding:12px;
}

.img-box img{
height:160px;
padding:12px;
}

.body{
padding:10px;
}

.body h3{
font-size:15px;
height:38px;
}

.price{
font-size:18px;
}

button{
padding:10px;
font-size:14px;
}

}

/* Small Mobile */

@media(max-width:480px){

.products{
grid-template-columns:repeat(2,1fr);
gap:10px;
}

.img-box img{
height:140px;
}

.body h3{
font-size:14px;
}

.price{
font-size:17px;
}

button{
font-size:13px;
padding:9px;
}

.badge{
font-size:10px;
padding:4px 8px;
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