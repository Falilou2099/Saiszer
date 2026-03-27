"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  videoUrl: string;
  thumbUrl: string;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  category,
  videoUrl,
  thumbUrl,
  onClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const isDirectVideo =
    videoUrl.endsWith(".mp4") ||
    videoUrl.endsWith(".webm") ||
    videoUrl.endsWith(".mov");

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isDirectVideo || videoError) return;

    if (isVisible) {
      video.currentTime = 0;
      video.play().catch(() => setVideoError(true));
    } else {
      video.pause();
    }
  }, [isVisible, isDirectVideo, videoError]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="project-card group relative block aspect-[16/10] cursor-pointer overflow-hidden bg-neutral-900/50"
    >
      {/* Video layer — plays on scroll */}
      {isDirectVideo && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          poster={thumbUrl || undefined}
          onError={() => setVideoError(true)}
        />
      )}

      {/* Static fallback if video fails */}
      {(!isDirectVideo || videoError) && thumbUrl && (
        <img
          src={thumbUrl}
          alt={title}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}

      {/* Hover zoom effect */}
      <div className="pointer-events-none absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-105" />

      {/* Info overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent p-6 pt-20">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          {category}
        </p>
        <h3 className="font-display text-xl font-light tracking-wide text-white md:text-2xl">
          {title}
        </h3>
      </div>

      {/* Hover border accent */}
      <div className="pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-500 group-hover:border-accent/20" />

      {/* Clickable overlay */}
      <div
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Voir ${title}`}
      />
    </div>
  );
}
