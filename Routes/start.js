const path = require('path');

const express = require('express');
const userModel = require('../Models/users.js')

const router = express.Router();

const basePath = path.join(__dirname,'..')

router.get('/', (req,res,next) => {
    res.render('StartPage/index.ejs')
})

router.get('/login', (req,res,next) => {
    res.render('StartPage/index.ejs')
})

router.post('/login', (req,res,next) => {
    username = req.body.username
    password = req.body.password

    userModel.find({username:username, password:password},(err,doc)=>{
        if(err){
            console.log("Invalid credentials")
            res.redirect('/')
        }
        else{
            console.log("Logged In")
            console.log(doc)
            res.redirect('/')
        }
        
    })
    
})

router.get('/sign-up', (req,res,next) => {
    res.render('StartPage/signup.ejs')
})

router.post('/sign-up',(req,res,next) => {
    let username = req.body.username
    let password = req.body.password
    let mobileNumber = req.body.mobile_number
    let email = req.body.email

    const user = new userModel({
        username,
        password,
        email,
        mobile:mobileNumber
    })
    user
    .save()
    .then(result => {
        console.log('Created Product : ',result);
      })
      .catch(err => {
        console.log(err);
      });

    //res.sendFile('StartPage/index.ejs')
    //res.render('StartPage/index.ejs')
    res.redirect('/')
})

module.exports = router;