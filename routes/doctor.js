// const path = require("path");
// const express = require("express");
// const router = express.Router();

// const Product = require("../models/Product");
// const DoctorOrder = require("../models/DoctorOrder");

// const PDFDocument = require("pdfkit");




// // =================================
// // DOCTOR ORDERS
// // =================================

// router.get("/orders", async (req, res) => {

//     try {

//         // ===============================
//         // DOCTOR LOGIN CHECK
//         // ===============================

//         if (!req.session.doctor) {
//             return res.redirect("/admin/doctor-login");
//         }


//         // ===============================
//         // LOGGED-IN DOCTOR
//         // ===============================

//         const doctor = req.session.doctor;


//         // ===============================
//         // GET ORDERS
//         // ===============================

//         const orders = await DoctorOrder.find()
//             .sort({
//                 createdAt: -1
//             });


//         // ===============================
//         // DOCTOR NAME
//         // ===============================

//         const doctorName =
//             doctor.name ||
//             "Doctor";


//         const doctorSpecialization =
//             doctor.specialization ||
//             "General Physician";


//         // ===============================
//         // ORDER HTML
//         // ===============================

//         const orderHTML = orders.length

//             ?

//             orders.map(order => {

//                 const itemsHTML =
//                     Array.isArray(order.items)

//                         ?

//                         order.items.map(item => {

//                             const qty =
//                                 Number(item.qty || 0);

//                             const price =
//                                 Number(item.price || 0);

//                             const amount =
//                                 qty * price;


//                             return `

//                                 <div class="product">

//                                     <div class="product-info">

//                                         <b>
//                                             ${item.name || "Product"}
//                                         </b>

//                                         <span>
//                                             Qty: ${qty}
//                                         </span>

//                                     </div>


//                                     <div class="product-price">

//                                         ₹${amount.toFixed(2)}

//                                     </div>

//                                 </div>

//                             `;

//                         }).join("")

//                         :

//                         "";


//                 // ===========================
//                 // TOTAL
//                 // ===========================

//                 const totalAmount =
//                     Number(
//                         order.totalAmount || 0
//                     );


//                 // ===========================
//                 // STATUS
//                 // ===========================

//                 const status =
//                     order.status ||
//                     "Pending";


//                 return `

//                     <div class="order-card">


//                         <!-- ORDER HEADER -->

//                         <div class="order-top">

//                             <div>

//                                 <div class="order-id">

//                                     Order #${String(order._id).slice(-8)}

//                                 </div>

//                                 <div class="order-date">

//                                     📅
//                                     ${new Date(
//                                         order.createdAt
//                                     ).toLocaleDateString(
//                                         "en-IN",
//                                         {
//                                             day: "2-digit",
//                                             month: "short",
//                                             year: "numeric"
//                                         }
//                                     )}

//                                 </div>

//                             </div>


//                             <span class="status">

//                                 ${status}

//                             </span>

//                         </div>



//                         <!-- PRODUCTS -->

//                         <div class="product-box">

//                             <div class="section-title">

//                                 🛒 Ordered Products

//                             </div>

//                             ${itemsHTML}

//                         </div>



//                         <!-- TOTAL -->

//                         <div class="total-row">

//                             <span>
//                                 Total Amount
//                             </span>

//                             <strong>
//                                 ₹${totalAmount.toFixed(2)}
//                             </strong>

//                         </div>



//                         <!-- INVOICE -->

//                         <div class="order-actions">

//                             <a
//                                 class="btn invoice-btn"
//                                 href="/doctor/invoice/${order._id}"
//                             >

//                                 📄 Download Invoice

//                             </a>

//                         </div>


//                     </div>

//                 `;

//             }).join("")

//             :

//             `

//                 <div class="empty-orders">

//                     <div class="empty-icon">
//                         📦
//                     </div>

//                     <h2>
//                         No Orders Found
//                     </h2>

//                     <p>
//                         Your orders will appear here.
//                     </p>

//                     <a
//                         href="/doctor/dashboard"
//                         class="shop-btn"
//                     >

//                         🛒 Shop Products

//                     </a>

//                 </div>

//             `;


//         // ===============================
//         // SEND PAGE
//         // ===============================

//         res.send(`

// <!DOCTYPE html>

// <html lang="en">

// <head>

// <meta charset="UTF-8">

// <meta
//     name="viewport"
//     content="width=device-width, initial-scale=1.0"
// >

// <title>
//     My Orders | GLOBAL HEALTHCARE
// </title>


// <style>


// *{

//     margin:0;
//     padding:0;
//     box-sizing:border-box;

//     font-family:
//         Arial,
//         Helvetica,
//         sans-serif;

// }


// body{

//     min-height:100vh;

//     background:
//         linear-gradient(
//             135deg,
//             #eef7ff,
//             #f8fafc
//         );

//     color:#0f172a;

//     padding:25px;

// }


// /* =================================
//    MAIN CONTAINER
// ================================= */

// .container{

//     max-width:1200px;

//     margin:auto;

// }


// /* =================================
//    HEADER
// ================================= */

// .header{

//     background:
//         linear-gradient(
//             135deg,
//             #005bea,
//             #00c6fb
//         );

//     padding:25px 30px;

//     border-radius:25px;

//     color:white;

//     display:flex;

//     justify-content:space-between;

//     align-items:center;

//     gap:20px;

//     margin-bottom:25px;

//     box-shadow:
//         0 15px 40px
//         rgba(0,0,0,.15);

// }


// .logo{

//     display:flex;

//     align-items:center;

//     gap:12px;

// }


// .logo-icon{

//     width:50px;
//     height:50px;

//     display:flex;

//     align-items:center;
//     justify-content:center;

//     background:
//         rgba(255,255,255,.18);

//     border-radius:15px;

//     font-size:25px;

// }


// .logo-text{

//     font-size:25px;

//     font-weight:900;

// }


// .logo-sub{

//     font-size:12px;

//     opacity:.85;

//     margin-top:3px;

// }


// /* =================================
//    DOCTOR INFO
// ================================= */

// .doctor-info{

//     background:white;

//     padding:20px 25px;

//     border-radius:20px;

//     margin-bottom:25px;

//     display:flex;

//     align-items:center;

//     gap:18px;

