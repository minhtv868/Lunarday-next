import { generateMetadata as genSeo } from "@/lib/seoGenerator";
import SchedulePageClient from "./SchedulePageClient";
import { getSeoApi } from "@/lib/api";
import { Seo } from "@/types/seo";

export async function generateMetadata({ 
  params 
}: { 
  params: { leagueName: string } 
}) {
  const leagueSlug = params.leagueName;
  let seoData: Seo | null = null;

  try {
    // FIX: Add error handling and validation
    const seoUrl = `/${leagueSlug}/lich-thi-dau`;
    console.log("Fetching SEO for URL:", seoUrl);
    
    seoData = await getSeoApi.getSeoByUrl({ seoUrl });
    console.log("SEO data received:", seoData);
  } catch (err) {
    console.warn("Cannot fetch SEO, using fallback:", err);
    // Continue with fallback data
  }

  // FIX: Better string formatting
  const leagueDisplayName = leagueSlug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return genSeo({
    title: seoData?.metaTitle || `Lịch thi đấu ${leagueDisplayName}`,
    description: seoData?.metaDesc || `Cập nhật lịch thi đấu giải ${leagueDisplayName} mới nhất`,
    url: seoData?.canonicalTag || `https://example.com/${leagueSlug}/lich-thi-dau`,
    image: seoData?.imageUrl,
    keywords: seoData?.metaKeyword 
      ? seoData.metaKeyword.split(",").map(k => k.trim()) 
      : ["lịch thi đấu", leagueSlug, "bóng đá"],
  });
}

export default function Page({ 
  params 
}: { 
  params: { leagueName: string } 
}) {
  return <SchedulePageClient leagueName={params.leagueName} />;
}