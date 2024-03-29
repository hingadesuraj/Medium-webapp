const express = require('express')
const dotenv = require('dotenv');
const connectToDb = require('./db')
const app = express();


const PORT = 3000;
dotenv.config();
connectToDb();

app.get("/",(req,res)=>{
    res.send("Server is running ")
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})