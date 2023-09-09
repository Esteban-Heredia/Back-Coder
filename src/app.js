import express from 'express';
import handlebars from 'express-handlebars';
import routerProducts from './routers/products.js';
import routerCarts from './routers/carts.js';
import realTimeProducts from './routers/RealTimeProducts.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import ProductManager from '../ProductManager.js';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static (`${__dirname}/public`))

app.get('/',(req,res)=>{
    res.render('index')
} )
app.use('/products', routerProducts);
app.use('/realTimeProducts', realTimeProducts);

app.use('/api/carts', routerCarts);

const server = app.listen(8080, () => {
    console.log('server on');
});

const serverSocket = new Server(server);
const pManager = new ProductManager

serverSocket.on('connection', socket =>{
    console.log("nuevo cliente conectado")
    
    socket.on('agregar', data =>{
        const product =   {
            "title": data.title,
            "description": data.description,
            "price": data.price,
            "thumbnail": data.thumbnail,
            "code": data.code,
            "stock": data.stock,
          }
        console.log(data)
        pManager.addProduct(product)
        serverSocket.emit('log',{products: pManager.getProducts()})
    })

    socket.on('eliminar', data => {
        const productId = data;
        const deletedProduct = pManager.deleteProduct(productId);

        if (deletedProduct) {
            console.log(`Producto eliminado con ID ${productId}`);
            serverSocket.emit('log', { products: pManager.getProducts() });
        } else {
            console.log(`No se pudo eliminar el producto con ID ${productId}`);
        }
    });
})