const mongoose = require('mongoose');

const commentModel = new mongoose.Schema(
    {
        date:{type:Date},
        vote:{type:Number},
        detail:{type:String},
        product_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
        user_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Users'}
    }
)

module.exports = mongoose.model('Comment', commentModel, 'comments');