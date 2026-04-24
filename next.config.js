/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/presentation',
        destination: '/presentation.html',
      },
    ]
  },
}

module.exports = nextConfig
