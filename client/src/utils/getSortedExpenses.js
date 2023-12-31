const getSortedExpenses = (expenses) => {
  const sortedExpenses = [...expenses];

  sortedExpenses.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate - aDate;
  });

  return sortedExpenses;
};

export default getSortedExpenses;
