
const CarsOrdersController = (OrdersSchema) => {

    const createOne = (order) => {

        const newOrder = new OrdersSchema(order);

        newOrder.save().then(msg => console.log(msg)).catch(err => console.error(err));
    }
    return {
        createOne: createOne
    }
};

module.exports = CarsOrdersController;