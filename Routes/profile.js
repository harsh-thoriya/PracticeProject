const path = require('path');
const express = require('express');
const auth = require('../Controller/auth.js')

const userModel = require('../Models/users.js')

const router = express.Router();

const basePath = path.join(__dirname,'..')

router.get('/',auth,(req,res,next)=>{
    res.render('profile/profile.ejs',{user:req.user})
})

router.get('/edit_profile',auth,(req,res,next)=>{
    res.render('profile/edit_profile.ejs',{user:req.user})
})

router.post('/edit_profile',auth,async (req,res,next)=>{
    let id = req.user._id
    console.log('inside')
    await userModel.updateOne({_id: req.user._id}, 
                        {$set : {username: req.body.username, email:req.body.email, mobile:req.body.mobile_number}})
    res.redirect('/profile')
})

module.exports = router