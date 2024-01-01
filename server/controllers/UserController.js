const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get the current user --> convert to post
const getCurrentUser = async (req, res) => {
  // get the userId from the req object set by the authenticator middleware
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

    // create a new user
    const newUser = new User({ userName, password: hashedPassword });

    // create a jwt token for authentication
    newUser.token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // save the user to the database
    await newUser.save();

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

// logout an existing user by clearing the token from local storage at the client side
const logoutUser = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

module.exports = { getCurrentUser, loginUser, registerUser, logoutUser };
