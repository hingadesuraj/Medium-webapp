const express = require('express');
const { userSignup } = require('../controller/user');
const router = express.Router();


// user 
router.post("/signup",userSignup)

 

module.exports = router