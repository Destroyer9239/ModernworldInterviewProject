"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { SUBJECT_BIO } from "@/data/sections";

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts up as user scrolls down
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.15, 1.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  // 3D perspective transforms
  const heroRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 8]);
  const heroTranslateZ = useTransform(scrollYProgress, [0, 1], [0, -120]);

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
    <section
      id="hero"
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-14 overflow-hidden"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      {/* ── 3D Parallax background image ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: imageY,
          scale: imageScale,
          rotateX: heroRotateX,
          translateZ: heroTranslateZ,
          willChange: "transform",
          transformOrigin: "50% 60%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            top: "-10%",
            bottom: "-10%",
            height: "120%",
          }}
        />
      </motion.div>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(2,4,8,0.7) 0%, rgba(2,4,8,0.5) 40%, rgba(2,4,8,0.85) 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 0%, rgba(2,4,8,0.9) 100%)",
        }}
      />

      {/* ── Content (fades on scroll) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-full max-w-4xl space-y-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.2em]"
        >
          Memories of the Modern World
        </motion.p>

        {/* Minimalist rule */}
        <div
          ref={lineRef}
          className="mx-auto w-12 h-px origin-center"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />

        {/* Main title */}
        <motion.h1
          className="text-6xl md:text-8xl font-normal text-white leading-tight flex justify-center flex-wrap tracking-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {/* Staggered text reveal */}
          {["The", "Pilot's", "Son"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-3 md:mr-5"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed"
        >
          A scrollytelling journey through the Cold War, Vietnam, and 9/11 —
          told by the son of a Navy fighter pilot who lived it all.
        </motion.p>

        {/* Subject bio - floating grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl mt-12 pt-8 border-t border-white/5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {bioFields.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
                  {f.label}
                </p>
                <p className="text-sm font-medium text-neutral-200">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed text-left mt-6 max-w-xl">
            {SUBJECT_BIO.context}
          </p>
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
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-4 h-6 rounded-full border border-white/20 flex items-start justify-center pt-1"
          >
            <div className="w-0.5 h-1.5 rounded-full bg-white/40" />
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
