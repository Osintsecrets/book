import { useMemo } from 'react';
import { useAppState } from '@/state/AppStateContext';
import { getTranslation, getTranslationValue } from './translations';

export const useTranslations = () => {
  const { locale } = useAppState();
  return useMemo(() => (key: string) => getTranslation(locale, key), [locale]);
};

export const useTranslationValue = <T = unknown>() => {
  const { locale } = useAppState();
  return useMemo(() => (key: string) => getTranslationValue(locale, key) as T, [locale]);
};
