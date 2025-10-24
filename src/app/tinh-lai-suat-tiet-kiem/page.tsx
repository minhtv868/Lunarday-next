// app/savings-calculator/page.tsx
import { generateMetadata } from "@/lib/seoGenerator";
import SavingsCalculator from "./SavingsCalculator";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "Tính Lãi Suất Tiết Kiệm Online - Công Cụ Tính Lãi Ngân Hàng Chính Xác",
  description:
    "Máy tính lãi suất tiết kiệm online miễn phí. Công cụ giúp bạn ước tính lãi suất ngân hàng chính xác theo tháng, quý hoặc năm.",
  url: "https://example.com/savings-calculator",
  image: "https://example.com/thumb.jpg",
  keywords: [
    "tính lãi suất tiết kiệm",
    "máy tính lãi suất ngân hàng",
    "công cụ tính lãi suất online",
    "tính tiền gửi tiết kiệm",
    "cách tính lãi suất tiết kiệm",
    "tính lãi suất gửi tiết kiệm hàng tháng"
  ],
});

// structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tính Lãi Suất Tiết Kiệm Online - FinanceCalc",
  url: "https://example.com/savings-calculator",
  description:
    "Công cụ trực tuyến miễn phí giúp tính toán lãi suất gửi tiết kiệm ngân hàng nhanh chóng và chính xác.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  image: "https://example.com/thumb.jpg",
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
      <SavingsCalculator />
    </>
  );
}
