// Shopping Cart object
const shoppingCart = {
    items: [],

    // Function to add a product to the cart
    addToCart: function (productName, price) {
        const item = {
            name: productName,
            price: price,
        };
        this.items.push(item);
        this.updateCartCount();
        console.log(`Added ${productName} to the cart. Price: $${price}`);
    },

    // Function to remove a product from the cart
    removeFromCart: function (productName) {
        const index = this.items.findIndex(item => item.name === productName);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.updateCartCount();
            console.log(`Removed ${productName} from the cart.`);
            // After removing, update the cart preview
            showCartPreview();
        }
    },

    // Function to update the cart count in the UI
    updateCartCount: function () {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.items.length.toString();
        }
    },

    // Function to view the items in the cart
    viewCart: function () {
        console.log('Items in the cart:');
        this.items.forEach(item => {
            console.log(`${item.name} - $${item.price}`);
        });
    },
};

// Function to handle the "Add to Cart" button click
function handleAddToCart(productName, price) {
    shoppingCart.addToCart(productName, price);
}

// Function to handle the "Remove from Cart" button click
function handleRemoveFromCart(productName) {
    shoppingCart.removeFromCart(productName);
}

// Function to handle the "View Cart" button click
function handleViewCart() {
    showCartPreview();
}

// Function to show the cart preview
function showCartPreview() {
    const cartPreview = document.getElementById('cart-preview');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Populate the cart preview with items
    shoppingCart.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemName = document.createElement('span');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        // Add a "Remove" button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => handleRemoveFromCart(item.name);

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });

    // Display the total amount
    const cartTotal = shoppingCart.items.reduce((total, item) => total + item.price, 0);
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;

    // Show the cart preview
    cartPreview.style.display = 'block';
}

// Function to close the cart preview
function closeCartPreview() {
    const cartPreview = document.getElementById('cart-preview');
    cartPreview.style.display = 'none';
}

// Add an event listener to the "Close" button in the cart preview
document.getElementById('close-cart-preview').addEventListener('click', closeCartPreview);

// Function to show products based on the selected category
function showCategory(category) {
    // Hide all product containers
    const productContainers = document.querySelectorAll('.product-container');
    productContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Show the selected category
    const selectedCategory = document.getElementById(category);
    if (selectedCategory) {
        selectedCategory.style.display = 'flex';
    }
}

// Function to add a fade-in effect to elements with the "fade-in" class
function addFadeInEffect() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = 1;
    });
}

// Add the fade-in effect when the page is loaded
document.addEventListener('DOMContentLoaded', addFadeInEffect);
