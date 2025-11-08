import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { auditSteps } from '@/config/questions';
import type { AnswerValue } from '@/types/audit';
import { QuestionCard } from '@/components/QuestionCard';
import { StepProgress } from '@/components/StepProgress';
import { useAppState } from '@/state/AppStateContext';
import { useTranslations } from '@/i18n/useTranslations';

export const DiscoverPage = () => {
  const t = useTranslations();
  const navigate = useNavigate();
  const { answers, updateAnswer, wizardStep, setWizardStep } = useAppState();
  const totalSteps = auditSteps.length;
  const step = auditSteps[wizardStep] ?? auditSteps[0];

  const stepAnswers = useMemo(() => answers[step.id] ?? {}, [answers, step.id]);

  const canGoNext = step.questions.every((question) => {
    const value = stepAnswers[question.id];
    return typeof value === 'string' && value !== '';
  });

  const goNext = () => {
    if (!canGoNext) return;
    if (wizardStep === totalSteps - 1) {
      navigate('/analyze');
      return;
    }
    setWizardStep(Math.min(totalSteps - 1, wizardStep + 1));
  };

  const goBack = () => {
    setWizardStep(Math.max(0, wizardStep - 1));
  };

  return (
    <div className="space-y-10">
      <div className="glass-panel space-y-4 p-8">
        <h2 className="text-3xl font-semibold text-white">{t(step.titleKey)}</h2>
        {step.descriptionKey && <p className="text-sm text-gray-300">{t(step.descriptionKey)}</p>}
        <p className="text-xs text-gray-400">{t('discover.intro')}</p>
        <StepProgress current={wizardStep} total={totalSteps} label={t('common.step')} ofLabel={t('common.of')} />
      </div>
      <div className="space-y-6">
        {step.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={stepAnswers[question.id] ?? ''}
            onChange={(value) => updateAnswer(step.id, question.id, value as AnswerValue)}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        <button
          type="button"
          className="neon-button secondary disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={goBack}
          disabled={wizardStep === 0}
        >
          {t('common.back')}
        </button>
        <button
          type="button"
          className={`neon-button primary ${!canGoNext ? 'pointer-events-none opacity-50' : ''}`}
          onClick={goNext}
          disabled={!canGoNext}
        >
          {wizardStep === totalSteps - 1 ? t('nav.analyze') : t('common.continue')}
        </button>
      </div>
    </div>
  );
};
