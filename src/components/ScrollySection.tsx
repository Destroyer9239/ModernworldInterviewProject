"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StorySection } from "@/data/sections";
import GlassCard from "./GlassCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollySectionProps {
  section: StorySection;
  isActive: boolean;
  onBecomeActive: () => void;
}

export default function ScrollySection({ section, isActive, onBecomeActive }: ScrollySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  useEffect(() => {
    if (isInView) onBecomeActive();
  }, [isInView, onBecomeActive]);

  // Side accent bar animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current.querySelector(".accent-bar") as HTMLElement;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => gsap.to(el, { scaleY: 1, duration: 0.8, ease: "power2.out" }),
      onLeave: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
      onEnterBack: () => gsap.to(el, { scaleY: 1, duration: 0.8, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(el, { scaleY: 0, duration: 0.4 }),
    });
    return () => trigger.kill();
  }, []);

  const isEven = section.index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-16"
      style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
    >
      {/* Background glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.06 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${isEven ? "30%" : "70%"} 50%, ${section.accentColor}, transparent)`,
        }}
      />

      {/* Section number watermark */}
      <motion.span
        animate={{ opacity: isActive ? 0.04 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute text-[20vw] font-bold select-none pointer-events-none"
        style={{
          color: section.accentColor,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Georgia', serif",
          lineHeight: 1,
        }}
      >
        {section.index + 1}
      </motion.span>

      {/* Accent vertical bar */}
      <div
        className="accent-bar absolute left-0 top-0 bottom-0 w-0.5 origin-top"
        style={{
          background: `linear-gradient(180deg, transparent, ${section.accentColor}, transparent)`,
          transform: "scaleY(0)",
        }}
      />

      <div
        className={`relative z-10 w-full flex flex-col md:flex-row gap-8 items-center ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content card — takes 45% on desktop */}
        <div className="w-full md:w-5/12">
          <GlassCard section={section} isActive={isActive} />
        </div>

        {/* 3D canvas zone label — the canvas is sticky and handled at page level */}
        <div className="hidden md:flex md:w-7/12 items-center justify-center">
          <motion.div
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: `${section.accentColor}88` }}
            >
              {section.years}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
