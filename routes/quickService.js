require("dotenv").config();

const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const QuickService =
    require("../models/QuickService");

const QuickOrder =
    require("../models/QuickOrder");

const QuickShopSetting =
    require("../models/QuickShopSetting");


// ======================================================
// RAZORPAY
// ======================================================

const razorpay =
new Razorpay({

    key_id:
        process.env.RAZORPAY_KEY_ID,

    key_secret:
        process.env.RAZORPAY_KEY_SECRET

});


// ======================================================
// PRIVATE DOCUMENT STORAGE
// ======================================================

const privateFolder =
path.join(
    process.cwd(),
    "storage",
    "quick-orders"
);

if(
    !fs.existsSync(privateFolder)
){

    fs.mkdirSync(
        privateFolder,
        {
            recursive:true
        }
    );

}


const storage =
multer.diskStorage({

    destination:
    function(req,file,cb){

        cb(
            null,
            privateFolder
        );

    },

    filename:
    function(req,file,cb){

        const ext =
            path.extname(
                file.originalname
            ).toLowerCase();

        const filename =
            "doc-" +
            Date.now() +
            "-" +
            Math.round(
                Math.random() *
                1000000000
            ) +
            ext;

        cb(
            null,
            filename
        );

    }

});


const upload =
multer({

    storage,

    limits:{
        fileSize:
            8 * 1024 * 1024,

        files:20
    },

    fileFilter:
    function(req,file,cb){

        const allowed = [

            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf"

        ];

        if(
            allowed.includes(
                file.mimetype
            )
        ){

            return cb(
                null,
                true
            );

        }

        cb(
            new Error(
                "Only JPG, PNG, WEBP and PDF allowed"
            )
        );

    }

});


// ======================================================
// ADMIN CHECK
// ======================================================

function requireAdmin(
    req,
    res,
    next
){

    if(
        !req.session ||
        !req.session.adminId
    ){

        return res
            .status(403)
            .send(
                "Admin Login Required"
            );

    }

    next();

}


// ======================================================
// DISTANCE FUNCTION
// ======================================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
){

    const R = 6371;

    const toRad =
        value =>
        value * Math.PI / 180;

    const dLat =
        toRad(
            lat2 - lat1
        );

    const dLon =
        toRad(
            lon2 - lon1
        );

    const a =

        Math.sin(
            dLat / 2
        ) ** 2

        +

        Math.cos(
            toRad(lat1)
        )

        *

        Math.cos(
            toRad(lat2)
        )

        *

        Math.sin(
            dLon / 2
        ) ** 2;


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1-a)
        );


    return R * c;

}


// ======================================================
// GENERATE ORDER ID
// ======================================================

async function createOrderId(){

    const lastOrder =
        await QuickOrder
            .findOne()
            .sort({
                createdAt:-1
            });

    let number = 1001;

    if(
        lastOrder &&
        lastOrder.orderId
    ){

        const old =
            parseInt(
                String(
                    lastOrder.orderId
                )
                .replace(
                    "GH",
                    ""
                )
            );

        if(!isNaN(old)){

            number =
                old + 1;

        }

    }

    return "GH" + number;

}


// ======================================================
// CUSTOMER QUICK SERVICE PAGE
// ======================================================

