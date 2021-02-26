const express = require('express');
const config = require('config')
require('./src/db/mongoose')
require('./src/startup/config')();
const users = require ('./src/routes/users')
const auth = require ('./src/routes/auth');
const app = express()
const port = process.env.PORT || 3000


    
app.use(express.json())
app.use(users)
app.use(auth)


app.listen(port, ()=>{
    console.log('server is up on port' + port)
})