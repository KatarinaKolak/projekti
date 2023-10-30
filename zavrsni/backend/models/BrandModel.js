const mongoose = require('mongoose');

const brandModel = new mongoose.Schema(
    {
        name:{type:String, required: true},
        image:{type:String},
        address:{type:String, required: true},
        details: {type:String}
    }
)

module.exports = mongoose.model('Brand', brandModel, 'brands');