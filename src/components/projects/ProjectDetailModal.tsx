import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';
import { HudCornerFrame, TechBadge } from '../common/HudElements';
import {
  X,
  ExternalLink,
  Github,
  FileText,
  Calendar,
  User,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle2,
  Download,
  BookOpen,
  FileCheck2
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const images =
    project.images && project.images.length > 0
      ? project.images
      : project.thumbnail
      ? [project.thumbnail]
      : [];

  const researchDoc = project.documentUrl || project.links?.documentUrl;
  const researchLink = project.links?.research || project.links?.publication;
  const researchName = project.documentName || project.links?.documentName || (project.category === 'RESEARCH' ? 'Official Research Paper & Documentation' : 'Research & Technical Specification Document');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl">
        {/* Backdrop Click */}
        <div
          className="fixed inset-0"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#050914] border border-sky-500/30 rounded-sm shadow-[0_0_50px_rgba(14,165,233,0.2)] overflow-hidden z-10 font-sans my-auto"
        >
          {/* HUD Corner Brackets */}
          <span className="hud-corner-tl" />
          <span className="hud-corner-tr" />
          <span className="hud-corner-bl" />
          <span className="hud-corner-br" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-sky-500/20 bg-slate-950/90 shrink-0">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-sky-950 border border-sky-500/30 text-sky-300 font-mono text-xs uppercase font-semibold">
                {project.category}
              </span>
              <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                ID // {project.id}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-sky-400 transition-colors"
              aria-label="Close Project Details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Title & Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" /> {project.date || project.year}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-sky-400" /> {project.role}
                </span>
                <span>•</span>
                <span
                  className={`px-2 py-0.2 rounded-xs border text-[11px] ${
                    project.status === 'Active Defense' || project.status === 'Published'
                      ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
                      : 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
                  }`}
                >
                  STATUS: {project.status}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {project.title}
              </h2>
            </div>

            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-slate-950 border border-sky-500/30 group">
                  <img
                    src={images[activeImageIndex]}
                    alt={`${project.title} preview ${activeImageIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain object-center bg-slate-950/90"
                  />

                  {/* Navigation arrows for gallery */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-slate-950/80 border border-sky-500/30 text-white hover:bg-sky-500/20 hover:border-sky-400 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-slate-950/80 border border-sky-500/30 text-white hover:bg-sky-500/20 hover:border-sky-400 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails row */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-xs overflow-hidden border shrink-0 transition-all ${
                          activeImageIndex === idx
                            ? 'border-cyan-400 ring-2 ring-cyan-500/30'
                            : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt="thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* RESEARCH DOCUMENT / WHITEPAPER FEATURED BANNER */}
            {(researchDoc || researchLink) && (
              <div className="p-4 sm:p-5 rounded-xs border border-cyan-500/50 bg-[#071328]/95 shadow-[0_0_25px_rgba(0,242,255,0.1)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded bg-cyan-950/90 border border-cyan-500/40 text-cyan-400 shrink-0 mt-0.5">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                          {project.documentType || (researchDoc?.startsWith('data:') ? 'DOCUMENT ATTACHED' : 'RESEARCH ARTIFACT')}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          RESEARCH & TECHNICAL WHITEPAPER
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                        {researchName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Access the primary empirical analysis, methodology, and technical findings.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    {researchDoc && (
                      <a
                        href={researchDoc}
                        download={project.documentName || `${project.title.replace(/\s+/g, '_')}_Research.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:scale-102"
                      >
                        <Download className="w-4 h-4" />
                        <span>OPEN / DOWNLOAD DOCUMENT</span>
                      </a>
                    )}
                    {researchLink && researchLink !== '#' && (
                      <a
                        href={researchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>RESEARCH LINK</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Overview & Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase mb-2">
                    // OVERVIEW & OBJECTIVE
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {project.fullDescription || project.shortDescription}
                  </p>
                </div>

                {project.process && (
                  <div>
                    <h3 className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase mb-2">
                      // ENGINEERING & DESIGN PROCESS
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {project.process}
                    </p>
                  </div>
                )}

                {project.outcome && (
                  <div>
                    <h3 className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase mb-2">
                      // EVALUATION & MEASURED OUTCOME
                    </h3>
                    <div className="p-3 bg-slate-900/80 border border-slate-800 rounded font-sans text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{project.outcome}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar: Tech & Links */}
              <div className="space-y-6">
                {/* Tech Stack */}
                <div>
                  <h3 className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase mb-2.5">
                    // TECHNOLOGIES USED
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech, idx) => (
                      <TechBadge key={idx} label={tech} variant="cyan" />
                    ))}
                  </div>
                </div>

                {/* Skills Exercised */}
                {project.skills && project.skills.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase mb-2.5">
                      // COMPETENCIES
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.map((skill, idx) => (
                        <TechBadge key={idx} label={skill} variant="gray" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Links */}
                <div>
                  <h3 className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase mb-2.5">
                    // EXTERNAL ARTIFACTS
                  </h3>
                  <div className="space-y-2 font-mono text-xs">
                    {researchDoc && (
                      <a
                        href={researchDoc}
                        download={project.documentName || `${project.title.replace(/\s+/g, '_')}_Document.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded bg-cyan-950/60 border border-cyan-500/50 hover:bg-cyan-950 text-cyan-300 hover:text-white transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" /> 
                          <span>Research Document (PDF/File)</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      </a>
                    )}
                    {project.links?.research && (
                      <a
                        href={project.links.research}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-teal-400" /> Research Whitepaper
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Github className="w-4 h-4 text-sky-400" /> Source Repository
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}
                    {project.links?.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-cyan-400" /> Live Interactive Demo
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}
                    {project.links?.officialWebsite && (
                      <a
                        href={project.links.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-indigo-400" /> Project Website
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
