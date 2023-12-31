// @ts-check
const { i18n } = require('./next-i18next.config.js')

const withTM = require("next-transpile-modules")(["react-daisyui"]);

const { withCountryInfo } = require('./src/scripts/countries')
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['flagcdn.com', 'gateway.ipfscdn.io'],
  },

  webpack(config) {
    config.module.rules.push(
      // svg
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      // markdown
      {
        test: /\.md$/i,
        use: 'raw-loader'

      }
    )
    return config
  },
}

// module.exports = withTM(nextConfig)
module.exports = withCountryInfo(withTM(nextConfig))
module.exports = nextConfig
