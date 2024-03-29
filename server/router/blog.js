const express = require('express');
const { createBlog } = require('../controller/blog');
const authMiddleware = require('../middleware');
 
const router = express.Router();


// user 
router.post("/create",authMiddleware,createBlog);

 

module.exports = router