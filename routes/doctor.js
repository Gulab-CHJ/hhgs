const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const DoctorOrder = require("../models/DoctorOrder");

const PDFDocument = require("pdfkit");



// =================================
// DOCTOR DASHBOARD
// =================================

router.get(
"/dashboard",
async(req,res)=>{

try{


if(!req.session.doctor){

return res.redirect(
"/admin/doctor-login"
);

}



const products =
await Product.find()
.sort({
createdAt:-1
});



const DoctorDashboard =
require("../pages/DoctorDashboard");



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
.send(
"Dashboard Error"
);


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
req.session.doctor.doctorId,



products:
cart,



total:



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
await DoctorOrder.findById(
req.params.id
);




if(!order){


return res.send(
"Order Not Found"
);


}





res.setHeader(
"Content-Type",
"application/pdf"
);



res.setHeader(
"Content-Disposition",
`attachment; filename=Invoice-${order._id}.pdf`
);





const doc =
new PDFDocument({

margin:50

});



doc.pipe(res);





// HEADER


doc
.fontSize(28)
.text(
"GLOBAL SERVICE",
{
align:"center"
}
);



doc
.fontSize(12)
.text(
"SAFE & SECURE Healthcare",
{
align:"center"
}
);



doc.moveDown();



doc
.fontSize(18)
.text(
"DOCTOR ORDER INVOICE",
{
align:"center"
}
);



doc.moveDown(2);





// ORDER DETAILS


doc
.fontSize(12)
.text(
`Invoice ID : ${order._id}`
);



doc.text(
`Doctor ID : ${order.doctorId}`
);



doc.text(
`Status : ${order.status}`
);



doc.text(
`Date : ${
new Date(order.createdAt)
.toLocaleDateString("en-GB")
}`
);



doc.moveDown();



doc.text(
"--------------------------------------"
);






let total = 0;




order.products.forEach(
(item,index)=>{


let amount =
Number(item.price) *
Number(item.qty);



total += amount;




doc
.fontSize(12)
.text(
`${index+1}. ${item.name}`
);



doc.text(
`Qty : ${item.qty}`
);



doc.text(
`Price : ₹ ${item.price}`
);



doc.text(
`Amount : ₹ ${amount}`
);



doc.moveDown();



}

);






doc.text(
"--------------------------------------"
);



doc.moveDown();




doc
.fontSize(18)
.text(
`TOTAL AMOUNT : ₹ ${total}`
);





doc.moveDown(2);




doc
.fontSize(12)
.text(
"Thank You For Your Order"
);



doc.text(
"GLOBAL SERVICE"
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





module.exports = router;