"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { StorySection } from "@/data/sections";

interface ScrollySectionProps {
  section: StorySection;
  isActive: boolean;
  onBecomeActive: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScrollySection({ section, onBecomeActive }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { amount: 0.08 });
  const bodyInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (bodyInView) onBecomeActive();
  }, [bodyInView, onBecomeActive]);

  const chapterNumber = String(section.index + 1).padStart(2, "0");

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative"
      style={{ scrollMarginTop: "64px" }}
    >
      {/* Background Image / Atmosphere */}
      {section.bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={headerInView ? { opacity: 0.15, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE }}
            className="sticky top-0 w-full h-screen"
          >
            <img
              src={section.bgImage}
              alt=""
              className="w-full h-full object-cover grayscale brightness-50"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
          </motion.div>
        </div>
      )}

      {/* Top divider — full bleed */}
      <div
        className="w-full h-px relative z-10"
        style={{ background: "var(--rule-strong)" }}
      />

      <div className="relative z-10">
        {/* ─────── CHAPTER HEAD ─────── */}
        <header className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start"
          >
            {/* Chapter mark */}
            <div className="flex md:flex-col gap-4 md:gap-2 items-baseline md:items-start">
              <span
                className="serif tabular-nums leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: section.accentColor,
                  fontWeight: 400,
                }}
              >
                {chapterNumber}
              </span>
              <span className="kicker" style={{ color: "var(--ink-mute)" }}>
                {section.era.replace("Section ", "Chapter ")}
              </span>
            </div>

            {/* Title block */}
            <div>
              <p className="kicker mb-5" style={{ color: section.accentColor }}>
                {section.years}
              </p>
              <h2
                className="serif font-medium tracking-tight"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                }}
              >
                {section.title}
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="serif italic text-lg md:text-xl mt-6 max-w-2xl"
                style={{ color: "var(--ink-soft)", lineHeight: 1.55 }}
              >
                {section.context.split(".")[0]}.
              </motion.p>
            </div>
          </motion.div>
        </header>

        {/* ─────── ARTICLE BODY ─────── */}
        <article className="px-6 md:px-12 lg:px-20 pb-24 md:pb-32 max-w-4xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-lg premium-shadow relative">
            <div className="space-y-12">
              {/* Interviewer's question — editorial intro */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="pl-5"
                style={{ borderLeft: `2px solid ${section.accentColor}` }}
              >
                <p className="kicker mb-2" style={{ color: section.accentColor }}>Interviewer</p>
                <p
                  className="serif italic"
                  style={{
                    fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                    lineHeight: 1.5,
                    color: "var(--ink)",
                  }}
                >
                  {section.interviewQuestion}
                </p>
              </motion.div>

              {/* Body — Stephen's story with drop cap */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="prose-editorial max-w-prose"
              >
                <p className="dropcap" style={{ color: "var(--ink)", fontSize: "19px", lineHeight: 1.75 }}>
                  {section.context}
                </p>
              </motion.div>

              {/* Pull quote */}
              {section.quote && (
                <motion.figure
                  initial={{ opacity: 0 }}
                  animate={bodyInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="my-14 md:my-20"
                >
                  <blockquote
                    className="pullquote relative pl-1"
                    style={{ borderLeft: "none" }}
                  >
                    <span
                      aria-hidden
                      className="serif select-none absolute -top-6 -left-2 leading-none"
                      style={{
                        fontSize: "5rem",
                        color: section.accentColor,
                        opacity: 0.35,
                      }}
                    >
                      “
                    </span>
                    <span className="relative">
                      {section.quote.replace(/^"|"$/g, "")}
                    </span>
                  </blockquote>
                  <figcaption
                    className="mt-5 flex items-center gap-3 kicker"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    <span
                      className="w-6 h-px"
                      style={{ background: section.accentColor }}
                    />
                    Stephen Vance
                  </figcaption>
                </motion.figure>
              )}

              {/* Findings — numbered editorial list */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <p className="kicker mb-6" style={{ color: section.accentColor }}>
                  From the interview
                </p>
                <ol className="space-y-7">
                  {section.findings.map((finding, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.55, delay: 0.45 + i * 0.06 }}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 max-w-prose"
                    >
                      <span
                        className="serif tabular-nums pt-0.5"
                        style={{
                          color: "var(--ink-mute)",
                          fontSize: "13px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        style={{
                          color: "var(--ink-soft)",
                          fontSize: "16px",
                          lineHeight: 1.7,
                        }}
                      >
                        {finding}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
