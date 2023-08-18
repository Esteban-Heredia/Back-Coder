import fs from 'fs';

class CartManager {
  constructor() {
    this.cartItems = [];
    this.path = './data/cart.json';
    this.loadCart();
  }

  loadCart() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.cartItems = JSON.parse(data);
    } catch (error) {
      this.cartItems = [];
    }
  }

  saveCart() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.cartItems, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar el carrito en el archivo:', error);
    }
  }

  addToCart(productId) {
    if (!this.cartItems.includes(productId)) {
      this.cartItems.push(productId);
      this.saveCart();
      console.log('Producto agregado al carrito:', productId);
    } else {
      console.log('El producto ya esta en el carrito:', productId);
    }
  }

  removeFromCart(productId) {
    const index = this.cartItems.indexOf(productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCart();
      console.log('Producto eliminado del carrito:', productId);
    } else {
      console.log('El producto no esta en el carrito:', productId);
    }
  }

  getCartItems() {
    return this.cartItems;
  }
}

export default CartManager;
