/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    isrMemoryCacheSize: 0
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pl"],
    localeDetection: false
  }
}

module.exports = nextConfig
