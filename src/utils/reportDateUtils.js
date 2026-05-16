/**
 * Report date utilities for Daily and Weekly report filtering.
 * Uses JavaScript Date; week runs Monday–Sunday.
 */

/** Start of today (00:00:00.000) */
export const getTodayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** End of today (23:59:59.999) */
export const getTodayEnd = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

/** Start of current week (Monday 00:00:00.000) */
export const getWeekStart = () => {
  const d = new Date();
  const day = d.getDay();
  // Sunday = 0; Monday = 1; ... Saturday = 6
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** End of current week (Sunday 23:59:59.999) */
export const getWeekEnd = () => {
  const start = getWeekStart();
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Normalize expense date from Firestore (Timestamp) or ISO string to Date.
 * @param {*} dateField - Firestore Timestamp, ISO string, or Date
 * @returns {Date|null}
 */
export const parseExpenseDate = (dateField) => {
  if (!dateField) return null;
  if (dateField instanceof Date) return dateField;
  if (typeof dateField === 'object' && typeof dateField.toDate === 'function') {
    return dateField.toDate();
  }
  if (typeof dateField === 'object' && dateField._seconds != null) {
    return new Date(dateField._seconds * 1000);
  }
  if (typeof dateField === 'object' && dateField.seconds != null) {
    return new Date(dateField.seconds * 1000);
  }
  if (typeof dateField === 'string') {
    const parts = dateField.split('-');
    if (parts.length === 3 && parts[0].length <= 2) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateField);
  }
  return null;
};

/** Check if a Date falls within today (inclusive). */
export const isDateInToday = (date) => {
  const d = parseExpenseDate(date);
  if (!d) return false;
  const start = getTodayStart();
  const end = getTodayEnd();
  return d >= start && d <= end;
};

/** Check if a Date falls within the current week (Mon–Sun). */
export const isDateInCurrentWeek = (date) => {
  const d = parseExpenseDate(date);
  if (!d) return false;
  const start = getWeekStart();
  const end = getWeekEnd();
  return d >= start && d <= end;
};

/** Day labels for week (Mon–Sun). */
export const WEEK_DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Get short day label (Mon–Sun) for a Date. */
export const getDayLabel = (date) => {
  const d = date instanceof Date ? date : parseExpenseDate(date);
  if (!d) return '';
  const idx = d.getDay();
  return WEEK_DAY_LABELS[idx === 0 ? 6 : idx - 1];
};
