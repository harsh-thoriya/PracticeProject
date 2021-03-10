const mongoose = require('mongoose')

const schema = mongoose.Schema;

const books = new schema({
    bookImageURL:{
        type:String,
        required: true
    },
    bookTitle:{
        type:String,
        required:true
    },
    bookDescription:{
        type:String,
        required:false
    },
    //date:{
    //    type: Date,
    //    required: true
    //},
    bookAuthor:{
        type: String,
        default : "Unknown"
    },
    bookOwner:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('book', books);