router.get(
    "/quick-service",
    async(req,res)=>{

        try{

            const services =
                await QuickService
                    .find({
                        active:true
                    })
                    .sort({
                        createdAt:-1
                    })
                    .lean();


            let setting =
                await QuickShopSetting
                    .findOne()
                    .lean();


            if(!setting){

                setting = {
                    isOpen:true,
                    deliveryRadiusKm:2,
                    deliveryCharge:20
                };

            }


            return res.send(`

<!DOCTYPE html>

<html>

<head>

<meta
name="viewport"
content="width=device-width,initial-scale=1">

<title>
Quick Document Service
</title>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

<style>

*{
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
margin:0;
background:#f5f7fb;
color:#111827;
}

.header{
background:
linear-gradient(
135deg,
#0d604b,
#18a47b
);
color:white;
padding:25px 15px;
text-align:center;
}

.container{
max-width:650px;
margin:20px auto;
padding:15px;
}

.card{
background:white;
padding:20px;
border-radius:20px;
box-shadow:
0 10px 30px
rgba(0,0,0,.10);
}

.shop-open{
padding:12px;
background:#dcfce7;
color:#166534;
border-radius:10px;
text-align:center;
font-weight:bold;
margin-bottom:15px;
}

.shop-close{
padding:15px;
background:#fee2e2;
color:#991b1b;
border-radius:10px;
text-align:center;
font-weight:bold;
margin-bottom:15px;
}

label{
display:block;
margin-top:16px;
margin-bottom:6px;
font-weight:bold;
}

input,
select,
textarea{
width:100%;
padding:13px;
border:1px solid #ddd;
border-radius:10px;
font-size:15px;
}

textarea{
min-height:90px;
}

.document-box{
margin-top:15px;
padding:15px;
background:#f8fafc;
border:1px solid #dbeafe;
border-radius:14px;
}

.camera{
display:block;
margin-top:8px;
}

.total-box{
margin-top:20px;
padding:18px;
background:#eff6ff;
border-radius:15px;
}

.pay-btn{
width:100%;
margin-top:20px;
padding:16px;
border:0;
border-radius:12px;
background:#16a34a;
color:#fff;
font-size:17px;
font-weight:bold;
cursor:pointer;
}

.pay-btn:disabled{
background:#94a3b8;
cursor:not-allowed;
}

.hidden{
display:none;
}

.location-box{
margin-top:15px;
padding:12px;
border-radius:10px;
background:#f1f5f9;
}

</style>

</head>


<body>

<div class="header">

<h2>
⚡ GLOBAL QUICK SERVICES
</h2>

<p>
Document Service at Your Doorstep
</p>

</div>


<div class="container">

<div class="card">


${
setting.isOpen

?

`
<div class="shop-open">
🟢 Shop Open
</div>
`

:

`
<div class="shop-close">
🔴 Shop is currently closed
</div>
`

}


<form
id="orderForm"
enctype="multipart/form-data"
>


<label>
Select Service
</label>

<select
name="serviceId"
id="service"
required
>

<option value="">
Select Service
</option>

${
services.map(service=>`

<option
value="${service._id}"
data-type="${service.type}"
data-price="${service.price}"
data-requirements='${JSON.stringify(service.requirements || [])}'
>
${service.name} - ₹${service.price}
</option>

`).join("")
}

</select>


<div
id="documentsArea"
></div>


<div
id="photoCopyOptions"
class="hidden"
>

<label>
Print Type
</label>

<select name="printType">

<option>
Black & White
</option>

<option>
Color
</option>

</select>


<label>
Number of Copies
</label>

<input
type="number"
name="copies"
min="1"
value="1"
>

</div>


<label>
Customer Name
</label>

<input
type="text"
name="customerName"
required
>


<label>
Phone Number
</label>

<input
type="tel"
name="phone"
maxlength="10"
required
>


<label>
Full Delivery Address
</label>

<textarea
name="address"
required
></textarea>


<input
type="hidden"
name="latitude"
id="latitude"
>

<input
type="hidden"
name="longitude"
id="longitude"
>


<div
class="location-box"
id="locationStatus"
>

📍 Checking delivery location...

</div>


<div class="total-box">

Service:
₹<span id="servicePrice">0</span>

<br><br>

Delivery:
₹${Number(setting.deliveryCharge || 0)}

<br><br>

<strong>
Total:
₹<span id="totalPrice">0</span>
</strong>

</div>


<button
type="submit"
class="pay-btn"
id="payButton"
${setting.isOpen ? "" : "disabled"}
>

💳 Continue to Payment

</button>


</form>

</div>

</div>


<script>

const shopOpen =
${setting.isOpen ? "true" : "false"};

const deliveryCharge =
${Number(setting.deliveryCharge || 0)};


const service =
document.getElementById(
    "service"
);

const documentsArea =
document.getElementById(
    "documentsArea"
);

const photoCopyOptions =
document.getElementById(
    "photoCopyOptions"
);

const servicePrice =
document.getElementById(
    "servicePrice"
);

const totalPrice =
document.getElementById(
    "totalPrice"
);


// ======================================================
// SERVICE CHANGE
// ======================================================

service.addEventListener(
"change",
function(){

    documentsArea.innerHTML = "";

    photoCopyOptions.classList.add(
        "hidden"
    );


    const option =
        this.options[
            this.selectedIndex
        ];


    if(!option.value){

        return;

    }


    const type =
        option.dataset.type;

    const price =
        Number(
            option.dataset.price ||
            0
        );


    servicePrice.textContent =
        price;

    totalPrice.textContent =
        price +
        deliveryCharge;


    if(
        type ===
        "photocopy"
    ){

        photoCopyOptions
            .classList
            .remove(
                "hidden"
            );


        documentsArea.innerHTML = \`

<div class="document-box">

<label>
📄 Scan / Upload Pages
</label>

<input
type="file"
name="photocopyPages"
accept="image/*"
capture="environment"
multiple
required
>

<small>
Multiple pages select kar sakte hain.
</small>

</div>

        \`;

        return;

    }


    let requirements = [];

    try{

        requirements =
            JSON.parse(
                option.dataset
                    .requirements ||
                "[]"
            );

    }
    catch(error){

        requirements = [];

    }


    requirements.forEach(
    function(item,index){

        const box =
            document.createElement(
                "div"
            );

        box.className =
            "document-box";


        box.innerHTML = \`

<label>
📷 ${item.name}
${item.required ? "*" : ""}
</label>

<input
type="file"
name="doc_${index}"
accept="image/*"
capture="environment"
${item.required ? "required" : ""}
>

<input
type="hidden"
name="docName_${index}"
value="${item.name}"
>

        \`;


        documentsArea
            .appendChild(
                box
            );

    });

});


// ======================================================
// LOCATION
// ======================================================

const locationStatus =
document.getElementById(
    "locationStatus"
);

if(
navigator.geolocation
){

navigator.geolocation
.getCurrentPosition(

function(position){

    document
    .getElementById(
        "latitude"
    )
    .value =
        position.coords
            .latitude;


    document
    .getElementById(
        "longitude"
    )
    .value =
        position.coords
            .longitude;


    locationStatus.innerHTML =
        "✅ Location captured";

},

function(){

    locationStatus.innerHTML =
        "❌ Location permission required";

}

);

}


// ======================================================
// SUBMIT ORDER
// ======================================================

document
.getElementById(
    "orderForm"
)
.addEventListener(
"submit",
async function(event){

    event.preventDefault();


    if(!shopOpen){

        alert(
            "Shop is currently closed"
        );

        return;

    }


    const lat =
        document
        .getElementById(
            "latitude"
        )
        .value;


    const lng =
        document
        .getElementById(
            "longitude"
        )
        .value;


    if(!lat || !lng){

        alert(
            "Please allow location permission"
        );

        return;

    }


    const button =
        document
        .getElementById(
            "payButton"
        );

    button.disabled = true;

    button.innerText =
        "Please wait...";


    try{

        const formData =
            new FormData(
                this
            );


        const response =
            await fetch(
                "/quick-service/create-order",
                {
                    method:"POST",
                    body:formData
                }
            );


        const data =
            await response.json();


        if(!data.success){

            alert(
                data.message ||
                "Order failed"
            );

            button.disabled=false;

            button.innerText=
                "💳 Continue to Payment";

            return;

        }


        const options = {

            key:
                data.key,

            amount:
                data.amount,

            currency:
                "INR",

            name:
                "GLOBAL QUICK SERVICES",

            description:
                data.serviceName,

            order_id:
                data.razorpayOrderId,

            handler:
            async function(response){

                const verify =
                    await fetch(
                        "/quick-service/verify-payment",
                        {

                            method:"POST",

                            headers:{
                                "Content-Type":
                                "application/json"
                            },

                            body:
                            JSON.stringify({

                                orderId:
                                    data.orderId,

                                razorpay_order_id:
                                    response
                                    .razorpay_order_id,

                                razorpay_payment_id:
                                    response
                                    .razorpay_payment_id,

                                razorpay_signature:
                                    response
                                    .razorpay_signature

                            })

                        }
                    );


                const result =
                    await verify.json();


                if(result.success){

                    window.location.href =
                        "/quick-service/success/" +
                        data.orderId;

                }
                else{

                    alert(
                        "Payment verification failed"
                    );

                }

            }

        };


        const rzp =
            new Razorpay(
                options
            );

        rzp.open();


        button.disabled=false;

        button.innerText=
            "💳 Continue to Payment";


    }
    catch(error){

        console.error(error);

        alert(
            "Something went wrong"
        );

        button.disabled=false;

        button.innerText=
            "💳 Continue to Payment";

    }

}
);

</script>

</body>

</html>

            `);

        }
        catch(err){

            console.error(err);

            res.status(500)
            .send(err.message);

        }

    }
);


