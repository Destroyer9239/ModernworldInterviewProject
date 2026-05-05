"use client";

import { useState, useEffect } from "react";
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
  const [hasModel, setHasModel] = useState(false);
  const { activeSection, scrollProgress } = useScrollProgress(STORY_SECTIONS.length);

  useEffect(() => {
    fetch("/models/jet.glb", { method: "HEAD" })
      .then((r) => setHasModel(r.ok))
      .catch(() => setHasModel(false));
  }, []);

  const currentSection = STORY_SECTIONS[activeSection] ?? STORY_SECTIONS[0];

  return (
    <SmoothScroll>
      <main className="relative min-h-screen" style={{ background: "var(--bg)", color: "var(--ink)" }}>
        <LoadingScreen />
        <CustomCursor />
        <Header activeSection={activeSection} scrollProgress={scrollProgress} />
        <AudioPlayer />

        {/* Ambient 3D canvas — fixed background layer */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, opacity: 0.18 }}
        >
          <JetScene
            animState={currentSection.jetState}
            accentColor={currentSection.accentColor}
            hasModel={hasModel}
          />
        </div>

        <div className="relative" style={{ zIndex: 10 }}>
          <HeroSection />
          <ChapterIndex />

          {STORY_SECTIONS.map((section, i) => (
            <ScrollySection
              key={section.id}
              section={section}
              isActive={activeSection === i}
              onBecomeActive={() => {}}
            />
          ))}

          <EpilogueSection />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
