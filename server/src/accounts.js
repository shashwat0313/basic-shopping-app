const express = require('express')
const router = express.Router();
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose');
const crypto = require('crypto')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const session = require('express-session')
const mongostore = require('connect-mongo')
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;
const customStrategy = require('passport-custom').Strategy
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const clientID = "1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"
const clientSECRET = "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";
const client = new OAuth2Client(clientID);
const scopes = ['www.googleapis.com/auth/userinfo.email', 'www.googleapis.com/auth/userinfo.profile']
const bodyParser = require('body-parser');
const { log } = require('console');
router.use(bodyParser.urlencoded({ extended: true }));
const MongooseConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/shop")

const userSchema = new mongoose.Schema(
    {
        Name: String,
        email: String,
        cart: []
    }
)

userSchema.plugin(findOrCreate)

const User = MongooseConnection.model('user', userSchema)

const sessionStore = mongostore.create({ mongoUrl: "mongodb://127.0.0.1:27017/shop", collectionName: 'sessions' })

router.use(session({
    secret: "mysecrethahaha",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 10 * 60 * 1000,
    },
}))

passport.serializeUser(function (user, cb) {
    cb(null, user.doc.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id).then((user) => {
        if (user) {
            return cb(null, user)
        }
    }).catch((err) => { return cb(err) })
});

router.use(passport.initialize())
router.use(passport.session())

passport.use(
    new GoogleOneTapStrategy(
        {
            clientID: clientID, // your google client ID
            clientSecret: clientSECRET, // your google client secret
            verifyCsrfToken: false, // whether to validate the csrf token or not
        },
        function (profile, done) {
            if (!profile) { return done(null) }
            User.findOrCreate({
                email: (profile.emails[0].value),
                Name: profile.name.givenName + " " + profile.name.familyName
            }).then((user) => {
                console.log("user found:" + JSON.stringify(user));
                return done(err, user);
            }).catch((err) => {
                return done(err)
            });
        }
    )
);

passport.use('custom', new customStrategy(
    (req, done) => {
        const userDetails = (jwt.decode(req.body.credential))

        User.findOrCreate({
            email: userDetails.email,
            Name: userDetails.given_name + " " + userDetails.family_name
        }).then((user) => {
            return done(err, user);
        }).catch((err) => {
            return done(err)
        });
    }
))

router.post('/login', (req, res, next) => {
    passport.authenticate('google-one-tap', {
        failureRedirect: 'http://localhost:3000/signin',
        successRedirect: 'http://localhost:3000/'
    })(req, res, next)
})

router.post('/googleonetap', (req, res, next) => {

    passport.authenticate('custom', (err, user, info) => {
        if (user) {
            req.logIn(user, (err) => {
                if (err) { return next(err) }
                if(!user){return res.send('/signin')}
                else {
                    return res.send('/')
                }
            })
        }
    })(req, res, next)
})

var loginState = {}

router.get('/querylogin', (req, res) => {


    if (req.isAuthenticated()) {
        res.json({
            isLoggedIn: true,
            email: req.user.email
        })
    }
    else {
        res.json({
            isLoggedIn: null,
            email: ""
        })
    }
})

router.get('/signout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('http://localhost:3000/')
        }
    })
})

router.get('/secretpage', (req, res) => {
    res.redirect('http://localhost:3000/signin')
})

module.exports = router;