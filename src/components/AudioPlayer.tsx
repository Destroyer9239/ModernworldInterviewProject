"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
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
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
        setCurrentTime(audio.currentTime);
      }
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
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
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = x * audio.duration;
    setCurrentTime(audio.currentTime);
    setProgress(x);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const formatTime = (secs: number) => {
    if (!isFinite(secs) || secs < 0) return "0:00";
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
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 overflow-hidden"
              style={{
                background: "rgba(20, 21, 26, 0.98)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid var(--rule-strong)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
                minWidth: 320,
                borderRadius: 4,
              }}
            >
              <div className="p-5 space-y-4">
                {/* Label */}
                <div className="flex items-center justify-between">
                  <p className="kicker" style={{ color: "var(--accent)" }}>
                    The Interview
                  </p>
                  {duration > 0 && (
                    <p className="kicker tabular-nums" style={{ color: "var(--ink-mute)" }}>
                      {formatTime(duration)}
                    </p>
                  )}
                </div>

                <p
                  className="serif italic"
                  style={{ color: "var(--ink-soft)", fontSize: "14px" }}
                >
                  {hasAudio ? "Steve Simpson · in his own voice" : "No audio file found"}
                </p>

                {/* Progress */}
                <div
                  className="w-full h-1 cursor-pointer relative group"
                  style={{ background: "var(--rule-strong)" }}
                  onClick={hasAudio ? seek : undefined}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${progress * 100}%`,
                      background: "var(--ink)",
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      left: `calc(${progress * 100}% - 5px)`,
                      background: "var(--accent)",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span
                    className="kicker tabular-nums"
                    style={{ color: "var(--ink-soft)", minWidth: "2.5rem" }}
                  >
                    {formatTime(currentTime)}
                  </span>

                  <button
                    onClick={hasAudio ? togglePlay : undefined}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-95"
                    style={{
                      background: hasAudio ? "var(--ink)" : "var(--rule)",
                      color: "var(--bg)",
                      cursor: hasAudio ? "pointer" : "not-allowed",
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                        <rect x="1.5" y="1" width="2.8" height="9" rx="0.5" />
                        <rect x="6.7" y="1" width="2.8" height="9" rx="0.5" />
                      </svg>
                    ) : (
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" style={{ marginLeft: 2 }}>
                        <polygon points="2,1 10,5.5 2,10" />
                      </svg>
                    )}
                  </button>

                  <span
                    className="kicker tabular-nums text-right"
                    style={{ color: "var(--ink-mute)", minWidth: "2.5rem" }}
                  >
                    {duration > 0 ? formatTime(duration) : "--:--"}
                  </span>
                </div>

                {/* Volume */}
                <div
                  className="flex items-center gap-3 pt-2"
                  style={{ borderTop: "1px solid var(--rule)" }}
                >
                  <span className="kicker" style={{ color: "var(--ink-mute)" }}>
                    Vol
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={onVolumeChange}
                    className="flex-1 cursor-pointer"
                  />
                  <span
                    className="kicker tabular-nums"
                    style={{ color: "var(--ink-mute)", minWidth: "2rem", textAlign: "right" }}
                  >
                    {Math.round(volume * 100)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle pill */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-2.5"
          style={{
            background: "rgba(20, 21, 26, 0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isExpanded
              ? "1px solid var(--accent)"
              : "1px solid var(--rule-strong)",
            borderRadius: 4,
          }}
        >
          {/* Mini play indicator */}
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full"
            style={{ background: isPlaying ? "var(--accent)" : "var(--ink)" }}
          >
            {isPlaying ? (
              <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--bg)">
                <rect x="0.5" y="0.5" width="1.5" height="5" rx="0.3" />
                <rect x="4" y="0.5" width="1.5" height="5" rx="0.3" />
              </svg>
            ) : (
              <svg width="6" height="6" viewBox="0 0 6 6" fill="var(--bg)" style={{ marginLeft: 1 }}>
                <polygon points="0.8,0.5 5.5,3 0.8,5.5" />
              </svg>
            )}
          </span>
          <span className="kicker" style={{ color: "var(--ink)" }}>
            {hasAudio ? (isPlaying ? "Now Playing" : "Listen") : "Audio"}
          </span>
          {isPlaying && (
            <span className="flex gap-[2px] items-end h-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-px"
                  style={{ background: "var(--accent)" }}
                  animate={{ height: ["3px", "11px", "3px"] }}
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    delay: i * 0.13,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
