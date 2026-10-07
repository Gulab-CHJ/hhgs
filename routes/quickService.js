// // require("dotenv").config();

// // const express = require("express");
// // const router = express.Router();

// // const path = require("path");
// // const fs = require("fs");
// // const multer = require("multer");
// // const crypto = require("crypto");
// // const Razorpay = require("razorpay");

// // const QuickService =
// //     require("../models/QuickService");

// // const QuickOrder =
// //     require("../models/QuickOrder");

// // const QuickShopSetting =
// //     require("../models/QuickShopSetting");


// // // ======================================================
// // // RAZORPAY
// // // ======================================================

// // const razorpay =
// // new Razorpay({

// //     key_id:
// //         process.env.RAZORPAY_KEY_ID,

// //     key_secret:
// //         process.env.RAZORPAY_KEY_SECRET

// // });


// // // ======================================================
// // // PRIVATE DOCUMENT STORAGE
// // // ======================================================

// // const privateFolder =
// // path.join(
// //     process.cwd(),
// //     "storage",
// //     "quick-orders"
// // );

// // if(
// //     !fs.existsSync(privateFolder)
// // ){

// //     fs.mkdirSync(
// //         privateFolder,
// //         {
// //             recursive:true
// //         }
// //     );

// // }


// // const storage =
// // multer.diskStorage({

// //     destination:
// //     function(req,file,cb){

// //         cb(
// //             null,
// //             privateFolder
// //         );

// //     },

// //     filename:
// //     function(req,file,cb){

// //         const ext =
// //             path.extname(
// //                 file.originalname
// //             ).toLowerCase();

// //         const filename =
// //             "doc-" +
// //             Date.now() +
// //             "-" +
// //             Math.round(
// //                 Math.random() *
// //                 1000000000
// //             ) +
// //             ext;

// //         cb(
// //             null,
// //             filename
// //         );

// //     }

// // });


// // const upload =
// // multer({

// //     storage,

// //     limits:{
// //         fileSize:
// //             8 * 1024 * 1024,

// //         files:20
// //     },

// //     fileFilter:
// //     function(req,file,cb){

// //         const allowed = [

// //             "image/jpeg",
// //             "image/png",
// //             "image/webp",
// //             "application/pdf"

// //         ];

// //         if(
// //             allowed.includes(
// //                 file.mimetype
// //             )
// //         ){

// //             return cb(
// //                 null,
// //                 true
// //             );

// //         }

// //         cb(
// //             new Error(
// //                 "Only JPG, PNG, WEBP and PDF allowed"
// //             )
// //         );

// //     }

// // });


// // // ======================================================
// // // ADMIN CHECK
// // // ======================================================

// // function requireAdmin(
// //     req,
// //     res,
// //     next
// // ){

// //     if(
// //         !req.session ||
// //         !req.session.adminId
// //     ){

// //         return res
// //             .status(403)
// //             .send(
// //                 "Admin Login Required"
// //             );

// //     }

// //     next();

// // }


// // // ======================================================
// // // DISTANCE FUNCTION
// // // ======================================================

// // function calculateDistance(
// //     lat1,
// //     lon1,
// //     lat2,
// //     lon2
// // ){

// //     const R = 6371;

// //     const toRad =
// //         value =>
// //         value * Math.PI / 180;

// //     const dLat =
// //         toRad(
// //             lat2 - lat1
// //         );

// //     const dLon =
// //         toRad(
// //             lon2 - lon1
// //         );

// //     const a =

// //         Math.sin(
// //             dLat / 2
// //         ) ** 2

// //         +

// //         Math.cos(
// //             toRad(lat1)
// //         )

// //         *

// //         Math.cos(
// //             toRad(lat2)
// //         )

// //         *

// //         Math.sin(
// //             dLon / 2
// //         ) ** 2;


// //     const c =
// //         2 *
// //         Math.atan2(
// //             Math.sqrt(a),
// //             Math.sqrt(1-a)
// //         );


// //     return R * c;

// // }


// // // ======================================================
// // // GENERATE ORDER ID
// // // ======================================================

// // async function createOrderId(){

// //     const lastOrder =
// //         await QuickOrder
// //             .findOne()
// //             .sort({
// //                 createdAt:-1
// //             });

// //     let number = 1001;

// //     if(
// //         lastOrder &&
// //         lastOrder.orderId
// //     ){

// //         const old =
// //             parseInt(
// //                 String(
// //                     lastOrder.orderId
// //                 )
// //                 .replace(
// //                     "GH",
// //                     ""
// //                 )
// //             );

// //         if(!isNaN(old)){

// //             number =
// //                 old + 1;

// //         }

// //     }

// //     return "GH" + number;

// // }


// // // ======================================================
// // // CUSTOMER QUICK SERVICE PAGE
// // // ======================================================

// // router.get(
// //     "/quick-service",
// //     async(req,res)=>{

// //         try{

// //             const services =
// //                 await QuickService
// //                     .find({
// //                         active:true
// //                     })
// //                     .sort({
// //                         createdAt:-1
// //                     })
// //                     .lean();


// //             let setting =
// //                 await QuickShopSetting
// //                     .findOne()
// //                     .lean();


// //             if(!setting){

// //                 setting = {
// //                     isOpen:true,
// //                     deliveryRadiusKm:2,
// //                     deliveryCharge:20
// //                 };

// //             }


// //             return res.send(`

// // <!DOCTYPE html>

// // <html>

// // <head>

// // <meta
// // name="viewport"
// // content="width=device-width,initial-scale=1">

// // <title>
// // Quick Document Service
// // </title>

// // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// // <style>

// // *{
// // box-sizing:border-box;
// // font-family:Arial,sans-serif;
// // }

// // body{
// // margin:0;
// // background:#f5f7fb;
// // color:#111827;
// // }

// // .header{
// // background:
// // linear-gradient(
// // 135deg,
// // #0d604b,
// // #18a47b
// // );
// // color:white;
// // padding:25px 15px;
// // text-align:center;
// // }

// // .container{
// // max-width:650px;
// // margin:20px auto;
// // padding:15px;
// // }

// // .card{
// // background:white;
// // padding:20px;
// // border-radius:20px;
// // box-shadow:
// // 0 10px 30px
// // rgba(0,0,0,.10);
// // }

// // .shop-open{
// // padding:12px;
// // background:#dcfce7;
// // color:#166534;
// // border-radius:10px;
// // text-align:center;
// // font-weight:bold;
// // margin-bottom:15px;
// // }

// // .shop-close{
// // padding:15px;
// // background:#fee2e2;
// // color:#991b1b;
// // border-radius:10px;
// // text-align:center;
// // font-weight:bold;
// // margin-bottom:15px;
// // }

// // label{
// // display:block;
// // margin-top:16px;
// // margin-bottom:6px;
// // font-weight:bold;
// // }

// // input,
// // select,
// // textarea{
// // width:100%;
// // padding:13px;
// // border:1px solid #ddd;
// // border-radius:10px;
// // font-size:15px;
// // }

// // textarea{
// // min-height:90px;
// // }

// // .document-box{
// // margin-top:15px;
// // padding:15px;
// // background:#f8fafc;
// // border:1px solid #dbeafe;
// // border-radius:14px;
// // }

// // .camera{
// // display:block;
// // margin-top:8px;
// // }

// // .total-box{
// // margin-top:20px;
// // padding:18px;
// // background:#eff6ff;
// // border-radius:15px;
// // }

// // .pay-btn{
// // width:100%;
// // margin-top:20px;
// // padding:16px;
// // border:0;
// // border-radius:12px;
// // background:#16a34a;
// // color:#fff;
// // font-size:17px;
// // font-weight:bold;
// // cursor:pointer;
// // }

// // .pay-btn:disabled{
// // background:#94a3b8;
// // cursor:not-allowed;
// // }

// // .hidden{
// // display:none;
// // }

// // .location-box{
// // margin-top:15px;
// // padding:12px;
// // border-radius:10px;
// // background:#f1f5f9;
// // }

// // </style>

// // </head>


// // <body>

// // <div class="header">

// // <h2>
// // ⚡ GLOBAL QUICK SERVICES
// // </h2>

// // <p>
// // Document Service at Your Doorstep
// // </p>

// // </div>


// // <div class="container">

// // <div class="card">


// // ${
// // setting.isOpen

// // ?

// // `
// // <div class="shop-open">
// // 🟢 Shop Open
// // </div>
// // `

// // :

// // `
// // <div class="shop-close">
// // 🔴 Shop is currently closed
// // </div>
// // `

// // }


// // <form
// // id="orderForm"
// // enctype="multipart/form-data"
// // >


// // <label>
// // Select Service
// // </label>

// // <select
// // name="serviceId"
// // id="service"
// // required
// // >

// // <option value="">
// // Select Service
// // </option>

// // ${
// // services.map(service=>`

// // <option
// // value="${service._id}"
// // data-type="${service.type}"
// // data-price="${service.price}"
// // data-requirements='${JSON.stringify(service.requirements || [])}'
// // >
// // ${service.name} - ₹${service.price}
// // </option>

// // `).join("")
// // }

// // </select>


// // <div
// // id="documentsArea"
// // ></div>


// // <div
// // id="photoCopyOptions"
// // class="hidden"
// // >

// // <label>
// // Print Type
// // </label>

// // <select name="printType">

// // <option>
// // Black & White
// // </option>

// // <option>
// // Color
// // </option>

// // </select>


// // <label>
// // Number of Copies
// // </label>

// // <input
// // type="number"
// // name="copies"
// // min="1"
// // value="1"
// // >

// // </div>


// // <label>
// // Customer Name
// // </label>

// // <input
// // type="text"
// // name="customerName"
// // required
// // >


// // <label>
// // Phone Number
// // </label>

// // <input
// // type="tel"
// // name="phone"
// // maxlength="10"
// // required
// // >


// // <label>
// // Full Delivery Address
// // </label>

// // <textarea
// // name="address"
// // required
// // ></textarea>


// // <input
// // type="hidden"
// // name="latitude"
// // id="latitude"
// // >

// // <input
// // type="hidden"
// // name="longitude"
// // id="longitude"
// // >


// // <div
// // class="location-box"
// // id="locationStatus"
// // >

// // 📍 Checking delivery location...

// // </div>


// // <div class="total-box">

// // Service:
// // ₹<span id="servicePrice">0</span>

// // <br><br>

// // Delivery:
// // ₹${Number(setting.deliveryCharge || 0)}

// // <br><br>

// // <strong>
// // Total:
// // ₹<span id="totalPrice">0</span>
// // </strong>

// // </div>


// // <button
// // type="submit"
// // class="pay-btn"
// // id="payButton"
// // ${setting.isOpen ? "" : "disabled"}
// // >

// // 💳 Continue to Payment

// // </button>


// // </form>

// // </div>

// // </div>


// // <script>

// // const shopOpen =
// // ${setting.isOpen ? "true" : "false"};

// // const deliveryCharge =
// // ${Number(setting.deliveryCharge || 0)};


// // const service =
// // document.getElementById(
// //     "service"
// // );

// // const documentsArea =
// // document.getElementById(
// //     "documentsArea"
// // );

// // const photoCopyOptions =
// // document.getElementById(
// //     "photoCopyOptions"
// // );

// // const servicePrice =
// // document.getElementById(
// //     "servicePrice"
// // );

// // const totalPrice =
// // document.getElementById(
// //     "totalPrice"
// // );


// // // ======================================================
// // // SERVICE CHANGE
// // // ======================================================

// // service.addEventListener(
// // "change",
// // function(){

// //     documentsArea.innerHTML = "";

// //     photoCopyOptions.classList.add(
// //         "hidden"
// //     );


// //     const option =
// //         this.options[
// //             this.selectedIndex
// //         ];


// //     if(!option.value){

// //         return;

// //     }


// //     const type =
// //         option.dataset.type;

// //     const price =
// //         Number(
// //             option.dataset.price ||
// //             0
// //         );


// //     servicePrice.textContent =
// //         price;

// //     totalPrice.textContent =
// //         price +
// //         deliveryCharge;


// //     if(
// //         type ===
// //         "photocopy"
// //     ){

// //         photoCopyOptions
// //             .classList
// //             .remove(
// //                 "hidden"
// //             );


// //         documentsArea.innerHTML = \`

// // <div class="document-box">

// // <label>
// // 📄 Scan / Upload Pages
// // </label>

// // <input
// // type="file"
// // name="photocopyPages"
// // accept="image/*"
// // capture="environment"
// // multiple
// // required
// // >

// // <small>
// // Multiple pages select kar sakte hain.
// // </small>

// // </div>

// //         \`;

// //         return;

// //     }


// //     let requirements = [];

// //     try{

// //         requirements =
// //             JSON.parse(
// //                 option.dataset
// //                     .requirements ||
// //                 "[]"
// //             );

// //     }
// //     catch(error){

// //         requirements = [];

// //     }


// //     requirements.forEach(
// //     function(item,index){

// //         const box =
// //             document.createElement(
// //                 "div"
// //             );

// //         box.className =
// //             "document-box";


// //         box.innerHTML = \`

// // <label>
// // 📷 ${item.name}
// // ${item.required ? "*" : ""}
// // </label>

// // <input
// // type="file"
// // name="doc_${index}"
// // accept="image/*"
// // capture="environment"
// // ${item.required ? "required" : ""}
// // >

// // <input
// // type="hidden"
// // name="docName_${index}"
// // value="${item.name}"
// // >

// //         \`;


// //         documentsArea
// //             .appendChild(
// //                 box
// //             );

// //     });

// // });


// // // ======================================================
// // // LOCATION
// // // ======================================================

// // const locationStatus =
// // document.getElementById(
// //     "locationStatus"
// // );

// // if(
// // navigator.geolocation
// // ){

// // navigator.geolocation
// // .getCurrentPosition(

// // function(position){

// //     document
// //     .getElementById(
// //         "latitude"
// //     )
// //     .value =
// //         position.coords
// //             .latitude;


// //     document
// //     .getElementById(
// //         "longitude"
// //     )
// //     .value =
// //         position.coords
// //             .longitude;


// //     locationStatus.innerHTML =
// //         "✅ Location captured";

// // },

// // function(){

// //     locationStatus.innerHTML =
// //         "❌ Location permission required";

// // }

// // );

// // }


// // // ======================================================
// // // SUBMIT ORDER
// // // ======================================================

// // document
// // .getElementById(
// //     "orderForm"
// // )
// // .addEventListener(
// // "submit",
// // async function(event){

// //     event.preventDefault();


// //     if(!shopOpen){

// //         alert(
// //             "Shop is currently closed"
// //         );

// //         return;

// //     }


// //     const lat =
// //         document
// //         .getElementById(
// //             "latitude"
// //         )
// //         .value;


// //     const lng =
// //         document
// //         .getElementById(
// //             "longitude"
// //         )
// //         .value;


// //     if(!lat || !lng){

// //         alert(
// //             "Please allow location permission"
// //         );

// //         return;

// //     }


// //     const button =
// //         document
// //         .getElementById(
// //             "payButton"
// //         );

// //     button.disabled = true;

// //     button.innerText =
// //         "Please wait...";


// //     try{

// //         const formData =
// //             new FormData(
// //                 this
// //             );


// //         const response =
// //             await fetch(
// //                 "/quick-service/create-order",
// //                 {
// //                     method:"POST",
// //                     body:formData
// //                 }
// //             );


// //         const data =
// //             await response.json();


// //         if(!data.success){

// //             alert(
// //                 data.message ||
// //                 "Order failed"
// //             );

// //             button.disabled=false;

// //             button.innerText=
// //                 "💳 Continue to Payment";

// //             return;

// //         }


// //         const options = {

// //             key:
// //                 data.key,

// //             amount:
// //                 data.amount,

// //             currency:
// //                 "INR",

// //             name:
// //                 "GLOBAL QUICK SERVICES",

// //             description:
// //                 data.serviceName,

// //             order_id:
// //                 data.razorpayOrderId,

// //             handler:
// //             async function(response){

// //                 const verify =
// //                     await fetch(
// //                         "/quick-service/verify-payment",
// //                         {

// //                             method:"POST",

// //                             headers:{
// //                                 "Content-Type":
// //                                 "application/json"
// //                             },

// //                             body:
// //                             JSON.stringify({

// //                                 orderId:
// //                                     data.orderId,

// //                                 razorpay_order_id:
// //                                     response
// //                                     .razorpay_order_id,

// //                                 razorpay_payment_id:
// //                                     response
// //                                     .razorpay_payment_id,

// //                                 razorpay_signature:
// //                                     response
// //                                     .razorpay_signature

// //                             })

// //                         }
// //                     );


// //                 const result =
// //                     await verify.json();


// //                 if(result.success){

// //                     window.location.href =
// //                         "/quick-service/success/" +
// //                         data.orderId;

// //                 }
// //                 else{

// //                     alert(
// //                         "Payment verification failed"
// //                     );

// //                 }

// //             }

// //         };


// //         const rzp =
// //             new Razorpay(
// //                 options
// //             );

// //         rzp.open();


// //         button.disabled=false;

// //         button.innerText=
// //             "💳 Continue to Payment";


