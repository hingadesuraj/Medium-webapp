const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authenticationToken = req.headers.authorization;

    if (!authenticationToken || !authenticationToken.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid authentication token in the 'Authorization' header.",
      });
    }

    const token = authenticationToken.split(" ")[1];

    // Verify the token
    jwt.verify(token, "Suraj", (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired authentication token. Please log in again.",
        });
      }

      // Token is valid, extract user ID and proceed
      req.userId = decodedToken.id;
      next();
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = authMiddleware;
