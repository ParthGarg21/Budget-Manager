const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
    },

    expenseAmount: {
      type: Number,
      required: [true, "Please enter a amount"],
    },

    budgetId: {
      type: mongoose.Types.ObjectId,
      ref: "Budget",
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
