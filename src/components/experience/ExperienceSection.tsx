import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';
import { Experience } from '../../types';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const experiences = data.experiences || [];
  const [activeExpId, setActiveExpId] = useState<string>(experiences[0]?.id || '');

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        number="04"
        tag="TIMELINE"
        title="Experience & Technical Roles"
        subtitle="Practical journey through cybersecurity operations, frontend architecture, and student leadership."
      />

      <div className="relative mt-16">
        {/* Glowing Center Line for Desktop / Left Line for Mobile */}
        <div
          className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500 via-cyan-400 to-sky-500/20 shadow-[0_0_15px_#38bdf8]"
          aria-hidden="true"
        />

        {/* Experience Entries */}
        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeExpId === exp.id;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => setActiveExpId(exp.id)}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node Orb */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#050914] border-2 transition-all duration-300 flex items-center justify-center z-20 ${
                    isActive
                      ? 'border-cyan-400 shadow-[0_0_20px_#38bdf8] scale-110'
                      : 'border-sky-500/40 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isActive ? 'bg-cyan-400' : 'bg-sky-500/40'
                    }`}
                  />
                </div>

                {/* Content Card Container */}
                <div
                  className={`w-full md:w-[calc(50%-40px)] pl-12 md:pl-0 ${
                    isEven ? 'md:pr-0 md:text-left' : 'md:pl-0 md:text-left'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                  >
                    <HudCornerFrame
                      tag={exp.current ? 'ACTIVE ENGAGEMENT' : 'COMPLETED'}
                      glow={isActive}
                      className={`p-6 bg-slate-950/90 transition-all ${
                        isActive ? 'border-sky-400/60 shadow-[0_0_30px_rgba(14,165,233,0.2)]' : ''
                      }`}
                    >
                      {/* Organization & Title */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider block">
                            {exp.organization}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
                            {exp.position}
                          </h3>
                        </div>

                        {exp.current && (
                          <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] uppercase rounded-xs shrink-0">
                            Present
                          </span>
                        )}
                      </div>

                      {/* Date & Location */}
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400 mb-4 pb-3 border-b border-slate-900">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          {exp.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description Bullet points */}
                      <ul className="space-y-2 mb-5 text-xs sm:text-sm text-slate-300 font-sans">
                        {exp.description?.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Tags */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                          {exp.skills.map((skill, sIdx) => (
                            <TechBadge key={sIdx} label={skill} variant="cyan" />
                          ))}
                        </div>
                      )}

                      {/* External Link */}
                      {exp.externalLink && (
                        <div className="mt-4 text-right">
                          <a
                            href={exp.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-sky-400 hover:text-cyan-300 transition-colors"
                          >
                            <span>Official Reference</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </HudCornerFrame>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
