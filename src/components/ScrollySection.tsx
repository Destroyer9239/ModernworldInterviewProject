"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StorySection } from "@/data/sections";
import GlassCard from "./GlassCard";
import AnimatedCounter from "./AnimatedCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollySectionProps {
  section: StorySection;
  isActive: boolean;
  onBecomeActive: () => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="relative rounded-xl p-4 group overflow-hidden"
      style={{
        background: "rgba(12, 16, 32, 0.85)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${accentColor}35`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}18, transparent 60%)`,
        }}
      />
      <div className="relative">
        <AnimatedCounter
          value={value}
          duration={1.6}
          className="text-2xl md:text-3xl font-bold leading-none block"
          style={{ color: accentColor, fontFamily: "var(--font-serif), 'Georgia', serif" }}
        />
        <span className="text-xs text-neutral-400 leading-snug mt-2 block">{label}</span>
      </div>
    </motion.div>
  );
}

function QuoteMark({ color }: { color: string }) {
  return (
    <svg
      width="56"
      height="40"
      viewBox="0 0 56 40"
      className="absolute -top-3 -left-2"
      style={{ opacity: 0.5 }}
      aria-hidden
    >
      <path
        d="M0 40 V18 C0 8 6 0 18 0 V8 C12 8 8 13 8 18 H18 V40 Z M30 40 V18 C30 8 36 0 48 0 V8 C42 8 38 13 38 18 H48 V40 Z"
        fill={color}
      />
    </svg>
  );
}

export default function ScrollySection({ section, isActive, onBecomeActive }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterInView = useInView(sectionRef, { amount: 0.08 });
  const contentInView = useInView(sectionRef, { amount: 0.2 });

  useEffect(() => {
    if (contentInView) onBecomeActive();
  }, [contentInView, onBecomeActive]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const watermark = sectionRef.current.querySelector(".chapter-watermark") as HTMLElement;
    const accentBar = sectionRef.current.querySelector(".accent-bar") as HTMLElement;

    const triggers: ScrollTrigger[] = [];

    if (accentBar) {
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => gsap.to(accentBar, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
          onLeave: () => gsap.to(accentBar, { scaleY: 0, duration: 0.4 }),
          onEnterBack: () => gsap.to(accentBar, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
          onLeaveBack: () => gsap.to(accentBar, { scaleY: 0, duration: 0.4 }),
        })
      );
    }

    if (watermark) {
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(watermark, {
              y: -self.progress * 80,
              opacity: 0.03 + self.progress * 0.04,
            });
          },
        })
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ scrollMarginTop: "56px" }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.09 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${section.accentColor}, transparent)`,
        }}
      />

      {/* Left accent bar */}
      <div
        className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 origin-top z-10"
        style={{
          background: `linear-gradient(180deg, transparent, ${section.accentColor}, transparent)`,
          transform: "scaleY(0)",
        }}
      />

      {/* ── CHAPTER BANNER ── */}
      <div
        className="relative border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-6 md:px-16 py-10 md:py-14"
        style={{ borderColor: `${section.accentColor}25` }}
      >
        {/* Big watermark number */}
        <span
          className="chapter-watermark absolute right-6 md:right-12 top-1/2 -translate-y-1/2 font-bold select-none pointer-events-none hidden md:block"
          style={{
            fontSize: "clamp(8rem, 14vw, 14rem)",
            lineHeight: 1,
            color: section.accentColor,
            fontFamily: "var(--font-serif), 'Georgia', serif",
            opacity: 0.04,
          }}
        >
          {String(section.index + 1).padStart(2, "0")}
        </span>

        <div className="space-y-3 max-w-2xl relative z-10">
          {/* Era + years */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={chapterInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <span
              className="text-[10px] font-mono tracking-[0.3em] uppercase px-3 py-1 rounded-full font-semibold"
              style={{
                color: section.accentColor,
                background: `${section.accentColor}20`,
                border: `1px solid ${section.accentColor}45`,
              }}
            >
              {section.era}
            </span>
            <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
              {section.years}
            </span>
            <span className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase hidden md:block">
              · Chapter {section.index + 1} of 7
            </span>
          </motion.div>

          {/* Title */}
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
          >
            {section.title.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-baseline"
                style={{ paddingBottom: "0.05em", lineHeight: "1.1" }}
              >
                <motion.span
                  initial={{ y: "110%" }}
                  animate={chapterInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE }}
                  className="inline-block"
                >
                  {word}
                  {i < section.title.split(" ").length - 1 && " "}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Context line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={chapterInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sm text-neutral-400 max-w-xl leading-relaxed pt-1"
          >
            {section.context.split(".")[0]}.
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="px-6 md:px-16 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">

        {/* LEFT: context + stats + question */}
        <div className="md:col-span-5 space-y-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold"
            style={{ color: section.accentColor }}
          >
            Historical Context
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${section.accentColor}22`,
            }}
          >
            <p className="text-sm text-neutral-200 leading-relaxed">{section.historicalFact}</p>
          </motion.div>

          {/* Stats */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase mb-4 font-semibold"
              style={{ color: section.accentColor }}
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
            className="rounded-xl p-5 space-y-2"
            style={{
              background: `${section.accentColor}0c`,
              border: `1px solid ${section.accentColor}28`,
            }}
          >
            <p
              className="text-[10px] font-mono tracking-[0.3em] uppercase font-semibold"
              style={{ color: section.accentColor }}
            >
              Interview Question
            </p>
            <p className="text-sm italic text-neutral-300 leading-relaxed">
              &ldquo;{section.interviewQuestion}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Glass card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={contentInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="md:col-span-7"
        >
          <GlassCard section={section} isActive={isActive} />
        </motion.div>
      </div>

      {/* ── PULL QUOTE ── */}
      {section.quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative px-6 md:px-24 py-12 md:py-16 border-t"
          style={{ borderColor: `${section.accentColor}20` }}
        >
          <div className="relative max-w-4xl">
            <QuoteMark color={section.accentColor} />
            <blockquote
              className="text-lg md:text-3xl lg:text-4xl font-medium leading-[1.35] pl-2 text-white"
              style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
            >
              {section.quote.replace(/^"|"$/g, "")}
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="w-8 h-px" style={{ background: section.accentColor }} />
              <p className="text-xs font-mono text-neutral-400 tracking-[0.3em] uppercase">
                Steve Simpson
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Separator */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${section.accentColor}44, transparent)`,
        }}
      />
    </section>
  );
}