// ======================================================
// CREATE ORDER
// ======================================================

router.post(
    "/quick-service/create-order",

    upload.any(),

    async(req,res)=>{

        try{

            const setting =
                await QuickShopSetting
                    .findOne();


            if(
                setting &&
                setting.isOpen === false
            ){

                return res.json({

                    success:false,

                    message:
                    "Shop is currently closed"

                });

            }


            const service =
                await QuickService
                    .findById(
                        req.body.serviceId
                    );


            if(
                !service ||
                service.active === false
            ){

                return res.json({

                    success:false,

                    message:
                    "Service not available"

                });

            }


            const latitude =
                Number(
                    req.body.latitude
                );

            const longitude =
                Number(
                    req.body.longitude
                );


            if(
                !latitude ||
                !longitude
            ){

                return res.json({

                    success:false,

                    message:
                    "Location required"

                });

            }


            const shopLat =
                Number(
                    setting?.shopLatitude
                );

            const shopLng =
                Number(
                    setting?.shopLongitude
                );


            if(
                !shopLat ||
                !shopLng
            ){

                return res.json({

                    success:false,

                    message:
                    "Shop location not configured"

                });

            }


            const distance =
                calculateDistance(

                    shopLat,
                    shopLng,

                    latitude,
                    longitude

                );


            const radius =
                Number(
                    setting
                    ?.deliveryRadiusKm ||
                    2
                );


            if(
                distance >
                radius
            ){

                return res.json({

                    success:false,

                    message:
                    "Delivery only available within " +
                    radius +
                    " KM"

                });

            }


// ======================================================
// DOCUMENTS
// ======================================================

            const documents = [];


            for(
                const file
                of
                req.files || []
            ){

                let name =
                    "Document";


                if(
                    file.fieldname ===
                    "photocopyPages"
                ){

                    name =
                        "Photo Copy Page";

                }
                else if(
                    file.fieldname
                    .startsWith(
                        "doc_"
                    )
                ){

                    const index =
                        file.fieldname
                        .replace(
                            "doc_",
                            ""
                        );


                    name =
                        req.body[
                            "docName_" +
                            index
                        ]
                        ||
                        "Document";

                }


                documents.push({

                    documentName:
                        name,

                    fileName:
                        file.filename,

                    originalName:
                        file.originalname

                });

            }


// ======================================================
// AMOUNT
// ======================================================

            const copies =
                Math.max(
                    1,
                    Number(
                        req.body.copies ||
                        1
                    )
                );


            let serviceAmount =
                Number(
                    service.price ||
                    0
                );


            if(
                service.type ===
                "photocopy"
            ){

                const pageCount =
                    documents.length ||
                    1;

                serviceAmount =
                    Number(
                        service.price
                    )
                    *
                    pageCount
                    *
                    copies;

            }


            const deliveryCharge =
                Number(
                    setting
                    ?.deliveryCharge ||
                    0
                );


            const totalAmount =
                serviceAmount +
                deliveryCharge;


            const orderId =
                await createOrderId();


            const paymentOrder =
                await razorpay
                    .orders
                    .create({

                        amount:
                            Math.round(
                                totalAmount *
                                100
                            ),

                        currency:
                            "INR",

                        receipt:
                            orderId

                    });


            const order =
                new QuickOrder({

                    orderId,

                    customerName:
                        req.body
                        .customerName,

                    phone:
                        req.body.phone,

                    address:
                        req.body.address,

                    latitude,

                    longitude,

                    distanceKm:
                        Number(
                            distance
                            .toFixed(2)
                        ),

                    serviceId:
                        service._id,

                    serviceName:
                        service.name,

                    serviceType:
                        service.type,

                    documents,

                    copies,

                    printType:
                        req.body
                        .printType ||
                        "Black & White",

                    serviceAmount,

                    deliveryCharge,

                    totalAmount,

                    razorpayOrderId:
                        paymentOrder.id,

                    paymentStatus:
                        "PENDING",

                    status:
                        "NEW"

                });


            await order.save();


            return res.json({

                success:true,

                key:
                    process.env
                    .RAZORPAY_KEY_ID,

                orderId:
                    order._id,

                orderNumber:
                    order.orderId,

                serviceName:
                    service.name,

                razorpayOrderId:
                    paymentOrder.id,

                amount:
                    paymentOrder.amount

            });

        }
        catch(err){

            console.error(
                "CREATE QUICK ORDER:",
                err
            );

            return res
                .status(500)
                .json({

                    success:false,

                    message:
                        err.message

                });

        }

    }
);


