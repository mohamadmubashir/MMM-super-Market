/* =========================================================
   MMM SUPER MARKET - SALES / POS JAVASCRIPT
   Works with the current sales.html
========================================================= */

let products = [];
let cart = [];
let selectedItemIndex = -1;

let customer = "Walk-in Customer";
let salesman = "Administrator";
let discountAmount = 0;

let invoiceNumber =
    localStorage.getItem("mmm_invoice") || "INV-000001";


/* =========================================================
   DEFAULT PRODUCT DATABASE
========================================================= */

const DEFAULT_PRODUCTS = [
    {id:"P001",name:"Rice 5kg",price:1250,stock:45,barcode:"890000000001"},
    {id:"P002",name:"Rice 10kg",price:2450,stock:30,barcode:"890000000002"},
    {id:"P003",name:"Nadu Rice 5kg",price:1380,stock:35,barcode:"890000000003"},
    {id:"P004",name:"Samba Rice 5kg",price:1450,stock:40,barcode:"890000000004"},
    {id:"P005",name:"Keeri Samba 5kg",price:1750,stock:25,barcode:"890000000005"},

    {id:"P006",name:"White Sugar 1kg",price:280,stock:80,barcode:"890000000006"},
    {id:"P007",name:"Brown Sugar 1kg",price:340,stock:55,barcode:"890000000007"},
    {id:"P008",name:"Dhal 1kg",price:420,stock:60,barcode:"890000000008"},
    {id:"P009",name:"Green Gram 500g",price:390,stock:42,barcode:"890000000009"},
    {id:"P010",name:"Chickpeas 500g",price:360,stock:40,barcode:"890000000010"},
    {id:"P011",name:"Red Lentils 1kg",price:450,stock:50,barcode:"890000000011"},
    {id:"P012",name:"Wheat Flour 1kg",price:260,stock:70,barcode:"890000000012"},
    {id:"P013",name:"Kurakkan Flour 500g",price:310,stock:38,barcode:"890000000013"},
    {id:"P014",name:"Corn Flour 500g",price:290,stock:35,barcode:"890000000014"},
    {id:"P015",name:"Coconut Powder 250g",price:330,stock:32,barcode:"890000000015"},

    {id:"P016",name:"Cooking Oil 1L",price:750,stock:25,barcode:"890000000016"},
    {id:"P017",name:"Coconut Oil 750ml",price:920,stock:28,barcode:"890000000017"},
    {id:"P018",name:"Sunflower Oil 1L",price:980,stock:22,barcode:"890000000018"},
    {id:"P019",name:"Salt 1kg",price:180,stock:90,barcode:"890000000019"},
    {id:"P020",name:"Iodized Salt 1kg",price:210,stock:65,barcode:"890000000020"},

    {id:"P021",name:"Black Pepper 100g",price:280,stock:30,barcode:"890000000021"},
    {id:"P022",name:"Chilli Powder 100g",price:220,stock:45,barcode:"890000000022"},
    {id:"P023",name:"Turmeric Powder 100g",price:190,stock:50,barcode:"890000000023"},
    {id:"P024",name:"Curry Powder 100g",price:200,stock:55,barcode:"890000000024"},
    {id:"P025",name:"Cinnamon 50g",price:250,stock:25,barcode:"890000000025"},
    {id:"P026",name:"Cardamom 25g",price:420,stock:20,barcode:"890000000026"},
    {id:"P027",name:"Cloves 25g",price:350,stock:22,barcode:"890000000027"},

    {id:"P028",name:"Tea 200g",price:480,stock:45,barcode:"890000000028"},
    {id:"P029",name:"Tea 400g",price:880,stock:30,barcode:"890000000029"},
    {id:"P030",name:"Coffee 100g",price:420,stock:35,barcode:"890000000030"},
    {id:"P031",name:"Coffee 200g",price:790,stock:24,barcode:"890000000031"},

    {id:"P032",name:"Noodles 400g",price:160,stock:70,barcode:"890000000032"},
    {id:"P033",name:"Vermicelli 400g",price:240,stock:40,barcode:"890000000033"},
    {id:"P034",name:"Pasta 500g",price:420,stock:35,barcode:"890000000034"},
    {id:"P035",name:"Tomato Sauce 500g",price:480,stock:38,barcode:"890000000035"},
    {id:"P036",name:"Chilli Sauce 250g",price:320,stock:35,barcode:"890000000036"},
    {id:"P037",name:"Soy Sauce 250ml",price:350,stock:30,barcode:"890000000037"},
    {id:"P038",name:"Vinegar 500ml",price:290,stock:40,barcode:"890000000038"},
    {id:"P039",name:"Coconut Milk 400ml",price:280,stock:50,barcode:"890000000039"},
    {id:"P040",name:"Canned Fish 425g",price:650,stock:32,barcode:"890000000040"},

    {id:"P041",name:"Corned Beef 340g",price:920,stock:20,barcode:"890000000041"},
    {id:"P042",name:"Green Peas 400g",price:430,stock:30,barcode:"890000000042"},
    {id:"P043",name:"Red Beans 500g",price:390,stock:35,barcode:"890000000043"},
    {id:"P044",name:"Mung Beans 500g",price:410,stock:32,barcode:"890000000044"},
    {id:"P045",name:"Jelly 200g",price:350,stock:30,barcode:"890000000045"},
    {id:"P046",name:"Honey 500g",price:1150,stock:20,barcode:"890000000046"},
    {id:"P047",name:"Peanut Butter 340g",price:980,stock:25,barcode:"890000000047"},
    {id:"P048",name:"Mayonnaise 500g",price:720,stock:30,barcode:"890000000048"},
    {id:"P049",name:"Ketchup 500g",price:520,stock:38,barcode:"890000000049"},
    {id:"P050",name:"Mustard Sauce 250g",price:390,stock:26,barcode:"890000000050"},

    {id:"P051",name:"Milk Powder 400g",price:1150,stock:30,barcode:"890000000051"},
    {id:"P052",name:"Milk Powder 1kg",price:2750,stock:20,barcode:"890000000052"},
    {id:"P053",name:"Full Cream Milk 1L",price:480,stock:40,barcode:"890000000053"},
    {id:"P054",name:"Fresh Milk 500ml",price:260,stock:50,barcode:"890000000054"},
    {id:"P055",name:"Chocolate Milk 500ml",price:320,stock:35,barcode:"890000000055"},
    {id:"P056",name:"Yoghurt Cup",price:90,stock:80,barcode:"890000000056"},
    {id:"P057",name:"Vanilla Yoghurt",price:110,stock:60,barcode:"890000000057"},
    {id:"P058",name:"Strawberry Yoghurt",price:120,stock:55,barcode:"890000000058"},
    {id:"P059",name:"Cheese 200g",price:850,stock:25,barcode:"890000000059"},
    {id:"P060",name:"Processed Cheese 500g",price:1450,stock:20,barcode:"890000000060"},

    {id:"P061",name:"Butter 100g",price:450,stock:40,barcode:"890000000061"},
    {id:"P062",name:"Butter 200g",price:820,stock:30,barcode:"890000000062"},
    {id:"P063",name:"Margarine 250g",price:360,stock:45,barcode:"890000000063"},
    {id:"P064",name:"Margarine 500g",price:650,stock:30,barcode:"890000000064"},
    {id:"P065",name:"Curd 500ml",price:250,stock:45,barcode:"890000000065"},
    {id:"P066",name:"Whipping Cream 200ml",price:620,stock:20,barcode:"890000000066"},
    {id:"P067",name:"Cooking Cream 200ml",price:580,stock:22,barcode:"890000000067"},
    {id:"P068",name:"Milk Drink Chocolate",price:300,stock:35,barcode:"890000000068"},
    {id:"P069",name:"Milk Drink Vanilla",price:300,stock:32,barcode:"890000000069"},
    {id:"P070",name:"Custard Powder 100g",price:180,stock:50,barcode:"890000000070"},

    {id:"P071",name:"Milkshake Mix 200g",price:450,stock:28,barcode:"890000000071"},
    {id:"P072",name:"Condensed Milk 390g",price:620,stock:30,barcode:"890000000072"},
    {id:"P073",name:"Evaporated Milk 400ml",price:480,stock:25,barcode:"890000000073"},
    {id:"P074",name:"Cream Cheese 200g",price:920,stock:18,barcode:"890000000074"},
    {id:"P075",name:"Mozzarella Cheese 200g",price:1050,stock:18,barcode:"890000000075"},

    {id:"P076",name:"Biscuits 100g",price:180,stock:100,barcode:"890000000076"},
    {id:"P077",name:"Chocolate Biscuits 120g",price:240,stock:70,barcode:"890000000077"},
    {id:"P078",name:"Cream Crackers 125g",price:210,stock:80,barcode:"890000000078"},
    {id:"P079",name:"Chocolate Wafer",price:150,stock:65,barcode:"890000000079"},
    {id:"P080",name:"Vanilla Wafer",price:140,stock:60,barcode:"890000000080"},
    {id:"P081",name:"Potato Chips 100g",price:280,stock:70,barcode:"890000000081"},
    {id:"P082",name:"Potato Chips 150g",price:390,stock:55,barcode:"890000000082"},
    {id:"P083",name:"Cheese Balls 80g",price:250,stock:60,barcode:"890000000083"},
    {id:"P084",name:"Peanut Snacks 100g",price:220,stock:55,barcode:"890000000084"},
    {id:"P085",name:"Cashew 100g",price:750,stock:30,barcode:"890000000085"},
    {id:"P086",name:"Peanuts 200g",price:450,stock:35,barcode:"890000000086"},
    {id:"P087",name:"Mixed Nuts 200g",price:980,stock:25,barcode:"890000000087"},
    {id:"P088",name:"Popcorn 100g",price:220,stock:45,barcode:"890000000088"},
    {id:"P089",name:"Corn Snacks 100g",price:240,stock:50,barcode:"890000000089"},

    {id:"P090",name:"Chocolate Bar",price:180,stock:80,barcode:"890000000090"},
    {id:"P091",name:"Milk Chocolate Bar",price:220,stock:70,barcode:"890000000091"},
    {id:"P092",name:"Dark Chocolate Bar",price:260,stock:55,barcode:"890000000092"},
    {id:"P093",name:"White Chocolate Bar",price:250,stock:50,barcode:"890000000093"},
    {id:"P094",name:"Chocolate Box",price:850,stock:25,barcode:"890000000094"},
    {id:"P095",name:"Jelly Candy 100g",price:180,stock:60,barcode:"890000000095"},
    {id:"P096",name:"Fruit Candy 100g",price:160,stock:70,barcode:"890000000096"},
    {id:"P097",name:"Mint Candy 100g",price:170,stock:65,barcode:"890000000097"},
    {id:"P098",name:"Lollipop Pack",price:250,stock:50,barcode:"890000000098"},
    {id:"P099",name:"Marshmallow 100g",price:280,stock:45,barcode:"890000000099"},
    {id:"P100",name:"Cookies 200g",price:420,stock:40,barcode:"890000000100"},

    {id:"P101",name:"Coca Cola 500ml",price:250,stock:65,barcode:"890000000101"},
    {id:"P102",name:"Coca Cola 1.5L",price:450,stock:45,barcode:"890000000102"},
    {id:"P103",name:"Pepsi 500ml",price:240,stock:60,barcode:"890000000103"},
    {id:"P104",name:"Pepsi 1.5L",price:430,stock:42,barcode:"890000000104"},
    {id:"P105",name:"Sprite 500ml",price:240,stock:55,barcode:"890000000105"},
    {id:"P106",name:"Sprite 1.5L",price:430,stock:40,barcode:"890000000106"},
    {id:"P107",name:"Fanta 500ml",price:240,stock:50,barcode:"890000000107"},
    {id:"P108",name:"Fanta 1.5L",price:430,stock:38,barcode:"890000000108"},
    {id:"P109",name:"Ginger Beer 500ml",price:260,stock:45,barcode:"890000000109"},
    {id:"P110",name:"Soda 500ml",price:180,stock:55,barcode:"890000000110"},

    {id:"P111",name:"Mineral Water 500ml",price:100,stock:100,barcode:"890000000111"},
    {id:"P112",name:"Mineral Water 1.5L",price:180,stock:80,barcode:"890000000112"},
    {id:"P113",name:"Orange Juice 1L",price:620,stock:35,barcode:"890000000113"},
    {id:"P114",name:"Mango Juice 1L",price:650,stock:32,barcode:"890000000114"},
    {id:"P115",name:"Mixed Fruit Juice 1L",price:680,stock:30,barcode:"890000000115"},
    {id:"P116",name:"Apple Juice 1L",price:720,stock:28,barcode:"890000000116"},
    {id:"P117",name:"Energy Drink 250ml",price:320,stock:45,barcode:"890000000117"},
    {id:"P118",name:"Energy Drink 500ml",price:520,stock:35,barcode:"890000000118"},
    {id:"P119",name:"Iced Tea 500ml",price:280,stock:50,barcode:"890000000119"},
    {id:"P120",name:"Lemon Drink 500ml",price:240,stock:45,barcode:"890000000120"},
    {id:"P121",name:"Orange Drink 500ml",price:240,stock:50,barcode:"890000000121"},
    {id:"P122",name:"Malt Drink 500ml",price:420,stock:35,barcode:"890000000122"},
    {id:"P123",name:"Chocolate Drink 500ml",price:380,stock:40,barcode:"890000000123"},
    {id:"P124",name:"Coffee Drink 250ml",price:320,stock:35,barcode:"890000000124"},
    {id:"P125",name:"Sports Drink 500ml",price:350,stock:40,barcode:"890000000125"},

    {id:"P126",name:"Bread 450g",price:180,stock:35,barcode:"890000000126"},
    {id:"P127",name:"Sandwich Bread",price:220,stock:30,barcode:"890000000127"},
    {id:"P128",name:"Brown Bread",price:240,stock:28,barcode:"890000000128"},
    {id:"P129",name:"Whole Wheat Bread",price:280,stock:25,barcode:"890000000129"},
    {id:"P130",name:"Burger Buns",price:300,stock:30,barcode:"890000000130"},
    {id:"P131",name:"Hot Dog Buns",price:320,stock:25,barcode:"890000000131"},
    {id:"P132",name:"Croissant",price:250,stock:25,barcode:"890000000132"},
    {id:"P133",name:"Chocolate Croissant",price:320,stock:20,barcode:"890000000133"},
    {id:"P134",name:"Cup Cake",price:180,stock:35,barcode:"890000000134"},
    {id:"P135",name:"Chocolate Cup Cake",price:220,stock:30,barcode:"890000000135"},
    {id:"P136",name:"Vanilla Cake Slice",price:350,stock:20,barcode:"890000000136"},
    {id:"P137",name:"Chocolate Cake Slice",price:390,stock:20,barcode:"890000000137"},
    {id:"P138",name:"Swiss Roll",price:450,stock:25,barcode:"890000000138"},
    {id:"P139",name:"Chocolate Swiss Roll",price:520,stock:22,barcode:"890000000139"},
    {id:"P140",name:"Donut",price:180,stock:30,barcode:"890000000140"},
    {id:"P141",name:"Chocolate Donut",price:220,stock:28,barcode:"890000000141"},
    {id:"P142",name:"Muffin",price:220,stock:30,barcode:"890000000142"},
    {id:"P143",name:"Chocolate Muffin",price:260,stock:25,barcode:"890000000143"},
    {id:"P144",name:"Garlic Bread",price:350,stock:22,barcode:"890000000144"},
    {id:"P145",name:"Fish Bun",price:250,stock:30,barcode:"890000000145"},
    {id:"P146",name:"Vegetable Bun",price:220,stock:32,barcode:"890000000146"},
    {id:"P147",name:"Sausage Bun",price:280,stock:25,barcode:"890000000147"},
    {id:"P148",name:"Egg Bun",price:250,stock:28,barcode:"890000000148"},
    {id:"P149",name:"Cream Bun",price:220,stock:30,barcode:"890000000149"},
    {id:"P150",name:"Jam Bun",price:220,stock:30,barcode:"890000000150"}
];