//     box-shadow:
//         0 10px 30px
//         rgba(0,0,0,.07);

//     border:1px solid #e2e8f0;

// }


// .doctor-avatar{

//     width:58px;
//     height:58px;

//     border-radius:50%;

//     display:flex;

//     align-items:center;
//     justify-content:center;

//     background:
//         linear-gradient(
//             135deg,
//             #dbeafe,
//             #e0f2fe
//         );

//     font-size:28px;

// }


// .doctor-info h2{

//     font-size:21px;

//     margin-bottom:5px;

// }


// .doctor-info p{

//     color:#64748b;

//     font-size:14px;

// }


// /* =================================
//    HEADER BUTTON
// ================================= */

// .dashboard-btn{

//     background:white;

//     color:#2563eb;

//     padding:12px 20px;

//     border-radius:14px;

//     text-decoration:none;

//     font-weight:800;

//     white-space:nowrap;

// }


// .dashboard-btn:hover{

//     background:#eff6ff;

// }


// /* =================================
//    PAGE TITLE
// ================================= */

// .page-title{

//     margin:10px 0 20px;

// }


// .page-title h1{

//     font-size:30px;

// }


// .page-title p{

//     color:#64748b;

//     margin-top:5px;

// }


// /* =================================
//    ORDER CARD
// ================================= */

// .order-card{

//     background:white;

//     padding:25px;

//     border-radius:24px;

//     margin-bottom:22px;

//     border:1px solid #e2e8f0;

//     box-shadow:
//         0 12px 35px
//         rgba(15,23,42,.07);

//     transition:.3s;

// }


// .order-card:hover{

//     transform:translateY(-3px);

//     box-shadow:
//         0 18px 45px
//         rgba(15,23,42,.12);

// }


// /* =================================
//    ORDER TOP
// ================================= */

// .order-top{

//     display:flex;

//     justify-content:space-between;

//     align-items:center;

//     gap:15px;

//     padding-bottom:18px;

//     border-bottom:1px solid #e5e7eb;

// }


// .order-id{

//     color:#2563eb;

//     font-size:18px;

//     font-weight:900;

// }


// .order-date{

//     color:#64748b;

//     font-size:13px;

//     margin-top:6px;

// }


// /* =================================
//    STATUS
// ================================= */

// .status{

//     padding:8px 16px;

//     border-radius:30px;

//     background:#fef3c7;

//     color:#92400e;

//     font-size:13px;

//     font-weight:800;

// }


// /* =================================
//    PRODUCTS
// ================================= */

// .product-box{

//     margin-top:20px;

// }


// .section-title{

//     font-size:16px;

//     font-weight:900;

//     margin-bottom:12px;

// }


// .product{

//     display:flex;

//     justify-content:space-between;

//     align-items:center;

//     gap:15px;

//     background:#f8fafc;

//     padding:16px;

//     border-radius:15px;

//     margin-bottom:10px;

//     border:1px solid #e2e8f0;

// }


// .product-info{

//     display:flex;

//     flex-direction:column;

//     gap:5px;

// }


// .product-info b{

//     font-size:16px;

// }


// .product-info span{

//     color:#64748b;

//     font-size:13px;

// }


// .product-price{

//     font-weight:900;

//     color:#16a34a;

//     white-space:nowrap;

// }


// /* =================================
//    TOTAL
// ================================= */

// .total-row{

//     margin-top:18px;

//     padding:18px;

//     border-radius:17px;

//     background:
//         linear-gradient(
//             135deg,
//             #ecfdf5,
//             #f0fdf4
//         );

//     display:flex;

//     justify-content:space-between;

//     align-items:center;

// }


// .total-row span{

//     color:#475569;

//     font-weight:700;

// }


// .total-row strong{

//     color:#15803d;

//     font-size:25px;

// }


// /* =================================
//    ACTIONS
// ================================= */

// .order-actions{

//     margin-top:18px;

//     display:flex;

//     justify-content:flex-end;

// }


// .btn{

//     display:inline-flex;

//     align-items:center;

//     justify-content:center;

//     gap:8px;

//     padding:13px 20px;

//     border-radius:14px;

//     text-decoration:none;

//     font-weight:800;

// }


// .invoice-btn{

//     background:
//         linear-gradient(
//             135deg,
//             #2563eb,
//             #4f46e5
//         );

//     color:white;

//     box-shadow:
//         0 8px 20px
//         rgba(37,99,235,.25);

// }


// .invoice-btn:hover{

//     transform:translateY(-2px);

// }


// /* =================================
//    EMPTY
// ================================= */

// .empty-orders{

//     background:white;

//     padding:70px 25px;

//     border-radius:25px;

//     text-align:center;

//     box-shadow:
//         0 12px 35px
//         rgba(0,0,0,.07);

// }


// .empty-icon{

//     font-size:55px;

//     margin-bottom:15px;

// }


// .empty-orders h2{

//     margin-bottom:8px;

// }


// .empty-orders p{

//     color:#64748b;

//     margin-bottom:25px;

// }


// .shop-btn{

//     display:inline-block;

//     background:
//         linear-gradient(
//             135deg,
//             #2563eb,
//             #4f46e5
//         );

//     color:white;

//     padding:13px 22px;

//     border-radius:14px;

//     text-decoration:none;

//     font-weight:800;

// }


// /* =================================
//    FOOTER
// ================================= */

// .footer{

//     text-align:center;

//     color:#64748b;

//     padding:30px 10px;

//     font-size:13px;

// }


// .footer strong{

//     color:#2563eb;

// }


// /* =================================
//    MOBILE
// ================================= */

// @media(max-width:700px){

//     body{

//         padding:12px;

//     }


//     .header{

//         flex-direction:column;

//         align-items:flex-start;

//         padding:20px;

//     }


//     .logo-text{

//         font-size:21px;

//     }


//     .doctor-info{

//         padding:18px;

//     }


//     .page-title h1{

//         font-size:25px;

//     }


//     .order-card{

//         padding:18px;

//         border-radius:19px;

//     }


//     .order-top{

//         align-items:flex-start;

//     }


//     .status{

//         font-size:11px;

//         padding:7px 11px;

//     }


//     .product{

//         padding:13px;

//     }


//     .product-price{

//         font-size:14px;

//     }


//     .total-row strong{

