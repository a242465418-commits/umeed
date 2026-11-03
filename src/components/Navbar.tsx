import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const DESKTOP_NAV_LINKS = [
  { id: 'support', label: 'Support' },
  { id: 'about', label: 'About' },
  { id: 'causes', label: 'Causes' },
  { id: 'first-goal', label: 'First Goal' },
  { id: 'contact', label: 'Contact' },
];

const MOBILE_ALL_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'support', label: 'Support UMEED' },
  { id: 'about', label: 'About UMEED' },
  { id: 'causes', label: 'Causes' },
  { id: 'first-goal', label: 'First Goal' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'journey', label: 'Journey & Updates' },
  { id: 'transparency', label: 'Transparency' },
  { id: 'assistant', label: 'UMEED AI Assistant' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-10 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-serif text-xl font-semibold tracking-tight text-[#113826] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D]"
        >
          UMEED
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {DESKTOP_NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D] ${
                  isActive
                    ? 'text-[#113826] border-[#113826]'
                    : 'border-transparent hover:text-[#113826] hover:border-[#113826]/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'volunteer')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
          >
            Join as Volunteer
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#113826] rounded-md hover:bg-[#F5F1E8] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14532D]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FBF9F5] border-b border-[#E7E0D2] px-6 py-5"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {MOBILE_ALL_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive ? 'text-[#113826] font-semibold' : 'text-[#57534E] hover:text-[#113826]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#E7E0D2]">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'volunteer')}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap"
            >
              Join as Volunteer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
