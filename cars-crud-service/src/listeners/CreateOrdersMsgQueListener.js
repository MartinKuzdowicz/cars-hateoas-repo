const amqp = require('amqplib/callback_api');
const cfg = require('../../config');

const CreateOrdersMsgQueListener = () => {

    const startListen = () => {
        console.log('starting CreateOrdersMsgQueListener');

        amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var q = cfg.placeOrderQue;

                ch.assertQueue(q, {durable: false});

                ch.consume(q, function(msg) {

                    console.log('------------------------------------');
                    console.log(" Received %s", msg.content.toString());

                }, {noAck: true});
            });
        });
    };

    return {
        startListen: startListen
    }
}

module.exports = CreateOrdersMsgQueListener;






