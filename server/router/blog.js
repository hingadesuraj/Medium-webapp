const express = require('express');
const { createBlog } = require('../controller/blog');
 
const router = express.Router();


// user 
router.post("/create",createBlog);

 

module.exports = router