import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/records",

  //  redirect root traffic to /records
  async redirects() {
    return [
      {
        source: "/",
        destination: "/records",
        permanent: true, // 301 redirect for SEO
      },
    ];
  },

  // add images from other domains
  // images: { remotePatterns: [{ hostname: "res.cloudinary.com" }] },
};

export default nextConfig;
