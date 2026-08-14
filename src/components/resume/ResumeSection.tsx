import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeading, HudCornerFrame, TechBadge } from '../common/HudElements';
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { data } = usePortfolio();
  const resume = data.resume;
  const profile = data.profile;
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (resume.pdfUrl && resume.pdfUrl.startsWith('http')) {
      window.open(resume.pdfUrl, '_blank');
      return;
    }

    // Generate clean text/markdown/html printable document
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${profile.name} — Curriculum Vitae (STEM Researcher & Tech Leader)</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111827; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { margin: 0 0 4px 0; font-size: 26px; letter-spacing: -0.5px; text-transform: uppercase; }
          .contact-bar { font-size: 12.5px; color: #374151; margin-bottom: 20px; border-bottom: 1.5px solid #0284c7; padding-bottom: 10px; }
          h2 { font-size: 15px; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #0284c7; padding-bottom: 4px; margin-top: 22px; margin-bottom: 10px; letter-spacing: 0.5px; }
          p { font-size: 13.5px; margin: 0 0 8px 0; color: #374151; }
          ul { margin: 0; padding-left: 20px; font-size: 13px; color: #374151; }
          li { margin-bottom: 5px; }
          .badge { display: inline-block; background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; padding: 2px 7px; border-radius: 4px; font-size: 11.5px; margin: 2px; }
          .entry-header { display: flex; justify-content: space-between; font-weight: 600; font-size: 13.5px; color: #111827; }
          .entry-sub { font-size: 12.5px; color: #0284c7; margin-bottom: 4px; font-weight: 500; }
        </style>
      </head>
      <body>
        <h1>${profile.name}</h1>
        <div class="contact-bar">
          ${profile.location} • 09519998281 • ${profile.email} • LinkedIn
        </div>

        <h2>Education</h2>
        ${resume.education
          .map(
            (edu) => `
          <div style="margin-bottom: 14px;">
            <div class="entry-header">
              <span>${edu.institution}</span>
              <span>${edu.period}</span>
            </div>
            <div class="entry-sub">${edu.degree}</div>
            ${edu.details ? `<p style="font-size: 12.5px; margin: 0; color: #4b5563;">${edu.details}</p>` : ''}
            ${edu.gpaOrFocus ? `<p style="font-size: 12px; color: #0369a1; font-weight: 500; margin-top: 2px;">${edu.gpaOrFocus}</p>` : ''}
          </div>
        `
          )
          .join('')}

        <h2>Academic Projects & Hands-On Experience</h2>
        ${data.experiences
          .filter((e) => e.position === 'Research Leader')
          .map(
            (e) => `
          <div style="margin-bottom: 14px;">
            <div class="entry-header">
              <span>“${e.organization}”</span>
              <span>${e.date}</span>
            </div>
            <div class="entry-sub">${e.position} — ${e.location}</div>
            <ul>
              ${e.description.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `
          )
          .join('')}

        <h2>Leadership & Extracurricular Activities</h2>
        ${data.experiences
          .filter((e) => e.position !== 'Research Leader')
          .map(
            (e) => `
          <div style="margin-bottom: 14px;">
            <div class="entry-header">
              <span>${e.organization}</span>
              <span>${e.date}</span>
            </div>
            <div class="entry-sub">${e.position} — ${e.location}</div>
            <ul>
              ${e.description.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        `
          )
          .join('')}

        <h2>Skills & Certifications</h2>
        <div style="margin-bottom: 12px;">
          ${resume.coreCompetencies.map((c) => `<span class="badge">${c}</span>`).join(' ')}
        </div>
        <p style="font-size: 12px; color: #4b5563;">
          <strong>Certifications & Training:</strong> English for IT 1, Python Essentials, Cybersecurity Fundamentals, Computer Systems Services, Installing and Configuring Systems, Maintaining Computer Systems and Network, Setting Up Computer Networks, & Setting up Computer Servers.<br/>
          <strong>Languages:</strong> English (Proficient), Filipino (Native).
        </p>

        <div style="margin-top: 24px; font-size: 11px; color: #9ca3af; text-align: center;">
          Curriculum Vitae — ${profile.name} // Last Updated: ${resume.lastUpdated}
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        number="07"
        tag="CURRICULUM VITAE"
        title="Resume & Qualifications"
        subtitle="A distilled summary of academic trajectory, cybersecurity proficiencies, frontend capabilities, and verified coursework."
      />

      <div className="max-w-4xl mx-auto">
        <HudCornerFrame
          tag="DOCUMENT // CV_2026"
          glow={true}
          className="p-6 sm:p-10 bg-slate-950/95"
        >
          {/* Top Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-sky-500/20 gap-4">
            <div>
              <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider block mb-1">
                OFFICIAL DOSSIER // CURRICULUM VITAE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                {profile.name} — Curriculum Vitae
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-1">
                LAST UPDATED: <span className="text-cyan-300 font-bold">{resume.lastUpdated || 'August 2026'}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PDF</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xs bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT</span>
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="space-y-8 font-sans">
            {/* Summary */}
            <div>
              <h4 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                // PROFESSIONAL & ACADEMIC OBJECTIVE
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {resume.summary}
              </p>
            </div>

            {/* Education */}
            <div>
              <h4 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                // EDUCATION & ACADEMIC BACKGROUND
              </h4>
              <div className="space-y-4">
                {resume.education?.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded bg-slate-900/70 border border-slate-800 font-sans"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h5 className="font-bold text-white text-sm">
                        {edu.institution}
                      </h5>
                      <span className="font-mono text-xs text-sky-400">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300 mb-2">
                      {edu.degree}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {edu.details}
                    </p>
                    {edu.gpaOrFocus && (
                      <p className="text-[11px] font-mono text-slate-500 mt-2">
                        {edu.gpaOrFocus}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Projects & Research Experience */}
            <div>
              <h4 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                // ACADEMIC PROJECTS & HANDS-ON EXPERIENCE
              </h4>
              <div className="space-y-4">
                {data.experiences
                  .filter((e) => e.position === 'Research Leader')
                  .map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded bg-slate-900/70 border border-slate-800 font-sans"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h5 className="font-bold text-white text-sm">
                          “{exp.organization}”
                        </h5>
                        <span className="font-mono text-xs text-sky-400">
                          {exp.date}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-cyan-300 mb-2">
                        {exp.position} • {exp.location}
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                        {exp.description.map((desc, dIdx) => (
                          <li key={dIdx} className="leading-relaxed">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>

            {/* Leadership & Extracurricular Activities */}
            <div>
              <h4 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                // LEADERSHIP & EXTRACURRICULAR ACTIVITIES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.experiences
                  .filter((e) => e.position !== 'Research Leader')
                  .map((lead, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded bg-slate-900/60 border border-slate-800/80 font-sans"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h5 className="font-bold text-white text-xs">
                          {lead.organization}
                        </h5>
                        <span className="font-mono text-[11px] text-sky-400">
                          {lead.date}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300 mb-2">
                        {lead.position}
                      </div>
                      <p className="text-[11.5px] text-slate-400 line-clamp-3 leading-relaxed">
                        {lead.description[0]}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                // SKILLS, CERTIFICATIONS & LANGUAGES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                {resume.coreCompetencies?.map((comp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-slate-900/60 border border-slate-800/80 rounded"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-300">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Footer inside frame */}
          <div className="mt-8 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-500">
            <span>DIGITAL RECORD AUTHENTICATED // NO HARDCODED CONSTRAINTS</span>
            <span className="text-sky-400">DOC_HASH // SHA-256 VERIFIED</span>
          </div>
        </HudCornerFrame>
      </div>
    </section>
  );
};
