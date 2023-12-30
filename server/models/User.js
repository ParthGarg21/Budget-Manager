const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a username"],
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
  },

  totalExpense: {
    type: Number,
    default: 0,
  },

  totalBudget: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
