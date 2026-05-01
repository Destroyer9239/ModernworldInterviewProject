"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SUBJECT_BIO } from "@/data/sections";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; r: number; o: number; vy: number; tw: number }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
      const count = Math.min(220, Math.floor((window.innerWidth * window.innerHeight) / 7000));
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.7 + 0.3,
        o: Math.random() * 0.75 + 0.3,
        vy: Math.random() * 0.04 + 0.015,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach((s) => {
        s.y += s.vy;
        s.tw += 0.02;
        if (s.y > window.innerHeight + 5) s.y = -5;
        const twinkle = (Math.sin(s.tw) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.o * (0.5 + twinkle * 0.5)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

function LiveYear() {
  const [year, setYear] = useState(1967);
  useEffect(() => {
    let cur = 1945;
    const id = setInterval(() => {
      cur += 1;
      if (cur > new Date().getFullYear()) cur = 1945;
      setYear(cur);
    }, 80);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{year}</span>;
}

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const titleWords = ["The", "Pilot's", "Son"];

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
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-14 overflow-hidden"
    >
      <StarField />

      {/* Blue center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 40%, rgba(74,144,217,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Corner labels */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-20 left-6 md:left-10 text-left"
      >
        <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
          File N°<span className="text-blue-400 ml-2">07.SS.1967</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-20 right-6 md:right-10 text-right"
      >
        <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
          <LiveYear /><span className="text-neutral-600 ml-2">/ ARCHIVE</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-10 w-full max-w-4xl space-y-7"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em]"
        >
          Memories of the Modern World
        </motion.p>

        {/* Rule */}
        <div
          ref={lineRef}
          className="mx-auto w-24 h-px origin-left"
          style={{ background: "linear-gradient(90deg, #4a90d9, #8e44ad)" }}
        />

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-baseline"
              style={{ paddingBottom: "0.05em", lineHeight: "1" }}
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.7 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${i === titleWords.length - 1 ? "italic text-neutral-300" : "text-white"}`}
              >
                {word}
                {i < titleWords.length - 1 && " "}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed"
        >
          A scrollytelling journey through the Cold War, Vietnam, and 9/11 —{" "}
          told by the son of a Navy fighter pilot who lived it all.
        </motion.p>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 14, 28, 0.92)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(74,144,217,0.3)",
              boxShadow:
                "0 20px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(74,144,217,0.15)",
            }}
          >
            <div
              className="h-0.5 w-full"
              style={{
                background: "linear-gradient(90deg, #4a90d9, #8e44ad, transparent)",
              }}
            />

            <div className="px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase font-semibold">
                  Interview Subject
                </p>
                <p className="text-[10px] font-mono text-neutral-500 tracking-widest">
                  Cold War Archive
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
                {bioFields.map((f, idx) => (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + idx * 0.08, duration: 0.5 }}
                    className="text-left"
                  >
                    <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
                      {f.label}
                    </p>
                    <p className="text-sm font-semibold text-white leading-snug">{f.value}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed text-left border-t border-white/10 pt-4">
                {SUBJECT_BIO.context}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col items-center gap-3 pt-4"
        >
          <span className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase">
            Scroll to begin
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-neutral-600 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-blue-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(transparent, #020408)" }}
      />
    </section>
  );
}
