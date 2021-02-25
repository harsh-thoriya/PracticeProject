const mongoose = require('mongoose')

const schema = mongoose.Schema;

const user = new schema({
    username:String,
    password:String,
    email:String,
    mobile:Number
})

module.exports = mongoose.model('user', user);