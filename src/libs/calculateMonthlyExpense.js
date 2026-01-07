export const calculateMonthlyExpense = expenses => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return expenses.reduce((sum, e) => {
    const d = e.date.toDate();
    if (d.getMonth() === month && d.getFullYear() === year) {
      return sum + Number(e.amount);
    }
    return sum;
  }, 0);
};
