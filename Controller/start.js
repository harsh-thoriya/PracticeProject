const path = require('path');
const bcrypt = require('bcryptjs')
const express = require('express');
const userModel = require('../Models/users.js');

const basePath = path.join(__dirname,'..')

const getLogin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/homepage')
    }
    res.render('StartPage/index.ejs')
}

const postLogin = (req,res,next) => {

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

}

const getSignup = (req,res,next) => {
    if(req.session.isLoggedIn){
        res.redirect('/homepage')
    }
    res.render('StartPage/signup.ejs')
}

const postSignup = (req,res,next) => {
    
    bcrypt.hash(req.body.password,12).then((password)=>{
        let username = req.body.username
        let mobileNumber = req.body.mobile_number
        let email = req.body.email
        let profilePictureURL = req.files.profile_pic[0].path.split('\\')[1]
        
        const user = new userModel({
            username,
            password,
            email,
            mobile:mobileNumber,
            profilePictureURL
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
}

const getLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(req.session)
        res.redirect('/')
    })
}

module.exports = {getLogin,getLogout,getSignup,postLogin,postSignup}