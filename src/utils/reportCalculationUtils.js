/**
 * Report calculation utilities: filter by date, group by category/day, totals.
 * Works with normalized transaction list.
 *
 * Example normalized transaction (after normalizeTransaction):
 *   { id: 'exp-0', amount: 500, category: 'Food', date: Date, description: 'Lunch' }
 *
 * Raw expense from Firestore (before normalize):
 *   { amount, title, category, date (Timestamp or ISO), note, uid }
 */

import {
  getTodayStart,
  getTodayEnd,
  getWeekStart,
  getWeekEnd,
  parseExpenseDate,
  WEEK_DAY_LABELS,
} from './reportDateUtils';

/**
 * Normalize a raw expense from Firestore to a common transaction shape.
 * @param {Object} raw - { amount, title?, category, date, note?, uid?, ... }
 * @param {number} index - Optional index for id if no id present
 * @returns {{ id: string, amount: number, category: string, date: Date, description: string }}
 */
export const normalizeTransaction = (raw, index = 0) => {
  const date = parseExpenseDate(raw?.date);
  return {
    id: raw?.id ?? `exp-${index}`,
    amount: parseFloat(raw?.amount) || 0,
    category: raw?.category ?? 'Other',
    date,
    description: raw?.note ?? raw?.title ?? raw?.description ?? '',
  };
};

/**
 * Normalize an array of raw expenses from Firestore.
 * @param {Array} rawExpenses
 * @returns {Array<{ id, amount, category, date, description }>}
 */
export const normalizeTransactions = (rawExpenses) => {
  if (!Array.isArray(rawExpenses)) return [];
  return rawExpenses
    .map((raw, i) => normalizeTransaction(raw, i))
    .filter((t) => t.date != null);
};

/** Filter transactions to those that fall within today. */
export const getDailyTransactions = (transactions) => {
  const start = getTodayStart();
  const end = getTodayEnd();
  return transactions.filter((t) => {
    const d = t.date instanceof Date ? t.date : parseExpenseDate(t.date);
    return d && d >= start && d <= end;
  });
};

/** Filter transactions to those that fall within the current week (Mon–Sun). */
export const getWeeklyTransactions = (transactions) => {
  const start = getWeekStart();
  const end = getWeekEnd();
  return transactions.filter((t) => {
    const d = t.date instanceof Date ? t.date : parseExpenseDate(t.date);
    return d && d >= start && d <= end;
  });
};

/** Sum of amounts for a list of transactions. */
export const getTotalAmount = (transactions) => {
  return (transactions || []).reduce((sum, t) => sum + (t.amount || 0), 0);
};

/**
 * Group transactions by category. Returns { [category]: number } (total per category).
 */
export const groupByCategory = (transactions) => {
  const map = {};
  (transactions || []).forEach((t) => {
    const cat = t.category ?? 'Other';
    map[cat] = (map[cat] || 0) + (t.amount || 0);
  });
  return map;
};

/**
 * Group transactions by day of week (Mon–Sun) for the current week.
 * Returns array of { dayLabel, date, total } for each day in the week.
 */
export const groupByDay = (transactions) => {
  const start = getWeekStart();
  const dayTotals = WEEK_DAY_LABELS.map((label, index) => {
    const d = new Date(start);
    d.setDate(d.getDate() + index);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const dayTransactions = (transactions || []).filter((t) => {
      const date = t.date instanceof Date ? t.date : parseExpenseDate(t.date);
      if (!date) return false;
      return date >= d && date < next;
    });
    const total = getTotalAmount(dayTransactions);
    return {
      dayLabel: label,
      date: d,
      total,
    };
  });
  return dayTotals;
};

/**
 * Daily budget from monthly budget (monthly / days in month).
 */
export const getDailyBudget = (monthlyBudget) => {
  if (!monthlyBudget || monthlyBudget <= 0) return 0;
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return monthlyBudget / daysInMonth;
};

/**
 * Weekly budget = daily budget × 7.
 */
export const getWeeklyBudget = (monthlyBudget) => {
  return getDailyBudget(monthlyBudget) * 7;
};

/**
 * Percentage of budget used (capped at 100 for display).
 */
export const getBudgetUsedPercent = (spent, budget) => {
  if (!budget || budget <= 0) return 0;
  return Math.min(100, (spent / budget) * 100);
};
