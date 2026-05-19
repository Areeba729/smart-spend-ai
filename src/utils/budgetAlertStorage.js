import AsyncStorage from '@react-native-async-storage/async-storage';

const DISMISS_KEY = '@budget_alert_modal_dismissed_date';

const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const isBudgetAlertSnoozedForToday = async () => {
  try {
    const stored = await AsyncStorage.getItem(DISMISS_KEY);
    return stored === getTodayKey();
  } catch {
    return false;
  }
};

export const snoozeBudgetAlertForToday = async () => {
  try {
    await AsyncStorage.setItem(DISMISS_KEY, getTodayKey());
  } catch (error) {
    console.warn('Failed to snooze budget alert:', error);
  }
};
