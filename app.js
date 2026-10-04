/* =========================================================
   MMM SUPER MARKET - POS MANAGEMENT SYSTEM
   script.js
========================================================= */


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_PRODUCTS = [
    { id: 1, name: "Rice 5kg", price: 1250, stock: 45, category: "Grocery" },
    { id: 2, name: "Sugar 1kg", price: 280, stock: 80, category: "Grocery" },
    { id: 3, name: "Milk Powder", price: 1150, stock: 30, category: "Dairy" },
    { id: 4, name: "Biscuits", price: 180, stock: 100, category: "Snacks" },
    { id: 5, name: "Coca Cola", price: 250, stock: 65, category: "Drinks" },
    { id: 6, name: "Bread", price: 180, stock: 35, category: "Bakery" },
    { id: 7, name: "Eggs 10", price: 450, stock: 50, category: "Dairy" },
    { id: 8, name: "Cooking Oil", price: 750, stock: 25, category: "Grocery" },
    { id: 9, name: "Noodles", price: 160, stock: 70, category: "Grocery" }
];

const DEFAULT_CUSTOMERS = [
    {
        id: 1,
        name: "Walk-in Customer",
        phone: "-",
        email: "-",
        address: "-"
    }
];


/* =========================================================
   LOCAL STORAGE
========================================================= */

function read(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {
        console.error("Storage read error:", error);
        return fallback;
    }
}


function write(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.error("Storage write error:", error);
    }
}


function products() {

    let data = read(
        "mmm_products",
        DEFAULT_PRODUCTS
    );

    if (!Array.isArray(data)) {
        data = DEFAULT_PRODUCTS;
        write("mmm_products", data);
    }

    if (!localStorage.getItem("mmm_products")) {
        write("mmm_products", data);
    }

    return data;
}


function customers() {

    let data = read(
        "mmm_customers",
        DEFAULT_CUSTOMERS
    );

    if (!Array.isArray(data)) {
        data = DEFAULT_CUSTOMERS;
        write("mmm_customers", data);
    }

    if (!localStorage.getItem("mmm_customers")) {
        write("mmm_customers", data);
    }

    return data;
}


function sales() {

    const data = read(
        "mmm_sales",
        []
    );

    return Array.isArray(data)
        ? data
        : [];
}


/* =========================================================
   HELPERS
========================================================= */

function money(number) {

    return "Rs. " +
        Number(number || 0).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


function esc(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,
        function (char) {

            const map = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return map[char];
        }
    );
}


function go(page) {
    window.location.href = page;
}


/* =========================================================
   MAIN CSS
========================================================= */

