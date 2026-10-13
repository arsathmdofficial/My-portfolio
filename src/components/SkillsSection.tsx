import React, { useState } from 'react';
import { Layout, Server, Database, Sparkles, Wrench, Terminal, Code2, GitFork, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'frontend':
        return <Layout className="w-5 h-5 text-blue-600" />;
      case 'backend':
        return <Server className="w-5 h-5 text-indigo-600" />;
      case 'database':
        return <Database className="w-5 h-5 text-cyan-600" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'tools':
        return <Wrench className="w-5 h-5 text-slate-700" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const displayedCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.categoryKey === selectedCategory);

  return (
    <section id="skills" className="py-16 md:py-20 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
              02. Technical Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Technical Skills & Tooling
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Organized domain competencies verified through hands-on development, database connectivity, and generative intelligence workflows.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-xl">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map(cat => (
              <button
                key={cat.categoryKey}
                onClick={() => setSelectedCategory(cat.categoryKey)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.categoryKey
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map(cat => (
            <div
              key={cat.categoryKey}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            >
              <div>
                {/* Card Title & Icon */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    {getCategoryIcon(cat.categoryKey)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      {cat.skills.length} Core Technologies
                    </span>
                  </div>
                </div>

                {/* Skills List without fake percentages */}
                <div className="space-y-3.5">
                  {cat.skills.map(skill => (
                    <div key={skill.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          {skill.name}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed pl-3 border-l border-slate-100">
                        {skill.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Verified in Project Code</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
