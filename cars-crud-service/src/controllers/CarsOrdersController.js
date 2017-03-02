
const CarsOrdersController = (CarsOrdersSchema) => {

    const createOne = (order) => {

        const newOrder = new CarsOrdersSchema(order);

        newOrder.save().then(msg => console.log(msg)).catch(err => console.error(err));
    };

    const getAll = (req, res) => {
        CarsOrdersSchema.find({}).then(orders => {
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