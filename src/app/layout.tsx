import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/styles/globals.css'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_DOMAIN } from "@/constants/config";
//import AdBanner from "@/components/AddBaner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// KHÔNG có "use client"
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MoneyMate - Quản lý tài chính Gen Z",
    description:
      "Cập nhật giá vàng SJC, DOJI, PNJ, lãi suất ngân hàng, tỷ giá Bitcoin, Ethereum và tin tức tài chính mới nhất hôm nay. Dữ liệu liên tục, chính xác.",
    keywords:
      "giá vàng, vàng hôm nay, lãi suất ngân hàng, coin, bitcoin, ethereum, tài chính, đầu tư, tin tức",
    openGraph: {
      title: "Cập nhật giá vàng, lãi suất, coin và tin tức tài chính mới nhất",
      description:
        "Giá vàng trong nước, lãi suất tiết kiệm, tỷ giá coin và phân tích tài chính mỗi ngày.",
      url: SITE_DOMAIN,
      siteName: "Thông tin tài chính Việt Nam",
      type: "website",
      images: [
        {
          url: "https://yourdomain.com/og-home.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Thông tin giá vàng, lãi suất, coin mới nhất",
      description:
        "Giá vàng, lãi suất ngân hàng, tỷ giá coin và phân tích đầu tư được cập nhật liên tục.",
      images: ["https://yourdomain.com/og-home.jpg"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        
        {/* Banner Ad sau Header */}
        {/* <AdBanner 
          slot="header-banner"
          className="w-full max-w-7xl mx-auto px-4 py-2"
          size="728x90"
        /> */}
        
        <main className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Ad bên trái */}
              {/* <aside className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-4 space-y-4">
                  <AdBanner 
                    slot="sidebar-left"
                    className="w-full"
                    size="300x250"
                  />
                  <AdBanner 
                    slot="sidebar-left-2"
                    className="w-full"
                    size="300x600"
                  />
                </div>
              </aside> */}
              
              {/* Nội dung chính */}
              <div className="lg:col-span-4 order-1 lg:order-2">
                {children}
              </div>
              
              {/* Sidebar Ad bên phải */}
              {/* <aside className="lg:col-span-1 order-3">
                <div className="sticky top-4 space-y-4">
                  <AdBanner 
                    slot="sidebar-right"
                    className="w-full"
                    size="300x250"
                  />
                  <AdBanner 
                    slot="sidebar-right-2"
                    className="w-full"
                    size="300x600"
                  />
                </div>
              </aside> */}
            </div>
          </div>
        </main>
        
        {/* Banner Ad trước Footer */}
        {/* <AdBanner 
          slot="footer-banner"
          className="w-full max-w-7xl mx-auto px-4 py-2"
          size="728x90"
        /> */}
        
        <Footer />
      </body>
    </html>
  );
}