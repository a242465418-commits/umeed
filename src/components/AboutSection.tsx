import React from 'react';
import { FOUNDING_PILLARS } from '../data/umeedContent';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-white py-20 lg:py-28 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
            <span>02. About UMEED</span>
            <span aria-hidden="true">·</span>
            <span>Our Founding Story & Ethos</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
            Starting with an honest blank page, guided by shared human dignity.
          </h2>
        </div>

        {/* Asymmetric Two-Column Editorial Reading Layout */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative Essay (65-75ch prose measure + Drop Cap) */}
          <div className="lg:col-span-7 space-y-6 text-base text-[#44403C] leading-relaxed max-w-2xl">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#113826] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              In many languages across South Asia, the word <em className="font-serif italic text-[#1C1917]">Umeed</em>{' '}
              means hope—not passive wishing, but the quiet resolve that tomorrow can be made fairer
              when ordinary neighbors refuse to look away from hardship.
            </p>

            <p>
              We founded UMEED with an unusual decision: to build in complete public honesty from the
              very beginning. Too often, young initiatives feel pressured to appear larger or more
              established than they truly are. We believe trust is too precious for shortcuts.{' '}
              <strong className="font-semibold text-[#1C1917]">We are just getting started.</strong> We
              have not distributed our first ration kit, tutored our first student, or collected any
              public funds.
            </p>

            <p>
              Right now, UMEED is in its foundational listening and volunteer-building chapter. Before
              launching our first small-scale community project—and long before enabling any form of
              financial contribution—we are bringing together thoughtful citizens, educators, health
              workers, and organizers who care deeply about accountable service.
            </p>

            {/* Editorial Pull Quote (Top/Bottom Hairline Dividers, Zero Thick Left Border) */}
            <blockquote className="my-8 py-6 border-y border-[#E7E0D2]">
              <p className="font-serif text-xl lg:text-2xl italic text-[#113826] leading-snug">
                “True humanitarian work is measured not by promises made at the start, but by the
                integrity kept when the real work begins.”
              </p>
              <footer className="mt-3 text-xs font-sans not-italic text-[#57534E]">
                The UMEED Founding Charter · Principle One
              </footer>
            </blockquote>
          </div>

          {/* Right Column: Four Founding Commitments */}
          <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#E7E0D2] rounded-lg p-7 lg:p-9">
            <h3 className="font-serif text-xl font-semibold text-[#113826]">
              Our Four Founding Commitments
            </h3>
            <p className="mt-2 text-sm text-[#57534E]">
              Every step UMEED takes—today and in the years ahead—is bound by these non-negotiable
              rules.
            </p>

            <div className="mt-6 divide-y divide-[#E7E0D2]">
              {FOUNDING_PILLARS.map((pillar) => (
                <div key={pillar.index} className="py-5 first:pt-2 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-[#14532D] tabular-nums">
                      {pillar.index}.
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-[#57534E] leading-relaxed pl-7">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
