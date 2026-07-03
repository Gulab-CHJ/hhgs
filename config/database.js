// const mongoose = require("mongoose");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URL)
// .then(() => {
//     console.log("✅ MongoDB Connected");
// })
// .catch((err) => {
//     console.log("❌ MongoDB Error:", err.message);
// });

const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));