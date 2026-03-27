"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import VideoBackground from "@/components/VideoBackground";
import ProjectCard from "@/components/ProjectCard";
import VideoModal from "@/components/VideoModal";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Video assets hosted on GitHub Releases CDN (original quality)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const VIDEO_BASE =
  "https://github.com/Falilou2099/Saiszer/releases/download/v1.0-assets";

const PROJECTS = [
  {
    title: "Baby Pluto",
    category: "3D Animation · Scene Design",
    videoUrl: `${VIDEO_BASE}/Baby_Pluto_Scene_01_V02.mp4`,
    thumbUrl: "/thumbs/baby_pluto.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
  },
  {
    title: "RADAR",
    category: "3D Motion · VFX",
    videoUrl: `${VIDEO_BASE}/RADAR_v02.mp4`,
    thumbUrl: "/thumbs/radar.jpg",
    client: "Personal Project",
    tools: "Blender, DaVinci Resolve",
    year: "2026",
  },
  {
    title: "Sweden Remake",
    category: "3D Animation · Art Direction",
    videoUrl: `${VIDEO_BASE}/Sweden_Remake_Final_V02.mp4`,
    thumbUrl: "/thumbs/sweden_remake.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
  },
  {
    title: "Wanna Hear",
    category: "Motion Design · 3D",
    videoUrl: `${VIDEO_BASE}/Wanna_hear_V02.mp4`,
    thumbUrl: "/thumbs/wanna_hear.jpg",
    client: "Personal Project",
    tools: "Blender, Premiere Pro",
    year: "2026",
  },
  {
    title: "Unlit",
    category: "3D Lighting · Rendering",
    videoUrl: `${VIDEO_BASE}/unlit.mp4`,
    thumbUrl: "/thumbs/unlit.jpg",
    client: "Personal Project",
    tools: "Blender",
    year: "2026",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Vidéo de fond du hero
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const HERO_VIDEO = `${VIDEO_BASE}/Baby_Pluto_Scene_01_V02.mp4`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Liens réseaux sociaux (remplace les # par tes vrais liens)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SOCIALS = {
  instagram: "https://instagram.com/saiszer",
  tiktok: "https://tiktok.com/@saiszer",
  youtube: "https://youtube.com/@saiszer",
  email: "saiszer.pro@gmail.com",
  phone: "06 13 03 74 88",
};

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
      requestAnimationFrame(animate);
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
      <Nav />

      {/* ── Hero ── */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <VideoBackground src={HERO_VIDEO} />

        <div className="relative z-10 text-center">
          <p
            ref={addRevealRef}
            className="reveal mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-accent"
          >
            3D Artist &amp; Motion Designer
          </p>
          <h1
            ref={addRevealRef}
            className="reveal font-display text-7xl font-light tracking-wide text-white md:text-9xl"
            style={{ animationDelay: "0.2s" }}
          >
            Saiszer
          </h1>
          <div
            ref={addRevealRef}
            className="reveal mt-6 mx-auto h-px w-16 bg-accent/40"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#projects"
            className="flex flex-col items-center gap-2 text-neutral-500 transition-colors hover:text-accent"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
              Scroll
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

      {/* ── Projects ── */}
      <section id="projects" className="relative px-6 py-32 md:px-12 lg:px-24">
        <div className="mb-20 text-center">
          <p
            ref={addRevealRef}
            className="reveal mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
          >
            Selected Work
          </p>
          <h2
            ref={addRevealRef}
            className="reveal font-display text-4xl font-light tracking-wide md:text-5xl"
          >
            Projects
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={addRevealRef}
              className="reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                videoUrl={project.videoUrl}
                thumbUrl={project.thumbUrl}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="relative overflow-hidden">
        {/* Background image band */}
        <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
          <video
            className="h-full w-full object-cover"
            src={`${VIDEO_BASE}/RADAR_v02.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        </div>

        {/* About content */}
        <div className="relative mx-auto max-w-4xl px-6 py-24 md:px-12">
          <h2
            ref={addRevealRef}
            className="reveal font-display text-5xl font-light tracking-wide md:text-7xl"
          >
            About
          </h2>

          <div
            ref={addRevealRef}
            className="reveal mt-10 space-y-6 text-lg leading-relaxed text-neutral-400"
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

          {/* Skills / tools */}
          <div
            ref={addRevealRef}
            className="reveal mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { label: "3D Modeling", tool: "Blender" },
              { label: "Compositing", tool: "DaVinci Resolve" },
              { label: "Motion Design", tool: "After Effects" },
              { label: "Editing", tool: "Premiere Pro" },
            ].map((skill) => (
              <div key={skill.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {skill.label}
                </p>
                <p className="mt-2 font-display text-lg text-white">{skill.tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer / Contact ── */}
      <footer
        id="contact"
        className="relative border-t border-neutral-800/50 px-6 py-28 md:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div
            ref={addRevealRef}
            className="reveal mb-20 flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
          >
            <div className="max-w-xl">
              <h2 className="font-display text-5xl font-light tracking-wide md:text-7xl">
                Let&apos;s work together
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-400">
                Available for freelance projects, collaborations, and creative
                opportunities. Feel free to reach out.
              </p>
            </div>
            <div className="mt-4 h-2 w-2 rounded-full bg-accent md:mt-6" />
          </div>

          {/* Contact grid */}
          <div
            ref={addRevealRef}
            className="reveal grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Email */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Email
              </p>
              <a
                href={`mailto:${SOCIALS.email}`}
                className="mt-3 block text-lg text-white transition-colors hover:text-accent"
              >
                {SOCIALS.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Téléphone
              </p>
              <a
                href={`tel:+33${SOCIALS.phone.replace(/\s/g, "").slice(1)}`}
                className="mt-3 block text-lg text-white transition-colors hover:text-accent"
              >
                {SOCIALS.phone}
              </a>
            </div>

            {/* Instagram */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Instagram
              </p>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-lg text-white transition-colors hover:text-accent"
              >
                @saiszer
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* TikTok */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                TikTok
              </p>
              <a
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-lg text-white transition-colors hover:text-accent"
              >
                @saiszer
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* YouTube */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                YouTube
              </p>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-lg text-white transition-colors hover:text-accent"
              >
                Saiszer
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-20 border-t border-neutral-800/30 pt-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">
              &copy; {new Date().getFullYear()} Saiszer. All rights reserved.
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
