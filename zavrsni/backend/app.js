const express = require('express');
const mongoose=require('mongoose');
const User = require('./models/UsersModel')
const Category = require('./models/CategoryModel')
const nodemailer = require('nodemailer');
const Brand = require('./models/BrandModel')
const Shade = require('./models/ShadeModel')
const Product = require('./models/ProductModel')
const Discount = require('./models/DiscountModel')
const UserDiscount = require('./models/UserDiscountModel')
const Comment = require('./models/CommentModel')
const Shipping = require('./models/ShippingModel')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const router = express.Router()
const {signJwt, verifyJwt} = require('./jwt');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const cors = require("cors");
const Favourite = require('./models/FavouriteModel');
const app = express();
const userRouter = express.Router();
const productRouter = express.Router();

const port = process.env.PORT || 3001;
const CLIENT_ID = process.env.CLIENT_ID;
const APP_SECRET = process.env.APP_SECRET;
mongoose.set('strictQuery', false);
 mongoose.connect('mongodb+srv://katarinakolak33:12345@cluster0.bwx3ngm.mongodb.net/shopDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(res=>console.log("Connected!")).catch(err=>console.log("Error", err.message)); // my database collection

const db = mongoose.connection

db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log("Database opened"));

    
app.listen(port, ()=>{
console.log("Running on port " + port); 
})

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

app.use("/user", userRouter);
app.use("/product", productRouter);

// getting all
userRouter.get('/users', async (req, res) =>{
    User.find((err, users)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "users" : users})
        }
    })
})

//getting one
userRouter.get('/user/:id'/*, verifyJwt*/, cors(), (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(user)
        }
    })
})

// edit one
userRouter.put('/updateUser/:id', cors(), (req, res)=>{
    const saltRounds = 10; // definiranje salt vrijednosti 
    User.findById(req.params.id, (err, user) => {
        if (err){
            return res.send(err);
        } else{
            if (req.body.password){
                bcrypt.genSalt(saltRounds, function(err, salt) { 
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    //let user = new User({name: req.body.name, surname: req.body.surname, username: req.body.username, email: req.body.email, password: hash, role: req.body.role});
                    newUser = {name: req.body.name, surname: req.body.surname, username: req.body.username, email: req.body.email, password: hash, role: "user", purchasesNum: req.body.purchasesNum, discount: req.body.discount}
                    User.findOneAndUpdate({_id:req.params.id}, newUser, (err, userNew)=>{
                        if(err){
                            return res.json({error: "can't add"})
                        }
                        else{
                            return res.json({success: newUser})
                        }
                    })
                });
            }); 
            } else {
                newUser = {name: req.body.name, surname: req.body.surname, username: req.body.username, email: req.body.email, password: user.password, role: "user", purchasesNum: req.body.purchasesNum, discount: req.body.discount}
                    
                    User.findOneAndUpdate({_id:req.params.id}, newUser, (err, userNew)=>{
                        if(err){
                            return res.json({error: "can't add"})
                        }
                        else{
                            return res.json({success: newUser})
                        }
                    })
            }
                
        }
    })
    
})

//creating one
userRouter.post('/register', jsonParser, (req, res) => {
    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length > 0) {
            return res.json({message: "email"});
        }

        const saltRounds = 10; // definiranje salt vrijednosti 
        bcrypt.genSalt(saltRounds, function(err, salt) { 
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                let user = new User({name: req.body.name, surname:req.body.surname, username:req.body.username,  email: req.body.email, password: hash, role: req.body.role, purchasesNum: req.body.purchasesNum, discount: req.body.discount});
                user.save();
                return res.json(user);
            });
          });

        
    })
});

