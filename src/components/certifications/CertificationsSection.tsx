import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Certification, CertCategory } from '../../types';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileCheck,
  X,
  Maximize2,
  Download
} from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { data } = usePortfolio();
  const certs = data.certifications || [];
  const [selectedCategory, setSelectedCategory] = useState<CertCategory>('ALL');
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const categories: CertCategory[] = [
    'ALL',
    'CYBERSECURITY',
    'PROGRAMMING',
    'WEB DEVELOPMENT',
    'DESIGN',
    'OTHER'
  ];

  const filteredCerts =
    selectedCategory === 'ALL'
      ? certs
      : certs.filter((c) => c.category === selectedCategory);

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionHeading
          number="06"
          tag="CREDENTIALS"
          title="Certifications & Coursework"
          subtitle="Formal continuous learning, verified professional credentials, and structured technical specializations."
        />

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none font-mono text-xs self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <HudCornerFrame
              tag={cert.category}
              className="p-6 bg-slate-950/85 hover:border-sky-500/50 transition-all h-full flex flex-col justify-between"
            >
              <div>
                {/* Provider & Date */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-3">
                  <span className="text-sky-400 font-medium">{cert.provider}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {cert.completionDate}
                  </span>
                </div>

                {/* Certificate Title */}
                <h3
                  onClick={() => setActiveCert(cert)}
                  className="text-base sm:text-lg font-bold font-display text-white hover:text-sky-300 transition-colors cursor-pointer mb-1 leading-snug"
                >
                  {cert.certificateTitle}
                </h3>

                <p className="text-xs text-slate-400 font-sans mb-4">
                  {cert.courseTitle}
                </p>

                {/* Credential ID */}
                <div className="p-2 bg-slate-900/80 border border-slate-800/80 rounded font-mono text-[11px] text-slate-300 flex items-center justify-between mb-4">
                  <span className="text-slate-500">ID:</span>
                  <span className="text-cyan-300 tracking-wider select-all">{cert.credentialId}</span>
                </div>

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.map((skill, sIdx) => (
                      <TechBadge key={sIdx} label={skill} variant="cyan" />
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>PREVIEW</span>
                </button>

                {cert.verificationLink && (
                  <a
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </HudCornerFrame>
          </motion.div>
        ))}
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div
              className="fixed inset-0"
              onClick={() => setActiveCert(null)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#050914] border border-sky-500/30 rounded-sm p-6 sm:p-8 shadow-2xl z-10 font-sans my-auto"
            >
              <span className="hud-corner-tl" />
              <span className="hud-corner-tr" />
              <span className="hud-corner-bl" />
              <span className="hud-corner-br" />

              <div className="flex items-center justify-between border-b border-sky-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs text-sky-300 uppercase font-semibold">
                    VERIFIED CREDENTIAL AUDIT // {activeCert.category}
                  </span>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Image if available */}
              {activeCert.certificateImage && (
                <div className="relative w-full aspect-[16/10] rounded overflow-hidden bg-slate-900 border border-sky-500/30 mb-6">
                  <img
                    src={activeCert.certificateImage}
                    alt={activeCert.certificateTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30" />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {activeCert.certificateTitle}
                  </h3>
                  <p className="text-sm text-slate-400">{activeCert.courseTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/80 border border-slate-800 rounded font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Issuing Body</span>
                    <span className="text-white font-medium">{activeCert.provider}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Completion Date</span>
                    <span className="text-white font-medium">{activeCert.completionDate}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px] uppercase">Credential ID</span>
                    <span className="text-cyan-300 font-bold select-all">{activeCert.credentialId}</span>
                  </div>
                </div>

                {activeCert.skills && (
                  <div>
                    <span className="font-mono text-xs text-slate-400 block mb-2">
                      // COMPETENCIES CERTIFIED
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCert.skills.map((s, idx) => (
                        <TechBadge key={idx} label={s} variant="cyan" />
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> AUTHENTICATED RECORD
                  </span>

                  {activeCert.verificationLink && (
                    <a
                      href={activeCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-sky-500/20 border border-sky-400 text-sky-300 hover:bg-sky-500/30 rounded-xs flex items-center gap-1.5 font-bold transition-colors"
                    >
                      <span>VERIFY CREDENTIAL</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
