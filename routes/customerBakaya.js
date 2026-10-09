
const express = require("express");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const Customer = require("../models/CustomerBakaya");

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

const esc = v => String(v ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const money = n => "₹" + Number(n || 0).toFixed(2);

const dateText = d => new Date(d).toLocaleDateString(
  "en-IN", { day: "2-digit", month: "short", year: "numeric" }
);

const layout = (title, content) => `
<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} | GLOBAL SERVICES</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#172b37}
.wrap{max-width:950px;margin:25px auto;padding:15px}
.header{background:linear-gradient(120deg,#064e3b,#059669);color:white;padding:25px;border-radius:18px;text-align:center}
.header h1{margin:0;font-size:27px}
.header p{margin:8px 0 0}
.card{background:white;padding:22px;border-radius:16px;margin-top:18px;box-shadow:0 5px 25px #0000000b}
input,select{width:100%;padding:13px;margin:8px 0 14px;border:1px solid #cbd5e1;border-radius:9px;font-size:15px}
button,.btn{padding:12px 18px;border:0;border-radius:9px;background:#047857;color:white;font-weight:bold;cursor:pointer;text-decoration:none;display:inline-block}
button{width:100%}
label{font-size:13px;font-weight:bold}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;min-width:510px}
th,td{padding:13px 10px;border-bottom:1px solid #e2e8f0;text-align:left;font-size:13px}
th{background:#ecfdf5;color:#065f46}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.stat{padding:15px;border-radius:12px;background:#f1f5f9}
.stat strong{display:block;margin-top:10px;font-size:21px}
.green{color:#047857}.red{color:#dc2626}
.badge{padding:6px 9px;border-radius:20px;font-weight:bold;font-size:11px}
.paid{background:#dcfce7;color:#166534}
.unpaid{background:#fee2e2;color:#991b1b}
.error{color:#dc2626;font-weight:bold}
@media(max-width:600px){
 .grid{grid-template-columns:1fr}
 .card{padding:15px}
 .header h1{font-size:22px}
}
</style>
</head>
<body>
<div class="wrap">
 <header class="header">
  <h1>GLOBAL SERVICES</h1>
  <p>Customer Payment & Bakaya Details</p>
 </header>
 ${content}
</div>
</body>
</html>`;

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(403).send("Admin login required");
  }
  next();
}

const searchLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many attempts. Try again later."
});

function searchForm(error = "") {
  return layout("Customer Bakaya", `
  <div class="card">
   <h2>अपना बकाया चेक करें</h2>
   <p>Mobile या Aadhaar के आखिरी 4 अंक डालें।</p>
   ${error ? `<p class="error">${esc(error)}</p>` : ""}
   <form action="/customer-bakaya/search" method="POST">
    <label>Search By</label>
    <select name="searchType">
     <option value="phone">Mobile Last 4 Digits</option>
     <option value="aadhaar">Aadhaar Last 4 Digits</option>
    </select>
    <label>Last 4 Digits</label>
    <input name="last4" maxlength="4"
      pattern="[0-9]{4}" inputmode="numeric" required>
    <label>Customer Security PIN</label>
    <input type="password" name="pin" required
      minlength="6" autocomplete="off">
    <button type="submit">Search Customer</button>
   </form>
  </div>`);
}

router.get("/customer-bakaya", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.send(searchForm());
});