/* =========================================================
   PAGE START
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadProducts();

    updateInvoiceDisplay();
    updateCart();
    updateTotals();
    renderQuickStock();
    updateClock();

    setInterval(updateClock, 1000);

    const search = document.getElementById("productSearch");

    if (search) {
        search.focus();
    }

    const cash = document.getElementById("cash");

    if (cash) {
        cash.addEventListener("input", calculateBalance);
    }
});


/* =========================================================
   PRODUCT LOADING
========================================================= */

function normalizeProduct(product, fallback) {

    return {
        id: String(product.id ?? fallback?.id ?? ""),
        name: String(product.name ?? fallback?.name ?? "Unknown Product"),
        price: Number(product.price ?? fallback?.price ?? 0),
        stock: Number(product.stock ?? fallback?.stock ?? 0),
        barcode: String(product.barcode ?? fallback?.barcode ?? "")
    };
}


function loadProducts() {

    let savedProducts = [];

    try {
        savedProducts =
            JSON.parse(localStorage.getItem("mmm_products")) || [];
    } catch (error) {
        savedProducts = [];
    }

    const savedMap = new Map();

    savedProducts.forEach(item => {
        if (item && item.id !== undefined) {
            savedMap.set(String(item.id), item);
        }
    });

    products = DEFAULT_PRODUCTS.map(defaultProduct => {

        const saved = savedMap.get(String(defaultProduct.id));

        if (!saved) {
            return {...defaultProduct};
        }

        return normalizeProduct(saved, defaultProduct);
    });

    /* Keep any extra products that were added elsewhere */
    savedProducts.forEach(saved => {

        if (!saved || saved.id === undefined) return;

        const exists = products.some(
            p => String(p.id) === String(saved.id)
        );

        if (!exists) {
            products.push(normalizeProduct(saved));
        }
    });

    saveProducts();
}


