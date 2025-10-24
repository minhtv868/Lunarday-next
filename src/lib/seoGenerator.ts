// lib/seo.ts
import type { Metadata } from "next";

type SeoProps = {
  title: string;
  description: string;
  url?: string;       // canonical URL
  image?: string;     // thumbnail khi share
  robots?: string;    // index, follow | noindex, nofollow
  keywords?: string[]; // từ khóa SEO
};

export function generateMetadata({
  title,
  description,
  url,
  image,
  robots = "index, follow",
  keywords,
}: SeoProps): Metadata {
  return {
    title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords.join(", ") : undefined,
    robots,

    alternates: url ? { canonical: url } : undefined,

    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}