router.post("/customer-bakaya/search", searchLimit,
 async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const { searchType, last4, pin } = req.body;

    if (!["phone", "aadhaar"].includes(searchType) ||
        !/^\d{4}$/.test(last4 || "") ||
        typeof pin !== "string" ||
        pin.length < 6 || pin.length > 72) {
      return res.status(400).send(
        searchForm("Invalid search details")
      );
    }

    const field = searchType === "phone"
      ? "phoneLast4" : "aadhaarLast4";

    // PIN must also match. Never expose records
    // based on the last four digits alone.
    const matches = await Customer.find({
      [field]: last4
    }).limit(100);

    let customer = null;
    for (const item of matches) {
      if (await bcrypt.compare(pin, item.pinHash)) {
        customer = item;
        break;
      }
    }

    if (!customer) {
      return res.status(404).send(
        searchForm("Customer not found or incorrect PIN")
      );
    }

    const entries = [...customer.entries].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const totalDue = entries
      .filter(e => e.type === "DUE")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalPaid = entries
      .filter(e => e.type === "PAID")
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalDue - totalPaid;

    const rows = entries.map((e, i) => `
      <tr>
       <td>${i + 1}</td>
       <td>${dateText(e.date)}</td>
       <td>${esc(e.reason || "-")}</td>
       <td>${money(e.amount)}</td>
       <td>
        <span class="badge ${e.type === "PAID" ? "paid" : "unpaid"}">
         ${e.type === "PAID" ? "PAID" : "DUE"}
        </span>
       </td>
      </tr>
    `).join("");

    res.send(layout("Payment View", `
      <div class="card">
       <h2>Customer Payment View</h2>
       <div class="table-wrap">
        <table>
         <thead><tr>
          <th>S.No.</th>
          <th>Phone</th>
          <th>Aadhaar</th>
          <th>Payment</th>
         </tr></thead>
         <tbody><tr>
          <td>1</td>
          <td>******${esc(customer.phoneLast4)}</td>
          <td>XXXX-XXXX-${esc(customer.aadhaarLast4)}</td>
          <td><span class="badge paid">VIEW</span></td>
         </tr></tbody>
        </table>
       </div>
       <p><b>Customer:</b> ${esc(customer.name)}</p>
      </div>

      <div class="card">
       <h2>Payment Summary</h2>
       <div class="grid">
        <div class="stat">Total Bill
         <strong>${money(totalDue)}</strong>
        </div>
        <div class="stat">Total Paid
         <strong class="green">${money(totalPaid)}</strong>
        </div>
        <div class="stat">Remaining Balance
         <strong class="${balance > 0 ? "red" : "green"}">
          ${money(Math.max(0, balance))}
         </strong>
        </div>
       </div>
       <p><b>Status:</b> ${
         balance > 0 ? "UNPAID / PARTIAL" :
         balance < 0 ? "ADVANCE PAID" : "FULLY PAID"
       }</p>
      </div>

      <div class="card">
       <h2>कब और क्यों बकाया है / Payment History</h2>
       <div class="table-wrap">
        <table>
         <thead><tr>
          <th>S.No.</th><th>Date</th>
          <th>Reason</th><th>Amount</th><th>Status</th>
         </tr></thead>
         <tbody>${rows || `<tr><td colspan="5">No records</td></tr>`}</tbody>
        </table>
       </div>
       <p><a class="btn" href="/customer-bakaya">Back</a></p>
      </div>
    `));
  } catch (err) {
    console.error("Bakaya search error:", err);
    res.status(500).send("Server Error");
  }
});

// ADMIN: Create customer
router.post("/admin/bakaya/customer", requireAdmin,
 async (req, res) => {
  try {
    const { name, phoneLast4, aadhaarLast4, pin } = req.body;

    if (!name || name.length > 100 ||
        !/^\d{4}$/.test(phoneLast4 || "") ||
        !/^\d{4}$/.test(aadhaarLast4 || "") ||
        typeof pin !== "string" ||
        pin.length < 6 || pin.length > 72) {
      return res.status(400).send("Invalid customer details");
    }

    const customer = await Customer.create({
      name: name.trim(),
      phoneLast4,
      aadhaarLast4,
      pinHash: await bcrypt.hash(pin, 12),
      entries: []
    });

    res.status(201).json({
      success: true,
      customerId: customer._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Customer creation failed");
  }
});

// ADMIN: Add due or received payment
router.post("/admin/bakaya/payment/:id", requireAdmin,
 async (req, res) => {
  try {
    const { type, amount, reason, date } = req.body;
    const value = Number(amount);

    if (!["DUE", "PAID"].includes(type) ||
        !Number.isFinite(value) ||
        value <= 0 ||
        value > 100000000 ||
        typeof reason !== "string" ||
        reason.length > 300 ||
        !date ||
        Number.isNaN(Date.parse(date))) {
      return res.status(400).send("Invalid payment");
    }

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    customer.entries.push({
      type,
      amount: Math.round(value * 100) / 100,
      reason: reason.trim(),
      date: new Date(date)
    });

    await customer.save();

    res.json({ success: true, message: "Payment saved" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment save failed");
  }
});

module.exports = router;
