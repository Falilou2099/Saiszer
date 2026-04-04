"use client";

import { useEffect, useRef, useState } from "react";
import { getAmbientPreload, shouldAutoplayAmbientVideo } from "@/lib/video";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  pausedExternally?: boolean;
}

export default function VideoBackground({
  src,
  poster,
  pausedExternally = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldPlay = shouldAutoplayAmbientVideo({
      visible: true,
      allowed: true,
      pausedExternally,
      prefersReducedMotion: reduceMotion,
    });

    if (!shouldPlay) {
      video.pause();
      return;
    }

    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });
    return () => video.removeEventListener("canplay", tryPlay);
  }, [pausedExternally, videoError]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {!videoError ? (
        <video
          ref={videoRef}
          data-video-ambient="true"
          className="hero-video-cover video-layer-gpu z-0"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={getAmbientPreload({ kind: "hero", inView: true })}
          disablePictureInPicture
          onError={() => setVideoError(true)}
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          className="hero-video-cover absolute inset-0 z-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-neutral-950" aria-hidden />
      )}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />
    </div>
  );
}
