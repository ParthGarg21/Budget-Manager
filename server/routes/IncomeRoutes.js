const express = require("express");
const {
  getAllIncomes,
  createIncome,
  deleteIncome,
} = require("../controllers/IncomeController");

const router = express.Router();

router.route("/").get(getAllIncomes).post(createIncome);

router.route("/:id").delete(deleteIncome);

module.exports = router;
