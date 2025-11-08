import { useEffect, useRef, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export const usePersistentState = <T,>(key: string, defaultValue: T) => {
  const initialised = useRef(false);
  const [state, setState] = useState<T>(() => {
    if (!isBrowser) return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (error) {
      console.warn('Failed to read from localStorage', error);
    }
    return defaultValue;
  });

  useEffect(() => {
    if (!isBrowser) return;
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to persist to localStorage', error);
    }
  }, [key, state]);

  const reset = () => setState(defaultValue);

  return [state, setState, reset] as const;
};
