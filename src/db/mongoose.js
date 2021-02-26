const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/healthcare-api')
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.error('could not connect to MongoDb', err))
    
