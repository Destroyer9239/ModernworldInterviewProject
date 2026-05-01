"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { STORY_SECTIONS } from "@/data/sections";
import HeroSection from "@/components/HeroSection";
import ScrollySection from "@/components/ScrollySection";
import EpilogueSection from "@/components/EpilogueSection";
import Navigation from "@/components/Navigation";
import AudioPlayer from "@/components/AudioPlayer";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Dynamic import so Three.js only runs on the client
const JetScene = dynamic(() => import("@/components/JetScene"), { ssr: false });

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [hasModel, setHasModel] = useState(false);
  const { activeSection, scrollProgress } = useScrollProgress(STORY_SECTIONS.length);

  useEffect(() => {
    setActiveSectionIndex(activeSection);
  }, [activeSection]);

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
      <Navigation activeSection={activeSectionIndex} scrollProgress={scrollProgress} />
      <AudioPlayer />

      {/* Hero */}
      <HeroSection />

      {/* Scrollytelling layout */}
      <div className="relative">
        {/* Sticky 3D canvas pinned to right half on desktop */}
        <div
          className="hidden md:block sticky top-0 h-screen w-1/2 ml-auto pointer-events-none"
          style={{ marginTop: "-100vh", zIndex: 10 }}
        >
          <div
            className="absolute inset-0 transition-all duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${currentSection.accentColor}12, transparent 70%)`,
            }}
          />
          <JetScene
            animState={currentSection.jetState}
            accentColor={currentSection.accentColor}
            hasModel={hasModel}
          />
        </div>

        {/* Mobile: full-width fixed canvas behind content */}
        <div
          className="md:hidden fixed inset-0 pointer-events-none opacity-50"
          style={{ zIndex: 0 }}
        >
          <JetScene
            animState={currentSection.jetState}
            accentColor={currentSection.accentColor}
            hasModel={hasModel}
          />
        </div>

        {/* Story sections */}
        <div className="relative" style={{ zIndex: 20 }}>
          {STORY_SECTIONS.map((section, i) => (
            <ScrollySection
              key={section.id}
              section={section}
              isActive={activeSectionIndex === i}
              onBecomeActive={() => handleSectionActive(i)}
            />
          ))}
        </div>
      </div>

      {/* Epilogue */}
      <EpilogueSection />
    </main>
  );
}
