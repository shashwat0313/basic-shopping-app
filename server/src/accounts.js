const express = require('express')
const router = express.Router();
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose');

const MongooseConnection = mongoose.connect("mongodb://127.0.0.1:27017/people")

const userSchema = new mongoose.Schema(
    {
        // name:String,
        email_id: String,
        password: String
    }
)

userSchema.plugin(findOrCreate)

const User = new mongoose.model('user', userSchema)

router.post('/login', (req, res) => {

    const email_id = req.body.id
    const password = req.body.password

    User.exists({ email_id: req.body.id }).then((x) => {
        if (x) {
            console.log('already exists');
        }
        else {
            User.findOrCreate({
                email_id: email_id,
                password: password
            })
        }
    })

    res.redirect('/signin')
})

module.exports = router;