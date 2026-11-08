
// (() => {
//   "use strict";

//   const PRODUCTS_API = "/market/api/products";
//   const CART_STORAGE_KEY = "gsMarketCartV1";

//   const $ = (id) => document.getElementById(id);

//   const state = {
//     products: [],
//     cart: readCart(),
//     category: "all",
//     search: ""
//   };

//   // -------------------------------
//   // CART STORAGE
//   // -------------------------------

//   function readCart() {
//     try {
//       const saved = JSON.parse(
//         localStorage.getItem(CART_STORAGE_KEY) || "[]"
//       );

//       if (!Array.isArray(saved)) return [];

//       return saved
//         .filter(item =>
//           item &&
//           typeof item.id === "string" &&
//           Number(item.quantity) > 0
//         )
//         .map(item => ({
//           id: item.id,
//           name: String(item.name || "Product"),
//           price: Math.max(0, Number(item.price) || 0),
//           quantity: Math.max(1, Math.floor(Number(item.quantity) || 1))
//         }));
//     } catch {
//       return [];
//     }
//   }

//   function saveCart() {
//     try {
//       localStorage.setItem(
//         CART_STORAGE_KEY,
//         JSON.stringify(state.cart)
//       );
//     } catch (error) {
//       console.error("Cart storage error:", error);
//     }
//   }

//   // -------------------------------
//   // HELPERS
//   // -------------------------------

//   function money(value) {
//     const amount = Number(value);

//     return "₹" + (
//       Number.isFinite(amount) ? amount : 0
//     ).toLocaleString("en-IN", {
//       maximumFractionDigits: 2
//     });
//   }

//   function escapeHTML(value) {
//     return String(value ?? "").replace(/[&<>"']/g, char => ({
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;"
//     })[char]);
//   }

//   function productId(product) {
//     return String(
//       product._id || product.id || product.productId || ""
//     );
//   }

//   function productName(product) {
//     return String(
//       product.name || product.title || product.productName || "Product"
//     );
//   }

//   function productPrice(product) {
//     return Math.max(0, Number(
//       product.price ??
//       product.salePrice ??
//       product.sellingPrice ??
//       0
//     ) || 0);
//   }

//   function oldPrice(product) {
//     return Math.max(0, Number(
//       product.oldPrice ??
//       product.mrp ??
//       product.originalPrice ??
//       0
//     ) || 0);
//   }

//   function productCategory(product) {
//     return String(
//       product.category || product.categoryName || "Other"
//     ).trim();
//   }

//   function productImage(product) {
//     return String(
//       product.imageUrl ||
//       product.image ||
//       product.imageURL ||
//       product.photo ||
//       product.thumbnail ||
//       ""
//     ).trim();
//   }

//   function productStock(product) {
//     if (product.stock != null) {
//       return Math.max(0, Number(product.stock) || 0);
//     }

//     if (product.quantity != null) {
//       return Math.max(0, Number(product.quantity) || 0);
//     }

//     // If backend does not return stock, do not assume zero stock.
//     return Infinity;
//   }

//   function cartQuantity() {
//     return state.cart.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );
//   }

//   function cartSubtotal() {
//     return state.cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//   }

//   // -------------------------------
//   // CATEGORIES
//   // -------------------------------

//   function renderCategories() {
//     const categories = [
//       ...new Set(state.products.map(productCategory))
//     ].filter(Boolean).sort((a, b) => a.localeCompare(b));

//     const nav = $("sideCategories");
//     const select = $("categoryFilter");

//     const icons = {
//       mobiles: "▣",
//       electronics: "⌨",
//       fashion: "👕",
//       footwear: "👟",
//       home: "⌂",
//       grocery: "🛍️",
//       beauty: "✦"
//     };

//     if (nav) {
//       nav.innerHTML = `
//         <button type="button"
//           class="category-item ${state.category === "all" ? "active" : ""}"
//           data-category="all">
//           <span class="category-icon">▦</span>
//           <span>All Items</span>
//         </button>

//         ${categories.map(category => `
//           <button type="button"
//             class="category-item ${
//               state.category === category ? "active" : ""
//             }"
//             data-category="${escapeHTML(category)}">
//             <span class="category-icon">${
//               icons[category.toLowerCase()] || "◈"
//             }</span>
//             <span>${escapeHTML(category)}</span>
//           </button>
//         `).join("")}
//       `;
//     }

//     if (select) {
//       select.innerHTML = `
//         <option value="all">All Categories</option>
//         ${categories.map(category => `
//           <option value="${escapeHTML(category)}">
//             ${escapeHTML(category)}
//           </option>
//         `).join("")}
//       `;

//       select.value = categories.includes(state.category)
//         ? state.category
//         : "all";
//     }
//   }

//   // -------------------------------
//   // PRODUCT FILTER
//   // -------------------------------

//   function visibleProducts() {
//     const query = state.search.toLowerCase();

//     return state.products.filter(product => {
//       const matchesCategory =
//         state.category === "all" ||
//         productCategory(product) === state.category;

//       const searchableText = [
//         productName(product),
//         productCategory(product),
//         product.brand || "",
//         product.description || ""
//       ].join(" ").toLowerCase();

//       return matchesCategory && searchableText.includes(query);
//     });
//   }

//   // -------------------------------
//   // RENDER PRODUCTS
//   // -------------------------------

//   function renderProducts() {
//     const grid = $("productGrid");
//     const message = $("storeMessage");

//     if (!grid) return;

//     const filtered = visibleProducts();

//     if (!filtered.length) {
//       grid.innerHTML = "";

//       if (message) {
//         message.textContent = state.products.length
//           ? "कोई matching product नहीं मिला।"
//           : "अभी कोई product उपलब्ध नहीं है।";
//       }

//       return;
//     }

//     if (message) {
//       message.textContent = `${filtered.length} products उपलब्ध हैं।`;
//     }

//     grid.innerHTML = filtered.map(product => {
//       const id = productId(product);
//       const name = productName(product);
//       const price = productPrice(product);
//       const mrp = oldPrice(product);
//       const image = productImage(product);
//       const stock = productStock(product);

//       const rating = Number(
//         product.rating || product.averageRating || 0
//       );

//       const discount = mrp > price && mrp > 0
//         ? Math.round((1 - price / mrp) * 100)
//         : 0;

//       const inStock = stock > 0;

//       return `
//         <article class="product-card"
//           data-product-card="${escapeHTML(id)}">

//           <div class="product-media">
//             ${
//               discount > 0
//                 ? `<span class="discount-badge">${discount}% OFF</span>`
//                 : ""
//             }

//             ${
//               image
//                 ? `
//                   <img
//                     class="product-card-image"
//                     src="${escapeHTML(image)}"
//                     alt="${escapeHTML(name)}"
//                     loading="lazy"
//                     onerror="this.style.display='none'">
//                 `
//                 : `<div class="product-placeholder"
//                     aria-label="Product image unavailable">🛍️</div>`
//             }
//           </div>

//           <div class="product-card-body">
//             <div class="product-meta">
//               <span>${escapeHTML(productCategory(product))}</span>

//               ${
//                 rating > 0
//                   ? `<span class="product-rating">★ ${rating.toFixed(1)}</span>`
//                   : ""
//               }
//             </div>

//             <h3>${escapeHTML(name)}</h3>

//             ${
//               product.description
//                 ? `<p class="product-description">
//                     ${escapeHTML(product.description)}
//                   </p>`
//                 : ""
//             }

//             <div class="product-card-bottom">
//               <div>
//                 <div class="product-price">${money(price)}</div>

//                 ${
//                   mrp > price
//                     ? `<span class="product-old-price">${money(mrp)}</span>`
//                     : ""
//                 }
//               </div>

//               <button
//                 class="add-to-cart"
//                 type="button"
//                 data-add-product="${escapeHTML(id)}"
//                 ${!id || !inStock ? "disabled" : ""}>
//                 ${!inStock ? "Out of Stock" : "🛒 Add"}
//               </button>
//             </div>

//             <div class="product-stock">
//               ${inStock ? "● In Stock" : "● Out of Stock"}
//             </div>
//           </div>
//         </article>
//       `;
//     }).join("");
//   }

//   // -------------------------------
//   // CART IMAGE FLY ANIMATION
//   // -------------------------------

//   function animateProductToCart(button) {
//     const card = button.closest(".product-card");

//     const source =
//       card?.querySelector(".product-media img") ||
//       card?.querySelector(".product-placeholder");

//     const cartTarget =
//       $("bottomViewCart") ||
//       $("openCart");

//     if (!source || !cartTarget) return;

//     const start = source.getBoundingClientRect();
//     const end = cartTarget.getBoundingClientRect();

//     if (
//       !start.width ||
//       !start.height ||
//       !end.width ||
//       !end.height
//     ) {
//       return;
//     }

//     let flying;

//     if (source.tagName === "IMG") {
//       flying = source.cloneNode(true);
//     } else {
//       flying = document.createElement("div");
//       flying.textContent = "🛍️";
//       flying.style.display = "grid";
//       flying.style.placeItems = "center";
//       flying.style.background = "#f1f5f9";
//       flying.style.fontSize = "30px";
//     }

