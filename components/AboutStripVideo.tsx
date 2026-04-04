"use client";

import { useEffect, useRef, useState } from "react";
import { getAmbientPreload, shouldAutoplayAmbientVideo } from "@/lib/video";

interface AboutStripVideoProps {
  src: string;
  poster?: string;
  pausedExternally?: boolean;
}

export default function AboutStripVideo({
  src,
  poster,
  pausedExternally = false,
}: AboutStripVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "64px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldPlay = shouldAutoplayAmbientVideo({
      visible: inView,
      allowed: true,
      pausedExternally,
      prefersReducedMotion: reduceMotion,
    });

    if (!shouldPlay) {
      video.pause();
      return;
    }

    video.muted = true;
    video.play().catch(() => {});
  }, [inView, pausedExternally, videoError]);

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden bg-black">
      {!videoError ? (
        <video
          ref={videoRef}
          data-video-ambient="true"
          className="video-layer-gpu absolute inset-0 z-0 h-full w-full object-cover object-center"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={getAmbientPreload({ kind: "ambient", inView })}
          aria-hidden
          onError={() => setVideoError(true)}
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-neutral-950" aria-hidden />
      )}
    </div>
  );
}
