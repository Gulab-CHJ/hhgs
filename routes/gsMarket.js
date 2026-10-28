// routes/gsMarket.js
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// ================================
// GS MARKET MODELS
// ================================

const settingSchema = new mongoose.Schema({
  shopName: {
    type: String,
    default: "GS MARKET"
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  },
  deliveryRadiusKm: {
    type: Number,
    default: 2
  },
  deliveryCharge: {
    type: Number,
    default: 20
  }
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  items: [{
    serviceId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  deliveryCharge: Number,
  total: Number,
  status: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Preparing",
      "Out for Delivery",
      "Completed",
      "Cancelled"
    ],
    default: "Pending"
  }
}, { timestamps: true });

const Setting =
  mongoose.models.GSMarketSetting ||
  mongoose.model("GSMarketSetting", settingSchema);

const Service =
  mongoose.models.GSMarketService ||
  mongoose.model("GSMarketService", serviceSchema);

const Order =
  mongoose.models.GSMarketOrder ||
  mongoose.model("GSMarketOrder", orderSchema);

// ================================
// ADMIN AUTHENTICATION
// IMPORTANT:
// नीचे की जांच को अपने मौजूदा HHGS admin
// middleware से बदलें, यदि उसका session
// structure अलग है.
// ================================

function requireMarketAdmin(req, res, next) {
  const session = req.session;

  const isAdmin =
    session &&
    (
      session.isAdmin === true ||
      session.admin === true ||
      session.admin?.isAdmin === true
    );

  if (!isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Admin login required"
    });
  }

  next();
}

// ================================
// HELPERS
// ================================

async function getSettings() {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({
      isOpen: false,
      deliveryRadiusKm: 2,
      deliveryCharge: 20
    });
  }

  return settings;
}

