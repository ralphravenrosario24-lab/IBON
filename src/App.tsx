import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { MatrixCanvas } from './components/common/MatrixCanvas';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ToastContainer } from './components/common/ToastContainer';
import { PixelCursor } from './components/common/PixelCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ResearchSection } from './components/research/ResearchSection';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { ResumeSection } from './components/resume/ResumeSection';
import { ContactSection } from './components/contact/ContactSection';
import { AdminModal } from './components/admin/AdminModal';

const PortfolioContent: React.FC = () => {
  const {
    isLoading,
    showAdminModal,
    setShowAdminModal,
    selectedProject,
    setSelectedProject
  } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-[#020408] text-[#e2e8f0] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Custom Cyber Pixel Cursor & Reticle FX */}
      <PixelCursor />

      {/* Background Matrix/Cyber Canvas */}
      <MatrixCanvas />

      {/* Cyber Grid & Ambient Gradient Overlays */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 scanline pointer-events-none z-0" />
      
      {/* Dynamic Ambient Blur Lighting Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Loading Screen */}
      <LoadingScreen onComplete={() => {}} />

      {/* Navigation Header */}
      <Navbar onOpenAdmin={() => setShowAdminModal(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Project Details Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Protected Admin CMS Modal */}
      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />

      {/* System Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
