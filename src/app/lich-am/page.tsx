import Script from "next/script";
import LichAmPage from "../../components/lunar/LichAmPage"; // ← component lịch âm chính
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Âm Hôm Nay - Xem Ngày Tốt Xấu, Tử Vi, Phong Thủy Chính Xác",
  description:
    "Xem lịch âm hôm nay, ngày tốt xấu, tử vi, hướng nhà, tuổi hợp. Cập nhật thông tin chính xác theo lịch Việt Nam.",
  keywords: [
    "lịch âm hôm nay",
    "xem ngày tốt xấu",
    "lịch âm dương",
    "tử vi phong thủy",
    "xem hướng nhà",
    "ngày hoàng đạo hắc đạo"
  ],
  openGraph: {
    title: "Lịch Âm Hôm Nay - Xem Ngày Tốt Xấu, Tử Vi, Phong Thủy Chính Xác",
    description:
      "Xem lịch âm, ngày tốt xấu, tử vi phong thủy, hướng nhà hợp tuổi. Dữ liệu chính xác theo lịch Việt Nam.",
    url: "https://example.com/lich-am",
    images: [
      {
        url: "https://example.com/og-lich-am.jpg",
        width: 1200,
        height: 630,
        alt: "Lịch Âm Việt Nam",
      },
    ],
  },
  alternates: {
    canonical: "https://example.com/lich-am",
  },
};

// 👇 Dữ liệu cấu trúc (SEO Schema)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lịch Âm Việt Nam",
  url: "https://example.com/lich-am",
  description:
    "Công cụ xem lịch âm, ngày tốt xấu, tử vi, phong thủy chuẩn Việt Nam. Hỗ trợ xem hướng nhà, tuổi hợp, ngày cưới hỏi, khai trương.",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "All",
  image: "https://example.com/og-lich-am.jpg",
};

export default function Page() {
  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LichAmPage />
    </>
  );
}
