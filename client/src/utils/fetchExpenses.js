const fetchExpensesByUserId = async () => {
  const res = await fetch("http://localhost:8000/expenses/user", {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

const fetchExpensesByBudgetId = async () => {
  const res = await fetch("http://localhost:8000/expenses/budget", {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

export { fetchExpensesByUserId, fetchExpensesByBudgetId };