const CSS = `

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #f5f6f8;
    color: #20252b;
}

body {
    min-height: 100vh;
}


/* =========================
   SIDEBAR
========================= */

.side {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    width: 230px;

    background: #252a30;
    color: white;

    padding: 18px 12px;

    display: flex;
    flex-direction: column;

    z-index: 100;
}

.logo {
    font-size: 22px;
    font-weight: 900;

    padding: 10px 12px 22px;

    color: white;
}

.logo span {
    display: block;

    font-size: 9px;

    letter-spacing: 2px;

    color: #c7cbd0;

    margin-top: 4px;
}


.side a {
    color: #dce0e4;

    text-decoration: none;

    padding: 13px 13px;

    border-radius: 8px;

    margin: 3px 0;

    display: flex;

    gap: 11px;

    align-items: center;

    font-size: 14px;

    transition: 0.2s;
}


.side a:hover {
    background: #343a40;
    color: white;
}


.side a.active {
    background: #d97706;
    color: white;
}


.side b {
    width: 22px;

    text-align: center;

    font-size: 17px;
}


.side-bottom {
    margin-top: auto;
}


/* =========================
   MAIN
========================= */

.main {
    margin-left: 230px;

    min-height: 100vh;

    padding: 25px;
}


/* =========================
   TOP BAR
========================= */

.top {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 25px;
}


.top h1 {
    margin: 0;

    font-size: 30px;

    color: #20252b;
}


.top p {
    margin: 6px 0 0;

    color: #7a828a;

    font-size: 14px;
}


.top-actions {
    display: flex;

    gap: 12px;

    align-items: center;
}


.date {
    color: #727980;

    font-size: 13px;
}


/* =========================
   BUTTONS
========================= */

.btn {
    border: 0;

    border-radius: 7px;

    padding: 11px 16px;

    cursor: pointer;

    font-weight: 700;

    font-size: 13px;

    transition: 0.2s;
}


.btn:hover {
    transform: translateY(-1px);
}


.primary {
    background: #d97706;

    color: white;
}


.primary:hover {
    background: #b85f03;
}


.secondary {
    background: #e9ecef;

    color: #333;
}


.secondary:hover {
    background: #dfe3e6;
}


.danger {
    background: #dc2626;

    color: white;
}


/* =========================
   CARDS
========================= */

.card {
    background: white;

    border: 1px solid #e0e3e6;

    border-radius: 10px;

    padding: 20px;

    box-shadow:
        0 2px 7px rgba(0,0,0,0.04);
}


/* =========================
   GRID
========================= */

.grid {
    display: grid;

    gap: 18px;
}


.g4 {
    grid-template-columns:
        repeat(4, 1fr);
}


.g3 {
    grid-template-columns:
        repeat(3, 1fr);
}


.g2 {
    grid-template-columns:
        repeat(2, 1fr);
}


/* =========================
   STATS
========================= */

.stat {
    min-height: 145px;
}


.stat .label {
    color: #7b838b;

    font-size: 12px;

    font-weight: 700;
}


.stat .value {
    font-size: 29px;

    font-weight: 800;

    margin-top: 10px;

    color: #20252b;
}


.stat .sub {
    font-size: 12px;

    color: #92989e;

    margin-top: 7px;
}


/* =========================
   SECTION TITLE
========================= */

.section-title {
    font-size: 19px;

    margin: 0 0 16px;
}


/* =========================
   TABLE
========================= */

.table-card {
    margin-top: 18px;

    padding: 0;

    overflow: hidden;
}


.table-head {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 17px;

    border-bottom:
        1px solid #e1e4e7;
}


.search {
    padding: 10px 12px;

    border:
        1px solid #cbd0d5;

    border-radius: 7px;

    outline: none;

    min-width: 250px;

    font-size: 13px;

    background: white;
}


.search:focus,
input:focus,
select:focus {
    border-color: #d97706;

    box-shadow:
        0 0 0 2px rgba(217,119,6,0.12);
}


.table-wrap {
    overflow-x: auto;
}


table {
    width: 100%;

    border-collapse: collapse;

    min-width: 650px;
}


th,
td {
    padding: 13px 14px;

    border-bottom:
        1px solid #eceef0;

    text-align: left;

    font-size: 13px;
}


th {
    background: #fff7ed;

    color: #7a4b09;

    font-size: 11px;

    text-transform: uppercase;

    letter-spacing: 0.4px;
}


td.num {
    text-align: right;
}


/* =========================
   TAGS
========================= */

.tag {
    padding: 5px 9px;

    border-radius: 20px;

    font-size: 11px;

    background: #fff7ed;

    color: #b45309;

    display: inline-block;
}


.tag.green {
    background: #dcfce7;

    color: #166534;
}


.tag.red {
    background: #fee2e2;

    color: #991b1b;
}


/* =========================
   ACTIONS
========================= */

.actions {
    display: flex;

    gap: 6px;
}


.icon-btn {
    border:
        1px solid #d5d9dd;

    background: white;

    border-radius: 6px;

    padding: 7px 10px;

    cursor: pointer;

    font-size: 12px;
}


.icon-btn:hover {
    background: #fff7ed;

    border-color: #d97706;
}


/* =========================
   FORMS
========================= */

.form-grid {
    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 14px;
}


.field label {
    display: block;

    font-size: 12px;

    color: #68717a;

    margin-bottom: 6px;

    font-weight: 700;
}


.field input,
.field select {
    width: 100%;

    padding: 11px;

    border:
        1px solid #cbd0d5;

    border-radius: 7px;

    outline: none;

    font-size: 13px;
}


.full {
    grid-column: 1 / -1;
}


/* =========================
   MODAL
========================= */

.modal {
    position: fixed;

    inset: 0;

    background:
        rgba(0,0,0,0.55);

    display: none;

    align-items: center;

    justify-content: center;

    padding: 15px;

    z-index: 200;
}


.modal.show {
    display: flex;
}


.modal-box {
    background: white;

    border-radius: 11px;

    width: min(600px, 96vw);

    padding: 22px;

    max-height: 90vh;

    overflow-y: auto;
}


.modal-head {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 18px;
}


.modal-head h2 {
    margin: 0;
}


.close {
    border: 0;

    background: #eee;

    border-radius: 6px;

    width: 34px;

    height: 34px;

    font-size: 22px;

    cursor: pointer;
}


.modal-actions {
    display: flex;

    justify-content: flex-end;

    gap: 8px;

    margin-top: 20px;
}


/* =========================
   EMPTY
========================= */

.empty {
    text-align: center;

    color: #858c93;

    padding: 40px;
}


/* =========================
   LOW STOCK
========================= */

.low {
    color: #b91c1c;

    font-weight: 700;
}


/* =========================
   PROGRESS
========================= */

.progress {
    height: 8px;

    background: #eeeeee;

    border-radius: 10px;

    overflow: hidden;

    margin-top: 7px;
}


.progress i {
    display: block;

    height: 100%;

    background: #d97706;
}


/* =========================
   NOTICE
========================= */

.notice {
    padding: 13px;

    background: #fff7ed;

    border-left:
        4px solid #d97706;

    border-radius: 6px;

    color: #75470b;

    margin-bottom: 18px;

    font-size: 13px;
}


/* =========================
   SALES ITEMS
========================= */

.items-list {
    display: flex;

    flex-direction: column;

    gap: 5px;
}


.item-line {
    background: #f8fafc;

    border-radius: 5px;

    padding: 6px 8px;

    font-size: 12px;

    white-space: nowrap;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 950px) {

    .g4 {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .g3 {
        grid-template-columns:
            repeat(2, 1fr);
    }

}


@media (max-width: 850px) {

    .side {
        width: 68px;

        padding: 12px 7px;
    }


    .logo {
        font-size: 0;

        text-align: center;

        padding:
            10px 0 20px;
    }


    .logo::before {
        content: "MMM";

        font-size: 17px;
    }


    .logo span {
        display: none;
    }


    .side a {
        justify-content: center;

        font-size: 0;
    }


    .side a b {
        font-size: 18px;
    }


    .side-bottom a {
        font-size: 0;
    }


    .main {
        margin-left: 68px;

        padding: 18px;
    }


    .top h1 {
        font-size: 24px;
    }


    .date {
        display: none;
    }

}


@media (max-width: 600px) {

    .g4,
    .g3,
    .g2,
    .form-grid {
        grid-template-columns: 1fr;
    }


    .top {
        align-items: flex-start;

        gap: 10px;
    }


    .top-actions .btn {
        padding: 9px 10px;
    }


    .search {
        min-width: 0;

        width: 100%;
    }


    .table-head {
        gap: 10px;

        align-items: stretch;

        flex-direction: column;
    }


    .main {
        padding: 12px;
    }

}

`;


/* =========================================================
   SIDEBAR
========================================================= */

function nav(active) {

    const links = [

        ["dashboard.html", "▦", "Dashboard"],

        ["sales.html", "🛒", "New Sale"],

        ["products.html", "▤", "Products"],

        ["stock.html", "📦", "Stock"],

        ["customers.html", "👥", "Customers"],

        ["sales-history.html", "🧾", "Sales History"],

        ["reports.html", "📊", "Reports"]

    ];


    return `
        <aside class="side">

            <div class="logo">
                MMM
                <span>SUPER MARKET</span>
            </div>

            ${links.map(function (item) {

                return `
                    <a
                        href="${item[0]}"
                        class="${active === item[2] ? "active" : ""}"
                    >
                        <b>${item[1]}</b>
                        <span>${item[2]}</span>
                    </a>
                `;

            }).join("")}

            <div class="side-bottom">

                <a href="MMM Super Market Login.html">
                    <b>↪</b>
                    <span>Logout</span>
                </a>

            </div>

        </aside>
    `;
}


/* =========================================================
   PAGE SHELL
========================================================= */

