export function aiAssistant({
  monthlyBudget = 0,
  totalSpent = 0,
  todaySpent = 0,
}) {
  const today = new Date();

  // Days in current month
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

  const currentDay = today.getDate();
  const remainingDays = Math.max(daysInMonth - currentDay + 1, 1);

  const remainingBudget = Math.max(monthlyBudget - totalSpent, 0);

  // 🎯 Dynamic Daily Limit
  const dailyLimit = Math.round(remainingBudget / remainingDays);

  let health = 'Safe';
  let badge = 'ON TRACK';
  let healthMessage = 'Your spending is well balanced. Keep it up!';
  let insightTitle = 'Smart Spending';
  let insightDescription = "You're spending within a healthy range today.";

  if (todaySpent > dailyLimit * 1.2) {
    health = 'Risky';
    badge = 'OVERSPENDING';
    healthMessage = 'You are spending more than your safe daily limit.';
    insightTitle = 'Overspending Alert';
    insightDescription =
      "Today's expenses are significantly higher than recommended. Try reducing non-essential spending.";
  } else if (todaySpent > dailyLimit) {
    health = 'Warning';
    badge = 'NEAR LIMIT';
    healthMessage = 'You are close to exceeding your daily limit.';
    insightTitle = 'Spend Carefully';
    insightDescription =
      "You're close to your daily budget. Consider postponing extra expenses.";
  }

  return {
    dailyLimit,
    remainingBudget,
    remainingDays,
    health,
    badge,
    healthMessage,
    insightTitle,
    insightDescription,
  };
}
