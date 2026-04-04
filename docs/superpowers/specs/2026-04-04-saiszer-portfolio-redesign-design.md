# Saiszer Portfolio Redesign Design

## Overview

This redesign updates the Saiszer portfolio into a more modern, cinematic, and 3D-forward experience while improving video playback reliability in production.

The intended direction is "cinematic luxe editorial":

- dark, dense visual atmosphere
- premium editorial hierarchy
- restrained champagne accenting
- immersive motion without UI clutter
- portfolio-first presentation that feels curated rather than templated

The redesign must preserve the current single-page format while elevating the composition, reducing generic grid behavior, and making video playback stable and responsive on production hosting.

## Goals

- Present Saiszer as a premium 3D artist and motion designer with a strong artistic identity.
- Make the first viewport feel like a showreel poster rather than a standard landing page.
- Reframe project browsing as a curated gallery with stronger hierarchy and cleaner motion.
- Improve the About and Contact sections so they support positioning, not just navigation.
- Eliminate the main causes of video lag in production.
- Refactor the code so video sourcing and playback behavior are easier to maintain.

## Non-Goals

- No CMS or admin tooling.
- No migration to another framework or router.
- No autoplay audio.
- No heavy WebGL scene added to the page.
- No unrelated refactor outside the portfolio surface and video delivery flow.

## Current Problems

The current implementation already has a strong base, but several issues limit perceived quality and production performance:

- hero, project cards, and modal currently depend on Google Drive playback URLs
- Google Drive adds latency, unstable streaming behavior, and production playback risk
- project presentation still reads like a classic portfolio grid rather than an editorial gallery
- the About section is visually lighter than the rest of the page and does not fully reinforce artistic positioning
- there is duplicated video playback logic across components
- some motion and decorative effects exist, but the page lacks one cohesive visual system

## Design Direction

### Visual Thesis

The page should feel like a luxury motion reel showcase: black lacquer surfaces, soft metallic highlights, subtle halos, cinematic cropping, and elegant typography with a gallery-like pace.

### Content Plan

The page structure will be:

1. Hero manifesto
2. Selected work gallery
3. About / artistic positioning
4. Contact / call to action

### Interaction Thesis

Motion should create atmosphere and hierarchy, not novelty:

- hero copy reveals with measured stagger
- project tiles feel alive through subtle playback, scaling, and light shifts
- scroll progression should feel fluid and editorial, with clean transitions between dark surfaces and highlighted detail zones

## Information Architecture

### Section 1: Hero Manifesto

Purpose:
Introduce the brand with one dominant video plane and a concise artistic statement.

Content:

- fixed top navigation
- full-viewport background video sourced from a local production asset
- role line
- brand name
- short editorial statement
- primary scroll cue

Behavior:

- video autoplays muted, loops, and fills the viewport
- overlays improve contrast without hiding the footage
- hero content stays minimal and tightly composed
- persistent UI must not push content below the first viewport

### Section 2: Selected Work Gallery

Purpose:
Show projects as premium featured pieces rather than commodity cards.

Content:

- section intro
- curated project gallery using large media-led tiles
- each project retains title and category
- selecting a project opens an immersive modal player

Behavior:

- tiles remain scan-friendly on mobile and desktop
- hover states stay restrained and premium
- visible tiles can preview motion when appropriate
- modal becomes the main playback surface for intentional viewing

### Section 3: About / Artistic Positioning

Purpose:
Explain the artist's perspective and craft in a way that deepens credibility.

Content:

- strong editorial heading
- concise positioning copy
- supporting details such as focus areas, process, or tools
- ambient supporting media strip or visual texture

Behavior:

- section should feel like a continuation of the visual narrative, not a generic text block
- copy remains short and high-signal

### Section 4: Contact / Final CTA

Purpose:
Give a clear next action for collaborations and discovery.

Content:

- collaboration-oriented line
- email and social links
- simple premium layout

Behavior:

- easy to scan
- no excessive chrome
- clear final exit point for the page

## Video Delivery Design

### Source of Truth

Project data will no longer rely on Google Drive file IDs for runtime playback.

Each project will reference:

- title
- category
- local video source path in `/public/videos`
- poster path in `/public/thumbs`
- client
- tools
- year
- optional short description if needed for editorial framing

Local static assets are the primary production playback path because they are more reliable on Vercel or similar static hosting than Google Drive embed or download URLs.

### Playback Rules

#### Hero Video

- uses local MP4 file
- `autoPlay`, `muted`, `loop`, `playsInline`
- `preload="metadata"` or `auto` only for the hero, since it is the first-screen visual anchor
- pauses when the modal is open
- falls back to poster or styled gradient if playback fails

#### Gallery Preview Videos

