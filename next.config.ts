// next.config.mjs
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "images.unsplash.com"], // thêm domain ở đây
  },
}

export default nextConfig