function shell(title, active, content) {

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
    MMM Super Market - ${esc(title)}
</title>

<style>

${CSS}

</style>

</head>

<body>

${nav(active)}

<main class="main">

    <header class="top">

        <div>

            <h1>
                ${esc(title)}
            </h1>

            <p>
                MMM Super Market POS Management
            </p>

        </div>


        <div class="top-actions">

            <span
                class="date"
                id="today"
            ></span>


            <button
                class="btn primary"
                onclick="location.href='sales.html'"
            >
                + New Sale
            </button>

        </div>

    </header>


    ${content}

</main>


<script>

document.getElementById("today").textContent =
    new Date().toLocaleDateString();

</script>

</body>

</html>
`;
}


/* =========================================================
   DASHBOARD
========================================================= */

function dashboardPage() {

    const p = products();
    const s = sales();
    const c = customers();

    /* =========================
       BASIC CALCULATIONS
    ========================= */

    const revenue = s.reduce(
        function (total, sale) {
            return total + Number(sale.total || 0);
        },
        0
    );

    const items = p.reduce(
        function (total, product) {
            return total + Number(product.stock || 0);
        },
        0
    );

    const today = new Date();

    const todaySalesList = s.filter(
        function (sale) {

            if (!sale.date) {
                return false;
            }

            return new Date(
                sale.date
            ).toDateString() ===
            today.toDateString();

        }
    );

    const todaySales = todaySalesList.reduce(
        function (total, sale) {
            return total + Number(sale.total || 0);
        },
        0
    );

    const todayBills = todaySalesList.length;

    const todayItems = todaySalesList.reduce(
        function (total, sale) {

            if (!Array.isArray(sale.items)) {
                return total;
            }

            return total +
                sale.items.reduce(
                    function (sum, item) {
                        return sum +
                            Number(item.quantity || 0);
                    },
                    0
                );

        },
        0
    );

    const lowStock = p.filter(
        function (product) {
            return Number(product.stock || 0) <= 10;
        }
    );

    const outOfStock = p.filter(
        function (product) {
            return Number(product.stock || 0) <= 0;
        }
    );

    const recent = s
        .slice()
        .reverse()
        .slice(0, 5);


    /* =========================
       TOP SELLING PRODUCTS
    ========================= */

    const soldProducts = {};

    s.forEach(
        function (sale) {

            if (!Array.isArray(sale.items)) {
                return;
            }

            sale.items.forEach(
                function (item) {

                    const name =
                        item.name ||
                        "Unknown Product";

                    const quantity =
                        Number(item.quantity || 0);

                    soldProducts[name] =
                        (soldProducts[name] || 0) +
                        quantity;

                }
            );

        }
    );

    const topProducts =
        Object.entries(soldProducts)
            .sort(
                function (a, b) {
                    return b[1] - a[1];
                }
            )
            .slice(0, 5);


    /* =========================
       DASHBOARD HTML
    ========================= */

    return shell(
        "Dashboard",
        "Dashboard",

        `

        <!-- =========================
             WELCOME
        ========================= -->

        <div
            class="card"
            style="
                margin-bottom:18px;
                padding:24px;
                background:linear-gradient(
                    135deg,
                    #ffffff 0%,
                    #fffaf5 100%
                );
            "
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:20px;
                    flex-wrap:wrap;
                "
            >

                <div>

                    <div
                        style="
                            font-size:12px;
                            font-weight:700;
                            color:#d97706;
                            letter-spacing:.6px;
                            margin-bottom:7px;
                        "
                    >
                        MMM SUPER MARKET
                    </div>

                    <h2
                        style="
                            margin:0;
                            font-size:27px;
                            color:#20252b;
                        "
                    >
                        Welcome back, Muba 👋
                    </h2>

                    <p
                        style="
                            margin:8px 0 0;
                            color:#7a828a;
                            font-size:13px;
                        "
                    >
                        Here's what's happening in your supermarket today.
                    </p>

                </div>


                <div
                    style="
                        display:flex;
                        gap:9px;
                        flex-wrap:wrap;
                    "
                >

                    <button
                        class="btn primary"
                        onclick="location.href='sales.html'"
                    >
                        + New Sale
                    </button>

                    <button
                        class="btn secondary"
                        onclick="location.href='products.html'"
                    >
                        Products
                    </button>

                </div>

            </div>

        </div>


        <!-- =========================
             ALERT
        ========================= -->

        ${
            outOfStock.length

            ?

            `
            <div
                class="notice"
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                "
            >

                <span>
                    <b>${outOfStock.length}</b>
                    product${outOfStock.length > 1 ? "s are" : " is"}
                    out of stock.
                </span>

                <button
                    class="btn secondary"
                    onclick="location.href='stock.html'"
                >
                    Check Stock
                </button>

            </div>
            `

            :

            lowStock.length

            ?

            `
            <div
                class="notice"
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                "
            >

                <span>
                    <b>${lowStock.length}</b>
                    product${lowStock.length > 1 ? "s are" : " is"}
                    running low on stock.
                </span>

                <button
                    class="btn secondary"
                    onclick="location.href='stock.html'"
                >
                    Check Stock
                </button>

            </div>
            `

            :

            ""
        }


        <!-- =========================
             MAIN STATS
        ========================= -->

        <div class="grid g4">


            <div class="card stat">

                <div class="label">
                    TODAY SALES
                </div>

                <div class="value">
                    ${money(todaySales)}
                </div>

                <div class="sub">
                    ${todayBills}
                    bill${todayBills !== 1 ? "s" : ""}
                    today
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    TOTAL SALES
                </div>

                <div class="value">
                    ${money(revenue)}
                </div>

                <div class="sub">
                    ${s.length} invoices
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    PRODUCTS
                </div>

                <div class="value">
                    ${p.length}
                </div>

                <div class="sub">
                    ${items} units in stock
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    CUSTOMERS
                </div>

                <div class="value">
                    ${c.length}
                </div>

                <div class="sub">
                    Registered customers
                </div>

            </div>

        </div>


        <!-- =========================
             TODAY PERFORMANCE
        ========================= -->

        <div
            class="card"
            style="
                margin-top:18px;
                padding:20px;
            "
        >

            <h2 class="section-title">
                Today's Performance
            </h2>


            <div
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(3,1fr);
                    gap:12px;
                "
            >


                <div
                    style="
                        padding:16px;
                        background:#f8fafc;
                        border-radius:8px;
                        border:1px solid #eceef0;
                    "
                >

                    <div
                        style="
                            font-size:11px;
                            color:#7b838b;
                            font-weight:700;
                        "
                    >
                        BILLS TODAY
                    </div>

                    <div
                        style="
                            font-size:23px;
                            font-weight:800;
                            margin-top:7px;
                        "
                    >
                        ${todayBills}
                    </div>

                </div>


                <div
                    style="
                        padding:16px;
                        background:#f8fafc;
                        border-radius:8px;
                        border:1px solid #eceef0;
                    "
                >

                    <div
                        style="
                            font-size:11px;
                            color:#7b838b;
                            font-weight:700;
                        "
                    >
                        ITEMS SOLD
                    </div>

                    <div
                        style="
                            font-size:23px;
                            font-weight:800;
                            margin-top:7px;
                        "
                    >
                        ${todayItems}
                    </div>

                </div>


                <div
                    style="
                        padding:16px;
                        background:#f8fafc;
                        border-radius:8px;
                        border:1px solid #eceef0;
                    "
                >

                    <div
                        style="
                            font-size:11px;
                            color:#7b838b;
                            font-weight:700;
                        "
                    >
                        LOW STOCK
                    </div>

                    <div
                        style="
                            font-size:23px;
                            font-weight:800;
                            margin-top:7px;
                        "
                    >
                        ${lowStock.length}
                    </div>

                </div>


            </div>

        </div>


        <!-- =========================
             RECENT SALES + LOW STOCK
        ========================= -->

        <div
            class="grid g2"
            style="margin-top:18px"
        >


            <!-- RECENT SALES -->

            <div class="card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:16px;
                    "
                >

                    <h2
                        class="section-title"
                        style="margin:0"
                    >
                        Recent Sales
                    </h2>

                    <button
                        class="icon-btn"
                        onclick="location.href='sales-history.html'"
                    >
                        View All
                    </button>

                </div>


                <div class="table-wrap">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Invoice
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Total
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                recent.length

                                ?

                                recent.map(
                                    function (sale) {

                                        return `

                                            <tr>

                                                <td>
                                                    <b>
                                                        ${esc(
                                                            sale.invoiceNumber ||
                                                            "INV"
                                                        )}
                                                    </b>
                                                </td>

                                                <td>
                                                    ${
                                                        sale.date
                                                        ?
                                                        new Date(
                                                            sale.date
                                                        ).toLocaleDateString()
                                                        :
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    <b>
                                                        ${money(
                                                            sale.total
                                                        )}
                                                    </b>
                                                </td>

                                            </tr>

                                        `;

                                    }
                                ).join("")

                                :

                                `
                                    <tr>

                                        <td
                                            colspan="3"
                                            class="empty"
                                        >
                                            No sales yet
                                        </td>

                                    </tr>
                                `
                            }

                        </tbody>

                    </table>

                </div>

            </div>


            <!-- LOW STOCK -->

            <div class="card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:16px;
                    "
                >

                    <h2
                        class="section-title"
                        style="margin:0"
                    >
                        Low Stock
                    </h2>

                    <button
                        class="icon-btn"
                        onclick="location.href='stock.html'"
                    >
                        Manage
                    </button>

                </div>


                ${
                    lowStock.length

                    ?

                    lowStock
                        .slice(0, 6)
                        .map(
                            function (product) {

                                const stock =
                                    Number(
                                        product.stock || 0
                                    );

                                const percentage =
                                    Math.min(
                                        100,
                                        Math.max(
                                            5,
                                            stock * 10
                                        )
                                    );

                                return `

                                    <div
                                        style="
                                            margin-bottom:16px;
                                        "
                                    >

                                        <div
                                            style="
                                                display:flex;
                                                justify-content:space-between;
                                                gap:10px;
                                                font-size:13px;
                                            "
                                        >

                                            <span>
                                                <b>
                                                    ${esc(
                                                        product.name
                                                    )}
                                                </b>
                                            </span>

                                            <strong class="low">
                                                ${stock} left
                                            </strong>

                                        </div>


                                        <div class="progress">

                                            <i
                                                style="
                                                    width:${percentage}%;
                                                "
                                            ></i>

                                        </div>

                                    </div>

                                `;

                            }
                        ).join("")

                    :

                    `
                        <div class="empty">
                            All products have healthy stock.
                        </div>
                    `
                }

            </div>

        </div>


        <!-- =========================
             TOP PRODUCTS
        ========================= -->

        <div
            class="card"
            style="margin-top:18px"
        >

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:16px;
                "
            >

                <h2
                    class="section-title"
                    style="margin:0"
                >
                    Top Selling Products
                </h2>

                <span
                    style="
                        font-size:12px;
                        color:#92989e;
                    "
                >
                    Based on sales
                </span>

            </div>


            ${
                topProducts.length

                ?

                `<div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(5,1fr);
                        gap:12px;
                    "
                >

                    ${
                        topProducts.map(
                            function (item, index) {

                                const max =
                                    topProducts[0][1] || 1;

                                const percentage =
                                    Math.max(
                                        10,
                                        (
                                            item[1] /
                                            max
                                        ) * 100
                                    );

                                return `

                                    <div
                                        style="
                                            padding:16px;
                                            background:#f8fafc;
                                            border:
                                                1px solid #eceef0;
                                            border-radius:8px;
                                        "
                                    >

                                        <div
                                            style="
                                                font-size:11px;
                                                color:#92989e;
                                                font-weight:700;
                                            "
                                        >
                                            #${index + 1}
                                        </div>


                                        <div
                                            style="
                                                margin-top:8px;
                                                font-size:13px;
                                                font-weight:700;
                                                min-height:32px;
                                            "
                                        >
                                            ${esc(item[0])}
                                        </div>


                                        <div
                                            style="
                                                margin-top:10px;
                                                font-size:18px;
                                                font-weight:800;
                                            "
                                        >
                                            ${item[1]}
                                        </div>


                                        <div
                                            style="
                                                font-size:10px;
                                                color:#92989e;
                                                margin-top:2px;
                                            "
                                        >
                                            units sold
                                        </div>


                                        <div class="progress">

                                            <i
                                                style="
                                                    width:${percentage}%;
                                                "
                                            ></i>

                                        </div>

                                    </div>

                                `;

                            }
                        ).join("")
                    }

                </div>`

                :

                `
                    <div class="empty">
                        No sales data available yet.
                    </div>
                `
            }

        </div>


        <!-- =========================
             QUICK INFORMATION
        ========================= -->

        <div
            class="grid g3"
            style="margin-top:18px"
        >


            <div class="card">

                <div class="label">
                    TOTAL INVOICES
                </div>

                <div
                    style="
                        font-size:25px;
                        font-weight:800;
                        margin-top:8px;
                    "
                >
                    ${s.length}
                </div>

                <div class="sub">
                    All completed transactions
                </div>

            </div>


            <div class="card">

                <div class="label">
                    OUT OF STOCK
                </div>

                <div
                    style="
                        font-size:25px;
                        font-weight:800;
                        margin-top:8px;
                    "
                >
                    ${outOfStock.length}
                </div>

                <div class="sub">
                    Products requiring restock
                </div>

            </div>


            <div class="card">

                <div class="label">
                    STOCK UNITS
                </div>

                <div
                    style="
                        font-size:25px;
                        font-weight:800;
                        margin-top:8px;
                    "
                >
                    ${items}
                </div>

                <div class="sub">
                    Total units currently available
                </div>

            </div>


        </div>

        `
    );
}


/* =========================================================
   PRODUCTS
========================================================= */

function productsPage() {

    return shell(
        "Products",
        "Products",

        `

        <div class="card">

            <div
                style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                align-items:center;
                margin-bottom:16px;
                "
            >

                <input
                    class="search"
                    id="ps"
                    placeholder="Search products..."
                    oninput="renderProducts()"
                >


                <button
                    class="btn primary"
                    onclick="openProductForm()"
                >
                    + Add Product
                </button>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Product</th>

                            <th>Category</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody id="productRows"></tbody>

                </table>

            </div>

        </div>


        <div
            class="modal"
            id="pm"
        >

            <div class="modal-box">

                <div class="modal-head">

                    <h2 id="ptitle">
                        Add Product
                    </h2>

                    <button
                        class="close"
                        onclick="closeProductForm()"
                    >
                        ×
                    </button>

                </div>


                <form onsubmit="saveProduct(event)">

                    <input
                        type="hidden"
                        id="pid"
                    >


                    <div class="form-grid">


                        <div class="field">

                            <label>
                                Product Name
                            </label>

                            <input
                                id="pname"
                                required
                            >

                        </div>


                        <div class="field">

                            <label>
                                Category
                            </label>

                            <input
                                id="pcat"
                                required
                            >

                        </div>


                        <div class="field">

                            <label>
                                Price
                            </label>

                            <input
                                id="pprice"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                            >

                        </div>


                        <div class="field">

                            <label>
                                Stock
                            </label>

                            <input
                                id="pstock"
                                type="number"
                                min="0"
                                required
                            >

                        </div>

                    </div>


                    <div class="modal-actions">

                        <button
                            type="button"
                            class="btn secondary"
                            onclick="closeProductForm()"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            class="btn primary"
                        >
                            Save Product
                        </button>

                    </div>

                </form>

            </div>

        </div>

        `
    );
}


/* =========================================================
   PRODUCT FUNCTIONS
========================================================= */

function renderProducts() {

    const searchBox =
        document.getElementById("ps");

    const rows =
        document.getElementById("productRows");


    if (!searchBox || !rows) {
        return;
    }


    const q =
        (searchBox.value || "")
        .toLowerCase()
        .trim();


    const list =
        products().filter(function (product) {

            return (
                String(product.name)
                    .toLowerCase()
                    .includes(q)
            )

            ||

            (
                String(product.category || "")
                    .toLowerCase()
                    .includes(q)
            );

        });


    rows.innerHTML = list.map(
        function (product) {

            return `

                <tr>

                    <td>
                        #${product.id}
                    </td>

                    <td>
                        <b>
                            ${esc(product.name)}
                        </b>
                    </td>

                    <td>
                        ${esc(product.category)}
                    </td>

                    <td>
                        ${money(product.price)}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>

                        <span
                            class="tag ${
                                Number(product.stock) <= 10
                                ? "red"
                                : "green"
                            }"
                        >

                            ${
                                Number(product.stock) <= 10
                                ? "Low Stock"
                                : "In Stock"
                            }

                        </span>

                    </td>

                    <td>

                        <button
                            class="icon-btn"
                            onclick="editProduct(${product.id})"
                        >
                            Edit
                        </button>


                        <button
                            class="icon-btn"
                            onclick="deleteProduct(${product.id})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }
    ).join("");


    if (!rows.innerHTML) {

        rows.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty"
                >
                    No products found.
                </td>

            </tr>

        `;
    }
}


function openProductForm(id) {

    const modal =
        document.getElementById("pm");

    if (!modal) {
        return;
    }


    modal.classList.add("show");


    document.getElementById("ptitle")
        .textContent =
        id
        ? "Edit Product"
        : "Add Product";


    document.getElementById("pid")
        .value = id || "";


    const product =
        products().find(
            function (item) {
                return item.id == id;
            }
        );


    document.getElementById("pname")
        .value =
        product
        ? product.name
        : "";


    document.getElementById("pcat")
        .value =
        product
        ? product.category
        : "Grocery";


    document.getElementById("pprice")
        .value =
        product
        ? product.price
        : "";


    document.getElementById("pstock")
        .value =
        product
        ? product.stock
        : "";
}


function closeProductForm() {

    const modal =
        document.getElementById("pm");

    if (modal) {
        modal.classList.remove("show");
    }
}


function editProduct(id) {
    openProductForm(id);
}


function saveProduct(event) {

    event.preventDefault();


    let list = products();


    const id =
        Number(
            document.getElementById("pid").value
        );


    const data = {

        name:
            document.getElementById("pname")
                .value
                .trim(),

        category:
            document.getElementById("pcat")
                .value
                .trim(),

        price:
            Number(
                document.getElementById("pprice")
                    .value
            ),

        stock:
            Number(
                document.getElementById("pstock")
                    .value
            )

    };


    if (!data.name) {
        alert("Please enter product name.");
        return;
    }


    if (id) {

        const index =
            list.findIndex(
                function (item) {
                    return item.id === id;
                }
            );


        if (index !== -1) {

            list[index] = {
                ...list[index],
                ...data
            };

        }

    } else {

        const newId =
            list.length

            ?

            Math.max.apply(
                null,
                list.map(function (item) {
                    return Number(item.id) || 0;
                })
            ) + 1

            :

            1;


        data.id = newId;

        list.push(data);
    }


    write(
        "mmm_products",
        list
    );


    closeProductForm();

    renderProducts();
}


function deleteProduct(id) {

    const product =
        products().find(
            function (item) {
                return item.id === id;
            }
        );


    if (!product) {
        return;
    }


    const ok =
        confirm(
            "Delete " +
            product.name +
            "?"
        );


    if (!ok) {
        return;
    }


    const updated =
        products().filter(
            function (item) {
                return item.id !== id;
            }
        );


    write(
        "mmm_products",
        updated
    );


    renderProducts();
}


/* =========================================================
   STOCK PAGE
========================================================= */

function stockPage() {

    return shell(
        "Stock",
        "Stock",

        `

        <div class="notice">

            Stock changes are saved in your browser
            and shared with the Products and POS pages.

        </div>


        <div class="card table-card">

            <div class="table-head">

                <h2
                    class="section-title"
                    style="margin:0"
                >
                    Current Stock
                </h2>


                <input
                    class="search"
                    id="ss"
                    placeholder="Search stock..."
                    oninput="renderStock()"
                >

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Product
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Current Stock
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Update
                            </th>

                        </tr>

                    </thead>


                    <tbody id="stockRows"></tbody>

                </table>

            </div>

        </div>

        `
    );
}


function renderStock() {

    const search =
        document.getElementById("ss");

    const rows =
        document.getElementById("stockRows");


    if (!search || !rows) {
        return;
    }


    const q =
        (search.value || "")
            .toLowerCase()
            .trim();


    const list =
        products().filter(
            function (product) {

                return String(product.name)
                    .toLowerCase()
                    .includes(q);

            }
        );


    rows.innerHTML =
        list.map(
            function (product) {

                return `

                    <tr>

                        <td>
                            <b>
                                ${esc(product.name)}
                            </b>
                        </td>

                        <td>
                            ${esc(product.category)}
                        </td>

                        <td>

                            <b
                                class="${
                                    Number(product.stock) <= 10
                                    ? "low"
                                    : ""
                                }"
                            >
                                ${product.stock}
                            </b>

                        </td>


                        <td>

                            <span
                                class="tag ${
                                    Number(product.stock) <= 10
                                    ? "red"
                                    : "green"
                                }"
                            >

                                ${
                                    Number(product.stock) <= 10
                                    ? "Low"
                                    : "Available"
                                }

                            </span>

                        </td>


                        <td>

                            <button
                                class="icon-btn"
                                onclick="changeStock(${product.id}, 1)"
                            >
                                +1
                            </button>


                            <button
                                class="icon-btn"
                                onclick="changeStock(${product.id}, -1)"
                            >
                                −1
                            </button>


                            <button
                                class="icon-btn"
                                onclick="setStock(${product.id})"
                            >
                                Set
                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");
}


