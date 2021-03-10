const path = require('path');
const fs = require('fs')
const userModel = require('../Models/users.js')
const basePath = path.join(__dirname,'..')
const imagePath = path.join(basePath,'Images')

const postEditProfile = async (req,res,next)=>{
    if(req.files){
        fs.unlink(path.join(imagePath,req.user.profilePictureURL), (err)=>{
            if(err){
                CSSConditionRule.log(err)
            }
            else{
                console.log("Old Pic deleted")
            }
        } )
        let profilePictureURL = req.files.profile_pic[0].path.split('\\')[1]
        await userModel.updateOne({_id: req.user._id},{$set : {username: req.body.username, email:req.body.email, mobile:req.body.mobile_number, profilePictureURL}})
    }
    else{
        await userModel.updateOne({_id: req.user._id},{$set : {username: req.body.username, email:req.body.email, mobile:req.body.mobile_number}})
    }
    
    res.redirect('/profile')
}

const getEditProfile = (req,res,next) => {
    res.render('profile/edit_profile.ejs',{user:req.user})
}

const getProfile = (req,res,next) => {
    res.render('profile/profile.ejs',{user:req.user})
}

module.exports = {getEditProfile,getProfile,postEditProfile}