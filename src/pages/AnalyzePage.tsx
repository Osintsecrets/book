import { useMemo } from 'react';
import { computeRiskAssessment } from '@/config/riskRules';
import { RiskCard } from '@/components/RiskCard';
import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

const overallColors: Record<string, string> = {
  low: 'from-green-500/60 to-emerald-500/40 text-green-200',
  medium: 'from-yellow-500/60 to-orange-500/40 text-yellow-200',
  high: 'from-red-500/70 to-pink-500/50 text-red-200'
};

export const AnalyzePage = () => {
  const { answers } = useAppState();
  const t = useTranslations();

  const filledAnswers = useMemo(
    () =>
      Object.values(answers).some((section) =>
        Object.values(section).some((value) => typeof value === 'string' && value !== '')
      ),
    [answers]
  );

  const assessment = useMemo(() => computeRiskAssessment(answers), [answers]);
  const overallLevel = assessment.overall;

  if (!filledAnswers) {
    return (
      <div className="glass-panel p-10 text-center text-sm text-gray-300">
        <p>{t('reports.empty')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel space-y-4 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{t('analyze.overall')}</p>
          <div className={`rounded-3xl bg-gradient-to-br p-8 text-center text-3xl font-bold ${overallColors[overallLevel]}`}>
            {t(`common.exposureLevels.${overallLevel}`)}
          </div>
          <p className="text-sm text-gray-300">{t(`analyze.exposureLevels.${overallLevel}`)}</p>
        </div>
        <div className="glass-panel p-8">
          <h3 className="text-xl font-semibold text-white">{t('analyze.subtitle')}</h3>
          <p className="mt-3 text-sm text-gray-300">{t('discover.intro')}</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {assessment.categories.map((category) => (
          <RiskCard key={category.key} category={category} />
        ))}
      </div>
    </div>
  );
};
