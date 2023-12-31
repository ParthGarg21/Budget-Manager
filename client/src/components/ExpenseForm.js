import "../styles/Amountform.css";

// contexts
import { userContext } from "../contexts/UserContext";

// react
import { useContext } from "react";
import { useState } from "react";
import serverOrigin from "../utils/getOrigin";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [error, setError] = useState("");
  const [budgetId, setBudgetId] = useState(-1);

  const { user, setUser, setExpenses, setBudgets } = useContext(userContext);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleExpenseAmountChange = (e) => {
    if (e.target.value < 0) return;
    setExpenseAmount(e.target.value);
  };

  const handleBudgetIdChange = (e) => {
    setBudgetId(e.target.value);
  };

  /**
   * update the totalExpense in the user context after creating a new expense
   * and also store the same in the backend
   * to create a new expense make a post request to server
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || expenseAmount === 0 || budgetId === -1) {
      setError("Please fill all the fields");
      return;
    }

    const res = await fetch(`${serverOrigin}/expenses`, {
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

    // update the totalExpense in the user context
    setUser((prev) => ({
      ...prev,
      totalExpense: newAmount,
    }));
    // update the budgets
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
    // update the expenses
    setExpenses((prev) => [...prev, data.expense]);
    // reset the form
    setName("");
    setExpenseAmount(0);
    setBudgetId(-1);
    setError("");
  };

  const { budgets } = useContext(userContext);
  return (
    budgets.length && (
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

          <div className="amount-form-input-con">
            <label className="amount-form-label" htmlFor="budget-name">
              Select Budget:
            </label>
            <select
              id="budget-name"
              className="amount-form-input"
              onChange={handleBudgetIdChange}
              defaultValue={-1}
              value={budgetId}
            >
              <>
                <option value={-1}>Select Budget</option>
                {budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}>
                    {budget.name}
                  </option>
                ))}
              </>
            </select>
          </div>

          <button className="amount-form-submit-btn" type="submit">
            Create Expense
          </button>
        </form>
      </div>
    )
  );
};

export default ExpenseForm;
