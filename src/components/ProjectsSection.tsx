import React, { useState } from 'react';
import { Play, Sparkles, Layers, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onOpenDemo: (demoType: Project['demoType']) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onSelectProject, 
  onOpenDemo 
}) => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'fullstack' | 'games'>('all');

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-16 md:py-20 border-b border-slate-200 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
              03. Featured Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Selected Applications & Interactive Systems
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Inspectable codebases, full-stack database architectures, AI prompt pipelines, and playable interactive browser games built with clean logic and event handling.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl self-start md:self-auto shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All 6 Projects
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'ai'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI Applications
            </button>
            <button
              onClick={() => setFilter('fullstack')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'fullstack'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full-Stack & APIs
            </button>
            <button
              onClick={() => setFilter('games')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filter === 'games'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Games & Tools
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0 || index === 1; // Bento wide card
            return (
              <div
                key={project.id}
                className={`group flex flex-col justify-between bg-white border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container */}
                <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                  {/* Top Badges: Role and Honest Development Status */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs gap-2">
                    <span className="text-white font-mono bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-700/60 font-medium text-[11px] truncate">
                      {project.role}
                    </span>
                    <span className="text-emerald-300 font-mono bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 rounded-md border border-slate-700 text-[10px] whitespace-nowrap">
                      {project.developmentStatus}
                    </span>
                  </div>

                  {/* Metrics overlay */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-3 text-xs font-mono text-white font-medium drop-shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      {project.metrics}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                          title="View Repository on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Tech Stack Unboxed Metadata */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-mono">
                      {project.techStack.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-800 font-medium">{tech}</span>
                          {tIdx < project.techStack.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Details Modal + Working Live Demo */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      Architecture & Details
                    </button>

                    {project.hasInteractiveDemo && project.demoType && (
                      <button
                        onClick={() => onOpenDemo(project.demoType)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all hover:scale-105"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Play / Test Live
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
