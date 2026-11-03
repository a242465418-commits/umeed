import React from 'react';
import { UmeedChatbot } from './UmeedChatbot';

interface AssistantSectionProps {
  onNavigate: (sectionId: string) => void;
  externalOpenFullscreen: boolean;
  onCloseExternalFullscreen: () => void;
}

export const AssistantSection: React.FC<AssistantSectionProps> = ({
  onNavigate,
  externalOpenFullscreen,
  onCloseExternalFullscreen,
}) => {
  return (
    <section
      id="assistant"
      aria-labelledby="umeed-assistant-heading"
      className="bg-white py-20 lg:py-28 border-b border-[#E7E0D2]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
              <span>08. UMEED AI Assistant</span>
              <span aria-hidden="true">·</span>
              <span>English & हिन्दी Conversational Guide</span>
            </div>
            <h2
              id="umeed-assistant-heading"
              className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight"
            >
              Ask anything about UMEED’s mission, causes, or transparency.
            </h2>
          </div>

          <p className="text-xs text-[#57534E] max-w-xs">
            Grounded strictly in verified founding information. Expand to full screen anytime for a
            focused conversational workspace.
          </p>
        </div>

        <UmeedChatbot
          onNavigateSection={onNavigate}
          externalOpenFullscreen={externalOpenFullscreen}
          onCloseExternalFullscreen={onCloseExternalFullscreen}
        />
      </div>
    </section>
  );
};
