# Saiszer Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio into a cinematic luxe editorial experience with local video playback, cleaner component boundaries, and production-safe media loading.

**Architecture:** Move all portfolio content into a typed local data module, replace Google Drive runtime playback with static `/public/videos` assets, and encode playback decisions in small pure helpers so the UI can stay simple. Update the page and media components around one visual system: premium hero, curated gallery, stronger About narrative, and cleaner contact finish.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Vitest, React Testing Library, jsdom

---

## File Map

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`
- Create: `lib/portfolio.ts`
- Create: `lib/portfolio.test.ts`
- Create: `lib/video.ts`
- Create: `lib/video.test.ts`
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/Nav.tsx`
- Modify: `components/ProjectCard.tsx`
- Modify: `components/VideoBackground.tsx`
- Modify: `components/AboutStripVideo.tsx`
- Modify: `components/VideoModal.tsx`
- Create: `components/VideoModal.test.tsx`
- Delete: `lib/drive.ts`

## Task 1: Install the Testing Harness

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Add the test scripts and dev dependencies**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.5",
    "@testing-library/react": "^15.0.7",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^24.1.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Install and refresh the lockfile**

Run: `npm install`
Expected: `added` lines for Vitest and Testing Library packages, plus an updated `package-lock.json`

- [ ] **Step 3: Add the Vitest config**

```ts
// vitest.config.mts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import path from "node:path";

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
});
```

- [ ] **Step 4: Add the shared test setup**

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

Note: use an ESM Vitest config file (`vitest.config.mts`) rather than `vitest.config.ts` to avoid the deprecated CJS Vite Node API warning while leaving Next's existing CommonJS app config untouched.

- [ ] **Step 5: Verify the harness boots**

Run: `npm run test`
Expected: exit code `1` with `No test files found`, which proves the runner is installed and reachable before production code changes begin

- [ ] **Step 6: Commit the harness**

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.ts
git commit -m "test: add vitest harness for portfolio refactor"
```

## Task 2: Centralize Portfolio Data Around Local Media

**Files:**
- Create: `lib/portfolio.test.ts`
- Create: `lib/portfolio.ts`

- [ ] **Step 1: Write the failing data contract test**

```ts
// lib/portfolio.test.ts
import { describe, expect, it } from "vitest";
import { aboutProject, heroProject, projects, socials } from "@/lib/portfolio";

describe("portfolio data", () => {
  it("uses local posters and local mp4 sources for every project", () => {
    expect(projects).toHaveLength(5);

    for (const project of projects) {
      expect(project.videoSrc.startsWith("/videos/")).toBe(true);
      expect(project.videoSrc.endsWith(".mp4")).toBe(true);
      expect(project.thumbUrl.startsWith("/thumbs/")).toBe(true);
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.category.length).toBeGreaterThan(0);
      expect(project.tools.length).toBeGreaterThan(0);
    }
  });

  it("exposes hero and about projects from the local project list", () => {
    expect(heroProject.title).toBe("Baby Pluto");
    expect(aboutProject.title).toBe("RADAR");
  });

  it("keeps direct contact endpoints available", () => {
    expect(socials.email).toBe("saiszer.pro@gmail.com");
    expect(socials.instagram).toContain("instagram.com");
    expect(socials.tiktok).toContain("tiktok.com");
    expect(socials.youtube).toContain("youtube.com");
  });
});
```

- [ ] **Step 2: Run the test to confirm the module is missing**

Run: `npm run test -- lib/portfolio.test.ts`
Expected: FAIL with a module resolution error for `@/lib/portfolio`

- [ ] **Step 3: Implement the typed local portfolio data**

```ts
// lib/portfolio.ts
export type PortfolioProject = {
  title: string;
  category: string;
  videoSrc: string;
  thumbUrl: string;
  client: string;
  tools: string;
  year: string;
  blurb: string;
};

