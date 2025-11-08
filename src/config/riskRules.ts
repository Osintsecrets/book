import type { AuditAnswers, RiskAssessment, RiskCategoryKey, RiskLevel, RiskTrigger } from '@/types/audit';

const CATEGORY_KEYS: RiskCategoryKey[] = [
  'doxxing',
  'stalking',
  'socialEngineering',
  'accountTakeover',
  'harassment',
  'fraud',
  'physical'
];

const questionToTriggers: Record<string, { categories: RiskCategoryKey[]; triggerKey: string; weight?: number }> = {
  identity_full_name_public: {
    categories: ['socialEngineering', 'fraud', 'harassment'],
    triggerKey: 'analyze.triggers.identity.fullName',
    weight: 2
  },
  identity_email_public: {
    categories: ['accountTakeover', 'socialEngineering', 'fraud'],
    triggerKey: 'analyze.triggers.identity.email',
    weight: 2
  },
  identity_phone_public: {
    categories: ['socialEngineering', 'fraud', 'physical'],
    triggerKey: 'analyze.triggers.identity.phone',
    weight: 2
  },
  location_home_photo: {
    categories: ['physical', 'doxxing'],
    triggerKey: 'analyze.triggers.location.homePhoto',
    weight: 2
  },
  location_street_signs: {
    categories: ['doxxing', 'physical'],
    triggerKey: 'analyze.triggers.location.streetSigns'
  },
  location_tagged_home: {
    categories: ['doxxing', 'stalking'],
    triggerKey: 'analyze.triggers.location.taggedHome',
    weight: 2
  },
  work_company_public: {
    categories: ['harassment', 'fraud'],
    triggerKey: 'analyze.triggers.work.company'
  },
  work_role_public: {
    categories: ['socialEngineering', 'harassment'],
    triggerKey: 'analyze.triggers.work.role'
  },
  work_coworkers_tagged: {
    categories: ['harassment'],
    triggerKey: 'analyze.triggers.work.coworkers'
  },
  social_relationship_status: {
    categories: ['harassment', 'stalking'],
    triggerKey: 'analyze.triggers.social.relationship'
  },
  social_children_visible: {
    categories: ['physical', 'harassment'],
    triggerKey: 'analyze.triggers.social.children',
    weight: 2
  },
  social_routine_visible: {
    categories: ['stalking', 'physical'],
    triggerKey: 'analyze.triggers.social.routines'
  },
  media_sensitive_photos: {
    categories: ['harassment', 'fraud'],
    triggerKey: 'analyze.triggers.media.sensitive',
    weight: 2
  },
  media_metadata_visible: {
    categories: ['doxxing', 'physical'],
    triggerKey: 'analyze.triggers.media.metadata'
  },
  media_old_posts: {
    categories: ['harassment'],
    triggerKey: 'analyze.triggers.media.oldPosts'
  },
  habits_travel_live: {
    categories: ['physical', 'stalking'],
    triggerKey: 'analyze.triggers.habits.travel'
  },
  habits_repetitive_checkins: {
    categories: ['stalking', 'physical'],
    triggerKey: 'analyze.triggers.habits.checkins'
  },
  habits_time_online: {
    categories: ['socialEngineering'],
    triggerKey: 'analyze.triggers.habits.availability'
  },
  platforms_facebook_public: {
    categories: ['socialEngineering', 'accountTakeover', 'harassment'],
    triggerKey: 'analyze.triggers.platforms.facebook'
  },
  platforms_instagram_public: {
    categories: ['stalking', 'harassment'],
    triggerKey: 'analyze.triggers.platforms.instagram'
  },
  platforms_linkedin_public: {
    categories: ['socialEngineering', 'fraud'],
    triggerKey: 'analyze.triggers.platforms.linkedin'
  }
};

const isRisky = (value: string | undefined) => value === 'yes';

export const computeRiskAssessment = (answers: AuditAnswers): RiskAssessment => {
  const categoryScores: Record<RiskCategoryKey, { score: number; triggers: RiskTrigger[] }> = CATEGORY_KEYS.reduce(
    (acc, key) => ({ ...acc, [key]: { score: 0, triggers: [] } }),
    {} as Record<RiskCategoryKey, { score: number; triggers: RiskTrigger[] }>
  );

  Object.entries(answers).forEach(([, sectionAnswers]) => {
    Object.entries(sectionAnswers).forEach(([questionId, value]) => {
      if (!isRisky(value as string)) return;
      const mapping = questionToTriggers[questionId];
      if (!mapping) return;
      mapping.categories.forEach((category) => {
        categoryScores[category].score += mapping.weight ?? 1;
        categoryScores[category].triggers.push({
          questionId,
          messageKey: mapping.triggerKey
        });
      });
    });
  });

  const categories = CATEGORY_KEYS.map((key) => {
    const { score, triggers } = categoryScores[key];
    let level: RiskLevel = 'low';
    if (score >= 5) level = 'high';
    else if (score >= 2) level = 'medium';
    return {
      key,
      score,
      level,
      triggers
    };
  });

  const maxLevel = categories.reduce<RiskLevel>((acc, category) => {
    if (category.level === 'high') return 'high';
    if (category.level === 'medium' && acc === 'low') return 'medium';
    return acc;
  }, 'low');

  return {
    overall: maxLevel,
    categories
  };
};
