import React from 'react';
import { X, Play, Gamepad2, Activity, Navigation, Calculator, CircleDot, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface InteractivePlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemo: (demoType: Project['demoType']) => void;
}

export const InteractivePlaygroundModal: React.FC<InteractivePlaygroundModalProps> = ({
  isOpen,
  onClose,
  onSelectDemo
}) => {
  if (!isOpen) return null;

  const demos = [
    {
      type: 'snake' as const,
      title: 'Browser Snake Arcade',
      category: 'Game Engine & Event Handling',
      icon: Gamepad2,
      description: 'Classic 2D coordinate grid snake game with keyboard listeners, responsive on-screen D-pad, real-time collision detection, and high score caching.',
      accent: 'text-emerald-600',
      badge: 'Playable Arcade'
    },
    {
      type: 'carrom' as const,
      title: 'Carrom Mini Game Simulation',
      category: '2D Vector Physics & Mechanics',
      icon: CircleDot,
      description: 'Browser carrom board simulator featuring 2D striker physics, adjustable baseline positioning, angle aim-line, variable strike force, collision impulses, and corner pocket scoring.',
      accent: 'text-amber-600',
      badge: 'Interactive Physics'
    },
    {
      type: 'calculator' as const,
      title: 'Precision Developer Calculator',
      category: 'Arithmetic Engine & Validation',
      icon: Calculator,
      description: 'Interactive calculator with strict input validation, expression evaluation, operator precedence, division-by-zero protection, keyboard typing support, and history tape.',
      accent: 'text-blue-600',
      badge: 'Utility Tool'
    },
    {
      type: 'fittrack' as const,
      title: 'FitTrack AI Routine Engine',
      category: 'Generative AI & Data Pipelines',
      icon: Activity,
      description: 'Interactive fitness recommendation engine computing target BMR/TDEE macros and algorithmic 4-day workout splits, coupled with the underlying Python prompt payload.',
      accent: 'text-cyan-600',
      badge: 'AI Application'
    },
    {
      type: 'mentro' as const,
      title: 'Mentro Mobility Platform Simulator',
      category: 'Full-Stack Architecture & Workflow',
      icon: Navigation,
      description: 'Dual-sided mobility simulator demonstrating both customer ride booking state machine (dispatch, driver match, en route) and driver partner operations portal.',
      accent: 'text-blue-600',
      badge: 'Platform Simulator'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-900 flex flex-col gap-5 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-label="Interactive Demos Playground"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs text-blue-600 font-mono uppercase tracking-wider font-semibold">Interactive Testbeds & Demos</div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Hands-on Project Playground
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Select any live demo below to test the game logic, UI event architecture, algorithms, and simulated workflows built by Mohamed Arsath H.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demos.map(demo => {
            const Icon = demo.icon;
            return (
              <div
                key={demo.type}
                className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all hover:-translate-y-0.5 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        <Icon className={`w-5 h-5 ${demo.accent}`} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {demo.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono block">
                          {demo.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {demo.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onSelectDemo(demo.type);
                  }}
                  className="w-full py-2 px-3 bg-white hover:bg-blue-600 border border-slate-200 hover:border-blue-600 text-slate-700 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Launch Interactive Demo
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
