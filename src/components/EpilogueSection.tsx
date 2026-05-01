"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function EpilogueSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const assetRequests = [
    {
      label: "Audio Interview",
      detail: "Place the Ronan interview MP3 at /public/audio/interview.mp3",
      color: "#4a90d9",
      icon: "🎙",
    },
    {
      label: "3D Jet Model",
      detail: "Place an F-14 or F-4 .glb at /public/models/jet.glb (search Sketchfab)",
      color: "#8e44ad",
      icon: "✈",
    },
    {
      label: "Vietnam Background Video",
      detail:
        'Highfield AI prompt: "Cinematic aerial footage over dense jungle canopy, 1960s Vietnam, golden hour, 16mm film grain, muted greens and ochres, slow parallax movement"',
      color: "#c0392b",
      icon: "🎬",
    },
    {
      label: "Navy Brat Polaroid",
      detail:
        'Nano Banana prompt: "Worn 1970s Polaroid photograph of a young boy on a naval air station tarmac, fighter jet blurred in background, sun-faded colors, slight border vignette, nostalgic film aesthetic"',
      color: "#e67e22",
      icon: "📷",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(241,196,15,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl w-full space-y-12">
        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4"
        >
          <p className="text-xs font-mono text-yellow-400 tracking-[0.3em] uppercase">
            End of Transmission
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            History is lived through people,<br />not books.
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Steve Simpson&apos;s story spans the entire arc of the Cold War — from a childhood filled with silent anxiety, to a man-to-man reckoning with what it truly means to serve.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: "power2.inOut" as never }}
          className="w-full h-px origin-left"
          style={{ background: "linear-gradient(90deg, #f1c40f, transparent)" }}
        />

        {/* Asset request cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-xs font-mono text-neutral-500 tracking-widest uppercase mb-6">
            Assets Needed to Complete This Project
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assetRequests.map((asset, i) => (
              <motion.div
                key={asset.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl p-4 space-y-2"
                style={{
                  background: "rgba(8, 10, 20, 0.72)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${asset.color}33`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{asset.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: asset.color }}>
                    {asset.label}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{asset.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center text-xs font-mono text-neutral-700 tracking-wider"
        >
          Built with Three.js · GSAP ScrollTrigger · React Three Fiber · Framer Motion
        </motion.p>
      </div>
    </section>
  );
}
