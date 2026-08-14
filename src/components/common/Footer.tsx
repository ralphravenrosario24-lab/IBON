import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Mail, FileText, ArrowUp, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cyan-900/40 bg-[#020408] relative z-10 pt-16 pb-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cyan-950">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center relative bg-slate-950/60">
                <div className="absolute w-1 h-1 bg-cyan-400 top-0 left-0" />
                <div className="absolute w-1 h-1 bg-cyan-400 bottom-0 right-0" />
                <span className="text-xs font-bold text-cyan-400 font-mono">IB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-display text-white tracking-[0.15em] glow-text">
                  {data.profile.name || 'IBON'}
                </span>
                <span className="text-[9px] font-mono text-cyan-500/80 tracking-widest uppercase">
                  CYBERSECURITY × DESIGN
                </span>
              </div>
            </div>

            <p className="text-cyan-400 font-medium">
              “Building what is seen. Protecting what isn&apos;t.”
            </p>

            <p className="text-slate-500 max-w-md font-sans text-xs sm:text-sm leading-relaxed">
              An ongoing synthesis of cybersecurity engineering, web application architecture,
              human-computer interfaces, and technical research.
            </p>

            {/* Coordinates & Transmission Telemetry */}
            <div className="p-3 bg-slate-950/80 border border-cyan-950 rounded-xs flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-400">
              <span className="text-cyan-400 font-bold">LAT: 40.7128° N</span>
              <span className="text-cyan-400 font-bold">LON: 74.0060° W</span>
              <span className="text-emerald-400">STMT: 200 OK</span>
              <span className="text-slate-500">TLS 1.3 / AES-GCM</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-semibold tracking-wider text-xs mb-4 uppercase text-cyan-400">
              // Direct Index
            </h4>
            <ul className="space-y-2.5">
              {[
                { num: '01', label: 'About Identity', href: '#about' },
                { num: '02', label: 'Technical Matrix', href: '#skills' },
                { num: '03', label: 'Project Registry', href: '#projects' },
                { num: '04', label: 'Experience Timeline', href: '#experience' },
                { num: '05', label: 'Research & Papers', href: '#research' },
                { num: '06', label: 'Certifications', href: '#certifications' },
              ].map((item) => (
                <li key={item.num}>
                  <a href={item.href} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="text-cyan-500/60 text-[10px]">{item.num} //</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold tracking-wider text-xs mb-4 uppercase text-cyan-400">
              // Transmission
            </h4>
            <div className="flex flex-col gap-2.5">
              {data.profile.email && (
                <a
                  href={`mailto:${data.profile.email}`}
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px]">{data.profile.email}</span>
                </a>
              )}
              {data.profile.github && (
                <a
                  href={data.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Registry</span>
                </a>
              )}
              {data.profile.linkedin && (
                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn Network</span>
                </a>
              )}
              <a
                href="#resume"
                className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Curriculum Vitae</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>© 2026 IBON. Built with technical curiosity, precision, and security defense.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-cyan-500/70 text-[10px]">ENCRYPTED TRANSMISSION ESTABLISHED</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors px-2 py-1 bg-slate-900 border border-cyan-900/60 rounded-xs"
              aria-label="Scroll to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
