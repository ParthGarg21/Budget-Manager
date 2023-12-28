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
  const { name, amount } = req.body;

  try {
    // create a new budget
    const newBudget = await Budget.create({ name, amount, userId });

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalBudget: amount } },
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
    const { amount } = await Budget.findById(id);

    // delete the budget
    await Budget.findByIdAndDelete(id);

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $dec: { totalBudget: amount } },
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

// update a budget
// const updateBudget = async (req, res) => {
//   const { userId } = req;
//   const { id } = req.params;
//   const updateBudget = req.body;
//   try {
//     const { amount: prevBudgetAmount } = await Budget.findById(id);

//     const budget = await Budget.findByIdAndUpdate(id, updateBudget, {
//       runValidators: true,
//       new: true,
//     });

//     // remove the old budget amount and add the new budget amount to the totalBudget of the user
//     await User.findByIdAndUpdate(
//       userId,
//       { $inc: { totalBudget: amount - prevBudgetAmount } },
//       { runValidators: true }
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         budget,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

module.exports = {
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
  //   updateBudget,
};
