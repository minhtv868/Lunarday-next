import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CONFIG } from "@/constants/config";
import AdBanner from "@/components/layout/AddBaner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lịch Âm Hôm Nay – Xem Ngày Tốt, Giờ Hoàng Đạo, Lịch Vạn Niên 2025",
  description:
    "Xem lịch âm hôm nay nhanh nhất: ngày dương, ngày âm, can chi, giờ hoàng đạo, việc nên và không nên. Cập nhật chính xác theo lịch vạn niên Việt Nam.",
  keywords:
    "lịch âm hôm nay, lịch dương âm, ngày hoàng đạo, giờ hoàng đạo, lịch vạn niên, đổi ngày âm dương, xem ngày tốt",
  alternates: { canonical: `${CONFIG.SITE.DOMAIN}/lich-am-hom-nay` },
  openGraph: {
    title: "Lịch Âm Hôm Nay – Xem Ngày Tốt, Giờ Hoàng Đạo",
    description:
      "Công cụ xem lịch âm dương, ngày tốt, giờ hoàng đạo, đổi ngày chính xác nhất Việt Nam.",
    images: [`${CONFIG.SITE.DOMAIN}/og-lich-am.jpg`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="vi">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col font-sans">
        {/* ✅ Banner quảng cáo đầu trang */}
        <div className="w-full flex justify-center py-2 border-b bg-white shadow-sm">
          <div className="w-[728px] h-[90px] hidden md:block">Ad 728x90</div>
          <div className="w-[320px] h-[50px] md:hidden">Ad 320x50</div>
        </div>

        <Header />

        {/* ✅ Content + Sidebar tối ưu width */}
        <main className="w-full max-w-6xl mx-auto px-3 lg:px-4 flex gap-6 py-6">
          {/* Content chính */}
          <div className="flex-1 min-w-0">{children}</div>

          {/* Sidebar quảng cáo */}
          <aside className="hidden lg:block w-[260px] space-y-4">
            <div className="p-4 bg-white shadow-md rounded-xl sticky top-4 space-y-3">
              <h3 className="font-bold text-lg">📊 Thị trường</h3>
              <ul className="text-sm space-y-1">
                <li>Vàng: <span id="gold-price">Loading...</span></li>
                <li>BTC: <span id="btc-price">Loading...</span></li>
                <li>ETH: <span id="eth-price">Loading...</span></li>
                <li>USD/VND: <span id="usd-rate">Loading...</span></li>
              </ul>
            </div>

            <div className="p-4 bg-white shadow-md rounded-xl space-y-2">
              <h3 className="font-bold text-lg">🗓️ Lịch âm hôm nay</h3>
              <p id="lunar-date">Đang tải...</p>
              <p id="hoang-dao">Giờ hoàng đạo: ...</p>
            </div>

            <div className="p-4 bg-white shadow-md rounded-xl space-y-2">
              <h3 className="font-bold text-lg">🔥 Tin nổi bật</h3>
              <ul className="list-disc ml-4 text-sm space-y-1" id="hot-news">
                <li>Đang tải...</li>
              </ul>
            </div>

            <AdBanner slot="sidebar-300x600" />
          </aside>
        </main>

        {/* Banner quảng cáo cuối trang */}
        <div className="w-full flex justify-center py-4 border-t bg-white mt-6">
          <div className="w-[728px] h-[90px] hidden md:block">Ad 728x90</div>
          <div className="w-[320px] h-[50px] md:hidden">Ad 320x50</div>
        </div>

        <Footer />

        {/* ✅ JSON-LD SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MoneyMate",
            "url": "https://moneymate.vn",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://moneymate.vn/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": "https://moneymate.vn"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Lịch âm",
                "item": "https://moneymate.vn/lich-am"
              }
            ]
          }
        `}</script>
      </body>
    </html>
  );
}