//     flying.classList.add("gs-flying-product");

//     Object.assign(flying.style, {
//       position: "fixed",
//       left: `${start.left + start.width / 2}px`,
//       top: `${start.top + start.height / 2}px`,
//       width: `${start.width}px`,
//       height: `${start.height}px`,
//       objectFit: "contain",
//       borderRadius: "12px",
//       zIndex: "999999",
//       pointerEvents: "none",
//       margin: "0",
//       opacity: "1",
//       transform: "translate(-50%, -50%) scale(1)",
//       transition:
//         "left 650ms cubic-bezier(.45,-.15,.75,.45), " +
//         "top 650ms cubic-bezier(.45,-.15,.75,.45), " +
//         "width 650ms ease, height 650ms ease, " +
//         "opacity 650ms ease, transform 650ms ease",
//       boxShadow: "0 8px 24px rgba(0,0,0,.25)"
//     });

//     document.body.appendChild(flying);

//     // Force initial layout before starting the animation.
//     flying.getBoundingClientRect();

//     requestAnimationFrame(() => {
//       const target = cartTarget.getBoundingClientRect();

//       flying.style.left = `${target.left + target.width / 2}px`;
//       flying.style.top = `${target.top + target.height / 2}px`;
//       flying.style.width = "18px";
//       flying.style.height = "18px";
//       flying.style.opacity = "0.2";
//       flying.style.transform =
//         "translate(-50%, -50%) scale(.2) rotate(18deg)";
//       flying.style.borderRadius = "50%";
//     });

//     window.setTimeout(() => flying.remove(), 750);

//     cartTarget.classList.remove("gs-cart-arrival");
//     void cartTarget.offsetWidth;
//     cartTarget.classList.add("gs-cart-arrival");

//     window.setTimeout(() => {
//       cartTarget.classList.remove("gs-cart-arrival");
//     }, 500);
//   }

//   // -------------------------------
//   // RENDER CART + BOTTOM BAR
//   // -------------------------------

//   function renderCart() {
//     const count = cartQuantity();
//     const subtotal = cartSubtotal();

//     if ($("cartCount")) {
//       $("cartCount").textContent = String(count);
//     }

//     if ($("cartSubtotal")) {
//       $("cartSubtotal").textContent = money(subtotal);
//     }

//     if ($("cartDelivery")) {
//       $("cartDelivery").textContent = money(0);
//     }

//     if ($("cartTotal")) {
//       $("cartTotal").textContent = money(subtotal);
//     }

//     const bottomBar = $("bottomCartBar");

//     if (bottomBar) {
//       bottomBar.classList.toggle("has-items", count > 0);
//       bottomBar.setAttribute("aria-hidden", count > 0 ? "false" : "true");
//     }

//     if ($("bottomCartStatus")) {
//       $("bottomCartStatus").textContent = count
//         ? `${count} ITEM${count === 1 ? "" : "S"} IN CART`
//         : "CART IS EMPTY";
//     }

//     if ($("bottomCartTotal")) {
//       $("bottomCartTotal").textContent = money(subtotal);
//     }

//     const container = $("cartItems");

//     if (container) {
//       if (!state.cart.length) {
//         container.innerHTML = `
//           <div class="cart-empty">
//             <div style="font-size:45px">🛒</div>
//             <h3>Your cart is empty</h3>
//             <p>अपनी पसंद के products जोड़ें।</p>
//           </div>
//         `;
//       } else {
//         container.innerHTML = state.cart.map(item => `
//           <div class="cart-item">
//             <div>
//               <h4>${escapeHTML(item.name)}</h4>
//               <div class="cart-item-price">${money(item.price)} each</div>

//               <div class="quantity-controls">
//                 <button type="button"
//                   data-quantity-change="-1"
//                   data-quantity-id="${escapeHTML(item.id)}"
//                   aria-label="Decrease quantity">−</button>

//                 <strong>${item.quantity}</strong>

//                 <button type="button"
//                   data-quantity-change="1"
//                   data-quantity-id="${escapeHTML(item.id)}"
//                   aria-label="Increase quantity">+</button>

//                 <button type="button"
//                   data-remove-item="${escapeHTML(item.id)}"
//                   aria-label="Remove product">Remove</button>
//               </div>
//             </div>

//             <strong>${money(item.price * item.quantity)}</strong>
//           </div>
//         `).join("");
//       }
//     }

//     saveCart();
//   }

//   // -------------------------------
//   // ADD PRODUCT
//   // -------------------------------

//   function addProduct(id) {
//     const product = state.products.find(
//       item => productId(item) === id
//     );

//     if (!product) return false;

//     const stock = productStock(product);
//     const existing = state.cart.find(item => item.id === id);
//     const nextQuantity = (existing?.quantity || 0) + 1;

//     if (nextQuantity > stock) {
//       alert("इस product का पर्याप्त stock उपलब्ध नहीं है।");
//       return false;
//     }

//     if (existing) {
//       existing.quantity = nextQuantity;
//       existing.name = productName(product);
//       existing.price = productPrice(product);
//     } else {
//       state.cart.push({
//         id,
//         name: productName(product),
//         price: productPrice(product),
//         quantity: 1
//       });
//     }

//     renderCart();
//     return true;
//   }

//   // -------------------------------
//   // CHANGE QUANTITY
//   // -------------------------------

//   function changeQuantity(id, amount) {
//     const item = state.cart.find(entry => entry.id === id);
//     if (!item) return;

//     const nextQuantity = item.quantity + amount;

//     if (nextQuantity <= 0) {
//       state.cart = state.cart.filter(entry => entry.id !== id);
//       renderCart();
//       return;
//     }

//     const product = state.products.find(
//       entry => productId(entry) === id
//     );

//     if (product && nextQuantity > productStock(product)) {
//       alert("उपलब्ध stock से अधिक quantity नहीं जोड़ सकते।");
//       return;
//     }

//     item.quantity = nextQuantity;
//     renderCart();
//   }

//   // -------------------------------
//   // CART DRAWER
//   // -------------------------------

//   function openCart() {
//     $("cartDrawer")?.classList.add("open", "is-open");
//     $("cartOverlay")?.classList.add("visible", "is-visible");
//     $("cartDrawer")?.setAttribute("aria-hidden", "false");

//     document.body.style.overflow = "hidden";
//   }

//   function closeCart() {
//     $("cartDrawer")?.classList.remove("open", "is-open");
//     $("cartOverlay")?.classList.remove("visible", "is-visible");
//     $("cartDrawer")?.setAttribute("aria-hidden", "true");

//     document.body.style.overflow = "";
//   }

//   // -------------------------------
//   // LOAD PRODUCTS
//   // -------------------------------

//   async function loadProducts() {
//     const message = $("storeMessage");
//     const grid = $("productGrid");

//     if (message) message.textContent = "Products load हो रहे हैं…";

//     try {
//       const response = await fetch(PRODUCTS_API, {
//         headers: { Accept: "application/json" }
//       });

//       if (!response.ok) {
//         throw new Error(`Products API error: HTTP ${response.status}`);
//       }

//       const result = await response.json();

//       const products = Array.isArray(result)
//         ? result
//         : Array.isArray(result.products)
//           ? result.products
//           : Array.isArray(result.data)
//             ? result.data
//             : Array.isArray(result.items)
//               ? result.items
//               : null;

//       if (!products) {
//         throw new Error("API response में products की list नहीं मिली।");
//       }

//       state.products = products;

//       renderCategories();
//       renderProducts();
//       renderCart();
//     } catch (error) {
//       console.error("GS Market products error:", error);

//       if (message) {
//         message.textContent =
//           "Products load नहीं हुए। Backend API /market/api/products जाँचें।";
//       }

//       if (grid) grid.innerHTML = "";
//     }
//   }

//   // -------------------------------
//   // CLICK HANDLERS
//   // -------------------------------

//   document.addEventListener("click", event => {
//     const addButton = event.target.closest("[data-add-product]");

//     if (addButton) {
//       if (addButton.disabled) return;

//       const id = addButton.dataset.addProduct;
//       const added = addProduct(id);

//       if (!added) return;

//       // RenderCart first reveals the bottom bar; animate on next frame.
//       requestAnimationFrame(() => {
//         if (addButton.isConnected) {
//           animateProductToCart(addButton);
//         }
//       });

//       addButton.textContent = "✓ Added";
//       addButton.disabled = true;

//       window.setTimeout(() => {
//         if (addButton.isConnected) {
//           addButton.textContent = "🛒 Add";
//           addButton.disabled = false;
//         }
//       }, 650);

//       return;
//     }

//     const categoryButton = event.target.closest("[data-category]");

//     if (categoryButton) {
//       state.category = categoryButton.dataset.category || "all";

//       renderCategories();
//       renderProducts();
//       return;
//     }

//     const quantityButton = event.target.closest("[data-quantity-change]");

