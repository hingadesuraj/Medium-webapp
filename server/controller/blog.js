const Blog = require("../models/blog");

const createBlog = async (req, res, next) => {
  try {
    const {  title, description, image, author } = req.body;

    // this got from user with middleware authentication
    const Id = req.userId;
    console.log(Id)

    await Blog.create({
      userId: Id,
      title: title,
      description: description,
      image: image,
      author: author,
    });

    res.status(200).json({
      success: true,
      message: "Blog Created Successfull.",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  createBlog,
};
