import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // The site's largest photograph slot is the full-bleed CTA at ~1200px CSS.
    // Trimming the ladder above that stops Next generating 2048/3840 variants
    // nothing ever requests, which is most of the image-optimisation cost.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    // A year, since every source is a content-hashed static import.
    minimumCacheTTL: 31_536_000,
  },

  experimental: {
    // Rewrites barrel imports to deep paths, so a single `<Icon>` pulls one
    // lucide module instead of the whole index. Same for the motion barrel.
    optimizePackageImports: ["lucide-react", "motion", "@react-three/drei"],
  },

  // Long-lived immutable caching for the hashed build output.
  //
  // Production only. `next dev` serves these same paths with UNHASHED filenames
  // (`/_next/static/chunks/app/page.js`), so an immutable year-long cache pins the
  // first build the browser ever saw — edits compile, the server serves them, and
  // the page keeps running stale JS until a manual cache-clear. Costs nothing in
  // production, where Next already fingerprints every file in this directory.
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
