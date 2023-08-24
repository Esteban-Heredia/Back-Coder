import { Router } from 'express';
import CartManager from '../../CartManager.js';
import ProductManager from '../../ProductManager.js';

const routerCart = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

routerCart.put('/add/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);

  // Verifica si el producto existe antes de agregarlo al carrito
  const product = productManager.getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  cartManager.addToCart(productId);
  res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
});

routerCart.delete('/remove/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);

  // Verifica si el producto existe en el carrito antes de eliminarlo
  const product = productManager.getProductById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  cartManager.removeFromCart(productId);
  res.status(204).end();
});

routerCart.get('/', (req, res) => {
  const cartItems = cartManager.getCartItems();
  const productsInCart = cartItems.map(productId => productManager.getProductById(productId));
  
  res.status(200).json(productsInCart);
});

export default routerCart;
