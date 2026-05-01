"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Parses a value like "58,000" or "1 month" or "2 blocks" into [number, prefix, suffix]
function parseNumber(input: string): { num: number | null; prefix: string; suffix: string } {
  const match = input.match(/^([^\d-]*)(-?\d+(?:[,.\d]+)?)([^\d]*)$/);
  if (!match) return { num: null, prefix: input, suffix: "" };
  const [, prefix, numStr, suffix] = match;
  const cleaned = numStr.replace(/,/g, "");
  const num = parseFloat(cleaned);
  return { num: isNaN(num) ? null : num, prefix, suffix };
}

function formatNumber(n: number, original: string): string {
  // Preserve comma formatting
  if (original.includes(",")) {
    return Math.round(n).toLocaleString("en-US");
  }
  // Preserve decimal places
  const decimals = (original.split(".")[1] || "").length;
  return n.toFixed(decimals);
}

export default function AnimatedCounter({
  value,
  duration = 1.6,
  className = "",
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const parsed = parseNumber(value);
  const [display, setDisplay] = useState(parsed.num !== null ? "0" : value);

  useEffect(() => {
    if (!inView || parsed.num === null) {
      if (parsed.num === null) setDisplay(value);
      return;
    }

    const startTime = performance.now();
    const startVal = 0;
    const endVal = parsed.num;
    const dur = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / dur);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startVal + (endVal - startVal) * eased;
      setDisplay(formatNumber(current, value.match(/-?\d+(?:[,.\d]+)?/)?.[0] ?? "0"));
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(formatNumber(endVal, value.match(/-?\d+(?:[,.\d]+)?/)?.[0] ?? "0"));
    };

    requestAnimationFrame(tick);
  }, [inView, parsed.num, duration, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} style={style}>
      {parsed.num !== null ? (
        <>
          {parsed.prefix}
          {display}
          {parsed.suffix}
        </>
      ) : (
        value
      )}
    </span>
  );
}
