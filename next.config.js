/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: "/job-interview",
  assetPrefix: "/job-interview",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
