import React, { useState } from 'react';
import { FIRST_GOAL_MILESTONES } from '../data/umeedContent';

interface FirstGoalSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FirstGoalSection: React.FC<FirstGoalSectionProps> = ({ onNavigate }) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(FIRST_GOAL_MILESTONES[0].id);

  const activeMilestone =
    FIRST_GOAL_MILESTONES.find((m) => m.id === activeMilestoneId) || FIRST_GOAL_MILESTONES[0];

  return (
    <section id="first-goal" className="bg-white py-20 lg:py-28 border-b border-[#E7E0D2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Row: Honest First Goal Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#57534E] mb-3">
              <span>04. Our First Goal</span>
              <span aria-hidden="true">·</span>
              <span>First Project Yet to Begin</span>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#113826] tracking-tight">
              Our inaugural community project has not started yet—and here is how we are preparing.
            </h2>

            <p className="mt-4 text-base text-[#44403C] leading-relaxed max-w-2xl">
              Rather than rushing into an unplanned handout for photographs, UMEED’s first goal is to
              assemble a reliable founding volunteer circle, listen directly to local families, and
              design a modest, well-documented first initiative that genuinely helps.
            </p>
          </div>

          {/* Right Summary Box: Zero Progress Honesty Card */}
          <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#E7E0D2] rounded-lg p-6 lg:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs font-medium text-[#57534E]">Project 01 Field Status</span>
              <span className="font-mono text-sm font-semibold text-[#113826] tabular-nums">
                Yet to Begin
              </span>
            </div>

            {/* Clean Hairline Progress Bar at Honest Founding Baseline */}
            <div className="mt-4 w-full h-2 bg-[#E7E0D2] rounded-full overflow-hidden" aria-hidden="true">
              <div className="h-full w-[12%] bg-[#14532D] rounded-full" />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#57534E]">
              <span>Stage 1 of 4: Founding Groundwork</span>
              <span className="font-mono tabular-nums">0 Projects Executed</span>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E7E0D2] space-y-2 text-xs text-[#44403C]">
              <p className="font-semibold text-[#113826]">We are just getting started.</p>
              <p>
                Donation collection is not active yet. Our first milestone relies strictly on volunteer
                planning, community listening, and ethical preparation—never premature fundraising.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive 4-Step Readiness Roadmap */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {FIRST_GOAL_MILESTONES.map((milestone) => {
              const isSelected = milestone.id === activeMilestone.id;
              return (
                <button
                  key={milestone.id}
                  type="button"
                  onClick={() => setActiveMilestoneId(milestone.id)}
                  className={`w-full text-left p-5 rounded-lg border transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#113826] text-[#FBF9F5] border-[#113826]'
                      : 'bg-[#FBF9F5] text-[#1C1917] border-[#E7E0D2] hover:border-[#113826]/40'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between gap-2 text-xs ${
                      isSelected ? 'text-[#D6CEBE]' : 'text-[#57534E]'
                    }`}
                  >
                    <span className="font-mono font-semibold tabular-nums">
                      Step {milestone.stepNumber}
                    </span>
                    <span>{milestone.statusLabel}</span>
                  </div>
                  <h3
                    className={`mt-1.5 font-serif text-lg font-semibold ${
                      isSelected ? 'text-white' : 'text-[#113826]'
                    }`}
                  >
                    {milestone.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Card */}
          <div className="lg:col-span-7 bg-[#FBF9F5] border border-[#E7E0D2] rounded-lg p-7 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span className="font-mono font-semibold text-[#14532D] tabular-nums">
                Step {activeMilestone.stepNumber} of 04
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeMilestone.statusLabel}</span>
            </div>

            <h3 className="mt-3 font-serif text-2xl lg:text-3xl font-semibold text-[#113826]">
              {activeMilestone.title}
            </h3>

            <p className="mt-4 text-base text-[#44403C] leading-relaxed">
              {activeMilestone.description}
            </p>

            <div className="mt-7 pt-6 border-t border-[#E7E0D2]">
              <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                Readiness Checklist Before Moving Forward
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-[#44403C]">
                {activeMilestone.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-semibold text-[#14532D] mt-0.5 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7E0D2] flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#57534E]">
                Want to help us reach Step 02 through your time and skills?
              </p>
              <button
                type="button"
                onClick={() => onNavigate('volunteer')}
                className="px-4 py-2 text-xs font-semibold text-[#FBF9F5] bg-[#113826] rounded-md hover:bg-[#14532D] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Pledge Volunteer Hours
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
