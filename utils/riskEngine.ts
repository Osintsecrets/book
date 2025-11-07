
import { AuditAnswers, RiskCategory, RiskAnalysis, RiskLevel, Mitigation, RiskFinding } from '../config';

const getLevel = (score: number): RiskLevel => {
  if (score >= 90) return 'Critical';
  if (score >= 60) return 'High';
  if (score >= 30) return 'Medium';
  return 'Low';
};

const MITIGATIONS: Mitigation[] = [
    { id: 'm1', title: 'Set social media profiles to private', description: 'Limit who can see your posts, photos, and personal information.', category: 'High Impact', triggers: ['facebookProfilePublic', 'instagramProfilePublic', 'tiktokProfilePublic', 'xProfilePublic'] },
    { id: 'm2', title: 'Remove your phone number from public profiles', description: 'Prevents SIM swapping attacks and unwanted calls.', category: 'High Impact', triggers: ['phonePublic'] },
    { id: 'm3', title: 'Use an alias or nickname online', description: 'Disconnect your online persona from your real-world identity.', category: 'Quick Wins', triggers: ['fullNamePublic'] },
    { id: 'm4', title: 'Scrub your home address from data brokers', description: 'Reduces the risk of physical mail spam, harassment, or stalking.', category: 'Advanced', triggers: ['homeAddressPublic'] },
    { id: 'm5', title: 'Disable geotagging on your phone camera', description: 'Stops embedding precise location data into your photos.', category: 'Quick Wins', triggers: ['geotaggedPhotosPublic'] },
    { id: 'm6', title: 'Review and untag yourself from photos', description: 'Take control of photos others post of you, especially at sensitive locations.', category: 'High Impact', triggers: ['familyMembersTagged', 'frequentLocationsPublic'] },
    { id: 'm7', title: 'Make your friends list private', description: 'Prevents attackers from mapping your social network for phishing.', category: 'Quick Wins', triggers: ['publicFriendList'] },
    { id: 'm8', title: 'Avoid posting about future travel plans', description: 'Don\'t advertise when your home will be empty.', category: 'High Impact', triggers: ['vacationPlansPublic'] },
    { id: 'm9', title: 'Limit sharing photos of children', description: 'Protect minors\' privacy and prevent their images from being misused.', category: 'High Impact', triggers: ['photosOfChildrenPublic'] },
    { id: 'm10', title: 'Remove your full date of birth from profiles', description: 'Your DOB is a key piece of information for identity theft.', category: 'High Impact', triggers: ['dobPublic'] },
];


export const analyzeRisks = (answers: AuditAnswers): RiskAnalysis => {
    const categoryRisks: Record<RiskCategory, { level: RiskLevel; findings: RiskFinding[] }> = {
        [RiskCategory.Doxxing]: { level: 'Low', findings: [] },
        [RiskCategory.Stalking]: { level: 'Low', findings: [] },
        [RiskCategory.SocialEngineering]: { level: 'Low', findings: [] },
        [RiskCategory.AccountTakeover]: { level: 'Low', findings: [] },
        [RiskCategory.Reputation]: { level: 'Low', findings: [] },
        [RiskCategory.Fraud]: { level: 'Low', findings: [] },
        [RiskCategory.PhysicalSecurity]: { level: 'Low', findings: [] },
    };
    let totalScore = 0;

    const addFinding = (category: RiskCategory, reason: string, level: RiskLevel, score: number) => {
        categoryRisks[category].findings.push({ reason, level });
        totalScore += score;
    };
    
    // Doxxing Risks
    if (answers.fullNamePublic) addFinding(RiskCategory.Doxxing, "Full name is public, making you easier to identify.", 'Medium', 10);
    if (answers.emailPublic) addFinding(RiskCategory.Doxxing, "Public email can lead to spam and phishing.", 'Medium', 10);
    if (answers.phonePublic) addFinding(RiskCategory.Doxxing, "Public phone number is a major risk for harassment and SIM swapping.", 'Critical', 30);
    if (answers.homeAddressPublic) addFinding(RiskCategory.Doxxing, "Public home address is a critical doxxing and physical security risk.", 'Critical', 40);

    // Physical Security & Stalking
    if (answers.homeAddressPublic) addFinding(RiskCategory.PhysicalSecurity, "Public home address creates a direct physical threat.", 'Critical', 40);
    if (answers.frequentLocationsPublic) addFinding(RiskCategory.Stalking, "Sharing frequent locations reveals your routine and makes you predictable.", 'High', 25);
    if (answers.photosOfHomeExteriorPublic) addFinding(RiskCategory.PhysicalSecurity, "Photos of your home exterior can help attackers identify it.", 'High', 20);
    if (answers.vacationPlansPublic) addFinding(RiskCategory.PhysicalSecurity, "Publicizing vacation plans signals that your home is empty.", 'High', 25);

    // Social Engineering & Fraud
    if (answers.dobPublic) addFinding(RiskCategory.Fraud, "Full date of birth is a key component for identity theft.", 'High', 25);
    if (answers.employerPublic || answers.jobTitlePublic) addFinding(RiskCategory.SocialEngineering, "Work details can be used for spear-phishing attacks.", 'Medium', 15);
    if (answers.schoolPublic) addFinding(RiskCategory.SocialEngineering, "Education history provides answers to common security questions.", 'Medium', 10);
    if (answers.familyMembersTagged) addFinding(RiskCategory.SocialEngineering, "Tagged family members reveal your social circle for manipulation.", 'High', 20);
    if (answers.publicFriendList) addFinding(RiskCategory.SocialEngineering, "A public friend list allows attackers to impersonate someone you know.", 'Medium', 15);

    // Account Takeover
    if (answers.emailPublic && answers.dobPublic) addFinding(RiskCategory.AccountTakeover, "Public email and DOB are often used in account recovery processes.", 'High', 25);
    if (answers.phonePublic) addFinding(RiskCategory.AccountTakeover, "Phone number is often used for 2FA and can be vulnerable to SIM swapping.", 'Critical', 30);

    // Reputation
    if (answers.compromisingPhotosPublic) addFinding(RiskCategory.Reputation, "Compromising photos can be used for blackmail or harm your reputation.", 'High', 25);
    if (answers.politicalViewsPublic) addFinding(RiskCategory.Reputation, "Strong public political views can attract targeted harassment.", 'Medium', 15);


    // Calculate final levels for each category
    Object.keys(categoryRisks).forEach(cat => {
        const categoryKey = cat as RiskCategory;
        const findings = categoryRisks[categoryKey].findings;
        if (findings.length > 0) {
            if (findings.some(f => f.level === 'Critical')) categoryRisks[categoryKey].level = 'Critical';
            else if (findings.some(f => f.level === 'High')) categoryRisks[categoryKey].level = 'High';
            else if (findings.some(f => f.level === 'Medium')) categoryRisks[categoryKey].level = 'Medium';
            else categoryRisks[categoryKey].level = 'Low';
        }
    });

    return {
        overallLevel: getLevel(totalScore),
        categoryRisks,
    };
};

export const getMitigations = (answers: AuditAnswers): Mitigation[] => {
    const triggeredMitigations = new Set<Mitigation>();
    const answerKeys = Object.keys(answers).filter(key => answers[key] === true);

    MITIGATIONS.forEach(mitigation => {
        if (mitigation.triggers.some(trigger => answerKeys.includes(trigger))) {
            triggeredMitigations.add(mitigation);
        }
    });

    return Array.from(triggeredMitigations);
};
   