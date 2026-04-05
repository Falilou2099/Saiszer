type PortfolioProjectFields = {
  title: string;
  category: string;
  videoSrc: string;
  thumbUrl: string;
  client: string;
  tools: string;
  year: string;
  blurb: string;
};

export type PortfolioProject = Readonly<PortfolioProjectFields>;

const VIDEO_ASSET_VERSION = "20260405-2";

function versionVideoSrc(path: string): string {
  return `${path}?v=${VIDEO_ASSET_VERSION}`;
}

function freezeProject(project: PortfolioProjectFields): PortfolioProject {
  return Object.freeze(project);
}

const projectItems = [
  freezeProject({
    title: "Baby Pluto",
    category: "3D Animation · Scene Design",
    videoSrc: versionVideoSrc("/videos/Baby_Pluto_Scene_01_V02.mp4"),
    thumbUrl: "/thumbs/baby_pluto.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
    blurb: "A cinematic scene study built around texture, scale, and controlled atmosphere.",
  }),
  freezeProject({
    title: "RADAR",
    category: "3D Motion · VFX",
    videoSrc: versionVideoSrc("/videos/RADAR_v02.mp4"),
    thumbUrl: "/thumbs/radar.jpg",
    client: "Personal Project",
    tools: "Blender, DaVinci Resolve",
    year: "2026",
    blurb: "A motion-driven piece using impact cuts, VFX layering, and sharp material contrast.",
  }),
  freezeProject({
    title: "Sweden Remake",
    category: "3D Animation · Art Direction",
    videoSrc: versionVideoSrc("/videos/Sweden_Remake_Final_V02.mp4"),
    thumbUrl: "/thumbs/sweden_remake.jpg",
    client: "Personal Project",
    tools: "Blender, After Effects",
    year: "2026",
    blurb: "An art-direction remake focused on rhythm, framing, and atmospheric fidelity.",
  }),
  freezeProject({
    title: "Wanna Hear",
    category: "Motion Design · 3D",
    videoSrc: versionVideoSrc("/videos/Wanna_hear_V02.mp4"),
    thumbUrl: "/thumbs/wanna_hear.jpg",
    client: "Personal Project",
    tools: "Blender, Premiere Pro",
    year: "2026",
    blurb: "A music-led motion piece shaped around timing, transitions, and sculpted lighting.",
  }),
  freezeProject({
    title: "Unlit",
    category: "3D Lighting · Rendering",
    videoSrc: versionVideoSrc("/videos/unlit.mp4"),
    thumbUrl: "/thumbs/unlit.jpg",
    client: "Personal Project",
    tools: "Blender",
    year: "2026",
    blurb: "A lighting and rendering exercise centered on shadow tension and minimalist staging.",
  }),
] satisfies PortfolioProject[];

export const projects: readonly PortfolioProject[] = Object.freeze(projectItems);

export const heroProject = projects[0];
export const aboutProject = projects[1];

type SocialLinks = {
  instagram: string;
  tiktok: string;
  youtube: string;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
};

export const socials: Readonly<SocialLinks> = Object.freeze({
  instagram: "https://instagram.com/saiszer",
  tiktok: "https://tiktok.com/@saiszer",
  youtube: "https://youtube.com/@saiszer",
  email: "saiszer.pro@gmail.com",
  emailHref: "mailto:saiszer.pro@gmail.com",
  phone: "06 13 03 74 88",
  phoneHref: "tel:+33613037488",
});
