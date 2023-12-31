import "../styles/Budgets.css";

import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import useCheckIsLogin from "../custom hooks/useCheckIsLogin";
import BudgetCard from "./BudgetCard";
import SpecificBudgetForm from "./SpecificBudgetForm";
import ExpenseTable from "./ExpenseTable";
import capitalize from "../utils/capitalize";

/**
 * budget has the following properties:
 * budget: {
 * name: String,
 * budgetAmount: Number,
 * totalExpense: Number,
 * userId: String,
 * }
 */
const BudgetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { budgets, expenses } = useContext(userContext);
  useCheckIsLogin(setLoading, "/");

  let budget;
  let budgetName;
  let budgetExpenses = [];

  if (!loading) {
    budget = budgets.find((budget) => budget._id === id);
    if (!budget) {
      navigate("/");
      return;
    }
    budgetExpenses = expenses.filter((expense) => expense.budgetId === id);

    budgetName = capitalize(budget.name);
  }

  return (
    <section className="budget-details">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="budget-details-title">
            <span className="detais-highlight">{budgetName}</span> overview
          </h1>
          <div className="details-form-con">
            <div className="details-budget-card">
              <BudgetCard budget={budget} color={"#dc3545"} isDetail />
            </div>
            <SpecificBudgetForm budget={budget} />
          </div>
          <ExpenseTable expenses={budgetExpenses} />
        </>
      )}
    </section>
  );
};

export default BudgetDetails;
