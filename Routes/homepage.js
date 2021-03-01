const path = require('path');
const express = require('express');
const auth = require('../Controller/auth.js')

const userModel = require('../Models/users.js')

const router = express.Router();

const basePath = path.join(__dirname,'..')

router.get('/',auth,(req,res,next)=>{
    res.render('homepage/homepage.ejs')
})

module.exports = router