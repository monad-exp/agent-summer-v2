/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-auth', 'drizzle-orm', 'pg'],
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [],
    minimumCacheTTL: 2678400,
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
}

export default nextConfig
