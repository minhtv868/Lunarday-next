'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CalendarCalculator from 'viet-lunar-calendar';

export default function LichAmDetailPage() {
  const params = useParams();
  const dateString = params.date as string;
  
  // Parse date từ URL (format: DD-MM-YYYY)
  const [day, month, year] = dateString.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  // Lấy thông tin âm lịch
  const calendar = new CalendarCalculator();
  const lunar = calendar.getLunarDate(dateObj);
  
  // Tên can chi
  const canNames = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const chiNames = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  
  // Tên tháng âm lịch
  const monthNames = [
    'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
    'Bảy', 'Tám', 'Chín', 'Mười', 'Mười một', 'Chạp'
  ];
  
  // Tên ngày trong tuần
  const weekDayNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const weekDay = weekDayNames[dateObj.getDay()];
  
  // Can chi năm, tháng, ngày từ lunar object
  const yearCan = canNames[(lunar.year + 6) % 10];
  const yearChi = chiNames[(lunar.year + 8) % 12];
  
  const monthCan = canNames[(lunar.year * 12 + lunar.month + 3) % 10];
  const monthChi = chiNames[(lunar.month + 1) % 12];
  
  // Tính can chi ngày dựa trên công thức
  const jd = Math.floor((dateObj.getTime() / 86400000) + 2440587.5);
  const dayCan = canNames[(jd + 9) % 10];
  const dayChi = chiNames[(jd + 1) % 12];
  
  // Giờ hoàng đạo (simplified - giờ tốt)
  const goodHours = ['Tý (23-01h)', 'Sửu (01-03h)', 'Thìn (07-09h)', 'Ngọ (11-13h)', 'Mùi (13-15h)', 'Tuất (19-21h)'];
  
  // Tính tuổi xung khắc (simplified)
  const conflictAge = (year - (lunar.year % 12 + 12) % 12) % 12;
  
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
              📅 Chi Tiết Ngày
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Dương lịch */}
          <div className="text-center mb-6 pb-6 border-b-2 border-gradient-to-r from-red-100 to-orange-100">
            <p className="text-sm sm:text-base text-gray-600 mb-2 font-medium">{weekDay}</p>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              {day}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 font-semibold">
              Tháng {month}/{year}
            </p>
            <div className="inline-block mt-3 px-4 py-1 bg-gray-100 rounded-full">
              <p className="text-xs sm:text-sm text-gray-600 font-bold tracking-wider">DƯƠNG LỊCH</p>
            </div>
          </div>
          
          {/* Âm lịch */}
          <div className="text-center mb-6 pb-6 border-b-2 border-gradient-to-r from-red-100 to-orange-100">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Ngày {lunar.day}
            </p>
            <p className="text-xl sm:text-2xl text-red-600 font-semibold">
              Tháng {monthNames[lunar.month - 1]}
            </p>
            <p className="text-lg sm:text-xl text-gray-700 mt-2 font-medium">
              Năm {lunar.year}
            </p>
            <div className="inline-block mt-3 px-4 py-1 bg-gradient-to-r from-red-100 to-orange-100 rounded-full">
              <p className="text-xs sm:text-sm text-red-700 font-bold tracking-wider">ÂM LỊCH</p>
            </div>
          </div>
          
          {/* Can Chi */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-red-200">
            <h2 className="text-lg sm:text-xl font-bold text-red-800 mb-4 text-center flex items-center justify-center gap-2">
              <span>☯️</span> CAN CHI
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-red-100">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Năm</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {yearCan} {yearChi}
                </p>
              </div>
              
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-red-100">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Tháng</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {monthCan} {monthChi}
                </p>
              </div>
              
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-red-100">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">Ngày</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  {dayCan} {dayChi}
                </p>
              </div>
            </div>
          </div>
          
          {/* Giờ hoàng đạo */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-yellow-200">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <span>⭐</span> Giờ Hoàng Đạo (Giờ tốt)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {goodHours.map((hour, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center shadow-sm border border-yellow-100 hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">{hour}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Thông tin bổ sung */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-200">
              <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <span>📅</span> Tuổi xung
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Tuổi {chiNames[conflictAge]} ({conflictAge === 0 ? 12 : conflictAge} tuổi)
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 hover:shadow-lg transition-all duration-200">
              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <span>🌙</span> Thông tin
              </h3>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Ngày âm: {lunar.day}/{lunar.month}/{lunar.year}
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