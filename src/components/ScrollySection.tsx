"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StorySection } from "@/data/sections";
import GlassCard from "./GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollySectionProps {
  section: StorySection;
  isActive: boolean;
  onBecomeActive: () => void;
}

function StatCard({
  value,
  label,
  accentColor,
  delay,
  inView,
}: {
  value: string;
  label: string;
  accentColor: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{
        background: "rgba(6, 8, 18, 0.7)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${accentColor}28`,
      }}
    >
      <span
        className="text-2xl md:text-3xl font-bold leading-none"
        style={{ color: accentColor, fontFamily: "'Georgia', serif" }}
      >
        {value}
      </span>
      <span className="text-xs text-neutral-500 leading-snug mt-1">{label}</span>
    </motion.div>
  );
}

export default function ScrollySection({ section, isActive, onBecomeActive }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterInView = useInView(sectionRef, { amount: 0.08 });
  const contentInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (contentInView) onBecomeActive();
  }, [contentInView, onBecomeActive]);

  // Accent bar GSAP
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector(".accent-bar") as HTMLElement;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 65%",
      end: "bottom 35%",
      onEnter: () => gsap.to(el, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
      onLeave: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
      onEnterBack: () => gsap.to(el, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ scrollMarginTop: "56px" }}
    >
      {/* Full-section background glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.07 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${section.accentColor}, transparent)`,
        }}
      />

      {/* Accent left bar */}
      <div
        className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 origin-top z-10"
        style={{
          background: `linear-gradient(180deg, transparent, ${section.accentColor}, transparent)`,
          transform: "scaleY(0)",
        }}
      />

      {/* ── CHAPTER BANNER ── */}
      <div
        className="relative border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-6 md:px-16 py-8 md:py-10"
        style={{ borderColor: `${section.accentColor}1a` }}
      >
        {/* Big chapter number watermark */}
        <motion.span
          animate={{ opacity: isActive ? 0.05 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 font-bold select-none pointer-events-none hidden md:block"
          style={{
            fontSize: "10rem",
            lineHeight: 1,
            color: section.accentColor,
            fontFamily: "'Georgia', serif",
          }}
        >
          {section.index + 1}
        </motion.span>

        <div className="space-y-2 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={chapterInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
              style={{
                color: section.accentColor,
                background: `${section.accentColor}18`,
                border: `1px solid ${section.accentColor}40`,
              }}
            >
              {section.era}
            </span>
            <span className="text-xs font-mono text-neutral-600 tracking-widest">
              {section.years}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={chapterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {section.title}
          </motion.h2>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="px-6 md:px-16 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

        {/* LEFT: Historical context + fact + stats */}
        <div className="space-y-6">
          {/* Historical context label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: `${section.accentColor}88` }}
            >
              Historical Context
            </span>
          </motion.div>

          {/* Historical fact paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${section.accentColor}18`,
            }}
          >
            <p className="text-sm text-neutral-400 leading-relaxed">{section.historicalFact}</p>
          </motion.div>

          {/* Stats 2×2 grid */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs font-mono tracking-widest uppercase mb-3"
              style={{ color: `${section.accentColor}88` }}
            >
              Key Numbers
            </motion.p>
            <div className="grid grid-cols-2 gap-3">
              {section.stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  accentColor={section.accentColor}
                  delay={0.2 + i * 0.07}
                  inView={contentInView}
                />
              ))}
            </div>
          </div>

          {/* Interview question */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="rounded-xl p-4 space-y-2"
            style={{
              background: `${section.accentColor}08`,
              border: `1px solid ${section.accentColor}20`,
            }}
          >
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: `${section.accentColor}77` }}>
              Interview Question
            </p>
            <p className="text-sm italic text-neutral-400 leading-relaxed">
              &ldquo;{section.interviewQuestion}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Glass card with findings */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={contentInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard section={section} isActive={isActive} />
        </motion.div>
      </div>

      {/* ── PULL QUOTE BANNER ── */}
      {section.quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative px-6 md:px-24 py-10 md:py-12 border-t"
          style={{ borderColor: `${section.accentColor}15` }}
        >
          <div
            className="absolute left-6 md:left-14 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(180deg, transparent, ${section.accentColor}55, transparent)` }}
          />
          <blockquote
            className="text-lg md:text-2xl font-medium leading-relaxed max-w-3xl"
            style={{ color: section.accentColor, fontFamily: "'Georgia', serif" }}
          >
            {section.quote}
          </blockquote>
          <p className="text-xs font-mono text-neutral-600 mt-3 tracking-widest uppercase">
            — Steve Simpson
          </p>
        </motion.div>
      )}

      {/* Section separator line */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${section.accentColor}33, transparent)` }}
      />
    </section>
  );
}
