import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

describe("Home", () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    Object.defineProperty(Element.prototype, "scrollIntoView", {
      writable: true,
      value: vi.fn(),
    });
  });

  it("renders the editorial homepage with local video sources and toggles the modal", async () => {
    const { container } = render(<Home />);
    const user = userEvent.setup();

    expect(screen.getByText("3D Artist & Motion Designer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /saiszer/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Selected Work/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /^About$/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Let's work together/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("saiszer.pro@gmail.com")).toBeInTheDocument();

    const videos = Array.from(container.querySelectorAll("video"));

    expect(videos.some((video) => video.getAttribute("src")?.includes("/videos/"))).toBe(true);
    expect(
      videos.filter(
        (video) => video.getAttribute("src") === "/videos/Baby_Pluto_Scene_01_V02.mp4"
      )
    ).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: /Voir RADAR/i }));

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: "RADAR" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Fermer/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
