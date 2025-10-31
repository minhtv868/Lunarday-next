'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalendarCalculator from "viet-lunar-calendar";


export default function LichAmPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const calendar = new CalendarCalculator();
  const lunar = calendar.getLunarDate(today);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 p-3 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-red-100">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
              🏮 Lịch Âm Việt Nam
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4">
            <button 
              onClick={goToPreviousMonth} 
              className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base font-medium"
            >
              <span className="hidden sm:inline">← Tháng trước</span>
              <span className="sm:hidden">←</span>
            </button>
            
            <div className="text-center flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {monthNames[month]} {year}
              </h2>
              <button 
                onClick={goToToday} 
                className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium mt-1 hover:underline transition-colors"
              >
                ◉ Hôm nay
              </button>
            </div>
            
            <button 
              onClick={goToNextMonth} 
              className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base font-medium"
            >
              <span className="hidden sm:inline">Tháng sau →</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>

          {/* Today Info */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 sm:p-4 border border-red-200">
            <p className="text-sm sm:text-base md:text-lg text-center">
              <span className="font-semibold text-gray-700">Hôm nay:</span>{' '}
              <span className="font-bold text-gray-900">
                {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
              </span>{' '}
              <span className="text-gray-600">(Dương lịch)</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg text-red-700 font-medium text-center mt-1">
              Ngày {lunar.day} tháng {lunar.month} năm {lunar.year} (Âm lịch)
            </p>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-6 border border-red-100">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={`text-center font-bold py-2 text-xs sm:text-sm rounded-lg ${
                  index === 0 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} className="aspect-square" />;

              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              // 🔥 Tính ngày âm cho từng ô
              const lunarDay = calendar.getLunarDate(new Date(year, month, day), 7);

            const dateString = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;


              return (
                <Link
                  key={index}
                  href={`/lich-am-ngay-${dateString}`}
                  className={`aspect-square border-2 rounded-xl p-1 sm:p-2 hover:bg-red-50 transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-lg ${
                    isToday ? 'border-red-500 bg-gradient-to-br from-red-100 to-orange-100 shadow-md' : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className={`text-base sm:text-lg font-bold ${
                      isToday 
                        ? 'text-red-700' 
                        : index % 7 === 0 
                          ? 'text-red-500' 
                          : 'text-gray-800'
                    }`}>
                      {day}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5 font-medium">
                      {lunarDay.day}/{lunarDay.month}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-4 mt-4 sm:mt-6 border border-red-100">
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            <span className="font-semibold text-red-700">💡 Ghi chú:</span> Số to là ngày dương lịch, số nhỏ là ngày âm lịch. 
            <span className="hidden sm:inline"> Click vào ngày để xem chi tiết.</span>
          </p>
        </div>
      </div>
    </div>
  );
}