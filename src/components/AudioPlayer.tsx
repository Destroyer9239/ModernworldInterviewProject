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
    const onEnded = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(10, 14, 26, 0.97)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(74,144,217,0.35)",
                boxShadow: "0 12px 56px rgba(0,0,0,0.8), 0 0 0 1px rgba(74,144,217,0.08)",
                minWidth: 300,
              }}
            >
              {/* top accent */}
              <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #4a90d9, #8e44ad 60%, transparent)" }} />

              <div className="p-5 space-y-4">
                {/* Label */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: isPlaying ? "#4a90d9" : "rgba(255,255,255,0.3)", boxShadow: isPlaying ? "0 0 6px #4a90d9" : "none" }}
                    />
                    <span className="text-xs font-mono text-white tracking-widest font-semibold">
                      INTERVIEW AUDIO
                    </span>
                  </div>
                  {hasAudio && duration > 0 && (
                    <span className="text-[10px] font-mono text-neutral-500">
                      {formatTime(duration)} total
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 -mt-1">
                  {hasAudio ? "Steve Simpson · Navy Pilot's Son" : "No audio file found"}
                </p>

                {/* Progress bar */}
                <div
                  className="w-full h-2 rounded-full cursor-pointer relative group"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onClick={hasAudio ? seek : undefined}
                >
                  <div
                    className="h-full rounded-full transition-none"
                    style={{
                      width: `${progress * 100}%`,
                      background: "linear-gradient(90deg, #4a90d9, #8e44ad)",
                    }}
                  />
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress * 100}% - 6px)` }}
                  />
                </div>

                {/* Time + controls row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-300 tabular-nums w-10">
                    {formatTime(currentTime)}
                  </span>

                  <button
                    onClick={hasAudio ? togglePlay : undefined}
                    className="flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-95"
                    style={{
                      background: hasAudio ? "rgba(74,144,217,0.25)" : "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(74,144,217,0.6)",
                      cursor: hasAudio ? "pointer" : "not-allowed",
                      boxShadow: hasAudio ? "0 0 16px rgba(74,144,217,0.2)" : "none",
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="white">
                        <rect x="2" y="1.5" width="3.5" height="10" rx="1.5" />
                        <rect x="7.5" y="1.5" width="3.5" height="10" rx="1.5" />
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="white" style={{ marginLeft: 1 }}>
                        <polygon points="2.5,1.5 12,6.5 2.5,11.5" />
                      </svg>
                    )}
                  </button>

                  <span className="text-xs font-mono text-neutral-500 tabular-nums w-10 text-right">
                    {duration > 0 ? formatTime(duration) : "--:--"}
                  </span>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="rgba(255,255,255,0.4)">
                    <path d="M1 4.5h2l3-3v9l-3-3H1V4.5z" />
                    {volume > 0.5 && <path d="M8.5 2a5 5 0 0 1 0 8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />}
                    {volume > 0 && <path d="M7 3.8a2.8 2.8 0 0 1 0 4.4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />}
                  </svg>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 rounded-full cursor-pointer"
                    style={{ accentColor: "#4a90d9" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle pill button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(10, 14, 26, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: isExpanded ? "1px solid rgba(74,144,217,0.6)" : "1px solid rgba(74,144,217,0.35)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#4a90d9" strokeWidth="1.5" />
            {isPlaying ? (
              <>
                <rect x="4.5" y="4" width="1.8" height="6" rx="0.6" fill="#4a90d9" />
                <rect x="7.7" y="4" width="1.8" height="6" rx="0.6" fill="#4a90d9" />
              </>
            ) : (
              <polygon points="5.5,4 10,7 5.5,10" fill="#4a90d9" />
            )}
          </svg>
          <span className="text-xs font-mono text-neutral-200 tracking-wider font-medium">
            {hasAudio ? (isPlaying ? "PLAYING" : "INTERVIEW") : "AUDIO"}
          </span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 rounded-full bg-blue-400"
                  animate={{ height: ["3px", "11px", "3px"] }}
                  transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.13, ease: "easeInOut" }}
                />
              ))}
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
