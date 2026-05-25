/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-auth', '@better-auth/core', '@better-auth/kysely-adapter', 'drizzle-orm', 'pg', 'kysely'],
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
