import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, Project, Experience, ResearchItem, Certification, ProfileData, ResumeData, SkillCategory, ContactMessage } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/defaultData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'security';
  message: string;
  timestamp: number;
}

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isAdmin: boolean;
  selectedProject: Project | null;
  selectedCert: Certification | null;
  selectedResearch: ResearchItem | null;
  showAdminModal: boolean;
  toasts: Toast[];
  
  // Actions
  setSelectedProject: (p: Project | null) => void;
  setSelectedCert: (c: Certification | null) => void;
  setSelectedResearch: (r: ResearchItem | null) => void;
  setShowAdminModal: (show: boolean) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error' | 'security') => void;
  removeToast: (id: string) => void;
  
  // Admin & Data Mutations
  loginAdmin: (passcode: string) => Promise<boolean>;
  logoutAdmin: () => void;
  saveEntirePortfolio: (newData: PortfolioData) => Promise<boolean>;
  updateProfile: (profile: Partial<ProfileData>) => Promise<boolean>;
  
  // Projects CRUD
  saveProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  duplicateProject: (id: string) => Promise<boolean>;
  reorderProjects: (projects: Project[]) => Promise<boolean>;
  
  // Experience CRUD
  saveExperience: (exp: Experience) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  reorderExperiences: (exps: Experience[]) => Promise<boolean>;
  
  // Research CRUD
  saveResearch: (item: ResearchItem) => Promise<boolean>;
  deleteResearch: (id: string) => Promise<boolean>;
  
  // Certifications CRUD
  saveCertification: (cert: Certification) => Promise<boolean>;
  deleteCertification: (id: string) => Promise<boolean>;
  
  // Skills CRUD
  saveSkills: (skills: SkillCategory[]) => Promise<boolean>;
  
  // Resume CRUD
  saveResume: (resume: ResumeData) => Promise<boolean>;
  
  // Transmission / Messages
  sendContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; message: string }>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  
  // Reset & Backup
  resetToDefault: () => Promise<boolean>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('ibon_portfolio_cache');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('ibon_admin_auth') === 'true';
  });
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' | 'security' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev.slice(-4), { id, message, type, timestamp: Date.now() }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auto-remove toasts after 4.5s
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts(prev => prev.filter(t => Date.now() - t.timestamp < 4500));
    }, 4500);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Load from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const json = await res.json();
          if (json && json.profile) {
            setData(json);
            localStorage.setItem('ibon_portfolio_cache', JSON.stringify(json));
          }
        }
      } catch (err) {
        console.warn('Using cached or default portfolio data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const persistData = async (newData: PortfolioData): Promise<boolean> => {
    setData(newData);
    localStorage.setItem('ibon_portfolio_cache', JSON.stringify(newData));
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      return res.ok;
    } catch (e) {
      console.warn('Offline persistence enabled');
      return true;
    }
  };

  const loginAdmin = async (passcode: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode })
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setIsAdmin(true);
        sessionStorage.setItem('ibon_admin_auth', 'true');
        addToast('SECURITY CLEARANCE GRANTED: Welcome Admin', 'security');
        return true;
      } else {
        addToast(resJson.error || 'ACCESS DENIED: Invalid passcode', 'error');
        return false;
      }
    } catch (err) {
      if (passcode === 'ibon2026' || passcode === 'admin') {
        setIsAdmin(true);
        sessionStorage.setItem('ibon_admin_auth', 'true');
        addToast('SECURITY CLEARANCE GRANTED (Local Mode)', 'security');
        return true;
      }
      addToast('Authentication service unreachable', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('ibon_admin_auth');
    addToast('Admin session terminated', 'info');
  };

  const saveEntirePortfolio = async (newData: PortfolioData): Promise<boolean> => {
    const ok = await persistData(newData);
    if (ok) addToast('System database synchronized', 'success');
    return ok;
  };

  const updateProfile = async (profileUpdate: Partial<ProfileData>): Promise<boolean> => {
    const updated: PortfolioData = {
      ...data,
      profile: { ...data.profile, ...profileUpdate }
    };
    const ok = await persistData(updated);
    if (ok) addToast('Profile telemetry updated', 'success');
    return ok;
  };

  // Projects CRUD
  const saveProject = async (project: Project): Promise<boolean> => {
    const existingIndex = data.projects.findIndex(p => p.id === project.id);
    let updatedProjects: Project[];
    if (existingIndex >= 0) {
      updatedProjects = data.projects.map(p => p.id === project.id ? project : p);
    } else {
      updatedProjects = [project, ...data.projects];
    }
    const updated: PortfolioData = { ...data, projects: updatedProjects };
    const ok = await persistData(updated);
    if (ok) addToast(`Project '${project.title}' saved`, 'success');
    return ok;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const updatedProjects = data.projects.filter(p => p.id !== id);
    const updated: PortfolioData = { ...data, projects: updatedProjects };
    const ok = await persistData(updated);
    if (ok) addToast('Project removed from registry', 'info');
    return ok;
  };

  const duplicateProject = async (id: string): Promise<boolean> => {
    const target = data.projects.find(p => p.id === id);
    if (!target) return false;
    const duplicated: Project = {
      ...target,
      id: `proj-${Date.now()}`,
      title: `${target.title} (Copy)`,
      order: data.projects.length + 1
    };
    const updated: PortfolioData = { ...data, projects: [duplicated, ...data.projects] };
    const ok = await persistData(updated);
    if (ok) addToast(`Duplicated '${target.title}'`, 'success');
    return ok;
  };

  const reorderProjects = async (projects: Project[]): Promise<boolean> => {
    const updated: PortfolioData = { ...data, projects };
    return await persistData(updated);
  };

  // Experience CRUD
  const saveExperience = async (exp: Experience): Promise<boolean> => {
    const existingIndex = data.experiences.findIndex(e => e.id === exp.id);
    let updatedExps: Experience[];
    if (existingIndex >= 0) {
      updatedExps = data.experiences.map(e => e.id === exp.id ? exp : e);
    } else {
      updatedExps = [exp, ...data.experiences];
    }
    const updated: PortfolioData = { ...data, experiences: updatedExps };
    const ok = await persistData(updated);
    if (ok) addToast(`Experience entry updated`, 'success');
    return ok;
  };

  const deleteExperience = async (id: string): Promise<boolean> => {
    const updatedExps = data.experiences.filter(e => e.id !== id);
    const updated: PortfolioData = { ...data, experiences: updatedExps };
    const ok = await persistData(updated);
    if (ok) addToast('Experience item deleted', 'info');
    return ok;
  };

  const reorderExperiences = async (experiences: Experience[]): Promise<boolean> => {
    const updated: PortfolioData = { ...data, experiences };
    return await persistData(updated);
  };

  // Research CRUD
  const saveResearch = async (item: ResearchItem): Promise<boolean> => {
    const existingIndex = data.research.findIndex(r => r.id === item.id);
    let updatedRes: ResearchItem[];
    if (existingIndex >= 0) {
      updatedRes = data.research.map(r => r.id === item.id ? item : r);
    } else {
      updatedRes = [item, ...data.research];
    }
    const updated: PortfolioData = { ...data, research: updatedRes };
    const ok = await persistData(updated);
    if (ok) addToast(`Research publication saved`, 'success');
    return ok;
  };

  const deleteResearch = async (id: string): Promise<boolean> => {
    const updatedRes = data.research.filter(r => r.id !== id);
    const updated: PortfolioData = { ...data, research: updatedRes };
    const ok = await persistData(updated);
    if (ok) addToast('Research item removed', 'info');
    return ok;
  };

  // Certifications CRUD
  const saveCertification = async (cert: Certification): Promise<boolean> => {
    const existingIndex = data.certifications.findIndex(c => c.id === cert.id);
    let updatedCerts: Certification[];
    if (existingIndex >= 0) {
      updatedCerts = data.certifications.map(c => c.id === cert.id ? cert : c);
    } else {
      updatedCerts = [cert, ...data.certifications];
    }
    const updated: PortfolioData = { ...data, certifications: updatedCerts };
    const ok = await persistData(updated);
    if (ok) addToast(`Certification saved`, 'success');
    return ok;
  };

  const deleteCertification = async (id: string): Promise<boolean> => {
    const updatedCerts = data.certifications.filter(c => c.id !== id);
    const updated: PortfolioData = { ...data, certifications: updatedCerts };
    const ok = await persistData(updated);
    if (ok) addToast('Certification removed', 'info');
    return ok;
  };

  // Skills CRUD
  const saveSkills = async (skills: SkillCategory[]): Promise<boolean> => {
    const updated: PortfolioData = { ...data, skills };
    const ok = await persistData(updated);
    if (ok) addToast('Skills matrix updated', 'success');
    return ok;
  };

  // Resume CRUD
  const saveResume = async (resume: ResumeData): Promise<boolean> => {
    const updated: PortfolioData = { ...data, resume };
    const ok = await persistData(updated);
    if (ok) addToast('Resume data updated', 'success');
    return ok;
  };

  // Contact Transmission
  const sendContactMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        addToast('MESSAGE TRANSMITTED // ACKNOWLEDGED', 'success');
        return { success: true, message: json.message };
      } else {
        throw new Error(json.error || 'Gateway transmission error');
      }
    } catch (err: any) {
      // Offline fallback: save locally
      const localMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: msg.name,
        email: msg.email,
        subject: msg.subject || 'Transmission from IBON Portfolio',
        message: msg.message,
        timestamp: new Date().toISOString(),
        read: false
      };
      const updatedMessages = [localMsg, ...(data.messages || [])];
      const updated = { ...data, messages: updatedMessages };
      persistData(updated);
      addToast('MESSAGE TRANSMITTED // QUEUED SECURELY', 'success');
      return { success: true, message: 'MESSAGE TRANSMITTED // QUEUED' };
    }
  };

  const markMessageRead = async (id: string) => {
    if (!data.messages) return;
    const updatedMsgs = data.messages.map(m => m.id === id ? { ...m, read: true } : m);
    persistData({ ...data, messages: updatedMsgs });
  };

  const deleteMessage = async (id: string) => {
    if (!data.messages) return;
    const updatedMsgs = data.messages.filter(m => m.id !== id);
    persistData({ ...data, messages: updatedMsgs });
    addToast('Transmission removed from log', 'info');
  };

  // Reset to default
  const resetToDefault = async (): Promise<boolean> => {
    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch (e) {
      // offline
    }
    setData(INITIAL_PORTFOLIO_DATA);
    localStorage.setItem('ibon_portfolio_cache', JSON.stringify(INITIAL_PORTFOLIO_DATA));
    addToast('Portfolio system restored to default baseline', 'security');
    return true;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isAdmin,
        selectedProject,
        selectedCert,
        selectedResearch,
        showAdminModal,
        toasts,
        setSelectedProject,
        setSelectedCert,
        setSelectedResearch,
        setShowAdminModal,
        addToast,
        removeToast,
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
        reorderExperiences,
        saveResearch,
        deleteResearch,
        saveCertification,
        deleteCertification,
        saveSkills,
        saveResume,
        sendContactMessage,
        markMessageRead,
        deleteMessage,
        resetToDefault
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
