/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  transpilePackages: ['@workos-inc/authkit-nextjs']
}

module.exports = nextConfig
