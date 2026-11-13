import type { Metadata, Viewport } from "next";
import { getDictionary, type Locale } from "@/src/i18n";
import { profile, siteUrl } from "@/src/data/profile";
import { allSkills } from "@/src/lib/seo";

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const path = locale === "uk" ? "/" : "/en";
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: path }],
    creator: profile.name,
    publisher: profile.name,
    category: "technology",
    keywords: [profile.name, ...profile.alternateNames, "Software Engineer", "Full-stack Developer", ...allSkills(locale).slice(0, 24)],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    alternates: {
      canonical: path,
      languages: { uk: "/", en: "/en", "x-default": "/" },
      // plain-text summary for AI assistants (GEO)
      types: { "text/plain": "/llms.txt" },
    },
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "profile",
      firstName: "Nazar",
      lastName: "Yaremiiy",
      username: "nyaremiiy",
      url: path,
      siteName: profile.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: t.meta.ogLocale,
      alternateLocale: locale === "uk" ? ["en_US"] : ["uk_UA"],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Nazar Yaremiiy · Software Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F3FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0918" },
  ],
};
