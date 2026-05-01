"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

export default function ChapterIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      {/* Background lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between border-b border-white/10 pb-6 mb-10"
        >
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-blue-400/70 tracking-[0.4em] uppercase">
              Index
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
            >
              Seven Chapters
            </h2>
          </div>
          <p className="hidden md:block text-xs font-mono text-neutral-500 max-w-xs leading-relaxed">
            A son of a Navy fighter pilot tells the story of the Cold War, Vietnam, and 9/11 — from the inside.
          </p>
        </motion.div>

        {/* Chapter list */}
        <div className="space-y-1">
          {STORY_SECTIONS.map((section, i) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => scrollTo(section.id)}
              className="group w-full flex items-center gap-4 md:gap-8 py-5 md:py-7 border-b border-white/5 transition-all hover:border-white/20 text-left relative"
            >
              {/* Background hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, ${section.accentColor}08, transparent 50%)`,
                }}
              />

              {/* Number */}
              <span
                className="relative text-3xl md:text-5xl font-bold tabular-nums leading-none transition-colors duration-300"
                style={{
                  color: "rgba(255,255,255,0.15)",
                  fontFamily: "var(--font-serif), 'Georgia', serif",
                }}
              >
                <span className="group-hover:hidden">0{i + 1}</span>
                <span
                  className="hidden group-hover:inline"
                  style={{ color: section.accentColor }}
                >
                  0{i + 1}
                </span>
              </span>

              {/* Year + title */}
              <div className="relative flex-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
                <span
                  className="text-xs font-mono text-neutral-600 tracking-widest uppercase md:min-w-[10rem]"
                  style={{ color: undefined }}
                >
                  {section.years}
                </span>
                <h3
                  className="text-lg md:text-2xl font-medium text-white leading-tight transition-colors group-hover:text-white"
                  style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
                >
                  {section.title}
                </h3>
              </div>

              {/* Arrow */}
              <span
                className="relative text-sm font-mono opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: section.accentColor }}
              >
                →
              </span>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs font-mono text-neutral-700 tracking-widest uppercase mt-10 text-center"
        >
          Scroll to begin · Or click a chapter to jump in
        </motion.p>
      </div>
    </section>
  );
}
