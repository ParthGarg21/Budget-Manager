// styles
import "../styles/Expenses.css";

// components
import ExpenseRow from "./ExpenseRow";

// react
import { Fragment } from "react";

// utils
import getSortedExpenses from "../utils/getSortedExpenses";

const ExpenseTable = ({ expenses, onlyRecent }) => {
  // sort the expenses by date
  const sortedExpenses = getSortedExpenses(expenses);

  // render the table
  return (
    sortedExpenses?.length > 0 && (
      <section className="expenses">
        <h1>{onlyRecent ? "Recent " : ""}Expenses</h1>
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
              {sortedExpenses.map((expense) => (
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

export default ExpenseTable;
