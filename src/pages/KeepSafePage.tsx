import { useAppState } from '@/state/AppStateContext';
import { useTranslationValue, useTranslations } from '@/i18n/useTranslations';

export const KeepSafePage = () => {
  const t = useTranslations();
  const getValue = useTranslationValue();
  const tiles = (getValue('keepSafe.tiles') as { title: string; body: string }[]) ?? [];
  const { nextCheckDate, setNextCheckDate } = useAppState();

  return (
    <div className="space-y-10">
      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{t('keepSafe.title')}</h2>
        <p className="text-sm text-gray-300">{t('keepSafe.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {tiles.map((tile, index) => (
          <div key={index} className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white">{tile.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{tile.body}</p>
          </div>
        ))}
      </div>
      <div className="glass-panel space-y-4 p-8">
        <label className="flex flex-col gap-3 text-sm text-gray-200">
          <span>{t('keepSafe.nextCheck.label')}</span>
          <input
            type="date"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-gray-100 focus:border-cyan-400 focus:outline-none"
            value={nextCheckDate}
            onChange={(event) => setNextCheckDate(event.target.value)}
            placeholder={t('keepSafe.nextCheck.placeholder')}
          />
        </label>
        {nextCheckDate && (
          <p className="text-xs text-cyan-300">
            {t('keepSafe.nextCheck.reminder')} {new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(nextCheckDate))}
          </p>
        )}
      </div>
    </div>
  );
};
