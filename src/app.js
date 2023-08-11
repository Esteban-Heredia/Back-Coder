import express from 'express';
import fs from 'fs';

const app = express();
const product = JSON.parse(fs.readFileSync('../data/products.json', 'utf8'));

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Server on');
});

app.get('/products', (req, res) => {
    let idProduct = req.query.idProduct
    if(!idProduct || (idProduct !== idProduct)){
        res.send(product);
        return
    }

    const idFiltrado = product.find((p) => p.id === parseInt(idProduct));
    if (idFiltrado){
        res.send(idFiltrado)
    } else {
        res.send ("no se encontro el producto con ese id")
    }
});

app.get('/productos/:title', (req, res) => {
    res.send(`El producto es: ${req.params.title}`);
});

app.listen(8080, () => {
    console.log('Servidor en el puerto 8080');
});
