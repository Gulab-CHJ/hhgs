// // // // const Home = require("./pages/Homepages");
// // // // const express = require("express");
// // // // const app = express();
// // // // require("./config/database");
// // // // const indexRoutes = require("./routes/index");

// // // // app.use("/", indexRoutes);
// // // // // Body Parser
// // // // app.use(express.urlencoded({ extended: true }));
// // // // app.use(express.json());

// // // // app.use("/storage", express.static("storage"));

// // // // // Static Folder (optional)
// // // // app.use(express.static("public"));

// // // // // Routes
// // // // const adminRoutes = require("./routes/admin");
// // // // app.use("/admin", adminRoutes);


// // // // // Home Route
// // // // app.get("/", (req, res) => {
// // // //     res.send(Home());
// // // // });



// // // // // Start Server
// // // // const PORT = 3000;
// // // // app.listen(PORT, () => {
// // // //     console.log(`Server Running: http://localhost:${PORT}`);
// // // // });

// // // // const express = require("express");
// // // // const app = express();

// // // // require("./config/database");

// // // // // Body Parser
// // // // app.use(express.urlencoded({ extended: true }));
// // // // app.use(express.json());

// // // // // Static
// // // // app.use("/storage", express.static("storage"));
// // // // app.use(express.static("public"));


// // // // // Home Route
// // // // const indexRoutes = require("./routes/index");
// // // // app.use("/", indexRoutes);


// // // // // Admin Route
// // // // const adminRoutes = require("./routes/admin");
// // // // app.use("/admin", adminRoutes);





// // // // // Start Server
// // // // const PORT = 3000;

// // // // app.listen(PORT, () => {
// // // //     console.log(`Server Running: http://localhost:${PORT}`);
// // // // });
// // // const express = require("express");
// // // const path = require("path");

// // // const app = express();

// // // require("./config/database");


// // // // Body Parser
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(express.json());


// // // // Static Files
// // // app.use("/storage", express.static(path.join(__dirname, "storage")));

// // // app.use(express.static(path.join(__dirname, "public")));


// // // // Home Route
// // // const indexRoutes = require("./routes/index");
// // // app.use("/", indexRoutes);


// // // // Admin Route
// // // const adminRoutes = require("./routes/admin");
// // // app.use("/admin", adminRoutes);


// // // // Start Server
// // // const PORT = 3000;

// // // app.listen(PORT, () => {
// // //     console.log(`Server Running: http://localhost:${PORT}`);
// // // });
// // const session = require("express-session");
// // require("dotenv").config();
// // const express = require("express");
// // const path = require("path");

// // const app = express();

// // require("./config/database");




// // // Body Parser
// // app.use(express.urlencoded({
// //     extended:true
// // }));

// // app.use(express.json());



// // app.use(express.urlencoded({
// //     extended:true
// // }));

// // app.use(express.json());


// // // SESSION
// // app.use(session({

// //     secret:"GLOBAL_HEALTHCARE_SECRET",

// //     resave:false,

// //     saveUninitialized:false,

// //     cookie:{
// //         maxAge:1000 * 60 * 60 * 24
// //     }

// // }));


// // // Static Files

// // app.use(
// //     "/storage",
// //     express.static(
// //         path.join(__dirname,"storage")
// //     )
// // );


// // app.use(
// //     express.static(
// //         path.join(__dirname,"public")
// //     )
// // );



// // // Routes

// // const indexRoutes = require("./routes/index");

// // app.use("/", indexRoutes);



// // const adminRoutes = require("./routes/admin");

// // app.use("/admin", adminRoutes);

// // // Doctor Route
// // const doctorRoutes = require("./routes/doctor");

// // app.use("/doctor", doctorRoutes);



// // // Error Handler (Upload error दिखाने के लिए)

// // app.use((err, req, res, next) => {
// //     console.error(err);

// //     res.status(500).send(`
// //         <h2>Server Error</h2>
// //         <pre>${err.stack || err.message || JSON.stringify(err)}</pre>
// //     `);
// // });



// // // Server



// // // const appointmentRoute =
// // // require("./routes/appointment");


// // // app.use(
// // // "/appointment",
// // // appointmentRoute
// // // );

// // const appointmentRoute = require("./routes/appointment");

// // console.log("Appointment Route Loaded");

// // app.use("/appointment", appointmentRoute);


// // const serviceRoutes = require("./routes/service");

// // app.use("/", serviceRoutes);

// // app.use(
// // "/uploads",
// // express.static("uploads")
// // );


// // const authRoutes = require("./routes/auth");

// // app.use("/", authRoutes);


// // const storeRouter = require('./routes/store'); // aapke router file ka sahi path

// // // Agar aapne yahan '/store' likha hai, toh router.get('/') kaam karega
// // app.use('/store', storeRouter);





// // // Express ko batayein ki EJS engine use karna hai
// // app.set('view engine', 'ejs');

// // // Sub-folder 'views' ka path set karein
// // app.set('views', path.join(__dirname, 'views'));


// // const PORT = process.env.PORT || 3000;


// // app.listen(PORT,()=>{

// // console.log(
// // `Server Running on Port ${PORT}`
// // );

// // });


// const session = require("express-session");
// require("dotenv").config();

// const express = require("express");
// const path = require("path");

// const app = express();

// require("./config/database");


// // BODY PARSER
// app.use(express.urlencoded({
//     extended:true
// }));

// app.use(express.json());


// // SESSION (Routes से पहले)
// app.use(session({

//     secret:"GLOBAL_HEALTHCARE_SECRET",

//     resave:false,

//     saveUninitialized:false,

//     cookie:{
//         maxAge:1000 * 60 * 60 * 24
//     }

// }));


// // STATIC
// app.use(
// "/storage",
// express.static(
// path.join(__dirname,"storage")
// )
// );


// app.use(
// express.static(
// path.join(__dirname,"public")
// )
// );


// // ROUTES

// const indexRoutes = require("./routes/index");
// app.use("/", indexRoutes);



// const adminRoutes = require("./routes/admin");
// app.use("/admin", adminRoutes);



// const doctorRoutes = require("./routes/doctor");
// app.use("/doctor", doctorRoutes);



// const appointmentRoute = require("./routes/appointment");
// app.use("/appointment", appointmentRoute);



// const serviceRoutes = require("./routes/service");
// app.use("/", serviceRoutes);



// app.use(
// "/uploads",
// express.static("uploads")
// );



// const authRoutes = require("./routes/auth");
// app.use("/", authRoutes);



// const storeRouter = require("./routes/store");
// app.use("/store", storeRouter);



// // EJS
// app.set("view engine","ejs");

// app.set(
// "views",
// path.join(__dirname,"views")
// );



// // ERROR
// app.use((err,req,res,next)=>{

// console.log(err);

// res.status(500).send(err.message);

// });



// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=>{

// console.log(
// `Server Running on Port ${PORT}`
// );

// });

// ===============================
// APP.JS
// ===============================

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




// Store

const storeRouter =
require("./routes/store");


app.use(
"/store",
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


const PORT =
process.env.PORT || 3000;



app.listen(
PORT,
()=>{

console.log(
`Server Running on Port ${PORT}`
);

}
);