import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CAUSES_DATA } from '../data/umeedContent';
import { CauseCategory, CauseItem, VolunteerRole } from '../types/umeed';
import { ResilientImage } from './ResilientImage';

interface CausesSectionProps {
  onSelectVolunteerCause: (role: VolunteerRole) => void;
}

const CATEGORY_FILTERS: { id: CauseCategory; label: string }[] = [
  { id: CauseCategory.ALL, label: 'All Six Causes' },
  { id: CauseCategory.DAILY_DIGNITY, label: 'Daily Dignity' },
  { id: CauseCategory.HEALTH_LEARNING, label: 'Health & Learning' },
  { id: CauseCategory.CRISIS_RESILIENCE, label: 'Crisis & Community' },
];

const CAUSE_TO_ROLE: Record<string, VolunteerRole> = {
  education: VolunteerRole.EDUCATION,
  food: VolunteerRole.FOOD_LOGISTICS,
  healthcare: VolunteerRole.HEALTHCARE,
  'essential-supplies': VolunteerRole.FOOD_LOGISTICS,
  'disaster-relief': VolunteerRole.COMMUNITY_OUTREACH,
  'community-support': VolunteerRole.COMMUNITY_OUTREACH,
};

export const CausesSection: React.FC<CausesSectionProps> = ({ onSelectVolunteerCause }) => {
  const [activeCategory, setActiveCategory] = useState<CauseCategory>(CauseCategory.ALL);
  const [selectedCauseId, setSelectedCauseId] = useState<string>(CAUSES_DATA[0].id);

  const filteredCauses =
    activeCategory === CauseCategory.ALL
      ? CAUSES_DATA
      : CAUSES_DATA.filter((cause) => cause.category === activeCategory);

  const selectedCause: CauseItem =
    filteredCauses.find((c) => c.id === selectedCauseId) || filteredCauses[0] || CAUSES_DATA[0];

  const handleCategoryChange = (cat: CauseCategory) => {
    setActiveCategory(cat);
    const nextList =
      cat === CauseCategory.ALL
        ? CAUSES_DATA
        : CAUSES_DATA.filter((cause) => cause.category === cat);
    if (nextList.length > 0 && !nextList.some((c) => c.id === selectedCauseId)) {
      setSelectedCauseId(nextList[0].id);
    }
  };

  return (
    <section id="causes" className="bg-[#FBF9F5] py-20 lg:py-28 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header & Interactive Filter Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
              <span>03. Core Humanitarian Causes</span>
              <span aria-hidden="true">·</span>
              <span>Six Focus Areas</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
              Six humanitarian pillars where UMEED is preparing to serve.
            </h2>
            <p className="mt-3 text-base text-[#57534E] leading-relaxed">
              We are just getting started and have not begun field projects yet. Explore each cause
              card below to review our planned approach and volunteer readiness needs.
            </p>
          </div>

          {/* Functional Segmented Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter humanitarian causes"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFEAE0] rounded-lg self-start lg:self-auto"
          >
            {CATEGORY_FILTERS.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#113826] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Six Attractive Cause Cards Grid (Image + Title + Short Description + Action) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCauses.map((cause) => {
            const isSelected = selectedCause.id === cause.id;
            return (
              <article
                key={cause.id}
                onClick={() => setSelectedCauseId(cause.id)}
                className={`group bg-white rounded-xl overflow-hidden border transition-colors duration-150 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#113826] ring-1 ring-[#113826]'
                    : 'border-[#E7E0D2] hover:border-[#113826]/50'
                }`}
              >
                <div>
                  {/* Relevant Cause Image (4:3 Editorial Aspect Ratio) */}
                  <div className="aspect-[4/3] w-full overflow-hidden border-b border-[#F1EDE4]">
                    <ResilientImage
                      src={cause.imageUrl}
                      alt={cause.imageAlt || `${cause.title} — Planned UMEED Focus`}
                      fallbackTitle={cause.title}
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Card Body: Unboxed Metadata, Title & Short Description */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#57534E]">
                      <span className="font-mono font-semibold text-[#14532D] tabular-nums">
                        {cause.index}.
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cause.categoryLabel}</span>
                    </div>

                    <h3 className="mt-2.5 font-serif text-xl font-semibold text-[#113826]">
                      {cause.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#44403C] leading-relaxed">
                      {cause.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Honest Status & Interactive Blueprint / Volunteer Controls */}
                <div className="px-6 py-4 bg-[#FBF9F5] border-t border-[#F1EDE4] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#57534E] truncate">{cause.currentStatusNote}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCauseId(cause.id);
                      const detailEl = document.getElementById('cause-blueprint-panel');
                      detailEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }}
                    className={`text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'text-[#113826] underline underline-offset-4'
                        : 'text-[#14532D] hover:text-[#113826]'
                    }`}
                  >
                    {isSelected ? 'Viewing Plan' : 'Inspect Plan →'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Selected Cause Planned Field Blueprint Panel */}
        <div
          id="cause-blueprint-panel"
          className="mt-10 bg-white border border-[#E7E0D2] rounded-xl p-7 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                <span className="font-mono font-semibold text-[#14532D] tabular-nums">
                  Cause {selectedCause.index} Blueprint
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedCause.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedCause.currentStatusNote}</span>
              </div>

              <h3 className="mt-2.5 font-serif text-2xl lg:text-3xl font-semibold text-[#113826]">
                {selectedCause.title}: How We Plan to Help
              </h3>

              <p className="mt-4 text-base text-[#44403C] leading-relaxed">
                {selectedCause.plannedApproach}
              </p>

              {selectedCause.imageCaption && (
                <p className="mt-4 text-xs font-serif italic text-[#57534E]">
                  {selectedCause.imageCaption}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 lg:border-l lg:border-[#F1EDE4] lg:pl-10 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                  Planned Actions Once Operations Begin
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-sm text-[#44403C]">
                  {selectedCause.futureActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-[#14532D] mt-0.5 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-5 border-t border-[#F1EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#57534E] leading-relaxed max-w-sm">
                  <strong className="font-semibold text-[#1C1917]">Volunteer Need:</strong>{' '}
                  {selectedCause.volunteerPreparation}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    onSelectVolunteerCause(
                      CAUSE_TO_ROLE[selectedCause.id] || VolunteerRole.COMMUNITY_OUTREACH
                    )
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Volunteer for {selectedCause.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