// ======================================================
// VERIFY PAYMENT
// ======================================================

router.post(
    "/quick-service/verify-payment",
    async(req,res)=>{

        try{

            const {

                orderId,

                razorpay_order_id,

                razorpay_payment_id,

                razorpay_signature

            } = req.body;


            const body =
                razorpay_order_id +
                "|" +
                razorpay_payment_id;


            const expected =
                crypto
                .createHmac(
                    "sha256",
                    process.env
                    .RAZORPAY_KEY_SECRET
                )
                .update(body)
                .digest("hex");


            if(
                expected !==
                razorpay_signature
            ){

                return res.json({

                    success:false

                });

            }


            const order =
                await QuickOrder
                    .findByIdAndUpdate(

                        orderId,

                        {

                            paymentStatus:
                                "PAID",

                            razorpayPaymentId:
                                razorpay_payment_id,

                            status:
                                "NEW"

                        },

                        {
                            new:true
                        }

                    );


            return res.json({

                success:true,

                orderNumber:
                    order.orderId

            });

        }
        catch(err){

            console.error(err);

            return res
                .status(500)
                .json({

                    success:false

                });

        }

    }
);


// ======================================================
// SUCCESS PAGE
// ======================================================

router.get(
    "/quick-service/success/:id",
    async(req,res)=>{

        const order =
            await QuickOrder
                .findById(
                    req.params.id
                )
                .lean();


        if(!order){

            return res.send(
                "Order Not Found"
            );

        }


        res.send(`

<!DOCTYPE html>

<html>

<head>

<meta name="viewport"
content="width=device-width,initial-scale=1">

<title>
Order Successful
</title>

</head>

<body style="
font-family:Arial;
background:#f0fdf4;
text-align:center;
padding:40px;
">

<h1>
✅ Payment Successful
</h1>

<h2>
Order:
${order.orderId}
</h2>

<p>
Your order has been received.
</p>

<a href="/">
Back Home
</a>

</body>

</html>

        `);

    }
);


