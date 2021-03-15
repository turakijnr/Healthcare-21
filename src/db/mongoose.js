const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/healthcare-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.error('could not connect to MongoDb', err))
    
