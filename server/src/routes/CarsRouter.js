var express = require('express');

const carsRoutes = (Car, carsController) => {

    var carsRouter = express.Router();

    carsRouter.use((req, res, next) => {
        console.log('carsRouter changing route');
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


    carsRouter.get('/', (req, res) => {
        res.json({msg: 'welcome to cars repository'});
    });


    carsRouter.route('/cars')
        .get(carsController.getAll)
        .post(carsController.createOne)
        .delete(carsController.deleteOne)
        .put(carsController.updateOne);

    carsRouter.route('/cars/:car_id')
        .get(carsController.getOne);

    return carsRouter;
};

module.exports = carsRoutes;