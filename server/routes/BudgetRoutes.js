const express = require("express");
const {
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
} = require("../controllers/BudgetController");

const router = express.Router();

router.route("/").post(createBudget);

router.route("/get-all").post(getAllBudgets);

router.route("/:id").post(getBudget).delete(deleteBudget);

module.exports = router;
