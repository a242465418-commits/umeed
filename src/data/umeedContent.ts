import heroSaplingImg from '../assets/images/hero_dawn_sapling_1793707364718.jpg';
import planningDeskImg from '../assets/images/journey_planning_desk_1793707366019.jpg';
import educationBooksImg from '../assets/images/cause_education_books_1793707368045.jpg';
import nourishmentGrainImg from '../assets/images/cause_nourishment_grain_1793707368437.jpg';
import healthcareWellnessImg from '../assets/images/cause_healthcare_wellness_1793710702223.jpg';
import essentialSuppliesImg from '../assets/images/cause_essential_supplies_1793710704901.jpg';
import disasterReliefImg from '../assets/images/cause_disaster_relief_1793710706382.jpg';
import communitySupportImg from '../assets/images/cause_community_support_1793710706498.jpg';
import {
  CauseCategory,
  CauseItem,
  FaqItem,
  JourneyItem,
  LedgerEntry,
  ReadinessMilestone,
  SupportQrConfig,
  VolunteerRole,
} from '../types/umeed';

export const BRAND_IMAGES = {
  heroSapling: heroSaplingImg,
  planningDesk: planningDeskImg,
  educationBooks: educationBooksImg,
  nourishmentGrain: nourishmentGrainImg,
  healthcareWellness: healthcareWellnessImg,
  essentialSupplies: essentialSuppliesImg,
  disasterRelief: disasterReliefImg,
  communitySupport: communitySupportImg,
};

/**
 * Support UMEED Official NGO QR Configuration:
 * - No personal QR code, payment link, or UPI ID is stored or referenced.
 * - `qrImageSrc` remains `null` and `isPaymentAuthorized` remains `false` until
 *   an official collaboration with a verified charitable organization is finalized.
 */
export const SUPPORT_QR_CONFIG: SupportQrConfig = {
  isPaymentAuthorized: false,
  qrImageSrc: null,
  placeholderLabel: 'Official NGO Donation QR Coming Soon',
  collaborationNotice:
    'UMEED is working toward an official collaboration with a verified charitable organization. Donation collection is not active yet.',
  statusMessage: 'Donation collection is not active yet.',
  trustMessage: 'Your trust matters. Every future contribution will be transparently documented.',
};


export const FOUNDING_PILLARS = [
  {
    index: '01',
    title: 'Truth Before Claims',
    description:
      'We begin with a blank ledger. We will never exaggerate numbers, stage photographs, or claim impact we have not yet earned.',
  },
  {
    index: '02',
    title: 'Dignity Without Spectacle',
    description:
      'Humanitarian service is an act of solidarity, not charity theater. Every future initiative will protect the privacy and self-respect of the people we serve.',
  },
  {
    index: '03',
    title: 'Listening Before Acting',
    description:
      'Before launching our first project, we are building a local volunteer circle to understand real neighborhood needs directly from families on the ground.',
  },
  {
    index: '04',
    title: 'Open-Book Stewardship',
    description:
      'Donation collection is not active yet. We will only open public contributions once proper legal, banking, and accounting safeguards are established.',
  },
];

