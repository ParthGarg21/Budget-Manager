const express = require("express");
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

const router = express.Router();

router.route("/").post(createExpense).get(getAllExpenses)

router.route("/:id").delete(deleteExpense);

module.exports = router;
