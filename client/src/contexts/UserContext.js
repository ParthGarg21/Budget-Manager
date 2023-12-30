import { createContext, useState } from "react";

const userContext = createContext();

/**
 *
 * user has the following structure
 * user: {
 * userName: String,
 * totalBudget: Number,
 * totalExpense: Number,
 * _id: String
 * }
 *
 * expenses has the following structure
 * expenses: [
 * {
 * _id: String,
 * name: String,
 * expenseAmount: Number,
 * budgetId: String,
 * },
 * ]
 *
 * budgets has the following structure
 * budgets: [
 * {
 * _id: String,
 * name: String,
 * budgetAmount: Number,
 * totalExpense: Number,
 * userId: String,
 * },
 * ]
 *
 */
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const value = {
    user,
    setUser,
    expenses,
    setExpenses,
    budgets,
    setBudgets,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export { UserProvider, userContext };
