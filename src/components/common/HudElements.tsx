import React, { ReactNode } from 'react';

interface HudCornerFrameProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  cornerColor?: string;
  tag?: string;
  onClick?: () => void;
  id?: string;
}

export const HudCornerFrame: React.FC<HudCornerFrameProps> = ({
  children,
  className = '',
  glow = false,
  tag,
  onClick,
  id
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative border border-cyan-900/40 bg-[#070e1c]/75 backdrop-blur-md rounded-sm transition-all duration-300 ${
        glow ? 'border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,255,0.2)]' : ''
      } ${className}`}
    >
      {/* Corner Brackets */}
      <span className="hud-corner-tl" aria-hidden="true" />
      <span className="hud-corner-tr" aria-hidden="true" />
      <span className="hud-corner-bl" aria-hidden="true" />
      <span className="hud-corner-br" aria-hidden="true" />

      {tag && (
        <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#030712] border border-cyan-500/40 text-[10px] font-mono tracking-widest text-cyan-400 uppercase rounded-xs shadow-sm">
          {tag}
        </div>
      )}

      {children}
    </div>
  );
};

export const SystemStatusPill: React.FC<{ status?: string; className?: string }> = ({
  status = 'SYSTEM STATUS: ONLINE',
  className = ''
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1 glass-panel rounded-full text-[10px] font-mono text-cyan-400 font-semibold tracking-wider ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00f2ff]"></span>
      </span>
      <span>{status}</span>
    </div>
  );
};

export const TechBadge: React.FC<{
  label: string;
  variant?: 'cyan' | 'blue' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}> = ({ label, variant = 'cyan', size = 'sm' }) => {
  const colorMap = {
    cyan: 'bg-slate-800/60 border-slate-700/80 text-cyan-300 hover:border-cyan-400/60 hover:text-cyan-200',
    blue: 'bg-slate-800/60 border-slate-700/80 text-sky-300 hover:border-sky-400/60 hover:text-sky-200',
    purple: 'bg-slate-800/60 border-slate-700/80 text-indigo-300 hover:border-indigo-400/60 hover:text-indigo-200',
    gray: 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500/60'
  };

  const sizeMap = {
    sm: 'text-[10px] px-2.5 py-0.5 font-mono',
    md: 'text-xs px-3 py-1 font-mono'
  };

  return (
    <span
      className={`inline-block border rounded-xs transition-all tracking-wide ${colorMap[variant]} ${sizeMap[size]}`}
    >
      {label}
    </span>
  );
};

export const SectionHeading: React.FC<{
  number: string;
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center';
}> = ({ number, title, subtitle, tag, align = 'left' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-3 mb-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="font-mono text-[11px] text-cyan-400 font-bold tracking-widest px-2.5 py-0.5 bg-cyan-950/60 border border-cyan-500/30 rounded-xs">
          {number} // {tag || 'SECTION'}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