function validCoordinates(lat, lon) {
  return Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180;
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = n => n * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 6371 * 2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ================================
// ADMIN DASHBOARD PAGE
// ================================

router.get("/admin", requireMarketAdmin, (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GS Market Admin</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#f4f6fb;color:#182230}
main{max-width:950px;margin:auto;padding:18px}
.card{background:white;border-radius:16px;padding:18px;margin:14px 0;
box-shadow:0 3px 15px #0000000b}
h1{margin-top:5px}
.status{padding:13px;border-radius:10px;font-weight:bold}
.closed{background:#fee2e2;color:#b91c1c}
.open{background:#dcfce7;color:#166534}
button{border:0;padding:12px 15px;border-radius:9px;
cursor:pointer;font-weight:bold;background:#14532d;color:white;margin:4px 2px}
button.secondary{background:#e5e7eb;color:#111827}
button.danger{background:#b91c1c}
input,textarea,select{width:100%;padding:11px;margin:6px 0 12px;
border:1px solid #d1d5db;border-radius:8px;font:inherit}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.item{border:1px solid #e5e7eb;padding:12px;border-radius:10px;margin:8px 0}
.small{color:#64748b;font-size:13px}
@media(max-width:600px){.row{grid-template-columns:1fr}main{padding:10px}}
</style>
</head>
<body>
<main>
<h1>🛍️ GS MARKET</h1>
<p>Shop Management Dashboard</p>

<div class="card">
  <div id="status" class="status closed">LOADING SHOP STATUS...</div>
  <p>📦 Delivery Radius: <b id="radius">2 KM</b></p>
  <p>💵 Delivery Charge: <b id="charge">₹20</b></p>
  <p>📍 Shop Location: <b id="location">Checking...</b></p>
  <button id="saveLocation">📍 SAVE GPS LOCATION</button>
  <button id="toggleShop">🟢 OPEN SHOP</button>
  <p class="small">Shop खोलने के लिए GPS अनुमति आवश्यक है।</p>
</div>

<div class="card">
<h2>⚙️ Delivery Settings</h2>
<label>Delivery Radius (KM)</label>
<input id="radiusInput" type="number" min="0.1" max="50" step="0.1" value="2">
<label>Delivery Charge (₹)</label>
<input id="chargeInput" type="number" min="0" max="100000" value="20">
<button id="saveSettings">SAVE SETTINGS</button>
</div>

<div class="card">
<h2>➕ Add Service / Product</h2>
<label>Name</label><input id="serviceName" maxlength="120">
<label>Description</label><textarea id="serviceDescription" maxlength="1000"></textarea>
<label>Price (₹)</label><input id="servicePrice" type="number" min="0" max="1000000" step="0.01">
<button id="addService">ADD SERVICE</button>
<div id="services"></div>
</div>

<div class="card">
<h2>🔔 Orders</h2>
<button id="refreshOrders">REFRESH ORDERS</button>
<div id="orders"></div>
</div>

<div class="card">
<h2>🔗 Pages</h2>
<p><a href="/gs-market/customer" target="_blank">Open Customer Page</a></p>
<p><a href="/gs-market/api/shop-status" target="_blank">Check Shop Status API</a></p>
</div>
</main>

<script>
const $ = id => document.getElementById(id);

async function api(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {"Content-Type":"application/json", ...(options.headers || {})},
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

async function loadStatus() {
  const data = await api("/gs-market/api/shop-status");

  $("status").textContent = data.isOpen ? "🟢 SHOP OPEN" : "🔴 SHOP CLOSED";
  $("status").className = "status " + (data.isOpen ? "open" : "closed");
  $("toggleShop").textContent = data.isOpen ? "🔴 CLOSE SHOP" : "🟢 OPEN SHOP";

  $("radius").textContent = data.deliveryRadiusKm + " KM";
  $("charge").textContent = "₹" + data.deliveryCharge;
  $("radiusInput").value = data.deliveryRadiusKm;
  $("chargeInput").value = data.deliveryCharge;

  $("location").textContent =
    data.latitude != null && data.longitude != null
      ? "Saved ✅"
      : "Not saved ❌";
}

async function saveGps() {
  if (!navigator.geolocation) {
    alert("इस ब्राउज़र में GPS उपलब्ध नहीं है।");
    return;
  }

  $("saveLocation").disabled = true;
  $("saveLocation").textContent = "Getting GPS...";

  navigator.geolocation.getCurrentPosition(async position => {
    try {
      await api("/gs-market/api/shop-location", {
        method: "POST",
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });

      alert("Shop GPS location saved successfully.");
      await loadStatus();
    } catch (error) {
      alert(error.message);
    } finally {
      $("saveLocation").disabled = false;
      $("saveLocation").textContent = "📍 SAVE GPS LOCATION";
    }
  }, error => {
    alert("GPS अनुमति दें और दोबारा कोशिश करें: " + error.message);
    $("saveLocation").disabled = false;
    $("saveLocation").textContent = "📍 SAVE GPS LOCATION";
  }, {enableHighAccuracy:true, timeout:15000, maximumAge:0});
}

$("saveLocation").onclick = saveGps;

$("toggleShop").onclick = async () => {
  try {
    const status = await api("/gs-market/api/shop-status");
    if (!status.isOpen &&
        (status.latitude == null || status.longitude == null)) {
      alert("पहले SAVE GPS LOCATION पर क्लिक करें।");
      return;
    }

    await api("/gs-market/api/shop-toggle", {
      method: "POST",
      body: JSON.stringify({isOpen: !status.isOpen})
    });

    await loadStatus();
  } catch (error) {
    alert(error.message);
  }
};

$("saveSettings").onclick = async () => {
  try {
    await api("/gs-market/api/settings", {
      method:"POST",
      body:JSON.stringify({
        deliveryRadiusKm:Number($("radiusInput").value),
        deliveryCharge:Number($("chargeInput").value)
      })
    });

    alert("Settings saved.");
    await loadStatus();
  } catch (error) {
    alert(error.message);
  }
};

async function loadServices() {
  const data = await api("/gs-market/api/admin/services");

  $("services").innerHTML = data.services.map(s => \`
    <div class="item">
      <b>\${escapeHtml(s.name)}</b> — ₹\${s.price}
      <p>\${escapeHtml(s.description)}</p>
      <p>Status: \${s.active ? "Active" : "Hidden"}</p>
      <button class="secondary" onclick="toggleService('\${s._id}', \${!s.active})">
        \${s.active ? "HIDE" : "ACTIVATE"}
      </button>
      <button class="danger" onclick="deleteService('\${s._id}')">DELETE</button>
    </div>\`).join("") || "No services added yet.";
}

$("addService").onclick = async () => {
  try {
    await api("/gs-market/api/admin/services", {
      method:"POST",
      body:JSON.stringify({
        name:$("serviceName").value.trim(),
        description:$("serviceDescription").value.trim(),
        price:Number($("servicePrice").value)
      })
    });

    $("serviceName").value = "";
    $("serviceDescription").value = "";
    $("servicePrice").value = "";
    await loadServices();
    alert("Service added.");
  } catch (error) {
    alert(error.message);
  }
};

window.toggleService = async (id, active) => {
  try {
    await api("/gs-market/api/admin/services/" + id, {
      method:"PATCH",
      body:JSON.stringify({active})
    });
    await loadServices();
  } catch (error) {
    alert(error.message);
  }
};

window.deleteService = async id => {
  if (!confirm("Delete this service?")) return;
  try {
    await api("/gs-market/api/admin/services/" + id, {method:"DELETE"});
    await loadServices();
  } catch (error) {
    alert(error.message);
  }
};

async function loadOrders() {
  const data = await api("/gs-market/api/admin/orders");

  $("orders").innerHTML = data.orders.map(o => \`
    <div class="item">
      <b>\${escapeHtml(o.orderNumber)}</b> — ₹\${o.total}
      <p>Customer: \${escapeHtml(o.customerName)} | \${escapeHtml(o.phone)}</p>
      <p>Address: \${escapeHtml(o.address)}</p>
      <p>Status: <b>\${escapeHtml(o.status)}</b></p>
      <select id="st-\${o._id}">
        \${["Pending","Accepted","Preparing","Out for Delivery","Completed","Cancelled"].map(st =>
          \`<option \${st === o.status ? "selected" : ""}>\${st}</option>\`
        ).join("")}
      </select>
      <button onclick="updateOrder('\${o._id}')">UPDATE STATUS</button>
    </div>\`).join("") || "No orders yet.";
}

window.updateOrder = async id => {
  try {
    await api("/gs-market/api/admin/orders/" + id, {
      method:"PATCH",
      body:JSON.stringify({status:$("st-" + id).value})
    });
    await loadOrders();
    alert("Order updated.");
  } catch (error) {
    alert(error.message);
  }
};

$("refreshOrders").onclick = loadOrders;

Promise.all([loadStatus(), loadServices(), loadOrders()])
  .catch(error => alert(error.message));
</script>
</body>
</html>`);
});

// ================================
// CUSTOMER PAGE
// ================================

router.get("/customer", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GS Market</title>
<style>
body{font-family:Arial,sans-serif;background:#f4f6fb;margin:0;color:#172033}
main{max-width:720px;margin:auto;padding:16px}
.card{background:white;border-radius:14px;padding:16px;margin:12px 0}
input,textarea,button{box-sizing:border-box;width:100%;padding:12px;margin:7px 0;
border-radius:8px;border:1px solid #ddd;font:inherit}
button{background:#14532d;color:white;border:0;font-weight:bold}
button:disabled{background:#9ca3af}
.product{border:1px solid #e5e7eb;padding:12px;margin:8px 0;border-radius:10px}
.status{padding:12px;border-radius:9px;font-weight:bold}
</style>
</head>
<body><main>
<h1>🛍️ GS MARKET</h1>
<div id="status" class="status">Loading shop status...</div>
<p id="delivery"></p>
<div class="card"><h2>Available Products / Services</h2><div id="products"></div></div>
<div class="card">
<h2>Place Order</h2>
<form id="orderForm">
<input id="name" placeholder="Your name" maxlength="100" required>
<input id="phone" placeholder="10-digit mobile number" inputmode="numeric"
pattern="[0-9]{10}" required>
<textarea id="address" placeholder="Full delivery address" maxlength="500" required></textarea>
<div id="quantities"></div>
<button id="placeOrder" type="submit">PLACE ORDER</button>
</form>
<div id="message"></div>
</div>
</main>
<script>
const $ = id => document.getElementById(id);
let products = [];
let shop = null;

function esc(v) {
 return String(v ?? "").replace(/[&<>"']/g, c => ({
 "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
 }[c]));
}

async function getJSON(url, options={}) {
 const r = await fetch(url, {
   headers:{"Content-Type":"application/json"},
   ...options
 });
 const d = await r.json().catch(()=>({}));
 if(!r.ok) throw new Error(d.message || "Request failed");
 return d;
}

async function refresh() {
 try {
   shop = await getJSON("/gs-market/api/shop-status");
   $("status").textContent = shop.isOpen ? "🟢 SHOP OPEN" : "🔴 SHOP CLOSED";
   $("status").style.background = shop.isOpen ? "#dcfce7" : "#fee2e2";
   $("delivery").textContent = "Delivery radius: " + shop.deliveryRadiusKm +
     " KM | Delivery charge: ₹" + shop.deliveryCharge;

   const d = await getJSON("/gs-market/api/services");
   products = d.services;

   $("products").innerHTML = products.map(p => \`
    <div class="product">
      <b>\${esc(p.name)}</b> — ₹\${p.price}
      <p>\${esc(p.description)}</p>
      \${shop.isOpen ? \`<label>Quantity
        <input type="number" min="0" max="50" value="0" id="q-\${p._id}">
      </label>\` : ""}
    </div>\`).join("") || "No products currently available.";

   $("placeOrder").disabled = !shop.isOpen || products.length === 0;
 } catch (error) {
   $("status").textContent = "SHOP STATUS UNAVAILABLE";
   $("placeOrder").disabled = true;
   $("products").textContent = "Shop information is temporarily unavailable.";
 }
}

$("orderForm").onsubmit = async event => {
 event.preventDefault();

 if (!shop || !shop.isOpen) {
   $("message").textContent = "Shop is closed. Please try again later.";
   $("placeOrder").disabled = true;
   return;
 }

 const items = products.map(p => ({
   serviceId:p._id,
   quantity:Number($("q-" + p._id)?.value || 0)
 })).filter(i => i.quantity > 0);

 if (!items.length) {
   alert("Please select at least one product.");
   return;
 }

 $("placeOrder").disabled = true;

 try {
   const result = await getJSON("/gs-market/api/orders", {
     method:"POST",
     body:JSON.stringify({
       customerName:$("name").value.trim(),
       phone:$("phone").value.trim(),
       address:$("address").value.trim(),
       items
     })
   });

   $("message").textContent =
     "Order placed: " + result.order.orderNumber +
     ". Total: ₹" + result.order.total;
   $("orderForm").reset();
 } catch(error) {
   $("message").textContent = error.message;
 } finally {
   await refresh();
 }
};

refresh();
setInterval(refresh, 10000);
</script>
</body></html>`);
});

// ================================
// PUBLIC SHOP STATUS / SERVICES
// ================================

router.get("/api/shop-status", async (req, res) => {
  try {
    const s = await getSettings();
    res.set("Cache-Control", "no-store");

    res.json({
      success: true,
      isOpen: s.isOpen,
      latitude: s.latitude,
      longitude: s.longitude,
      deliveryRadiusKm: s.deliveryRadiusKm,
      deliveryCharge: s.deliveryCharge
    });
  } catch (error) {
    console.error("GS Market status error:", error);
    res.status(500).json({
      success: false,
      message: "Shop status unavailable"
    });
  }
});

router.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find({active: true})
      .select("name description price active")
      .lean();

    res.json({success: true, services});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to load services"
    });
  }
});

// ================================
// ADMIN: SAVE GPS
// ================================

router.post("/api/shop-location", requireMarketAdmin, async (req, res) => {
  try {
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);

    if (!validCoordinates(latitude, longitude)) {
      return res.status(400).json({
        success: false,
        message: "Valid GPS coordinates required"
      });
    }

    const s = await getSettings();
    s.latitude = latitude;
    s.longitude = longitude;
    await s.save();

    res.json({success: true, message: "Shop location saved"});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to save location"});
  }
});

// ================================
// ADMIN: OPEN / CLOSE SHOP
// ================================

router.post("/api/shop-toggle", requireMarketAdmin, async (req, res) => {
  try {
    const s = await getSettings();
    const isOpen = req.body.isOpen;

    if (typeof isOpen !== "boolean") {
      return res.status(400).json({
        success:false,
        message:"isOpen must be true or false"
      });
    }

    if (isOpen && (s.latitude == null || s.longitude == null)) {
      return res.status(400).json({
        success:false,
        message:"Save shop GPS location before opening"
      });
    }

    s.isOpen = isOpen;
    await s.save();

    res.json({
      success:true,
      isOpen:s.isOpen
    });
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to update shop status"});
  }
});

// ================================
// ADMIN: DELIVERY SETTINGS
// ================================

router.post("/api/settings", requireMarketAdmin, async (req, res) => {
  try {
    const radius = Number(req.body.deliveryRadiusKm);
    const charge = Number(req.body.deliveryCharge);

    if (!Number.isFinite(radius) || radius < 0.1 || radius > 50 ||
        !Number.isFinite(charge) || charge < 0 || charge > 100000) {
      return res.status(400).json({
        success:false,
        message:"Invalid delivery radius or charge"
      });
    }

    const s = await getSettings();
    s.deliveryRadiusKm = radius;
    s.deliveryCharge = charge;
    await s.save();

    res.json({success:true});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to save settings"});
  }
});

// ================================
// ADMIN: MANAGE SERVICES
// ================================

router.get("/api/admin/services", requireMarketAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({createdAt:-1}).lean();
    res.json({success:true, services});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to load services"});
  }
});

router.post("/api/admin/services", requireMarketAdmin, async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const description = String(req.body.description || "").trim();
    const price = Number(req.body.price);

    if (!name || name.length > 120 ||
        description.length > 1000 ||
        !Number.isFinite(price) || price < 0 || price > 1000000) {
      return res.status(400).json({
        success:false,
        message:"Enter a valid name and price"
      });
    }

    const service = await Service.create({
      name,
      description,
      price,
      active:true
    });

    res.status(201).json({success:true, service});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to add service"});
  }
});

router.patch("/api/admin/services/:id", requireMarketAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({success:false, message:"Invalid service ID"});
    }

    const updates = {};

    if (typeof req.body.active === "boolean") {
      updates.active = req.body.active;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {$set:updates},
      {new:true, runValidators:true}
    );

    if (!service) {
      return res.status(404).json({success:false, message:"Service not found"});
    }

    res.json({success:true, service});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to update service"});
  }
});

router.delete("/api/admin/services/:id", requireMarketAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({success:false, message:"Invalid service ID"});
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({success:true});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to delete service"});
  }
});

// ================================
// CUSTOMER: CREATE ORDER
// Shop must be open at order creation.
// Price is calculated from MongoDB, never
// trusted from the customer's browser.
// ================================

router.post("/api/orders", async (req, res) => {
  try {
    const s = await getSettings();

    if (!s.isOpen) {
      return res.status(403).json({
        success:false,
        message:"GS Market is closed. New orders are not being accepted."
      });
    }

    if (s.latitude == null || s.longitude == null) {
      return res.status(503).json({
        success:false,
        message:"Shop location is not configured"
      });
    }

    const customerName = String(req.body.customerName || "").trim();
    const phone = String(req.body.phone || "").trim();
    const address = String(req.body.address || "").trim();
    const items = req.body.items;

    if (!customerName || customerName.length > 100 ||
        !/^[0-9]{10}$/.test(phone) ||
        !address || address.length > 500 ||
        !Array.isArray(items) || items.length < 1 || items.length > 30) {
      return res.status(400).json({
        success:false,
        message:"Please enter valid customer details and items"
      });
    }

    const cleanItems = [];
    let subtotal = 0;

    for (const item of items) {
      if (!mongoose.isValidObjectId(item.serviceId)) {
        return res.status(400).json({
          success:false,
          message:"Invalid product or service"
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
        return res.status(400).json({
          success:false,
          message:"Invalid quantity"
        });
      }

      const service = await Service.findOne({
        _id:item.serviceId,
        active:true
      });

      if (!service) {
        return res.status(400).json({
          success:false,
          message:"A selected product is no longer available"
        });
      }

      cleanItems.push({
        serviceId:service._id,
        name:service.name,
        price:service.price,
        quantity
      });

      subtotal += service.price * quantity;
    }

    // Delivery address is required, but a typed address alone
    // cannot prove the customer's distance from the shop.
    // A verified customer GPS coordinate is needed for
    // strict radius enforcement.

    const total = subtotal + s.deliveryCharge;

    const order = await Order.create({
      orderNumber:"GSM-" + Date.now() + "-" +
        Math.floor(100 + Math.random() * 900),
      customerName,
      phone,
      address,
      items:cleanItems,
      subtotal,
      deliveryCharge:s.deliveryCharge,
      total,
      status:"Pending"
    });

    res.status(201).json({
      success:true,
      order:{
        orderNumber:order.orderNumber,
        subtotal:order.subtotal,
        deliveryCharge:order.deliveryCharge,
        total:order.total,
        status:order.status
      }
    });
  } catch (error) {
    console.error("GS Market order error:", error);
    res.status(500).json({
      success:false,
      message:"Unable to place order. Please try again."
    });
  }
});

// ================================
// ADMIN: VIEW AND UPDATE ORDERS
// ================================

router.get("/api/admin/orders", requireMarketAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({createdAt:-1})
      .limit(200)
      .lean();

    res.json({success:true, orders});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to load orders"});
  }
});

router.patch("/api/admin/orders/:id", requireMarketAdmin, async (req, res) => {
  try {
    const allowed = [
      "Pending",
      "Accepted",
      "Preparing",
      "Out for Delivery",
      "Completed",
      "Cancelled"
    ];

    if (!mongoose.isValidObjectId(req.params.id) ||
        !allowed.includes(req.body.status)) {
      return res.status(400).json({
        success:false,
        message:"Invalid order or status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {$set:{status:req.body.status}},
      {new:true, runValidators:true}
    );

    if (!order) {
      return res.status(404).json({success:false, message:"Order not found"});
    }

    res.json({success:true, order});
  } catch (error) {
    res.status(500).json({success:false, message:"Unable to update order"});
  }
});

module.exports = router;