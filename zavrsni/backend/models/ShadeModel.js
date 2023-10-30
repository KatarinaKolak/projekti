const mongoose = require('mongoose');

const shadeModel = new mongoose.Schema(
    {
        hex:{type:String, required: true},
        product_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantities:{type:Number}

    }
)

module.exports = mongoose.model('Shade', shadeModel, 'shades');