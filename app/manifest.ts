import type { MetadataRoute } from "next";
import { getDictionary } from "@/src/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const t = getDictionary("uk");
  return {
    name: "Nazar Yaremiiy · Software Engineer",
    short_name: "Nazar Yaremiiy",
    description: t.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0D0918",
    theme_color: "#0D0918",
    lang: "uk",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