function saveProducts() {

    localStorage.setItem(
        "mmm_products",
        JSON.stringify(products)
    );
}


/* =========================================================
   QUICK STOCK
========================================================= */

function renderQuickStock() {

    const container =
        document.getElementById("quickStockList");

    if (!container) return;

    const items = products.slice(0, 10);

    container.innerHTML = items.map(product => {

        const stockClass =
            product.stock <= 5
                ? "low"
                : "";

        return `
            <div class="quickStockItem">
                <div>
                    <strong>${escapeHtml(product.name)}</strong>
                    <small>${escapeHtml(product.barcode)}</small>
                </div>

                <span class="${stockClass}">
                    ${product.stock}
                </span>
            </div>
        `;

    }).join("");
}


/* =========================================================
   SEARCH
========================================================= */

function showProductSearch() {

    const input =
        document.getElementById("productSearch");

    const results =
        document.getElementById("searchResults");

    if (!input || !results) return;

    const query =
        input.value.trim().toLowerCase();

    if (!query) {
        results.innerHTML = "";
        return;
    }

    const matches = products
        .filter(product => {

            const name =
                String(product.name).toLowerCase();

            const barcode =
                String(product.barcode).toLowerCase();

            const id =
                String(product.id).toLowerCase();

            return (
                name.includes(query) ||
                barcode.includes(query) ||
                id.includes(query)
            );
        })
        .slice(0, 12);

    if (!matches.length) {

        results.innerHTML = `
            <div class="searchResultItem">
                <strong>Product not found</strong>
            </div>
        `;

        return;
    }

    results.innerHTML = matches.map((product, index) => {

        return `
            <div
                class="searchResultItem"
                onclick="addToCartById('${escapeAttribute(product.id)}')"
                data-search-index="${index}"
            >
                <div>
                    <strong>
                        ${highlightText(product.name, query)}
                    </strong>

                    <small>
                        Barcode: ${escapeHtml(product.barcode)}
                        &nbsp; | &nbsp;
                        Stock: ${product.stock}
                    </small>
                </div>

                <span>
                    Rs. ${formatMoney(product.price)}
                </span>
            </div>
        `;

    }).join("");
}


