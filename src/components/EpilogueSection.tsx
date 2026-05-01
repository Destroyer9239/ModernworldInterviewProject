"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const REFLECTION_POINTS = [
  "Growing up in the modern day isn't just about reading books -- it's learning through people who experienced sacrifice and had to adapt in times of war.",
  "Steve grew up as the son of a Navy Fighter Pilot during the Vietnam and Cold War eras. His childhood was heavily impacted by the military culture his father brought home.",
  "There was a long period where the public heavily disliked the military because of their actions in Vietnam -- what Steve called a \"quiet war\" between soldiers and the society they served.",
  "The biggest strategic takeaway: the U.S. thought itself invincible after bankrupting Russia -- then was struck by an unprecedented attack on one of the hearts of the nation.",
  "Finally: Steve's man-to-man talk with his father about war, killing, and everything that couldn't be said when Steve was still a child. That conversation changed everything.",
];

const TIMELINE = [
  { year: "1945", event: "Cold War begins" },
  { year: "1960s", event: "Vietnam War escalates" },
  { year: "1967", event: "Steve Simpson is born" },
  { year: "1970s", event: "Military-civilian rift deepens" },
  { year: "1980s", event: "Reagan rebuilds confidence; NORAD visits" },
  { year: "1991", event: "Cold War ends; Desert Storm" },
  { year: "1997", event: "Steve visits Moscow, sees Russia's collapse" },
  { year: "Aug 2001", event: "Steve moves from NYC to San Diego" },
  { year: "Sep 11, 2001", event: "9/11 attacks -- Steve's office 2 blocks away" },
  { year: "Present", event: "Man-to-man talk finally bridges the gap" },
];

export default function EpilogueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const reflRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const tlInView = useInView(tlRef, { amount: 0.1 });
  const reflInView = useInView(reflRef, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative px-6 py-24 overflow-hidden">
      {/* Parallax gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, willChange: "transform" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1505 0%, #2e2510 20%, #1a1208 50%, #0d0a05 80%, #020408 100%)",
            top: "-15%",
            bottom: "-15%",
            height: "130%",
          }}
        />
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(194,162,72,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-20">
        {/* ── Closing statement ── */}
        <div ref={ref} className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: "#c2a248" }}
          >
            Epilogue
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            History is lived through people,<br />not books.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-neutral-400 max-w-lg mx-auto leading-relaxed"
          >
            Steve Simpson&apos;s story spans the entire arc of the Cold War -- from a childhood filled
            with silent anxiety, to a man-to-man reckoning with what it truly means to serve.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div ref={tlRef} className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={tlInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-neutral-500 tracking-widest uppercase"
          >
            Steve&apos;s Timeline
          </motion.p>
          <div className="relative">
            {/* Vertical rule */}
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-white/5" />
            <div className="space-y-3">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={tlInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4"
                >
                  <span
                    className="text-xs font-mono text-right shrink-0 pt-0.5"
                    style={{ width: "3.5rem", color: "rgba(255,255,255,0.25)" }}
                  >
                    {item.year}
                  </span>
                  <div className="relative flex items-center pt-0.5">
                    <div
                      className="shrink-0 w-2 h-2 rounded-full -ml-1 mr-3 mt-0.5"
                      style={{
                        background: item.year === "Sep 11, 2001" ? "#c47630"
                          : item.year === "Present" ? "#c2a248"
                          : item.year === "1967" ? "#6b96c4"
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                    <span className="text-sm text-neutral-400 leading-snug">{item.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Reflection ── */}
        <div ref={reflRef} className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={reflInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-neutral-500 tracking-widest uppercase"
          >
            Interviewer&apos;s Reflection
          </motion.p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(6, 8, 18, 0.72)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(194,162,72,0.18)",
            }}
          >
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, rgba(194,162,72,0.4), transparent)" }} />
            <div className="p-6 md:p-8 space-y-3">
              {REFLECTION_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={reflInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  className="flex gap-3 text-sm text-neutral-400 leading-relaxed"
                >
                  <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ background: "rgba(194,162,72,0.7)" }} />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={reflInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center text-xs font-mono text-neutral-700 tracking-wider"
        >
          Built with Three.js · GSAP ScrollTrigger · React Three Fiber · Framer Motion
        </motion.p>
      </div>
    </section>
  );
}
