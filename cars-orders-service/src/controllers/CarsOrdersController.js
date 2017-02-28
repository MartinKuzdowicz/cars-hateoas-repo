
const CarsOrdersController = () => {

    const placeOrder = (req, res) => {
        console.log('placeOrder()');

        const carToOrderId = req.body.carToOrderId;

        console.log(carToOrderId);

        res.json({msg: 'order send'});
    };

    return {
        placeOrder: placeOrder
    }
};

module.exports = CarsOrdersController;