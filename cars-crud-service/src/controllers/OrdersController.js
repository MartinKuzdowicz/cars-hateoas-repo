
const CarsOrdersController = (OrdersSchema) => {

    const createOne = (order) => {

        const newOrder = new OrdersSchema(order);

        newOrder.save().then(msg => console.log(msg)).catch(err => console.error(err));
    };

    const getAll = (req, res) => {
        OrdersSchema.find({}).then(orders => {
            res.status(200).json({
                orders
            });
        }).catch(err => {
            res.status(500).json({
                msg: err
            });
        });
    };

    return {
        createOne: createOne,
        getAll: getAll
    }
};

module.exports = CarsOrdersController;