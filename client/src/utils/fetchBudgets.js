import serverOrigin from "./getOrigin";

const fetchBudgets = async () => {
  const res = await fetch(`https://budget-app-server-1s1n.onrender.com/budgets`, {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.budgets;
};

export default fetchBudgets;
