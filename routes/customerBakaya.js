
// const express = require("express");
// const bcrypt = require("bcrypt");
// const rateLimit = require("express-rate-limit");
// const Customer = require("../models/CustomerBakaya");

// const router = express.Router();
// router.use(express.urlencoded({ extended: false }));

// const esc = v => String(v ?? "")
//   .replace(/&/g, "&amp;")
//   .replace(/</g, "&lt;")
//   .replace(/>/g, "&gt;")
//   .replace(/"/g, "&quot;")
//   .replace(/'/g, "&#39;");

// const money = n => "₹" + Number(n || 0).toFixed(2);

// const dateText = d => new Date(d).toLocaleDateString(
//   "en-IN", { day: "2-digit", month: "short", year: "numeric" }
// );

// const layout = (title, content) => `
// <!DOCTYPE html>
// <html lang="hi">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width,initial-scale=1">
// <title>${esc(title)} | GLOBAL SERVICES</title>
// <style>
// *{box-sizing:border-box}
// body{margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#172b37}
// .wrap{max-width:950px;margin:25px auto;padding:15px}
// .header{background:linear-gradient(120deg,#064e3b,#059669);color:white;padding:25px;border-radius:18px;text-align:center}
// .header h1{margin:0;font-size:27px}
// .header p{margin:8px 0 0}
// .card{background:white;padding:22px;border-radius:16px;margin-top:18px;box-shadow:0 5px 25px #0000000b}
// input,select{width:100%;padding:13px;margin:8px 0 14px;border:1px solid #cbd5e1;border-radius:9px;font-size:15px}
// button,.btn{padding:12px 18px;border:0;border-radius:9px;background:#047857;color:white;font-weight:bold;cursor:pointer;text-decoration:none;display:inline-block}
// button{width:100%}
// label{font-size:13px;font-weight:bold}
// .table-wrap{overflow-x:auto}
// table{width:100%;border-collapse:collapse;min-width:510px}
// th,td{padding:13px 10px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:13px}
// th{background:#ecfdf5;color:#065f46}
// .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
// .stat{padding:15px;border-radius:12px;background:#f1f5f9}
// .stat strong{display:block;margin-top:10px;font-size:21px}
// .green{color:#047857}.red{color:#dc2626}
// .badge{padding:6px 9px;border-radius:20px;font-weight:bold;font-size:11px}
// .paid{background:#dcfce7;color:#166534}
// .unpaid{background:#fee2e2;color:#991b1b}
// .error{color:#dc2626;font-weight:bold}
// @media(max-width:600px){
//  .grid{grid-template-columns:1fr}
//  .card{padding:15px}
//  .header h1{font-size:22px}
// }
// </style>
// </head>
// <body>
// <div class="wrap">
//  <header class="header">
//   <h1>GLOBAL SERVICES</h1>
//   <p>Customer Payment & Bakaya Details</p>
//  </header>
//  ${content}
// </div>
// </body>
// </html>`;

// function requireAdmin(req, res, next) {
//   if (!req.session || !req.session.adminId) {
//     return res.status(403).send("Admin login required");
//   }
//   next();
// }

// const searchLimit = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 10,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
//   message: "Too many attempts. Try again later."
// });

// function searchForm(error = "") {
//   return layout("Customer Bakaya", `
//   <div class="card">
//    <h2>अपना बकाया चेक करें</h2>
//    <p>Mobile या Aadhaar के आखिरी 4 अंक डालें।</p>
//    ${error ? `<p class="error">${esc(error)}</p>` : ""}
//    <form action="/customer-bakaya/search" method="POST">
//     <label>Search By</label>
//     <select name="searchType">
//      <option value="phone">Mobile Last 4 Digits</option>
//      <option value="aadhaar">Aadhaar Last 4 Digits</option>
//     </select>
//     <label>Last 4 Digits</label>
//     <input name="last4" maxlength="4"
//       pattern="[0-9]{4}" inputmode="numeric" required>
//     <label>Customer Security PIN</label>
//     <input type="password" name="pin" required
//       minlength="6" autocomplete="off">
//     <button type="submit">Search Customer</button>
//    </form>
//   </div>`);
// }

