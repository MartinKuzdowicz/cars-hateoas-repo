const amqp = require('amqplib/callback_api');
const cfg = require('../../config');

const CarOrderProducer = () => {

    const sendOrderMsg = (newOrder) => {
        amqp.connect(cfg.amqpEndpoint, function(err, conn) {
            conn.createChannel(function(err, ch) {
                var que = cfg.placeOrderQue;

                ch.assertQueue(que, {durable: false});
                ch.sendToQueue(que, Buffer.from(JSON.stringify(newOrder)));

                console.log("send newOrder to rabbitmq queue");
            });
        });
    };

    return {
        sendOrderMsg: sendOrderMsg
    }
};

module.exports = CarOrderProducer;



