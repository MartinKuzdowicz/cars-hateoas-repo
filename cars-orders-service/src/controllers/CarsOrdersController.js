const uuidV4 = require('uuid/v4');
const amqp = require('amqplib/callback_api');
const cfg = require('../../config');

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

        amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var que = cfg.placeOrderQue;

                ch.assertQueue(que, {durable: false});
                ch.sendToQueue(que, new Buffer(JSON.stringify(newOrder)));
                console.log("send newOrder to rabbitmq queue");
            });
            conn.close();
        });

        res.json({msg: 'order send'});
    };

    return {
        placeOrder: placeOrder
    }
};

module.exports = CarsOrdersController;