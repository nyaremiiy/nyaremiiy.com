import type { MetadataRoute } from "next";
import { abs } from "@/src/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { uk: abs("/"), en: abs("/en"), "x-default": abs("/") };
  const lastModified = new Date();
  return [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: abs("/en"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