function changeStock(id, amount) {

    const list = products();


    const product =
        list.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!product) {
        return;
    }


    product.stock =
        Math.max(
            0,
            Number(product.stock || 0) +
            Number(amount || 0)
        );


    write(
        "mmm_products",
        list
    );


    renderStock();
}


function setStock(id) {

    const list = products();


    const product =
        list.find(
            function (item) {
                return item.id === id;
            }
        );


    if (!product) {
        return;
    }


    const value =
        prompt(
            "Enter new stock quantity:",
            product.stock
        );


    if (value === null) {
        return;
    }


    const number =
        Number(value);


    if (
        !Number.isFinite(number) ||
        number < 0
    ) {

        alert(
            "Please enter a valid stock number."
        );

        return;
    }


    product.stock =
        Math.floor(number);


    write(
        "mmm_products",
        list
    );


    renderStock();
}


/* =========================================================
   CUSTOMERS PAGE
========================================================= */

function customersPage() {

    return shell(
        "Customers",
        "Customers",

        `

        <div class="card">

            <div
                style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                margin-bottom:16px;
                align-items:center;
                "
            >

                <input
                    class="search"
                    id="cs"
                    placeholder="Search customers..."
                    oninput="renderCustomers()"
                >


                <button
                    class="btn primary"
                    onclick="openCustomer()"
                >
                    + Add Customer
                </button>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Phone</th>

                            <th>Email</th>

                            <th>Address</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody id="customerRows"></tbody>

                </table>

            </div>

        </div>


        <div
            class="modal"
            id="cm"
        >

            <div class="modal-box">

                <div class="modal-head">

                    <h2>
                        Customer
                    </h2>


                    <button
                        class="close"
                        onclick="closeCustomer()"
                    >
                        ×
                    </button>

                </div>


                <form onsubmit="saveCustomer(event)">

                    <input
                        type="hidden"
                        id="cid"
                    >


                    <div class="form-grid">


                        <div class="field">

                            <label>
                                Name
                            </label>

                            <input
                                id="cname"
                                required
                            >

                        </div>


                        <div class="field">

                            <label>
                                Phone
                            </label>

                            <input id="cphone">

                        </div>


                        <div class="field">

                            <label>
                                Email
                            </label>

                            <input
                                id="cemail"
                                type="email"
                            >

                        </div>


                        <div class="field">

                            <label>
                                Address
                            </label>

                            <input id="caddress">

                        </div>

                    </div>


                    <div class="modal-actions">

                        <button
                            type="button"
                            class="btn secondary"
                            onclick="closeCustomer()"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            class="btn primary"
                        >
                            Save Customer
                        </button>

                    </div>

                </form>

            </div>

        </div>

        `
    );
}