//         font-size:21px;

//     }


//     .order-actions{

//         justify-content:stretch;

//     }


//     .invoice-btn{

//         width:100%;

//     }

// }


// </style>

// </head>


// <body>


// <div class="container">


//     <!-- HEADER -->

//     <header class="header">


//         <div class="logo">

//             <div class="logo-icon">
//                 🩺
//             </div>


//             <div>

//                 <div class="logo-text">
//                     GLOBAL HEALTHCARE
//                 </div>

//                 <div class="logo-sub">
//                     SAFE & SECURE Healthcare
//                 </div>

//             </div>

//         </div>


//         <a
//             href="/doctor/dashboard"
//             class="dashboard-btn"
//         >

//             🏠 Dashboard

//         </a>

//     </header>



//     <!-- DOCTOR -->

//     <section class="doctor-info">


//         <div class="doctor-avatar">
//             👨‍⚕️
//         </div>


//         <div>

//             <h2>
//                 Dr. ${doctorName}
//             </h2>

//             <p>
//                 ${doctorSpecialization}
//             </p>

//         </div>


//     </section>



//     <!-- TITLE -->

//     <section class="page-title">

//         <h1>
//             📦 My Orders
//         </h1>

//         <p>
//             View your complete order history and invoices.
//         </p>

//     </section>



//     <!-- ORDERS -->

//     ${orderHTML}



//     <!-- FOOTER -->

//     <footer class="footer">

//         © 2026
//         <strong>
//             GLOBAL HEALTHCARE
//         </strong>

//         <br>

//         Powered by
//         <strong>
//             Osium Biogenix
//         </strong>

//     </footer>


// </div>


// </body>

// </html>

//         `);


//     }

//     catch (err) {

//         console.log(err);

//         res.status(500)
//             .send("Orders Page Error");

//     }

// });





// // =================================
// // CREATE ORDER
// // =================================


// router.post(
// "/create-order",
// async(req,res)=>{


// try{


// if(!req.session.doctor){


// return res.status(401)
// .json({

// success:false,

// message:"Unauthorized"

// });


// }




// const cart =
// req.body.cart;



// let total = 0;

// cart.forEach(item=>{


// total +=
// Number(item.price) *
// Number(item.qty);


// });





// const order =
// await DoctorOrder.create({

// doctorId:
// req.session.doctor._id,

// items:
// cart.map(item=>({

// productId:item.id,

// name:item.name,

// price:Number(item.price),

// image:item.image,

// qty:Number(item.qty)

// })),

// totalAmount:
// total,

// status:
// "Pending"

// });





// res.json({


// success:true,


// message:"Order Created",


// orderId:
// order._id



// });




// }

// catch(err){


// console.log(err);


// res.status(500)
// .json({


// success:false,


// message:
// "Order Failed"


// });


// }


// });









// // =================================
// // GENERATE INVOICE PDF
// // =================================


// router.get(
// "/invoice/:id",
// async(req,res)=>{

// try{


// const order =
// await DoctorOrder.findById(req.params.id);



// if(!order){

// return res.send("Order Not Found");

// }




// res.setHeader(
// "Content-Type",
// "application/pdf"
// );


// res.setHeader(
// "Content-Disposition",
// `attachment; filename=Estimate-${order._id}.pdf`
// );


// const doc = new PDFDocument({
//     size: "A4",
//     margins: {
//         top: 40,
//         bottom: 40,
//         left: 40,
//         right: 40
//     }
// });


// // =========================================
// // FONT
// // =========================================

// doc.font(
//     path.join(
//         __dirname,
//         "../fonts/DejaVuSans.ttf"
//     )
// );


// // =========================================
// // PIPE
// // =========================================

// doc.pipe(res);


// // =========================================
// // HELPER
// // =========================================

// const rupee = (amount) => {
//     return `Rs.${Number(amount || 0).toFixed(2)}`;
// };


// // =========================================
// // HEADER
// // =========================================

// doc
//     .fontSize(20)
//     .text(
//         "GLOBAL HEALTHCARE",
//         {
//             align: "center"
//         }
//     );

// doc
//     .fontSize(10)
//     .text(
//         "SAFE & SECURE Healthcare",
//         {
//             align: "center"
//         }
//     );

// doc.moveDown(1);


// doc
//     .fontSize(16)
//     .text(
//         "ROUGH ESTIMATE",
//         {
//             align: "center"
//         }
//     );

// doc.moveDown(1.5);


// // =========================================
// // DOCTOR DETAILS
// // =========================================

// // Doctor name different fields se safely nikalega

// const doctorName =
//     order.doctorName ||
//     order.doctor?.name ||
//     order.doctor?.doctorName ||
//     order.customerName ||
//     order.name ||
//     "Doctor";


// // Doctor ID

// const doctorId =
//     order.doctorId ||
//     order.doctor?.doctorId ||
//     "";


// // Phone

// const doctorPhone =
//     order.doctorPhone ||
//     order.doctor?.phone ||
//     "";


// // =========================================
// // BILL DETAILS
// // =========================================

// doc.fontSize(11);

// doc.text(
//     `DOCTOR : Dr. ${doctorName}`
// );

// if (doctorId) {

//     doc.text(
//         `DOCTOR ID : ${doctorId}`
//     );

// }

// if (doctorPhone) {

//     doc.text(
//         `PHONE : ${doctorPhone}`
//     );

// }

// doc.text(
//     `BILL NO : A${order._id.toString().slice(-6)}`
// );

// doc.text(
//     `DATE : ${
//         new Date(order.createdAt)
//             .toLocaleDateString("en-GB")
//     }`
// );

// doc.text(
//     "TYPE : CREDIT"
// );


// doc.moveDown(1);


// // =========================================
// // TABLE TOP LINE
// // =========================================

// doc
//     .fontSize(9)
//     .text(
//         "--------------------------------------------------------------------------------",
//         40
//     );

// doc.moveDown(0.5);


// // =========================================
// // TABLE HEADER
// // =========================================

// let tableY = doc.y;

// doc
//     .fontSize(10)
//     .text(
//         "SL",
//         40,
//         tableY
//     );

// doc.text(
//     "PRODUCT DESCRIPTION",
//     70,
//     tableY
// );

