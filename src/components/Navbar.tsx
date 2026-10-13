import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, FileText, Sparkles, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { generateResumePdf } from '../utils/generateResumePdf';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenPlayground: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenPlayground }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled beyond top hero
      setIsScrolled(window.scrollY > 80);

      // Scroll Spy for active nav highlight
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'experience', 'resume', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md text-white py-3' 
          : 'bg-transparent text-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-6">
        {/* Left: MA Monogram Logo */}
        <a 
          href="#home" 
          className="group flex items-center gap-2 shrink-0 select-none"
          title="Mohamed Arsath H — Portfolio"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tighter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-transform duration-300 group-hover:scale-105">
              <span className="text-white">M</span>
              <span className="text-blue-400 italic">A</span>
            </span>
          </div>
        </a>

        {/* Center: Home, About, Skills, Projects, Achievements, Contact */}
        <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium tracking-wide">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive 
                    ? 'text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' 
                    : 'text-slate-200 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: GitHub, LinkedIn, Email icons + Resume action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* GitHub icon */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn icon */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Email icon */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-full text-slate-300 hover:text-cyan-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
            title="Send Email"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Quick PDF Resume Download button */}
          <button
            onClick={() => generateResumePdf()}
            className="ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/50 text-white text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-sm transition-all hover:scale-105"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5 text-blue-300" />
            Resume
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => generateResumePdf()}
            className="p-2 rounded-full text-white bg-blue-600/40 border border-blue-400/40"
            title="Download PDF"
            aria-label="Download Resume PDF"
          >
            <Download className="w-4 h-4 text-blue-300" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white bg-white/10 hover:bg-white/20 rounded-lg focus:outline-none backdrop-blur-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-6 py-5 flex flex-col gap-3 text-sm text-slate-200 shadow-2xl animate-in fade-in duration-150">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 flex items-center justify-between ${
                activeSection === link.id ? 'text-blue-400 font-bold' : 'hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </a>
          ))}

          {/* Socials row on mobile */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-around">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-300 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-300 hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 text-slate-300 hover:text-cyan-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="px-3 py-1 text-xs font-semibold rounded bg-blue-600/40 border border-blue-400/50 text-white"
            >
              Full CV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