export const projects: PortfolioProject[] = [
  {
    title: "Baby Pluto",
    category: "3D Animation · Scene Design",
    videoSrc: "/videos/Baby_Pluto_Scene_01_V02.mp4",
    thumbUrl: "/thumbs/baby_pluto.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
    blurb: "A cinematic scene study built around texture, scale, and controlled atmosphere.",
  },
  {
    title: "RADAR",
    category: "3D Motion · VFX",
    videoSrc: "/videos/RADAR_v02.mp4",
    thumbUrl: "/thumbs/radar.jpg",
    client: "Personal Project",
    tools: "Blender, DaVinci Resolve",
    year: "2026",
    blurb: "A motion-driven piece using impact cuts, VFX layering, and sharp material contrast.",
  },
  {
    title: "Sweden Remake",
    category: "3D Animation · Art Direction",
    videoSrc: "/videos/Sweden_Remake_Final_V02.mp4",
    thumbUrl: "/thumbs/sweden_remake.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
    blurb: "An art-direction remake focused on rhythm, framing, and atmospheric fidelity.",
  },
  {
    title: "Wanna Hear",
    category: "Motion Design · 3D",
    videoSrc: "/videos/Wanna_hear_V02.mp4",
    thumbUrl: "/thumbs/wanna_hear.jpg",
    client: "Personal Project",
    tools: "Blender, Premiere Pro",
    year: "2026",
    blurb: "A music-led motion piece shaped around timing, transitions, and sculpted lighting.",
  },
  {
    title: "Unlit",
    category: "3D Lighting · Rendering",
    videoSrc: "/videos/unlit.mp4",
    thumbUrl: "/thumbs/unlit.jpg",
    client: "Personal Project",
    tools: "Blender",
    year: "2026",
    blurb: "A lighting and rendering exercise centered on shadow tension and minimalist staging.",
  },
];

export const heroProject = projects[0];
export const aboutProject = projects[1];

export const socials = {
  instagram: "https://instagram.com/saiszer",
  tiktok: "https://tiktok.com/@saiszer",
  youtube: "https://youtube.com/@saiszer",
  email: "saiszer.pro@gmail.com",
  phone: "06 13 03 74 88",
} as const;
```

- [ ] **Step 4: Run the test to confirm the data contract passes**

Run: `npm run test -- lib/portfolio.test.ts`
Expected: PASS with `3 passed`

- [ ] **Step 5: Commit the portfolio data layer**

```bash
git add lib/portfolio.ts lib/portfolio.test.ts
git commit -m "refactor: centralize local portfolio media data"
```

## Task 3: Encode Video Playback Decisions in Pure Helpers

**Files:**
- Create: `lib/video.test.ts`
- Create: `lib/video.ts`

- [ ] **Step 1: Write the failing playback helper tests**

```ts
// lib/video.test.ts
import { describe, expect, it } from "vitest";
import { getAmbientPreload, shouldAutoplayAmbientVideo } from "@/lib/video";