// ======================================================
// ADMIN DASHBOARD
// ======================================================

router.get(
    "/admin/quick-service",

    requireAdmin,

    async(req,res)=>{

        try{

            const orders =
                await QuickOrder
                    .find({
                        paymentStatus:"PAID"
                    })
                    .sort({
                        createdAt:-1
                    })
                    .lean();


            let setting =
                await QuickShopSetting
                    .findOne()
                    .lean();


            if(!setting){

                setting = {
                    isOpen:true,
                    deliveryRadiusKm:2,
                    deliveryCharge:20
                };

            }


            res.send(`

<!DOCTYPE html>

<html>

<head>

<meta name="viewport"
content="width=device-width,initial-scale=1">

<title>
Quick Service Admin
</title>

<style>

*{
box-sizing:border-box;
font-family:Arial;
}

body{
margin:0;
background:#f1f5f9;
}

.container{
max-width:1100px;
margin:auto;
padding:20px;
}

.control{
background:white;
padding:20px;
border-radius:18px;
margin-bottom:20px;
}

.status-open{
color:#15803d;
}

.status-close{
color:#dc2626;
}

button{
padding:10px 16px;
border:0;
border-radius:8px;
cursor:pointer;
font-weight:bold;
}

.open{
background:#16a34a;
color:white;
}

.close{
background:#dc2626;
color:white;
}

.order{
background:white;
padding:20px;
border-radius:18px;
margin-bottom:20px;
box-shadow:
0 5px 20px
rgba(0,0,0,.08);
}

.documents{
display:grid;
grid-template-columns:
repeat(
auto-fit,
minmax(180px,1fr)
);
gap:15px;
margin-top:15px;
}

.document{
border:1px solid #ddd;
padding:10px;
border-radius:12px;
}

.document img{
width:100%;
height:180px;
object-fit:contain;
background:#f8fafc;
}

.download{
display:block;
margin-top:8px;
padding:9px;
text-align:center;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:8px;
}

select{
padding:10px;
border-radius:8px;
}

</style>

</head>

<body>

<div class="container">


<div class="control">

<h2>
🏪 Shop Control
</h2>

<h3
class="${
setting.isOpen
?
"status-open"
:
"status-close"
}"
>

${
setting.isOpen
?
"🟢 SHOP OPEN"
:
"🔴 SHOP CLOSED"
}

</h3>


<form
action="/admin/quick-service/shop-status"
method="POST"
style="display:inline"
>

<input
type="hidden"
name="isOpen"
value="true"
>

<button class="open">
OPEN SHOP
</button>

</form>


<form
action="/admin/quick-service/shop-status"
method="POST"
style="display:inline"
>

<input
type="hidden"
name="isOpen"
value="false"
>

<button class="close">
CLOSE SHOP
</button>

</form>


<p>
Delivery Radius:
<strong>
${setting.deliveryRadiusKm} KM
</strong>
</p>

</div>


<h2>
📦 Customer Orders
</h2>


${
orders.length
?

orders.map(order=>`

<div class="order">

<h2>
${order.orderId}
</h2>

<p>
<strong>
${order.serviceName}
</strong>
</p>

<p>
👤 ${order.customerName}
</p>

<p>
📞
<a href="tel:${order.phone}">
${order.phone}
</a>
</p>

<p>
🏠 ${order.address}
</p>

<p>
📍 Distance:
<strong>
${order.distanceKm} KM
</strong>
</p>

<p>
💰 ₹${order.totalAmount}
-
<strong style="color:green">
PAID
</strong>
</p>

<p>
Print:
${order.printType}
</p>

<p>
Copies:
${order.copies}
</p>


<h3>
📄 Customer Documents
</h3>


<div class="documents">

${
(order.documents || [])
.map((doc,index)=>`

<div class="document">

<strong>
${doc.documentName}
</strong>

<br><br>

<img
src="/admin/quick-service/document/${order._id}/${index}"
onerror="
this.style.display='none'
"
>

<a
href="/admin/quick-service/document/${order._id}/${index}?download=1"
class="download"
>

⬇ Download

</a>

</div>

`).join("")
}

</div>


<br>


<form
method="POST"
action="/admin/quick-service/order-status/${order._id}"
>

<select
name="status"
>

${[
"NEW",
"PROCESSING",
"READY",
"PACKED",
"OUT_FOR_DELIVERY",
"DELIVERED",
"CANCELLED"
]
.map(status=>`

<option
value="${status}"
${order.status === status ? "selected" : ""}
>
${status}
</option>

`).join("")}

</select>

<button
style="
background:#0d604b;
color:white;
"
>
Update Status
</button>

</form>


</div>

`).join("")

:

"<p>No paid orders yet.</p>"
}


</div>

</body>

</html>

            `);

        }
        catch(err){

            console.error(err);

            res.status(500)
            .send(err.message);

        }

    }
);


