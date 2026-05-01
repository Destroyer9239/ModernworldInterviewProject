"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "MEMORIES OF THE MODERN WORLD";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      // Eased progress: starts fast, slows near 100
      const v = Math.min(100, Math.round(100 * (1 - Math.pow(0.92, frame))));
      setProgress(v);
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 600);
      }
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020408]"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 w-full max-w-2xl px-6 space-y-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[10px] font-mono text-blue-400/70 tracking-[0.4em] uppercase text-center"
            >
              An Interview Project
            </motion.p>

            {/* Title with letter-by-letter reveal */}
            <h1 className="text-center font-bold leading-none">
              <span className="block text-xs md:text-sm font-mono tracking-[0.35em] text-neutral-500">
                {TITLE.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.025,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block text-4xl md:text-6xl mt-3 text-white"
                style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
              >
                The Pilot&apos;s Son
              </motion.span>
            </h1>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="space-y-2 max-w-xs mx-auto"
            >
              <div
                className="w-full h-px overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, #4a90d9, #8e44ad, #e67e22)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 tracking-[0.2em]">
                <span>LOADING ARCHIVE</span>
                <span className="tabular-nums">{progress.toString().padStart(3, "0")}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom credit */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-6 left-6 text-[10px] font-mono text-neutral-700 tracking-widest"
          >
            INTERVIEW WITH STEVE SIMPSON
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-6 right-6 text-[10px] font-mono text-neutral-700 tracking-widest"
          >
            EST. 1967
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
