const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema(
    {
        type:{type:String, required: true}
    }
)

module.exports = mongoose.model('Category', categoryModel, 'categories');