import { Router } from 'express';
import fs from 'fs';

const routerProducts = Router();
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

routerProducts.get('/', (req, res) => {
    const idProduct = req.query.idProduct;
    const titleProduct = req.query.titleProduct;

    if (!idProduct && !titleProduct) {
        res.send(products);
        return;
    }

    if (idProduct){
        const idFiltrado = products.find ((p) => p.id === parseInt (idProduct))
        if (idFiltrado) {
            res.send(idFiltrado)
        } else {
            res.send("No se encontro el producto con ese id")
        }
    }

    if (titleProduct){
        const titleFiltrado = products.find ((p) => p.title === titleProduct)
        if (titleFiltrado) {
            res.send(titleFiltrado)
        } else {
            res.send("No se encontro el producto con ese titulo")
        }
    }
});

routerProducts.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productFiltrado = products.findIndex((p) => p.id === productId);

    if (productFiltrado === -1) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    const deletedProduct = products.splice(productFiltrado, 1)[0];
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2), 'utf8');

    res.status(200).send(`Producto eliminado: ${deletedProduct.title}`);
});


routerProducts.post('/', (req, res) => {
    const newProduct = req.body;
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock
    ) {
      res.status(400).send("Todos los campos son obligatorios");
      return;
    }

    const existingProduct = products.find((p) => p.code === newProduct.code);
    if (existingProduct) {
      res.status(409).send("El código del producto ya está en uso");
      return;
    }

    const newProductWithId = { ...newProduct, id: products.length + 1 };
    products.push(newProductWithId);
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2), 'utf8');
    res.status(201).send(newProductWithId);
});

routerProducts.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        res.status(404).send("Producto no encontrado");
        return;
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    fs.writeFileSync('../data/products.json', JSON.stringify(products, null, 2), 'utf8');

    res.status(200).send(`Producto actualizado: ${products[productIndex].title}`);
});

export default routerProducts;
