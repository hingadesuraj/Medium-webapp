const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { route } = require("../router/user");

const userSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please use another email.",
      });
    }

    // password hash
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);
    // console.log(hashPass)

    // Create the user
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
    });

    // generate token
    const Id = user._id;
    // console.log(userData._id)
    const token = jwt.sign({ Id }, "Suraj");
    // console.log(token)

    return res.status(200).json({
      success: true,
      token: token,
      message: "User registration successful.",
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

// login user

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userRegiser = await User.findOne({ email });

    if (!userRegiser) {
      res.status(400).json({
        success: true,
        message: "User not register please register first and then login",
      });
    }

    const passwordHash = userRegiser.password;
    const id = userRegiser._id;

    // token
    const token = jwt.sign({ id }, "Suraj");

    const comparePassword = await bcrypt.compare(password, passwordHash);
    // console.log(comparePassword)

    if (comparePassword) {
      res.status(200).json({
        success: true,
        message: "Login successfull..!",
        token: token,
        userData: userRegiser,
      });
    } else {
      res.status(411).json({
        success: true,
        message: "Password does not match",
      });
    }
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
  userSignup,
  userLogin,
};