//     if (quantityButton) {
//       changeQuantity(
//         quantityButton.dataset.quantityId,
//         Number(quantityButton.dataset.quantityChange)
//       );

//       return;
//     }

//     const removeButton = event.target.closest("[data-remove-item]");

//     if (removeButton) {
//       const id = removeButton.dataset.removeItem;

//       state.cart = state.cart.filter(item => item.id !== id);
//       renderCart();
//     }
//   });

//   // -------------------------------
//   // SEARCH & FILTER
//   // -------------------------------

//   $("productSearch")?.addEventListener("input", event => {
//     state.search = event.target.value.trim();
//     renderProducts();
//   });

//   $("categoryFilter")?.addEventListener("change", event => {
//     state.category = event.target.value || "all";

//     renderCategories();
//     renderProducts();
//   });

//   // -------------------------------
//   // DRAWER EVENTS
//   // -------------------------------

//   $("openCart")?.addEventListener("click", openCart);
//   $("bottomViewCart")?.addEventListener("click", openCart);
//   $("closeCart")?.addEventListener("click", closeCart);
//   $("cartOverlay")?.addEventListener("click", closeCart);

//   document.addEventListener("keydown", event => {
//     if (event.key === "Escape") closeCart();
//   });





// // =====================================
// // CUSTOMER GPS LOCATION
// // =====================================

// function getCustomerGPS() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("आपके browser में GPS उपलब्ध नहीं है।"));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       position => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         });
//       },
//       error => {
//         let message = "आपकी GPS location नहीं मिल सकी।";

//         if (error.code === 1) {
//           message = "Order करने के लिए Location Permission Allow करें।";
//         } else if (error.code === 2) {
//           message = "GPS location उपलब्ध नहीं है। GPS चालू करके दोबारा कोशिश करें।";
//         } else if (error.code === 3) {
//           message = "GPS timeout हुआ। कृपया दोबारा कोशिश करें।";
//         }

//         reject(new Error(message));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 0
//       }
//     );
//   });
// }


//   // -------------------------------
//   // CHECKOUT SAFETY
//   // -------------------------------

  
//   $("checkoutForm")?.addEventListener("submit", async event => {
//     event.preventDefault();

//     const form = $("checkoutForm");
//     const message = $("checkoutMessage");
//     const payButton = $("payButton");

//     const showMessage = (text) => {
//       if (message) message.textContent = text;
//     };

//     if (!state.cart.length) {
//       showMessage("पहले cart में product जोड़ें।");
//       return;
//     }

//     const customer = {
//       name: $("customerName")?.value.trim() || "",
//       phone: $("customerPhone")?.value.trim() || "",
//       address: $("customerAddress")?.value.trim() || ""
//     };

//     if (!customer.name || !customer.phone || !customer.address) {
//       showMessage("कृपया नाम, मोबाइल नंबर और पूरा पता भरें।");
//       return;
//     }

//     const phone = customer.phone.replace(/\D/g, "");

//     if (!/^\d{10}$/.test(phone)) {
//       showMessage("कृपया 10 अंकों का सही मोबाइल नंबर भरें।");
//       return;
//     }

//     if (typeof window.Razorpay !== "function") {
//       showMessage(
//         "Razorpay Checkout load नहीं हुआ। Internet और Razorpay script जाँचें।"
//       );
//       return;
//     }

//     if (payButton) {
//       payButton.disabled = true;
//       payButton.textContent = "Payment शुरू हो रहा है...";
//     }

//     try {
//       // केवल product ID और quantity भेजें।
//       // कीमत backend MongoDB से निकालेगा।
//       const items = state.cart.map(item => ({
//         productId: item.id,
//         quantity: item.quantity
//       }));

//       // Step 1: Backend पर order बनाएँ
//       const createResponse = await fetch(
//         "/market/api/checkout/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//           },
//           body: JSON.stringify({ customer, items })
//         }
//       );

//       const orderData = await createResponse.json();

//       if (!createResponse.ok || !orderData.success) {
//         throw new Error(
//           orderData.message || "Order बनाने में समस्या हुई।"
//         );
//       }

//       if (!orderData.keyId || !orderData.razorpayOrderId) {
//         throw new Error("Razorpay order details अधूरी हैं।");
//       }

//       // Step 2: Razorpay Checkout खोलें
//       const options = {
//         key: orderData.keyId,
//         amount: orderData.amount,
//         currency: orderData.currency || "INR",
//         name: "GS Market",
//         description: "GS Market Product Purchase",
//         order_id: orderData.razorpayOrderId,

//         prefill: {
//           name: orderData.customerName || customer.name,
//           contact: orderData.customerPhone || phone
//         },

//         notes: {
//           orderNumber: orderData.orderNumber
//         },

//         theme: {
//           color: "#4f46e5"
//         },

//         modal: {
//           ondismiss: function () {
//             showMessage(
//               "Payment window बंद हुई। Payment status जाँचकर ही दोबारा भुगतान करें।"
//             );
//           }
//         },

//         // Step 3: Payment details backend पर verify करें
//         handler: async function (paymentResponse) {
//           if (payButton) {
//             payButton.disabled = true;
//             payButton.textContent = "Payment verify हो रहा है...";
//           }

//           showMessage("Payment verify हो रहा है। कृपया प्रतीक्षा करें...");

//           try {
//             const verifyResponse = await fetch(
//               "/market/api/checkout/verify",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Accept": "application/json"
//                 },
//                 body: JSON.stringify({
//                   razorpay_order_id: paymentResponse.razorpay_order_id,
//                   razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                   razorpay_signature: paymentResponse.razorpay_signature
//                 })
//               }
//             );

//             const verifyData = await verifyResponse.json();

//             if (!verifyResponse.ok || !verifyData.success) {
//               throw new Error(
//                 verifyData.message ||
//                 "Payment verify नहीं हुआ। पहले order status जाँचें।"
//               );
//             }

//             // Cart तभी खाली करें जब backend verification सफल हो।
//             state.cart = [];
//             renderCart();

//             showMessage(
//               "भुगतान सफल! आपका Order Number: " +
//               (verifyData.orderNumber || orderData.orderNumber)
//             );

//             // Checkout fields साफ करें
//             form.reset();

//           } catch (verifyError) {
//             console.error("GS Market payment verification:", verifyError);

//             showMessage(
//               "Payment का final status verify नहीं हो सका। " +
//               "यदि पैसे कटे हैं, तो दोबारा भुगतान करने से पहले " +
//               "order status जाँचें। Order: " + orderData.orderNumber
//             );
//           } finally {
//             if (payButton) {
//               payButton.disabled = false;
//               payButton.textContent = "Pay Now";
//             }
//           }
//         }
//       };

//       const checkout = new window.Razorpay(options);

//       checkout.on("payment.failed", function (response) {
//         console.error("Razorpay payment failed:", response.error);

//         showMessage(
//           "Payment पूरा नहीं हुआ। यदि पैसे कटे हैं, तो दोबारा भुगतान " +
//           "करने से पहले order status जाँचें।"
//         );

//         if (payButton) {
//           payButton.disabled = false;
//           payButton.textContent = "Pay Now";
//         }
//       });

//       checkout.open();

//     } catch (error) {
//       console.error("GS Market checkout error:", error);

//       showMessage(
//         error.message || "Checkout शुरू नहीं हो सका। कृपया फिर प्रयास करें।"
//       );

//       if (payButton) {
//         payButton.disabled = false;
//         payButton.textContent = "Pay Now";
//       }
//     }
//   });


//   // -------------------------------
//   // INITIALIZE
//   // -------------------------------

//   renderCart();
//   loadProducts();
// })();



// (() => {
//   "use strict";

//   const PRODUCTS_API = "/market/api/products";
//   const CHECKOUT_CREATE_API = "/market/api/checkout/create";
//   const CHECKOUT_VERIFY_API = "/market/api/checkout/verify";
//   const CART_STORAGE_KEY = "gsMarketCartV1";

//   const $ = id => document.getElementById(id);

//   const state = {
//     products: [],
//     cart: readCart(),
//     category: "all",
//     search: "",
//     checkoutBusy: false
//   };

//   // =====================================
//   // CART STORAGE
//   // =====================================

//   function readCart() {
//     try {
//       const saved = JSON.parse(
//         localStorage.getItem(CART_STORAGE_KEY) || "[]"
//       );

//       if (!Array.isArray(saved)) return [];

//       return saved
//         .filter(item =>
//           item &&
//           typeof item.id === "string" &&
//           Number(item.quantity) > 0
//         )
//         .map(item => ({
//           id: item.id,
//           name: String(item.name || "Product"),
//           price: Math.max(0, Number(item.price) || 0),
//           quantity: Math.max(
//             1,
//             Math.floor(Number(item.quantity) || 1)
//           )
//         }));
//     } catch {
//       return [];
//     }
//   }

//   function saveCart() {
//     try {
//       localStorage.setItem(
//         CART_STORAGE_KEY,
//         JSON.stringify(state.cart)
//       );
//     } catch (error) {
//       console.error("Cart storage error:", error);
//     }
//   }

