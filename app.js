

require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();


// ===============================
// DATABASE
// ===============================

require("./config/database");



// ===============================
// BODY PARSER
// ===============================

app.use(
    express.urlencoded({
        extended:true
    })
);


app.use(
    express.json()
);



// ===============================
// SESSION
// ===============================

app.use(
session({

    secret:"GLOBAL_HEALTHCARE_SECRET",

    resave:false,

    saveUninitialized:false,

    cookie:{

        maxAge:
        1000 * 60 * 60 * 24

    }

})
);



// ===============================
// STATIC FILES
// ===============================


app.use(
"/storage",
express.static(
path.join(__dirname,"storage")
)
);



app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);



app.use(
express.static(
path.join(__dirname,"public")
)
);



// ===============================
// ROUTES
// ===============================


// Home

const indexRoutes =
require("./routes/index");

app.use(
"/",
indexRoutes
);




// Admin

const adminRoutes =
require("./routes/admin");

app.use(
"/admin",
adminRoutes
);




// Doctor

const doctorRoutes =
require("./routes/doctor");

app.use(
"/doctor",
doctorRoutes
);




// Appointment

const appointmentRoute =
require("./routes/appointment");

console.log(
"Appointment Route Loaded"
);


app.use(
"/appointment",
appointmentRoute
);




// Service

const serviceRoutes =
require("./routes/service");


app.use(
"/",
serviceRoutes
);




// Auth

const authRoutes =
require("./routes/auth");


app.use(
"/",
authRoutes
);




const storeRouter = require("./doctor/dhhpb/store");

app.use(
    "/doctor/public",
    express.static(
        path.join(
            __dirname,
            "doctor",
            "public"
        )
    )
);
app.use(
    "/doctor",
    storeRouter
);


// ===============================
// VIEW ENGINE
// ===============================


app.set(
"view engine",
"ejs"
);


app.set(
"views",
path.join(
__dirname,
"views"
)
);





// ===============================
// ERROR HANDLER
// ===============================


app.use(
(err,req,res,next)=>{


console.log(err);


res.status(500).send(`

<h2>
Server Error
</h2>

<pre>
${err.stack || err.message}
</pre>

`);


});





// ===============================
// SERVER START
// ===============================


// const PORT =
// process.env.PORT || 3000;



// app.listen(
// PORT,
// ()=>{

// console.log(
// `Server Running on Port ${PORT}`
// );

// }
// );

// Cart
const cartRoutes = require("./routes/cart");

app.use(
    "/api/cart",
    cartRoutes
);

// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(`Server Running on Port ${PORT}`);
    }
);