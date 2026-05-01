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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const quoteVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.4 },
  },
};

export default function GlassCard({ section, isActive }: GlassCardProps) {
  return (
    <motion.div
      key={section.id}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative max-w-xl w-full"
    >
      {/* Glow border */}
      <div
        className="absolute inset-0 rounded-2xl blur-sm opacity-40 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${section.accentColor}44, transparent)` }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(8, 10, 20, 0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${section.accentColor}33`,
          boxShadow: `0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 ${section.accentColor}22`,
        }}
      >
        {/* Accent top bar */}
        <motion.div
          variants={itemVariants}
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, ${section.accentColor}, transparent)` }}
        />

        <div className="p-8 space-y-5">
          {/* Era badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                color: section.accentColor,
                background: `${section.accentColor}18`,
                border: `1px solid ${section.accentColor}44`,
              }}
            >
              {section.era}
            </span>
            <span className="text-xs font-mono text-neutral-500 tracking-widest">
              {section.years}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold leading-tight text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {section.title}
          </motion.h2>

          {/* Context */}
          <motion.p variants={itemVariants} className="text-sm text-neutral-400 leading-relaxed">
            {section.context}
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-12 h-px"
            style={{ background: `${section.accentColor}66` }}
          />

          {/* Findings */}
          <motion.ul variants={containerVariants} className="space-y-3">
            {section.findings.map((finding, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex gap-3 text-sm text-neutral-300 leading-relaxed"
              >
                <span
                  className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: section.accentColor }}
                />
                {finding}
              </motion.li>
            ))}
          </motion.ul>

          {/* Quote */}
          {section.quote && (
            <motion.blockquote
              variants={quoteVariants}
              className="mt-2 pl-4 italic text-sm leading-relaxed"
              style={{
                color: section.accentColor,
                borderLeft: `3px solid ${section.accentColor}66`,
              }}
            >
              {section.quote}
            </motion.blockquote>
          )}
        </div>
      </div>
    </motion.div>
  );
}