// doc.text(
//     "QTY",
//     300,
//     tableY
// );

// doc.text(
//     "RATE",
//     350,
//     tableY
// );

// doc.text(
//     "AMOUNT",
//     430,
//     tableY
// );


// // =========================================
// // HEADER LINE
// // =========================================

// tableY += 20;

// doc.text(
//     "--------------------------------------------------------------------------------",
//     40,
//     tableY
// );

// tableY += 10;


// // =========================================
// // PRODUCTS
// // =========================================

// let total = 0;

// let totalQty = 0;


// order.items.forEach((item, index) => {

//     const qty =
//         Number(item.qty || 0);

//     const rate =
//         Number(item.price || 0);

//     const amount =
//         qty * rate;


//     total += amount;

//     totalQty += qty;


//     // -------------------------------------
//     // PRODUCT NAME
//     // -------------------------------------

//     let productName =
//         item.name || "Product";


//     // Long product name control

//     if (productName.length > 34) {

//         productName =
//             productName.substring(0, 34) + "...";

//     }


//     // -------------------------------------
//     // ROW
//     // -------------------------------------

//     doc
//         .fontSize(9)
//         .text(
//             `${index + 1}`,
//             40,
//             tableY
//         );


//     doc.text(
//         productName,
//         70,
//         tableY,
//         {
//             width: 215
//         }
//     );


//     doc.text(
//         `${qty}`,
//         300,
//         tableY
//     );


//     doc.text(
//         rupee(rate),
//         350,
//         tableY
//     );


//     doc.text(
//         rupee(amount),
//         430,
//         tableY
//     );


//     // -------------------------------------
//     // NEXT ROW
//     // -------------------------------------

//     tableY += 25;


//     // Page overflow protection

//     if (tableY > 730) {

//         doc.addPage();

//         tableY = 50;

//     }

// });


// // =========================================
// // TABLE BOTTOM LINE
// // =========================================

// doc.text(
//     "--------------------------------------------------------------------------------",
//     40,
//     tableY
// );

// tableY += 25;


// // =========================================
// // SUMMARY
// // =========================================

// doc
//     .fontSize(11)
//     .text(
//         `NO OF ITEMS : ${order.items.length}`,
//         40,
//         tableY
//     );

// tableY += 20;


// doc.text(
//     `TOTAL QUANTITY : ${totalQty}`,
//     40,
//     tableY
// );

// tableY += 25;


// // =========================================
// // GRAND TOTAL
// // =========================================

// doc
//     .fontSize(13)
//     .text(
//         `GRAND TOTAL : ${rupee(total)}`,
//         40,
//         tableY
//     );

// tableY += 25;


// // =========================================
// // BILL SUMMARY
// // =========================================

// doc
//     .fontSize(11)
//     .text(
//         "--------------------------------------------------------------------------------",
//         40,
//         tableY
//     );

// tableY += 20;


// doc.text(
//     `CURRENT BILL AMOUNT : ${rupee(total)}`,
//     40,
//     tableY
// );

// tableY += 20;


// const backDues =
//     Number(order.backDues || 0);


// const totalBalance =
//     total + backDues;


// doc.text(
//     `BACK DUES AMOUNT    : ${rupee(backDues)}`,
//     40,
//     tableY
// );

// tableY += 20;


// doc.text(
//     `TOTAL BALANCE       : ${rupee(totalBalance)}`,
//     40,
//     tableY
// );

// tableY += 25;


// doc.text(
//     "--------------------------------------------------------------------------------",
//     40,
//     tableY
// );

// tableY += 30;


// // =========================================
// // FOOTER
// // =========================================

// doc
//     .fontSize(10)
//     .text(
//         "Import Purchase ONLINE : No",
//         40,
//         tableY
//     );

// tableY += 20;


// doc
//     .fontSize(12)
//     .text(
//         "GLOBAL HEALTHCARE",
//         40,
//         tableY
//     );

// tableY += 18;


// doc
//     .fontSize(9)
//     .text(
//         "Powered by Osium Biogenix",
//         40,
//         tableY
//     );

// tableY += 18;


// doc.text(
//     "Call : 7488033368",
//     40,
//     tableY
// );

// tableY += 25;


// doc.text(
//     "============================================================",
//     40,
//     tableY
// );


// // =========================================
// // END PDF
// // =========================================

// doc.end();




// // =========================================
// // INVOICE ERROR HANDLER
// // =========================================

// }

// catch (err) {

//     console.log("Invoice Error:", err);

//     if (!res.headersSent) {

//         res.status(500)
//             .send("Invoice Generate Error");

//     }

// }


// // =================================
// // LOGOUT
// // =================================

// router.get(
//     "/logout",
//     (req, res) => {

//         req.session.destroy(
//             () => {

//                 res.redirect(
//                     "/admin/doctor-login"
//                 );

//             }
//         );

//     }
// );


// // =================================
// // DOCTOR DASHBOARD
// // =================================

// router.get(
//     "/dashboard",
//     async (req, res) => {

//         try {

//             // =========================
//             // LOGIN CHECK
//             // =========================

//             if (!req.session.doctor) {

//                 return res.redirect(
//                     "/admin/doctor-login"
//                 );

//             }


//             // =========================
//             // GET PRODUCTS
//             // =========================

//             const products =
//                 await Product.find()
//                     .sort({
//                         createdAt: -1
//                     });


//             // =========================
//             // DASHBOARD PAGE
//             // =========================

//             const DoctorDashboard =
//                 require(
//                     "../pages/DoctorDashboard"
//                 );


//             res.send(

//                 DoctorDashboard(
//                     req.session.doctor,
//                     products
//                 )

//             );

//         }

//         catch (err) {

//             console.log(
//                 "Dashboard Error:",
//                 err
//             );

//             res.status(500)
//                 .send(
//                     "Dashboard Error"
//                 );

//         }

//     }
// );




// // =================================
// // LOGOUT
// // =================================


// router.get(
// "/logout",
// (req,res)=>{


// req.session.destroy(
// ()=>{


// res.redirect(
// "/admin/doctor-login"
// );


// });


// });




// router.get("/dashboard", async(req,res)=>{

//     try{

//         if(!req.session.doctor){

//             return res.redirect("/admin/doctor-login");

//         }


