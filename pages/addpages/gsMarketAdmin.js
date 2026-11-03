function GSMarketAdmin(data = {}) {
  const products = Number(data.products || 0);
  const orders = Number(data.orders || 0);
  const pending = Number(data.pending || 0);
  const sales = Number(data.sales || 0);
  const shopOpen = data.shopOpen !== false;
  const deliveryCharge = Number(data.deliveryCharge ?? 20);
  const radius = Number(data.radius ?? 2);
  const message = String(data.message || "");

  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#102c52">
<title>GS Market Admin Dashboard | HHGS23</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#f2f5fa;color:#142033;font-family:Arial,sans-serif}
main{max-width:1100px;margin:auto;padding:20px}
header{padding:24px;background:linear-gradient(130deg,#102c52,#2563eb);color:#fff;border-radius:20px}
header h1{margin:0 0 8px;font-size:clamp(23px,4vw,34px)}
header p{margin:0;color:#dbeafe;line-height:1.5}
.status-panel,.stat,.action{background:#fff;border:1px solid #e1e8f2;border-radius:16px;padding:18px}
.status-panel{margin-top:18px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.status{font-weight:bold;color:${shopOpen ? "#15803d" : "#b91c1c"}}
.status-dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:${shopOpen ? "#16a34a" : "#dc2626"};margin-right:7px}
button,.button{border:0;border-radius:10px;padding:12px 16px;font-size:14px;font-weight:bold;cursor:pointer;text-decoration:none;display:inline-block}
.open-btn{background:#dcfce7;color:#166534}
.close-btn{background:#fee2e2;color:#991b1b}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}
.stat span{color:#64748b;font-size:13px}
.stat strong{display:block;font-size:27px;margin-top:8px;overflow-wrap:anywhere}
.actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.action{color:#142033;text-decoration:none;display:block;transition:transform .15s,border-color .15s}
.action:hover{transform:translateY(-2px);border-color:#93b4ed}
.action h2{font-size:17px;margin:0 0 8px}
.action p{margin:0;color:#64748b;font-size:13px;line-height:1.5}
.action .arrow{display:block;color:#2563eb;font-size:13px;font-weight:bold;margin-top:14px}
.config{margin-top:18px;color:#526078;font-size:13px;line-height:1.7}
.message{margin-top:14px;padding:12px;border-radius:10px;background:#eff6ff;color:#1d4ed8}
@media(max-width:700px){main{padding:12px}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.actions{grid-template-columns:1fr}header{padding:20px}.stat{padding:15px}.stat strong{font-size:24px}}
</style>
</head>
<body>
<main>
<header>
  <h1>🛍️ GS Market Admin Dashboard</h1>
  <p>HHGS23.com · Product &amp; Order Management</p>
</header>

${message ? `<div class="message">${message.replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]))}</div>` : ""}

<section class="status-panel">
  <div>
    <div style="font-weight:bold;margin-bottom:9px">Shop Status</div>
    <div class="status"><span class="status-dot"></span>${shopOpen ? "Shop Open" : "Shop Closed"}</div>
    <div style="font-size:12px;color:#64748b;margin-top:7px">${shopOpen ? "Customer checkout enabled, subject to checkout validation." : "New customer orders must be blocked at checkout."}</div>
  </div>
  <form method="POST" action="/admin/market/shop-status">
    <input type="hidden" name="shopOpen" value="${shopOpen ? "false" : "true"}">
    <button class="${shopOpen ? "close-btn" : "open-btn"}" type="submit">
      ${shopOpen ? "Close Shop" : "Open Shop"}
    </button>
  </form>
</section>

<section class="stats">
  <div class="stat"><span>Total Products</span><strong>${products}</strong></div>
  <div class="stat"><span>Total Orders</span><strong>${orders}</strong></div>
  <div class="stat"><span>Pending Orders</span><strong>${pending}</strong></div>
  <div class="stat"><span>Paid Sales</span><strong>₹${sales.toLocaleString("en-IN",{maximumFractionDigits:2})}</strong></div>
</section>

<section class="actions">
  <a class="action" href="/admin/market/products">
    <h2>📦 Products &amp; Stock</h2>
    <p>Add, edit and manage product inventory.</p>
    <span class="arrow">Manage Products →</span>
  </a>
  <a class="action" href="/admin/market/orders">
    <h2>🧾 Customer Orders</h2>
    <p>View customer orders and update their status.</p>
    <span class="arrow">Manage Orders →</span>
  </a>
  <a class="action" href="/market">
    <h2>🛒 Customer Store</h2>
    <p>Open the public GS Market store.</p>
    <span class="arrow">Open Store →</span>
  </a>
  <a class="action" href="/admin/change-password">
    <h2>🔐 Admin Password</h2>
    <p>Open the existing HHGS admin password page.</p>
    <span class="arrow">Change Password →</span>
  </a>
</section>

<div class="config">
  <strong>Delivery configuration:</strong>
  ₹${deliveryCharge} delivery charge · ${radius} km service radius.<br>
  Radius validation requires the checkout to collect customer coordinates and compare them with the configured shop location.
</div>
</main>
</body>
</html>`;
}

module.exports = GSMarketAdmin;