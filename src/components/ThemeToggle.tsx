import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppState();
  const t = useTranslations();

  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      <span>{t('common.theme')}</span>
      <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`rounded-full px-3 py-1 transition ${
            theme === 'dark' ? 'bg-violet/70 text-white shadow-glow' : 'text-gray-300 hover:text-white'
          }`}
          aria-pressed={theme === 'dark'}
        >
          {t('common.dark')}
        </button>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`rounded-full px-3 py-1 transition ${
            theme === 'light' ? 'bg-violet/70 text-white shadow-glow' : 'text-gray-300 hover:text-white'
          }`}
          aria-pressed={theme === 'light'}
        >
          {t('common.light')}
        </button>
      </div>
    </div>
  );
};
