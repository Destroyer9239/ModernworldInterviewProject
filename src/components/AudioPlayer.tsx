"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [hasAudio, setHasAudio] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch("/audio/interview.mp3", { method: "HEAD" })
      .then((r) => setHasAudio(r.ok))
      .catch(() => setHasAudio(false));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    audio.currentTime = x * audio.duration;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {hasAudio && <audio ref={audioRef} src="/audio/interview.mp3" preload="metadata" />}

      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8, 10, 20, 0.88)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
                minWidth: 280,
              }}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-300 tracking-wider">
                    RONAN INTERVIEW
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  {hasAudio
                    ? "Steve Simpson · Pilot's Son"
                    : "Upload interview.mp3 to /public/audio/"}
                </p>

                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onClick={hasAudio ? seek : undefined}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${progress * 100}%`,
                      background: "linear-gradient(90deg, #4a90d9, #8e44ad)",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    {formatTime((audioRef.current?.currentTime) ?? 0)}
                  </span>
                  <button
                    onClick={hasAudio ? togglePlay : undefined}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all"
                    style={{
                      background: hasAudio ? "rgba(74,144,217,0.3)" : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(74,144,217,0.5)",
                      cursor: hasAudio ? "pointer" : "not-allowed",
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                        <rect x="2" y="1" width="3" height="10" rx="1" />
                        <rect x="7" y="1" width="3" height="10" rx="1" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                        <polygon points="2,1 11,6 2,11" />
                      </svg>
                    )}
                  </button>
                  <span className="text-xs font-mono text-neutral-500">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Volume */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: "#4a90d9" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(8, 10, 20, 0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(74,144,217,0.4)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#4a90d9" strokeWidth="1.5" />
            {isPlaying ? (
              <>
                <rect x="4.5" y="4" width="2" height="6" rx="0.5" fill="#4a90d9" />
                <rect x="7.5" y="4" width="2" height="6" rx="0.5" fill="#4a90d9" />
              </>
            ) : (
              <polygon points="5.5,4 10,7 5.5,10" fill="#4a90d9" />
            )}
          </svg>
          <span className="text-xs font-mono text-neutral-300 tracking-wider">
            {hasAudio ? "INTERVIEW" : "AUDIO"}
          </span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 rounded-full bg-blue-400"
                  animate={{ height: ["4px", "10px", "4px"] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