//   // =====================================
//   // HELPERS
//   // =====================================

//   function money(value) {
//     const amount = Number(value);

//     return "₹" + (
//       Number.isFinite(amount) ? amount : 0
//     ).toLocaleString("en-IN", {
//       maximumFractionDigits: 2
//     });
//   }

//   function escapeHTML(value) {
//     return String(value ?? "").replace(/[&<>"']/g, char => ({
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;"
//     })[char]);
//   }

//   function productId(product) {
//     return String(
//       product._id ||
//       product.id ||
//       product.productId ||
//       ""
//     );
//   }

//   function productName(product) {
//     return String(
//       product.name ||
//       product.title ||
//       product.productName ||
//       "Product"
//     );
//   }

//   function productPrice(product) {
//     return Math.max(0, Number(
//       product.price ??
//       product.salePrice ??
//       product.sellingPrice ??
//       0
//     ) || 0);
//   }

//   function oldPrice(product) {
//     return Math.max(0, Number(
//       product.oldPrice ??
//       product.mrp ??
//       product.originalPrice ??
//       0
//     ) || 0);
//   }

//   function productCategory(product) {
//     return String(
//       product.category ||
//       product.categoryName ||
//       "Other"
//     ).trim();
//   }

//   function productImage(product) {
//     return String(
//       product.imageUrl ||
//       product.image ||
//       product.imageURL ||
//       product.photo ||
//       product.thumbnail ||
//       ""
//     ).trim();
//   }

//   function productStock(product) {
//     if (product.stock != null) {
//       return Math.max(0, Number(product.stock) || 0);
//     }

//     if (product.quantity != null) {
//       return Math.max(0, Number(product.quantity) || 0);
//     }

//     return Infinity;
//   }

//   function cartQuantity() {
//     return state.cart.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );
//   }

//   function cartSubtotal() {
//     return state.cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//   }

//   // =====================================
//   // CATEGORIES
//   // =====================================

//   function renderCategories() {
//     const categories = [
//       ...new Set(state.products.map(productCategory))
//     ].filter(Boolean).sort((a, b) => a.localeCompare(b));

//     const nav = $("sideCategories");
//     const select = $("categoryFilter");

//     const icons = {
//       mobiles: "▣",
//       electronics: "⌨",
//       fashion: "👕",
//       footwear: "👟",
//       home: "⌂",
//       grocery: "🛍️",
//       beauty: "✦"
//     };

//     if (nav) {
//       nav.innerHTML = `
//         <button type="button"
//           class="category-item ${state.category === "all" ? "active" : ""}"
//           data-category="all">
//           <span class="category-icon">▦</span>
//           <span>All Items</span>
//         </button>

//         ${categories.map(category => `
//           <button type="button"
//             class="category-item ${
//               state.category === category ? "active" : ""
//             }"
//             data-category="${escapeHTML(category)}">
//             <span class="category-icon">${
//               icons[category.toLowerCase()] || "◈"
//             }</span>
//             <span>${escapeHTML(category)}</span>
//           </button>
//         `).join("")}
//       `;
//     }

//     if (select) {
//       select.innerHTML = `
//         <option value="all">All Categories</option>
//         ${categories.map(category => `
//           <option value="${escapeHTML(category)}">
//             ${escapeHTML(category)}
//           </option>
//         `).join("")}
//       `;

//       select.value = categories.includes(state.category)
//         ? state.category
//         : "all";
//     }
//   }

//   // =====================================
//   // FILTER PRODUCTS
//   // =====================================

//   function visibleProducts() {
//     const query = state.search.toLowerCase();

//     return state.products.filter(product => {
//       const matchesCategory =
//         state.category === "all" ||
//         productCategory(product) === state.category;

//       const searchableText = [
//         productName(product),
//         productCategory(product),
//         product.brand || "",
//         product.description || ""
//       ].join(" ").toLowerCase();

//       return matchesCategory &&
//         searchableText.includes(query);
//     });
//   }

//   // =====================================
//   // RENDER PRODUCTS
//   // =====================================

//   function renderProducts() {
//     const grid = $("productGrid");
//     const message = $("storeMessage");

//     if (!grid) return;

//     const filtered = visibleProducts();

//     if (!filtered.length) {
//       grid.innerHTML = "";

//       if (message) {
//         message.textContent = state.products.length
//           ? "कोई matching product नहीं मिला।"
//           : "अभी कोई product उपलब्ध नहीं है।";
//       }

//       return;
//     }

//     if (message) {
//       message.textContent =
//         `${filtered.length} products उपलब्ध हैं।`;
//     }

//     grid.innerHTML = filtered.map(product => {
//       const id = productId(product);
//       const name = productName(product);
//       const price = productPrice(product);
//       const mrp = oldPrice(product);
//       const image = productImage(product);
//       const stock = productStock(product);

//       const rating = Number(
//         product.rating ||
//         product.averageRating ||
//         0
//       );

//       const discount = mrp > price && mrp > 0
//         ? Math.round((1 - price / mrp) * 100)
//         : 0;

//       const inStock = stock > 0;

//       return `
//         <article class="product-card"
//           data-product-card="${escapeHTML(id)}">

//           <div class="product-media">
//             ${
//               discount > 0
//                 ? `<span class="discount-badge">${discount}% OFF</span>`
//                 : ""
//             }

//             ${
//               image
//                 ? `
//                   <img
//                     class="product-card-image"
//                     src="${escapeHTML(image)}"
//                     alt="${escapeHTML(name)}"
//                     loading="lazy"
//                     onerror="this.style.display='none'">
//                 `
//                 : `<div class="product-placeholder">🛍️</div>`
//             }
//           </div>

//           <div class="product-card-body">

//             <div class="product-meta">
//               <span>${escapeHTML(productCategory(product))}</span>

//               ${
//                 rating > 0
//                   ? `<span class="product-rating">★ ${rating.toFixed(1)}</span>`
//                   : ""
//               }
//             </div>

//             <h3>${escapeHTML(name)}</h3>

//             ${
//               product.description
//                 ? `<p class="product-description">
//                     ${escapeHTML(product.description)}
//                   </p>`
//                 : ""
//             }

//             <div class="product-card-bottom">
//               <div>
//                 <div class="product-price">${money(price)}</div>

//                 ${
//                   mrp > price
//                     ? `<span class="product-old-price">${money(mrp)}</span>`
//                     : ""
//                 }
//               </div>

//               <button
//                 class="add-to-cart"
//                 type="button"
//                 data-add-product="${escapeHTML(id)}"
//                 ${!id || !inStock ? "disabled" : ""}>
//                 ${!inStock ? "Out of Stock" : "🛒 Add"}
//               </button>
//             </div>

//             <div class="product-stock">
//               ${inStock ? "● In Stock" : "● Out of Stock"}
//             </div>

//           </div>
//         </article>
//       `;
//     }).join("");
//   }

//   // =====================================
//   // CART ANIMATION
//   // =====================================

//   function animateProductToCart(button) {
//     const card = button.closest(".product-card");

//     const source =
//       card?.querySelector(".product-media img") ||
//       card?.querySelector(".product-placeholder");

//     const cartTarget =
//       $("bottomViewCart") ||
//       $("openCart");

//     if (!source || !cartTarget) return;

//     const start = source.getBoundingClientRect();
//     const end = cartTarget.getBoundingClientRect();

//     if (!start.width || !end.width) return;

//     const flying = source.cloneNode(true);

//     flying.classList.add("gs-flying-product");

//     Object.assign(flying.style, {
//       position: "fixed",
//       left: `${start.left + start.width / 2}px`,
//       top: `${start.top + start.height / 2}px`,
//       width: `${start.width}px`,
//       height: `${start.height}px`,
//       objectFit: "contain",
//       borderRadius: "12px",
//       zIndex: "999999",
//       pointerEvents: "none",
//       margin: "0",
//       transform: "translate(-50%, -50%) scale(1)",
//       transition: "all 650ms ease"
//     });

//     document.body.appendChild(flying);

//     flying.getBoundingClientRect();

//     requestAnimationFrame(() => {
//       const target = cartTarget.getBoundingClientRect();

//       flying.style.left =
//         `${target.left + target.width / 2}px`;

//       flying.style.top =
//         `${target.top + target.height / 2}px`;

//       flying.style.width = "18px";
//       flying.style.height = "18px";
//       flying.style.opacity = "0.2";
//       flying.style.transform =
//         "translate(-50%, -50%) scale(.2)";
//     });

//     window.setTimeout(() => flying.remove(), 750);
//   }

//   // =====================================
//   // RENDER CART
//   // =====================================

//   function renderCart() {
//     const count = cartQuantity();
//     const subtotal = cartSubtotal();

//     if ($("cartCount")) {
//       $("cartCount").textContent = String(count);
//     }

//     if ($("cartSubtotal")) {
//       $("cartSubtotal").textContent = money(subtotal);
//     }

//     if ($("cartDelivery")) {
//       $("cartDelivery").textContent = money(0);
//     }

//     if ($("cartTotal")) {
//       $("cartTotal").textContent = money(subtotal);
//     }