function highlightText(text, query) {

    const safeText = escapeHtml(text);

    if (!query) return safeText;

    const escapedQuery =
        query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    return safeText.replace(
        new RegExp(`(${escapedQuery})`, "gi"),
        "<mark>$1</mark>"
    );
}


function searchKeyDown(event) {

    if (event.key !== "Enter") return;

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    const value =
        input.value.trim().toLowerCase();

    if (!value) return;

    /* Exact barcode first */
    let product = products.find(
        p => String(p.barcode).toLowerCase() === value
    );

    /* Exact product ID */
    if (!product) {
        product = products.find(
            p => String(p.id).toLowerCase() === value
        );
    }

    /* Exact product name */
    if (!product) {
        product = products.find(
            p => String(p.name).toLowerCase() === value
        );
    }

    /* If only one matching product */
    if (!product) {

        const matches = products.filter(p =>
            String(p.name).toLowerCase().includes(value)
        );

        if (matches.length === 1) {
            product = matches[0];
        }
    }

    if (product) {

        addToCart(product);

        input.value = "";
        showProductSearch();

    } else {

        alert("Product not found.");
    }
}


/* =========================================================
   BARCODE BUTTON
========================================================= */

function scanBarcode() {

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    input.focus();
    input.select();

    /*
       Hardware barcode scanners normally type the barcode
       into this input and send ENTER.
    */
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCartById(id) {

    const product =
        products.find(
            p => String(p.id) === String(id)
        );

    if (!product) return;

    addToCart(product);

    const input =
        document.getElementById("productSearch");

    if (input) {
        input.value = "";
    }

    showProductSearch();
}


function addToCart(product) {

    if (!product) return;

    const existingIndex =
        cart.findIndex(
            item =>
                String(item.id) === String(product.id)
        );

    if (product.stock <= 0) {

        alert(
            `${product.name} is out of stock.`
        );

        return;
    }

    if (existingIndex !== -1) {

        const existing =
            cart[existingIndex];

        if (existing.qty >= product.stock) {

            alert(
                `Only ${product.stock} units available.`
            );

            return;
        }

        existing.qty++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            barcode: product.barcode,
            price: Number(product.price),
            qty: 1
        });

    }

    selectedItemIndex =
        existingIndex !== -1
            ? existingIndex
            : cart.length - 1;

    updateCart();
    updateTotals();
}


