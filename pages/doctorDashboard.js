function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function DoctorDashboard(doctor = {}, products = []) {

    // =====================================================
    // DOCTOR DETAILS
    // =====================================================

    const rawDoctorName =
        doctor.name ||
        doctor.doctorName ||
        "Doctor";

    /*
     * Remove duplicate Dr. if database already contains
     * Dr. Ram Karan Sah
     */

    const doctorName =
        String(rawDoctorName)
            .replace(/^dr\.?\s+/i, "")
            .trim();

    const specialization =
        doctor.specialization ||
        "General Physician";


    // =====================================================
    // PRODUCTS
    // =====================================================

    const safeProducts =
        Array.isArray(products)
            ? products
            : [];


    // =====================================================
    // CATEGORY LIST
    // =====================================================

    const categories = [
        ...new Set(
            safeProducts
                .map(product =>
                    String(product.category || "")
                        .trim()
                )
                .filter(Boolean)
        )
    ];


    // =====================================================
    // COMPANY / BRAND LIST
    // =====================================================

    const companies = [
        ...new Set(
            safeProducts
                .map(product => {

                    return (
                        product.manufacturer ||
                        product.brand ||
                        ""
                    )
                        .toString()
                        .trim();

                })
                .filter(Boolean)
        )
    ];


    // =====================================================
    // PRODUCT JSON FOR JAVASCRIPT
    // =====================================================

    const productData =
        safeProducts.map(product => {

            const mrp =
                Number(product.mrp || 0);

            const price =
                Number(product.price || 0);

            let discount = 0;

            if (mrp > price && mrp > 0) {

                discount =
                    Math.round(
                        ((mrp - price) / mrp) * 100
                    );

            }

            const stock =
                Number(product.stock || 0);

            const category =
                String(
                    product.category || "Medicine"
                );

            const company =
                String(
                    product.manufacturer ||
                    product.brand ||
                    ""
                );

            return {

                id:
                    String(
                        product._id || ""
                    ),

                name:
                    String(
                        product.name || "Product"
                    ),

                category,

                company,

                brand:
                    String(
                        product.brand || ""
                    ),

                manufacturer:
                    String(
                        product.manufacturer || ""
                    ),

                price,

                mrp,

                stock,

                discount,

                description:
                    String(
                        product.description ||
                        "Premium Healthcare Product"
                    ),

                image:
                    String(
                        product.image ||
                        (
                            Array.isArray(
                                product.images
                            )
                                ? product.images[0] || ""
                                : ""
                        )
                    ),

                images:
                    Array.isArray(product.images)
                        ? product.images
                        : [],

                isTrending:
                    Boolean(
                        product.isTrending ||
                        product.trending ||
                        false
                    ),

                isPremium:
                    Boolean(
                        product.isPremium ||
                        product.premium ||
                        false
                    )

            };

        });


    // =====================================================
    // PRODUCT CARD
    // =====================================================

    function productCard(product, type = "") {

        const price =
            Number(product.price || 0);

        const mrp =
            Number(product.mrp || 0);

        const stock =
            Number(product.stock || 0);

        const inStock =
            stock > 0;

        const discount =
            Number(product.discount || 0);


        let badge = "";

        if (type === "trending") {

            badge = `
                <div class="product-badge trending-badge">
                    🔥 TRENDING
                </div>
            `;

        }
        else if (type === "premium") {

            badge = `
                <div class="product-badge premium-badge">
                    👑 PREMIUM
                </div>
            `;

        }
        else if (!inStock) {

            badge = `
                <div class="product-badge stock-badge">
                    🚫 OUT OF STOCK
                </div>
            `;

        }


        const imageHTML =
            product.image

                ?

                `
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='flex';
                        "
                    >

                    <div
                        class="image-placeholder"
                        style="display:none;"
                    >
                        💊
                    </div>
                `

                :

                `
                    <div class="image-placeholder">
                        💊
                    </div>
                `;


        const priceHTML =

            mrp > price && mrp > 0

                ?

                `
                    <div class="price-row">

                        <span class="old-price">
                            ₹${mrp.toFixed(0)}
                        </span>

                        <span class="sale-price">
                            ₹${price.toFixed(0)}
                        </span>

                    </div>

                    <div class="discount">
                        ${discount}% OFF
                    </div>
                `

                :

                `
                    <div class="price-row">

                        <span class="sale-price">
                            ₹${price.toFixed(0)}
                        </span>

                    </div>
                `;


        const company =
            product.company
                ? escapeHTML(product.company)
                : "Healthcare Product";


        const description =
            product.description ||
            "Premium Healthcare Product";


        const buttonHTML =

            inStock

                ?

                `
                    <button
                        class="cart-btn"
                        onclick="addToCart('${escapeHTML(product.id)}')"
                    >
                        🛒 Add To Cart
                    </button>
                `

                :

                `
                    <button
                        class="cart-btn disabled-btn"
                        disabled
                    >
                        🚫 Out of Stock
                    </button>
                `;


        return `

            <article
                class="product-card
                ${!inStock ? "out-stock-card" : ""}
                "
                data-id="${escapeHTML(product.id)}"
                data-category="${escapeHTML(product.category)}"
                data-company="${escapeHTML(product.company)}"
                data-name="${escapeHTML(product.name)}"
            >

                ${badge}


                <div class="product-image">

                    ${imageHTML}

                </div>


                <div class="product-content">


                    <div class="product-category">

                        ${escapeHTML(product.category)}

                        <span class="rating">
                            ⭐ 5.0
                        </span>

                    </div>


                    <h3 class="product-name">

                        ${escapeHTML(product.name)}

                    </h3>


                    <p class="product-description">

                        ${escapeHTML(description)}

                    </p>


                    <div class="company">

                        🏭

                        <span>
                            ${company}
                        </span>

                    </div>


                    ${
                        product.brand
                            ?

                            `
                                <div class="brand">

                                    Brand:

                                    <strong>
                                        ${escapeHTML(
                                            product.brand
                                        )}
                                    </strong>

                                </div>
                            `

                            :
                            ""
                    }


                    <div class="price-area">

                        ${priceHTML}

                    </div>


                    ${
                        inStock

                            ?

                            `
                                <div class="stock in-stock">

                                    ● In Stock (${stock})

                                </div>
                            `

                            :

                            `
                                <div class="stock out-stock">

                                    ● Out of Stock

                                </div>
                            `
                    }


                    ${buttonHTML}


                </div>

            </article>

        `;

    }


    // =====================================================
    // TRENDING PRODUCTS
    // =====================================================

    const trendingProducts =
        safeProducts.filter(product => {

            return (
                product.isTrending === true ||
                product.trending === true
            );

        });


    // If no explicit trending products,
    // show first 2 in-stock products

    const finalTrending =
        trendingProducts.length > 0

            ?

            trendingProducts

            :

            safeProducts
                .filter(
                    product =>
                        Number(product.stock || 0) > 0
                )
                .slice(0, 2);


    // =====================================================
    // PREMIUM PRODUCTS
    // =====================================================

    const premiumProducts =
        safeProducts.filter(product => {

            return (
                product.isPremium === true ||
                product.premium === true
            );

        });


    // If no premium flag,
    // show products having higher price

    const finalPremium =
        premiumProducts.length > 0

            ?

            premiumProducts

            :

            safeProducts
                .filter(
                    product =>
                        Number(product.stock || 0) > 0
                )
                .sort(
                    (a, b) =>
                        Number(b.price || 0) -
                        Number(a.price || 0)
                )
                .slice(0, 2);


    // =====================================================
    // OUT OF STOCK
    // =====================================================

    const outOfStockProducts =
        safeProducts.filter(product => {

            return Number(product.stock || 0) <= 0;

        });


    // =====================================================
    // PRODUCT COUNT
    // =====================================================

    const totalProducts =
        safeProducts.length;


    // =====================================================
    // CATEGORY OPTIONS
    // =====================================================

    const categoryOptions =
        categories.map(category => {

            return `

                <option value="${escapeHTML(category)}">

                    ${escapeHTML(category)}

                </option>

            `;

        }).join("");


    // =====================================================
    // COMPANY OPTIONS
    // =====================================================

    const companyOptions =
        companies.map(company => {

            return `

                <option value="${escapeHTML(company)}">

                    ${escapeHTML(company)}

                </option>

            `;

        }).join("");


    // =====================================================
    // ALL PRODUCT CARDS
    // =====================================================

    const allProductsHTML =
        safeProducts.length > 0

            ?

            safeProducts
                .map(product =>
                    productCard(product)
                )
                .join("")

            :

            `
                <div class="empty-products">

                    <div class="empty-icon">
                        🔍
                    </div>

                    <h2>
                        No Products Found
                    </h2>

                    <p>
                        Healthcare products will appear here.
                    </p>

                </div>
            `;


    // =====================================================
    // TRENDING HTML
    // =====================================================

    const trendingHTML =
        finalTrending.length > 0

            ?

            finalTrending
                .map(product =>
                    productCard(
                        product,
                        "trending"
                    )
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    No trending products available.

                </div>
            `;


    // =====================================================
    // PREMIUM HTML
    // =====================================================

    const premiumHTML =
        finalPremium.length > 0

            ?

            finalPremium
                .map(product =>
                    productCard(
                        product,
                        "premium"
                    )
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    No premium products available.

                </div>
            `;


    // =====================================================
    // OUT OF STOCK HTML
    // =====================================================

    const outStockHTML =
        outOfStockProducts.length > 0

            ?

            outOfStockProducts
                .map(product =>
                    productCard(product)
                )
                .join("")

            :

            `
                <div class="no-special-products">

                    🎉 All products are currently in stock.

                </div>
            `;


    // =====================================================
    // PAGE
    // =====================================================

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    Doctor Portal | GLOBAL HEALTHCARE
</title>


<style>

/* =====================================================
   RESET
===================================================== */

* {

    margin:0;
    padding:0;

    box-sizing:border-box;

    font-family:
        "Poppins",
        "Segoe UI",
        Arial,
        sans-serif;

}


body {

    min-height:100vh;

    background:
        linear-gradient(
            135deg,
            #eef7ff,
            #f8fafc
        );

    color:#0f172a;

}


/* =====================================================
   HEADER
===================================================== */

.header {

    position:sticky;

    top:0;

    z-index:1000;

    background:
        linear-gradient(
            135deg,
            #005bea,
            #00c6fb
        );

    color:white;

    padding:15px 30px;

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:20px;

    box-shadow:
        0 10px 35px
        rgba(0,91,234,.25);

}


.logo {

    display:flex;

    align-items:center;

    gap:12px;

}


.logo-icon {

    width:48px;

    height:48px;

    border-radius:15px;

    background:
        rgba(255,255,255,.18);

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:25px;

}


.logo-text {

    font-size:22px;

    font-weight:900;

}


.logo-sub {

    font-size:11px;

    opacity:.85;

}


.nav {

    display:flex;

    align-items:center;

    gap:8px;

    flex-wrap:wrap;

}


.nav a {

    color:white;

    text-decoration:none;

    padding:10px 13px;

    border-radius:12px;

    font-size:13px;

    font-weight:700;

    transition:.25s;

}


.nav a:hover {

    background:
        rgba(255,255,255,.18);

}


.cart-link {

    position:relative;

}


.cart-count {

    display:inline-flex;

    align-items:center;

    justify-content:center;

    min-width:20px;

    height:20px;

    padding:0 5px;

    border-radius:20px;

    background:#ef4444;

    color:white;

    font-size:11px;

    font-weight:900;

}


/* =====================================================
   HERO
===================================================== */

.hero {

    max-width:1250px;

    margin:25px auto;

    padding:32px;

    border-radius:28px;

    background:
        linear-gradient(
            135deg,
            #ffffff,
            #eff6ff
        );

    border:1px solid #dbeafe;

    box-shadow:
        0 15px 45px
        rgba(15,23,42,.08);

}


.doctor-row {

    display:flex;

    align-items:center;

    gap:18px;

}


.doctor-avatar {

    width:70px;

    height:70px;

    border-radius:22px;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:36px;

    background:
        linear-gradient(
            135deg,
            #dbeafe,
            #e0f2fe
        );

}


.hero h1 {

    font-size:30px;

    font-weight:900;

}


.hero h1 span {

    color:#2563eb;

}


.hero p {

    margin-top:7px;

    color:#64748b;

    font-size:14px;

    font-weight:600;

}


.hero-tags {

    display:flex;

    gap:8px;

    margin-top:18px;

    flex-wrap:wrap;

}


.hero-tag {

    padding:8px 13px;

    border-radius:30px;

    background:white;

    border:1px solid #dbeafe;

    color:#2563eb;

    font-size:12px;

    font-weight:800;

}


/* =====================================================
   CONTAINER
===================================================== */

.container {

    max-width:1250px;

    margin:auto;

    padding:0 20px 40px;

}


/* =====================================================
   FILTER PANEL
===================================================== */

.filter-panel {

    background:white;

    padding:22px;

    border-radius:22px;

    border:1px solid #e2e8f0;

    box-shadow:
        0 12px 35px
        rgba(15,23,42,.06);

    margin-bottom:30px;

}


.filter-title {

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-bottom:16px;

}


.filter-title h2 {

    font-size:20px;

    font-weight:900;

}


.product-count {

    color:#64748b;

    font-size:13px;

    font-weight:700;

}


.filters {

    display:grid;

    grid-template-columns:
        1.5fr
        1fr
        1fr
        auto;

    gap:12px;

}


.search-box,
.select-box {

    position:relative;

}


.search-box span {

    position:absolute;

    left:14px;

    top:50%;

    transform:translateY(-50%);

    font-size:18px;

}


input,
select {

    width:100%;

    height:48px;

    border:1px solid #dbe3ee;

    border-radius:14px;

    outline:none;

    padding:0 14px;

    background:#f8fafc;

    color:#0f172a;

    font-size:14px;

    font-weight:600;

}


.search-box input {

    padding-left:45px;

}


input:focus,
select:focus {

    border-color:#2563eb;

    background:white;

    box-shadow:
        0 0 0 4px
        rgba(37,99,235,.08);

}


.reset-btn {

    height:48px;

    padding:0 18px;

    border:0;

    border-radius:14px;

    background:
        linear-gradient(
            135deg,
            #0f172a,
            #334155
        );

    color:white;

    cursor:pointer;

    font-weight:800;

}


/* =====================================================
   SECTION
===================================================== */

.product-section {

    margin-bottom:38px;

}


.section-header {

    display:flex;

    align-items:end;

    justify-content:space-between;

    margin-bottom:17px;

}


.section-title {

    display:flex;

    align-items:center;

    gap:10px;

}


.section-title h2 {

    font-size:24px;

    font-weight:900;

}


.section-title p {

    margin-top:3px;

    color:#64748b;

    font-size:13px;

}


.section-icon {

    width:44px;

    height:44px;

    display:flex;

    align-items:center;

    justify-content:center;

    border-radius:14px;

    background:#eff6ff;

    font-size:22px;

}


/* =====================================================
   PRODUCTS GRID
===================================================== */

.products-grid {

    display:grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap:20px;

}


/* =====================================================
   PRODUCT CARD
===================================================== */

.product-card {

    position:relative;

    background:white;

    border-radius:23px;

    border:1px solid #e2e8f0;

    overflow:hidden;

    box-shadow:
        0 10px 30px
        rgba(15,23,42,.06);

    transition:
        transform .25s,
        box-shadow .25s;

}


.product-card:hover {

    transform:
        translateY(-6px);

    box-shadow:
        0 20px 45px
        rgba(15,23,42,.12);

}


.product-image {

    height:210px;

    background:
        linear-gradient(
            135deg,
            #f8fafc,
            #eff6ff
        );

    display:flex;

    align-items:center;

    justify-content:center;

    overflow:hidden;

}


.product-image img {

    width:100%;

    height:100%;

    object-fit:contain;

    padding:18px;

    transition:.3s;

}


.product-card:hover
.product-image img {

    transform:scale(1.05);

}


.image-placeholder {

    width:80px;

    height:80px;

    border-radius:24px;

    display:flex;

    align-items:center;

    justify-content:center;

    background:#dbeafe;

    font-size:38px;

}


.product-content {

    padding:18px;

}


.product-badge {

    position:absolute;

    top:13px;

    left:13px;

    z-index:2;

    padding:7px 11px;

    border-radius:30px;

    font-size:10px;

    font-weight:900;

    letter-spacing:.3px;

    box-shadow:
        0 5px 15px
        rgba(0,0,0,.12);

}


.trending-badge {

    background:#fff7ed;

    color:#ea580c;

}


.premium-badge {

    background:#fefce8;

    color:#a16207;

}


.stock-badge {

    background:#fee2e2;

    color:#b91c1c;

}


.product-category {

    display:flex;

    align-items:center;

    justify-content:space-between;

    color:#2563eb;

    font-size:12px;

    font-weight:900;

    text-transform:capitalize;

}


.rating {

    color:#f59e0b;

}


.product-name {

    margin-top:8px;

    font-size:19px;

    font-weight:900;

    line-height:1.3;

}


.product-description {

    color:#64748b;

    font-size:12px;

    line-height:1.5;

    margin-top:7px;

    min-height:36px;

}


.company {

    display:flex;

    align-items:center;

    gap:5px;

    margin-top:13px;

    color:#475569;

    font-size:12px;

    font-weight:700;

}


.company span {

    overflow:hidden;

    text-overflow:ellipsis;

    white-space:nowrap;

}


.brand {

    margin-top:5px;

    color:#64748b;

    font-size:11px;

}


.brand strong {

    color:#334155;

}


.price-area {

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-top:14px;

}


.price-row {

    display:flex;

    align-items:center;

    gap:8px;

}


.old-price {

    color:#94a3b8;

    font-size:14px;

    text-decoration:line-through;

}


.sale-price {

    color:#16a34a;

    font-size:23px;

    font-weight:900;

}


.discount {

    padding:5px 8px;

    border-radius:8px;

    background:#ecfdf5;

    color:#15803d;

    font-size:10px;

    font-weight:900;

}


.stock {

    margin-top:11px;

    font-size:12px;

    font-weight:800;

}


.in-stock {

    color:#16a34a;

}


.out-stock {

    color:#dc2626;

}


.cart-btn {

    width:100%;

    height:45px;

    margin-top:14px;

    border:0;

    border-radius:13px;

    cursor:pointer;

    background:
        linear-gradient(
            135deg,
            #2563eb,
            #4f46e5
        );

    color:white;

    font-weight:900;

    font-size:13px;

    transition:.25s;

}


.cart-btn:hover {

    transform:translateY(-2px);

    box-shadow:
        0 8px 20px
        rgba(37,99,235,.25);

}


.disabled-btn {

    background:#e2e8f0;

    color:#94a3b8;

    cursor:not-allowed;

}


.disabled-btn:hover {

    transform:none;

    box-shadow:none;

}


.out-stock-card {

    opacity:.78;

}


.out-stock-card .product-image {

    filter:grayscale(.3);

}


/* =====================================================
   SPECIAL MESSAGE
===================================================== */

.no-special-products {

    background:white;

    border:1px dashed #cbd5e1;

    border-radius:18px;

    padding:30px;

    text-align:center;

    color:#64748b;

    font-weight:700;

}


/* =====================================================
   EMPTY
===================================================== */

.empty-products {

    grid-column:1 / -1;

    text-align:center;

    background:white;

    border-radius:22px;

    padding:60px 20px;

    border:1px solid #e2e8f0;

}


.empty-icon {

    font-size:55px;

    margin-bottom:15px;

}


.empty-products h2 {

    font-size:22px;

}


.empty-products p {

    margin-top:7px;

    color:#64748b;

}


/* =====================================================
   FOOTER
===================================================== */

.footer {

    text-align:center;

    padding:30px 20px;

    color:#64748b;

    font-size:12px;

}


.footer strong {

    color:#2563eb;

}

/* =====================================================
   MOBILE
===================================================== */

@media(max-width:950px) {

    .products-grid {

        grid-template-columns:
            repeat(2, 1fr);

        gap: 10px;

    }

    .filters {

        grid-template-columns:
            1fr 1fr;

    }

}

@media(max-width:700px) {

    .header {

        position:relative;

        flex-direction:column;

        align-items:stretch;

        padding:15px;

    }


    .logo {

        justify-content:center;

    }


    .nav {

        justify-content:center;

    }


    .nav a {

        font-size:11px;

        padding:8px 9px;

    }


    .hero {

        margin:15px 12px;

        padding:22px;

        border-radius:22px;

    }


    .hero h1 {

        font-size:24px;

    }


    .doctor-avatar {

        width:58px;

        height:58px;

        font-size:28px;

    }


    .container {

        padding:
            0 12px 30px;

    }


    .filters {

        grid-template-columns:1fr;

    }


    .section-header {

        align-items:flex-start;

    }


    .section-title h2 {

        font-size:20px;

    }


    .products-grid {

        grid-template-columns:1fr;

    }


    .product-image {

        height:230px;

    }

}


</style>

</head>


<body>


<!-- ===================================================
     HEADER
=================================================== -->

<header class="header">

    <div class="logo">

        <div class="logo-icon">
            🩺
        </div>

        <div>

            <div class="logo-text">
                GLOBAL HEALTHCARE
            </div>

            <div class="logo-sub">
                SAFE & SECURE Healthcare
            </div>

        </div>

    </div>


    <nav class="nav">

        <a href="/doctor/dashboard">
            🏠 Home
        </a>

        <a href="/doctor/orders">
            📦 Orders
        </a>

        <a
            href="/doctor/cart"
            class="cart-link"
        >

            🛒 Cart

            <span
                id="cartCount"
                class="cart-count"
            >
                0
            </span>

        </a>

        <a href="/admin/doctor/logout">
            🚪 Logout
        </a>

    </nav>

</header>


<!-- ===================================================
     HERO
=================================================== -->

<section class="hero">

    <div class="doctor-row">

        <div class="doctor-avatar">
            👨‍⚕️
        </div>

        <div>

            <h1>
                Welcome
                <span>
                    Dr. ${escapeHTML(doctorName)}
                </span>
            </h1>

            <p>
                ${escapeHTML(specialization)}
                &nbsp; • &nbsp;
                Premium Healthcare Products
            </p>

        </div>

    </div>


    <div class="hero-tags">

        <div class="hero-tag">
            🛡️ Trusted Healthcare
        </div>

        <div class="hero-tag">
            🚚 Fast Delivery
        </div>

        <div class="hero-tag">
            💊 Quality Products
        </div>

        <div class="hero-tag">
            🔒 Secure Ordering
        </div>

    </div>

</section>


<!-- ===================================================
     MAIN
=================================================== -->

<main class="container">


    <!-- FILTER -->

    <section class="filter-panel">

        <div class="filter-title">

            <h2>
                🔎 Find Products
            </h2>

            <div
                class="product-count"
                id="productCount"
            >
                ${totalProducts} Products
            </div>

        </div>


        <div class="filters">


            <!-- SEARCH -->

            <div class="search-box">

                <span>
                    🔍
                </span>

                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search products..."
                    autocomplete="off"
                >

            </div>


            <!-- CATEGORY -->

            <div class="select-box">

                <select id="categoryFilter">

                    <option value="">
                        📦 All Categories
                    </option>

                    ${categoryOptions}

                </select>

            </div>


            <!-- COMPANY -->

            <div class="select-box">

                <select id="companyFilter">

                    <option value="">
                        🏭 All Companies / Brands
                    </option>

                    ${companyOptions}

                </select>

            </div>


            <!-- RESET -->

            <button
                type="button"
                class="reset-btn"
                onclick="resetFilters()"
            >

                ↻ Reset

            </button>


        </div>

    </section>


    <!-- =================================================
         TRENDING
    ================================================== -->

    <section
        class="product-section"
        id="trendingSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🔥
                </div>

                <div>

                    <h2>
                        Trending Products
                    </h2>

                    <p>
                        Popular healthcare products
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${trendingHTML}

        </div>

    </section>


    <!-- =================================================
         PREMIUM
    ================================================== -->

    <section
        class="product-section"
        id="premiumSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    👑
                </div>

                <div>

                    <h2>
                        Premium Products
                    </h2>

                    <p>
                        Premium Healthcare Collection
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${premiumHTML}

        </div>

    </section>


    <!-- =================================================
         ALL PRODUCTS
    ================================================== -->

    <section
        class="product-section"
        id="allSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🛍️
                </div>

                <div>

                    <h2>
                        All Products
                    </h2>

                    <p>
                        Browse our complete healthcare collection
                    </p>

                </div>

            </div>

        </div>


        <div
            class="products-grid"
            id="productsGrid"
        >

            ${allProductsHTML}

        </div>

    </section>


    <!-- =================================================
         OUT OF STOCK
    ================================================== -->

    <section
        class="product-section"
        id="outStockSection"
    >

        <div class="section-header">

            <div class="section-title">

                <div class="section-icon">
                    🚫
                </div>

                <div>

                    <h2>
                        Out of Stock
                    </h2>

                    <p>
                        Currently unavailable products
                    </p>

                </div>

            </div>

        </div>


        <div class="products-grid">

            ${outStockHTML}

        </div>

    </section>


</main>


<!-- ===================================================
     FOOTER
=================================================== -->

<footer class="footer">

    © 2026

    <strong>
        GLOBAL HEALTHCARE
    </strong>

    <br>

    Powered by

    <strong>
        Osium Biogenix
    </strong>

</footer>


<script>

/* =====================================================
   PRODUCT DATA
===================================================== */

const products =
    ${JSON.stringify(productData)};


/* =====================================================
   CART
===================================================== */

let doctorCart = [];


/* =====================================================
   LOAD CART FROM DATABASE
===================================================== */

async function loadCart() {

    try {

        console.log("Loading cart from database...");

        const response =
            await fetch("/api/cart", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });


        const data =
            await response.json();


        console.log(
            "CART API RESPONSE:",
            data
        );


        if (
            data.success &&
            Array.isArray(data.cart)
        ) {

            doctorCart =
                data.cart.map(item => ({

                    id:
                        String(
                            item.productId ||
                            item.id ||
                            ""
                        ),

                    productId:
                        String(
                            item.productId ||
                            item.id ||
                            ""
                        ),

                    name:
                        item.name ||
                        "Product",

                    price:
                        Number(
                            item.price || 0
                        ),

                    image:
                        item.image || "",

                    qty:
                        Number(
                            item.quantity ||
                            item.qty ||
                            1
                        ),

                    quantity:
                        Number(
                            item.quantity ||
                            item.qty ||
                            1
                        )

                }));


            /*
             * Optional local cache
             */

            localStorage.setItem(
                "doctorCart",
                JSON.stringify(
                    doctorCart
                )
            );

        }
        else {

            doctorCart = [];

        }


    }
    catch (error) {

        console.error(
            "Cart load error:",
            error
        );

        doctorCart = [];

    }


    updateCartCount();

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const countElement =
        document.getElementById(
            "cartCount"
        );


    if (!countElement) {
        return;
    }


    const count =
        doctorCart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.qty ||
                        item.quantity ||
                        0
                    );

            },
            0
        );


    countElement.textContent =
        count;

}


