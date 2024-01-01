const jwt = require("jsonwebtoken");

// authenticator middleware
const authenticator = async (req, res, next) => {
  // get token from req body
  const { token } = req.body;
  
  try {
    // check if token exists
    if (!token) {
      throw new Error("No user is logged in");
    }
    const data = await jwt.verify(token, process.env.JWT_SECRET);

    // check if user exists
    if (!data?.id) {
      throw new Error("User not authorized");
    }

    // set userId in req object
    req.userId = data.id;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = authenticator;
