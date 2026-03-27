"use client";

import { useEffect, useRef, useCallback } from "react";

interface Project {
  title: string;
  category: string;
  videoUrl: string;
  thumbUrl: string;
  client?: string;
  tools?: string;
  year?: string;
}

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
    if (project && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [project]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-modal-in"
    >
      <div className="relative mx-4 w-full max-w-2xl animate-modal-content-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-12 flex h-8 w-8 items-center justify-center text-neutral-400 transition-colors hover:text-white"
          aria-label="Fermer"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="mb-4 font-display text-2xl font-light tracking-wide text-white md:text-3xl">
          {project.title}
        </h2>

        {/* Video player */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-sm bg-neutral-900 md:aspect-video">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src={project.videoUrl}
            poster={project.thumbUrl || undefined}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        </div>

        {/* Project info */}
        <div className="mt-6 flex flex-wrap gap-x-12 gap-y-3">
          {project.client && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Client</p>
              <p className="mt-1 font-mono text-sm text-neutral-300">{project.client}</p>
            </div>
          )}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Tools</p>
            <p className="mt-1 font-mono text-sm text-neutral-300">{project.category}</p>
          </div>
          {project.year && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Year</p>
              <p className="mt-1 font-mono text-sm text-neutral-300">{project.year}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