//         const products = await Product.find()
//         .sort({
//             createdAt:-1
//         });


//         const DoctorDashboard = require("../pages/DoctorDashboard");


//         res.send(
//             DoctorDashboard(
//                 req.session.doctor,
//                 products
//             )
//         );


//     }
//     catch(err){

//         console.log(err);

//         res.status(500)
//         .send("Dashboard Error");

//     }

// });




// module.exports = router;


const path = require("path");
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const DoctorOrder = require("../models/DoctorOrder");
const Doctor = require("../models/Doctor");

const PDFDocument = require("pdfkit");


// ======================================================
// SAFE HTML
// ======================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ======================================================
// DOCTOR ORDERS
// ======================================================

router.get("/orders", async (req, res) => {

    try {

        // ==============================================
        // LOGIN CHECK
        // ==============================================

        if (!req.session.doctor) {

            return res.redirect(
                "/admin/doctor-login"
            );

        }


        // ==============================================
        // LOGGED IN DOCTOR
        // ==============================================

        const doctor = req.session.doctor;


        const doctorName =
            doctor.name ||
            doctor.doctorName ||
            "Doctor";


        const doctorSpecialization =
            doctor.specialization ||
            "General Physician";


        // ==============================================
        // GET ORDERS
        // ==============================================

        const orders =
            await DoctorOrder.find({
                doctorId: doctor._id
            })
            .sort({
                createdAt: -1
            });


        // ==============================================
        // ORDER HTML
        // ==============================================

        let orderHTML = "";


        if (orders.length > 0) {

            orderHTML = orders.map(order => {


                const itemsHTML =
                    Array.isArray(order.items)

                        ?

                    order.items.map(item => {

                        const qty =
                            Number(item.qty || 0);

                        const price =
                            Number(item.price || 0);

                        const amount =
                            qty * price;


                        return `

                            <div class="product">

                                <div class="product-info">

                                    <div class="product-name">
                                        ${escapeHTML(
                                            item.name || "Product"
                                        )}
                                    </div>

                                    <div class="product-meta">
                                        Quantity: ${qty}
                                        &nbsp; × &nbsp;
                                        ₹${price.toFixed(2)}
                                    </div>

                                </div>


                                <div class="product-price">

                                    ₹${amount.toFixed(2)}

                                </div>

                            </div>

                        `;

                    }).join("")

                        :

                    "";


                // ======================================
                // TOTAL
                // ======================================

                const totalAmount =
                    Number(
                        order.totalAmount || 0
                    );


                // ======================================
                // STATUS
                // ======================================

                const status =
                    order.status ||
                    "Pending";


                return `

                    <div class="order-card">


                        <div class="order-top">

                            <div>

                                <div class="order-id">

                                    Order #
                                    ${String(order._id).slice(-8)}

                                </div>


                                <div class="order-date">

                                    📅

                                    ${new Date(
                                        order.createdAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}

                                </div>

                            </div>


                            <span class="status">

                                ${escapeHTML(status)}

                            </span>

                        </div>



                        <div class="product-box">

                            <div class="section-title">

                                🛒 Ordered Products

                            </div>


                            ${itemsHTML}

                        </div>



                        <div class="total-row">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹${totalAmount.toFixed(2)}
                            </strong>

                        </div>



                        <div class="order-actions">

                            <a
                                class="btn invoice-btn"
                                href="/doctor/invoice/${order._id}"
                            >

                                📄 Download Invoice

                            </a>

                        </div>


                    </div>

                `;

            }).join("");

        }

        else {

            orderHTML = `

                <div class="empty-orders">

                    <div class="empty-icon">
                        📦
                    </div>

                    <h2>
                        No Orders Found
                    </h2>

                    <p>
                        Your orders will appear here.
                    </p>

                    <a
                        href="/doctor/dashboard"
                        class="shop-btn"
                    >

                        🛒 Shop Products

                    </a>

                </div>

            `;

        }


        // ==============================================
        // PAGE
        // ==============================================

        res.send(`

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    My Orders | GLOBAL HEALTHCARE
</title>


<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:
        "Poppins",
        "Segoe UI",
        Arial,
        sans-serif;
}


body{

    min-height:100vh;

    background:
        linear-gradient(
            135deg,
            #eef7ff,
            #f8fafc
        );

    color:#0f172a;

    padding:25px;

}


/* =========================================
   HEADER
========================================= */

.header{

    max-width:1250px;

    margin:auto;

    padding:22px 28px;

    border-radius:24px;

    background:
        linear-gradient(
            135deg,
            #005bea,
            #00c6fb
        );

    color:white;

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:20px;

    box-shadow:
        0 18px 45px
        rgba(0,91,234,.22);

}


.logo{

    display:flex;

    align-items:center;

    gap:14px;

}


.logo-icon{

    width:55px;

    height:55px;

    border-radius:18px;

    background:
        rgba(255,255,255,.18);

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:28px;

}


.logo-text{

    font-size:24px;

    font-weight:900;

    letter-spacing:.5px;

}


.logo-sub{

    font-size:12px;

    opacity:.85;

    margin-top:3px;

}


.dashboard-btn{

    text-decoration:none;

    color:#2563eb;

    background:white;

    padding:12px 20px;

    border-radius:14px;

    font-weight:800;

    box-shadow:
        0 8px 20px
        rgba(0,0,0,.12);

    transition:.25s;

}


.dashboard-btn:hover{

    transform:translateY(-2px);

}


/* =========================================
   DOCTOR
========================================= */

.doctor-info{

    max-width:1250px;

    margin:25px auto 18px;

    background:white;

    border:1px solid #e2e8f0;

    border-radius:22px;

    padding:20px 24px;

    display:flex;

    align-items:center;

    gap:18px;

    box-shadow:
        0 12px 35px
        rgba(15,23,42,.07);

}


.doctor-avatar{

    width:65px;

    height:65px;

    border-radius:20px;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:34px;

    background:
        linear-gradient(
            135deg,
            #dbeafe,
            #eff6ff
        );

}


.doctor-info h2{

    font-size:22px;

}


.doctor-info p{

    margin-top:5px;

    color:#64748b;

    font-weight:600;

}


/* =========================================
   PAGE TITLE
========================================= */

.page-title{

    max-width:1250px;

    margin:25px auto;

}


.page-title h1{

    font-size:32px;

    font-weight:900;

}


.page-title p{

    color:#64748b;

    margin-top:7px;

}


/* =========================================
   ORDER CARD
========================================= */

.order-card{

    max-width:1250px;

    margin:0 auto 22px;

    background:white;

    border-radius:24px;

    padding:24px;

    border:1px solid #e2e8f0;

    box-shadow:
        0 15px 40px
        rgba(15,23,42,.07);

    transition:.3s;

}


.order-card:hover{

    transform:translateY(-4px);

    box-shadow:
        0 20px 50px
        rgba(15,23,42,.12);

}


/* =========================================
   ORDER TOP
========================================= */

.order-top{

    display:flex;

    justify-content:space-between;

    align-items:center;

    gap:20px;

    padding-bottom:18px;

    border-bottom:1px solid #eef2f7;

}


.order-id{

    color:#2563eb;

    font-size:18px;

    font-weight:900;

}


.order-date{

    color:#64748b;

    font-size:14px;

    margin-top:6px;

}


.status{

    padding:9px 16px;

    border-radius:50px;

    background:#fef3c7;

    color:#92400e;

    font-weight:800;

    font-size:13px;

}


/* =========================================
   PRODUCTS
========================================= */

.product-box{

    margin-top:20px;

}


.section-title{

    font-size:17px;

    font-weight:900;

    margin-bottom:12px;

}


.product{

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:20px;

    padding:16px;

    margin:10px 0;

    background:#f8fafc;

    border:1px solid #e2e8f0;

    border-radius:16px;

}


.product-name{

    font-size:16px;

    font-weight:800;

}


.product-meta{

    color:#64748b;

    font-size:13px;

    margin-top:5px;

}


.product-price{

    font-weight:900;

    color:#16a34a;

    font-size:17px;

    white-space:nowrap;

}


/* =========================================
   TOTAL
========================================= */

.total-row{

    margin-top:20px;

    padding:18px 20px;

    border-radius:18px;

    background:
        linear-gradient(
            135deg,
            #16a34a,
            #22c55e
        );

    color:white;

    display:flex;

    align-items:center;

    justify-content:space-between;

}


.total-row span{

    font-weight:700;

}


.total-row strong{

    font-size:25px;

}


/* =========================================
   ACTION
========================================= */

.order-actions{

    margin-top:18px;

}


.btn{

    display:inline-flex;

    align-items:center;

    justify-content:center;

    text-decoration:none;

    padding:13px 20px;

    border-radius:14px;

    font-weight:800;

}


.invoice-btn{

    color:white;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #4f46e5
        );

    box-shadow:
        0 10px 25px
        rgba(37,99,235,.22);

}


.invoice-btn:hover{

    transform:translateY(-2px);

}


/* =========================================
   EMPTY
========================================= */

.empty-orders{

    max-width:700px;

    margin:50px auto;

    text-align:center;

    background:white;

    padding:50px 25px;

    border-radius:25px;

    box-shadow:
        0 15px 40px
        rgba(0,0,0,.07);

}


.empty-icon{

    font-size:60px;

    margin-bottom:15px;

}


.empty-orders p{

    color:#64748b;

    margin:10px 0 20px;

}


.shop-btn{

    display:inline-block;

    text-decoration:none;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #4f46e5
        );

    color:white;

    padding:14px 24px;

    border-radius:14px;

    font-weight:800;

}


/* =========================================
   FOOTER
========================================= */

.footer{

    max-width:1250px;

    margin:35px auto 10px;

    text-align:center;

    padding:25px;

    color:#64748b;

    line-height:1.8;

}


.footer strong{

    color:#2563eb;

}


/* =========================================
   MOBILE
========================================= */

@media(max-width:700px){

    body{
        padding:12px;
    }

    .header{

        flex-direction:column;

        align-items:stretch;

        text-align:center;

    }

    .logo{

        justify-content:center;

    }

    .dashboard-btn{

        text-align:center;

    }

    .doctor-info{

        padding:18px;

    }

    .page-title h1{

        font-size:26px;

    }

    .order-card{

        padding:16px;

    }

    .order-top{

        align-items:flex-start;

        flex-direction:column;

    }

    .product{

        align-items:flex-start;

    }

    .total-row{

        gap:10px;

    }

    .total-row strong{

        font-size:20px;

    }

}

</style>

</head>


<body>


<header class="header">


    <div class="logo">

        <div class="logo-icon">
            🩺
        </div>

        <div>

            <div class="logo-text">
                GLOBAL HEALTHCARE
            </div>

            <div class="logo-sub">
                SAFE & SECURE Healthcare
            </div>

        </div>

    </div>


    <a
        href="/doctor/dashboard"
        class="dashboard-btn"
    >

        🏠 Dashboard

    </a>

</header>



<section class="doctor-info">

    <div class="doctor-avatar">
        👨‍⚕️
    </div>

    <div>

        <h2>
            Dr. ${escapeHTML(doctorName)}
        </h2>

        <p>
            ${escapeHTML(doctorSpecialization)}
        </p>

    </div>

</section>



<section class="page-title">

    <h1>
        📦 My Orders
    </h1>

    <p>
        View your complete order history and invoices.
    </p>

</section>



${orderHTML}



<footer class="footer">

    © 2026

    <strong>
        GLOBAL HEALTHCARE
    </strong>

    <br>

    Powered by

    <strong>
        Osium Biogenix
    </strong>

</footer>


</body>

</html>

        `);

    }

    catch (err) {

        console.log(
            "Orders Error:",
            err
        );

        res.status(500)
            .send("Orders Page Error");

    }

});


