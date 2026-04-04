"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { getAmbientPreload, shouldAutoplayPreviewVideo } from "@/lib/video";

interface ProjectCardProps {
  title: string;
  category: string;
  videoSrc: string;
  thumbUrl: string;
  onClick: () => void;
  pausedExternally?: boolean;
}

export default function ProjectCard({
  title,
  category,
  videoSrc,
  thumbUrl,
  onClick,
  pausedExternally = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "48px 0px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldPlay = shouldAutoplayPreviewVideo({
      visible: isVisible,
      previewActive: isPreviewActive,
      pausedExternally,
      prefersReducedMotion: reduceMotion,
    });

    if (!shouldPlay) {
      video.pause();
      return;
    }

    video.muted = true;
    video.play().catch(() => {});
  }, [isPreviewActive, isVisible, videoError, pausedExternally]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  const preload = getAmbientPreload({
    kind: "ambient",
    inView: isVisible && isPreviewActive && !pausedExternally,
  });

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPreviewActive(true)}
      onMouseLeave={() => setIsPreviewActive(false)}
      onFocus={() => setIsPreviewActive(true)}
      onBlur={() => setIsPreviewActive(false)}
      aria-label={`Voir ${title}`}
      className="project-card group relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-sm border-0 bg-neutral-900/50 text-left outline-none ring-accent/40 focus-visible:ring-2 sm:aspect-[16/10]"
    >
      {!videoError ? (
        <video
          ref={videoRef}
          className="video-layer-gpu pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
          src={videoSrc}
          muted
          loop
          playsInline
          preload={preload}
          poster={thumbUrl || undefined}
          disablePictureInPicture
          onError={() => setVideoError(true)}
        />
      ) : thumbUrl ? (
        <img
          src={thumbUrl}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-neutral-950" aria-hidden />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent p-4 pt-16 sm:p-6 sm:pt-20">
        <p className="mb-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-accent sm:mb-1 sm:text-[10px] sm:tracking-[0.25em]">
          {category}
        </p>
        <h3 className="pointer-events-none font-display text-lg font-light tracking-wide text-white sm:text-xl md:text-2xl">
          {title}
        </h3>
      </div>

      <div className="card-border-accent pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-500 group-hover:border-accent/20" />
    </div>
  );
}
