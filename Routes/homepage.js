const express = require('express')
const auth = require('../Controller/auth.js')
const homepageControllers = require('../Controller/homepage.js')

const router = express.Router();

router.get('/',auth,homepageControllers.getHomepage)

router.get('/add-book',auth,homepageControllers.getAddBook)

router.post('/add-book',auth,homepageControllers.postAddBook)

module.exports = router