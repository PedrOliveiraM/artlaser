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

// Use export default para exportar a configuração
export default nextConfig
