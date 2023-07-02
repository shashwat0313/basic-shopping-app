const express = require('express')
const router = express.Router();
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/shop")

const itemSchema = new mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number
})

itemSchema.plugin(findOrCreate)

const Item = new mongoose.model('Item', itemSchema)

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
    ITEMS:[]
}

Item.find({}, 'name price quantity -_id').then((x)=>{
    assets.ITEMS = x;
})

router.get('/assets', (req, res)=>{
    // console.log(assets);
    res.json(assets)
})

module.exports = router;