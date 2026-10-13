import React from 'react';
import { GraduationCap, Code2, BookOpen, Brain, CheckCircle2, MapPin, Calendar, Compass } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-20 border-b border-slate-200 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
            01. Background & Education
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            About Me & Academic Foundation
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            A transparent overview of formal computer applications education, intensive hands-on coding practice, and technical problem-solving focus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Professional Introduction & Hands-on Practice Distinction (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                Engineering Philosophy & Practical Approach
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                I am a Python Full Stack Developer with 2+ years of focused, hands-on software development experience. My focus spans building intuitive, responsive web interfaces, designing backend services with Node.js and Express, connecting persistent databases, and experimenting with Generative AI prompt architectures.
              </p>

              {/* Explicit Recruiter Distinction */}
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl mb-6 text-xs text-slate-700 leading-relaxed">
                <strong className="text-blue-900 block mb-1 font-semibold flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-600" /> Hands-on Practice Distinction:
                </strong>
                My 2+ years of experience is derived from intensive, hands-on project development, end-to-end full-stack architectures (such as Mentro Mobility AI and FitTrack AI), interactive browser game logic, and competitive collegiate hackathons. I believe in demonstrating capability through inspectable, working code and real interactive testbeds rather than inflated employment claims.
              </div>

              {/* Strengths & Problem Solving */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-semibold block">
                  Core Problem Solving & Technical Strengths
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {PERSONAL_INFO.strengths.map(strength => (
                    <div key={strength} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Interests & Languages Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-600" />
                Technical Interests & Communication
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Languages Spoken:</span>
                  <p>{PERSONAL_INFO.languagesSpoken.join(' · ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">Primary Interests:</span>
                  <p>{PERSONAL_INFO.interests.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BCA Education Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">Higher Education</span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {EDUCATION.period}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {EDUCATION.degree}
              </h3>

              <div className="text-sm font-semibold text-blue-700 mb-2">
                {EDUCATION.institution}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-6">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {EDUCATION.location}
                </span>
                <span>·</span>
                <span className="text-blue-600 font-semibold">{EDUCATION.status}</span>
              </div>

              <div className="space-y-3 border-t border-slate-100 pt-5 text-xs text-slate-600">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold block">
                  Curriculum Highlights
                </span>
                {EDUCATION.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono">
              Academic Status: Active BCA Student (Expected 2027)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
