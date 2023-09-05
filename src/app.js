import express from 'express';
import handlebars from 'express-handlebars';
import routerProducts from './routers/products.js';
import routerCarts from './routers/carts.js';
import __dirname from './utils.js';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
    let user= {
        name: 'algo',
        lastName: 'mas'
    }
    res.render('index', user);
  });

app.use('/product', routerProducts)

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static (`${__dirname}/public`))

app.use('/api/products', routerProducts);

app.use('/api/carts', routerCarts);

const server = app.listen(8080, () => {
    console.log('server on');
});