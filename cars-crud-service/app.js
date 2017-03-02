var express = require('express');
var bodyParser = require('body-parser');
var cfg = require('./config');
var carsRouter = require('./src/routes/CarsRouter');
var CarModel = require('./src/models/CarModel');
var CarOrderModel = require('./src/models/OrderModel');
var carsController = require('./src/controllers/CarsController');
var CarsOrdersMsgConsumer = require('./src/consumers/CarsOrdersMsgConsumer');
var CarsOrdersController = require('./src/controllers/OrdersController');


var port = process.env.PORT || cfg.devPort;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cfg.appMainRoute, carsRouter(carsController(CarModel)));

app.listen(port);
console.log(`startet server at port ${port}`);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(cfg.dbConnectionString);

CarsOrdersMsgConsumer(CarsOrdersController(CarOrderModel)).start();