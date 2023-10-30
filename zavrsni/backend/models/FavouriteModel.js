const mongoose = require('mongoose');

const favouriteModel = new mongoose.Schema(
    {
        product_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
        user_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Users'}
    }
)

module.exports = mongoose.model('Favourite', favouriteModel, 'favourites');