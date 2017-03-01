const uuidV4 = require('uuid/v4');
const CarOrderProducer = require('../producers/CarOrderMsgProducer');

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

        CarOrderProducer().sendOrderMsg(newOrder);

        res.json({msg: 'order send'});
    };

    return {
        placeOrder: placeOrder
    }
};

module.exports = CarsOrdersController;