// router.get("/customer-bakaya", (req, res) => {
//   res.set("Cache-Control", "no-store");
//   res.send(searchForm());
// });

// router.post("/customer-bakaya/search", searchLimit,
//  async (req, res) => {
//   try {
//     res.set("Cache-Control", "no-store");

//     const { searchType, last4, pin } = req.body;

//     if (!["phone", "aadhaar"].includes(searchType) ||
//         !/^\d{4}$/.test(last4 || "") ||
//         typeof pin !== "string" ||
//         pin.length < 6 || pin.length > 72) {
//       return res.status(400).send(
//         searchForm("Invalid search details")
//       );
//     }

//     const field = searchType === "phone"
//       ? "phoneLast4" : "aadhaarLast4";

//     // PIN must also match. Never expose records
//     // based on the last four digits alone.
//     const matches = await Customer.find({
//       [field]: last4
//     }).limit(100);

//     let customer = null;
//     for (const item of matches) {
//       if (await bcrypt.compare(pin, item.pinHash)) {
//         customer = item;
//         break;
//       }
//     }

//     if (!customer) {
//       return res.status(404).send(
//         searchForm("Customer not found or incorrect PIN")
//       );
//     }

//     const entries = [...customer.entries].sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );

//     const totalDue = entries
//       .filter(e => e.type === "DUE")
//       .reduce((sum, e) => sum + e.amount, 0);

//     const totalPaid = entries
//       .filter(e => e.type === "PAID")
//       .reduce((sum, e) => sum + e.amount, 0);

//     const balance = totalDue - totalPaid;

//     const rows = entries.map((e, i) => `
//       <tr>
//        <td>${i + 1}</td>
//        <td>${dateText(e.date)}</td>
//        <td>${esc(e.reason || "-")}</td>
//        <td>${money(e.amount)}</td>
//        <td>
//         <span class="badge ${e.type === "PAID" ? "paid" : "unpaid"}">
//          ${e.type === "PAID" ? "PAID" : "DUE"}
//         </span>
//        </td>
//       </tr>
//     `).join("");

//     res.send(layout("Payment View", `
//       <div class="card">
//        <h2>Customer Payment View</h2>
//        <div class="table-wrap">
//         <table>
//          <thead><tr>
//           <th>S.No.</th>
//           <th>Phone</th>
//           <th>Aadhaar</th>
//           <th>Payment</th>
//          </tr></thead>
//          <tbody><tr>
//           <td>1</td>
//           <td>******${esc(customer.phoneLast4)}</td>
//           <td>XXXX-XXXX-${esc(customer.aadhaarLast4)}</td>
//           <td><span class="badge paid">VIEW</span></td>
//          </tr></tbody>
//         </table>
//        </div>
//        <p><b>Customer:</b> ${esc(customer.name)}</p>
//       </div>

//       <div class="card">
//        <h2>Payment Summary</h2>
//        <div class="grid">
//         <div class="stat">Total Bill
//          <strong>${money(totalDue)}</strong>
//         </div>
//         <div class="stat">Total Paid
//          <strong class="green">${money(totalPaid)}</strong>
//         </div>
//         <div class="stat">Remaining Balance
//          <strong class="${balance > 0 ? "red" : "green"}">
//           ${money(Math.max(0, balance))}
//          </strong>
//         </div>
//        </div>
//        <p><b>Status:</b> ${
//          balance > 0 ? "UNPAID / PARTIAL" :
//          balance < 0 ? "ADVANCE PAID" : "FULLY PAID"
//        }</p>
//       </div>

//       <div class="card">
//        <h2>कब और क्यों बकाया है / Payment History</h2>
//        <div class="table-wrap">
//         <table>
//          <thead><tr>
//           <th>S.No.</th><th>Date</th>
//           <th>Reason</th><th>Amount</th><th>Status</th>
//          </tr></thead>
//          <tbody>${rows || `<tr><td colspan="5">No records</td></tr>`}</tbody>
//         </table>
//        </div>
//        <p><a class="btn" href="/customer-bakaya">Back</a></p>
//       </div>
//     `));
//   } catch (err) {
//     console.error("Bakaya search error:", err);
//     res.status(500).send("Server Error");
//   }
// });

