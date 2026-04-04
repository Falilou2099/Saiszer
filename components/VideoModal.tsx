"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { PortfolioProject } from "@/lib/portfolio";

interface VideoModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  useEffect(() => {
    setVideoError(false);
  }, [project?.videoSrc]);

  useEffect(() => {
    if (project && videoRef.current && !videoError) {
      const v = videoRef.current;
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [project, videoError]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-modal-in sm:bg-black/90"
      role="presentation"
    >
      <div
        data-modal-video
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="relative mx-0 flex h-full w-full flex-col sm:mx-4 sm:h-auto sm:max-w-5xl sm:flex-col animate-modal-content-in"
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-0 sm:py-0 sm:mb-4">
          <h2
            id="video-modal-title"
            className="font-display text-xl font-light tracking-wide text-white sm:text-2xl md:text-3xl"
          >
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white sm:absolute sm:-right-2 sm:-top-12 sm:h-8 sm:w-8"
            aria-label="Fermer"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 overflow-hidden bg-neutral-900 sm:flex-none sm:aspect-video sm:w-full sm:rounded-sm max-h-[min(100vh-12rem,1080px)]">
          {!videoError ? (
            <video
              ref={videoRef}
              className="video-layer-gpu h-full w-full object-contain"
              src={project.videoSrc}
              poster={project.thumbUrl || undefined}
              controls
              autoPlay
              playsInline
              preload="auto"
              disablePictureInPicture
              onError={() => setVideoError(true)}
            />
          ) : project.thumbUrl ? (
            <img
              src={project.thumbUrl}
              alt=""
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="h-full min-h-[50vh] w-full bg-neutral-950 sm:min-h-0" aria-hidden />
          )}
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 px-4 py-4 sm:mt-6 sm:gap-x-12 sm:px-0 sm:py-0">
          {project.client && (
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px] sm:tracking-[0.2em]">Client</p>
              <p className="mt-1 font-mono text-xs text-neutral-300 sm:text-sm">{project.client}</p>
            </div>
          )}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px] sm:tracking-[0.2em]">Tools</p>
            <p className="mt-1 font-mono text-xs text-neutral-300 sm:text-sm">{project.tools || project.category}</p>
          </div>
          {project.year && (
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-500 sm:text-[10px] sm:tracking-[0.2em]">Year</p>
              <p className="mt-1 font-mono text-xs text-neutral-300 sm:text-sm">{project.year}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
