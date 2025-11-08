import { useState } from 'react';
import type { RiskCategoryResult } from '@/types/audit';
import { useTranslations } from '@/i18n/useTranslations';

interface RiskCardProps {
  category: RiskCategoryResult;
}

const levelStyles: Record<string, string> = {
  low: 'border-green-500/30 text-green-300',
  medium: 'border-yellow-500/40 text-yellow-300',
  high: 'border-red-500/50 text-red-300'
};

export const RiskCard = ({ category }: RiskCardProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-panel space-y-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{t(`analyze.categories.${category.key}`)}</p>
          <p className="text-xs text-gray-400">{t(`analyze.exposureLevels.${category.level}`)}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${levelStyles[category.level]}`}>
          {t(`common.exposureLevels.${category.level}`)}
        </span>
      </div>
      {category.triggers.length > 0 && (
        <button
          type="button"
          className="text-sm text-cyan-300 transition hover:text-cyan-100"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? '−' : '+'} {t('analyze.detailTitle')}
        </button>
      )}
      {open && (
        <ul className="space-y-2 text-sm text-gray-200">
          {category.triggers.map((trigger) => (
            <li key={trigger.questionId} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />
              <span>{t(trigger.messageKey)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
