// Product class
class Product {
  constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
  }
}

// ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
  }

  getTotalPrice() {
      return this.product.price * this.quantity;
  }
}

// ShoppingCart class
class ShoppingCart {
  constructor() {
      this.items = [];
  }

  // Add item to cart
  addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.items.push(new ShoppingCartItem(product, quantity));
      }
  }

  // Remove item from cart
  removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Get total price of all items
  getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

//Initialize the shopping cart
const cart = new ShoppingCart();

//Function to get product details from HTML
function getProductFromCard(card) {
  const id = card.getAttribute("data-id");
  const name = card.querySelector(".card-title").innerText;
  const price = parseFloat(card.querySelector(".unit-price").innerText);
  return new Product(id, name, price);
}

// Function to update total price in UI
function updateTotalPrice() {
  document.querySelector(".total").innerText = `$${cart.getTotalPrice().toFixed(2)}`;
}

//Function to update quantity display in UI
function updateQuantityDisplay(card, quantity) {
  card.querySelector(".quantity").innerText = quantity;
}

// Add event listeners to product cards
document.querySelectorAll(".product-card").forEach(card => {
  const product = getProductFromCard(card);
  
  //add (+) button
  card.querySelector(".add-btn").addEventListener("click", () => {
      cart.addItem(product, 1);
      const item = cart.items.find(item => item.product.id === product.id);
      updateQuantityDisplay(card, item.quantity);
      updateTotalPrice();
  });

  //Handle remove
  card.querySelector(".remove-btn").addEventListener("click", () => {
      const item = cart.items.find(item => item.product.id === product.id);
      if (item && item.quantity > 0) {
          item.quantity -= 1;
          if (item.quantity === 0) {
              cart.removeItem(product.id);
          }
          updateQuantityDisplay(card, item.quantity);
          updateTotalPrice();
      }
  });

  //handle delete 
  card.querySelector(".delete-btn").addEventListener("click", () => {
      cart.removeItem(product.id);
      updateQuantityDisplay(card, 0);
      updateTotalPrice();
  });
});
