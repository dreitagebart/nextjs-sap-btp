import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Forwarded-Proto', value: 'https' }]
      }
    ]
  }
}

export default nextConfig
