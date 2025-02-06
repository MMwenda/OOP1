//Product class to store product properties
class Product { //this class is used to create instances of products
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  //ShoppingCartItem class to store product and quantity
  class ShoppingCartItem {
    constructor(product, quantity) { //product is an instance of Product class, this links the two classes
      this.product = product; 
      this.quantity = quantity;
    }
  
    // Method to calculate total price
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // ShoppingCart class to manage shopping cart operations
  class ShoppingCart {
    constructor() {
      this.items = []; //array to store shopping cart items {ShoppingCartItem instances}
    }
  
    //add item method to the cart
    addItem(product, quantity) {  //product is an instance of Product class, this links the two classes
                                  // quantity is an instance of ShoppingCartItem class, this links the two classes
      // Check if the product is already in the cart
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } 
      else {
        this.items.push(new ShoppingCartItem(product, quantity)); //add new item to the cart
      }
    }
  
    // Remove item from the cart by product ID
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
    }
  
    // Get the total price of all items in the cart
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0); //0 reference to the initial value of total
    }
  
    // Display all cart items
    displayCart() {
      if (this.items.length === 0) {
        console.log("Your cart is empty.");
        return;
      }
      else{
      console.log("Shopping Cart Items:");
      this.items.forEach(item => {
        console.log(`- ${item.product.name} (x${item.quantity}) - $${item.getTotalPrice().toFixed(2)}`); //toFixed(2) to display 2 decimal places
      });
      console.log(`Total: $${this.getTotalPrice().toFixed(2)}`); //this refers to the ShoppingCart class
    } 
    }
  }
  
  //Sample products
  const product1 = new Product(1, "Laptop", 1000);
  const product2 = new Product(2, "Smartphone", 500);
  const product3 = new Product(3, "Headphones", 150);
  
