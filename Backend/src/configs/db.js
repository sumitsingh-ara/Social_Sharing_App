const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connect =()=>{
    return mongoose.connect(`mongodb://localhost:27017/blogger`)
}


module.exports = connect;
//mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bpl9j.mongodb.net/?retryWrites=true&w=majority