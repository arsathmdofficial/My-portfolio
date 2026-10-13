/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ResumeModal } from './components/ResumeModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CertificateModal } from './components/CertificateModal';
import { InteractivePlaygroundModal } from './components/InteractivePlaygroundModal';

import { SnakeGameModal } from './components/demos/SnakeGameModal';
import { CarromGameModal } from './components/demos/CarromGameModal';
import { CalculatorModal } from './components/demos/CalculatorModal';
import { FitTrackAiModal } from './components/demos/FitTrackAiModal';
import { MentroMobilityModal } from './components/demos/MentroMobilityModal';

import { Project, CertificateItem } from './types';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [activeDemo, setActiveDemo] = useState<Project['demoType'] | null>(null);

  const handleOpenDemo = (demoType?: Project['demoType']) => {
    if (demoType) {
      setActiveDemo(demoType);
    }
  };

  const handleCloseDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenPlayground={() => setIsPlaygroundOpen(true)}
        />

        {/* 2. About & Education */}
        <AboutSection />

        {/* 3. Technical Skills */}
        <SkillsSection />

        {/* 4. Featured Projects */}
        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenDemo={handleOpenDemo}
        />

        {/* 5. Achievements & Certificates */}
        <AchievementsSection
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
        />

        {/* 6. Practical Experience */}
        <ExperienceSection />

        {/* 7. Resume Integration */}
        <ResumeSection
          onOpenResumeModal={() => setIsResumeOpen(true)}
        />

        {/* 8. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
      />

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <InteractivePlaygroundModal
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
        onSelectDemo={handleOpenDemo}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenDemo={handleOpenDemo}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Playable Demos */}
      <SnakeGameModal
        isOpen={activeDemo === 'snake'}
        onClose={handleCloseDemo}
      />

      <CarromGameModal
        isOpen={activeDemo === 'carrom'}
        onClose={handleCloseDemo}
      />

      <CalculatorModal
        isOpen={activeDemo === 'calculator'}
        onClose={handleCloseDemo}
      />

      <FitTrackAiModal
        isOpen={activeDemo === 'fittrack'}
        onClose={handleCloseDemo}
      />

      <MentroMobilityModal
        isOpen={activeDemo === 'mentro' || activeDemo === 'mentro_partner'}
        initialMode={activeDemo === 'mentro_partner' ? 'partner' : 'rider'}
        onClose={handleCloseDemo}
      />
    </div>
  );
}