// login api
userRouter.post('/login',jsonParser,(req, res)=>{
    User.find({username: req.body.username}, function (error, users) { 
        if (error || users.length === 0) {
            return res.json({message: "don't exist"});
        }
        if (req.body.username !== users[0].username) {
            return res.json({message: "username"})
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

//update one
userRouter.post('/:id',jsonParser, getUser, async  (req,res)=>{
    if(req.body.name != null){
        res.user.name=req.body.name
    }
    if(req.body.surname != null){
        res.user.name=req.body.name
    }
    if(req.body.username != null){
        res.user.name=req.body.name
    }
    if(req.body.email != null){
        res.user.email=req.body.email
    }
    if(req.body.password != null){
        res.user.password=req.body.password
    }
    if(req.body.role != null){
        res.user.role=req.body.role
    }
    
    try {
        const updateUser=await res.user.save()
        res.json(updateUser.ime)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


//delete one
userRouter.delete('/:id',getUser,async (req,res)=>{
     try {
       await res.user.remove()
        res.json({message:'User deleted'})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
})


async function getUser(req,res,next){
    let user

    try {
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'Cannot find user'})
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
    res.user=user
    next()
}

// PRODUCT ROUTES

productRouter.post('/addCategory', cors(), (req, res)=>{
    try {
        let category = new Category({type: req.body.type});
        category.save();
        return res.json(category);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addComment', cors(), (req, res)=>{
    try {
        let comment = new Comment({date: req.body.date, vote: req.body.vote, detail: req.body.detail, user_id: req.body.user_id, product_id: req.body.product_id});
        comment.save();
        return res.json(comment);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addFavourite', cors(), (req, res)=>{
    try {
        let favourite = new Favourite({product_id: req.body.product_id, user_id: req.body.user_id});
        favourite.save();
        return res.json(favourite);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addBrand', cors(), (req, res)=>{
    try {
        let brand = new Brand({name: req.body.name, image: req.body.image, address: req.body.address, details: req.body.details});
        brand.save();
        return res.json(brand);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addShade', cors(), (req, res)=>{
    try {
        let shade = new Shade({hex: req.body.hex, product_id: req.body.product_id, quantities: req.body.quantities});
        shade.save();
        return res.json(shade);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addUserDiscount', cors(), (req, res)=>{
    try {
        let data = new UserDiscount({user_id: req.body.user_id, discount_id: req.body.discount_id});
        data.save();
        return res.json(data);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

function formatDate(dateParam){
    let date_ob = new Date(dateParam);
    let date = date_ob.getDate();
    let month = (date_ob.getMonth() + 1).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let current = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    return current;
}

productRouter.post('/addDiscount', cors(), (req, res)=>{
    try {
        let discount = new Discount({code: req.body.code, value: req.body.value, expire: (req.body.expire).toLocaleString()});
        discount.save();
        return res.json(discount);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addShipping', cors(), (req, res)=>{
    try {
        let shipping = new Shipping({user_id: req.body.user_id, date: req.body.date, status: req.body.status, total_price: req.body.total_price, items: req.body.items, shipp: req.body.shipp});
        shipping.save();
        return res.json(shipping);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

productRouter.post('/addProduct', cors(), (req, res)=>{
    try {
        let product = new Product({name:req.body.name,
            image:req.body.image,
            price:req.body.price,
            details:req.body.details,
            ingredients:req.body.ingredients,
            usage:req.body.usage,
            size:req.body.size,
            on_stock:req.body.on_stock,
            discount:req.body.discount,
            date: new Date(),
            brand_id: req.body.brand_id,
            category_id:req.body.category_id,
            shades: req.body.shades});
        product.save();
        return res.json(product);
    } catch (e) {
        return res.json({error: "can't add"})
    };
})

/************** GET *******************/


productRouter.get('/categories', cors(), (req, res)=>{
    Category.find({}).sort({"type":1}).exec((err, categories)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "categories" : categories})
        }
    })
})

productRouter.get('/brands', verifyJwt, cors(), (req, res)=>{
    Brand.find((err, brands)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "brands" : brands})
        }
    })
})

productRouter.get('/shades', cors(), (req, res)=>{
    Shade.find((err, shades)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "shades" : shades})
        }
    })
})

productRouter.get('/shippings', verifyJwt, cors(), (req, res)=>{
    Shipping.find((err, shippings)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "shippings" : shippings})
        }
    })
})

productRouter.get('/discounts', cors(), (req, res)=>{
    Discount.find({expire: { $gt: new Date() }}, (err, discount)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(discount);
        }
    })
})

function getFloat(value) {
    return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
}

productRouter.get('/filterProduct/:min/:max', cors(), (req, res)=>{
    Product.find({$and: [{price: { $gte: parseFloat(req.params.min) }}, {price: { $lte: parseFloat(req.params.max) }}]}, (err, products)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(products);
        }
    })
})

productRouter.get('/bestAttack', cors(), (req, res)=>{
    Product.find({discount: { $gte: parseInt(15) }}, (err, products)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(products);
        }
    })
})


function sortByDate(a,b){
    return new Date(b.date) - new Date(a.date);
};

productRouter.get('/newProducts', cors(), (req, res)=>{
    Product.find((err, products)=>{
        if(err){
            res.send(err.message)
        }
        else{
            products.sort(sortByDate)
            return res.json({ "products" : products})
        }
    })
})


productRouter.get('/userDiscounts/:userId/:discountId', cors(), (req, res)=>{
    UserDiscount.find({user_id: req.params.userId, discount_id: req.params.discountId}, (err, discount)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(discount);
        }
    })
})

