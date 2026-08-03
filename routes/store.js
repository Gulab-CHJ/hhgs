const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// ================= STORE PAGE =================


router.get("/", async(req,res)=>{

try{


const products = await Product.find()
.sort({createdAt:-1});



let cards = products.map(product=>`

<div class="card"
onclick="location.href='/store/product/${product._id}'">



<div class="product-img">


<img src="${product.image || 'https://via.placeholder.com/300'}">


</div>




<h2>

${product.name}

</h2>




<p>

${product.description || "Quality Product"}

</p>



<button onclick="event.stopPropagation(); location.href='/store/product/${product._id}'">
        View Details
    </button>



</div>



`).join("");





res.send(`


<!DOCTYPE html>

<html>


<head>


<meta name="viewport" content="width=device-width,initial-scale=1">


<title>Premium Store</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',Arial,sans-serif;
}

body{
    background:linear-gradient(135deg,#eff6ff,#f8fafc);
    padding:20px;
}

/* ================= HEADER ================= */

.header{
    text-align:center;
    margin-bottom:35px;
}

.header h1{
    font-size:38px;
    font-weight:800;
    color:#1e3a8a;
}

.header p{
    margin-top:8px;
    color:#64748b;
}

/* ================= PRODUCT GRID ================= */

.products{
    max-width:1200px;
    margin:auto;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
    justify-items:center;
}

/* ================= PVC CARD ================= */

.card{
    width:220px;
    height:340px;
    background:#fff;
    border-radius:18px;
    overflow:hidden;
    cursor:pointer;
    display:flex;
    flex-direction:column;
    box-shadow:0 10px 25px rgba(0,0,0,.12);
    transition:all .3s ease;
}

.card:hover{
    transform:translateY(-8px);
    box-shadow:0 20px 40px rgba(37,99,235,.25);
}

/* ================= IMAGE ================= */

.product-img{
    width:100%;
    height:180px;
    background:#f8fafc;
    display:flex;
    justify-content:center;
    align-items:center;
}

.product-img img{
    width:100%;
    height:100%;
    object-fit:contain;
    padding:12px;
}

/* ================= TEXT ================= */

.card h2{
    font-size:18px;
    color:#1e40af;
    text-align:center;
    padding:12px 10px 0;
}

.card p{
    flex:1;
    padding:8px 12px;
    font-size:13px;
    color:#64748b;
    text-align:center;
    line-height:1.4;
    overflow:hidden;
}

/* ================= BUTTON ================= */

.card button{
    margin:12px;
    padding:11px;
    border:none;
    border-radius:10px;
    background:linear-gradient(135deg,#2563eb,#06b6d4);
    color:#fff;
    font-size:14px;
    font-weight:700;
    cursor:pointer;
    transition:.3s;
}

.card button:hover{
    background:linear-gradient(135deg,#1d4ed8,#0891b2);
}

/* ================= MOBILE ================= */

@media(max-width:600px){

    body{
        padding:10px;
    }

    .header h1{
        font-size:28px;
    }

    .products{
        grid-template-columns:repeat(2,1fr);
        gap:10px;
    }

    .card{
        width:165px;
        height:280px;
        border-radius:15px;
    }

    .product-img{
        height:120px;
    }

    .card h2{
        font-size:15px;
        padding-top:10px;
    }

    .card p{
        font-size:11px;
        padding:6px 8px;
    }

    .card button{
        margin:8px;
        padding:8px;
        font-size:11px;
        border-radius:8px;
    }
}





</style>


</head>



<body>




<div class="header">


<h1>

Our Premium Products

</h1>


<p>

Trusted Quality Products

</p>


</div>






<div class="products">


${cards}


</div>





</body>


</html>



`);



}

catch(err){

console.log(err);

res.status(500).send("Server Error");


}



});

