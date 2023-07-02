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
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const clientID = "1041261791254-mbtvjmn3kep32isbfr7mn6v2fp99ibu8.apps.googleusercontent.com"
const clientSECRET = "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";
const client = new OAuth2Client(clientID);
const scopes = ['www.googleapis.com/auth/userinfo.email', 'www.googleapis.com/auth/userinfo.profile']
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
// const json = bodyParser.json()
// router.use(json)
// router.use(json)

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
    // console.log('inside seriealize...user' + JSON.stringify(user.doc.id));
    cb(null, user.doc.id);
});

passport.deserializeUser(function (id, cb) {
    console.log('inside deserialize');
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
            console.log("profile received is: " + JSON.stringify(profile));
            console.log('name is: ' + JSON.stringify(profile.name));
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

router.post('/login', (req, res, next) => {
    console.log((req.body));
    passport.authenticate('google-one-tap', {
        failureRedirect: 'http://localhost:3000/signin',
        successRedirect: 'http://localhost:3000/'
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
    console.log("user found is :\n" + req.user);

})

router.get('/signout', (req, res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('http://localhost:3000/')
        }
    })
})

// router.post('/login',
//     (req, res, next) => {
//         console.log(req.body);
//         passport.authenticate('google-one-tap',
//             {
//                 failureRedirect: '/signin',
//                 successRedirect: '/'
//             })(req, res, next)
//     },
//     // (req, res) => {
//     //     console.log(req.body);
//     //     res.send('/')
//     // }
// )

router.get('/secretpage', (req, res) => {
    res.redirect('http://localhost:3000/signin')
})















// function verifyPassword(password, hash, salt) {
//     //password is the password entered by the user
//     //hash and salt are those stored with the user in the db
//     //those will be used to hash the input password and the resulting hash will be checked against it
//     var newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     return hash === newHash;
// }

// function generateHash(password) {
//     var salt = crypto.randomBytes(32).toString('hex');
//     var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

//     return {
//         salt: salt,
//         hash: genHash
//     };
// }





// passport.use(new localStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     // passReqToCallback: true,
//     session: true
//   },(username, password, done) => {
//     console.log(username);
//     User.findOne({ email_id: username }).then((user) => {
//         if (!user) {
//             return done(null, false)
//         }

//         //user existence is confirmed, now check validity of password
//         const isPasswordValid = verifyPassword(password, user.hash, user.salt)
//         console.log("hash:" + user.hash + "salt:" + user.salt);
//         console.log(isPasswordValid);
//         if (isPasswordValid) {
//             console.log("returning " + user);
//             return (null, user);
//         }
//         else {
//             return done(null, false)
//         }
//     }).catch((err) => {
//         console.log(err);
//         done(err)
//     })
// }))






// router.post('/register', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password
//     const { salt, hash } = generateHash(password)

//     User.exists({ email_id: username }).then((x) => {
//         if (x) {
//             res.send('user already exists')
//         }
//         else {
//             User.create(new User({
//                 email_id: username,
//                 hash: hash,
//                 salt: salt
//             })).then((z) => {
//                 res.send('new user saved\n' + z)
//             }).catch((err) => { console.log(err); })
//         }
//     })

// })

// router.post('/login', (req, res)=>{
//     res.send('on /login')
// })

// router.post('/login', (req, res, next) =>
//     passport.authenticate('local',
//         {
//             successReturnToOrRedirect: '/',
//             successRedirect: '/',
//             successMessage: 'success',
//             failureRedirect: '/signin'
//         }
//     )(req, res, next)
//     //     // ,
//     //     // (err, req, res, next)=>{
//     //     //     res.send('success')
//     //     // }
//     //     // ,
//     //     // (err, req, res, next)=>{}
// )

// router.post('/login', (req, res)=>{res.send('hello')})

// router.post('/login', (req, res)=>{
//     const user = new User({
//         email_id:req.body.username

//     })
// })

// router.get('/protected', (req, res) => {
//     res.send("this message must only be shown after the user has been authenticated")
// })

// router.post('/login', (req, res) => {

//     const email_id = req.body.username
//     const password = req.body.password

//     User.exists({ email_id: email_id }).then((x) => {
//         if (x) {
//             console.log('already exists');
//         }
//         else {
//             User.findOrCreate({
//                 email_id: email_id,
//                 password: password
//             })
//         }
//     })

//     res.redirect('/signin')
// })

module.exports = router;