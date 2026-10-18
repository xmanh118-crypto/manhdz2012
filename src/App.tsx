/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppView } from './types';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { LiveDemoModal } from './components/LiveDemoModal';
import { StudentPortal } from './components/StudentPortal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CompetitionGuideModal } from './components/CompetitionGuideModal';
import { FooterBanner } from './components/FooterBanner';
import { DiagnosticResult } from './utils/diagnosticEngine';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState<boolean>(false);
  const [isCompetitionGuideOpen, setIsCompetitionGuideOpen] = useState<boolean>(false);
  const [activeClassCode, setActiveClassCode] = useState<string>('TOAN8A1');

  const handleOpenLiveDemo = () => {
    setIsLiveDemoOpen(true);
  };

  const handleCloseLiveDemo = () => {
    setIsLiveDemoOpen(false);
  };

  const handleOpenCompetitionGuide = () => {
    setIsCompetitionGuideOpen(true);
  };

  const handleCloseCompetitionGuide = () => {
    setIsCompetitionGuideOpen(false);
  };

  const handleEnterStudentPortal = (classCode?: string) => {
    if (classCode) {
      setActiveClassCode(classCode);
    }
    setCurrentView('student');
  };

  const handleEnterTeacherDashboard = () => {
    setCurrentView('teacher');
  };

  const handleSendToStudentWall = (_diag: DiagnosticResult) => {
    // Optionally notify or update
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-sky-200">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenLiveDemo={handleOpenLiveDemo}
        onOpenCompetitionGuide={handleOpenCompetitionGuide}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'landing' && (
          <HeroLanding
            onOpenLiveDemo={handleOpenLiveDemo}
            onEnterStudentPortal={handleEnterStudentPortal}
            onEnterTeacherDashboard={handleEnterTeacherDashboard}
          />
        )}

        {currentView === 'student' && (
          <StudentPortal
            initialClassCode={activeClassCode}
            onBackToHome={() => setCurrentView('landing')}
            onOpenLiveDemo={handleOpenLiveDemo}
          />
        )}

        {currentView === 'teacher' && (
          <TeacherDashboard
            onBackToHome={() => setCurrentView('landing')}
            onOpenLiveDemo={handleOpenLiveDemo}
          />
        )}
      </main>

      {/* Footer Banner */}
      <FooterBanner onOpenCompetitionGuide={handleOpenCompetitionGuide} />

      {/* Live Demo Modal for Judges & Teachers */}
      <LiveDemoModal
        isOpen={isLiveDemoOpen}
        onClose={handleCloseLiveDemo}
        onSendToStudentWall={handleSendToStudentWall}
      />

      {/* 8-Criteria Competition Dossier Modal */}
      <CompetitionGuideModal
        isOpen={isCompetitionGuideOpen}
        onClose={handleCloseCompetitionGuide}
        onJumpToLiveDemo={() => {
          setIsCompetitionGuideOpen(false);
          setIsLiveDemoOpen(true);
        }}
        onJumpToStudent={() => {
          setIsCompetitionGuideOpen(false);
          setCurrentView('student');
        }}
        onJumpToTeacher={() => {
          setIsCompetitionGuideOpen(false);
          setCurrentView('teacher');
        }}
      />
    </div>
  );
}
