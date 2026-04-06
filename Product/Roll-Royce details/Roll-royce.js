function addToCart(name, price, image) {
    // Get the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create a new cart item
    let car = {
        name: name,
        price: price,
        image: image,
        quantity: 1 // Default quantity
    };

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already exists
    } else {
        cart.push(car);
    }

    // Store updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to Cart Page
    window.location.href = "/ecom-website/Cart/Cart.html";
}
