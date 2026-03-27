"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
}

export default function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setVideoFailed(true));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated fallback when video is unavailable */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${videoFailed ? "opacity-100" : "opacity-0"}`}
      >
        <div className="hero-fallback absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)]" />
      </div>

      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />
    </div>
  );
}
