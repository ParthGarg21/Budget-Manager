const fetchExpenses = async () => {
  const res = await fetch(`http://localhost:8000/expenses`, {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

export default fetchExpenses;
