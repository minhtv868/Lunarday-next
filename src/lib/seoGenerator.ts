// lib/seo.ts
import type { Metadata } from "next";

type SeoProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  robots?: string;
  keywords?: string[];
};

export function generateMetadata({
  title,
  description,
  url = "",
  image = "/default-share.jpg",
  robots = "index, follow",
  keywords = [],
}: SeoProps): Metadata {
  return {
    title,
    description,
    keywords: keywords.length ? keywords.join(", ") : undefined,
    robots,
    alternates: url ? { canonical: url } : undefined,

    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}
