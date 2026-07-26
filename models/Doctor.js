// const mongoose = require("mongoose");

// const DoctorSchema = new mongoose.Schema({

//     doctorId: {
//         type: String,
//         unique: true
//     },

//     name: {
//         type: String,
//         required: true
//     },

//     degree: String,

//     specialization: String,

//     experience: String,

//     hospital: String,

//     phone: {
//         type: String,
//         unique: true
//     },

//     email: String,

//     password: {
//         type: String,
//         required: true
//     },

//     address: String,

//     image: String,

//     description: String

// }, {
//     timestamps: true
// });

// module.exports =
//     mongoose.models.Doctor ||
//     mongoose.model("Doctor", DoctorSchema);

const mongoose = require("mongoose");


const DoctorSchema = new mongoose.Schema({


    doctorId: {

        type: String,

        unique: true

    },


    name: {

        type: String,

        required: true

    },


    degree: {

        type: String

    },


    specialization: {

        type: String

    },


    experience: {

        type: String

    },


    hospital: {

        type: String

    },


    phone: {

        type: String,

        unique: true

    },


    email: {

        type: String

    },


    password: {

        type: String,

        required: true

    },


    address: {

        type: String

    },


    image: {

        type: String

    },


    description: {

        type: String

    },



    // ======================
    // DOCTOR AVAILABILITY
    // ======================


    availableDay: {

        type: String,

        default: ""

    },


    timeFrom: {

        type: String,

        default: ""

    },


    timeTo: {

        type: String,

        default: ""

    },



    // ======================
    // CONSULTATION FEE
    // ======================


    fee: {

        type: Number,

        default: 0

    },


    feeType: {

        type: String,

        enum: [
            "per_visit",
            "per_month",
            "per_hour"
        ],

        default: "per_visit"

    }


}, {


    timestamps:true

});



module.exports =
    mongoose.models.Doctor ||
    mongoose.model("Doctor", DoctorSchema);