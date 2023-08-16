import { Router } from 'express';
import fs from 'fs';

const routerProducts = Router();
const products = JSON.parse(fs.readFileSync('../data/products.json', 'utf8'));

routerProducts.get('/', (req, res) => {
    const idProduct = req.query.idProduct;
    const titleProduct = req.query.titleProduct;

    if (!idProduct) {
        res.send(products);
        return;
    }

    const idFiltrado = products.find((p) => p.id === parseInt(idProduct));
    if (idFiltrado) {
        res.send(idFiltrado);
    } else {
        res.send("No se encontró el producto con ese id");
    }

    const titleFiltrado = products.find((p) => p.title === titleProduct)
    if (titleFiltrado){
        res.send(titleFiltrado)
    } else {
        res.send ('no esta el producto')
    }
});

export default routerProducts;
