import { useCallback, useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { AssistantSection } from './components/AssistantSection';
import { CausesSection } from './components/CausesSection';
import { ContactSection } from './components/ContactSection';
import { FirstGoalSection } from './components/FirstGoalSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { JourneyGallerySection } from './components/JourneyGallerySection';
import { Navbar } from './components/Navbar';
import { SupportUmeedSection } from './components/SupportUmeedSection';
import { TransparencySection } from './components/TransparencySection';
import { VolunteerSection } from './components/VolunteerSection';
import { VolunteerRole } from './types/umeed';

const SECTION_IDS = [
  'home',
  'support',
  'about',
  'causes',
  'first-goal',
  'volunteer',
  'journey',
  'transparency',
  'assistant',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [preselectedVolunteerRole, setPreselectedVolunteerRole] = useState<VolunteerRole | null>(
    null
  );
  const [fullscreenChatOpen, setFullscreenChatOpen] = useState(false);

  const navigateToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  }, []);

  const handleSelectVolunteerCause = useCallback(
    (role: VolunteerRole) => {
      setPreselectedVolunteerRole(role);
      navigateToSection('volunteer');
    },
    [navigateToSection]
  );

  useEffect(() => {
    // Respect initial URL hash if present
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && SECTION_IDS.includes(initialHash)) {
      const target = document.getElementById(initialHash);
      if (target) {
        setActiveSection(initialHash);
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.5],
      }
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

      <main className="flex-1">
        <HeroSection onNavigate={navigateToSection} />
        <SupportUmeedSection onNavigate={navigateToSection} />
        <AboutSection />
        <CausesSection onSelectVolunteerCause={handleSelectVolunteerCause} />
        <FirstGoalSection onNavigate={navigateToSection} />
        <VolunteerSection preselectedRole={preselectedVolunteerRole} />
        <JourneyGallerySection />
        <TransparencySection onNavigate={navigateToSection} />
        <AssistantSection
          onNavigate={navigateToSection}
          externalOpenFullscreen={fullscreenChatOpen}
          onCloseExternalFullscreen={() => setFullscreenChatOpen(false)}
        />
        <ContactSection />
      </main>

      <Footer onNavigate={navigateToSection} />

      {/* Quick-Launch Floating Button to Open Full-Screen UMEED AI Anywhere */}
      {!fullscreenChatOpen && activeSection !== 'assistant' && (
        <button
          type="button"
          onClick={() => setFullscreenChatOpen(true)}
          aria-label="Open UMEED AI Assistant"
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FBF9F5] bg-[#113826] border border-[#1B6B3A]/60 rounded-full shadow-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Ask UMEED AI</span>
        </button>
      )}
    </div>
  );
}
