'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CalendarCalculator from 'viet-lunar-calendar';
import DailyCalendar from '@/components/lunar/DailyCalendar';

export default function DayDetailPage() {
  const params = useParams();
  const dateString = params.date as string;
  const formattedDate = params.date as string;
  // Parse date từ URL (format: DD-MM-YYYY)
  const [day, month, year] = dateString.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/lich-am"
          className="inline-flex items-center gap-2 text-white hover:text-red-100 mb-4 sm:mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
        >
          ← Quay lại lịch
        </Link>
        
        {/* Main Info Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 border border-red-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              📅 Xem ngày âm dương {formattedDate}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
           <DailyCalendar date={formattedDate} />
          
          {/* Thông tin bổ sung */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-200">
              <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <span>📅</span> Tuổi xung
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
              
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-200">
              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <span>🌙</span> Thông tin
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
               
              </p>
            </div>
          </div>
        </div>
        
        {/* Note Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 border border-red-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
            <span>📝</span> Ghi chú
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Thông tin lịch âm được tính toán dựa trên thuật toán chuyển đổi 
            dương lịch sang âm lịch Việt Nam. Giờ hoàng đạo và tuổi xung chỉ 
            mang tính chất tham khảo theo phong tục truyền thống.
          </p>
        </div>
      </div>
    </div>
  );
}