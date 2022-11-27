/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // https://nextjs.org/docs/messages/experimental-app-dir-config
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
