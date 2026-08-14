import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SectionHeading, HudCornerFrame } from '../common/HudElements';
import {
  Send,
  Mail,
  Github,
  Linkedin,
  FileText,
  CheckCircle,
  AlertCircle,
  Terminal,
  Shield,
  Radio,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { data, sendContactMessage } = usePortfolio();
  const profile = data.profile;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'transmitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Required fields: Name, Email, and Message.');
      return;
    }

    setStatus('transmitting');
    setErrorMessage('');

    try {
      const result = await sendContactMessage(formData);
      if (result.success) {
        setStatus('transmitted');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Trigger subtle cyber confetti
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#38bdf8', '#06b6d4', '#818cf8']
          });
        } catch (e) {
          // ignore
        }
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Transmission failed.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('Network packet transmission interrupted.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionHeading
        number="08"
        tag="COMMUNICATION"
        title="Let's Connect"
        subtitle="Have a project, opportunity, security inquiry, research collaboration, or question? Transmit a direct message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Transmission Form */}
        <div className="lg:col-span-7">
          <HudCornerFrame
            tag="TRANSMISSION // GATEWAY_01"
            glow={status === 'transmitting'}
            className="p-6 sm:p-8 bg-slate-950/95"
          >
            <div className="flex items-center justify-between border-b border-sky-500/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Radio className={`w-4 h-4 ${status === 'transmitting' ? 'text-cyan-400 animate-ping' : 'text-sky-400'}`} />
                <span className="font-mono text-xs text-sky-300 font-semibold tracking-wider uppercase">
                  DIRECT ENCRYPTED TRANSMITTER
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                PORT // 443_TLS
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-slate-400 mb-1.5 uppercase font-medium">
                    Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-slate-900/90 border border-sky-500/25 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 text-slate-200 px-3.5 py-2.5 rounded-xs outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-slate-400 mb-1.5 uppercase font-medium">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-900/90 border border-sky-500/25 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 text-slate-200 px-3.5 py-2.5 rounded-xs outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-slate-400 mb-1.5 uppercase font-medium">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Security Collaboration / Project Inquiry / Internship"
                  className="w-full bg-slate-900/90 border border-sky-500/25 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 text-slate-200 px-3.5 py-2.5 rounded-xs outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-slate-400 mb-1.5 uppercase font-medium">
                  Message Payload <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, project scope, or opportunity..."
                  className="w-full bg-slate-900/90 border border-sky-500/25 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 text-slate-200 p-3.5 rounded-xs outline-none transition-all placeholder:text-slate-600 resize-y"
                />
              </div>

              {/* Feedback messages */}
              {status === 'transmitted' && (
                <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xs flex items-center gap-2.5 text-emerald-300">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>MESSAGE TRANSMITTED // STORED IN PORTFOLIO SECURE REGISTRY</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 bg-rose-950/60 border border-rose-500/50 rounded-xs flex items-center gap-2.5 text-rose-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>TRANSMISSION FAILED: {errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="w-full py-3.5 rounded-xs bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(14,165,233,0.35)] disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {status === 'transmitting' ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING ENCRYPTED PACKET...</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE →</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </HudCornerFrame>
        </div>

        {/* Right Column: Direct Channels & Reachability */}
        <div className="lg:col-span-5 space-y-6">
          <HudCornerFrame tag="CHANNELS" className="p-6 bg-slate-950/90 font-mono text-xs">
            <h3 className="text-white font-bold tracking-wider mb-4 uppercase">
              // DIRECT NETWORK ENDPOINTS
            </h3>

            <div className="space-y-4 font-mono text-xs">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-sky-400/60 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 bg-sky-950/60 border border-sky-500/30 rounded text-sky-400 group-hover:text-cyan-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Primary Email</span>
                    <span className="text-white font-sans text-xs">{profile.email}</span>
                  </div>
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-sky-400/60 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 bg-sky-950/60 border border-sky-500/30 rounded text-sky-400 group-hover:text-cyan-300">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Source Repositories</span>
                    <span className="text-white font-sans text-xs">{profile.github}</span>
                  </div>
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-sky-400/60 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 bg-sky-950/60 border border-sky-500/30 rounded text-sky-400 group-hover:text-cyan-300">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Professional Network</span>
                    <span className="text-white font-sans text-xs">{profile.linkedin}</span>
                  </div>
                </a>
              )}
            </div>
          </HudCornerFrame>

          {/* Availability & Response Times */}
          <div className="p-5 rounded border border-sky-500/20 bg-gradient-to-br from-sky-950/20 to-slate-950 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>AVAILABILITY NOTICE</span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Open to internship opportunities, cybersecurity research inquiries, digital interface commissions, and collaborative software projects.
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              ESTIMATED RESPONSE LATENCY: <span className="text-emerald-400 font-semibold">&lt; 24 HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