// // ADMIN: Create customer
// router.post("/admin/bakaya/customer", requireAdmin,
//  async (req, res) => {
//   try {
//     const { name, phoneLast4, aadhaarLast4, pin } = req.body;

//     if (!name || name.length > 100 ||
//         !/^\d{4}$/.test(phoneLast4 || "") ||
//         !/^\d{4}$/.test(aadhaarLast4 || "") ||
//         typeof pin !== "string" ||
//         pin.length < 6 || pin.length > 72) {
//       return res.status(400).send("Invalid customer details");
//     }

//     const customer = await Customer.create({
//       name: name.trim(),
//       phoneLast4,
//       aadhaarLast4,
//       pinHash: await bcrypt.hash(pin, 12),
//       entries: []
//     });

//     res.status(201).json({
//       success: true,
//       customerId: customer._id
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Customer creation failed");
//   }
// });

// // ADMIN: Add due or received payment
// router.post("/admin/bakaya/payment/:id", requireAdmin,
//  async (req, res) => {
//   try {
//     const { type, amount, reason, date } = req.body;
//     const value = Number(amount);

//     if (!["DUE", "PAID"].includes(type) ||
//         !Number.isFinite(value) ||
//         value <= 0 ||
//         value > 100000000 ||
//         typeof reason !== "string" ||
//         reason.length > 300 ||
//         !date ||
//         Number.isNaN(Date.parse(date))) {
//       return res.status(400).send("Invalid payment");
//     }

//     const customer = await Customer.findById(req.params.id);

//     if (!customer) {
//       return res.status(404).send("Customer not found");
//     }

//     customer.entries.push({
//       type,
//       amount: Math.round(value * 100) / 100,
//       reason: reason.trim(),
//       date: new Date(date)
//     });

//     await customer.save();

//     res.json({ success: true, message: "Payment saved" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Payment save failed");
//   }
// });



// router.get("/admin/bakaya/customer", requireAdmin, (req, res) => {
//   res.send(layout("Add Customer", `
//     <div class="card">
//       <h2>GLOBAL SERVICES – Add Customer</h2>
//       <p>नया ग्राहक जोड़ें और उसका बकाया हिसाब शुरू करें।</p>

//       <form id="customerForm">
//         <label>Customer Name</label>
//         <input name="name" placeholder="Customer Name" required>

//         <label>Mobile Number – Last 4 Digits</label>
//         <input name="phoneLast4" maxlength="4"
//           pattern="[0-9]{4}" inputmode="numeric" required>

//         <label>Aadhaar Number – Last 4 Digits</label>
//         <input name="aadhaarLast4" maxlength="4"
//           pattern="[0-9]{4}" inputmode="numeric" required>

//         <label>Customer Security PIN</label>
//         <input name="pin" type="password"
//           minlength="6" maxlength="72" required>

//         <button type="submit">Save Customer</button>
//       </form>

//       <p id="message"></p>
//       <p><a class="btn" href="/admin">Admin Dashboard</a></p>
//     </div>

//     <script>
//       document.getElementById("customerForm")
//         .addEventListener("submit", async function(e) {
//           e.preventDefault();

//           const message = document.getElementById("message");
//           const data = Object.fromEntries(new FormData(this));

//           try {
//             const response = await fetch("/admin/bakaya/customer", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify(data)
//             });

//             if (!response.ok) {
//               message.textContent = "Customer save failed";
//               return;
//             }

//             const result = await response.json();
//             message.textContent = "Customer Saved Successfully!";
//             this.reset();
//           } catch (err) {
//             message.textContent = "Server connection error";
//           }
//         });
//     </script>
//   `));
// });


// module.exports = router;



