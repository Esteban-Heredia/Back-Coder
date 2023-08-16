import express from 'express';
import routerProducts from './routers/products.js';
// import carts from './routers/carts';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
// app.use('/api/carts', carts )

app.listen(8080, () => {
    console.log('Servidor en el puerto 8080');
});
