/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "images.pexels.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