describe("video helpers", () => {
  it("preloads only the hero eagerly", () => {
    expect(getAmbientPreload({ kind: "hero", inView: true })).toBe("auto");
    expect(getAmbientPreload({ kind: "ambient", inView: true })).toBe("metadata");
    expect(getAmbientPreload({ kind: "ambient", inView: false })).toBe("none");
  });

  it("blocks autoplay when motion is reduced or playback is externally paused", () => {
    expect(
      shouldAutoplayAmbientVideo({
        inView: true,
        pausedExternally: true,
        prefersReducedMotion: false,
      })
    ).toBe(false);

    expect(
      shouldAutoplayAmbientVideo({
        inView: true,
        pausedExternally: false,
        prefersReducedMotion: true,
      })
    ).toBe(false);
  });

  it("autoplays ambient media only when visible and allowed", () => {
    expect(
      shouldAutoplayAmbientVideo({
        inView: true,
        pausedExternally: false,
        prefersReducedMotion: false,
      })
    ).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- lib/video.test.ts`
Expected: FAIL with a module resolution error for `@/lib/video`

- [ ] **Step 3: Implement the playback helpers**

```ts
// lib/video.ts
type AmbientKind = "hero" | "ambient";

type AmbientPreloadInput = {
  kind: AmbientKind;
  inView: boolean;
};

type AmbientPlaybackInput = {
  inView: boolean;
  pausedExternally: boolean;
  prefersReducedMotion: boolean;
};

export function getAmbientPreload({
  kind,
  inView,
}: AmbientPreloadInput): HTMLVideoElement["preload"] {
  if (kind === "hero") return "auto";
  return inView ? "metadata" : "none";
}

export function shouldAutoplayAmbientVideo({
  inView,
  pausedExternally,
  prefersReducedMotion,
}: AmbientPlaybackInput): boolean {
  return inView && !pausedExternally && !prefersReducedMotion;
}
```

- [ ] **Step 4: Run the helper tests to verify they pass**

Run: `npm run test -- lib/video.test.ts`
Expected: PASS with `3 passed`

- [ ] **Step 5: Commit the playback helpers**

```bash
git add lib/video.ts lib/video.test.ts
git commit -m "refactor: add local video playback helpers"
```

## Task 4: Refactor the Media Components to Use Local Assets

**Files:**
- Modify: `components/VideoBackground.tsx`
- Modify: `components/AboutStripVideo.tsx`
- Modify: `components/ProjectCard.tsx`
- Modify: `components/VideoModal.tsx`
- Create: `components/VideoModal.test.tsx`
- Delete: `lib/drive.ts`

- [ ] **Step 1: Write the failing modal component test**

```tsx
// components/VideoModal.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VideoModal from "@/components/VideoModal";

const project = {
  title: "Baby Pluto",
  category: "3D Animation · Scene Design",
  videoSrc: "/videos/Baby_Pluto_Scene_01_V02.mp4",
  thumbUrl: "/thumbs/baby_pluto.jpg",
  client: "Personal Project",
  tools: "Blender, After Effects",
  year: "2026",
  blurb: "A cinematic scene study built around texture, scale, and controlled atmosphere.",
};

describe("VideoModal", () => {
  it("renders a local video source without drive iframe fallback", () => {
    render(<VideoModal project={project} onClose={() => {}} />);

    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("src", project.videoSrc);
    expect(screen.queryByTitle(project.title)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the modal test to verify it fails on the current drive-based props**

Run: `npm run test -- components/VideoModal.test.tsx`
Expected: FAIL because `videoSrc` is not a supported prop on the current modal contract, or because the rendered modal still depends on the old Drive-based implementation

- [ ] **Step 3: Refactor the media components to local `src` props and shared playback rules**

```tsx
// components/VideoBackground.tsx
type VideoBackgroundProps = {
  src: string;
  poster?: string;
  pausedExternally?: boolean;
};

const [inView] = useState(true);
const preload = getAmbientPreload({ kind: "hero", inView });
const shouldPlay = shouldAutoplayAmbientVideo({
  inView,
  pausedExternally,
  prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

<video
  ref={videoRef}
  className="hero-video-cover video-layer-gpu z-0"
  src={src}
  poster={poster}
  autoPlay
  muted
  loop
  playsInline
  preload={preload}
  disablePictureInPicture
/>
```

```tsx
// components/AboutStripVideo.tsx
type AboutStripVideoProps = {
  src: string;
  poster?: string;
  pausedExternally?: boolean;
};

const preload = getAmbientPreload({ kind: "ambient", inView });
```

```tsx
// components/ProjectCard.tsx
interface ProjectCardProps {
  title: string;
  category: string;
  videoSrc: string;
  thumbUrl: string;
  onClick: () => void;
  pausedExternally?: boolean;
}

const preload = getAmbientPreload({ kind: "ambient", inView: isVisible && !pausedExternally });

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
/>
```

```tsx
// components/VideoModal.tsx
import type { PortfolioProject } from "@/lib/portfolio";

interface VideoModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

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
/>
```

```bash
rm lib/drive.ts
```

- [ ] **Step 4: Re-run the modal test against the refactored local player**

```tsx
const video = document.querySelector("video");
expect(video).not.toBeNull();
expect(video).toHaveAttribute("src", project.videoSrc);
```

- [ ] **Step 5: Run the media tests to verify they pass**

Run: `npm run test -- lib/video.test.ts components/VideoModal.test.tsx`
Expected: PASS with all tests green and no Google Drive URLs in the rendered modal

- [ ] **Step 6: Commit the media refactor**

```bash
git add components/VideoBackground.tsx components/AboutStripVideo.tsx components/ProjectCard.tsx components/VideoModal.tsx components/VideoModal.test.tsx lib/drive.ts
git commit -m "refactor: move portfolio media playback to local assets"
```

## Task 5: Rebuild the Page Composition in the New Editorial Layout

**Files:**
- Create: `app/page.test.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the failing page-level integration test**

```tsx
// app/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the editorial portfolio structure with local project media", () => {
    render(<Home />);

    expect(screen.getByText(/3D Artist & Motion Designer/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /saiszer/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Selected Work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Let's work together/i })).toBeInTheDocument();
    expect(screen.getByText("saiszer.pro@gmail.com")).toBeInTheDocument();

    const videos = Array.from(document.querySelectorAll("video"));
    expect(videos.some((video) => video.getAttribute("src")?.startsWith("/videos/"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the page test to verify it fails**

Run: `npm run test -- app/page.test.tsx`
Expected: FAIL because `app/page.tsx` still uses `driveFileId`-based project data and old content wiring

- [ ] **Step 3: Rebuild `app/page.tsx` around the local data module and editorial copy**

```tsx
// app/page.tsx
import { aboutProject, heroProject, projects, socials, type PortfolioProject } from "@/lib/portfolio";

const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

<section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
  <VideoBackground
    src={heroProject.videoSrc}
    poster={heroProject.thumbUrl}
    pausedExternally={modalOpen}
  />

  <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-12 pt-32 md:px-12 md:pb-20">
    <p className="reveal font-mono text-[10px] uppercase tracking-[0.45em] text-accent">
      3D Artist & Motion Designer
    </p>
    <h1 className="reveal max-w-4xl font-display text-6xl font-light leading-none text-white md:text-8xl xl:text-[9rem]">
      saiszer
    </h1>
    <p className="reveal max-w-xl text-sm leading-7 text-neutral-300 md:text-base">
      Cinematic 3D worlds, motion-led visuals, and art direction built for music, identity, and atmosphere.
    </p>
  </div>
</section>
```

```tsx
<section id="projects" className="relative px-5 py-24 md:px-12 md:py-32">
  <div className="mx-auto flex max-w-7xl flex-col gap-16">
    {projects.map((project, index) => (
      <ProjectCard
        key={project.title}
        title={project.title}
        category={project.category}
        videoSrc={project.videoSrc}
        thumbUrl={project.thumbUrl}
        pausedExternally={modalOpen}
        onClick={() => setSelectedProject(project)}
      />
    ))}
  </div>
</section>
```

```tsx
<section id="about" className="relative overflow-hidden">
  <AboutStripVideo
    src={aboutProject.videoSrc}
    poster={aboutProject.thumbUrl}
    pausedExternally={modalOpen}
  />
  <div className="relative mx-auto max-w-5xl px-5 py-20 md:px-12 md:py-28">
    <h2 className="reveal font-display text-4xl font-light text-white md:text-7xl">About</h2>
    <p className="reveal mt-8 max-w-2xl text-base leading-8 text-neutral-300">
      I build cinematic 3D imagery with a focus on rhythm, atmosphere, and strong visual identity for artists and creative projects.
    </p>
  </div>
</section>
```

```tsx
<footer id="contact" className="relative border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
  <h2 className="font-display text-4xl font-light text-white md:text-7xl">Let&apos;s work together</h2>
  <a href={`mailto:${socials.email}`} className="mt-8 inline-block text-xl text-white">
    {socials.email}
  </a>
</footer>
```

- [ ] **Step 4: Run the page test to verify it passes**

Run: `npm run test -- app/page.test.tsx`
Expected: PASS with `1 passed`

- [ ] **Step 5: Commit the page rebuild**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: rebuild portfolio page in editorial layout"
```

## Task 6: Apply the Cinematic Luxe Visual System and Final Verification

**Files:**
- Modify: `components/Nav.tsx`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the navigation for the premium editorial feel**

```tsx
// components/Nav.tsx
<nav
  className={`fixed left-0 right-0 top-0 z-[100] px-5 py-5 transition-all duration-500 md:px-12 ${
    scrolled && !menuOpen
      ? "bg-black/55 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
      : "bg-transparent"
  }`}
>
  <a href="#" className="font-display text-xl tracking-[0.22em] text-white md:text-2xl">
    saiszer
  </a>
</nav>
```

- [ ] **Step 2: Rework the global tokens, gradients, overlays, and section atmosphere**

```css
/* app/globals.css */
:root {
  --bg: #060606;
  --bg-soft: #0f0f10;
  --panel: rgba(255, 255, 255, 0.04);
  --text-soft: rgba(245, 240, 231, 0.72);
  --accent: #c9a84c;
  --accent-soft: rgba(201, 168, 76, 0.18);
}

body {
  background:
    radial-gradient(circle at top, rgba(201, 168, 76, 0.14), transparent 35%),
    linear-gradient(180deg, #050505 0%, #090909 30%, #050505 100%);
  color: white;
}

.section-shell {
  position: relative;
}

.section-shell::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.02), transparent);
  pointer-events: none;
}

.project-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 35%, rgba(0, 0, 0, 0.72) 100%);
  pointer-events: none;
}
```

- [ ] **Step 3: Tighten metadata and document-level polish**

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: "saiszer — Cinematic 3D Artist & Motion Designer",
  description:
    "Cinematic 3D visuals, motion-led direction, and premium visual storytelling for music and creative projects.",
  openGraph: {
    title: "saiszer — Cinematic 3D Artist & Motion Designer",
    description:
      "Cinematic 3D visuals, motion-led direction, and premium visual storytelling for music and creative projects.",
    type: "website",
    locale: "fr_FR",
  },
};
```

- [ ] **Step 4: Run the focused test suite**

Run: `npm run test -- lib/portfolio.test.ts lib/video.test.ts components/VideoModal.test.tsx app/page.test.tsx`
Expected: PASS with all tests green

- [ ] **Step 5: Run the production build**

Run: `npm run build`
Expected: exit code `0` with a successful Next.js production build

- [ ] **Step 6: Manually verify the production-critical media behavior**

Run: `npm run dev`
Expected manual checks:

- hero video starts quickly from `/videos/...`
- project previews only animate when visible
- opening the modal pauses ambient playback
- modal playback uses local video and remains responsive
- About strip resumes only when in view
- the mobile menu and contact section still read clearly on narrow screens

- [ ] **Step 7: Commit the visual finish**

```bash
git add components/Nav.tsx app/globals.css app/layout.tsx
git commit -m "style: apply cinematic luxe portfolio system"
```

## Self-Review

### Spec Coverage

- Hero manifesto: covered in Task 5 and Task 6
- Selected work gallery: covered in Task 4 and Task 5
- About positioning: covered in Task 5
- Contact CTA: covered in Task 5
- Local video delivery and playback constraints: covered in Task 2, Task 3, and Task 4
- Performance validation and build verification: covered in Task 6

### Placeholder Scan

- No `TODO`, `TBD`, or “implement later” placeholders remain
- Every task names exact files and exact verification commands
- All behavior changes have concrete code snippets or commands attached

### Type Consistency

- Shared project type is `PortfolioProject`
- Local media prop is consistently named `videoSrc`
- Shared contact object is consistently named `socials`
- Shared playback helpers are consistently named `getAmbientPreload` and `shouldAutoplayAmbientVideo`
