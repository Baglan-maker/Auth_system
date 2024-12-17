import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://675ca3b5fe09df667f6468f8.mockapi.io/:path*", // API-URL
      },
    ];
  },
};

export default nextConfig;
