const path = require('path');
const express = require('express');
const userModel = require('../Models/users.js')
const basePath = path.join(__dirname,'..')

const getHomepage = (req,res,next)=>{
    res.render('homepage/homepage.ejs')
}

const getAddBook = (req,res,next)=>{
    console.log("Inside Book Adding ... ")
    res.render('homepage/add-book.ejs')
}

module.exports = {getAddBook,getHomepage}