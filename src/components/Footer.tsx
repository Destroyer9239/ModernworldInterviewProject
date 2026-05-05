"use client";

import { motion } from "framer-motion";
import { STORY_SECTIONS } from "@/data/sections";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer
      className="relative px-6 md:px-12 lg:px-20 pt-24 pb-12"
      style={{ borderTop: "1px solid var(--rule-strong)" }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Big closing line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="kicker mb-5" style={{ color: "var(--accent)" }}>
            History is lived through
          </p>
          <h2
            className="serif font-medium tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 9rem)",
              lineHeight: 0.95,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            People,
            <br />
            <span className="italic" style={{ color: "var(--ink-soft)" }}>not books.</span>
          </h2>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          <div className="md:col-span-6 space-y-4">
            <p className="kicker" style={{ color: "var(--ink-mute)" }}>
              About this issue
            </p>
            <p
              className="serif"
              style={{
                color: "var(--ink-soft)",
                fontSize: "17px",
                lineHeight: 1.65,
                maxWidth: "32rem",
              }}
            >
              An oral history documenting Stephen Vance&apos;s firsthand account of the Cold War,
              Vietnam, and 9/11. Presented as a long-form, scrollable feature — a tribute to the
              people who lived through modern history and the kids they raised in its shadow.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 mt-4 transition-colors"
              style={{ color: "var(--accent)" }}
            >
              <span aria-hidden>↑</span>
              <span className="kicker" style={{ color: "var(--accent)" }}>Back to top</span>
            </button>
          </div>

          <div className="md:col-span-3 space-y-4">
            <p className="kicker" style={{ color: "var(--ink-mute)" }}>Chapters</p>
            <ul className="space-y-2.5">
              {STORY_SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="grid grid-cols-[2rem_1fr] gap-2 items-baseline text-left group transition-colors w-full"
                  >
                    <span
                      className="kicker tabular-nums"
                      style={{ color: "var(--ink-mute)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="serif group-hover:italic transition-all"
                      style={{ color: "var(--ink-soft)", fontSize: "16px" }}
                    >
                      {s.shortTitle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <p className="kicker" style={{ color: "var(--ink-mute)" }}>Colophon</p>
            <p
              className="serif italic"
              style={{ color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.65 }}
            >
              Set in Cormorant Garamond and Inter. Built with Next.js, React Three Fiber, GSAP,
              Framer Motion, and Lenis.
            </p>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <p className="kicker" style={{ color: "var(--ink-mute)" }}>
            Memories of the Modern World · Interview with Stephen Vance
          </p>
          <p className="kicker tabular-nums" style={{ color: "var(--ink-mute)" }}>
            © {new Date().getFullYear()} Carrier Born
          </p>
        </div>
      </div>
    </footer>
  );
}
