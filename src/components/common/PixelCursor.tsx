import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const PixelCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [targetTag, setTargetTag] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const [, setFrame] = useState(0);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .clickable, .glass-panel, [data-interactive="true"]');
        if (interactive) {
          setIsHovered(true);
          const tag = interactive.getAttribute('data-tag') || 
                      interactive.getAttribute('aria-label') || 
                      interactive.tagName.toLowerCase();
          setTargetTag(tag);
        } else {
          setIsHovered(false);
          setTargetTag(null);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Spawn pixel sparks on click
      const colors = ['#00f2ff', '#38bdf8', '#ffffff', '#0284c7'];
      const newParticles: Particle[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + (Math.random() * 0.4 - 0.2);
        const speed = 2 + Math.random() * 3;
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() > 0.5 ? 4 : 2,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      particlesRef.current = [...particlesRef.current, ...newParticles];
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Particle animation loop
    let animationFrameId: number;
    const animateParticles = () => {
      if (particlesRef.current.length > 0) {
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.05
          }))
          .filter((p) => p.alpha > 0);
        setFrame((prev) => prev + 1);
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animationFrameId = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Pixel Sparks on Click */}
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.alpha,
            boxShadow: `0 0 6px ${p.color}`,
            transform: 'translate(-50%, -50%)',
            imageRendering: 'pixelated'
          }}
        />
      ))}

      {/* Trailing Cyber Pixel Reticle / Crosshair */}
      <div
        className="fixed transition-transform duration-75 ease-out pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(${isHovered ? '-50%' : '12px'}, ${isHovered ? '-50%' : '12px'}) scale(${isClicking ? 0.85 : 1})`
        }}
      >
        {isHovered ? (
          /* Locked Reticle for Interactive Elements */
          <div className="relative flex items-center justify-center">
            {/* Pixel Box Corners */}
            <div className="w-7 h-7 relative animate-pulse">
              {/* Top-Left */}
              <div className="absolute top-0 left-0 w-2 h-[2px] bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
              <div className="absolute top-0 left-0 w-[2px] h-2 bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />

              {/* Top-Right */}
              <div className="absolute top-0 right-0 w-2 h-[2px] bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
              <div className="absolute top-0 right-0 w-[2px] h-2 bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />

              {/* Bottom-Left */}
              <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
              <div className="absolute bottom-0 left-0 w-[2px] h-2 bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />

              {/* Bottom-Right */}
              <div className="absolute bottom-0 right-0 w-2 h-[2px] bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
              <div className="absolute bottom-0 right-0 w-[2px] h-2 bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />

              {/* Center 2x2 Pixel Dot */}
              <div className="absolute inset-0 m-auto w-1 h-1 bg-white shadow-[0_0_6px_#ffffff]" />
            </div>

            {/* Target telemetry readout badge */}
            {targetTag && (
              <div className="absolute top-5 left-5 px-1.5 py-0.5 bg-[#020408]/90 border border-cyan-500/60 rounded-xs font-mono text-[9px] text-cyan-300 font-bold tracking-wider uppercase whitespace-nowrap shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                {targetTag.slice(0, 10)}
              </div>
            )}
          </div>
        ) : (
          /* Subtle Trailing Pixel Dot with Coordinates */
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-1.5 h-1.5 bg-[#00f2ff] shadow-[0_0_6px_#00f2ff]" />
            <span className="font-mono text-[8px] text-cyan-500/80 tracking-tighter">
              {Math.round(pos.x)}:{Math.round(pos.y)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
