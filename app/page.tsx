"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import VideoBackground from "@/components/VideoBackground";
import AboutStripVideo from "@/components/AboutStripVideo";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";
import {
  aboutProject,
  heroProject,
  projects,
  socials,
  type PortfolioProject,
} from "@/lib/portfolio";

const featuredProjects = projects.slice(1, 5);

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const modalOpen = selectedProject !== null;

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      revealRefs.current.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    revealRefs.current.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrameId = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animationFrameId = requestAnimationFrame(animate);
    };

    const onHoverEnter = () => ring.classList.add("hover");
    const onHoverLeave = () => ring.classList.remove("hover");
    const interactiveSelector = "a, button, .project-card";
    const getInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest(interactiveSelector) : null;
    const isSameInteractive = (first: EventTarget | null, second: EventTarget | null) =>
      getInteractiveTarget(first) !== null &&
      getInteractiveTarget(first) === getInteractiveTarget(second);
    const onMouseOver = (event: MouseEvent) => {
      if (!getInteractiveTarget(event.target) || isSameInteractive(event.target, event.relatedTarget)) {
        return;
      }

      onHoverEnter();
    };
    const onMouseOut = (event: MouseEvent) => {
      if (!getInteractiveTarget(event.target) || isSameInteractive(event.target, event.relatedTarget)) {
        return;
      }

      onHoverLeave();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
      dot.remove();
      ring.remove();
    };
  }, []);

  const addRevealRef = (element: HTMLElement | null) => {
    if (element && !revealRefs.current.includes(element)) {
      revealRefs.current.push(element);
    }
  };

  return (
    <>
      <header className="relative">
        <Nav />

        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <VideoBackground
            src={heroProject.videoSrc}
            poster={heroProject.thumbUrl}
            pausedExternally={modalOpen}
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 pb-16 pt-32 sm:px-6 sm:pb-20 md:px-12 lg:pb-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.8fr)] lg:items-end">
              <div className="max-w-4xl">
                <p
                  ref={addRevealRef}
                  className="reveal mb-4 font-mono text-[9px] uppercase tracking-[0.45em] text-accent sm:text-[10px]"
                >
                  3D Artist &amp; Motion Designer
                </p>
                <h1
                  ref={addRevealRef}
                  className="reveal max-w-4xl font-display text-5xl font-light leading-[0.95] tracking-[0.08em] text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
                  style={{ animationDelay: "0.08s" }}
                >
                  saiszer
                </h1>
                <p
                  ref={addRevealRef}
                  className="reveal mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg"
                  style={{ animationDelay: "0.16s" }}
                >
                  Cinematic 3D visuals shaped for music, atmosphere, and image-making with
                  sharp rhythm.
                </p>
              </div>

              <div
                ref={addRevealRef}
                className="reveal max-w-sm justify-self-start border-l border-white/15 pl-5 text-sm leading-relaxed text-neutral-300 sm:pl-6 sm:text-base lg:justify-self-end"
                style={{ animationDelay: "0.24s" }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-neutral-500 sm:text-[10px]">
                  Manifesto
                </p>
                <p className="mt-4">
                  From sculpted light to final motion, each frame is built to feel precise,
                  magnetic, and made for sound-led storytelling.
                </p>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3 sm:pt-8">
              {[
                { label: "Current focus", value: heroProject.category },
                { label: "Lead project", value: heroProject.title },
                { label: "Tools", value: heroProject.tools },
              ].map((item, index) => (
                <div
                  key={item.label}
                  ref={addRevealRef}
                  className="reveal"
                  style={{ animationDelay: `${0.3 + index * 0.08}s` }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[10px]">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-lg font-light tracking-wide text-white sm:text-xl">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
            <a
              href="#selected-work"
              className="flex flex-col items-center gap-2 text-neutral-500 transition-colors hover:text-accent"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.35em] sm:text-[9px]">
                Enter
              </span>
              <svg
                className="h-4 w-4 animate-scroll-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </a>
          </div>
        </section>
      </header>

      <main>
        <section
          id="selected-work"
          className="relative px-5 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] md:items-end">
              <div>
                <p
                  ref={addRevealRef}
                  className="reveal font-mono text-[9px] uppercase tracking-[0.35em] text-accent sm:text-[10px]"
                >
                  Curated selection
                </p>
                <h2
                  ref={addRevealRef}
                  className="reveal mt-3 font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl"
                >
                  Selected Work
                </h2>
              </div>
              <p
                ref={addRevealRef}
                className="reveal max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base"
              >
                A concise edit of personal pieces where lighting, motion, and atmosphere carry
                the narrative.
              </p>
            </div>

            <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
              <div
                ref={addRevealRef}
                className="reveal overflow-hidden rounded-sm border border-white/10 bg-white/[0.02] p-4 sm:p-6"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(heroProject)}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                    <VideoBackground
                      src={heroProject.videoSrc}
                      poster={heroProject.thumbUrl}
                      pausedExternally={modalOpen}
                    />
                    <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black via-black/35 to-transparent p-5 sm:p-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-accent sm:text-[10px]">
                        Featured piece
                      </p>
                      <p className="mt-2 font-display text-2xl font-light tracking-wide text-white sm:text-3xl">
                        {heroProject.title}
                      </p>
                    </div>
                  </div>
                </button>

                <div className="grid gap-6 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[10px]">
                      Project note
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                      {heroProject.blurb}
                    </p>
                  </div>
                  <div className="grid gap-4 text-sm text-neutral-300 sm:grid-cols-3 sm:gap-6 md:grid-cols-1">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">
                        Client
                      </p>
                      <p className="mt-2">{heroProject.client}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">
                        Year
                      </p>
                      <p className="mt-2">{heroProject.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.title}
                    ref={addRevealRef}
                    className="reveal"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      videoSrc={project.videoSrc}
                      thumbUrl={project.thumbUrl}
                      pausedExternally={modalOpen}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden border-t border-white/10">
          <div className="relative h-[38vh] w-full overflow-hidden sm:h-[48vh] md:h-[56vh]">
            <AboutStripVideo
              src={aboutProject.videoSrc}
              poster={aboutProject.thumbUrl}
              pausedExternally={modalOpen}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-bg" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-24 md:px-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.7fr)] lg:gap-16">
            <div>
              <p
                ref={addRevealRef}
                className="reveal font-mono text-[9px] uppercase tracking-[0.35em] text-accent sm:text-[10px]"
              >
                Artistic positioning
              </p>
              <h2
                ref={addRevealRef}
                className="reveal mt-3 font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl"
              >
                About
              </h2>
              <div
                ref={addRevealRef}
                className="reveal mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-neutral-300 sm:text-lg"
              >
                <p>
                  I build cinematic 3D images for artists and creative teams who want motion
                  that feels composed, not crowded.
                </p>
                <p>
                  Blender is the core studio. Compositing and finishing move through
                  Fusion and Resolve, keeping the final frame controlled from texture to glow.
                </p>
                <p>
                  {aboutProject.blurb} The goal stays the same: give each release or visual
                  concept a stronger world, not just another animation.
                </p>
              </div>
            </div>

            <div
              ref={addRevealRef}
              className="reveal grid gap-6 border-l border-white/10 pl-0 text-sm text-neutral-300 sm:text-base lg:pl-8"
            >
              {[
                { label: "Signature", value: "Cinematic lighting and sound-led movement" },
                { label: "Primary tools", value: aboutProject.tools },
                { label: "Recent study", value: aboutProject.title },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-neutral-500 sm:text-[10px]">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-lg font-light tracking-wide text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative border-t border-white/10 px-5 py-16 sm:px-6 sm:py-24 md:px-12 lg:px-24"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-end">
            <div>
              <p
                ref={addRevealRef}
                className="reveal font-mono text-[9px] uppercase tracking-[0.35em] text-accent sm:text-[10px]"
              >
                Contact
              </p>
              <h2
                ref={addRevealRef}
                className="reveal mt-3 font-display text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl"
              >
                Let&apos;s work together
              </h2>
              <p
                ref={addRevealRef}
                className="reveal mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg"
              >
                Open for commissions, visual campaigns, music-led motion pieces, and select
                collaborations.
              </p>
            </div>

            <div
              ref={addRevealRef}
              className="reveal grid gap-6 border-l border-white/10 pl-0 sm:grid-cols-2 lg:pl-8"
            >
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px]">
                  Email
                </p>
                <a
                  href={socials.emailHref}
                  className="mt-3 block font-display text-2xl font-light tracking-wide text-white transition-colors hover:text-accent sm:text-3xl"
                >
                  {socials.email}
                </a>
              </div>

              <div className="grid gap-4 text-sm text-neutral-300 sm:text-base">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href={socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  TikTok
                </a>
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