// //     }
// //     catch(error){

// //         console.error(error);

// //         alert(
// //             "Something went wrong"
// //         );

// //         button.disabled=false;

// //         button.innerText=
// //             "💳 Continue to Payment";

// //     }

// // }
// // );

// // </script>

// // </body>

// // </html>

// //             `);

// //         }
// //         catch(err){

// //             console.error(err);

// //             res.status(500)
// //             .send(err.message);

// //         }

// //     }
// // );


// // // ======================================================
// // // CREATE ORDER
// // // ======================================================

// // router.post(
// //     "/quick-service/create-order",

// //     upload.any(),

// //     async(req,res)=>{

// //         try{

// //             const setting =
// //                 await QuickShopSetting
// //                     .findOne();


// //             if(
// //                 setting &&
// //                 setting.isOpen === false
// //             ){

// //                 return res.json({

// //                     success:false,

// //                     message:
// //                     "Shop is currently closed"

// //                 });

// //             }


// //             const service =
// //                 await QuickService
// //                     .findById(
// //                         req.body.serviceId
// //                     );


// //             if(
// //                 !service ||
// //                 service.active === false
// //             ){

// //                 return res.json({

// //                     success:false,

// //                     message:
// //                     "Service not available"

// //                 });

// //             }


// //             const latitude =
// //                 Number(
// //                     req.body.latitude
// //                 );

// //             const longitude =
// //                 Number(
// //                     req.body.longitude
// //                 );


// //             if(
// //                 !latitude ||
// //                 !longitude
// //             ){

// //                 return res.json({

// //                     success:false,

// //                     message:
// //                     "Location required"

// //                 });

// //             }


// //             const shopLat =
// //                 Number(
// //                     setting?.shopLatitude
// //                 );

// //             const shopLng =
// //                 Number(
// //                     setting?.shopLongitude
// //                 );


// //             if(
// //                 !shopLat ||
// //                 !shopLng
// //             ){

// //                 return res.json({

// //                     success:false,

// //                     message:
// //                     "Shop location not configured"

// //                 });

// //             }


// //             const distance =
// //                 calculateDistance(

// //                     shopLat,
// //                     shopLng,

// //                     latitude,
// //                     longitude

// //                 );


// //             const radius =
// //                 Number(
// //                     setting
// //                     ?.deliveryRadiusKm ||
// //                     2
// //                 );


// //             if(
// //                 distance >
// //                 radius
// //             ){

// //                 return res.json({

// //                     success:false,

// //                     message:
// //                     "Delivery only available within " +
// //                     radius +
// //                     " KM"

// //                 });

// //             }


// // // ======================================================
// // // DOCUMENTS
// // // ======================================================

// //             const documents = [];


// //             for(
// //                 const file
// //                 of
// //                 req.files || []
// //             ){

// //                 let name =
// //                     "Document";


// //                 if(
// //                     file.fieldname ===
// //                     "photocopyPages"
// //                 ){

// //                     name =
// //                         "Photo Copy Page";

// //                 }
// //                 else if(
// //                     file.fieldname
// //                     .startsWith(
// //                         "doc_"
// //                     )
// //                 ){

// //                     const index =
// //                         file.fieldname
// //                         .replace(
// //                             "doc_",
// //                             ""
// //                         );


// //                     name =
// //                         req.body[
// //                             "docName_" +
// //                             index
// //                         ]
// //                         ||
// //                         "Document";

// //                 }


// //                 documents.push({

// //                     documentName:
// //                         name,

// //                     fileName:
// //                         file.filename,

// //                     originalName:
// //                         file.originalname

// //                 });

// //             }


// // // ======================================================
// // // AMOUNT
// // // ======================================================

// //             const copies =
// //                 Math.max(
// //                     1,
// //                     Number(
// //                         req.body.copies ||
// //                         1
// //                     )
// //                 );


// //             let serviceAmount =
// //                 Number(
// //                     service.price ||
// //                     0
// //                 );


// //             if(
// //                 service.type ===
// //                 "photocopy"
// //             ){

// //                 const pageCount =
// //                     documents.length ||
// //                     1;

// //                 serviceAmount =
// //                     Number(
// //                         service.price
// //                     )
// //                     *
// //                     pageCount
// //                     *
// //                     copies;

// //             }


// //             const deliveryCharge =
// //                 Number(
// //                     setting
// //                     ?.deliveryCharge ||
// //                     0
// //                 );


// //             const totalAmount =
// //                 serviceAmount +
// //                 deliveryCharge;


// //             const orderId =
// //                 await createOrderId();


// //             const paymentOrder =
// //                 await razorpay
// //                     .orders
// //                     .create({

// //                         amount:
// //                             Math.round(
// //                                 totalAmount *
// //                                 100
// //                             ),

// //                         currency:
// //                             "INR",

// //                         receipt:
// //                             orderId

// //                     });


// //             const order =
// //                 new QuickOrder({

// //                     orderId,

// //                     customerName:
// //                         req.body
// //                         .customerName,

// //                     phone:
// //                         req.body.phone,

// //                     address:
// //                         req.body.address,

// //                     latitude,

// //                     longitude,

// //                     distanceKm:
// //                         Number(
// //                             distance
// //                             .toFixed(2)
// //                         ),

// //                     serviceId:
// //                         service._id,

// //                     serviceName:
// //                         service.name,

// //                     serviceType:
// //                         service.type,

// //                     documents,

// //                     copies,

// //                     printType:
// //                         req.body
// //                         .printType ||
// //                         "Black & White",

// //                     serviceAmount,

// //                     deliveryCharge,

// //                     totalAmount,

// //                     razorpayOrderId:
// //                         paymentOrder.id,

// //                     paymentStatus:
// //                         "PENDING",

// //                     status:
// //                         "NEW"

// //                 });


// //             await order.save();


// //             return res.json({

// //                 success:true,

// //                 key:
// //                     process.env
// //                     .RAZORPAY_KEY_ID,

// //                 orderId:
// //                     order._id,

// //                 orderNumber:
// //                     order.orderId,

// //                 serviceName:
// //                     service.name,

// //                 razorpayOrderId:
// //                     paymentOrder.id,

// //                 amount:
// //                     paymentOrder.amount

// //             });

// //         }
// //         catch(err){

// //             console.error(
// //                 "CREATE QUICK ORDER:",
// //                 err
// //             );

// //             return res
// //                 .status(500)
// //                 .json({

// //                     success:false,

// //                     message:
// //                         err.message

// //                 });

// //         }

// //     }
// // );


// // // ======================================================
// // // VERIFY PAYMENT
// // // ======================================================

// // router.post(
// //     "/quick-service/verify-payment",
// //     async(req,res)=>{

// //         try{

// //             const {

// //                 orderId,

// //                 razorpay_order_id,

// //                 razorpay_payment_id,

// //                 razorpay_signature

// //             } = req.body;


// //             const body =
// //                 razorpay_order_id +
// //                 "|" +
// //                 razorpay_payment_id;


// //             const expected =
// //                 crypto
// //                 .createHmac(
// //                     "sha256",
// //                     process.env
// //                     .RAZORPAY_KEY_SECRET
// //                 )
// //                 .update(body)
// //                 .digest("hex");


// //             if(
// //                 expected !==
// //                 razorpay_signature
// //             ){

// //                 return res.json({

// //                     success:false

// //                 });

// //             }


// //             const order =
// //                 await QuickOrder
// //                     .findByIdAndUpdate(

// //                         orderId,

// //                         {

// //                             paymentStatus:
// //                                 "PAID",

// //                             razorpayPaymentId:
// //                                 razorpay_payment_id,

// //                             status:
// //                                 "NEW"

// //                         },

// //                         {
// //                             new:true
// //                         }

// //                     );


// //             return res.json({

// //                 success:true,

// //                 orderNumber:
// //                     order.orderId

// //             });

// //         }
// //         catch(err){

// //             console.error(err);

// //             return res
// //                 .status(500)
// //                 .json({

// //                     success:false

// //                 });

// //         }

// //     }
// // );


// // // ======================================================
// // // SUCCESS PAGE
// // // ======================================================

// // router.get(
// //     "/quick-service/success/:id",
// //     async(req,res)=>{

// //         const order =
// //             await QuickOrder
// //                 .findById(
// //                     req.params.id
// //                 )
// //                 .lean();


// //         if(!order){

// //             return res.send(
// //                 "Order Not Found"
// //             );

// //         }


// //         res.send(`

// // <!DOCTYPE html>

// // <html>

// // <head>

// // <meta name="viewport"
// // content="width=device-width,initial-scale=1">

// // <title>
// // Order Successful
// // </title>

// // </head>

// // <body style="
// // font-family:Arial;
// // background:#f0fdf4;
// // text-align:center;
// // padding:40px;
// // ">

// // <h1>
// // ✅ Payment Successful
// // </h1>

// // <h2>
// // Order:
// // ${order.orderId}
// // </h2>

// // <p>
// // Your order has been received.
// // </p>

// // <a href="/">
// // Back Home
// // </a>

// // </body>

// // </html>

// //         `);

// //     }
// // );


// // // ======================================================
// // // ADMIN DASHBOARD
// // // ======================================================

// // router.get(
// //     "/admin/quick-service",

// //     requireAdmin,

// //     async(req,res)=>{

// //         try{

// //             const orders =
// //                 await QuickOrder
// //                     .find({
// //                         paymentStatus:"PAID"
// //                     })
// //                     .sort({
// //                         createdAt:-1
// //                     })
// //                     .lean();


// //             let setting =
// //                 await QuickShopSetting
// //                     .findOne()
// //                     .lean();


// //             if(!setting){

// //                 setting = {
// //                     isOpen:true,
// //                     deliveryRadiusKm:2,
// //                     deliveryCharge:20
// //                 };

// //             }


// //             res.send(`

// // <!DOCTYPE html>

// // <html>

// // <head>

// // <meta name="viewport"
// // content="width=device-width,initial-scale=1">

// // <title>
// // Quick Service Admin
// // </title>

// // <style>

// // *{
// // box-sizing:border-box;
// // font-family:Arial;
// // }

// // body{
// // margin:0;
// // background:#f1f5f9;
// // }

// // .container{
// // max-width:1100px;
// // margin:auto;
// // padding:20px;
// // }

// // .control{
// // background:white;
// // padding:20px;
// // border-radius:18px;
// // margin-bottom:20px;
// // }

// // .status-open{
// // color:#15803d;
// // }

// // .status-close{
// // color:#dc2626;
// // }

// // button{
// // padding:10px 16px;
// // border:0;
// // border-radius:8px;
// // cursor:pointer;
// // font-weight:bold;
// // }

// // .open{
// // background:#16a34a;
// // color:white;
// // }

// // .close{
// // background:#dc2626;
// // color:white;
// // }

// // .order{
// // background:white;
// // padding:20px;
// // border-radius:18px;
// // margin-bottom:20px;
// // box-shadow:
// // 0 5px 20px
// // rgba(0,0,0,.08);
// // }

// // .documents{
// // display:grid;
// // grid-template-columns:
// // repeat(
// // auto-fit,
// // minmax(180px,1fr)
// // );
// // gap:15px;
// // margin-top:15px;
// // }

// // .document{
// // border:1px solid #ddd;
// // padding:10px;
// // border-radius:12px;
// // }

// // .document img{
// // width:100%;
// // height:180px;
// // object-fit:contain;
// // background:#f8fafc;
// // }

// // .download{
// // display:block;
// // margin-top:8px;
// // padding:9px;
// // text-align:center;
// // background:#2563eb;
// // color:white;
// // text-decoration:none;
// // border-radius:8px;
// // }

// // select{
// // padding:10px;
// // border-radius:8px;
// // }

// // </style>

// // </head>

// // <body>

// // <div class="container">


// // <div class="control">

// // <h2>
// // 🏪 Shop Control
// // </h2>

// // <h3
// // class="${
// // setting.isOpen
// // ?
// // "status-open"
// // :
// // "status-close"
// // }"
// // >

// // ${
// // setting.isOpen
// // ?
// // "🟢 SHOP OPEN"
// // :
// // "🔴 SHOP CLOSED"
// // }

// // </h3>


// // <form
// // action="/admin/quick-service/shop-status"
// // method="POST"
// // style="display:inline"
// // >

// // <input
// // type="hidden"
// // name="isOpen"
// // value="true"
// // >

// // <button class="open">
// // OPEN SHOP
// // </button>

// // </form>


// // <form
// // action="/admin/quick-service/shop-status"
// // method="POST"
// // style="display:inline"
// // >

// // <input
// // type="hidden"
// // name="isOpen"
// // value="false"
// // >

// // <button class="close">
// // CLOSE SHOP
// // </button>

// // </form>


// // <p>
// // Delivery Radius:
// // <strong>
// // ${setting.deliveryRadiusKm} KM
// // </strong>
// // </p>

// // </div>


// // <h2>
// // 📦 Customer Orders
// // </h2>


// // ${
// // orders.length
// // ?

// // orders.map(order=>`

// // <div class="order">

// // <h2>
// // ${order.orderId}
// // </h2>

// // <p>
// // <strong>
// // ${order.serviceName}
// // </strong>
// // </p>

// // <p>
// // 👤 ${order.customerName}
// // </p>

// // <p>
// // 📞
// // <a href="tel:${order.phone}">
// // ${order.phone}
// // </a>
// // </p>

// // <p>
// // 🏠 ${order.address}
// // </p>

// // <p>
// // 📍 Distance:
// // <strong>
// // ${order.distanceKm} KM
// // </strong>
// // </p>

// // <p>
// // 💰 ₹${order.totalAmount}
// // -
// // <strong style="color:green">
// // PAID
// // </strong>
// // </p>

// // <p>
// // Print:
// // ${order.printType}
// // </p>

// // <p>
// // Copies:
// // ${order.copies}
// // </p>


// // <h3>
// // 📄 Customer Documents
// // </h3>


// // <div class="documents">

// // ${
// // (order.documents || [])
// // .map((doc,index)=>`

// // <div class="document">

// // <strong>
// // ${doc.documentName}
// // </strong>

// // <br><br>

// // <img
// // src="/admin/quick-service/document/${order._id}/${index}"
// // onerror="
// // this.style.display='none'
// // "
// // >

// // <a
// // href="/admin/quick-service/document/${order._id}/${index}?download=1"
// // class="download"
// // >

// // ⬇ Download

// // </a>

// // </div>

// // `).join("")
// // }

// // </div>


// // <br>


// // <form
// // method="POST"
// // action="/admin/quick-service/order-status/${order._id}"
// // >

// // <select
// // name="status"
// // >

// // ${[
// // "NEW",
// // "PROCESSING",
// // "READY",
// // "PACKED",
// // "OUT_FOR_DELIVERY",
// // "DELIVERED",
// // "CANCELLED"
// // ]
// // .map(status=>`

// // <option
// // value="${status}"
// // ${order.status === status ? "selected" : ""}
// // >
// // ${status}
// // </option>

// // `).join("")}

// // </select>

// // <button
// // style="
// // background:#0d604b;
// // color:white;
// // "
// // >
// // Update Status
// // </button>

// // </form>


// // </div>

// // `).join("")

// // :

// // "<p>No paid orders yet.</p>"
// // }


// // </div>

// // </body>

// // </html>

// //             `);

// //         }
// //         catch(err){

// //             console.error(err);

// //             res.status(500)
// //             .send(err.message);

// //         }

// //     }
// // );


// // // ======================================================
// // // SHOP OPEN / CLOSE
// // // ======================================================

// // router.post(
// //     "/admin/quick-service/shop-status",

// //     requireAdmin,

// //     async(req,res)=>{

// //         try{

// //             const isOpen =
// //                 req.body.isOpen ===
// //                 "true";


// //             await QuickShopSetting
// //                 .findOneAndUpdate(

// //                     {},

// //                     {
// //                         isOpen,
// //                         updatedAt:
// //                             new Date()
// //                     },

// //                     {
// //                         upsert:true,
// //                         new:true
// //                     }

// //                 );


// //             res.redirect(
// //                 "/admin/quick-service"
// //             );

// //         }
// //         catch(err){

// //             console.error(err);

// //             res.status(500)
// //             .send(err.message);

// //         }

// //     }
// // );


// // // ======================================================
// // // ORDER STATUS
// // // ======================================================

// // router.post(
// //     "/admin/quick-service/order-status/:id",

// //     requireAdmin,

// //     async(req,res)=>{

// //         try{

// //             await QuickOrder
// //                 .findByIdAndUpdate(

// //                     req.params.id,

// //                     {
// //                         status:
// //                             req.body.status
// //                     }

// //                 );


// //             res.redirect(
// //                 "/admin/quick-service"
// //             );

// //         }
// //         catch(err){

// //             console.error(err);

// //             res.status(500)
// //             .send(err.message);

// //         }

// //     }
// // );


// // // ======================================================
// // // PRIVATE DOCUMENT VIEW / DOWNLOAD
// // // ======================================================

// // router.get(
// //     "/admin/quick-service/document/:orderId/:index",

// //     requireAdmin,

// //     async(req,res)=>{

// //         try{

