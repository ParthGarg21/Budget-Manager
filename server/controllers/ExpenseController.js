const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

// get all expenses
const getAllExpenses = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // check if the request is for recent expenses
  const { getRecent } = req.query;
  try {
    const expensesQuery = Expense.find({ userId });

    // if the request is for recent expenses, sort the expenses by createdAt and limit the results to 5
    if (getRecent) {
      expensesQuery.sort({ createdAt: -1 }).limit(5);
    }
    const expenses = await expensesQuery;

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
  const { name, amount, budgetId } = req.body;

  try {
    // create a new expense
    const newExpense = await Expense.create({ name, amount, userId });

    // update the correspoding budget
    await Budget.findByIdAndUpdate(
      budgetId,
      { $inc: { totalExpense: amount } },
      { runValidators: true }
    );

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalExpense: amount } },
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
    const { amount } = await Expense.findById(id);

    // delete the expense
    await Expense.findByIdAndDelete(id);

    // update the correspoding budget
    await Budget.findOneAndUpdate(
      budgetId,
      { $inc: { totalExpense: -amount } },
      { runValidators: true }
    );

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalExpense: -amount } },
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
  getAllExpenses,
  createExpense,
  deleteExpense,
};
