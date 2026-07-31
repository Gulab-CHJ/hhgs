const mongoose = require("mongoose");


const DoctorOrderSchema = new mongoose.Schema({


doctorId:{


type:mongoose.Schema.Types.ObjectId,

ref:"Doctor",

required:true


},



items:[{


productId:String,


name:String,


price:Number,


image:String,


qty:Number



}],



totalAmount:{


type:Number,


required:true


},



status:{


type:String,

default:"Pending"


},



createdAt:{


type:Date,

default:Date.now


}



});



module.exports =
mongoose.model(
"DoctorOrder",
DoctorOrderSchema
);