export const CAUSES_DATA: CauseItem[] = [
  {
    id: 'education',
    index: '01',
    title: 'Education',
    category: CauseCategory.HEALTH_LEARNING,
    categoryLabel: 'Learning & Opportunity',
    summary:
      'Supporting foundational literacy, school supply kits, and after-school mentorship so children are never held back by the cost of notebooks or guidance.',
    plannedApproach:
      'When UMEED begins fieldwork, our education effort will start small and local—providing essential stationery, reading books, and volunteer-led tutoring circles in underserved neighborhoods.',
    futureActions: [
      'Distribute basic learning kits (notebooks, pencils, geometry sets, and school bags)',
      'Organize weekend volunteer reading and homework support circles',
      'Assist families in navigating local public school enrollment',
    ],
    volunteerPreparation:
      'Educators, college students, and patient mentors are needed to help shape simple, age-appropriate learning plans.',
    currentStatusNote: 'Planned Focus Area · 0 drives conducted yet',
    imageUrl: educationBooksImg,
    imageAlt: 'Sunlit wooden school desk with neatly stacked blank cream notebooks and wooden pencils',
    imageCaption: 'Conceptual Study — Foundational learning materials we aim to provide once active.',
  },
  {
    id: 'food',
    index: '02',
    title: 'Food & Nutrition',
    category: CauseCategory.DAILY_DIGNITY,
    categoryLabel: 'Daily Dignity',
    summary:
      'Addressing immediate hunger with wholesome dry rations, balanced staples, and freshly prepared community meals where families face food insecurity.',
    plannedApproach:
      'Rather than sporadic handouts, we plan to organize structured dry-grain and pulse kits alongside clean, respectful meal drives planned with local volunteers.',
    futureActions: [
      'Assemble balanced dry-ration kits with staple grains, lentils, and cooking essentials',
      'Coordinate zero-waste seasonal meal distribution with strict hygiene standards',
      'Document every ration kit procured and distributed in an open public log',
    ],
    volunteerPreparation:
      'Volunteers who can help plan safe food sourcing, quality checks, and respectful neighborhood distribution.',
    currentStatusNote: 'Planned Focus Area · 0 meals distributed yet',
    imageUrl: nourishmentGrainImg,
    imageAlt: 'Handwoven baskets holding raw wheat grain, pulses, and fresh leafy greens on linen cloth',
    imageCaption: 'Conceptual Study — Wholesome staple nourishment representing our future food & nutrition focus.',
  },
  {
    id: 'healthcare',
    index: '03',
    title: 'Healthcare',
    category: CauseCategory.HEALTH_LEARNING,
    categoryLabel: 'Health & Preventive Care',
    summary:
      'Bridging gaps in basic health awareness, hygiene access, first-aid readiness, and connecting vulnerable households to existing public medical care.',
    plannedApproach:
      'Healthcare access often fails at the first step—information and preventive essentials. UMEED aims to organize awareness sessions and basic hygiene support alongside qualified medical volunteers.',
    futureActions: [
      'Provide menstrual hygiene, sanitation, and clean-water awareness kits',
      'Host volunteer-guided preventive health checkup referrals with licensed practitioners',
      'Help elderly or isolated residents navigate public clinic appointments',
    ],
    volunteerPreparation:
      'Healthcare professionals, nursing students, and public health communicators are invited to guide our safety protocols.',
    currentStatusNote: 'Planned Focus Area · 0 camps held yet',
    imageUrl: healthcareWellnessImg,
    imageAlt: 'Clean medical stethoscope, wrapped sterile cotton bandages, clear water carafe, and fresh green botanicals on white linen',
    imageCaption: 'Conceptual Study — Preventive health awareness and hygiene readiness we aim to support.',
  },
  {
    id: 'essential-supplies',
    index: '04',
    title: 'Essential Supplies',
    category: CauseCategory.DAILY_DIGNITY,
    categoryLabel: 'Daily Dignity',
    summary:
      'Delivering seasonal protection—warm winter blankets, clean clothing, footwear, and household necessities—for people enduring harsh living conditions.',
    plannedApproach:
      'Seasonal extremes hit outdoor workers and unhoused families hardest. We plan to run focused, transparent material drives for clean, durable everyday essentials.',
    futureActions: [
      'Organize winter warmth drives for heavy blankets and weather-appropriate clothing',
      'Assemble clean utility kits including soap, towels, mosquito protection, and footwear',
      'Verify item condition so every contributed item is clean, practical, and dignified',
    ],
    volunteerPreparation:
      'Coordinators for sorting, quality inspection, inventory logging, and neighborhood outreach.',
    currentStatusNote: 'Planned Focus Area · 0 kits distributed yet',
    imageUrl: essentialSuppliesImg,
    imageAlt: 'Neatly folded warm woven blankets, clean cotton clothing, and household essentials in a reed basket on an oak bench',
    imageCaption: 'Conceptual Study — Warm seasonal blankets and clean everyday essentials planned for future drives.',
  },
  {
    id: 'disaster-relief',
    index: '05',
    title: 'Disaster Relief',
    category: CauseCategory.CRISIS_RESILIENCE,
    categoryLabel: 'Crisis Response',
    summary:
      'Preparing rapid-response volunteer protocols to assist communities affected by floods, heatwaves, or sudden local emergencies.',
    plannedApproach:
      'Effective emergency response requires preparation before a crisis strikes. We intend to train a calm, coordinated volunteer network ready to supply drinking water, tarpaulins, and emergency rations when needed.',
    futureActions: [
      'Build a standby directory of trained local volunteers for urgent mobilization',
      'Pre-define emergency kit checklists (safe drinking water, dry food, basic first aid, shelter sheets)',
      'Coordinate strictly within local civic safety guidelines during weather emergencies',
    ],
    volunteerPreparation:
      'Logistics planners, calm field coordinators, and communication leads to draft readiness playbooks.',
    currentStatusNote: 'Planned Focus Area · Readiness planning stage',
    imageUrl: disasterReliefImg,
    imageAlt: 'Emergency preparedness supplies including sealed drinking water jugs, weatherproof shelter canvas, lantern, and first-aid kit on a wooden table',
    imageCaption: 'Conceptual Study — Calm emergency readiness kits for weather and local crisis support.',
  },
  {
    id: 'community-support',
    index: '06',
    title: 'Community Support',
    category: CauseCategory.CRISIS_RESILIENCE,
    categoryLabel: 'Shared Resilience',
    summary:
      'Standing beside senior citizens, daily-wage families, and neighbors in distress through practical assistance, listening circles, and shared civic care.',
    plannedApproach:
      'Not every hardship requires a large budget—many require time, empathy, and reliable neighbors. Community Support is where UMEED can begin through pure volunteer service.',
    futureActions: [
      'Conduct neighborhood listening visits to identify overlooked household hardships',
      'Assist senior citizens and differently-abled residents with essential errands or paperwork guidance',
      'Foster local volunteer circles rooted in mutual respect and civic responsibility',
    ],
    volunteerPreparation:
      'Compassionate listeners, local coordinators, and translators fluent in regional languages.',
    currentStatusNote: 'Planned Focus Area · Volunteer onboarding open',
    imageUrl: communitySupportImg,
    imageAlt: 'Sunlit courtyard beneath a deep-green banyan tree with a circle of wooden chairs ready for neighborhood listening',
    imageCaption: 'Conceptual Study — Community listening circles where neighborhood solidarity begins.',
  },
];

