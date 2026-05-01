"use client";

import { motion } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

const TECH_STACK = [
  { name: "Next.js 16" },
  { name: "Three.js" },
  { name: "React Three Fiber" },
  { name: "GSAP ScrollTrigger" },
  { name: "Framer Motion" },
  { name: "Lenis" },
  { name: "Tailwind CSS" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative px-6 md:px-16 pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(74,144,217,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-mono text-neutral-500 tracking-[0.4em] uppercase mb-3">
            History is lived through
          </p>
          <h2
            className="text-5xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-serif), 'Georgia', serif" }}
          >
            People,
            <br />
            <span className="italic text-neutral-400">not books.</span>
          </h2>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-14">
          {/* About */}
          <div className="col-span-2 space-y-3">
            <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase font-semibold">
              About this project
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
              An interactive scrollytelling experience documenting Steve Simpson&apos;s
              firsthand account of the Cold War, Vietnam, and 9/11. Built as an immersive
              tribute to the people who lived modern history.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 mt-3 text-xs font-mono text-blue-400 tracking-widest uppercase hover:text-blue-300 transition-colors"
            >
              <span>↑</span>
              <span>Back to start</span>
            </button>
          </div>

          {/* Chapters */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase font-semibold">
              Chapters
            </p>
            <ul className="space-y-2">
              {STORY_SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group"
                  >
                    <span
                      className="font-mono text-[10px] tabular-nums"
                      style={{ color: s.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline underline-offset-4">
                      {s.shortTitle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Built with */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono text-neutral-500 tracking-[0.3em] uppercase font-semibold">
              Built with
            </p>
            <ul className="space-y-2">
              {TECH_STACK.map((t) => (
                <li key={t.name} className="text-sm text-neutral-500">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
              Memories of the Modern World · Interview with Steve Simpson
            </p>
          </div>
          <p className="text-[10px] font-mono text-neutral-600 tracking-widest">
            © {new Date().getFullYear()} · The Pilot&apos;s Son
          </p>
        </div>
      </div>
    </footer>
  );
}
