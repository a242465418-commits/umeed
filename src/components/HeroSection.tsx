import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { BRAND_IMAGES } from '../data/umeedContent';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const CHAPTER_SHORTCUTS = [
  { id: 'support', label: '01. Support UMEED' },
  { id: 'about', label: '02. About' },
  { id: 'causes', label: '03. Six Causes' },
  { id: 'first-goal', label: '04. First Goal' },
  { id: 'volunteer', label: '05. Volunteer' },
  { id: 'journey', label: '06. Journey & Updates' },
  { id: 'transparency', label: '07. Transparency' },
  { id: 'assistant', label: '08. UMEED AI' },
  { id: 'contact', label: '09. Contact' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="bg-[#FBF9F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Two-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Mission Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div>
              {/* Unboxed clean metadata (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#14532D] mb-6">
                <span>Founding Humanitarian Initiative</span>
                <span aria-hidden="true">·</span>
                <span>We are just getting started.</span>
              </div>

              <h1
                className="font-serif font-semibold text-[#113826] tracking-tight leading-[1.12] max-w-2xl"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              >
                Together, We Can Make a Difference.
              </h1>

              <p className="mt-6 text-base lg:text-lg text-[#44403C] leading-relaxed max-w-2xl">
                <strong className="font-semibold text-[#1C1917]">UMEED</strong>—meaning{' '}
                <em className="font-serif italic">hope</em>—is a new humanitarian effort born from a
                simple belief: lasting kindness must begin with complete honesty. We have not helped
                anyone yet, and we have not collected any donations. Today, we are laying transparent
                foundations to serve communities across education, nourishment, healthcare, and crisis
                relief.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E7E0D2] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => onNavigate('volunteer')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D]"
              >
                <span>Become a Founding Volunteer</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('first-goal')}
                className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-[#113826] hover:text-[#14532D] underline underline-offset-4 decoration-[#113826]/30 hover:decoration-[#113826] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                See why our first project is yet to begin
              </button>
            </div>
          </motion.div>

          {/* Right Column: Editorial Focal Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-full rounded-lg overflow-hidden border border-[#E7E0D2]">
              <ResilientImage
                src={BRAND_IMAGES.heroSapling}
                alt="Golden morning sunlight shining on a young green sapling emerging from rich forest soil"
                fallbackTitle="UMEED — A New Beginning"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                <p className="text-xs font-serif italic text-[#FBF9F5]/95">
                  Fig. 01 — Every enduring canopy begins as a single sapling tended in daylight.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Day Zero Honest Ledger Strip Below Hero Split */}
        <div className="mt-12 bg-white border border-[#E7E0D2] rounded-lg p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-5 mb-6 border-b border-[#F1EDE4]">
            <p className="text-xs font-medium text-[#57534E]">
              Day Zero Public Baseline · Verified Founding Status
            </p>
            <p className="text-xs font-semibold text-[#113826]">
              Donation collection is not active yet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <p className="font-mono text-2xl lg:text-3xl font-semibold text-[#113826] tabular-nums">
                0
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1C1917]">Projects Completed</p>
              <p className="mt-0.5 text-xs text-[#57534E]">First project is yet to begin</p>
            </div>

            <div className="sm:border-l sm:border-[#F1EDE4] sm:pl-6">
              <p className="font-mono text-2xl lg:text-3xl font-semibold text-[#113826] tabular-nums">
                0
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1C1917]">Beneficiaries Assisted</p>
              <p className="mt-0.5 text-xs text-[#57534E]">No field drives conducted yet</p>
            </div>

            <div className="lg:border-l lg:border-[#F1EDE4] lg:pl-6">
              <p className="font-mono text-2xl lg:text-3xl font-semibold text-[#113826] tabular-nums">
                0.00
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1C1917]">Donations Collected</p>
              <p className="mt-0.5 text-xs text-[#57534E]">No payment gateway or UPI active</p>
            </div>

            <div className="sm:border-l sm:border-[#F1EDE4] sm:pl-6">
              <p className="font-mono text-2xl lg:text-3xl font-semibold text-[#113826] tabular-nums">
                06
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1C1917]">Planned Core Causes</p>
              <p className="mt-0.5 text-xs text-[#57534E]">Volunteer preparation open now</p>
            </div>
          </div>
        </div>

        {/* Clean Institutional Chapter Index Ribbon */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#57534E]">
          <span className="font-semibold text-[#1C1917]">Contents:</span>
          {CHAPTER_SHORTCUTS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onNavigate(chapter.id)}
              className="hover:text-[#113826] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
