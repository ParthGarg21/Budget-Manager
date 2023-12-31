// styles
import "../styles/Amountform.css";

// contexts
import { userContext } from "../contexts/UserContext";

// react
import { useState } from "react";
import { useContext } from "react";

import serverOrigin from "../utils/getOrigin";

const BudgetForm = () => {
  const { user, setUser, setBudgets } = useContext(userContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    if (e.target.value < 0) return;
    setAmount(e.target.value);
  };

  /**
   *
   * update the totalBudget in the user context after creating a new budget
   * and also store the same in the backend
   * to create a new budget make a post request to server
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || amount === 0) {
      setError("Please fill all the fields");
      return;
    }

    const url = `http://localhost:8000/budgets`;
    const body = { name, budgetAmount: amount };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const { message, data } = await res.json();

    // if response is ok then update the states
    if (res.ok) {
      const newAmount = user.totalBudget + parseInt(amount);

      // update the totalBudget in the user context
      setUser((prev) => ({
        ...prev,
        totalBudget: newAmount,
      }));

      // update the budgets
      setBudgets((prev) => [...prev, data.budget]);

      // reset the form
      setName("");
      setAmount(0);
      setError("");
    } else {
      setError(message);
    }
  };

  return (
    <div className="amount-form-con">
      <form className="amount-form" onSubmit={handleSubmit}>
        <h1>Create Budget</h1>
        <span className="error">{error}</span>
        <div className="amount-form-input-con">
          <label className="amount-form-label" htmlFor="name">
            Budget Name
          </label>
          <input
            className="amount-form-input"
            id="name"
            type="text"
            placeholder="e.g: Groceries"
            onChange={handleNameChange}
            value={name}
          />
        </div>

        <div className="amount-form-input-con">
          <label className="amount-form-label" htmlFor="amount">
            Budget Amount
          </label>
          <input
            className="amount-form-input"
            id="amount"
            type="number"
            placeholder="Rs. 10000"
            onChange={handleAmountChange}
            value={amount}
          />
        </div>

        <button className="amount-form-submit-btn" type="submit">
          Create Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