// ======================================================
// CREATE ORDER
// ======================================================

router.post(
    "/create-order",
    async (req, res) => {

        try {

            // ==========================================
            // LOGIN
            // ==========================================

            if (!req.session.doctor) {

                return res.status(401).json({

                    success: false,

                    message: "Unauthorized"

                });

            }


            // ==========================================
            // CART
            // ==========================================

            const cart =
                Array.isArray(req.body.cart)
                    ? req.body.cart
                    : [];


            if (cart.length === 0) {

                return res.status(400).json({

                    success: false,

                    message: "Cart is Empty"

                });

            }


            // ==========================================
            // TOTAL
            // ==========================================

            let total = 0;


            cart.forEach(item => {

                const price =
                    Number(item.price || 0);

                const qty =
                    Number(item.qty || 0);

                total += price * qty;

            });


            // ==========================================
            // CREATE ORDER
            // ==========================================

            const order =
                await DoctorOrder.create({

                    doctorId:
                        req.session.doctor._id,

                    items:
                        cart.map(item => ({

                            productId:
                                item.id,

                            name:
                                item.name,

                            price:
                                Number(item.price || 0),

                            image:
                                item.image || "",

                            qty:
                                Number(item.qty || 0)

                        })),

                    totalAmount:
                        total,

                    status:
                        "Pending"

                });


            // ==========================================
            // RESPONSE
            // ==========================================

            res.json({

                success: true,

                message:
                    "Order Created Successfully",

                orderId:
                    order._id

            });

        }

        catch (err) {

            console.log(
                "Create Order Error:",
                err
            );

            res.status(500).json({

                success: false,

                message:
                    "Order Failed"

            });

        }

    }
);