/* =========================================================
   CART DISPLAY
========================================================= */

function updateCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    if (!cart.length) {

        selectedItemIndex = -1;

        container.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;padding:35px;color:#6b7280;">
                    No items added
                </td>
            </tr>
        `;

        return;
    }

    container.innerHTML = cart.map((item, index) => {

        const lineTotal =
            Number(item.price) * Number(item.qty);

        const selected =
            index === selectedItemIndex
                ? "selected"
                : "";

        return `
            <tr
                class="${selected}"
                onclick="selectCartItem(${index})"
            >
                <td>${index + 1}</td>

                <td>
                    <strong>${escapeHtml(item.name)}</strong>
                    <small>
                        ${escapeHtml(item.barcode)}
                    </small>
                </td>

                <td>
                    Rs. ${formatMoney(item.price)}
                </td>

                <td>
                    <div class="qtyControl">

                        <button
                            type="button"
                            onclick="event.stopPropagation(); changeQty(${index}, -1)"
                        >−</button>

                        <span>${item.qty}</span>

                        <button
                            type="button"
                            onclick="event.stopPropagation(); changeQty(${index}, 1)"
                        >+</button>

                    </div>
                </td>

                <td>
                    Rs. ${formatMoney(lineTotal)}
                </td>

                <td>
                    <button
                        type="button"
                        class="deleteBtn"
                        onclick="event.stopPropagation(); removeItem(${index})"
                    >
                        ✕
                    </button>
                </td>
            </tr>
        `;

    }).join("");
}


function selectCartItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) return;

    selectedItemIndex = index;

    updateCart();
}


function changeQty(index, change) {

    if (!cart[index]) return;

    const product =
        products.find(
            p => String(p.id) === String(cart[index].id)
        );

    if (!product) return;

    const newQty =
        Number(cart[index].qty) + Number(change);

    if (newQty <= 0) {

        removeItem(index);
        return;
    }

    if (newQty > Number(product.stock)) {

        alert(
            `Only ${product.stock} units available.`
        );

        return;
    }

    cart[index].qty = newQty;

    selectedItemIndex = index;

    updateCart();
    updateTotals();
}


function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    if (!cart.length) {

        selectedItemIndex = -1;

    } else if (selectedItemIndex >= cart.length) {

        selectedItemIndex =
            cart.length - 1;
    }

    updateCart();
    updateTotals();
}


function deleteSelectedItem() {

    if (
        selectedItemIndex < 0 ||
        selectedItemIndex >= cart.length
    ) {

        alert("Please select an item first.");

        return;
    }

    removeItem(selectedItemIndex);
}


/* =========================================================
   TOTALS
========================================================= */

function calculateSubtotal() {

    return cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.qty),
        0
    );
}


function calculateTotal() {

    const subtotal =
        calculateSubtotal();

    return Math.max(
        0,
        subtotal - Number(discountAmount || 0)
    );
}


function updateTotals() {

    const subtotal =
        calculateSubtotal();

    const total =
        calculateTotal();

    const subtotalElement =
        document.getElementById("subtotal");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("total");

    if (subtotalElement) {
        subtotalElement.textContent =
            formatMoney(subtotal);
    }

    if (discountElement) {
        discountElement.textContent =
            formatMoney(discountAmount);
    }

    if (totalElement) {
        totalElement.textContent =
            formatMoney(total);
    }

    calculateBalance();
}


/* =========================================================
   CUSTOMER
========================================================= */

function openCustomerModal() {

    const input =
        document.getElementById("customerInput");

    if (input) {
        input.value =
            customer === "Walk-in Customer"
                ? ""
                : customer;
    }

    openModal("customerModal");
}


function saveCustomer() {

    const input =
        document.getElementById("customerInput");

    if (!input) return;

    const value =
        input.value.trim();

    customer =
        value || "Walk-in Customer";

    updateInvoiceDisplay();

    closeModal("customerModal");
}


/* =========================================================
   SALESMAN
========================================================= */

function openSalesmanModal() {

    const input =
        document.getElementById("salesmanInput");

    if (input) {
        input.value = salesman;
    }

    openModal("salesmanModal");
}


function saveSalesman() {

    const input =
        document.getElementById("salesmanInput");

    if (!input) return;

    const value =
        input.value.trim();

    salesman =
        value || "Administrator";

    updateInvoiceDisplay();

    closeModal("salesmanModal");
}


/* =========================================================
   DISCOUNT
========================================================= */

function openDiscountModal() {

    const input =
        document.getElementById("discountInput");

    if (input) {
        input.value =
            discountAmount || "";
    }

    openModal("discountModal");
}


function saveDiscount() {

    const input =
        document.getElementById("discountInput");

    if (!input) return;

    let value =
        Number(input.value);

    if (!Number.isFinite(value) || value < 0) {
        value = 0;
    }

    const subtotal =
        calculateSubtotal();

    if (value > subtotal) {
        value = subtotal;
    }

    discountAmount = value;

    updateTotals();

    closeModal("discountModal");
}


/* =========================================================
   PAYMENT
========================================================= */

function completeSaleAndPrint() {

    if (!cart.length) {

        alert("Please add at least one product.");

        return;
    }

    const total =
        calculateTotal();

    const paymentTotal =
        document.getElementById("paymentTotal");

    const cashInput =
        document.getElementById("cash");

    if (paymentTotal) {
        paymentTotal.textContent =
            formatMoney(total);
    }

    if (cashInput) {
        cashInput.value = "";
    }

    const paymentBalance =
        document.getElementById("paymentBalance");

    if (paymentBalance) {
        paymentBalance.textContent =
            "0.00";
    }

    openModal("paymentModal");

    setTimeout(() => {

        if (cashInput) {
            cashInput.focus();
        }

    }, 100);
}


function calculateBalance() {

    const cashInput =
        document.getElementById("cash");

    const balanceElement =
        document.getElementById("paymentBalance");

    const checkoutBalance =
        document.getElementById("balance");

    if (!cashInput) return;

    const cash =
        Number(cashInput.value) || 0;

    const total =
        calculateTotal();

    const balance =
        Math.max(0, cash - total);

    if (balanceElement) {
        balanceElement.textContent =
            formatMoney(balance);
    }

    if (checkoutBalance) {
        checkoutBalance.textContent =
            formatMoney(balance);
    }

    return balance;
}


function finishCashPayment() {

    if (!cart.length) {

        closeModal("paymentModal");

        alert("Cart is empty.");

        return;
    }

    const cashInput =
        document.getElementById("cash");

    const cash =
        Number(cashInput?.value) || 0;

    const total =
        calculateTotal();

    if (cash < total) {

        alert(
            `Insufficient cash.\n\nRequired: Rs. ${formatMoney(total)}\nReceived: Rs. ${formatMoney(cash)}`
        );

        return;
    }

    saveSale("CASH", cash);
}


/* =========================================================
   CREDIT SALE
========================================================= */

function creditSale() {

    if (!cart.length) {

        alert("Please add at least one product.");

        return;
    }

    const confirmed =
        confirm(
            "Save this transaction as a CREDIT SALE?"
        );

    if (!confirmed) return;

    saveSale("CREDIT", 0);
}


/* =========================================================
   SAVE SALE
========================================================= */

function saveSale(paymentType, cashAmount) {

    if (!cart.length) {

        alert("Cart is empty.");

        return;
    }

    const subtotal =
        calculateSubtotal();

    const total =
        calculateTotal();

    /* Check stock BEFORE changing anything */
    for (const item of cart) {

        const product =
            products.find(
                p =>
                    String(p.id) ===
                    String(item.id)
            );

        if (!product) {

            alert(
                `Product not found: ${item.name}`
            );

            return;
        }

        if (
            Number(item.qty) >
            Number(product.stock)
        ) {

            alert(
                `Not enough stock for ${item.name}.\nAvailable: ${product.stock}`
            );

            return;
        }
    }

    /* Reduce stock */
    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    String(p.id) ===
                    String(item.id)
            );

        if (product) {
            product.stock =
                Number(product.stock) -
                Number(item.qty);
        }
    });

    saveProducts();

    const balance =
        paymentType === "CASH"
            ? Math.max(
                0,
                Number(cashAmount) - total
            )
            : 0;

    const sale = {

        id: Date.now(),

        invoice: invoiceNumber,

        date: new Date().toLocaleString(),

        customer: customer,

        salesman: salesman,

        subtotal: subtotal,

        discount: Number(discountAmount),

        total: total,

        paymentType: paymentType,

        cash: Number(cashAmount) || 0,

        balance: balance,

        items: cart.map(item => ({

            id: item.id,

            name: item.name,

            barcode: item.barcode,

            qty: Number(item.qty),

            quantity: Number(item.qty),

            price: Number(item.price),

            total:
                Number(item.price) *
                Number(item.qty)
        }))
    };


    /* Save sale history */
    let sales = [];

    try {
        sales =
            JSON.parse(
                localStorage.getItem("mmm_sales")
            ) || [];
    } catch (error) {
        sales = [];
    }

    sales.unshift(sale);

    localStorage.setItem(
        "mmm_sales",
        JSON.stringify(sales)
    );


    /* Print */
    printInvoice(sale);


    /* Next invoice */
    invoiceNumber =
        nextInvoiceNumber(invoiceNumber);

    localStorage.setItem(
        "mmm_invoice",
        invoiceNumber
    );


    closeModal("paymentModal");

    newDocument(false);

    renderQuickStock();

    alert(
        `Sale completed successfully.\n\nInvoice: ${sale.invoice}`
    );
}


/* =========================================================
   PRINT INVOICE
========================================================= */

function printInvoice(sale) {

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=500,height=700"
        );

    if (!printWindow) {

        alert(
            "Please allow pop-ups to print the invoice."
        );

        return;
    }

    const itemsHtml =
        sale.items.map(item => `
            <tr>
                <td>${escapeHtml(item.name)}</td>
                <td>${item.qty}</td>
                <td style="text-align:right">
                    Rs. ${formatMoney(item.price)}
                </td>
                <td style="text-align:right">
                    Rs. ${formatMoney(item.total)}
                </td>
            </tr>
        `).join("");


    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>

            <meta charset="UTF-8">

            <title>${escapeHtml(sale.invoice)}</title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #111827;
                }

                .invoice {
                    max-width: 430px;
                    margin: auto;
                }

                h1 {
                    text-align: center;
                    margin: 0;
                    font-size: 24px;
                }

                .sub {
                    text-align: center;
                    color: #666;
                    margin-bottom: 20px;
                }

                .info {
                    font-size: 13px;
                    margin-bottom: 15px;
                    line-height: 1.7;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                }

                th,
                td {
                    padding: 7px 3px;
                    border-bottom: 1px solid #ddd;
                }

                th {
                    text-align: left;
                }

                .totals {
                    margin-top: 15px;
                    margin-left: auto;
                    width: 220px;
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    padding: 4px 0;
                }

                .grand {
                    font-size: 18px;
                    font-weight: bold;
                    border-top: 2px solid #111;
                    margin-top: 5px;
                    padding-top: 8px;
                }

                .footer {
                    text-align: center;
                    margin-top: 25px;
                    font-size: 12px;
                    color: #666;
                }

            </style>

        </head>

        <body>

            <div class="invoice">

                <h1>MMM SUPER MARKET</h1>

                <div class="sub">
                    POINT OF SALE SYSTEM
                </div>

                <div class="info">

                    <strong>Invoice:</strong>
                    ${escapeHtml(sale.invoice)}
                    <br>

                    <strong>Date:</strong>
                    ${escapeHtml(sale.date)}
                    <br>

                    <strong>Customer:</strong>
                    ${escapeHtml(sale.customer)}
                    <br>

                    <strong>Salesman:</strong>
                    ${escapeHtml(sale.salesman)}
                    <br>

                    <strong>Payment:</strong>
                    ${escapeHtml(sale.paymentType)}

                </div>

                <table>

                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${itemsHtml}
                    </tbody>

                </table>

                <div class="totals">

                    <div class="row">
                        <span>Subtotal</span>
                        <span>
                            Rs. ${formatMoney(sale.subtotal)}
                        </span>
                    </div>

                    <div class="row">
                        <span>Discount</span>
                        <span>
                            Rs. ${formatMoney(sale.discount)}
                        </span>
                    </div>

                    <div class="row grand">
                        <span>Total</span>
                        <span>
                            Rs. ${formatMoney(sale.total)}
                        </span>
                    </div>

                    ${
                        sale.paymentType === "CASH"
                        ? `
                            <div class="row">
                                <span>Cash</span>
                                <span>
                                    Rs. ${formatMoney(sale.cash)}
                                </span>
                            </div>

                            <div class="row">
                                <span>Balance</span>
                                <span>
                                    Rs. ${formatMoney(sale.balance)}
                                </span>
                            </div>
                        `
                        : ""
                    }

                </div>

                <div class="footer">
                    Thank you for shopping with us!
                </div>

            </div>

            <script>

                window.onload = function () {

                    window.print();

                    setTimeout(function () {
                        window.close();
                    }, 500);

                };

            <\/script>

        </body>
        </html>
    `);

    printWindow.document.close();
}


