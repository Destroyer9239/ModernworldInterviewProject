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
    <section ref={ref} className="relative py-28 md:py-36 px-6 md:px-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{ background: "radial-gradient(circle at 100% 0%, var(--accent) 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-end pb-8 mb-12"
          style={{ borderBottom: "1px solid var(--rule-strong)" }}
        >
          <div>
            <p className="kicker mb-3" style={{ color: "var(--accent)" }}>Contents</p>
            <h2
              className="serif font-medium tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                color: "var(--ink)",
              }}
            >
              Seven chapters,<br />
              <span className="italic" style={{ color: "var(--ink-soft)" }}>one life.</span>
            </h2>
          </div>
          <p
            className="serif italic text-base md:text-lg leading-[1.6] max-w-md md:justify-self-end md:text-right"
            style={{ color: "var(--ink-soft)" }}
          >
            A son of a Navy carrier pilot tells the story of the Cold War, Vietnam,
            and 9/11 — from the inside.
          </p>
        </motion.div>

        {/* Chapter list — editorial table of contents */}
        <ol className="space-y-0">
          {STORY_SECTIONS.map((section, i) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => scrollTo(section.id)}
                className="group w-full grid grid-cols-[auto_4rem_1fr_auto] md:grid-cols-[auto_5rem_1fr_auto] items-baseline gap-4 md:gap-8 py-6 text-left transition-colors"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}
              >
                {/* Roman-style number */}
                <span
                  className="serif tabular-nums tracking-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    color: "var(--ink-mute)",
                    fontWeight: 400,
                    minWidth: "2.5rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Years */}
                <span
                  className="kicker self-center"
                  style={{ color: "var(--ink-mute)" }}
                >
                  {section.years}
                </span>

                {/* Title */}
                <h3
                  className="serif font-medium leading-tight transition-colors"
                  style={{
                    fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
                    color: "var(--ink)",
                  }}
                >
                  <span className="group-hover:italic transition-all">{section.title}</span>
                </h3>

                {/* Era + arrow */}
                <span
                  className="kicker hidden md:inline-flex items-center gap-3 self-center transition-opacity opacity-60 group-hover:opacity-100"
                  style={{ color: section.accentColor }}
                >
                  {section.era.replace("Section ", "Pt. ")}
                  <span aria-hidden style={{ color: "var(--ink-mute)" }}>→</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ol>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="serif italic text-center mt-12"
          style={{ color: "var(--ink-mute)", fontSize: "15px" }}
        >
          Scroll to begin, or click any chapter to jump in.
        </motion.p>
      </div>
    </section>
  );
}