router.get("/product/:id", async (req,res)=>{

try{


const product = await Product.findById(req.params.id);


if(!product){

return res.status(404).send("Product Not Found");

}



let images = "";


if(product.images && product.images.length > 0){


product.images.forEach(img=>{


images += `

<img

src="${img}"

class="thumb"

onclick="changeImage('${img}')">

`;

});


}else{


images = `

<img

src="${product.image || '/images/no-image.png'}"

class="thumb"

onclick="changeImage('${product.image}')">

`;

}






res.send(`


<!DOCTYPE html>

<html>


<head>


<meta charset="UTF-8">


<meta name="viewport"
content="width=device-width,initial-scale=1">


<title>

${product.name}

</title>



<style>


*{

margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',Arial,sans-serif;

}


body{

background:
linear-gradient(
135deg,
#ecfdf5,
#eff6ff
);

min-height:100vh;

padding:25px;

}



/* MAIN CONTAINER */


.container{

max-width:1250px;

margin:auto;

background:
rgba(255,255,255,.9);

backdrop-filter:blur(15px);

border-radius:35px;

padding:40px;

display:grid;

grid-template-columns:1fr 1fr;

gap:50px;

box-shadow:

0 25px 70px rgba(0,0,0,.15);

animation:show .6s ease;


}


@keyframes show{

from{

opacity:0;

transform:translateY(40px);

}

to{

opacity:1;

transform:translateY(0);

}

}




/* IMAGE SECTION */


.gallery{

background:

linear-gradient(
135deg,
#f8fafc,
#ecfeff
);

border-radius:30px;

padding:35px;

text-align:center;

}




.main-img{

width:100%;

height:520px;

object-fit:contain;

transition:.5s;

cursor:zoom-in;


}


.main-img:hover{

transform:scale(1.08);

}






/* SMALL IMAGES */


.thumbs{

display:flex;

gap:20px;

margin-top:30px;

overflow-x:auto;

padding:10px;


}



.thumb{

width:150px;

height:150px;

object-fit:contain;

background:white;

border-radius:20px;

border:

2px solid #e2e8f0;

padding:12px;

cursor:pointer;

transition:.3s;

box-shadow:

0 8px 20px rgba(0,0,0,.08);


}



.thumb:hover{

transform:translateY(-8px) scale(1.05);

border-color:#2563eb;

}






/* DETAILS */


.details{

padding:10px;

}



.details h1{

font-size:42px;

font-weight:900;

color:#064e3b;

margin-bottom:15px;

}



.brand{

font-size:18px;

color:#64748b;

margin:8px 0;

}




.price{

font-size:42px;

font-weight:900;

color:#16a34a;

margin:25px 0;

}



.mrp{

font-size:22px;

color:#94a3b8;

text-decoration:line-through;

margin-left:15px;

}




.stock{

display:inline-block;

background:#dcfce7;

color:#15803d;

font-weight:700;

padding:12px 20px;

border-radius:50px;

}







/* INFORMATION BOX */


.info{

background:#f8fafc;

padding:25px;

border-radius:20px;

margin-top:25px;

box-shadow:

0 10px 30px rgba(0,0,0,.05);


}



.info p{

padding:10px 0;

border-bottom:

1px solid #e5e7eb;

font-size:16px;

}







/* SECTIONS */


.section{

margin-top:25px;

background:

linear-gradient(
135deg,
#ffffff,
#f8fafc
);

padding:25px;

border-radius:22px;

box-shadow:

0 10px 25px rgba(0,0,0,.06);


}




.section h2{

font-size:24px;

color:#2563eb;

margin-bottom:15px;

}




.section p{

font-size:16px;

line-height:1.9;

color:#334155;

}



.line{

display:block;

padding:8px 0;

}



.line::before{

content:"✓ ";

color:#16a34a;

font-weight:bold;

}







/* ORDER BUTTON */


.buy{


display:block;

margin-top:35px;

padding:18px;

text-align:center;

border-radius:20px;

background:

linear-gradient(
135deg,
#16a34a,
#22c55e
);


color:white;

text-decoration:none;

font-size:20px;

font-weight:800;

box-shadow:

0 15px 35px rgba(22,163,74,.35);

transition:.3s;


}



.buy:hover{

transform:

translateY(-6px);

}








/* MOBILE */


@media(max-width:900px){


body{

padding:10px;

}



.container{

grid-template-columns:1fr;

padding:20px;

gap:25px;

border-radius:25px;

}



.main-img{

height:350px;

}



.thumb{

width:100px;

height:100px;

}



.details h1{

font-size:30px;

}



.price{

font-size:32px;

}



.section{

padding:18px;

}



}



@media(max-width:500px){



.main-img{

height:280px;

}



.thumb{

width:85px;

height:85px;

}



.details h1{

font-size:26px;

}


.buy{

font-size:17px;

}



}

.back{

display:block;

margin-top:15px;

padding:16px;

text-align:center;

border-radius:18px;

background:#e2e8f0;

color:#1e293b;

text-decoration:none;

font-size:18px;

font-weight:700;

transition:.3s;

}



.back:hover{

background:#cbd5e1;

transform:translateY(-4px);

}

.login-price{

font-size:22px;

font-weight:800;

color:#2563eb;

background:#eff6ff;

padding:15px;

border-radius:15px;

margin:25px 0;

text-align:center;

}

.login-price{

display:block;

font-size:22px;

font-weight:800;

color:#2563eb;

background:#eff6ff;

padding:18px;

border-radius:15px;

margin:25px 0;

text-align:center;

text-decoration:none;

cursor:pointer;

transition:.3s;

border:2px solid #bfdbfe;

}


.login-price:hover{

background:#2563eb;

color:white;

transform:translateY(-3px);

box-shadow:
0 10px 25px rgba(37,99,235,.25);

}



</style>


</head>




<body>



<div class="container">



<div class="gallery">


<img

id="mainImage"

class="main-img"

src="${product.image || '/images/no-image.png'}">



<div class="thumbs">


${images}


</div>



</div>







<div class="details">



<h1>

${product.name}

</h1>




<p class="brand">

🏷 Brand:

${product.brand || "N/A"}

</p>



<p class="brand">

🏭 Manufacturer:

${product.manufacturer || "N/A"}

</p>






<a 
class="login-price"
href="/admin/doctor-login?product=${product._id}">
🔒 Login to view price
</a>





<span class="stock">

✔ Available Stock:
${product.stock || 0}

</span>







<div class="info">


<p>

<b>Category:</b>

${product.category || ""}

</p>



<p>

<b>Pack Size:</b>

${product.packSize || ""}

</p>



<p>

<b>Batch:</b>

${product.batchNo || ""}

</p>



</div>








<div class="section">


<h2>
💊 Composition
</h2>



<p>


${
product.composition

?

product.composition
.map(item=>`

<span class="line">
✔ ${item}
</span>

`).join("")

:

""

}


</p>



</div>








<div class="section">


<h2>
Uses (उपयोग)
</h2>



<p>


${
product.uses

?

product.uses
.split(",")
.map(item=>`

<span class="line">
✔ ${item.trim()}
</span>

`).join("")

:

""

}



</p>


</div>









<div class="section">


<h2>
Benefits (फ़ायदे)
</h2>



<p>


${
product.benefits

?

product.benefits

.split("Phase")

.filter(Boolean)

.map(item=>`

<span class="line">

✔ Phase ${item}

</span>

`).join("")

:

""

}



</p>



</div>









<div class="section">


<h2>
Description
</h2>


<p>

${product.description || ""}

</p>


</div>








<a
class="buy"
href="/admin/doctor-login?product=${product._id}">
🛒 Order Now
</a>





</div>



</div>


<a

class="back"

href="/store">


⬅ Back To Products


</a>




<script>


function changeImage(src){


document

.getElementById("mainImage")

.src=src;


}


</script>




</body>

</html>



`);



}catch(err){


console.log(err);

res.status(500).send("Server Error");


}


});



module.exports = router;