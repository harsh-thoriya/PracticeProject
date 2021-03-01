const path = require('path');
const bcrypt = require('bcryptjs')
const express = require('express');
const auth = require('../Controller/auth.js')

const userModel = require('../Models/users.js');

const router = express.Router();

const basePath = path.join(__dirname,'..')

router.get('/', (req,res,next) => {
    if(req.session.isLoggedIn){
        res.redirect('/homepage')
    }
    res.render('StartPage/index.ejs')
})

router.get('/login', (req,res,next) => {
    if(req.session.isLoggedIn){
        res.redirect('/homepage')
    }
    res.render('StartPage/index.ejs')
})

router.post('/login', (req,res,next) => {

    userModel.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            
            return req.session.save(err => {
             // console.log(err);
              
              res.redirect('/homepage');
            });
          }
          res.redirect('/');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));

})

router.get('/sign-up', (req,res,next) => {
    if(req.session.isLoggedIn){
        res.redirect('/homepage')
    }
    res.render('StartPage/signup.ejs')
})

router.post('/sign-up',(req,res,next) => {
    
    bcrypt.hash(req.body.password,12).then((password)=>{
        let username = req.body.username
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

    
})

router.get('/logout',auth,(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(req.session)
        res.redirect('/')
    })
})

module.exports = router;