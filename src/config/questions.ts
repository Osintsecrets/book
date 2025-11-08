import type { AuditAnswers, StepConfig } from '@/types/audit';

export const auditSteps: StepConfig[] = [
  {
    id: 'identity',
    titleKey: 'discover.identity.title',
    descriptionKey: 'discover.identity.body',
    questions: [
      {
        id: 'identity_full_name_public',
        labelKey: 'discover.identity.questions.fullName',
        type: 'choice'
      },
      {
        id: 'identity_email_public',
        labelKey: 'discover.identity.questions.email',
        type: 'choice'
      },
      {
        id: 'identity_phone_public',
        labelKey: 'discover.identity.questions.phone',
        type: 'choice'
      }
    ]
  },
  {
    id: 'location',
    titleKey: 'discover.location.title',
    descriptionKey: 'discover.location.body',
    questions: [
      {
        id: 'location_home_photo',
        labelKey: 'discover.location.questions.homeExterior',
        type: 'choice'
      },
      {
        id: 'location_street_signs',
        labelKey: 'discover.location.questions.streetSigns',
        type: 'choice'
      },
      {
        id: 'location_tagged_home',
        labelKey: 'discover.location.questions.taggedHome',
        type: 'choice'
      }
    ]
  },
  {
    id: 'work',
    titleKey: 'discover.work.title',
    descriptionKey: 'discover.work.body',
    questions: [
      {
        id: 'work_company_public',
        labelKey: 'discover.work.questions.company',
        type: 'choice'
      },
      {
        id: 'work_role_public',
        labelKey: 'discover.work.questions.role',
        type: 'choice'
      },
      {
        id: 'work_coworkers_tagged',
        labelKey: 'discover.work.questions.coworkers',
        type: 'choice'
      }
    ]
  },
  {
    id: 'social',
    titleKey: 'discover.social.title',
    descriptionKey: 'discover.social.body',
    questions: [
      {
        id: 'social_relationship_status',
        labelKey: 'discover.social.questions.relationshipStatus',
        type: 'choice'
      },
      {
        id: 'social_children_visible',
        labelKey: 'discover.social.questions.children',
        type: 'choice'
      },
      {
        id: 'social_routine_visible',
        labelKey: 'discover.social.questions.routines',
        type: 'choice'
      }
    ]
  },
  {
    id: 'media',
    titleKey: 'discover.media.title',
    descriptionKey: 'discover.media.body',
    questions: [
      {
        id: 'media_sensitive_photos',
        labelKey: 'discover.media.questions.sensitiveMedia',
        type: 'choice'
      },
      {
        id: 'media_metadata_visible',
        labelKey: 'discover.media.questions.metadata',
        type: 'choice'
      },
      {
        id: 'media_old_posts',
        labelKey: 'discover.media.questions.oldPosts',
        type: 'choice'
      }
    ]
  },
  {
    id: 'habits',
    titleKey: 'discover.habits.title',
    descriptionKey: 'discover.habits.body',
    questions: [
      {
        id: 'habits_travel_live',
        labelKey: 'discover.habits.questions.travel',
        type: 'choice'
      },
      {
        id: 'habits_repetitive_checkins',
        labelKey: 'discover.habits.questions.checkins',
        type: 'choice'
      },
      {
        id: 'habits_time_online',
        labelKey: 'discover.habits.questions.availability',
        type: 'choice'
      }
    ]
  },
  {
    id: 'platforms',
    titleKey: 'discover.platforms.title',
    descriptionKey: 'discover.platforms.body',
    questions: [
      {
        id: 'platforms_facebook_public',
        labelKey: 'discover.platforms.questions.facebook',
        type: 'choice'
      },
      {
        id: 'platforms_instagram_public',
        labelKey: 'discover.platforms.questions.instagram',
        type: 'choice'
      },
      {
        id: 'platforms_linkedin_public',
        labelKey: 'discover.platforms.questions.linkedin',
        type: 'choice'
      }
    ]
  }
];

export const defaultAnswers = auditSteps.reduce((acc, step) => {
  acc[step.id] = step.questions.reduce((innerAcc, question) => {
    innerAcc[question.id] = '';
    return innerAcc;
  }, {} as Record<string, string>);
  return acc;
}, {} as Record<string, Record<string, string>>);


export const createDefaultAnswers = (): AuditAnswers => JSON.parse(JSON.stringify(defaultAnswers)) as AuditAnswers;
