import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { aboutProject, heroProject, projects, socials } from "@/lib/portfolio";

function publicPath(assetPath: string): string {
  return join(process.cwd(), "public", assetPath.replace(/^\//, ""));
}

describe("portfolio data", () => {
  it("uses local posters and local mp4 sources for every project", () => {
    expect(projects).toHaveLength(5);
    expect(Object.isFrozen(projects)).toBe(true);

    for (const project of projects) {
      expect(project.videoSrc.startsWith("/videos/")).toBe(true);
      expect(project.videoSrc.endsWith(".mp4")).toBe(true);
      expect(project.thumbUrl.startsWith("/thumbs/")).toBe(true);
      expect(existsSync(publicPath(project.videoSrc))).toBe(true);
      expect(existsSync(publicPath(project.thumbUrl))).toBe(true);
      expect(Object.isFrozen(project)).toBe(true);
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.category.length).toBeGreaterThan(0);
      expect(project.tools.length).toBeGreaterThan(0);
    }
  });

  it("exposes hero and about projects from the local project list", () => {
    expect(heroProject.title).toBe("Baby Pluto");
    expect(aboutProject.title).toBe("RADAR");
    expect(heroProject).toBe(projects[0]);
    expect(aboutProject).toBe(projects[1]);
    expect(Object.isFrozen(heroProject)).toBe(true);
    expect(Object.isFrozen(aboutProject)).toBe(true);
  });

  it("keeps direct contact endpoints available", () => {
    expect(socials.email).toBe("saiszer.pro@gmail.com");
    expect(socials.emailHref).toBe("mailto:saiszer.pro@gmail.com");
    expect(socials.phone).toBe("06 13 03 74 88");
    expect(socials.phoneHref).toBe("tel:+33613037488");
    expect(socials.instagram).toContain("instagram.com");
    expect(socials.tiktok).toContain("tiktok.com");
    expect(socials.youtube).toContain("youtube.com");
    expect(Object.isFrozen(socials)).toBe(true);
  });
});
