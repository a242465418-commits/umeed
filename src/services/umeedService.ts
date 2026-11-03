import {
  ContactSubmission,
  InquiryType,
  ServiceResult,
  VolunteerRole,
  VolunteerSubmission,
} from '../types/umeed';

/**
 * Frontend-only development service adapter.
 * No environment variables are required right now—all submissions work locally
 * in browser storage for development and preview testing.
 *
 * When a backend is added later (e.g., Express routes at /api/volunteers and /api/contact),
 * flip `BACKEND_ENABLED` to `true` to switch from local browser storage to real HTTP calls.
 */
const BACKEND_ENABLED = false;
const RELATIVE_API_PREFIX = '/api';

const STORAGE_KEYS = {
  VOLUNTEERS: 'umeed_local_volunteer_pledges_v1',
  INQUIRIES: 'umeed_local_contact_inquiries_v1',
};

function createRecordId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function readLocalList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalList<T>(key: string, items: T[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Graceful no-op if browser storage is restricted
  }
}

export async function getSubmittedVolunteerPledges(): Promise<VolunteerSubmission[]> {
  if (BACKEND_ENABLED) {
    try {
      const response = await fetch(`${RELATIVE_API_PREFIX}/volunteers`);
      if (response.ok) {
        return (await response.json()) as VolunteerSubmission[];
      }
    } catch {
      // Fallback to local development list if backend is unreachable
    }
  }
  return readLocalList<VolunteerSubmission>(STORAGE_KEYS.VOLUNTEERS);
}

export async function submitVolunteerPledge(payload: {
  fullName: string;
  email: string;
  location: string;
  role: VolunteerRole;
  availability: string;
  motivation: string;
}): Promise<ServiceResult<VolunteerSubmission>> {
  const trimmedName = payload.fullName.trim();
  const trimmedEmail = payload.email.trim();
  const trimmedLocation = payload.location.trim();

  if (trimmedName.length < 2) {
    return { ok: false, error: 'Please enter your full name.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (trimmedLocation.length < 2) {
    return { ok: false, error: 'Please enter your city or region.' };
  }

  if (BACKEND_ENABLED) {
    try {
      const response = await fetch(`${RELATIVE_API_PREFIX}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        return { ok: false, error: 'Unable to submit volunteer form right now.' };
      }
      const data = (await response.json()) as VolunteerSubmission;
      return { ok: true, data };
    } catch {
      return { ok: false, error: 'Network error while reaching server.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 120));

  const submission: VolunteerSubmission = {
    id: createRecordId('vol'),
    fullName: trimmedName,
    email: trimmedEmail,
    location: trimmedLocation,
    role: payload.role,
    availability: payload.availability.trim() || 'Flexible',
    motivation: payload.motivation.trim(),
    submittedAt: new Date().toISOString(),
  };

  const existing = readLocalList<VolunteerSubmission>(STORAGE_KEYS.VOLUNTEERS);
  writeLocalList(STORAGE_KEYS.VOLUNTEERS, [submission, ...existing]);

  return { ok: true, data: submission };
}

export async function removeVolunteerPledge(id: string): Promise<VolunteerSubmission[]> {
  if (BACKEND_ENABLED) {
    try {
      await fetch(`${RELATIVE_API_PREFIX}/volunteers/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {
      // Fallback to local removal
    }
  }
  const existing = readLocalList<VolunteerSubmission>(STORAGE_KEYS.VOLUNTEERS);
  const updated = existing.filter((item) => item.id !== id);
  writeLocalList(STORAGE_KEYS.VOLUNTEERS, updated);
  return updated;
}

export async function getSubmittedInquiries(): Promise<ContactSubmission[]> {
  if (BACKEND_ENABLED) {
    try {
      const response = await fetch(`${RELATIVE_API_PREFIX}/contact`);
      if (response.ok) {
        return (await response.json()) as ContactSubmission[];
      }
    } catch {
      // Fallback to local development list if backend is unreachable
    }
  }
  return readLocalList<ContactSubmission>(STORAGE_KEYS.INQUIRIES);
}

export async function submitContactInquiry(payload: {
  fullName: string;
  email: string;
  inquiryType: InquiryType;
  message: string;
}): Promise<ServiceResult<ContactSubmission>> {
  const trimmedName = payload.fullName.trim();
  const trimmedEmail = payload.email.trim();
  const trimmedMessage = payload.message.trim();

  if (trimmedName.length < 2) {
    return { ok: false, error: 'Please enter your name.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { ok: false, error: 'Please provide a valid email address so we can reply.' };
  }
  if (trimmedMessage.length < 10) {
    return { ok: false, error: 'Please enter a message of at least 10 characters.' };
  }

  if (BACKEND_ENABLED) {
    try {
      const response = await fetch(`${RELATIVE_API_PREFIX}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        return { ok: false, error: 'Unable to send message right now.' };
      }
      const data = (await response.json()) as ContactSubmission;
      return { ok: true, data };
    } catch {
      return { ok: false, error: 'Network error while reaching server.' };
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 120));

  const inquiry: ContactSubmission = {
    id: createRecordId('msg'),
    fullName: trimmedName,
    email: trimmedEmail,
    inquiryType: payload.inquiryType,
    message: trimmedMessage,
    submittedAt: new Date().toISOString(),
  };

  const existing = readLocalList<ContactSubmission>(STORAGE_KEYS.INQUIRIES);
  writeLocalList(STORAGE_KEYS.INQUIRIES, [inquiry, ...existing]);

  return { ok: true, data: inquiry };
}
