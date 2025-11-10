
export const CONFIG = {
  SITE: {
    DOMAIN: 'https://cryptocurrency-two-phi.vercel.app',
    NAME: 'Giá Vàng Việt Nam',
  },
  API: {
    URL: process.env.NEXT_PUBLIC_API_URL || '',
    API_KEY: process.env.NEXT_PUBLIC_API_KEY || "1234",
    API_BASE: process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7008/api",
    SITE_ID: Number(process.env.NEXT_PUBLIC_SITE_ID) || 1,
    DEFAULT_PAGE_SIZE: 20,
    DEFAULT_CATEGORY_ID: 1,
    DEFAULT_REVIEW_STATUS_ID: 1,
    REQUEST_TIMEOUT: 10000,
    ENDPOINTS: {
      LICHNGAY: '/calendars/lichngay',
      CATEGORIES: '/categories',
      EXCHANGE_RATES: '/exchange-rates',
      GOLD_PRICES: '/gold-prices',
      SITE_INFO: '/sites',
    },
  },
  CALENDAR: {
    KEY: 'calendar',
    THANG: [
      'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
      'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp',
    ],
  },
   PAGES: {
    HOME: '/',
    ABOUT: '/gioi-thieu',
    NEWS: '/tin-tuc',
    GOLD: '/gia-vang',
    EXCHANGE: '/ty-gia',
    CONTACT: '/lien-he',
    LICHAMDUONGHOMNAY: '/lich-am-duong-hom-nay',
    LICHAMDUONGNGAY: '/lich-am-duong-ngay-',
  },

} as const;
