// next.config.mjs
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com", "images.unsplash.com"], // thêm domain ở đây
  },
  async rewrites() {
    return [
      { source: "/lich-am-duong-:date", destination: "/lich-am-duong/:date" },
      { source: "/lich-duong-ngay-:date", destination: "/lich-duong-ngay/:date" },
      { source: "/tu-vi-ngay-:date", destination: "/tu-vi-ngay/:date" },
      { source: "/ngay-tot-xau-:date", destination: "/ngay-tot-xau/:date" },
    ]
  },
  
}

export default nextConfig
