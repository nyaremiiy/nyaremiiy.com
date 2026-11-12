import type { IconName } from "@/src/components/Icon";
import type { Dictionary } from "@/src/i18n";

export type ProjectId = keyof Dictionary["projects"]["items"];

export type Project = {
  id: ProjectId;
  url: string;
  /** Text shown in the browser frame's address bar. */
  address: string;
  github?: string;
  /**
   * Screenshot shown inside the browser frame. Leave empty for the gradient placeholder.
   * To use a real screenshot: put it in /public/images and set e.g. "/images/komar.jpg".
   * Real screenshots are shown whole, at their own aspect ratio (as in the design).
   */
  image?: string;
  /** Pixel size of `image` [width, height]; reserves the right space before it loads. */
  imageSize?: [number, number];
  /** Frame background (from the design) and the placeholder gradient. */
  frameBg: string;
  placeholder: { from: string; to: string; ink: string };
  /** Icons of the "built it all myself" flow steps (labels live in i18n). */
  flowIcons: IconName[];
  /** Screenshot on the left (alternating layout from the design). */
  mediaFirst: boolean;
  /** Animation offset class for the bobbing frame: "", "d1" or "d2". */
  bob: "" | "d1" | "d2";
};

export const projects: Project[] = [
  {
    id: "init",
    url: "https://init.energy/",
    address: "https://init.energy",
    image: "/images/init-energy.avif",
    imageSize: [2480, 1300],
    frameBg: "#000217",
    placeholder: { from: "#0B1033", to: "#3B1D7A", ink: "#EDE9FE" },
    flowIcons: ["pen", "code", "search", "server"],
    mediaFirst: false,
    bob: "",
  },
  {
    id: "komar",
    url: "https://komar.company/",
    address: "https://komar.company",
    image: "/images/komar.avif",
    imageSize: [2499, 1301],
    frameBg: "#0B0D10",
    placeholder: { from: "#15181D", to: "#3A4048", ink: "#F3F4F6" },
    flowIcons: ["pen", "code", "search", "server"],
    mediaFirst: true,
    bob: "d1",
  },
  {
    id: "molytva",
    url: "https://moyamolytva.online/",
    address: "https://moyamolytva.online",
    github: "https://github.com/nyaremiiy/moyamolytva",
    image: "/images/moya-molytva.avif",
    imageSize: [2508, 1318],
    frameBg: "#EFE6DA",
    placeholder: { from: "#F7F0E6", to: "#E2D2BC", ink: "#5B4630" },
    flowIcons: ["pen", "code", "search", "server"],
    mediaFirst: false,
    bob: "d2",
  },
  {
    id: "bakery",
    url: "https://nyaremiiy.github.io/shop-bakery/",
    address: "https://nyaremiiy.github.io/shop-bakery",
    github: "https://github.com/nyaremiiy/shop-bakery",
    image: "/images/shop-bakery.avif",
    imageSize: [2496, 1312],
    frameBg: "#2B2118",
    placeholder: { from: "#2B2118", to: "#6B4A2E", ink: "#F5E6D3" },
    flowIcons: ["code", "code", "search", "server"],
    mediaFirst: true,
    bob: "",
  },
];
