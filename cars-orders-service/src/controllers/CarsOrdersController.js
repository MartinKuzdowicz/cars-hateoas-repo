
const CarsOrdersController = () => {

    const placeOrder = (req, res) => {
        console.log('placeOrder()');

        res.json({msg: 'order send'});
    };

    return {
        placeOrder: placeOrder
    }
};

module.exports = CarsOrdersController;