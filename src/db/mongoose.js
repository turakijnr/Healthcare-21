const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.error('could not connect to MongoDb', err))




// const mongoose = require('mongoose');
// const config = require('config');
// module.exports = function () {
    
//     const db = config.get('db');
//     mongoose.connect(db)// database connection
//         .then(()=> console.log (`Connected to ${db}...`));
    