/* =========================================================
   NEW DOCUMENT
========================================================= */

function newDocument(ask = true) {

    if (ask && cart.length) {

        const confirmed =
            confirm(
                "Start a new document?\nCurrent cart items will be removed."
            );

        if (!confirmed) return;
    }

    cart = [];

    selectedItemIndex = -1;

    customer =
        "Walk-in Customer";

    salesman =
        "Administrator";

    discountAmount = 0;

    const search =
        document.getElementById("productSearch");

    if (search) {
        search.value = "";
    }

    const results =
        document.getElementById("searchResults");

    if (results) {
        results.innerHTML = "";
    }

    updateInvoiceDisplay();
    updateCart();
    updateTotals();
    renderQuickStock();

    setTimeout(() => {

        if (search) {
            search.focus();
        }

    }, 50);
}


/* =========================================================
   INVOICE DISPLAY
========================================================= */

function updateInvoiceDisplay() {

    const invoiceText =
        document.getElementById("invoiceNoText");

    if (invoiceText) {
        invoiceText.textContent =
            invoiceNumber;
    }

    const invoiceDisplay =
        document.getElementById("invoiceDisplay");

    if (invoiceDisplay) {
        invoiceDisplay.textContent =
            invoiceNumber;
    }

    const salesmanDisplay =
        document.getElementById("salesmanDisplay");

    if (salesmanDisplay) {
        salesmanDisplay.textContent =
            salesman;
    }

    const customerDisplay =
        document.getElementById("customerDisplay");

    if (customerDisplay) {
        customerDisplay.textContent =
            customer;
    }

    const salesmanInput =
        document.getElementById("salesman");

    if (salesmanInput) {
        salesmanInput.value =
            salesman;
    }

    const customerInput =
        document.getElementById("customer");

    if (customerInput) {
        customerInput.value =
            customer;
    }

    const invoiceInput =
        document.getElementById("invoiceNo");

    if (invoiceInput) {
        invoiceInput.value =
            invoiceNumber;
    }
}


