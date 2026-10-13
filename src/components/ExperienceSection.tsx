import React from 'react';
import { Briefcase, CheckCircle2, Code2, Server, Database, Sparkles, Layers } from 'lucide-react';
import { EXPERIENCE_LIST } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-20 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
            05. Practical Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Software Development Practice
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Accurate representation of 2+ years of hands-on full-stack development, architectural design, database connectivity, and personal software engineering projects.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="space-y-6">
          {EXPERIENCE_LIST.map((exp, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:border-blue-200 transition-colors"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-900">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-xs text-blue-600 font-mono mt-0.5 font-semibold">
                    {exp.type}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-700 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 sm:text-right">
                  {exp.period}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {exp.summary}
              </p>

              {/* Key Technical Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Technology Stack Tags */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                  Applied Stack & Frameworks
                </span>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-slate-600 font-mono">
                  {exp.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span className="font-semibold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                        {tech}
                      </span>
                      {tIdx < exp.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
