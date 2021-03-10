const mongoose = require('mongoose')

const schema = mongoose.Schema;

const bookModel = new schema({
    bookTitle:{
        type:String,
        required:true
    },
    bookDescription:{
        type:String,
        required:false
    },
})