import { describe, expect, it } from "vitest";
import { getAmbientPreload, shouldAutoplayAmbientVideo } from "@/lib/video";

describe("video helpers", () => {
  it("uses auto preload for the hero video", () => {
    expect(getAmbientPreload({ kind: "hero", inView: true })).toBe("auto");
  });

  it("uses metadata preload for ambient videos in view", () => {
    expect(getAmbientPreload({ kind: "ambient", inView: true })).toBe("metadata");
  });

  it("uses no preload for ambient videos out of view", () => {
    expect(getAmbientPreload({ kind: "ambient", inView: false })).toBe("none");
  });

  it("blocks autoplay when paused externally or reduced motion is preferred", () => {
    expect(
      shouldAutoplayAmbientVideo({
        visible: true,
        allowed: true,
        pausedExternally: true,
        prefersReducedMotion: false,
      })
    ).toBe(false);

    expect(
      shouldAutoplayAmbientVideo({
        visible: true,
        allowed: true,
        pausedExternally: false,
        prefersReducedMotion: true,
      })
    ).toBe(false);
  });

  it("autoplays only when visible and allowed", () => {
    expect(
      shouldAutoplayAmbientVideo({
        visible: true,
        allowed: true,
        pausedExternally: false,
        prefersReducedMotion: false,
      })
    ).toBe(true);

    expect(
      shouldAutoplayAmbientVideo({
        visible: false,
        allowed: true,
        pausedExternally: false,
        prefersReducedMotion: false,
      })
    ).toBe(false);

    expect(
      shouldAutoplayAmbientVideo({
        visible: true,
        allowed: false,
        pausedExternally: false,
        prefersReducedMotion: false,
      })
    ).toBe(false);
  });
});
