'use client';

import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slot: string;
  className?: string;
  size?: '728x90' | '300x250' | '300x600' | '320x50' | '160x600' | 'responsive';
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  className = '', 
  size = '300x250',
  format = 'auto',
  responsive = true 
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const loadAttempted = useRef(false); // Thêm ref để track

  useEffect(() => {
    // Prevent duplicate ad loading - kiểm tra cả state và ref
    if (adLoaded || loadAttempted.current) return;

    const loadAd = () => {
      try {
        // Kiểm tra xem element có tồn tại và chưa có quảng cáo
        if (!adRef.current) return;
        
        // Kiểm tra xem element đã có attribute data-adsbygoogle-status chưa
        const adStatus = adRef.current.getAttribute('data-adsbygoogle-status');
        if (adStatus) {
          console.log('Ad already loaded for this element');
          setAdLoaded(true);
          return;
        }

        // Đánh dấu đã attempt load
        loadAttempted.current = true;

        // Kiểm tra xem adsbygoogle đã được load chưa
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          // Đợi một chút để đảm bảo DOM đã render
          const timer = setTimeout(() => {
            try {
              // Kiểm tra lại một lần nữa trước khi push
              if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
                setAdLoaded(true);
              }
            } catch (error: any) {
              console.error('AdSense push error:', error);
              // Nếu lỗi là "already have ads", không coi đó là lỗi thực sự
              if (error.message?.includes('already have ads')) {
                setAdLoaded(true);
              } else {
                setAdError(true);
              }
            }
          }, 100);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('AdSense initialization error:', error);
        setAdError(true);
      }
    };

    loadAd();
  }, []); // Chỉ chạy một lần khi mount

  const getSizeStyle = (size: string) => {
    if (size === 'responsive') {
      return { display: 'block', width: '100%', height: 'auto' };
    }

    const sizeMap: Record<string, { width: string; height: string }> = {
      '728x90': { width: '728px', height: '90px' },
      '300x250': { width: '300px', height: '250px' },
      '300x600': { width: '300px', height: '600px' },
      '320x50': { width: '320px', height: '50px' },
      '160x600': { width: '160px', height: '600px' },
    };

    return sizeMap[size] || sizeMap['300x250'];
  };

  // Placeholder cho development hoặc khi có lỗi
  if (process.env.NODE_ENV === 'development' || adError) {
    return (
      <div 
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium ${className}`}
        style={size === 'responsive' ? { width: '100%', minHeight: '250px' } : getSizeStyle(size)}
      >
        <div className="text-center p-4">
          <div className="font-semibold mb-1">
            {adError ? '⚠️ Ad Load Error' : '📢 Ad Preview'}
          </div>
          <div className="text-xs">Slot: {slot}</div>
          <div className="text-xs">Size: {size}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: size === 'responsive' ? 'block' : 'inline-block',
          ...getSizeStyle(size) 
        }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={size === 'responsive' ? 'auto' : format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdBanner;