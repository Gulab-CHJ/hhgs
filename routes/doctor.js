const path = require("path");
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const DoctorOrder = require("../models/DoctorOrder");

const PDFDocument = require("pdfkit");



// =================================
// DOCTOR DASHBOARD
// =================================

// =================================
// DOCTOR ORDERS
// =================================

router.get("/orders", async(req,res)=>{

try{


const orders = await DoctorOrder.find()
.sort({
createdAt:-1
});


// ⬇️ यहां पुराना res.send हटाएं
// और नया premium res.send लगाएं


res.send(`

<!DOCTYPE html>
<html>

<head>

<title>
My Orders | GLOBAL SERVICE
</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',Arial,sans-serif;
}


body{

    background:
    linear-gradient(135deg,#eef7ff,#f8fafc);

    padding:30px;

    color:#1e293b;

}


/* HEADER */

.header{

    background:
    linear-gradient(135deg,#005bea,#00c6fb);

    padding:25px;

    border-radius:25px;

    color:white;

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:30px;

    box-shadow:
    0 15px 40px rgba(0,0,0,.15);

}


.header h1{

    font-size:32px;

}


.header a{

    background:white;

    color:#2563eb;

    padding:12px 22px;

    border-radius:30px;

    text-decoration:none;

    font-weight:700;

}



/* ORDER CARD */


.order-card{

    background:white;

    padding:25px;

    border-radius:25px;

    margin-bottom:25px;

    box-shadow:

    0 15px 35px rgba(0,0,0,.08);

    border:1px solid #e5e7eb;

    transition:.3s;

}


.order-card:hover{

    transform:translateY(-6px);

    box-shadow:

    0 20px 45px rgba(0,0,0,.15);

}



/* ORDER ID */


.order-id{

    color:#2563eb;

    font-size:18px;

    font-weight:800;

    margin-bottom:10px;

}



.order-card p{

    color:#64748b;

    margin:10px 0;

}



/* STATUS */


.status{

    display:inline-block;

    background:#fef3c7;

    color:#92400e;

    padding:8px 18px;

    border-radius:30px;

    font-weight:700;

}



/* PRODUCTS */


.product-box{

    margin-top:20px;

}



.product{

    background:#f8fafc;

    padding:15px;

    border-radius:15px;

    margin:10px 0;

    border:1px solid #e2e8f0;

}


.product b{

    font-size:18px;

    color:#0f172a;

}



.product small{

    color:#64748b;

}



/* TOTAL */


.total{

    margin-top:20px;

    background:

    linear-gradient(135deg,#16a34a,#22c55e);

    color:white;

    padding:18px;

    border-radius:18px;

    text-align:right;

    font-size:25px;

    font-weight:800;

}



/* BUTTON */


.btn{

    display:inline-block;

    margin-top:20px;

    background:

    linear-gradient(135deg,#2563eb,#4f46e5);

    color:white;

    padding:14px 25px;

    border-radius:15px;

    text-decoration:none;

    font-weight:700;

}


.btn:hover{

    opacity:.9;

}



/* MOBILE */


@media(max-width:600px){

body{

padding:15px;

}


.header{

flex-direction:column;

gap:15px;

}


.order-card{

padding:18px;

}


.total{

font-size:20px;

}

}

</style>

</head>


<body>


<div class="header">

<h1>
📦 My Orders
</h1>


<a href="/doctor/dashboard">
🏠 Dashboard
</a>

</div>



${
orders.length ?

orders.map(order=>`

<div class="order-card">


<div class="order-id">

Order ID:
${order._id}

</div>


<p>
📅 ${new Date(order.createdAt).toLocaleDateString()}
</p>


<span class="status">

${order.status}

</span>



<h3>
🛒 Products
</h3>



${
order.items.map(item=>`

<div class="product">

<b>
${item.name}
</b>

<br>

Quantity:
${item.qty}

<br>

Price:
₹${item.price}


</div>


`).join("")
}



<h2 class="total">

TOTAL:
₹${order.totalAmount}

</h2>



<a class="btn"

href="/doctor/invoice/${order._id}">

📄 Download Invoice

</a>


</div>


`).join("")

:

`

<h2>
📦 No Orders Found
</h2>

`

}



</body>

</html>


`);


}

catch(err){

console.log(err);

res.status(500)
.send("Orders Page Error");

}


});







// =================================
// CREATE ORDER
// =================================


router.post(
"/create-order",
async(req,res)=>{


try{


if(!req.session.doctor){


return res.status(401)
.json({

success:false,

message:"Unauthorized"

});


}




const cart =
req.body.cart;



let total = 0;

cart.forEach(item=>{


total +=
Number(item.price) *
Number(item.qty);


});





const order =
await DoctorOrder.create({

doctorId:
req.session.doctor._id,

items:
cart.map(item=>({

productId:item.id,

name:item.name,

price:Number(item.price),

image:item.image,

qty:Number(item.qty)

})),

totalAmount:
total,

status:
"Pending"

});





res.json({


success:true,


message:"Order Created",


orderId:
order._id



});




}

catch(err){


console.log(err);


res.status(500)
.json({


success:false,


message:
"Order Failed"


});


}


});