//     const bottomBar = $("bottomCartBar");

//     if (bottomBar) {
//       bottomBar.classList.toggle("has-items", count > 0);
//       bottomBar.setAttribute(
//         "aria-hidden",
//         count > 0 ? "false" : "true"
//       );
//     }

//     if ($("bottomCartStatus")) {
//       $("bottomCartStatus").textContent = count
//         ? `${count} ITEM${count === 1 ? "" : "S"} IN CART`
//         : "CART IS EMPTY";
//     }

//     if ($("bottomCartTotal")) {
//       $("bottomCartTotal").textContent = money(subtotal);
//     }

//     const container = $("cartItems");

//     if (container) {
//       if (!state.cart.length) {
//         container.innerHTML = `
//           <div class="cart-empty">
//             <div style="font-size:45px">🛒</div>
//             <h3>Your cart is empty</h3>
//             <p>अपनी पसंद के products जोड़ें।</p>
//           </div>
//         `;
//       } else {
//         container.innerHTML = state.cart.map(item => `
//           <div class="cart-item">
//             <div>
//               <h4>${escapeHTML(item.name)}</h4>
//               <div class="cart-item-price">
//                 ${money(item.price)} each
//               </div>

//               <div class="quantity-controls">
//                 <button type="button"
//                   data-quantity-change="-1"
//                   data-quantity-id="${escapeHTML(item.id)}">−</button>

//                 <strong>${item.quantity}</strong>

//                 <button type="button"
//                   data-quantity-change="1"
//                   data-quantity-id="${escapeHTML(item.id)}">+</button>

//                 <button type="button"
//                   data-remove-item="${escapeHTML(item.id)}">
//                   Remove
//                 </button>
//               </div>
//             </div>

//             <strong>
//               ${money(item.price * item.quantity)}
//             </strong>
//           </div>
//         `).join("");
//       }
//     }

//     saveCart();
//   }

//   // =====================================
//   // ADD PRODUCT
//   // =====================================

//   function addProduct(id) {
//     const product = state.products.find(
//       item => productId(item) === id
//     );

//     if (!product) return false;

//     const stock = productStock(product);
//     const existing = state.cart.find(item => item.id === id);
//     const nextQuantity = (existing?.quantity || 0) + 1;

//     if (nextQuantity > stock) {
//       alert("इस product का पर्याप्त stock उपलब्ध नहीं है।");
//       return false;
//     }

//     if (existing) {
//       existing.quantity = nextQuantity;
//       existing.name = productName(product);
//       existing.price = productPrice(product);
//     } else {
//       state.cart.push({
//         id,
//         name: productName(product),
//         price: productPrice(product),
//         quantity: 1
//       });
//     }

//     renderCart();
//     return true;
//   }

//   function changeQuantity(id, amount) {
//     const item = state.cart.find(entry => entry.id === id);
//     if (!item) return;

//     const nextQuantity = item.quantity + amount;

//     if (nextQuantity <= 0) {
//       state.cart = state.cart.filter(entry => entry.id !== id);
//       renderCart();
//       return;
//     }

//     const product = state.products.find(
//       entry => productId(entry) === id
//     );

//     if (product && nextQuantity > productStock(product)) {
//       alert("उपलब्ध stock से अधिक quantity नहीं जोड़ सकते।");
//       return;
//     }

//     item.quantity = nextQuantity;
//     renderCart();
//   }

//   // =====================================
//   // CART DRAWER
//   // =====================================

//   function openCart() {
//     $("cartDrawer")?.classList.add("open", "is-open");
//     $("cartOverlay")?.classList.add("visible", "is-visible");
//     $("cartDrawer")?.setAttribute("aria-hidden", "false");

//     document.body.style.overflow = "hidden";
//   }

//   function closeCart() {
//     $("cartDrawer")?.classList.remove("open", "is-open");
//     $("cartOverlay")?.classList.remove("visible", "is-visible");
//     $("cartDrawer")?.setAttribute("aria-hidden", "true");

//     document.body.style.overflow = "";
//   }

//   // =====================================
//   // LOAD PRODUCTS
//   // =====================================

//   async function loadProducts() {
//     const message = $("storeMessage");
//     const grid = $("productGrid");

//     if (message) {
//       message.textContent = "Products load हो रहे हैं…";
//     }

