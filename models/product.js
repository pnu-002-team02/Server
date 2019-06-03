const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },    
    info: { type: String, required: true },    
    gps: { type: String, required: true },    
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);