export const FIRST_GOAL_MILESTONES: ReadinessMilestone[] = [
  {
    id: 'phase-1',
    stepNumber: '01',
    title: 'Founding Charter & Honest Launch',
    statusLabel: 'In Progress · Current Stage',
    description:
      'Establishing UMEED publicly with complete transparency: stating clearly who we are, what we hope to build, and the honest fact that we are starting at zero.',
    checklist: [
      'Publish the UMEED mission statement and six core humanitarian focus areas',
      'Commit publicly to zero fabricated metrics, zero staged imagery, and open records',
      'Open volunteer expressions of interest to gather our founding circle',
    ],
  },
  {
    id: 'phase-2',
    stepNumber: '02',
    title: 'Founding Volunteer Circle Formation',
    statusLabel: 'Yet to Begin',
    description:
      'Bringing together our first dedicated group of volunteers who can contribute time, local knowledge, and practical skills before any money is ever requested.',
    checklist: [
      'Onboard initial volunteers across education, food logistics, and community outreach',
      'Hold our first founding coordination meeting and adopt volunteer code of conduct',
      'Assign clear documentation and accountability roles',
    ],
  },
  {
    id: 'phase-3',
    stepNumber: '03',
    title: 'Ground Listening & Scope Selection',
    statusLabel: 'Yet to Begin',
    description:
      'Selecting a modest, achievable, self-contained first volunteer initiative based on real local need rather than assumptions.',
    checklist: [
      'Visit and listen to local community members to understand immediate priorities',
      'Define the exact scope, item list, and safety plan for Project 01',
      'Publish the full Project 01 plan openly on this website prior to execution',
    ],
  },
  {
    id: 'phase-4',
    stepNumber: '04',
    title: 'First Field Project Execution',
    statusLabel: 'Yet to Begin',
    description:
      'Carrying out UMEED’s very first real-world community support effort and publishing a complete, verifiable post-project report.',
    checklist: [
      'Execute our inaugural volunteer-led community initiative with care and dignity',
      'Record exact quantities, volunteer hours, and lessons learned',
      'Publish our first real field update in the Journey & Transparency sections',
    ],
  },
];

export const VOLUNTEER_ROLE_DETAILS: Record<
  VolunteerRole,
  { commitment: string; focus: string }
> = {
  [VolunteerRole.EDUCATION]: {
    commitment: '2–4 hours / week (once active)',
    focus: 'Curriculum planning, weekend reading circles, and assembling student stationery kits.',
  },
  [VolunteerRole.FOOD_LOGISTICS]: {
    commitment: 'Flexible weekend drives (once active)',
    focus: 'Sourcing checks, packing dry-ration kits, and respectful local distribution.',
  },
  [VolunteerRole.HEALTHCARE]: {
    commitment: 'Advisory or camp-based (once active)',
    focus: 'Guiding hygiene awareness, basic preventive education, and safe medical referral standards.',
  },
  [VolunteerRole.COMMUNITY_OUTREACH]: {
    commitment: '3–5 hours / month (starting soon)',
    focus: 'Listening to neighborhood families, identifying genuine needs, and building local trust.',
  },
  [VolunteerRole.DOCUMENTATION]: {
    commitment: 'Remote & flexible (starting now)',
    focus: 'Maintaining open-book records, checklists, and honest public updates as UMEED grows.',
  },
};

