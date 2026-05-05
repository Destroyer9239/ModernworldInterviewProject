"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REFLECTION_POINTS = [
  "Growing up in the modern day isn't just about reading books — it's learning through people who experienced sacrifice and had to adapt in times of war.",
  "Steve grew up as the son of a Navy fighter pilot during the Vietnam and Cold War eras. His childhood was heavily shaped by the military culture his father brought home.",
  "There was a long period where the public deeply distrusted the military because of Vietnam — what Steve called a quiet war between soldiers and the society they served.",
  "The biggest strategic takeaway: the U.S. thought itself invincible after bankrupting Russia — then was struck by an unprecedented attack on the heart of the nation.",
  "And finally: Steve's man-to-man talk with his father about war, killing, and everything that couldn't be said when Steve was still a child. That conversation changed everything.",
];

const TIMELINE = [
  { year: "1945", event: "Cold War begins" },
  { year: "1960s", event: "Vietnam War escalates" },
  { year: "1967", event: "Steve Simpson is born", emphasis: true },
  { year: "1970s", event: "Military–civilian rift deepens" },
  { year: "1980s", event: "Reagan rebuilds confidence; NORAD years" },
  { year: "1991", event: "Cold War ends; Desert Storm" },
  { year: "1997", event: "Steve visits Moscow" },
  { year: "Aug 2001", event: "Steve moves from NYC to San Diego" },
  { year: "Sep 11, 2001", event: "9/11 attacks; Steve's office, two blocks away", emphasis: true },
  { year: "Today", event: "The man-to-man talk that finally bridged it" },
];

export default function EpilogueSection() {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const reflRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const tlInView = useInView(tlRef, { amount: 0.1 });
  const reflInView = useInView(reflRef, { amount: 0.1 });

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36">
      <div
        className="w-full h-px mb-20"
        style={{ background: "var(--rule-strong)" }}
      />

      <div className="relative max-w-3xl mx-auto space-y-24">

        {/* Closing statement */}
        <div ref={ref} className="text-center space-y-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="kicker"
            style={{ color: "var(--accent)" }}
          >
            Coda
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="serif font-medium tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              lineHeight: 1.1,
              color: "var(--ink)",
            }}
          >
            History is lived through people,
            <br />
            <span className="italic" style={{ color: "var(--ink-soft)" }}>not books.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="serif italic max-w-xl mx-auto"
            style={{ color: "var(--ink-soft)", fontSize: "18px", lineHeight: 1.6 }}
          >
            Steve Simpson&apos;s story spans the entire arc of the Cold War — from a childhood
            of silent anxiety to a man-to-man reckoning with what it truly means to serve.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={tlRef} className="space-y-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={tlInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="kicker text-center"
            style={{ color: "var(--ink-mute)" }}
          >
            One Life · A Timeline
          </motion.p>
          <ol className="relative max-w-2xl mx-auto">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, y: 12 }}
                animate={tlInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid grid-cols-[7rem_1fr] gap-5 items-baseline py-3.5"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <span
                  className="kicker tabular-nums text-right"
                  style={{
                    color: item.emphasis ? "var(--accent)" : "var(--ink-mute)",
                  }}
                >
                  {item.year}
                </span>
                <span
                  className="serif"
                  style={{
                    fontSize: "16px",
                    color: item.emphasis ? "var(--ink)" : "var(--ink-soft)",
                    fontStyle: item.emphasis ? "italic" : "normal",
                  }}
                >
                  {item.event}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Reflection */}
        <div ref={reflRef} className="space-y-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={reflInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="kicker"
            style={{ color: "var(--ink-mute)" }}
          >
            Interviewer&apos;s Reflection
          </motion.p>
          <ol className="space-y-7">
            {REFLECTION_POINTS.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={reflInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                className="grid grid-cols-[2.5rem_1fr] gap-4"
              >
                <span
                  className="serif tabular-nums pt-0.5"
                  style={{ color: "var(--ink-mute)", fontSize: "13px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="serif"
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "17px",
                    lineHeight: 1.65,
                  }}
                >
                  {point}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
