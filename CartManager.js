import fs from 'fs';

class CartManager {
  constructor() {
    this.carts = [];
    this.path = './data/carts.json';
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error al guardar los carritos en el archivo:', error);
    }
  }

  createCart() {
    // Crear un nuevo carrito con un ID único
    const newCart = { id: Date.now(), items: [] };
    this.carts.push(newCart);
    this.saveCarts(); // Guardamos los carritos actualizados en el archivo
    console.log('Carrito creado exitosamente:', newCart);
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  // Agregar productos a un carrito específico
  addItemToCart(cartId, product) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      console.log('Carrito no encontrado');
      return;
    }


    this.saveCarts(); // Guardamos los carritos actualizados en el archivo
    console.log('Producto agregado al carrito:', product);
  }
}

export default CartManager;
