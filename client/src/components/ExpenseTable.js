import { Fragment } from "react";
import "../styles/Expenses.css";
import ExpenseRow from "./ExpenseRow";

const ExpenseTable = ({ expenses, onlyRecent }) => {
  const sortedExpenses = expenses.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate - aDate;
  });

  return (
    sortedExpenses.length > 0 && (
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
