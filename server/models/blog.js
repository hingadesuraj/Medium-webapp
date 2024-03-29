    const mongoose = require('mongoose')

    const blogSchema = mongoose.Schema({
        userId:String,
        title:String,
        description:String,
        img:String,
        author:String,
        date: {
            type: Date,
            default: Date.now  // Setting the default value to the current date/time
        }

    })


    const Blog = mongoose.model("Blog",blogSchema);

    module.exports = Blog