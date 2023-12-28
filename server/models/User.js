const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
  },

  totalIncome: {
    type: Number,
    default: 0,
  },

  totalExpense: {
    type: Number,
    default: 0,
  },

  totalBudget: {
    type: Number,
    default: 0,
  },

  totalExpense: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
