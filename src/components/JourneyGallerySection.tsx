import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { JOURNEY_ENTRIES } from '../data/umeedContent';
import { JourneyItem } from '../types/umeed';
import { ResilientImage } from './ResilientImage';

type GalleryFilter = 'all' | 'note' | 'visual';

export const JourneyGallerySection: React.FC = () => {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [lightboxItem, setLightboxItem] = useState<JourneyItem | null>(null);

  const visibleEntries =
    filter === 'all'
      ? JOURNEY_ENTRIES
      : JOURNEY_ENTRIES.filter((entry) => entry.type === filter);

  useEffect(() => {
    if (!lightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = visibleEntries.findIndex((i) => i.id === lightboxItem.id);
        if (idx >= 0) {
          setLightboxItem(visibleEntries[(idx + 1) % visibleEntries.length]);
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = visibleEntries.findIndex((i) => i.id === lightboxItem.id);
        if (idx >= 0) {
          setLightboxItem(
            visibleEntries[(idx - 1 + visibleEntries.length) % visibleEntries.length]
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, visibleEntries]);

  const stepLightbox = (direction: -1 | 1) => {
    if (!lightboxItem) return;
    const idx = visibleEntries.findIndex((i) => i.id === lightboxItem.id);
    if (idx < 0) return;
    const nextIdx = (idx + direction + visibleEntries.length) % visibleEntries.length;
    setLightboxItem(visibleEntries[nextIdx]);
  };

  return (
    <section id="journey" className="bg-[#FBF9F5] py-20 lg:py-28 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header & Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
              <span>06. Journey & Updates</span>
              <span aria-hidden="true">·</span>
              <span>Day Zero Archive</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
              Documenting our journey honestly from the very first page.
            </h2>
            <p className="mt-3 text-base text-[#57534E] leading-relaxed">
              Because our first field project has not begun yet, this gallery contains zero staged
              beneficiary photographs. Instead, it chronicles our founding notes, planning desk, and
              conceptual studies of the causes we are preparing to serve.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter journey and updates"
            className="inline-flex items-center gap-1 p-1 bg-[#EFEAE0] rounded-lg self-start lg:self-auto"
          >
            {[
              { id: 'all', label: 'All Entries' },
              { id: 'note', label: 'Founding Notes' },
              { id: 'visual', label: 'Preparatory Studies' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id as GalleryFilter)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
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

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleEntries.map((entry) => (
            <article
              key={entry.id}
              className="group bg-white border border-[#E7E0D2] rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#E7E0D2]">
                  <ResilientImage
                    src={entry.imageUrl}
                    alt={entry.imageAlt || entry.title}
                    fallbackTitle={entry.title}
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover group-hover:scale-[1.02]"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxItem(entry)}
                    aria-label={`Inspect ${entry.title} in full view`}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black/75 text-[#FBF9F5] rounded-md hover:bg-black transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspect Plate</span>
                  </button>
                </div>

                <div className="p-6 lg:p-7">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                    <span className="font-mono font-semibold text-[#14532D]">
                      {entry.figureCode}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.phaseLabel}</span>
                  </div>

                  <h3 className="mt-2.5 font-serif text-xl lg:text-2xl font-semibold text-[#113826]">
                    {entry.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#44403C] leading-relaxed">{entry.summary}</p>
                </div>
              </div>

              <div className="px-6 lg:px-7 py-4 border-t border-[#E7E0D2] text-xs font-serif italic text-[#57534E]">
                {entry.honestContext}
              </div>
            </article>
          ))}
        </div>

        {/* Future Updates Notice */}
        <div className="mt-10 pt-6 border-t border-[#F1EDE4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#57534E]">
          <span>
            Future field photographs and post-drive summaries will only be added here once verified
            real-world initiatives occur.
          </span>
          <span className="font-mono text-[#113826] tabular-nums">
            Verified Field Reports Published: 0
          </span>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-heading"
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-[#FBF9F5] max-w-4xl w-full rounded-lg overflow-hidden border border-[#E7E0D2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E7E0D2]">
              <p className="text-xs font-mono text-[#14532D]">
                {lightboxItem.figureCode} · {lightboxItem.phaseLabel}
              </p>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close image viewer"
                className="p-1.5 text-[#57534E] hover:text-[#113826] rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] bg-[#1C1917]">
              <ResilientImage
                src={lightboxItem.imageUrl}
                alt={lightboxItem.imageAlt || lightboxItem.title}
                fallbackTitle={lightboxItem.title}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 id="lightbox-heading" className="font-serif text-xl font-semibold text-[#113826]">
                  {lightboxItem.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#44403C]">{lightboxItem.summary}</p>
                <p className="mt-2 text-xs font-serif italic text-[#57534E]">
                  {lightboxItem.honestContext}
                </p>
              </div>

              {visibleEntries.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => stepLightbox(-1)}
                    aria-label="Previous gallery entry"
                    className="inline-flex items-center justify-center w-10 h-10 border border-[#D6CEBE] rounded-md text-[#113826] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepLightbox(1)}
                    aria-label="Next gallery entry"
                    className="inline-flex items-center justify-center w-10 h-10 border border-[#D6CEBE] rounded-md text-[#113826] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
