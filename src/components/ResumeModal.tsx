import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE_LIST, ACHIEVEMENTS, EDUCATION } from '../data/portfolioData';
import { generateResumePdf } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${PERSONAL_INFO.name.toUpperCase()}
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

EXPERIENCE
Software Development (Hands-on Practice) | 2+ Years
• Built responsive user interfaces using HTML, CSS, and JavaScript.
• Developed application logic and data processing in Python.
• Created backend services and REST API workflows with Node.js and Express.js.
• Used Mongoose with MongoDB, and SQL databases, for CRUD operations, queries, and joins.
• Integrated frontend and backend through APIs and database connectivity, applying validation, debugging, and error handling.
• Explored Generative AI and prompt engineering through practical projects.

SELECTED PROJECTS
${PROJECTS.map(p => `${p.title} | ${p.role}\n${p.bulletPoints.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

EDUCATION
${EDUCATION.degree} ${EDUCATION.status}
${EDUCATION.institution}

ACHIEVEMENTS & TECHNICAL ACTIVITIES
• Participated in inter-collegiate technical and creative events across Guru Nanak College, SRM College, The New College, Hindustan College, and New Prince Shri Bhavani College.
• Received certificates for participation and achievement in inter-collegiate technical events.

STRENGTHS, LANGUAGES & INTERESTS
Strengths: ${PERSONAL_INFO.strengths.join(', ')}
Languages: Tamil, English | Interests: ${PERSONAL_INFO.interests.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 text-slate-900 flex flex-col gap-4 max-h-[94vh]"
        role="dialog"
        aria-label="Resume of Mohamed Arsath H"
      >
        {/* Actions Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-600 font-mono font-bold uppercase">Curriculum Vitae</span>
            <span className="text-xs text-slate-300">·</span>
            <span className="text-xs text-slate-700 font-medium">Mohamed Arsath H</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Full CV!' : 'Copy Text'}
            </button>

            <button
              onClick={() => generateResumePdf()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              title="Download ATS-ready PDF"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="overflow-y-auto pr-1 resume-sheet bg-white text-slate-900 p-6 sm:p-8 rounded-xl font-sans text-sm border border-slate-100">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-5 mb-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase mb-1">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-xs font-semibold text-blue-600 tracking-wide uppercase mb-2">
              Full-Stack Developer | Python | JavaScript | AI & Generative AI
            </div>
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Tambaram, Chennai
              </span>
              <span>·</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                <Phone className="w-3 h-3 text-slate-400" />
                {PERSONAL_INFO.phone}
              </a>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                <Mail className="w-3 h-3 text-slate-400" />
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-800 text-justify">
              {PERSONAL_INFO.summary}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              <div><strong>Languages:</strong> Python, JavaScript, SQL</div>
              <div><strong>Frontend:</strong> HTML5, CSS3, JavaScript, Responsive UI, DOM, Forms</div>
              <div><strong>Backend:</strong> Python, Node.js, Express.js, REST APIs</div>
              <div><strong>Databases:</strong> MongoDB, SQL (CRUD, queries, joins), Mongoose ODM</div>
              <div><strong>AI:</strong> Artificial Intelligence, Generative AI, Prompt Engineering</div>
              <div><strong>Concepts & Tools:</strong> Functions, Conditionals, Arrays, Loops, Validation, Debugging, Error Handling; MS Excel; R (basic)</div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Experience
            </h2>
            {EXPERIENCE_LIST.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-slate-950 text-xs">{exp.role} ({exp.type})</div>
                  <div className="text-xs text-slate-600 font-medium">{exp.period}</div>
                </div>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-800">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Selected Projects */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Selected Projects
            </h2>
            <div className="space-y-3.5">
              {PROJECTS.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="font-bold text-slate-950 text-xs">
                      {project.title} <span className="font-normal text-slate-600">| {project.role}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs space-y-0.5 text-slate-800">
                    {project.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="font-bold text-slate-950">{EDUCATION.degree}</span>
                <div className="text-slate-700">{EDUCATION.institution}</div>
              </div>
              <div className="font-medium text-slate-600">{EDUCATION.status}</div>
            </div>
          </section>

          {/* Achievements & Technical Activities */}
          <section className="mb-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Achievements & Technical Activities
            </h2>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-800">
              <li>
                Participated in inter-collegiate technical and creative events: Digital Tooling, Poster Designing, UI Designing, PPT Presentation, Meme Designing, Hackathons, Debugging, and Problem Solving.
              </li>
              <li>
                Events hosted by Guru Nanak College (Meenambakkam), SRM College, The New College (Royapettah), Hindustan College (Padur), and New Prince Shri Bhavani College (Medavakkam).
              </li>
              <li>
                Received certificates for participation and achievement in inter-collegiate technical events.
              </li>
            </ul>
          </section>

          {/* Strengths, Languages & Interests */}
          <section>
            <h2 className="text-xs font-bold tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1 mb-2">
              Strengths, Languages & Interests
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              <div><strong>Strengths:</strong> {PERSONAL_INFO.strengths.join(', ')}</div>
              <div><strong>Languages:</strong> Tamil, English &nbsp;|&nbsp; <strong>Interests:</strong> {PERSONAL_INFO.interests.join(', ')}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
