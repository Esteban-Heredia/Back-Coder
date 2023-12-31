import { Router } from 'express';
import ProductManager from '../../../../ProductManager.js';
import { uploader } from '../../../utils.js';

const realTimeProducts = Router();
const productManager = new ProductManager();

realTimeProducts.get('/', (req, res) => {
    const products = productManager.getProducts()

    res.render('realTimeProducts',{ products });
});

realTimeProducts.get('/getProducts', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

realTimeProducts.get('/:id' ,(req,res) => {
  const productid = parseInt(req.params.id)
  const product = productManager.getProductById(productid)

  if(product){
  res.send(product)
} else{
  res.status(404).send('Producto no encontrado')
}
})

realTimeProducts.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productManager.deleteProduct(productId)

    if(product){
      res.status(200).send('Producto eliminado');
    } else {
      res.status(400).send ('No se pudo eliminar el producto')
    }
});

realTimeProducts.post('/',uploader.single('thumbnail'), (req, res) => {
    const newProduct = req.body;
    newProduct.thumbnail = `http://localhost:8080/static/img/${req.file.filename}`
    const product = productManager.addProduct(newProduct)

    if(product){
      res.status(201).send('El producto fue creado')
    } else{
      res.status(400).send('No se pudo crear el producto')
    }
  });

realTimeProducts.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const product = productManager.updateProduct(productId,updatedProduct)

    if(product){
      res.status(200).send('El producto fue modificado con exito')
    } else {
      res.status(400).status('Error al modificar el producto')
    }
});

export default realTimeProducts;