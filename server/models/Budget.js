const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },

  budgetAmount: {
    type: Number,
    required: [true, "Please enter a amount"],
  },

  totalExpense: {
    type: Number,
    default: 0,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Budget", budgetSchema);
