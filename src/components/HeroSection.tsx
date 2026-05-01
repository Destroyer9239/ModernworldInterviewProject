"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SUBJECT_BIO } from "@/data/sections";

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, delay: 0.5, ease: "power3.inOut" }
      );
    }
  }, []);

  const bioFields = [
    { label: "Subject", value: SUBJECT_BIO.name },
    { label: "Born", value: SUBJECT_BIO.dob },
    { label: "Location", value: SUBJECT_BIO.location },
    { label: "Connection", value: SUBJECT_BIO.connection },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(74,144,217,0.09) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-full max-w-4xl space-y-6"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em]"
        >
          Memories of the Modern World
        </motion.p>

        {/* Animated rule */}
        <div
          ref={lineRef}
          className="mx-auto w-24 h-px origin-left"
          style={{ background: "linear-gradient(90deg, #4a90d9, #8e44ad)" }}
        />

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          A scrollytelling journey through the Cold War, Vietnam, and 9/11 — told by the son of a Navy fighter pilot who lived it all.
        </motion.p>

        {/* Subject bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(6, 8, 18, 0.78)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(74,144,217,0.25)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(74,144,217,0.1)",
            }}
          >
            <div
              className="h-0.5 w-full"
              style={{ background: "linear-gradient(90deg, #4a90d9, #8e44ad, transparent)" }}
            />
            <div className="px-6 py-5">
              <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-4">
                Interview Subject
              </p>
              {/* Bio fields grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {bioFields.map((f) => (
                  <div key={f.label} className="text-left">
                    <p className="text-xs font-mono text-neutral-600 uppercase tracking-widest mb-0.5">
                      {f.label}
                    </p>
                    <p className="text-sm font-semibold text-white">{f.value}</p>
                  </div>
                ))}
              </div>
              {/* Context sentence */}
              <p className="text-xs text-neutral-500 leading-relaxed text-left border-t border-white/5 pt-3">
                {SUBJECT_BIO.context}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="flex flex-col items-center gap-2 pt-4"
        >
          <span className="text-xs font-mono text-neutral-600 tracking-widest uppercase">
            Scroll to begin
          </span>
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
