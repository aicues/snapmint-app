// @ts-check
const { i18n } = require('./next-i18next.config.js')

const withTM = require("next-transpile-modules")(["react-daisyui"]);

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withTM(nextConfig)
// module.exports = nextConfig
