"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { STORY_SECTIONS } from "@/data/sections";
import HeroSection from "@/components/HeroSection";
import ChapterIndex from "@/components/ChapterIndex";
import ScrollySection from "@/components/ScrollySection";
import EpilogueSection from "@/components/EpilogueSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { useScrollProgress } from "@/hooks/useScrollProgress";

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
    <SmoothScroll>
      <main className="relative bg-[#020408] text-white min-h-screen">
        {/* Loading screen — covers everything until ready */}
        <LoadingScreen />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Sticky header with section nav */}
        <Header activeSection={activeSectionIndex} scrollProgress={scrollProgress} />

        {/* Audio player */}
        <AudioPlayer />

        {/* Ambient 3D canvas — fixed background layer */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, opacity: 0.32 }}
        >
          <JetScene
            animState={currentSection.jetState}
            accentColor={currentSection.accentColor}
            hasModel={hasModel}
          />
        </div>

        {/* All scrollable content */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Hero with starfield + bio */}
          <HeroSection />

          {/* Chapter index / table of contents */}
          <ChapterIndex />

          {/* Story sections */}
          {STORY_SECTIONS.map((section, i) => (
            <ScrollySection
              key={section.id}
              section={section}
              isActive={activeSectionIndex === i}
              onBecomeActive={() => handleSectionActive(i)}
            />
          ))}

          {/* Epilogue */}
          <EpilogueSection />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
