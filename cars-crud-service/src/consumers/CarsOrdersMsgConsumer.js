const amqp = require('amqplib/callback_api');
const cfg = require('../../config');

const CarsOrdersMsgConsumer = (CarsOrdersController) => {

    const start = () => {
        console.log('starting CarsOrdersMsgConsumer');

        amqp.connect(cfg.amqpEndpoint, function(err, conn) {
            conn.createChannel(function(err, ch) {
                var q = cfg.placeOrderQue;

                ch.assertQueue(q, {durable: false});

                ch.consume(q, function(msg) {

                    console.log('------------------------------------');
                    console.log(" Received %s", msg.content.toString());
                    console.log(msg);
                    console.log('------------------------------------');

                    CarsOrdersController.createOne(JSON.parse(msg.content.toString()));

                }, {noAck: true});
            });
        });
    };

    return {
        start: start
    }
}

module.exports = CarsOrdersMsgConsumer;






