const mongoose = require('mongoose');

const discountModel = new mongoose.Schema(
    {
        code:{type:String, required: true},
        value:{type:String, required: true},
        expire:{type:Date, required: true}
    }
)

module.exports = mongoose.model('Discount', discountModel, 'discounts');