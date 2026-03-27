"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-12 ${
        scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#"
        className="font-display text-xl font-light tracking-[0.15em] text-white transition-colors hover:text-accent"
      >
        Saiszer
      </a>

      <div className="flex items-center gap-8">
        <a
          href="#projects"
          className="link-hover font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
        >
          Work
        </a>
        <a
          href="#about"
          className="link-hover font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
        >
          About
        </a>
        <a
          href="#contact"
          className="link-hover font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-white"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
