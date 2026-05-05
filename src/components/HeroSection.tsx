"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SUBJECT_BIO } from "@/data/sections";

export default function HeroSection() {
  const ruleRef = useRef<HTMLDivElement>(null);
  const titleWords = ["The", "Pilot's", "Son"];

  useEffect(() => {
    if (ruleRef.current) {
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, delay: 0.5, ease: "power3.inOut" }
      );
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Soft warm halo behind the title — replaces the starfield */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 38%, rgba(200,112,76,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Issue / dateline ribbon */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="kicker" style={{ color: "var(--accent)" }}>
            Issue 01
          </span>
          <span className="w-8 h-px" style={{ background: "var(--rule-strong)" }} />
          <span className="kicker">An Oral History</span>
          <span className="w-8 h-px" style={{ background: "var(--rule-strong)" }} />
          <span className="kicker">2026</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="serif italic text-base md:text-lg mb-6"
          style={{ color: "var(--ink-soft)" }}
        >
          Memories of the Modern World
        </motion.p>

        {/* Display title */}
        <h1
          className="serif font-semibold leading-[0.95] tracking-tight"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
            color: "var(--ink)",
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.06em", lineHeight: "1" }}
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 0.55 + i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{
                  fontStyle: i === titleWords.length - 1 ? "italic" : "normal",
                  fontWeight: i === titleWords.length - 1 ? 400 : 600,
                  color: i === titleWords.length - 1 ? "var(--ink-soft)" : "var(--ink)",
                }}
              >
                {word}
                {i < titleWords.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Rule under title */}
        <div
          ref={ruleRef}
          className="mx-auto w-16 h-px origin-left mt-8 mb-8"
          style={{ background: "var(--accent)" }}
        />

        {/* Standfirst / deck */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="serif text-xl md:text-2xl leading-[1.5] max-w-xl mx-auto"
          style={{ color: "var(--ink-soft)" }}
        >
          A scrollable oral history of the Cold War, Vietnam, and 9/11 —
          told by the son of a Navy fighter pilot who lived it all.
        </motion.p>

        {/* Byline + subject card — much quieter than before */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-14 mx-auto max-w-2xl text-left grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 pt-8"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <dt className="kicker">Subject</dt>
            <dd style={{ color: "var(--ink)" }}>{SUBJECT_BIO.name}</dd>
            <dt className="kicker">Born</dt>
            <dd style={{ color: "var(--ink)" }}>{SUBJECT_BIO.dob}</dd>
            <dt className="kicker">Connection</dt>
            <dd style={{ color: "var(--ink)" }}>{SUBJECT_BIO.connection}</dd>
          </dl>
          <p
            className="text-[15px] leading-[1.7]"
            style={{ color: "var(--ink-soft)" }}
          >
            {SUBJECT_BIO.context}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="flex flex-col items-center gap-3 mt-16"
        >
          <span className="kicker">Begin reading</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10"
            style={{ background: "var(--rule-strong)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
