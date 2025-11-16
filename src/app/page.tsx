'use client';
import DailyCalendar from '@/components/lunar/DailyCalendar';
import { Calendar, Clock, Star, TrendingUp, Coins, Newspaper, ChevronRight, Award, Heart, Scissors, Home, Phone, Car, Users, Fuel, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');

  const zodiacs = [
    { name: 'Tý', emoji: '🐭', color: 'from-blue-500 to-blue-600', year: '2026' },
    { name: 'Sửu', emoji: '🐮', color: 'from-green-500 to-green-600', year: '2025' },
    { name: 'Dần', emoji: '🐯', color: 'from-orange-500 to-orange-600', year: '2022' },
    { name: 'Mão', emoji: '🐰', color: 'from-pink-500 to-pink-600', year: '2023' },
    { name: 'Thìn', emoji: '🐲', color: 'from-purple-500 to-purple-600', year: '2024' },
    { name: 'Tỵ', emoji: '🐍', color: 'from-red-500 to-red-600', year: '2025' },
    { name: 'Ngọ', emoji: '🐴', color: 'from-yellow-500 to-yellow-600', year: '2026' },
    { name: 'Mùi', emoji: '🐑', color: 'from-teal-500 to-teal-600', year: '2027' },
    { name: 'Thân', emoji: '🐵', color: 'from-amber-500 to-amber-600', year: '2028' },
    { name: 'Dậu', emoji: '🐔', color: 'from-rose-500 to-rose-600', year: '2029' },
    { name: 'Tuất', emoji: '🐶', color: 'from-indigo-500 to-indigo-600', year: '2030' },
    { name: 'Hợi', emoji: '🐷', color: 'from-cyan-500 to-cyan-600', year: '2031' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Xem ngày tốt', href: '/ngay-tot-hom-nay', color: 'bg-blue-500' },
    { icon: Heart, label: 'Ngày cưới hỏi', href: '/ngay-tot-cuoi-hoi', color: 'bg-pink-500' },
    { icon: Award, label: 'Ngày khai trương', href: '/ngay-tot-khai-truong', color: 'bg-purple-500' },
    { icon: Clock, label: 'Giờ hoàng đạo', href: '/gio-hoang-dao-hom-nay', color: 'bg-orange-500' },
    { icon: Home, label: 'Hướng nhà', href: '/xem-huong-nha-hop-tuoi', color: 'bg-green-500' },
    { icon: Car, label: 'Biển số xe', href: '/boi-bien-so-xe', color: 'bg-indigo-500' },
  ];

  const featuredNews = [
    {
      title: 'Giá vàng hôm nay tăng mạnh',
      desc: 'SJC tăng thêm 500.000đ/lượng trong phiên sáng',
      tag: 'Vàng',
      tagColor: 'bg-amber-500',
      image: '💰'
    },
    {
      title: 'Tử vi tháng 11/2025',
      desc: '3 con giáp đại cát, vượng tài lộc tháng này',
      tag: 'Tử vi',
      tagColor: 'bg-purple-500',
      image: '⭐'
    },
    {
      title: 'Lịch nghỉ Tết Ất Tỵ 2026',
      desc: 'Chính thức nghỉ 9 ngày từ 26/1 đến 3/2',
      tag: 'Lịch nghỉ',
      tagColor: 'bg-red-500',
      image: '🎊'
    },
    {
      title: 'Phong thủy nhà ở 2026',
      desc: 'Hướng nhà hợp tuổi và cách bài trí may mắn',
      tag: 'Phong thủy',
      tagColor: 'bg-green-500',
      image: '🏠'
    }
  ];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  let formattedDate = `${dd}-${mm}-${yyyy}`;
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <aside>
          {/* ✅ Box lịch âm kiểu thẻ lớn */}
          {/* <div className="p-4 bg-gradient-to-b from-pink-50 to-white shadow-md rounded-xl text-center border border-pink-200">
<h3 className="text-sm font-bold text-pink-700 uppercase">THÁNG 11 NĂM 2025</h3>
<div className="text-6xl font-extrabold text-pink-600 mt-2">2</div>
<p className="text-lg font-semibold mt-1">Chủ nhật</p>
<p className="text-red-600 mt-1 text-sm">★ Lễ hội chùa Keo (Thái Bình)</p>


<p className="italic text-xs text-gray-600 mt-2">Bí mật của một cuộc hôn nhân tốt đẹp là tha thứ cho bạn đời vì đã lấy mình.</p>
<p className="italic text-xs text-gray-500 mb-3">- Sacha Guitry -</p>


<div className="grid grid-cols-2 text-left text-sm gap-2 border-t pt-2">
<div>
<p className="font-bold text-pink-700">13</p>
<p>Ngày Hoàng đạo</p>
<p>Năm Ất Tỵ</p>
<p>Tháng Bình Tuất</p>
<p>Ngày Ất Hợi</p>
<p>09:48:36</p>
<p>Giờ Tân Tỵ</p>
<p>Tiết khí: Sương giáng</p>
</div>
<div>
<p className="font-bold text-pink-700">Giờ Hoàng đạo:</p>
<p>Đinh Sửu (1h-3h)</p>
<p>Canh Thìn (7h-9h)</p>
<p>Nhâm Ngọ (11h-13h)</p>
<p>Quý Mùi (13h-15h)</p>
<p>Bính Tuất (19h-21h)</p>
<p>Đinh Hợi (21h-23h)</p>
</div>
</div>


<div className="flex justify-between text-xs text-pink-600 font-medium mt-2">
<button className="hover:underline">Hôm qua</button>
<button className="hover:underline">Hôm nay</button>
<button className="hover:underline">Ngày mai</button>
</div>
</div> */}

          <DailyCalendar date={formattedDate} />
        </aside>
        {/* Hero Section - Compact on mobile */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 text-white">
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full -mr-20 sm:-mr-32 -mt-20 sm:-mt-32"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white opacity-5 rounded-full -ml-16 sm:-ml-24 -mb-16 sm:-mb-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm mb-2 sm:mb-3">
                  🌙 Hôm nay
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">Thứ Hai, 10/11/2025</h1>
                <p className="text-blue-100 text-sm sm:text-lg mb-1 sm:mb-2">
                  Âm lịch: <span className="font-semibold text-white">21/09 năm Ất Tỵ</span>
                </p>
                <p className="text-blue-100 text-xs sm:text-base">
                  ⏰ Giờ hoàng đạo: <span className="font-semibold">05h–07h, 11h–13h, 17h–19h</span>
                </p>
              </div>

              <div className="flex sm:flex-col gap-2">
                <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg text-sm sm:text-base">
                  Xem chi tiết
                  <ChevronRight size={16} className="hidden sm:block" />
                </button>
                <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm sm:text-base">
                  Lịch tháng
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions - Mobile Optimized */}
        <section className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">⚡</span>
            Tra cứu nhanh
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div className={`${action.color} p-2 sm:p-2.5 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  <action.icon size={18} className="sm:w-5 sm:h-5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Today's Info Cards - Stack on mobile */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Việc nên làm */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-4 sm:p-5 border border-green-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-2.5 bg-green-500 rounded-xl">
                <Award size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Việc nên làm</h2>
                <p className="text-xs sm:text-sm text-gray-600">Hôm nay</p>
              </div>
            </div>
            <div className="space-y-2">
              {['Cưới hỏi, ăn hỏi', 'Khai trương, xuất hành', 'Cắt tóc, may áo mới', 'Làm nhà, dựng cột'].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Việc nên tránh */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-md p-4 sm:p-5 border border-red-200">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-2.5 bg-red-500 rounded-xl">
                <Scissors size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Việc nên tránh</h2>
                <p className="text-xs sm:text-sm text-gray-600">Hôm nay</p>
              </div>
            </div>
            <div className="space-y-2">
              {['Động thổ, xây dựng', 'Chôn cất, an táng', 'Di chuyển nhà cửa', 'Khởi công dự án lớn'].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-red-600 mt-0.5">✕</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tử vi 12 con giáp - Scrollable on mobile */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-purple-100 rounded-xl">
                <Star size={20} className="sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tử vi 12 con giáp</h2>
                <p className="text-xs sm:text-sm text-gray-500">Năm 2026</p>
              </div>
            </div>
            <button className="text-purple-600 font-medium text-xs sm:text-sm inline-flex items-center gap-1">
              Tất cả
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3">
            {zodiacs.map((zodiac) => (
              <button
                key={zodiac.name}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-transparent hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-1 sm:mb-2 transform group-hover:scale-110 transition-transform">
                    {zodiac.emoji}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {zodiac.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Financial Info - Stack on small mobile */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Giá vàng */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-md p-4 sm:p-5 border border-amber-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-amber-500 rounded-xl">
                  <Coins size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Giá vàng</h2>
                  <p className="text-xs text-gray-500">Hôm nay</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-amber-700 font-medium">↑ +2.5%</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'SJC', price: '78.400.000', change: '+300K' },
                { name: 'PNJ', price: '78.250.000', change: '+250K' },
                { name: 'DOJI', price: '78.200.000', change: '+200K' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded-lg">
                  <span className="text-sm sm:text-base font-medium text-gray-700">{item.name}</span>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-bold text-amber-700">{item.price}đ</div>
                    <div className="text-xs text-green-600">{item.change}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 sm:mt-4 w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium text-sm rounded-lg transition-colors">
              Xem chi tiết
            </button>
          </div>

          {/* Tỷ giá */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-4 sm:p-5 border border-green-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-2.5 bg-green-500 rounded-xl">
                  <TrendingUp size={20} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Tỷ giá</h2>
                  <p className="text-xs text-gray-500">So với VND</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-green-700 font-medium">Cập nhật</span>
            </div>
            <div className="space-y-2">
              {[
                { flag: '🇺🇸', name: 'USD', rate: '25.480', change: '+0.2%' },
                { flag: '🇪🇺', name: 'EUR', rate: '27.050', change: '+0.5%' },
                { flag: '🇯🇵', name: 'JPY', rate: '175', change: '-0.1%' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 sm:p-2.5 bg-white rounded-lg">
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {item.flag} {item.name}
                  </span>
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-bold text-green-700">{item.rate}đ</div>
                    <div className={`text-xs ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 sm:mt-4 w-full py-2 bg-green-100 hover:bg-green-200 text-green-700 font-medium text-sm rounded-lg transition-colors">
              Xem chi tiết
            </button>
          </div>
        </div>

        {/* Featured News - Card style for mobile */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-blue-100 rounded-xl">
                <Newspaper size={20} className="sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Tin tức nổi bật</h2>
                <p className="text-xs sm:text-sm text-gray-500">Cập nhật hàng ngày</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-xs sm:text-sm inline-flex items-center gap-1">
              Tất cả
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {featuredNews.map((item, i) => (
              <article
                key={i}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300"
              >
                <div className="flex gap-3">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{item.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className={`inline-block px-2 py-0.5 ${item.tagColor} text-white text-xs font-semibold rounded-full mb-2`}>
                      {item.tag}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                      {item.desc}
                    </p>
                    <button className="text-blue-600 font-medium text-xs sm:text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Đọc thêm <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}