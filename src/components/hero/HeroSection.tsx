import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Eye, ShieldAlert, Sparkles, Layers, Terminal, Lock, ChevronRight } from 'lucide-react';
import { HudCornerFrame, SystemStatusPill } from '../common/HudElements';

export const HeroSection: React.FC = () => {
  const { data } = usePortfolio();
  const [lensMode, setLensMode] = useState<'seen' | 'unseen'>('seen');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden z-10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-sky-600/15 via-cyan-500/10 to-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Technical Identifier */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass-panel"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-cyan-400 uppercase">
            IDENTITY PROTOCOL LOADED // {data.profile.heroHeadline || 'IBON'}
          </span>
        </motion.div>

        {/* The Core Hero Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-2 mb-6"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.05] sm:leading-[1]">
            <span className="block">
              BUILDING WHAT IS{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 glow-text-cyan">
                SEEN.
              </span>
            </span>
            <span className="block mt-2">
              PROTECTING WHAT{' '}
              <span className="italic font-light text-slate-200">
                ISN&apos;T.
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-400 font-normal max-w-3xl leading-relaxed mb-8 font-sans border-l-2 border-cyan-900/50 pl-4 py-1 sm:border-l-0 sm:pl-0"
        >
          {data.profile.heroSubheadline || 'Cybersecurity × Digital Design × Web Development × Research'}
        </motion.p>

        {/* Interactive Dual-Paradigm Switch: What is Seen vs What Isn't Seen */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mb-10"
        >
          <HudCornerFrame className="p-4 sm:p-6 text-left transition-all glass-panel" glow={true}>
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="tracking-wider uppercase text-[11px] font-bold">IBON DUAL-LENS ARCHITECTURE</span>
              </div>
              <div className="flex items-center bg-slate-900/90 border border-cyan-900/60 rounded-xs p-0.5">
                <button
                  onClick={() => setLensMode('seen')}
                  className={`px-3 py-1 text-[10px] font-mono rounded-xs transition-all flex items-center gap-1.5 ${
                    lensMode === 'seen'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>01 // THE SEEN</span>
                </button>
                <button
                  onClick={() => setLensMode('unseen')}
                  className={`px-3 py-1 text-[10px] font-mono rounded-xs transition-all flex items-center gap-1.5 ${
                    lensMode === 'unseen'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>02 // THE UNSEEN</span>
                </button>
              </div>
            </div>

            {lensMode === 'seen' ? (
              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>[VISUAL LAYER] Human Interfaces, Aesthetics & Interaction</span>
                </div>
                <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed">
                  Crafting refined user experiences, responsive component design systems, typography hierarchy, fluid motion, and accessible web interfaces.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-slate-700 text-[10px] text-slate-300">Figma & UI Systems</span>
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-slate-700 text-[10px] text-slate-300">React 19 & Tailwind</span>
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-slate-700 text-[10px] text-slate-300">WCAG 2.1 AA Accessibility</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>[DEFENSE LAYER] Infrastructure, Cryptography & Systems</span>
                </div>
                <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed">
                  Conducting network vulnerability audits, secure authentication protocols, threat modeling (STRIDE/OWASP), and packet-level inspection.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-cyan-500/30 text-[10px] text-cyan-300">Network Threat Hunting</span>
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-cyan-500/30 text-[10px] text-cyan-300">AES-GCM & Zero-Trust</span>
                  <span className="px-2.5 py-0.5 bg-slate-800/60 border border-cyan-500/30 text-[10px] text-cyan-300">Incident Triage & Audits</span>
                </div>
              </div>
            )}
          </HudCornerFrame>
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-widest uppercase transition-all electric-border rounded-xs flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,242,255,0.3)]"
          >
            <span>EXPLORE WORK</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#resume"
            className="w-full sm:w-auto px-8 py-3.5 border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs tracking-widest uppercase transition-all rounded-xs flex items-center justify-center gap-2"
          >
            <span>VIEW RESUME</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <a
          href="#about"
          className="p-2 rounded-full border border-sky-500/20 text-sky-400 hover:text-cyan-300 hover:border-sky-400 transition-colors animate-bounce"
          aria-label="Scroll down to About"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
};
