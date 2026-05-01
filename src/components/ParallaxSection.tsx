"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StorySection, STORY_SECTIONS } from "@/data/sections";
import GlassCard from "./GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function StatCard({
  value,
  label,
  accentColor,
  delay,
  inView,
  scrollYProgress,
}: {
  value: string;
  label: string;
  accentColor: string;
  delay: number;
  inView: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const shouldReduce = useReducedMotion();
  const driftY = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -25 * (delay + 1)]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: driftY }}
      className="group relative"
    >
      <div
        className="rounded-2xl p-5 md:p-6 transition-colors duration-500 group-hover:bg-white/[0.04]"
        style={{
          background: "rgba(6, 8, 18, 0.6)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${accentColor}22`,
          boxShadow: `inset 0 0 20px ${accentColor}05`,
        }}
      >
        <span
          className="block text-3xl md:text-4xl font-bold leading-none tracking-tighter"
          style={{ color: accentColor, fontFamily: "var(--font-playfair)" }}
        >
          {value}
        </span>
        <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] mt-3">
          {label}
        </span>
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t opacity-20" style={{ borderColor: accentColor }} />
    </motion.div>
  );
}

interface ParallaxSectionProps {
  section: StorySection;
  isActive: boolean;
  onBecomeActive: (index: number) => void;
  index: number;
}

export default function ParallaxSection({ section, isActive, onBecomeActive, index }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(!section.backgroundImage);
  const shouldReduce = useReducedMotion();

  const contentInView = useInView(sectionRef, { amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ["0%", "0%"] : ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.08, 1.02]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Reduced parallax amounts for smoother performance on all devices
  const layer1Y = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [25, -25]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [50, -50]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [75, -75]);

  const onBecomeActiveRef = useRef(onBecomeActive);
  useEffect(() => {
    onBecomeActiveRef.current = onBecomeActive;
  }, [onBecomeActive]);

  useEffect(() => {
    if (contentInView) onBecomeActiveRef.current(index);
  }, [contentInView, index]);

  useEffect(() => {
    if (section.backgroundImage) {
      const img = new Image();
      img.onload = () => setImgLoaded(true);
      img.src = section.backgroundImage;
    }
    const nextSection = STORY_SECTIONS[index + 1];
    if (nextSection?.backgroundImage) {
      const nextImg = new Image();
      nextImg.src = nextSection.backgroundImage;
    }
  }, [section.backgroundImage, index]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector(".accent-bar") as HTMLElement;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 65%",
      end: "bottom 35%",
      onEnter: () => gsap.to(el, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
      onLeave: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
      onEnterBack: () => gsap.to(el, { scaleY: 1, duration: 0.9, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative min-h-[140vh] flex flex-col justify-center py-32 overflow-hidden"
      style={{ scrollMarginTop: "64px" }}
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: sectionOpacity }}>
        <motion.div className="absolute inset-0 parallax-3d-layer" style={{ y: imageY, scale: imageScale }}>
          {section.backgroundImage && imgLoaded ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${section.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                top: "-20%",
                bottom: "-20%",
                height: "140%",
              }}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: section.gradientFallback, height: "140%" }} />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-transparent to-[#020408] opacity-80" />
      </motion.div>

      {/* Left accent bar */}
      <div
        className="accent-bar absolute left-0 top-0 bottom-0 w-px origin-top z-10"
        style={{
          background: `linear-gradient(180deg, transparent, ${section.accentColor}88, transparent)`,
          transform: "scaleY(0)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20">

        {/* Layer 1: Chapter heading */}
        <motion.div style={{ y: layer1Y }} className="mb-20 parallax-3d-layer">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/40">
              Chapter {section.index + 1}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-mono tracking-widest" style={{ color: section.accentColor }}>
                  {section.era}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-sm font-mono text-white/30">{section.years}</span>
              </div>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {section.title}
              </h2>
            </div>

            {section.quote && (
              <div className="md:max-w-xs border-l-2 pl-6" style={{ borderColor: `${section.accentColor}44` }}>
                <p className="text-sm italic text-white/50 leading-relaxed font-light">
                  &ldquo;{section.quote}&rdquo;
                </p>
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mt-4">
                  — Steve Simpson
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Layer 2: Main grid */}
        <motion.div style={{ y: layer2Y }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start parallax-3d-layer">

          {/* Left: Historical record + stats */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                Historical Record
              </span>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                  {section.historicalFact}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  accentColor={section.accentColor}
                  delay={i * 0.1}
                  inView={contentInView}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Right: Glass card */}
          <motion.div style={{ y: layer3Y }} className="lg:col-span-5 flex justify-center lg:justify-end parallax-3d-layer">
            <GlassCard section={section} isActive={isActive} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
