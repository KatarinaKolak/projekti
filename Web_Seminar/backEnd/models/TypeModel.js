import mongoose from 'mongoose';

const typeModel = new mongoose.Schema(
    {
        name:{type:String},
    }
)

export const Type = mongoose.model('Type', typeModel);