//     try {
//       const response = await fetch(PRODUCTS_API, {
//         headers: { Accept: "application/json" }
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Products API error: HTTP ${response.status}`
//         );
//       }

//       const result = await response.json();

//       const products = Array.isArray(result)
//         ? result
//         : Array.isArray(result.products)
//           ? result.products
//           : Array.isArray(result.data)
//             ? result.data
//             : Array.isArray(result.items)
//               ? result.items
//               : null;

//       if (!products) {
//         throw new Error("Products की list नहीं मिली।");
//       }

//       state.products = products;

//       renderCategories();
//       renderProducts();
//       renderCart();

//     } catch (error) {
//       console.error("GS Market products error:", error);

//       if (message) {
//         message.textContent =
//           "Products load नहीं हुए। Backend API जाँचें।";
//       }

//       if (grid) grid.innerHTML = "";
//     }
//   }

//   // =====================================
//   // GPS LOCATION
//   // =====================================

//   function getCustomerGPS() {
//     return new Promise((resolve, reject) => {

//       if (!navigator.geolocation) {
//         return reject(
//           new Error("आपका browser GPS support नहीं करता।")
//         );
//       }

//       if (!window.isSecureContext) {
//         return reject(
//           new Error("GPS के लिए HTTPS वेबसाइट जरूरी है।")
//         );
//       }

//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;

//           if (
//             !Number.isFinite(latitude) ||
//             !Number.isFinite(longitude) ||
//             latitude < -90 ||
//             latitude > 90 ||
//             longitude < -180 ||
//             longitude > 180
//           ) {
//             return reject(
//               new Error("GPS coordinates सही नहीं मिले।")
//             );
//           }

//           resolve({
//             latitude,
//             longitude,
//             accuracy: position.coords.accuracy
//           });
//         },

//         error => {
//           let message;

//           switch (error.code) {
//             case 1:
//               message =
//                 "Order करने के लिए अपनी GPS location Allow करें।";
//               break;

//             case 2:
//               message =
//                 "आपकी GPS location उपलब्ध नहीं है। Location चालू करें।";
//               break;

//             case 3:
//               message =
//                 "GPS location मिलने में समय लग रहा है। दोबारा कोशिश करें।";
//               break;

//             default:
//               message = "GPS location नहीं मिल सकी।";
//           }

//           reject(new Error(message));
//         },

//         {
//           enableHighAccuracy: true,
//           timeout: 20000,
//           maximumAge: 0
//         }
//       );
//     });
//   }

//   // =====================================
//   // CHECKOUT MESSAGE
//   // =====================================

//   function showCheckoutMessage(message) {
//     const element = $("checkoutMessage");

//     if (element) {
//       element.textContent = message;
//     } else {
//       alert(message);
//     }
//   }

//   // =====================================
//   // CHECKOUT
//   // =====================================

//   $("checkoutForm")?.addEventListener(
//     "submit",
//     async event => {

//       event.preventDefault();

//       if (state.checkoutBusy) return;

//       const form = $("checkoutForm");
//       const payButton = $("payButton");

//       const setBusy = (busy, text) => {
//         state.checkoutBusy = busy;

//         if (payButton) {
//           payButton.disabled = busy;
//           payButton.textContent = text;
//         }
//       };

//       if (!state.cart.length) {
//         showCheckoutMessage(
//           "पहले cart में product जोड़ें।"
//         );
//         return;
//       }

//       const customer = {
//         name: $("customerName")?.value.trim() || "",
//         phone: $("customerPhone")?.value.trim() || "",
//         address: $("customerAddress")?.value.trim() || ""
//       };

//       if (
//         !customer.name ||
//         !customer.phone ||
//         !customer.address
//       ) {
//         showCheckoutMessage(
//           "कृपया नाम, मोबाइल नंबर और पूरा पता भरें।"
//         );
//         return;
//       }

//       const phone = customer.phone.replace(/\D/g, "");

//       if (!/^\d{10}$/.test(phone)) {
//         showCheckoutMessage(
//           "कृपया 10 अंकों का सही मोबाइल नंबर भरें।"
//         );
//         return;
//       }

//       if (typeof window.Razorpay !== "function") {
//         showCheckoutMessage(
//           "Razorpay Checkout load नहीं हुआ।"
//         );
//         return;
//       }

//       setBusy(true, "GPS location प्राप्त हो रही है...");
//       showCheckoutMessage(
//         "कृपया GPS permission Allow करें..."
//       );

//       try {

//         // STEP 1: GPS LOCATION
//         const gps = await getCustomerGPS();

//         console.log("GS Market GPS:", {
//           latitude: gps.latitude,
//           longitude: gps.longitude,
//           accuracy: gps.accuracy
//         });

//         // STEP 2: CART ITEMS
//         const items = state.cart.map(item => ({
//           productId: item.id,
//           quantity: item.quantity
//         }));

//         setBusy(true, "Order बनाया जा रहा है...");

//         // STEP 3: CREATE ORDER
//         const createResponse = await fetch(
//           CHECKOUT_CREATE_API,
//           {
//             method: "POST",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json"
//             },
//             body: JSON.stringify({
//               customer,
//               items,

//               // GPS COORDINATES
//               latitude: gps.latitude,
//               longitude: gps.longitude,

//               // Optional nested location for compatible backends
//               location: {
//                 latitude: gps.latitude,
//                 longitude: gps.longitude
//               }
//             })
//           }
//         );

//         const orderData = await createResponse.json();

//         if (
//           !createResponse.ok ||
//           !orderData.success
//         ) {
//           throw new Error(
//             orderData.message ||
//             "Order बनाने में समस्या हुई।"
//           );
//         }

//         if (
//           !orderData.keyId ||
//           !orderData.razorpayOrderId
//         ) {
//           throw new Error(
//             "Razorpay order details अधूरी हैं।"
//           );
//         }

//         // STEP 4: RAZORPAY CHECKOUT
//         setBusy(false, "Pay Now");

//         const options = {
//           key: orderData.keyId,
//           amount: orderData.amount,
//           currency: orderData.currency || "INR",
//           name: "GS Market",
//           description: "GS Market Product Purchase",
//           order_id: orderData.razorpayOrderId,

//           prefill: {
//             name: orderData.customerName || customer.name,
//             contact: orderData.customerPhone || phone
//           },

//           notes: {
//             orderNumber: orderData.orderNumber || ""
//           },

//           theme: {
//             color: "#4f46e5"
//           },

//           modal: {
//             ondismiss: function () {
//               showCheckoutMessage(
//                 "Payment window बंद हुई। Payment status जाँचकर ही दोबारा भुगतान करें।"
//               );

//               setBusy(false, "Pay Now");
//             }
//           },

//           // STEP 5: PAYMENT VERIFICATION
//           handler: async function (paymentResponse) {

//             setBusy(true, "Payment verify हो रहा है...");

//             showCheckoutMessage(
//               "Payment verify हो रहा है। कृपया प्रतीक्षा करें..."
//             );

//             try {

//               const verifyResponse = await fetch(
//                 CHECKOUT_VERIFY_API,
//                 {
//                   method: "POST",
//                   credentials: "include",
//                   headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                   },
//                   body: JSON.stringify({
//                     razorpay_order_id:
//                       paymentResponse.razorpay_order_id,

//                     razorpay_payment_id:
//                       paymentResponse.razorpay_payment_id,

//                     razorpay_signature:
//                       paymentResponse.razorpay_signature
//                   })
//                 }
//               );

//               const verifyData = await verifyResponse.json();

//               if (
//                 !verifyResponse.ok ||
//                 !verifyData.success
//               ) {
//                 throw new Error(
//                   verifyData.message ||
//                   "Payment verify नहीं हुआ।"
//                 );
//               }

//               // Clear cart only after successful verification.
//               state.cart = [];
//               renderCart();

//               showCheckoutMessage(
//                 "भुगतान सफल! आपका Order Number: " +
//                 (
//                   verifyData.orderNumber ||
//                   orderData.orderNumber ||
//                   ""
//                 )
//               );

//               form.reset();

//             } catch (verifyError) {

//               console.error(
//                 "GS Market payment verification:",
//                 verifyError
//               );

//               showCheckoutMessage(
//                 "Payment का final status verify नहीं हो सका। " +
//                 "यदि पैसे कटे हैं तो दोबारा भुगतान करने से पहले " +
//                 "order status जाँचें। Order: " +
//                 (orderData.orderNumber || "")
//               );

//             } finally {
//               setBusy(false, "Pay Now");
//             }
//           }
//         };

//         const checkout = new window.Razorpay(options);

//         checkout.on("payment.failed", function (response) {
//           console.error(
//             "Razorpay payment failed:",
//             response.error
//           );

//           showCheckoutMessage(
//             "Payment पूरा नहीं हुआ। यदि पैसे कटे हैं, " +
//             "तो order status जाँचें।"
//           );

//           setBusy(false, "Pay Now");
//         });

//         checkout.open();

//       } catch (error) {

//         console.error(
//           "GS Market checkout error:",
//           error
//         );

//         showCheckoutMessage(
//           error.message ||
//           "Checkout शुरू नहीं हो सका। कृपया फिर प्रयास करें।"
//         );

//         setBusy(false, "Pay Now");
//       }
//     }
//   );

//   // =====================================
//   // CLICK HANDLERS
//   // =====================================

//   document.addEventListener("click", event => {

//     const addButton = event.target.closest(
//       "[data-add-product]"
//     );

//     if (addButton) {
//       if (addButton.disabled) return;

//       const id = addButton.dataset.addProduct;

//       if (!addProduct(id)) return;

//       requestAnimationFrame(() => {
//         if (addButton.isConnected) {
//           animateProductToCart(addButton);
//         }
//       });

//       addButton.textContent = "✓ Added";
//       addButton.disabled = true;

//       window.setTimeout(() => {
//         if (addButton.isConnected) {
//           addButton.textContent = "🛒 Add";
//           addButton.disabled = false;
//         }
//       }, 650);

//       return;
//     }

//     const categoryButton = event.target.closest(
//       "[data-category]"
//     );

//     if (categoryButton) {
//       state.category =
//         categoryButton.dataset.category || "all";

//       renderCategories();
//       renderProducts();
//       return;
//     }

//     const quantityButton = event.target.closest(
//       "[data-quantity-change]"
//     );

//     if (quantityButton) {
//       changeQuantity(
//         quantityButton.dataset.quantityId,
//         Number(quantityButton.dataset.quantityChange)
//       );

//       return;
//     }

//     const removeButton = event.target.closest(
//       "[data-remove-item]"
//     );

//     if (removeButton) {
//       const id = removeButton.dataset.removeItem;

//       state.cart = state.cart.filter(
//         item => item.id !== id
//       );

//       renderCart();
//     }
//   });

//   // =====================================
//   // SEARCH AND CATEGORY
//   // =====================================

//   $("productSearch")?.addEventListener(
//     "input",
//     event => {
//       state.search = event.target.value.trim();
//       renderProducts();
//     }
//   );

//   $("categoryFilter")?.addEventListener(
//     "change",
//     event => {
//       state.category = event.target.value || "all";

//       renderCategories();
//       renderProducts();
//     }
//   );

//   // =====================================
//   // CART DRAWER EVENTS
//   // =====================================

//   $("openCart")?.addEventListener("click", openCart);
//   $("bottomViewCart")?.addEventListener("click", openCart);
//   $("closeCart")?.addEventListener("click", closeCart);
//   $("cartOverlay")?.addEventListener("click", closeCart);

//   document.addEventListener("keydown", event => {
//     if (event.key === "Escape") closeCart();
//   });

//   // =====================================
//   // INITIALIZE
//   // =====================================

//   renderCart();
//   loadProducts();

// })();


(() => {
  "use strict";

  const PRODUCTS_API = "/market/api/products";
  const SHOP_STATUS_API = "/market/api/shop-status";
  const CHECKOUT_CREATE_API = "/market/api/checkout/create";
  const CHECKOUT_VERIFY_API = "/market/api/checkout/verify";
  const CART_STORAGE_KEY = "gsMarketCartV1";

  const $ = id => document.getElementById(id);

  const state = {
    products: [],
    cart: readCart(),
    category: "all",
    search: "",
    checkoutBusy: false,
    shop: {
      shopOpen: false,
      radiusKm: 2,
      latitude: null,
      longitude: null
    }
  };

  // =====================================
  // CART STORAGE
  // =====================================

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
          quantity: Math.max(
            1,
            Math.floor(Number(item.quantity) || 1)
          )
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

  // =====================================
  // HELPERS
  // =====================================

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
      product._id ||
      product.id ||
      product.productId ||
      ""
    );
  }

  function productName(product) {
    return String(
      product.name ||
      product.title ||
      product.productName ||
      "Product"
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
      product.category ||
      product.categoryName ||
      "Other"
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

  // =====================================
  // SHOP STATUS + SHOP LOCATION
  // =====================================

  async function loadShopStatus() {
    try {
      const response = await fetch(SHOP_STATUS_API, {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Shop status नहीं मिला।");
      }

      state.shop = {
        shopOpen: data.shopOpen === true,
        radiusKm: Number(data.radiusKm) > 0
          ? Number(data.radiusKm)
          : 2,
        latitude: Number.isFinite(Number(data.shopLatitude))
          ? Number(data.shopLatitude)
          : null,
        longitude: Number.isFinite(Number(data.shopLongitude))
          ? Number(data.shopLongitude)
          : null
      };

      const statusElement = $("shopStatus");

      if (statusElement) {
        statusElement.textContent = state.shop.shopOpen
          ? "● Shop Open"
          : "● Shop Closed";

        statusElement.classList.toggle(
          "shop-open",
          state.shop.shopOpen
        );

        statusElement.classList.toggle(
          "shop-closed",
          !state.shop.shopOpen
        );
      }

    } catch (error) {
      console.error("Shop status error:", error);
    }
  }

  // =====================================
  // GOOGLE MAPS DIRECTIONS
  // =====================================

  function getShopMapsUrl() {
    const lat = state.shop.latitude;
    const lon = state.shop.longitude;

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      return "";
    }

    return (
      "https://www.google.com/maps/dir/?api=1" +
      "&destination=" + encodeURIComponent(`${lat},${lon}`) +
      "&travelmode=driving"
    );
  }

  // =====================================
  // DELIVERY AREA OUTSIDE SCREEN
  // =====================================

  function showOutsideDeliveryArea(data = {}) {
    let overlay = $("deliveryAreaOverlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "deliveryAreaOverlay";
      document.body.appendChild(overlay);
    }

    const distance = Number(data.distanceKm);
    const radius = Number(data.radiusKm) > 0
      ? Number(data.radiusKm)
      : state.shop.radiusKm;

    const distanceText = Number.isFinite(distance)
      ? distance.toFixed(2)
      : "--";

    const mapsUrl = getShopMapsUrl();

    overlay.innerHTML = `
      <div class="delivery-area-backdrop">
        <section class="delivery-area-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="deliveryAreaTitle">

          <div class="delivery-area-icon">📍</div>

          <div class="delivery-area-label">
            DELIVERY AREA से बाहर
          </div>

          <h2 id="deliveryAreaTitle">
            अभी Delivery उपलब्ध नहीं है
          </h2>

          <div class="delivery-distance">
            ${escapeHTML(distanceText)} KM
          </div>

          <p class="delivery-area-description">
            आपकी location दुकान से
            <strong>${escapeHTML(distanceText)} KM</strong>
            दूर है।
          </p>

          <div class="delivery-area-info">
            <span>अभी केवल</span>
            <strong>${escapeHTML(radius)} KM</strong>
            <span>के अंदर ही delivery उपलब्ध है।</span>
          </div>

          ${
            mapsUrl
              ? `
                <a class="delivery-map-button"
                   href="${escapeHTML(mapsUrl)}"
                   target="_blank"
                   rel="noopener noreferrer">
                  <span>📍</span>
                  Go to Location
                </a>
              `
              : `
                <p class="delivery-map-unavailable">
                  दुकान की Google Maps location अभी उपलब्ध नहीं है।
                </p>
              `
          }

          <button type="button"
            class="delivery-close-button"
            id="closeDeliveryArea">
            वापस Shopping करें
          </button>

          <p class="delivery-area-footer">
            GS Market · Local Delivery Service
          </p>

        </section>
      </div>
    `;

    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    $("closeDeliveryArea")?.addEventListener("click", () => {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  function hideOutsideDeliveryArea() {
    const overlay = $("deliveryAreaOverlay");

    if (overlay) {
      overlay.style.display = "none";
    }

    document.body.style.overflow = "";
  }

  // =====================================
  // DELIVERY AREA SCREEN CSS
  // =====================================

  function addDeliveryAreaStyles() {
    if ($("deliveryAreaStyles")) return;

    const style = document.createElement("style");
    style.id = "deliveryAreaStyles";

    style.textContent = `
      #deliveryAreaOverlay {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 999999;
      }

      .delivery-area-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, .76);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px;
        overflow-y: auto;
      }

      .delivery-area-card {
        width: 100%;
        max-width: 420px;
        background: #fff;
        border-radius: 24px;
        padding: 28px 22px;
        text-align: center;
        box-shadow: 0 25px 80px rgba(0,0,0,.25);
        animation: deliveryPop .25s ease;
      }

      @keyframes deliveryPop {
        from {
          opacity: 0;
          transform: translateY(15px) scale(.97);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .delivery-area-icon {
        width: 76px;
        height: 76px;
        margin: 0 auto 15px;
        border-radius: 50%;
        background: #fff1f2;
        display: grid;
        place-items: center;
        font-size: 36px;
      }

      .delivery-area-label {
        display: inline-block;
        background: #fff1f2;
        color: #dc2626;
        padding: 7px 13px;
        border-radius: 30px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .6px;
      }

      .delivery-area-card h2 {
        color: #111827;
        font-size: 22px;
        line-height: 1.35;
        margin: 17px 0 12px;
      }

      .delivery-distance {
        font-size: 38px;
        font-weight: 900;
        color: #dc2626;
        margin: 12px 0;
      }

      .delivery-area-description {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.7;
        margin: 10px 0;
      }

      .delivery-area-info {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 13px;
        padding: 14px 10px;
        margin: 18px 0;
        color: #475569;
        font-size: 13px;
      }

      .delivery-area-info strong {
        color: #111827;
        font-size: 17px;
      }

      .delivery-map-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        width: 100%;
        min-height: 52px;
        border-radius: 13px;
        background: #4f46e5;
        color: #fff !important;
        text-decoration: none !important;
        font-size: 16px;
        font-weight: 800;
        margin-top: 15px;
      }

      .delivery-map-button:active {
        transform: scale(.98);
      }

      .delivery-close-button {
        width: 100%;
        min-height: 48px;
        border: 1px solid #e5e7eb;
        border-radius: 13px;
        background: #fff;
        color: #374151;
        font-size: 14px;
        font-weight: 700;
        margin-top: 11px;
        cursor: pointer;
      }

      .delivery-map-unavailable {
        color: #b45309;
        font-size: 13px;
      }

      .delivery-area-footer {
        font-size: 11px;
        color: #9ca3af;
        margin: 19px 0 0;
      }

      @media(max-width:380px) {
        .delivery-area-card {
          padding: 23px 16px;
        }

        .delivery-area-card h2 {
          font-size: 19px;
        }

        .delivery-distance {
          font-size: 33px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // =====================================
  // CATEGORIES
  // =====================================

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

  // =====================================
  // FILTER PRODUCTS
  // =====================================

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

      return matchesCategory &&
        searchableText.includes(query);
    });
  }

  // =====================================
  // RENDER PRODUCTS
  // =====================================

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
      message.textContent =
        `${filtered.length} products उपलब्ध हैं।`;
    }

    grid.innerHTML = filtered.map(product => {
      const id = productId(product);
      const name = productName(product);
      const price = productPrice(product);
      const mrp = oldPrice(product);
      const image = productImage(product);
      const stock = productStock(product);

      const rating = Number(
        product.rating ||
        product.averageRating ||
        0
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
                : `<div class="product-placeholder">🛍️</div>`
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

  // =====================================
  // CART ANIMATION
  // =====================================

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

    if (!start.width || !end.width) return;

    const flying = source.cloneNode(true);

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
      transform: "translate(-50%, -50%) scale(1)",
      transition: "all 650ms ease"
    });

    document.body.appendChild(flying);
    flying.getBoundingClientRect();

    requestAnimationFrame(() => {
      const target = cartTarget.getBoundingClientRect();

      flying.style.left =
        `${target.left + target.width / 2}px`;

      flying.style.top =
        `${target.top + target.height / 2}px`;

      flying.style.width = "18px";
      flying.style.height = "18px";
      flying.style.opacity = "0.2";
      flying.style.transform =
        "translate(-50%, -50%) scale(.2)";
    });

    window.setTimeout(() => flying.remove(), 750);
  }

  // =====================================
  // RENDER CART
  // =====================================
