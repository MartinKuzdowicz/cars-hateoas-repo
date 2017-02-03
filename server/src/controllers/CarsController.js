const carsController = (Car) => {

    const createOne = (req, res) => {
        const body = req.body;
        if(!body.name) {
            res.status(400).send('Bad Status');
        }

        const newCar = new Car(body);

        newCar.save().then((car) => {
            res.status(201).json({
                msg: 'car created',
                car
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const getAll = (req, res) => {
        const query = req.query;

        Car.find(query).then((cars) => {
            res.status(200).json(cars);
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const getOne = (req, res) => {
        const carId = req.params.car_id;
        Car.findById(carId).then((car) => {
            res.status(200).json(car);
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const deleteOne = (req, res) => {
        Car.remove({_id: req.body.car_id}).then((car) => {
            res.status(204).json({
                msg: 'car deleted!'
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const updateOne = (req, res) => {
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
    }

    return {
        createOne: createOne,
        getAll: getAll,
        deleteOne: deleteOne,
        updateOne: updateOne,
        getOne: getOne
    }
};

module.exports = carsController;