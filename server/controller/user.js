const User = require("../models/user");
const bcrypt = require('bcrypt')

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

        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password,saltRounds);
        // console.log(hashPass)

        // Create the user
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        return res.status(200).json({
            success: true,
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

module.exports = {
    userSignup,
};