/* =====================================================
   ADD TO CART - DATABASE
===================================================== */

async function addToCart(productId) {

    try {

        console.log(
            "ADD TO CART PRODUCT ID:",
            productId
        );


        const product =
            products.find(
                item =>
                    String(item.id) ===
                    String(productId)
            );


        if (!product) {

            alert(
                "Product not found"
            );

            return;

        }


        if (
            Number(product.stock || 0) <= 0
        ) {

            alert(
                "Product is out of stock"
            );

            return;

        }


        /*
         * Check current quantity
         */

        const existing =
            doctorCart.find(
                item =>
                    String(
                        item.productId ||
                        item.id
                    ) ===
                    String(product.id)
            );


        if (existing) {

            const currentQty =
                Number(
                    existing.qty ||
                    existing.quantity ||
                    0
                );


            if (
                currentQty >=
                Number(product.stock)
            ) {

                alert(
                    "Maximum available stock reached"
                );

                return;

            }

        }


        /*
         * SEND PRODUCT TO DATABASE
         */

        const response =
            await fetch(
                "/api/cart",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            productId:
                                String(
                                    product.id
                                ),

                            name:
                                product.name,

                            price:
                                Number(
                                    product.price ||
                                    0
                                ),

                            image:
                                product.image ||
                                "",

                            quantity: 1

                        })

                }
            );


        const data =
            await response.json();


        console.log(
            "ADD CART RESPONSE:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            alert(
                data.message ||
                "Failed to add product to cart"
            );

            return;

        }


        /*
         * IMPORTANT:
         * Use database response as
         * the current cart.
         */

        if (
            Array.isArray(data.cart)
        ) {

            doctorCart =
                data.cart.map(item => ({

                    id:
                        String(
                            item.productId ||
                            item.id ||
                            ""
                        ),

                    productId:
                        String(
                            item.productId ||
                            item.id ||
                            ""
                        ),

                    name:
                        item.name ||
                        "Product",

                    price:
                        Number(
                            item.price || 0
                        ),

                    image:
                        item.image || "",

                    qty:
                        Number(
                            item.quantity ||
                            item.qty ||
                            1
                        ),

                    quantity:
                        Number(
                            item.quantity ||
                            item.qty ||
                            1
                        )

                }));

        }


        /*
         * Local cache only.
         * Main cart is MongoDB.
         */

        localStorage.setItem(
            "doctorCart",
            JSON.stringify(
                doctorCart
            )
        );


        updateCartCount();


        alert(
            product.name +
            " added to cart"
        );


    }
    catch (error) {

        console.error(
            "ADD TO CART ERROR:",
            error
        );


        alert(
            "Unable to add product to cart"
        );

    }

}


