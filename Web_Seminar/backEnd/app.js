import express from "express"
import mongoose from "mongoose";
import { Chocolate } from "./models/ChocolateModel.js";
import { Producer } from "./models/ProducerModel.js";
import { Type } from "./models/TypeModel.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors";
import { User } from "./models/UserModel.js";
import { signJwt, verifyJwt } from "./jwt.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';

const result = dotenv.config();
const app = express();
const db = mongoose.connect('mongodb://127.0.0.1:27017/chocolatesDB', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(res=>console.log("Connected!")).catch(err=>console.log("Error", err.message)); // my database collection
const port = process.env.PORT || 3000
const base = mongoose.connection;
const chocolateRouter = express.Router();
const userRouter = express.Router();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({type: 'application/json'}));

app.use(express.json())

app.use(cors({origin: "*", credentials: true}));

app.use('/api',chocolateRouter);
app.use('/user',userRouter);

userRouter.post('/login', cors(), (req, res) => {
    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length === 0) {
            return res.json({message: "email"});
        }
        if (req.body.email !== users[0].email) {
            return res.json({message: "email"})
        }
        bcrypt.compare(req.body.password, users[0].password, function(err, result) {
            if (result) {
                const token = signJwt(users[0]._id);
                const myuser = {name:users[0].name, role:users[0].role}
                return res.json({accessToken: token, user_id: users[0].id, user_role: users[0].role,  user_name:users[0].name});
           
            }
            else {
                return res.json({message: "password"})
            }
          });

        
         })
});

userRouter.post('/register', cors(), (req, res) => {
    console.log("heey");
    console.log("heey");
    console.log(req.body);

    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length > 0) {
            return res.json({message: "email"});
        }

        const saltRounds = 10; // definiranje salt vrijednosti 
        bcrypt.genSalt(saltRounds, function(err, salt) { 
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                let user = new User({name: req.body.name, email: req.body.email, password: hash, role: req.body.role});
                user.save();
                console.log(hash);
                return res.json(user);
            });
          });

        
    })
});

userRouter.get('/allUsers', verifyJwt, cors(), (req, res) => {
    User.find((err, users) => {
        if (err){
            res.send(err.message);
        } else {
            return res.json({"users" : users});
        }
    })
})


chocolateRouter.get('/chocolate', verifyJwt, cors(), (req, res)=>{
    //console.log(crypto.randomBytes(64).toString('hex'));
    console.log("SEC", process.env.SECRET); 
    Chocolate.find((err, chocolates)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "chocolates" : chocolates})
        }
    })
})

chocolateRouter.get('/types/:id', verifyJwt, cors(), (req, res)=>{
    Type.findById(req.params.id, (err, type)=>{
        if(err){
            res.send(err)
        }
        else{
            res.json(type)
        }
    })

})

chocolateRouter.get('/types', verifyJwt, cors(), (req, res)=>{
    Type.find((err, types)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "types" : types})
        }
    })
})

chocolateRouter.get('/producers/:id', verifyJwt, cors(), (req, res)=>{
    Producer.findById(req.params.id, (err, producer)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log(producer);
            return res.json(producer)
        }
    })

})

function compareFunction (a, b) {
    return a.name > b.name // For ascending
}

chocolateRouter.get('/producers', verifyJwt, cors(), (req, res)=>{
    Producer.find({}).sort({"name":1}).exec((err, producers)=>{
        if(err){
            res.send(err.message)
        }
        else{
            ;
            return res.json({ "producers" : producers})
        }
    })
})

chocolateRouter.get('/chocolatesByProducer/:producer_id', verifyJwt, cors(), (req, res)=>{
    Chocolate.find({producer_id:req.params.producer_id}, (err, chocolates)=>{
        console.log(req.params.producer_id)
        if(err){
            res.send(err)
        }
        else{
            console.log("CH", chocolates);
            res.json(chocolates)
        }
    })

})


chocolateRouter.get('/chocolates/:id', verifyJwt, cors(), (req, res)=>{
    Chocolate.findById(req.params.id, (err, chocolate)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(chocolate)
        }
    })

})

chocolateRouter.get('/chocolatesByName/:chocolateName', verifyJwt, (req, res)=>{
    Chocolate.find({name:req.params.chocolateName}, (err, chocolate)=>{
        console.log(req.params.chocolateName)
        if(err){
            res.send(err)
        }
        else{
            res.json(chocolate)
        }
    })

})

chocolateRouter.get('/chocolatesByType/:type', verifyJwt, cors(), (req, res)=>{
    console.log(req.params.type)
    Chocolate.find({type:req.params.type}, (err, chocolate)=>{
        console.log(req.params.type)
        if(err){
            res.send(err)
        }
        else{
            res.json(chocolate)
        }
    })

})

chocolateRouter.post('/addChocolate', cors(), (req, res)=>{
    console.log("req", req.body)
        const newchocolate = new Chocolate(req.body);
        try {
            base.collection('chocolates').insertOne(newchocolate);
            return res.json({success: "added"})
         } catch (e) {
            return res.json({error: "can't add"})
         };
    })

chocolateRouter.post('/addProducer', cors(), (req, res)=>{
        const newProducer = new Producer(req.body);
        try {
            base.collection('producers').insertOne(newProducer)
            return res.json({success: "added"})
        } catch (e) {
           return res.json({error: "can't add"})
        };
})

chocolateRouter.put('/updateChocolate/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Chocolate.findOneAndUpdate({_id:req.params.id}, req.body, (err, docs)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
})

chocolateRouter.delete('/deleteChocolate/:id', cors(), (req, res)=>{
        Chocolate.remove({_id:req.params.id}, (err, chocolate)=>{
            if(err){
                return res.json({error: "can't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
    })

chocolateRouter.delete('/deleteProducer/:id', cors(), (req, res)=>{
        Chocolate.find({producer_id:req.params.id}, (err, chocolate)=>{
            console.log(chocolate)
            if(err){
                return res.json({error: "can't delete"})
            }
            else{
                if (chocolate.length < 1){
                    Producer.remove({_id:req.params.id}, (err, producer)=>{
                        if(err){
                            return res.json({error: "can't add"})
                        }
                        else{
                            return res.json({success: "added"})
                        }
                    })
                } 
            }
        })
})
    
       

chocolateRouter.put('/editProducer/:id', cors(), (req, res)=>{
    console.log("JSON", req.body)
        Producer.findOneAndUpdate({_id:req.params.id}, req.body, (err, docs)=>{
            if(err){
                return res.json({error: "cann't add"})
            }
            else{
                return res.json({success: "added"})
            }
        })
})

app.listen(port, ()=>{
    console.log("Running on port" + port)
})