/* =========================================================
   CUSTOMER FUNCTIONS
========================================================= */

function renderCustomers() {

    const search =
        document.getElementById("cs");

    const rows =
        document.getElementById("customerRows");


    if (!search || !rows) {
        return;
    }


    const q =
        (search.value || "")
            .toLowerCase()
            .trim();


    const list =
        customers().filter(
            function (customer) {

                return (

                    String(customer.name || "")
                        .toLowerCase()
                        .includes(q)

                    ||

                    String(customer.phone || "")
                        .toLowerCase()
                        .includes(q)

                    ||

                    String(customer.email || "")
                        .toLowerCase()
                        .includes(q)

                );

            }
        );


    rows.innerHTML =
        list.map(
            function (customer) {

                return `

                    <tr>

                        <td>
                            #${customer.id}
                        </td>


                        <td>
                            <b>
                                ${esc(customer.name)}
                            </b>
                        </td>


                        <td>
                            ${esc(customer.phone)}
                        </td>


                        <td>
                            ${esc(customer.email)}
                        </td>


                        <td>
                            ${esc(customer.address)}
                        </td>


                        <td>

                            <button
                                class="icon-btn"
                                onclick="editCustomer(${customer.id})"
                            >
                                Edit
                            </button>


                            ${
                                customer.id !== 1

                                ?

                                `
                                    <button
                                        class="icon-btn"
                                        onclick="deleteCustomer(${customer.id})"
                                    >
                                        Delete
                                    </button>
                                `

                                :

                                ""
                            }

                        </td>

                    </tr>

                `;

            }
        ).join("");
}