/* =========================================================
   INVOICE NUMBER
========================================================= */

function nextInvoiceNumber(current) {

    const match =
        String(current).match(/(\d+)$/);

    if (!match) {
        return "INV-000001";
    }

    const number =
        Number(match[1]) + 1;

    const width =
        match[1].length;

    return (
        String(current).slice(
            0,
            -width
        ) +
        String(number).padStart(
            width,
            "0"
        )
    );
}


/* =========================================================
   SALES HISTORY
========================================================= */

function openHistoryModal() {

    const container =
        document.getElementById("historyList");

    if (!container) return;

    let sales = [];

    try {

        sales =
            JSON.parse(
                localStorage.getItem("mmm_sales")
            ) || [];

    } catch (error) {

        sales = [];
    }


    if (!sales.length) {

        container.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                color:#6b7280;
            ">
                No sales history found.
            </div>
        `;

        openModal("historyModal");

        return;
    }


    container.innerHTML =
        sales.map((sale, index) => {

            const items =
                Array.isArray(sale.items)
                    ? sale.items
                    : [];

            const itemCount =
                items.reduce(
                    (sum, item) =>
                        sum +
                        Number(
                            item.qty ??
                            item.quantity ??
                            0
                        ),
                    0
                );

            return `
                <div class="historyItem">

                    <div>

                        <strong>
                            ${escapeHtml(
                                sale.invoice ||
                                "Invoice"
                            )}
                        </strong>

                        <small>
                            ${escapeHtml(
                                sale.date || ""
                            )}
                        </small>

                        <small>
                            Customer:
                            ${escapeHtml(
                                sale.customer ||
                                "Walk-in Customer"
                            )}
                        </small>

                    </div>

                    <div>

                        <strong>
                            Rs.
                            ${formatMoney(
                                Number(
                                    sale.total || 0
                                )
                            )}
                        </strong>

                        <small>
                            ${itemCount} item(s)
                            &nbsp; • &nbsp;
                            ${escapeHtml(
                                sale.paymentType ||
                                "CASH"
                            )}
                        </small>

                    </div>

                </div>
            `;

        }).join("");


    openModal("historyModal");
}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    /*
       Some designs use display:block instead
       of a .show class.
    */
    modal.style.display = "flex";
}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

    modal.style.display = "none";
}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now =
        new Date();

    clock.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );
}


/* =========================================================
   MONEY
========================================================= */

function formatMoney(number) {

    const value =
        Number(number) || 0;

    return value.toLocaleString(
        "en-LK",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Do not trigger shortcuts while typing
           except Escape.
        */

        const tag =
            document.activeElement?.tagName;

        const typing =
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT";


        if (event.key === "Escape") {

            [
                "paymentModal",
                "customerModal",
                "salesmanModal",
                "discountModal",
                "historyModal"
            ].forEach(closeModal);

            return;
        }


        if (typing) {

            if (event.key === "F2") {
                event.preventDefault();
                focusSearch();
            }

            return;
        }


        switch (event.key) {

            case "F2":
                event.preventDefault();
                focusSearch();
                break;

            case "F4":
                event.preventDefault();
                openCustomerModal();
                break;

            case "F6":
                event.preventDefault();
                openDiscountModal();
                break;

            case "F8":
                event.preventDefault();
                newDocument();
                break;

            case "F10":
                event.preventDefault();
                completeSaleAndPrint();
                break;
        }

    }
);


/* =========================================================
   SEARCH FOCUS
========================================================= */

function focusSearch() {

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    input.focus();
    input.select();
}


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const modals =
            document.querySelectorAll(".modal");

        modals.forEach(modal => {

            if (
                event.target === modal
            ) {

                modal.classList.remove("show");
                modal.style.display = "none";
            }

        });

    }
);


/* =========================================================
   HTML SAFETY HELPERS
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


/* =========================================================
   END
========================================================= */