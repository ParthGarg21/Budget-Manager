const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get the current user
const getCurrentUser = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// register a new user
const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const result = await User.findOne({ userName });
    if (result) {
      throw new Error("User already exists");
    }

    // generate a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userName, password: hashedPassword });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// login an existing user
const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Wrong Password!");
    }

    // create a jwt token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // set a cookie on the client side with month of expiration in the response
    res.cookie("budget-manager-token", token, {
      maxDuration: 31 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// logout an existing user by reseting the token cookie
const logoutUser = (req, res) => {
  res.clearCookie("budget-manager-token");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

module.exports = { getCurrentUser, loginUser, registerUser, logoutUser };