// ======================================================
// GENERATE INVOICE PDF
// ======================================================

router.get(
    "/invoice/:id",
    async (req, res) => {

        try {

            // ==========================================
            // LOGIN CHECK
            // ==========================================

            if (!req.session.doctor) {

                return res.redirect(
                    "/admin/doctor-login"
                );

            }


            // ==========================================
            // FIND ORDER
            // ==========================================

            const order =
                await DoctorOrder.findById(
                    req.params.id
                );


            if (!order) {

                return res
                    .status(404)
                    .send("Order Not Found");

            }


            // ==========================================
            // DOCTOR
            // ==========================================

            let doctor = null;


            try {

                if (order.doctorId) {

                    doctor =
                        await Doctor.findById(
                            order.doctorId
                        );

                }

            }

            catch (doctorError) {

                console.log(
                    "Doctor Fetch Error:",
                    doctorError
                );

            }


            // ==========================================
            // FALLBACK SESSION DOCTOR
            // ==========================================

            const sessionDoctor =
                req.session.doctor || {};


            const doctorName =
                (doctor && (
                    doctor.name ||
                    doctor.doctorName
                )) ||
                sessionDoctor.name ||
                sessionDoctor.doctorName ||
                "Doctor";


            const doctorId =
                (doctor && (
                    doctor.doctorId ||
                    doctor._id
                )) ||
                sessionDoctor.doctorId ||
                sessionDoctor._id ||
                "";


            const doctorPhone =
                (doctor && (
                    doctor.phone ||
                    doctor.mobile
                )) ||
                sessionDoctor.phone ||
                sessionDoctor.mobile ||
                "";


            const specialization =
                (doctor && doctor.specialization) ||
                sessionDoctor.specialization ||
                "General Physician";


            // ==========================================
            // PDF HEADER
            // ==========================================

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );


            res.setHeader(
                "Content-Disposition",
                `attachment; filename=Estimate-${order._id}.pdf`
            );


            const doc =
                new PDFDocument({

                    size: "A4",

                    margins: {

                        top: 40,

                        bottom: 40,

                        left: 40,

                        right: 40

                    }

                });


            // ==========================================
            // FONT
            // ==========================================

            const fontPath =
                path.join(
                    __dirname,
                    "../fonts/DejaVuSans.ttf"
                );


            try {

                doc.font(fontPath);

            }

            catch (fontError) {

                console.log(
                    "Font Error:",
                    fontError
                );

            }


            // ==========================================
            // PIPE
            // ==========================================

            doc.pipe(res);


            // ==========================================
            // HELPER
            // ==========================================

            const money = amount => {

                return `Rs.${Number(
                    amount || 0
                ).toFixed(2)}`;

            };


            // ==========================================
            // HEADER
            // ==========================================

            doc
                .fontSize(20)
                .text(
                    "GLOBAL HEALTHCARE",
                    {
                        align: "center"
                    }
                );


            doc
                .fontSize(10)
                .text(
                    "SAFE & SECURE Healthcare",
                    {
                        align: "center"
                    }
                );


            doc.moveDown(1);


            doc
                .fontSize(16)
                .text(
                    "ROUGH ESTIMATE",
                    {
                        align: "center"
                    }
                );


            doc.moveDown(1.5);


            // ==========================================
            // DOCTOR DETAILS
            // ==========================================

            doc.fontSize(11);


            doc.text(
                `DOCTOR : Dr. ${doctorName}`
            );


            if (specialization) {

                doc.text(
                    `SPECIALIZATION : ${specialization}`
                );

            }


            if (doctorId) {

                doc.text(
                    `DOCTOR ID : ${doctorId}`
                );

            }


            if (doctorPhone) {

                doc.text(
                    `PHONE : ${doctorPhone}`
                );

            }


            doc.text(
                `BILL NO : A${order._id
                    .toString()
                    .slice(-6)}`
            );


            doc.text(
                `DATE : ${
                    new Date(
                        order.createdAt
                    ).toLocaleDateString(
                        "en-GB"
                    )
                }`
            );


            doc.text(
                "TYPE : CREDIT"
            );


            doc.moveDown(1);


            // ==========================================
            // TABLE TOP LINE
            // ==========================================

            doc
                .fontSize(9)
                .text(
                    "--------------------------------------------------------------------------------",
                    40
                );


            doc.moveDown(.5);


            // ==========================================
            // TABLE HEADER
            // ==========================================

            let tableY = doc.y;


            doc
                .fontSize(10)
                .text(
                    "SL",
                    40,
                    tableY
                );


            doc.text(
                "PRODUCT DESCRIPTION",
                70,
                tableY
            );


            doc.text(
                "QTY",
                300,
                tableY
            );


            doc.text(
                "RATE",
                350,
                tableY
            );


            doc.text(
                "AMOUNT",
                430,
                tableY
            );


            // ==========================================
            // HEADER LINE
            // ==========================================

            tableY += 20;


            doc.text(
                "--------------------------------------------------------------------------------",
                40,
                tableY
            );


            tableY += 10;


            // ==========================================
            // PRODUCTS
            // ==========================================

            let total = 0;

            let totalQty = 0;


            const items =
                Array.isArray(order.items)
                    ? order.items
                    : [];


            items.forEach(
                (item, index) => {

                    const qty =
                        Number(
                            item.qty || 0
                        );


                    const rate =
                        Number(
                            item.price || 0
                        );


                    const amount =
                        qty * rate;


                    total += amount;

                    totalQty += qty;


                    let productName =
                        item.name ||
                        "Product";


                    // Long name control

                    if (
                        productName.length > 35
                    ) {

                        productName =
                            productName.substring(
                                0,
                                35
                            ) + "...";

                    }


                    // ==================================
                    // PAGE BREAK
                    // ==================================

                    if (tableY > 700) {

                        doc.addPage();

                        tableY = 50;


                        doc
                            .fontSize(10)
                            .text(
                                "SL",
                                40,
                                tableY
                            );


                        doc.text(
                            "PRODUCT DESCRIPTION",
                            70,
                            tableY
                        );


                        doc.text(
                            "QTY",
                            300,
                            tableY
                        );


                        doc.text(
                            "RATE",
                            350,
                            tableY
                        );


                        doc.text(
                            "AMOUNT",
                            430,
                            tableY
                        );


                        tableY += 20;

                    }


                    // ==================================
                    // ROW
                    // ==================================

                    doc
                        .fontSize(9)
                        .text(
                            `${index + 1}`,
                            40,
                            tableY
                        );


                    doc.text(
                        productName,
                        70,
                        tableY,
                        {
                            width: 215
                        }
                    );


                    doc.text(
                        `${qty}`,
                        300,
                        tableY
                    );


                    doc.text(
                        money(rate),
                        350,
                        tableY
                    );


                    doc.text(
                        money(amount),
                        430,
                        tableY
                    );


                    tableY += 25;

                }
            );


            // ==========================================
            // TABLE BOTTOM
            // ==========================================

            doc.text(
                "--------------------------------------------------------------------------------",
                40,
                tableY
            );


            tableY += 25;


            // ==========================================
            // SUMMARY
            // ==========================================

            doc
                .fontSize(11)
                .text(
                    `NO OF ITEMS : ${items.length}`,
                    40,
                    tableY
                );


            tableY += 20;


            doc.text(
                `TOTAL QUANTITY : ${totalQty}`,
                40,
                tableY
            );


            tableY += 25;


            // ==========================================
            // GRAND TOTAL
            // ==========================================

            doc
                .fontSize(13)
                .text(
                    `GRAND TOTAL : ${money(total)}`,
                    40,
                    tableY
                );


            tableY += 25;


            // ==========================================
            // BILL SUMMARY
            // ==========================================

            doc
                .fontSize(11)
                .text(
                    "--------------------------------------------------------------------------------",
                    40,
                    tableY
                );


            tableY += 20;


            doc.text(
                `CURRENT BILL AMOUNT : ${money(total)}`,
                40,
                tableY
            );


            tableY += 20;


            const backDues =
                Number(
                    order.backDues || 0
                );


            const totalBalance =
                total + backDues;


            doc.text(
                `BACK DUES AMOUNT    : ${money(backDues)}`,
                40,
                tableY
            );


            tableY += 20;


            doc.text(
                `TOTAL BALANCE       : ${money(totalBalance)}`,
                40,
                tableY
            );


            tableY += 25;


            doc.text(
                "--------------------------------------------------------------------------------",
                40,
                tableY
            );


            tableY += 30;


            // ==========================================
            // FOOTER
            // ==========================================

            doc
                .fontSize(10)
                .text(
                    "Import Purchase ONLINE : No",
                    40,
                    tableY
                );


            tableY += 20;


            doc
                .fontSize(12)
                .text(
                    "GLOBAL HEALTHCARE",
                    40,
                    tableY
                );


            tableY += 18;


            doc
                .fontSize(9)
                .text(
                    "Powered by Osium Biogenix",
                    40,
                    tableY
                );


            tableY += 18;


            doc.text(
                "Call : 7488033368",
                40,
                tableY
            );


            tableY += 25;


            doc.text(
                "============================================================",
                40,
                tableY
            );


            // ==========================================
            // END PDF
            // ==========================================

            doc.end();

        }

        catch (err) {

            console.log(
                "Invoice Error:",
                err
            );


            if (!res.headersSent) {

                res.status(500)
                    .send(
                        "Invoice Generate Error"
                    );

            }

        }

    }
);


