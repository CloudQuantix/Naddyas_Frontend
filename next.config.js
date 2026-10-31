/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'standalone',

  images: {
    unoptimized: true,
  },

  compress: true,
};

module.exports = nextConfig;