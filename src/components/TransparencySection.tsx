import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { TRANSPARENCY_LEDGER } from '../data/umeedContent';

interface TransparencySectionProps {
  onNavigate: (sectionId: string) => void;
}

export const TransparencySection: React.FC<TransparencySectionProps> = ({ onNavigate }) => {
  const [showProtectionPolicy, setShowProtectionPolicy] = useState(false);

  return (
    <section
      id="transparency"
      className="bg-[#113826] text-[#FBF9F5] py-20 lg:py-28 border-b border-[#1B6B3A]/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#D6CEBE] mb-3 tracking-wide">
              <span>07. Public Transparency</span>
              <span aria-hidden="true">·</span>
              <span>We are just getting started.</span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Complete clarity on our finances, registration, and current impact.
            </h2>

            <p className="mt-4 text-base text-[#E7E0D2] leading-relaxed max-w-2xl tracking-[0.01em]">
              Trust cannot be retrofitted later. Even before our first rupee or dollar is ever raised,
              we publish an open-book baseline stating plainly where UMEED stands today.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => setShowProtectionPolicy((prev) => !prev)}
              aria-expanded={showProtectionPolicy}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#FBF9F5] text-[#113826] rounded-md hover:bg-[#EFEAE0] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>
                {showProtectionPolicy
                  ? 'Hide Public Safeguard Notice'
                  : 'Verify Donation Safeguard Policy'}
              </span>
            </button>
          </div>
        </div>

        {/* Toggleable Donor Protection & Anti-Impersonation Safeguard */}
        {showProtectionPolicy && (
          <div className="mt-8 bg-[#0B2418] border border-[#1B6B3A]/60 rounded-lg p-6 lg:p-8">
            <h3 className="font-serif text-xl font-semibold text-white">
              Important Public Notice: Donation collection is not active yet.
            </h3>
            <p className="mt-2 text-sm text-[#E7E0D2] leading-relaxed max-w-3xl">
              UMEED does <strong>not</strong> have an active payment gateway, bank transfer link,
              crowdfunding campaign, or personal UPI QR code. We do not authorize any individual to
              collect cash or digital transfers in UMEED’s name. Public contributions will remain
              closed until formal legal registration, dedicated institutional banking, and public
              audit reporting are fully in place.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-xs font-semibold text-[#FBF9F5] underline underline-offset-4 hover:text-[#D6CEBE] cursor-pointer"
              >
                Have a question or want to verify a message? Contact us directly
              </button>
            </div>
          </div>
        )}

        {/* Open-Book Tabular Ledger */}
        <div className="mt-12 bg-white text-[#1C1917] rounded-lg border border-[#E7E0D2] overflow-hidden">
          <div className="px-6 lg:px-8 py-5 bg-[#FBF9F5] border-b border-[#E7E0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#113826]">
                UMEED Open-Book Founding Ledger
              </h3>
              <p className="text-xs text-[#57534E]">
                All figures reflect honest, unembellished founding status.
              </p>
            </div>
            <p className="text-xs font-semibold text-[#14532D]">
              Donation collection is not active yet.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E7E0D2] text-xs font-semibold text-[#57534E]">
                  <th className="py-3.5 px-6 lg:px-8">Accountability Category</th>
                  <th className="py-3.5 px-6 lg:px-8">Verified Figure / Status</th>
                  <th className="py-3.5 px-6 lg:px-8">Public Disclosure Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE4] text-sm">
                {TRANSPARENCY_LEDGER.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                    <td className="py-4 px-6 lg:px-8 font-medium text-[#1C1917]">{row.metric}</td>
                    <td className="py-4 px-6 lg:px-8 font-mono font-semibold text-[#113826] tabular-nums whitespace-nowrap">
                      {row.value}
                    </td>
                    <td className="py-4 px-6 lg:px-8 text-[#57534E]">{row.statusNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Future Accountability Commitments */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#E7E0D2]">
          <div className="p-6 rounded-lg border border-white/15 bg-white/[0.03]">
            <p className="font-mono text-xs text-[#D6CEBE] tabular-nums">Commitment 01</p>
            <h4 className="mt-2 font-serif text-lg font-semibold text-white">
              No Personal Accounts Ever
            </h4>
            <p className="mt-2 text-xs text-[#D6CEBE] leading-relaxed">
              We will never collect humanitarian funds into personal wallets or private UPI IDs.
              Contributions will only open under a dedicated, auditable organizational account.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-white/15 bg-white/[0.03]">
            <p className="font-mono text-xs text-[#D6CEBE] tabular-nums">Commitment 02</p>
            <h4 className="mt-2 font-serif text-lg font-semibold text-white">
              Receipt-Backed Field Logs
            </h4>
            <p className="mt-2 text-xs text-[#D6CEBE] leading-relaxed">
              Once operations begin, every supply kit, procurement bill, and distribution summary will
              be published openly in this ledger.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-white/15 bg-white/[0.03]">
            <p className="font-mono text-xs text-[#D6CEBE] tabular-nums">Commitment 03</p>
            <h4 className="mt-2 font-serif text-lg font-semibold text-white">
              Honest Corrections
            </h4>
            <p className="mt-2 text-xs text-[#D6CEBE] leading-relaxed">
              If a drive falls short or encounters challenges, we will report what went wrong just as
              openly as what succeeded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
