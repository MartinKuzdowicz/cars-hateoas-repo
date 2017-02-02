var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cfg = require('./src/config');
var carsRouter = require('./src/routes/CarsRouter');
var CarModel = require('./src/models/CarModel');
var carsController = require('./src/controllers/CarsController');


var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cfg.appMainRoute, carsRouter(CarModel, carsController(CarModel)));

app.listen(port);
console.log(`startet server at port ${port}`);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(cfg.dbConnectionString);