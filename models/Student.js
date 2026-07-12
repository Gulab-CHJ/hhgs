// // const mongoose = require("mongoose");

// // const studentSchema = new mongoose.Schema({

// //     name:{
// //         type:String,
// //         required:true
// //     },

// //     fatherName:{
// //         type:String,
// //         default:""
// //     },

// //     course:{
// //         type:String,
// //         default:""
// //     },

// //     mobile:{
// //         type:String,
// //         default:""
// //     },

// //     email:{
// //         type:String,
// //         default:""
// //     },

// //     address:{
// //         type:String,
// //         default:""
// //     },

// //     image:{
// //         type:String,
// //         default:""
// //     },

// //     description:{
// //         type:String,
// //         default:""
// //     },

// //     createdAt:{
// //         type:Date,
// //         default:Date.now
// //     }

// // });

// // module.exports = mongoose.model("Student",studentSchema);

// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({

//     name: {
//         type: String,
//         required: true
//     },

//     fatherName: {
//         type: String,
//         default: ""
//     },

//     course: {
//         type: String,
//         default: ""
//     },

//     college: {
//         type: String,
//         default: ""
//     },

//     rollNo: {
//         type: String,
//         default: ""
//     },

//     rank: {
//         type: String,
//         default: ""
//     },

//     qualification: {
//         type: String,
//         default: ""
//     },

//     dob: {
//         type: String,
//         default: ""
//     },

//     gender: {
//         type: String,
//         default: ""
//     },

//     mobile: {
//         type: String,
//         default: ""
//     },

//     email: {
//         type: String,
//         default: ""
//     },

//     address: {
//         type: String,
//         default: ""
//     },

//     image: {
//         type: String,
//         default: ""
//     },

//     description: {
//         type: String,
//         default: ""
//     },

//     status: {
//         type: String,
//         default: "Active"
//     },

//     createdAt: {
//         type: Date,
//         default: Date.now
//     }

// });

// module.exports =
//     mongoose.models.Student ||
//     mongoose.model("Student", studentSchema);