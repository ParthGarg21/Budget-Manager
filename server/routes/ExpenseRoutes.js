const express = require("express");
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

const router = express.Router();

router.route("/").get(getAllExpenses).post(createExpense);

router.route("/:id").delete(deleteExpense);

module.exports = router;
