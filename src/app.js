import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import userRouter from './dao/dbMongo/users.js'
import productMongo from './dao/dbMongo/products.js'
import cartMongo from './dao/dbMongo/carts.js'
import chatMongo from './dao/dbMongo/message.js'
import socket from './dao/socket/socket.js';


import { Server, Socket } from 'socket.io';

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

//mongodb
app.use('/api/users', userRouter)
app.use('/products', productMongo)
app.use('/api/carts', cartMongo)

app.use('/chat', chatMongo)


const server = app.listen(8080, () => {
    console.log('server on');
});

mongoose.connect('mongodb+srv://CoderTest:djItjt2I5obBBSoH@coder.gmrlxlh.mongodb.net/ecommerce')

const serverSocket = new Server(server);
socket(serverSocket)