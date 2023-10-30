const mongoose = require('mongoose');

const productModel = new mongoose.Schema(
    {
        name:{type:String},
        image:{type:String},
        price:{type: mongoose.Types.Decimal128},
        details:{type:String},
        ingredients:{type:String},
        usage:{type:String},
        size:{type:mongoose.Decimal128},
        on_stock:{type:Number},
        discount:{type:Number},
        date:{type:Date},
        brand_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Brend'},
        category_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}
    }
)

module.exports = mongoose.model('Product', productModel, 'products');