function openCustomer(id) {

    const modal =
        document.getElementById("cm");


    if (!modal) {
        return;
    }


    modal.classList.add("show");


    document.getElementById("cid")
        .value = id || "";


    const customer =
        customers().find(
            function (item) {
                return item.id == id;
            }
        );


    document.getElementById("cname")
        .value =
        customer
        ? customer.name
        : "";


    document.getElementById("cphone")
        .value =
        customer
        ? customer.phone
        : "";


    document.getElementById("cemail")
        .value =
        customer
        ? customer.email
        : "";


    document.getElementById("caddress")
        .value =
        customer
        ? customer.address
        : "";
}


function closeCustomer() {

    const modal =
        document.getElementById("cm");


    if (modal) {
        modal.classList.remove("show");
    }
}


function editCustomer(id) {
    openCustomer(id);
}


function saveCustomer(event) {

    event.preventDefault();


    const list =
        customers();


    const id =
        Number(
            document.getElementById("cid")
                .value
        );


    const data = {

        name:
            document.getElementById("cname")
                .value
                .trim(),

        phone:
            document.getElementById("cphone")
                .value
                .trim() || "-",

        email:
            document.getElementById("cemail")
                .value
                .trim() || "-",

        address:
            document.getElementById("caddress")
                .value
                .trim() || "-"

    };


    if (!data.name) {

        alert(
            "Please enter customer name."
        );

        return;
    }


    if (id) {

        const customer =
            list.find(
                function (item) {
                    return item.id === id;
                }
            );


        if (customer) {
            Object.assign(
                customer,
                data
            );
        }

    } else {

        const newId =
            list.length

            ?

            Math.max.apply(
                null,
                list.map(function (item) {
                    return Number(item.id) || 0;
                })
            ) + 1

            :

            1;


        data.id = newId;

        list.push(data);
    }


    write(
        "mmm_customers",
        list
    );


    closeCustomer();

    renderCustomers();
}


