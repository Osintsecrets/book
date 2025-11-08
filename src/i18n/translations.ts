export type Locale = 'en' | 'he';

type TranslationTree = Record<string, string | TranslationTree>;

export const translations: Record<Locale, TranslationTree> = {
  en: {
    common: {
      appName: 'Privacy Self-Audit',
      privacyPromise: '100% private. All analysis runs locally on your device. Nothing you enter is uploaded or stored on our servers.',
      startAudit: 'Start My Privacy Audit',
      howItWorks: 'How It Works',
      continue: 'Continue',
      back: 'Back',
      step: 'Step',
      of: 'of',
      yes: 'Yes',
      no: 'No',
      unsure: 'Unsure',
      completed: 'Completed',
      notCompleted: 'Not completed',
      markDone: 'Mark done',
      undo: 'Undo',
      downloadMarkdown: 'Download as Markdown',
      downloadJson: 'Download as JSON',
      generateSummary: 'Generate My Summary',
      intensity: {
        quick: 'Quick Wins',
        high: 'High Impact',
        advanced: 'Advanced'
      },
      exposureLevels: {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      },
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      language: 'Language',
      deleteData: 'Delete all my data',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    nav: {
      home: 'Home',
      how: 'How It Works',
      discover: 'Start Audit',
      analyze: 'Analyze',
      reduce: 'Reduce',
      keepSafe: 'Keep Safe',
      reports: 'Reports & Export',
      settings: 'Settings & Trust'
    },
    home: {
      heroTitle: 'Take Back Your First Impression.',
      heroBody: `We’ve all done it — looked someone up online to learn a little more. Maybe it was curiosity, a date, a job candidate, a neighbor, or someone we just met. We scroll, we judge, we form conclusions — often without realizing how much we’re learning.\n\nNow flip it around. Hundreds of people have done the same thing to you. Every post, every photo, every like — each one tells a story about you, whether it’s true or not. You don’t get to explain yourself to them. They see what they see and decide who you are.\n\nYour online presence is your first impression. This is where you take it back. Map what’s public. See what they see. Decide what stays and what goes — before someone else does it for you.`,
      primaryCta: 'Start My Privacy Audit',
      secondaryCta: 'How It Works',
      cards: {
        map: {
          title: 'Map what’s public',
          body: 'Assemble the trail of information that is already exposed.'
        },
        see: {
          title: 'See what they see',
          body: 'Preview how a stranger, employer, or adversary pieces you together.'
        },
        decide: {
          title: 'Decide what stays',
          body: 'Keep what serves you. Archive or remove what doesn’t.'
        }
      }
    },
    how: {
      whatItDoes: {
        title: 'What this tool does',
        bullets: [
          'Surfaces signals that are already public about you.',
          'Groups your exposure so you can see risk patterns fast.',
          'Helps you plan a clean-up that keeps control in your hands.'
        ]
      },
      darkFlow: {
        title: 'The DARK Flow',
        steps: [
          'Discover — Find your exposure.',
          'Analyze — Understand how it can be used.',
          'Reduce — Close the gaps.',
          'Keep Safe — Build long-term habits.'
        ]
      },
      whatNot: {
        title: 'What this tool does NOT do',
        bullets: [
          'No accounts.',
          'No cloud storage.',
          'No hacking.',
          'No selling data.'
        ]
      },
      who: {
        title: 'Who this is for',
        cards: [
          { title: 'Job seekers', body: 'Control your professional impression before interviews.' },
          { title: 'Parents & caregivers', body: 'Know what your family reveals without meaning to.' },
          { title: 'Creators', body: 'Protect your audience while staying authentic.' },
          { title: 'Professionals', body: 'Audit exposure for clients, founders, and executives.' }
        ]
      },
      cta: 'Start My Audit'
    },
    discover: {
      intro: 'Work through each focus area. Answer honestly — this stays on your device.',
      identity: {
        title: 'Identity & Contact',
        body: 'Name, email, and phone are the anchors most attackers start with.',
        questions: {
          fullName: 'Is your full name easily searchable with your photo?',
          email: 'Is your primary email visible publicly?',
          phone: 'Is your phone number visible publicly?'
        }
      },
      location: {
        title: 'Location & Home',
        body: 'Understand how easily someone can find where you live or spend time.',
        questions: {
          homeExterior: 'Do posts include a recognizable home exterior?',
          streetSigns: 'Do your photos reveal street signs or house numbers?',
          taggedHome: 'Are you or others tagging your home or neighborhood frequently?'
        }
      },
      work: {
        title: 'Work & Education',
        body: 'What could strangers learn about your daily schedule and access?',
        questions: {
          company: 'Is your workplace name public and current?',
          role: 'Is your role, company badge, or credentials visible?',
          coworkers: 'Are colleagues tagged or linked to you in posts?'
        }
      },
      social: {
        title: 'Social & Relationships',
        body: 'Relationships can reveal leverage points or emotional targets.',
        questions: {
          relationshipStatus: 'Is your relationship status obvious from your profiles?',
          children: 'Do you share identifying details about children?',
          routines: 'Can someone map your weekly routines from your posts?'
        }
      },
      media: {
        title: 'Photos & Media',
        body: 'Images and videos often leak more context than text.',
        questions: {
          sensitiveMedia: 'Are sensitive or embarrassing photos easy to find?',
          metadata: 'Do images include location metadata or backgrounds that give away context?',
          oldPosts: 'Do old posts resurface outdated or risky information?'
        }
      },
      habits: {
        title: 'Habits & Patterns',
        body: 'Patterns reveal when you are away, available, or predictable.',
        questions: {
          travel: 'Do you post travel plans or live updates while away from home?',
          checkins: 'Do you check in to the same places on a schedule?',
          availability: 'Could someone guess when you are online or reachable?'
        }
      },
      platforms: {
        title: 'Platform Checks',
        body: 'Which platforms give outsiders the clearest picture of you?',
        questions: {
          facebook: 'Is your Facebook profile mostly public?',
          instagram: 'Are your Instagram posts public?',
          linkedin: 'Is your LinkedIn activity wide open to anyone?'
        }
      }
    },
    analyze: {
      title: 'Risk Overview',
      subtitle: 'Your answers feed these exposure scores. Everything stays on this device.',
      overall: 'Overall Exposure',
      detailTitle: 'What triggered this',
      exposureLevels: {
        low: 'Your footprint is controlled, but stay watchful for changes.',
        medium: 'Several signals are exposed. Prioritize the mitigation playbook.',
        high: 'Attackers have multiple angles. Act quickly to close the gaps.'
      },
      categories: {
        doxxing: 'Doxxing',
        stalking: 'Stalking / Tracking',
        socialEngineering: 'Social Engineering',
        accountTakeover: 'Account Takeover',
        harassment: 'Harassment / Reputation',
        fraud: 'Fraud / Identity Theft',
        physical: 'Physical Security'
      },
      triggers: {
        identity: {
          fullName: 'Your full name is easy to match with imagery or profiles.',
          email: 'Your primary email is visible, inviting phishing or credential stuffing.',
          phone: 'Your phone number is exposed and could support SIM swaps or vishing.'
        },
        location: {
          homePhoto: 'Posts or listings show your home exterior clearly.',
          streetSigns: 'Photos reveal street signs, house numbers, or other anchors.',
          taggedHome: 'Check-ins or tags reveal your home or neighborhood frequently.'
        },
        work: {
          company: 'Your current employer is easy to confirm publicly.',
          role: 'Role details or badges make impersonation easier.',
          coworkers: 'Coworker tags reveal your professional network.'
        },
        social: {
          relationship: 'Relationship details could be used for social pressure or scams.',
          children: 'Children’s identities or routines are visible to strangers.',
          routines: 'Posting patterns reveal predictable routines.'
        },
        media: {
          sensitive: 'Sensitive or compromising imagery is public.',
          metadata: 'Media exposes location metadata or recognizable backgrounds.',
          oldPosts: 'Old posts resurface outdated or risky context.'
        },
        habits: {
          travel: 'Live travel updates tell people when you are away.',
          checkins: 'Repeated check-ins build a map of your routine.',
          availability: 'Availability indicators show when you can be reached.'
        },
        platforms: {
          facebook: 'Facebook content is largely visible beyond friends.',
          instagram: 'Instagram posts or stories are public to anyone.',
          linkedin: 'LinkedIn reveals a detailed career timeline and connections.'
        }
      }
    },
    reduce: {
      title: 'Mitigation Playbook',
      subtitle: 'Tailored to the exposures above. Track what you complete. Stored locally.',
      filterLabel: 'Focus',
      emptyState: 'Great news — your current risk level here is low. Revisit after your next self-check.',
      suggestions: {
        hidePhone: {
          title: 'Remove phone number from public profiles',
          body: 'Limit where your personal number appears to reduce phishing leverage.',
          steps: {
            1: 'Review your "Contact" sections on major platforms and remove the phone field.',
            2: 'Provide a virtual number or business line where phone contact is required.',
            3: 'Update marketplace listings or resumes that expose the number.'
          }
        },
        emailAlias: {
          title: 'Route public contact through an email alias',
          body: 'Separate inbound outreach from accounts you rely on every day.',
          steps: {
            1: 'Create a new alias or forwarding address dedicated to public use.',
            2: 'Update bios and profiles with the alias, keeping your primary inbox private.'
          }
        },
        lockdownPhotos: {
          title: 'Lock down sensitive photos',
          body: 'Prune or re-permission posts that expose family, location, or reputation.',
          steps: {
            1: 'Audit albums and highlights for faces, uniforms, or background clues.',
            2: 'Limit audience to trusted circles or archive high-risk items.',
            3: 'Ask friends to remove posts that reveal your private spaces.'
          }
        },
        auditSocial: {
          title: 'Run a privacy checkup on each social platform',
          body: 'Align each network’s settings with the story you want to tell.',
          steps: {
            1: 'Facebook: Settings → Privacy → Limit past posts and audience defaults.',
            2: 'Instagram: Settings → Privacy → Switch to private and review story controls.',
            3: 'LinkedIn: Settings → Visibility → Limit profile and activity broadcasts.'
          }
        },
        passwordManager: {
          title: 'Adopt a password manager + 2FA routine',
          body: 'Reduce credential reuse and strengthen your defenses.',
          steps: {
            1: 'Pick a reputable password manager and migrate your credentials.',
            2: 'Enable app-based multi-factor authentication on priority accounts.'
          }
        },
        childPrivacy: {
          title: 'Tighten privacy around children',
          body: 'Limit location, school, and routine details about kids.',
          steps: {
            1: 'Remove school logos, uniforms, or identifiable backdrops from posts.',
            2: 'Restrict audiences for content that names or tags children.'
          }
        },
        travelDelay: {
          title: 'Delay travel posts until you return',
          body: 'Share the story without signaling an empty home.',
          steps: {
            1: 'Disable automatic location tagging while away.',
            2: 'Post highlights after you are back home and have resumed normal routines.'
          }
        }
      },
      note: 'These are educational suggestions. You decide what fits your life.'
    },
    keepSafe: {
      title: 'Keep Safe',
      subtitle: 'Habits that keep your footprint in check long after today.',
      tiles: [
        { title: 'Use a password manager', body: 'Unique credentials reduce fallout from breaches.' },
        { title: 'Enable two-factor authentication', body: 'MFA blocks the most common account takeover paths.' },
        { title: 'Review privacy settings regularly', body: 'Platforms change defaults. Reconfirm them quarterly.' },
        { title: 'Be cautious sharing kids’ faces and locations', body: 'Protect their privacy like you protect their identity.' },
        { title: 'Avoid posting exact travel dates in real-time', body: 'Post the highlight reel after you return.' }
      ],
      nextCheck: {
        label: 'Choose your next self-check date',
        placeholder: 'Pick a date',
        reminder: 'Next self-check scheduled for:'
      }
    },
    reports: {
      title: 'Reports & Export',
      subtitle: 'Generate a private snapshot of your current exposure and mitigation progress.',
      summary: {
        overview: 'Overview',
        exposures: 'Key exposures detected',
        mitigations: 'Actions completed'
      },
      empty: 'Fill out the audit to see your personalized summary here.',
      markdownTitle: '# Privacy Self-Audit Summary',
      markdownExposure: '## Key Exposures',
      markdownMitigations: '## Completed Actions'
    },
    settings: {
      title: 'Settings & Trust',
      subtitle: 'Tune the experience and control your data. Everything stays local.',
      languageLabel: 'Language',
      themeLabel: 'Theme',
      delete: {
        title: 'Delete all my data',
        body: 'This removes answers, mitigation progress, and reminders from this device.',
        confirm: 'Are you sure you want to delete all saved data?'
      },
      privacy: {
        title: 'How this tool protects your privacy',
        bullets: [
          'All processing happens locally in your browser.',
          'No accounts, logins, or telemetry.',
          'Data is stored using encrypted-at-rest browser storage when available.'
        ]
      },
      limitations: {
        title: 'Limitations',
        bullets: [
          'This is not legal advice.',
          'No tool can guarantee absolute security.',
          'Use this as a thinking aid for attacker perspective.'
        ]
      }
    }
  },
  he: {
    common: {
      appName: 'בדיקת פרטיות עצמית',
      privacyPromise: '100% פרטיות. כל הניתוח מתבצע מקומית במכשיר שלך. שום דבר שאינך מזין לא נשלח או נשמר אצלנו.',
      startAudit: 'התחילו את בדיקת הפרטיות שלי',
      howItWorks: 'איך זה עובד',
      continue: 'המשך',
      back: 'חזור',
      step: 'שלב',
      of: 'מתוך',
      yes: 'כן',
      no: 'לא',
      unsure: 'לא בטוח',
      completed: 'הושלם',
      notCompleted: 'לא הושלם',
      markDone: 'סמן כהושלם',
      undo: 'בטל',
      downloadMarkdown: 'הורדה כ-Markdown',
      downloadJson: 'הורדה כ-JSON',
      generateSummary: 'צור סיכום אישי',
      intensity: {
        quick: 'ניצחונות מהירים',
        high: 'השפעה גבוהה',
        advanced: 'מתקדם'
      },
      exposureLevels: {
        low: 'נמוך',
        medium: 'בינוני',
        high: 'גבוה'
      },
      theme: 'ערכת נושא',
      dark: 'כהה',
      light: 'בהירה',
      language: 'שפה',
      deleteData: 'מחק את כל הנתונים שלי',
      confirm: 'אישור',
      cancel: 'ביטול'
    },
    nav: {
      home: 'בית',
      how: 'איך זה עובד',
      discover: 'התחלת בדיקה',
      analyze: 'ניתוח',
      reduce: 'צמצום',
      keepSafe: 'שמירה מתמשכת',
      reports: 'דוחות וייצוא',
      settings: 'הגדרות ואמון'
    },
    home: {
      heroTitle: 'קחו בחזרה את הרושם הראשוני שלכם.',
      heroBody: 'כולנו עשינו זאת — חיפשנו אדם ברשת כדי לדעת עוד. אולי מתוך סקרנות, דייט, מועמד לעבודה, שכן, או מישהו שהכרנו זה עתה. אנחנו גוללים, שופטים ומסיקים מסקנות — לעיתים בלי להבין כמה אנו מגלים.\n\nעכשיו תהפכו את זה. מאות אנשים עשו אותו דבר עליכם. כל פוסט, כל צילום, כל לייק — כל אחד מהם מספר סיפור עליכם, נכון או לא. אין לכם הזדמנות להסביר. הם רואים ומחליטים מי אתם.\n\nהנוכחות הדיגיטלית שלכם היא הרושם הראשון. כאן מחזירים שליטה. ממפים את מה שגלוי. רואים מה הם רואים. מחליטים מה נשאר ומה נעלם — לפני שמישהו אחר יעשה זאת בשבילכם.',
      primaryCta: 'התחילו את בדיקת הפרטיות שלי',
      secondaryCta: 'איך זה עובד',
      cards: {
        map: {
          title: 'מפה את מה שגלוי',
          body: 'אספו את השביל שכבר חשוף.'
        },
        see: {
          title: 'ראו מה אחרים רואים',
          body: 'חוו איך זר, מעסיק או תוקף מרכיבים את התמונה.'
        },
        decide: {
          title: 'החליטו מה נשאר',
          body: 'שמרו את מה שמשרת אתכם. הסירו או הארכיבו את השאר.'
        }
      }
    },
    how: {
      whatItDoes: {
        title: 'מה הכלי עושה',
        bullets: [
          'מציף אותות שכבר פומביים עליכם.',
          'מקבץ חשיפות כדי לראות דפוסי סיכון במהירות.',
          'עוזר לתכנן ניקוי תוך שמירת השליטה אצלכם.'
        ]
      },
      darkFlow: {
        title: 'זרימת DARK',
        steps: [
          'Discover — מצאו את החשיפה.',
          'Analyze — הבינו איך ניתן להשתמש בה.',
          'Reduce — סגרו את הפערים.',
          'Keep Safe — בנו הרגלי הגנה ארוכי טווח.'
        ]
      },
      whatNot: {
        title: 'מה הכלי לא עושה',
        bullets: ['אין חשבונות.', 'אין אחסון בענן.', 'אין פריצה.', 'אין מכירת נתונים.']
      },
      who: {
        title: 'למי זה מתאים',
        cards: [
          { title: 'מחפשי עבודה', body: 'שליטה בתדמית המקצועית לפני הראיון.' },
          { title: 'הורים ומטפלים', body: 'לדעת מה המשפחה חושפת בלי לשים לב.' },
          { title: 'יוצרים', body: 'להגן על הקהל ולהישאר אמיתיים.' },
          { title: 'אנשי מקצוע', body: 'בדקו חשיפה עבור לקוחות, יזמים ומנהלים.' }
        ]
      },
      cta: 'התחילו את הבדיקה שלי'
    },
    discover: {
      intro: 'ענו בכנות — הכול נשאר במכשיר שלכם.',
      identity: {
        title: 'זהות ויצירת קשר',
        body: 'שם, אימייל וטלפון הם העוגנים שברובם מתחילים תוקפים.',
        questions: {
          fullName: 'האם ניתן למצוא בקלות את שמכם המלא עם תמונה?',
          email: 'האם כתובת האימייל הראשית שלכם גלויה לציבור?',
          phone: 'האם מספר הטלפון שלכם גלוי לציבור?'
        }
      },
      location: {
        title: 'מיקום ובית',
        body: 'כמה קל לאנשים לגלות היכן אתם גרים או מבלים.',
        questions: {
          homeExterior: 'האם קיימות תמונות של חזית הבית המזוהה?',
          streetSigns: 'האם תמונות חושפות שלטי רחוב או מספרי בתים?',
          taggedHome: 'האם אתם או אחרים מתייגים את הבית או השכונה לעיתים קרובות?'
        }
      },
      work: {
        title: 'עבודה והשכלה',
        body: 'מה ניתן ללמוד על סדר היום והגישה שלכם?',
        questions: {
          company: 'האם שם מקום העבודה הנוכחי גלוי?',
          role: 'האם התפקיד, החברה או התג מזוהים בפרופילים?',
          coworkers: 'האם עמיתים מתויגים או מקושרים אליכם?'
        }
      },
      social: {
        title: 'חברה ומערכות יחסים',
        body: 'קשרים חושפים נקודות תורפה או מנוף רגשי.',
        questions: {
          relationshipStatus: 'האם סטטוס הקשר שלכם גלוי?',
          children: 'האם אתם משתפים פרטים מזהים על ילדים?',
          routines: 'האם ניתן להרכיב את השגרה השבועית מהפוסטים?'
        }
      },
      media: {
        title: 'תמונות ומדיה',
        body: 'תמונות וסרטונים דולפים יותר מהטקסט.',
        questions: {
          sensitiveMedia: 'האם קל למצוא תמונות רגישות או מביכות?',
          metadata: 'האם התמונות כוללות מטא-נתונים או רקעים מזוהים?',
          oldPosts: 'האם פוסטים ישנים חושפים מידע מסוכן?'
        }
      },
      habits: {
        title: 'הרגלים ודפוסים',
        body: 'דפוסים חושפים מתי אתם בבית, בחופשה או זמינים.',
        questions: {
          travel: 'האם אתם מפרסמים תכניות נסיעה או עדכונים בזמן אמת?',
          checkins: 'האם אתם מבצעים צ׳ק-אין קבוע לאותם מקומות?',
          availability: 'האם ניתן לנחש מתי אתם זמינים או מחוברים?'
        }
      },
      platforms: {
        title: 'בדיקות פלטפורמה',
        body: 'אילו פלטפורמות מציגות אתכם בצורה הרחבה ביותר?',
        questions: {
          facebook: 'האם פרופיל הפייסבוק שלכם ברובו ציבורי?',
          instagram: 'האם פוסטים באינסטגרם פתוחים לציבור?',
          linkedin: 'האם הפעילות בלינקדאין פתוחה לכולם?'
        }
      }
    },
    analyze: {
      title: 'סקירת סיכונים',
      subtitle: 'התשובות שלכם מזינות את הציונים. הכול נשאר במכשיר.',
      overall: 'חשיפה כוללת',
      detailTitle: 'מה גרם לדירוג הזה',
      exposureLevels: {
        low: 'החשיפה בשליטה, אך המשיכו לעקוב אחר שינויים.',
        medium: 'מספר אותות חשופים. הקדישו עדיפות לפעולות הצמצום.',
        high: 'לתוקפים יש כמה נקודות תקיפה. פעלו במהירות לסגירת הפערים.'
      },
      categories: {
        doxxing: 'דוקסינג',
        stalking: 'מעקב / איתור',
        socialEngineering: 'הנדסה חברתית',
        accountTakeover: 'השתלטות חשבון',
        harassment: 'הטרדה / מוניטין',
        fraud: 'הונאה / גניבת זהות',
        physical: 'ביטחון פיזי'
      },
      triggers: {
        identity: {
          fullName: 'השם המלא שלכם מחובר בקלות לתמונות או פרופילים.',
          email: 'האימייל המרכזי גלוי ומזמין דיוג או פריצות.',
          phone: 'מספר הטלפון חשוף ועלול להוביל להחלפת SIM או שיחות הונאה.'
        },
        location: {
          homePhoto: 'פוסטים מציגים את חזית הבית בבירור.',
          streetSigns: 'תמונות חושפות שלטי רחוב או מספרי בתים.',
          taggedHome: 'תיוגים או צ׳ק-אין חושפים את הבית או השכונה.'
        },
        work: {
          company: 'המעסיק הנוכחי שלכם גלוי לציבור.',
          role: 'פרטי תפקיד או תג מזהים אתכם בקלות.',
          coworkers: 'תיוג עמיתים חושף את הרשת המקצועית.'
        },
        social: {
          relationship: 'פרטי הקשר הזוגי עשויים לשמש ללחץ רגשי או הונאה.',
          children: 'זהויות או שגרות של ילדים גלויות לזרים.',
          routines: 'תדירות הפוסטים חושפת שגרות צפויות.'
        },
        media: {
          sensitive: 'מדיה רגישה או מביכה זמינה לציבור.',
          metadata: 'מדיה חושפת מטא-נתונים או רקעים מזהים.',
          oldPosts: 'פוסטים ישנים מחזירים הקשרים מסוכנים.'
        },
        habits: {
          travel: 'עדכוני נסיעה חיים מגלים מתי אתם לא בבית.',
          checkins: 'צ׳ק-אין חוזרים בונים מפה של הרגלים.',
          availability: 'סימני זמינות מראים מתי ניתן ליצור קשר.'
        },
        platforms: {
          facebook: 'תוכן הפייסבוק שלכם חשוף מעבר לחברים.',
          instagram: 'פוסטים או סטוריז באינסטגרם פתוחים לציבור.',
          linkedin: 'לינקדאין חושף היסטוריה מקצועית וקשרים מפורטים.'
        }
      }
    },
    reduce: {
      title: 'ספר הפחתת הסיכונים',
      subtitle: 'מותאם לסיכונים שהתגלו. עקבו אחרי מה שהשלמתם. נשמר מקומית.',
      filterLabel: 'מיקוד',
      emptyState: 'חדשות טובות — רמת הסיכון כאן נמוכה. חזרו לאחר הבדיקה הבאה.',
      suggestions: {
        hidePhone: {
          title: 'הסרת מספר טלפון מפרופילים ציבוריים',
          body: 'צמצמו היכן שהמספר מופיע כדי להפחית ניסיונות דיוג.',
          steps: {
            1: 'עברו על אזורי "יצירת קשר" בפלטפורמות והסירו את המספר.',
            2: 'ספקו מספר וירטואלי או קו עסקי כשחייבים טלפון.',
            3: 'עדכנו מודעות או קורות חיים שמציגים את המספר.'
          }
        },
        emailAlias: {
          title: 'השתמשו בכינוי אימייל לציבור',
          body: 'הפרידו בין פניות ציבוריות לבין החשבון היומיומי.',
          steps: {
            1: 'צרו כינוי או כתובת ייעודית לשימוש פומבי.',
            2: 'עדכנו ביוגרפיות ופרופילים עם הכינוי ושמרו על האימייל הראשי פרטי.'
          }
        },
        lockdownPhotos: {
          title: 'אבטחו תמונות רגישות',
          body: 'סננו או עדכנו הרשאות לפוסטים שחושפים משפחה או מיקום.',
          steps: {
            1: 'בדקו אלבומים והיילייטס לזיהוי פנים, מדים או רמזים.',
            2: 'הגבילו את הקהל לחברים אמינים או ארכבו פריטים בסיכון גבוה.',
            3: 'בקשו מחברים להסיר פוסטים שחושפים מרחב פרטי.'
          }
        },
        auditSocial: {
          title: 'בדיקת פרטיות לכל פלטפורמה',
          body: 'יישרו את הגדרות הפרטיות עם הסיפור שאתם רוצים לספר.',
          steps: {
            1: 'פייסבוק: הגדרות → פרטיות → הגבלת פוסטים קודמים וקהל ברירת מחדל.',
            2: 'אינסטגרם: הגדרות → פרטיות → מעבר לפרטי ובדיקת שליטה בסטורי.',
            3: 'לינקדאין: הגדרות → נראות → הגבלת פרופיל ועדכונים.'
          }
        },
        passwordManager: {
          title: 'מנהל סיסמאות + אימות דו-שלבי',
          body: 'מפחית שימוש חוזר בסיסמאות ומחזק הגנות.',
          steps: {
            1: 'בחרו מנהל סיסמאות מוכר והעבירו אליו את החשבונות.',
            2: 'הפעילו אימות דו-שלבי מבוסס אפליקציה בחשבונות חשובים.'
          }
        },
        childPrivacy: {
          title: 'הידקו פרטיות סביב ילדים',
          body: 'הגבילו פרטים על מיקום, מוסד ושגרה.',
          steps: {
            1: 'הסירו סמלי בית ספר, מדים או רקעים מזהים מהפוסטים.',
            2: 'הגבילו קהל לתוכן שמזכיר או מתייג ילדים.'
          }
        },
        travelDelay: {
          title: 'דחו פרסומי נסיעות עד החזרה',
          body: 'שתפו את החוויה בלי לסמן בית ריק.',
          steps: {
            1: 'כבו תיוג מיקום אוטומטי בזמן נסיעה.',
            2: 'פרסמו את הסיכום לאחר החזרה לשגרה.'
          }
        }
      },
      note: 'ההמלצות הן להכוונה בלבד. אתם מחליטים מה מתאים לחייכם.'
    },
    keepSafe: {
      title: 'שמירה מתמשכת',
      subtitle: 'הרגלים שומרים על השליטה לאורך זמן.',
      tiles: [
        { title: 'השתמשו במנהל סיסמאות', body: 'סיסמאות ייחודיות מצמצמות נזק מדליפות.' },
        { title: 'הפעילו אימות דו-שלבי', body: 'MFA חוסם נתיבי השתלטות נפוצים.' },
        { title: 'בדקו הגדרות פרטיות באופן קבוע', body: 'פלטפורמות משנות ברירות מחדל. אשרו מחדש כל רבעון.' },
        { title: 'זהירות עם פרטי ילדים', body: 'הגנו על הזהות והפרטיות שלהם.' },
        { title: 'הימנעו מפרסום תאריכי נסיעה בזמן אמת', body: 'שתפו לאחר החזרה הביתה.' }
      ],
      nextCheck: {
        label: 'בחרו תאריך לבדיקה הבאה',
        placeholder: 'בחרו תאריך',
        reminder: 'הבדיקה הבאה מתוכננת ל:'
      }
    },
    reports: {
      title: 'דוחות וייצוא',
      subtitle: 'צרו צילום מצב פרטי של החשיפה וההתקדמות.',
      summary: {
        overview: 'תמצית',
        exposures: 'חשיפות מרכזיות',
        mitigations: 'פעולות שבוצעו'
      },
      empty: 'מלאו את הבדיקה כדי לראות כאן סיכום מותאם.',
      markdownTitle: '# סיכום בדיקת פרטיות עצמית',
      markdownExposure: '## חשיפות מרכזיות',
      markdownMitigations: '## פעולות שבוצעו'
    },
    settings: {
      title: 'הגדרות ואמון',
      subtitle: 'התאימו את החוויה ושלטו בנתונים. הכול נשאר מקומי.',
      languageLabel: 'שפה',
      themeLabel: 'ערכת נושא',
      delete: {
        title: 'מחקו את כל הנתונים שלי',
        body: 'הסרה של תשובות, מעקב אחר פעולות ותזכורות מהמכשיר.',
        confirm: 'האם למחוק את כל הנתונים שנשמרו?'
      },
      privacy: {
        title: 'כיצד הכלי שומר על פרטיותכם',
        bullets: ['כל העיבוד בדפדפן שלכם.', 'אין חשבונות או טלמטריה.', 'הנתונים נשמרים בצורה מאובטחת בדפדפן.']
      },
      limitations: {
        title: 'מגבלות',
        bullets: ['לא ייעוץ משפטי.', 'אין הבטחה לביטחון מוחלט.', 'שמשו בזה כדרך חשיבה כמו תוקף.']
      }
    }
  }
};

export const getTranslationValue = (locale: Locale, key: string): string | TranslationTree | undefined => {
  const parts = key.split('.');
  let current: TranslationTree | string | undefined = translations[locale];
  for (const part of parts) {
    if (current === undefined || typeof current === 'string') break;
    current = current[part];
  }
  return current;
};

export const getTranslation = (locale: Locale, key: string): string => {
  const value = getTranslationValue(locale, key);
  if (typeof value === 'string') return value;
  return key;
};
