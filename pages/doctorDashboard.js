function DoctorDashboard(doctor, products = []) {

let cards = "";

products.forEach(product => {

cards += `

<div class="card">

    <div class="img-box">

        <span class="badge">
            NEW
        </span>

        <img src="${product.image || '/images/no-image.png'}"
        alt="${product.name}">

    </div>


    <div class="body">

        <h3>
            ${product.name}
        </h3>


        <div class="rating">
            ★★★★★
        </div>


        <p class="price">
            ₹ ${product.price}
        </p>


        <button onclick="viewProduct('${product._id}')">
    View Product
</button>


    </div>

</div>

`;

});


return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">


<title>
Doctor Dashboard
</title>


<style>


*{

margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;

}



body{

background:
linear-gradient(135deg,#eef2ff,#ffffff);

min-height:100vh;

overflow-x:hidden;

}



/* HEADER */


header{

background:
linear-gradient(90deg,#2563eb,#4f46e5);

padding:18px 35px;

display:flex;

justify-content:space-between;

align-items:center;

box-shadow:
0 8px 25px rgba(0,0,0,.18);

position:sticky;

top:0;

z-index:100;

}



.logo{

font-size:28px;

font-weight:700;

color:white;

}



nav{

display:flex;

gap:15px;

}



nav a{

color:white;

text-decoration:none;

font-weight:600;

padding:10px 18px;

border-radius:10px;

transition:.3s;

}



nav a:hover{

background:
rgba(255,255,255,.2);

}



/* WELCOME */


.welcome{

max-width:1400px;

margin:30px auto;

padding:25px;

display:flex;

justify-content:space-between;

align-items:center;


background:
rgba(255,255,255,.75);


backdrop-filter:
blur(15px);


border-radius:20px;


box-shadow:
0 15px 40px rgba(0,0,0,.08);

}



.welcome h2{

font-size:30px;

color:#222;

margin-bottom:8px;

}



.welcome p{

color:#666;

}



.count{

background:
linear-gradient(90deg,#2563eb,#4f46e5);

color:white;

padding:12px 20px;

border-radius:12px;

font-weight:bold;

}



/* SEARCH */


.search-box{

max-width:1400px;

margin:auto;

padding:0 20px 20px;

}



.search-box input{

width:100%;

padding:15px 20px;

border-radius:12px;

border:1px solid #ddd;

font-size:16px;

outline:none;

}



/* PRODUCT GRID */


.products{

max-width:1400px;

margin:auto;

padding:20px;


display:grid;

grid-template-columns:
repeat(auto-fit,minmax(250px,1fr));


gap:25px;

}



/* CARD */


.card{

background:white;

border-radius:20px;

overflow:hidden;


box-shadow:
0 8px 20px rgba(0,0,0,.08);


transition:.35s;

display:flex;

flex-direction:column;

}



.card:hover{

transform:
translateY(-10px);


box-shadow:
0 20px 40px rgba(37,99,235,.25);

}



/* IMAGE */


.img-box{

height:230px;

background:#f8f9ff;

display:flex;

justify-content:center;

align-items:center;

position:relative;

overflow:hidden;

}



.img-box img{

width:90%;

height:190px;

object-fit:contain;

transition:.4s;

}



.card:hover img{

transform:scale(1.1);

}



/* BADGE */


.badge{

position:absolute;

top:12px;

left:12px;


background:
linear-gradient(90deg,#ff512f,#dd2476);


color:white;


padding:6px 12px;


border-radius:50px;


font-size:12px;


font-weight:bold;

}



/* BODY */


.body{

padding:18px;

display:flex;

flex-direction:column;

flex:1;

}



.body h3{

font-size:18px;

color:#222;

margin-bottom:10px;

min-height:45px;

}



.rating{

color:#ffb400;

letter-spacing:2px;

margin-bottom:10px;

}



.price{

font-size:25px;

font-weight:bold;

color:#2563eb;

margin-bottom:15px;

}
/* BUTTON */

button{

margin-top:auto;

width:100%;

padding:13px;

border:none;

border-radius:12px;


background:
linear-gradient(90deg,#2563eb,#4f46e5);


color:white;

font-size:15px;

font-weight:600;

cursor:pointer;

transition:.3s;

}



button:hover{

transform:scale(1.03);


box-shadow:
0 10px 25px rgba(37,99,235,.35);

}



/* EMPTY MESSAGE */


.empty{

text-align:center;

width:100%;

padding:50px;

font-size:20px;

color:#777;

}



/* FOOTER */


footer{

text-align:center;

padding:25px;

color:#666;

font-size:14px;

}




/* TABLET */


@media(max-width:992px){


.products{

grid-template-columns:
repeat(3,1fr);

}


.img-box{

height:200px;

}


.img-box img{

height:160px;

}


}




/* MOBILE */


@media(max-width:768px){


header{

flex-direction:column;

gap:15px;

padding:15px;

}


.logo{

font-size:22px;

}


nav{

gap:8px;

}


nav a{

font-size:14px;

padding:8px 12px;

}



.welcome{

margin:15px;

padding:20px;

flex-direction:column;

gap:15px;

text-align:center;

}



.welcome h2{

font-size:22px;

}



.products{

grid-template-columns:
repeat(2,1fr);

gap:12px;

padding:12px;

}



.img-box{

height:160px;

}



.img-box img{

height:130px;

}



.body{

padding:12px;

}



.body h3{

font-size:15px;

min-height:38px;

}



.rating{

font-size:12px;

}



.price{

font-size:18px;

}



button{

padding:10px;

font-size:13px;

}



}





/* SMALL MOBILE */


@media(max-width:480px){


.products{

grid-template-columns:
repeat(2,1fr);

gap:10px;

}


.badge{

font-size:10px;

padding:5px 8px;

}


.logo{

font-size:20px;

}


}





</style>

</head>



<body>



<header>


<div class="logo">

🩺 Doctor Panel

</div>



<nav>


<a href="#">

Home

</a>



<a href="#">

Products

</a>



<a href="/admin/doctor/logout">

Logout

</a>



</nav>



</header>





<section class="welcome">



<div>


<h2>

Welcome Dr. ${doctor.name}

</h2>



<p>

Available Premium Healthcare Products

</p>



</div>




<div class="count">


${products.length} Products


</div>



</section>





<div class="search-box">


<input

type="text"

placeholder="Search Products...">


</div>





<div class="products">


${cards || `

<div class="empty">

No Products Available

</div>

`}


</div>





<footer>


© 2026 Doctor Panel | Premium Healthcare


</footer>





</body>


</html>


`;

}



module.exports = DoctorDashboard;