function renderCart() {
    const count = cartQuantity();
    const subtotal = cartSubtotal();

    // HHGS23 DELIVERY CHARGE
    // ₹1–₹98 = ₹20
    // ₹99 या अधिक = FREE
    const deliveryCharge =
      subtotal > 0 && subtotal < 99 ? 20 : 0;

    const total = subtotal + deliveryCharge;

    if ($("cartCount")) {
      $("cartCount").textContent = String(count);
    }

    if ($("cartSubtotal")) {
      $("cartSubtotal").textContent = money(subtotal);
    }

    if ($("cartDelivery")) {
      $("cartDelivery").textContent =
        deliveryCharge > 0
          ? money(deliveryCharge)
          : "FREE";
    }

    if ($("cartTotal")) {
      $("cartTotal").textContent = money(total);
    }

    const bottomBar = $("bottomCartBar");

    if (bottomBar) {
      bottomBar.classList.toggle("has-items", count > 0);
      bottomBar.setAttribute(
        "aria-hidden",
        count > 0 ? "false" : "true"
      );
    }

    if ($("bottomCartStatus")) {
      $("bottomCartStatus").textContent = count
        ? `${count} ITEM${count === 1 ? "" : "S"} IN CART`
        : "CART IS EMPTY";
    }

    if ($("bottomCartTotal")) {
      $("bottomCartTotal").textContent = money(total);
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
              <div class="cart-item-price">
                ${money(item.price)} each
              </div>

              <div class="quantity-controls">
                <button type="button"
                  data-quantity-change="-1"
                  data-quantity-id="${escapeHTML(item.id)}">−</button>

                <strong>${item.quantity}</strong>

                <button type="button"
                  data-quantity-change="1"
                  data-quantity-id="${escapeHTML(item.id)}">+</button>

                <button type="button"
                  data-remove-item="${escapeHTML(item.id)}">
                  Remove
                </button>
              </div>
            </div>

            <strong>
              ${money(item.price * item.quantity)}
            </strong>
          </div>
        `).join("");
      }
    }

    saveCart();
}

  // =====================================
  // ADD PRODUCT
  // =====================================

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

  // =====================================
  // CART DRAWER
  // =====================================

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

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  async function loadProducts() {
    const message = $("storeMessage");
    const grid = $("productGrid");

    if (message) {
      message.textContent = "Products load हो रहे हैं…";
    }

    try {
      const response = await fetch(PRODUCTS_API, {
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(
          `Products API error: HTTP ${response.status}`
        );
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
        throw new Error("Products की list नहीं मिली।");
      }

      state.products = products;

      renderCategories();
      renderProducts();
      renderCart();

    } catch (error) {
      console.error("GS Market products error:", error);

      if (message) {
        message.textContent =
          "Products load नहीं हुए। Backend API जाँचें।";
      }

      if (grid) grid.innerHTML = "";
    }
  }

  // =====================================
  // GPS LOCATION
  // =====================================

  function getCustomerGPS() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(
          new Error("आपका browser GPS support नहीं करता।")
        );
      }

      if (!window.isSecureContext) {
        return reject(
          new Error("GPS के लिए HTTPS वेबसाइट जरूरी है।")
        );
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
          ) {
            return reject(
              new Error("GPS coordinates सही नहीं मिले।")
            );
          }

          resolve({
            latitude,
            longitude,
            accuracy: position.coords.accuracy
          });
        },

        error => {
          let message;

          switch (error.code) {
            case 1:
              message =
                "Order करने के लिए अपनी GPS location Allow करें।";
              break;

            case 2:
              message =
                "आपकी GPS location उपलब्ध नहीं है। Location चालू करें।";
              break;

            case 3:
              message =
                "GPS location मिलने में समय लग रहा है। दोबारा कोशिश करें।";
              break;

            default:
              message = "GPS location नहीं मिल सकी।";
          }

          reject(new Error(message));
        },

        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    });
  }

  // =====================================
  // CHECKOUT MESSAGE
  // =====================================

  function showCheckoutMessage(message) {
    const element = $("checkoutMessage");

    if (element) {
      element.textContent = message;
    } else {
      alert(message);
    }
  }

  // =====================================
  // CHECKOUT
  // =====================================

  $("checkoutForm")?.addEventListener(
    "submit",
    async event => {
      event.preventDefault();

      if (state.checkoutBusy) return;

      const form = $("checkoutForm");
      const payButton = $("payButton");

      const setBusy = (busy, text) => {
        state.checkoutBusy = busy;

        if (payButton) {
          payButton.disabled = busy;
          payButton.textContent = text;
        }
      };

      if (!state.cart.length) {
        showCheckoutMessage("पहले cart में product जोड़ें।");
        return;
      }

      const customer = {
        name: $("customerName")?.value.trim() || "",
        phone: $("customerPhone")?.value.trim() || "",
        address: $("customerAddress")?.value.trim() || ""
      };

      if (
        !customer.name ||
        !customer.phone ||
        !customer.address
      ) {
        showCheckoutMessage(
          "कृपया नाम, मोबाइल नंबर और पूरा पता भरें।"
        );
        return;
      }

      const phone = customer.phone.replace(/\D/g, "");

      if (!/^\d{10}$/.test(phone)) {
        showCheckoutMessage(
          "कृपया 10 अंकों का सही मोबाइल नंबर भरें।"
        );
        return;
      }

      if (typeof window.Razorpay !== "function") {
        showCheckoutMessage(
          "Razorpay Checkout load नहीं हुआ।"
        );
        return;
      }

      setBusy(true, "GPS location प्राप्त हो रही है...");
      showCheckoutMessage(
        "कृपया GPS permission Allow करें..."
      );

      try {
        // STEP 1: CUSTOMER GPS
        const gps = await getCustomerGPS();

        console.log("GS Market GPS:", {
          latitude: gps.latitude,
          longitude: gps.longitude,
          accuracy: gps.accuracy
        });

        // STEP 2: CART ITEMS
        const items = state.cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }));

        setBusy(true, "Order बनाया जा रहा है...");

        // STEP 3: CREATE ORDER
        const createResponse = await fetch(
          CHECKOUT_CREATE_API,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              customer,
              items,
              latitude: gps.latitude,
              longitude: gps.longitude,
              location: {
                latitude: gps.latitude,
                longitude: gps.longitude
              }
            })
          }
        );

        const orderData = await createResponse.json();

        // DELIVERY AREA OUTSIDE
        if (
          createResponse.status === 403 &&
          orderData.code === "OUTSIDE_DELIVERY_RADIUS"
        ) {
          setBusy(false, "Pay Now");
          showOutsideDeliveryArea(orderData);
          return;
        }

        if (!createResponse.ok || !orderData.success) {
          throw new Error(
            orderData.message || "Order बनाने में समस्या हुई।"
          );
        }

        if (!orderData.keyId || !orderData.razorpayOrderId) {
          throw new Error(
            "Razorpay order details अधूरी हैं।"
          );
        }

        // STEP 4: RAZORPAY CHECKOUT
        setBusy(false, "Pay Now");

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
            orderNumber: orderData.orderNumber || ""
          },

          theme: {
            color: "#4f46e5"
          },

          modal: {
            ondismiss: function () {
              showCheckoutMessage(
                "Payment window बंद हुई। Payment status जाँचकर ही दोबारा भुगतान करें।"
              );

              setBusy(false, "Pay Now");
            }
          },

          // STEP 5: PAYMENT VERIFICATION
          handler: async function (paymentResponse) {
            setBusy(true, "Payment verify हो रहा है...");

            showCheckoutMessage(
              "Payment verify हो रहा है। कृपया प्रतीक्षा करें..."
            );

            try {
              const verifyResponse = await fetch(
                CHECKOUT_VERIFY_API,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    razorpay_order_id:
                      paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse.razorpay_signature
                  })
                }
              );

              const verifyData = await verifyResponse.json();

              if (!verifyResponse.ok || !verifyData.success) {
                throw new Error(
                  verifyData.message ||
                  "Payment verify नहीं हुआ।"
                );
              }

              state.cart = [];
              renderCart();

              showCheckoutMessage(
                "भुगतान सफल! आपका Order Number: " +
                (
                  verifyData.orderNumber ||
                  orderData.orderNumber ||
                  ""
                )
              );

              form.reset();

            } catch (verifyError) {
              console.error(
                "GS Market payment verification:",
                verifyError
              );

              showCheckoutMessage(
                "Payment का final status verify नहीं हो सका। " +
                "यदि पैसे कटे हैं तो दोबारा भुगतान करने से पहले " +
                "order status जाँचें। Order: " +
                (orderData.orderNumber || "")
              );

            } finally {
              setBusy(false, "Pay Now");
            }
          }
        };

        const checkout = new window.Razorpay(options);

        checkout.on("payment.failed", function (response) {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          showCheckoutMessage(
            "Payment पूरा नहीं हुआ। यदि पैसे कटे हैं, " +
            "तो order status जाँचें।"
          );

          setBusy(false, "Pay Now");
        });

        checkout.open();

      } catch (error) {
        console.error("GS Market checkout error:", error);

        showCheckoutMessage(
          error.message ||
          "Checkout शुरू नहीं हो सका। कृपया फिर प्रयास करें।"
        );

        setBusy(false, "Pay Now");
      }
    }
  );

  // =====================================
  // CLICK HANDLERS
  // =====================================

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");

    if (addButton) {
      if (addButton.disabled) return;

      const id = addButton.dataset.addProduct;

      if (!addProduct(id)) return;

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
      state.category =
        categoryButton.dataset.category || "all";

      renderCategories();
      renderProducts();
      return;
    }

    const quantityButton = event.target.closest(
      "[data-quantity-change]"
    );

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

      state.cart = state.cart.filter(
        item => item.id !== id
      );

      renderCart();
    }
  });

  // =====================================
  // SEARCH AND CATEGORY
  // =====================================

  $("productSearch")?.addEventListener("input", event => {
    state.search = event.target.value.trim();
    renderProducts();
  });

  $("categoryFilter")?.addEventListener("change", event => {
    state.category = event.target.value || "all";

    renderCategories();
    renderProducts();
  });

  // =====================================
  // CART DRAWER EVENTS
  // =====================================

  $("openCart")?.addEventListener("click", openCart);
  $("bottomViewCart")?.addEventListener("click", openCart);
  $("closeCart")?.addEventListener("click", closeCart);
  $("cartOverlay")?.addEventListener("click", closeCart);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      hideOutsideDeliveryArea();
    }
  });

  // =====================================
  // INITIALIZE
  // =====================================

  addDeliveryAreaStyles();
  renderCart();

  loadShopStatus();
  loadProducts();

})();