const express = require('express')
const app = express()
const port = 3300
const assets = require('./assets')

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))