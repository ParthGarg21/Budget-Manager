const Income = require("../models/Income");
const User = require("../models/User");

// get all incomes
const getAllIncomes = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // check if the request is for recent incomes
  const { getRecent } = req.query;
  try {
    const incomesQuery = Income.find({ userId });

    // if the request is for recent incomes, sort the incomes by createdAt and limit the results to 5
    if (getRecent) {
      incomesQuery.sort({ createdAt: -1 }).limit(5);
    }
    const incomes = await incomesQuery;
    res.status(200).json({
      status: "success",
      data: {
        incomes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// create a new income
const createIncome = async (req, res) => {
  // get the userId from the req object set using the cookies
  const { userId } = req;

  // get the name and amount from the req body
  const { name, amount } = req.body;

  try {
    // create a new income
    const newIncome = await Income.create({ name, amount, userId });

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalIncome: amount } },
      { runValidators: true }
    );
    res.status(201).json({
      status: "success",
      data: {
        income: newIncome,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// delete an income
const deleteIncome = async (req, res) => {
  // get the income id from the req params
  const { id } = req.params;

  // get the userId from the req object set using the cookies
  const { userId } = req;

  try {
    // find the income's previous amount
    const { amount } = await Income.findById(id);

    // delete the income
    await Income.findByIdAndDelete(id);

    // update the correspoding user
    await User.findByIdAndUpdate(
      userId,
      { $dec: { totalIncome: amount } }, // Use $inc to increment the totalIncome by the amount
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

// // update an income
// const updateIncome = async (req, res) => {
//   // get the income id from the req params
//   const { id } = req.params;

//   // get the userId from the req object set using the cookies
//   const { userId } = req;

//   // get the name and amount from the req body
//   const updatedIncome = req.body;

//   try {
//     // find the income's previous amount
//     const { amount: oldAmount } = await Income.findById(id);

//     // update the income
//     const income = await Income.findByIdAndUpdate(id, updatedIncome, {
//       runValidators: true,
//       new: true,
//     });

//     // update the correspoding user
//     await User.findByIdAndUpdate(
//       userId,
//       { $inc: { totalIncome: amount - oldAmount } }, // Use $inc to increment the totalIncome by the amount
//       { runValidators: true }
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         income,
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
  getAllIncomes,
  createIncome,
  deleteIncome,
//   updateIncome,
};