const express = require("express");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");
const Customer = require("../models/CustomerBakaya");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const esc = v => String(v ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const money = n => "₹" + Number(n || 0).toFixed(2);

const dateText = d =>
  new Date(d).toLocaleDateString("en-IN");

function requireAdmin(req, res, next) {
  if (!req.session?.adminId) {
    return res.status(403).send("Admin login required");
  }
  next();
}

const searchLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

function totals(customer) {
  const entries = customer.entries || [];

  const due = entries
    .filter(e => e.type === "DUE")
    .reduce((sum, e) => sum + e.amount, 0);

  const paid = entries
    .filter(e => e.type === "PAID")
    .reduce((sum, e) => sum + e.amount, 0);

  return { due, paid, balance: due - paid };
}

function layout(title, body) {
  return `
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport"
 content="width=device-width,initial-scale=1">
<title>${esc(title)} | GLOBAL SERVICES</title>

<style>
*{box-sizing:border-box}
body{
 margin:0;
 background:#f1f5f9;
 color:#1e293b;
 font-family:Arial,sans-serif;
}
.container{
 max-width:1050px;
 margin:25px auto;
 padding:15px;
}
.header{
 background:linear-gradient(135deg,#064e3b,#059669);
 color:white;
 text-align:center;
 padding:28px 15px;
 border-radius:18px;
}
.header h1{margin:0;font-size:27px}
.header p{margin:9px 0 0}
.card{
 background:white;
 margin-top:20px;
 padding:22px;
 border-radius:16px;
 box-shadow:0 6px 22px #00000010;
}
input,select{
 width:100%;
 padding:13px;
 margin:9px 0 15px;
 border:1px solid #cbd5e1;
 border-radius:9px;
 font-size:15px;
}
label{font-size:14px;font-weight:bold}
button,.btn{
 display:inline-block;
 padding:12px 18px;
 background:#047857;
 color:white;
 border:0;
 border-radius:9px;
 font-weight:bold;
 text-decoration:none;
 cursor:pointer;
}
button{width:100%}
.table-wrap{overflow-x:auto}
table{
 width:100%;
 min-width:520px;
 border-collapse:collapse;
}
th,td{
 padding:13px 10px;
 border-bottom:1px solid #e2e8f0;
 text-align:left;
 font-size:13px;
}
th{background:#ecfdf5;color:#065f46}
.grid{
 display:grid;
 grid-template-columns:repeat(3,1fr);
 gap:12px;
}
.stat{
 background:#f8fafc;
 padding:17px;
 border-radius:12px;
}
.stat strong{
 display:block;
 margin-top:8px;
 font-size:22px;
}
.green{color:#047857}
.red{color:#dc2626}
.tag{
 padding:6px 10px;
 border-radius:20px;
 font-size:11px;
 font-weight:bold;
}
.paid{background:#dcfce7;color:#166534}
.unpaid{background:#fee2e2;color:#991b1b}
.note{color:#64748b;font-size:13px}
.error{color:#dc2626}
@media(max-width:600px){
 .grid{grid-template-columns:1fr}
 .card{padding:15px}
 .header h1{font-size:22px}
}
</style>
</head>

<body>
<div class="container">
 <div class="header">
  <h1>GLOBAL SERVICES</h1>
  <p>Customer Bakaya & Payment Details</p>
 </div>
 ${body}
</div>
</body>
</html>`;
}

// ======================================
// PUBLIC CUSTOMER SEARCH PAGE
// ======================================

function searchForm(message = "") {
  return layout("Customer Search", `
  <div class="card">
   <h2>🔍 अपना बकाया खोजें</h2>
   <p>Mobile या Aadhaar के आखिरी 4 अंक डालें।</p>

   ${message ? `<p class="error">${esc(message)}</p>` : ""}

   <form method="POST"
     action="/customer-bakaya/search">

    <label>Search By</label>
    <select name="searchType">
     <option value="phone">Mobile Last 4</option>
     <option value="aadhaar">Aadhaar Last 4</option>
    </select>

    <label>Last 4 Digits</label>
    <input
      name="last4"
      maxlength="4"
      pattern="[0-9]{4}"
      inputmode="numeric"
      placeholder="Enter Last 4 Digits"
      required
    >

    <button type="submit">
      🔍 Search Customer
    </button>

   </form>
  </div>`);
}

router.get("/customer-bakaya", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.send(searchForm());
});

// ======================================
// SEARCH WITHOUT PIN OR OTP
// ======================================

