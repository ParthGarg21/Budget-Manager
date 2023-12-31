import serverOrigin from "./getOrigin";

const fetchExpenses = async () => {
  const res = await fetch(`${serverOrigin}/expenses`, {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.expenses;
};

export default fetchExpenses;
