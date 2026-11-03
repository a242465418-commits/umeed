import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { SUPPORT_QR_CONFIG } from '../data/umeedContent';

interface SupportUmeedSectionProps {
  onNavigate: (sectionId: string) => void;
}

const MISSION_PILLARS = [
  'Education',
  'Food & Nutrition',
  'Healthcare',
  'Essential Supplies',
  'Disaster Relief',
  'Community Support',
];

export const SupportUmeedSection: React.FC<SupportUmeedSectionProps> = ({ onNavigate }) => {
  const [qrLoadError, setQrLoadError] = useState(false);

  const isPaymentActive =
    SUPPORT_QR_CONFIG.isPaymentAuthorized &&
    Boolean(SUPPORT_QR_CONFIG.qrImageSrc) &&
    !qrLoadError;

  return (
    <section
      id="support"
      aria-labelledby="support-umeed-heading"
      className="bg-white py-20 lg:py-28 border-b border-[#E7E0D2]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-[#57534E] mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span>01. Support UMEED</span>
            <span aria-hidden="true">·</span>
            <span>Future Contribution Station</span>
          </div>
          <span className="font-semibold text-[#113826]">
            {SUPPORT_QR_CONFIG.statusMessage}
          </span>
        </div>

        {/* Two-Column Support Card: Cream Editorial Column + Deep-Green QR Column */}
        <div className="bg-[#FBF9F5] border border-[#E7E0D2] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Mission Copy, Official NGO Collaboration Notice & Volunteer Action */}
          <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#14532D] tracking-wide">
                UMEED Humanitarian Initiative
              </p>

              <h2
                id="support-umeed-heading"
                className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#113826] tracking-tight leading-[1.15]"
              >
                Together, We Can Make a Difference.
              </h2>

              <p className="mt-5 text-base text-[#44403C] leading-relaxed max-w-xl">
                UMEED’s mission is to stand alongside underserved families with practical, dignified
                support—expanding access to children’s education, wholesome food and nutrition,
                preventive healthcare awareness, seasonal essentials, disaster preparedness, and
                community care.
              </p>

              {/* Clean Unboxed Mission Focus Row */}
              <div className="mt-7 pt-5 border-t border-[#E7E0D2] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-medium text-[#57534E]">
                {MISSION_PILLARS.map((pillar, index) => (
                  <React.Fragment key={pillar}>
                    <span className="text-[#1C1917]">{pillar}</span>
                    {index < MISSION_PILLARS.length - 1 && (
                      <span aria-hidden="true" className="text-[#A8A29E]">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Official NGO Collaboration & Inactive Status Notice */}
              <div className="mt-8 p-5 sm:p-6 bg-white border border-[#E7E0D2] rounded-lg">
                <p className="text-sm sm:text-base font-semibold text-[#113826] leading-relaxed">
                  {SUPPORT_QR_CONFIG.collaborationNotice}
                </p>
                <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  We do not use personal payment accounts or private UPI IDs. Public contributions
                  will only open once verified charitable governance and transparent reporting
                  safeguards are formally established.
                </p>
              </div>
            </div>

            {/* Constructive Actions Today */}
            <div className="mt-9 pt-6 border-t border-[#E7E0D2] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => onNavigate('volunteer')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
              >
                <span>Support Through Volunteering</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('transparency')}
                className="inline-flex items-center gap-1.5 py-1.5 text-xs sm:text-sm font-medium text-[#113826] hover:text-[#14532D] underline underline-offset-4 decoration-[#113826]/30 hover:decoration-[#113826] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Review our open-book ledger
              </button>
            </div>
          </div>

          {/* Right Column: Deep-Green Background & Cream-White QR Card */}
          <div className="lg:col-span-5 bg-[#113826] text-[#FBF9F5] p-7 sm:p-10 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-[#1B6B3A]/30">
            <div className="w-full max-w-[330px] sm:max-w-[350px] mx-auto flex flex-col items-center">
              {/* Cream-White QR Frame Card */}
              <div className="w-full bg-[#FBF9F5] text-[#1C1917] rounded-xl p-4 sm:p-5 border border-[#E7E0D2] shadow-sm">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E7E0D2] text-xs">
                  <span className="font-serif font-semibold text-[#113826]">
                    UMEED Contribution Frame
                  </span>
                  <span className="font-mono text-[11px] text-[#57534E]">
                    {isPaymentActive ? 'Verified NGO' : 'Inactive'}
                  </span>
                </div>

                {/* Responsive 1:1 Square Frame: Neutral Placeholder (Zero Fake QR Patterns) */}
                <div className="w-full aspect-square bg-white rounded-lg p-3 sm:p-4 border border-[#E7E0D2] flex items-center justify-center overflow-hidden">
                  {isPaymentActive && SUPPORT_QR_CONFIG.qrImageSrc ? (
                    <img
                      src={SUPPORT_QR_CONFIG.qrImageSrc}
                      alt="Official Verified NGO Donation QR"
                      onError={() => setQrLoadError(true)}
                      className="block w-full h-full object-contain select-none"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`${SUPPORT_QR_CONFIG.placeholderLabel} — ${SUPPORT_QR_CONFIG.statusMessage}`}
                      className="relative w-full h-full bg-[#FBF9F5] border border-dashed border-[#D6CEBE] rounded-md p-6 flex flex-col items-center justify-center text-center"
                    >
                      {/* Clean Architectural Frame Corners (Zero Fake QR Code Matrix) */}
                      <span
                        aria-hidden="true"
                        className="absolute top-3.5 left-3.5 w-5 h-5 border-t-2 border-l-2 border-[#113826]/35 rounded-tl-xs"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-3.5 right-3.5 w-5 h-5 border-t-2 border-r-2 border-[#113826]/35 rounded-tr-xs"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3.5 left-3.5 w-5 h-5 border-b-2 border-l-2 border-[#113826]/35 rounded-bl-xs"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3.5 right-3.5 w-5 h-5 border-b-2 border-r-2 border-[#113826]/35 rounded-br-xs"
                      />

                      <p className="font-serif text-lg sm:text-xl font-semibold text-[#113826] leading-snug max-w-[210px]">
                        {SUPPORT_QR_CONFIG.placeholderLabel}
                      </p>

                      <p className="mt-3 text-xs font-semibold text-[#14532D]">
                        {SUPPORT_QR_CONFIG.statusMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* Short Collaboration Context Inside Frame Footer */}
                <p className="mt-3 text-center text-[11px] text-[#57534E] leading-relaxed">
                  {SUPPORT_QR_CONFIG.collaborationNotice}
                </p>
              </div>

              {/* Trust Commitment Text Below QR Frame */}
              <p className="mt-5 text-xs sm:text-sm text-[#FBF9F5]/95 text-center leading-relaxed max-w-[310px]">
                {SUPPORT_QR_CONFIG.trustMessage}
              </p>

              {/* Disabled Scan QR Code Button */}
              <button
                type="button"
                disabled={!isPaymentActive}
                aria-disabled={!isPaymentActive}
                className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isPaymentActive
                    ? 'bg-[#FBF9F5] text-[#113826] hover:bg-[#EFEAE0] cursor-pointer'
                    : 'bg-[#0B2418]/80 text-[#D6CEBE]/75 border border-white/15 cursor-not-allowed'
                }`}
              >
                {!isPaymentActive && <Lock className="w-3.5 h-3.5" aria-hidden="true" />}
                <span>Scan QR Code</span>
              </button>

              <p className="mt-2.5 text-[11px] text-[#D6CEBE]/80 text-center">
                {isPaymentActive
                  ? 'Scan with any supported payment app to contribute.'
                  : 'Disabled until official charitable collaboration is active.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
