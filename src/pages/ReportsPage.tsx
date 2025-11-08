import { useMemo, useState } from 'react';
import { computeRiskAssessment } from '@/config/riskRules';
import { mitigationSuggestions } from '@/config/suggestions';
import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

interface SummaryItem {
  category: string;
  level: string;
  triggers: string[];
}

export const ReportsPage = () => {
  const { answers, reduceProgress } = useAppState();
  const t = useTranslations();
  const [summaryText, setSummaryText] = useState('');

  const filledAnswers = useMemo(
    () =>
      Object.values(answers).some((section) =>
        Object.values(section).some((value) => typeof value === 'string' && value !== '')
      ),
    [answers]
  );

  const assessment = useMemo(() => computeRiskAssessment(answers), [answers]);
  const exposures = assessment.categories.filter((category) => category.level !== 'low');
  const completedActions = mitigationSuggestions.filter((suggestion) => reduceProgress[suggestion.id]);

  const summary: { overview: string; exposures: SummaryItem[]; completed: string[] } = useMemo(
    () => ({
      overview: t(`common.exposureLevels.${assessment.overall}`),
      exposures: exposures.map((category) => ({
        category: t(`analyze.categories.${category.key}`),
        level: t(`common.exposureLevels.${category.level}`),
        triggers: category.triggers.map((trigger) => t(trigger.messageKey))
      })),
      completed: completedActions.map((suggestion) => t(suggestion.titleKey))
    }),
    [assessment.overall, completedActions, exposures, t]
  );

  const generateMarkdown = () => {
    const lines = [
      t('reports.markdownTitle'),
      '',
      `${t('reports.summary.overview')}: ${summary.overview}`,
      '',
      t('reports.markdownExposure')
    ];
    if (summary.exposures.length === 0) {
      lines.push('- ' + t('reduce.emptyState'));
    } else {
      summary.exposures.forEach((item) => {
        lines.push(`- ${item.category} — ${item.level}`);
        item.triggers.forEach((trigger) => lines.push(`  - ${trigger}`));
      });
    }
    lines.push('', t('reports.markdownMitigations'));
    if (summary.completed.length === 0) {
      lines.push('- ' + t('common.notCompleted'));
    } else {
      summary.completed.forEach((item) => lines.push(`- ${item}`));
    }
    return lines.join('\n');
  };

  const generateJson = () =>
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        overallLevel: assessment.overall,
        overallLabel: summary.overview,
        exposures: summary.exposures,
        completedActions: summary.completed
      },
      null,
      2
    );

  const triggerDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    setSummaryText(generateMarkdown());
  };

  if (!filledAnswers) {
    return (
      <div className="glass-panel p-10 text-center text-sm text-gray-300">
        <p>{t('reports.empty')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{t('reports.title')}</h2>
        <p className="text-sm text-gray-300">{t('reports.subtitle')}</p>
        <button type="button" className="neon-button primary" onClick={handleGenerate}>
          {t('common.generateSummary')}
        </button>
      </div>
      {summaryText && (
        <div className="glass-panel space-y-4 p-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="neon-button secondary"
              onClick={() => triggerDownload(generateMarkdown(), 'privacy-self-audit.md', 'text/markdown')}
            >
              {t('common.downloadMarkdown')}
            </button>
            <button
              type="button"
              className="neon-button secondary"
              onClick={() => triggerDownload(generateJson(), 'privacy-self-audit.json', 'application/json')}
            >
              {t('common.downloadJson')}
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-gray-200">{summaryText}</pre>
        </div>
      )}
      {!summaryText && (
        <div className="glass-panel space-y-4 p-6">
          <h3 className="text-lg font-semibold text-white">{t('reports.summary.overview')}</h3>
          <p className="text-sm text-gray-300">{summary.overview}</p>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300">{t('reports.summary.exposures')}</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-200">
              {summary.exposures.map((item, index) => (
                <li key={index}>
                  <span className="font-medium text-white">{item.category}</span> — {item.level}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300">{t('reports.summary.mitigations')}</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-200">
              {summary.completed.length === 0 ? (
                <li>{t('common.notCompleted')}</li>
              ) : (
                summary.completed.map((item) => <li key={item}>{item}</li>)
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
