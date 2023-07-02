const express = require('express')
const app = express()
const port = 3300
const assets = require('./assets')
const bodyParser = require('body-parser')
const accounts = require('./accounts');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', assets)
app.use('/accounts', accounts)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))