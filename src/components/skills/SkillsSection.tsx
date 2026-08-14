import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import { Shield, Terminal, Globe, Palette, FileText, Cpu, Check, Layers } from 'lucide-react';
import { SkillCategory } from '../../types';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const skillsCategories = data.skills || [];
  const [selectedCatId, setSelectedCatId] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'shield':
        return <Shield className="w-4 h-4 text-sky-400" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-sky-300" />;
      case 'palette':
        return <Palette className="w-4 h-4 text-indigo-400" />;
      case 'filetext':
        return <FileText className="w-4 h-4 text-teal-400" />;
      default:
        return <Cpu className="w-4 h-4 text-sky-400" />;
    }
  };

  const filteredCategories =
    selectedCatId === 'all'
      ? skillsCategories
      : skillsCategories.filter((c) => c.id === selectedCatId);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        number="02"
        tag="CAPABILITIES"
        title="Technical Skills & Disciplines"
        subtitle="Organized across cybersecurity, engineering, design, and research. Grounded in hands-on application rather than arbitrary metrics."
      />

      {/* Category Tab Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCatId('all')}
          className={`px-3.5 py-1.5 rounded-xs text-xs font-mono tracking-wider uppercase transition-all ${
            selectedCatId === 'all'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
              : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          ALL DISCIPLINES ({skillsCategories.length})
        </button>

        {skillsCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCatId(category.id)}
            className={`px-3.5 py-1.5 rounded-xs text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              selectedCatId === category.id
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {getIcon(category.iconName)}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <HudCornerFrame
              tag={category.name}
              className="p-6 bg-slate-950/80 hover:border-sky-500/40 transition-all h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded bg-sky-950/50 border border-sky-500/30">
                    {getIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Individual Skill Items */}
                <div className="space-y-3 font-mono">
                  {category.skills &&
                    category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-slate-200 font-medium">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-xs border ${
                              skill.level === 'Advanced'
                                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                                : skill.level === 'Proficient' || skill.level === 'Core Knowledge'
                                ? 'bg-sky-950/60 border-sky-500/40 text-sky-300'
                                : 'bg-slate-800/80 border-slate-700 text-slate-300'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        {/* Tool tags */}
                        {skill.tools && skill.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skill.tools.map((tool, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded-xs border border-slate-800"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Bottom footer status in card */}
              <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>{category.skills?.length || 0} TRACKED CAPABILITIES</span>
                <span className="text-sky-400/80">VERIFIED</span>
              </div>
            </HudCornerFrame>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
