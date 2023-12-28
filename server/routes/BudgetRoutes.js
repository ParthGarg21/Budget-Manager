const express = require("express");
const {
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
} = require("../controllers/BudgetController");

const router = express.Router();

router.route("/").get(getAllBudgets).post(createBudget);

router.route("/:id").get(getBudget).delete(deleteBudget);

module.exports = router;
