import type { RiskAssessment, RiskCategoryKey, Suggestion } from '@/types/audit';

export const mitigationSuggestions: Suggestion[] = [
  {
    id: 'hide-phone-number',
    titleKey: 'reduce.suggestions.hidePhone.title',
    bodyKey: 'reduce.suggestions.hidePhone.body',
    stepsKeys: [
      'reduce.suggestions.hidePhone.steps.1',
      'reduce.suggestions.hidePhone.steps.2',
      'reduce.suggestions.hidePhone.steps.3'
    ],
    intensity: 'quick',
    categories: ['socialEngineering', 'fraud', 'physical']
  },
  {
    id: 'email-alias',
    titleKey: 'reduce.suggestions.emailAlias.title',
    bodyKey: 'reduce.suggestions.emailAlias.body',
    stepsKeys: [
      'reduce.suggestions.emailAlias.steps.1',
      'reduce.suggestions.emailAlias.steps.2'
    ],
    intensity: 'high',
    categories: ['accountTakeover', 'fraud']
  },
  {
    id: 'lockdown-photos',
    titleKey: 'reduce.suggestions.lockdownPhotos.title',
    bodyKey: 'reduce.suggestions.lockdownPhotos.body',
    stepsKeys: [
      'reduce.suggestions.lockdownPhotos.steps.1',
      'reduce.suggestions.lockdownPhotos.steps.2',
      'reduce.suggestions.lockdownPhotos.steps.3'
    ],
    intensity: 'quick',
    categories: ['harassment', 'physical']
  },
  {
    id: 'audit-social',
    titleKey: 'reduce.suggestions.auditSocial.title',
    bodyKey: 'reduce.suggestions.auditSocial.body',
    stepsKeys: [
      'reduce.suggestions.auditSocial.steps.1',
      'reduce.suggestions.auditSocial.steps.2',
      'reduce.suggestions.auditSocial.steps.3'
    ],
    intensity: 'high',
    categories: ['doxxing', 'stalking', 'harassment']
  },
  {
    id: 'password-manager',
    titleKey: 'reduce.suggestions.passwordManager.title',
    bodyKey: 'reduce.suggestions.passwordManager.body',
    stepsKeys: [
      'reduce.suggestions.passwordManager.steps.1',
      'reduce.suggestions.passwordManager.steps.2'
    ],
    intensity: 'advanced',
    categories: ['accountTakeover']
  },
  {
    id: 'child-privacy',
    titleKey: 'reduce.suggestions.childPrivacy.title',
    bodyKey: 'reduce.suggestions.childPrivacy.body',
    stepsKeys: [
      'reduce.suggestions.childPrivacy.steps.1',
      'reduce.suggestions.childPrivacy.steps.2'
    ],
    intensity: 'high',
    categories: ['physical', 'harassment']
  },
  {
    id: 'travel-delay',
    titleKey: 'reduce.suggestions.travelDelay.title',
    bodyKey: 'reduce.suggestions.travelDelay.body',
    stepsKeys: [
      'reduce.suggestions.travelDelay.steps.1',
      'reduce.suggestions.travelDelay.steps.2'
    ],
    intensity: 'quick',
    categories: ['physical', 'stalking']
  }
];

export const filterSuggestionsByRisk = (
  assessment: RiskAssessment,
  intensity: Suggestion['intensity'] | 'all'
): Suggestion[] => {
  const activeCategories = new Set<RiskCategoryKey>(
    assessment.categories.filter((c) => c.level !== 'low').map((c) => c.key)
  );

  return mitigationSuggestions.filter((suggestion) => {
    const matchesCategory = suggestion.categories.some((category) => activeCategories.has(category));
    if (!matchesCategory) return false;
    if (intensity === 'all') return true;
    return suggestion.intensity === intensity;
  });
};
