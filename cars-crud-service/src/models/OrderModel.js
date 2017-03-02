var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarOrderSchema = new Schema({
    orderUUID: {type: String},
    clientUUID: {type: String},
    timestamp: {type: Number},
    carId: {type: String}
});


module.exports = mongoose.model('order', CarOrderSchema);