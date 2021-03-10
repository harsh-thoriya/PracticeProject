const express = require('express')
const auth = require('../Controller/auth.js')
const profileControllers = require('../Controller/profile.js')

const router = express.Router();

router.get('/',auth,profileControllers.getProfile)

router.get('/edit_profile',auth,profileControllers.getEditProfile)

router.post('/edit_profile',auth,profileControllers.postEditProfile)

module.exports = router