import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    // project screenshots contain small UI text: allow a higher quality than the default 75
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const week = "public, max-age=604800, stale-while-revalidate=2592000";
    return [
      // un-hashed public files: cache for a week, revalidate in the background
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/resume/:path*", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/cv/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
      { source: "/(og.png|icon.svg)", headers: [{ key: "Cache-Control", value: week }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
