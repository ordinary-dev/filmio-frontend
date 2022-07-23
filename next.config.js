/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'filmio-backend', 'www.gravatar.com', 'api.comfycamp.space'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'helpers', 'types']
  },
}

module.exports = nextConfig
