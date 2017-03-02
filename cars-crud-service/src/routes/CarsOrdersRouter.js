var express = require('express');

const CarsOrdersRouter = (CarsOrdersController) => {

    const router = express.Router();

    router.use((req, res, next) => {
        console.log('carsRouter changing route');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    router.get('/orders', CarsOrdersController.getAll);

    return router;
};

module.exports = CarsOrdersRouter;