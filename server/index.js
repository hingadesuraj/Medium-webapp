const express = require('express')
const dotenv = require('dotenv');
const connectToDb = require('./db')
const user = require("./router/user")
const blog = require("./router/blog")
const app = express();


const PORT = 3000;
dotenv.config();
connectToDb();
app.use(express.json())

// /routes
app.use("/api/v1/user",user);
app.use("/api/v1/blog",blog);
app.get("/",(req,res)=>{
    res.send("Server is running ")
    req.body
})

  


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})