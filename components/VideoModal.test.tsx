import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VideoModal from "@/components/VideoModal";
import type { PortfolioProject } from "@/lib/portfolio";

const project: PortfolioProject = {
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
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  });

  it("renders a local video source without a Drive iframe fallback", () => {
    const { container } = render(<VideoModal project={project} onClose={() => {}} />);

    const video = container.querySelector("video");

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", project.videoSrc);
    expect(screen.queryByTitle(project.title)).not.toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
  });
});
