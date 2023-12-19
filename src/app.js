import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import userRouter from "./dao/dbMongo/users.js";
import productMongo from "./dao/dbMongo/products.js";
import newProduct from "./dao/routes/newProducts/newProducts.js"
import cartMongo from "./dao/dbMongo/carts.js";
import chatMongo from "./dao/dbMongo/message.js";
import socket from "./dao/socket/socket.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import registro from './dao/sessions/registro.js';
import login from './dao/sessions/login.js';
import passport from "passport";
import initializePassport from "./config/passportConfig.js";
import failRegistro from './dao/sessions/failRegistro.js';
import loginGitHub from './dao/sessions/loginGitHub.js';
import currents from './dao/sessions/current.js'
import mailer from './dao/mail/mailer.js'
import dotenv from 'dotenv';

import { Server, Socket } from "socket.io";

dotenv.config()

const MONGO_URL = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(`${__dirname}/public`));

//session
app.use(cookieParser(SESSION_SECRET))
app.use(
  session({
    store:MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:3600,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/login', login)
app.use('/api/sessions', loginGitHub )
app.use('/api/sessions/current', currents )
app.use('/register' , registro)
app.use('/failRegister', failRegistro)

//mongodb
app.use("/users", userRouter);
app.use("/products", productMongo);
app.use('/newproduct',newProduct)
app.use("/carts", cartMongo);

app.use('/mail', mailer)

app.use("/chat", chatMongo);

const server = app.listen(PORT, () => {
  console.log("server on");
});

mongoose.connect(
  MONGO_URL
);

const serverSocket = new Server(server);
socket(serverSocket);
