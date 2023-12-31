const express = require("express");
const {
  getAllExpensesByUserId,
  createExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");

const router = express.Router();

router.route("/").post(createExpense);

router.route("/user").get(getAllExpensesByUserId);

router.route("/:id").delete(deleteExpense);

module.exports = router;
