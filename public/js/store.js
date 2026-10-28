
(() => {
  "use strict";

  const PRODUCTS_API = "/market/api/products";
  const CART_STORAGE_KEY = "gsMarketCartV1";

  const $ = (id) => document.getElementById(id);

  const state = {
    products: [],
    cart: readCart(),
    category: "all",
    search: ""
  };

  // -------------------------------
  // CART STORAGE
  // -------------------------------

  function readCart() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(CART_STORAGE_KEY) || "[]"
      );

      if (!Array.isArray(saved)) return [];

      return saved
        .filter(item =>
          item &&
          typeof item.id === "string" &&
          Number(item.quantity) > 0
        )
        .map(item => ({
          id: item.id,
          name: String(item.name || "Product"),
          price: Math.max(0, Number(item.price) || 0),
          quantity: Math.max(1, Math.floor(Number(item.quantity) || 1))
        }));
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(state.cart)
      );
    } catch (error) {
      console.error("Cart storage error:", error);
    }
  }

  // -------------------------------
  // HELPERS
  // -------------------------------

  function money(value) {
    const amount = Number(value);

    return "₹" + (
      Number.isFinite(amount) ? amount : 0
    ).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function productId(product) {
    return String(
      product._id || product.id || product.productId || ""
    );
  }

  function productName(product) {
    return String(
      product.name || product.title || product.productName || "Product"
    );
  }

  function productPrice(product) {
    return Math.max(0, Number(
      product.price ??
      product.salePrice ??
      product.sellingPrice ??
      0
    ) || 0);
  }

  function oldPrice(product) {
    return Math.max(0, Number(
      product.oldPrice ??
      product.mrp ??
      product.originalPrice ??
      0
    ) || 0);
  }

  function productCategory(product) {
    return String(
      product.category || product.categoryName || "Other"
    ).trim();
  }

  function productImage(product) {
    return String(
      product.imageUrl ||
      product.image ||
      product.imageURL ||
      product.photo ||
      product.thumbnail ||
      ""
    ).trim();
  }

  function productStock(product) {
    if (product.stock != null) {
      return Math.max(0, Number(product.stock) || 0);
    }

    if (product.quantity != null) {
      return Math.max(0, Number(product.quantity) || 0);
    }

    // If backend does not return stock, do not assume zero stock.
    return Infinity;
  }

  function cartQuantity() {
    return state.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  function cartSubtotal() {
    return state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // -------------------------------
  // CATEGORIES
  // -------------------------------

  function renderCategories() {
    const categories = [
      ...new Set(state.products.map(productCategory))
    ].filter(Boolean).sort((a, b) => a.localeCompare(b));

    const nav = $("sideCategories");
    const select = $("categoryFilter");

    const icons = {
      mobiles: "▣",
      electronics: "⌨",
      fashion: "👕",
      footwear: "👟",
      home: "⌂",
      grocery: "🛍️",
      beauty: "✦"
    };

    if (nav) {
      nav.innerHTML = `
        <button type="button"
          class="category-item ${state.category === "all" ? "active" : ""}"
          data-category="all">
          <span class="category-icon">▦</span>
          <span>All Items</span>
        </button>

        ${categories.map(category => `
          <button type="button"
            class="category-item ${
              state.category === category ? "active" : ""
            }"
            data-category="${escapeHTML(category)}">
            <span class="category-icon">${
              icons[category.toLowerCase()] || "◈"
            }</span>
            <span>${escapeHTML(category)}</span>
          </button>
        `).join("")}
      `;
    }

    if (select) {
      select.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `
          <option value="${escapeHTML(category)}">
            ${escapeHTML(category)}
          </option>
        `).join("")}
      `;

      select.value = categories.includes(state.category)
        ? state.category
        : "all";
    }
  }

  // -------------------------------
  // PRODUCT FILTER
  // -------------------------------

  function visibleProducts() {
    const query = state.search.toLowerCase();

    return state.products.filter(product => {
      const matchesCategory =
        state.category === "all" ||
        productCategory(product) === state.category;

      const searchableText = [
        productName(product),
        productCategory(product),
        product.brand || "",
        product.description || ""
      ].join(" ").toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }

  // -------------------------------
  // RENDER PRODUCTS
  // -------------------------------

  function renderProducts() {
    const grid = $("productGrid");
    const message = $("storeMessage");

    if (!grid) return;

    const filtered = visibleProducts();

    if (!filtered.length) {
      grid.innerHTML = "";

      if (message) {
        message.textContent = state.products.length
          ? "कोई matching product नहीं मिला।"
          : "अभी कोई product उपलब्ध नहीं है।";
      }

      return;
    }

    if (message) {
      message.textContent = `${filtered.length} products उपलब्ध हैं।`;
    }

    grid.innerHTML = filtered.map(product => {
      const id = productId(product);
      const name = productName(product);
      const price = productPrice(product);
      const mrp = oldPrice(product);
      const image = productImage(product);
      const stock = productStock(product);

      const rating = Number(
        product.rating || product.averageRating || 0
      );

      const discount = mrp > price && mrp > 0
        ? Math.round((1 - price / mrp) * 100)
        : 0;

      const inStock = stock > 0;

      return `
        <article class="product-card"
          data-product-card="${escapeHTML(id)}">

          <div class="product-media">
            ${
              discount > 0
                ? `<span class="discount-badge">${discount}% OFF</span>`
                : ""
            }

            ${
              image
                ? `
                  <img
                    class="product-card-image"
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(name)}"
                    loading="lazy"
                    onerror="this.style.display='none'">
                `
                : `<div class="product-placeholder"
                    aria-label="Product image unavailable">🛍️</div>`
            }
          </div>

          <div class="product-card-body">
            <div class="product-meta">
              <span>${escapeHTML(productCategory(product))}</span>

              ${
                rating > 0
                  ? `<span class="product-rating">★ ${rating.toFixed(1)}</span>`
                  : ""
              }
            </div>

            <h3>${escapeHTML(name)}</h3>

            ${
              product.description
                ? `<p class="product-description">
                    ${escapeHTML(product.description)}
                  </p>`
                : ""
            }

            <div class="product-card-bottom">
              <div>
                <div class="product-price">${money(price)}</div>

                ${
                  mrp > price
                    ? `<span class="product-old-price">${money(mrp)}</span>`
                    : ""
                }
              </div>

              <button
                class="add-to-cart"
                type="button"
                data-add-product="${escapeHTML(id)}"
                ${!id || !inStock ? "disabled" : ""}>
                ${!inStock ? "Out of Stock" : "🛒 Add"}
              </button>
            </div>

            <div class="product-stock">
              ${inStock ? "● In Stock" : "● Out of Stock"}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // -------------------------------
  // CART IMAGE FLY ANIMATION
  // -------------------------------

  function animateProductToCart(button) {
    const card = button.closest(".product-card");

    const source =
      card?.querySelector(".product-media img") ||
      card?.querySelector(".product-placeholder");

    const cartTarget =
      $("bottomViewCart") ||
      $("openCart");

    if (!source || !cartTarget) return;

    const start = source.getBoundingClientRect();
    const end = cartTarget.getBoundingClientRect();

    if (
      !start.width ||
      !start.height ||
      !end.width ||
      !end.height
    ) {
      return;
    }

    let flying;

    if (source.tagName === "IMG") {
      flying = source.cloneNode(true);
    } else {
      flying = document.createElement("div");
      flying.textContent = "🛍️";
      flying.style.display = "grid";
      flying.style.placeItems = "center";
      flying.style.background = "#f1f5f9";
      flying.style.fontSize = "30px";
    }

    flying.classList.add("gs-flying-product");

    Object.assign(flying.style, {
      position: "fixed",
      left: `${start.left + start.width / 2}px`,
      top: `${start.top + start.height / 2}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
      objectFit: "contain",
      borderRadius: "12px",
      zIndex: "999999",
      pointerEvents: "none",
      margin: "0",
      opacity: "1",
      transform: "translate(-50%, -50%) scale(1)",
      transition:
        "left 650ms cubic-bezier(.45,-.15,.75,.45), " +
        "top 650ms cubic-bezier(.45,-.15,.75,.45), " +
        "width 650ms ease, height 650ms ease, " +
        "opacity 650ms ease, transform 650ms ease",
      boxShadow: "0 8px 24px rgba(0,0,0,.25)"
    });

    document.body.appendChild(flying);

    // Force initial layout before starting the animation.
    flying.getBoundingClientRect();

    requestAnimationFrame(() => {
      const target = cartTarget.getBoundingClientRect();

      flying.style.left = `${target.left + target.width / 2}px`;
      flying.style.top = `${target.top + target.height / 2}px`;
      flying.style.width = "18px";
      flying.style.height = "18px";
      flying.style.opacity = "0.2";
      flying.style.transform =
        "translate(-50%, -50%) scale(.2) rotate(18deg)";
      flying.style.borderRadius = "50%";
    });

    window.setTimeout(() => flying.remove(), 750);

    cartTarget.classList.remove("gs-cart-arrival");
    void cartTarget.offsetWidth;
    cartTarget.classList.add("gs-cart-arrival");

    window.setTimeout(() => {
      cartTarget.classList.remove("gs-cart-arrival");
    }, 500);
  }

  // -------------------------------
  // RENDER CART + BOTTOM BAR
  // -------------------------------

  function renderCart() {
    const count = cartQuantity();
    const subtotal = cartSubtotal();

    if ($("cartCount")) {
      $("cartCount").textContent = String(count);
    }

    if ($("cartSubtotal")) {
      $("cartSubtotal").textContent = money(subtotal);
    }

    if ($("cartDelivery")) {
      $("cartDelivery").textContent = money(0);
    }

    if ($("cartTotal")) {
      $("cartTotal").textContent = money(subtotal);
    }

    const bottomBar = $("bottomCartBar");

    if (bottomBar) {
      bottomBar.classList.toggle("has-items", count > 0);
      bottomBar.setAttribute("aria-hidden", count > 0 ? "false" : "true");
    }

    if ($("bottomCartStatus")) {
      $("bottomCartStatus").textContent = count
        ? `${count} ITEM${count === 1 ? "" : "S"} IN CART`
        : "CART IS EMPTY";
    }

    if ($("bottomCartTotal")) {
      $("bottomCartTotal").textContent = money(subtotal);
    }

    const container = $("cartItems");

    if (container) {
      if (!state.cart.length) {
        container.innerHTML = `
          <div class="cart-empty">
            <div style="font-size:45px">🛒</div>
            <h3>Your cart is empty</h3>
            <p>अपनी पसंद के products जोड़ें।</p>
          </div>
        `;
      } else {
        container.innerHTML = state.cart.map(item => `
          <div class="cart-item">
            <div>
              <h4>${escapeHTML(item.name)}</h4>
              <div class="cart-item-price">${money(item.price)} each</div>

              <div class="quantity-controls">
                <button type="button"
                  data-quantity-change="-1"
                  data-quantity-id="${escapeHTML(item.id)}"
                  aria-label="Decrease quantity">−</button>

                <strong>${item.quantity}</strong>

                <button type="button"
                  data-quantity-change="1"
                  data-quantity-id="${escapeHTML(item.id)}"
                  aria-label="Increase quantity">+</button>

                <button type="button"
                  data-remove-item="${escapeHTML(item.id)}"
                  aria-label="Remove product">Remove</button>
              </div>
            </div>

            <strong>${money(item.price * item.quantity)}</strong>
          </div>
        `).join("");
      }
    }

    saveCart();
  }

  // -------------------------------
  // ADD PRODUCT
  // -------------------------------

  function addProduct(id) {
    const product = state.products.find(
      item => productId(item) === id
    );

    if (!product) return false;

    const stock = productStock(product);
    const existing = state.cart.find(item => item.id === id);
    const nextQuantity = (existing?.quantity || 0) + 1;

    if (nextQuantity > stock) {
      alert("इस product का पर्याप्त stock उपलब्ध नहीं है।");
      return false;
    }

    if (existing) {
      existing.quantity = nextQuantity;
      existing.name = productName(product);
      existing.price = productPrice(product);
    } else {
      state.cart.push({
        id,
        name: productName(product),
        price: productPrice(product),
        quantity: 1
      });
    }

    renderCart();
    return true;
  }

  // -------------------------------
  // CHANGE QUANTITY
  // -------------------------------

  function changeQuantity(id, amount) {
    const item = state.cart.find(entry => entry.id === id);
    if (!item) return;

    const nextQuantity = item.quantity + amount;

    if (nextQuantity <= 0) {
      state.cart = state.cart.filter(entry => entry.id !== id);
      renderCart();
      return;
    }

    const product = state.products.find(
      entry => productId(entry) === id
    );

    if (product && nextQuantity > productStock(product)) {
      alert("उपलब्ध stock से अधिक quantity नहीं जोड़ सकते।");
      return;
    }

    item.quantity = nextQuantity;
    renderCart();
  }

  // -------------------------------
  // CART DRAWER
  // -------------------------------

  function openCart() {
    $("cartDrawer")?.classList.add("open", "is-open");
    $("cartOverlay")?.classList.add("visible", "is-visible");
    $("cartDrawer")?.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    $("cartDrawer")?.classList.remove("open", "is-open");
    $("cartOverlay")?.classList.remove("visible", "is-visible");
    $("cartDrawer")?.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  // -------------------------------
  // LOAD PRODUCTS
  // -------------------------------

  async function loadProducts() {
    const message = $("storeMessage");
    const grid = $("productGrid");

    if (message) message.textContent = "Products load हो रहे हैं…";

    try {
      const response = await fetch(PRODUCTS_API, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Products API error: HTTP ${response.status}`);
      }

      const result = await response.json();

      const products = Array.isArray(result)
        ? result
        : Array.isArray(result.products)
          ? result.products
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.items)
              ? result.items
              : null;

      if (!products) {
        throw new Error("API response में products की list नहीं मिली।");
      }

      state.products = products;

      renderCategories();
      renderProducts();
      renderCart();
    } catch (error) {
      console.error("GS Market products error:", error);

      if (message) {
        message.textContent =
          "Products load नहीं हुए। Backend API /market/api/products जाँचें।";
      }

      if (grid) grid.innerHTML = "";
    }
  }

  // -------------------------------
  // CLICK HANDLERS
  // -------------------------------

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");

    if (addButton) {
      if (addButton.disabled) return;

      const id = addButton.dataset.addProduct;
      const added = addProduct(id);

      if (!added) return;

      // RenderCart first reveals the bottom bar; animate on next frame.
      requestAnimationFrame(() => {
        if (addButton.isConnected) {
          animateProductToCart(addButton);
        }
      });

      addButton.textContent = "✓ Added";
      addButton.disabled = true;

      window.setTimeout(() => {
        if (addButton.isConnected) {
          addButton.textContent = "🛒 Add";
          addButton.disabled = false;
        }
      }, 650);

      return;
    }

    const categoryButton = event.target.closest("[data-category]");

    if (categoryButton) {
      state.category = categoryButton.dataset.category || "all";

      renderCategories();
      renderProducts();
      return;
    }

    const quantityButton = event.target.closest("[data-quantity-change]");

    if (quantityButton) {
      changeQuantity(
        quantityButton.dataset.quantityId,
        Number(quantityButton.dataset.quantityChange)
      );

      return;
    }

    const removeButton = event.target.closest("[data-remove-item]");

    if (removeButton) {
      const id = removeButton.dataset.removeItem;

      state.cart = state.cart.filter(item => item.id !== id);
      renderCart();
    }
  });

  // -------------------------------
  // SEARCH & FILTER
  // -------------------------------

  $("productSearch")?.addEventListener("input", event => {
    state.search = event.target.value.trim();
    renderProducts();
  });

  $("categoryFilter")?.addEventListener("change", event => {
    state.category = event.target.value || "all";

    renderCategories();
    renderProducts();
  });

  // -------------------------------
  // DRAWER EVENTS
  // -------------------------------

  $("openCart")?.addEventListener("click", openCart);
  $("bottomViewCart")?.addEventListener("click", openCart);
  $("closeCart")?.addEventListener("click", closeCart);
  $("cartOverlay")?.addEventListener("click", closeCart);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
  });

  // -------------------------------
  // CHECKOUT SAFETY
  // -------------------------------

  
  $("checkoutForm")?.addEventListener("submit", async event => {
    event.preventDefault();

    const form = $("checkoutForm");
    const message = $("checkoutMessage");
    const payButton = $("payButton");

    const showMessage = (text) => {
      if (message) message.textContent = text;
    };

    if (!state.cart.length) {
      showMessage("पहले cart में product जोड़ें।");
      return;
    }

    const customer = {
      name: $("customerName")?.value.trim() || "",
      phone: $("customerPhone")?.value.trim() || "",
      address: $("customerAddress")?.value.trim() || ""
    };

    if (!customer.name || !customer.phone || !customer.address) {
      showMessage("कृपया नाम, मोबाइल नंबर और पूरा पता भरें।");
      return;
    }

    const phone = customer.phone.replace(/\D/g, "");

    if (!/^\d{10}$/.test(phone)) {
      showMessage("कृपया 10 अंकों का सही मोबाइल नंबर भरें।");
      return;
    }

    if (typeof window.Razorpay !== "function") {
      showMessage(
        "Razorpay Checkout load नहीं हुआ। Internet और Razorpay script जाँचें।"
      );
      return;
    }

    if (payButton) {
      payButton.disabled = true;
      payButton.textContent = "Payment शुरू हो रहा है...";
    }

    try {
      // केवल product ID और quantity भेजें।
      // कीमत backend MongoDB से निकालेगा।
      const items = state.cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      // Step 1: Backend पर order बनाएँ
      const createResponse = await fetch(
        "/market/api/checkout/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ customer, items })
        }
      );

      const orderData = await createResponse.json();

      if (!createResponse.ok || !orderData.success) {
        throw new Error(
          orderData.message || "Order बनाने में समस्या हुई।"
        );
      }

      if (!orderData.keyId || !orderData.razorpayOrderId) {
        throw new Error("Razorpay order details अधूरी हैं।");
      }

      // Step 2: Razorpay Checkout खोलें
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "GS Market",
        description: "GS Market Product Purchase",
        order_id: orderData.razorpayOrderId,

        prefill: {
          name: orderData.customerName || customer.name,
          contact: orderData.customerPhone || phone
        },

        notes: {
          orderNumber: orderData.orderNumber
        },

        theme: {
          color: "#4f46e5"
        },

        modal: {
          ondismiss: function () {
            showMessage(
              "Payment window बंद हुई। Payment status जाँचकर ही दोबारा भुगतान करें।"
            );
          }
        },

        // Step 3: Payment details backend पर verify करें
        handler: async function (paymentResponse) {
          if (payButton) {
            payButton.disabled = true;
            payButton.textContent = "Payment verify हो रहा है...";
          }

          showMessage("Payment verify हो रहा है। कृपया प्रतीक्षा करें...");

          try {
            const verifyResponse = await fetch(
              "/market/api/checkout/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                })
              }
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.message ||
                "Payment verify नहीं हुआ। पहले order status जाँचें।"
              );
            }

            // Cart तभी खाली करें जब backend verification सफल हो।
            state.cart = [];
            renderCart();

            showMessage(
              "भुगतान सफल! आपका Order Number: " +
              (verifyData.orderNumber || orderData.orderNumber)
            );

            // Checkout fields साफ करें
            form.reset();

          } catch (verifyError) {
            console.error("GS Market payment verification:", verifyError);

            showMessage(
              "Payment का final status verify नहीं हो सका। " +
              "यदि पैसे कटे हैं, तो दोबारा भुगतान करने से पहले " +
              "order status जाँचें। Order: " + orderData.orderNumber
            );
          } finally {
            if (payButton) {
              payButton.disabled = false;
              payButton.textContent = "Pay Now";
            }
          }
        }
      };

      const checkout = new window.Razorpay(options);

      checkout.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);

        showMessage(
          "Payment पूरा नहीं हुआ। यदि पैसे कटे हैं, तो दोबारा भुगतान " +
          "करने से पहले order status जाँचें।"
        );

        if (payButton) {
          payButton.disabled = false;
          payButton.textContent = "Pay Now";
        }
      });

      checkout.open();

    } catch (error) {
      console.error("GS Market checkout error:", error);

      showMessage(
        error.message || "Checkout शुरू नहीं हो सका। कृपया फिर प्रयास करें।"
      );

      if (payButton) {
        payButton.disabled = false;
        payButton.textContent = "Pay Now";
      }
    }
  });


  // -------------------------------
  // INITIALIZE
  // -------------------------------

  renderCart();
  loadProducts();
})();