var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cfg = require('./src/config');
var carsControllerRoutes = require('./src/controllers/cars_controller');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cfg.appMainRoute, carsControllerRoutes);

app.listen(cfg.port);
console.log(`startet server at port ${cfg.port}`);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(cfg.dbConnectionString);