"use client";

import { useEffect, useState, useCallback } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const workHref = "#selected-work";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 px-4 pt-4 sm:px-5 md:px-8 md:pt-5 lg:px-10 ${
          menuOpen ? "z-[120]" : "z-[100]"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-[border-color,background-color,box-shadow,backdrop-filter] duration-500 sm:px-5 lg:px-6 ${
            scrolled || menuOpen
              ? "border-white/12 bg-[linear-gradient(135deg,rgba(10,10,10,0.9),rgba(10,10,10,0.72)_55%,rgba(201,168,76,0.12))] shadow-[0_18px_60px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
              : "border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
          }`}
        >
          <a
            href="#"
            className="relative z-[110] font-display text-lg font-light tracking-[0.28em] text-white transition-[color,opacity] duration-300 hover:text-accent sm:text-xl"
          >
            saiszer
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-2 py-1 md:flex">
            <a
              href={workHref}
              className="link-hover rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-300 transition-[color,background-color] duration-300 hover:bg-white/[0.05] hover:text-white"
            >
              Work
            </a>
            <a
              href="#about"
              className="link-hover rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-300 transition-[color,background-color] duration-300 hover:bg-white/[0.05] hover:text-white"
            >
              About
            </a>
            <a
              href="#contact"
              className="link-hover rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-300 transition-[color,background-color] duration-300 hover:bg-white/[0.05] hover:text-white"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border transition-[border-color,background-color,box-shadow] duration-300 md:hidden ${
              menuOpen
                ? "border-accent/40 bg-accent/10 shadow-[0_0_30px_rgba(201,168,76,0.12)]"
                : "border-white/10 bg-white/[0.03]"
            }`}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span
              className={`block h-px w-5 bg-white transition-[transform] duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-white transition-[transform] duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav-menu"
          className="mobile-menu open fixed inset-0 z-[105] flex flex-col items-center justify-center bg-bg/98 backdrop-blur-xl md:hidden"
        >
          <div className="mobile-menu-atmosphere" aria-hidden="true" />

          <div className="relative z-[1] flex flex-col items-center gap-5 px-8 text-center">
            <p className="mobile-menu-kicker font-mono text-[9px] uppercase tracking-[0.42em] text-accent">
              Visual stories in motion
            </p>
            <a
              href={workHref}
              onClick={handleNavClick}
              className="mobile-menu-link font-display text-4xl font-light tracking-[0.12em] text-white transition-colors active:text-accent sm:text-5xl"
              style={{ transitionDelay: "0.05s" }}
            >
              Work
            </a>
            <a
              href="#about"
              onClick={handleNavClick}
              className="mobile-menu-link font-display text-4xl font-light tracking-[0.12em] text-white transition-colors active:text-accent sm:text-5xl"
              style={{ transitionDelay: "0.1s" }}
            >
              About
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mobile-menu-link font-display text-4xl font-light tracking-[0.12em] text-white transition-colors active:text-accent sm:text-5xl"
              style={{ transitionDelay: "0.15s" }}
            >
              Contact
            </a>

            <p
              className="mobile-menu-copy max-w-xs text-sm leading-relaxed text-neutral-300"
              style={{ transitionDelay: "0.22s" }}
            >
              Cinematic 3D direction shaped for music, mood, and image-led worlds.
            </p>
          </div>

          <div className="mobile-menu-socials absolute bottom-10 z-[1] flex items-center gap-4 px-6">
            <a
              href="https://instagram.com/saiszer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-[border-color,color,background-color] duration-300 active:border-accent/40 active:bg-white/[0.03] active:text-accent"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@saiszer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-[border-color,color,background-color] duration-300 active:border-accent/40 active:bg-white/[0.03] active:text-accent"
            >
              TikTok
            </a>
            <a
              href="https://youtube.com/@saiszer"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400 transition-[border-color,color,background-color] duration-300 active:border-accent/40 active:bg-white/[0.03] active:text-accent"
            >
              YouTube
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
