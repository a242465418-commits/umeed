import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'support', label: 'Support UMEED' },
  { id: 'about', label: 'About UMEED' },
  { id: 'causes', label: 'Six Causes' },
  { id: 'first-goal', label: 'First Goal' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'journey', label: 'Journey & Updates' },
  { id: 'transparency', label: 'Transparency' },
  { id: 'assistant', label: 'UMEED AI Assistant' },
  { id: 'contact', label: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B2418] text-[#E7E0D2] border-t border-[#1B6B3A]/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="font-serif text-2xl font-semibold text-white tracking-tight"
            >
              UMEED
            </a>
            <p className="mt-2 font-serif italic text-base text-[#D6CEBE]">
              Together, We Can Make a Difference.
            </p>
            <p className="mt-4 text-xs text-[#D6CEBE]/85 leading-relaxed max-w-sm">
              We are just getting started. UMEED has not completed any projects or assisted
              beneficiaries yet, and donation collection is not active yet.
            </p>
          </div>

          {/* Complete Section Directory */}
          <div className="md:col-span-5">
            <p className="text-xs font-semibold text-white mb-3">Site Directory</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                  }}
                  className="text-[#D6CEBE] hover:text-white transition-colors duration-150 py-0.5 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#FBF9F5] border border-white/20 rounded-md hover:bg-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright & Honesty Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#D6CEBE]/75">
          <p>© {new Date().getFullYear()} UMEED Humanitarian Initiative. Founding Phase.</p>
          <p>We are just getting started. · Donation collection is not active yet.</p>
        </div>
      </div>
    </footer>
  );
};
