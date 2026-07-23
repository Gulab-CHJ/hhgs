// // const Home = require("./pages/Homepages");
// // const express = require("express");
// // const app = express();
// // require("./config/database");
// // const indexRoutes = require("./routes/index");

// // app.use("/", indexRoutes);
// // // Body Parser
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());

// // app.use("/storage", express.static("storage"));

// // // Static Folder (optional)
// // app.use(express.static("public"));

// // // Routes
// // const adminRoutes = require("./routes/admin");
// // app.use("/admin", adminRoutes);


// // // Home Route
// // app.get("/", (req, res) => {
// //     res.send(Home());
// // });



// // // Start Server
// // const PORT = 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server Running: http://localhost:${PORT}`);
// // });

// // const express = require("express");
// // const app = express();

// // require("./config/database");

// // // Body Parser
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());

// // // Static
// // app.use("/storage", express.static("storage"));
// // app.use(express.static("public"));


// // // Home Route
// // const indexRoutes = require("./routes/index");
// // app.use("/", indexRoutes);


// // // Admin Route
// // const adminRoutes = require("./routes/admin");
// // app.use("/admin", adminRoutes);





// // // Start Server
// // const PORT = 3000;

// // app.listen(PORT, () => {
// //     console.log(`Server Running: http://localhost:${PORT}`);
// // });
// const express = require("express");
// const path = require("path");

// const app = express();

// require("./config/database");


// // Body Parser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// // Static Files
// app.use("/storage", express.static(path.join(__dirname, "storage")));

// app.use(express.static(path.join(__dirname, "public")));


// // Home Route
// const indexRoutes = require("./routes/index");
// app.use("/", indexRoutes);


// // Admin Route
// const adminRoutes = require("./routes/admin");
// app.use("/admin", adminRoutes);


// // Start Server
// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server Running: http://localhost:${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

require("./config/database");


// Body Parser
app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());


// Static Files

app.use(
    "/storage",
    express.static(
        path.join(__dirname,"storage")
    )
);


app.use(
    express.static(
        path.join(__dirname,"public")
    )
);



// Routes

const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);



const adminRoutes = require("./routes/admin");

app.use("/admin", adminRoutes);



// Error Handler (Upload error दिखाने के लिए)

app.use((err,req,res,next)=>{

    console.log("GLOBAL ERROR:",err);

    res.status(500).send(`
        <h2>Server Error</h2>
        <pre>${err.message}</pre>
    `);

});



// Server

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
`Server Running on Port ${PORT}`
);

});