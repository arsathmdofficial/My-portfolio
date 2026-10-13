import React from 'react';
import { X, Play, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenDemo: (demoType: Project['demoType']) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  onClose, 
  onOpenDemo 
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-900 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-label={`${project.title} Project Details`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs text-blue-600 font-mono tracking-wider uppercase font-semibold mb-1">
              {project.role}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Image & Visual Header */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          {project.metrics && (
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-1 text-xs font-mono text-blue-700 font-semibold shadow-xs">
              {project.metrics}
            </div>
          )}
        </div>

        {/* Long Description */}
        <div className="text-sm text-slate-600 leading-relaxed">
          {project.longDesc}
        </div>

        {/* Resume Bullet Points */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
            Key Engineering Highlights
          </span>
          <ul className="space-y-2 text-xs text-slate-700">
            {project.bulletPoints.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture Highlights if any */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" /> Technical Architecture
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {project.architectureHighlights.map((arch, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-mono font-semibold">0{idx + 1}.</span>
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Unboxed Metadata */}
        <div>
          <span className="text-xs text-slate-500 block mb-2 font-mono uppercase font-semibold">
            Technologies Applied
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700 font-mono">
            {project.techStack.map((tech, i) => (
              <React.Fragment key={tech}>
                <span className="font-medium text-slate-800">{tech}</span>
                {i < project.techStack.length - 1 && <span className="text-slate-300">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Button: Try Live Demo */}
        {project.hasInteractiveDemo && project.demoType && (
          <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Interactive testbed available in this portfolio.
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenDemo(project.demoType);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Interactive Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
