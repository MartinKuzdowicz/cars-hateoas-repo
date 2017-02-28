const uuidV4 = require('uuid/v4');

const CarsOrdersController = () => {

    const placeOrder = (req, res) => {
        console.log('placeOrder()');

        const carToOrderId = req.body.carToOrderId;

        const newOrder = {
            uuid: uuidV4(),
            clientId : Math.random(),
            carId: carToOrderId,
            timestamp: Date.now()
        };

        res.json({msg: 'order send'});
    };

    return {
        placeOrder: placeOrder
    }
};

module.exports = CarsOrdersController;