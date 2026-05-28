import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "placehold.co" }],
  },

  allowedDevOrigins: ["192.168.1.8", "192.168.1.4"],
};

export default nextConfig;
