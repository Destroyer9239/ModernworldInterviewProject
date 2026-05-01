"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

interface HeaderProps {
  activeSection: number;
  scrollProgress: number;
}

export default function Header({ activeSection, scrollProgress }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            ? "rgba(2, 4, 8, 0.92)"
            : "rgba(2, 4, 8, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Main header row */}
        <div className="flex items-center justify-between px-5 md:px-8 h-14">
          {/* Logo / title */}
          <button
            onClick={scrollToHero}
            className="flex flex-col items-start leading-none gap-0.5 group"
          >
            <span className="text-[10px] font-mono text-neutral-500 tracking-[0.25em] uppercase transition-colors group-hover:text-neutral-400">
              Memories of the Modern World
            </span>
            <span
              className="text-sm font-bold text-white tracking-wide"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Pilot&apos;s Son
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {STORY_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                style={{
                  color: activeSection === i ? s.accentColor : "rgba(255,255,255,0.4)",
                  background: activeSection === i ? `${s.accentColor}15` : "transparent",
                }}
              >
                {s.shortTitle}
                {activeSection === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{ border: `1px solid ${s.accentColor}44` }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: progress + hamburger */}
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs font-mono text-neutral-600">
              {Math.round(scrollProgress * 100)}%
            </span>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-0.5 rounded-full bg-white/60"
                  animate={{
                    width: menuOpen && i === 1 ? "0px" : "20px",
                    rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                    y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: current
                ? `linear-gradient(90deg, ${current.accentColor}, ${current.accentColor}88)`
                : "linear-gradient(90deg, #4a90d9, #8e44ad)",
              transition: "background 0.6s ease",
            }}
          />
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed top-14 left-0 right-0 z-40 lg:hidden"
            style={{
              background: "rgba(4, 6, 14, 0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Home link */}
            <button
              onClick={scrollToHero}
              className="w-full text-left px-6 py-3.5 text-xs font-mono uppercase tracking-widest border-b border-white/5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Introduction
            </button>
            {STORY_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="w-full flex items-center gap-3 px-6 py-3.5 border-b border-white/5 transition-colors"
                style={{
                  color: activeSection === i ? s.accentColor : "rgba(255,255,255,0.6)",
                  background: activeSection === i ? `${s.accentColor}0a` : "transparent",
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: `${s.accentColor}66`, minWidth: "4rem" }}
                >
                  {s.era}
                </span>
                <span className="text-sm">{s.title}</span>
                {activeSection === i && (
                  <span className="ml-auto text-xs font-mono opacity-60">Active</span>
                )}
              </button>
            ))}
            <div className="px-6 py-4 text-xs font-mono text-neutral-700 flex items-center justify-between">
              <span>Scroll progress</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
