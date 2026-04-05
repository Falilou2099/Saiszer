export type AmbientVideoKind = "hero" | "ambient";

export type AmbientVideoPreload = "auto" | "metadata" | "none";

export interface AmbientPreloadInput {
  kind: AmbientVideoKind;
  inView: boolean;
}

export function getAmbientPreload({ kind, inView }: AmbientPreloadInput): AmbientVideoPreload {
  if (kind === "hero") {
    return "metadata";
  }

  return inView ? "metadata" : "none";
}

export interface ShouldAutoplayAmbientVideoInput {
  visible: boolean;
  allowed: boolean;
  pausedExternally: boolean;
  prefersReducedMotion: boolean;
}

export function shouldAutoplayAmbientVideo({
  visible,
  allowed,
  pausedExternally,
  prefersReducedMotion,
}: ShouldAutoplayAmbientVideoInput): boolean {
  return visible && allowed && !pausedExternally && !prefersReducedMotion;
}

export interface ShouldAutoplayPreviewVideoInput {
  visible: boolean;
  pausedExternally: boolean;
  prefersReducedMotion: boolean;
}

export function shouldAutoplayPreviewVideo({
  visible,
  pausedExternally,
  prefersReducedMotion,
}: ShouldAutoplayPreviewVideoInput): boolean {
  return visible && !pausedExternally && !prefersReducedMotion;
}
