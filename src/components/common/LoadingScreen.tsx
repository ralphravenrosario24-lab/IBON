import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  isLoading?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, isLoading }) => {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(15);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const logs = [
    'IBON // INITIALIZING SECURE DIGITAL IDENTITY...',
    '[01] VERIFYING CYBERSECURITY PROTOCOLS & DEFENSE TOKENS',
    '[02] MOUNTING INTERACTIVE INTERFACES & RESEARCH INDEX',
    '[03] SYSTEM ONLINE // READY FOR TRANSMISSION'
  ];

  useEffect(() => {
    const t1 = setTimeout(() => { setStep(1); setProgress(45); }, 200);
    const t2 = setTimeout(() => { setStep(2); setProgress(80); }, 550);
    const t3 = setTimeout(() => { setStep(3); setProgress(100); }, 900);
    const t4 = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (isDismissed && (isLoading === undefined || !isLoading)) {
    return null;
  }

  const handleManualDismiss = () => {
    setIsDismissed(true);
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020408] text-[#e2e8f0] p-6 grid-bg select-none"
    >
      <div className="w-full max-w-md glass-panel p-8 rounded-sm shadow-[0_0_50px_rgba(0,242,255,0.18)] relative border border-cyan-500/40">
        {/* HUD Corners */}
        <span className="hud-corner-tl" />
        <span className="hud-corner-tr" />
        <span className="hud-corner-bl" />
        <span className="hud-corner-br" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cyan-900/40 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyan-400">
              IBON // PROTOCOL_BOOT
            </span>
          </div>
          <span className="font-mono text-[11px] text-cyan-400 font-bold">
            {progress}%
          </span>
        </div>

        {/* Brand statement */}
        <div className="text-center my-4">
          <h1 className="text-3xl font-extrabold tracking-[0.2em] text-white font-display glow-text">
            IBON
          </h1>
          <p className="font-mono text-[11px] text-cyan-400 mt-1 tracking-widest uppercase">
            Building what is seen. Protecting what isn&apos;t.
          </p>
        </div>

        {/* Log stream */}
        <div className="bg-slate-950/90 border border-cyan-950 p-3 rounded font-mono text-[11px] space-y-1.5 min-h-[90px] my-5 text-left">
          {logs.slice(0, step + 1).map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              {idx === step && step < 3 ? (
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping mt-1" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
              )}
              <span className={idx === 3 ? 'text-cyan-300 font-bold' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-cyan-950">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          />
        </div>

        {/* Skip button for fast preview navigation */}
        <div className="mt-4 text-center">
          <button
            onClick={handleManualDismiss}
            className="text-[11px] font-mono text-slate-500 hover:text-cyan-300 transition-colors uppercase tracking-widest underline decoration-dotted"
          >
            [ Skip Initialization ]
          </button>
        </div>
      </div>
    </motion.div>
  );
};
