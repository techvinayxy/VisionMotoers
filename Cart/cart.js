// Selectors
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");
const errorMessageContainer = document.getElementById("error-message");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to format numbers into crore/lakh
function formatIndianCurrency(value) {
    if (value >= 1e7) return `₹ ${(value / 1e7).toFixed(2)} crore`;
    if (value >= 1e5) return `₹ ${(value / 1e5).toFixed(2)} lakh`;
    return `₹ ${value.toLocaleString("en-IN")}`;
}

// Function to render cart items
function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear previous content
    errorMessageContainer.innerHTML = ""; // Clear error message

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.textContent = "₹ 0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        // Ensure quantity is valid
        if (!item.quantity || isNaN(item.quantity)) {
            item.quantity = 1;
        }
        
        // Extract numeric price value
        let itemPrice = Number(item.price.replace(/[^\d.]/g, "")) || 0;
        let itemTotal = itemPrice * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100">
            <h4>${item.name}</h4>
            <p>Price: ${formatIndianCurrency(itemPrice)} x ${item.quantity}</p>
            <button class="increase-qty" data-index="${index}">+</button>
            <button class="decrease-qty" data-index="${index}">-</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Log total for debugging
    console.log("Total before formatting:", total);
    
    // Correctly format the total price
    cartTotalElement.textContent = formatIndianCurrency(total);

    // Add event listeners to buttons
    document.querySelectorAll(".increase-qty").forEach(button => {
        button.addEventListener("click", () => changeQuantity(button.getAttribute("data-index"), 1));
    });

    document.querySelectorAll(".decrease-qty").forEach(button => {
        button.addEventListener("click", () => changeQuantity(button.getAttribute("data-index"), -1));
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => removeItem(button.getAttribute("data-index")));
    });
}

// Function to change item quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is zero
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render the cart
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove the item from the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    renderCart(); // Re-render the cart
}

// Checkout button functionality
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        errorMessageContainer.textContent = "Error: Your cart is empty. Please add items to the cart.";
        errorMessageContainer.style.color = "red";
    } else {
        errorMessageContainer.textContent = "Server is down now. Try again later.";
        errorMessageContainer.style.color = "orange";
    }
});

// Initial render
renderCart();