// //             const order =
// //                 await QuickOrder
// //                     .findById(
// //                         req.params.orderId
// //                     );


// //             if(!order){

// //                 return res
// //                     .status(404)
// //                     .send(
// //                         "Order Not Found"
// //                     );

// //             }


// //             const index =
// //                 Number(
// //                     req.params.index
// //                 );


// //             const document =
// //                 order.documents[
// //                     index
// //                 ];


// //             if(!document){

// //                 return res
// //                     .status(404)
// //                     .send(
// //                         "Document Not Found"
// //                     );

// //             }


// //             const file =
// //                 path.join(
// //                     privateFolder,
// //                     document.fileName
// //                 );


// //             if(
// //                 !fs.existsSync(file)
// //             ){

// //                 return res
// //                     .status(404)
// //                     .send(
// //                         "File Not Found"
// //                     );

// //             }


// //             if(
// //                 req.query.download ===
// //                 "1"
// //             ){

// //                 return res.download(

// //                     file,

// //                     document.originalName ||
// //                     document.fileName

// //                 );

// //             }


// //             return res.sendFile(
// //                 file
// //             );

// //         }
// //         catch(err){

// //             console.error(err);

// //             res.status(500)
// //             .send(err.message);

// //         }

// //     }
// // );


// // module.exports = router;


// require("dotenv").config();

// const express = require("express");
// const router = express.Router();

// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const crypto = require("crypto");
// const Razorpay = require("razorpay");

// const QuickService =
//     require("../models/QuickService");

// const QuickOrder =
//     require("../models/QuickOrder");

// const QuickShopSetting =
//     require("../models/QuickShopSetting");


// // ======================================================
// // RAZORPAY
// // ======================================================

// const razorpay =
// new Razorpay({

//     key_id:
//         process.env.RAZORPAY_KEY_ID,

//     key_secret:
//         process.env.RAZORPAY_KEY_SECRET

// });


// // ======================================================
// // PRIVATE DOCUMENT FOLDER
// // ======================================================

// const uploadDirectory =
// path.join(
//     process.cwd(),
//     "storage",
//     "quick-service"
// );

// if(
//     !fs.existsSync(
//         uploadDirectory
//     )
// ){

//     fs.mkdirSync(
//         uploadDirectory,
//         {
//             recursive:true
//         }
//     );

// }


// // ======================================================
// // MULTER
// // ======================================================

// const storage =
// multer.diskStorage({

//     destination:function(
//         req,
//         file,
//         cb
//     ){

//         cb(
//             null,
//             uploadDirectory
//         );

//     },

//     filename:function(
//         req,
//         file,
//         cb
//     ){

//         const extension =
//             path.extname(
//                 file.originalname
//             ).toLowerCase();

//         const fileName =
//             "quick-" +
//             Date.now() +
//             "-" +
//             Math.round(
//                 Math.random() *
//                 1e9
//             ) +
//             extension;

//         cb(
//             null,
//             fileName
//         );

//     }

// });


// const upload =
// multer({

//     storage,

//     limits:{
//         fileSize:
//             8 * 1024 * 1024,

//         files:25
//     },

//     fileFilter:function(
//         req,
//         file,
//         cb
//     ){

//         const allowed = [

//             "image/jpeg",
//             "image/jpg",
//             "image/png",
//             "image/webp",
//             "application/pdf"

//         ];


//         if(
//             !allowed.includes(
//                 file.mimetype
//             )
//         ){

//             return cb(
//                 new Error(
//                     "Only JPG, PNG, WEBP and PDF allowed."
//                 )
//             );

//         }


//         cb(
//             null,
//             true
//         );

//     }

// });


// // ======================================================
// // GET SHOP SETTING
// // ======================================================

// async function getQuickShopSetting(){

//     let setting =
//         await QuickShopSetting
//             .findOne();


//     if(!setting){

//         setting =
//             await QuickShopSetting
//                 .create({

//                     shopName:
//                         "GLOBAL QUICK SERVICES",

//                     isOpen:
//                         false,

//                     deliveryRadiusKm:
//                         2,

//                     deliveryCharge:
//                         20

//                 });

//     }


//     return setting;

// }


// // ======================================================
// // SAFE NUMBER
// // ======================================================

// function safeNumber(
//     value,
//     defaultValue = 0
// ){

//     const number =
//         Number(value);

//     return Number.isFinite(
//         number
//     )
//         ? number
//         : defaultValue;

// }


// // ======================================================
// // VALID GPS
// // ======================================================

// function validCoordinates(
//     latitude,
//     longitude
// ){

//     if(
//         latitude === null ||
//         latitude === undefined ||
//         latitude === "" ||

//         longitude === null ||
//         longitude === undefined ||
//         longitude === ""
//     ){

//         return false;

//     }


//     const lat =
//         Number(latitude);

//     const lng =
//         Number(longitude);


//     return (

//         Number.isFinite(lat) &&

//         Number.isFinite(lng) &&

//         lat >= -90 &&
//         lat <= 90 &&

//         lng >= -180 &&
//         lng <= 180

//     );

// }


// // ======================================================
// // DISTANCE
// // ======================================================

// function calculateDistanceKm(
//     latitude1,
//     longitude1,
//     latitude2,
//     longitude2
// ){

//     const earthRadiusKm =
//         6371;


//     const toRadians =
//         value =>
//             value *
//             Math.PI /
//             180;


//     const latitudeDifference =
//         toRadians(
//             latitude2 -
//             latitude1
//         );


//     const longitudeDifference =
//         toRadians(
//             longitude2 -
//             longitude1
//         );


//     const calculation =

//         Math.sin(
//             latitudeDifference /
//             2
//         ) ** 2

//         +

//         Math.cos(
//             toRadians(
//                 latitude1
//             )
//         )

//         *

//         Math.cos(
//             toRadians(
//                 latitude2
//             )
//         )

//         *

//         Math.sin(
//             longitudeDifference /
//             2
//         ) ** 2;


//     return (

//         earthRadiusKm *

//         2 *

//         Math.atan2(

//             Math.sqrt(
//                 calculation
//             ),

//             Math.sqrt(
//                 1 -
//                 calculation
//             )

//         )

//     );

// }


// // ======================================================
// // ORDER NUMBER
// // ======================================================

// async function generateOrderNumber(){

//     let number =
//         1001;


//     const lastOrder =
//         await QuickOrder
//             .findOne()
//             .sort({
//                 createdAt:-1
//             });


//     if(
//         lastOrder &&
//         lastOrder.orderId
//     ){

//         const oldNumber =
//             Number(

//                 String(
//                     lastOrder.orderId
//                 )
//                 .replace(
//                     "GQ",
//                     ""
//                 )

//             );


//         if(
//             Number.isFinite(
//                 oldNumber
//             )
//         ){

//             number =
//                 oldNumber +
//                 1;

//         }

//     }


//     return (
//         "GQ" +
//         number
//     );

// }


// // ======================================================
// // CUSTOMER PAGE
// // GET /quick-service
// // ======================================================

// router.get(
//     "/quick-service",

//     async(req,res)=>{

//         try{

//             const setting =
//                 await getQuickShopSetting();


//             const services =
//                 await QuickService
//                     .find({
//                         active:true
//                     })
//                     .sort({
//                         createdAt:-1
//                     })
//                     .lean();


//             return res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <meta
// charset="UTF-8"
// >

// <meta
// name="viewport"
// content="width=device-width,initial-scale=1"
// >

// <title>
// GLOBAL QUICK SERVICES
// </title>

// <script
// src="https://checkout.razorpay.com/v1/checkout.js"
// ></script>

// <style>

// *{
// box-sizing:border-box;
// font-family:Arial,sans-serif;
// }

// body{
// margin:0;
// background:#f1f5f9;
// color:#0f172a;
// }

// .header{
// padding:22px;
// text-align:center;
// color:white;
// background:
// linear-gradient(
// 135deg,
// #0d604b,
// #16a34a
// );
// }

// .container{
// max-width:650px;
// margin:auto;
// padding:15px;
// }

// .card{
// background:white;
// padding:20px;
// border-radius:18px;
// box-shadow:
// 0 10px 30px
// rgba(0,0,0,.10);
// }

// .status{
// padding:13px;
// border-radius:12px;
// text-align:center;
// font-weight:bold;
// margin-bottom:18px;
// }

// .status.open{
// background:#dcfce7;
// color:#166534;
// }

// .status.closed{
// background:#fee2e2;
// color:#991b1b;
// }

// label{
// display:block;
// margin-top:15px;
// margin-bottom:6px;
// font-weight:bold;
// }

// input,
// select,
// textarea{
// width:100%;
// padding:13px;
// border:1px solid #cbd5e1;
// border-radius:10px;
// font-size:15px;
// }

// textarea{
// min-height:90px;
// }

// .document-box{
// margin-top:15px;
// padding:15px;
// background:#f8fafc;
// border-radius:13px;
// border:1px solid #dbeafe;
// }

// .location-box{
// margin-top:15px;
// padding:13px;
// border-radius:10px;
// background:#fef3c7;
// color:#92400e;
// font-weight:bold;
// }

// .location-box.success{
// background:#dcfce7;
// color:#166534;
// }

// .location-box.error{
// background:#fee2e2;
// color:#991b1b;
// }

// .location-btn{
// width:100%;
// margin-top:10px;
// padding:13px;
// border:0;
// border-radius:10px;
// background:#f59e0b;
// color:white;
// font-weight:bold;
// }

// .total{
// margin-top:20px;
// padding:15px;
// background:#eff6ff;
// border-radius:12px;
// line-height:1.9;
// }

// .pay-btn{
// width:100%;
// margin-top:20px;
// padding:15px;
// border:0;
// border-radius:10px;
// background:#16a34a;
// color:white;
// font-size:16px;
// font-weight:bold;
// }

// .pay-btn:disabled{
// background:#94a3b8;
// }

// .hidden{
// display:none;
// }

// </style>

// </head>

// <body>


// <div class="header">

// <h2>
// ⚡ GLOBAL QUICK SERVICES
// </h2>

// <p>
// Fast Document Service at Your Doorstep
// </p>

// </div>


// <div class="container">

// <div class="card">


// <div
// class="status ${
// setting.isOpen
// ?
// "open"
// :
// "closed"
// }"
// >

// ${
// setting.isOpen
// ?
// "🟢 SHOP OPEN"
// :
// "🔴 SHOP CLOSED"
// }

// </div>


// <label>
// Select Service
// </label>

// <select
// id="service"
// >

// <option value="">
// Select Service
// </option>

// ${
// services.map(
// service=>`

// <option
// value="${service._id}"
// data-type="${service.type}"
// data-price="${service.price}"
// data-requirements='${JSON.stringify(service.requirements || [])}'
// >

// ${service.name}
// - ₹${service.price}

// </option>

// `
// ).join("")
// }

// </select>


// <div
// id="documentsArea"
// ></div>


// <div
// id="photoCopyOptions"
// class="hidden"
// >

// <label>
// Print Type
// </label>

// <select id="printType">

// <option>
// Black & White
// </option>

// <option>
// Color
// </option>

// </select>


// <label>
// Copies
// </label>

// <input
// type="number"
// id="copies"
// value="1"
// min="1"
// >

// </div>


// <label>
// Customer Name
// </label>

// <input
// type="text"
// id="customerName"
// >


// <label>
// Mobile Number
// </label>

// <input
// type="tel"
// id="mobile"
// maxlength="10"
// >


// <label>
// Delivery Address
// </label>

// <textarea
// id="address"
// ></textarea>


// <div
// id="locationStatus"
// class="location-box"
// >

// 📍 Location check करें

// </div>


// <button
// type="button"
// class="location-btn"
// id="checkLocationButton"
// >
// 📍 CHECK MY LOCATION
// </button>


// <div class="total">

// Service:
// ₹<span id="serviceAmount">0</span>

// <br>

// Delivery:
// ₹${safeNumber(
// setting.deliveryCharge,
// 20
// )}

// <br>

// <strong>
// Total:
// ₹<span id="totalAmount">0</span>
// </strong>

// </div>


// <button
// type="button"
// class="pay-btn"
// id="orderButton"
// onclick="placeOrder()"
// disabled
// >

// CHECK LOCATION FIRST

// </button>


// </div>

// </div>


// <script>

// const SHOP_OPEN =
// ${setting.isOpen ? "true" : "false"};

// const SHOP_LATITUDE =
// ${
// validCoordinates(
// setting.shopLocation?.latitude,
// setting.shopLocation?.longitude
// )
// ?
// Number(
// setting.shopLocation.latitude
// )
// :
// "null"
// };

// const SHOP_LONGITUDE =
// ${
// validCoordinates(
// setting.shopLocation?.latitude,
// setting.shopLocation?.longitude
// )
// ?
// Number(
// setting.shopLocation.longitude
// )
// :
// "null"
// };

// const DELIVERY_RADIUS =
// ${safeNumber(
// setting.deliveryRadiusKm,
// 2
// )};

// const DELIVERY_CHARGE =
// ${safeNumber(
// setting.deliveryCharge,
// 20
// )};


// let customerLatitude =
// null;

// let customerLongitude =
// null;

// let customerAccuracy =
// null;

// let customerDistance =
// null;

// let locationAllowed =
// false;


// const serviceSelect =
// document.getElementById(
//     "service"
// );


// serviceSelect.addEventListener(
// "change",
// function(){

//     const option =
//         this.options[
//             this.selectedIndex
//         ];


//     const documentsArea =
//         document.getElementById(
//             "documentsArea"
//         );


//     const photoCopyOptions =
//         document.getElementById(
//             "photoCopyOptions"
//         );


//     documentsArea.innerHTML =
//         "";


//     photoCopyOptions
//         .classList
//         .add(
//             "hidden"
//         );


//     if(!option.value){

//         document.getElementById(
//             "serviceAmount"
//         ).textContent =
//             "0";

//         document.getElementById(
//             "totalAmount"
//         ).textContent =
//             "0";

//         return;

//     }


//     const price =
//         Number(
//             option.dataset.price ||
//             0
//         );


//     document.getElementById(
//         "serviceAmount"
//     ).textContent =
//         price;


//     document.getElementById(
//         "totalAmount"
//     ).textContent =
//         price +
//         DELIVERY_CHARGE;


//     if(
//         option.dataset.type ===
//         "photocopy"
//     ){

//         photoCopyOptions
//             .classList
//             .remove(
//                 "hidden"
//             );


//         documentsArea.innerHTML = \`

// <div class="document-box">

// <label>
// 📷 Scan / Upload Document Pages
// </label>

// <input
// type="file"
// id="photocopyPages"
// accept="image/*"
// capture="environment"
// multiple
// >

// <p>
// एक से ज्यादा pages select कर सकते हैं।
// </p>

// </div>

//         \`;


//         return;

//     }


//     let requirements =
//         [];


//     try{

//         requirements =
//             JSON.parse(
//                 option.dataset
//                 .requirements ||
//                 "[]"
//             );

//     }
//     catch(error){

//         requirements =
//             [];

//     }


// requirements.forEach(
// function(item,index){

//     const box =
//         document.createElement(
//             "div"
//         );

//     box.className =
//         "document-box";


//     const requiredMark =
//         item.required
//             ? "*"
//             : "";


//     const requiredAttribute =
//         item.required
//             ? "required"
//             : "";


//     box.innerHTML =

//         '<label>' +

//         '📷 ' +
//         item.name +
//         requiredMark +

//         '</label>' +

//         '<input ' +

//         'type="file" ' +

//         'id="doc_' +
//         index +
//         '" ' +

//         'data-doc-name="' +
//         item.name +
//         '" ' +

//         'accept="image/*" ' +

//         'capture="environment" ' +

//         requiredAttribute +

//         '>';


//     documentsArea.appendChild(
//         box
//     );

// });

// function calculateDistanceKm(
// lat1,
// lon1,
// lat2,
// lon2
// ){

//     const R =
//         6371;


//     const rad =
//         value =>
//             value *
//             Math.PI /
//             180;


//     const dLat =
//         rad(
//             lat2 -
//             lat1
//         );


//     const dLon =
//         rad(
//             lon2 -
//             lon1
//         );


//     const a =

//         Math.sin(
//             dLat / 2
//         ) ** 2

//         +

//         Math.cos(
//             rad(lat1)
//         )

//         *

//         Math.cos(
//             rad(lat2)
//         )

//         *

//         Math.sin(
//             dLon / 2
//         ) ** 2;


//     return (

//         R *

//         2 *

//         Math.atan2(
//             Math.sqrt(a),
//             Math.sqrt(1-a)
//         )

//     );

// }


// function checkLocation(){

//     const box =
//         document.getElementById(
//             "locationStatus"
//         );


//     const button =
//         document.getElementById(
//             "orderButton"
//         );


//     locationAllowed =
//         false;


//     button.disabled =
//         true;


//     if(!SHOP_OPEN){

//         box.className =
//             "location-box error";

//         box.innerHTML =
//             "🔴 Shop अभी Closed है।";

//         button.textContent =
//             "SHOP CLOSED";

//         return;

//     }


//     if(
//         SHOP_LATITUDE === null ||
//         SHOP_LONGITUDE === null
//     ){

//         box.className =
//             "location-box error";

