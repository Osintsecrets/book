import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppState } from '@/state/AppStateContext';
import { useTranslationValue, useTranslations } from '@/i18n/useTranslations';

export const SettingsPage = () => {
  const t = useTranslations();
  const getValue = useTranslationValue();
  const { clearAll } = useAppState();
  const privacyBullets = (getValue('settings.privacy.bullets') as string[]) ?? [];
  const limitations = (getValue('settings.limitations.bullets') as string[]) ?? [];

  const handleDelete = () => {
    if (window.confirm(t('settings.delete.confirm'))) {
      clearAll();
    }
  };

  return (
    <div className="space-y-10">
      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{t('settings.title')}</h2>
        <p className="text-sm text-gray-300">{t('settings.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel space-y-4 p-6">
          <h3 className="text-lg font-semibold text-white">{t('settings.languageLabel')}</h3>
          <LanguageToggle />
        </div>
        <div className="glass-panel space-y-4 p-6">
          <h3 className="text-lg font-semibold text-white">{t('settings.themeLabel')}</h3>
          <ThemeToggle />
        </div>
      </div>
      <div className="glass-panel space-y-4 p-6">
        <h3 className="text-lg font-semibold text-white">{t('settings.delete.title')}</h3>
        <p className="text-sm text-gray-300">{t('settings.delete.body')}</p>
        <button type="button" className="neon-button secondary" onClick={handleDelete}>
          {t('common.deleteData')}
        </button>
      </div>
      <div className="glass-panel space-y-4 p-6">
        <h3 className="text-lg font-semibold text-white">{t('settings.privacy.title')}</h3>
        <ul className="space-y-2 text-sm text-gray-200">
          {privacyBullets.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-panel space-y-4 p-6">
        <h3 className="text-lg font-semibold text-white">{t('settings.limitations.title')}</h3>
        <ul className="space-y-2 text-sm text-gray-200">
          {limitations.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-magenta" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
