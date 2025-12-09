// next.config.js

// --- ADD THIS LINE AT THE VERY TOP ---
import "./dev-ssr-trap.ts";
// -------------------------------------

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
