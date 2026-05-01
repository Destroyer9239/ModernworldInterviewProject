"use client";

import { motion, type Variants } from "framer-motion";
import { StorySection } from "@/data/sections";

interface GlassCardProps {
  section: StorySection;
  isActive: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function GlassCard({ section, isActive }: GlassCardProps) {
  return (
    <motion.div
      key={section.id}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full"
    >
      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-2xl blur-md opacity-25 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${section.accentColor}55, transparent 65%)`,
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6, 8, 18, 0.85)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${section.accentColor}2a`,
          boxShadow: `0 16px 64px rgba(0,0,0,0.6), inset 0 1px 0 ${section.accentColor}18`,
        }}
      >
        {/* Accent top bar */}
        <motion.div
          variants={itemVariants}
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${section.accentColor}, ${section.accentColor}44, transparent)`,
          }}
        />

        <div className="p-6 md:p-7 space-y-5">
          {/* Header row */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: section.accentColor,
                  background: `${section.accentColor}18`,
                  border: `1px solid ${section.accentColor}44`,
                }}
              >
                {section.era}
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-600">{section.years}</span>
          </motion.div>

          {/* Personal context */}
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: `${section.accentColor}77` }}>
              Steve&apos;s Story
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">{section.context}</p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px"
            style={{ background: `linear-gradient(90deg, ${section.accentColor}44, transparent)` }}
          />

          {/* Findings list */}
          <motion.div variants={containerVariants}>
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: `${section.accentColor}77` }}
            >
              Key Findings
            </motion.p>
            <motion.ul
              variants={containerVariants}
              className="space-y-2.5"
            >
              {section.findings.map((finding, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex gap-3 text-sm text-neutral-300 leading-relaxed"
                >
                  <span
                    className="mt-2 shrink-0 w-1 h-1 rounded-full"
                    style={{ background: section.accentColor }}
                  />
                  <span>{finding}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