//         box.innerHTML =
//             "❌ Shop Location save नहीं है।";

//         return;

//     }


//     if(
//         !navigator.geolocation
//     ){

//         box.className =
//             "location-box error";

//         box.innerHTML =
//             "❌ GPS support नहीं है।";

//         return;

//     }


//     box.innerHTML =
//         "📍 Location check हो रही है...";


//     navigator.geolocation
//     .getCurrentPosition(

//     function(position){

//         customerLatitude =
//             position.coords.latitude;

//         customerLongitude =
//             position.coords.longitude;

//         customerAccuracy =
//             position.coords.accuracy;


//         customerDistance =
//             calculateDistanceKm(

//                 SHOP_LATITUDE,

//                 SHOP_LONGITUDE,

//                 customerLatitude,

//                 customerLongitude

//             );


//         if(
//             customerDistance <=
//             DELIVERY_RADIUS
//         ){

//             locationAllowed =
//                 true;


//             box.className =
//                 "location-box success";


//             box.innerHTML =

//                 "✅ DELIVERY AVAILABLE" +

//                 "<br>" +

//                 "Distance: " +

//                 customerDistance
//                 .toFixed(2) +

//                 " KM";


//             button.disabled =
//                 false;


//             button.textContent =
//                 "CONTINUE TO PAYMENT";

//         }
//         else{

//             box.className =
//                 "location-box error";


//             box.innerHTML =

//                 "❌ Delivery Available नहीं है." +

//                 "<br>" +

//                 "Distance: " +

//                 customerDistance
//                 .toFixed(2) +

//                 " KM" +

//                 "<br>" +

//                 "Maximum Radius: " +

//                 DELIVERY_RADIUS +

//                 " KM";


//             button.disabled =
//                 true;


//             button.textContent =
//                 "OUTSIDE DELIVERY AREA";

//         }

//     },

//     function(error){

//         console.error(
//             error
//         );


//         box.className =
//             "location-box error";


//         box.innerHTML =
//             "❌ Location Permission Allow करें.";

//     },

//     {

//         enableHighAccuracy:
//             true,

//         timeout:
//             20000,

//         maximumAge:
//             0

//     }

//     );

// }


// async function placeOrder(){

//     if(
//         !SHOP_OPEN ||
//         !locationAllowed
//     ){

//         return;

//     }


//     const serviceId =
//         serviceSelect.value;


//     if(!serviceId){

//         alert(
//             "Service select करें."
//         );

//         return;

//     }


//     const customerName =
//         document
//         .getElementById(
//             "customerName"
//         )
//         .value
//         .trim();


//     const mobile =
//         document
//         .getElementById(
//             "mobile"
//         )
//         .value
//         .trim();


//     const address =
//         document
//         .getElementById(
//             "address"
//         )
//         .value
//         .trim();


//     if(
//         !customerName ||
//         !mobile ||
//         !address
//     ){

//         alert(
//             "Name, Mobile और Address जरूरी है."
//         );

//         return;

//     }


//     const formData =
//         new FormData();


//     formData.append(
//         "serviceId",
//         serviceId
//     );


//     formData.append(
//         "customerName",
//         customerName
//     );


//     formData.append(
//         "mobile",
//         mobile
//     );


//     formData.append(
//         "address",
//         address
//     );


//     formData.append(
//         "latitude",
//         customerLatitude
//     );


//     formData.append(
//         "longitude",
//         customerLongitude
//     );


//     formData.append(
//         "accuracy",
//         customerAccuracy || ""
//     );


//     formData.append(
//         "copies",
//         document
//         .getElementById(
//             "copies"
//         )
//         ?.value ||
//         1
//     );


//     formData.append(
//         "printType",
//         document
//         .getElementById(
//             "printType"
//         )
//         ?.value ||
//         "Black & White"
//     );


//     const option =
//         serviceSelect.options[
//             serviceSelect.selectedIndex
//         ];


//     if(
//         option.dataset.type ===
//         "photocopy"
//     ){

//         const input =
//             document.getElementById(
//                 "photocopyPages"
//             );


//         if(
//             !input ||
//             !input.files.length
//         ){

//             alert(
//                 "Document image upload करें."
//             );

//             return;

//         }


//         Array.from(
//             input.files
//         )
//         .forEach(
//         function(file){

//             formData.append(
//                 "photocopyPages",
//                 file
//             );

//         });

//     }
//     else{

//         const documentInputs =
//             document.querySelectorAll(
//                 '[id^="doc_"]'
//             );


//         for(
//             const input
//             of documentInputs
//         ){

//             if(
//                 input.required &&
//                 !input.files.length
//             ){

//                 alert(
//                     input.dataset.docName +
//                     " upload करें."
//                 );

//                 return;

//             }


//             if(
//                 input.files.length
//             ){

//                 formData.append(
//                     input.id,
//                     input.files[0]
//                 );


//                 formData.append(
//                     "name_" +
//                     input.id,
//                     input.dataset.docName
//                 );

//             }

//         }

//     }


//     const button =
//         document.getElementById(
//             "orderButton"
//         );


//     button.disabled =
//         true;


//     button.textContent =
//         "PLEASE WAIT...";


//     try{

//         const response =
//             await fetch(
//                 "/quick-service/create-order",
//                 {
//                     method:"POST",
//                     body:formData
//                 }
//             );


//         const data =
//             await response.json();


//         if(!data.success){

//             alert(
//                 data.message
//             );


//             button.disabled =
//                 false;


//             button.textContent =
//                 "CONTINUE TO PAYMENT";


//             return;

//         }


//         const options = {

//             key:
//                 data.key,

//             amount:
//                 data.amount,

//             currency:
//                 "INR",

//             name:
//                 "GLOBAL QUICK SERVICES",

//             description:
//                 data.serviceName,

//             order_id:
//                 data.razorpayOrderId,

//             handler:
//             async function(response){

//                 const verify =
//                     await fetch(
//                         "/quick-service/verify-payment",
//                         {

//                             method:"POST",

//                             headers:{
//                                 "Content-Type":
//                                 "application/json"
//                             },

//                             body:
//                             JSON.stringify({

//                                 orderId:
//                                     data.orderId,

//                                 razorpay_order_id:
//                                     response
//                                     .razorpay_order_id,

//                                 razorpay_payment_id:
//                                     response
//                                     .razorpay_payment_id,

//                                 razorpay_signature:
//                                     response
//                                     .razorpay_signature

//                             })

//                         }
//                     );


//                 const result =
//                     await verify.json();


//                 if(
//                     result.success
//                 ){

//                     window.location.href =
//                         "/quick-service/success/" +
//                         data.orderId;

//                 }
//                 else{

//                     alert(
//                         "Payment verification failed"
//                     );

//                 }

//             }

//         };


//         const razorpayObject =
//             new Razorpay(
//                 options
//             );


//         razorpayObject.open();


//     }
//     catch(error){

//         console.error(
//             error
//         );


//         alert(
//             "Order create नहीं हुआ."
//         );


//         button.disabled =
//             false;


//         button.textContent =
//             "CONTINUE TO PAYMENT";

//     }

// }

// </script>


// </body>

// </html>

//             `);

//         }
//         catch(error){

//             console.error(
//                 "QUICK SERVICE PAGE ERROR:",
//                 error
//             );


//             res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );


// // ======================================================
// // CREATE ORDER
// // ======================================================

// router.post(
//     "/quick-service/create-order",

//     upload.any(),

//     async(req,res)=>{

//         try{

//             const setting =
//                 await getQuickShopSetting();


//             if(
//                 !setting.isOpen
//             ){

//                 return res
//                 .status(400)
//                 .json({

//                     success:false,

//                     message:
//                         "Shop अभी Closed है."

//                 });

//             }


//             const service =
//                 await QuickService
//                 .findById(
//                     req.body.serviceId
//                 );


//             if(
//                 !service ||
//                 !service.active
//             ){

//                 return res
//                 .status(404)
//                 .json({

//                     success:false,

//                     message:
//                         "Service available नहीं है."

//                 });

//             }


//             if(
//                 !validCoordinates(
//                     req.body.latitude,
//                     req.body.longitude
//                 )
//             ){

//                 return res
//                 .status(400)
//                 .json({

//                     success:false,

//                     message:
//                         "Customer Location required."

//                 });

//             }


//             if(
//                 !validCoordinates(
//                     setting
//                     .shopLocation
//                     ?.latitude,

//                     setting
//                     .shopLocation
//                     ?.longitude
//                 )
//             ){

//                 return res
//                 .status(400)
//                 .json({

//                     success:false,

//                     message:
//                         "Shop Location available नहीं है."

//                 });

//             }


//             const customerLatitude =
//                 Number(
//                     req.body.latitude
//                 );


//             const customerLongitude =
//                 Number(
//                     req.body.longitude
//                 );


//             const distance =
//                 calculateDistanceKm(

//                     Number(
//                         setting
//                         .shopLocation
//                         .latitude
//                     ),

//                     Number(
//                         setting
//                         .shopLocation
//                         .longitude
//                     ),

//                     customerLatitude,

//                     customerLongitude

//                 );


//             const radius =
//                 safeNumber(
//                     setting
//                     .deliveryRadiusKm,
//                     2
//                 );


//             if(
//                 distance >
//                 radius
//             ){

//                 return res
//                 .status(400)
//                 .json({

//                     success:false,

//                     message:
//                         "Delivery केवल " +
//                         radius +
//                         " KM तक available है."

//                 });

//             }


// // ======================================================
// // DOCUMENTS
// // ======================================================

//             const documents =
//                 [];


//             for(
//                 const file
//                 of
//                 req.files || []
//             ){

//                 let documentName =
//                     "Document";


//                 if(
//                     file.fieldname ===
//                     "photocopyPages"
//                 ){

//                     documentName =
//                         "Photo Copy Page";

//                 }
//                 else{

//                     documentName =
//                         req.body[
//                             "name_" +
//                             file.fieldname
//                         ]
//                         ||
//                         "Document";

//                 }


//                 documents.push({

//                     documentName,

//                     fileName:
//                         file.filename,

//                     originalName:
//                         file.originalname,

//                     mimeType:
//                         file.mimetype

//                 });

//             }


// // ======================================================
// // AMOUNT
// // ======================================================

//             const copies =
//                 Math.max(

//                     1,

//                     safeNumber(
//                         req.body.copies,
//                         1
//                     )

//                 );


//             let serviceAmount =
//                 safeNumber(
//                     service.price,
//                     0
//                 );


//             if(
//                 service.type ===
//                 "photocopy"
//             ){

//                 const pages =
//                     documents.length ||
//                     1;


//                 serviceAmount =

//                     safeNumber(
//                         service.price,
//                         0
//                     )

//                     *

//                     pages

//                     *

//                     copies;

//             }


//             const deliveryCharge =
//                 safeNumber(
//                     setting.deliveryCharge,
//                     0
//                 );


//             const totalAmount =
//                 serviceAmount +
//                 deliveryCharge;


//             const orderId =
//                 await generateOrderNumber();


// // ======================================================
// // RAZORPAY ORDER
// // ======================================================

//             const razorpayOrder =
//                 await razorpay
//                 .orders
//                 .create({

//                     amount:
//                         Math.round(
//                             totalAmount *
//                             100
//                         ),

//                     currency:
//                         "INR",

//                     receipt:
//                         orderId

//                 });


// // ======================================================
// // SAVE ORDER
// // ======================================================

//             const order =
//                 await QuickOrder
//                 .create({

//                     orderId,

//                     customerName:
//                         String(
//                             req.body.customerName ||
//                             ""
//                         ).trim(),

//                     mobile:
//                         String(
//                             req.body.mobile ||
//                             ""
//                         ).trim(),

//                     address:
//                         String(
//                             req.body.address ||
//                             ""
//                         ).trim(),

//                     customerLocation:{

//                         latitude:
//                             customerLatitude,

//                         longitude:
//                             customerLongitude,

//                         accuracy:
//                             safeNumber(
//                                 req.body.accuracy,
//                                 0
//                             )

//                     },

//                     distanceFromShopKm:
//                         Number(
//                             distance
//                             .toFixed(2)
//                         ),

//                     serviceId:
//                         service._id,

//                     serviceName:
//                         service.name,

//                     serviceType:
//                         service.type,

//                     documents,

//                     copies,

//                     printType:
//                         req.body
//                         .printType ||
//                         "Black & White",

//                     serviceAmount,

//                     deliveryCharge,

//                     totalAmount,

//                     paymentStatus:
//                         "Pending",

//                     razorpayOrderId:
//                         razorpayOrder.id,

//                     status:
//                         "Pending"

//                 });


//             return res.json({

//                 success:true,

//                 key:
//                     process.env
//                     .RAZORPAY_KEY_ID,

//                 orderId:
//                     order._id,

//                 orderNumber:
//                     order.orderId,

//                 serviceName:
//                     order.serviceName,

//                 amount:
//                     razorpayOrder.amount,

//                 razorpayOrderId:
//                     razorpayOrder.id

//             });

//         }
//         catch(error){

//             console.error(
//                 "CREATE QUICK ORDER ERROR:",
//                 error
//             );


//             return res
//             .status(500)
//             .json({

//                 success:false,

//                 message:
//                     error.message

//             });

//         }

//     }
// );


// // ======================================================
// // VERIFY PAYMENT
// // ======================================================

// router.post(
//     "/quick-service/verify-payment",

//     async(req,res)=>{

//         try{

//             const {

//                 orderId,

//                 razorpay_order_id,

//                 razorpay_payment_id,

//                 razorpay_signature

//             } = req.body;


//             const body =

//                 razorpay_order_id +

//                 "|" +

//                 razorpay_payment_id;


//             const expectedSignature =

//                 crypto

//                 .createHmac(
//                     "sha256",
//                     process.env
//                     .RAZORPAY_KEY_SECRET
//                 )

//                 .update(
//                     body
//                 )

//                 .digest(
//                     "hex"
//                 );


//             if(
//                 expectedSignature !==
//                 razorpay_signature
//             ){

//                 return res
//                 .status(400)
//                 .json({

//                     success:false,

//                     message:
//                         "Invalid Payment Signature"

//                 });

//             }


//             const order =
//                 await QuickOrder
//                 .findByIdAndUpdate(

//                     orderId,

//                     {

//                         paymentStatus:
//                             "Paid",

//                         razorpayPaymentId:
//                             razorpay_payment_id,

//                         status:
//                             "Pending"

//                     },

//                     {
//                         new:true
//                     }

//                 );


//             return res.json({

//                 success:true,

//                 orderNumber:
//                     order.orderId

//             });

//         }
//         catch(error){

//             console.error(
//                 "VERIFY PAYMENT ERROR:",
//                 error
//             );


//             return res
//             .status(500)
//             .json({

//                 success:false

//             });

//         }

//     }
// );


// // ======================================================
// // SUCCESS PAGE
// // ======================================================

// router.get(
//     "/quick-service/success/:id",

//     async(req,res)=>{

//         const order =
//             await QuickOrder
//             .findById(
//                 req.params.id
//             )
//             .lean();


//         if(!order){

//             return res
//             .status(404)
//             .send(
//                 "Order Not Found"
//             );

//         }


//         return res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <meta
// name="viewport"
// content="width=device-width,initial-scale=1"
// >

// <title>
// Order Successful
// </title>

// </head>


// <body style="
// font-family:Arial;
// background:#f0fdf4;
// padding:40px;
// text-align:center;
// ">

// <h1>
// ✅ PAYMENT SUCCESSFUL
// </h1>

// <h2>
// ${order.orderId}
// </h2>

// <p>
// आपका Order मिल गया है।
// </p>

// <p>
// Service:
// <strong>
// ${order.serviceName}
// </strong>
// </p>

// <p>
// Amount:
// <strong>
// ₹${order.totalAmount}
// </strong>
// </p>

// <a href="/">
// HOME
// </a>

// </body>

// </html>

//         `);

//     }
// );


// // ======================================================
// // ADMIN SHOP STATUS
// // GET /admin/quick-service/shop-status
// // ======================================================

// router.get(
//     "/admin/quick-service/shop-status",

//     async(req,res)=>{

//         try{

//             const setting =
//                 await getQuickShopSetting();


//             const locationSaved =
//                 validCoordinates(

//                     setting
//                     .shopLocation
//                     ?.latitude,

//                     setting
//                     .shopLocation
//                     ?.longitude

//                 );


//             return res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <meta
// name="viewport"
// content="width=device-width,initial-scale=1"
// >

// <title>
// Quick Service Shop Control
// </title>

// <style>

// *{
// box-sizing:border-box;
// font-family:Arial;
// }

// body{
// margin:0;
// padding:20px;
// background:#f1f5f9;
// }

// .card{
// max-width:470px;
// margin:30px auto;
// padding:25px;
// background:white;
// border-radius:20px;
// text-align:center;
// box-shadow:
// 0 15px 45px
// rgba(0,0,0,.12);
// }

// .status{
// padding:15px;
// margin:20px 0;
// border-radius:12px;
// font-size:20px;
// font-weight:bold;
// }

// .open{
// background:#dcfce7;
// color:#166534;
// }