productRouter.get('/productShades/:productId', cors(), (req, res)=>{
    Shade.find({product_id: req.params.productId}, (err, shades)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(shades);
        }
    })
})

productRouter.get('/products', cors(), (req, res)=>{
    Product.find((err, products)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "products" : products})
        }
    })
})

productRouter.get('/comments', cors(), (req, res)=>{
    Comment.find((err, comments)=>{
        if(err){
            res.send(err.message)
        }
        else{
            return res.json({ "comments" : comments})
        }
    })
})

productRouter.get('/product/:id', cors(), (req, res)=>{
    Product.findById(req.params.id, (err, product)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(product)
        }
    })
})

productRouter.get('/shipping/:id', verifyJwt, cors(), (req, res)=>{
    Shipping.findById(req.params.id, (err, shipping)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(shipping)
        }
    })
})

productRouter.get('/shippingByUser/:id', verifyJwt, cors(), (req, res)=>{
    Shipping.find({user_id: req.params.id}, (err, shipping)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(shipping)
        }
    })
})

/*
productRouter.get('/bestSellers', cors(), (req, res)=>{
    Shipping.find((err, orders)=>{
        if(err){
            res.send(err.message)
        }
        else{
            let products = [];
            orders.map((myorders) => {
                myorders.items.map((item) => {
                    Product.find({_id: item}, (err, product) => {
                        if (err){
                            console.log(err.message)
                        } else {
                            products = [...products, product];
                            console.log("PRODUCTS: ", products);
                        }
                    })
                })
                console.log("PRODUCTS []: ", products);
            return res.json(products);
            })
            
        }
        
    })
})
*/
productRouter.get('/searchProducts/:search', cors(), (req, res)=>{
    Product.find({ name: { $regex: req.params.search } }, (err, products)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(products)
        }
    })
})

productRouter.get('/productsByCategory/:category_id', cors(), (req, res)=>{
    Product.find({category_id:req.params.category_id}, (err, products)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(products);
            return res.json(products)
        }
    })
})

productRouter.get('/brand/:id', cors(), (req, res)=>{
    Brand.findById(req.params.id, (err, brand)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(brand)
        }
    })
})

productRouter.get('/favouriteByUser/:id', cors(), (req, res)=>{
    Favourite.find({user_id: req.params.id}, (err, favs)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(favs)
        }
    })
})

productRouter.get('/comment/:id', cors(), (req, res)=>{
    Comment.find({id: req.params.id}, (err, comments)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(comments)
        }
    })
})


productRouter.get('/category/:id', cors(), (req, res)=>{
    Category.findById(req.params.id, (err, category)=>{
        if(err){
            console.log(err)
        }
        else{
            return res.json(category)
        }
    })
})
/************************ EDIT *******************************************/

productRouter.put('/updateProduct/:id', cors(), (req, res)=>{
    //let user = new User({name: req.body.name, surname: req.body.surname, username: req.body.username, email: req.body.email, password: hash, role: req.body.role});
    updateProduct = {name: req.body.name, image: req.body.image, price: req.body.price, details: req.body.details, ingredients: req.body.ingredients, usage: req.body.usage, size: req.body.size, on_stock: req.body.on_stock, discount: req.body.discount, date: new Date(), brand_id: req.body.brand_id, category_id: req.body.category_id, shades: req.body.shades}
    Product.findOneAndUpdate({_id:req.params.id}, updateProduct, (err, updated)=>{
        if(err){
            return res.json({error: "can't add"})
        }else{
            return res.json({success: "added"})
        }
    })
})

productRouter.put('/updateComment/:id', cors(), (req, res)=>{
    updateComment = {date: req.body.date, vote: req.body.vote, detail: req.body.detail, user_id: req.body.user_id, product_id: req.body.product_id}
    
    Comment.findOneAndUpdate({_id:req.params.id}, updateComment, (err, updated)=>{
        if(err){
            return res.json({error: "can't add"})
        }else{
            return res.json({success: "added"})
        }
    })
})

productRouter.put('/updateFavourite/:id', cors(), (req, res)=>{
    updateFavourite = {product_id: req.body.product_id, user_id: req.body.user_id}
    Favourite.findOneAndUpdate({user_id:req.params.id}, updateFavourite, (err, updated)=>{
        if(err){
            return res.json({error: "can't add"})
        }else{
            return res.json({success: "added"})
        }
    })
})

productRouter.put('/updateCategory/:id', cors(), (req, res)=>{
    let updateCategory = { type: req.body.type}
    Category.findOneAndUpdate({_id:req.params.id}, updateCategory, (err, updated)=>{
        if(err){
            return res.json({error: "can't edit"})
        }else{
            return res.json({success: "edit"})
        }
    })
})

