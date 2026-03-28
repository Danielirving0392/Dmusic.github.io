// Handles the checkout page — order summary, live change calculation, and form validation

// Load the cart from localStorage on page load
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let totalCost = 0;

// Build the order summary table from the cart
function renderCart() {
    const tbody = document.getElementById('cart-summary');
    totalCost = 0;

    // Show an empty message if there are no items
    if (!cart.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="cart-empty-msg">Your cart is empty.</td></tr>';
        document.getElementById('cart-total').textContent = '$0.00';
        return;
    }

    // Build a row for each cart item and accumulate the total
    tbody.innerHTML = cart.map(item => {
        const subtotal = (item.price || 0) * (item.quantity || 1);
        totalCost += subtotal;
        return `
            <tr>
                <td><img class="Cart_img" src="${item.Image || ''}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${(item.price || 0).toFixed(2)}</td>
                <td>${item.quantity || 1}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    document.getElementById('cart-total').textContent = '$' + totalCost.toFixed(2);
}

// Recalculate and show the change due whenever the payment amount changes
document.getElementById('amount').addEventListener('input', function () {
    const paid   = parseFloat(this.value) || 0;
    const change = paid - totalCost;
    const display = document.getElementById('change-display');

    if (paid === 0) {
        display.textContent = '';
        display.style.color = '';
    } else if (change < 0) {
        // Amount is too low — show the shortfall in red
        display.textContent = 'Amount too low by $' + Math.abs(change).toFixed(2);
        display.style.color = '#c0392b';
    } else {
        // Show the change due in green
        display.textContent = 'Change: $' + change.toFixed(2);
        display.style.color = '#27ae60';
    }
});

// Validate shipping details and show a confirmation summary
function confirmOrder() {
    const name    = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const amount  = parseFloat(document.getElementById('amount').value) || 0;

    // All fields must be filled and the amount must cover the total
    if (!name || !address) {
        alert('Please fill in your name and address.');
        return;
    }
    if (amount < totalCost) {
        alert('Amount paid is less than the total cost.');
        return;
    }
    if (!cart.length) {
        alert('Your cart is empty.');
        return;
    }

    const change = (amount - totalCost).toFixed(2);
    alert(`Order confirmed for ${name}!\nTotal: $${totalCost.toFixed(2)}\nChange: $${change}`);
}

// Go back to the cart page
function cancelOrder() {
    if (confirm('Cancel and return to cart?')) {
        window.location.href = 'Cart.html';
    }
}

// Clear the cart and reset all form fields
function clearAll() {
    if (confirm('Clear all items from your cart?')) {
        localStorage.removeItem('cart');
        cart = [];
        renderCart();
        document.getElementById('name').value           = '';
        document.getElementById('address').value        = '';
        document.getElementById('amount').value         = '';
        document.getElementById('change-display').textContent = '';
    }
}

// Validate everything, then complete the order and redirect home
function checkout() {
    const name    = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const amount  = parseFloat(document.getElementById('amount').value) || 0;

    if (!name || !address) {
        alert('Please fill in your shipping details before checking out.');
        return;
    }
    if (amount < totalCost) {
        alert('Amount paid is less than the total cost.');
        return;
    }
    if (!cart.length) {
        alert('Your cart is empty.');
        return;
    }

    // Clear the cart and thank the customer
    localStorage.removeItem('cart');
    alert('Thank you for your order, ' + name + '! Your items will be shipped to:\n' + address);
    window.location.href = 'index.html';
}

// Close the checkout page and return to the cart
function closePage() {
    window.location.href = 'Cart.html';
}

// Render the order summary when the page first loads
renderCart();
