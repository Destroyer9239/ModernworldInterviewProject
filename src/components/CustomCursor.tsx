"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update dot instantly
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

    // Smooth ring animation
    let rafId: number;
    const tick = () => {
      // Lerp ring for a premium feel, while dot stays instant
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
  }, []);

  return (
    <>
      {/* Primary Dot - Instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-0.75px",
          marginTop: "-0.75px"
        }}
      />
      
      {/* Secondary Ring - Smooth Lerp */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999]"
        style={{ 
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "-16px",
          marginTop: "-16px",
          borderColor: "rgba(74,144,217, 0.5)",
          boxShadow: "0 0 15px rgba(74,144,217, 0.2)"
        }}
        animate={{
          scale: isMouseDown ? 0.8 : isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(74,144,217, 0.8)" : "rgba(74,144,217, 0.5)",
          backgroundColor: isHovering ? "rgba(74,144,217, 0.05)" : "transparent"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Hover Pulse Effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
            className="fixed top-0 left-0 w-8 h-8 border border-blue-400/30 rounded-full pointer-events-none z-[9998]"
            style={{ 
              left: 0, top: 0,
              // We don't use the ref here for the pulse to keep it simple, 
              // it will follow roughly but the ring is the main visual anchor
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