productRouter.put('/updateShade/:id', cors(), (req, res)=>{
    let updateShade = { hex: req.body.hex, product_id: req.body.product_id, quantities: req.body.quantities}
    Shade.findOneAndUpdate({_id:req.params.id}, updateShade, (err, updated)=>{
        if(err){
            return res.json({error: "can't edit"})
        }else{
            return res.json({success: "edit"})
        }
    })
})

productRouter.put('/updateShipping/:id', cors(), (req, res)=>{
    updateShipping = {user_id: req.body.user_id, date: req.body.date, status: req.body.status, total_price: req.body.total_price, items: req.body.items, shipp: req.body.shipp}
    Shipping.findOneAndUpdate({_id:req.params.id}, updateShipping, (err, updated)=>{
        if(err){
            return res.json({error: "can't add"})
        }else{
            return res.json({success: "added"})
        }
    })
})

productRouter.put('/updateBrand/:id', cors(), (req, res)=>{
    const updateBrand = { name: req.body.name, image: req.body.image, address: req.body.address, details: req.body.details }
    Brand.findOneAndUpdate({_id:req.params.id}, updateBrand, (err, updated)=>{
        if(err){
            return res.json({error: "can't edit"})
        }else{
            return res.json({success: "edit"})
        }
    })
})


/******************************** DELETE ********************************************** */
productRouter.delete('/deleteProduct/:id', cors(), (req, res)=>{
    Product.remove({_id:req.params.id}, (err, product)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})

productRouter.delete('/deleteComment/:id', cors(), (req, res)=>{
    Comment.remove({_id:req.params.id}, (err, comment)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})


productRouter.delete('/deleteShade/:id', cors(), (req, res)=>{
    Shade.remove({_id:req.params.id}, (err, shade)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})


productRouter.delete('/deleteCategory/:id', cors(), (req, res)=>{
    Category.remove({_id:req.params.id}, (err, category)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})

productRouter.delete('/deleteBrand/:id', cors(), (req, res)=>{
    Brand.remove({_id:req.params.id}, (err, brand)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})

productRouter.delete('/deleteShipp/:id', cors(), (req, res)=>{
    Shipping.remove({_id:req.params.id}, (err, shipp)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})

productRouter.delete('/favouriteProduct/:user_id/:product_id', cors(), (req, res)=>{
    Favourite.remove({$and: [{user_id: req.params.user_id}, {product_id: req.params.product_id}]}, (err, favs)=>{
        if(err){
            return res.json({error: "can't delete"})
        }
        else{
            return res.json({success: "deleted"})
        }
    })
})

/************************* Statistic ******************************************** */

productRouter.get('statisticPerDay/:date', cors(), (req, res) => {
    Shipping.find({date: { $lte: parseFloat(req.params.max) }}, (eqq, shipp) => {
        if (err){
            return res.json({error: "can't find"});
        } else {
            return res.json(shipp);
        }
    })
})

productRouter.get('statistic/:dateMin/dateMax', cors(), (req, res) => {
    Shipping.find({$and: [{date: { $gte: req.params.dateMax }}, {date: { $lte: req.params.dateMin }}]} , (err, shipp) => {
        if (err){
            return res.json({error: "can't find"});
        } else {
            return res.json(shipp);
        }
    })
})

productRouter.get('/usersPerMonth/', cors(), (req, res) => {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    var shippingPerMonth = []
    var users = []

    Shipping.find((err, shippings)=>{
        if(err){
            res.send(err.message)
        }
        else{
            shippings.map((item, index) => {
                const itemMonth = new Date().getMonth();
                const year = new Date().getFullYear();
                if (itemMonth === currentMonth && year === currentYear){
                    shippingPerMonth.push(item);
                }
            })
            //return res.json({ "users" : users})
        }
    })
    shippingPerMonth.map((users, i) => {
        User.findById(users._id, (err, all) => {
            if (err){
                res.send(err.message);
            } else{
                users.push(all);
            }
        })
    })
    return res.json({ "users" : users})

})

productRouter.post('/sendEmail/', cors(), (req, res) => {
    const { to, subject, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 't8978753@gmail.com', 
        pass: 'vbgnjmxwsevifjle', 
      },
      port: 465,
        secure: true, 
    });
  
    const mailOptions = {
      from: 'katarinakolak33@gmail.com', 
      to: to,
      subject: subject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Greška pri slanju emaila:', error);
          res.status(500).json({ error: 'Greška pri slanju emaila' });
        } else {
          console.log('Email poslan:', info.response);
          res.status(200).json({ message: 'Email poslan' });
        }
      });
  });