/* =====================================================
   FILTER
===================================================== */

function filterProducts() {

    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const category =
        document
            .getElementById(
                "categoryFilter"
            )
            .value
            .toLowerCase();


    const company =
        document
            .getElementById(
                "companyFilter"
            )
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(
            "#productsGrid .product-card"
        );


    let visible = 0;


    cards.forEach(card => {

        const name =
            (
                card.dataset.name ||
                ""
            ).toLowerCase();


        const cardCategory =
            (
                card.dataset.category ||
                ""
            ).toLowerCase();


        const cardCompany =
            (
                card.dataset.company ||
                ""
            ).toLowerCase();


        const matchSearch =
            !search ||
            name.includes(search);


        const matchCategory =
            !category ||
            cardCategory === category;


        const matchCompany =
            !company ||
            cardCompany === company;


        const show =
            matchSearch &&
            matchCategory &&
            matchCompany;


        card.style.display =
            show
                ? ""
                : "none";


        if (show) {
            visible++;
        }

    });


    document
        .getElementById(
            "productCount"
        )
        .textContent =
            visible +
            " Products";


    document
        .getElementById(
            "trendingSection"
        )
        .style.display =
            (
                search ||
                category ||
                company
            )
                ? "none"
                : "";


    document
        .getElementById(
            "premiumSection"
        )
        .style.display =
            (
                search ||
                category ||
                company
            )
                ? "none"
                : "";


    document
        .getElementById(
            "outStockSection"
        )
        .style.display =
            (
                search ||
                category ||
                company
            )
                ? "none"
                : "";


}


/* =====================================================
   RESET
===================================================== */

function resetFilters() {

    document
        .getElementById(
            "searchInput"
        )
        .value = "";


    document
        .getElementById(
            "categoryFilter"
        )
        .value = "";


    document
        .getElementById(
            "companyFilter"
        )
        .value = "";


    filterProducts();

}


/* =====================================================
   EVENTS
===================================================== */

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "input",
        filterProducts
    );


document
    .getElementById(
        "categoryFilter"
    )
    .addEventListener(
        "change",
        filterProducts
    );


document
    .getElementById(
        "companyFilter"
    )
    .addEventListener(
        "change",
        filterProducts
    );


/* =====================================================
   INIT
===================================================== */

loadCart();

</script>


</body>

</html>

    `;

}


module.exports =
    DoctorDashboard;