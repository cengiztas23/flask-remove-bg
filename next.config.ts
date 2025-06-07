import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Build sırasında ESLint hatalarını yok say
  },
};

export default nextConfig;
