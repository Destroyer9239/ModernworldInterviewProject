"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollProgress(totalSections: number) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        setScrollProgress(progress);

        // Determine active section from scroll position
        const sectionHeight = maxScroll / totalSections;
        const section = Math.min(
          Math.floor(scrollY / sectionHeight),
          totalSections - 1
        );
        setActiveSection(section);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSections]);

  return { activeSection, scrollProgress };
}
