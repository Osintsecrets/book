import { useMemo, useState } from 'react';
import { computeRiskAssessment } from '@/config/riskRules';
import { filterSuggestionsByRisk } from '@/config/suggestions';
import { SuggestionCard } from '@/components/SuggestionCard';
import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

const intensityFilters: Array<{ key: 'all' | 'quick' | 'high' | 'advanced'; labelKey: string }> = [
  { key: 'all', labelKey: 'reduce.filterLabel' },
  { key: 'quick', labelKey: 'common.intensity.quick' },
  { key: 'high', labelKey: 'common.intensity.high' },
  { key: 'advanced', labelKey: 'common.intensity.advanced' }
];

export const ReducePage = () => {
  const { answers, reduceProgress, toggleSuggestion } = useAppState();
  const t = useTranslations();
  const [filter, setFilter] = useState<'all' | 'quick' | 'high' | 'advanced'>('all');

  const assessment = useMemo(() => computeRiskAssessment(answers), [answers]);
  const actionableSuggestions = useMemo(
    () => filterSuggestionsByRisk(assessment, filter),
    [assessment, filter]
  );

  const hasActions = actionableSuggestions.length > 0;

  return (
    <div className="space-y-10">
      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{t('reduce.title')}</h2>
        <p className="text-sm text-gray-300">{t('reduce.subtitle')}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {intensityFilters.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setFilter(option.key)}
              className={`rounded-full px-4 py-1 text-xs uppercase tracking-wide transition ${
                filter === option.key
                  ? 'bg-violet/80 text-white shadow-glow'
                  : 'border border-white/10 text-gray-300 hover:border-cyan-300/70 hover:text-white'
              }`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </div>
      {hasActions ? (
        <div className="space-y-6">
          {actionableSuggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              completed={Boolean(reduceProgress[suggestion.id])}
              onToggle={() => toggleSuggestion(suggestion.id)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 text-center text-sm text-gray-300">
          <p>{t('reduce.emptyState')}</p>
        </div>
      )}
      <p className="text-xs text-gray-400">{t('reduce.note')}</p>
    </div>
  );
};
