var ModelToRestResourceUtils = require('../utils/ModelToRestResourceUtils');

const carsController = (CarModelSchema, logger) => {

    const createOne = (req, res) => {
        const body = req.body;
        if (!body.name) {
            res.status(400).send('Bad Status');
            return;
        }

        const newCar = new CarModelSchema(body);

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

        const host = req.headers.host;

        const type = req.query.type;
        const typeQuery = type ? {type} : {};

        const pageParam = req.query.page || 0;
        const page = pageParam ? parseInt(pageParam) : 0;
        const sizeParam = req.query.size || 0;
        const size = parseInt(sizeParam);

        const calcSkipVal = () => page > 0 ? ((page - 1) * size) : 0;

        CarModelSchema.find(typeQuery)
            .skip(calcSkipVal())
            .limit(parseInt(size))
            .then((cars) => {

            let carsRestResource = cars ? cars.map((c) => ModelToRestResourceUtils.createHALForOne(c, host)) : [];
            res.status(200).json(carsRestResource);

        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const getOne = (req, res) => {
        const carId = req.params.car_id;
        const host = req.headers.host;

        if(!carId){
            res.status(400).send('Bad Status');
            return;
        }
        CarModelSchema.findById(carId).then((car) => {
            let c = ModelToRestResourceUtils.createHALForOne(car, host);
            res.status(200).json(c);
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const deleteOne = (req, res) => {
        const carId = req.body.car_id;
        if(!carId){
            res.status(400).send('Bad Status');
            return;
        }
        CarModelSchema.remove({_id: carId}).then((car) => {
            res.status(204).json({
                msg: 'car deleted!'
            });
        }).catch((err) => {
            res.status(500).send(err);
        });
    };

    const updateOne = (req, res) => {
        const carId = req.body.car_id;
        if(!carId){
            res.status(400).send('Bad Status');
            return;
        }

        CarModelSchema.findById(carId).then((car) => {
            return Object.assign(car, req.body);
        }).then((car) => {
            return car.save();
        }).then((updatedCar) => {
            res.status(204).json({
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