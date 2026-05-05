"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, a, input[type=range], [role=button]")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const tick = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        const size = hovering ? 44 : 28;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[150] rounded-full transition-[width,height,background,border-color] duration-200"
        style={{
          border: hovering
            ? "1.5px solid rgba(74, 144, 217, 0.9)"
            : "1px solid rgba(255, 255, 255, 0.4)",
          background: hovering ? "rgba(74, 144, 217, 0.08)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[151] rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "rgba(255, 255, 255, 0.95)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