export const JOURNEY_ENTRIES: JourneyItem[] = [
  {
    id: 'entry-01',
    figureCode: 'Entry 01 · Founding Note',
    type: 'note',
    phaseLabel: 'Day Zero · Beginning',
    title: 'Why We Chose to Begin in Complete Daylight',
    summary:
      'UMEED begins today as an idea backed by conviction. We have not helped anyone yet, and we have not collected a single rupee or dollar. Starting honestly is our very first promise.',
    honestContext: 'Status: Founding charter published. No field projects executed yet.',
    imageUrl: heroSaplingImg,
    imageAlt: 'Young green sapling growing in sunlit forest soil at dawn',
  },
  {
    id: 'entry-02',
    figureCode: 'Entry 02 · Planning Desk',
    type: 'visual',
    phaseLabel: 'Preparation · Groundwork',
    title: 'Blank Pages & Open Ledgers',
    summary:
      'Before stepping into any neighborhood, we are drafting volunteer safety guidelines, ethical photography rules, and open-ledger templates so accountability is built in from day one.',
    honestContext: 'Visual Note: Symbolic studio photograph representing our current planning stage.',
    imageUrl: planningDeskImg,
    imageAlt: 'Open blank cream notebook with brass pen and compass on an oak desk',
  },
  {
    id: 'entry-03',
    figureCode: 'Entry 03 · Future Focus',
    type: 'visual',
    phaseLabel: 'Vision · Education',
    title: 'Preparing for Every Child’s Right to Learn',
    summary:
      'One of our earliest aspirations is supporting children with simple learning materials and volunteer mentorship. We are currently inviting educators to help design this first blueprint.',
    honestContext: 'Visual Note: Conceptual study of learning supplies; no distribution drive has occurred yet.',
    imageUrl: educationBooksImg,
    imageAlt: 'Quiet wooden school desk with blank notebooks and pencils in morning sunlight',
  },
  {
    id: 'entry-04',
    figureCode: 'Entry 04 · Future Focus',
    type: 'visual',
    phaseLabel: 'Vision · Nourishment',
    title: 'Designing Dignified Ration & Essential Support',
    summary:
      'When UMEED launches field operations, food and essential supplies will focus on wholesome staples delivered with respect, privacy, and clear accounting.',
    honestContext: 'Visual Note: Conceptual still life of staple grains; food collection and distribution have not started.',
    imageUrl: nourishmentGrainImg,
    imageAlt: 'Woven baskets of golden grain, lentils, and greens on unbleached linen',
  },
];

export const TRANSPARENCY_LEDGER: LedgerEntry[] = [
  {
    id: 'donations-collected',
    metric: 'Total Donations Collected',
    value: '0',
    statusNote: 'Donation collection is not active yet. No payment gateway or UPI is enabled.',
  },
  {
    id: 'funds-disbursed',
    metric: 'Total Funds Disbursed',
    value: '0',
    statusNote: 'Zero expenditure recorded; public fundraising has not commenced.',
  },
  {
    id: 'projects-completed',
    metric: 'Completed Humanitarian Projects',
    value: '0',
    statusNote: 'We are just getting started. Our first project is yet to begin.',
  },
  {
    id: 'beneficiaries-reached',
    metric: 'Beneficiaries Assisted to Date',
    value: '0',
    statusNote: 'We will only count verified, real-world assistance after fieldwork begins.',
  },
  {
    id: 'ngo-partnerships',
    metric: 'External NGO / Corporate Partnerships',
    value: '0',
    statusNote: 'Independent founding initiative; no external partnerships claimed.',
  },
  {
    id: 'registration-status',
    metric: 'Formal NGO Registration Status',
    value: 'Pre-Registration',
    statusNote: 'Currently an early-stage founding initiative; no registration number exists yet.',
  },
];

export const HONEST_FAQS: FaqItem[] = [
  {
    id: 'faq-donate',
    question: 'Can I donate money to UMEED right now?',
    answer:
      'No. Donation collection is not active yet. We do not accept online payments, bank transfers, cash, or UPI transfers at this stage. Please do not send funds to anyone claiming to collect donations on behalf of UMEED until official registration, banking, and public audit safeguards are formally announced here.',
  },
  {
    id: 'faq-completed',
    question: 'Has UMEED completed any projects or helped beneficiaries yet?',
    answer:
      'No. We are just getting started. Our first project is yet to begin, and we have assisted zero beneficiaries so far. We believe trust is built by telling the truth from day one rather than inflating early claims.',
  },
  {
    id: 'faq-registration',
    question: 'Is UMEED a registered non-profit or partnered with other NGOs?',
    answer:
      'Not yet. UMEED is currently in its foundational planning phase and does not hold formal NGO registration, tax-exemption certificates, or institutional partnerships at this time. That is also why public donation collection remains strictly inactive.',
  },
  {
    id: 'faq-help-now',
    question: 'How can I make a difference with UMEED today without donating?',
    answer:
      'Right now, people matter more than money. You can join our Founding Volunteer list, share your skills in teaching, logistics, healthcare awareness, or documentation, or write to us about genuine community needs in your area.',
  },
];
