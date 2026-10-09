
module.exports = function CustomerBakayaSection(
  customers = []
) {
  const esc = v => String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const money = n => "₹" + Number(n || 0).toFixed(2);

  const visibleCustomers = Array.isArray(customers)
  ? customers.filter(c =>
      c.active !== false &&
      c.publicBalanceVisible === true
    )
  : [];

const rows = visibleCustomers.map((c, i) => {
    const due = (c.entries || [])
      .filter(e => e.type === "DUE")
      .reduce((s, e) => s + Number(e.amount || 0), 0);

    const paid = (c.entries || [])
      .filter(e => e.type === "PAID")
      .reduce((s, e) => s + Number(e.amount || 0), 0);

    return `
      <tr data-search="${esc(c.phoneLast4)} ${esc(c.aadhaarLast4)}">
        <td>${i + 1}</td>
        <td>******${esc(c.phoneLast4)}</td>
        <td>XXXX-XXXX-${esc(c.aadhaarLast4)}</td>
        <td>${money(due)}</td>
        <td style="color:green">${money(paid)}</td>
        <td style="color:#dc2626">
          ${money(Math.max(0, due - paid))}
        </td>
      </tr>
    `;
  }).join("");

  return `
  <section id="customer-bakaya-home" style="
    max-width:1100px;
    margin:25px auto;
    padding:20px;
    background:white;
    border:1px solid #d1e7dc;
    border-radius:18px;
    font-family:Arial,sans-serif;
  ">
    <h2 style="color:#065f46">
      GLOBAL SERVICES – बकाया भुगतान
    </h2>

    <p>मोबाइल या आधार के आखिरी 4 अंक से हिसाब देखें।</p>

    <a href="/customer-bakaya" style="
      display:inline-block;
      padding:13px 22px;
      background:#047857;
      color:white;
      border-radius:10px;
      text-decoration:none;
      font-weight:bold;
    ">₹ Check My Payment</a>

    <h3 style="margin-top:25px">
      All Customers
    </h3>

    <input
      id="bakayaHomeSearch"
      type="search"
      maxlength="4"
      inputmode="numeric"
      placeholder="Search Last 4 Digits"
      style="
        width:100%;
        padding:13px;
        border:1px solid #cbd5e1;
        border-radius:10px;
        margin-bottom:15px;
      "
    >

    <div style="overflow-x:auto">
      <table style="
        width:100%;
        border-collapse:collapse;
        min-width:670px;
        text-align:left;
      ">
        <thead style="background:#ecfdf5">
          <tr>
            <th>S.No.</th>
            <th>Mobile</th>
            <th>Aadhaar</th>
            <th>Total Due</th>
            <th>Total Paid</th>
            <th>Bakaya</th>
          </tr>
        </thead>

        <tbody id="bakayaHomeRows">
          ${rows || `
            <tr><td colspan="6">
              No Customer Found
            </td></tr>
          `}
        </tbody>
      </table>
    </div>
  </section>

  <script>
    (function() {
      const search = document.getElementById("bakayaHomeSearch");
      const rows = document.querySelectorAll(
        "#bakayaHomeRows tr[data-search]"
      );

      if (!search) return;

      search.addEventListener("input", function() {
        const term = this.value.replace(/\\D/g, "").slice(0,4);
        this.value = term;

        rows.forEach(row => {
          row.style.display =
            row.dataset.search.includes(term) ? "" : "none";
        });
      });
    })();
  </script>
  `;
};
