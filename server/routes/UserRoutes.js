const express = require("express");
const authenticator = require("../authenticator");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} = require("../controllers/UserController");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(authenticator, logoutUser);

router.route("/current-user").get(authenticator, getCurrentUser);

module.exports = router;