// .closed{
// background:#fee2e2;
// color:#991b1b;
// }

// .setting{
// padding:15px;
// background:#f8fafc;
// border-radius:12px;
// text-align:left;
// line-height:1.9;
// }

// button{
// width:100%;
// padding:15px;
// margin-top:18px;
// border:0;
// border-radius:12px;
// color:white;
// font-weight:bold;
// font-size:16px;
// }

// .open-btn{
// background:#16a34a;
// }

// .close-btn{
// background:#dc2626;
// }

// .links a{
// display:block;
// margin-top:10px;
// padding:12px;
// background:#2563eb;
// color:white;
// text-decoration:none;
// border-radius:10px;
// }

// </style>

// </head>


// <body>

// <div class="card">

// <h1>
// ⚡ GLOBAL QUICK SERVICES
// </h1>


// <div
// class="status ${
// setting.isOpen
// ?
// "open"
// :
// "closed"
// }"
// >

// ${
// setting.isOpen
// ?
// "🟢 SHOP OPEN"
// :
// "🔴 SHOP CLOSED"
// }

// </div>


// <div class="setting">

// 📦 Delivery Radius:
// <strong>
// ${safeNumber(
// setting.deliveryRadiusKm,
// 2
// )} KM
// </strong>

// <br>

// 💵 Delivery Charge:
// <strong>
// ₹${safeNumber(
// setting.deliveryCharge,
// 20
// )}
// </strong>

// <br>

// 📍 Shop Location:
// <strong>
// ${
// locationSaved
// ?
// "Saved ✅"
// :
// "Not Saved ❌"
// }
// </strong>

// </div>


// <form
// method="POST"
// action="/admin/quick-service/toggle-shop"
// id="toggleForm"
// >

// <input
// type="hidden"
// name="latitude"
// id="latitude"
// >

// <input
// type="hidden"
// name="longitude"
// id="longitude"
// >

// <input
// type="hidden"
// name="accuracy"
// id="accuracy"
// >


// <button
// type="button"
// id="toggleButton"
// class="${
// setting.isOpen
// ?
// "close-btn"
// :
// "open-btn"
// }"
// >

// ${
// setting.isOpen
// ?
// "🔴 CLOSE SHOP"
// :
// "🟢 OPEN SHOP WITH LOCATION"
// }

// </button>

// </form>


// <p
// id="locationMessage"
// >

// ${
// setting.isOpen
// ?
// "✅ 2 KM के अंदर Customer order कर सकते हैं."
// :
// "Shop Open करने के लिए GPS Location Allow करें."
// }

// </p>


// <div class="links">

//     <a href="/admin/quick-service/orders">
//         🔔 ORDERS
//     </a>

//     <a href="/admin/quick-service/services">
//         🛠 MANAGE SERVICES
//     </a>

//     <a href="/quick-service">
//         👤 CUSTOMER PAGE
//     </a>

// </div>


// </div>


// <div class="setting">

// 📦 Delivery Radius:
// <strong>
// ${safeNumber(
// setting.deliveryRadiusKm,
// 2
// )} KM
// </strong>

// <br>

// 💵 Delivery Charge:
// <strong>
// ₹${safeNumber(
// setting.deliveryCharge,
// 20
// )}
// </strong>

// <br>

// 📍 Shop Location:
// <strong>
// ${
// locationSaved
// ?
// "Saved ✅"
// :
// "Not Saved ❌"
// }
// </strong>

// </div>


// <form
// method="POST"
// action="/admin/quick-service/toggle-shop"
// id="toggleForm"
// >

// <input
// type="hidden"
// name="latitude"
// id="latitude"
// >

// <input
// type="hidden"
// name="longitude"
// id="longitude"
// >

// <input
// type="hidden"
// name="accuracy"
// id="accuracy"
// >


// <button
// type="button"
// id="toggleButton"
// class="${
// setting.isOpen
// ?
// "close-btn"
// :
// "open-btn"
// }"
// >

// ${
// setting.isOpen
// ?
// "🔴 CLOSE SHOP"
// :
// "🟢 OPEN SHOP WITH LOCATION"
// }

// </button>

// </form>


// <p
// id="locationMessage"
// >

// ${
// setting.isOpen
// ?
// "✅ 2 KM के अंदर Customer order कर सकते हैं."
// :
// "Shop Open करने के लिए GPS Location Allow करें."
// }

// </p>


// <div class="links">

// <a href="/admin/quick-service/orders">
// 🔔 ORDERS
// </a>

// <a href="/quick-service">
// 👤 CUSTOMER PAGE
// </a>

// </div>

// </div>


// <script>

// const SHOP_OPEN =
// ${setting.isOpen ? "true" : "false"};


// const button =
// document.getElementById(
//     "toggleButton"
// );


// const form =
// document.getElementById(
//     "toggleForm"
// );


// const message =
// document.getElementById(
//     "locationMessage"
// );


// button.addEventListener(
// "click",
// function(){

//     if(SHOP_OPEN){

//         button.disabled =
//             true;

//         button.textContent =
//             "CLOSING SHOP...";

//         form.submit();

//         return;

//     }


//     if(
//         !navigator.geolocation
//     ){

//         alert(
//             "GPS support नहीं है."
//         );

//         return;

//     }


//     button.disabled =
//         true;


//     button.textContent =
//         "📍 GETTING LOCATION...";


//     navigator.geolocation
//     .getCurrentPosition(

//     function(position){

//         document
//         .getElementById(
//             "latitude"
//         )
//         .value =
//             position.coords
//             .latitude;


//         document
//         .getElementById(
//             "longitude"
//         )
//         .value =
//             position.coords
//             .longitude;


//         document
//         .getElementById(
//             "accuracy"
//         )
//         .value =
//             position.coords
//             .accuracy;


//         message.innerHTML =
//             "✅ Location मिली. Shop Open हो रही है...";


//         form.submit();

//     },

//     function(error){

//         console.error(
//             error
//         );


//         button.disabled =
//             false;


//         button.textContent =
//             "🟢 OPEN SHOP WITH LOCATION";


//         message.innerHTML =
//             "❌ Location Permission Allow करें.";

//     },

//     {

//         enableHighAccuracy:
//             true,

//         timeout:
//             20000,

//         maximumAge:
//             0

//     }

//     );

// });

// </script>


// </body>

// </html>

//             `);

//         }
//         catch(error){

//             console.error(
//                 error
//             );

//             res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );


// // ======================================================
// // TOGGLE SHOP
// // ======================================================

// router.post(
//     "/admin/quick-service/toggle-shop",

//     async(req,res)=>{

//         try{

//             const setting =
//                 await getQuickShopSetting();


//             const nextStatus =
//                 !setting.isOpen;


//             if(nextStatus){

//                 const {

//                     latitude,

//                     longitude,

//                     accuracy

//                 } = req.body;


//                 if(
//                     !validCoordinates(
//                         latitude,
//                         longitude
//                     )
//                 ){

//                     return res
//                     .status(400)
//                     .send(
//                         "Shop Open करने के लिए GPS Location जरूरी है."
//                     );

//                 }


//                 setting.shopLocation = {

//                     latitude:
//                         Number(
//                             latitude
//                         ),

//                     longitude:
//                         Number(
//                             longitude
//                         ),

//                     accuracy:
//                         safeNumber(
//                             accuracy,
//                             0
//                         ),

//                     updatedAt:
//                         new Date()

//                 };


//                 setting.deliveryRadiusKm =
//                     2;

//             }


//             setting.isOpen =
//                 nextStatus;


//             await setting.save();


//             return res.redirect(
//                 "/admin/quick-service/shop-status"
//             );

//         }
//         catch(error){

//             console.error(
//                 error
//             );


//             return res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );


// // ======================================================
// // ADMIN ORDERS
// // ======================================================

// router.get(
//     "/admin/quick-service/orders",

//     async(req,res)=>{

//         try{

//             const orders =
//                 await QuickOrder
//                 .find({
//                     paymentStatus:"Paid"
//                 })
//                 .sort({
//                     createdAt:-1
//                 })
//                 .lean();


//             const statuses = [

//                 "Pending",

//                 "Accepted",

//                 "Processing",

//                 "Ready",

//                 "Packed",

//                 "Out for Delivery",

//                 "Delivered",

//                 "Cancelled"

//             ];


//             return res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <meta
// name="viewport"
// content="width=device-width,initial-scale=1"
// >

// <title>
// Quick Service Orders
// </title>

// <style>

// *{
// box-sizing:border-box;
// font-family:Arial;
// }

// body{
// margin:0;
// background:#f1f5f9;
// }

// .container{
// max-width:1100px;
// margin:auto;
// padding:20px;
// }

// .order{
// background:white;
// padding:20px;
// margin-bottom:20px;
// border-radius:18px;
// box-shadow:
// 0 8px 25px
// rgba(0,0,0,.08);
// }

// .documents{
// display:grid;
// grid-template-columns:
// repeat(
// auto-fit,
// minmax(180px,1fr)
// );
// gap:12px;
// }

// .document{
// padding:10px;
// border:1px solid #ddd;
// border-radius:12px;
// }

// .document img{
// width:100%;
// height:190px;
// object-fit:contain;
// background:#f8fafc;
// }

// .download{
// display:block;
// margin-top:8px;
// padding:10px;
// border-radius:8px;
// background:#2563eb;
// color:white;
// text-align:center;
// text-decoration:none;
// }

// select,
// button{
// padding:10px;
// border-radius:8px;
// }

// .status-btn{
// background:#16a34a;
// color:white;
// border:0;
// }

// </style>

// </head>


// <body>

// <div class="container">

// <h1>
// 🔔 Quick Service Orders
// </h1>

// <p>

// <a href="/admin/quick-service/shop-status">
// ← Shop Control
// </a>

// </p>


// ${
// orders.length
// ?

// orders.map(
// order=>`

// <div class="order">

// <h2>
// #${order.orderId}
// </h2>

// <p>
// <strong>
// ${order.serviceName}
// </strong>
// </p>

// <p>
// 👤 ${order.customerName}
// </p>

// <p>
// 📞
// <a href="tel:${order.mobile}">
// ${order.mobile}
// </a>
// </p>

// <p>
// 🏠 ${order.address}
// </p>

// <p>
// 📍 Distance:
// <strong>
// ${order.distanceFromShopKm} KM
// </strong>
// </p>

// <p>
// 💰 Total:
// <strong>
// ₹${order.totalAmount}
// </strong>
// </p>

// <p>
// Payment:
// <strong style="color:green">
// ${order.paymentStatus}
// </strong>
// </p>

// <p>
// Copies:
// ${order.copies}
// </p>

// <p>
// Print:
// ${order.printType}
// </p>


// <h3>
// 📄 Customer Documents
// </h3>


// <div class="documents">

// ${
// (order.documents || [])
// .map(
// (doc,index)=>`

// <div class="document">

// <strong>
// ${doc.documentName}
// </strong>

// <br><br>

// ${
// doc.mimeType ===
// "application/pdf"

// ?

// `
// <div
// style="
// padding:50px 10px;
// text-align:center;
// background:#fee2e2;
// "
// >
// 📄 PDF DOCUMENT
// </div>
// `

// :

// `
// <img
// src="/admin/quick-service/document/${order._id}/${index}"
// >
// `
// }

// <a
// href="/admin/quick-service/document/${order._id}/${index}?download=1"
// class="download"
// >

// ⬇ DOWNLOAD

// </a>

// </div>

// `
// ).join("")
// }

// </div>


// <br>


// <form
// method="POST"
// action="/admin/quick-service/order/${order._id}/status"
// >

// <select name="status">

// ${
// statuses.map(
// status=>`

// <option
// value="${status}"
// ${
// order.status ===
// status
// ?
// "selected"
// :
// ""
// }
// >

// ${status}

// </option>

// `
// ).join("")
// }

// </select>


// <button
// class="status-btn"
// >

// UPDATE STATUS

// </button>

// </form>


// </div>

// `
// ).join("")

// :

// `
// <p>
// अभी कोई Paid Order नहीं है।
// </p>
// `
// }

// </div>

// </body>

// </html>

//             `);

//         }
//         catch(error){

//             console.error(
//                 error
//             );


//             res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );


// // ======================================================
// // UPDATE ORDER STATUS
// // ======================================================

// router.post(
//     "/admin/quick-service/order/:id/status",

//     async(req,res)=>{

//         try{

//             const allowedStatuses = [

//                 "Pending",

//                 "Accepted",

//                 "Processing",

//                 "Ready",

//                 "Packed",

//                 "Out for Delivery",

//                 "Delivered",

//                 "Cancelled"

//             ];


//             const status =
//                 String(
//                     req.body.status ||
//                     ""
//                 )
//                 .trim();


//             if(
//                 !allowedStatuses
//                 .includes(
//                     status
//                 )
//             ){

//                 return res
//                 .status(400)
//                 .send(
//                     "Invalid Status"
//                 );

//             }


//             await QuickOrder
//                 .findByIdAndUpdate(

//                     req.params.id,

//                     {
//                         status
//                     }

//                 );


//             return res.redirect(
//                 "/admin/quick-service/orders"
//             );

//         }
//         catch(error){

//             console.error(
//                 error
//             );


//             res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );


// // ======================================================
// // DOCUMENT VIEW / DOWNLOAD
// // ======================================================

// router.get(
//     "/admin/quick-service/document/:orderId/:index",

//     async(req,res)=>{

//         try{

//             const order =
//                 await QuickOrder
//                 .findById(
//                     req.params.orderId
//                 );


//             if(!order){

//                 return res
//                 .status(404)
//                 .send(
//                     "Order Not Found"
//                 );

//             }


//             const index =
//                 Number(
//                     req.params.index
//                 );


//             const document =
//                 order.documents[
//                     index
//                 ];


//             if(!document){

//                 return res
//                 .status(404)
//                 .send(
//                     "Document Not Found"
//                 );

//             }


//             const filePath =
//                 path.join(

//                     uploadDirectory,

//                     document.fileName

//                 );


//             if(
//                 !fs.existsSync(
//                     filePath
//                 )
//             ){

//                 return res
//                 .status(404)
//                 .send(
//                     "File Not Found"
//                 );

//             }


//             if(
//                 req.query.download ===
//                 "1"
//             ){

//                 return res.download(

//                     filePath,

//                     document.originalName ||
//                     document.fileName

//                 );

//             }


//             return res.sendFile(
//                 filePath
//             );

//         }
//         catch(error){

//             console.error(
//                 error
//             );


//             res
//             .status(500)
//             .send(
//                 error.message
//             );

//         }

//     }
// );

// // ======================================================
// // ADMIN MANAGE QUICK SERVICES
// // GET /admin/quick-service/services
// // ======================================================

// router.get(
//     "/admin/quick-service/services",
//     async (req, res) => {

//         try {

//             const services =
//                 await QuickService
//                     .find({})
//                     .sort({
//                         createdAt: -1
//                     })
//                     .lean();


//             return res.send(`

// <!DOCTYPE html>

// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
// >

// <title>
// Manage Quick Services
// </title>


// <style>

// *{
//     box-sizing:border-box;
// }

// body{
//     margin:0;
//     background:#f1f5f9;
//     font-family:Arial,sans-serif;
//     color:#0f172a;
// }

// .header{
//     padding:20px;
//     color:white;
//     text-align:center;
//     background:
//         linear-gradient(
//             135deg,
//             #065f46,
//             #16a34a
//         );
// }

// .container{
//     width:100%;
//     max-width:900px;
//     margin:auto;
//     padding:18px;
// }

// .nav{
//     display:grid;
//     grid-template-columns:
//         repeat(
//             auto-fit,
//             minmax(150px,1fr)
//         );
//     gap:10px;
//     margin-bottom:18px;
// }

// .nav a{
//     padding:12px;
//     border-radius:10px;
//     background:#2563eb;
//     color:white;
//     text-align:center;
//     text-decoration:none;
//     font-weight:800;
// }

// .card{
//     padding:20px;
//     margin-bottom:18px;
//     border-radius:18px;
//     background:white;
//     box-shadow:
//         0 8px 25px
//         rgba(15,23,42,.08);
// }

// label{
//     display:block;
//     margin-top:14px;
//     margin-bottom:5px;
//     font-weight:800;
// }

// input,
// select,
// textarea{
//     width:100%;
//     padding:12px;
//     border:
//         1px solid
//         #cbd5e1;
//     border-radius:9px;
//     font-size:15px;
// }

// textarea{
//     min-height:80px;
// }

// .requirements-box{
//     margin-top:15px;
//     padding:15px;
//     border-radius:12px;
//     background:#f8fafc;
// }

// .requirement-row{
//     display:flex;
//     gap:8px;
//     margin-top:8px;
// }

// .requirement-row input{
//     flex:1;
// }

// .remove-btn{
//     width:45px;
//     border:0;
//     border-radius:8px;
//     background:#dc2626;
//     color:white;
//     cursor:pointer;
// }

// .add-doc-btn{
//     margin-top:10px;
//     padding:10px 14px;
//     border:0;
//     border-radius:8px;
//     background:#0ea5e9;
//     color:white;
//     font-weight:800;
//     cursor:pointer;
// }

