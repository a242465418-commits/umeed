import React, { useEffect, useState } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { VOLUNTEER_ROLE_DETAILS } from '../data/umeedContent';
import {
  getSubmittedVolunteerPledges,
  removeVolunteerPledge,
  submitVolunteerPledge,
} from '../services/umeedService';
import { VolunteerRole, VolunteerSubmission } from '../types/umeed';

interface VolunteerSectionProps {
  preselectedRole: VolunteerRole | null;
}

const ALL_ROLES = Object.values(VolunteerRole);

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ preselectedRole }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState<VolunteerRole>(VolunteerRole.COMMUNITY_OUTREACH);
  const [availability, setAvailability] = useState('Weekends (2–4 hours)');
  const [motivation, setMotivation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState<VolunteerSubmission | null>(null);
  const [savedPledges, setSavedPledges] = useState<VolunteerSubmission[]>([]);

  useEffect(() => {
    getSubmittedVolunteerPledges().then(setSavedPledges);
  }, []);

  useEffect(() => {
    if (preselectedRole) {
      setRole(preselectedRole);
    }
  }, [preselectedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const result = await submitVolunteerPledge({
      fullName,
      email,
      location,
      role,
      availability,
      motivation,
    });

    setIsSubmitting(false);

    if (!result.ok || !result.data) {
      setErrorMsg(result.error || 'Please check the required fields.');
      return;
    }

    setJustSubmitted(result.data);
    const updatedList = await getSubmittedVolunteerPledges();
    setSavedPledges(updatedList);
    setFullName('');
    setEmail('');
    setLocation('');
    setMotivation('');
  };

  const handleDeletePledge = async (id: string) => {
    const updated = await removeVolunteerPledge(id);
    setSavedPledges(updated);
    if (justSubmitted?.id === id) {
      setJustSubmitted(null);
    }
  };

  const activeRoleMeta = VOLUNTEER_ROLE_DETAILS[role];

  return (
    <section id="volunteer" className="bg-[#FBF9F5] py-20 lg:py-28 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Why Volunteer First */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
              <span>05. Volunteer With UMEED</span>
              <span aria-hidden="true">·</span>
              <span>Founding Circle Open</span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
              Right now, we do not ask for money. We ask for thoughtful hands and minds.
            </h2>

            <p className="mt-4 text-base text-[#44403C] leading-relaxed">
              Because donation collection is not active yet, UMEED grows purely through people willing
              to help plan, listen, teach, and organize ethically from day one. Join our founding
              volunteer roster to help shape our very first community initiative.
            </p>

            {/* Interactive Role Explorer */}
            <div className="mt-8 bg-white border border-[#E7E0D2] rounded-lg p-6">
              <p className="text-xs font-semibold text-[#1C1917]">
                Select a focus area to preview volunteer expectations
              </p>
              <div className="mt-3 flex flex-col gap-1.5">
                {ALL_ROLES.map((r) => {
                  const selected = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`text-left px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors duration-150 cursor-pointer ${
                        selected
                          ? 'bg-[#113826] text-[#FBF9F5]'
                          : 'bg-[#FBF9F5] text-[#44403C] hover:bg-[#EFEAE0]'
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-[#F1EDE4] space-y-1.5">
                <p className="text-xs text-[#57534E]">
                  <strong className="font-semibold text-[#1C1917]">Expected Cadence:</strong>{' '}
                  {activeRoleMeta.commitment}
                </p>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  <strong className="font-semibold text-[#1C1917]">Planned Contribution:</strong>{' '}
                  {activeRoleMeta.focus}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Volunteer Form + Submitted Pledge Receipt */}
          <div className="lg:col-span-7 bg-white border border-[#E7E0D2] rounded-lg p-7 lg:p-10">
            <h3 className="font-serif text-2xl font-semibold text-[#113826]">
              Founding Volunteer Expression of Interest
            </h3>
            <p className="mt-1.5 text-sm text-[#57534E]">
              Register your interest below. No financial contribution is requested or accepted.
            </p>

            {justSubmitted && (
              <div
                role="status"
                className="mt-6 p-5 bg-[#F5F9F6] border border-[#14532D]/30 rounded-md"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#113826]">
                      Thank you, {justSubmitted.fullName}. Your volunteer interest has been recorded.
                    </p>
                    <p className="mt-1 text-xs text-[#44403C] leading-relaxed">
                      Role selected: <strong>{justSubmitted.role}</strong> ({justSubmitted.location}).
                      Your submission is saved locally in your browser session and structured for our
                      founding coordinator outreach.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="mt-6 p-4 bg-[#FEF2F2] border border-[#DC2626]/30 rounded-md text-xs font-medium text-[#991B1B]"
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="vol-name"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="vol-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Amina Khan"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vol-email"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="vol-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="vol-location"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    City / Region *
                  </label>
                  <input
                    id="vol-location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., New Delhi / Mumbai / Remote"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vol-availability"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Preferred Availability
                  </label>
                  <select
                    id="vol-availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:border-[#113826]"
                  >
                    <option value="Weekends (2–4 hours)">Weekends (2–4 hours)</option>
                    <option value="Weekday Evenings">Weekday Evenings</option>
                    <option value="Remote Planning & Documentation">
                      Remote Planning & Documentation
                    </option>
                    <option value="Emergency / Seasonal Drives Only">
                      Emergency / Seasonal Drives Only
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="vol-role"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Area Where You Would Like to Help
                </label>
                <select
                  id="vol-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as VolunteerRole)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:border-[#113826]"
                >
                  {ALL_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="vol-motivation"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Skills, Ideas, or How You Hope to Contribute (Optional)
                </label>
                <textarea
                  id="vol-motivation"
                  rows={3}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Share any teaching, logistics, medical, or neighborhood organizing experience..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#57534E]">
                  Zero spam. Used strictly for coordinating UMEED’s founding volunteer circle.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 text-sm font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] disabled:opacity-60 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isSubmitting ? 'Recording Interest...' : 'Submit Volunteer Interest'}
                </button>
              </div>
            </form>

            {/* Saved Local Submissions Viewer */}
            {savedPledges.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#F1EDE4]">
                <p className="text-xs font-semibold text-[#1C1917]">
                  Your Recorded Volunteer Entries ({savedPledges.length})
                </p>
                <div className="mt-3 divide-y divide-[#F1EDE4]">
                  {savedPledges.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-[#1C1917]">
                          {item.fullName} · <span className="font-normal text-[#57534E]">{item.location}</span>
                        </p>
                        <p className="text-[#57534E] mt-0.5">
                          {item.role} · {item.availability}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePledge(item.id)}
                        aria-label={`Remove volunteer entry for ${item.fullName}`}
                        className="inline-flex items-center gap-1 text-[#78716C] hover:text-[#991B1B] px-2 py-1 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Withdraw</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
