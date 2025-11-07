
export enum Page {
  Home = 'Home',
  HowItWorks = 'How It Works',
  StartAudit = 'Start Audit',
  Analyze = 'Analyze',
  Reduce = 'Reduce',
  KeepSafe = 'Keep Safe',
  Reports = 'Reports',
  Settings = 'Settings & Trust',
}

export type Language = 'en' | 'he';

export type Answer = boolean | 'not_sure' | string | null;

export type AuditAnswers = {
  [key: string]: Answer;
};

export interface AuditData {
  answers: AuditAnswers;
  completedMitigations: string[];
  nextCheckupDate?: string;
}

export interface AppState {
  page: Page;
  language: Language;
  auditData: AuditData;
}

export enum QuestionType {
  Toggle = 'toggle',
  Text = 'text',
}

export interface Question {
  id: string;
  type: QuestionType;
  section: string;
}

export const WIZARD_SECTIONS = [
  'Identity & Contact',
  'Location & Home',
  'Work & Education',
  'Social & Relationships',
  'Photos & Media',
  'Habits & Patterns',
  'Platform Checks',
];

export const WIZARD_QUESTIONS: Question[] = [
  // Section 1: Identity & Contact
  { id: 'fullNamePublic', type: QuestionType.Toggle, section: 'Identity & Contact' },
  { id: 'emailPublic', type: QuestionType.Toggle, section: 'Identity & Contact' },
  { id: 'phonePublic', type: QuestionType.Toggle, section: 'Identity & Contact' },
  { id: 'dobPublic', type: QuestionType.Toggle, section: 'Identity & Contact' },

  // Section 2: Location & Home
  { id: 'homeAddressPublic', type: QuestionType.Toggle, section: 'Location & Home' },
  { id: 'frequentLocationsPublic', type: QuestionType.Toggle, section: 'Location & Home' },
  { id: 'photosOfHomeExteriorPublic', type: QuestionType.Toggle, section: 'Location & Home' },

  // Section 3: Work & Education
  { id: 'employerPublic', type: QuestionType.Toggle, section: 'Work & Education' },
  { id: 'jobTitlePublic', type: QuestionType.Toggle, section: 'Work & Education' },
  { id: 'schoolPublic', type: QuestionType.Toggle, section: 'Work & Education' },

  // Section 4: Social & Relationships
  { id: 'familyMembersTagged', type: QuestionType.Toggle, section: 'Social & Relationships' },
  { id: 'relationshipStatusPublic', type: QuestionType.Toggle, section: 'Social & Relationships' },
  { id: 'publicFriendList', type: QuestionType.Toggle, section: 'Social & Relationships' },

  // Section 5: Photos & Media
  { id: 'photosOfChildrenPublic', type: QuestionType.Toggle, section: 'Photos & Media' },
  { id: 'geotaggedPhotosPublic', type: QuestionType.Toggle, section: 'Photos & Media' },
  { id: 'compromisingPhotosPublic', type: QuestionType.Toggle, section: 'Photos & Media' },

  // Section 6: Habits & Patterns
  { id: 'publicCheckins', type: QuestionType.Toggle, section: 'Habits & Patterns' },
  { id: 'politicalViewsPublic', type: QuestionType.Toggle, section: 'Habits & Patterns' },
  { id: 'vacationPlansPublic', type: QuestionType.Toggle, section: 'Habits & Patterns' },

  // Section 7: Platform Checks
  { id: 'facebookProfilePublic', type: QuestionType.Toggle, section: 'Platform Checks' },
  { id: 'instagramProfilePublic', type: QuestionType.Toggle, section: 'Platform Checks' },
  { id: 'tiktokProfilePublic', type: QuestionType.Toggle, section: 'Platform Checks' },
  { id: 'xProfilePublic', type: QuestionType.Toggle, section: 'Platform Checks' },
  { id: 'linkedinProfilePublic', type: QuestionType.Toggle, section: 'Platform Checks' },
];

export enum RiskCategory {
    Doxxing = 'Doxxing',
    Stalking = 'Stalking / Tracking',
    SocialEngineering = 'Social Engineering',
    AccountTakeover = 'Account Takeover',
    Reputation = 'Harassment / Reputation',
    Fraud = 'Fraud / Identity Theft',
    PhysicalSecurity = 'Physical Security',
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskFinding {
    reason: string;
    level: RiskLevel;
}

export interface RiskAnalysis {
    overallLevel: RiskLevel;
    categoryRisks: Record<RiskCategory, { level: RiskLevel; findings: RiskFinding[] }>;
}

export interface Mitigation {
    id: string;
    title: string;
    description: string;
    category: 'Quick Wins' | 'High Impact' | 'Advanced';
    triggers: string[];
}
   