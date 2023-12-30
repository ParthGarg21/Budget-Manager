import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

const getDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const formattedTime = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};

const ExpenseRow = ({ expense }) => {
  const { setExpenses, setBudgets, setUser } = useContext(userContext);

  const handleDelete = async () => {
    await fetch(`http://localhost:8000/expenses/${expense._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetId: expense.budgetId }),
      credentials: "include",
    });

    setExpenses((prev) => prev.filter((exp) => exp._id !== expense._id));
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
