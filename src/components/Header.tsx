"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

interface HeaderProps {
  activeSection: number;
  scrollProgress: number;
}

export default function Header({ activeSection, scrollProgress }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const progressPercent = Math.round(scrollProgress * 100);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const current = STORY_SECTIONS[activeSection];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? "rgba(2, 4, 8, 0.95)"
            : "rgba(2, 4, 8, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          transition: "background 0.5s ease",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-16">
          {/* Logo Section */}
          <button
            onClick={scrollToHero}
            className="flex flex-col items-start leading-none gap-1 group relative"
          >
            <span className="text-[9px] font-mono text-blue-400/70 tracking-[0.3em] uppercase">
              Operational Log
            </span>
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                The Pilot&apos;s Son
              </span>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <span className="hidden md:block text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-0.5">
                {current?.era || "Introduction"}
              </span>
            </div>
            
            {/* Hover glow */}
            <div className="absolute -inset-x-4 -inset-y-2 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-lg transition-colors duration-300" />
          </button>

          {/* Enhanced Nav Buttons */}
          <nav className="hidden lg:flex items-center gap-2">
            {STORY_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group relative px-4 py-2 rounded-md transition-all duration-300"
              >
                <span 
                  className="relative z-10 text-[11px] font-mono uppercase tracking-widest transition-colors duration-300"
                  style={{
                    color: activeSection === i ? s.accentColor : "rgba(255,255,255,0.4)",
                  }}
                >
                  {s.shortTitle}
                </span>
                
                {/* Background pill */}
                <motion.div 
                  className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ 
                    background: `${s.accentColor}10`,
                    border: `1px solid ${s.accentColor}20` 
                  }}
                />
                
                {/* Active indicator */}
                {activeSection === i && (
                  <motion.div
                    layoutId="header-active-pill"
                    className="absolute inset-0 rounded-md z-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ 
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${s.accentColor}50`,
                      boxShadow: `inset 0 0 10px ${s.accentColor}10`
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Metrics */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex flex-col items-end gap-1 font-mono">
              <span className="text-[8px] text-neutral-600 uppercase tracking-tighter">Transmission Integrity</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-1 rounded-full ${i < 4 ? 'bg-blue-500/40' : 'bg-neutral-800'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Progress</span>
                <span className="text-sm font-mono text-white font-bold">{progressPercent}%</span>
              </div>
              
              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {[0, 1].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-0.5 rounded-full bg-white/80"
                    animate={{
                      width: "18px",
                      rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 1 ? -45 : 0,
                      y: menuOpen && i === 0 ? 4 : menuOpen && i === 1 ? -4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Progress line */}
        <div className="h-0.5 w-full bg-white/5">
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: scrollProgress,
              background: current
                ? `linear-gradient(90deg, transparent, ${current.accentColor}, ${current.accentColor}88)`
                : "linear-gradient(90deg, transparent, #4a90d9, #8e44ad)",
              transition: "background 0.8s ease",
            }}
          />
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden overflow-hidden"
            style={{
              background: "rgba(4, 6, 14, 0.98)",
              backdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="p-4 space-y-1">
              <button
                onClick={scrollToHero}
                className="w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
              >
                00. Introduction
              </button>
              {STORY_SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="w-full group flex items-center justify-between px-4 py-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
                  style={{
                    color: activeSection === i ? s.accentColor : "rgba(255,255,255,0.7)",
                  }}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{s.era}</span>
                    <span className="text-sm font-semibold tracking-wide">{s.title}</span>
                  </div>
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ background: activeSection === i ? s.accentColor : "transparent", boxShadow: activeSection === i ? `0 0 10px ${s.accentColor}` : 'none' }} 
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
