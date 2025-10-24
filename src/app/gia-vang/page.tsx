


import { SITE_DOMAIN } from '@/constants/config';
import GiaVangPageClient from './GiaVangPageClient';

export async function generateMetadata() {
  return {
    title: 'Giá vàng hôm nay | Giá vàng SJC, DOJI, PNJ cập nhật liên tục',
    description: 'Cập nhật giá vàng trong nước mới nhất hôm nay từ SJC, DOJI, PNJ... theo từng phút. Xem biểu đồ giá vàng, lịch sử và phân tích xu hướng.',
    keywords: 'giá vàng, vàng sjc, vàng doji, vàng hôm nay, giá vàng mới nhất, vàng pnj',
    openGraph: {
      title: 'Giá vàng hôm nay',
      description: 'Cập nhật giá vàng trong nước từ các thương hiệu lớn.',
      url: SITE_DOMAIN + '/gia-vang',
      siteName: 'Giá vàng Việt Nam',
      type: 'website',
      images: [
        {
          url: 'https://yourdomain.com/og-image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Giá vàng hôm nay',
      description: 'Cập nhật giá vàng theo từng phút.',
      images: ['https://yourdomain.com/og-image.jpg'],
    },
  };
}

export default function GiaVangPage() {
  return <GiaVangPageClient />;
}