- use local MP4 files
- only attempt playback when the tile is in view
- use `preload="none"` while off-screen and `metadata` or small eager loading only when visible
- pause when the modal is open
- fall back to poster image if playback fails

#### About Strip Video

- use local MP4 file
- autoplay only when in view
- keep low-res perception cost by relying on poster until needed

#### Modal Video

- use local MP4 file
- preload more aggressively than gallery previews
- reset current time on open
- use controls
- no Google Drive iframe fallback unless local playback genuinely fails and a fallback path is still desired after implementation review

## Performance Strategy

The redesign should improve production playback smoothness using a combination of source, loading, and playback control improvements.

### Performance Requirements

- remove Google Drive as the default runtime playback provider
- avoid multiple off-screen videos decoding simultaneously
- avoid eager loading every project video on initial page render
- preserve posters so users see immediate visual feedback before playback starts
- pause ambient videos when modal playback becomes active
- respect `prefers-reduced-motion`

### Implementation Strategy

- centralize project metadata in one typed data structure
- centralize common video playback logic where practical
- drive playback from `IntersectionObserver`
- load only the media needed for the current viewport state
- keep hover animations GPU-friendly and restrained
- keep overlays lightweight and CSS-driven

## Component Design

### Data Layer

Create or refine a typed project data model that includes local video and poster paths. The page should consume this typed data directly instead of embedding transport-specific Drive details into presentation components.

### Navigation

Update navigation styling to better fit the luxe editorial direction:

- more refined spacing and translucency
- stronger premium contrast when scrolled
- mobile menu that feels consistent with the hero and not visually separate from the page language

### Hero Component

The hero should become more editorial:

- stronger copy hierarchy
- short statement under the brand
- improved overlay treatment
- subtle atmospheric background treatment beyond the raw video

### Project Card Component

Project cards should evolve into gallery tiles:

- stronger typography treatment
- more deliberate overlay composition
- optional metadata refinement
- refined aspect ratio and spacing behavior

### About Section

The About section should be rewritten visually and structurally around artistic positioning. It may still use an ambient video strip, but the primary purpose is narrative framing.

### Contact Section

The Contact section should be simplified and elevated:

- clear collaboration cue
- direct email emphasis
- social links presented as refined secondary actions

## Modal

The modal remains the detailed viewing surface but should feel more premium:

- better spacing and framing
- cleaner metadata presentation
- stronger close affordance
- dependable playback using local video

## Styling System

The redesign should unify the page around a stronger set of tokens and atmospheric layers:

- dense black base surfaces
- warm champagne accent
- controlled neutral range for text and panels
- radial glows and gradients used sparingly
- typography that leans editorial rather than dashboard-like

Global CSS should be reorganized where useful so decorative layers, reveal utilities, overlays, and motion helpers are easier to follow and maintain.

## Accessibility

- preserve keyboard access for project tiles and modal controls
- ensure contrast remains strong over video backgrounds
- respect reduced motion preferences
- keep headings and landmark order coherent
- ensure modal semantics remain valid

## Error Handling

- if a local video fails, fall back to the poster image for ambient contexts
- if modal video fails, show a stable fallback state rather than leaving a broken player
- avoid throwing runtime errors for missing optional metadata

## Testing and Verification

The implementation must be verified with:

- local production build via `next build`
- local runtime smoke check of hero playback, tile previews, modal playback, and fallbacks
- mobile-width sanity check
- reduced-motion sanity check

Manual verification focus:

- initial render speed perception
- scroll smoothness
- no unnecessary concurrent playback
- modal open/close behavior
- no broken sources after Drive removal

## Risks and Mitigations

### Risk: Large local MP4 files still feel heavy

Mitigation:

- defer most playback outside the hero
- use posters aggressively
- keep only one intentionally eager media surface
- if needed, compress or transcode assets later without changing the UI contract

### Risk: Existing user edits in portfolio files

Mitigation:

- work with the current modified files rather than reverting them
- make additive, careful changes

### Risk: Visual redesign becomes too busy

Mitigation:

- keep each section to one dominant visual idea
- favor spacing, typography, and tonal layering over extra components

## Implementation Boundaries

The implementation should touch only what is necessary to achieve the redesign and playback improvements:

- `app/page.tsx`
- `app/globals.css`
- `components/Nav.tsx`
- `components/ProjectCard.tsx`
- `components/VideoBackground.tsx`
- `components/AboutStripVideo.tsx`
- `components/VideoModal.tsx`
- supporting data or utility files under `lib/` if needed

## Success Criteria

The redesign is successful when:

- the page feels clearly more premium, modern, and 3D-native
- the first viewport has a strong cinematic identity
- projects feel curated and high-end
- About and Contact reinforce the brand instead of filling space
- local production playback is visibly smoother and more reliable than the Google Drive approach
- the codebase is cleaner and easier to extend after the refactor
