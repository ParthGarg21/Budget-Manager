import { useState, useContext } from "react";
import { userContext } from "../contexts/UserContext";

const SpecificBudgetForm = ({ budget }) => {
  const [name, setName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [error, setError] = useState("");
  const { _id: budgetId } = budget;

  const { user, setUser, setExpenses, setBudgets } = useContext(userContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleExpenseAmountChange = (e) => {
    if (e.target.value < 0) return;
    setExpenseAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || expenseAmount === 0) {
      setError("Please fill all the fields");
      return;
    }

    const res = await fetch("http://localhost:8000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, expenseAmount, budgetId }),
    });

    const { data, message } = await res.json();

    if (!res.ok) {
      setError(message);
      return;
    }

    const newAmount = user.totalExpense + parseInt(expenseAmount);

    setUser((prev) => ({
      ...prev,
      totalExpense: newAmount,
    }));
    setBudgets((budgets) =>
      budgets.map((budget) => {
        if (budget._id === budgetId) {
          return {
            ...budget,
            totalExpense: budget.totalExpense + parseInt(expenseAmount),
          };
        }
        return budget;
      })
    );
    setExpenses((prev) => [...prev, data.expense]);
    setName("");
    setExpenseAmount(0);
    setError("");
  };

  return (
    <div className="amount-form-con">
      <form className="amount-form" onSubmit={handleSubmit}>
        <h1>Create Expense</h1>
        <span className="error">{error}</span>
        <div className="amount-form-input-con">
          <label className="amount-form-label" htmlFor="title">
            Expense Title
          </label>
          <input
            className="amount-form-input"
            id="title"
            type="text"
            placeholder="e.g: Gaming"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        <div className="amount-form-input-con">
          <label className="amount-form-label" htmlFor="amount">
            Expense Amount
          </label>
          <input
            className="amount-form-input"
            id="amount"
            type="number"
            placeholder="Rs. 1000"
            onChange={handleExpenseAmountChange}
            value={expenseAmount}
          />
        </div>
        <button className="amount-form-submit-btn" type="submit">
          Create Expense
        </button>
      </form>
    </div>
  );
};
export default SpecificBudgetForm;
