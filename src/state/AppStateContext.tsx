import { createContext, useContext, useEffect, useMemo } from 'react';
import { createDefaultAnswers } from '@/config/questions';
import type { AuditAnswers, AnswerValue } from '@/types/audit';
import { usePersistentState } from '@/hooks/usePersistentState';
import type { Locale } from '@/i18n/translations';

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  answers: AuditAnswers;
  updateAnswer: (sectionId: string, questionId: string, value: AnswerValue | string) => void;
  resetAnswers: () => void;
  wizardStep: number;
  setWizardStep: (index: number) => void;
  reduceProgress: Record<string, boolean>;
  toggleSuggestion: (id: string) => void;
  nextCheckDate: string;
  setNextCheckDate: (value: string) => void;
  clearAll: () => void;
}

const STORAGE_KEYS = {
  locale: 'psa_locale',
  theme: 'psa_theme',
  answers: 'psa_answers',
  wizard: 'psa_wizard_step',
  reduce: 'psa_reduce_progress',
  nextCheck: 'psa_next_check'
} as const;

const AppStateContext = createContext<AppState | undefined>(undefined);

const cloneAnswers = (answers: AuditAnswers): AuditAnswers => JSON.parse(JSON.stringify(answers));

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = usePersistentState<Locale>(STORAGE_KEYS.locale, 'en');
  const [theme, setThemeState] = usePersistentState<'dark' | 'light'>(STORAGE_KEYS.theme, 'dark');
  const [answers, setAnswers, resetStoredAnswers] = usePersistentState<AuditAnswers>(
    STORAGE_KEYS.answers,
    createDefaultAnswers()
  );
  const [wizardStep, setWizardStepState] = usePersistentState<number>(STORAGE_KEYS.wizard, 0);
  const [reduceProgress, setReduceProgress, resetReduceProgress] = usePersistentState<Record<string, boolean>>(
    STORAGE_KEYS.reduce,
    {}
  );
  const [nextCheckDate, setNextCheckDateState, resetNextCheck] = usePersistentState<string>(
    STORAGE_KEYS.nextCheck,
    ''
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', locale);
    document.documentElement.setAttribute('dir', locale === 'he' ? 'rtl' : 'ltr');
  }, [locale]);

  const updateAnswer = (sectionId: string, questionId: string, value: AnswerValue | string) => {
    setAnswers((prev) => {
      const next = cloneAnswers(prev);
      if (!next[sectionId]) next[sectionId] = {};
      next[sectionId][questionId] = value;
      return next;
    });
  };

  const resetAnswers = () => {
    setAnswers(cloneAnswers(createDefaultAnswers()));
  };

  const toggleSuggestion = (id: string) => {
    setReduceProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAll = () => {
    setLocaleState('en');
    setThemeState('dark');
    resetStoredAnswers();
    setWizardStepState(0);
    resetReduceProgress();
    resetNextCheck();
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
    }
  };

  const value = useMemo<AppState>(
    () => ({
      locale,
      setLocale: setLocaleState,
      theme,
      setTheme: setThemeState,
      answers,
      updateAnswer,
      resetAnswers,
      wizardStep,
      setWizardStep: setWizardStepState,
      reduceProgress,
      toggleSuggestion,
      nextCheckDate,
      setNextCheckDate: setNextCheckDateState,
      clearAll
    }),
    [
      locale,
      setLocaleState,
      theme,
      setThemeState,
      answers,
      wizardStep,
      setWizardStepState,
      reduceProgress,
      nextCheckDate
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
