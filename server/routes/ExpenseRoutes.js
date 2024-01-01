const express = require("express");
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

const router = express.Router();

router.route("/").post(createExpense);

router.route("/get-all").post(getAllExpenses);

router.route("/:id").delete(deleteExpense);

module.exports = router;
