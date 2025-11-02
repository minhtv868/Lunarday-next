'use client';
import { Calendar, Clock, Star, TrendingUp, Coins, Newspaper, ChevronRight } from 'lucide-react';
import { XemNgayTotXauModel } from '@/types/xemngay';
import {xemNgayApi} from '@/lib/api';
import { useEffect, useState } from "react";
import DailyCalendar from '@/components/lunar/DailyCalendar';
export default function HomePage() {
  const zodiacs = [
    { name: 'Tý', emoji: '🐭', color: 'from-blue-500 to-blue-600' },
    { name: 'Sửu', emoji: '🐮', color: 'from-green-500 to-green-600' },
    { name: 'Dần', emoji: '🐯', color: 'from-orange-500 to-orange-600' },
    { name: 'Mão', emoji: '🐰', color: 'from-pink-500 to-pink-600' },
    { name: 'Thìn', emoji: '🐲', color: 'from-purple-500 to-purple-600' },
    { name: 'Tỵ', emoji: '🐍', color: 'from-red-500 to-red-600' },
    { name: 'Ngọ', emoji: '🐴', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Mùi', emoji: '🐑', color: 'from-teal-500 to-teal-600' },
    { name: 'Thân', emoji: '🐵', color: 'from-amber-500 to-amber-600' },
    { name: 'Dậu', emoji: '🐔', color: 'from-rose-500 to-rose-600' },
    { name: 'Tuất', emoji: '🐶', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Hợi', emoji: '🐷', color: 'from-cyan-500 to-cyan-600' }
  ];

  const news = [
    { 
      title: 'Cách chọn ngày tốt khai trương', 
      desc: 'Hướng dẫn xem ngày khai trương theo tuổi và tiết khí...',
      tag: 'Phong thủy'
    },
    { 
      title: 'Giờ hoàng đạo trong tuần này', 
      desc: 'Cập nhật giờ tốt cho các việc quan trọng trong tuần...',
      tag: 'Lịch âm'
    },
    { 
      title: 'Tử vi tháng 11 cho 12 con giáp', 
      desc: 'Dự báo vận mệnh, tài lộc, tình duyên tháng này...',
      tag: 'Tử vi'
    },
    { 
      title: 'Ngày tốt cưới hỏi cuối năm 2025', 
      desc: 'Những ngày đẹp nhất để tổ chức hôn lễ trong quý 4...',
      tag: 'Hôn nhân'
    }
  ];
  const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
       let formattedDate = `${dd}-${mm}-${yyyy}`;
   const [dataHomNay, setDataHomNay] = useState<XemNgayTotXauModel | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await xemNgayApi.getXemNgayHomNay();
  //     setDataHomNay(result);
  //     console.log('Dữ liệu lịch ngày hôm nay:', result);
  //   }
  //   fetchData();
  // }, []);

  // if (!dataHomNay) return <p>Đang tải...</p>;
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
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
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-xl p-6 sm:p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
              Hôm nay
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Thứ Bảy, 01/11/2025</h1>
            <p className="text-blue-100 text-base sm:text-lg mb-2">
              Âm lịch: <span className="font-semibold text-white">01/10 năm Ất Tỵ</span>
            </p>
            <p className="text-blue-100 text-sm sm:text-base mb-6">
              ⏰ Giờ hoàng đạo: 11h–13h, 17h–19h
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Xem chi tiết hôm nay
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Quick Info Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Lịch âm */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 border border-blue-100 hover:border-blue-300">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <Calendar size={22} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Lịch âm hôm nay</h2>
                <p className="text-sm text-gray-500">Ngày Quý Tỵ, tháng Ất Hợi</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Hôm nay là ngày 01/11/2025 dương lịch (tức 01/10 năm Ất Tỵ). Ngày Quý Tỵ, tháng Ất Hợi, năm Ất Tỵ.
            </p>
            <button className="text-blue-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Xem chi tiết <ChevronRight size={16} />
            </button>
          </div>

          {/* Ngày tốt xấu */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 border border-emerald-100 hover:border-emerald-300">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                <Clock size={22} className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Ngày tốt hôm nay</h2>
                <p className="text-sm text-gray-500">Xem việc nên - kiêng</p>
              </div>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Nên</span>
                <p className="text-sm text-gray-700">Cưới hỏi, khai trương, xuất hành</p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Kiêng</span>
                <p className="text-sm text-gray-700">Động thổ, chôn cất</p>
              </div>
            </div>
            <button className="text-emerald-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Xem chi tiết <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Tử vi 12 con giáp */}
        <section className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-purple-100 rounded-xl">
              <Star size={22} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Tử vi 12 con giáp</h2>
              <p className="text-sm text-gray-500">Xem vận mệnh hôm nay</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {zodiacs.map((zodiac) => (
              <button
                key={zodiac.name}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-transparent hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {zodiac.emoji}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {zodiac.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Giá vàng & Tỷ giá */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Giá vàng */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-md p-5 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-100 rounded-xl">
                <Coins size={22} className="text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Giá vàng hôm nay</h2>
                <p className="text-xs text-gray-500">Cập nhật liên tục</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">SJC</span>
                <span className="text-sm font-bold text-amber-700">78.400.000đ</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">PNJ</span>
                <span className="text-sm font-bold text-amber-700">78.250.000đ</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">DOJI</span>
                <span className="text-sm font-bold text-amber-700">78.200.000đ</span>
              </div>
            </div>
            <button className="text-amber-700 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Xem chi tiết <ChevronRight size={16} />
            </button>
          </div>

          {/* Tỷ giá */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-5 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-green-100 rounded-xl">
                <TrendingUp size={22} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Tỷ giá hôm nay</h2>
                <p className="text-xs text-gray-500">So với VND</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">🇺🇸 USD</span>
                <span className="text-sm font-bold text-green-700">25.480đ</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">🇪🇺 EUR</span>
                <span className="text-sm font-bold text-green-700">27.050đ</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg">
                <span className="text-sm font-medium text-gray-700">🇯🇵 JPY</span>
                <span className="text-sm font-bold text-green-700">175đ</span>
              </div>
            </div>
            <button className="text-green-700 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              Xem chi tiết <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Tin tức */}
        <section className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Newspaper size={22} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Tin tức mới nhất</h2>
              <p className="text-sm text-gray-500">Cập nhật hàng ngày</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {news.map((item, i) => (
              <article 
                key={i} 
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 hover:shadow-lg transition-all border border-gray-200 hover:border-blue-300"
              >
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                  {item.tag}
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.desc}
                </p>
                <button className="text-blue-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Đọc thêm <ChevronRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}