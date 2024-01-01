// contexts
import { userContext } from "../contexts/UserContext";

// react
import { useContext } from "react";

// utils
import getDate from "../utils/getDate";
import serverOrigin from "../utils/getOrigin";

const ExpenseRow = ({ expense }) => {
  const { setExpenses, setBudgets, setUser } = useContext(userContext);

  /**
   * delete the expense from the database and update the state
   * to delete, make a delete request to server for the expense id
   */
  const handleDelete = async () => {
    await fetch(`http://localhost:8000/expenses/${expense._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetId: expense.budgetId,
        token: localStorage.getItem("token"),
      }),
      credentials: "include",
    });

    // update the expenses state
    setExpenses((prev) => prev.filter((exp) => exp._id !== expense._id));

    // update the budgets state
    setBudgets((prev) =>
      prev.map((budget) => {
        if (budget._id === expense.budgetId) {
          return {
            ...budget,
            totalExpense: budget.totalExpense - expense.expenseAmount,
          };
        }
        return budget;
      })
    );

    // update the user state
    setUser((prev) => ({
      ...prev,
      totalExpense: prev.totalExpense - expense.expenseAmount,
    }));
  };

  return (
    <tr key={expense._id}>
      <td>{expense.name}</td>
      <td>{getDate(expense.createdAt)}</td>
      <td>Rs. {expense.expenseAmount}</td>
      <td>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
