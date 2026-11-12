import type { MetadataRoute } from "next";
import { abs } from "@/src/lib/seo";

/** Search engines and AI assistants (GEO) are welcome; the form API is not for crawling. */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: ["/", "/llms.txt"], disallow: "/api/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
