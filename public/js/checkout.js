// ============================================
// public/js/checkout.js
// DOCTOR CHECKOUT CART
// ============================================

(function () {

    "use strict";


    // ========================================
    // DOCTOR ID
    // ========================================

    const doctor =
        window.checkoutDoctor || {};


    const doctorId =
        doctor._id ||
        doctor.id ||
        doctor.doctorId ||
        "";


    console.log(
        "CHECKOUT DOCTOR:",
        doctor
    );

    console.log(
        "CHECKOUT DOCTOR ID:",
        doctorId
    );


    // ========================================
    // ELEMENTS
    // ========================================

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );

    const errorMessage =
        document.getElementById(
            "errorMessage"
        );

    const successMessage =
        document.getElementById(
            "successMessage"
        );


    // ========================================
    // LOAD CART
    // ========================================

    async function loadCart() {

        try {

            if (!cartItems) {

                console.error(
                    "cartItems element not found"
                );

                return;

            }


            cartItems.innerHTML = `

                <div class="loading-cart">
                    Loading products...
                </div>

            `;


            // ==================================
            // CART URL
            // ==================================

            const cartUrl =
                "/api/cart?doctorId=" +
                encodeURIComponent(
                    doctorId
                );


            console.log(
                "CART REQUEST URL:",
                cartUrl
            );


            // ==================================
            // FETCH
            // ==================================

            const response =
                await fetch(
                    cartUrl,
                    {
                        method: "GET",

                        headers: {
                            "Accept":
                                "application/json"
                        },

                        credentials:
                            "same-origin"
                    }
                );


            console.log(
                "CART STATUS:",
                response.status
            );

            console.log(
                "CART CONTENT TYPE:",
                response.headers.get(
                    "content-type"
                )
            );


            // ==================================
            // GET RAW RESPONSE FIRST
            // ==================================

            const text =
                await response.text();


            console.log(
                "CART RAW RESPONSE:",
                text.substring(
                    0,
                    500
                )
            );


            // ==================================
            // CHECK HTTP ERROR
            // ==================================

            if (!response.ok) {

                throw new Error(

                    "Cart API returned HTTP " +
                    response.status

                );

            }


            // ==================================
            // CHECK JSON
            // ==================================

            let data;

            try {

                data =
                    JSON.parse(text);

            } catch (jsonError) {

                console.error(
                    "CART JSON ERROR:",
                    jsonError
                );


                throw new Error(

                    "Cart API JSON नहीं भेज रहा है. " +
                    "Server ने HTML भेजा है."

                );

            }


            console.log(
                "CART JSON:",
                data
            );


            // ==================================
            // API SUCCESS CHECK
            // ==================================

            if (
                !data ||
                data.success !== true
            ) {

                throw new Error(

                    data?.message ||
                    "Unable to load cart"

                );

            }


            // ==================================
            // CART DATA
            // ==================================

            const items =
                Array.isArray(data.cart)
                    ? data.cart
                    : [];


            // ==================================
            // EMPTY CART
            // ==================================

            if (items.length === 0) {

                cartItems.innerHTML = `

                    <div class="empty-cart">

                        <div
                            style="
                                font-size:40px;
                                margin-bottom:10px;
                            "
                        >
                            🛒
                        </div>

                        <strong>
                            Cart is empty
                        </strong>

                        <p>
                            No products found
                            in your cart.
                        </p>

                    </div>

                `;


                if (cartTotal) {

                    cartTotal.textContent =
                        "₹0.00";

                }


                return;

            }


            // ==================================
            // DISPLAY CART
            // ==================================

            let total = 0;


            cartItems.innerHTML =
                items.map(
                    item => {

                        const price =
                            Number(
                                item.price
                            ) || 0;


                        const quantity =
                            Number(
                                item.quantity
                            ) || 1;


                        const itemTotal =
                            price *
                            quantity;


                        total +=
                            itemTotal;


                        const name =
                            escapeHTML(
                                item.name ||
                                "Product"
                            );


                        const image =
                            item.image ||
                            "";


                        return `

                            <div
                                class="cart-item"
                            >

                                <div
                                    class="cart-product-info"
                                >

                                    ${
                                        image
                                            ? `
                                                <img
                                                    src="${escapeAttribute(image)}"
                                                    style="
                                                        width:55px;
                                                        height:55px;
                                                        object-fit:cover;
                                                        border-radius:10px;
                                                        margin-right:10px;
                                                        vertical-align:middle;
                                                    "
                                                    onerror="
                                                        this.style.display='none'
                                                    "
                                                >
                                            `
                                            : ""
                                    }

                                    <strong>
                                        ${name}
                                    </strong>

                                    <small>
                                        ₹${price.toFixed(2)}
                                        ×
                                        ${quantity}
                                    </small>

                                </div>


                                <div
                                    class="cart-product-price"
                                >
                                    ₹${itemTotal.toFixed(2)}
                                </div>

                            </div>

                        `;

                    }
                ).join("");


            // ==================================
            // TOTAL
            // ==================================

            if (cartTotal) {

                cartTotal.textContent =
                    "₹" +
                    total.toFixed(2);

            }


        } catch (error) {

            console.error(
                "LOAD CART ERROR:",
                error
            );


            if (cartItems) {

                cartItems.innerHTML = `

                    <div class="empty-cart">

                        <div
                            style="
                                font-size:40px;
                                margin-bottom:10px;
                            "
                        >
                            ⚠️
                        </div>

                        <strong>
                            Unable to load cart
                        </strong>

                        <p>
                            ${escapeHTML(
                                error.message
                            )}
                        </p>

                    </div>

                `;

            }

        }

    }


    // ========================================
    // ESCAPE HTML
    // ========================================

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ========================================
    // ESCAPE ATTRIBUTE
    // ========================================

    function escapeAttribute(value) {

        return escapeHTML(value);

    }


    // ========================================
    // PAYMENT
    // ========================================

    const paymentOptions =
        document.querySelectorAll(
            'input[name="payment"]'
        );


    paymentOptions.forEach(
        radio => {

            radio.addEventListener(
                "change",
                function () {

                    document
                        .querySelectorAll(
                            ".payment-option"
                        )
                        .forEach(
                            option => {

                                option.classList
                                    .remove(
                                        "selected"
                                    );

                            }
                        );


                    const parent =
                        this.closest(
                            ".payment-option"
                        );


                    if (parent) {

                        parent.classList.add(
                            "selected"
                        );

                    }


                    if (
                        this.value ===
                        "cod"
                    ) {

                        const codMessage =
                            document.getElementById(
                                "codMessage"
                            );


                        if (codMessage) {

                            codMessage.style.display =
                                "block";

                        }


                        if (checkoutBtn) {

                            checkoutBtn.textContent =
                                "Place COD Order";

                        }

                    } else {

                        const codMessage =
                            document.getElementById(
                                "codMessage"
                            );


                        if (codMessage) {

                            codMessage.style.display =
                                "none";

                        }


                        if (checkoutBtn) {

                            checkoutBtn.textContent =
                                "Continue to Payment";

                        }

                    }

                }
            );

        }
    );


    // ========================================
    // START
    // ========================================

    loadCart();


})();