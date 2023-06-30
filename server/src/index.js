const express = require('express')
const app = express()
const port = 3300
const assets = require('./assets')
const bodyParser = require('body-parser')
const accounts = require('./accounts');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

// const users =[
//     { username: "shashwat", age: 20 },
//     { username: "another user", age: 21 }
// ]
// app.get('/usersapi', (req, res) => {
//     // res.set('Access-Control-Allow-Origin', '*')
//     res.json({test:"testdata"})
// })

app.use('/api', assets)
app.use('/accounts', accounts)

app.post('/signin', (req, res)=>{
    console.log('post received');
    console.log((req.body));
    res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))