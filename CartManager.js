import fs from 'fs';

class CartManager {
  constructor() {
    this.carts = [];
    this.id = 0;
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

  getLastCartId() {
    const lastCart = this.carts[this.carts.length - 1];
    return lastCart ? lastCart.id : 0;
  }

  createCart() {
    const lastCartId = this.getLastCartId();
    const newId = lastCartId + 1
    const newCart = {id:newId, items: []}

    this.carts.push(newCart);
    this.saveCarts();
    console.log('Carrito creado exitosamente:', newCart);
    return newCart;
  }

  getCarts(){
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  deleteCarts(id){
    const index = this.carts.findIndex((p) => p.id === id);
    
    if(index === -1){
      console.log("Carrito no encontrado");
      return false;
    }

    const deleteCart = this.carts.splice(index, 1)[0];
    this.saveCarts();
    console.log("Carrito Eliminado: ", deleteCart);
    return true;
  }

  addItemToCart(id, product) {
    const cart = this.getCartById(id);

    if (!cart) {
      console.log('Carrito no encontradooo');
      return;
    }

    cart.items.push(product);
    this.saveCarts();
    console.log('Producto agregado correctamente al carrito seleccionado')
  }

  deleteItemCart(cartId, productId){
    const cart = this.getCartById(cartId)

    if (!cart) {
      console.log('Carrito no encontradooo');
      return;
    }

    const itemIndex = cart.items.findIndex((item) => item.id === productId)
    
    if(itemIndex === -1){
      console.log('Producto no encontrado en el carrito');
      return false;
    }

    cart.items.splice(itemIndex, 1);
    this.saveCarts();

    console.log('Producto eliminado del carrito');
    return true
  }
}

export default CartManager;
