"use client";

import { motion } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

interface TimelineBarProps {
  activeSection: number;
  scrollProgress: number;
}

export default function TimelineBar({
  activeSection,
  scrollProgress,
}: TimelineBarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-0">
      {/* Vertical line through all dots */}
      <div className="absolute right-[5px] top-2 bottom-2 w-px bg-white/5" />

      {/* Progress fill */}
      <motion.div
        className="absolute right-[5px] top-2 w-px origin-top"
        style={{
          height: `calc(${scrollProgress * 100}% - 16px)`,
          background: `linear-gradient(180deg, #4a90d9, ${STORY_SECTIONS[activeSection]?.accentColor ?? "#4a90d9"})`,
          transition: "height 0.3s ease, background 0.6s ease",
        }}
      />

      {STORY_SECTIONS.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          aria-label={s.title}
          className="group relative flex items-center justify-end gap-3 py-2"
        >
          {/* Label on hover or when active */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{
              opacity: activeSection === i ? 1 : 0,
              x: activeSection === i ? 0 : 10,
            }}
            className="text-[10px] font-mono whitespace-nowrap tracking-widest uppercase"
            style={{ color: s.accentColor }}
          >
            {s.years}
          </motion.span>

          {/* Dot */}
          <motion.div
            animate={{
              scale: activeSection === i ? 1.4 : 0.7,
              opacity: activeSection === i ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="w-[10px] h-[10px] rounded-full shrink-0 relative"
            style={{
              background:
                activeSection === i ? s.accentColor : "rgba(255,255,255,0.25)",
              boxShadow:
                activeSection === i
                  ? `0 0 12px ${s.accentColor}66`
                  : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