router.post(
  "/customer-bakaya/search",
  searchLimit,
  async (req, res) => {
    try {
      res.set("Cache-Control", "no-store");

      const { searchType, last4 } = req.body;

      if (
        !["phone", "aadhaar"].includes(searchType) ||
        !/^\d{4}$/.test(last4 || "")
      ) {
        return res.status(400).send(
          searchForm("Please enter valid 4 digits")
        );
      }

      const field = searchType === "phone"
        ? "phoneLast4"
        : "aadhaarLast4";

      const customers = await Customer.find({
        [field]: last4,
        active: { $ne: false }
      })
      .select("phoneLast4 aadhaarLast4")
      .limit(30)
      .lean();

      const rows = customers.map((c, i) => `
       <tr>
        <td>${i + 1}</td>
        <td>******${esc(c.phoneLast4)}</td>
        <td>XXXX-XXXX-${esc(c.aadhaarLast4)}</td>
        <td>
         <span class="tag paid">
           MATCH FOUND
         </span>
        </td>
       </tr>
      `).join("");

      res.send(layout("Search Results", `
       <div class="card">
        <h2>Customer Search Results</h2>
        <p class="note">
         अंतिम 4 अंक एक से ज्यादा ग्राहकों के
         हो सकते हैं।
        </p>
        <div class="table-wrap">
         <table>
          <thead>
           <tr>
            <th>S.No.</th>
            <th>Phone</th>
            <th>Aadhaar</th>
            <th>Payment</th>
           </tr>
          </thead>
          <tbody>
           ${rows || `
            <tr>
             <td colspan="4">
               No Customer Found
             </td>
            </tr>
           `}
          </tbody>
         </table>
        </div>

        <p class="note">
         पूरी Payment History के लिए Admin से
         अपना Customer Payment Link प्राप्त करें।
        </p>

        <a href="/customer-bakaya" class="btn">
         Back to Search
        </a>
       </div>
      `));

    } catch (err) {
      console.error("Search Error:", err);
      res.status(500).send("Server Error");
    }
  }
);

// ======================================
// PUBLIC PAYMENT VIEW BY PRIVATE LINK
// NO PIN OR OTP
// ======================================

router.get("/customer-bakaya/view/:reference",
  async (req, res) => {
    try {
      res.set("Cache-Control", "no-store");
      res.set("Referrer-Policy", "no-referrer");
      res.set("X-Robots-Tag", "noindex, nofollow");

      const reference = req.params.reference;

      if (!/^[a-f0-9]{48}$/.test(reference)) {
        return res.status(404).send("Not Found");
      }

      const customer = await Customer.findOne({
        publicReference: reference,
        active: { $ne: false }
      });

      if (!customer) {
        return res.status(404).send("Not Found");
      }

      const { due, paid, balance } = totals(customer);

      const entries = [...customer.entries].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const history = entries.map((e, i) => `
       <tr>
        <td>${i + 1}</td>
        <td>${dateText(e.date)}</td>
        <td>${esc(e.reason)}</td>
        <td>${money(e.amount)}</td>
        <td>
         <span class="tag ${
           e.type === "PAID" ? "paid" : "unpaid"
         }">
          ${e.type}
         </span>
        </td>
       </tr>
      `).join("");

      res.send(layout("Payment History", `
       <div class="card">
        <h2>Customer Payment View</h2>
        <p><b>Name:</b> ${esc(customer.name)}</p>
        <p><b>Mobile:</b>
         ******${esc(customer.phoneLast4)}
        </p>
        <p><b>Aadhaar:</b>
         XXXX-XXXX-${esc(customer.aadhaarLast4)}
        </p>
       </div>

       <div class="card">
        <h2>Payment Summary</h2>

        <div class="grid">
         <div class="stat">
          Total Bill
          <strong>${money(due)}</strong>
         </div>
         <div class="stat">
          Total Paid
          <strong class="green">
           ${money(paid)}
          </strong>
         </div>
         <div class="stat">
          Remaining Bakaya
          <strong class="red">
           ${money(Math.max(balance, 0))}
          </strong>
         </div>
        </div>

        <p><b>Status:</b>
          ${
            balance > 0 ? "UNPAID / PARTIAL" :
            balance < 0 ? "ADVANCE PAID" :
            "FULLY PAID"
          }
        </p>
       </div>

       <div class="card">
        <h2>Payment History</h2>

        <div class="table-wrap">
         <table>
          <thead>
           <tr>
            <th>S.No.</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Amount</th>
            <th>Status</th>
           </tr>
          </thead>
          <tbody>
           ${history || `
            <tr>
             <td colspan="5">
              No Payment History
             </td>
            </tr>
           `}
          </tbody>
         </table>
        </div>
       </div>
      `));

    } catch (err) {
      console.error("Payment View Error:", err);
      res.status(500).send("Server Error");
    }
  }
);

