"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * useScrollProgress
 * 
 * Tracks global scroll progress and determines the active section.
 * 
 * @param sectionCount Number of scrolly sections in the story
 * @returns { activeSection: number, scrollProgress: number }
 */
export function useScrollProgress(sectionCount: number) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    
    // Simple heuristic: active section is determined by scroll progress
    // We add a small buffer or use a more precise method if needed.
    // However, since sections are long, this is a good global indicator.
    // sectionIndex = floor(progress * sectionCount)
    // We cap it at sectionCount - 1
    const index = Math.min(
      Math.floor(latest * sectionCount),
      sectionCount - 1
    );
    
    // Note: page.tsx also uses useInView in ScrollySection to update activeSectionIndex.
    // This hook provides a continuous value for the progress bars.
    setActiveSection(index);
  });

  return { activeSection, scrollProgress };
}
