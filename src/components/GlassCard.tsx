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
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const quoteVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE, delay: 0.3 },
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
      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-2xl blur-md opacity-30 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${section.accentColor}55, transparent 70%)` }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6, 8, 18, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${section.accentColor}2e`,
          boxShadow: `0 12px 56px rgba(0,0,0,0.65), inset 0 1px 0 ${section.accentColor}1a`,
        }}
      >
        {/* Accent top bar */}
        <motion.div
          variants={itemVariants}
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, ${section.accentColor}, transparent)` }}
        />

        <div className="p-6 md:p-8 space-y-4">
          {/* Era + year badge row */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
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
            className="text-xl md:text-2xl font-bold leading-tight text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {section.title}
          </motion.h2>

          {/* Interview question */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 items-start rounded-lg px-3 py-2"
            style={{ background: `${section.accentColor}0d`, border: `1px solid ${section.accentColor}22` }}
          >
            <span className="text-xs mt-0.5 shrink-0" style={{ color: `${section.accentColor}99` }}>Q</span>
            <p className="text-xs italic leading-relaxed" style={{ color: `${section.accentColor}bb` }}>
              {section.interviewQuestion}
            </p>
          </motion.div>

          {/* Historical context */}
          <motion.p variants={itemVariants} className="text-sm text-neutral-400 leading-relaxed">
            {section.context}
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="w-10 h-px"
            style={{ background: `${section.accentColor}55` }}
          />

          {/* Findings — scrollable when many */}
          <motion.div variants={containerVariants}>
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: `${section.accentColor}88` }}
            >
              Key Findings
            </motion.p>
            <motion.ul
              variants={containerVariants}
              className="space-y-2.5 overflow-y-auto pr-1"
              style={{ maxHeight: "28vh", scrollbarWidth: "thin", scrollbarColor: `${section.accentColor}44 transparent` }}
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

          {/* Pull quote */}
          {section.quote && (
            <motion.blockquote
              variants={quoteVariants}
              className="pl-4 italic text-sm leading-relaxed"
              style={{
                color: section.accentColor,
                borderLeft: `3px solid ${section.accentColor}55`,
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
