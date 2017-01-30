var express = require('express');
var Car = require('../models/car');
var carsControllerRoutes = express.Router();

carsControllerRoutes.use((req, res, next) => {
    console.log('carsControllerRoutes changing route');
    next();
});


carsControllerRoutes.get('/', (req, res) => {
    res.json({ msg: 'welcome to cars repository'});
});


carsControllerRoutes.route('/cars')
    .post((req, res) => {
            var car = new Car();
            car.name = req.body.name;

            car.save((err) => {
                if(err) res.send(err);
            res.json({msg: 'car created'});
        });
    })
    .get((req, res) => {
            Car.find((err, data) => {
            if(err) res.send(err);
            res.json(data);
        });
    })
    .delete((req, res) => {
            Car.remove({_id: req.body.car_id}, (err) => {
            if(err) res.send(err);
            res.json({msg: 'car deleted!'});
        });
    });

carsControllerRoutes.route('/cars/:car_id')
    .get((req, res) => {
            const carId = req.params.car_id;
            Car.findById(carId, (err, data) => {
            if(err) res.send(err);
            res.json(data);
        });
    })
    .put((req, res) => {
            const carId = req.params.car_id;
            const newName = req.body.name;
            Car.findById(carId, (err, bear) => {
                if(err) res.send(err);
                bear.name = newName;
                bear.save((err) => {
                if(err) res.send(err);
                res.json({msg: 'car updated'});
            });
        });
    });


module.exports = carsControllerRoutes;
