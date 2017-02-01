var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CarSchema = new Schema({
    name: {type: String},
    released: {type: Date},
    carModelName: {type: String},
    type: {type: String},
    country: {type: String},
    avgPrice: {type: Number}
});


module.exports = mongoose.model('car', CarSchema);