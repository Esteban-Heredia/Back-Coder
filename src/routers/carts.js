import { Router } from 'express';
import CartManager from '../../CartManager.js';
import ProductManager from '../../ProductManager.js';
import fs from 'fs'

const routerCart = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();
const cart = JSON.parse(fs.readFileSync('./data/carts.json', 'utf-8') )

routerCart.get('/', (req, res) => {
  res.status(200).json(cart);
});

routerCart.post('/', (req,res)=>{
  const newCart = req.body;
  if (!newCart.id){
    res.status(400).send('el id debe ser obligatorio para agregar al carrito')
  }

  const newCartID = {...newCart, id: cart.length + 1};
  cart.push(newCartID);
  fs.writeFileSync('./data/carts.json', JSON.stringify(cart, null, 2), 'utf8');
  res.status(201).send(newCartID)
});


routerCart.put('/add/:cartId', (req, res) => {
  const cartId = parseInt(req.params.productId);
  const productID = req.body.productID
  const product = productManager.getProductById(productID);

  if (product) {
    cartManager.addItemToCart(cartId, product);
    res.status(200).send({ message: "Producto agregado al carrito exitosamente" });
  } else {
    res.status(400).send({ error: "Producto no encontrado" });
  }

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

export default routerCart;