function deleteCustomer(id) {

    if (id === 1) {

        alert(
            "Walk-in Customer cannot be deleted."
        );

        return;
    }


    const ok =
        confirm(
            "Delete this customer?"
        );


    if (!ok) {
        return;
    }


    const updated =
        customers().filter(
            function (customer) {
                return customer.id !== id;
            }
        );


    write(
        "mmm_customers",
        updated
    );


    renderCustomers();
}


/* =========================================================
   SALES HISTORY PAGE
========================================================= */

function historyPage() {

    return shell(
        "Sales History",
        "Sales History",

        `

        <div class="card">

            <div class="table-head">

                <h2
                    class="section-title"
                    style="margin:0"
                >
                    All Sales
                </h2>


                <input
                    class="search"
                    id="hs"
                    placeholder="Search invoice..."
                    oninput="renderHistory()"
                >

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Invoice
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Items
                            </th>

                            <th>
                                Subtotal
                            </th>

                            <th>
                                Discount
                            </th>

                            <th>
                                Total
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>


                    <tbody id="historyRows"></tbody>

                </table>

            </div>

        </div>

        `
    );
}


function renderHistory() {

    const search =
        document.getElementById("hs");

    const rows =
        document.getElementById("historyRows");


    if (!search || !rows) {
        return;
    }


    const q =
        (search.value || "")
            .toLowerCase()
            .trim();


    const list =
        sales()
            .slice()
            .reverse()
            .filter(
                function (sale) {

                    return String(
                        sale.invoiceNumber || ""
                    )
                    .toLowerCase()
                    .includes(q);

                }
            );


    rows.innerHTML =
        list.map(
            function (sale) {

                return `

                    <tr>

                        <td>
                            <b>
                                ${esc(
                                    sale.invoiceNumber || "INV"
                                )}
                            </b>
                        </td>


                        <td>
                            ${
                                sale.date
                                ?
                                new Date(
                                    sale.date
                                ).toLocaleString()
                                :
                                "-"
                            }
                        </td>


                        <td>

                            <div class="items-list">

                                ${
                                    Array.isArray(sale.items) &&
                                    sale.items.length

                                    ?

                                    sale.items.map(
                                        function (item) {

                                            return `

                                                <div class="item-line">

                                                    ${esc(
                                                        item.name ||
                                                        "Unknown Product"
                                                    )}

                                                    ×

                                                    ${
                                                        Number(
                                                            item.quantity || 0
                                                        )
                                                    }

                                                </div>

                                            `;

                                        }
                                    ).join("")

                                    :

                                    "<span>-</span>"
                                }

                            </div>

                        </td>


                        <td>
                            ${money(sale.subtotal)}
                        </td>


                        <td>
                            ${money(sale.discount)}
                        </td>


                        <td>
                            <b>
                                ${money(sale.total)}
                            </b>
                        </td>


                        <td>

                            <button
                                class="icon-btn"
                                onclick="viewSale(${sale.id})"
                            >
                                View
                            </button>

                        </td>

                    </tr>

                `;

            }
        ).join("");


    if (!rows.innerHTML) {

        rows.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty"
                >
                    No sales recorded yet.
                    Complete a sale from New Sale.
                </td>

            </tr>

        `;
    }
}


function viewSale(id) {

    const sale =
        sales().find(
            function (item) {
                return item.id === id;
            }
        );


    if (!sale) {
        return;
    }


    let itemText = "No items";


    if (
        Array.isArray(sale.items) &&
        sale.items.length
    ) {

        itemText =
            sale.items.map(
                function (item) {

                    return (
                        (item.name || "Unknown Product") +
                        " x " +
                        (Number(item.quantity) || 0)
                    );

                }
            ).join("\n");
    }


    alert(

        (sale.invoiceNumber || "INV") +

        "\n\n" +

        "Customer: " +
        (sale.customerName || "Walk-in Customer") +

        "\n" +

        "Salesman: " +
        (sale.salesman || "-") +

        "\n\n" +

        "Subtotal: " +
        money(sale.subtotal) +

        "\n" +

        "Discount: " +
        money(sale.discount) +

        "\n" +

        "Total: " +
        money(sale.total) +

        "\n" +

        "Cash: " +
        money(sale.cash) +

        "\n" +

        "Balance: " +
        money(sale.balance) +

        "\n\n" +

        itemText

    );
}


/* =========================================================
   REPORTS PAGE
========================================================= */

function reportsPage() {

    const saleList = sales();

    const productList = products();


    const revenue =
        saleList.reduce(
            function (total, sale) {

                return total +
                    Number(sale.total || 0);

            },
            0
        );


    const discount =
        saleList.reduce(
            function (total, sale) {

                return total +
                    Number(sale.discount || 0);

            },
            0
        );


    const counts = {};


    saleList.forEach(
        function (sale) {

            if (!Array.isArray(sale.items)) {
                return;
            }


            sale.items.forEach(
                function (item) {

                    const name =
                        item.name ||
                        "Unknown Product";


                    const quantity =
                        Number(item.quantity) || 0;


                    counts[name] =
                        (counts[name] || 0) +
                        quantity;

                }
            );

        }
    );


    const top =
        Object.entries(counts)
            .sort(
                function (a, b) {
                    return b[1] - a[1];
                }
            )
            .slice(0, 6);


    const stockValue =
        productList.reduce(
            function (total, product) {

                return total +
                    (
                        Number(product.price || 0) *
                        Number(product.stock || 0)
                    );

            },
            0
        );


    return shell(
        "Reports",
        "Reports",

        `

        <div class="grid g4">


            <div class="card stat">

                <div class="label">
                    REVENUE
                </div>

                <div class="value">
                    ${money(revenue)}
                </div>

                <div class="sub">
                    All completed sales
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    INVOICES
                </div>

                <div class="value">
                    ${saleList.length}
                </div>

                <div class="sub">
                    Completed transactions
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    DISCOUNTS
                </div>

                <div class="value">
                    ${money(discount)}
                </div>

                <div class="sub">
                    Total discount given
                </div>

            </div>


            <div class="card stat">

                <div class="label">
                    STOCK VALUE
                </div>

                <div class="value">
                    ${money(stockValue)}
                </div>

                <div class="sub">
                    Current stock at selling price
                </div>

            </div>

        </div>


        <div
            class="grid g2"
            style="margin-top:18px"
        >


            <div class="card">

                <h2 class="section-title">
                    Top Selling Products
                </h2>


                ${
                    top.length

                    ?

                    top.map(
                        function (item) {

                            const percentage =
                                top[0][1] > 0

                                ?

                                Math.max(
                                    8,
                                    (
                                        item[1] /
                                        top[0][1]
                                    ) * 100
                                )

                                :

                                8;


                            return `

                                <div
                                    style="
                                    margin:15px 0;
                                    "
                                >

                                    <div
                                        style="
                                        display:flex;
                                        justify-content:space-between;
                                        font-size:13px;
                                        "
                                    >

                                        <span>
                                            ${esc(item[0])}
                                        </span>

                                        <b>
                                            ${item[1]} units
                                        </b>

                                    </div>


                                    <div class="progress">

                                        <i
                                            style="
                                            width:${percentage}%;
                                            "
                                        ></i>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                    :

                    `
                        <div class="empty">
                            No sales data yet.
                        </div>
                    `
                }

            </div>


            <div class="card">

                <h2 class="section-title">
                    Inventory Summary
                </h2>


                <div class="table-wrap">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Stock
                                </th>

                                <th>
                                    Value
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${
                                productList
                                    .slice(0, 8)
                                    .map(
                                        function (product) {

                                            return `

                                                <tr>

                                                    <td>
                                                        ${esc(product.name)}
                                                    </td>

                                                    <td
                                                        class="${
                                                            Number(product.stock) <= 10
                                                            ? "low"
                                                            : ""
                                                        }"
                                                    >
                                                        ${product.stock}
                                                    </td>

                                                    <td>
                                                        ${money(
                                                            Number(product.price || 0) *
                                                            Number(product.stock || 0)
                                                        )}
                                                    </td>

                                                </tr>

                                            `;

                                        }
                                    ).join("")
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

        `
    );
}


/* =========================================================
   INITIAL PAGE LOADING
========================================================= */

function loadPage() {

    const path =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (path === "dashboard.html") {

        document.open();
        document.write(
            dashboardPage()
        );
        document.close();

        return;
    }


    if (path === "products.html") {

        document.open();
        document.write(
            productsPage()
        );
        document.close();

        setTimeout(
            renderProducts,
            0
        );

        return;
    }


    if (path === "stock.html") {

        document.open();
        document.write(
            stockPage()
        );
        document.close();

        setTimeout(
            renderStock,
            0
        );

        return;
    }


    if (path === "customers.html") {

        document.open();
        document.write(
            customersPage()
        );
        document.close();

        setTimeout(
            renderCustomers,
            0
        );

        return;
    }


    if (path === "sales-history.html") {

        document.open();
        document.write(
            historyPage()
        );
        document.close();

        setTimeout(
            renderHistory,
            0
        );

        return;
    }


    if (path === "reports.html") {

        document.open();
        document.write(
            reportsPage()
        );
        document.close();

        return;
    }
}


/* =========================================================
   START
========================================================= */

loadPage();