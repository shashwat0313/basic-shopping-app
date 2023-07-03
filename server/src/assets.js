const express = require('express')
const router = express.Router();
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/shop")

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
})

itemSchema.plugin(findOrCreate)

const Item = new mongoose.model('Item', itemSchema)


const userSchema = new mongoose.Schema(
    {
        Name: String,
        email: String,
        cart: []
    }
)

userSchema.plugin(findOrCreate)

const User = new mongoose.model('user', userSchema)

// const ASSETS = {
//     HEADING: "Shopping App v1",
//     ITEMS: [
//         { name: "item1", quantity: 1, price: 10000 },
//         { name: "item2", quantity: 5, price: 20000 },
//         { name: "item3", quantity: 3, price: 24000 },
//         { name: "item4", quantity: 2, price: 30000 },
//         { name: "some other", quantity: 4, price: 15000 },
//         { name: "one more", quantity: 4, price: 15000 }
//     ]
// }

// ASSETS.ITEMS.forEach(element => {
//     Item.findOrCreate({
//         name:element.name,
//         quantity:element.quantity,
//         price:element.price
//     })
// })

const assets = {
    HEADING: "Shopping App v1",
    ITEMS: []
}

Item.find({}, 'name price quantity -_id').then((x) => {
    assets.ITEMS = x;
})

router.post('/cart', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        console.log(user.cart);
        res.json((user.cart))
    })
    // console.log();
    console.log('received xhr req');
})

router.post('/addtocart', (req, res) => {
    // const cart = (req.body.info).cart
    // console.log(cart);
    // const email = JSON.parse(req.body.info).email
    // console.log(cart + "..." + email);
    const cartString = JSON.stringify(JSON.parse(req.body.CartInfo).cart)
    // console.log("\ncartstring is: "+JSON.parse(cartString))
    // console.log("\ncartstring is: "+JSON.stringify((JSON.parse(cartString))[0]))

    //todo: create an array with cart items

    const email = JSON.parse(req.body.CartInfo).email
    const cartArr = JSON.parse(JSON.stringify(JSON.parse(req.body.CartInfo).cart))

    User.findOneAndUpdate({ email: email }, { cart: cartArr }, {new:true}).then((user) => {
        console.log("new user: " + user);
    })
    res.send(JSON.stringify(cartArr))
})

router.get('/assets', (req, res) => {
    // console.log(assets);
    res.json(assets)
})

module.exports = router;