// ======================================================
// SHOP OPEN / CLOSE
// ======================================================

router.post(
    "/admin/quick-service/shop-status",

    requireAdmin,

    async(req,res)=>{

        try{

            const isOpen =
                req.body.isOpen ===
                "true";


            await QuickShopSetting
                .findOneAndUpdate(

                    {},

                    {
                        isOpen,
                        updatedAt:
                            new Date()
                    },

                    {
                        upsert:true,
                        new:true
                    }

                );


            res.redirect(
                "/admin/quick-service"
            );

        }
        catch(err){

            console.error(err);

            res.status(500)
            .send(err.message);

        }

    }
);


// ======================================================
// ORDER STATUS
// ======================================================

router.post(
    "/admin/quick-service/order-status/:id",

    requireAdmin,

    async(req,res)=>{

        try{

            await QuickOrder
                .findByIdAndUpdate(

                    req.params.id,

                    {
                        status:
                            req.body.status
                    }

                );


            res.redirect(
                "/admin/quick-service"
            );

        }
        catch(err){

            console.error(err);

            res.status(500)
            .send(err.message);

        }

    }
);


// ======================================================
// PRIVATE DOCUMENT VIEW / DOWNLOAD
// ======================================================

router.get(
    "/admin/quick-service/document/:orderId/:index",

    requireAdmin,

    async(req,res)=>{

        try{

            const order =
                await QuickOrder
                    .findById(
                        req.params.orderId
                    );


            if(!order){

                return res
                    .status(404)
                    .send(
                        "Order Not Found"
                    );

            }


            const index =
                Number(
                    req.params.index
                );


            const document =
                order.documents[
                    index
                ];


            if(!document){

                return res
                    .status(404)
                    .send(
                        "Document Not Found"
                    );

            }


            const file =
                path.join(
                    privateFolder,
                    document.fileName
                );


            if(
                !fs.existsSync(file)
            ){

                return res
                    .status(404)
                    .send(
                        "File Not Found"
                    );

            }


            if(
                req.query.download ===
                "1"
            ){

                return res.download(

                    file,

                    document.originalName ||
                    document.fileName

                );

            }


            return res.sendFile(
                file
            );

        }
        catch(err){

            console.error(err);

            res.status(500)
            .send(err.message);

        }

    }
);


module.exports = router;