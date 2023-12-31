// styles
import "../styles/Dashboard.css";

// components
import BudgetForm from "./BudgetForm";
import ExpenseForm from "./ExpenseForm";
import Budgets from "./Budgets";
import ExpenseTable from "./ExpenseTable";
import LoadingCon from "./LoadingCon";
import getRecentExpenses from "../utils/getRecentExpenses";

// contexts
import { userContext } from "../contexts/UserContext";

// react
import useCheckIsLogin from "../custom hooks/useCheckIsLogin";

// custom hooks
import { useContext, useState } from "react";

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

const DashBoard = () => {
  const [loading, setLoading] = useState(true);

  /**
   * check if the user is already logged in
   * if logged in then set the states
   * else redirect to home page and show the login and signup form
   */
  useCheckIsLogin(setLoading, "/");

  const { user, expenses } = useContext(userContext);

  return (
    <>
      <section className="dashboard">
        {loading ? (
          <div className="page-loader">
            <LoadingCon />
          </div>
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
            <Budgets />
            <ExpenseTable expenses={getRecentExpenses(expenses)} onlyRecent />
          </>
        )}
      </section>
    </>
  );
};

export default DashBoard;
