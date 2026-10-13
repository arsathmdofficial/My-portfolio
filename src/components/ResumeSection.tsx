import React, { useState } from 'react';
import { Download, FileText, Printer, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf } from '../utils/generateResumePdf';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyText = () => {
    const text = `
MOHAMED ARSATH H
Full-Stack Developer | Python | JavaScript | AI & Generative AI
Tambaram, Chennai | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

TECHNICAL SKILLS
Languages: Python, JavaScript, SQL
Frontend: HTML5, CSS3, JavaScript, Responsive UI, DOM, Forms
Backend: Python, Node.js, Express.js, REST APIs
Databases: MongoDB, SQL (CRUD, queries, joins), Mongoose ODM
AI: Artificial Intelligence, Generative AI, Prompt Engineering
Concepts & Tools: Functions, Conditionals, Arrays, Loops, Validation, Debugging, Error Handling; MS Excel; R (basic)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="py-16 md:py-20 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold mb-2">
              05. Curriculum Vitae
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Resume & Credentials
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Download the official ATS-compliant PDF resume or explore the full interactive curriculum vitae directly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => generateResumePdf()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              Download PDF Resume
            </button>

            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold shadow-2xs transition-colors"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              Open Interactive CV
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-medium transition-colors"
              title="Copy plain text summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>
        </div>

        {/* Resume Preview Banner Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Developer Resume · Mohamed Arsath H
              </h3>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Full-Stack Developer · Python, JavaScript, SQL & Generative AI · BCA 2027
              </div>
              <p className="text-xs text-slate-600 mt-2 max-w-xl">
                Features verified hands-on development practice, Mentro Mobility AI, FitTrack AI, Mongoose APIs, browser games, and collegiate technical achievements.
              </p>
            </div>
          </div>

          <button
            onClick={() => generateResumePdf()}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
};
