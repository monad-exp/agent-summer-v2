/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [],
    minimumCacheTTL: 2678400,
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
}

export default nextConfig
