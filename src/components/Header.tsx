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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(12,13,17,0.92)" : "rgba(12,13,17,0.4)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          borderBottom: scrolled
            ? "1px solid var(--rule-strong)"
            : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* Wordmark */}
          <button
            onClick={scrollToHero}
            className="flex items-baseline gap-3 group"
          >
            <span
              className="serif italic"
              style={{
                fontSize: "20px",
                color: "var(--ink)",
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              The Pilot&apos;s Son
            </span>
            <span className="hidden md:block kicker" style={{ color: "var(--ink-mute)" }}>
              An Oral History
            </span>
          </button>

          {/* Center — section name (desktop) */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
              {scrolled && STORY_SECTIONS[activeSection] && (
                <motion.span
                  key={STORY_SECTIONS[activeSection].id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="kicker tabular-nums"
                  style={{ color: "var(--ink-mute)" }}
                >
                  Ch. {String(activeSection + 1).padStart(2, "0")}
                  <span className="mx-2" style={{ color: "var(--ink-faint)" }}>·</span>
                  <span style={{ color: "var(--ink-soft)" }}>
                    {STORY_SECTIONS[activeSection].title}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Right — progress + menu */}
          <div className="flex items-center gap-5">
            <span
              className="hidden md:inline-block kicker tabular-nums"
              style={{ color: "var(--ink-mute)" }}
            >
              {Math.round(scrollProgress * 100).toString().padStart(2, "0")}%
            </span>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] p-1"
              aria-label="Toggle menu"
            >
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px rounded-full"
                  style={{ background: "var(--ink)" }}
                  animate={{
                    width: "22px",
                    rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 1 ? -45 : 0,
                    y: menuOpen && i === 0 ? 3 : menuOpen && i === 1 ? -3 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Hairline progress */}
        <div className="h-px w-full" style={{ background: "var(--rule)" }}>
          <motion.div
            className="h-full"
            style={{
              width: `${scrollProgress * 100}%`,
              background: "var(--accent)",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </motion.header>

      {/* Slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: "rgba(12,13,17,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--rule-strong)",
            }}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
              <p className="kicker mb-6" style={{ color: "var(--accent)" }}>
                Contents
              </p>
              <button
                onClick={scrollToHero}
                className="block w-full text-left py-3 transition-colors"
                style={{ color: "var(--ink-soft)", borderBottom: "1px solid var(--rule)" }}
              >
                <span className="serif italic" style={{ fontSize: "18px" }}>
                  Introduction
                </span>
              </button>
              {STORY_SECTIONS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="grid grid-cols-[3rem_1fr_auto] gap-5 items-baseline w-full text-left py-4 group transition-colors"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <span
                    className="serif tabular-nums"
                    style={{
                      fontSize: "18px",
                      color: activeSection === i ? s.accentColor : "var(--ink-mute)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "20px",
                      color: activeSection === i ? "var(--ink)" : "var(--ink-soft)",
                      fontStyle: activeSection === i ? "italic" : "normal",
                    }}
                  >
                    {s.title}
                  </span>
                  <span className="kicker hidden md:block" style={{ color: "var(--ink-mute)" }}>
                    {s.years}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
