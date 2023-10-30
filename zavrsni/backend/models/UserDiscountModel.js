const mongoose = require('mongoose');

const userdiscountModel = new mongoose.Schema(
    {
        user_id:{type:String, required: true},
        discount_id:{type:String, required: true}
    }
)

module.exports = mongoose.model('UserDiscount', userdiscountModel, 'userdiscounts');