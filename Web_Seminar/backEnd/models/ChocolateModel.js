import  mongoose  from "mongoose";

const chocolateModel = new mongoose.Schema(
    {
        name:{type:String},
        image:{type:String},
        cacao:{type:String},
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true},
        price:{type:String},
        color:{type:String},
        producer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true}
    }
)

export const Chocolate = mongoose.model('Chocolate', chocolateModel);