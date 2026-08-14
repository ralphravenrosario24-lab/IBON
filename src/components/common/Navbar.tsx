import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, Shield, Lock, Unlock, ExternalLink, Terminal } from 'lucide-react';
import { SystemStatusPill } from './HudElements';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { data, isAdmin } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { num: '01', name: 'HOME', href: '#hero' },
    { num: '02', name: 'ABOUT', href: '#about' },
    { num: '03', name: 'SKILLS', href: '#skills' },
    { num: '04', name: 'WORK', href: '#projects' },
    { num: '05', name: 'EXP', href: '#experience' },
    { num: '06', name: 'RESEARCH', href: '#research' },
    { num: '07', name: 'CERTS', href: '#certifications' },
    { num: '08', name: 'RESUME', href: '#resume' },
    { num: '09', name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'research', 'certifications', 'resume', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020408]/90 backdrop-blur-md border-b border-cyan-900/40 py-3 shadow-lg shadow-black/60'
          : 'bg-transparent py-5 border-b border-cyan-900/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#hero"
          className="flex items-center gap-3 group select-none"
          aria-label="IBON Home"
        >
          <div className="w-8 h-8 border border-cyan-400 flex items-center justify-center relative bg-slate-950/60">
            <div className="absolute w-1 h-1 bg-cyan-400 top-0 left-0" />
            <div className="absolute w-1 h-1 bg-cyan-400 bottom-0 right-0" />
            <span className="text-xs font-bold text-cyan-400 font-mono">IB</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-[0.2em] text-white glow-text font-display">
              {data.profile.name || 'IBON'}
            </span>
            <span className="text-[9px] font-mono text-cyan-500/80 tracking-widest uppercase">
              CYBERSECURITY × DESIGN
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with 01 // format */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 border-b border-cyan-400 pb-1 font-semibold'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                <span>{link.num} // {link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right action bar: System Status + Admin Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3.5 py-1 glass-panel rounded-full">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2ff]" />
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
              {data.profile.systemStatus || 'SYSTEM STATUS: ONLINE'}
            </span>
          </div>

          <button
            onClick={onOpenAdmin}
            title={isAdmin ? 'Admin Dashboard (Active)' : 'Admin Authentication'}
            className={`px-3 py-1.5 rounded-sm border transition-all text-xs flex items-center gap-1.5 font-mono ${
              isAdmin
                ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 electric-border'
                : 'bg-slate-900/60 border-cyan-900/40 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/60'
            }`}
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-semibold">ADMIN</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[11px]">ADMIN</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded border font-mono text-xs ${
              isAdmin ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-cyan-900/40 text-slate-400'
            }`}
            aria-label="Admin settings"
          >
            {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-900/90 border border-cyan-900/40 rounded-sm focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#020408]/98 border-b border-cyan-900/40 px-5 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-3 font-mono text-sm">
            <div className="pb-3 mb-1 border-b border-cyan-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] text-cyan-400 font-mono">STATUS: ONLINE</span>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded hover:bg-cyan-950/40 text-slate-300 hover:text-cyan-300 border-l-2 border-transparent hover:border-cyan-400 transition-all flex items-center justify-between font-mono text-xs"
              >
                <span>{link.name}</span>
                <span className="text-cyan-500/60 text-[11px]">{link.num} //</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
