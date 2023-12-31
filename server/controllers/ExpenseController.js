const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const User = require("../models/User");

// get all expenses
const getAllExpensesByUserId = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  console.log("userId", userId);

  try {
    const expenses = await Expense.find({ userId });
    console.log("expenses", expenses);
    res.status(200).json({
      status: "success",
      data: {
        expenses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// create a new expense
const createExpense = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // get the name and amount from the req body, and also the current budgetId
  const { name, expenseAmount, budgetId } = req.body;

  try {
    // create a new expense
    const newExpense = await Expense.create({
      name,
      expenseAmount,
      userId,
      budgetId,
    });

    // check if after adding the new expense, the total amount of the budget can accomodate the new expense
    const { totalExpense, budgetAmount } = await Budget.findById(budgetId);

    if (budgetAmount < totalExpense + Number(expenseAmount)) {
      throw new Error("Can't add expense, budget amount exceeded");
    }

    // update the correspoding budget
    await Budget.findByIdAndUpdate(
      budgetId,
      { $inc: { totalExpense: expenseAmount } },
      { runValidators: true }
    );

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalExpense: expenseAmount } },
      { runValidators: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        expense: newExpense,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// delete an expense
const deleteExpense = async (req, res) => {
  // get the expense id from the req params
  const { id } = req.params;

  // get the userId from the req object set using the cookies
  const { userId } = req;

  // the current budgetId
  const { budgetId } = req.body;

  try {
    // find the expense's previous amount
    const { expenseAmount } = await Expense.findById(id);

    // delete the expense
    await Expense.findByIdAndDelete(id);

    // update the correspoding budget
    await Budget.findByIdAndUpdate(
      budgetId,
      { $inc: { totalExpense: -expenseAmount } },
      { runValidators: true }
    );

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalExpense: -expenseAmount } },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllExpensesByUserId,
  createExpense,
  deleteExpense,
};
