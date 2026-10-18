import React from 'react';
import { AppView } from '../types';
import owlAvatar from '../assets/images/mascot_owl_avatar_1792338340957.jpg';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenLiveDemo: () => void;
  onOpenCompetitionGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenLiveDemo,
  onOpenCompetitionGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark & learning owl */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
        >
          <img
            src={owlAvatar}
            alt="Mascot Tường học tập AI"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover shadow-xs border border-sky-200 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                Tường học tập
              </span>
              <span className="bg-sky-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded leading-none">
                AI
              </span>
            </div>
            <span className="text-[11px] text-sky-700 font-semibold tracking-tight whitespace-nowrap mt-1">
              Truy gốc lỗi · Error Root Tracer
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors cursor-pointer ${
              currentView === 'landing' ? 'text-sky-700 font-bold border-b-2 border-sky-600 pb-0.5' : ''
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onNavigate('student')}
            className={`whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors cursor-pointer ${
              currentView === 'student' ? 'text-sky-700 font-bold border-b-2 border-sky-600 pb-0.5' : ''
            }`}
          >
            Góc Học Sinh
          </button>
          <button
            onClick={() => onNavigate('teacher')}
            className={`whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors cursor-pointer ${
              currentView === 'teacher' ? 'text-sky-700 font-bold border-b-2 border-sky-600 pb-0.5' : ''
            }`}
          >
            Bảng Giáo Viên
          </button>
          <button
            onClick={onOpenCompetitionGuide}
            className="whitespace-nowrap shrink-0 hover:text-amber-700 text-amber-700 font-semibold transition-colors cursor-pointer"
          >
            Hồ sơ 8 tiêu chí dự thi
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenLiveDemo}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Bật Trình Diễn AI (Live Demo)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
