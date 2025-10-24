export interface Seo {
  seoId: number;
  siteId?: number;
  seoName: string;
  url: string;
  metaTitle: string;
  metaDesc: string;
  metaKeyword: string;
  canonicalTag?: string;
  h1Tag?: string;
  seoFooter?: string;
   imageUrl?: string;
  crUserId?: number;
  crDateTime: string;        // JSON sẽ trả về string ISO
  updUserId?: number;
  updDateTime?: string;
}