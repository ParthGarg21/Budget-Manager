import serverOrigin from "./getOrigin";

const fetchExpenses = async () => {
  const res = await fetch(`https://budget-app-server-1s1n.onrender.com/expenses`, {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

export default fetchExpenses;
