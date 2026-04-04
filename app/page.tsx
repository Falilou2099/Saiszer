"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import VideoBackground from "@/components/VideoBackground";
import AboutStripVideo from "@/components/AboutStripVideo";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";
import { projects as PROJECTS, socials as SOCIALS } from "@/lib/portfolio";

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);
  const modalOpen = selectedProject !== null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
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

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const interactives = document.querySelectorAll("a, button, .project-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onHoverEnter);
      el.addEventListener("mouseleave", onHoverLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnter);
        el.removeEventListener("mouseleave", onHoverLeave);
      });
      cancelAnimationFrame(animationFrameId);
      dot.remove();
      ring.remove();
    };
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <header className="relative">
        <Nav />

        {/* Hero : vidéo spatiale 1080p, démarrage dès l’accès à la page (muet, boucle) */}
        <section className="relative isolate flex min-h-0 h-[100svh] items-center justify-center overflow-hidden">
          <VideoBackground
            src={PROJECTS[0].videoSrc}
            poster={PROJECTS[0].thumbUrl}
            pausedExternally={modalOpen}
          />

          <div className="relative z-10 px-6 text-center">
            <p
              ref={addRevealRef}
              className="reveal mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-accent sm:mb-4 sm:text-[10px] sm:tracking-[0.5em]"
            >
              3D Artist &amp; Motion Designer
            </p>
            <h1
              ref={addRevealRef}
              className="reveal font-display text-5xl font-light tracking-wide text-white sm:text-7xl md:text-9xl"
              style={{ animationDelay: "0.2s" }}
            >
              saiszer
            </h1>
            <div
              ref={addRevealRef}
              className="reveal mx-auto mt-5 h-px w-12 bg-accent/40 sm:mt-6 sm:w-16"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10">
            <a
              href="#projects"
              className="flex flex-col items-center gap-2 text-neutral-500 transition-colors hover:text-accent"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] sm:text-[9px]">
                Scroll
              </span>
              <svg
                className="h-3.5 w-3.5 animate-scroll-bounce sm:h-4 sm:w-4"
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

      {/* ── Projects ── */}
      <section id="projects" className="relative px-4 py-20 sm:px-6 sm:py-32 md:px-12 lg:px-24">
        <div className="mb-12 text-center sm:mb-20">
          <p
            ref={addRevealRef}
            className="reveal mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-accent sm:mb-3 sm:text-[10px] sm:tracking-[0.4em]"
          >
            Selected Work
          </p>
          <h2
            ref={addRevealRef}
            className="reveal font-display text-3xl font-light tracking-wide sm:text-4xl md:text-5xl"
          >
            Projects
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={addRevealRef}
              className="reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
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
      </section>

      {/* ── About ── */}
      <section id="about" className="relative overflow-hidden">
        <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh] md:h-[60vh]">
          <AboutStripVideo
            src={PROJECTS[1].videoSrc}
            poster={PROJECTS[1].thumbUrl}
            pausedExternally={modalOpen}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-24 md:px-12">
          <h2
            ref={addRevealRef}
            className="reveal font-display text-4xl font-light tracking-wide sm:text-5xl md:text-7xl"
          >
            About
          </h2>

          <div
            ref={addRevealRef}
            className="reveal mt-8 space-y-5 text-base leading-relaxed text-neutral-400 sm:mt-10 sm:space-y-6 sm:text-lg"
          >
            <p>
              3D artist mainly using <span className="font-semibold text-white">Blender</span>,
              I create cinematic visuals, animations and motion design pieces for the music
              industry and creative projects.
            </p>
            <p>
              I use <span className="font-semibold text-white">Fusion (DaVinci Resolve)</span> for
              compositing and visual effects, bringing a strategic approach to every project.
            </p>
            <p>
              Passionate about the music industry, I put my skills at the service of visual
              projects designed to promote artists and bring creative visions to life.
            </p>
          </div>

          <div
            ref={addRevealRef}
            className="reveal mt-12 grid grid-cols-2 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-4"
          >
            {[
              { label: "3D Modeling", tool: "Blender" },
              { label: "Compositing", tool: "DaVinci Resolve" },
              { label: "Motion Design", tool: "After Effects" },
              { label: "Editing", tool: "Premiere Pro" },
            ].map((skill) => (
              <div key={skill.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px] sm:tracking-[0.3em]">
                  {skill.label}
                </p>
                <p className="mt-1.5 font-display text-base text-white sm:mt-2 sm:text-lg">{skill.tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer / Contact ── */}
      <footer
        id="contact"
        className="relative border-t border-neutral-800/50 px-5 py-16 sm:px-6 sm:py-28 md:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <div
            ref={addRevealRef}
            className="reveal mb-12 flex flex-col gap-4 sm:mb-20 sm:gap-6 md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-light tracking-wide sm:text-5xl md:text-7xl">
                Let&apos;s work together
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:mt-6 sm:text-lg">
                Available for freelance projects, collaborations, and creative
                opportunities. Feel free to reach out.
              </p>
            </div>
            <div className="mt-2 hidden h-2 w-2 rounded-full bg-accent md:mt-6 md:block" />
          </div>

          <div
            ref={addRevealRef}
            className="reveal grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px] sm:tracking-[0.4em]">
                Email
              </p>
              <a
                href={`mailto:${SOCIALS.email}`}
                className="mt-2 block text-base text-white transition-colors hover:text-accent sm:mt-3 sm:text-lg"
              >
                {SOCIALS.email}
              </a>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px] sm:tracking-[0.4em]">
                Téléphone
              </p>
              <a
                href={`tel:+33${SOCIALS.phone.replace(/\s/g, "").slice(1)}`}
                className="mt-2 block text-base text-white transition-colors hover:text-accent sm:mt-3 sm:text-lg"
              >
                {SOCIALS.phone}
              </a>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px] sm:tracking-[0.4em]">
                Instagram
              </p>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-base text-white transition-colors hover:text-accent sm:mt-3 sm:text-lg"
              >
                @saiszer
                <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px] sm:tracking-[0.4em]">
                TikTok
              </p>
              <a
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-base text-white transition-colors hover:text-accent sm:mt-3 sm:text-lg"
              >
                @saiszer
                <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:text-[10px] sm:tracking-[0.4em]">
                YouTube
              </p>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-base text-white transition-colors hover:text-accent sm:mt-3 sm:text-lg"
              >
                saiszer
                <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 border-t border-neutral-800/30 pt-6 text-center sm:mt-20 sm:pt-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600 sm:text-[10px] sm:tracking-[0.3em]">
              &copy; {new Date().getFullYear()} saiszer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Video Modal ── */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