// ======================================================
// LOGOUT
// ======================================================

router.get(
    "/logout",
    (req, res) => {

        req.session.destroy(
            () => {

                res.redirect(
                    "/admin/doctor-login"
                );

            }
        );

    }
);


// ======================================================
// DOCTOR CART PAGE
// ======================================================

router.get(
    "/cart",
    async (req, res) => {

        try {

            // ==========================================
            // LOGIN CHECK
            // ==========================================

            if (!req.session.doctor) {

                return res.redirect(
                    "/admin/doctor-login"
                );

            }

            // ==========================================
            // DOCTOR CART PAGE
            // ==========================================

            const DoctorCart =
                require(
                    "../pages/doctorCart"
                );

            res.send(
                DoctorCart(
                    req.session.doctor
                )
            );

        }

        catch (err) {

            console.log(
                "Doctor Cart Error:",
                err
            );

            res.status(500).send(
                "Doctor Cart Page Error"
            );

        }

    }
);

// ======================================================
// DOCTOR DASHBOARD
// ======================================================

router.get(
    "/dashboard",
    async (req, res) => {

        try {

            // ==========================================
            // LOGIN CHECK
            // ==========================================

            if (!req.session.doctor) {

                return res.redirect(
                    "/admin/doctor-login"
                );

            }


            // ==========================================
            // PRODUCTS
            // ==========================================

            const products =
                await Product.find()
                    .sort({
                        createdAt: -1
                    });


            // ==========================================
            // DASHBOARD
            // ==========================================

            const DoctorDashboard =
                require(
                    "../pages/DoctorDashboard"
                );


            res.send(

                DoctorDashboard(
                    req.session.doctor,
                    products
                )

            );

        }

        catch (err) {

            console.log(
                "Dashboard Error:",
                err
            );


            res.status(500)
                .send(
                    "Dashboard Error"
                );

        }

    }
);


// ======================================================
// EXPORT
// ======================================================

module.exports = router;