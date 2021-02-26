const path = require('path');
const bcrypt = require('bcryptjs')
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
              
              res.redirect('/');
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

    // bcrypt.hash(req.body.password,12).then((password)=>{
      
    //     userModel.find({username:username, password:password},(err,doc)=>{
    //         if(err){
    //             console.log("Invalid credentials")
    //             res.redirect('/')
    //         }
    //         else{
    //             req.session.isLoggedIn = true
    //             req.session.user = doc[0]
    //             console.log("Logged In")
    //             console.log(doc)
    //             return req.session.save((err) => {
    //                 console.log(err);
    //                 res.redirect('/');
    //               });
                
    //         }
            
    //     })

    // })
    
    
})

router.get('/sign-up', (req,res,next) => {
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

module.exports = router;