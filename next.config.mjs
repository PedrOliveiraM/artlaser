/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rpe3c59juxn54zf2.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}
export default nextConfig