// .save-btn{
//     width:100%;
//     margin-top:18px;
//     padding:14px;
//     border:0;
//     border-radius:10px;
//     background:#16a34a;
//     color:white;
//     font-weight:900;
//     font-size:16px;
//     cursor:pointer;
// }

// .service{
//     padding:16px;
//     margin-bottom:12px;
//     border:
//         1px solid
//         #e2e8f0;
//     border-radius:13px;
// }

// .service-head{
//     display:flex;
//     justify-content:space-between;
//     align-items:center;
//     gap:10px;
// }

// .service-name{
//     font-size:18px;
//     font-weight:900;
// }

// .active{
//     color:#15803d;
//     font-weight:900;
// }

// .inactive{
//     color:#dc2626;
//     font-weight:900;
// }

// .actions{
//     display:flex;
//     flex-wrap:wrap;
//     gap:8px;
//     margin-top:12px;
// }

// .actions a{
//     padding:9px 12px;
//     border-radius:8px;
//     text-decoration:none;
//     color:white;
//     font-weight:800;
//     font-size:13px;
// }

// .edit{
//     background:#2563eb;
// }

// .toggle{
//     background:#f59e0b;
// }

// .delete{
//     background:#dc2626;
// }

// .documents{
//     margin-top:8px;
//     color:#475569;
//     font-size:13px;
//     line-height:1.7;
// }

// </style>

// </head>


// <body>


// <header class="header">

// <h1>
// ⚡ Manage Quick Services
// </h1>

// <p>
// Service, Price और Required Documents Control करें
// </p>

// </header>


// <main class="container">


// <div class="nav">

// <a href="/admin/quick-service/shop-status">
// 🏪 SHOP CONTROL
// </a>

// <a href="/admin/quick-service/orders">
// 🔔 ORDERS
// </a>

// <a href="/quick-service">
// 👤 CUSTOMER PAGE
// </a>

// </div>


// <!-- ======================================= -->
// <!-- ADD SERVICE -->
// <!-- ======================================= -->

// <section class="card">

// <h2>
// ➕ Add New Service
// </h2>


// <form
//     method="POST"
//     action="/admin/quick-service/services"
// >


// <label>
// Service Name *
// </label>

// <input
//     type="text"
//     name="name"
//     placeholder="Example: New PAN Card"
//     required
// >


// <label>
// Service Type *
// </label>

// <select
//     name="type"
//     id="serviceType"
// >

// <option value="normal">
// Normal Document Service
// </option>

// <option value="photocopy">
// Photo Copy
// </option>

// </select>


// <label>
// Price ₹ *
// </label>

// <input
//     type="number"
//     name="price"
//     min="0"
//     step="0.01"
//     placeholder="150"
//     required
// >


// <label>
// Description
// </label>

// <textarea
//     name="description"
//     placeholder="Service details"
// ></textarea>


// <div
//     class="requirements-box"
//     id="requirementsBox"
// >

// <strong>
// 📄 Required Documents
// </strong>

// <div id="requirementsList"></div>


// <button
//     type="button"
//     class="add-doc-btn"
//     onclick="addRequirement()"
// >

// + ADD REQUIRED DOCUMENT

// </button>

// </div>


// <button
//     type="submit"
//     class="save-btn"
// >

// ✅ SAVE SERVICE

// </button>


// </form>

// </section>


// <!-- ======================================= -->
// <!-- EXISTING SERVICES -->
// <!-- ======================================= -->

// <section class="card">

// <h2>
// 🛠 Existing Services
// </h2>


// ${
//     services.length

//     ?

//     services.map(
//         function(service){

//             const requirements =
//                 Array.isArray(
//                     service.requirements
//                 )
//                 ? service.requirements
//                 : [];


//             return `

// <div class="service">

// <div class="service-head">

// <div>

// <div class="service-name">
// ${service.name}
// </div>

// <div>
// ₹${Number(service.price || 0).toFixed(2)}
// </div>

// </div>


// <div
// class="${
//     service.active
//         ? "active"
//         : "inactive"
// }"
// >

// ${
//     service.active
//         ? "● ACTIVE"
//         : "● OFF"
// }

// </div>

// </div>


// <div class="documents">

// <strong>
// Type:
// </strong>

// ${
//     service.type === "photocopy"
//         ? "Photo Copy"
//         : "Normal"
// }

// <br>


// <strong>
// Required Documents:
// </strong>

// ${
//     requirements.length

//     ?

//     requirements
//         .map(
//             function(item){

//                 return (
//                     "• " +
//                     item.name
//                 );

//             }
//         )
//         .join("<br>")

//     :

//     "No required document"

// }

// </div>


// <div class="actions">

// <a
//     class="edit"
//     href="/admin/quick-service/services/edit/${service._id}"
// >
// ✏ EDIT
// </a>


// <a
//     class="toggle"
//     href="/admin/quick-service/services/toggle/${service._id}"
// >
// ${
//     service.active
//         ? "🔴 TURN OFF"
//         : "🟢 TURN ON"
// }
// </a>


// <a
//     class="delete"
//     href="/admin/quick-service/services/delete/${service._id}"
//     onclick="return confirm('Delete this service?')"
// >
// 🗑 DELETE
// </a>

// </div>


// </div>

//             `;

//         }
//     ).join("")

//     :

//     `
//     <p>
//         अभी कोई Service Add नहीं है।
//     </p>
//     `
// }


// </section>


// </main>


// <script>

// let requirementIndex =
//     0;


// function addRequirement(){

//     const list =
//         document.getElementById(
//             "requirementsList"
//         );


//     const row =
//         document.createElement(
//             "div"
//         );


//     row.className =
//         "requirement-row";


//     row.innerHTML =

//         '<input ' +
//         'type="text" ' +
//         'name="requirements[]" ' +
//         'placeholder="Example: Aadhaar Card" ' +
//         'required' +
//         '>' +

//         '<button ' +
//         'type="button" ' +
//         'class="remove-btn" ' +
//         'onclick="this.parentElement.remove()"' +
//         '>' +

//         '✕' +

//         '</button>';


//     list.appendChild(
//         row
//     );


//     requirementIndex++;

// }


// const serviceType =
//     document.getElementById(
//         "serviceType"
//     );


// const requirementsBox =
//     document.getElementById(
//         "requirementsBox"
//     );


// function updateRequirementBox(){

//     if(
//         serviceType.value ===
//         "photocopy"
//     ){

//         requirementsBox.style.display =
//             "none";

//     }
//     else{

//         requirementsBox.style.display =
//             "block";

//     }

// }


// serviceType.addEventListener(
//     "change",
//     updateRequirementBox
// );


// updateRequirementBox();

// </script>


// </body>

// </html>

//             `);

//         }
//         catch(error){

//             console.error(
//                 "MANAGE QUICK SERVICES ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// // ======================================================
// // ADD QUICK SERVICE
// // POST /admin/quick-service/services
// // ======================================================

// router.post(
//     "/admin/quick-service/services",
//     async (req, res) => {

//         try {

//             const name =
//                 String(
//                     req.body.name ||
//                     ""
//                 ).trim();


//             const type =
//                 req.body.type ===
//                 "photocopy"
//                     ? "photocopy"
//                     : "normal";


//             const price =
//                 Math.max(
//                     0,
//                     Number(
//                         req.body.price ||
//                         0
//                     )
//                 );


//             if(!name){

//                 return res
//                     .status(400)
//                     .send(
//                         "Service Name Required"
//                     );

//             }


//             let requirements =
//                 req.body[
//                     "requirements[]"
//                 ]
//                 ||
//                 req.body.requirements
//                 ||
//                 [];


//             if(
//                 !Array.isArray(
//                     requirements
//                 )
//             ){

//                 requirements =
//                     [requirements];

//             }


//             requirements =
//                 requirements

//                 .map(
//                     function(item){

//                         return String(
//                             item ||
//                             ""
//                         ).trim();

//                     }
//                 )

//                 .filter(Boolean)

//                 .map(
//                     function(item){

//                         return {

//                             name:
//                                 item,

//                             required:
//                                 true

//                         };

//                     }
//                 );


//             if(
//                 type ===
//                 "photocopy"
//             ){

//                 requirements =
//                     [];

//             }


//             await QuickService.create({

//                 name,

//                 type,

//                 price,

//                 description:
//                     String(
//                         req.body.description ||
//                         ""
//                     ).trim(),

//                 active:
//                     true,

//                 requirements

//             });


//             return res.redirect(
//                 "/admin/quick-service/services"
//             );

//         }
//         catch(error){

//             console.error(
//                 "ADD QUICK SERVICE ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// // ======================================================
// // TOGGLE SERVICE
// // ======================================================

// router.get(
//     "/admin/quick-service/services/toggle/:id",
//     async (req, res) => {

//         try {

//             const service =
//                 await QuickService.findById(
//                     req.params.id
//                 );


//             if(!service){

//                 return res
//                     .status(404)
//                     .send(
//                         "Service Not Found"
//                     );

//             }


//             service.active =
//                 !service.active;


//             await service.save();


//             return res.redirect(
//                 "/admin/quick-service/services"
//             );

//         }
//         catch(error){

//             console.error(
//                 "TOGGLE QUICK SERVICE ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// // ======================================================
// // DELETE SERVICE
// // ======================================================

// router.get(
//     "/admin/quick-service/services/delete/:id",
//     async (req, res) => {

//         try {

//             await QuickService
//                 .findByIdAndDelete(
//                     req.params.id
//                 );


//             return res.redirect(
//                 "/admin/quick-service/services"
//             );

//         }
//         catch(error){

//             console.error(
//                 "DELETE QUICK SERVICE ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// // ======================================================
// // EDIT SERVICE PAGE
// // ======================================================

// router.get(
//     "/admin/quick-service/services/edit/:id",
//     async (req, res) => {

//         try {

//             const service =
//                 await QuickService
//                     .findById(
//                         req.params.id
//                     )
//                     .lean();


//             if(!service){

//                 return res
//                     .status(404)
//                     .send(
//                         "Service Not Found"
//                     );

//             }


//             const requirements =
//                 Array.isArray(
//                     service.requirements
//                 )
//                 ? service.requirements
//                 : [];


//             return res.send(`

// <!DOCTYPE html>

// <html>

// <head>

// <meta
// name="viewport"
// content="width=device-width,initial-scale=1"
// >

// <title>
// Edit Service
// </title>

// <style>

// *{
// box-sizing:border-box;
// font-family:Arial;
// }

// body{
// margin:0;
// padding:20px;
// background:#f1f5f9;
// }

// .card{
// max-width:600px;
// margin:auto;
// padding:22px;
// background:white;
// border-radius:18px;
// }

// label{
// display:block;
// margin-top:14px;
// margin-bottom:5px;
// font-weight:bold;
// }

// input,
// select,
// textarea{
// width:100%;
// padding:12px;
// border:1px solid #cbd5e1;
// border-radius:9px;
// }

// textarea{
// min-height:80px;
// }

// .req{
// display:flex;
// gap:8px;
// margin-top:8px;
// }

// .req button{
// width:45px;
// border:0;
// border-radius:8px;
// background:#dc2626;
// color:white;
// }

// .add{
// margin-top:10px;
// padding:10px;
// border:0;
// border-radius:8px;
// background:#2563eb;
// color:white;
// }

// .save{
// width:100%;
// margin-top:18px;
// padding:14px;
// border:0;
// border-radius:10px;
// background:#16a34a;
// color:white;
// font-weight:bold;
// }

// </style>

// </head>


// <body>


// <div class="card">

// <h2>
// ✏ Edit Service
// </h2>


// <form
// method="POST"
// action="/admin/quick-service/services/edit/${service._id}"
// >


// <label>
// Service Name
// </label>

// <input
// type="text"
// name="name"
// value="${service.name || ""}"
// required
// >


// <label>
// Service Type
// </label>

// <select
// name="type"
// id="serviceType"
// >

// <option
// value="normal"
// ${
// service.type === "normal"
// ?
// "selected"
// :
// ""
// }
// >
// Normal
// </option>

// <option
// value="photocopy"
// ${
// service.type === "photocopy"
// ?
// "selected"
// :
// ""
// }
// >
// Photo Copy
// </option>

// </select>


// <label>
// Price ₹
// </label>

// <input
// type="number"
// name="price"
// step="0.01"
// min="0"
// value="${Number(service.price || 0)}"
// required
// >


// <label>
// Description
// </label>

// <textarea
// name="description"
// >${service.description || ""}</textarea>


// <div id="requirementsBox">

// <label>
// Required Documents
// </label>

// <div id="requirements">

// ${
// requirements
// .map(
// function(item){

// return `

// <div class="req">

// <input
// type="text"
// name="requirements[]"
// value="${item.name || ""}"
// required
// >

// <button
// type="button"
// onclick="this.parentElement.remove()"
// >
// ✕
// </button>

// </div>

// `;

// }
// )
// .join("")
// }

// </div>


// <button
// type="button"
// class="add"
// onclick="addRequirement()"
// >
// + ADD DOCUMENT
// </button>

// </div>


// <button
// class="save"
// >
// ✅ UPDATE SERVICE
// </button>

// </form>


// <br>

// <a href="/admin/quick-service/services">
// ← Back
// </a>


// </div>


// <script>

// const type =
// document.getElementById(
//     "serviceType"
// );


// const box =
// document.getElementById(
//     "requirementsBox"
// );


// function updateBox(){

//     box.style.display =

//         type.value ===
//         "photocopy"

//         ?

//         "none"

//         :

//         "block";

// }


// type.addEventListener(
//     "change",
//     updateBox
// );


// updateBox();


// function addRequirement(){

//     const list =
//         document.getElementById(
//             "requirements"
//         );


//     const row =
//         document.createElement(
//             "div"
//         );


//     row.className =
//         "req";


//     row.innerHTML =

//         '<input ' +
//         'type="text" ' +
//         'name="requirements[]" ' +
//         'placeholder="Document Name" ' +
//         'required' +
//         '>' +

//         '<button ' +
//         'type="button" ' +
//         'onclick="this.parentElement.remove()"' +
//         '>' +

//         '✕' +

//         '</button>';


//     list.appendChild(
//         row
//     );

// }

// </script>


// </body>

// </html>

//             `);

//         }
//         catch(error){

//             console.error(
//                 "EDIT SERVICE PAGE ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// // ======================================================
// // UPDATE SERVICE
// // ======================================================

// router.post(
//     "/admin/quick-service/services/edit/:id",
//     async (req, res) => {

//         try {

//             let requirements =
//                 req.body[
//                     "requirements[]"
//                 ]
//                 ||
//                 req.body.requirements
//                 ||
//                 [];


//             if(
//                 !Array.isArray(
//                     requirements
//                 )
//             ){

//                 requirements =
//                     [requirements];

//             }


//             requirements =
//                 requirements

//                 .map(
//                     function(item){

//                         return String(
//                             item ||
//                             ""
//                         ).trim();

//                     }
//                 )

//                 .filter(Boolean)

//                 .map(
//                     function(item){

//                         return {

//                             name:
//                                 item,

//                             required:
//                                 true

//                         };

//                     }
//                 );


//             const type =
//                 req.body.type ===
//                 "photocopy"

//                 ?

//                 "photocopy"

//                 :

//                 "normal";


//             if(
//                 type ===
//                 "photocopy"
//             ){

//                 requirements =
//                     [];

//             }


//             await QuickService
//                 .findByIdAndUpdate(

//                     req.params.id,

//                     {

//                         name:
//                             String(
//                                 req.body.name ||
//                                 ""
//                             ).trim(),

//                         type,

//                         price:
//                             Math.max(
//                                 0,
//                                 Number(
//                                     req.body.price ||
//                                     0
//                                 )
//                             ),

//                         description:
//                             String(
//                                 req.body.description ||
//                                 ""
//                             ).trim(),

//                         requirements

//                     }

//                 );


//             return res.redirect(
//                 "/admin/quick-service/services"
//             );

//         }
//         catch(error){

//             console.error(
//                 "UPDATE QUICK SERVICE ERROR:",
//                 error
//             );


//             return res
//                 .status(500)
//                 .send(
//                     error.message
//                 );

//         }

//     }
// );


// module.exports =
// router;

// ======================================================
// CUSTOMER PAGE
// GET /quick-service
// ======================================================

