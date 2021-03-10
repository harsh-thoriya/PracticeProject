const path = require('path');
const express = require('express');
const userModel = require('../Models/users.js')
const bookModel = require('../Models/books.js')
const basePath = path.join(__dirname,'..')

const getHomepage = (req,res,next)=>{
    res.render('homepage/homepage.ejs')
}

const getAddBook = (req,res,next)=>{
    res.render('homepage/add-book.ejs')
}

const postAddBook = (req,res,next)=>{
    try{
        const book = new bookModel({
            bookTitle: req.body.bookTitle,
            bookDescription: req.body.bookDescription,
            //bookDate: Date.now(),
            bookAuthor: req.body.bookAuthor,
            bookOwner: req.user.username,
            bookImageURL: req.files.book_pic[0].path.split('\\')[1]
        })

        book.save()
        return res.redirect('/homepage')
    }
    catch(err){
        console.log(err)
        res.status(404).send("failed to add book, get back to hamepage and try again")
    }
    
}

module.exports = {getAddBook,getHomepage,postAddBook}