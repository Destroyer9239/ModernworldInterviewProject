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
        className="absolute inset-0 rounded-2xl blur-xl opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${section.accentColor}66, transparent 65%)`,
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(12, 16, 32, 0.92)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${section.accentColor}40`,
          boxShadow: `0 20px 80px rgba(0,0,0,0.7), inset 0 1px 0 ${section.accentColor}22`,
        }}
      >
        {/* Top accent bar */}
        <motion.div
          variants={itemVariants}
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${section.accentColor}, ${section.accentColor}55, transparent)`,
          }}
        />

        <div className="p-6 md:p-8 space-y-6">
          {/* Header row */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <span
              className="text-xs font-mono font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: section.accentColor,
                background: `${section.accentColor}20`,
                border: `1px solid ${section.accentColor}50`,
              }}
            >
              {section.era}
            </span>
            <span className="text-sm font-mono text-neutral-400">{section.years}</span>
          </motion.div>

          {/* Steve's story */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest font-semibold" style={{ color: section.accentColor }}>
              Steve&apos;s Story
            </p>
            <p className="text-sm text-neutral-200 leading-relaxed">{section.context}</p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px"
            style={{ background: `linear-gradient(90deg, ${section.accentColor}50, transparent)` }}
          />

          {/* Findings */}
          <motion.div variants={containerVariants}>
            <motion.p
              variants={itemVariants}
              className="text-[10px] font-mono uppercase tracking-widest mb-4 font-semibold"
              style={{ color: section.accentColor }}
            >
              Key Findings
            </motion.p>
            <motion.ul variants={containerVariants} className="space-y-3">
              {section.findings.map((finding, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex gap-3 text-sm text-neutral-200 leading-relaxed"
                >
                  <span
                    className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
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
