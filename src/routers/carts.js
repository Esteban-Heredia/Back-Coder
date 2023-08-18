import { Router } from 'express';
import CartManager from '../../CartManager.js';

const routerCart = Router();
const cartManager = new CartManager();

routerCart.post('/add', (req, res) => {
  const productId = parseInt(req.body.productId);
  cartManager.addToCart(productId);
  res.status(200).send('Producto agregado al carrito');
});

routerCart.post('/remove', (req, res) => {
  const productId = parseInt(req.body.productId);
  cartManager.removeFromCart(productId);
  res.status(200).send('Producto eliminado del carrito');
});

routerCart.get('/', (req, res) => {
  const cartItems = cartManager.getCartItems();
  const productsInCart = products.filter((product) => cartItems.includes(product.id));
  res.send(productsInCart);
});

export default routerCart;
