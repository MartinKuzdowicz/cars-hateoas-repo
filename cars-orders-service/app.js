var express = require('express');
var bodyParser = require('body-parser');
var cfg = require('./config');
var CarsOrdersRouter = require('./src/routes/CarsOrdersRouter');
var CarsOrdersController = require('./src/controllers/CarsOrdersController');


var port = process.env.PORT || cfg.devPort;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cfg.carsOrdersServiceMainPath, CarsOrdersRouter(CarsOrdersController()));

app.listen(port);
console.log(`startet server at port ${port}`);