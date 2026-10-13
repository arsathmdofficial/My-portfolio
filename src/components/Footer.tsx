import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf } from '../utils/generateResumePdf';

interface FooterProps {
  onOpenResume: () => void;
  onOpenPlayground: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenPlayground }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-slate-900 tracking-tight text-sm block">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-slate-500 mt-1 block">
            Full-Stack Developer · Python, JavaScript, SQL & Generative AI · Tambaram, Chennai
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
          <a href="#home" className="hover:text-blue-600 transition-colors">
            Top
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-blue-600 transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-blue-600 transition-colors">
            Projects
          </a>
          <a href="#experience" className="hover:text-blue-600 transition-colors">
            Experience
          </a>
          <button
            onClick={() => generateResumePdf()}
            className="hover:text-blue-600 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={onOpenPlayground}
            className="hover:text-blue-600 transition-colors"
          >
            Playable Demos
          </button>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div>

        <div className="text-slate-400 text-[11px] text-center md:text-right">
          © {new Date().getFullYear()} Mohamed Arsath H. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
