import serverOrigin from "./getOrigin";

const fetchExpenses = async () => {
  const res = await fetch(`http://localhost:8000/expenses/get-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

export default fetchExpenses;
