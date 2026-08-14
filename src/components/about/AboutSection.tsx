import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeading, HudCornerFrame } from '../common/HudElements';
import { Compass, Shield, Cpu, Sparkles, Terminal, MapPin, Mail, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data.profile;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        number="01"
        tag="ABOUT"
        title="Who I Am & What I Do"
        subtitle="Bridging the visible artistry of digital experiences with the unseen rigor of defensive systems engineering."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Futuristic Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Ambient behind avatar */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-sky-500/20 via-cyan-500/10 to-indigo-500/20 blur-lg rounded-sm" />

            <HudCornerFrame
              tag="IDENTITY // ROSARIO"
              glow={true}
              className="p-3 bg-[#070e1c]/90 overflow-hidden glass-panel"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden bg-slate-950 border border-cyan-500/40">
                <img
                  src={profile.avatarUrl || '/avatar.jpg'}
                  alt={`${profile.name} Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Technical status banner across bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 pt-10 font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2ff]" />
                    <span className="text-white font-bold tracking-wide">{profile.name}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    OPERATOR // ACTIVE
                  </span>
                </div>
              </div>

              {/* Profile Telemetry Sub-panel */}
              <div className="mt-3 p-3 bg-slate-950/90 border border-cyan-950 rounded font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-sky-400" /> LOCATION
                  </span>
                  <span className="text-slate-200">{profile.location || 'Global / Remote'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-sky-400" /> FOCUS
                  </span>
                  <span className="text-cyan-300">Cybersecurity & Design</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-sky-400" /> STATUS
                  </span>
                  <span className="text-emerald-400">Active Learner / Building</span>
                </div>
              </div>
            </HudCornerFrame>
          </div>
        </motion.div>

        {/* Right Column: Biography & Currently Exploring */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Bio text block */}
          <div className="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            {profile.bio && profile.bio.length > 0 ? (
              profile.bio.map((paragraph, index) => (
                <p key={index} className="text-slate-300 font-normal">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>
                Undergraduate student and emerging practitioner passionate about offensive & defensive cybersecurity, web architecture, and digital design.
              </p>
            )}
          </div>

          {/* Currently Exploring Section */}
          <div className="pt-4 border-t border-sky-500/15">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '12s' }} />
              <h3 className="text-sm font-mono font-bold tracking-widest text-sky-300 uppercase">
                CURRENTLY EXPLORING & EXPERIMENTING
              </h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 font-sans">
              Active areas of study, ongoing hands-on lab experimentation, and technical investigation:
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.currentlyExploring && profile.currentlyExploring.length > 0 ? (
                profile.currentlyExploring.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border border-sky-500/25 hover:border-sky-400/60 rounded text-xs font-mono text-slate-200 transition-all duration-200 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{tag}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 font-mono">No exploration tags listed</span>
              )}
            </div>
          </div>

          {/* Core Philosophy Callout */}
          <HudCornerFrame className="p-5 bg-gradient-to-r from-sky-950/30 to-slate-950 border-sky-500/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase mb-1">
                  CORE PHILOSOPHY: PROGRESS THROUGH DISCIPLINE
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  I approach technology not by making overstated claims, but through measurable practice: auditing protocols, crafting accessible code, testing vulnerabilities in controlled sandboxes, and learning from failure.
                </p>
              </div>
            </div>
          </HudCornerFrame>
        </motion.div>
      </div>
    </section>
  );
};
