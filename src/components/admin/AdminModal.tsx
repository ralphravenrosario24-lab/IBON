import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  Save,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Edit2,
  FileText,
  User,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  Mail,
  Sliders,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  Eye
} from 'lucide-react';
import {
  Project,
  Experience,
  ResearchItem,
  Certification,
  ProfileData,
  SkillCategory,
  ProjectCategory
} from '../../types';
import { HudCornerFrame } from '../common/HudElements';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    saveEntirePortfolio,
    updateProfile,
    saveProject,
    deleteProject,
    duplicateProject,
    reorderProjects,
    saveExperience,
    deleteExperience,
    saveResearch,
    deleteResearch,
    saveCertification,
    deleteCertification,
    saveSkills,
    saveResume,
    markMessageRead,
    deleteMessage,
    resetToDefault,
    addToast
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'projects'
    | 'experience'
    | 'research'
    | 'certifications'
    | 'skills'
    | 'resume'
    | 'messages'
    | 'settings'
  >('profile');

  // Auth State
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<ProfileData>(data.profile);

  // Active editing modals inside admin
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isNewExp, setIsNewExp] = useState(false);

  const [editingResearch, setEditingResearch] = useState<ResearchItem | null>(null);
  const [isNewResearch, setIsNewResearch] = useState(false);

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isNewCert, setIsNewCert] = useState(false);

  // Exploring tags input helper
  const [newExploringTag, setNewExploringTag] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    const success = await loginAdmin(passcode);
    setIsLoggingIn(false);
    if (!success) {
      setAuthError('INVALID PASSCODE. ACCESS DENIED.');
    }
  };

  // Sync profile form when data changes
  React.useEffect(() => {
    if (data.profile) {
      setProfileForm(data.profile);
    }
  }, [data.profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl font-sans overflow-hidden">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#050914] border border-sky-500/30 rounded-sm shadow-2xl overflow-hidden z-10 font-sans my-auto"
      >
        <span className="hud-corner-tl" />
        <span className="hud-corner-tr" />
        <span className="hud-corner-bl" />
        <span className="hud-corner-br" />

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sky-500/20 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3 font-mono">
            <div className="p-1.5 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300">
              {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-white font-bold tracking-wider text-sm">
                IBON // SYSTEM CONTROL PANEL
              </span>
              <span className="text-xs text-sky-400 ml-2 font-normal hidden sm:inline">
                {isAdmin ? '[AUTHORIZED]' : '[AUTHENTICATION REQUIRED]'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1 bg-slate-900 border border-slate-700 hover:border-rose-500/60 text-slate-300 hover:text-rose-300 rounded-xs font-mono text-xs transition-colors"
              >
                LOGOUT
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center font-mono">
            <div className="w-14 h-14 rounded-full bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400 mb-6 shadow-[0_0_25px_rgba(14,165,233,0.3)]">
              <KeyRound className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold font-display text-white mb-2">
              SECURITY ACCESS GATEWAY
            </h2>
            <p className="text-xs text-slate-400 font-sans mb-6">
              Enter the administration security key to modify portfolio telemetry, projects, credentials, and records.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase mb-1">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full bg-slate-900 border border-sky-500/30 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 p-3 rounded-xs outline-none text-xs tracking-widest placeholder:text-slate-600"
                />
              </div>

              {authError && (
                <div className="p-2.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] rounded-xs">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-xs tracking-widest uppercase rounded-xs transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer"
              >
                {isLoggingIn ? 'AUTHENTICATING...' : 'AUTHORIZE SESSION →'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED CMS INTERFACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#040711] border-b md:border-b-0 md:border-r border-sky-500/15 p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0 font-mono text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>PROFILE</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>PROJECTS ({data.projects?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'experience'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>EXPERIENCE ({data.experiences?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('research')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'research'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>RESEARCH ({data.research?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('certifications')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'certifications'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>CERTS ({data.certifications?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>SKILLS MATRIX</span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'resume'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>RESUME</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>INBOX ({data.messages?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`p-2.5 rounded-xs flex items-center gap-2.5 text-left transition-colors whitespace-nowrap mt-auto ${
                  activeTab === 'settings'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>BACKUP / RESET</span>
              </button>
            </div>

            {/* Main Editor Work Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950/40">
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div className="max-w-3xl space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // PROFILE & BRAND TELEMETRY
                    </h3>
                    <button
                      onClick={() => updateProfile(profileForm)}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE PROFILE</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">Name / Brand</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">System Status Tag</label>
                      <input
                        type="text"
                        value={profileForm.systemStatus}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, systemStatus: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 uppercase">Hero Statement (Seen)</label>
                      <input
                        type="text"
                        value={profileForm.heroStatementSeen}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, heroStatementSeen: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 uppercase">Hero Statement (Unseen)</label>
                      <input
                        type="text"
                        value={profileForm.heroStatementUnseen}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, heroStatementUnseen: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 uppercase">Hero Subtitle</label>
                      <input
                        type="text"
                        value={profileForm.heroSubheadline}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, heroSubheadline: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 uppercase">Profile Photo / Avatar</label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start">
                        {profileForm.avatarUrl && (
                          <div className="w-16 h-16 rounded border border-cyan-500/40 bg-slate-900 overflow-hidden shrink-0">
                            <img
                              src={profileForm.avatarUrl}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 w-full space-y-2">
                          <input
                            type="text"
                            value={profileForm.avatarUrl}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, avatarUrl: e.target.value })
                            }
                            placeholder="Image URL or path (e.g., /avatar.jpg)"
                            className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white text-xs"
                          />
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-[11px] rounded cursor-pointer transition-colors inline-flex items-center gap-1.5">
                              <span>📁 Upload Exact Image from Device</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        setProfileForm({
                                          ...profileForm,
                                          avatarUrl: event.target.result as string
                                        });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <span className="text-[10px] text-slate-500">Supports PNG, JPG, WebP</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">Contact Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, location: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">GitHub URL</label>
                      <input
                        type="text"
                        value={profileForm.github}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, github: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">LinkedIn URL</label>
                      <input
                        type="text"
                        value={profileForm.linkedin}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, linkedin: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    {/* Biography Paragraphs */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1 uppercase">
                        Biography Paragraphs (Separate with empty lines)
                      </label>
                      <textarea
                        rows={6}
                        value={profileForm.bio.join('\n\n')}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            bio: e.target.value
                              .split('\n\n')
                              .filter((p) => p.trim().length > 0)
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white font-sans text-xs"
                      />
                    </div>

                    {/* Currently Exploring Tags */}
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-2 uppercase">
                        Currently Exploring Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {profileForm.currentlyExploring.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-900 border border-sky-500/30 rounded text-sky-300 flex items-center gap-1.5"
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() =>
                                setProfileForm({
                                  ...profileForm,
                                  currentlyExploring: profileForm.currentlyExploring.filter(
                                    (_, i) => i !== idx
                                  )
                                })
                              }
                              className="text-slate-500 hover:text-rose-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newExploringTag}
                          onChange={(e) => setNewExploringTag(e.target.value)}
                          placeholder="Add exploring topic..."
                          className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newExploringTag.trim()) {
                              setProfileForm({
                                ...profileForm,
                                currentlyExploring: [
                                  ...profileForm.currentlyExploring,
                                  newExploringTag.trim()
                                ]
                              });
                              setNewExploringTag('');
                            }
                          }}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded"
                        >
                          ADD TAG
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // PROJECT MANAGEMENT REGISTRY
                    </h3>
                    <button
                      onClick={() => {
                        setEditingProject({
                          id: `proj-${Date.now()}`,
                          title: 'New Cyber/Design Project',
                          category: 'CYBERSECURITY',
                          thumbnail:
                            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
                          images: [],
                          shortDescription: 'Brief summary of the engineering work...',
                          fullDescription: 'Detailed background, technical mechanics, and scope...',
                          date: '2026',
                          year: '2026',
                          role: 'Lead Architect',
                          technologies: ['TypeScript', 'Python'],
                          skills: ['Security', 'UI'],
                          tags: ['Web'],
                          status: 'Completed',
                          featured: false,
                          links: {},
                          order: (data.projects?.length || 0) + 1
                        });
                        setIsNewProject(true);
                      }}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>NEW PROJECT</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.projects?.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.thumbnail}
                            alt=""
                            className="w-16 h-12 object-cover rounded bg-slate-950 border border-slate-800 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] text-sky-400 uppercase font-semibold">
                              {proj.category}
                            </span>
                            <h4 className="font-bold text-white text-sm">
                              {proj.title}
                            </h4>
                            <span className="text-slate-500 text-[11px]">
                              Status: {proj.status} • Year: {proj.year}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => duplicateProject(proj.id)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsNewProject(false);
                            }}
                            className="p-2 bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-2 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // EXPERIENCE TIMELINE MANAGEMENT
                    </h3>
                    <button
                      onClick={() => {
                        setEditingExp({
                          id: `exp-${Date.now()}`,
                          position: 'Security & Systems Specialist',
                          organization: 'Organization Name',
                          location: 'Remote',
                          date: '2026 — Present',
                          current: true,
                          description: ['Key responsibility or achievement item'],
                          skills: ['Security', 'React'],
                          order: (data.experiences?.length || 0) + 1
                        });
                        setIsNewExp(true);
                      }}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>NEW ROLE</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.experiences?.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-sky-400 text-xs font-bold uppercase">
                            {exp.organization}
                          </span>
                          <h4 className="font-bold text-white text-sm">{exp.position}</h4>
                          <span className="text-slate-500 text-[11px]">
                            {exp.date} • {exp.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingExp(exp);
                              setIsNewExp(false);
                            }}
                            className="p-2 bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteExperience(exp.id)}
                            className="p-2 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: RESEARCH */}
              {activeTab === 'research' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // RESEARCH & PUBLICATIONS
                    </h3>
                    <button
                      onClick={() => {
                        setEditingResearch({
                          id: `res-${Date.now()}`,
                          title: 'New Technical Research Paper',
                          category: 'Vulnerability Analysis',
                          date: '2026',
                          role: 'Lead Investigator',
                          description: 'Abstract and background statement...',
                          methodology: 'Experimental setup and testbed description...',
                          findings: 'Observed results and metrics...',
                          type: 'Research'
                        });
                        setIsNewResearch(true);
                      }}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>NEW PAPER</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.research?.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] text-sky-400 uppercase font-semibold">
                            {res.type} // {res.category}
                          </span>
                          <h4 className="font-bold text-white text-sm">{res.title}</h4>
                          <span className="text-slate-500 text-[11px]">{res.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingResearch(res);
                              setIsNewResearch(false);
                            }}
                            className="p-2 bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteResearch(res.id)}
                            className="p-2 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CERTIFICATIONS */}
              {activeTab === 'certifications' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // CERTIFICATIONS & CREDENTIALS
                    </h3>
                    <button
                      onClick={() => {
                        setEditingCert({
                          id: `cert-${Date.now()}`,
                          courseTitle: 'Security Specialization Course',
                          certificateTitle: 'Certified Security Specialist',
                          provider: 'CompTIA / Certification Body',
                          completionDate: '2026',
                          credentialId: 'SEC-2026-XYZ',
                          category: 'CYBERSECURITY',
                          skills: ['Auditing', 'Network Defense'],
                          featured: false
                        });
                        setIsNewCert(true);
                      }}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>NEW CERTIFICATE</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.certifications?.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] text-sky-400 uppercase font-semibold">
                            {cert.category} • {cert.provider}
                          </span>
                          <h4 className="font-bold text-white text-sm">
                            {cert.certificateTitle}
                          </h4>
                          <span className="text-cyan-300 text-[11px]">
                            ID: {cert.credentialId} ({cert.completionDate})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCert(cert);
                              setIsNewCert(false);
                            }}
                            className="p-2 bg-sky-950 border border-sky-500/40 text-sky-300 hover:bg-sky-900 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteCertification(cert.id)}
                            className="p-2 bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SKILLS MATRIX */}
              {activeTab === 'skills' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // SKILLS & DISCIPLINE CATEGORIES
                    </h3>
                    <button
                      onClick={() => saveSkills(data.skills)}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE MATRIX</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.skills?.map((cat, catIdx) => (
                      <div
                        key={cat.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm uppercase">
                            {cat.name} ({cat.skills?.length || 0} skills)
                          </h4>
                          <span className="text-slate-500 text-xs">{cat.description}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {cat.skills?.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 bg-slate-950 border border-sky-500/30 rounded text-slate-200 text-[11px]"
                            >
                              {s.name} <span className="text-cyan-400">[{s.level}]</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: RESUME */}
              {activeTab === 'resume' && (
                <div className="max-w-2xl space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // CURRICULUM VITAE CONFIGURATION
                    </h3>
                    <button
                      onClick={() => saveResume(data.resume)}
                      className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE RESUME</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">Last Updated Date</label>
                      <input
                        type="text"
                        value={data.resume.lastUpdated}
                        onChange={(e) =>
                          saveResume({ ...data.resume, lastUpdated: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 uppercase">Executive Summary</label>
                      <textarea
                        rows={4}
                        value={data.resume.summary}
                        onChange={(e) =>
                          saveResume({ ...data.resume, summary: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-white font-sans text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // RECEIVED TRANSMISSION LOG ({data.messages?.length || 0})
                    </h3>
                  </div>

                  {(!data.messages || data.messages.length === 0) ? (
                    <div className="py-12 text-center text-slate-500">
                      No incoming transmissions logged.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 bg-slate-900 border border-slate-800 rounded space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sky-400">{msg.name}</span>
                            <span className="text-slate-500 text-[11px]">{msg.timestamp}</span>
                          </div>
                          <div className="text-cyan-300 text-xs">{msg.email}</div>
                          <div className="text-slate-200 font-semibold">{msg.subject}</div>
                          <p className="text-slate-400 font-sans text-xs bg-slate-950 p-3 rounded">
                            {msg.message}
                          </p>
                          <div className="flex justify-end gap-2 pt-1">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="px-3 py-1 bg-sky-950 border border-sky-500/40 text-sky-300 rounded text-[11px]"
                            >
                              REPLY VIA EMAIL
                            </a>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="px-3 py-1 bg-rose-950 border border-rose-500/40 text-rose-300 rounded text-[11px]"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 9: SETTINGS & BACKUP */}
              {activeTab === 'settings' && (
                <div className="max-w-xl space-y-6 font-mono text-xs">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white uppercase">
                      // DATABASE BACKUP & RESTORATION
                    </h3>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded space-y-4">
                    <div>
                      <h4 className="text-white font-bold mb-1 uppercase">Export Database Backup</h4>
                      <p className="text-slate-400 font-sans text-xs mb-3">
                        Download a snapshot JSON file of your entire portfolio dataset.
                      </p>
                      <button
                        onClick={() => {
                          const dataStr =
                            'data:text/json;charset=utf-8,' +
                            encodeURIComponent(JSON.stringify(data, null, 2));
                          const downloadAnchor = document.createElement('a');
                          downloadAnchor.setAttribute('href', dataStr);
                          downloadAnchor.setAttribute('download', `ibon-portfolio-backup-${Date.now()}.json`);
                          document.body.appendChild(downloadAnchor);
                          downloadAnchor.click();
                          downloadAnchor.remove();
                          addToast('Backup archive exported', 'success');
                        }}
                        className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>EXPORT JSON BACKUP</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <h4 className="text-rose-400 font-bold mb-1 uppercase">Reset to Factory Default</h4>
                      <p className="text-slate-400 font-sans text-xs mb-3">
                        Restore all portfolio items back to the curated baseline demo data.
                      </p>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all portfolio data to default?')) {
                            resetToDefault();
                          }
                        }}
                        className="px-4 py-2 bg-rose-950 border border-rose-500/50 text-rose-300 font-bold rounded flex items-center gap-1.5 hover:bg-rose-900"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>RESTORE BASELINE DEMO DATA</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: EDIT/CREATE PROJECT */}
        {editingProject && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#050914] border border-sky-500/40 p-6 rounded shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm uppercase">
                  {isNewProject ? '// CREATE NEW PROJECT' : '// EDIT PROJECT'}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as any
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  >
                    <option value="CYBERSECURITY">CYBERSECURITY</option>
                    <option value="RESEARCH">RESEARCH</option>
                    <option value="PUBLICATIONS">PUBLICATIONS</option>
                    <option value="GRAPHIC DESIGN">GRAPHIC DESIGN</option>
                    <option value="WEB DESIGN">WEB DESIGN</option>
                    <option value="PROGRAMMING">PROGRAMMING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as any
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Active Defense">Active Defense</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Thumbnail / Cover Image</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start">
                    {editingProject.thumbnail && (
                      <div className="w-24 h-16 rounded border border-cyan-500/40 bg-slate-900 overflow-hidden shrink-0">
                        <img
                          src={editingProject.thumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={editingProject.thumbnail}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, thumbnail: e.target.value })
                        }
                        placeholder="Image URL or path (e.g., /project1.png)"
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <label className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-[11px] rounded cursor-pointer transition-colors inline-flex items-center gap-1.5">
                          <span>📁 Upload Image from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setEditingProject({
                                      ...editingProject,
                                      thumbnail: event.target.result as string
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <span className="text-[10px] text-slate-500">PNG, JPG, WebP (Original Quality)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-400">Project Gallery Screenshots (Optional)</label>
                    <label className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] rounded cursor-pointer transition-colors inline-flex items-center gap-1">
                      <span>+ Add Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setEditingProject({
                                  ...editingProject,
                                  images: [...(editingProject.images || []), event.target.result as string]
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {editingProject.images && editingProject.images.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                      {editingProject.images.map((imgUrl, imgIdx) => (
                        <div key={imgIdx} className="relative aspect-video rounded border border-slate-700 overflow-hidden group">
                          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject({
                                ...editingProject,
                                images: editingProject.images?.filter((_, idx) => idx !== imgIdx)
                              });
                            }}
                            className="absolute top-1 right-1 p-1 bg-rose-950/90 text-rose-300 rounded hover:bg-rose-900 text-[10px]"
                            title="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">No additional gallery screenshots yet.</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingProject.shortDescription}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        shortDescription: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Full Description</label>
                  <textarea
                    rows={4}
                    value={editingProject.fullDescription}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        fullDescription: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={editingProject.role}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, role: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Date / Year</label>
                  <input
                    type="text"
                    value={editingProject.date}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        date: e.target.value,
                        year: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-slate-300 font-semibold p-2 bg-slate-900 border border-slate-700 rounded cursor-pointer hover:border-cyan-500/50">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          featured: e.target.checked
                        })
                      }
                      className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-0"
                    />
                    <span>⭐ Display in Featured Projects Carousel</span>
                  </label>
                </div>

                {/* RESEARCH DOCUMENT / TECHNICAL WHITEPAPER UPLOAD & LINK */}
                <div className="sm:col-span-2 p-3.5 bg-[#071328] border border-cyan-500/40 rounded space-y-3">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>// RESEARCH DOCUMENT & TECHNICAL WHITEPAPER</span>
                    </div>
                    {editingProject.documentUrl && (
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono">
                        DOCUMENT ATTACHED
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Document Display Title / Name</label>
                      <input
                        type="text"
                        value={editingProject.documentName || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            documentName: e.target.value
                          })
                        }
                        placeholder="e.g., Empirical_Threat_Model_Whitepaper.pdf"
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Document Format / Badge</label>
                      <input
                        type="text"
                        value={editingProject.documentType || 'PDF'}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            documentType: e.target.value
                          })
                        }
                        placeholder="e.g., PDF, DOCX, RESEARCH PAPER, IEEE"
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Attach Actual Document File (PDF / DOC / Text)</label>
                      <div className="flex flex-col sm:flex-row gap-2 items-start">
                        <label className="px-3.5 py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs rounded cursor-pointer transition-colors inline-flex items-center gap-2 shrink-0">
                          <Upload className="w-3.5 h-3.5 text-cyan-400" />
                          <span>📁 Upload Actual Document / PDF</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setEditingProject({
                                      ...editingProject,
                                      documentUrl: event.target.result as string,
                                      documentName: editingProject.documentName || file.name,
                                      documentType: file.name.endsWith('.pdf') ? 'PDF' : 'DOCUMENT'
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        <input
                          type="text"
                          value={editingProject.documentUrl || ''}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              documentUrl: e.target.value
                            })
                          }
                          placeholder="Or paste Direct PDF / Cloud Drive link..."
                          className="flex-1 w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                        />

                        {editingProject.documentUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              setEditingProject({
                                ...editingProject,
                                documentUrl: undefined
                              })
                            }
                            className="px-2.5 py-2 bg-rose-950/80 border border-rose-700/50 text-rose-300 text-xs rounded hover:bg-rose-900"
                            title="Remove Document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Direct document files uploaded will be stored in your portfolio storage and downloadable directly by recruiters and visitors.
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Official Research Link / DOI / Journal / arXiv URL</label>
                      <input
                        type="text"
                        value={editingProject.links?.research || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            links: {
                              ...editingProject.links,
                              research: e.target.value
                            }
                          })
                        }
                        placeholder="https://doi.org/... or https://arxiv.org/abs/..."
                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* OTHER ARTIFACT LINKS */}
                <div>
                  <label className="block text-slate-400 mb-1">GitHub Repository Link</label>
                  <input
                    type="text"
                    value={editingProject.links?.github || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: {
                          ...editingProject.links,
                          github: e.target.value
                        }
                      })
                    }
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Live Demo / Interactive App Link</label>
                  <input
                    type="text"
                    value={editingProject.links?.liveDemo || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: {
                          ...editingProject.links,
                          liveDemo: e.target.value
                        }
                      })
                    }
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">Official Website / Case Study Link</label>
                  <input
                    type="text"
                    value={editingProject.links?.officialWebsite || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        links: {
                          ...editingProject.links,
                          officialWebsite: e.target.value
                        }
                      })
                    }
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.technologies?.join(', ')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        technologies: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean)
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">
                    Engineering & Design Process (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.process || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        process: e.target.value
                      })
                    }
                    placeholder="Details about the architecture, development methodology, or testing procedures..."
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1">
                    Evaluation & Measured Outcome (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={editingProject.outcome || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        outcome: e.target.value
                      })
                    }
                    placeholder="Key performance indicators, audit outcomes, or user benchmarks achieved..."
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await saveProject(editingProject);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded"
                >
                  SAVE PROJECT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT/CREATE EXPERIENCE */}
        {editingExp && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#050914] border border-sky-500/40 p-6 rounded shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm uppercase">
                  {isNewExp ? '// ADD NEW EXPERIENCE' : '// EDIT EXPERIENCE'}
                </h3>
                <button
                  onClick={() => setEditingExp(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingExp.organization}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, organization: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Position Title</label>
                  <input
                    type="text"
                    value={editingExp.position}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, position: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Date Period</label>
                    <input
                      type="text"
                      value={editingExp.date}
                      onChange={(e) =>
                        setEditingExp({ ...editingExp, date: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingExp.location}
                      onChange={(e) =>
                        setEditingExp({ ...editingExp, location: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    Responsibilities / Achievements (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={editingExp.description?.join('\n')}
                    onChange={(e) =>
                      setEditingExp({
                        ...editingExp,
                        description: e.target.value.split('\n').filter(Boolean)
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await saveExperience(editingExp);
                    setEditingExp(null);
                  }}
                  className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded"
                >
                  SAVE ROLE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT/CREATE RESEARCH */}
        {editingResearch && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#050914] border border-sky-500/40 p-6 rounded shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm uppercase">
                  {isNewResearch ? '// ADD RESEARCH ARTIFACT' : '// EDIT RESEARCH'}
                </h3>
                <button
                  onClick={() => setEditingResearch(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1">Paper Title</label>
                  <input
                    type="text"
                    value={editingResearch.title}
                    onChange={(e) =>
                      setEditingResearch({ ...editingResearch, title: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingResearch.category}
                      onChange={(e) =>
                        setEditingResearch({
                          ...editingResearch,
                          category: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={editingResearch.date}
                      onChange={(e) =>
                        setEditingResearch({ ...editingResearch, date: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Abstract</label>
                  <textarea
                    rows={3}
                    value={editingResearch.description}
                    onChange={(e) =>
                      setEditingResearch({
                        ...editingResearch,
                        description: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Methodology</label>
                  <textarea
                    rows={3}
                    value={editingResearch.methodology}
                    onChange={(e) =>
                      setEditingResearch({
                        ...editingResearch,
                        methodology: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Key Findings</label>
                  <textarea
                    rows={3}
                    value={editingResearch.findings}
                    onChange={(e) =>
                      setEditingResearch({
                        ...editingResearch,
                        findings: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingResearch(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await saveResearch(editingResearch);
                    setEditingResearch(null);
                  }}
                  className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded"
                >
                  SAVE PAPER
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: EDIT/CREATE CERTIFICATION */}
        {editingCert && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#050914] border border-sky-500/40 p-6 rounded shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm uppercase">
                  {isNewCert ? '// ADD CREDENTIAL' : '// EDIT CERTIFICATION'}
                </h3>
                <button
                  onClick={() => setEditingCert(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-400 mb-1">Certificate Title</label>
                  <input
                    type="text"
                    value={editingCert.certificateTitle}
                    onChange={(e) =>
                      setEditingCert({
                        ...editingCert,
                        certificateTitle: e.target.value
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Course / Focus</label>
                  <input
                    type="text"
                    value={editingCert.courseTitle}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, courseTitle: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Provider</label>
                    <input
                      type="text"
                      value={editingCert.provider}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, provider: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Completion Date</label>
                    <input
                      type="text"
                      value={editingCert.completionDate}
                      onChange={(e) =>
                        setEditingCert({
                          ...editingCert,
                          completionDate: e.target.value
                        })
                      }
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Credential ID</label>
                  <input
                    type="text"
                    value={editingCert.credentialId}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, credentialId: e.target.value })
                    }
                    className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Verification Link / Certificate URL</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingCert.verificationLink || ''}
                      onChange={(e) =>
                        setEditingCert({
                          ...editingCert,
                          verificationLink: e.target.value
                        })
                      }
                      placeholder="https://... or certificate image file"
                      className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white text-xs"
                    />
                    <label className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-[11px] rounded cursor-pointer transition-colors inline-flex items-center gap-1.5">
                      <span>📁 Upload Certificate / Badge Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setEditingCert({
                                  ...editingCert,
                                  verificationLink: event.target.result as string
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await saveCertification(editingCert);
                    setEditingCert(null);
                  }}
                  className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded"
                >
                  SAVE CREDENTIAL
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
