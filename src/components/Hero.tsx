import React, { useState, useEffect } from 'react';
import { User, ArrowRight, ChevronDown, Layers, Brain } from 'lucide-react';
import cosmicHeroBg from '../assets/images/cosmic_moon_landscape_hero_1791871120882.jpg';

interface HeroProps {
  onOpenResume?: () => void;
  onOpenPlayground?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [typedTitle, setTypedTitle] = useState<string>('PYTHON FULL STACK SOFTWARE DEVELOPER');
  const fullTitle = 'PYTHON FULL STACK SOFTWARE DEVELOPER';

  // Typing effect on initial mount
  useEffect(() => {
    let index = 0;
    setTypedTitle('');
    const timer = setInterval(() => {
      index += 1;
      setTypedTitle(fullTitle.slice(0, index));
      if (index >= fullTitle.length) {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center text-center overflow-hidden bg-slate-950 select-none"
    >
      {/* 1. Cinematic Cosmic Night Sky Background (Production-safe asset bundling + CSS fallback) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmicHeroBg})` }}
      >
        <img
          src={cosmicHeroBg}
          alt="Cosmic Night Sky Moon and Distant Mountains"
          className="w-full h-full object-cover object-center transform scale-105"
          loading="eager"
          // @ts-expect-error fetchpriority attribute in modern browsers
          fetchpriority="high"
          onError={(e) => {
            // Production public directory fallback
            e.currentTarget.src = '/assets/images/cosmic_moon_landscape_hero_1791871120882.jpg';
          }}
        />

        {/* Ambient Cosmic Overlays (subtle gradient scrims preserving moon, rings, mountains, and lake clarity) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Subtle shooting star elements */}
        <div className="hidden sm:block absolute top-24 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-white transform -rotate-35 animate-shooting-star pointer-events-none opacity-80" />
        <div className="hidden sm:block absolute top-40 left-1/5 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-white transform -rotate-35 animate-shooting-star pointer-events-none opacity-60" style={{ animationDelay: '3s' }} />
      </div>

      {/* Decorative Handwritten Phrase on Right (Laptop/Desktop) */}
      <div 
        className="hidden xl:block absolute right-12 2xl:right-20 top-1/2 -translate-y-12 z-20 pointer-events-none select-none text-right font-serif italic text-blue-100/90 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] tracking-wider"
        aria-hidden="true"
      >
        <p className="text-xl leading-relaxed font-light">
          “Code.<br />
          &nbsp;&nbsp;Build.<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Explore.<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grow...”
        </p>
      </div>

      {/* Spacing filler for fixed header */}
      <div className="h-20 sm:h-24 w-full" />

      {/* 2. Main Centered Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 py-8 flex flex-col items-center justify-center my-auto">
        {/* Small Introductory Label */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.3em] text-blue-200/90 font-mono font-medium uppercase mb-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-in fade-in duration-700">
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-blue-300/80" />
          <span>HELLO, I AM</span>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-blue-300/80" />
        </div>

        {/* Main Heading: Mohamed Arsath H */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-white mb-4 drop-shadow-[0_0_35px_rgba(37,99,235,0.7)] font-bold">
          Mohamed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-300 to-blue-400 drop-shadow-[0_0_40px_rgba(96,165,250,0.9)]">Arsath H</span>
        </h1>

        {/* Professional Title with Typing Cursor */}
        <div className="flex items-center justify-center text-xs sm:text-sm md:text-base font-mono font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-blue-100 uppercase mb-6 sm:mb-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]">
          <span>{typedTitle}</span>
          <span className="inline-block w-2.5 h-4 sm:h-5 bg-blue-400 ml-1 shadow-[0_0_8px_rgba(96,165,250,1)] animate-cursor-blink" />
        </div>

        {/* Technology Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 max-w-3xl mb-8 sm:mb-10 text-xs text-slate-100">
          {/* Python */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-blue-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 6 4.5 6 4.5V7H12V8H4.5C4.5 8 2 8.4 2 13C2 17.6 4.2 17.5 4.2 17.5H6V15C6 13.34 7.34 12 9 12H15C16.1 12 17 11.1 17 10V4.5C17 4.5 16.6 2 12 2Z" fill="#38bdf8"/>
              <path d="M12 22C17.52 22 18 19.5 18 19.5V17H12V16H19.5C19.5 16 22 15.6 22 11C22 6.4 19.8 6.5 19.8 6.5H18V9C18 10.66 16.66 12 15 12H9C7.9 12 7 12.9 7 14V19.5C7 19.5 7.4 22 12 22Z" fill="#fbbf24"/>
            </svg>
            <span className="font-medium tracking-wide">Python</span>
          </div>

          <span className="hidden sm:inline text-blue-400/60 font-light" aria-hidden="true">|</span>

          {/* JavaScript */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-blue-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center font-mono">JS</span>
            <span className="font-medium tracking-wide">JavaScript</span>
          </div>

          <span className="hidden sm:inline text-blue-400/60 font-light" aria-hidden="true">|</span>

          {/* Full Stack Development */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-blue-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-medium tracking-wide">Full Stack Development</span>
          </div>

          <span className="hidden sm:inline text-blue-400/60 font-light" aria-hidden="true">|</span>

          {/* AI & Generative AI */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-blue-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="font-medium tracking-wide">AI & Generative AI</span>
          </div>
        </div>

        {/* 3. Primary Call-To-Action: Glowing Electric-Blue Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={scrollToAbout}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border-2 border-blue-400 text-white font-semibold text-sm sm:text-base tracking-wide backdrop-blur-lg shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(96,165,250,0.85)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/40"
            aria-label="Scroll to About Me section"
          >
            <User className="w-4 h-4 text-blue-200 transition-transform duration-300 group-hover:scale-110" />
            <span>View About Me</span>
            <ArrowRight className="w-4 h-4 text-blue-200 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* 4. Bottom Scroll Cue with Glowing Circle Chevron */}
      <div className="relative z-20 flex flex-col items-center pb-6 sm:pb-8">
        {/* Luminous vertical guide line */}
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-blue-400/60 via-blue-400/40 to-transparent" />

        {/* Glowing Chevron Circle Button */}
        <button
          onClick={scrollToAbout}
          className="mt-1 p-2 sm:p-2.5 rounded-full bg-blue-950/70 border border-blue-400/70 text-blue-300 hover:text-white hover:border-blue-300 hover:bg-blue-900/80 shadow-[0_0_16px_rgba(59,130,246,0.7)] backdrop-blur-md transition-all hover:scale-110 active:scale-95 animate-float-indicator focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          title="Scroll down to About section"
          aria-label="Scroll down to About section"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
