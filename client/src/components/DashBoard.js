import { useContext, useEffect, useState } from "react";
import { userContext } from "../contexts/UserContext";
import "../styles/Dashboard.css";
import useCheckIsLogin from "../custom hooks/useCheckIsLogin";
import BudgetForm from "./BudgetForm";
import ExpenseForm from "./ExpenseForm";
import Budgets from "./Budgets";
import ExpenseTable from "./ExpenseTable";

/**
 * user has the following structure
 * user: {
 *  userName: String,
 *  totalBudget: Number,
 *  totalExpense: Number,
 *  _id: String
 * }
 *
 */

const getRecentExpenses = (expenses) => {
  const totalExpenses = expenses.length;

  return totalExpenses <= 10
    ? expenses
    : expenses.slice(totalExpenses - 10, totalExpenses);
};

const DashBoard = () => {
  const [loading, setLoading] = useState(true);
  useCheckIsLogin(setLoading, "/");

  const { user, expenses } = useContext(userContext);

  return (
    <>
      <section className="dashboard">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="user-details-con">
              <h1 className="user-con">
                Hello <span className="username">{user.userName}</span>
              </h1>

              <div className="details-con">
                <div className="detail">
                  <h2 className="detail-title">Total Budget</h2>
                  <p className="detail-value">Rs. {user.totalBudget}</p>
                </div>
                <div className="detail">
                  <h2 className="detail-title">Total Expense</h2>
                  <p className="detail-value">Rs. {user.totalExpense}</p>
                </div>
              </div>
            </div>

            <div className="forms-con">
              <div className="budget-expense-con">
                <BudgetForm title={"Budget"} />
                <ExpenseForm />
              </div>
            </div>
          </>
        )}
      </section>
      <Budgets />
      <ExpenseTable expenses={getRecentExpenses(expenses)} onlyRecent />
    </>
  );
};

export default DashBoard;
