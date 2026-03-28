// Cart page initialisation
// Shared cart functions (renderCart, removeFromCart, updateQty, getCart, saveCart)
// are defined in Shop.js, which is loaded before this file in Cart.html

window.onload = function () {
    // Populate the cart table when the page loads
    renderCart();
};
