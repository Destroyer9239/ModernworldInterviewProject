"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { STORY_SECTIONS } from "@/data/sections";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
import EpilogueSection from "@/components/EpilogueSection";
import Header from "@/components/Header";
import TimelineBar from "@/components/TimelineBar";
import AudioPlayer from "@/components/AudioPlayer";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const JetScene = dynamic(() => import("@/components/JetScene"), { ssr: false });

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [hasModel, setHasModel] = useState(false);
  const { activeSection, scrollProgress } = useScrollProgress(STORY_SECTIONS.length);

  const [prevActiveSection, setPrevActiveSection] = useState(activeSection);
  if (activeSection !== prevActiveSection) {
    setPrevActiveSection(activeSection);
    setActiveSectionIndex(activeSection);
  }

  useEffect(() => {
    fetch("/models/jet.glb", { method: "HEAD" })
      .then((r) => setHasModel(r.ok))
      .catch(() => setHasModel(false));
  }, []);

  const handleSectionActive = useCallback((index: number) => {
    setActiveSectionIndex(index);
  }, []);

  const currentSection = STORY_SECTIONS[activeSectionIndex] ?? STORY_SECTIONS[0];

  return (
    <main className="relative bg-[#020408] text-white min-h-screen">
      {/* ── Sticky header with full section nav ── */}
      <Header activeSection={activeSectionIndex} scrollProgress={scrollProgress} />

      {/* ── Audio player (bottom-right) ── */}
      <AudioPlayer />

      {/* ── Timeline sidebar (right) ── */}
      <TimelineBar activeSection={activeSectionIndex} scrollProgress={scrollProgress} />

      {/* ── Ambient 3D canvas — fixed background layer ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.35 }}
      >
        <JetScene
          animState={currentSection.jetState}
          accentColor={currentSection.accentColor}
          hasModel={hasModel}
        />
      </div>

      {/* ── All scrollable content sits above the canvas ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero */}
        <HeroSection />

        {/* Story sections with parallax backgrounds */}
        {STORY_SECTIONS.map((section, i) => (
          <ParallaxSection
            key={section.id}
            section={section}
            isActive={activeSectionIndex === i}
            onBecomeActive={handleSectionActive}
            index={i}
          />
        ))}

        {/* Epilogue */}
        <EpilogueSection />
      </div>
    </main>
  );
}

