const express = require('express');
const { userSignup, userLogin } = require('../controller/user');
const router = express.Router();


// user 
router.post("/signup",userSignup);
router.post("/login",userLogin)

 

module.exports = router