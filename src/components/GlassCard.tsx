"use client";

import { motion, useMotionValue, useTransform, useSpring, type Variants } from "framer-motion";
import { StorySection } from "@/data/sections";

interface GlassCardProps {
  section: StorySection;
  isActive: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.8, ease: EASE },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function GlassCard({ section, isActive }: GlassCardProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Deep tilt effect
  const rotateX = useTransform(springY, [0, 1], [12, -12]);
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);
  const shadowX = useTransform(springX, [0, 1], [20, -20]);
  const shadowY = useTransform(springY, [0, 1], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      key={section.id}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full max-w-lg perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic shadow that follows mouse */}
      <motion.div 
        className="absolute inset-4 rounded-3xl blur-3xl opacity-40 pointer-events-none"
        style={{
          x: shadowX,
          y: shadowY,
          background: `radial-gradient(circle at center, ${section.accentColor}88, transparent 70%)`,
        }}
      />

      {/* Main Card Body */}
      <motion.div
        className="relative rounded-3xl overflow-hidden border border-white/10"
        style={{
          background: "linear-gradient(165deg, rgba(15, 18, 35, 0.8) 0%, rgba(5, 7, 15, 0.95) 100%)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: `0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px ${section.accentColor}20`,
        }}
      >
        {/* Animated Accent Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-64 h-64 blur-[80px] pointer-events-none"
          style={{ background: section.accentColor }}
        />

        <div className="p-8 md:p-10 space-y-8 relative z-10">
          {/* Header */}
          <div className="space-y-2">
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: section.accentColor }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-500">
                Field Notes // {section.era}
              </span>
            </motion.div>
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Key Findings
            </motion.h3>
          </div>

          {/* Context Section */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-8" style={{ background: section.accentColor }} />
              <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">Context</p>
            </div>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light italic">
              &quot;{section.context}&quot;
            </p>
          </motion.div>

          {/* Findings List */}
          <div className="space-y-4">
            <motion.p variants={itemVariants} className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500">
              From the Interview
            </motion.p>
            <motion.ul className="space-y-4">
              {section.findings.map((finding, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="group flex gap-4 text-sm text-neutral-400 leading-relaxed"
                >
                  <div 
                    className="mt-2 shrink-0 w-1 h-1 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ background: section.accentColor, boxShadow: `0 0 8px ${section.accentColor}` }}
                  />
                  <span className="group-hover:text-neutral-200 transition-colors">{finding}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-0 right-0 p-4 opacity-20">
          <div className="w-12 h-12 border-r-2 border-b-2" style={{ borderColor: section.accentColor }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
