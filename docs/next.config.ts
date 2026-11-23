import type { NextConfig } from "next";

// GitHub Pages serves this project site from /kai. The deploy workflow sets
// PAGES_BASE_PATH; local `next dev` / `next build` stay at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit plain HTML/CSS/JS to `out/` for GitHub Pages.
  output: "export",
  basePath,
  // Write /components/tag/index.html so Pages can serve /components/tag/.
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  // cacheComponents / partialPrefetching are removed: they rely on a running
  // Next.js server (partial prerendering) and can't be used with a static export.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
