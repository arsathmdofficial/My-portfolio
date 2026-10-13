import React, { useState } from 'react';
import { Award, Building2, CheckCircle2, ShieldCheck, Eye, ExternalLink } from 'lucide-react';
import { ACHIEVEMENTS, CERTIFICATES_DATA } from '../data/portfolioData';
import { CertificateItem } from '../types';

interface AchievementsSectionProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onSelectCertificate }) => {
  return (
    <section id="achievements" className="py-16 md:py-20 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
            04. Honors & Technical Activities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Achievements & Inter-Collegiate Certificates
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Verified competitive symposiums, hackathons, and debugging achievements hosted across prestigious universities in Chennai.
          </p>
        </div>

        {/* Overview Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-2.5 text-blue-600 mb-3">
            <Award className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">
              Inter-Collegiate Technical Record
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {ACHIEVEMENTS.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
            {ACHIEVEMENTS.description}
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            {ACHIEVEMENTS.events.map((evt, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {evt}
              </span>
            ))}
          </div>
        </div>

        {/* 5 Verified College Certificate Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-slate-700 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" /> Host Colleges & Issued Credentials
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Click any card to inspect certificate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES_DATA.map(cert => (
              <div
                key={cert.id}
                onClick={() => onSelectCertificate(cert)}
                className="group bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-blue-600 font-semibold uppercase">
                      {cert.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                    {cert.college}
                  </h4>

                  <div className="text-xs text-slate-500 font-medium mb-3">
                    {cert.title} · {cert.location}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cert.disciplines.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Credential
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
