import mongoose from 'mongoose';


const userModel = new mongoose.Schema(
    {
    name:{type:String},
    password:{type:String, required: true},
    email:{type:String, unique: true, dropDups: true, required:true},
    role:{type:String},
    }
);

export const User = mongoose.model('User', userModel); 