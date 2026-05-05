"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const v = Math.min(100, Math.round(100 * (1 - Math.pow(0.91, frame))));
      setProgress(v);
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
      }
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="relative z-10 flex flex-col items-center px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="kicker mb-8"
              style={{ color: "var(--accent)" }}
            >
              An Oral History
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="serif font-medium text-center tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1,
                color: "var(--ink)",
              }}
            >
              The Pilot&apos;s <span className="italic" style={{ color: "var(--ink-soft)" }}>Son</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px origin-left mt-8 mb-6"
              style={{ background: "var(--accent)" }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="space-y-3 w-64"
            >
              <div
                className="h-px overflow-hidden"
                style={{ background: "var(--rule)" }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                  style={{ background: "var(--ink)" }}
                />
              </div>
              <div className="flex items-center justify-between kicker" style={{ color: "var(--ink-mute)" }}>
                <span>Loading archive</span>
                <span className="tabular-nums">{progress.toString().padStart(3, "0")}%</span>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-6 kicker"
            style={{ color: "var(--ink-mute)" }}
          >
            Interview · Steve Simpson
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 right-6 kicker tabular-nums"
            style={{ color: "var(--ink-mute)" }}
          >
            EST. 1967
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
