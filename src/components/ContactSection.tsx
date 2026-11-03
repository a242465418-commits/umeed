import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { HONEST_FAQS } from '../data/umeedContent';
import { getSubmittedInquiries, submitContactInquiry } from '../services/umeedService';
import { ContactSubmission, InquiryType } from '../types/umeed';

const INQUIRY_OPTIONS = Object.values(InquiryType);

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>(InquiryType.GENERAL);
  const [message, setMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sentConfirmation, setSentConfirmation] = useState<ContactSubmission | null>(null);
  const [recentMessages, setRecentMessages] = useState<ContactSubmission[]>([]);

  const [openFaqId, setOpenFaqId] = useState<string>(HONEST_FAQS[0].id);

  useEffect(() => {
    getSubmittedInquiries().then(setRecentMessages);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSending(true);

    const res = await submitContactInquiry({
      fullName,
      email,
      inquiryType,
      message,
    });

    setIsSending(false);

    if (!res.ok || !res.data) {
      setFormError(res.error || 'Please verify all fields and try again.');
      return;
    }

    setSentConfirmation(res.data);
    const updated = await getSubmittedInquiries();
    setRecentMessages(updated);
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="bg-[#FBF9F5] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
            <span>09. Contact UMEED</span>
            <span aria-hidden="true">·</span>
            <span>Open Dialogue & Honest Answers</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
            Reach out with questions, ideas, or local community needs.
          </h2>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Whether you want to help plan our first volunteer initiative, bring attention to a
            neighborhood need, or ask about our founding roadmap, we read every message carefully.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E7E0D2] rounded-lg p-7 lg:p-10">
            <h3 className="font-serif text-2xl font-semibold text-[#113826]">Send Us a Message</h3>
            <p className="mt-1.5 text-sm text-[#57534E]">
              Please note: Donation collection is not active yet. Kindly do not send payment inquiries
              or financial transfers.
            </p>

            {sentConfirmation && (
              <div
                role="status"
                className="mt-6 p-5 bg-[#F5F9F6] border border-[#14532D]/30 rounded-md flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#113826]">
                    Message recorded, {sentConfirmation.fullName}.
                  </p>
                  <p className="mt-1 text-xs text-[#44403C] leading-relaxed">
                    Topic: <strong>{sentConfirmation.inquiryType}</strong>. Your inquiry has been
                    logged cleanly and will be reviewed as our founding team coordinates responses.
                  </p>
                </div>
              </div>
            )}

            {formError && (
              <div
                role="alert"
                className="mt-6 p-4 bg-[#FEF2F2] border border-[#DC2626]/30 rounded-md text-xs font-medium text-[#991B1B]"
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleContactSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Topic
                </label>
                <select
                  id="contact-topic"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:border-[#113826]"
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your question, suggestion, or community observation..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#113826]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-3 text-sm font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] disabled:opacity-60 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isSending ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>

            {recentMessages.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#F1EDE4]">
                <p className="text-xs font-semibold text-[#1C1917]">
                  Messages Sent From This Browser ({recentMessages.length})
                </p>
                <div className="mt-2.5 space-y-2">
                  {recentMessages.slice(0, 3).map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-md bg-[#FBF9F5] border border-[#E7E0D2] text-xs"
                    >
                      <p className="font-semibold text-[#113826]">
                        {msg.inquiryType} · <span className="font-normal text-[#57534E]">{msg.fullName}</span>
                      </p>
                      <p className="mt-1 text-[#44403C] line-clamp-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Honest Frequently Asked Questions */}
          <div className="lg:col-span-5">
            <h3 className="font-serif text-2xl font-semibold text-[#113826]">
              Straightforward Answers
            </h3>
            <p className="mt-1.5 text-sm text-[#57534E]">
              Clear, unvarnished answers about where UMEED stands right now.
            </p>

            <div className="mt-6 bg-white border border-[#E7E0D2] rounded-lg divide-y divide-[#E7E0D2]">
              {HONEST_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-[#FBF9F5] transition-colors"
                    >
                      <span className="font-serif text-base font-semibold text-[#1C1917]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#113826] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#44403C] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-6 bg-white border border-[#E7E0D2] rounded-lg text-xs text-[#57534E] space-y-2 leading-relaxed">
              <p className="font-semibold text-[#113826]">Founding Stage Communication Note</p>
              <p>
                UMEED does not maintain a physical head office, paid staff, or helpline numbers yet.
                All early coordination takes place digitally through our founding volunteer circle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
