"use client";

import { motion } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

interface NavigationProps {
  activeSection: number;
  scrollProgress: number;
}

export default function Navigation({ activeSection, scrollProgress }: NavigationProps) {
  const scrollToSection = (index: number) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    // Hero is index -1, sections 0-5 follow
    const heroHeight = window.innerHeight;
    const sectionHeight = (maxScroll - heroHeight) / STORY_SECTIONS.length;
    const targetY = heroHeight + index * sectionHeight + sectionHeight * 0.1;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(2, 4, 8, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
          Memories of the Modern World
        </span>
        <div className="flex items-center gap-1">
          {STORY_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(i)}
              className="text-xs font-mono px-2 py-1 rounded transition-all hidden md:block"
              style={{
                color: activeSection === i ? s.accentColor : "rgba(255,255,255,0.3)",
                background: activeSection === i ? `${s.accentColor}18` : "transparent",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-neutral-600">
          {Math.round(scrollProgress * 100)}%
        </span>
      </motion.nav>

      {/* Side section dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {STORY_SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(i)}
            aria-label={s.title}
            className="group relative flex items-center justify-end gap-2"
          >
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: activeSection === i ? 1 : 0,
                x: activeSection === i ? 0 : 10,
              }}
              className="text-xs font-mono whitespace-nowrap text-right"
              style={{ color: s.accentColor }}
            >
              {s.era}
            </motion.span>
            <motion.div
              animate={{
                scale: activeSection === i ? 1 : 0.5,
                opacity: activeSection === i ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: activeSection === i ? s.accentColor : "rgba(255,255,255,0.3)" }}
            />
          </button>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, #4a90d9, #8e44ad, #c0392b)`,
          }}
        />
      </div>
    </>
  );
}
