import type { Suggestion } from '@/types/audit';
import { useTranslations } from '@/i18n/useTranslations';

interface SuggestionCardProps {
  suggestion: Suggestion;
  completed: boolean;
  onToggle: () => void;
}

export const SuggestionCard = ({ suggestion, completed, onToggle }: SuggestionCardProps) => {
  const t = useTranslations();

  return (
    <div className={`glass-panel space-y-4 p-6 ${completed ? 'border-cyan-400/60' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{t(suggestion.titleKey)}</p>
          <p className="text-sm text-gray-300">{t(suggestion.bodyKey)}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
            completed
              ? 'bg-cyan-500/80 text-black'
              : 'border border-white/10 text-gray-200 hover:border-cyan-300/70 hover:text-white'
          }`}
        >
          {completed ? t('common.undo') : t('common.markDone')}
        </button>
      </div>
      <ul className="space-y-3 text-sm text-gray-200">
        {suggestion.stepsKeys.map((stepKey, index) => (
          <li key={stepKey} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/60 text-xs font-semibold text-cyan-200">
              {index + 1}
            </span>
            <span>{t(stepKey)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
