import express from 'express';
import routerProducts from './routers/products.js';
import routerCarts from './routers/carts.js';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static (`${__dirname}/public`))

app.use('/api/products', routerProducts);

app.use('/api/carts', routerCarts);

const server = app.listen(8080, () => {
    console.log('server on');
});
