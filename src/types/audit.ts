export type AnswerValue = 'yes' | 'no' | 'unsure' | '';

export interface QuestionConfig {
  id: string;
  labelKey: string;
  descriptionKey?: string;
  type: 'choice' | 'text';
  placeholderKey?: string;
}

export interface StepConfig {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  questions: QuestionConfig[];
}

export type AuditAnswers = Record<string, Record<string, AnswerValue | string>>;

export type RiskLevel = 'low' | 'medium' | 'high';

export type RiskCategoryKey =
  | 'doxxing'
  | 'stalking'
  | 'socialEngineering'
  | 'accountTakeover'
  | 'harassment'
  | 'fraud'
  | 'physical';

export interface RiskTrigger {
  questionId: string;
  messageKey: string;
}

export interface RiskCategoryResult {
  key: RiskCategoryKey;
  level: RiskLevel;
  score: number;
  triggers: RiskTrigger[];
}

export interface RiskAssessment {
  overall: RiskLevel;
  categories: RiskCategoryResult[];
}

export interface Suggestion {
  id: string;
  titleKey: string;
  bodyKey: string;
  stepsKeys: string[];
  intensity: 'quick' | 'high' | 'advanced';
  categories: RiskCategoryKey[];
}
