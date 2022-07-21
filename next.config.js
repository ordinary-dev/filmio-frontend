/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'filmio-backend', 'www.gravatar.com'],
  },
}

module.exports = nextConfig
