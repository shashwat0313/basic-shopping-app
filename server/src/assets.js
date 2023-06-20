const express = require('express')
const router = express.Router();

const ASSETS = {
    HEADING: "Shopping App v1",
    ITEMS: [
        { name: "item1", quantity: 1, price: 10000 },
        { name: "item2", quantity: 5, price: 20000 },
        { name: "item3", quantity: 3, price: 24000 },
        { name: "item4", quantity: 2, price: 30000 },
        { name: "some other", quantity: 4, price: 15000 }
    ]
}

router.get('/assets', (req, res)=>{
    res.json(ASSETS)
})

module.exports = router;