router.get(
    "/quick-service",

    async(req,res)=>{

        try{

            const setting =
                await getQuickShopSetting();

            const services =
                await QuickService
                    .find({
                        active:true
                    })
                    .sort({
                        createdAt:-1
                    })
                    .lean();


            return res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>
GLOBAL QUICK SERVICES
</title>

<script
src="https://checkout.razorpay.com/v1/checkout.js"
></script>


<style>

*{
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    margin:0;
    background:#f1f5f9;
    color:#0f172a;
}

.header{
    padding:22px;
    text-align:center;
    color:white;
    background:
    linear-gradient(
        135deg,
        #0d604b,
        #16a34a
    );
}

.header h2{
    margin:0 0 5px;
}

.header p{
    margin:0;
}

.container{
    max-width:650px;
    margin:auto;
    padding:15px;
}

.card{
    background:white;
    padding:20px;
    border-radius:18px;
    box-shadow:
    0 10px 30px
    rgba(0,0,0,.10);
}

.status{
    padding:13px;
    border-radius:12px;
    text-align:center;
    font-weight:bold;
    margin-bottom:18px;
}

.status.open{
    background:#dcfce7;
    color:#166534;
}

.status.closed{
    background:#fee2e2;
    color:#991b1b;
}

label{
    display:block;
    margin-top:15px;
    margin-bottom:6px;
    font-weight:bold;
}

input,
select,
textarea{
    width:100%;
    padding:13px;
    border:1px solid #cbd5e1;
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
    border-radius:13px;
    border:1px solid #dbeafe;
}

.location-box{
    margin-top:15px;
    padding:13px;
    border-radius:10px;
    background:#fef3c7;
    color:#92400e;
    font-weight:bold;
    line-height:1.6;
}

.location-box.success{
    background:#dcfce7;
    color:#166534;
}

.location-box.error{
    background:#fee2e2;
    color:#991b1b;
}

.location-btn{
    width:100%;
    margin-top:10px;
    padding:13px;
    border:0;
    border-radius:10px;
    background:#f59e0b;
    color:white;
    font-weight:bold;
    cursor:pointer;
}

.location-btn:disabled{
    opacity:.6;
}

.total{
    margin-top:20px;
    padding:15px;
    background:#eff6ff;
    border-radius:12px;
    line-height:1.9;
}

.pay-btn{
    width:100%;
    margin-top:20px;
    padding:15px;
    border:0;
    border-radius:10px;
    background:#16a34a;
    color:white;
    font-size:16px;
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

</style>

</head>


<body>


<div class="header">

<h2>
⚡ GLOBAL QUICK SERVICES
</h2>

<p>
Fast Document Service at Your Doorstep
</p>

</div>


<div class="container">

<div class="card">


<div
class="status ${
    setting.isOpen
    ?
    "open"
    :
    "closed"
}"
>

${
    setting.isOpen
    ?
    "🟢 SHOP OPEN"
    :
    "🔴 SHOP CLOSED"
}

</div>


<label>
Select Service
</label>

<select id="service">

<option value="">
Select Service
</option>

${
services.map(
function(service){

    return `

<option
value="${service._id}"
data-type="${service.type}"
data-price="${service.price}"
data-requirements="${encodeURIComponent(
    JSON.stringify(
        service.requirements || []
    )
)}"
>
${service.name} - ₹${service.price}
</option>

    `;

}
).join("")
}

</select>


<div id="documentsArea"></div>


<div
id="photoCopyOptions"
class="hidden"
>

<label>
Print Type
</label>

<select id="printType">

<option value="Black & White">
Black & White
</option>

<option value="Color">
Color
</option>

</select>


<label>
Copies
</label>

<input
type="number"
id="copies"
value="1"
min="1"
>

</div>


<label>
Customer Name
</label>

<input
type="text"
id="customerName"
placeholder="अपना नाम लिखें"
>


<label>
Mobile Number
</label>

<input
type="tel"
id="mobile"
maxlength="10"
placeholder="10 digit mobile number"
>


<label>
Delivery Address
</label>

<textarea
id="address"
placeholder="House, Road, Area, Landmark"
></textarea>


<div
id="locationStatus"
class="location-box"
>
📍 पहले अपनी Location Check करें
</div>


<button
type="button"
class="location-btn"
id="checkLocationButton"
>
📍 CHECK MY LOCATION
</button>


<div class="total">

Service:
₹<span id="serviceAmount">0.00</span>

<br>

Delivery:
₹${safeNumber(
    setting.deliveryCharge,
    20
).toFixed(2)}

<br>

<strong>
Total:
₹<span id="totalAmount">0.00</span>
</strong>

</div>


<button
type="button"
class="pay-btn"
id="orderButton"
disabled
>
CHECK LOCATION FIRST
</button>


</div>

</div>


<script>


// ======================================================
// SERVER SETTINGS
// ======================================================

const SHOP_OPEN =
${setting.isOpen ? "true" : "false"};


const SHOP_LATITUDE =
${
validCoordinates(
    setting.shopLocation?.latitude,
    setting.shopLocation?.longitude
)
?
Number(
    setting.shopLocation.latitude
)
:
"null"
};


const SHOP_LONGITUDE =
${
validCoordinates(
    setting.shopLocation?.latitude,
    setting.shopLocation?.longitude
)
?
Number(
    setting.shopLocation.longitude
)
:
"null"
};


const DELIVERY_RADIUS =
${safeNumber(
    setting.deliveryRadiusKm,
    2
)};


const DELIVERY_CHARGE =
${safeNumber(
    setting.deliveryCharge,
    20
)};


// ======================================================
// ELEMENTS
// ======================================================

const serviceSelect =
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

const serviceAmountElement =
    document.getElementById(
        "serviceAmount"
    );

const totalAmountElement =
    document.getElementById(
        "totalAmount"
    );

const checkLocationButton =
    document.getElementById(
        "checkLocationButton"
    );

const locationStatusBox =
    document.getElementById(
        "locationStatus"
    );

const orderButton =
    document.getElementById(
        "orderButton"
    );


// ======================================================
// CUSTOMER LOCATION
// ======================================================

let customerLatitude =
    null;

let customerLongitude =
    null;

let customerAccuracy =
    null;

let customerDistance =
    null;

let locationAllowed =
    false;


// ======================================================
// TOTAL
// ======================================================

function updateTotal(){

    if(
        !serviceSelect.value
    ){

        serviceAmountElement
            .textContent =
            "0.00";

        totalAmountElement
            .textContent =
            "0.00";

        return;
    }


    const selected =
        serviceSelect.options[
            serviceSelect.selectedIndex
        ];


    const price =
        Number(
            selected.dataset.price ||
            0
        );


    let serviceAmount =
        price;


    if(
        selected.dataset.type ===
        "photocopy"
    ){

        const copies =
            Math.max(
                1,
                Number(
                    document
                    .getElementById(
                        "copies"
                    )
                    ?.value ||
                    1
                )
            );


        const pageInput =
            document.getElementById(
                "photocopyPages"
            );


        const pages =
            Math.max(
                1,
                Number(
                    pageInput
                    ?.files
                    ?.length ||
                    1
                )
            );


        serviceAmount =
            price *
            copies *
            pages;

    }


    serviceAmountElement
        .textContent =
        serviceAmount
        .toFixed(2);


    totalAmountElement
        .textContent =
        (
            serviceAmount +
            DELIVERY_CHARGE
        )
        .toFixed(2);

}


// ======================================================
// SERVICE CHANGE
// ======================================================

serviceSelect.addEventListener(
    "change",
    function(){

        documentsArea.innerHTML =
            "";


        photoCopyOptions
            .classList
            .add(
                "hidden"
            );


        const selected =
            this.options[
                this.selectedIndex
            ];


        if(
            !selected.value
        ){

            updateTotal();

            return;

        }


        // ==============================================
        // PHOTO COPY
        // ==============================================

        if(
            selected.dataset.type ===
            "photocopy"
        ){

            photoCopyOptions
                .classList
                .remove(
                    "hidden"
                );


            documentsArea.innerHTML =

                '<div class="document-box">' +

                    '<label>' +
                    '📷 Scan / Upload Pages' +
                    '</label>' +

                    '<input ' +
                    'type="file" ' +
                    'id="photocopyPages" ' +
                    'accept="image/*" ' +
                    'capture="environment" ' +
                    'multiple' +
                    '>' +

                    '<p>' +
                    'एक से ज्यादा pages upload कर सकते हैं।' +
                    '</p>' +

                '</div>';


            const pageInput =
                document.getElementById(
                    "photocopyPages"
                );


            const copiesInput =
                document.getElementById(
                    "copies"
                );


            pageInput.addEventListener(
                "change",
                updateTotal
            );


            copiesInput.addEventListener(
                "input",
                updateTotal
            );


            updateTotal();

            return;

        }


        // ==============================================
        // NORMAL SERVICE
        // ==============================================

        let requirements =
            [];


        try{

            requirements =
                JSON.parse(

                    decodeURIComponent(
                        selected.dataset
                        .requirements ||
                        "%5B%5D"
                    )

                );

        }
        catch(error){

            console.error(
                "REQUIREMENTS ERROR:",
                error
            );

            requirements =
                [];

        }


        requirements.forEach(
            function(item,index){

                const box =
                    document.createElement(
                        "div"
                    );


                box.className =
                    "document-box";


                const requiredText =
                    item.required
                    ?
                    " *"
                    :
                    "";


                const requiredAttribute =
                    item.required
                    ?
                    " required"
                    :
                    "";


                const documentName =
                    String(
                        item.name ||
                        "Document"
                    );


                box.innerHTML =

                    '<label>' +

                    '📷 ' +
                    documentName +
                    requiredText +

                    '</label>' +

                    '<input ' +

                    'type="file" ' +

                    'id="doc_' +
                    index +
                    '" ' +

                    'data-doc-name="' +
                    documentName
                        .replace(
                            /"/g,
                            '&quot;'
                        ) +
                    '" ' +

                    'accept="image/*" ' +

                    'capture="environment"' +

                    requiredAttribute +

                    '>';


                documentsArea
                    .appendChild(
                        box
                    );

            }
        );


        updateTotal();

    }
);


// ======================================================
// DISTANCE
// ======================================================

function calculateBrowserDistanceKm(
    latitude1,
    longitude1,
    latitude2,
    longitude2
){

    const earthRadius =
        6371;


    const toRadians =
        function(value){

            return (
                value *
                Math.PI /
                180
            );

        };


    const latitudeDifference =
        toRadians(
            latitude2 -
            latitude1
        );


    const longitudeDifference =
        toRadians(
            longitude2 -
            longitude1
        );


    const calculation =

        Math.sin(
            latitudeDifference /
            2
        ) ** 2

        +

        Math.cos(
            toRadians(
                latitude1
            )
        )

        *

        Math.cos(
            toRadians(
                latitude2
            )
        )

        *

        Math.sin(
            longitudeDifference /
            2
        ) ** 2;


    return (

        earthRadius *

        2 *

        Math.atan2(

            Math.sqrt(
                calculation
            ),

            Math.sqrt(
                1 -
                calculation
            )

        )

    );

}


// ======================================================
// CHECK LOCATION
// ======================================================

function checkLocation(){

    locationAllowed =
        false;


    orderButton.disabled =
        true;


    if(
        !SHOP_OPEN
    ){

        locationStatusBox.className =
            "location-box error";


        locationStatusBox.innerHTML =
            "🔴 Shop अभी Closed है।";


        orderButton.textContent =
            "SHOP CLOSED";


        return;

    }


    if(
        SHOP_LATITUDE === null ||
        SHOP_LONGITUDE === null
    ){

        locationStatusBox.className =
            "location-box error";


        locationStatusBox.innerHTML =
            "❌ Shop Location save नहीं है। Admin से Shop Close करके फिर GPS के साथ Open करें।";


        orderButton.textContent =
            "SHOP LOCATION NOT AVAILABLE";


        return;

    }


    if(
        !navigator.geolocation
    ){

        locationStatusBox.className =
            "location-box error";


        locationStatusBox.innerHTML =
            "❌ इस Device में GPS support नहीं है।";


        return;

    }


    checkLocationButton.disabled =
        true;


    checkLocationButton.textContent =
        "📍 CHECKING LOCATION...";


    locationStatusBox.className =
        "location-box";


    locationStatusBox.innerHTML =
        "📍 Browser Location Permission Allow करें...";


    navigator
    .geolocation
    .getCurrentPosition(

        function(position){

            customerLatitude =
                Number(
                    position.coords
                    .latitude
                );


            customerLongitude =
                Number(
                    position.coords
                    .longitude
                );


            customerAccuracy =
                Number(
                    position.coords
                    .accuracy ||
                    0
                );


            customerDistance =
                calculateBrowserDistanceKm(

                    Number(
                        SHOP_LATITUDE
                    ),

                    Number(
                        SHOP_LONGITUDE
                    ),

                    customerLatitude,

                    customerLongitude

                );


            checkLocationButton.disabled =
                false;


            checkLocationButton.textContent =
                "📍 CHECK LOCATION AGAIN";


            if(
                customerDistance <=
                DELIVERY_RADIUS
            ){

                locationAllowed =
                    true;


                locationStatusBox.className =
                    "location-box success";


                locationStatusBox.innerHTML =

                    "✅ DELIVERY AVAILABLE" +

                    "<br>" +

                    "Shop से दूरी: " +

                    customerDistance
                    .toFixed(2) +

                    " KM";


                orderButton.disabled =
                    false;


                orderButton.textContent =
                    "💳 CONTINUE TO PAYMENT";

            }
            else{

                locationAllowed =
                    false;


                locationStatusBox.className =
                    "location-box error";


                locationStatusBox.innerHTML =

                    "❌ DELIVERY AVAILABLE नहीं है." +

                    "<br>" +

                    "आप Shop से " +

                    customerDistance
                    .toFixed(2) +

                    " KM दूर हैं." +

                    "<br>" +

                    "Delivery केवल " +

                    DELIVERY_RADIUS +

                    " KM के अंदर है.";


                orderButton.disabled =
                    true;


                orderButton.textContent =
                    "OUTSIDE DELIVERY AREA";

            }

        },


        function(error){

            console.error(
                "LOCATION ERROR:",
                error
            );


            checkLocationButton.disabled =
                false;


            checkLocationButton.textContent =
                "📍 CHECK MY LOCATION";


            locationStatusBox.className =
                "location-box error";


            if(
                error.code === 1
            ){

                locationStatusBox.innerHTML =
                    "❌ Location Permission Denied. Browser Settings में Location Allow करें.";

            }
            else if(
                error.code === 2
            ){

                locationStatusBox.innerHTML =
                    "❌ GPS Location नहीं मिल रही. Phone Location ON करें.";

            }
            else if(
                error.code === 3
            ){

                locationStatusBox.innerHTML =
                    "❌ Location Timeout. फिर से कोशिश करें.";

            }
            else{

                locationStatusBox.innerHTML =
                    "❌ Location Check नहीं हो सकी.";

            }

        },


        {
            enableHighAccuracy:
                true,

            timeout:
                20000,

            maximumAge:
                0
        }

    );

}


// ======================================================
// LOCATION BUTTON EVENT
// ======================================================

checkLocationButton.addEventListener(
    "click",
    checkLocation
);


// ======================================================
// ORDER BUTTON EVENT
// ======================================================

orderButton.addEventListener(
    "click",
    placeOrder
);


// ======================================================
// PLACE ORDER
// ======================================================

async function placeOrder(){

    if(
        !SHOP_OPEN
    ){

        alert(
            "Shop अभी Closed है."
        );

        return;

    }


    if(
        !locationAllowed
    ){

        alert(
            "पहले CHECK MY LOCATION करें."
        );

        return;

    }


    const serviceId =
        serviceSelect.value;


    if(
        !serviceId
    ){

        alert(
            "Service select करें."
        );

        return;

    }


    const customerName =
        document
        .getElementById(
            "customerName"
        )
        .value
        .trim();


    const mobile =
        document
        .getElementById(
            "mobile"
        )
        .value
        .trim();


    const address =
        document
        .getElementById(
            "address"
        )
        .value
        .trim();


    if(
        !customerName
    ){

        alert(
            "Customer Name डालें."
        );

        return;

    }


    if(
        !/^[0-9]{10}$/.test(
            mobile
        )
    ){

        alert(
            "सही 10 digit Mobile Number डालें."
        );

        return;

    }


    if(
        !address
    ){

        alert(
            "Delivery Address डालें."
        );

        return;

    }


    const formData =
        new FormData();


    formData.append(
        "serviceId",
        serviceId
    );


    formData.append(
        "customerName",
        customerName
    );


    formData.append(
        "mobile",
        mobile
    );


    formData.append(
        "address",
        address
    );


    formData.append(
        "latitude",
        customerLatitude
    );


    formData.append(
        "longitude",
        customerLongitude
    );


    formData.append(
        "accuracy",
        customerAccuracy ||
        0
    );


    const copiesInput =
        document.getElementById(
            "copies"
        );


    formData.append(
        "copies",
        copiesInput
        ?
        copiesInput.value
        :
        1
    );


    const printTypeInput =
        document.getElementById(
            "printType"
        );


    formData.append(
        "printType",
        printTypeInput
        ?
        printTypeInput.value
        :
        "Black & White"
    );


    const selected =
        serviceSelect.options[
            serviceSelect.selectedIndex
        ];


    // ==============================================
    // PHOTO COPY FILES
    // ==============================================

    if(
        selected.dataset.type ===
        "photocopy"
    ){

        const photocopyPages =
            document.getElementById(
                "photocopyPages"
            );


        if(
            !photocopyPages ||
            photocopyPages.files.length ===
            0
        ){

            alert(
                "Photo Copy के लिए Document Upload करें."
            );

            return;

        }


        Array.from(
            photocopyPages.files
        )
        .forEach(
            function(file){

                formData.append(
                    "photocopyPages",
                    file
                );

            }
        );

    }

    // ==============================================
    // REQUIRED DOCUMENTS
    // ==============================================

    else{

        const documentInputs =
            document.querySelectorAll(
                '[id^="doc_"]'
            );


        for(
            const input
            of documentInputs
        ){

            if(
                input.required &&
                input.files.length ===
                0
            ){

                alert(
                    input.dataset.docName +
                    " upload करें."
                );

                return;

            }


            if(
                input.files.length >
                0
            ){

                formData.append(
                    input.id,
                    input.files[0]
                );


                formData.append(
                    "name_" +
                    input.id,
                    input.dataset.docName
                );

            }

        }

    }


    orderButton.disabled =
        true;


    orderButton.textContent =
        "PLEASE WAIT...";


    try{

        const response =
            await fetch(

                "/quick-service/create-order",

                {
                    method:
                        "POST",

                    body:
                        formData
                }

            );


        const data =
            await response.json();


        if(
            !response.ok ||
            !data.success
        ){

            alert(
                data.message ||
                "Order create नहीं हुआ."
            );


            orderButton.disabled =
                false;


            orderButton.textContent =
                "💳 CONTINUE TO PAYMENT";


            return;

        }


        if(
            typeof Razorpay ===
            "undefined"
        ){

            alert(
                "Payment System Load नहीं हुआ. Page Refresh करें."
            );


            orderButton.disabled =
                false;


            orderButton.textContent =
                "💳 CONTINUE TO PAYMENT";


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

            prefill:{

                name:
                    customerName,

                contact:
                    mobile

            },

            theme:{

                color:
                    "#16a34a"

            },

            handler:
            async function(
                paymentResponse
            ){

                try{

                    const verify =
                        await fetch(

                            "/quick-service/verify-payment",

                            {
                                method:
                                    "POST",

                                headers:{
                                    "Content-Type":
                                    "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        orderId:
                                            data.orderId,

                                        razorpay_order_id:
                                            paymentResponse
                                            .razorpay_order_id,

                                        razorpay_payment_id:
                                            paymentResponse
                                            .razorpay_payment_id,

                                        razorpay_signature:
                                            paymentResponse
                                            .razorpay_signature

                                    })
                            }

                        );


                    const result =
                        await verify.json();


                    if(
                        result.success
                    ){

                        window.location.href =
                            "/quick-service/success/" +
                            data.orderId;

                        return;

                    }


                    alert(
                        result.message ||
                        "Payment Verification Failed"
                    );

                }
                catch(error){

                    console.error(
                        "VERIFY ERROR:",
                        error
                    );


                    alert(
                        "Payment Verification नहीं हो सका."
                    );

                }

            },

            modal:{

                ondismiss:
                function(){

                    orderButton.disabled =
                        false;


                    orderButton.textContent =
                        "💳 CONTINUE TO PAYMENT";

                }

            }

        };


        const razorpayObject =
            new Razorpay(
                options
            );


        razorpayObject.on(

            "payment.failed",

            function(response){

                console.error(
                    "PAYMENT FAILED:",
                    response.error
                );


                alert(
                    "Payment Failed"
                );


                orderButton.disabled =
                    false;


                orderButton.textContent =
                    "💳 CONTINUE TO PAYMENT";

            }

        );


        razorpayObject.open();

    }
    catch(error){

        console.error(
            "PLACE ORDER ERROR:",
            error
        );


        alert(
            error.message ||
            "Order create नहीं हुआ."
        );


        orderButton.disabled =
            false;


        orderButton.textContent =
            "💳 CONTINUE TO PAYMENT";

    }

}


</script>


</body>

</html>

            `);

        }
        catch(error){

            console.error(
                "QUICK SERVICE PAGE ERROR:",
                error
            );


            return res
            .status(500)
            .send(
                error.message
            );

        }

    }
);


// ======================================================
// CREATE ORDER
// इसके नीचे आपका existing CREATE ORDER code रहेगा
// ======================================================

// ======================================================
// CREATE ORDER
// POST /quick-service/create-order
// ======================================================

router.post(
    "/quick-service/create-order",

    upload.any(),

    async(req,res)=>{

        try{

            // ==================================================
            // SHOP SETTING
            // ==================================================

            const setting =
                await getQuickShopSetting();


            if(
                !setting ||
                !setting.isOpen
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Shop अभी Closed है."

                });

            }


            // ==================================================
            // SERVICE CHECK
            // ==================================================

            const service =
                await QuickService
                .findById(
                    req.body.serviceId
                );


            if(
                !service ||
                service.active === false
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Service available नहीं है."

                });

            }


            // ==================================================
            // CUSTOMER DETAILS
            // ==================================================

            const customerName =
                String(
                    req.body.customerName ||
                    ""
                ).trim();


            const mobile =
                String(
                    req.body.mobile ||
                    ""
                ).trim();


            const address =
                String(
                    req.body.address ||
                    ""
                ).trim();


            if(
                !customerName ||
                !mobile ||
                !address
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Name, Mobile और Address जरूरी है."

                });

            }


            if(
                !/^[0-9]{10}$/.test(
                    mobile
                )
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "सही 10 digit Mobile Number डालें."

                });

            }


            // ==================================================
            // CUSTOMER LOCATION
            // ==================================================

            const customerLatitude =
                Number(
                    req.body.latitude
                );


            const customerLongitude =
                Number(
                    req.body.longitude
                );


            if(
                !validCoordinates(
                    customerLatitude,
                    customerLongitude
                )
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Customer Location सही नहीं है."

                });

            }


            // ==================================================
            // SHOP LOCATION
            // ==================================================

            const shopLatitude =
                setting.shopLocation
                ?.latitude;


            const shopLongitude =
                setting.shopLocation
                ?.longitude;


            if(
                !validCoordinates(
                    shopLatitude,
                    shopLongitude
                )
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Shop Location save नहीं है."

                });

            }


            // ==================================================
            // DISTANCE
            // ==================================================

            const distance =
                calculateDistanceKm(

                    Number(
                        shopLatitude
                    ),

                    Number(
                        shopLongitude
                    ),

                    customerLatitude,

                    customerLongitude

                );


            const deliveryRadius =
                safeNumber(
                    setting.deliveryRadiusKm,
                    2
                );


            if(
                distance >
                deliveryRadius
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Delivery केवल " +
                        deliveryRadius +
                        " KM के अंदर उपलब्ध है. आपकी दूरी " +
                        distance.toFixed(2) +
                        " KM है."

                });

            }


            // ==================================================
            // DOCUMENTS
            // ==================================================

            const documents =
                [];


            const uploadedFiles =
                Array.isArray(
                    req.files
                )
                ?
                req.files
                :
                [];


            for(
                const file
                of uploadedFiles
            ){

                let documentName =
                    "Document";


                if(
                    file.fieldname ===
                    "photocopyPages"
                ){

                    documentName =
                        "Photo Copy Page";

                }
                else{

                    documentName =
                        req.body[
                            "name_" +
                            file.fieldname
                        ]
                        ||
                        "Document";

                }


                documents.push({

                    documentName:
                        documentName,

                    fileName:
                        file.filename,

                    originalName:
                        file.originalname,

                    mimeType:
                        file.mimetype

                });

            }


            // ==================================================
            // REQUIRED DOCUMENT CHECK
            // ==================================================

            if(
                service.type !==
                "photocopy"
            ){

                const requirements =
                    Array.isArray(
                        service.requirements
                    )
                    ?
                    service.requirements
                    :
                    [];


                for(
                    const requirement
                    of requirements
                ){

                    if(
                        requirement.required
                    ){

                        const found =
                            documents.some(
                                function(doc){

                                    return (
                                        String(
                                            doc.documentName
                                        ).trim()
                                        ===
                                        String(
                                            requirement.name
                                        ).trim()
                                    );

                                }
                            );


                        if(
                            !found
                        ){

                            return res
                            .status(400)
                            .json({

                                success:false,

                                message:
                                    requirement.name +
                                    " upload करें."

                            });

                        }

                    }

                }

            }


            // ==================================================
            // PHOTO COPY CHECK
            // ==================================================

            if(
                service.type ===
                "photocopy" &&
                documents.length ===
                0
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Photo Copy के लिए कम से कम 1 document upload करें."

                });

            }


            // ==================================================
            // COPIES
            // ==================================================

            const copies =
                Math.max(

                    1,

                    Math.floor(

                        safeNumber(
                            req.body.copies,
                            1
                        )

                    )

                );


            // ==================================================
            // SERVICE AMOUNT
            // ==================================================

            let serviceAmount =
                safeNumber(
                    service.price,
                    0
                );


            if(
                service.type ===
                "photocopy"
            ){

                const pages =
                    documents.length;


                serviceAmount =

                    safeNumber(
                        service.price,
                        0
                    )

                    *

                    pages

                    *

                    copies;

            }


            // ==================================================
            // DELIVERY CHARGE
            // ==================================================

            const deliveryCharge =
                safeNumber(
                    setting.deliveryCharge,
                    20
                );


            // ==================================================
            // TOTAL
            // ==================================================

            const totalAmount =
                serviceAmount +
                deliveryCharge;


            if(
                totalAmount <=
                0
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Invalid order amount."

                });

            }


            // ==================================================
            // ORDER NUMBER
            // ==================================================

            const orderNumber =
                await generateOrderNumber();


            // ==================================================
            // RAZORPAY ORDER
            // ==================================================

            const razorpayOrder =
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
                        orderNumber

                });


            // ==================================================
            // SAVE ORDER
            // ==================================================

            const order =
                await QuickOrder
                .create({

                    orderId:
                        orderNumber,

                    customerName:
                        customerName,

                    mobile:
                        mobile,

                    address:
                        address,

                    customerLocation:{

                        latitude:
                            customerLatitude,

                        longitude:
                            customerLongitude,

                        accuracy:
                            safeNumber(
                                req.body.accuracy,
                                0
                            )

                    },

                    distanceFromShopKm:
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

                    documents:
                        documents,

                    copies:
                        copies,

                    printType:
                        req.body.printType
                        ||
                        "Black & White",

                    serviceAmount:
                        Number(
                            serviceAmount
                            .toFixed(2)
                        ),

                    deliveryCharge:
                        Number(
                            deliveryCharge
                            .toFixed(2)
                        ),

                    totalAmount:
                        Number(
                            totalAmount
                            .toFixed(2)
                        ),

                    paymentStatus:
                        "Pending",

                    razorpayOrderId:
                        razorpayOrder.id,

                    status:
                        "Pending"

                });


            // ==================================================
            // RESPONSE
            // ==================================================

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
                    order.serviceName,

                serviceAmount:
                    order.serviceAmount,

                deliveryCharge:
                    order.deliveryCharge,

                totalAmount:
                    order.totalAmount,

                amount:
                    razorpayOrder.amount,

                razorpayOrderId:
                    razorpayOrder.id,

                distanceKm:
                    order
                    .distanceFromShopKm

            });

        }
        catch(error){

            console.error(
                "CREATE QUICK ORDER ERROR:",
                error
            );


            return res
            .status(500)
            .json({

                success:false,

                message:
                    error.message
                    ||
                    "Order create नहीं हुआ."

            });

        }

    }
);

// ======================================================
// VERIFY PAYMENT
// POST /quick-service/verify-payment
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


            // ==================================================
            // BASIC CHECK
            // ==================================================

            if(
                !orderId ||
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Payment details incomplete हैं."

                });

            }


            // ==================================================
            // FIND ORDER
            // ==================================================

            const existingOrder =
                await QuickOrder
                .findById(
                    orderId
                );


            if(
                !existingOrder
            ){

                return res
                .status(404)
                .json({

                    success:false,

                    message:
                        "Order नहीं मिला."

                });

            }


            // ==================================================
            // RAZORPAY ORDER ID MATCH
            // ==================================================

            if(
                existingOrder
                .razorpayOrderId !==
                razorpay_order_id
            ){

                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Razorpay Order ID match नहीं हुआ."

                });

            }


            // ==================================================
            // CREATE EXPECTED SIGNATURE
            // ==================================================

            const body =

                razorpay_order_id +

                "|" +

                razorpay_payment_id;


            const expectedSignature =

                crypto

                .createHmac(

                    "sha256",

                    process.env
                    .RAZORPAY_KEY_SECRET

                )

                .update(
                    body
                )

                .digest(
                    "hex"
                );


            // ==================================================
            // VERIFY SIGNATURE
            // ==================================================

            if(
                expectedSignature !==
                razorpay_signature
            ){

                existingOrder.paymentStatus =
                    "Failed";


                await existingOrder.save();


                return res
                .status(400)
                .json({

                    success:false,

                    message:
                        "Payment Verification Failed."

                });

            }


            // ==================================================
            // UPDATE ORDER
            // ==================================================

            existingOrder.paymentStatus =
                "Paid";


            existingOrder
            .razorpayPaymentId =
                razorpay_payment_id;


            existingOrder.status =
                "Pending";


            await existingOrder.save();


            // ==================================================
            // SUCCESS RESPONSE
            // ==================================================

            return res.json({

                success:true,

                message:
                    "Payment Successful",

                orderId:
                    existingOrder._id,

                orderNumber:
                    existingOrder.orderId,

                paymentId:
                    existingOrder
                    .razorpayPaymentId,

                totalAmount:
                    existingOrder
                    .totalAmount

            });

        }
        catch(error){

            console.error(
                "VERIFY QUICK PAYMENT ERROR:",
                error
            );


            return res
            .status(500)
            .json({

                success:false,

                message:
                    error.message
                    ||
                    "Payment verify नहीं हो सका."

            });

        }

    }
);

// ======================================================
// SUCCESS PAGE
// GET /quick-service/success/:id
// ======================================================

router.get(
    "/quick-service/success/:id",

    async(req,res)=>{

        try{

            const order =
                await QuickOrder
                .findById(
                    req.params.id
                )
                .lean();


            if(
                !order
            ){

                return res
                .status(404)
                .send(
                    "Order Not Found"
                );

            }


            if(
                order.paymentStatus !==
                "Paid"
            ){

                return res
                .status(400)
                .send(
                    "Payment अभी Confirm नहीं हुआ है."
                );

            }


            return res.send(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>
Order Successful
</title>


<style>

*{
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

body{
    margin:0;
    background:#f0fdf4;
    color:#0f172a;
}

.container{
    max-width:600px;
    margin:auto;
    padding:25px 15px;
}

.card{
    background:white;
    padding:25px;
    border-radius:20px;
    box-shadow:
    0 10px 30px
    rgba(0,0,0,.10);
    text-align:center;
}

.success-icon{
    font-size:65px;
    margin-bottom:10px;
}

h1{
    color:#15803d;
    margin-bottom:8px;
}

.order-number{
    background:#dcfce7;
    color:#166534;
    padding:12px;
    border-radius:10px;
    font-size:20px;
    font-weight:bold;
    margin:20px 0;
}

.details{
    text-align:left;
    margin-top:20px;
    padding:15px;
    border-radius:12px;
    background:#f8fafc;
    line-height:1.9;
}

.paid{
    color:#15803d;
    font-weight:bold;
}

.status{
    color:#2563eb;
    font-weight:bold;
}

.button{
    display:block;
    margin-top:20px;
    padding:14px;
    border-radius:10px;
    background:#16a34a;
    color:white;
    text-decoration:none;
    font-weight:bold;
}

.home{
    background:#2563eb;
}

</style>

</head>


<body>


<div class="container">

<div class="card">

<div class="success-icon">
✅
</div>


<h1>
Payment Successful
</h1>

<p>
आपका Order Successfully Receive हो गया है।
</p>


<div class="order-number">

Order ID:
${order.orderId}

</div>


<div class="details">

<strong>
📄 Service:
</strong>

${order.serviceName}

<br>


<strong>
👤 Name:
</strong>

${order.customerName}

<br>


<strong>
📱 Mobile:
</strong>

${order.mobile}

<br>


<strong>
🏠 Delivery Address:
</strong>

${order.address}

<br>


<strong>
📍 Distance:
</strong>

${
    Number(
        order.distanceFromShopKm ||
        0
    ).toFixed(2)
} KM

<br>


<strong>
💵 Service Amount:
</strong>

₹${
    Number(
        order.serviceAmount ||
        0
    ).toFixed(2)
}

<br>


<strong>
🚚 Delivery Charge:
</strong>

₹${
    Number(
        order.deliveryCharge ||
        0
    ).toFixed(2)
}

<br>


<strong>
💰 Total Paid:
</strong>

₹${
    Number(
        order.totalAmount ||
        0
    ).toFixed(2)
}

<br>


<strong>
💳 Payment:
</strong>

<span class="paid">
PAID ✅
</span>

<br>


<strong>
📦 Order Status:
</strong>

<span class="status">
${order.status || "Pending"}
</span>

</div>


<a
href="/quick-service"
class="button"
>
⚡ NEW ORDER
</a>


<a
href="/"
class="button home"
>
🏠 HOME
</a>


</div>

</div>


</body>

</html>

            `);

        }
        catch(error){

            console.error(
                "QUICK SERVICE SUCCESS PAGE ERROR:",
                error
            );


            return res
            .status(500)
            .send(
                error.message
                ||
                "Success Page Load नहीं हुआ."
            );

        }

    }
);