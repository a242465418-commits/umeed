export enum CauseCategory {
  ALL = 'all',
  DAILY_DIGNITY = 'daily_dignity',
  HEALTH_LEARNING = 'health_learning',
  CRISIS_RESILIENCE = 'crisis_resilience',
}

export enum VolunteerRole {
  EDUCATION = 'Education & Learning Support',
  FOOD_LOGISTICS = 'Food & Essential Distribution',
  HEALTHCARE = 'Healthcare & Wellness Awareness',
  COMMUNITY_OUTREACH = 'Community Listening & Field Coordination',
  DOCUMENTATION = 'Operations, Transparency & Documentation',
}

export enum InquiryType {
  VOLUNTEER = 'Volunteering & Founding Team',
  COMMUNITY_NEED = 'Share a Local Community Need',
  TRANSPARENCY = 'Transparency & Governance Question',
  GENERAL = 'General Message',
}

export interface CauseItem {
  id: string;
  index: string;
  title: string;
  category: Exclude<CauseCategory, CauseCategory.ALL>;
  categoryLabel: string;
  summary: string;
  plannedApproach: string;
  futureActions: string[];
  volunteerPreparation: string;
  currentStatusNote: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
}

export interface ReadinessMilestone {
  id: string;
  stepNumber: string;
  title: string;
  statusLabel: string;
  description: string;
  checklist: string[];
}

export interface JourneyItem {
  id: string;
  figureCode: string;
  type: 'note' | 'visual';
  phaseLabel: string;
  title: string;
  summary: string;
  honestContext: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface LedgerEntry {
  id: string;
  metric: string;
  value: string;
  statusNote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  location: string;
  role: VolunteerRole;
  availability: string;
  motivation: string;
  submittedAt: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
  submittedAt: string;
}

export interface ServiceResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface SupportQrConfig {
  isPaymentAuthorized: boolean;
  qrImageSrc: string | null;
  placeholderLabel: string;
  collaborationNotice: string;
  statusMessage: string;
  trustMessage: string;
}



