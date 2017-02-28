var express = require('express');

const CarsOrdersRouter = (CarsOrdersController) => {

    const router = express.Router();

    router.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    router.get('/', (req, res) => {
        res.json({msg: 'welcome to cars orders service'});
    });

    router.route('/place-order').get(CarsOrdersController.placeOrder);

    return router;

};

module.exports = CarsOrdersRouter;