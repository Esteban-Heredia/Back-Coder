import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import userRouter from "./dao/dbMongo/users.js";
import productMongo from "./dao/dbMongo/products.js";
import cartMongo from "./dao/dbMongo/carts.js";
import chatMongo from "./dao/dbMongo/message.js";
import socket from "./dao/socket/socket.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import registro from './dao/sessions/registro.js';
import login from './dao/sessions/login.js';

import { Server, Socket } from "socket.io";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(`${__dirname}/public`));


//session

app.use(
  session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://CoderTest:djItjt2I5obBBSoH@coder.gmrlxlh.mongodb.net/ecommerce',
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:3600,
    }),
    secret: "coderSecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/log', (req,res)=>{
    if (req.session.counter){
        req.session.counter++;
        res.render ('log')
    } else {
        req.session.counter = 1
        res.render("log")
    }
})

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/login', login)
app.use('/register' , registro)

//mongodb
app.use("/users", userRouter);
app.use("/products", productMongo);
app.use("/carts", cartMongo);

app.use("/chat", chatMongo);

const server = app.listen(8080, () => {
  console.log("server on");
});

mongoose.connect(
  "mongodb+srv://CoderTest:djItjt2I5obBBSoH@coder.gmrlxlh.mongodb.net/ecommerce"
);

const serverSocket = new Server(server);
socket(serverSocket);