// =================================
// GENERATE INVOICE PDF
// =================================


router.get(
"/invoice/:id",
async(req,res)=>{

try{


const order =
await DoctorOrder.findById(req.params.id);



if(!order){

return res.send("Order Not Found");

}




res.setHeader(
"Content-Type",
"application/pdf"
);


res.setHeader(
"Content-Disposition",
`attachment; filename=Estimate-${order._id}.pdf`
);



const doc = new PDFDocument({

    size:"A4",

    margins:{
        top:40,
        bottom:40,
        left:40,
        right:40
    }

});
doc.font(
    path.join(
        __dirname,
        "../fonts/DejaVuSans.ttf"
    )
);



doc.pipe(res);




// HEADER

doc
.fontSize(20)
.text(
"GLOBAL HEALTHCARE",
{
align:"center"
}
);


doc
.fontSize(10)
.text(
"SAFE & SECURE Healthcare",
{
align:"center"
}
);



doc.moveDown();



doc
.fontSize(16)
.text(
"ROUGH ESTIMATE",
{
align:"center"
}
);



doc.moveDown(2);





// CUSTOMER DETAILS


doc.fontSize(11);


doc.text(
`TO   : DOCTOR`
);


doc.text(
`NO   : A${order._id.toString().slice(-6)}`
);


doc.text(
`DATE : ${
new Date(order.createdAt)
.toLocaleDateString("en-GB")
}`
);


doc.text(
"TYPE : CREDIT"
);



doc.moveDown();



doc.moveDown(0.5);

doc.text(
"--------------------------------------------------------------"
);

doc.moveDown(0.5);



doc.text(
"SL | PRODUCT DESCRIPTION          | QTY | RATE | AMOUNT"
);



doc.text(
"--------------------------------------------------------------------------------"
);




// PRODUCTS


// ================= PRODUCT TABLE =================


let total = 0;


let y = doc.y;


// TABLE HEADER

doc.fontSize(10);


doc.text("SL",40,y);

doc.text("PRODUCT DESCRIPTION",70,y);

doc.text("QTY",300,y);

doc.text("RATE",350,y);

doc.text("AMOUNT",430,y);



doc.moveDown();


doc.text(
"------------------------------------------------------------",
40
);



y = doc.y + 5;



// PRODUCTS LOOP

order.items.forEach((item,index)=>{


let amount =
Number(item.price) *
Number(item.qty);



total += amount;



doc.text(
`${index+1}`,
40,
y
);



doc.text(
item.name,
70,
y
);



doc.text(
`${item.qty}`,
300,
y
);



doc.text(
`Rs.${item.price}`,
350,
y
);



doc.text(
`Rs.${amount}`,
430,
y
);



y += 25;



});




doc.text(
"------------------------------------------------------------",
40
);



doc.moveDown();



doc.fontSize(12);



doc.text(
`NO OF ITEMS : ${order.items.length}`
);



doc.text(
`GRAND TOTAL : Rs.${total.toFixed(2)}`
);



doc.text(
"------------------------------------------------------------"
);



doc.text(
`CURRENT BILL AMOUNT : Rs.${total.toFixed(2)}`
);



doc.text(
`BACK DUES AMOUNT    : Rs.0.00`
);



doc.text(
`TOTAL BALANCE       : Rs.${total.toFixed(2)}`
);



doc.moveDown();



doc.text(
"------------------------------------------------------------"
);



doc.moveDown();



doc.fontSize(10);



doc.text(
"Import Purchase ONLINE : No"
);



doc.text(
"GLOBAL HEALTHCARE"
);



doc.text(
"Powered by Osium Biogenix"
);



doc.text(
"Call : 7488033368"
);



doc.text(
"============================================================"
);



doc.end();



}


catch(err){


console.log(err);


res.status(500)
.send(
"Invoice Generate Error"
);


}



});








// =================================
// LOGOUT
// =================================


router.get(
"/logout",
(req,res)=>{


req.session.destroy(
()=>{


res.redirect(
"/admin/doctor-login"
);


});


});




router.get("/dashboard", async(req,res)=>{

    try{

        if(!req.session.doctor){

            return res.redirect("/admin/doctor-login");

        }


        const products = await Product.find()
        .sort({
            createdAt:-1
        });


        const DoctorDashboard = require("../pages/DoctorDashboard");


        res.send(
            DoctorDashboard(
                req.session.doctor,
                products
            )
        );


    }
    catch(err){

        console.log(err);

        res.status(500)
        .send("Dashboard Error");

    }

});




module.exports = router;