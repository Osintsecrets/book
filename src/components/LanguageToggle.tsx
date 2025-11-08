import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

export const LanguageToggle = () => {
  const { locale, setLocale } = useAppState();
  const t = useTranslations();

  return (
    <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 text-xs">
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'en' ? 'bg-violet/70 text-white shadow-glow' : 'text-gray-300 hover:text-white'
        }`}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('he')}
        className={`rounded-full px-3 py-1 transition ${
          locale === 'he' ? 'bg-violet/70 text-white shadow-glow' : 'text-gray-300 hover:text-white'
        }`}
        aria-pressed={locale === 'he'}
      >
        HE
      </button>
      <span className="sr-only">{t('common.language')}</span>
    </div>
  );
};
