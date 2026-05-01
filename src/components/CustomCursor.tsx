"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setShowCursor(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!showCursor) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const needsHover = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input[type='range']")
      );
      setIsHovering(needsHover);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let rafId: number;
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-0.75px",
          marginTop: "-0.75px",
        }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999]"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-16px",
          marginTop: "-16px",
          borderColor: "rgba(107, 150, 196, 0.5)",
          boxShadow: "0 0 12px rgba(107, 150, 196, 0.15)",
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isHovering ? 1.5 : 1,
          borderColor: isHovering
            ? "rgba(107, 150, 196, 0.85)"
            : "rgba(107, 150, 196, 0.5)",
          backgroundColor: isHovering
            ? "rgba(107, 150, 196, 0.06)"
            : "transparent",
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
}
