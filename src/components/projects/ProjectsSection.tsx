import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, ProjectCategory } from '../../types';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  LayoutGrid,
  Maximize2,
  Sparkles,
  Shield,
  Code,
  FileText,
  Download,
  FileCheck2
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const categories: ProjectCategory[] = [
    'ALL',
    'CYBERSECURITY',
    'RESEARCH',
    'PUBLICATIONS',
    'GRAPHIC DESIGN',
    'WEB DESIGN',
    'PROGRAMMING'
  ];

  const projects = data.projects || [];
  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'carousel' || filteredProjects.length === 0) return;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, filteredProjects.length]);

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  // Touch and Drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragStartX(clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX =
      'changedTouches' in e
        ? e.changedTouches[0].clientX
        : (e as React.MouseEvent).clientX;
    const diff = clientX - dragStartX;

    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <SectionHeading
          number="03"
          tag="REGISTRY"
          title="Featured Projects & Work"
          subtitle="Explore interactive prototypes, security utilities, design systems, and published research with deep technical breakdowns."
        />

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 border border-sky-500/20 rounded font-mono text-xs self-start md:self-auto shrink-0">
          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-colors ${
              viewMode === 'carousel'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CAROUSEL</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-colors ${
              viewMode === 'grid'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>GRID VIEW</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-10 scrollbar-none font-mono text-xs">
        {categories.map((cat) => {
          const count =
            cat === 'ALL'
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xs tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-sky-500/25 text-sky-200 border border-sky-400 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-950/70 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{cat}</span>
              <span className="text-[10px] text-slate-500 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* No results notice */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center bg-slate-950/60 border border-slate-800 rounded-sm font-mono text-sm text-slate-400">
          No projects registered in category [{selectedCategory}]
        </div>
      )}

      {/* CAROUSEL VIEW */}
      {viewMode === 'carousel' && filteredProjects.length > 0 && (
        <div className="relative">
          {/* Carousel container with drag/swipe support */}
          <div
            className="overflow-hidden py-6 cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
          >
            <div className="flex items-center justify-center min-h-[440px] sm:min-h-[480px]">
              {filteredProjects.map((project, index) => {
                const isCenter = index === currentIndex;
                const isPrev =
                  index ===
                  (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
                const isNext = index === (currentIndex + 1) % filteredProjects.length;

                // Only render active, prev, next for performance and 3D feel
                if (!isCenter && !isPrev && !isNext && filteredProjects.length > 3) {
                  return null;
                }

                let positionClasses = 'opacity-0 pointer-events-none scale-75 absolute';
                if (isCenter) {
                  positionClasses =
                    'z-30 opacity-100 scale-100 relative max-w-2xl w-full';
                } else if (isPrev) {
                  positionClasses =
                    'z-10 opacity-40 scale-85 hidden md:block absolute -translate-x-[65%] pointer-events-auto hover:opacity-75 max-w-xl w-full';
                } else if (isNext) {
                  positionClasses =
                    'z-10 opacity-40 scale-85 hidden md:block absolute translate-x-[65%] pointer-events-auto hover:opacity-75 max-w-xl w-full';
                }

                return (
                  <motion.div
                    key={project.id}
                    layout
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`transition-all duration-400 ${positionClasses}`}
                    onClick={() => {
                      if (!isCenter) {
                        setCurrentIndex(index);
                      }
                    }}
                  >
                    <HudCornerFrame
                      tag={`${project.category} // ${project.year || '2026'}`}
                      glow={isCenter}
                      className="p-5 sm:p-6 bg-slate-950/95 transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Preview */}
                        <div
                          className="relative w-full aspect-video rounded-xs overflow-hidden bg-slate-900 border border-sky-500/20 mb-4 group cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                        >
                          <img
                            src={project.thumbnail || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Inspect overlay on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/50 transition-opacity backdrop-blur-xs">
                            <span className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-xs flex items-center gap-1.5 shadow-lg">
                              <Maximize2 className="w-3.5 h-3.5" /> INSPECT ARTIFACT
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-0.5 bg-slate-950/80 border border-sky-500/40 text-sky-300 font-mono text-[10px] uppercase rounded-xs backdrop-blur-md">
                              {project.status}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="text-lg sm:text-xl font-bold font-display text-white hover:text-sky-300 transition-colors cursor-pointer mb-2"
                        >
                          {project.title}
                        </h3>

                        <p className="text-slate-400 text-xs sm:text-sm font-sans line-clamp-2 leading-relaxed mb-4">
                          {project.shortDescription}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.technologies?.slice(0, 4).map((tech, tIdx) => (
                            <TechBadge key={tIdx} label={tech} variant="cyan" />
                          ))}
                          {(project.technologies?.length || 0) > 4 && (
                            <span className="text-[10px] font-mono text-slate-500 self-center">
                              +{(project.technologies?.length || 0) - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Action footer */}
                      <div className="pt-3 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="text-sky-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-semibold"
                        >
                          <span>VIEW DETAILS</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2">
                          {(project.documentUrl || project.links?.documentUrl) && (
                            <a
                              href={project.documentUrl || project.links?.documentUrl}
                              download={project.documentName || `${project.title.replace(/\s+/g, '_')}_Research.pdf`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyan-400 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 p-1.5 rounded transition-all flex items-center gap-1 text-[11px] font-mono"
                              title={project.documentName || "Download Research Document"}
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">PAPER</span>
                            </a>
                          )}
                          {project.links?.research && (
                            <a
                              href={project.links.research}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-teal-400 hover:text-teal-200 p-1"
                              title="Research Link / Paper"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-white p-1"
                              title="Source code"
                            >
                              <Code className="w-4 h-4" />
                            </a>
                          )}
                          {project.links?.liveDemo && (
                            <a
                              href={project.links.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-cyan-300 p-1"
                              title="Live preview"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </HudCornerFrame>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="font-mono text-xs text-slate-400">
              <span className="text-sky-400 font-bold">{currentIndex + 1}</span> /{' '}
              <span>{filteredProjects.length}</span> PROJECTS
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-sm bg-slate-900 border border-sky-500/30 text-slate-300 hover:text-white hover:border-sky-400 hover:bg-sky-950/40 transition-all"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-sm bg-slate-900 border border-sky-500/30 text-slate-300 hover:text-white hover:border-sky-400 hover:bg-sky-950/40 transition-all"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <HudCornerFrame
              key={project.id}
              tag={project.category}
              className="p-5 bg-slate-950/80 hover:border-sky-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="relative w-full aspect-video rounded-xs overflow-hidden bg-slate-900 border border-sky-500/20 mb-4 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.thumbnail || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 bg-slate-950/80 border border-sky-500/30 text-sky-300 font-mono text-[10px] uppercase rounded-xs">
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3
                  onClick={() => setSelectedProject(project)}
                  className="text-base font-bold font-display text-white hover:text-sky-300 transition-colors cursor-pointer mb-2"
                >
                  {project.title}
                </h3>

                <p className="text-slate-400 text-xs font-sans line-clamp-2 leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies?.slice(0, 3).map((tech, idx) => (
                    <TechBadge key={idx} label={tech} variant="cyan" />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-sky-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <span>INSPECT</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <div className="flex items-center gap-2">
                  {(project.documentUrl || project.links?.documentUrl) && (
                    <a
                      href={project.documentUrl || project.links?.documentUrl}
                      download={project.documentName || `${project.title.replace(/\s+/g, '_')}_Research.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-cyan-400 hover:text-cyan-200 bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 px-2 py-0.5 rounded transition-all flex items-center gap-1 text-[10px]"
                      title="Download Research Document"
                    >
                      <Download className="w-3 h-3" />
                      <span>DOC</span>
                    </a>
                  )}
                  <span className="text-[10px] text-slate-500">{project.year || '2026'}</span>
                </div>
              </div>
            </HudCornerFrame>
          ))}
        </div>
      )}
    </section>
  );
};
