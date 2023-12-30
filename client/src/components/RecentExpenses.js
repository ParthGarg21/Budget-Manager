import { Fragment, useContext } from "react";
import { userContext } from "../contexts/UserContext";
import "../styles/Expenses.css";
import ExpenseRow from "./ExpenseRow";

const RecentExpenses = () => {
  const { expenses } =
    useContext(userContext);

  const totalExpenses = expenses.length;

  const recentExpenses =
    totalExpenses <= 10
      ? expenses
      : expenses.slice(totalExpenses - 10, totalExpenses);

 
  return (
    expenses && (
      <section className="expenses">
        <h1>Recent Expenses</h1>
        <div className="expense-table-con">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense) => (
                <Fragment key={expense._id}>
                  <ExpenseRow expense={expense} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  );
};

export default RecentExpenses;
