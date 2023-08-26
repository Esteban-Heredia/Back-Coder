import { Router } from 'express';
import CartManager from '../../CartManager.js';
import ProductManager from '../../ProductManager.js';

const routerCart = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

routerCart.get('/', (req, res) => {
  const carts = cartManager.getCarts()
  
  res.status(200).json(carts);
});

routerCart.get('/:id', (req, res) => {
  const cartId = parseInt(req.params.id)
  const carts = cartManager.getCartById(cartId)

  if(carts){
    res.status(200).send(carts);
  } else {
    res.status(404).send("Carrito no encontrado")
  }
});

routerCart.post('/', (req,res)=>{
  const newCart = req.body;
  const cart = cartManager.createCart(newCart)

  res.status(200).send(cart)
});

routerCart.delete('/:id', (req, res) => {
  const cartId = parseInt(req.params.id);
  const cart = cartManager.deleteCarts(cartId)

  if (cart) {
    res.status(200).send('Carrito eliminado')
  } else {
    res.status(400).send ('El carrito no se pudo eliminar')
  }
});

routerCart.put('/:cartId/:productId', (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const productId = parseInt(req.params.productId)
  const cartSelect = cartManager.getCartById(cartId)

  if(!cartSelect){
    res.status(404).send({error: "Carrito no encontrado"})
    return false
  }

  if(cartSelect){
    const product = productManager.getProductById(productId);

    if(!product){
      res.status(404).send({error: "Producto no encontrado para agregar al carrito existente"})
      return false
    }
    cartManager.addItemToCart(cartId, product)
    res.status(201).send(`El producto agregado fue: ${product.title}`)
  }
});

routerCart.delete('/:cartId/:productId', (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const productId = parseInt(req.params.productId)
  const cartSelect = cartManager.getCartById(cartId)

  if(!cartSelect){
    res.status(404).send({error: "Carrito no encontrado"})
    return false
  }

  if(cartSelect){
    const product = productManager.getProductById(productId);

    if(!product){
      res.status(404).send({error: "Producto no encontrado para borrar del carrito existente"})
      return false
    }
    const productDeleted = cartManager.deleteItemCart(cartId, productId);

    if (productDeleted) {
      res.status(200).send(`El producto borrado fue: ${product.title}`);
    } else {
      res.status(400).send({ error: "Error al borrar el producto del carrito" });
    }
  }
});

export default routerCart;
