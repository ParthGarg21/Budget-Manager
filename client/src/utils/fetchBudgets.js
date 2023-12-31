import serverOrigin from "./getOrigin";

const fetchBudgets = async () => {
  const res = await fetch(`${serverOrigin}/budgets`, {
    method: "GET",
    credentials: "include",
  });

  const { data } = await res.json();
  return data.budgets;
};

export default fetchBudgets;