// ======================================
// ADMIN ADD CUSTOMER PAGE
// ======================================

router.get(
  "/admin/bakaya/customer",
  requireAdmin,
  (req, res) => {
    res.send(layout("Add Customer", `
     <div class="card">
      <h2>GLOBAL SERVICES – Add Customer</h2>

      <form method="POST"
        action="/admin/bakaya/customer">

       <label>Customer Name</label>
       <input name="name"
        maxlength="100" required>

       <label>Mobile Number (10 Digits)</label>
       <input name="phone"
        maxlength="10"
        pattern="[0-9]{10}"
        inputmode="numeric" required>

       <label>Aadhaar Number (12 Digits)</label>
       <input name="aadhaar"
        maxlength="12"
        pattern="[0-9]{12}"
        inputmode="numeric" required>

       <button type="submit">
        Save Customer
       </button>
      </form>
     </div>
    `));
  }
);

// ======================================
// ADMIN SAVE CUSTOMER
// ======================================

router.post(
  "/admin/bakaya/customer",
  requireAdmin,
  async (req, res) => {
    try {
      const name = String(req.body.name || "").trim();
      const phone = String(req.body.phone || "").trim();
      const aadhaar = String(req.body.aadhaar || "").trim();

      if (
        !name ||
        name.length > 100 ||
        !/^\d{10}$/.test(phone) ||
        !/^\d{12}$/.test(aadhaar)
      ) {
        return res.status(400).send(
          "Invalid Customer Details"
        );
      }

      const reference =
        crypto.randomBytes(24).toString("hex");

      const customer = await Customer.create({
        name,
        phone,
        phoneLast4: phone.slice(-4),
        aadhaarLast4: aadhaar.slice(-4),
        publicReference: reference,
        entries: []
      });

      const paymentPath =
        "/customer-bakaya/view/" + reference;

      res.send(layout("Customer Saved", `
       <div class="card">
        <h2>Customer Saved Successfully</h2>
        <p><b>Name:</b> ${esc(customer.name)}</p>

        <p>
         यह निजी Payment Link ग्राहक को भेजें।
         जिसके पास लिंक होगा, वह हिसाब देख सकेगा।
        </p>

        <a class="btn" href="${paymentPath}">
         View Customer Payment
        </a>

        <p class="note">
         ${esc(paymentPath)}
        </p>

        <p>
         <a href="/admin/bakaya/customer">
          Add Another Customer
         </a>
        </p>
       </div>
      `));

    } catch (err) {
      console.error("Create Customer Error:", err);
      res.status(500).send(
        "Customer creation failed"
      );
    }
  }
);

// ======================================
// ADMIN ADD PAYMENT / DUE
// ======================================

router.post(
  "/admin/bakaya/payment/:id",
  requireAdmin,
  async (req, res) => {
    try {
      const { type, amount, reason, date } = req.body;
      const value = Number(amount);

      if (
        !["DUE", "PAID"].includes(type) ||
        !Number.isFinite(value) ||
        value <= 0 ||
        value > 100000000 ||
        typeof reason !== "string" ||
        reason.length > 300 ||
        !date ||
        Number.isNaN(Date.parse(date))
      ) {
        return res.status(400).send("Invalid Payment");
      }

      const customer = await Customer.findById(
        req.params.id
      );

      if (!customer) {
        return res.status(404).send(
          "Customer Not Found"
        );
      }

      customer.entries.push({
        type,
        amount: Math.round(value * 100) / 100,
        reason: reason.trim(),
        date: new Date(date)
      });

      await customer.save();

      res.json({
        success: true,
        message: "Payment Saved"
      });

    } catch (err) {
      console.error("Payment Error:", err);
      res.status(500).send("Payment Save Failed");
    }
  }
);

module.exports = router;

