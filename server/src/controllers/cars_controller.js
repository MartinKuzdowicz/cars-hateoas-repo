var express = require('express');
var Car = require('../models/car');
var carsControllerRoutes = express.Router();

carsControllerRoutes.use((req, res, next) => {
    console.log('carsControllerRoutes changing route');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


carsControllerRoutes.get('/', (req, res) => {
    res.json({msg: 'welcome to cars repository'});
});


carsControllerRoutes.route('/cars')
    .get((req, res) => {
        const query = req.query;

        Car.find(query).then((cars) => {
            res.json(cars);
        }).catch((err) => {
            res.status(500).send(err);
        });
    })
    .post((req, res) => {
        const newCar = new Car();
        newCar.name = req.body.name;

        newCar.save().then((car) => {
            res.json({
                msg: 'car created',
                car
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    })
    .delete((req, res) => {
        Car.remove({_id: req.body.car_id}).then((car) => {
            res.json({
                msg: 'car deleted!',
                car
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    })
    .put((req, res) => {
        const carId = req.body.car_id;

        Car.findById(carId).then((car) => {
            return Object.assign(car, req.body);
        }).then((car) => {
            return car.save();
        }).then((updatedCar) => {
            res.json({
                msg: 'car updated',
                updatedCar
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    });


carsControllerRoutes.route('/cars/:car_id')
    .get((req, res) => {
        const carId = req.params.car_id;
        Car.findById(carId).then((car) => {
            res.json(car);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });


module.exports = carsControllerRoutes;
