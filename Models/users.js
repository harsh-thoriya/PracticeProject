const mongoose = require('mongoose')

const schema = mongoose.Schema;

const users = new schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(value.length < 5){
                throw new Error('Password must be >=5 characters')
            }
        },
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
        min: 10
    },
    profilePictureURL:{
        type:String
    }
})

module.exports = mongoose.model('user', users);