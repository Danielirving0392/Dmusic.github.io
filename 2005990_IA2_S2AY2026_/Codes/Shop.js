// Handles product display, cart storage, and cart rendering

// Product catalog
let Products = [
    { id: 1, Image: "../Assets/Products/Fender.webp",    name: "Fender Bass Guitar",  price: 850,  description: "A classic 4-string electric bass with a punchy, warm tone and simple single split-coil pickup design." },
    { id: 2, Image: "../Assets/Products/sire.webp",      name: "Sire Bass Guitar",    price: 1400, description: "A high-end bass offering premium features like roasted maple necks and active/passive preamps at an affordable price." },
    { id: 3, Image: "../Assets/Products/drum.jpg",       name: "PDP Drum Set",        price: 2000, description: "A compact beginner/intermediate kit with multi-ply poplar shells delivering warm, full tone across music styles." },
    { id: 4, Image: "../Assets/Products/drum_tampa.png", name: "Tampa Drum Set",      price: 1750, description: "A ready-to-play complete kit with poplar shells, sturdy hardware, and a Meinl cymbal pack included." },
    { id: 5, Image: "../Assets/Products/MONTAGE.jpg",    name: "Montage Keyboards",   price: 3500, description: "A flagship synthesizer with a triple-engine design and up to 400 notes of polyphony." },
    { id: 6, Image: "../Assets/Products/nord.jpg",       name: "Nord Keyboard",       price: 4000, description: "A professional stage keyboard with a triple-engine Piano/Organ/Synth design and dedicated physical controls." },
    { id: 7, Image: "../Assets/Products/ibanez.jpg",     name: "Ibanez Guitar",       price: 1200, description: "A fast-playing Japanese 'Superstrat' with a thin neck, versatile pickups, and a locking tremolo for tuning stability." },
    { id: 8, Image: "../Assets/Products/fender.jpg",     name: "Fender Guitar",       price: 1000, description: "An iconic double-cutaway guitar with three single-coil pickups and a tremolo system, known for its versatility." },
    { id: 9, Image: "../Assets/Products/cables.png",     name: "Instrument Cables",   price: 25,   description: "High-quality cables for clear sound transmission." },
    { id: 10, Image: "../Assets/Products/tuner.jpg",     name: "Tuner",               price: 20,   description: "An accurate tuner for perfect pitch." }
];

// Save the full catalog so other pages can reference it
localStorage.setItem("Allproducts", JSON.stringify(Products));

// Build and insert a card for each product on the Shop page
function displayProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;
    productList.innerHTML = "";

    Products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "Products";
        productDiv.innerHTML = `
            <img src="${product.Image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toLocaleString()}</p>
            <p class="description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Get the cart array from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save the cart array to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a product to the cart, or increase its quantity if it's already there
function addToCart(id) {
    const item = Products.find((product) => product.id === id);
    if (!item) return;

    let cart = getCart();
    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
        alert(`${item.name} added to cart!`);
    }

    saveCart(cart);
}

// Read the cart from localStorage and render it into the cart table
function renderCart() {
    const tbody = document.querySelector("#cart-body tbody");
    if (!tbody) return;

    const cart = getCart();
    tbody.innerHTML = "";

    // Show a message if the cart is empty
    if (cart.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 6;
        td.className = "cart-empty";
        td.innerHTML = `Your cart is empty. <a href="Shop.html">Browse the shop</a>`;
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    // Build a row for each item in the cart
    cart.forEach((item) => {
        const lineTotal = item.price * item.quantity;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
            <td><img class="Cart_img" src="${item.Image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toLocaleString()}</td>
            <td>
                <div class="qty-cell">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
                </div>
            </td>
            <td>$${lineTotal.toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Remove an item from the cart by id and refresh the table
function removeFromCart(id) {
    let cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
    renderCart();
}

// Increase or decrease an item's quantity; remove it if it reaches zero
function updateQty(id, delta) {
    let cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== id);
    }

    saveCart(cart);
    renderCart();
}

// Run on page load — display products on the Shop page and render the cart on the Cart page
window.onload = function () {
    displayProducts();
    renderCart();
};
