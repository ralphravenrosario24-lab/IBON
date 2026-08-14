import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ResearchItem } from '../../types';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import {
  FileText,
  BookOpen,
  Calendar,
  ExternalLink,
  Download,
  CheckCircle2,
  X,
  ChevronRight,
  ShieldAlert,
  Search
} from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const { data } = usePortfolio();
  const researchItems = data.research || [];
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'Research' | 'Publication' | 'Technical Paper'>('ALL');

  const filtered =
    filterType === 'ALL'
      ? researchItems
      : researchItems.filter((item) => item.type === filterType);

  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionHeading
          number="05"
          tag="ACADEMICS"
          title="Research & Publications"
          subtitle="Systematic technical investigations, security vulnerability audits, and empirical whitepapers."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 border border-sky-500/20 rounded font-mono text-xs self-start md:self-auto">
          {(['ALL', 'Research', 'Publication', 'Technical Paper'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-xs uppercase transition-colors ${
                filterType === type
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <HudCornerFrame
              tag={item.type.toUpperCase()}
              className="p-6 bg-slate-950/85 hover:border-sky-500/50 transition-all h-full flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                  <span className="text-sky-400 font-medium">{item.category}</span>
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedResearch(item)}
                  className="text-lg font-bold font-display text-white hover:text-sky-300 transition-colors cursor-pointer mb-3 leading-snug"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 font-sans line-clamp-3 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Key Finding highlight badge */}
                {item.findings && (
                  <div className="p-3 bg-sky-950/30 border border-sky-500/20 rounded text-[11px] font-sans text-slate-300 mb-4">
                    <span className="font-mono font-bold text-sky-300 block mb-1 text-[10px] uppercase">
                      // Core Discovery
                    </span>
                    <p className="line-clamp-2 text-slate-300">{item.findings}</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setSelectedResearch(item)}
                  className="text-sky-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>READ ABSTRACT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {item.documentUrl && (
                    <a
                      href={item.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-white"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.publicationLink && (
                    <a
                      href={item.publicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-cyan-300"
                      title="Publication link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </HudCornerFrame>
          </motion.div>
        ))}
      </div>

      {/* Research Detail Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
            <div
              className="fixed inset-0"
              onClick={() => setSelectedResearch(null)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#050914] border border-sky-500/30 rounded-sm p-6 sm:p-8 shadow-2xl z-10 font-sans my-auto"
            >
              <span className="hud-corner-tl" />
              <span className="hud-corner-tr" />
              <span className="hud-corner-bl" />
              <span className="hud-corner-br" />

              {/* Close Button */}
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span className="font-mono text-xs text-sky-300 uppercase font-semibold">
                    {selectedResearch.type} // {selectedResearch.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedResearch(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Body */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-slate-400 mb-2">
                    <span>{selectedResearch.date}</span>
                    <span>•</span>
                    <span>{selectedResearch.role}</span>
                    {selectedResearch.officialSource && (
                      <>
                        <span>•</span>
                        <span className="text-cyan-300">{selectedResearch.officialSource}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white leading-tight">
                    {selectedResearch.title}
                  </h2>
                </div>

                {/* Abstract */}
                <div>
                  <h3 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                    // ABSTRACT & CONTEXT
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedResearch.description}
                  </p>
                </div>

                {/* Methodology */}
                {selectedResearch.methodology && (
                  <div>
                    <h3 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                      // EXPERIMENTAL METHODOLOGY
                    </h3>
                    <div className="p-4 bg-slate-900/90 border border-slate-800 rounded font-sans text-sm text-slate-300 leading-relaxed">
                      {selectedResearch.methodology}
                    </div>
                  </div>
                )}

                {/* Findings */}
                {selectedResearch.findings && (
                  <div>
                    <h3 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                      // EMPIRICAL FINDINGS & CONCLUSIONS
                    </h3>
                    <div className="p-4 bg-sky-950/30 border border-sky-500/30 rounded font-sans text-sm text-slate-200 leading-relaxed flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>{selectedResearch.findings}</div>
                    </div>
                  </div>
                )}

                {/* External Actions */}
                <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-slate-500 text-[11px]">
                    ACADEMIC REPOSITORY // IBON LABS
                  </span>

                  <div className="flex items-center gap-3">
                    {selectedResearch.publicationLink && (
                      <a
                        href={selectedResearch.publicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-sky-500/20 border border-sky-400 text-sky-300 hover:bg-sky-500/30 rounded-xs flex items-center gap-1.5 font-semibold transition-colors"
                      >
                        <span>Official Publication</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
