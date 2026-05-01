"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    if (lineRef.current) {
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" });
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(74,144,217,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 space-y-6 max-w-4xl"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em]"
        >
          Memories of the Modern World
        </motion.p>

        {/* Accent line */}
        <div ref={lineRef} className="mx-auto w-24 h-px origin-left" style={{ background: "linear-gradient(90deg, #4a90d9, #8e44ad)" }} />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          The Pilot&apos;s Son
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          A scrollytelling journey through the Cold War, Vietnam, and 9/11 — told by the son of a Navy fighter pilot who lived it all.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-2 pt-8"
        >
          <span className="text-xs font-mono text-neutral-600 tracking-widest uppercase">Scroll to begin</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-blue-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(transparent, #020408)" }}
      />
    </section>
  );
}
