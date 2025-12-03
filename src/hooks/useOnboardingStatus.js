// useOnboardingStatus.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const KEY = 'onboarding.completed';

export function useOnboardingStatus() {
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(KEY);
        setIsOnboarded(v === 'true');
      } catch (e) {
        // fail-safe: treat as not completed
        setIsOnboarded(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const markCompleted = useCallback(async () => {
    await AsyncStorage.setItem(KEY, 'true');
    setIsOnboarded(true);
  }, []);

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(KEY);
    setIsOnboarded(false);
  }, []);

  return { loading, isOnboarded: !!isOnboarded, markCompleted, resetOnboarding };
}
