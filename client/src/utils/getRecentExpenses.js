const getRecentExpenses = (expenses) => {
  const totalExpenses = expenses.length;

  return totalExpenses <= 10
    ? expenses
    : expenses.slice(totalExpenses - 10, totalExpenses);
};

export default getRecentExpenses;
