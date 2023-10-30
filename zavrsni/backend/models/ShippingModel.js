const mongoose = require('mongoose');

const shippingModel = new mongoose.Schema(
    {
        user_id:{type:String},
        date:{type:Date},
        status:{type:String},
        total_price:{type:Number},
        items:[{type:String}],
        shipp: {type: Boolean}
    }
)

module.exports = mongoose.model('Shipping', shippingModel, 'shippings');