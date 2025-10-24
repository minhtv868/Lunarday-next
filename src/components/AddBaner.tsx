// 'use client';

// import { useEffect } from 'react';

// interface AdBannerProps {
//   slot: string;
//   className?: string;
//   size?: '728x90' | '300x250' | '300x600' | '320x50' | '160x600';
// }

// const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '', size = '300x250' }) => {
//   useEffect(() => {
//     try {
//       // Khởi tạo Google AdSense
//       ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
//     } catch (error) {
//       console.error('AdSense error:', error);
//     }
//   }, []);

//   const getSizeStyle = (size: string) => {
//     switch (size) {
//       case '728x90':
//         return { width: '728px', height: '90px' };
//       case '300x250':
//         return { width: '300px', height: '250px' };
//       case '300x600':
//         return { width: '300px', height: '600px' };
//       case '320x50':
//         return { width: '320px', height: '50px' };
//       case '160x600':
//         return { width: '160px', height: '600px' };
//       default:
//         return { width: '300px', height: '250px' };
//     }
//   };

//   // Placeholder cho development
//   if (process.env.NODE_ENV === 'development') {
//     return (
//       <div 
//         className={`bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 text-sm font-medium ${className}`}
//         style={getSizeStyle(size)}
//       >
//         <div className="text-center">
//           <div>AD SLOT: {slot}</div>
//           <div>SIZE: {size}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`ad-container ${className}`}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: 'block', ...getSizeStyle(size) }}
//         data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Thay bằng ID của bạn
//         data-ad-slot={slot}
//         data-ad-format="auto"
//         data-full-width-responsive="true"
//       />
//     </div>
//   );
// };

// export default AdBanner;