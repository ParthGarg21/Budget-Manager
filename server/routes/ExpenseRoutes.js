const express = require("express");
const {
  getAllExpensesByUserId,
  getAllExpensesByBudgetId,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

const router = express.Router();

router.route("/").post(createExpense);

router.route("/user").get(getAllExpensesByUserId);

router.route("/budget").get(getAllExpensesByBudgetId);

router.route("/:id").delete(deleteExpense);

module.exports = router;
