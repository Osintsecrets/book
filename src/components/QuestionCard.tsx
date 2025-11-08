import type { AnswerValue, QuestionConfig } from '@/types/audit';
import { useTranslations } from '@/i18n/useTranslations';

interface QuestionCardProps {
  question: QuestionConfig;
  value: AnswerValue | string;
  onChange: (value: AnswerValue | string) => void;
}

export const QuestionCard = ({ question, value, onChange }: QuestionCardProps) => {
  const t = useTranslations();

  if (question.type === 'text') {
    return (
      <label className="glass-panel block p-5 text-sm text-gray-100">
        <span className="font-medium text-white">{t(question.labelKey)}</span>
        <input
          type="text"
          className="mt-3 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none"
          value={value as string}
          placeholder={question.placeholderKey ? t(question.placeholderKey) : ''}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  const options: AnswerValue[] = ['yes', 'no', 'unsure'];

  return (
    <div className="glass-panel space-y-4 p-5 text-sm text-gray-100">
      <div>
        <p className="font-medium text-white">{t(question.labelKey)}</p>
        {question.descriptionKey && <p className="mt-1 text-xs text-gray-400">{t(question.descriptionKey)}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              value === option
                ? 'bg-violet/80 text-white shadow-glow'
                : 'border border-white/10 text-gray-300 hover:border-cyan-300/60 hover:text-white'
            }`}
          >
            {t(`common.${option}`)}
          </button>
        ))}
      </div>
    </div>
  );
};
