const Budget = require("../models/Budget");
const User = require("../models/User");

// get all budgets
const getAllBudgets = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;
  try {
    const budgets = await Budget.find({ userId });

    res.status(200).json({
      status: "success",
      data: {
        budgets,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get a single budget
const getBudget = async (req, res) => {
  // get the id from the req params
  const { id } = req.params;
  try {
    const budget = await Budget.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        budget,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// create a new budget
const createBudget = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // get the name and amount from the req body
  const { name, budgetAmount } = req.body;

  try {
    const result = await Budget.findOne({ userId, name });
    if (result) {
      throw new Error("Budget already exists");
    }

    // create a new budget
    const newBudget = await Budget.create({ name, budgetAmount, userId });

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalBudget: budgetAmount } },
      { runValidators: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        budget: newBudget,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// delete a budget
const deleteBudget = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // get the budget id from the req params
  const { id } = req.params;
  try {
    // find the budget's previous amount
    const { budgetAmount } = await Budget.findById(id);

    // delete the budget
    await Budget.findByIdAndDelete(id);

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalBudget: -budgetAmount } },
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
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
};
